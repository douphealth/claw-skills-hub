const rawVersion = import.meta.env.VITE_BUILD_VERSION?.trim() || "local";

export const buildInfo = Object.freeze({
  version: rawVersion.slice(0, 12),
  time: import.meta.env.VITE_BUILD_TIME || "local",
  commit: import.meta.env.VITE_BUILD_COMMIT || rawVersion,
  env: import.meta.env.MODE,
});
