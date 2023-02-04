---
layout  : wiki
title   : SEGMENT 30647
summary : SEQUENCE GENERATOR
date    : 2023-02-03 23:02:34 +0900
updated : 2023-02-04 14:34:47 +0900
tag     : 
resource: F1/4A6D92-1493-4952-B951-712D4C13491C
toc     : true
public  : true
parent  : [[/study/tis-100]]
latex   : false
---
* TOC
{:toc}

## 문제

>
- SEQUENCES ARE ZERO-TERMINATED
- READ VALUES FROM IN.A AND IN.B
- WRITE THE LESSER VALUE TO OUT
- WRITE THE GREATER VALUE TO OUT
- WRITE 0 TO END THE SEQUENCE

- 시퀀스는 0으로 종료된다고 정의한다.
- IN.A 와 IN.B 를 읽는다.
- 둘 중 작은 값을 OUT 으로 출력한다.
- 그리고 둘 중 더 큰 값을 OUT 으로 출력한다.
- 0을 출력해서 시퀀스를 끝낸다.

![image]( /resource/F1/4A6D92-1493-4952-B951-712D4C13491C/216624183-f243862d-c9a5-4b14-a94f-b13595167743.jpg )

## 풀이 1: CYCLES 고려

- 97 CYCLES / 7 NODES / 20 INSTR

내 풀이 중에서 가장 빠른 방법이다.

![image]( /resource/F1/4A6D92-1493-4952-B951-712D4C13491C/216625878-b3dfe8d6-0771-4c99-8568-d2930ff68dbb.png )

[save/30647.2.txt]( https://github.com/johngrib/TIS-100-solutions/blob/master/save/30647.2.txt )

```tis-100
@0

@1
MOV UP, ACC     # IN.A 입력을 ACC 에 저장한다
MOV ACC, RIGHT      # 오른쪽 @2 으로 보낸다
MOV ACC, DOWN       # 아래로 @5 로 보낸다

@2
MOV UP, ACC     # IN.B 입력을 ACC 에 저장한다
MOV ACC, RIGHT      # 오른쪽 @3 으로 보낸다
SUB LEFT        # IN.B - IN.A 를 계산해서 ACC 에 저장한다
MOV ACC, DOWN       # 뺀 값을 아래의 @6 으로 보낸다

@3
MOV LEFT, DOWN

@4


@5
MOV UP, RIGHT

@6
^:MOV UP, ACC   # @2에서 IN.B - IN.A 값을 받아 ACC 에 저장한다
JGZ $           # ACC 가 0보다 크면 goto $

                # IN.A > IN.B 인 경우
MOV RIGHT, DOWN     # IN.B 를 @8로 내려보낸다
MOV LEFT, DOWN      # IN.A 를 @8로 내려보낸다
JMP ^               # goto ^

$:              # IN.B > IN.A 인 경우
MOV LEFT, DOWN      # IN.A 를 @8로 내려보낸다
MOV RIGHT, DOWN     # IN.B 를 @8로 내려보낸다

@7
MOV UP, LEFT

@8


@9
MOV UP, DOWN    # 작은 값을 출력한다
MOV UP, DOWN    # 큰 값을 출력한다
MOV 0, DOWN     # 0 을 출력한다

@10
```

## 풀이 2: NODES 고려

- 131 CYCLES / 4 NODES / 18 INSTR

4개의 노드만을 사용하는 방법이다.

![image]( /resource/F1/4A6D92-1493-4952-B951-712D4C13491C/216629840-f2ceb134-054d-4000-9ed0-31ffe2338e7a.png )

[save/30647.1.txt]( https://github.com/johngrib/TIS-100-solutions/blob/master/save/30647.1.txt )

```tils-100
@0

@1
MOV UP, ACC     # IN.A 값을 ACC 에 저장한다
MOV ACC, RIGHT      # 오른쪽 @2 로 보낸다
MOV ACC, RIGHT      # 오른쪽 @2 로 보낸다

@2
START:
MOV UP, ACC     # IN.B 값을 ACC 에 저장한다
SAV                 # ACC 값을 BAK 에 저장한다
SUB LEFT            # IN.B - IN.A 를 ACC 에 저장한다

JLZ LESSER          # IN.B - IN.A 가 0보다 작으면(A > B 이면) goto LESSER

MOV LEFT, DOWN  # IN.A 를 @6 으로 내려보낸다
SWP                 # ACC 와 BAK 를 교환한다
MOV ACC, DOWN       # ACC 에 저장된 IN.B 를 @6 으로 내려보낸다

JMP START
LESSER: #A>B    # IN.A > IN.B 이면..
SWP                 # ACC 와 BAK 를 교환한다
MOV ACC, DOWN       # ACC 에 저장된 IN.B 를 @6 으로 내려보낸다
MOV LEFT, DOWN      # 왼쪽에서 IN.A 를 받아 @6 으로 내려보낸다

@3


@4


@5


@6
MOV UP, DOWN

@7


@8


@9
MOV UP, DOWN    # 작은 값을 출력한다
MOV UP, DOWN    # 큰 값을 출력한다
MOV 0, DOWN     # 0 을 출력한다

@10
```
