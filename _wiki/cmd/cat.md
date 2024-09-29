---
layout  : wiki
title   : cat 명령어
summary : concatenate and print files
date    : 2024-08-04 17:06:27 +0900
updated : 2024-09-29 20:22:07 +0900
tag     : 
resource: 42/1BFBE9-2F7D-499C-9819-37A010AFFB32
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

- `cat`은 [[/cmd/gnu-coreutils]] 중 하나이다.
- MacOS에 설치된 BSD `cat`은 버전이 낮으며, GNU `cat`에 비해 더 적은 옵션을 제공한다.

## Examples

```bash
 # 파일 내용을 출력한다
cat file
cat < file  # 이렇게 해도 된다

 # 여러 파일을 출력한다
cat file1 file2 file3

 # 줄 번호도 출력한다
cat -n file

 # stdin 을 그대로 출력한다
echo hello | cat

 # - 로 stdin 을 파일로 명시할 수 있다.
echo hello | cat - file
```

## 키보드 입력을 파일로 저장하기

```bash
cat > file
```

- 위의 명령을 입력하면 키보드 입력을 `file`에 저장할 수 있다.
- 입력을 다 했다면 `Ctrl + D`를 눌러 입력을 종료한다.

## Options

- `-b`: 공백 라인을 제외하고 줄 번호를 출력한다.
- `-e`: 각 행의 마지막을 `$`로 표시한다.
- `-n`: 줄 번호를 출력한다. (1부터 시작)
- `-s`: 여러 줄로 연속되는 공백 라인이 있다면 한 줄로 합쳐서 출력한다.
- `-t`: tab 문자를 `^I`로 출력한다.

## 함께 읽기

- [[/cmd/gnu-coreutils]]

