# Comparison of different uses and transformations on the arrays

## Array bench 1 - Array iteration: for vs for...of vs forEach

This benchmark compares the performance of three ways to iterate over the same large array: a classic indexed `for` loop, a `for...of` loop using the array’s iterator, and the `Array.prototype.forEach` method that calls a callback for each element, all performing the same summation work.

### Result

| benchmark       | avg time/iter | iter/s | min … max          | p75      | p99      | p995     |
| --------------- | ------------- | ------ | ------------------ | -------- | -------- | -------- |
| array for index | 0.88 ms       | 1,134  | 0.62 ms … 2.80 ms  | 0.99 ms  | 2.00 ms  | 2.00 ms  |
| array for...of  | 6.20 ms       | 161    | 5.70 ms … 11.00 ms | 6.20 ms  | 11.00 ms | 11.00 ms |
| array forEach   | 9.80 ms       | 102    | 7.20 ms … 12.30 ms | 10.70 ms | 12.30 ms | 12.30 ms |

**Summary**

- `array for index` is about **7.1× faster** than `array for...of` on this workload.
- `array for index` is about **11.1× faster** than `array forEach` on this workload.

## Array bench 2 - Array sum: for vs reduce

This benchmark compares two ways to compute the sum of all elements in a large array: a classic indexed `for` loop that accumulates the result imperatively, and the higher-level `Array.prototype.reduce` method that performs the same accumulation via a callback function.

### Result

| benchmark        | avg time/iter | iter/s | min … max         | p75     | p99     | p995    |
| ---------------- | ------------- | ------ | ----------------- | ------- | ------- | ------- |
| array sum for    | 0.92 ms       | 1,087  | 0.63 ms … 3.10 ms | 1.10 ms | 2.10 ms | 2.30 ms |
| array sum reduce | 6.20 ms       | 161    | 5.60 ms … 9.20 ms | 6.50 ms | 9.20 ms | 9.20 ms |

**Summary**

- `array sum for` is about **6.8× plus rapide** que `array sum reduce` sur cette charge de travail.

## Array bench 3 - Map + filter vs single-pass variants

This benchmark compares several ways to implement the same “map then filter” transformation on a large array: chaining `map().filter()`, performing the work in a single `for` loop, using a single `forEach`, using `reduce` to combine mapping and filtering into one pass, and using `flatMap` to express filter+map in a single higher-order operation, all to highlight the overhead of intermediate arrays and callbacks versus single-pass imperative approaches.

### Result

| benchmark           | avg time/iter | iter/s | min … max         | p75     | p99     | p995    |
| ------------------- | ------------- | ------ | ----------------- | ------- | ------- | ------- |
| map + filter chain  | 32.3 ms       | 30.9   | 29.4 ms … 42.4 ms | 32.6 ms | 42.4 ms | 42.4 ms |
| for single pass     | 15.1 ms       | 66.3   | 13.0 ms … 35.5 ms | 15.1 ms | 35.5 ms | 35.5 ms |
| forEach single pass | 16.3 ms       | 61.3   | 14.0 ms … 21.2 ms | 18.1 ms | 21.2 ms | 21.2 ms |
| reduce map+filter   | 15.0 ms       | 66.7   | 14.1 ms … 18.4 ms | 15.1 ms | 18.4 ms | 18.4 ms |
| flatMap map+filter  | 30.4 ms       | 32.9   | 26.5 ms … 42.7 ms | 31.9 ms | 42.7 ms | 42.7 ms |

**Summary**

- `map + filter chain` is about **2.15× slower** than `reduce map+filter` on this workload.
- `map + filter chain` is about **2.14× slower** than `for single pass` and **1.98× slower** than `forEach single pass`.
- `map + filter chain` is still **1.06× slower** than `flatMap map+filter`.

## Array bench 4 - filter → map → reduce vs single-pass variants

This benchmark compares different ways to combine filtering, mapping, and reducing on the same array: two higher-order chains with different operation orders (`filter → map → reduce` vs `map → filter → reduce`), and three single-pass implementations using `for`, `forEach`, and `reduce` that perform filter, map, and sum in one loop, highlighting how operation ordering and number of passes affect performance and allocations.

### Result

