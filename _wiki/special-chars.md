---
layout  : wiki
title   : 특수문자 모음
summary : 특수문자 검색하다 빡쳐서 작성한 문서
date    : 2017-12-13 21:24:30 +0900
updated : 2019-08-31 18:58:46 +0900
tag     : special-chars
toc     : true
public  : true
parent  : what
latex   : true
---
* TOC
{:toc}

## 개요

* 특수문자 검색하다 빡쳐서 작성한 문서이다.
    * [특수문자는 구글에서 검색이 안 되기 때문이다.](https://www.google.com/intl/ko/insidesearch/tipstricks/all.html#punctuation )
* 다른 사람과 대화할 때 어떤 특수기호는 뭐라고 발음해야 할 지 애매한 경우도 종종 있다.
* 이 문서는 검색과 커뮤니케이션을 위한 것이므로 가능한 한 외래어와 한국어 표현을 함께 표시한다.
* 프로그래밍 언어와 관련된 설명이 필요한 경우, 내가 사용해본 적이 있는 언어인 C, Java, Scala, Perl, JavaScript, PHP 위주로 작성한다.

* 이 문서는 [RFC 20의 Standard Code 표](https://tools.ietf.org/html/rfc20#section-2 )의 문자들 중 몇몇 특수문자를 다룬다.

```
|----------------------------------------------------------------------|
  B  \ b7 ------------>| 0   | 0   | 0   | 0   | 1   | 1   | 1   | 1   |
   I  \  b6 ---------->| 0   | 0   | 1   | 1   | 0   | 0   | 1   | 1   |
    T  \   b5 -------->| 0   | 1   | 0   | 1   | 0   | 1   | 0   | 1   |
     S                 |-----------------------------------------------|
               COLUMN->| 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
|b4 |b3 |b2 |b1 | ROW  |     |     |     |     |     |     |     |     |
+----------------------+-----------------------------------------------+
| 0 | 0 | 0 | 0 | 0    | NUL | DLE | SP  | 0   | @   | P   |   ` |   p |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 0 | 0 | 0 | 1 | 1    | SOH | DC1 | !   | 1   | A   | Q   |   a |   q |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 0 | 0 | 1 | 0 | 2    | STX | DC2 | "   | 2   | B   | R   |   b |   r |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 0 | 0 | 1 | 1 | 3    | ETX | DC3 | #   | 3   | C   | S   |   c |   s |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 0 | 1 | 0 | 0 | 4    | EOT | DC4 | $   | 4   | D   | T   |  d  |   t |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 0 | 1 | 0 | 1 | 5    | ENQ | NAK | %   | 5   | E   | U   |  e  |   u |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 0 | 1 | 1 | 0 | 6    | ACK | SYN | &   | 6   | F   | V   |  f  |   v |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 0 | 1 | 1 | 1 | 7    | BEL | ETB | '   | 7   | G   | W   |  g  |   w |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 1 | 0 | 0 | 0 | 8    | BS  | CAN | (   | 8   | H   | X   |  h  |   x |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 1 | 0 | 0 | 1 | 9    | HT  | EM  | )   | 9   | I   | Y   |  i  |   y |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 1 | 0 | 1 | 0 | 10   | LF  | SUB | *   | :   | J   | Z   |  j  |   z |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 1 | 0 | 1 | 1 | 11   | VT  | ESC | +   |  ;  | K   | [   |  k  |   { |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 1 | 1 | 0 | 0 | 12   | FF  | FS  | ,   | <   | L   | \   |  l  |   | |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 1 | 1 | 0 | 1 | 13   | CR  | GS  | -   | =   | M   | ]   |  m  |   } |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 1 | 1 | 1 | 0 | 14   | SO  | RS  | .   | >   | N   | ^   |  n  |   ~ |
|---|---|---|---|------|-----|-----|-----|-----|-----|-----|-----|-----|
| 1 | 1 | 1 | 1 | 15   | SI  | US  | /   | ?   | O   | _   |  o  | DEL |
+----------------------+-----------------------------------------------+
```

## 용어 설명

* C escape : C 언어 이스케이핑.

* Caret notation : `^`와 알파벳 대문자, 몇몇 특수문자를 사용하는 표기법.

    * control 키의 조합 표기법으로도 쓰인다.
        * 가령 `^C` 라면 control 키와 `c` 키를 동시에 누르는 것을 의미한다.
        * `^H`나 `^J`, `^I` 등등은 터미널에서도 그대로 쓸 수 있다. 순서대로 백스페이스, 엔터, 탭으로 작동한다.

    * `^C`를 그냥 `컨트롤 씨`라고 읽어도 무방하다. `^`를 강조해 읽고 싶다면 `카렛 씨`로 읽으면 된다.


### 눈에 보이지 않는 문자와 Vim notation

* Vim notation : Vim의 key notation을 말한다. `:help keycodes`로 볼 수 있다.
* 눈에 보이지 않는 문자 : Null이나, Backspace 등의 문자는 MS워드와 같은 대중적인 편집기 상에서는 눈으로 확인할 수 없다.

### 참고: Vim에서는 눈에 보이지 않는 문자를 보이게 하는 방법이 있다

* INSERT 모드에서 `^V`를 입력한 다음, 눈에 보이지 않는 문자를 입력하면 Caret notation으로 나타난다.

    * 예: `^V` 입력 후 `Esc`키를 누르면 `^[`가 표시된다.
    * 예: `^V` 입력 후 `Enter`키를 누르면 `^M`이 표시된다.

* 전부는 아님. Vim notation으로 나타나는 문자도 있다.

    * 예: `^V` 입력 후 `Backspace`키를 누르면 `<BS>`로 나타난다.
    * 예: `^V` 입력 후 `^H`키를 누르면 `^H`로 나타난다.

## Null

* 눈에 보이지 않는 문자.
* 여러 프로그래밍 언어에서 값이나 레퍼런스 등이 없음을 표시하는 용도로 Null을 사용한다.
* 허다하게 보는 에러의 상당부분이 Null pointer와 관련된 것들이다.
* Null pointer의 개념은 컴퓨터 과학자 [Tony Hoare(토니 호어)](https://en.wikipedia.org/wiki/Tony_Hoare )가 1965년에 창안했다.
    * 1959년에 [Quick sort 알고리즘](https://academic.oup.com/comjnl/article/5/1/10/395338 )을 고안한 사람이다.
    * 1980년 [Turing award](https://amturing.acm.org/award_winners/hoare_4622167.cfm ) 수상자.
    * 2009년에는 [Null pointer의 개념이 10억 달러 이상의 피해를 끼친 실수였다고 후회했다(동영상)](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare ).

| 읽는 방법      | 널, null        |
| 약어           | NUL             |
| 유니코드       | 'NULL' (U+0000) |
| C escape       | \0              |
| Caret notation | ^@              |
| HTML entity    | `&#0;`, `&#x0;` |
| UTF-8 (HEX)    | 00              |
| Vim notation   | `<Nul>`         |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-5.2 )
* [fileformat.info/info/unicode/char/00](http://www.fileformat.info/info/unicode/char/00 )
* [Null character(wikipedia)](https://en.wikipedia.org/wiki/Null_character )

### C 언어 문자열

C 언어에서 `\0`은 문자열의 마지막을 표시하는 용도로도 사용한다.

* 끝을 알 수 있으므로, 문자열을 복사할 때도 쓰고 출력할 때도 쓰고 비교할 때도 쓴다.
* `\0` 때문에 실제 문자의 수는 사람이 보는 것보다 한 글자 더 많다.

만약 다음과 같이 길이 10의 char 배열을 만들어 문자를 할당한다면,

```c
char name[10] = "foo bar";
```

메모리에 이렇게 보관된다. 문자열의 끝에 `\0`이 들어가고, 그 뒤의 2 칸은 비어 있게 된다.

```
---------------------------------------
| f | o | o |  | b | a | r | \0 |  |  |
---------------------------------------
```

## End of Text

* 눈에 보이지 않는 문자.
* `^C`로 입력 가능하다. 터미널에서는 현재 실행중인 작업을 중지하는 데 사용한다.

| 읽는 방법      | 텍스트 종결문자, 컨트롤 씨, control c, end of text |
| 약어           | ETX                                                |
| 유니코드       | 'END OF TEXT' (U+0003)                             |
| Caret notation | ^C                                                 |
| HTML entity    | `&#3;`, `&#x3;`                                    |
| UTF-8 (HEX)    | 03                                                 |
| Vim notation   | `<C-C>`                                            |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-5.2 )
* [fileformat.info/info/unicode/char/03](http://www.fileformat.info/info/unicode/char/03 )
* [End of Text character(wikipedia)](https://en.wikipedia.org/wiki/End-of-Text_character )

Vim에서 `^C`는 터미널처럼 현재 실행중인 작업을 중지하는 데 사용한다.
* INSERT 모드에서 사용하면 실행중인 작업을 중지하고 NORMAL 모드로 돌아간다.
* INSERT 모드에서 백그라운드로 돌아가는 플러그인 사용시 주의.


## Backspace

* 눈에 보이지 않는 문자.
* 왼쪽 화살표키 처럼 생긴, 왼쪽 글자를 지우는 키
* `^H`를 입력하는 것이 백스페이스보다 편리한 경우가 많다. 백스페이스는 기본 위치에서 너무 멀다.

| 읽는 방법      | 백 스페이스, backspace |
| 약어           | BS                     |
| 유니코드       | 'BACKSPACE' (U+0008)   |
| C escape       | \b                     |
| Caret notation | ^H                     |
| HTML entity    | `&#8;`, `&#x8;`        |
| UTF-8 (HEX)    | 08                     |
| Vim notation   | `<BS>`                 |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-5.2 )
* [fileformat.info/info/unicode/char/08](http://www.fileformat.info/info/unicode/char/08 )
* [Backspace(wikipedia)](https://en.wikipedia.org/wiki/Backspace )

## Tab

* 보통 캡스락 키 위에 있는 키.
* 타자기에서 표를 작성/정렬을 편하게 하기 위해 발명됐다. 입력할 때마다 캐리지가 다음 탭 스탑으로 이동하는 방식.
    * F.W Hillard가 [1900년 8월 22일에 미국에서 특허](http://pdfpiw.uspto.gov/.piw?docid=00720520&PageNum=1&&IDKey=289D668C7D94&HomeUrl=http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1%2526Sect2=HITOFF%2526d=PALL%2526p=1%2526u=%25252Fnetahtml%25252FPTO%25252Fsrchnum.htm%2526r=1%2526f=G%2526l=50%2526s1=0720520.PN.%2526OS=PN/0720520%2526RS=PN/0720520 )를 냈다.
    * 특허를 읽어보면 왜 탭이 `^I`로 표기되는지 알 수 있다.
        * 탭 스탑에서 캐리지를 멈춰주는 (금속) 막대기가 "tabulator-rack  I"이다.
* 일반적인 UNIX 환경에서 탭의 공백 사이즈는 스페이스 8개이다.
* 몇몇 에디터, bash 터미널에선 코드 자동 완성 단축키로 사용한다.
* TSV 파일은 'Tab Seperated Values'의 약자이며, Tab을 구분자로 사용한 자료가 담긴 파일을 말한다.

| 읽는 방법      | 탭, taB, horizontal tab         |
| 약어           | HT                              |
| 유니코드       | 'CHARACTER TABULATION' (U+0009) |
| C escape       | \t                              |
| Caret notation | ^I                              |
| HTML entity    | `&#9;`, `&#x9;`                 |
| UTF-8 (HEX)    | 09                              |
| Vim notation   | `<Tab>`                         |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-5.2 )
* [fileformat.info/info/unicode/char/09](http://www.fileformat.info/info/unicode/char/09 )
* [Tab_key(wikipedia)](https://en.wikipedia.org/wiki/Tab_key#Tab_characters )

### Tab vs Space

인덴팅(들여쓰기)에 탭과 스페이스 중 어느 것을 쓰는지는 Vi vs Emacs와 더불어 holy war로 일컬어지곤 한다.

* 똑같이 스페이스를 쓴다 하더라도, 스페이스를 몇 개 쓰는지에 따라 싸움이 일어날 수 있다. 보통은 2/4/8개를 많이 쓴다.
* [Airbnb의 JavaScript 스타일 가이드](https://github.com/airbnb/javascript/tree/eslint-config-airbnb-v16.1.0#whitespace )를 읽어보면 Airbnb는 인덴팅에 스페이스 2개를 쓰고 있다는 것을 알 수 있다.

* [tabs vs spaces(google)](https://www.google.co.kr/search?q=tabs+vs+spaces )
* [탭 vs 스페이스(google)](https://www.google.co.kr/search?q=탭+vs+스페이스 )
* [Github Top Starred repositories를 분석해서 탭과 스페이스 사용률을 정리한 곳](https://ukupat.github.io/tabs-or-spaces/)

## Line Feed

* 다음 줄을 말한다.
* 터미널에선 `^J`로 엔터 키 처럼 쓸 수도 있다. 이걸 쓰다 보면 엔터 키가 멀게 느껴진다.
* [CR, LF](#cr-lf) 항목 참고.

| 읽는 방법      | 엘 에프, 개행 문자, LF, line feed, NL, new line |
| 약어           | LF                                                                  |
| 유니코드       | 'LINE FEED (LF)' (U+000A)                                           |
| C escape       | \n                                                                  |
| Caret notation | ^J                                                                  |
| HTML entity    | `&#10;`, `&#xa;`                                                    |
| UTF-8 (HEX)    | 0a                                                                  |
| Vim notation   | `<NL>`                                                              |

* [RFC 20](https://tools.ietf.org/html/rfc20#page-7 )
* [fileformat.info/info/unicode/char/0A](http://www.fileformat.info/info/unicode/char/0A )
* [Newline(wikipedia)](https://en.wikipedia.org/wiki/Newline )
* [새줄 문자(wikipedia)](https://ko.wikipedia.org/wiki/%EC%83%88%EC%A4%84_%EB%AC%B8%EC%9E%90 )

## Carriage Return

* 옛날 키보드엔 `Enter`가 없고 `Return` 키가 있는 모델이 흔했는데, 그 `Return`이란 단어가 여기에서 온 것이다.
* 엔터 키에 새겨진 &#x21b5; 기호가 CR을 뜻한다.
    * 참고로 &#x21b5; 기호의 HTML entity는 `&#x21b5;`다.
* 터미널에선 `^M`으로 엔터 키 처럼 쓸 수도 있다. 다만 `^J` 가 위치상 조금 더 편해서 `^J`를 더 자주 쓴다.

| 읽는 방법      | 씨알, 캐리지 리턴, 개행 문자, CR, carriage return, return |
| 약어           | CR                                                        |
| 유니코드       | 'CARRIAGE RETURN (CR)' (U+000D)                           |
| C escape       | \r                                                        |
| Caret notation | ^M                                                        |
| HTML entity    | `&#13;`, `&#xd;`                                          |
| UTF-8 (HEX)    | 0d                                                        |
| Vim notation   | `<CR>`                                                    |

* [RFC 20](https://tools.ietf.org/html/rfc20#page-7 )
* [fileformat.info/info/unicode/char/0D](http://www.fileformat.info/info/unicode/char/0D )
* [Carriage return(wikipedia)](https://en.wikipedia.org/wiki/Carriage_return )

### CR, LF

* LF는 옛날 타자기에서 종이를 한 줄 위로 올리는 것을 뜻했다.
* CR은 옛날 타자기에서 타자기 헤드를 가장 왼쪽으로 옮겨, 헤드가 첫 번째 컬럼에 위치하도록 하는 것을 뜻했다.
* 즉, 옛날 타자기에서 한 줄을 다 쓰고 다음 줄의 첫 글자를 쓰기 위해서는 CR 한 다음, LF를 해야 했다.
    * 가끔 옛날 흑백 영화를 보면 손으로 타자기 옆의 레버를 돌리는 방식으로 종이를 올려 LF를 하고, 역시 손으로 타자기 헤드를 왼쪽으로 쭉 밀어서 CR을 하는 걸 볼 수 있다.
* 운영체제마다 개행에 다른 방식을 사용한다.
    * 덕분에 여러 OS에서 텍스트 파일을 공유해 관리하거나 코딩을 하면, 이것 때문에 짜증나는 일이 생길 때가 있다.
    * 여러 OS에서 git 사용시 주의.

| WINDOWS, MS-DOS | UNIX, LINUX, macOS | Classic Mac |
|-----------------|--------------------|-------------|
| CR LF           | LF                 | CR          |
| \r\n            | \n                 | \r          |
| 0D0A            | 0A                 | 0D          |

* [The Great Newline Schism](https://blog.codinghorror.com/the-great-newline-schism/ ) - [stackoverflow.com](https://stackoverflow.com/ )을 만든 제프 앳우드가 자신의 블로그 codinghorror에 쓴 글.

## Form Feed

* '용지먹임'이라고도 한다. (프린터에 새로운 종이를 집어넣고) 출력 위치를 가장 왼쪽 가장 위쪽으로 옮기는 것.
* `^L`은 터미널에서 사용하면 화면을 깨끗하게 비우는 `clear` 명령처럼 작동한다. MS-DOS 라면 `cls`.
* `^L`은 Vim에서도 화면을 갱신하는 데 사용된다.

| 읽는 방법      | 폼 피드, formfeed         |
| 약어           | FF                        |
| 유니코드       | 'FORM FEED (FF)' (U+000C) |
| C escape       | \f                        |
| Caret notation | ^L                        |
| HTML entity    | `&#12;`, `&#xc;`          |
| UTF-8 (HEX)    | 0c                        |
| Vim notation   | `<FF>`                    |

* [RFC 20](https://tools.ietf.org/html/rfc20#page-7 )
* [fileformat.info/info/unicode/char/0D](http://www.fileformat.info/info/unicode/char/0D )
* [Page break(wikipedia)](https://en.wikipedia.org/wiki/Page_break#Form_feed )


## Escape

* 눈에 보이지 않는 문자.
* 터미널에선 키보드 왼쪽 위에 있는 `Esc` 키로 입력할 수 있다.
* Vim에서는 모드 전환에 사용되는 매우 중요한 키.
* `^[`와 같기 때문에, Vim에서는 `Esc`키 대신 `^[`를 입력해 모드를 변경하기도 한다.
* MS-Windows에서는
    * `Control` + `Shift` + `Escape` 키 조합으로 작업관리자를 호출할 수 있다.
    * `Control` + `Escape` 키 조합으로 시작 메뉴를 호출할 수 있다.

| 읽는 방법      | 이에스씨, 이스케이프, Esc, escape |
| 약어           | ESC                               |
| 유니코드       | 'ESCAPE' (U+001B)                 |
| C escape       | \e                                |
| Caret notation | `^[`                              |
| HTML entity    | `&#27;`, `&#x1b;`                 |
| UTF-8 (HEX)    | 1b                                |
| Vim notation   | `<Esc>`                           |

* [RFC 20](https://tools.ietf.org/html/rfc20#page-8 )
* [fileformat.info/info/unicode/char/1B](http://www.fileformat.info/info/unicode/char/1B )
* [Escape character(wikipedia)](https://en.wikipedia.org/wiki/Escape_character#ASCII_escape_character )

## Delete

* 문자를 삭제한다.
* MS-Windows에서는 `Control` + `Alt` + `Delete` 키 조합으로 작업관리자를 호출할 수 있다.

| 읽는 방법   | 딜리트, delete, del key |
| 약어        | DEL                     |
| 유니코드    | 'DELETE' (U+007F)       |
| HTML entity | &#127;  &#x7f;          |
| UTF-8 (HEX) | 7F                      |

* [RFC 20](https://tools.ietf.org/html/rfc20#page-8 )
* [fileformat.info/info/unicode/char/7F](http://www.fileformat.info/info/unicode/char/7F )
* [Delete_character(wikipedia)](https://en.wikipedia.org/wiki/Delete_character )

## `!` Exclamation mark

* 다수의 프로그래밍 언어에서 논리 부정을 의미한다. 따라서 `not` 으로 읽기도 한다. 가령, `!=` 는 `not equal`로 읽는다.
* `bang`이라고 읽는 경우가 종종 있다. 가령 `#!`은 [구글에서 hash bang으로 검색](https://www.google.co.kr/search?q=hash+bang)해 찾을 수 있다.

| 읽는 방법   | 느낌표, exclamation, bang, factorial, exclam, not |
| 약어        | EXC                                               |
| 유니코드    | 'EXCLAMATION MARK' (U+0021)                       |
| HTML entity | `&#33;`, `&#x21;`                                 |
| UTF-8 (HEX) | 21                                                |

* JavaScript에서는 부정에 부정을 씌우는 논리로 `!!`을 사용해 Boolean 강제 형변환이 가능하다.
* Vim에서는 `!`를 사용해 셸 명령어를 실행하거나, `map`, `command`, `function`을 중복 선언해 오버라이드할 수 있다.

* [RFC 20](https://tools.ietf.org/html/rfc20#section-4.2 )
* [fileformat.info/info/unicode/char/21](http://www.fileformat.info/info/unicode/char/21 )
* [Exclamation mark(wikipedia)](https://en.wikipedia.org/wiki/Exclamation_mark )

## `"` Quotation mark

* 한국어 정식 명칭은 '큰따옴표'.
* 정식 명칭은 아니지만 '쌍따옴표'라고도 한다.
    * 작은 따옴표랑 큰 따옴표의 크기에 차이가 있는 게 아니라 작은 따옴표 기호가 싱글인지 더블인지의 차이이므로, 큰따옴표란 명칭은 좀 이상하다.
* 국가별로 여러 모양의 쌍따옴표를 사용한다.
* Vim에서는 복사/붙여넣기를 할 때 `"`를 써서 레지스터를 지정할 수 있다.
* 다수의 프로그래밍 언어에서 String을 선언할 때 사용한다.

| 읽는 방법   | 큰따옴표, 쌍따옴표, double quote, quotation mark, literal mark, double glitch |
| 유니코드    | 'QUOTATION MARK' (U+0022)                                                     |
| HTML entity | `&#34;`, `&#x22;`, `&quot;`                                                   |
| UTF-8 (HEX) | 22                                                     |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-4.2 )
* [fileformat.info/info/unicode/char/22](http://www.fileformat.info/info/unicode/char/22 )
* [Quotation mark(wikipedia)](https://en.wikipedia.org/wiki/Quotation_mark )
* [큰따옴표(국립국어원)](http://korean.go.kr/front/page/pageView.do?page_id=P000199&mn_id=30 )

## `#` Number sign

* 넘버 사인. 가령 `#42`는 42번, 42번째 등을 의미한다.
* 한국에서 '샵', '우물정' 이라 부르면 못 알아듣는 사람은 거의 없을 것이다.
    * 그러나 음악의 '샵', 한자 '우물 정'과는 다른 기호이다.
    * 샵은 `U+266F`이고, 우물 정은 `U+4E95`이다.
* 해시태그 앞에 붙이는 기호로도 사용된다.
* Vim에서는 NORMAL 모드에서 사용하면 단어 역순 검색을 할 수 있다.
* Perl, Python, Ruby 외 여러 프로그래밍 언어에서 `#`는 주석을 선언하는 데 사용된다.
* Markdown에서 문단 제목을 표시할 때 사용한다.
* 스크립트 파일의 첫 줄에 들어가는 `#!`은 [유닉스 환경에서 스크립트 인터프리터를 지정](https://en.wikipedia.org/wiki/Shebang_(Unix))하겠다는 의미이다.

| 읽는 방법   | 샵, 우물정, 해시, number sign, hash sign, pound, octothorpe |
| 유니코드    | NUMBER SIGN(U+0023)                                         |
| HTML entity | `&#35;`, `&#x23;`                                           |
| UTF-8 (HEX) | 23                                                          |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-4.2 )
* [fileformat.info/info/unicode/char/23](http://www.fileformat.info/info/unicode/char/23 )
* [Number_sign(wikipedia)](https://en.wikipedia.org/wiki/Number_sign )
* [해시 기호(wikipedia)](https://ko.wikipedia.org/wiki/%ED%95%B4%EC%8B%9C_%EA%B8%B0%ED%98%B8 )
* [Unicode Character 'MUSIC SHARP SIGN' (U+266F)](http://www.fileformat.info/info/unicode/char/266f/index.htm ) - 음악의 샵
* [Unicode Han Character 'well, mine shaft, pit' (U+4E95)(fileformat.info)](http://www.fileformat.info/info/unicode/char/4e95/index.htm ) - 한자: 우물 정
* [Hashtag(wikipedia)](https://en.wikipedia.org/wiki/Hashtag#cite_ref-17 )

### `#`을 사용한 문자열 보간(interpolation)

Ruby와 CoffeeScript 언어의 보간(interpolation)은 `$`가 아니라 `#`을 쓴다.

```ruby
"one plus two is #{1+2}"    # one plus two is 3
```

* [www.rubyist.net/~slagell/ruby/strings.html](http://www.rubyist.net/~slagell/ruby/strings.html )

### C 언어 프리프로세서 명령어의 prefix

C 언어의 전처리기 명령어가 `#`으로 시작한다.

* `#define`, `#include`, `#if`, `#elif`, `#else`, `#endif`, `#ifdef`, `#ifndef`


## `$` Dollar sign

* 달러 사인. 주로 화폐의 단위로 사용한다.
* Perl에선 Scala 변수명의 prefix로 사용한다.
* Bash Shell, PHP 등에서는 변수명의 prefix로 사용한다.
* BASIC에선 문자열 변수명의 suffix로 사용한다.
* 정규표현식에선 end of string anchor로 사용한다. 즉, 문자열이 끝나는 지점.
* Vim에서는 정규표현식과 비슷하게 `<End>`의 의미로 사용한다.

| 읽는 방법   | 달러, 딸라, dollar     |
| 유니코드    | 'DOLLAR SIGN' (U+0024) |
| HTML entity | `&#36;`, `&#x24;`      |
| UTF-8 (HEX) | 24                     |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-4.2 )
* [fileformat.info/info/unicode/char/23](http://www.fileformat.info/info/unicode/char/23 )
* [Dollar_sign(wikipedia)](https://en.wikipedia.org/wiki/Dollar_sign )

### `$`를 사용한 문자열 보간(interpolation)

문자열에 포함된 변수명을 평가해 replace하는 기능. 대표적인 언어로 Perl이 있다.

* Perl에서는 `"$foo"`, `"${foo}"`, `"@bar"`, `"@{bar}"`와 같은 문자열에 들어간 변수 `$foo`나 배열 `@bar`의 값을 문자열에 replace해준다.
    * 단, `''`로 선언한 문자열에서는 보간이 발생하지 않는다.
* 다른 프로그래밍 언어들은 `@`은 사용하지 않고 주로 `""`와 `${}`를 사용한다.
    * [[Groovy]], Kotlin, Scala, PHP가 이런 방식을 사용한다.

JavaScript의 경우, 쌍따옴표가 아니라 ``` `` ```을 쓴다.
* [ECMAScript 2016](https://www.ecma-international.org/ecma-262/7.0/#sec-template-literal-lexical-components )부터 ``` `` ```으로 선언한 문자열 안에서 `${}`을 사용해 interpolation 한다.

* [String_interpolation(wikipedia)](https://en.wikipedia.org/wiki/String_interpolation )

### PHP의 해괴한 가변 변수

* PHP에는 변수 prefix인 `$`를 연달아 사용해서 가변 변수를 사용할 수 있다.
* PHP 해석기가 어떤 방식으로 작동하는지 미루어 추측할 수 있는 <del>버그...</del> 기능이다.

```php
$Bar = "a";
$Foo = "Bar";
$World = "Foo";
$Hello = "World";
$a = "Hello";

$a;     // "Hello"
$$a;    // "World"
$$$a;   // "Foo"
$$$$a;  // "Bar"
$$$$$a; // "a"

$$$$$$a;    // "Hello"
$$$$$$$a;   // "World"
```

* [PHP 가변 변수](https://secure.php.net/manual/kr/language.variables.variable.php)

## `%` Percent sign

* 퍼센트 기호. 백분율 기호라고도 한다.
    * percent는 나눗셈을 의미하는 'per'와 100을 의미하는 'cent'를 합친 말이다. 즉 `나누기 100`을 말한다.
    * 예를 들어 50%는 50/100 이므로, 0.5 이며 1/2 이다.
* 앞에 숫자가 붙은 경우 '~프로'라고 읽기도 하는데, 이는 라틴어 `pro centum`을 줄여 표현하는 것이다.
    * 라틴어 'pro centum'은 `100에 대해`라는 뜻이다.
    * 즉 '50%'를 '50 프로'라고 읽는 것은 '100에 대해 50'이라는 뜻이다. '50 percent'와 똑같다.

| 읽는 방법   | 퍼센트, 프로, 나머지, percent, mod |
| 유니코드    | 'PERCENT SIGN' (U+0025)            |
| HTML entity | `&#37;`, `&#x25;`                  |
| UTF-8 (HEX) | 25                                 |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-4.2 )
* [fileformat.info/info/unicode/char/25](http://www.fileformat.info/info/unicode/char/25 )
* [Percent_sign(wikipedia)](https://en.wikipedia.org/wiki/Percent_sign )
* [pro centum(구글 번역)](https://translate.google.co.kr/?hl=ko#la/en/pro%20centum )

### 다양한 프로그래밍 언어에서의 사용

* 여러 프로그래밍 언어에서 나머지를 계산하는 연산자로 사용한다. 이런 경우는 모드(mod)로 읽곤 한다.
* `%`를 최초로 나머지 연산자로 사용한 프로그래밍 언어는 B인 것으로 보인다.
    * B. W. Kernighan이 작성한 [B 언어 튜토리얼](https://www.bell-labs.com/usr/dmr/www/btut.html )을 읽어보면 '5. Arithmetic; Octal Numbers'에서 `%` 기호를 나머지 연산자로 소개하고 있다.
* Perl에서는 Hash 자료형 변수명의 prefix로 쓰인다.
* BASIC에서는 Integer 자료형 변수명의 suffix로 쓰인다.
* C언어 계열의 프로그래밍 언어에서 `printf` 함수 formatting 기호로 사용된다.
* SQL의 like 검색에서 wild card로 사용한다. 가령 `SELECT...WHERE MSG LIKE 'foo%'`로 조회하면 `foo`로 시작하는 문자열을 찾는다.
* Vim에서는 괄호 위에 커서를 놓고 `%`를 입력하면 짝에 해당하는 괄호로 커서가 점프한다.
    * 사용 가능한 괄호는 `()`, `{}`, `[]`. 안타깝지만 `< >`나 `" "`, `' '`는 안된다.
    * 괄호 외에 C 언어 스타일의 주석 `/* */`에서도 사용할 수 있다.
* [URI encoding](https://tools.ietf.org/html/rfc3986#section-2.1)에 사용되는 문자이기도 하다.
    * percent encoding이라고도 한다.
    * URI에는 ASCII 문자만 사용될 수 있기 때문에 ASCII 바깥의 Unicode 문자를 URL에 사용하려면 URI encoding을 해야 한다.
    * 인코딩 방법은 단순하다. UTF-8 문자를 1byte씩 자르고 hex 값으로 나타낸 다음, 각각 앞에 %를 붙이면 된다.
    * 예를 들어 '가'는 `EAB080` 이므로, `%EA%B0%80`이 된다('가'는 한글이라 3byte).
    * Vim에서는 특정 문자의 UTF-8 hex 값을 확인하기 쉽다. 문자 위에 커서를 놓고 `g8`을 입력하면 된다.

## `&` Ampersand

* 라틴어 'et'의 필기체 모양을 딴 기호. 라틴어 'et'의 뜻은 'and'.
* C에서 address, C++와 PHP에서 reference로 사용한다.
* Perl에서 사용자 정의 서브루틴을 호출하는 prefix로 사용한다.
* URL의 queryString에서 `?`뒤에 이어지는 각 key=value 사이의 구분자로 사용한다.
    * 예:[/search?hl=ko*&*q=ampersand](https://www.google.co.kr/search?hl=ko&q=ampersand )
* Excel 함수에서 String concatenation에 사용한다.
* Vim에서는 substitute(치환)를 반복하는 명령어로 쓴다.
* 많은 프로그래밍 언어에서 비트 AND 연산자로 사용한다.
* `&&`는 많은 프로그래밍 언어에서 논리 AND 연산자로 사용한다.

| 읽는 방법   | 앰퍼샌드, 앤, 앤드, ampersand, and sign, bitand |
| 유니코드    | 'AMPERSAND' (U+0026)                            |
| HTML entity | `&#38;`, `&#x26;`, `&amp;`                      |
| UTF-8 (HEX) | 26                                              |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-4.2 )
* [fileformat.info/info/unicode/char/26](http://www.fileformat.info/info/unicode/char/26 )
* [Ampersand(wikipedia)](https://en.wikipedia.org/wiki/Ampersand )

## `'` Apostrophe

* 인용 부호. 어퍼스트로피.
* 키보드의 세미콜론`;` 옆에 있는 키를 누르면 입력된다.
* C 계열의 프로그래밍 언어에서 char 자료형을 선언할 때 사용한다.
* Perl, Python, JavaScript 등의 프로그래밍 언어에서 문자열을 선언할 때에도 사용하곤 한다.
* Vim에서는 마크로 점프할 때 사용한다. 단, ``` ` ```과는 점프 방식이 다르다.
    * `'`는 점프한 다음, 커서가 마크가 있는 라인의 첫 번째 컬럼에 위치하게 된다.
    * ``` ` ```는 점프한 다음, 커서가 마크가 찍힌 글자에 위치하게 된다.

| 읽는 방법   | 인용 부호, 작은 따옴표, 외따옴표, single quote, quote, apostrophe, prime |
| 유니코드    | Unicode Character 'APOSTROPHE' (U+0027)                                  |
| HTML entity | `&#39;`, `&#x27;`                                                        |
| UTF-8 (HEX) | 27                                                                       |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-4.2 )
* [fileformat.info/info/unicode/char/27](http://www.fileformat.info/info/unicode/char/27 )
* [Apostrophe(wikipedia)](https://en.wikipedia.org/wiki/Apostrophe )

## `(` `)` Parenthesis

* 괄호.
* 여러 프로그래밍 언어에서 함수 호출 연산자로 사용된다.
    * 함수 이름 뒤에 `()`를 붙이는 방식.
    * `()` 안에는 함수에 전달할 인자를 집어넣는다.
* LISP 언어에서는 문법의 핵심이 되는 가장 중요한 기호이다.
* 연산자 우선순위를 명시적으로 강제하고 싶을 때 사용하곤 한다.
* 정규 표현식에서 캡처 그룹을 지정할 때 사용한다.
* Vim에서는 sentence 단위로 커서를 점프시키는 데 사용한다.

| 읽는 방법   | 왼쪽/오른쪽 소괄호, 괄호, left/right parenthesis, paren, bracket, soft bracket |
| 유니코드    | 'LEFT PARENTHESIS' (U+0028) / 'RIGHT PARENTHESIS' (U+0029)                     |
| HTML entity | `&#40;`, `&#x28;` / `&#41;`, `&#x29;`                                          |
| UTF-8 (HEX) | 28 / 29                                                                        |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-4.2 )
* [fileformat.info/info/unicode/char/28](http://www.fileformat.info/info/unicode/char/28 )
* [fileformat.info/info/unicode/char/29](http://www.fileformat.info/info/unicode/char/29 )
* [Bracket(wikipedia)](https://en.wikipedia.org/wiki/Bracket#Parentheses )

## `*` Asterisk

* 별. 기원은 별을 의미하는 상형 문자.
* C 언어의 포인터 변수를 선언할 때 사용한다.
* 여러 프로그래밍 언어에서 곱셈 연산자로 사용된다.
* `?`와 함께 wild card로 사용되곤 한다. 가령 bash 터미널에서 `*.md`는 모든 `md` 확장자를 가진 파일명을 의미한다.
* 정규 표현식에선 0회 이상 반복해서 나타나는 문자열을 의미한다.
* Vim의 NORMAL 모드에서 `*`을 입력하면 커서가 위치한 단어를 검색해 준다. 사용하는 Vim 정규식은 `/\<keyword\>`.
    * 만약 그냥 `keyword`로 검색하고 싶다면 `g*`을 입력하면 된다.
* Markdown 문서에서는 리스트를 표현하고 싶을 때 사용한다.
* Ada, Fortran, Perl, Python, Ruby 같은 프로그래밍 언어에서는 `**`로 거듭제곱(power)을 표현한다.
* C 언어 스타일 주석 `/* */`에도 쓰인다.

| 읽는 방법   | 별, 에스터리스크, 곱하기, star, asterisk, wild card, mult, times |
| 유니코드    | 'ASTERISK' (U+002A)                                              |
| HTML entity | `&#42;`, `&#x2a;`                                                |
| UTF-8 (HEX) | 2A                                                               |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-4.2 )
* [fileformat.info/info/unicode/char/2A](http://www.fileformat.info/info/unicode/char/2A )
* [Asterisk(wikipedia)](https://en.wikipedia.org/wiki/Asterisk )

## `+` Plus sign

* 더하기 기호.
* 여러 프로그래밍 언어에서 덧셈의 의미로 사용한다.
* Java나 Javascript 같은 프로그래밍 언어에서 String concatenation 연산자로 사용한다.
* 정규 표현식에선 1회 이상 반복해서 나타나는 문자열을 의미한다.
* Vim 에서 입력하면 커서가 아랫줄로 한 줄 내려간다.
* C 계열의 프로그래밍 언어에서 `++`는 1씩 숫자를 증가시키는 증감 연산자로 사용된다.

| 읽는 방법   | 더하기, 플러스, plus |
| 유니코드    | 'PLUS SIGN' (U+002B) |
| HTML entity | `&#43;`, `&#x2b;`    |
| UTF-8 (HEX) | 2B                   |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-4.2 )
* [fileformat.info/info/unicode/char/2B](http://www.fileformat.info/info/unicode/char/2B )
* [Plus sign(wikipedia)](https://en.wikipedia.org/wiki/Plus_sign )

## `,` Comma

* 쉼표.
* 일반적으로 배열이나 리스트의 여러 원소를 구분할 때 사용한다.
    * 여러 프로그래밍 언어에서도 같은 의미로 사용한다.
* CSV 파일은 'Comma Seperated Values'의 약자이며, 콤마를 구분자로 사용한 자료가 담긴 파일을 말한다.
* Vim에서는 `f`, `t`, `F`, `T`와 같은 인라인 검색을 역순으로 반복하는 데 사용한다.

| 읽는 방법   | 쉼표, 콤마, comma |
| 유니코드    | 'COMMA' (U+002C)  |
| HTML entity | `&#44;`, `&#x2c;` |
| UTF-8 (HEX) | 2C                |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-4.2 )
* [fileformat.info/info/unicode/char/2C](http://www.fileformat.info/info/unicode/char/2C )
* [Comma(wikipedia)](https://en.wikipedia.org/wiki/Comma )

## `-` Hyphen minus

* 마이너스 기호. 음수를 표현할 때에도 사용된다.
* Vim에서 입력하면 커서가 위로 한 줄 올라간다.
* Lua 언어에서 `--`는 한 줄 주석으로 사용한다.
* C 계열의 프로그래밍 언어에서 `--`는 1씩 숫자를 감소시키는 증감 연산자로 사용된다.
* HTML, XML 주석에도 사용한다. `<!-- -->`
* Markdown에서 리스트를 표현할 때 사용하기도 한다.
* Markdown에서 `---`으로 수평선을 그을 때에도 사용한다.

| 읽는 방법   | 빼기, 마이너스, 하이픈, 대시, minus, hyphen, dash |
| 유니코드    | 'HYPHEN-MINUS' (U+002D)                           |
| HTML entity | `&#45;`, `&#x2d;`                                 |
| UTF-8 (HEX) | 2D                                                |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-4.2 )
* [fileformat.info/info/unicode/char/2D](http://www.fileformat.info/info/unicode/char/2D )
* [Hyphen-minus(wikipedia)](https://en.wikipedia.org/wiki/- )
* [Plus and minus signs(wikipedia)](https://en.wikipedia.org/wiki/Plus_and_minus_signs)

## `.` Full stop

* 마침표.
* 정규 표현식에서는 모든 문자를 의미한다.
* 여러 프로그래밍 언어에서 구조체의 멤버에 접근하는 연산자로 사용한다.
* `Main.java`와 같이 파일의 이름과 확장자를 구분하는 구분자로도 사용된다.
* 소수점 표기에도 사용된다.
* Perl, PHP에서는 String concatenation 연산자로 쓴다.
* Vim에서는 방금 수행한 명령을 반복하라는 repeat 명령으로 사용한다.
* `www.github.com`과 같이 웹 주소의 구분자로도 사용한다.
* `127.0.0.1`과 같이 IP 주소의 구분자로도 사용한다.
* 파일 시스템에서 `.`는 현재 디렉토리이며, `..`는 바로 위 디렉토리를 의미한다.
* Perl, [[Groovy]] 등 여러 언어에서 `..`를 range 연산자로 사용한다. 즉, `..`로 리스트를 생성하거나, 루프를 돌릴 수 있다.

| 읽는 방법   | 마침표, 점, dot, point, full stop |
| 유니코드    | 'FULL STOP' (U+002E)              |
| HTML entity | `&#46;`, `&#x2e;`                 |
| UTF-8 (HEX) | 2E                                |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-4.2 )
* [fileformat.info/info/unicode/char/2E](http://www.fileformat.info/info/unicode/char/2E )
* [Full stop(wikipedia)](https://en.wikipedia.org/wiki/Full_stop)

## `/` Solidus

* 슬래시, 나눗셈 기호.
* Unix 계열에서는 파일 경로 구분자로 사용한다. 윈도우즈에서는 `\`을 사용한다.
* URL을 표기할 때에도 구분자로 사용한다.
* Vim에서 `/`는 검색 명령어이다.
* sed의 명령어 구분자로 사용한다. `s/regexp/replacement/g`.
* JavaScript 언어에서는 `/regex/flag` 방식으로 정규식 객체를 선언할 수 있다.
* Perl, JavaScript, Vim에서 sed처럼 `/`를 구분자로 정규식을 사용해 replace를 할 수 있다.
* 여러 프로그래밍 언어에서 `/`는 나눗셈 연산자다.
* 여러 프로그래밍 언어에서 `//`는 주석을 선언하는 데 사용된다.
* HTML, XML의 태그를 닫는 데에 사용한다. `<TAG> ... </TAG>`.

| 읽는 방법   | 슬래시, 나누기, slash, stroke, solidus |
| 유니코드    | 'SOLIDUS' (U+002F)                     |
| HTML entity | `&#47;`, `&#x2f;`                      |
| UTF-8 (HEX) | 2F                                     |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-4.2 )
* [fileformat.info/info/unicode/char/2F](http://www.fileformat.info/info/unicode/char/2F )
* [Slash(wikipedia)](https://en.wikipedia.org/wiki/Slash_(punctuation) )
* [sed manual](https://www.gnu.org/software/sed/manual/sed.html)

## `:` Colon

* 콜론.
* 여러 프로그래밍 언어에서 삼항연산자(`?:`)로 사용한다.
* JavaScript object와 Python dictionary에서 `key : value`의 형태로 사용한다.
* URL에서 포트 번호를 표시할 때 사용한다. `http://www.google.com:80`.
* Vim에서는 Command line 모드로 변경할 때 사용한다.
* Scala 언어에서 List concatenation에 `::`, `:::`을 사용한다.
    * Scala 언어에서는 연산자를 만들 수 있고, 오버라이드도 가능하므로 (사실은 연산자가 없고, 모두 메소드로 돌아간다)
* C++, Java 8, PHP 등의 언어에서 클래스 멤버, 메소드에 접근하는 연산자(double colon scope resolution operator)로 `::`를 사용한다.

| 읽는 방법   | 콜론, colon                        |
| 유니코드    | Unicode Character 'COLON' (U+003A) |
| HTML entity | `&#58;`, `&#x3a;`                  |
| UTF-8 (HEX) | 3A                                 |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-4.2 )
* [fileformat.info/info/unicode/char/3A](http://www.fileformat.info/info/unicode/char/3A )
* [Colon(wikipedia)](https://en.wikipedia.org/wiki/Colon_(punctuation) )
* [?:(wikipedia)](https://en.wikipedia.org/wiki/%3F:)

### Kotlin, Scala의 타입 생략

* Scala, Kotlin 언어에서는 C 계열 언어들과는 달리 타입명을 변수명 뒤에 쓰는데, 이 때 구분자로 `:`을 쓴다.
* 타입을 뒤에 쓰는 이유는 변수 선언시에 타입을 생략하고 싶으면 `:`부터 `=` 전까지를 생략할 수 있기 때문이다.

```scala
// 이 코드는 스칼라에서도 돌아가고 코틀린에서도 돌아간다!
val hello : String = "hello, world"
```

타입을 생략하면 다음과 같다.

```kotlin
// 이 코드는 스칼라에서도 돌아가고 코틀린에서도 돌아간다!
val hello = "hello, world"
```
## `;` Semicolon

* 세미콜론.
* 수많은 프로그래밍 언어에서 코드 라인의 끝을 인터프리터나 컴파일러에게 알려주기 위해 사용한다.
* 프로그래머의 새끼손가락 건강을 위해 `;`을 쓰지 않아도 되도록 설계한 Scala 같은 착한 언어들이 있다
    * 참고: Scala를 만든 마틴 오더스키가 Programming in Scala에서 새끼손가락 건강 이야기를 했다.
* Vim에서는 `f`, `F`, `t`, `T`의 검색을 반복하는 용도로 사용한다.

| 읽는 방법   | 세미콜론, semicolon                    |
| 유니코드    | Unicode Character 'SEMICOLON' (U+003B) |
| HTML entity | `&#59;`, `&#x3b;`                      |
| UTF-8 (HEX) | 3B                                     |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-4.2 )
* [fileformat.info/info/unicode/char/3B](http://www.fileformat.info/info/unicode/char/3B )
* [Semicolon(wikipedia)](https://en.wikipedia.org/wiki/Semicolon )

## `<` `>` Less than sign, greater than sign

* 부등호. 꺽쇠라고 부르기도 한다.
* [홑화살괄호](http://korean.go.kr/front/page/pageView.do?page_id=P000205&mn_id=30)와는 다른 문자다.
    * 왼쪽 홑화살괄호 &#12296; 는 `U+3008`, 오른쪽 홑화살괄호 &#12297; 는 `U+3009`이다.
* 여러 프로그래밍 언어에서 크기 비교에 사용한다.
* HTML과 XML에서는 태그를 감쌀 때 사용한다. 따라서 HTML, XML에서 태그 선언 외의 용도로 사용할 때 주의해야 한다.
    * 보통은 `&lt;`, `&gt;`로 사용한다.
* Vim NORMAL 모드에서는 line 인덴팅을 좌 우로 옮기기 위한 용도로 사용한다.
* Vim Command line 모드에서는 Visual 모드로 선택한 영역을 표현하는 용도로 사용한다.
* C, C++, Java, JavaScript 에서 비트 쉬프트 연산자로 `<<`, `>>`가 쓰인다.
* SQL에서는 not equal의 의미로 `<>` 연산자를 사용한다.

| 읽는 방법   | less than, greater than, left/right angle bracket                          |
| 유니코드    | Unicode Character 'LESS-THAN SIGN' (U+003C) / 'GREATER-THAN SIGN' (U+003E) |
| HTML entity | `&#60;`, `&#x3c;`, `&lt;` / `&#62;`, `&#x3e;`, `&gt;`                      |
| UTF-8 (HEX) | 3C / 3E                                                                    |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-4.2 )
* [fileformat.info/info/unicode/char/3C](http://www.fileformat.info/info/unicode/char/3C )
* [fileformat.info/info/unicode/char/3E](http://www.fileformat.info/info/unicode/char/3E )
* [Less-than sign(wikipedia)](https://en.wikipedia.org/wiki/Less-than_sign )
* [Greater-than_sign(wikipedia)](https://en.wikipedia.org/wiki/Greater-than_sign )

## `=` Equals sign

* 이퀄스, 등호, 같다.
* 1557년 무렵에 만들어진 기호이다.
* 대부분의 프로그래밍 언어에서 대입 연산자로 사용한다.
* `==`는 다수의 프로그래밍 언어에서 비교 연산자로 사용한다.
    * JavaScript, PHP 등에서는 `===`도 사용한다.
* Vim에서는 인덴팅 명령으로 사용한다.

| 읽는 방법   | 이퀄, equals, gets, takes |
| 유니코드    | 'EQUALS SIGN' (U+003D)    |
| HTML entity | `&#61;`, `&#x3d;`         |
| UTF-8 (HEX) | 3D                        |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-4.2 )
* [fileformat.info/info/unicode/char/3D](http://www.fileformat.info/info/unicode/char/3D )
* [Equals_sign(wikipedia)](https://en.wikipedia.org/wiki/Equals_sign )

### 등호의 기원

이언 스튜어트의 [[17-EQUATIONS-THAT-CHANGED-THE-WORLD]]{세계를 바꾼 17가지 방정식} 머리말에서 발췌.

>
방정식의 힘은 그 근원이 단순하다.
방정식은 두 계산이 서로 달라 보여도 답이 같다는 것을 말해 준다.
핵심 기호는 등호(=)다.
대다수 수학 기호의 기원은 고대의 안개 속으로 사라졌든가 아니면 반대로 너무나 최근에 생겨서 그 기원이 무엇인지 전혀 의심할 여지가 없다.
그러나 등호는 450년도 더 전에 등장했음에도 불구하고 만든 사람뿐만이 아니라 만든 이유까지 알려져 있다는 점에서 특별하다.
등호는 로버트 레코드(Robert Recorde)가 1557년에 "지혜의 숫돌(The Whetstone of Witte)"에서 처음 선보였다.
레코드는 "~는 ~와 같다"라는 말을 지루하게 반복하지 않도록 서로 평행한 두 선을 사용했다.
(그는 '쌍둥이'라는 뜻의 사어인 'gemowe'를 썼다.)
그가 그 기호를 쓴 것은 "세상에서 그 두 선만큼 똑같은 것은 없기" 때문이었다.
레코드의 선택은 옳았다.
등호는 450년이라는 오랜 세월 동안 사용되었다.


### Perl 언어의 `=`가 포함된 연산자

Perl에는 `=`가 포함된 다양한 연산자가 있다.  
다른 언어에도 많지만, Perl은 다른 언어에 없는 연산자가 몇 개 더 있다.

* `=` - 대입 연산자. 변수에 값을 대입한다.
    * `+=`, `-=`, `*=`, `/=`, `%=`, `**=`
* `==` - equal to. 값이 같은지를 비교한다.
* `!=` - not equal to. 값이 다른지를 비교한다.
* `>=` - greater than or equal to.
* `<=` - less than or equal to.
* `<=>` - 크기 비교 연산자. 이 연산자는 `-1`, `0`, `1` 중 하나를 리턴한다. `3 <=> 4`의 결과는 `-1`.
* `=~` - 정규식 패턴과 매치되는지를 비교한다. `if ($text =~ /^test$/) { }`와 같이 사용.

## `?` Question mark

* 물음표.
* 에스파냐어(스페인어)에서는 위아래를 뒤집은 물음표를 문장 앞에 붙여, 의문문이 시작된다는 것을 읽는 사람에게 알린다.
* `*`와 함께 검색어에 많이 사용되는 wild card. 단, `*`는 길이 제한이 없지만, `?`는 보통 한 글자를 의미한다.
* 다수의 프로그래밍 언어에서 `? :` 형식의 삼항 연산자로 사용한다.
* 정규 표현식에선 지정한 문자가 존재하지 않거나 1번 있는 경우를 의미한다. `*`뒤에 붙이면 `*`의 greedy 속성을 죽일 수 있다.
* Java generics에서 wildcard로 사용한다.
* 정규표현식에서 캡처 그룹이 `?:`로 시작하면 해당 그룹을 캡처하지 않는다.
* Kotlin 언어에서 nullable 변수를 선언할 때 사용한다. `var foo: String? = "test"`.
* [[Groovy]], Kotlin 언어에는 변수의 값이 null 인 경우 할당할 값을 지정하는 `?:` 연산자(Elvis operator)도 있다.
    * 사실은 삼항연산자를 줄여 표현한 것이다.
    * `displayName = user.name ? user.name : 'Anonymous'`과 `displayName = user.name ?: 'Anonymous'`은 같은 코드.
    * Elvis 연산자 이름의 어원은 [미국 가수 엘비스 프레슬리(Elvis Presley)의 헤어스타일](https://www.google.co.kr/search?q=elvis+presley+hair&tbm=isch)이다. 이마 한쪽이 동그랗게 말린 모양이 비슷하다고.
* Vim에서는 역순 검색에 사용한다.

| 읽는 방법   | 물음표, question mark, query, ques, whildchar |
| 유니코드    | 'QUESTION MARK' (U+003F)                      |
| HTML entity | `&#63;`, `&#63;`                              |
| UTF-8 (HEX) | 3F                                            |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-4.2 )
* [fileformat.info/info/unicode/char/3F](http://www.fileformat.info/info/unicode/char/3F )
* [Question_mark(wikipedia)](https://en.wikipedia.org/wiki/Question_mark )
* [Elvis_operator(wikipedia)](https://en.wikipedia.org/wiki/Elvis_operator)

## `@` Commercial at

* 앳, 골뱅이.
* 이메일 주소에 사용한다.
    * [레이 톰린슨(Ray Tomlinson)](https://en.wikipedia.org/wiki/Ray_Tomlinson)이 이메일 주소에 `@`를 도입했다.
        * 최초의 네트워크 이메일 시스템을 설계하고 구현한 사람이다.
        * 인터뷰에서 `@`기호를 이메일에 쓴 이유에 대해 "그냥 컴퓨터에 그 기호가 있길래 썼죠"라고 대답했다.
* Java, Scala 언어에서 annotation으로 사용한다.
* Perl 언어 배열의 prefix로 쓴다.
* Vim에서는 레지스터에 담긴 문자열을 실행하는 데 사용한다. 이를 통해 Vim에서 매크로를 사용할 수 있다.
* Vim에서 `@@`를 입력하면 가장 최근에 실행한 매크로를 현재 라인에서 반복한다.

| 읽는 방법   | 골뱅이, 앳, at sign, at, strudel |
| 유니코드    | 'COMMERCIAL AT' (U+0040)         |
| HTML entity | `&#64;`, `&#x40;`                |
| UTF-8 (HEX) | 40                               |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-4.2 )
* [fileformat.info/info/unicode/char/40](http://www.fileformat.info/info/unicode/char/40 )
* [At_sign(wikipedia)](https://en.wikipedia.org/wiki/At_sign )

## `[` `]` Square bracket

* 대괄호.
* 다수의 프로그래밍 언어에서 배열 인덱스를 표현할 때 사용한다.
* 정규표현식에서는 문자 집합을 지정할 수 있다. `[abc]`는 `a`, `b`, `c` 세 글자를 의미한다.
* Vim에서는 대괄호를 사용하는 점프 명령이 굉장히 다양하다. `:help [`로 보면 45개 정도 된다.

| 읽는 방법   | 대괄호, 각괄호, left/right square bracket, bracket               |
| 유니코드    | 'LEFT SQUARE BRACKET' (U+005B) / 'RIGHT SQUARE BRACKET' (U+005D) |
| HTML entity | `&#91;`, `&#x5b;` / `&#93;`, `&#x5d;`                            |
| UTF-8 (HEX) | 5B / 5D                                                          |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-4.2 )
* [fileformat.info/info/unicode/char/5B](http://www.fileformat.info/info/unicode/char/5B )
* [fileformat.info/info/unicode/char/5D](http://www.fileformat.info/info/unicode/char/5D )
* [Box brackets or square brackets(wikipedia)](https://en.wikipedia.org/wiki/Bracket#Box_brackets_or_square_brackets_.5B_.5D )

### C 언어 배열

배열 인덱스로 대괄호를 사용하는 언어로 가장 유명한 것은 C일 것이다.

C에서는 다음과 같이 배열을 선언한다.

```c
int a[10];
```

`a[i]`는 `a`의 주소에서 `i`만큼 뒤쪽 주소를 표현한다.
* 배열과 `[]`인덱스는 포인터와 오프셋을 표현한 것이기 때문이다.
* 따라서 `a[i]`는 `*(a+i)`와 같다.
* 즉, 배열 `a`와 배열의 원소 `a[0]`은 주소가 같다.
* 많은 프로그래밍 언어에서 배열이 `0`부터 시작하는 이유이기도 하다.
    * 참고: Lua 언어처럼 배열이 `1`부터 시작하는 언어도 있다.
* C 계열의 프로그래밍 언어에서 배열의 음수 인덱스를 지원하지 않는 이유이기도 하다.

Python이나 Vimscript처럼 `-1`인덱스를 지원하는 언어도 있다.
* 그러나 `*(a-1)`을 의미하는 것은 아니고, 마지막 인덱스를 사용하기 편하도록 배열 문법에 설탕을 뿌린 것이다.

### 구간(interval) 표기법

숫자의 목록이나 범위를 표현할 때 구간 표기법을 사용하면, 길이나 마지막 인덱스 등을 편리하게 표현할 수 있다.

* `[1, 10]` $$1 \le x \le 10$$ 이다. 정수의 목록이라면 10개의 원소가 있다.
* `[1, 10)` $$1 \le x \lt 10$$ 이다. 정수의 목록이라면 원소는 9개이며, 10은 포함되지 않는다.
* `(0, 10]` $$1 \lt x \le 10$$ 이다. 정수의 목록이라면 1부터 10까지의 목록이다. 10개의 원소가 있다. 0은 포함되지 않는다.
* `(0, 10)` $$1 \lt x \lt 10$$ 이다. 정수의 목록이라면 1부터 9까지의 목록이다. 원소는 9개이며, 0과 10은 포함되지 않는다.

## `\` Reverse solidus

* 역슬래시.
* 다수의 프로그래밍 언어에서 문자열 이스케이핑에 사용한다.
    * `\t`, `\n`, `\r`, `\'`, `\"`, `\\`가 흔히 사용된다.
* 정규표현식에서 사전 정의된 문자 집합, 특수 문자의 이스케이핑에 사용된다.
* MS-DOS, MS-Windows에서 파일 경로 구분자로 사용한다.
* Vim에서는 보통 `<Leader>`키로 지정한다.
* LaTeX에서 키워드 prefix로 사용한다. `\lt`, `\gt`, `\frac` 등등.

| 읽는 방법   | 백슬래시, 역슬래시, backslash, escape, reverse slash |
| 유니코드    | 'REVERSE SOLIDUS' (U+005C)                           |
| HTML entity | `&#92;`, `&#x5c;`                                    |
| UTF-8 (HEX) | 5C                                                   |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-4.2 )
* [fileformat.info/info/unicode/char/5C](http://www.fileformat.info/info/unicode/char/5C )
* [Backslash(wikipedia)](https://en.wikipedia.org/wiki/Backslash )


## `^` Circumflex accent

* 카렛. 캐럿.
* 한국어 위키백과에는 "곡절 부호"라고 하는데, 이렇게 읽는 사람을 본 적이 없다.
* 일반적으로 거듭제곱 표기에 사용한다. `2^3`.
* 다수의 프로그래밍 언어에서는 비트 [XOR(Exclusive or)](https://en.wikipedia.org/wiki/Exclusive_or)로 사용한다.
* 정규표현식에서
    * start of string anchor로 사용한다. 즉, 문자열이 시작하는 지점.
    * 해당하지 않는 문자 그룹 지정에 사용한다. `[^abc]`는 `a`, `b`, `c`가 아닌 모든 문자를 의미한다.
* Vim에서는 정규표현식과 비슷한 의미로 사용한다. 커서를 현재 라인의 첫 글자로 옮긴다.
* LaTeX에서는 뒤에 오는 오브젝트를 윗 첨자로 올릴 때 사용한다.
    * `\pi^3`은 $$ \pi^3 $$이 된다.
    * `\log_2^8`은 $$ \log_2^8 $$이 된다.

| 읽는 방법   | 카렛, 캐럿, caret, control   |
| 유니코드    | 'CIRCUMFLEX ACCENT' (U+005E) |
| HTML entity | `&#94;`, `&#x5e;`            |
| UTF-8 (HEX) | 5E                           |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-4.2 )
* [fileformat.info/info/unicode/char/5E](http://www.fileformat.info/info/unicode/char/5E )
* [Circumflex(wikipedia)](https://en.wikipedia.org/wiki/Circumflex )

## `_` Low line

* 언더바, 언더스코어.
* [snake_case 스타일로 띄어쓰기를 표기](https://en.wikipedia.org/wiki/Snake_case)할 때 사용한다.
* Perl 언어의 기본 변수는 `$_`이다. 루프 인덱스 외에도 굉장히 다양하게 사용한다.
* Scala 언어에서 매우 다양한 용도로 사용한다.
* PHP의 magic method들의 prefix로 `__`를 쓴다.
* [JavaScript 라이브러리 underscore.js](http://underscorejs.org/)를 쓰면 `_` 객체에서 underscore.js의 함수들을 꺼내 쓸 수 있다.

| 읽는 방법   | 언더바, 언더스코어, 밑줄, underline, underscore, underbar |
| 유니코드    | 'LOW LINE' (U+005F)                                       |
| HTML entity | `&#95;`, `&#x5f;`                                         |
| UTF-8 (HEX) | 5F                                                        |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-4.2 )
* [fileformat.info/info/unicode/char/5F](http://www.fileformat.info/info/unicode/char/5F )
* [Underscore(wikipedia)](https://en.wikipedia.org/wiki/Underscore )

## ``` ` ``` Grave accent

* 억음 부호.
* 키보드 오른쪽의 외따옴표 `'`와는 다른 글자이다. ``` ` ```는 키보드 제일 왼쪽, Tab키 위에 있다.
* JavsScript에서 interpolation 가능한 문자열을 선언할 때 사용한다.
* 마크다운에서 `<code>`태그를 입히는 데 사용한다.
* Vim에서는 마크를 찍어둔 지점으로 점프할 때 사용한다.

| 읽는 방법   | 백틱, 그레이브, grave accent, grave, backtick, backquote |
| 유니코드    | 'GRAVE ACCENT' (U+0060)                                  |
| HTML entity | `&#96;`, `&#x60;`                                        |
| UTF-8 (HEX) | 60                                                       |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-4.2 )
* [fileformat.info/info/unicode/char/60](http://www.fileformat.info/info/unicode/char/60 )
* [Grave_accent(wikipedia)](https://en.wikipedia.org/wiki/Grave_accent )

## `{` `}` Curly bracket

* 중괄호.
* 다수의 프로그래밍 언어에서 코드 블록을 지정하는 데에 사용한다.
    * 다수의 프로그래밍 언어가 변수의 유효범위가 중괄호 코드 블록과 같도록 한다.
* 다수의 프로그래밍 언어에서 interpolation에 사용한다.
* 정규표현식에서 반복을 의미한다. 예를 들어 `{3}`이면 3회 반복. `{3,}`이면 3회 이상 반복.
* Vim에서는 문단 단위 커서 점프를 할 때 사용한다.

| 읽는 방법   | 중괄호, brace, curly bracket                                   |
| 유니코드    | 'LEFT CURLY BRACKET' (U+007B) / 'RIGHT CURLY BRACKET' (U+007D) |
| HTML entity | `&#123;`, `&#x7b;` / `&#125;`, `&#x7d;`                        |
| UTF-8 (HEX) | 7B / 7D                                                        |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-4.2 )
* [fileformat.info/info/unicode/char/7B](http://www.fileformat.info/info/unicode/char/7B )
* [fileformat.info/info/unicode/char/7D](http://www.fileformat.info/info/unicode/char/7D )
* [Curly brackets or braces(wikipedia)](https://en.wikipedia.org/wiki/Bracket#Curly_brackets_or_braces_.7B_.7D )


## `|` Vertical line

* 정규표현식에서 or의 의미로 사용한다.
* 다수의 프로그래밍 언어에서 비트 or 연산자로 사용한다.
* 다수의 프로그래밍 언어에서 `||`는 or 연산자이다.
* Vim에서는 스크린상의 column을 세는 데 사용한다. 일반적으로 쓸 일은 없고 좀 특수한 Vim 플러그인을 개발할 때 사용할 일이 있다.

| 읽는 방법   | 파이프, 바, bar, pipe, vertical bar, or bar |
| 유니코드    | 'VERTICAL LINE' (U+007C)                    |
| HTML entity | `&#124;`, `&#x7c;`                          |
| UTF-8 (HEX) | 7C                                          |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-4.2 )
* [fileformat.info/info/unicode/char/7C](http://www.fileformat.info/info/unicode/char/7C )
* [Vertical_bar(wikipedia)](https://en.wikipedia.org/wiki/Vertical_bar )


## `~` Tilde

* 다수의 프로그래밍 언어에서 비트 not 연산자로 사용한다.
* Unix에서 Home 디렉토리를 의미한다.
* Vim에서는 대소문자 토글에 사용한다.
* Perl 언어에서 정규식 매칭 연산자로 `=~`를 사용한다.
* Excel의 찾기에서 와일드카드를 이스케이핑할 때 사용한다.
    * `*` : 모든 글자
    * `~*` : *
    * `?` : 한 글자
    * `~?` : ?

| 읽는 방법   | 물결, tilde, not   |
| 유니코드    | 'TILDE' (U+007E)   |
| HTML entity | `&#126;`, `&#x7e;` |
| UTF-8 (HEX) | 7E                 |

* [RFC 20](https://tools.ietf.org/html/rfc20#section-4.2 )
* [fileformat.info/info/unicode/char/7E](http://www.fileformat.info/info/unicode/char/7E )
* [Tilde(wikipedia)](https://en.wikipedia.org/wiki/Tilde )
* [Using wildcard characters in searches (support.office.com)](https://support.office.com/en-us/article/using-wildcard-characters-in-searches-ef94362e-9999-4350-ad74-4d2371110adb )

## Links

* [ASCII (The Jargon File)]( http://www.catb.org/jargon/html/A/ASCII.html )
* [Basic Latin (Unicode block) (wikipedia)]( https://en.wikipedia.org/wiki/Basic_Latin_(Unicode_block) )
* [ASCII(7) (man7.org)]( http://man7.org/linux/man-pages/man7/ascii.7.html )
