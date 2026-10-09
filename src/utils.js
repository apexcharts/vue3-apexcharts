// Deep clone helper to break reactive references before passing data to ApexCharts.
// This prevents ApexCharts' internal mutations from triggering Vue's deep watchers,
// which would cause a feedback loop that kills animations.
// Functions are preserved by reference so click handlers (e.g. customIcons) are not dropped.
// Dates and regular expressions are passed through as well: copying them entry by entry
// yields an empty object, which silently breaks `xaxis.min`/`max` given as `Date`.
// Objects already copied are remembered, so a self-referencing option graph terminates
// instead of overflowing the stack, and shared references stay shared within one copy.
export const copyData = (data, seen = new WeakMap()) => {
  if (typeof data === "function") return data;
  if (data === null || typeof data !== "object") return data;
  if (data instanceof Date || data instanceof RegExp) return data;
  if (seen.has(data)) return seen.get(data);

  if (Array.isArray(data)) {
    const copy = [];
    seen.set(data, copy);
    // `data.map(copyData)` would hand the element index to `seen`.
    data.forEach((item, index) => {
      copy[index] = copyData(item, seen);
    });
    return copy;
  }

  const copy = {};
  seen.set(data, copy);
  for (const [key, value] of Object.entries(data)) {
    copy[key] = copyData(value, seen);
  }
  return copy;
};
