---
layout  : wiki
title   : awk
summary : pattern-directed scanning and processing language
date    : 2019-01-23 11:18:43 +0900
updated : 2025-01-12 13:41:27 +0900
tag     : command 언어 brian-kernighan awk
resource: 97/3C865D-C4E1-43B2-B80E-F96DA7AC7703
toc     : true
public  : true
parent  : [[/language]]
latex   : false
---
* TOC
{:toc}

## 기원

- 알프레드 에이호(Alfred Vaino Aho), 피터 와인버거(Peter Jay Weinberger), [[/people/brian-w-kernighan]]이 만들었다.

다음은 브라이언 커니핸의 글이다.

> 나는 숫자와 텍스트를 똑같이 잘 처리할 수 있는 도구에 관심이 있었다.
[[/cmd/grep]]{grep}이나 Sed 둘 다 숫자형 데이터를 처리하거나 산술연산을 할 수는 없었고, grep은 여러 행으로 된 텍스트를 검색할 수 없었다.
그런 작업을 처리하려면 여전히 C 프로그램이 필요했다.
그래서 나는 어떻게든 일반화할 방안을 찾고 있었다.
그때 앨프리드 에이호는 grep이 지원하는 것보다 더 풍부한 종류의 정규 표현식을 가지고 시험하다가 [[/cmd/grep]]{egrep}(확장된 grep)을 작성했다.
마지막으로, 얼마 후 1127 센터로 전입해서 앨프리드와 내 중간 사무실로 이사 온 피터 와인버거는 데이터베이스에 관심이 있었다.
>
> 1997년 가을 우리 셋은 이 아이디어들을 어떻게 결합할지 논의했는데,
IBM에서 만든 강력하지만 난해한 보고서 프로그램 생성기인 RPG에서 일부 영감을 받고 (다음 장에 설명할) 마크 로카인드의 깔끔한 아이디어에서도 영향을 받았다.
결국 우리는 Awk라는 언어를 설계했다.
Awk 언어 자체에 관해 설명한 문서에서도 이야기했지만, 개발자의 이름을 따서(Aho, Weinberger, Kernighan) 언어 이름을 지은 것은 어느 정도 상상력이 부족함을 나타낸다.
지금은 우리가 'awkward'와 연관된 어원에 대해 생각했었는지, Awk라는 이름이 냉소적인 어감을 줘서 어울린다고 생각했는지 잘 기억이 나지 않지만,
어쨌든 그 이름으로 굳어졌다.
피터는 Awk의 첫 번째 버전을 아주 빨리, 겨우 며칠 만에 Yacc, Lex와 앨프리드의 egrep 정규 표현식 코드를 이용해서 작성했다.
>
> Awk 프로그램은 일련의 패턴과 동작으로 구성된다.
프로그램은 입력의 각 행을 각 패턴에 대해 검사하고, 입력이 패턴과 일치하면 그 패턴에 해당하는 동작을 수행한다.
패턴은 정규 표현식이거나, 숫자형이나 문자열을 포함한 관계식이 될 수 있다.
동작은 C 문법을 변형한 형태로 작성된다.
패턴이 생략되면 입력의 모든 행과 일치하게 되고, 동작이 생략되면 패턴과 일치하는 행을 출력한다.
[^KER-5-209]

## 이것저것
### 외따옴표? 쌍따옴표?

>
명령줄에서 Awk 프로그램은 항상 작은따옴표로 감싼다.
그래야 프로그램 안에 `$` 같은 문자가 있어도 셸이 해석하지 않고 프로그램이 여러 라인에 걸쳐 있어도 문제가 없을 것이다.
[^awk-2e-5]

### 특수 변수

#### NF: 현재 레코드의 필드 수

현재 레코드(라인)의 필드 수를 나타낸다.

```bash
$ seq 1 20 | xargs -n 3 | awk '{ print "NF=" NF , $0 }'
NF=3 1 2 3
NF=3 4 5 6
NF=3 7 8 9
NF=3 10 11 12
NF=3 13 14 15
NF=3 16 17 18
NF=2 19 20
```

#### NR: 현재 레코드 번호

현재 레코드(라인)의 번호를 나타낸다. 줄 번호라 생각하면 된다.

```bash
$ seq 1 20 | xargs -n 3 | awk '{ print "NR=" NR , $0 }'
NR=1 1 2 3
NR=2 4 5 6
NR=3 7 8 9
NR=4 10 11 12
NR=5 13 14 15
NR=6 16 17 18
NR=7 19 20
```

#### ARGV: 명령줄 인수 배열

TODO


## BEGIN, END {#begin-end}

- BEGIN은 입력의 첫 번째 라인을 읽기 전에만 매치되는 패턴이다.
- END는 입력의 마지막 라인을 읽고 처리한 이후에만 매치되는 패턴이다.

```bash
$ seq 3 | awk 'BEGIN { print "start" }; /[0-9]/ { print $1 }; END { print "end" }'
start
1
2
3
end
```

