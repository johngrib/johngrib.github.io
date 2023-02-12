---
layout  : wiki
title   : SEGMENT 33762
summary : INTERRUPT HANDLER
date    : 2023-02-12 14:28:32 +0900
updated : 2023-02-12 15:07:52 +0900
tag     : 
resource: 1B/A9276A-4D6C-4BE9-98CD-A54EAECA9A67
toc     : true
public  : true
parent  : [[/study/tis-100]]
latex   : false
---
* TOC
{:toc}

## 문제

>
- READ FROM IN.1 THROUGH IN.4
- WRITE THE INPUT NUMBER WHEN THE VALUE GOES FROM 0 TO 1
- TWO INTERRUPTS WILL NEVER CHANGE IN THE SAME INPUT CYCLE

- IN.1 부터 IN.4 까지의 값을 읽는다.
- 입력값이 0에서 1로 바뀔 때, 해당 입력값의 번호를 출력한다.
- 하나의 입력 사이클에 인터럽트는 하나 뿐이다.

![image]( /resource/1B/A9276A-4D6C-4BE9-98CD-A54EAECA9A67/218294762-83c303c7-f574-41b7-af56-2994579b292d.png )

예제에 대한 설명

| IN.1 | IN.2 | IN.3 | IN.4 | OUT | OUT 값에 대한 설명 |
|------|------|------|------|-----|--------------------|
| 0    | 0    | 0    | 0    | 0   |                    |
| 0    | 0    | 0    | 0    | 0   |                    |
| 0    | 0    | 0    | 1    | 4   | IN.4 가 1로 바뀜   |
| 0    | 0    | 1    | 1    | 3   | IN.3 이 1 로 바뀜  |
| 0    | 0    | 1    | 1    | 0   |                    |
| 0    | 0    | 0    | 1    | 0   |                    |
| 1    | 0    | 0    | 1    | 1   | IN.1 이 1로 바뀜   |
| 1    | 0    | 1    | 1    | 3   | IN.3 이 1로 바뀜   |

## 풀이 1

- 319 CYCLES / 6 NODES / 33 INSTR

6개의 노드, 33개의 INSTR을 사용하는 방법이다.

![image]( /resource/1B/A9276A-4D6C-4BE9-98CD-A54EAECA9A67/218295197-da138cf8-3685-49c6-9cf3-47798fa084d4.png )

아이디어는 이렇다.

- IN.1, IN.2, IN.3, IN.4 입력을 받는 노드는 입력값이 1이라면 자신의 식별값으로 1, 2, 3, 4를 각각 전달한다.
- 이렇게 전달된 값들의 총합을 구해, 노드 하나에 `SAV` 해둔다.
- 입력 사이클 하나에서 변경되는 값은 1개 뿐이므로, 이전에 `SAV`한 값과 현재의 총합과의 차이를 구하면 된다.
    - 결과가 양수라면 그대로 출력한다.
    - 결과가 음수라면 0을 출력한다.

| IN.1 | IN.2 | IN.3 | IN.4 | SUM | OUT | OUT 값에 대한 설명        |
|------|------|------|------|-----|-----|---------------------------|
| 0    | 0    | 0    | 0    | 0   | 0   |                           |
| 0    | 0    | 0    | 0    | 0   | 0   |                           |
| 0    | 0    | 0    | 1    | 4   | 4   | 4 - 0 = 4                 |
| 0    | 0    | 1    | 1    | 7   | 3   | 7 - 4 = 3                 |
| 0    | 0    | 1    | 1    | 7   | 0   | 7 - 7 = 0                 |
| 0    | 0    | 0    | 1    | 4   | 0   | 7 - 4 = -3 이므로 OUT은 0 |
| 1    | 0    | 0    | 1    | 5   | 1   | 5 - 4 = 1                 |
| 1    | 0    | 1    | 1    | 8   | 3   | 8 - 5 = 3                 |


[save/33762.2.txt]( https://github.com/johngrib/TIS-100-solutions/blob/master/save/33762.2.txt )

```tis-100
@0
MOV UP, RIGHT

@1
^:MOV UP, ACC
JGZ ON          # IN.2 값이 1 이면 goto ON

OFF:            # IN.2 값이 0 이면..
 MOV LEFT, RIGHT    # IN.1 값(0 또는 1)을 전달해준다
 JMP ^

ON:             # IN.2 값이 1 이면
 MOV 2, ACC     # ACC에 2를 저장한다
 ADD LEFT       # IN.1 값을 더하고 @2 노드로 전달한다
 MOV ACC, RIGHT

@2
^:
 MOV UP, ACC
 JGZ ON         # IN.3 값이 1 이면 goto ON

OFF:
 MOV 0 ,ACC     # IN.3 값이 0 이면 ACC에 0을 저장한다
 JMP $

ON:             # IN.3 값이 1 이면..
 MOV 3, ACC     # ACC에 3을 저장한다

$:
 ADD LEFT
 ADD RIGHT      # IN.1 + IN.2 + IN.3 + IN.4
 MOV ACC, DOWN  # SUM 값을 @6 으로 전달한다

@3
^:MOV UP ,ACC
JGZ ON

OFF:            # IN.4 값이 0 이면..
 MOV 0, LEFT    # @2 노드에 0 을 전달한다
 JMP ^

ON:             # IN.4 값이 1 이면..
 MOV 4, LEFT    # @2 노드에 4 를 전달한다

@4


@5


@6
MOV UP, ACC

MOV ACC, DOWN   # 이전 값과 뺄셈하기 편하게 두 번 전달한다
MOV ACC, DOWN

@7


@8


@9
^:SWP   # 이전 SUM 값을 가져온다
SUB UP  # 이전 SUM 값에서 현재 입력 SUM 값을 뺀다
JLZ INC # 결과가 음수라면 SUM이 증가한 것이다 goto INC

DEC:            # SUM 이 그대로이거나 감소했다면
 MOV 0, DOWN    # 0에서 1로 변한 입력이 없는 것이다
 JMP $

INC:            # SUM 이 증가했다면
 NEG            # 음수를 양수로 바꾼다
 MOV ACC, DOWN  # 결과를 출력한다

$:
 MOV UP, ACC    # 현재 SUM을 다음 사이클에서 사용하기 위해 SAV 한다
 SAV

@10
```
