const N = 100_000;

// numbers: random array
const numArray = Array.from({ length: N }, () => Math.floor(Math.random() * N));
// strings: random stringified numbers
const strArray = numArray.map((n) => String(n));
// objects: { value: number }
const objArray = numArray.map((n) => ({ value: n }));

// sort numbers (default, lexicographic)
Deno.bench(
  "sort numbers default",
  { group: "array-sort", baseline: true },
  () => {
    const copy = numArray.slice();
    copy.sort();
    if (copy.length === -1) console.log(copy.length);
  },
);

// sort numbers with comparator (numeric)
Deno.bench("sort numbers numeric", { group: "array-sort" }, () => {
  const copy = numArray.slice();
  copy.sort((a, b) => a - b);
  if (copy.length === -1) console.log(copy.length);
});

// sort strings (default)
Deno.bench("sort strings", { group: "array-sort" }, () => {
  const copy = strArray.slice();
  copy.sort();
  if (copy.length === -1) console.log(copy.length);
});

// sort objects by value
Deno.bench("sort objects by value", { group: "array-sort" }, () => {
  const copy = objArray.slice();
  copy.sort((a, b) => a.value - b.value);
  if (copy.length === -1) console.log(copy.length);
});
