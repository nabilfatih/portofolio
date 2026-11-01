import { describe, expect, it } from "vitest";
import {
  createCaseSocialCard,
  createSocialImage,
  getSocialCard,
  socialCards,
} from "@/lib/social";

describe("social image registry", () => {
  it("publishes one unique image path for every portfolio page", () => {
    const paths = socialCards.map((card) => card.path.join("/"));

    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).toEqual(
      expect.arrayContaining([
        "home",
        "work",
        "case-studies",
        "collaborate",
        "privacy",
      ])
    );
  });

  it("derives case study cards from the canonical case metadata", () => {
    expect(
      createCaseSocialCard({
        description: "An evidence-aware tutoring system.",
        slug: "nina-tutor",
        title: "Inside Nina's source-backed tutoring system",
      })
    ).toEqual({
      description: "An evidence-aware tutoring system.",
      path: ["work", "nina-tutor"],
      title: "Inside Nina's source-backed tutoring system",
    });
  });

  it("resolves both registry paths and public image URLs", () => {
    expect(getSocialCard(["home"])?.title).toContain("working system");
    expect(getSocialCard(["home", "image.png"])).toBe(getSocialCard(["home"]));
    expect(getSocialCard(["missing", "image.png"])).toBeUndefined();
  });

  it("creates a complete large social image descriptor", () => {
    expect(createSocialImage(["work"], "Work by Nabil Fatih")).toEqual({
      alt: "Work by Nabil Fatih",
      height: 630,
      type: "image/png",
      url: "/og/work/image.png",
      width: 1200,
    });
  });
});
