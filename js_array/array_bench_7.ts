const N = 1_000_000;
const source = Array.from({ length: N }, (_, i) => i);

// push in a loop
Deno.bench("push in loop", { group: "array-fill", baseline: true }, () => {
  const arr: number[] = [];
  for (let i = 0; i < source.length; i++) {
    arr.push(source[i]);
  }
  if (arr.length === -1) console.log(arr.length);
});

// pre-allocated array with index assignment
Deno.bench("pre-allocated index", { group: "array-fill" }, () => {
  const arr = new Array<number>(source.length);
  for (let i = 0; i < source.length; i++) {
    arr[i] = source[i];
  }
  if (arr.length === -1) console.log(arr.length);
});
