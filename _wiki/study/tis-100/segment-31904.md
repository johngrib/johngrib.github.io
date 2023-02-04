---
layout  : wiki
title   : SEGMENT 31904
summary : SEQUENCE COUNTER
date    : 2023-02-04 14:59:49 +0900
updated : 2023-02-04 15:18:18 +0900
tag     : 
resource: 9C/2591CA-7E04-4C97-8B5E-9E7F7F25F093
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
- WRITE THE SUM TO OUT.S
- WRITE THE LENGTH TO OUT.L

- 시퀀스는 0으로 종료된다고 정의한다.
- IN으로 들어오는 시퀀스를 읽는다.
- 시퀀스를 이루는 수들의 합을 OUT.S로 출력한다.
- 시퀀스의 길이를 OUT.L로 출력한다.

![image]( /resource/9C/2591CA-7E04-4C97-8B5E-9E7F7F25F093/216751896-a0d34565-6e14-4e1e-b45a-7a8e6bafaaf0.png )

## 풀이 1: NODES 고려

- 337 CYCLES / 4 NODES / 25 INSTR

4개의 노드를 사용하는 방법이다.

![image]( /resource/9C/2591CA-7E04-4C97-8B5E-9E7F7F25F093/216752072-df08df6b-41e1-403d-8647-2fa448062e42.png )

[save/31904.0.txt]( https://github.com/johngrib/TIS-100-solutions/blob/master/save/31904.0.txt )

```tis-100
@0

@1
MOV UP, ACC
MOV ACC, DOWN   # 입력받은 값을 두 번 내려보낸다
MOV ACC, DOWN

@2


@3


@4
MOV UP, DOWN

@5


@6


@7


@8
 # SUM을 출력해야 하는 노드
^:
 SAV            # ACC(합계)를 BAK에 저장한다
 MOV UP, ACC    # IN 값을 ACC 에 저장한다
 JEZ 0          # ACC 가 0 이면(시퀀스가 끝났다면) goto 0

 SWP            # 시퀀스가 끝나지 않았으므로 BAK(합계)를 ACC로 가져온다
 ADD UP         # 입력값을 ACC(합계)에 더한다
 MOV 1, RIGHT   # 길이를 계산하는 @9 노드에 1을 더하라고 보내준다
 JMP ^          # goto 시작지점(^)

0:              # 0: 시퀀스가 끝났다면
 MOV UP, NIL    # @1 에서 오는 두번째 중복 입력을 버린다
 MOV 0, RIGHT   # 길이를 계산하는 @9 노드에도 종료 신호를 보내준다
 SWP            # ACC(합계) 와 BAK 를 교환한다
 MOV ACC, DOWN  # 합계를 출력한다
 MOV 0, ACC     # 다음 시퀀스를 위해 합계를 0 으로 초기화한다

@9
 # LENGTH를 출력해야 하는 노드
^:
 SAV            # ACC(길이)를 BAK에 저장한다
 MOV LEFT, ACC  # @8 노드에서 보낸 값(1 또는 0)을 ACC에 저장한다
 JEZ 0          # 시퀀스가 끝났다면(0이면) goto 0
 
 SWP            # 시퀀스가 끝나지 않았으므로 BAK(길이)를 ACC로 가져온다
 ADD 1          # 길이를 1 증가시킨다
 JMP ^          # goto 시작지점(^)

0:              # 0: 시퀀스가 끝났다면
 SWP            # ACC(길이) 와 BAK 를 교환한다
 MOV ACC, DOWN  # 길이를 출력한다
 MOV 0, ACC     # 다음 시퀀스를 위해 길이를 0 으로 초기화한다

@10
```

