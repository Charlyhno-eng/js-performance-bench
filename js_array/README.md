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

à tester :

Création et remplissage de tableaux

    Array.from({ length: N }, ...) vs new Array(N) + boucle de remplissage.

    ​

    arr.push dans une boucle vs arr[i] = ... avec un tableau pré-alloué.

    Array.fill (new Array(N).fill(0)) vs boucle qui assigne chaque élément.

Accès et recherche

    arr.includes(x) vs arr.indexOf(x) vs boucle for qui cherche x.

    ​

    Recherche dans un tableau trié vs Set/Map (même si tu restes focalisé sur les tableaux, tu peux comparer le coût d’un lookup linéaire vs constant-ish).

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
