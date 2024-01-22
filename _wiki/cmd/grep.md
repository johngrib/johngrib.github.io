---
layout  : wiki
title   : grep
summary : file pattern searcher
date    : 2018-08-31 13:01:17 +0900
updated : 2024-01-22 23:19:50 +0900
tag     : bash command grep ken-tompson alfred-aho brian-kernighan
resource: E6/02C9DC-B4FA-4FD4-B205-D2D93AD4BBAF
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Syntax

```sh
grep [option] pattern [file]
```

## Examples

* 파일에서 내용 찾기

```sh
$ cat test.txt
foobar
foo
bar
baz
qux
quux
quuz
corge

$ # test.txt 파일에서 foo 문자열을 찾는다.
$ grep foo test.txt
foobar
foo
```

* `-v`, `--invert-match`: 일치하지 않는 대상을 찾는다.

```sh
$ grep -v foo test.txt
bar
baz
qux
quux
quuz
corge
```

* `-n`, `--line-number`: 검색 결과에 파일의 라인 넘버를 보여준다.

```sh
$ grep -n foo test.txt 
1:foobar
2:foo
```

* `-c`, `--count`: 검색 결과의 숫자를 센다.

```sh
$ grep -c foo test.txt 
2
```

* `-e`: 정규식 입력을 받는다.
    * `--regexp=pattern`: 긴 명령어는 이렇게 쓴다.

```sh
$ # 아래와 같이 or 검색을 하는 것도 가능하다
$ grep -e foo -e bar test.txt
foobar
foo
bar
```

- `-R`, `-r`, `--recursive`: 재귀적으로 디렉토리 트리를 탐색한다.

```sh
 # 현재 위치의 모든 하위 디렉토리의 모든 파일에서 vim 문자열을 포함하고 있는 라인을 찾아 출력한다
grep -r vim

 # _wiki 의 모든 하위 디렉토리에서 vim 문자열을 포함하고 있는 파일 이름을 출력한다
grep -r -l vim _wiki
```

## GNU grep 과 macOS의 BSD grep 비교

### GNU grep이 압도적으로 빠르다

이 wiki 리포지토리 전체에 대해 [[/cmd/find]]를 실행해 라인을 카운트하니 8956개의 파일이 있었다.

```bash
$ find . -type f | wc -l
8956
```

모든 파일에서 `test`라는 문자열을 macOS BSD `grep`으로 찾아 결과 라인을 [[/cmd/wc]]로 카운트했더니 10초가 넘게 걸렸다.

```bash
$ time grep -R test 2>/dev/null | wc -l
6502

real    0m10.762s
user    0m10.512s
sys     0m0.254s
```

GNU `grep`으로 동일한 작업을 하니 0.5초도 안 걸렸다.

```bash
$ time ggrep -R test 2>/dev/null | wc -l
6463

real    0m0.456s
user    0m0.270s
sys     0m0.190s
```

물론 GNU grep이 빠르다 해도, [[/cmd/ag]]나 [[/cmd/rg]] 같은 것들이 대부분의 경우에 2배 이상 빠르다.

### -E 로 lazy 수량자를 사용할 때 결과가 다르다

```bash
$ echo "thisis" | grep -Eo '.+?is'  # macOS BSD
this

$ echo "thisis" | ggrep -Eo '.+?is' # GNU
thisis
```

```bash
$ echo "thisis" | grep -Eo '.*?is'  # macOS BSD
this
is

$ echo "thisis" | ggrep -Eo '.*?is' # GNU
thisis
```

```bash
$ echo "thisis" | ggrep -Po '.+?is' # GNU, -P 사용
this

$ # macOS BSD grep 에는 -P 옵션이 없음
```

### -P : PCRE 사용

GNU `grep`에는 [[/regex/pcre]]{Perl 호환 정규식(PCRE)}를 사용할 수 있는 `-P` 옵션이 있다.

- `-P`, `--perl-regexp`


### GNU egrep은 GNU grep -E 로 대체되었다

GNU `egrep`을 실행하면 다음과 같이 `grep -E`를 권장한다.

```bash
$ gegrep -V
gegrep: warning: gegrep is obsolescent; using ggrep -E
ggrep (GNU grep) 3.11
Packaged by Homebrew
Copyright (C) 2023 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Written by Mike Haertel and others; see
<https://git.savannah.gnu.org/cgit/grep.git/tree/AUTHORS>.

grep -P uses PCRE2 10.42 2022-12-11
```

## 역사

> grep은 켄 톰프슨이 처음 작성한 패턴 검색 프로그램이다.[^KER-4]

### grep 이름의 의미

