---
layout  : wiki
title   : SEGMENT 20176
summary : DIFFERENTIAL CONVERTER
date    : 2023-01-31 15:49:20 +0900
updated : 2023-01-31 16:14:45 +0900
tag     : 
resource: CB/DFAF95-3D26-4396-AD3C-303A600EED98
toc     : true
public  : true
parent  : [[/study/tis-100]]
latex   : false
---
* TOC
{:toc}

## 문제

>
- READ VALUES FROM IN.A AND IN.B
- WRITE IN.A - IN.B TO OUT.P
- WRITE IN.B - IN.A TO OUT.N

- `IN.A`와 `IN.B`로 들어오는 값들을 읽는다.
- `IN.A - IN.B`를 계산해서 `OUT.P`로 내보낸다.
- `IN.B - IN.A`를 계산해서 `OUT.N`로 내보낸다.

![image]( /resource/CB/DFAF95-3D26-4396-AD3C-303A600EED98/215687680-8cf417e8-91c1-4dd2-8fef-2920b006ca1e.png )

## 풀이 1

- 201 CYCLES / 5 NODES / 11 INSTR

`A - B`와 `B - A`의 절대값이 같다는 특징을 활용한다.

- `IN.A` 입력 노드는 값을 입력 받으면 바로 `IN.B` 입력 노드로 전달한다.
- `IN.B` 입력 노드는 입력 값을 받아 `ACC`에 저장한다.
    - `ACC`에서 `IN.A`에서 전달받은 값을 빼고, 아래 노드로 전달한다.
- `OUT.N` 출력 노드는 전달받은 값을 `ACC`에 저장한다.
    - `ACC` 값을 `OUT.P` 출력 노드로 전달한다.
    - `OUT.N` 출력 노드는 `ACC`의 값을 내보낸다.
- `OUT.P` 출력 노드는 전달받은 값을 `ACC`로 저장한다.
    - `NEG` 명령을 사용해 `ACC` 값의 부호를 뒤집는다.
    - `ACC` 값을 내보낸다.


![image]( /resource/CB/DFAF95-3D26-4396-AD3C-303A600EED98/215689113-2f056ca0-cffa-45c8-9f77-b848785ccd0b.png )

[save/20176.1.txt]( https://github.com/johngrib/TIS-100-solutions/blob/master/save/20176.1.txt )

```tis-100
@0
#201 CYCLES
#  5 NODES
# 11 INSTR

@1
MOV UP, RIGHT

@2
MOV UP, ACC
SUB LEFT
MOV ACC, DOWN #B-A

@3


@4


@5


@6
MOV UP, DOWN

@7


@8
MOV RIGHT, ACC
NEG
MOV ACC, DOWN

@9
MOV UP, ACC
MOV ACC, LEFT
MOV ACC, DOWN

@10
```

## 풀이 2

- 240 CYCLES / 5 NODES / 10 INSTR

풀이 1보다 더 많은 사이클을 돌지만 1개의 명령을 줄인 방법이다.

풀이 1과 같은 논리를 사용하지만, 풀이 1과 2는 다음과 같은 차이가 있다.

- 풀이 1
    - `OUT.N`에서 `B - A`의 값을 계산하고 내보냄.
    - `OUT.P`에서는 `-1 * (B - A)`의 값을 계산해 내보냄.
- 풀이 2
    - `OUT.N`에서 `B - A`의 값을 계산하고 내보냄.
    - `OUT.N`에서는 `-1 * (B - A)`의 값을 계산해 `OUT.P` 노드로 전달함.
    - `OUT.P`에서는 전달받은 값을 그대로 내보냄.

역할이 나뉘어있는 풀이 1이 더 적은 사이클을 사용한다(더 빠르다).

풀이 1은 더 적은 수의 명령을 사용하고 있을 뿐이다.

![image]( /resource/CB/DFAF95-3D26-4396-AD3C-303A600EED98/215691527-ff91a61e-2703-4342-9049-3fb0f6d95286.png )

[save/20176.2.txt]( https://github.com/johngrib/TIS-100-solutions/blob/master/save/20176.2.txt )

```tis-100
@0
#240 CYCLES
#  5 NODES
# 10 INSTR

@1
MOV UP, RIGHT

@2
MOV LEFT, ACC
SUB UP #A-B
MOV ACC, DOWN

@3


@4


@5


@6
MOV UP, DOWN #A-B

@7


@8
MOV RIGHT, DOWN

@9
MOV UP, ACC
MOV ACC, LEFT #B-A
NEG
MOV ACC, DOWN

@10
```

