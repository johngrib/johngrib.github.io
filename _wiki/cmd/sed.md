---
layout  : wiki
title   : sed
summary : stream editor
date    : 2019-11-19 10:20:19 +0900
updated : 2024-09-29 22:38:39 +0900
tag     : bash command grep
resource: 68/662004-9C4E-4E3F-BC9F-E2C2C0D50D33
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## 개요

- 리 맥마흔(Lee E. McMahon)이 개발한 스트림 에디터.
- 나는 bash에서 주로 파이프 연결을 통해 문자열 replace 하는 도구로 사용한다.
- `-E` 옵션으로 ERE를 사용할 수 있다.
    - 그러나 PCRE는 사용할 수 없다. PCRE가 필요하면 `perl -pe`를 사용한다.

## 역사

> 리 맥마흔은 [[/cmd/grep]]{grep}의 성공에 자극을 받았고,
파일에서 읽어 들인 텍스트에 대해 간단한 바꾸기 작업을 하는 유사 프로그램인 `gres`를 작성했다. `s`는 `ed` 편집기에서 바꾸기 명령어다.
리는 곧 프로그램을 더 일반화된 버전으로 대체했는데, 'Sed'(세드)라는 스트림 편집기다.
Sed는 텍스트가 입력 스트림으로 들어와서 출력 스트림으로 나가기 전까지 일련의 편집 명령어를 적용했다.
`grep`과 `gres`는 둘 다 Sed의 특별한 경우에 해당했다.
Sed가 사용하는 명령어는 표준 `ed` 텍스트 편집기에 있는 편집 명령어와 동일하다.
Sed는 요즘도 셸 스크립트에서 흔히 사용되는데, 데이터 스트림을 일정한 방식으로 변형할 때 사용된다.
문자를 교체하거나, 공백을 추가하거나, 원하지 않는 공백을 제거하거나, 불필요한 뭔가를 지우는 등의 용도로 쓰인다.
>
-- 유닉스의 탄생 5장

## GNU sed 사용하기 {#gnu-sed}

MacOS라면 [[/cmd/brew]]{brew}를 이용해 macOS에 설치할 수 있고, 이후 gsed로 사용하면 된다

```sh
brew install gnu-sed
```

## 명령줄 옵션 {#option}

- `-i` : 파일을 업데이트한다.
    - 백업 파일을 생성하지 않으려면 `-i ''` 처럼 백업 파일 확장자로 빈 문자열을 지정한다.
- `-E` : ERE를 사용한다.
- `-n` : sed는 기본적으로 입력된 모든 라인을 출력한다. 그러나 이 옵션을 사용하면 처리 결과를 출력하지 않는다. 단, `p` 명령을 사용한 경우에 한해 출력을 한다.

이외에 아래와 같은 다른 옵션들도 있긴 하지만 나는 잘 사용하지 않는다.

- `-e` : 여러 command 를 지정할 수 있다.
- `-f` : command file을 지정한다.
    - 파일명으로 `-`를 지정하면 표준 입력을 명령으로 사용한다.
- 그 외 다수

## 명령 구분자 {#command-delimiter}

`sed`의 대표격인 명령인 `s`를 예로 들어보자.

`s` 명령은 다음과 같이 사용한다.

```bash
s/regular-expression/replacement/flags
```

이 때 구분자인 `/`는 다양한 다른 기호들로 대체해서 사용할 수 있지만 몇 가지 주의할 점이 있다.

`/`는 디렉토리 경로 구분자이기 때문에 파일 경로를 `sed`로 작업할 때 `/`를 쓰면 잘 안 되거나 실수하기 좋다.

- 내가 자주 사용하는 대체 기호
    - | `|` | `,` | `#` |
- 주의할 필요가 있어서 잘 안 쓰는 대체 기호
    - `:` : `PATH` 값을 작업할 때 주의해야 한다.
    - `;` : `sed`에서 `;`는 각 명령어를 구분하는 기호이기 때문에 주의해야 한다.
    - `~` : `HOME`이 생각나서 쓰기가 좀 그렇다.
    - | `^` | `*` | `+` |
        - `sed`와 함께 많이 사용하는 정규식을 헷갈리게 한다. 안 쓰는 게 낫다.
    - `!` : 부정 의미와 헷갈린다.
    - `@` : 이메일 처리할 때 주의할 필요가 있다.

## /pattern/ 명령 앞 패턴 지정 {#prefix-pattern}

sed의 명령 대부분은 명령 앞에 `/pattern/`을 지정해서 명령 실행 대상 라인을 지정할 수 있다.