| benchmark             | avg time/iter | iter/s | min … max         | p75     | p99     | p995    |
| --------------------- | ------------- | ------ | ----------------- | ------- | ------- | ------- |
| filter → map → reduce | 22.9 ms       | 43.7   | 19.1 ms … 32.6 ms | 23.5 ms | 32.6 ms | 32.6 ms |
| map → filter → reduce | 40.4 ms       | 24.8   | 37.2 ms … 44.1 ms | 41.0 ms | 44.1 ms | 44.1 ms |
| for single pass       | 3.3 ms        | 306.8  | 2.2 ms … 5.0 ms   | 3.5 ms  | 4.9 ms  | 5.0 ms  |
| forEach single pass   | 7.5 ms        | 133.0  | 6.1 ms … 9.2 ms   | 8.1 ms  | 9.2 ms  | 9.2 ms  |
| reduce single pass    | 7.6 ms        | 131.1  | 5.8 ms … 9.2 ms   | 8.1 ms  | 9.2 ms  | 9.2 ms  |

**Summary**

- `filter → map → reduce` is about **7.01× slower** than `for single pass` on this workload.
- `filter → map → reduce` is about **3.04× slower** than `forEach single pass` and **3.00× slower** than `reduce single pass`.
- `filter → map → reduce` is about **1.77× faster** than `map → filter → reduce`.

## Array bench 5 - Array filtering variants

This benchmark compares multiple ways to implement the same filtering logic on a large array: the dedicated `Array.prototype.filter` method, an imperative `for` loop that pushes matching values, a `forEach` loop with the same behavior, a `reduce` call that emulates filtering by accumulating matching elements into a new array, and a `flatMap` variant that returns either a one-element array or an empty array to simulate filter-like behavior, allowing you to see the cost of different styles and abstractions for equivalent work.

### Result

| benchmark         | avg time/iter | iter/s | min … max         | p75     | p99     | p995    |
| ----------------- | ------------- | ------ | ----------------- | ------- | ------- | ------- |
| filter            | 13.5 ms       | 74.0   | 9.5 ms … 20.1 ms  | 14.2 ms | 20.1 ms | 20.1 ms |
| for loop          | 7.4 ms        | 135.8  | 5.1 ms … 10.2 ms  | 7.9 ms  | 10.2 ms | 10.2 ms |
| forEach           | 12.5 ms       | 79.8   | 10.4 ms … 14.8 ms | 13.5 ms | 14.8 ms | 14.8 ms |
| reduce-as-filter  | 12.7 ms       | 78.5   | 10.9 ms … 14.7 ms | 13.5 ms | 14.7 ms | 14.7 ms |
| flatMap-as-filter | 18.8 ms       | 53.3   | 15.4 ms … 30.8 ms | 20.2 ms | 30.8 ms | 30.8 ms |

**Summary**

- `filter` is about **1.84× slower** than a plain `for` loop on this workload and slightly slower than `forEach` (**1.08×**) and `reduce-as-filter` (**1.06×**). [web:26]
- `filter` is about **1.39× faster** than `flatMap-as-filter`.

## Array bench 6 - Array creation variants

This benchmark compares two ways to create and initialize a large array of sequential numbers: using `Array.from` with a mapping function that generates all values in one call, and using `new Array(N)` followed by an explicit `for` loop that fills each index, highlighting the cost of the higher-level constructor versus manual allocation and assignment.

### Result

| benchmark       | avg time/iter | iter/s | min … max         | p75     | p99     | p995    |
| --------------- | ------------- | ------ | ----------------- | ------- | ------- | ------- |
| Array.from      | 39.3 ms       | 25.4   | 36.9 ms … 44.4 ms | 40.1 ms | 44.4 ms | 44.4 ms |
| new Array + for | 3.0 ms        | 332.5  | 2.3 ms … 4.9 ms   | 3.3 ms  | 4.8 ms  | 4.9 ms  |

**Summary**

- `Array.from` is about **13.07× slower** than `new Array + for` on this workload.

## Array bench 7 - Array filling variants

This benchmark compares two strategies for building a new array from existing data: starting from an empty array and repeatedly growing it with `push` in a loop, versus pre-allocating the target array to the final size and filling it by direct index assignment, which can reduce reallocation and capacity growth overhead.

### Result

| benchmark           | avg time/iter | iter/s | min … max        | p75     | p99     | p995    |
| ------------------- | ------------- | ------ | ---------------- | ------- | ------- | ------- |
| push in loop        | 13.2 ms       | 75.7   | 9.9 ms … 25.4 ms | 15.4 ms | 25.4 ms | 25.4 ms |
| pre-allocated index | 3.2 ms        | 315.7  | 2.8 ms … 5.2 ms  | 3.5 ms  | 5.2 ms  | 5.2 ms  |

**Summary**

- `push in loop` is about **4.17× slower** than using a **pre-allocated array with direct index assignment** on this workload.

## Array bench 8 - Array initialization variants

This benchmark compares two ways to initialize a large array with the same value: using the built-in `Array.prototype.fill` method to set all elements to `0` in a single call, and manually assigning `0` to each index in an explicit `for` loop, revealing any overhead differences between the optimized native helper and a hand-written loop.

