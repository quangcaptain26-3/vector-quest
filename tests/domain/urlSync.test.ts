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

  it("parses and serializes extended Teacher Studio query parameters", () => {
    const query = buildSimulationQueryString({
      windDirection: "rtl",
      windStrength: "strong",
      currentStep: 4,
      operationMode: "subtract",
      customAirspeedKts: 100,
      customWindSpeedKts: 50,
      runwayAngleDeg: 30,
      blindMode: true,
      tvScale: "large",
    });

    expect(query).toBe(
      "?dir=rtl&strength=strong&step=4&mode=subtract&va=100&vw=50&rw=30&blind=1&tv=large"
    );
    expect(parseSimulationQueryParams(query)).toEqual({
      windDirection: "rtl",
      windStrength: "strong",
      currentStep: 4,
      operationMode: "subtract",
      customAirspeedKts: 100,
      customWindSpeedKts: 50,
      runwayAngleDeg: 30,
      blindMode: true,
      tvScale: "large",
    });
  });
});
