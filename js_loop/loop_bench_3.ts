const N = 1_000_000;
const arr = Array.from({ length: N }, (_, i) => i);

// for index loop
Deno.bench("for index 1M", { group: "loops", baseline: true }, () => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
});

// while loop
Deno.bench("while 1M", { group: "loops" }, () => {
  let sum = 0;
  let i = 0;
  while (i < arr.length) {
    sum += arr[i];
    i++;
  }
});

// for of loop
Deno.bench("for...of 1M", { group: "loops" }, () => {
  let sum = 0;
  for (const v of arr) {
    sum += v;
  }
});

// foreach of loop
Deno.bench("forEach 1M", { group: "loops" }, () => {
  let sum = 0;
  arr.forEach((v) => {
    sum += v;
  });
});

// map method loop
Deno.bench("map 1M", { group: "loops" }, () => {
  let sum = 0;
  arr.map((v) => {
    sum += v;
    return v;
  });
});

// reduce method loop
Deno.bench("reduce 1M", { group: "loops" }, () => {
  const sum = arr.reduce((acc, v) => acc + v, 0);
});