> grep이라는 이름은 `ed` 텍스트 편집기의 명령어인 `g/re/p`에서 왔는데,
이 명령어는 `re`부분의 정규 표현식 패턴과 일치하는 모든 행을 출력한다.
이 내용은 옥스퍼드 영어 사전의 grep 표제어에도 정확히 나와 있다(옥스퍼드 영어 사전은 grep의 가치를 인정하고 정식 영어 단어로 등록했다).
[^KER-4]

- [옥스퍼드 영어 사전의 grep]( https://www.oxfordreference.com/display/10.1093/acref/9780195392883.001.0001/m_en_us1252313 )

### 정규식과 grep

>
해법은 언어를 지정하기 위한 언어를 정의하는 것이다.
미국 수학자 스티븐 콜 클레이니<sup>Stephen Cole Kleene</sup>(1909~1994)는 1956년 이미 이런 접근 방법에 대한 수학적 기초를 놓았다.
켄 톰슨은 1968년 텍스트 편집기의 일부분으로 이런 기능을 최초로 소프트웨어로 변환했고,
그 후 유닉스 grep 유틸리티 명령을 만들었다(grep은 '정규식을 전역으로 찾아서 출력하라'라는 뜻의 영어 'globally search a regular expression and print'의 약자다).
이 명령으로 인해 정규식 regular expression 이라는 말이 널리 알려졌고, 이제는 정규식을 거의 대부분의 프로그래밍 언어에서 사용한다.
정규식 자체도 언어이기 때문에, 현재는 서로 호환이 되지 않는 몇 가지 정규식 언어가 존재한다.
정규식은 패턴 매칭<sup>pattern matching</sup>에서 중추적 역할을 한다.
[^joh-328]

### egrep {#egrep}

> 앨프리드 에이호는 `grep`을 확장해서 더 표현력이 풍부한 정규 표현식을 사용하게 하는 프로그램을 만들어 초기 유닉스에 기여했다.
예를 들면 `this|that` 같은 선택적 항목을 검색하는 기능을 지원했다.
앨프리드는 이 프로그램을 '확장된 grep'을 뜻하는 'egrep'이라고 불렀다.
>
> 여기서 egrep에 대해 좀 더 논할 필요가 있다.
egrep의 개발 비화에서 이론과 실제의 상호작용과 많은 양질의 소프트웨어 개발을 이끈 1127 센터 멤버들 간의 전형적인 상호작용을 잘 엿볼 수 있기 때문이다.
더글러스 매클로이의 이야기를 들어보자.
>
> "앨프리드 에이호의 첫 번째 egrep은 에이호가 존 홉크로프트(John Hopcroft), 제프리 울먼(Jeffrey Ullman)과 공동 저술한 'The Design and Analysis of Computer Algorithms'(Addison-Wesley, 1974)에 나오는 알고리즘을 있는 그대로 구현한 것이었지.
나는 신속히 그 코드를 달력 프로그램용으로 사용해봤네. 이 프로그램은 '오늘', '내일', '다음 근무일까지' 등 폭넓은 형식으로 표현된 날짜 패턴을 인식할 용도로 자동 생성된 방대한 정규 표현식을 이용했어.  
앨프리드의 기대화는 달리, 코드를 컴파일해서 바로 실행 가능한 인식기 프로그램을 만드는 데에는 30초 정도밖에 걸리지 않았다네.  
이후 앨프리드는 인식기를 전부 미리 만드는 대신 필요한 부분만 지연시켜서 생성하는 탁월한 전략을 생각해냈네.
덕분에 기하급수적으로 늘어나는 상태 중에서 아주 일부분만 만들어졌지.
이 전략은 엄청난 차이를 이끌어냈는데, 실제로 egrep은 다루는 패턴이 아무리 복잡하더라도 항상 빨리 실행됐어.
이처럼 egrep은 두드러질 정도로 눈부신 기술적 성과였는데, 기존 방식이 얼마나 성능이 낮았는지 알아야만 그 차이를 알 수 있었다네."
[^KER-4]

## 참고문헌

- 유닉스의 탄생 / 브라이언 커니핸 저/하성창 역 / 한빛미디어 / 2020년 08월 03일 / 원서 : UNIX: A History and a Memoir
- 한 권으로 읽는 컴퓨터 구조와 프로그래밍 / 조너선 스타인하트 저/오현석 역 / 책만 / 2021년 04월 08일 초판 1쇄 / 원서 : The Secret Life of Programs: Understand Computers -- Craft Better Code

## 주석

[^KER-4]: 유닉스의 탄생. 4장.
[^joh-328]: 한 권으로 읽는 컴퓨터 구조와 프로그래밍. 8장. 328쪽.