## Examples

```sh
awk '/search_pattern/ { action; }' file
```

### 80자보다 긴 모든 행을 출력하기
```sh
awk 'length > 80' test.txt
```

### 필드 구분자 지정하기
```sh
$ awk -F':' '{ print $1 }' /etc/passwd  # 구분자를 : 로 지정
$ awk -F'/' '{ print $1 }' /etc/passwd  # 구분자를 / 로 지정
```

### sum 구하기
```sh
$ awk '{s+=$1} END {print s}' test.txt  # ' 를 "로 쓰지 않도록 주의한다
```

### 마지막 필드 출력하기
```sh
$ awk '{print $NF}'
```

### 중복된 라인 제거하기
```sh
$ awk '!strmap[$0]++' test.txt
```
* uniq는 인접한 중복 값들만 제거하지만, 이 방법을 쓰면 파일 전체에서 중복 값을 제거한다.

### 대소문자 변환
```sh
$ echo 'ASDF' | awk '{print tolower($0)}'
$ echo 'asdf' | awk '{print toupper($0)}'
```

### 행 번호의 사용
#### 각 행에 행 번호를 붙여주기 {#append-line-number}

```sh
awk '{print NR, $0}' test.txt
```

다음과 같이 해도 똑같은 결과를 얻을 수 있다.

```bash
awk '{ print NR " " $0}' < test.txt
```

#### 홀짝 라인을 조인하기
```sh
 # exam 함수에서도 사용한 방법이다
awk 'NR%2==0 {print p","$0;} NR%2 {p=$0;}' test.txt
```

만약 test.txt 파일의 내용이 다음과 같다면...

```
1
2
3
4
5
```

다음과 같이 출력된다.

```
1,2
3,4
```

### 파일의 모든 단어 수 세기

```sh
 # 파일을 읽고 각 단어가 나타나는 횟수를 세고, 전체 단어와 각각의 횟수를 출력한다
awk '{ for (i=1; i <= NF; i++) wd[$i]++ } END { for (w in wd) print w, wd[w] }' test.txt
```

## 함께 읽기

- [[/people/brian-w-kernighan]]
- [[/vim-update-book-progress]]

### From: Beautiful Code

>
**집계 처리의 역사**
>
선구자들의 업적을 존중하는 의미에서 잠깐 언급하자면,
텍스트 입력의 행들을 훑으면서 정규식과 내용 접근 저장소를 이용해 결과를 구축하는 방식으로 실제 작업을 수행한다는 개념은 awk 프로그래밍 언어에서 처음으로 유명해졌다.
awk라는 이름은 그 언어의 창시자인 아호<sup>Aho</sup>, 웨인버거<sup>Wernberger</sup>, 커니핸<sup>Kerighan</sup>에서 비롯된 것이다.
>
물론 이 성과는 일반적으로 자료는 텍스트 파일에 행 별로 저장되어야 한다는, 당시에는 급진적이었던 Unix 원리(대부분은 리치<sup>Ritchie</sup>와 톰슨<sup>Thomson</sup>에서 기인한)에 기반을 둔 것이다.
이 성과가 그 원리의 유효성을 어느 정도는 증명했다고 할 수 있다.
>
Perl의 작성자인 월<sup>Larry Wall</sup>은 awk에 깔린 그러한 개념을 취해서 Perl을 고성능이자 업계에서 실용적으로 사용할 수 있는 수준의 범용 도구로 바꾸어 놓았다.
Perl을 좀 무시하는 개발자들도 있는 것 같은데, 사실 Perl은 유닉스 시스템들의 세계를 한데 묶는 접착제 역할을 했으며, 또한 1세대 웹의 큰 부분을 차지하기도 했다.
>
-- Beautiful Code. 4장. 88쪽.

## 참고문헌

- Beautiful Code / 찰스 페졸드 외 37 저 / 한빛미디어 / 초판발행 2007년 12월 17일
- [How To Use awk In Bash Scripting](https://www.cyberciti.biz/faq/bash-scripting-using-awk/ )
- 유닉스의 탄생 / 브라이언 커니핸 저/하성창 역 / 한빛미디어 / 2020년 08월 03일 / 원제: UNIX: A History and a Memoir
- AWK 프로그래밍 언어 2판 / 앨프리드 에이호, 브라이언 W. 커니핸, 피터 와인버거 저 / 인사이트(insight) / 2024년 12월 10일 / 원제: The AWK Programming Language, Second Edition

## Links

- [The AWK Programming Language, Second Edition by Alfred Aho, Brian Kernighan, Peter Weinberger](https://awk.dev/ )
    - 1판은 1988년에 나온 바 있다. 2판은 2023년 9월에 나온 것.
    - [GeekNews](https://news.hada.io/topic?id=9547 )에 소개된 글도 읽어볼만 하다.

## 주석

[^KER-5-209]: 유닉스의 탄생. 5장. 209쪽.
[^awk-2e-5]: AWK 프로그래밍 언어 2판. 5쪽.



