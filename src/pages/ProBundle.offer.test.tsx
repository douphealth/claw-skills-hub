import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import ProBundle from "./ProBundle";

vi.mock("@/components/Navbar", () => ({ default: () => null }));
vi.mock("@/components/Footer", () => ({ default: () => null }));

describe("Skill Safety Kit offer page", () => {
  let host: HTMLDivElement;
  let root: Root;
  const statusFetch = (available: boolean) =>
    vi.fn(async (url: string) => {
      if (url !== "/api/pro-bundle/status") throw new Error(`unexpected request ${url}`);
      return new Response(JSON.stringify({ available }), { status: 200 });
    });
  beforeEach(() => {
    Reflect.set(globalThis, "IS_REACT_ACT_ENVIRONMENT", true);
    host = document.createElement("div");
    document.body.append(host);
    root = createRoot(host);
  });
  afterEach(() => {
    act(() => root.unmount());
    host.remove();
    vi.unstubAllGlobals();
  });
  const render = async () => {
    await act(async () => root.render(<MemoryRouter><ProBundle /></MemoryRouter>));
    await act(async () => { await new Promise((r) => setTimeout(r, 0)); });
  };
  const product = () => JSON.parse(document.getElementById("seo-jsonld")!.textContent!).find((r: Record<string, unknown>) => r["@type"] === "Product");

  it("offers no purchase link and stays out of stock while checkout is not configured", async () => {
    vi.stubGlobal("fetch", statusFetch(false));
    await render();
    expect(host.querySelector('a[href="/api/pro-bundle/buy"]')).toBeNull();
    const disabled = [...host.querySelectorAll("button")].filter((b) => b.textContent?.includes("Checkout opens soon"));
    expect(disabled).toHaveLength(2);
    disabled.forEach((b) => expect(b).toBeDisabled());
    expect(product().offers.availability).toBe("https://schema.org/OutOfStock");
  });

  it("links both buy buttons to the server checkout redirect at $7.99 once configured", async () => {
    vi.stubGlobal("fetch", statusFetch(true));
    await render();
    const links = host.querySelectorAll('a[href="/api/pro-bundle/buy"]');
    expect(links).toHaveLength(2);
    links.forEach((a) => expect(a).toHaveTextContent("Get the kit for $7.99"));
    expect(product().offers).toMatchObject({ price: "7.99", priceCurrency: "USD", availability: "https://schema.org/InStock" });
    expect(product().name).toBe("OpenClaw Skill Safety Kit");
  });

  it("makes none of the old unsupported claims", async () => {
    vi.stubGlobal("fetch", statusFetch(true));
    await render();
    const text = host.textContent || "";
    for (const claim of ["60+", "Security Audited", "Priority Support", "Enterprise", "1 Year", "Bundles Sold", "4.9/5", "money-back"]) {
      expect(text).not.toContain(claim);
    }
  });
});
