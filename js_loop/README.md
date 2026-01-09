- Qu'est ce qui a été comparé ?
- Tableau évolution par itération : 100, 1000 et 1000000
- Qui est le meilleur et pourquoi ?

loop bench 1 :
summary
for index 100
1.06x slower than reduce 100
1.06x slower than while 100
1.03x faster than for...of 100
3.05x faster than forEach 100
5.22x faster than map 100

loop bench 2 :
summary
for index 1k
1.00x slower than while 1k
1.06x faster than reduce 1k
1.08x faster than for...of 1k
3.52x faster than forEach 1k
5.33x faster than map 1k

loop bench 3 :
summary
for index 1M
1.00x faster than while 1M
8.16x faster than for...of 1M
8.68x faster than reduce 1M
11.20x faster than forEach 1M
16.00x faster than map 1M
