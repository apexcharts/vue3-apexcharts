// Deep clone helper to break reactive references before passing data to ApexCharts.
// This prevents ApexCharts' internal mutations from triggering Vue's deep watchers,
// which would cause a feedback loop that kills animations.
// Functions are preserved by reference so click handlers (e.g. customIcons) are not dropped.
// Dates and regular expressions are passed through as well: copying them entry by entry
// yields an empty object, which breaks Dates in series data and, on ApexCharts 8,
// `xaxis.min`/`max` given as a `Date` once the chart updates.
// Objects already copied are remembered, so shared references stay shared within one copy
// and a self-referencing value does not loop forever here. ApexCharts' own merge still
// cannot take a cyclic option graph, so this does not make one safe to pass.
const copyValue = (data, seen) => {
  if (typeof data === "function") return data;
  if (data === null || typeof data !== "object") return data;
  if (data instanceof Date || data instanceof RegExp) return data;
  if (seen.has(data)) return seen.get(data);

  if (Array.isArray(data)) {
    // Sized up front so holes keep the original length, as `map` did.
    const copy = new Array(data.length);
    seen.set(data, copy);
    data.forEach((item, index) => {
      copy[index] = copyValue(item, seen);
    });
    return copy;
  }

  const copy = {};
  seen.set(data, copy);
  for (const [key, value] of Object.entries(data)) {
    copy[key] = copyValue(value, seen);
  }
  return copy;
};

export const copyData = (data) => copyValue(data, new WeakMap());
