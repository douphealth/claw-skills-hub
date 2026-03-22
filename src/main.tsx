import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const CHUNK_RELOAD_FLAG = "__clawskills_chunk_reload__";
const CHUNK_ERROR_REGEX =
  /Failed to fetch dynamically imported module|Importing a module script failed|ChunkLoadError|Loading chunk\s+\d+\s+failed/i;

const recoverFromChunkError = (message: string) => {
  const alreadyReloaded = window.sessionStorage.getItem(CHUNK_RELOAD_FLAG) === "1";
  if (alreadyReloaded) {
    console.error("Chunk load failed after retry:", message);
    return;
  }

  window.sessionStorage.setItem(CHUNK_RELOAD_FLAG, "1");
  const url = new URL(window.location.href);
  url.searchParams.set("_v", Date.now().toString());
  window.location.replace(url.toString());
};

window.addEventListener(
  "error",
  (event) => {
    const message = event.error instanceof Error ? event.error.message : String(event.message || "");
    if (CHUNK_ERROR_REGEX.test(message)) recoverFromChunkError(message);
  },
  true,
);

window.addEventListener("unhandledrejection", (event) => {
  const reason = event.reason;
  const message = reason instanceof Error ? reason.message : String(reason || "");
  if (CHUNK_ERROR_REGEX.test(message)) recoverFromChunkError(message);
});

window.sessionStorage.removeItem(CHUNK_RELOAD_FLAG);

createRoot(document.getElementById("root")!).render(<App />);
