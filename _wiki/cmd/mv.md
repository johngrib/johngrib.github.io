---
layout  : wiki
title   : mv 명령어
summary : 파일을 옮긴다
date    : 2020-04-18 23:08:16 +0900
updated : 2022-01-13 22:53:06 +0900
tag     : bash command
resource: 80/3C0DB7-6376-448D-94B9-C4C8452D1E9F
toc     : true
public  : true
parent  : [[cmd]]
latex   : false
---
* TOC
{:toc}

## 사용 방법

mv 명령은 두 가지 사용법이 있다.

- 파일 이름을 변경하는 경우

```
mv file1 file2
```

- 하나 이상의 파일을 디렉토리로 옮기는 경우

```
mv file1 directory
mv file1 file2 directory
mv file1 file2 file3 ... directory
```



## Examples

### 파일 이름 바꾸기

```sh
# a.txt 파일명을 b.txt 로 바꾼다
mv a.txt b.txt
mv {a,b}.txt
mv a.txt !#:1:s/a/b
```

위의 세 방법은 모두 동일한 결과를 낸다.

### 파일을 특정 디렉토리로 옮기기

```sh
# dir 디렉토리가 존재하고 있다면 file1 파일을 dir 디렉토리로 옮긴다
mv file1 dir
```

```sh
# file1 file2 file3 을 dir 디렉토리로 옮긴다.
mv file1 file2 file3 dir
mv file{1,2,3} dir
mv file{1..3} dir
```

### 덮어쓰기 관련 옵션들

- `-i`: 덮어쓰기 전에 y/n 을 질문한다.

```sh
# b.txt 파일이 있다면, 덮어쓰기 전에 `overwrite? y/n`을 질문한다.
$ mv -i a.txt b.txt
```

- `-n`: 절대로 덮어쓰지 않는다.

```sh
# b.txt 파일이 이미 있다면, 아무 일도 하지 않는다. 결과에 대해 출력도 하지 않는다.
$ mv -n a.txt b.txt
```

### 결과 보고

`-v` 옵션을 사용하면 결과를 짧게 보고해 준다.
`v`는 `verbose`를 의미하는데 과묵한 `mv`를 수다스럽게 만드는 옵션이라 생각하면 재미있다.

```sh
# c.txt 파일을 f.txt 파일로 이동했다고 알려준다.
$ mv -v c.txt f.txt
c.txt -> f.txt
```