### Result

| benchmark       | avg time/iter | iter/s | min … max       | p75    | p99    | p995   |
| --------------- | ------------- | ------ | --------------- | ------ | ------ | ------ |
| Array.fill      | 3.4 ms        | 293.5  | 2.3 ms … 4.9 ms | 3.9 ms | 4.9 ms | 4.9 ms |
| for assign each | 3.3 ms        | 302.2  | 2.2 ms … 5.7 ms | 3.8 ms | 5.7 ms | 5.7 ms |

**Summary**

- `Array.fill` is about **1.03× slower** than assigning each element in a `for` loop on this workload.

## Array bench 9 - Array search variants

This benchmark compares three ways to search for a specific value in a large array: using `Array.prototype.includes` to check for presence, using `Array.prototype.indexOf` to find the position of the value, and performing an explicit linear search with a `for` loop that scans the array until it finds the target, allowing you to see the relative overhead of built-in helpers versus a hand-written loop for linear lookup.

### Result

| benchmark  | avg time/iter | iter/s | min … max         | p75      | p99      | p995     |
| ---------- | ------------- | ------ | ----------------- | -------- | -------- | -------- |
| includes   | 205.7 µs      | 4,861  | 129.2 µs … 1.1 ms | 218.6 µs | 706.5 µs | 811.7 µs |
| indexOf    | 195.5 µs      | 5,115  | 120.0 µs … 1.3 ms | 197.5 µs | 758.4 µs | 887.2 µs |
| for search | 590.0 µs      | 1,695  | 354.0 µs … 2.7 ms | 635.5 µs | 1.6 ms   | 1.9 ms   |

**Summary**

- `includes` is about **1.05× slower** than `indexOf`, but about **2.87× faster** than a manual `for`-loop search on this workload.

## Array bench 10 - Linear array search vs Set / Map

This benchmark compares different lookup strategies for the same dataset: a linear scan over a sorted array with a manual `for` loop, the higher-level `Array.prototype.includes` call (also linear), and hash-based lookups using `Set.has` and `Map.has/get`, which trade some upfront construction cost for much faster, near-constant-time membership and key lookups on large collections.

### Result

| benchmark           | avg time/iter | iter/s      | min … max         | p75      | p99      | p995     |
| ------------------- | ------------- | ----------- | ----------------- | -------- | -------- | -------- |
| array linear search | 579.6 µs      | 1,725       | 339.1 µs … 1.9 ms | 646.6 µs | 1.6 ms   | 1.7 ms   |
| array includes      | 199.8 µs      | 5,006       | 120.9 µs … 1.2 ms | 208.1 µs | 750.6 µs | 914.2 µs |
| Set.has             | 3.9 ns        | 256,700,000 | 3.0 ns … 43.1 ns  | 4.2 ns   | 6.9 ns   | 10.5 ns  |
| Map.has/get         | 6.1 ns        | 163,900,000 | 4.6 ns … 43.4 ns  | 6.6 ns   | 10.7 ns  | 15.0 ns  |

**Summary**

- `array linear search` is about **148,800× slower** than `Set.has` and **94,970× slower** than `Map.has/get` on this workload.
- `array linear search` is also about **2.90× slower** than `array includes`.

## Array bench 11 - Array push/pop vs unshift/shift

This benchmark compares the cost of adding and removing elements at the end of an array versus at the beginning: one test repeatedly uses `push` and `pop` (which typically operate in constant time on the array tail), while the other uses `unshift` and `shift` (which generally require shifting many elements and are much more expensive for large arrays).

### Result

| benchmark           | avg time/iter | iter/s | min … max         | p75      | p99    | p995   |
| ------------------- | ------------- | ------ | ----------------- | -------- | ------ | ------ |
| push/pop end        | 1.2 ms        | 858.2  | 720.5 µs … 7.6 ms | 1.3 ms   | 3.1 ms | 3.8 ms |
| unshift/shift start | 1.0 s         | 1.0    | 891.3 ms … 2.0 s  | 928.5 ms | 2.0 s  | 2.0 s  |

**Summary**

- `push/pop` at the end of an array is about **873.70× faster** than `unshift/shift` at the start on this workload.

## Array bench 12 - Array copy variants

This benchmark compares four different ways to clone a large array: using `slice()` with no arguments, using the spread syntax `[...arr]`, using `Array.from(arr)`, and manually copying elements into a pre-allocated array with a `for` loop, so you can see the relative overhead of built-in cloning helpers versus an explicit indexed copy.

### Result

