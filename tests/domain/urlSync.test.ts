import { describe, expect, it } from "vitest";
import {
  buildSimulationQueryString,
  parseSimulationQueryParams,
} from "../../src/lib/urlSync";

describe("urlSync", () => {
  it("parses valid direction, wind strength, and step query parameters", () => {
    expect(
      parseSimulationQueryParams("?dir=ltr&strength=strong&step=4")
    ).toEqual({
      windDirection: "ltr",
      windStrength: "strong",
      currentStep: 4,
    });

    expect(
      parseSimulationQueryParams("?dir=rtl&strength=light&step=1")
    ).toEqual({
      windDirection: "rtl",
      windStrength: "light",
      currentStep: 1,
    });
  });

  it("handles partial query parameters cleanly", () => {
    expect(parseSimulationQueryParams("?dir=ltr")).toEqual({
      windDirection: "ltr",
      windStrength: undefined,
      currentStep: undefined,
    });
  });

  it("ignores invalid or out-of-range query parameters safely", () => {
    expect(
      parseSimulationQueryParams("?dir=invalid&strength=extreme&step=99")
    ).toEqual({
      windDirection: undefined,
      windStrength: undefined,
      currentStep: undefined,
    });

    expect(parseSimulationQueryParams("?step=0")).toEqual({
      windDirection: undefined,
      windStrength: undefined,
      currentStep: undefined,
    });
  });

  it("builds deterministic query string for sharing classroom presets", () => {
    expect(
      buildSimulationQueryString({
        windDirection: "ltr",
        windStrength: "strong",
        currentStep: 4,
      })
    ).toBe("?dir=ltr&strength=strong&step=4");
  });
});
