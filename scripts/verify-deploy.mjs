const [siteUrl, expectedCommit] = process.argv.slice(2);

if (!siteUrl || !expectedCommit) {
  console.error("Usage: node scripts/verify-deploy.mjs <site-url> <expected-commit>");
  process.exit(1);
}

const timeoutMs = Number(process.env.VERIFY_TIMEOUT_MS ?? 180000);
const pollMs = Number(process.env.VERIFY_POLL_MS ?? 5000);
const endpoint = `${siteUrl.replace(/\/$/, "")}/build-info.json`;
const expected = expectedCommit.trim();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const deadline = Date.now() + timeoutMs;

while (Date.now() < deadline) {
  try {
    const response = await fetch(endpoint, {
      headers: { "Cache-Control": "no-cache" },
    });

    if (!response.ok) {
      console.log(`⏳ Waiting for ${endpoint} (status: ${response.status})`);
      await sleep(pollMs);
      continue;
    }

    const data = await response.json();
    const deployedCommit = String(data?.commit ?? "").trim();

    if (deployedCommit === expected) {
      const missingUrl = `${siteUrl.replace(/\/$/, "")}/__clawskills-404-verification__`;
      const missingResponse = await fetch(missingUrl, {
        redirect: "manual",
        headers: { "Cache-Control": "no-cache" },
      });
      const missingHtml = await missingResponse.text();

      if (missingResponse.status === 404 && /<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i.test(missingHtml)) {
        console.log(`✅ Live deployment and 404 contract verified (${deployedCommit.slice(0, 12)})`);
        process.exit(0);
      }

      console.log(
        `⏳ Commit deployed, but 404 contract is not ready (status: ${missingResponse.status}).`,
      );
      await sleep(pollMs);
      continue;
    }

    console.log(
      `⏳ Commit mismatch. Expected ${expected.slice(0, 12)}, got ${deployedCommit.slice(0, 12) || "none"}`,
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(`⏳ Verification retry after request error: ${message}`);
  }

  await sleep(pollMs);
}

console.error(`❌ Deployment verification timed out after ${Math.round(timeoutMs / 1000)}s.`);
process.exit(1);
