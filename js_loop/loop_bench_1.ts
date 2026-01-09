const N = 100;
const arr = Array.from({ length: N }, (_, i) => i);

// for index loop
Deno.bench("for index 100", { group: "loops", baseline: true }, () => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
});

// while loop
Deno.bench("while 100", { group: "loops" }, () => {
  let sum = 0;
  let i = 0;
  while (i < arr.length) {
    sum += arr[i];
    i++;
  }
});

// for of loop
Deno.bench("for...of 100", { group: "loops" }, () => {
  let sum = 0;
  for (const v of arr) {
    sum += v;
  }
});

// foreach of loop
Deno.bench("forEach 100", { group: "loops" }, () => {
  let sum = 0;
  arr.forEach((v) => {
    sum += v;
  });
});

// map method loop
Deno.bench("map 100", { group: "loops" }, () => {
  let sum = 0;
  arr.map((v) => {
    sum += v;
    return v;
  });
});

// reduce method loop
Deno.bench("reduce 100", { group: "loops" }, () => {
  const sum = arr.reduce((acc, v) => acc + v, 0);
});
