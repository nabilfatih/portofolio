import { describe, expect, it } from "vitest";
import { serializeJsonLd } from "@/lib/json-ld";

describe("serializeJsonLd", () => {
  it("escapes characters that can break out of a script element", () => {
    expect(serializeJsonLd({ value: "</script>&>" })).toBe(
      '{"value":"\\u003c/script\\u003e\\u0026\\u003e"}'
    );
  });
});
