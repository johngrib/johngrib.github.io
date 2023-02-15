---
layout  : wiki
title   : SEGMENT 40196
summary : SIGNAL PATTERN DETECTOR
date    : 2023-02-15 22:22:49 +0900
updated : 2023-02-15 22:33:02 +0900
tag     : 
resource: 28/5401E2-1F73-4651-BED5-CA8B652BF271
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
- LOOK FOR THE PATTERN 0,0,0
- WRITE 1 WHEN PATTERN IS FOUND
- IF NOT TRUE, WRITE 0 INSTEAD

- IN으로 들어오는 값을 읽는다.
- IN이 0,0,0 패턴인지 식별한다.
- 패턴이 맞으면 1을 출력한다.
- 아니면 0을 출력한다.

![image]( /resource/28/5401E2-1F73-4651-BED5-CA8B652BF271/219039957-72ec904c-a848-4be5-9638-a724a6875198.png )

## 풀이 1

- 177 CYCLES / 4 NODES / 15 INSTR

4개의 노드를 사용하는 방법이다.

![image]( /resource/28/5401E2-1F73-4651-BED5-CA8B652BF271/219040595-59868559-2571-4853-8576-374442800bf0.png )

[save/40196.1.txt]( https://github.com/johngrib/TIS-100-solutions/blob/master/save/40196.1.txt )

```tis-100
@0


@1
^:
 MOV 0, DOWN    # 무조건 0을 출력한다.
 MOV UP, ACC    # IN 을 입력받아 더한다.
 JNZ ^          # 더한 결과가 0 이 아니라면 처음으로 돌아간다.

 MOV 0, DOWN    # 더한 결과가 0 이라면 0 패턴. 0을 출력한다.
 ADD UP         # IN을 입력받아 더한다.
 JNZ ^          # 처음으로 돌아간다.

00:         # 00 인 경우
 ADD UP     # IN 을 입력받아 더한다
 JEZ 000    # 더한 결과가 0 이면 goto 000
 MOV 0, DOWN
 JNZ ^

000:        # 000 패턴인 경우
 MOV 1, DOWN    # 1을 출력한다
 JMP 00         # goto 00

@2


@3


@4
MOV UP, DOWN

@5


@6


@7


@8
MOV UP, RIGHT

@9
MOV LEFT, DOWN

@10
```

