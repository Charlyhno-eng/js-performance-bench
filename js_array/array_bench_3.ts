const N = 1_000_000;
const arr = Array.from({ length: N }, (_, i) => i);

// map + filter chain
Deno.bench(
  "map + filter chain",
  { group: "map-filter", baseline: true },
  () => {
    const result = arr.map((x) => x * 2).filter((x) => x > 1000);
    if (result.length === -1) console.log(result.length);
  },
);

// single pass with for
Deno.bench("for single pass", { group: "map-filter" }, () => {
  const result: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    const mapped = arr[i] * 2;
    if (mapped > 1000) {
      result.push(mapped);
    }
  }
  if (result.length === -1) console.log(result.length);
});

// forEach single pass
Deno.bench("forEach single pass", { group: "map-filter" }, () => {
  const result: number[] = [];
  arr.forEach((value) => {
    const mapped = value * 2;
    if (mapped > 1000) {
      result.push(mapped);
    }
  });
  if (result.length === -1) console.log(result.length);
});

// reduce: combined map + filter
Deno.bench("reduce map+filter", { group: "map-filter" }, () => {
  const result = arr.reduce<number[]>((acc, value) => {
    const mapped = value * 2;
    if (mapped > 1000) {
      acc.push(mapped);
    }
    return acc;
  }, []);
  if (result.length === -1) console.log(result.length);
});

// flatMap: filter + map in one pass
Deno.bench("flatMap map+filter", { group: "map-filter" }, () => {
  const result = arr.flatMap((value) => {
    const mapped = value * 2;
    return mapped > 1000 ? [mapped] : [];
  });
  if (result.length === -1) console.log(result.length);
});
