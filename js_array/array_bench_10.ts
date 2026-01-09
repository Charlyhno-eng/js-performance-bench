const N = 1_000_000;
const sortedArray = Array.from({ length: N }, (_, i) => i);
const target = N - 1;

// Pre-built Set and Map from the same values
const valueSet = new Set(sortedArray);
const valueMap = new Map<number, number>();
for (let i = 0; i < sortedArray.length; i++) {
  valueMap.set(sortedArray[i], i);
}

// linear search on sorted array (for loop)
Deno.bench(
  "array linear search",
  { group: "sorted-vs-set-map", baseline: true },
  () => {
    let found = false;
    for (let i = 0; i < sortedArray.length; i++) {
      if (sortedArray[i] === target) {
        found = true;
        break;
      }
    }
    if (found === null) console.log(found);
  },
);

// Array.includes on sorted array
Deno.bench("array includes", { group: "sorted-vs-set-map" }, () => {
  const found = sortedArray.includes(target);
  if (found === null) console.log(found);
});

// Set.has (hash-based lookup, ~O(1) average)
Deno.bench("Set.has", { group: "sorted-vs-set-map" }, () => {
  const found = valueSet.has(target);
  if (found === null) console.log(found);
});

// Map.has / Map.get (hash-based lookup, ~O(1) average)
Deno.bench("Map.has/get", { group: "sorted-vs-set-map" }, () => {
  const exists = valueMap.has(target);
  const value = valueMap.get(target);
  if (exists === null || value === -1) console.log(exists, value);
});
