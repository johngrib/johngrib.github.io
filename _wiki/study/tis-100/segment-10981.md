---
layout  : wiki
title   : SEGMENT 10981
summary : SIGNAL AMPLIFIER
date    : 2023-01-30 20:09:08 +0900
updated : 2023-01-30 20:24:13 +0900
tag     : 
resource: 61/0E521D-145F-40FA-B330-B3BFFE091693
toc     : true
public  : true
parent  : [[/study/tis-100]]
latex   : false
---
* TOC
{:toc}

## 문제

>
- READ A VALUE FROM IN.A
- DOUBLE THE VALUE
- WRITE THE VALUE TO OUT.A

- `IN.A`로 들어오는 값을 읽는다.
- 값을 두 배로 만든다.
- `OUT.A`로 값을 출력한다.

![image]( /resource/61/0E521D-145F-40FA-B330-B3BFFE091693/215461789-c4ab21dc-b77a-4503-ab0f-5f364be0ce97.png )

## 풀이 1

노드를 4개만 사용하는 방법이다.

- 노드 중 하나를 선택한다.
- 주어진 값을 받아서 `ACC`에 할당하고, `ADD ACC`로 `ACC`의 값을 두 배로 만들면 된다.
- 나머지 노드는 두배가 된 값을 파이프처럼 이동시키기만 하면 된다.

쉽게 표현하자면 다음과 같다.

```js
ACC = LEFT
ACC += ACC
DOWN = ACC
```

- 160 CYCLES, 4 NODES, 6 INSTR

![image]( /resource/61/0E521D-145F-40FA-B330-B3BFFE091693/215462742-a7add5f6-1380-45f2-9884-49dd116c162b.png )

[save/10981.0.txt]( https://github.com/johngrib/TIS-100-solutions/blob/master/save/10981.0.txt )

```tis-100
@0


@1
MOV UP, RIGHT

@2
MOV LEFT, ACC
ADD ACC
MOV ACC, DOWN

@3


@4


@5
MOV UP, DOWN

@6


@7


@8
MOV UP, DOWN

@9
```


## 풀이 2

덧셈 연산을 두 개의 노드로 병렬화해서 푸는 방법이다.

- 홀수번째로 입력되는 숫자는 오른쪽 노드로 보내고, 짝수번째로 입력되는 숫자는 아래쪽 노드로 보낸다.
- 오른쪽 노드와 아래쪽 노드는 각각 입력받은 값을 "풀이 1"과 같이 2배 하여 오른쪽 아래 노드로 보낸다.
- 두 노드를 취합하는 오른쪽 아래 노드는 위에서 값이 입력되면 아래로 보낸 다음, 왼쪽에서 값이 입력되면 아래로 보낸다.

이렇게 하면 84 CYCLES로 해결이 된다.

- 84 CYCLES, 5 NODES, 11 INSTR

![image]( /resource/61/0E521D-145F-40FA-B330-B3BFFE091693/215462911-3f098ece-ee5b-4db4-bf63-21ea19539ca5.png )

[save/10981.1.txt]( https://github.com/johngrib/TIS-100-solutions/blob/master/save/10981.1.txt )

```tis-100
@0
# 84 CYCLES
#  5 NODES
# 11 INSTR

# GET PARALLELIZE

@1
MOV UP, RIGHT
MOV UP, DOWN

@2
MOV LEFT, ACC
ADD ACC
MOV ACC, DOWN

@3


@4
MOV UP, ACC
ADD ACC
MOV ACC, RIGHT

@5
MOV UP, DOWN
MOV LEFT, DOWN

@6


@7


@8
MOV UP, DOWN

@9
```

