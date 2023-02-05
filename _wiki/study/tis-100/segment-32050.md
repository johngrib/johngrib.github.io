---
layout  : wiki
title   : SEGMENT 32050
summary : SIGNAL EDGE DETECTOR
date    : 2023-02-05 09:51:42 +0900
updated : 2023-02-05 13:07:49 +0900
tag     : 
resource: C4/BFB3B9-262F-4736-B9A8-3FD04A813176
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
- COMPARE VALUE TO PREVIOUS VALUE
- WRITE 1 IF CHANGED BY 10 OR MORE
- IF NOT TRUE, WRITE 0 INSTEAD
- THE FIRST OUTPUT IS ALWAYS 0

- IN으로 들어오는 값을 읽는다.
- 이전에 들어온 값과 비교한다.
- 만약 이전에 들어온 값과 현재 값의 차이가 10 이상이라면 1을 출력한다.
- 그렇지 않다면 0을 출력한다.
- (비교 대상이 없는)첫 번째 값에 대한 출력은 0 이다.

![image]( /resource/C4/BFB3B9-262F-4736-B9A8-3FD04A813176/216796027-af6e0ad5-8c35-4435-9b1e-f65d45a6db96.png )

## 풀이 1

- 265 CYCLES / 4 NODES / 15 INSTR

4개의 노드를 사용하는 방법이다.

![image]( /resource/C4/BFB3B9-262F-4736-B9A8-3FD04A813176/216799836-26e9f92b-26de-4afa-92cd-648ef005441c.png )

[save/32050.0.txt]( https://github.com/johngrib/TIS-100-solutions/blob/7dfdd91645c565809822baf486b3b48ac282badf/save/32050.0.txt )

```tis-100
@0


@1
MOV ACC, DOWN   # ACC(이전 IN값)를 내려보낸다. (ACC 초기값은 0이므로 0부터 시작.)
MOV UP, ACC     # IN값을 받아 ACC에 저장한다.
MOV ACC, DOWN   # ACC를 내려보낸다.

@2


@3


@4


@5
MOV UP, DOWN

@6


@7


@8
MOV UP, ACC     # 이전 IN 값을 받는다.
SUB UP          # 이전 IN 값에서 현재 IN 값을 뺀다.

JGZ >0      # 뺀 값이 양수이면 goto >0
NEG         # 뺀 값이 음수이면 부호를 뒤집어 양수로 만든다

>0:MOV ACC, RIGHT   # 뺀 값을 오른쪽의 @9 노드로 전달한다.

@9
^:MOV LEFT, ACC # @8 노드에서 두 IN 값의 차이를 넘겨받아 ACC에 저장한다.

SUB 10          # 10을 뺀다.

JLZ <0          # 10을 뺀 값이 음수이면 goto <0
MOV 1, DOWN     # 두 값의 차이가 10 이상이므로 1을 출력한다.
JMP ^           # @9 노드의 처음으로 돌아간다.

<0:MOV 0, DOWN  # 두 값의 차이가 10보다 작으므로 0을 출력한다.

@10
```

## 풀이 2

- 203 CYCLES / 6 NODES / 30 INSTR

입력을 교차시켜 두 개의 파이프라인으로 연결해 성능을 높인 방법이다. 파이프라인이 셋이라면 더 빠를텐데... 일단 여기에선 이렇게.

![image]( /resource/C4/BFB3B9-262F-4736-B9A8-3FD04A813176/216800535-47b14754-ccd7-485b-9087-0d3b84bf9068.png )

[save/32050.1.txt]( https://github.com/johngrib/TIS-100-solutions/blob/db070dc5d1fe06ade74989638bb4566877e80ac9/save/32050.1.txt )

```tis-100
@0

@1
               # IN을 두 번 받아서, @5와 @2에 각각 비교할 값과 함께 보낸다.
MOV ACC, DOWN  # @5 로 보내는 이전의 IN 값
MOV UP, ACC
MOV ACC, DOWN  # @5 로 보내는 현재의 IN 값

MOV ACC, RIGHT # @2 로 보내는 이전의 IN 값 (@5로 보낸 현재의 IN 값)
MOV UP, ACC
MOV ACC, RIGHT # @2 로 보내는 그 다음 IN 값

@2
MOV LEFT, ACC   # @1에서 이전의 IN 값을 받는다.
SUB LEFT        # @1에서 그 다음 IN 값을 받아 뺀다.

JGZ DIFF>0      # 두 값의 차이가 양수이면 goto DIFF>0
NEG             # 두 값의 차이가 음수이면 부호를 뒤집어 양수로 만든다.

DIFF>0:
MOV ACC, DOWN   # 두 값의 차이를 @6으로 보낸다.

@3


@4


@5
                # @5는 @2와 하는 일이 똑같다. scale out 개념.
MOV UP, ACC
SUB UP

JGZ DIFF>0
NEG

DIFF>0:

MOV ACC, DOWN

@6
^:
 MOV UP, ACC    # @2에서 두 IN 값의 차이를 받는다.

 SUB 10         # 10을 뺀다.

 JLZ DIFF<10    # 10을 뺀 값이 음수이면 goto DIFF<10
 MOV 1, DOWN    # 두 값의 차이가 10 이상이므로 1을 출력한다.

JMP ^       # @6 노드의 처음으로 돌아간다.

DIFF<10:
 MOV 0, DOWN    # 두 값의 차이가 10보다 작으므로 0을 출력한다.

@7


@8
                # @8은 @6과 하는 일이 똑같다. scale out 개념.
^:
 MOV UP, ACC
 SUB 10

 JLZ DIFF<10

 MOV 1, RIGHT

JMP ^

DIFF<10:
 MOV 0, RIGHT

@9
MOV LEFT, DOWN
MOV UP, DOWN

@10
```
