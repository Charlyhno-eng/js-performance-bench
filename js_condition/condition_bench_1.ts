const N = 1_000_000;
const arr = Array.from({ length: N }, (_, i) => i);

// Common predicate
function isEven(x: number): boolean {
  return (x & 1) === 0;
}

// Classic if
function countIf(a: number[]): number {
  let count = 0;
  for (let i = 0; i < a.length; i++) {
    if (isEven(a[i])) {
      count++;
    }
  }
  return count;
}

// If / else
function countIfElse(a: number[]): number {
  let count = 0;
  for (let i = 0; i < a.length; i++) {
    if (isEven(a[i])) {
      count++;
    } else {
      // do nothing
    }
  }
  return count;
}

// Ternary operator
function countTernary(a: number[]): number {
  let count = 0;
  for (let i = 0; i < a.length; i++) {
    count += isEven(a[i]) ? 1 : 0;
  }
  return count;
}

// Switch (simule un test sur 0 / 1)
function countSwitch(a: number[]): number {
  let count = 0;
  for (let i = 0; i < a.length; i++) {
    switch (a[i] & 1) {
      case 0:
        count++;
        break;
      default:
        break;
    }
  }
  return count;
}

// ------------------------------------------------------------------

Deno.bench("if", { group: "conditions", baseline: true }, () => {
  const result = countIf(arr);
  if (result === -1) console.log(result);
});

Deno.bench("if-else", { group: "conditions" }, () => {
  const result = countIfElse(arr);
  if (result === -1) console.log(result);
});

Deno.bench("ternary", { group: "conditions" }, () => {
  const result = countTernary(arr);
  if (result === -1) console.log(result);
});

Deno.bench("switch", { group: "conditions" }, () => {
  const result = countSwitch(arr);
  if (result === -1) console.log(result);
});
