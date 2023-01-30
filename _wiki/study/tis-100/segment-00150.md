---
layout  : wiki
title   : SEGMENT 00150
summary : SELF-TEST DIAGNOSTIC
date    : 2023-01-30 18:15:06 +0900
updated : 2023-01-30 18:16:20 +0900
tag     : 
resource: 5C/CF7112-08DF-4A47-B7DE-386EEDCE280E
toc     : true
public  : true
parent  : [[/study/tis-100]]
latex   : false
---
* TOC
{:toc}

## 문제

>
- READ A VALUE FROM IN.X AND WRITE THE VALUE TO OUT.X
- READ A VALUE FROM IN.A AND WRITE THE VALUE TO OUT.A

- `IN.X`로 들어오는 값을 읽어서 `OUT.X`로 보내라
- `IN.A`로 들어오는 값을 읽어서 `OUT.A`로 보내라

![image]( /resource/5C/CF7112-08DF-4A47-B7DE-386EEDCE280E/215427492-910fddc8-910d-4cb9-9f25-ad891092f4bf.png )

## 풀이

문제에서 요구하는대로 `IN.X`로 들어온 값을 `OUT.X`로 보내고, `IN.A`로 들어온 값을 `OUT.A`로 보내면 된다.

그림으로 표현하자면 다음과 같다.

![]( /resource/5C/CF7112-08DF-4A47-B7DE-386EEDCE280E/solution-draw.jpg )

값을 각 노드가 받아서 옮기기만 하므로 `MOV` 명령어만 사용하면 된다.

![image]( /resource/5C/CF7112-08DF-4A47-B7DE-386EEDCE280E/215428639-b54c530f-a02d-4441-9675-6cf6ac2a56a3.png )

[save/00150.1.txt](https://github.com/johngrib/TIS-100-solutions/blob/master/save/00150.1.txt )

```tis-100
@0
#BUSY LOOP
#ACHIVEMENT
MOV UP, DOWN

@1
MOV RIGHT, DOWN

@2
MOV UP, LEFT

@3
MOV UP, ACC
SAV
MOV 10000, ACC

START:
SUB 1

JEZ END
JMP START


END:
SWP
MOV ACC, DOWN

@4
MOV UP, DOWN

@5
MOV UP, DOWN

@6
MOV UP, RIGHT

@7
MOV LEFT, DOWN
```
