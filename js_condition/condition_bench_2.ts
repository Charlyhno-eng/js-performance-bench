const N = 1_000_000;
const arr = Array.from({ length: N }, (_, i) => i);

// Common predicate
function isEven(x: number): boolean {
  return (x & 1) === 0;
}

// Classic if
function countIf(a: number[]): number {
  let even = 0;
  let odd = 0;
  let acc = 0;

  for (let i = 0; i < a.length; i++) {
    const value = a[i];

    if (isEven(value) && value > 10 && value < N - 10) {
      even++;
      acc += value * 2;
    }
  }

  return even + odd + acc;
}

// If / else
function countIfElse(a: number[]): number {
  let even = 0;
  let odd = 0;
  let acc = 0;

  for (let i = 0; i < a.length; i++) {
    const value = a[i];

    if (isEven(value) && value > 10 && value < N - 10) {
      even++;
      acc += value * 2;
    } else {
      odd++;
      acc -= value;
    }
  }

  return even + odd + acc;
}

// Ternary operator
function countTernary(a: number[]): number {
  let even = 0;
  let odd = 0;
  let acc = 0;

  for (let i = 0; i < a.length; i++) {
    const value = a[i];
    const condition = isEven(value) && value > 10 && value < N - 10;

    even += condition ? 1 : 0;
    odd += condition ? 0 : 1;
    acc += condition ? value * 2 : -value;
  }

  return even + odd + acc;
}

// Switch (simulate test on 0 / 1 plus range)
function countSwitch(a: number[]): number {
  let even = 0;
  let odd = 0;
  let acc = 0;

  for (let i = 0; i < a.length; i++) {
    const value = a[i];
    const parity = isEven(value) ? 0 : 1;

    switch (parity) {
      case 0:
        if (value > 10 && value < N - 10) {
          even++;
          acc += value * 2;
        }
        break;
      case 1:
      default:
        odd++;
        acc -= value;
        break;
    }
  }

  return even + odd + acc;
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