```sh
 # 패턴이 match된 라인에서만 replace 작업을 한다
echo -e '1\n2\n3' | sed -E '/2/ s/./999/'

 # 패턴이 match 되지 않은 라인에서만 replace 작업을 한다
echo -e '1\n2\n3' | sed -E '/2/! s/./999/'
```

꼭 스페이스를 넣지 않아도 작동하긴 한다.
즉, 다음의 두 명령은 똑같다.

```bash
 #                             ⬇
echo -e '1\n2\n3' | sed -E '/2/s/./999/'
echo -e '1\n2\n3' | sed -E '/2/ s/./999/'
```

하지만 경험상 가독성을 위해 스페이스를 넣는 것이 좋은 경우가 많았다.

```bash
$ seq 3 8 | sed -E '/4/ s/./999/'
3
999
5
6
7
8
```

```bash
$ seq 3 8 | sed -E '4 s/./999/'
3
4
5
999
7
8
```

### 주의: 패턴과 라인넘버 지정을 헷갈릴 수 있다 {#warn-pattern-line}

`/pattern/`은 패턴을 찾아서 명령을 실행하는 것이고, `n`은 라인 넘버를 지정하는 것이다.

```bash
$ seq 3 8 | sed -E '/4/ s/./999/'
3
999
5
6
7
8
```

- `/4/` : 라인 선택 패턴으로 `4`를 줬다.

```bash
$ seq 3 8 | sed -E '4 s/./999/'
3
4
5
999
7
8
```

- `4` : `4`번째 라인을 선택.

## 주소 지정 {#address}

- `n` : n번째 라인.
- `$` : 마지막 라인.
- `/regex/` : 지정한 정규식 패턴에 매칭되는 라인들.
- `n,m` : n번째 라인부터 m번째 라인까지.

```bash
$ # 2번에서 4번 라인까지의 라인 끝에 -- 를 추가한다
$ seq 1001 1006 | sed -E '2,4s/$/--/'
1001
1002--
1003--
1004--
1005
1006
```

- `first,+n` : first부터 시작해서 n개 라인들.

```bash
$ # 3번 라인부터, 그 아래로 2개 라인들의 마지막에 -- 를 추가한다
$ seq 1001 1006 | sed -E '3,+2s/$/--/'
1001
1002
1003--
1004--
1005--
1006
```

- `address!` : address로 지정한 라인을 제외한 나머지 라인들.

```bash
$ # 2부터 3번 라인까지를 제외한 나머지 라인 끝에 -- 를 추가한다
$ seq 1001 1006 | sed -E '2,3!s/$/--/'
1001--
1002
1003
1004--
1005--
1006--
```

### GNU sed 에서 지원하는 주소 지정

GNU sed 는 위의 라인 지정에 추가로 다음과 같은 라인 지정을 지원한다.

- `first~step` : first부터 시작해서 step 간격마다의 라인들.

```bash
$ # 5번째 라인부터 2개 라인 간격으로 마지막에 -- 를 추가한다
$ seq 1001 1013 | gsed -E '5~2s/$/--/'
1001
1002
1003
1004
1005--
1006
1007--
1008
1009--
1010
1011--
1012
1013--
```


## 명령어 {#command}

### s : 문자열 치환 {#command-s}

다음과 같은 단순한 치환은 첫번째 매칭된 문자열만 치환한다.

```sh
$ echo 'foo.baz.foo' | sed 's/foo/-/'
-.baz.foo
```

`g` 플래그를 사용하면 매칭된 모든 문자열을 치환한다.

```sh
$ echo 'foo.baz.foo' | sed 's/foo/-/g'
-.baz.-
```

`g` 대신 숫자를 사용하면 n번째 매칭된 문자열을 치환한다.

```sh
$ echo 'foo.baz.foo' | sed 's/foo/-/2'
foo.baz.-
```

`-i` 옵션을 사용하면 파일을 수정하고 백업 파일을 생성한다.

`-i` 옵션은 쓸일이 많은 편.

