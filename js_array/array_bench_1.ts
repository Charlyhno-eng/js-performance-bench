const N = 1_000_000;
const arr = Array.from({ length: N }, (_, i) => i);

// for index on array
Deno.bench("array for index", { group: "iter", baseline: true }, () => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  if (sum === -1) console.log(sum);
});

// for...of on array
Deno.bench("array for...of", { group: "iter" }, () => {
  let sum = 0;
  for (const v of arr) {
    sum += v;
  }
  if (sum === -1) console.log(sum);
});

// forEach on array
Deno.bench("array forEach", { group: "iter" }, () => {
  let sum = 0;
  arr.forEach((v) => {
    sum += v;
  });
  if (sum === -1) console.log(sum);
});
