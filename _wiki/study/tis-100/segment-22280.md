---
layout  : wiki
title   : SEGMENT 22280
summary : SIGNAL MULTIPLEXER
date    : 2023-02-02 23:15:04 +0900
updated : 2023-02-02 23:48:31 +0900
tag     : 
resource: AF/EF833F-BFB5-4F46-A98F-6B814CA8729A
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
- READ A VALUE FROM IN.S
- WRITE IN.A WHEN IN.S = -1
- WRITE IN.B WHEN IN.S = 1
- WRITE IN.A + IN.B WHEN IN.S = 0

- IN.A 와 IN.B 에서 값을 읽는다.
- IN.S 에서 값을 읽는다.
- IN.S 가 -1 이면 IN.A 를 출력한다.
- IN.S 가 1 이면 IN.B 를 출력한다.
- IN.S 가 0 이면 IN.A 와 IN.B 의 합을 출력한다.

![image]( /resource/AF/EF833F-BFB5-4F46-A98F-6B814CA8729A/216349597-e4467789-a049-4327-a062-f9cc2152f411.png )

## 풀이 1

- 272 CYCLES / 5 NODES / 16 INSTR

좀 느리긴 하지만 5개의 노드만을 사용하는 방법이다.

계산을 하는 노드는 1개 뿐이며 나머지 노드는 입출력만 한다.

![image]( /resource/AF/EF833F-BFB5-4F46-A98F-6B814CA8729A/216350933-e2652001-6c4d-4789-81f3-ffc50087e1a1.png )

[save/22280.0.txt]( https://github.com/johngrib/TIS-100-solutions/blob/master/save/22280.0.txt )

```tis-100
@0
# 272 CYCLES
# #   5 NODES
# #  16 INSTR
@1
MOV UP, RIGHT

@2
START:          # label START
MOV UP, ACC         # IN.S 를 ACC에 저장한다
JLZ NEGATIVE        # ACC가 음수이면 goto NEGATIVE
JGZ POSITIVE        # ACC가 양수이면 goto POSITIVE
MOV LEFT, ACC       # 음수양수 둘 다 아니므로 IN.A 값을 ACC 에 저장한다
ADD RIGHT               # ACC 에 IN.B 를 더한다
MOV ACC, DOWN       # IN.A + IN.B 값이 저장된 ACC를 @6 으로 내려보낸다
JMP START           # goto START

NEGATIVE:       # label NEGATIVE
MOV LEFT, DOWN      # 음수이므로 IN.A 값을 @6 으로 내려보낸다
MOV RIGHT, NIL      # IN.B 값을 버린다
JMP START           # goto START

POSITIVE:       # label POSITIVE
MOV LEFT, NIL       # IN.A 값을 버린다
MOV RIGHT, DOWN     # 양수이므로 IN.B 값을 @6 으로 내려보낸다

@3
MOV UP, LEFT

@4


@5


@6
MOV UP, DOWN

@7


@8


@9
MOV UP, DOWN

@10
```

## 풀이 2

- 204 CYCLES / 9 NODES / 23 INSTR

노드를 9개나 사용하지만 204 CYCLES 만에 해결할 수 있는 방법이다.

1. 로직의 기준이 되는 IN.S 값이 들어오면 IN.A와 IN.B와 연결된 입력 노드에 값을 전달해준다.
2. IN.A 와 연결된 노드는 IN.S 값이 양수가 아니면 값을 그대로 전달하고, 양수이면 0을 전달한다.
3. IN.B 와 연결된 노드는 IN.S 값이 음수가 아니면 값을 그대로 전달하고, 음수이면 0을 전달한다.
4. 출력 노드는 양쪽에서 전달받은 값을 더해서 출력한다.

![image]( /resource/AF/EF833F-BFB5-4F46-A98F-6B814CA8729A/216353495-dab446f3-7841-4755-b5a0-6565d58d93d5.png )

[save/22280.1.txt]( https://github.com/johngrib/TIS-100-solutions/blob/master/save/22280.1.txt )

```tis-100
@0
# 204 CYCLES
# #   9 NODES
# #  23 INSTR

@1
MOV RIGHT, ACC  # IN.S 를 받아 ACC 에 저장한다
JGZ POSITIVE    # ACC가 양수이면 goto POSITIVE
MOV UP, DOWN    # ACC가 양수가 아니면 위에서 받은 IN.A 값을 @5 로 내려보낸다
JRO -5              # goto 5줄 위로(노드 첫째줄로)

POSITIVE:
MOV 0, DOWN     # ACC가 양수이므로 0을 내려보낸다
MOV UP, NIL     # IN.A 값을 버린다

@2
MOV UP, ACC
MOV ACC, LEFT
MOV ACC, DOWN

@3
MOV UP, DOWN

@4


@5
MOV UP, DOWN

@6
MOV UP, RIGHT

@7
MOV LEFT, ACC   # IN.S 를 받아 ACC 에 저장한다

JLZ NEGATIVE    # ACC가 음수이면 goto NEGATIVE

MOV UP, DOWN    # ACC가 음수가 아니면 위에서 받은 IN.B 값을 @10 으로 내려보낸다
JRO -5              # goto 다섯줄 위로(노드 첫째줄로)

NEGATIVE:
MOV UP, NIL     # IN.B 값을 버린다
MOV 0, DOWN     # ACC가 음수이므로 0을 내려보낸다

@8
MOV UP, RIGHT

@9
MOV LEFT, ACC
ADD RIGHT       # @1 에서 보낸 값과 @3 에서 보낸 값을 더한다
MOV ACC, DOWN   # 결과를 출력한다

@10
MOV UP, LEFT
```

