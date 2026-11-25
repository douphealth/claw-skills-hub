#!/usr/bin/env node
// Encrypt the Skill Safety Kit zip into public/pro-bundle-assets/ so it can ship as a static asset.
// Only /api/pro-bundle/download (which checks the Stripe payment first) can decrypt it.
//
//   node scripts/encrypt-pro-bundle.mjs <kit.zip> [--key-file <path outside the repo>]
//
// The key is read from PRO_BUNDLE_KEY (base64, 32 bytes) or the key file; if neither exists a new
// key is generated and written to the key file. Set the same value as the Pages secret PRO_BUNDLE_KEY.
// Layout: 12-byte IV || AES-256-GCM ciphertext+tag (matches decryptKit in src/server/proBundle.ts).
import { webcrypto as crypto } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "pro-bundle-assets", "openclaw-skill-safety-kit.enc");
const [zipPath, ...rest] = process.argv.slice(2);
const keyFile = rest[rest.indexOf("--key-file") + 1] && rest.includes("--key-file") ? rest[rest.indexOf("--key-file") + 1] : null;
if (!zipPath) { console.error("usage: node scripts/encrypt-pro-bundle.mjs <kit.zip> [--key-file <path>]"); process.exit(1); }

let keyB64 = process.env.PRO_BUNDLE_KEY || (keyFile && fs.existsSync(keyFile) ? fs.readFileSync(keyFile, "utf8").trim() : "");
if (!keyB64) {
  if (!keyFile) { console.error("No PRO_BUNDLE_KEY and no --key-file to create one."); process.exit(1); }
  if (path.resolve(keyFile).startsWith(ROOT)) { console.error("Refusing to write the key inside the repository."); process.exit(1); }
  keyB64 = Buffer.from(crypto.getRandomValues(new Uint8Array(32))).toString("base64");
  fs.writeFileSync(keyFile, keyB64 + "\n", { mode: 0o600 });
  console.log(`New key written to ${keyFile}`);
}
const raw = Buffer.from(keyB64, "base64");
if (raw.length !== 32) { console.error("Key must be 32 bytes (base64)."); process.exit(1); }

const key = await crypto.subtle.importKey("raw", raw, "AES-GCM", false, ["encrypt", "decrypt"]);
const iv = crypto.getRandomValues(new Uint8Array(12));
const plain = fs.readFileSync(zipPath);
const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plain));
const back = Buffer.from(await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ct));
if (!back.equals(plain)) { console.error("Round-trip check failed."); process.exit(1); }
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, Buffer.concat([Buffer.from(iv), Buffer.from(ct)]));
console.log(`Encrypted ${plain.length} bytes -> ${path.relative(ROOT, OUT)} (${iv.length + ct.length} bytes); round-trip OK.`);
