array bench 1 :
summary
array for index
9.14x faster than array for...of
10.17x faster than array forEach

array bench 2 :
summary
array sum for
9.01x faster than array sum reduce

array bench 3 :
summary
map + filter chain
2.19x slower than for single pass
1.65x slower than reduce map+filter
1.60x slower than forEach single pass
1.22x faster than flatMap map+filter

array bench 4 :
summary
filter -> map -> reduce
8.01x slower than for single pass
2.64x slower than forEach single pass
2.54x slower than reduce single pass
1.67x faster than map -> filter -> reduce

array bench 5 :
summary
filter
1.62x slower than for loop
1.06x faster than forEach
1.10x faster than reduce-as-filter
2.00x faster than flatMap-as-filter

array bench 6 :
summary
Array.from
12.73x slower than new Array + for

array bench 7 :
summary
push in loop
3.38x slower than pre-allocated index

array bench 8:
summary
Array.fill
1.02x faster than for assign each

array bench 9 :
summary
includes
1.06x slower than indexOf
2.82x faster than for search

array bench 10 :
summary
array linear search
116900x slower than Set.has
70410x slower than Map.has/get
2.85x slower than array includes

group sorted-vs-set-map
| array linear search | 406.2 µs | 2,462 | (335.9 µs … 1.7 ms) | 473.7 µs | 746.1 µs | 1.0 ms |
| array includes | 142.3 µs | 7,027 | (127.2 µs … 1.4 ms) | 138.3 µs | 283.6 µs | 390.0 µs |
| Set.has | 3.5 ns | 287,700,000 | ( 3.0 ns … 38.1 ns) | 3.7 ns | 4.9 ns | 6.9 ns |
| Map.has/get | 5.8 ns | 173,400,000 | ( 4.6 ns … 36.8 ns) | 6.1 ns | 9.5 ns | 12.8 ns |

à tester :

Modifications et copies de tableaux

    Ajout / suppression en fin (push/pop) vs début (unshift/shift).

​

Copie de tableau :

    arr.slice()

    [...arr]

    Array.from(arr)

    boucle for qui recopie.

Concaténation : arr1.concat(arr2) vs [...arr1, ...arr2] vs boucle.

    ​

Tri et transformations plus coûteuses

    arr.sort() sur différents types (nombre, string, objets avec comparateur).

    Tri “manuel” (par ex. implémentation simple de quicksort/mergesort) vs sort natif pour voir l’écart.

Taillage / taille du tableau

    Petit tableau (1 000 éléments) vs grand (1M, 10M) pour les mêmes opérations.

    Tableaux denses (tous les indices présents) vs sparse (certains indices manquants) et impact sur les boucles.

​