| benchmark       | avg time/iter | iter/s | min … max       | p75    | p99    | p995   |
| --------------- | ------------- | ------ | --------------- | ------ | ------ | ------ |
| slice copy      | 3.1 ms        | 324.0  | 2.3 ms … 5.3 ms | 3.6 ms | 4.9 ms | 5.3 ms |
| spread copy     | 2.5 ms        | 395.2  | 2.3 ms … 4.5 ms | 2.6 ms | 4.0 ms | 4.5 ms |
| Array.from copy | 2.5 ms        | 401.8  | 2.3 ms … 4.6 ms | 2.5 ms | 4.1 ms | 4.2 ms |
| for loop copy   | 2.9 ms        | 349.3  | 2.6 ms … 4.8 ms | 2.9 ms | 4.8 ms | 4.8 ms |

**Summary**

- `slice`-based copying is about **1.24× slower** than `Array.from`, **1.22× slower** than spread (`[...array]`), and **1.08× slower** than a manual `for` loop on this workload.

## Array bench 13 - Array concatenation variants

This benchmark compares three ways to concatenate two large arrays: using the built-in `arr1.concat(arr2)` method, using the spread syntax `[...arr1, ...arr2]` to create a new merged array, and manually concatenating with a `for` loop that copies elements from both arrays into a pre-allocated result array, revealing the cost of convenience APIs versus a low-level manual merge.

### Result

| benchmark       | avg time/iter | iter/s | min … max        | p75    | p99     | p995    |
| --------------- | ------------- | ------ | ---------------- | ------ | ------- | ------- |
| concat          | 2.7 ms        | 373.7  | 2.0 ms … 4.6 ms  | 3.2 ms | 4.6 ms  | 4.6 ms  |
| spread concat   | 9.7 ms        | 102.8  | 8.2 ms … 17.1 ms | 9.6 ms | 17.1 ms | 17.1 ms |
| for loop concat | 3.2 ms        | 308.8  | 2.9 ms … 5.6 ms  | 3.4 ms | 5.5 ms  | 5.6 ms  |

**Summary**

- `concat` is about **1.21× faster** than a manual `for`-loop concatenation and **3.63× faster** than spread-based concatenation on this workload.

## Array bench 14 - Array sorting variants

This benchmark compares how the built-in `Array.prototype.sort` behaves on different data types: a numeric array sorted with the default (lexicographic) behavior versus with an explicit numeric comparator, an array of strings sorted with the default string comparator, and an array of objects sorted by a specific numeric property, showing how data shape and comparator choice affect sort performance.

### Result

| benchmark             | avg time/iter | iter/s | min … max         | p75     | p99     | p995    |
| --------------------- | ------------- | ------ | ----------------- | ------- | ------- | ------- |
| sort numbers default  | 25.3 ms       | 39.5   | 20.3 ms … 28.8 ms | 27.1 ms | 28.8 ms | 28.8 ms |
| sort numbers numeric  | 22.6 ms       | 44.2   | 20.0 ms … 27.1 ms | 23.5 ms | 27.1 ms | 27.1 ms |
| sort strings          | 29.9 ms       | 33.4   | 27.8 ms … 31.8 ms | 30.9 ms | 31.8 ms | 31.8 ms |
| sort objects by value | 26.2 ms       | 38.2   | 23.4 ms … 29.0 ms | 27.0 ms | 29.0 ms | 29.0 ms |

**Summary**

- Sorting numbers with the default behavior (lexicographic) is about **1.12× slower** than using an explicit numeric comparator on this workload.
- `sort numbers default` is about **1.03× faster** than `sort objects by value` and **1.18× faster** than `sort strings`.

## Array bench 15 - Native sort vs manual implementations

This benchmark compares the performance of JavaScript’s built-in `Array.prototype.sort` (with a numeric comparator) against two hand-written sorting algorithms, a naive functional quicksort and a naive functional mergesort, all running on the same randomly generated array; it highlights how highly optimized native sort implementations generally outperform straightforward algorithm textbook implementations in real-world engines.

### Result

| benchmark        | avg time/iter | iter/s | min … max         | p75     | p99     | p995    |
| ---------------- | ------------- | ------ | ----------------- | ------- | ------- | ------- |
| native sort      | 10.2 ms       | 98.5   | 8.1 ms … 12.1 ms  | 11.0 ms | 12.1 ms | 12.1 ms |
| manual quicksort | 10.7 ms       | 93.6   | 8.5 ms … 15.8 ms  | 12.2 ms | 15.8 ms | 15.8 ms |
| manual mergesort | 12.5 ms       | 79.8   | 10.3 ms … 14.2 ms | 13.2 ms | 14.2 ms | 14.2 ms |

**Summary**

- `native sort` is about **1.05× faster** than the manual quicksort and about **1.23× faster** than the manual mergesort on this workload.
