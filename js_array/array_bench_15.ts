const N = 50_000;

// random numbers array
const baseArray = Array.from({ length: N }, () =>
  Math.floor(Math.random() * N),
);

// naive quicksort implementation (functional, not in-place)
function quickSort(arr: number[]): number[] {
  if (arr.length < 2) return arr;

  const pivot = arr[0];
  const left: number[] = [];
  const right: number[] = [];

  for (let i = 1; i < arr.length; i++) {
    const value = arr[i];
    if (value < pivot) {
      left.push(value);
    } else {
      right.push(value);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

// naive merge sort implementation (functional)
function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  while (i < left.length) {
    result.push(left[i]);
    i++;
  }

  while (j < right.length) {
    result.push(right[j]);
    j++;
  }

  return result;
}

function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

// native sort with numeric comparator
Deno.bench(
  "native sort",
  { group: "sort-native-vs-manual", baseline: true },
  () => {
    const copy = baseArray.slice();
    copy.sort((a, b) => a - b);
    if (copy.length === -1) console.log(copy.length);
  },
);

// manual quicksort
Deno.bench("manual quicksort", { group: "sort-native-vs-manual" }, () => {
  const copy = baseArray.slice();
  const sorted = quickSort(copy);
  if (sorted.length === -1) console.log(sorted.length);
});

// manual mergesort
Deno.bench("manual mergesort", { group: "sort-native-vs-manual" }, () => {
  const copy = baseArray.slice();
  const sorted = mergeSort(copy);
  if (sorted.length === -1) console.log(sorted.length);
});
