# js-performance-bench

## 1. Why this project exists

Most JavaScript developers write code in a style that feels natural or readable, without thinking too much about raw performance. In typical web applications, this is often “good enough” and performance issues only appear under heavy load or on low-end devices.

This project explores what actually happens when different coding styles are put under pressure. It shows how seemingly small choices in loops, functions, and array operations can add up to noticeable performance differences when executed millions of times.

## 2. High-level idea : convenience APIs vs low-level loops

Modern JavaScript offers many convenient array and functional helpers like `map`, `filter`, `reduce`, `forEach`, `for...of`, and more. These abstractions are great for readability and expressiveness, but they are not always the fastest option at scale.

This benchmark suite compares those “high-level” patterns against more traditional constructs such as indexed `for` loops and simple functions. The goal is not to claim that high-level methods are always “bad”, but to make performance trade-offs visible :

- How much overhead do callbacks and chained methods introduce ?
- When does a single `for` loop outperform a chain of `map().filter().reduce()` ?
- In which hot paths does it actually matter ?

By running these benchmarks, you can see concrete numbers for yourself and decide when it is worth dropping down to more low-level, loop-based code.

## 3. How to run the benchmarks (Deno)

This project uses the Deno runtime and its built-in benchmarking tool.

1. Install Deno following the official instructions :
   https ://deno.land/#installation

2. Verify that Deno is available :

   ```bash
   deno --version
   ```

3. Clone this repository and move into it :

   ```bash
   git clone <your-repo-url>.git
   cd js-performance-bench
   ```

4. Or run a specific file (for example) :

   ```bash
   deno bench js_array/arrays_bench_1.ts
   ```

Deno will display detailed timing information and relative slowdowns/speedups for each test case, allowing you to compare styles and patterns objectively.
