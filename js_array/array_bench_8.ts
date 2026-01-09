const N = 1_000_000;

// new Array(N).fill(0)
Deno.bench("Array.fill", { group: "array-init", baseline: true }, () => {
  const arr = new Array<number>(N).fill(0);
  if (arr.length === -1) console.log(arr.length);
});

// for loop assignment
Deno.bench("for assign each", { group: "array-init" }, () => {
  const arr = new Array<number>(N);
  for (let i = 0; i < N; i++) {
    arr[i] = 0;
  }
  if (arr.length === -1) console.log(arr.length);
});
