import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import ProBundle from "./ProBundle";

const { invoke } = vi.hoisted(() => ({ invoke: vi.fn(async () => ({ data: null, error: null })) }));
// Checkout is an isolated boundary: no test can call Supabase or Stripe.
vi.mock("@/integrations/supabase/client", () => ({ supabase: { functions: { invoke } } }));
vi.mock("@/components/Navbar", () => ({ default: () => null }));
vi.mock("@/components/Footer", () => ({ default: () => null }));
vi.mock("@/components/NewsletterSection", () => ({ default: () => null }));
vi.mock("@/components/pro-bundle/FreeToolsSection", () => ({ default: () => null }));
vi.mock("@/components/pro-bundle/SocialProofSection", () => ({ default: () => null }));
vi.mock("framer-motion", async () => {
  const React = await import("react");
  return { motion: { div: ({ children, className }: { children: React.ReactNode; className?: string }) => React.createElement("div", { className }, children) } };
});

describe("published bundle checkout maintenance", () => {
  let host: HTMLDivElement;
  let root: Root;
  beforeEach(() => {
    vi.clearAllMocks();
    Reflect.set(globalThis, "IS_REACT_ACT_ENVIRONMENT", true);
    vi.stubGlobal("fetch", vi.fn(() => { throw new Error("External requests forbidden in maintenance tests"); }));
    vi.spyOn(window, "open").mockImplementation(() => null);
    host = document.createElement("div");
    document.body.append(host);
    root = createRoot(host);
  });
  afterEach(() => {
    act(() => root.unmount());
    host.remove();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });
  const render = () => act(() => root.render(<ProBundle />));
  const purchaseButtons = () => [...host.querySelectorAll("button")].filter((b) => /Get the (?:Pro )?Bundle|Checkout temporarily unavailable/.test(b.textContent || ""));

  it("replaces all three purchase controls with disabled, explicit unavailable states and cannot start checkout", async () => {
    render();
    const buttons = purchaseButtons();
    expect(buttons).toHaveLength(3);
    for (const button of buttons) {
      expect(button).toHaveTextContent("Checkout temporarily unavailable");
      expect(button).toBeDisabled();
      await act(async () => { button.click(); });
    }
    expect(invoke).not.toHaveBeenCalled();
    expect(window.fetch).not.toHaveBeenCalled();
    expect(window.open).not.toHaveBeenCalled();
  });

  it("explains the pause beside every purchase control while preserving the free-tools link", () => {
    render();
    for (const button of purchaseButtons()) {
      const id = button.getAttribute("aria-describedby");
      expect(id).toBeTruthy();
      const explanation = document.getElementById(id!);
      expect(explanation).toHaveTextContent("Purchases are paused while we verify the replacement. Free tools remain available.");
      expect(explanation).toHaveAttribute("role", "status");
    }
    expect(host.querySelector('a[href="#free-tools"]')).toHaveTextContent("Try Free Tools First");
    expect(host.querySelector("#free-tools")).toBeTruthy();
  });

  it("marks this product unavailable in its rendered structured offer", () => {
    render();
    const records = JSON.parse(document.getElementById("seo-jsonld")!.textContent!);
    const product = records.find((record: Record<string, unknown>) => record["@type"] === "Product");
    expect(product.offers.availability).toBe("https://schema.org/OutOfStock");
    expect(product.offers.url).toBe("https://openclaw-skillshub.com/pro-bundle");
  });
});
