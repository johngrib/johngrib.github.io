---
layout  : wiki
title   : SEGMENT 21340
summary : SIGNAL COMPARATOR
date    : 2023-02-01 23:03:15 +0900
updated : 2023-02-01 23:24:46 +0900
tag     : 
resource: 81/DCACDF-1714-4D1C-8279-02ED7523B60B
toc     : true
public  : true
parent  : [[/study/tis-100]]
latex   : false
---
* TOC
{:toc}

## 문제

>
- READ A VALUE FROM IN
- WRITE 1 TO OUT.G IF IN > 0
- WRITE 1 TO OUT.E IF IN = 0
- WRITE 1 TO OUT.L IF IN < 0
- WHEN A 1 IS NOT WRITTEN TO AN OUTPUT, WRITE A 0 INSTEAD

- IN으로 들어오는 값을 읽어서
- 값 > 0 이면 OUT.G에 1을 쓰고
- 값 = 0 이면 OUT.E에 1을 쓰고
- 값 < 0 이면 OUT.L에 1을 쓰며
- 출력이 1이 아닌 경우에는 0을 쓴다.

![image]( /resource/81/DCACDF-1714-4D1C-8279-02ED7523B60B/216065030-c97c824c-41dc-4f34-ba85-1463edad9ea2.png )

## 풀이

- 278 CYCLES / 6 NODES / 20 INSTR

![image]( /resource/81/DCACDF-1714-4D1C-8279-02ED7523B60B/solution1.jpg )

`@5`까지 값을 이동시킨 다음 `@6`, `@7`, `@8`에서 각자 `0`과 비교한 결과를 아래로 내보내게 하면 된다.

- `@6`은 받은 값을 `ACC`에 저장하고, 오른쪽에 있는 `@7`로 넘겨준다.
    - `ACC`가 `0`보다 크면 아래(`OUT.G`)로 `1`을 내보내고, 그렇지 않으면 `0`을 내보낸다.
- `@7`은 받은 값을 `ACC`에 저장하고, 오른쪽에 있는 `@8`로 넘겨준다.
    - `ACC`가 `0`과 같으면 아래(`OUT.E`)로 `1`을 내보내고, 그렇지 않으면 `0`을 내보낸다.
- `@8`은 받은 값을 `ACC`에 저장한다.
    - `ACC`가 `0`보다 작으면 아래(`OUT.L`)로 `1`을 내보내고, 그렇지 않으면 `0`을 내보낸다.

이번 문제에서는 `JGZ`, `JEZ`, `JLZ`를 사용하였는데 각각 다음과 같은 의미를 갖고 있다.

- `JGZ lable` : `ACC` 값이 0보다 크면 `goto lable`
- `JEZ lable` : `ACC` 값이 0과 같으면 `goto lable`
- `JLZ lable` : `ACC` 값이 0보다 작으면 `goto lable`

이해를 돕기 위해 아래 코드의 세 노드에 주석을 적어두었다.

[save/21340.0.txt]( https://github.com/johngrib/TIS-100-solutions/blob/master/save/21340.0.txt )

```tis-100
@0
MOV UP, DOWN

@1


@2


@3


@4
MOV UP, DOWN

@5
MOV UP, RIGHT

@6
START:
MOV LEFT, ACC   # 왼쪽에서 값을 넘겨받아 ACC에 저장
MOV ACC, RIGHT  # ACC에 저장된 값을 오른쪽으로 넘겨준다

JGZ POSITIVE    # ACC가 0보다 크면 goto POSITIVE

MOV 0, DOWN     # ACC가 0보다 크지 않다면 0 을 아래로 내보낸다
JMP START       # goto START

POSITIVE:
MOV 1, DOWN     # 1을 아래로 내보낸다

@7
START:
MOV LEFT, ACC   # 왼쪽에서 값을 넘겨받아 ACC에 저장
MOV ACC, RIGHT  # ACC에 저장된 값을 오른쪽으로 넘겨준다

JEZ ZERO        # ACC가 0이면 goto ZERO

MOV 0, DOWN     # ACC가 0이 아니면 0 을 아래로 내보낸다
JMP START       # goto START

ZERO:
MOV 1, DOWN     # 1을 아래로 내보낸다

@8
START:
MOV LEFT, ACC   # 왼쪽에서 값을 넘겨받아 ACC에 저장

JLZ NEGATIVE    # ACC가 0보다 작으면 goto NEGATIVE

MOV 0, DOWN     # ACC가 0보다 작지 않다면 0 을 아래로 내보낸다
JMP START       # goto START

NEGATIVE:
MOV 1, DOWN     # 1을 아래로 내보낸다
```
