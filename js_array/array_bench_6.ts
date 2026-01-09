const N = 1_000_000;

// Array.from with mapping function
Deno.bench("Array.from", { group: "array-create", baseline: true }, () => {
  const arr = Array.from({ length: N }, (_, i) => i);
  if (arr.length === -1) console.log(arr.length);
});

// new Array(N) + for loop fill
Deno.bench("new Array + for", { group: "array-create" }, () => {
  const arr = new Array<number>(N);
  for (let i = 0; i < N; i++) {
    arr[i] = i;
  }
  if (arr.length === -1) console.log(arr.length);
});
