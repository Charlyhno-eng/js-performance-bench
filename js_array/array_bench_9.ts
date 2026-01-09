const N = 1_000_000;
const arr = Array.from({ length: N }, (_, i) => i);
const target = N - 1;

// arr.includes(x)
Deno.bench("includes", { group: "array-search", baseline: true }, () => {
  const found = arr.includes(target);
  if (found === null) console.log(found);
});

// arr.indexOf(x)
Deno.bench("indexOf", { group: "array-search" }, () => {
  const index = arr.indexOf(target);
  if (index === -2) console.log(index);
});

// for loop search
Deno.bench("for search", { group: "array-search" }, () => {
  let found = false;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      found = true;
      break;
    }
  }
  if (found === null) console.log(found);
});
