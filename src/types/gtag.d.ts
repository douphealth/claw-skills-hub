// Google Analytics gtag.js is loaded in index.html; calls are optional (window.gtag?.(...)).
export {};
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
