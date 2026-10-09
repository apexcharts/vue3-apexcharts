import { describe, it, expect } from "vitest";
import { copyData } from "../src/utils.js";

describe("copyData", () => {
  it("copies plain objects and arrays instead of passing them through", () => {
    const source = { series: [{ data: [1, 2, 3] }] };
    const copy = copyData(source);

    expect(copy).toEqual(source);
    expect(copy).not.toBe(source);
    expect(copy.series).not.toBe(source.series);
    expect(copy.series[0].data).not.toBe(source.series[0].data);
  });

  it("keeps functions by reference", () => {
    const formatter = (value: number) => `${value}%`;
    const copy = copyData({ yaxis: { labels: { formatter } } });

    expect(copy.yaxis.labels.formatter).toBe(formatter);
  });

  it("keeps dates and regular expressions intact", () => {
    const min = new Date("2020-01-01T00:00:00.000Z");
    const pattern = /^a/;
    const copy = copyData({ xaxis: { min }, pattern });

    expect(copy.xaxis.min).toBe(min);
    expect(copy.pattern).toBe(pattern);
  });

  it("terminates on a self-referencing option graph", () => {
    const options: Record<string, unknown> = { chart: { type: "line" } };
    options.self = options;

    const copy = copyData(options);

    expect(copy.self).toBe(copy);
    expect(copy.chart).toEqual({ type: "line" });
  });

  it("preserves sharing between two references to the same object", () => {
    const shared = { color: "#fff" };
    const copy = copyData({ a: shared, b: shared });

    expect(copy.a).toBe(copy.b);
    expect(copy.a).not.toBe(shared);
  });

  it("leaves primitives alone", () => {
    expect(copyData(null)).toBeNull();
    expect(copyData(undefined)).toBeUndefined();
    expect(copyData(42)).toBe(42);
    expect(copyData("line")).toBe("line");
  });
});
