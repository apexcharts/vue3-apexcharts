// Deep clone helper to break reactive references before passing data to ApexCharts.
// This prevents ApexCharts' internal mutations from triggering Vue's deep watchers,
// which would cause a feedback loop that kills animations.
// Functions are preserved by reference so click handlers (e.g. customIcons) are not dropped.
export const copyData = (data) => {
  if (typeof data === "function") return data;
  if (Array.isArray(data)) return data.map(copyData);
  if (data !== null && typeof data === "object") {
    return Object.fromEntries(
      Object.entries(data).map(([k, v]) => [k, copyData(v)])
    );
  }
  return data;
};
