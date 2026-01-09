const N = 1_000_000;
const data = Array.from({ length: N }, (_, i) => i);

// Heavy closure: captures many external variables
function makeHeavyClosure() {
  const a = 1;
  const b = 2;
  const c = 3;
  const d = 4;
  const e = 5;
  const f = { factor: 2 };
  const g = { offset: 10 };
  const h = [1, 2, 3];
  const i = "hello";
  const j = "world";

  return function (x: number): number {
    let res = x;
    res += a + b + c + d + e;
    res *= f.factor;
    res += g.offset;
    res += h[0] + h[1] + h[2];
    if (i.length > 0 && j.length > 0) {
      res ^= (i.length << 1) ^ (j.length << 2);
    }
    return res;
  };
}

// Same logic, all values passed as parameters
function heavyParamFunction(
  x: number,
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  factor: number,
  offset: number,
  h0: number,
  h1: number,
  h2: number,
  lenI: number,
  lenJ: number,
): number {
  let res = x;
  res += a + b + c + d + e;
  res *= factor;
  res += offset;
  res += h0 + h1 + h2;
  if (lenI > 0 && lenJ > 0) {
    res ^= (lenI << 1) ^ (lenJ << 2);
  }
  return res;
}

// ------------------------------------------------------------------

Deno.bench("heavy closure", { group: "closures", baseline: true }, () => {
  const fn = makeHeavyClosure();
  let acc = 0;

  for (let i = 0; i < data.length; i++) {
    acc += fn(data[i]);
  }

  if (acc === -1) console.log(acc);
});

Deno.bench("explicit params", { group: "closures" }, () => {
  const a = 1;
  const b = 2;
  const c = 3;
  const d = 4;
  const e = 5;
  const factor = 2;
  const offset = 10;
  const h0 = 1;
  const h1 = 2;
  const h2 = 3;
  const lenI = "hello".length;
  const lenJ = "world".length;

  let acc = 0;

  for (let i = 0; i < data.length; i++) {
    acc += heavyParamFunction(
      data[i],
      a,
      b,
      c,
      d,
      e,
      factor,
      offset,
      h0,
      h1,
      h2,
      lenI,
      lenJ,
    );
  }

  if (acc === -1) console.log(acc);
});
