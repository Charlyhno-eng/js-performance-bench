const N = 1_000_000;
const arr = Array.from({ length: N }, (_, i) => i);

// filter -> map -> reduce (optimized HOF order)
Deno.bench(
  "filter -> map -> reduce",
  { group: "map-filter-reduce", baseline: true },
  () => {
    const sum = arr
      .filter((x) => (x & 1) === 0)
      .map((x) => x * 2)
      .reduce((acc, x) => acc + x, 0);
    if (sum === -1) console.log(sum);
  },
);

// map -> filter -> reduce (less optimal)
Deno.bench("map -> filter -> reduce", { group: "map-filter-reduce" }, () => {
  const sum = arr
    .map((x) => x * 2)
    .filter((x) => x > 1000)
    .reduce((acc, x) => acc + x, 0);
  if (sum === -1) console.log(sum);
});

// single pass with for
Deno.bench("for single pass", { group: "map-filter-reduce" }, () => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    if ((value & 1) === 0) {
      const mapped = value * 2;
      sum += mapped;
    }
  }
  if (sum === -1) console.log(sum);
});

// single pass with forEach
Deno.bench("forEach single pass", { group: "map-filter-reduce" }, () => {
  let sum = 0;
  arr.forEach((value) => {
    if ((value & 1) === 0) {
      const mapped = value * 2;
      sum += mapped;
    }
  });
  if (sum === -1) console.log(sum);
});

// single pass with reduce (combined logic)
Deno.bench("reduce single pass", { group: "map-filter-reduce" }, () => {
  const sum = arr.reduce((acc, value) => {
    if ((value & 1) === 0) {
      const mapped = value * 2;
      return acc + mapped;
    }
    return acc;
  }, 0);
  if (sum === -1) console.log(sum);
});
