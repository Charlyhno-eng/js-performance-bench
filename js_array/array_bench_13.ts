const N = 500_000;
const arr1 = Array.from({ length: N }, (_, i) => i);
const arr2 = Array.from({ length: N }, (_, i) => i + N);

// concat
Deno.bench("concat", { group: "array-concat", baseline: true }, () => {
  const merged = arr1.concat(arr2);
  if (merged.length === -1) console.log(merged.length);
});

// spread
Deno.bench("spread concat", { group: "array-concat" }, () => {
  const merged = [...arr1, ...arr2];
  if (merged.length === -1) console.log(merged.length);
});

// for loop
Deno.bench("for loop concat", { group: "array-concat" }, () => {
  const merged = new Array<number>(arr1.length + arr2.length);
  let idx = 0;

  for (let i = 0; i < arr1.length; i++) {
    merged[idx++] = arr1[i];
  }
  for (let i = 0; i < arr2.length; i++) {
    merged[idx++] = arr2[i];
  }

  if (merged.length === -1) console.log(merged.length);
});
