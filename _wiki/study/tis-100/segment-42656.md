---
layout  : wiki
title   : SEGMENT 42656
summary : SEQUENCE REVERSER
date    : 2023-03-16 11:01:26 +0900
updated : 2023-03-16 11:12:19 +0900
tag     : 
resource: F6/EC55A4-EF37-48AC-9DF3-FAF1A707D2BE
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
- READ A SEQUENCE FROM IN
- REVERSE THE SEQUENCE
- WRITE THE SEQUENCE TO OUT

- 시퀀스는 0으로 끝난다.
- IN으로 들어오는 시퀀스를 읽는다.
- 시퀀스를 뒤집는다.
- 뒤집은 시퀀스를 OUT으로 출력한다.

![image]( /resource/F6/EC55A4-EF37-48AC-9DF3-FAF1A707D2BE/225490840-504c9fa6-70a8-428a-8992-4193981f28ce.png )

## 풀이 1: 4 NODES

- 419 CYCLES / 4 NODES / 17 INSTR

![image]( /resource/F6/EC55A4-EF37-48AC-9DF3-FAF1A707D2BE/225491387-f45e62c3-5717-481e-b6b0-c8f7855506da.png )

- 1번 노드
    - 0 이 나올 때까지 스택에 수를 푸시한다.
    - 0 이 나오면 4번 노드에게 스택에서 수를 꺼내라고 알려준다.
- 4번 노드
    - 1번 노드와 5번 노드를 중개한다.
- 5번 노드
    - 기다리고 있다가 수를 꺼내라는 신호가 오면 스택에서 팝을 반복하며 수를 꺼내 출력 노드로 전달한다.
    - 0 이 나오면 4번 노드에게 수를 다 꺼냈다고 알려준다.

[save/42656.1.txt]( https://github.com/johngrib/TIS-100-solutions/blob/bec2089f5453c3499979648814d3d3b4a567aedb/save/42656.1.txt )

```tis-100
@0

@1
# stack에 0 을 넣어두고 시작한다
MOV 0, RIGHT

^:
  MOV UP, ACC

  JEZ END-SEQ

  MOV ACC, RIGHT
  JMP ^

END-SEQ:
  MOV 0, DOWN
  MOV DOWN, NIL
  MOV 0, RIGHT
  JMP ^

@2


@3


@4
#SEND SEQ-END SIGN
MOV UP, RIGHT
MOV RIGHT, UP

@5
^:
  MOV LEFT, NIL

OUTPUT-LOOP:
  MOV UP, ACC
  MOV ACC, DOWN
  JNZ OUTPUT-LOOP

MOV 0, LEFT

@6


@7
MOV ANY, DOWN

@8
```
