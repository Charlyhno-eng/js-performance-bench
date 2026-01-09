const N = 1_000_000;
const arr = Array.from({ length: N }, (_, i) => i);

// slice copy
Deno.bench("slice copy", { group: "array-copy", baseline: true }, () => {
  const copy = arr.slice();
  if (copy.length === -1) console.log(copy.length);
});

// spread copy
Deno.bench("spread copy", { group: "array-copy" }, () => {
  const copy = [...arr];
  if (copy.length === -1) console.log(copy.length);
});

// Array.from copy
Deno.bench("Array.from copy", { group: "array-copy" }, () => {
  const copy = Array.from(arr);
  if (copy.length === -1) console.log(copy.length);
});

// for loop copy
Deno.bench("for loop copy", { group: "array-copy" }, () => {
  const copy = new Array<number>(arr.length);
  for (let i = 0; i < arr.length; i++) {
    copy[i] = arr[i];
  }
  if (copy.length === -1) console.log(copy.length);
});
