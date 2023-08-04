---
layout  : wiki
title   : Bash Parameters
summary : 
date    : 2023-08-04 21:01:10 +0900
updated : 2023-08-04 23:12:18 +0900
tag     : 
resource: 12/723FD0-7E4D-4050-B84C-114CB1FF5283
toc     : true
public  : true
parent  : [[/cmd/bash]]
latex   : false
---
* TOC
{:toc}

## man

이 문서에서 다루는 거의 모든 내용은 `man bash`의 `PARAMETERS`에서 읽어볼 수 있다.

## 스크립트/함수 인자 {#script-args}

- `$0`: 0번째 인자(스크립트나 명령의 이름).
- `$1`: 첫 번째 인자
- `$2`: 두 번째 인자
- `$3`: 세 번째 인자
- ...
- `$#`: `$0`을 제외한 인자의 개수
    - 즉, `$1`, `$2`, `$3`, ...의 개수

### `$*`와 `$@` {#all-args}

모든 인자를 담아두는 parameter도 있다.

- `$*`: 모든 명령행 인자를 하나의 문자열로 합쳐둔 것. 이 때, 구분자는 `$IFS`이다.
    - 즉, `"$1 $2 $3 ..."`과 같다.
- `$@`: `$*`와 비슷하지만 각 인자를 별도의 문자열로 취급한다.
    - 즉, `"$1" "$2" "$3" ...`과 같다.
    - `$*`는 인자들을 하나의 문자열로 취급하지만, `$@`는 각각의 인자를 따로 취급한다.

이 두 변수는 꽤나 헷갈리는데, `""`를 사용할 때에만 다르다는 점만 기억해두면 충분하다.

즉, `$*`와 `$@`는 똑같이 작동하지만 `"$*"`와 `"$@"`는 다르게 작동한다.

예를 들어 다음과 같은 셸 스크립트가 있다고 하자.

```bash
#!/usr/bin/env bash

echo "쌍따옴표와 for를 사용해 \$* 를 출력합니다."
for arg in "$*"; do
    echo "$arg"
done

echo ''

echo "쌍따옴표 없이 for를 사용해 \$* 를 출력합니다."
for arg in $*; do
    echo "$arg"
done

echo ''

echo "쌍따옴표와 for를 사용해 \$@를 출력합니다."
for arg in "$@"; do
    echo "$arg"
done

echo ''

echo "쌍따옴표 없이 for를 사용해 \$@를 출력합니다."
for arg in $@; do
    echo "$arg"
done
```

이 셸 스크립트에 스페이스를 포함하는 인자를 넘겨주는 테스트를 해보면 다음과 같은 결과를 볼 수 있다.

```bash
 # 인자는 3개
./test.sh "hello world"  "nice to meet you"  "I'm fine"
```

```
쌍따옴표와 for를 사용해 $* 를 출력합니다.
Hello World Nice to meet you

쌍따옴표 없이 for를 사용해 $* 를 출력합니다.
Hello
World
Nice
to
meet
you

쌍따옴표와 for를 사용해 $@를 출력합니다.
Hello World
Nice to meet you

쌍따옴표 없이 for를 사용해 $@를 출력합니다.
Hello
World
Nice
to
meet
you
```

## 최근에 실행한 명령 관련

- `$!`: 최근에 실행한 background 명령의 PID.
- `$?`: 최근 실행한 foreground 파이프라인 명령의 종료 상태(exit status).
    - `0`: 성공
    - 0 초과: 실패
- `$_`: 최근 실행한 명령의 마지막 인자.

```bash
$ echo 1 2 3
1 2 3

$ echo $_
3
```

## BASH 관련

- `$BASH`: 현재 실행중인 bash의 경로.
- `$BASH_VERSION`: 현재 실행중인 bash의 버전.
- `$BASH_SUBSHELL`: 0부터 시작하는 서브셸 깊이 카운터.

```bash
$ echo $BASH_SUBSHELL
0

$ (echo $BASH_SUBSHELL)
1

$ (echo $BASH_SUBSHELL; (echo $BASH_SUBSHELL))
1
2
```

## 프롬프트 관련

- `$PS1`: 프롬프트 문자열.
- `$PS2`: 프롬프트 문자열이 두 줄 이상일 때의 문자열.
    - default 값은 `> `.
- `$PS3`: `select` 명령에서 사용하는 프롬프트 문자열.
- `$PS4`: `set -x` 명령에서 사용하는 프롬프트 문자열.

## 현재 작업 셸 관련

- `$PPID`: 현재 셸의 부모 프로세스 ID.
- `$HOME`: 현재 사용자의 홈 디렉토리.
- `$PWD`: 현재 작업 디렉토리.
    - `cd` 명령을 사용하면 변경된다.
- `$PATH`: 명령을 찾는 경로.
    - `:`을 구분자로 사용한다.

## 명령 히스토리 관련

- `$HISTFILE`: 명령 히스토리를 저장하는 파일의 이름.
    - default 값은 `~/.bash_history`.
- `$HISTFILESIZE`: 명령 히스토리 파일에 저장할 최대 라인 수.
    - default 값은 `500`.

## 그 외

- `$RANDOM`: `0` ~ `32767` 사이의 랜덤한 정수.
- `$IFS`: 내부 필드 구분자.
    - 확장 후에 단어들을 분리하거나, 빌트인 명령어인 `read`로 읽어들인 명령행을 단어로 분리할 때 사용된다.
    - 기본값 `space` `tab` `newline`.

`$IFS`는 그냥 출력하면 값을 알 수 없다. 내 macOS 컴퓨터에서 [[/cmd/xxd]]를 사용해서 값을 16진수로 출력해보았더니 다음과 같은 값이 나왔다.

```bash
$ echo "$IFS" | xxd
00000000: 2009 0a0a
```

- `20`: Space
- `09`: TAB
- `0a`: LF

