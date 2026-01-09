const N = 1_000_000;
const arr = Array.from({ length: N }, (_, i) => i);

// Sum with classic for loop
Deno.bench("array sum for", { group: "array-sum", baseline: true }, () => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  if (sum === -1) console.log(sum);
});

// Sum with reduce
Deno.bench("array sum reduce", { group: "array-sum" }, () => {
  const sum = arr.reduce((acc, v) => acc + v, 0);
  if (sum === -1) console.log(sum);
});
