---
layout  : wiki
title   : pee 명령어
summary : 표준 입력을 팬아웃한다
date    : 2024-08-31 16:58:03 +0900
updated : 2024-08-31 17:04:39 +0900
tag     : 
resource: 7F/26AF89-2A6A-4863-A6F1-17448ACB337E
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## 개요

`pee`는 [[/cmd/moreutils]] 패키지에 포함된 명령이다.

`pee`는 [[/cmd/tee]]와 비교하기 좋은 기능을 갖고 있다.


## Examples

```bash
echo "Hello, World!" | pee "cat > file1.txt" "cat > file2.txt"
```

- 위의 명령은 [[/cmd/echo]]의 출력을 두 개의 파일로 리다이렉트한다.
- 즉, 다음의 두 명령을 실행하는 것과 같다.
  - `echo "Hello, World!" | cat > file1.txt`
  - `echo "Hello, World!" | cat > file2.txt`

```bash
ls -l | pee "wc -l" "grep .txt"
```

- 위의 명령은 다음의 두 명령을 실행하는 것과 같다.
  - `ls -l | wc -l`
  - `ls -l | grep .txt`


## 함께 읽기

- [[/cmd/tee]]

