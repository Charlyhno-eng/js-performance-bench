const N = 100_000;

// push then pop
Deno.bench("push/pop end", { group: "array-ends", baseline: true }, () => {
  const arr: number[] = [];
  for (let i = 0; i < N; i++) {
    arr.push(i);
  }
  for (let i = 0; i < N; i++) {
    arr.pop();
  }
  if (arr.length === -1) console.log(arr.length);
});

// unshift then shift
Deno.bench("unshift/shift start", { group: "array-ends" }, () => {
  const arr: number[] = [];
  for (let i = 0; i < N; i++) {
    arr.unshift(i);
  }
  for (let i = 0; i < N; i++) {
    arr.shift();
  }
  if (arr.length === -1) console.log(arr.length);
});
