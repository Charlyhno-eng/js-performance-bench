const N = 1_000_000;
const arr = Array.from({ length: N }, (_, i) => i);

// filter
Deno.bench("filter", { group: "array-filter", baseline: true }, () => {
  const result = arr.filter((x) => (x & 1) === 0 && x > 1000);
  if (result.length === -1) console.log(result.length);
});

// for loop
Deno.bench("for loop", { group: "array-filter" }, () => {
  const result: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    if ((value & 1) === 0 && value > 1000) {
      result.push(value);
    }
  }
  if (result.length === -1) console.log(result.length);
});

// forEach
Deno.bench("forEach", { group: "array-filter" }, () => {
  const result: number[] = [];
  arr.forEach((value) => {
    if ((value & 1) === 0 && value > 1000) {
      result.push(value);
    }
  });
  if (result.length === -1) console.log(result.length);
});

// reduce (filter behavior)
Deno.bench("reduce-as-filter", { group: "array-filter" }, () => {
  const result = arr.reduce<number[]>((acc, value) => {
    if ((value & 1) === 0 && value > 1000) {
      acc.push(value);
    }
    return acc;
  }, []);
  if (result.length === -1) console.log(result.length);
});

// flatMap (filter behavior)
Deno.bench("flatMap-as-filter", { group: "array-filter" }, () => {
  const result = arr.flatMap((value) =>
    (value & 1) === 0 && value > 1000 ? [value] : [],
  );
  if (result.length === -1) console.log(result.length);
});