```sh
 # 여러 파일에서 foo를 bar로 replace하고, orig라는 원본 파일을 남겨둔다
sed -i.orig s/foo/bar/g file1.txt file2.txt

 # file1, file2에서 `if(`나 `for(`를 찾아 모두 `if (`, `for (`로 바꿔준다
sed -i.orig -E 's/(if|for)\(/\1 (/' file1 file2
```

#### & 의 사용 {#ampersand}

>
An ampersand (“&”) appearing in the replacement is replaced by the string matching the RE.
The special meaning of “&” in this context can be suppressed by preceding it by a backslash.
The string “\#”, where “#” is a digit, is replaced by the text matched by the corresponding backreference expression (see re_format(7)).

`&`는 정규식과 매치된 문자열을 의미한다. 따라서 replace 구문에서 다음과 같이 활용할 수 있다.

```bash
$ echo 'hello world' | sed 's/o/&&&/g'
hellooo wooorld

$ echo 'hello world' | sed 's/o/<&>/g'
hell<o> w<o>rld

$ echo 'hello world' | sed 's/l[od]/-&-/g'
hel-lo- wor-ld-
```

만약 `&`를 그대로 사용하고 싶다면 `\&`로 escape하면 된다.

```bash
$ echo 'hello world' | sed 's/o/&\&/g'
hello& wo&rld

$ echo 'hello world' | sed 's/o/\&/g'
hell& w&rld
```

### p : 출력 {#command-p}

`p` 명령은 매칭된 라인을 출력한다.

그런데 sed의 기본 동작이 모든 라인을 출력하는 것이기 때문에 `p` 명령을 사용하면 매칭된 라인이 두 번 출력된다는 특징이 있다.

```bash
$ seq 8 12 | sed '/[0-9][0-9]/p'
8
9
10
10
11
11
12
12
```

- `/[0-9][0-9]/` : 2자리 숫자를 찾는 패턴을 지정
- 두 자리 숫자를 찾아서 `p`로 출력했기 때문에 `10`, `11`, `12`가 각각 두 번씩 출력되었다.

이렇게 두 번 출력되는 기능이 필요없고, 매칭된 라인만 출력하고자 한다면 모든 라인을 출력하는 기본 동작을 끄는 `-n` 옵션을 사용하면 된다.

```bash
$ seq 8 12 | sed -n '/[0-9][0-9]/p'
10
11
12
```

- `-n` : 출력을 하지 않는다. `p` 명령의 작동은 예외.

라인 넘버를 지정하면 `head`나 [[/cmd/tail]]{tail} 명령과 비슷하게 사용할 수 있다.

```bash
$ seq 100 100000 | sed -n '1,10p'
100
101
102
103
104
105
106
107
108
109
```

- `seq 100 100000`: [[/cmd/seq]]를 사용해 100부터 100000까지의 숫자를 출력한다.
- `sed -n '1,10p'` : 1~10번 라인을 출력한다.

```bash
$ seq 100 100000 | sed -n '10p'
109
```

- `sed -n '10p'` : 10번 라인을 출력한다.

```bash
$ seq 100 100000 | sed -n '/^....$/p' | sed -n '3p'
1002
```

- `sed -n '/^....$/p'` : 4자리 숫자만 출력한다.
- `sed -n '3p'` : 3번째 라인을 출력한다.

### d : 삭제

```
$ seq 5  | sed 1d
2
3
4
5
```

- `sed 1d` : 첫 번째 줄을 삭제한다.

```
$ seq 5  | sed 2d
1
3
4
5
```

- `sed 2d` : 두 번째 줄을 삭제한다.

```
$ seq 6  | sed 2,5d
1
6
```

- `sed 2,5d` : 두 번째 줄부터 다섯 번째 줄까지 삭제한다.

```
$ seq 15 30 | sed '/2/d'
15
16
17
18
19
30
```

- `sed '/2/d'` : 2가 포함된 줄을 삭제한다.
    - `sed '/pattern/d'` : pattern이 포함된 줄을 삭제.
    - `sed '/pattern/Id'` : 대소문자 구분하지 않음.

## GNU sed에서만 지원하는 명령어

MacOS 빌트인 sed 에서는 지원하지 않고 GNU sed 에서는 지원하는 명령들.

### i : 매칭된 라인의 윗줄에 텍스트를 추가한다 {#command-i}

- `gsed '/pattern/i text'` : pattern이 포함된 라인의 윗줄에 text를 추가한다.

```bash
$ seq 28 32 | gsed '/30/itest'
28
29
test
30
31
32
```

- `gsed '/30/itest'` : 텍스트에 30을 포함하고 있는 문자열의 윗줄에 test를 추가한다.

```bash
$ seq 28 32 | gsed '/3[02]/itest'
28
29
test
30
31
test
32
```

- `gsed -E '/3[02]/itest'` : 텍스트에 30 또는 31 을 포함하고 있는 문자열의 윗줄에 test를 추가한다.


### a : 매칭된 라인의 아랫줄에 텍스트를 추가한다 {#command-a}

- `gsed '/pattern/a text'` : pattern이 포함된 라인의 아랫줄에 text를 추가한다.

```bash
$ seq 28 32 | gsed -E '/29|31/atest'
28
29
test
30
31
test
32
```

- `gsed -E '/29|31/atest'` : 텍스트에 29 또는 31 을 포함하고 있는 문자열의 아랫줄에 test를 추가한다.

```bash
$ seq 28 32 | gsed -E '4 atest'
28
29
30
31
test
32
```

- `gsed -E '4 atest'` : 4번째 라인의 아랫줄에 test를 추가한다.

## 실제 활용한 명령어들

### 사례: 코드 스타일 변경

```sh
 # ){ 를 모두 찾아 ) { 로 고쳐라
ag '\)\{' -l | xargs sed -i.orig 's/){/) {/'

 # 프로젝트 전체에서 for( 를 for ( 로 replace하고, .orig 백업 파일을 생성
ag 'for\(' -l | xargs sed -i.orig 's/for(/for (/'

 # 프로젝트 전체에서 if( 를 if ( 로 replace하고, .orig 백업 파일을 생성
ag 'if\(' -l | xargs sed -i.orig 's/if(/if (/'

 # 위의 두 가지를 동시에 한다
ag '(if|for)\(' -l | xargs sed -i.orig -E 's/(if|for)\(/\1 (/'

 # java 프로젝트 전체에서 tab 문자를 2개의 space로 replace
find . -name '*.java' | xargs ag '\t' -l | xargs sed -E -i.orig "s/[[:cntrl:]]/  /g"

 # 좌우에 스페이스가 없는 -> 를 찾아 스페이스를 추가하라
find . -name '*.java' | xargs ag '\-\>(?=\S)|(?<=\S)\-\>' -l \
    | xargs sed -i.orig -E "s,([^ ])->,\1 ->,; s,->([^ ]),-> \1,"

 # if(, for(, switch( 처럼 제어문과 괄호가 붙어 있는 코드를 찾아 스페이스 하나를 추가하라
ag '\b(if|for|switch|catch|while)\(' -l \
    | xargs sed -i.orig -E "s,(if|for|switch|catch|while)\(,\1 (,"

 # package 바로 윗줄에 공백 라인 하나를 추가하라
ag '\S\npackage' -l | xargs sed -i '' 's,package,\'$'\npackage,'

 # Pattern, Matcher 를 사용한 경우를 제외하고 + 연산자 좌우에 스페이스 하나를 추가하라
find . -name '*.java' | xargs ag '([^\s+i]\+|\+[^\s+)])' \
    | grep -v Pattern | cut -d: -f1 \
    | xargs sed -E -i '' "/Pattern|Matcher/! s/([^ ])\+([^ ])/\1 + \2/g"
```

#### 중괄호를 사용한 경우

```sh
 # 모든 {} 을 찾아 사이에 개행 문자를 추가하라.
 # 단 새로 추가된 라인의 인덴트는 윗 줄과 같아야 한다.
ag '\{\}$' -l | xargs sed -E -i '' 's/^( *)(p.+){}/\1\2{\
\1}/'
```

명령 첫째 줄이 `\`로 끝나고, 이후 엔터 키를 입력해 개행 문자를 넣고, 다음 줄에서 명령이 끝난다는 점에 주목.

이 명령을 실행하면 다음과 같은 결과를 얻을 수 있다.

```java
// before
  public Code() {}

// after
  public Code() {
  }
```

### 사례: 공백 문자 replace

- space 교체

```sh
 # 하위 경로에서 `if(`를 찾아 모두 `if (`로 바꿔준다
ag 'if\(' -l | xargs sed -i.orig 's/if\(/if /'
```

- tab 교체

```sh
 # 모든 java 파일에서 탭 문자를 찾아 2개의 스페이스로 교체한다
find . -name '*.java' | xargs ag '\t' -l | xargs sed -E -i.orig "s/[[:cntrl:]]/  /g"
```

- 개행 문자 삽입

```sh
 # 모든 package 단어 위에 공백 1줄을 추가한다
ag '\S\npackage' -l | xargs sed -i '' 's,package,\'$'\npackage,'
```





## 참고문헌

- 유닉스의 탄생 / 브라이언 커니핸 저/하성창 역 / 한빛미디어 / 2020년 08월 03일 / 원서 : UNIX: A History and a Memoir


