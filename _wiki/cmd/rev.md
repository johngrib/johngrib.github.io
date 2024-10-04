---
layout  : wiki
title   : rev 명령어
summary : 문자열을 뒤집는다
date    : 2024-10-04 15:31:12 +0900
updated : 2024-10-04 15:33:15 +0900
tag     : 
resource: 3D/F9A6AA-9B49-40A1-B4F6-B623255D9C3D
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

`rev`는 문자열을 뒤집는 일만 한다.

```bash
$ echo hello | rev
olleh
```

```bash
$ seq 9 | xargs
1 2 3 4 5 6 7 8 9

$ seq 9 | xargs | rev
9 8 7 6 5 4 3 2 1
```

하지만 행 순서를 뒤집지는 않는다.

```bash
$ seq 3 | rev
1
2
3
```

각 행 내의 문자열 순서를 뒤집는다고 생각하면 된다.

```bash
$ seq 10 | xargs -n 2 | rev
2 1
4 3
6 5
8 7
01 9
```

