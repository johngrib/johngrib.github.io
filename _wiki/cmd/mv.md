---
layout  : wiki
title   : mv 명령어
summary : 파일을 옮기거나 이름을 바꾼다
date    : 2020-04-18 23:08:16 +0900
updated : 2023-08-13 16:11:24 +0900
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

### 응용: 많은 수의 파일 이름을 한 번에 변경하기 {#bulk-mv}

여러 파일에 대해 `mv`를 하려 할 때는 [[/cmd/find]]의 `-exec` 옵션을 사용해 `mv`를 쓰는 것이 일반적이겠지만, `-exec`를 쓰는 것이 좀 난감할 상황에서는 이런 방법도 고려할 수 있다.

[[/cmd/pipe]]를 활용해 [[/cmd/bash]]에 넘기는 식으로 여러 파일의 이름 변경을 한 번에 처리하는 방법이다.

예를 들어보자.

다음은 [[/cmd/find]]와 [[/cmd/sed]]를 사용해 현재 디렉토리에 있는 파일들 중, 이름이 `t`로 시작하는 것들만 골라서 이름 마지막에 `_`를 붙이는 `mv` 명령 텍스트를 출력한다.

```bash
$ find . -name 't*' | sed -E 's/(.*)/mv \1 \1_/'
mv ./tt2.sh ./tt2.sh_
mv ./test.sh ./test.sh_
mv ./test-.sh ./test-.sh_
mv ./tt.sh ./tt.sh_
```

이 때 이 출력 결과를 클립보드로 복사하고, 붙여넣어서 실행하는 방법도 있겠지만 다음과 같이 [[/cmd/bash]]에 넘기는 방법도 있다.

```bash
$ find . -name 't*' | sed -E 's/(.*)/mv \1 \1_/' | bash -x
+ mv ./tt2.sh ./tt2.sh_
+ mv ./test.sh ./test.sh_
+ mv ./test-.sh ./test-.sh_
+ mv ./tt.sh ./tt.sh_
```

[[/cmd/bash]]에 준 `-x` 옵션은 실행되는 명령을 출력해준다.

만약 출력문을 보고 싶지 않다면 `-x`를 빼면 된다.

```bash
$ find . -name 't*' | sed -E 's/(.*)/mv \1 \1_/' | bash
```

마지막의 `bash`가 입력으로 받은 문자열을 명령어 구문으로 인식해 실행하기 때문에 이런 작업이 가능하다.

`bash`로 연결하지 않고 파일로 리다이렉션하거나 위와 같이 스크린에 출력해서 4개의 파일에 대한 이름 변경 작업을 미리 확인할 수도 있다.


