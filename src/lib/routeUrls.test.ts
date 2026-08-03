import { describe, expect, it } from "vitest";
import { categoryPath, skillPath, skillUrl } from "./routeUrls";

describe("skill route URLs", () => {
  it("uses trailing-slash paths for category and skill pages", () => {
    expect(categoryPath("ai-llms")).toBe("/skills/ai-llms/");
    expect(skillPath("ai-llms", "gpt-prompt-chainer")).toBe(
      "/skills/ai-llms/gpt-prompt-chainer/",
    );
  });

  it("builds absolute canonical skill URLs from the canonical path", () => {
    expect(skillUrl("notes-pkm", "bookmark-manager")).toBe(
      "https://openclaw-skillshub.com/skills/notes-pkm/bookmark-manager/",
    );
  });
});
