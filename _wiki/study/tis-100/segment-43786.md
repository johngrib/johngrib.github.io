---
layout  : wiki
title   : SEGMENT 43786
summary : SIGNAL MULTIPLIER
date    : 2023-03-16 20:56:20 +0900
updated : 2023-03-16 21:07:52 +0900
tag     : 
resource: 79/29EE59-1452-44A4-88EA-8FCD848F3414
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
- MULTIPLY THE VALUES
- WRITE THE PRODUCT TO OUT

- IN.A 와 IN.B 의 입력값을 읽는다.
- 두 값을 곱셈한다.
- 곱셈한 결과를 OUT 으로 출력한다.

![image]( /resource/79/29EE59-1452-44A4-88EA-8FCD848F3414/225610254-9f4eb969-f78f-40b6-960a-f231b1d6f581.png )

## 풀이 1: 4 NODES

- 1541 CYCLES / 4 NODES / 21 INSTR

![image]( /resource/79/29EE59-1452-44A4-88EA-8FCD848F3414/225611240-0e07830d-7b75-4852-974c-989111eae0d3.png )

B를 A회 덧셈하는 단순한 방법으로 곱셈을 구현한다.

[save/43786.0.txt]( https://github.com/johngrib/TIS-100-solutions/blob/c87d674656ca58558e4daae6a0fdaaf234ba89d2/save/43786.0.txt )

```tis-100
@0

@1
MOV ANY, RIGHT

@2
^:
  MOV UP, ACC
  SWP
  MOV LEFT, ACC
  MOV ACC, DOWN

LOOP:
  JEZ ^
  SWP
  MOV ACC, DOWN
  SWP
  SUB 1
  JMP LOOP

@3


@4


@5
MOV UP, ACC

LOOP:
  JEZ END
  SWP
  ADD UP
  SWP
  SUB 1
  JMP LOOP

END:
  SWP
  MOV ACC, DOWN

@6


@7
MOV ANY, DOWN

@8
```
