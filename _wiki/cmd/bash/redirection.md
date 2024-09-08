---
layout  : wiki
title   : Redirection
summary : 
date    : 2024-09-08 18:04:28 +0900
updated : 2024-09-08 18:42:44 +0900
tag     : 
resource: 6A/F4F3BE-8A64-4517-AB92-A96FB1F59A46
toc     : true
public  : true
parent  : [[/cmd/bash]]
latex   : false
---
* TOC
{:toc}

## man

```bash
man bash
```

## Examples

### Redirection

```bash
ls > dirlist 2>&1
```

- `ls` 명령어의 표준 출력을 `dirlist` 파일로 리다이렉트한다.
- 표준 에러를 표준 출력으로 리다이렉트한다.

```bash
ls 2>&1 > dirlist
```

- 표준 에러를 표준 출력으로 리다이렉트한다.
- `ls` 명령어의 표준 출력을 `dirlist` 파일로 리다이렉트한다.

### Redirecting Input

```bash
sort < file1.txt
```

- `file1.txt` 파일을 `sort` 명령어의 표준 입력으로 리다이렉트한다.
- 위의 명령은 `sort file1.txt` 과 동일하며, `cat file1.txt | sort` 와도 같다.

```bash
sort < file1.txt > sort-result.txt
```

- `< file1.txt` : `file1.txt` 파일을 `sort` 명령어의 표준 입력으로 리다이렉트한다.
- `> sort-result.txt` : `sort` 명령어의 표준 출력을 `sort-result.txt` 파일로 리다이렉트한다.

### Redirecting Output

```bash
ls > dirlist
```

### Appending Redirected Output

```bash
ls >> dirlist
```

### Redirecting Standard Output and Standard Error

표준 출력과 표준 에러 출력을 리다이렉트하는 방법은 두 가지 형식이 있다.

1. `&>word`
2. `>&word`

이 둘 중에서 일반적으로 첫번째 형식이 선호되는 편이다.

한편, 첫번째 형식은 다음과 의미가 똑같다.

```bash
>word 2>&1
```

### Appending Standard Output and Standard Error

```bash
&>>word
```

위의 형식은 다음과 의미가 똑같다.

```bash
>>word 2>&1
```

### Here Documents

`<<` 뒤에 명시한 delimiter로만 이루어진 라인이 나타날 때까지 키보드 입력을 받는다.

```bash
$ cat << EOF
> Hello world!
> Hi World!
> EOF
Hello world!
Hi World!
```

- delimiter로 `EOF`를 지정했다.
- 키보드로 `Hello world!`와 `Hi World!`를 입력했다.
- 마지막에 `EOF`를 입력하자 입력이 종료됐고, `cat` 명령어는 입력된 내용을 출력했다.

### Here Strings

`<<<` 뒤에 명시한 문자열을 명령어의 표준 입력으로 사용한다.

주의: `<`는 파일 이름을 지정하지만, `<<<`는 문자열을 지정한다.

```bash
cat <<< $PWD
cat <<< "Hello, World!"
```

### Duplicating File Descriptors

생략

### Moving File Descriptors

생략

### Opening File Descriptors for Reading and Writing

생략


## 함께 읽기

- [[/cmd/dev/fd]]

