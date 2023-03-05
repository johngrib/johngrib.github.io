---
layout  : wiki
title   : SEGMENT 41427
summary : SEQUENCE PEAK DETECTOR
date    : 2023-03-05 23:52:19 +0900
updated : 2023-03-06 00:15:32 +0900
tag     : 
resource: D7/A658E4-8E89-41EF-9A94-49199FB97360
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
- WRITE THE MIN VALUE TO OUT.I
- WRITE THE MAX VALUE TO OUT.A

- 시퀀스는 0으로 끝난다.
- IN으로 들어오는 시퀀스를 읽는다.
- 시퀀스에서 가장 작은 수를 OUT.I 로 출력한다.
- 시퀀스에서 가장 큰 수를 OUT.A 로 출력한다.

![image]( /resource/D7/A658E4-8E89-41EF-9A94-49199FB97360/222968105-e2326c12-bcc7-4df7-bacd-ae041b883b6c.png )

## 풀이 1

- 270 CYCLES / 6 NODES / 34 INSTR

![image]( /resource/D7/A658E4-8E89-41EF-9A94-49199FB97360/222969083-821ecec3-3fc1-4e74-ba9c-619b92b1447e.png )

[save/41427.0.txt]( https://github.com/johngrib/TIS-100-solutions/blob/c71b080ae79afc382778573d00c36be2b55c03b2/save/41427.0.txt )

```tis-100
@0

@1
MOV ANY, ACC
MOV ACC, DOWN
MOV ACC, RIGHT

@2
MOV ANY, DOWN

@3


@4


@5
MOV ANY, ACC
MOV ACC, DOWN  # 비교용
MOV ACC, DOWN  # 값 전달용

@6
MOV ANY, ACC
MOV ACC, DOWN  # 비교용
MOV ACC, DOWN  # 값 전달용

@7


@8
 # MIN 값을 찾는 노드
MOV 1000, ACC   # MIN 값 초기화
^:
  SAV
  SUB UP
  JLZ NEW-MIN
  MOV UP, ACC
  JEZ END-SEQ
  JMP ^

NEW-MIN:
  MOV UP, ACC
  SWP
  JMP ^

END-SEQ:
  SWP
  MOV ACC, DOWN

@9
 # MAX 값을 찾는 노드
MOV -1000, ACC  # MAX 값 초기화
^:
  SAV
  SUB UP
  JGZ NEW-MAX
  MOV UP, ACC
  JMP ^

NEW-MAX:
  MOV UP, ACC
  JEZ END-SEQ
  SWP
  JMP ^

END-SEQ:
  SWP
  MOV ACC, DOWN

@10
```
