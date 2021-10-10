---
layout  : wiki
title   : 배커스-나우르 표기법 (Backus-Naur form)
summary : 
date    : 2021-09-23 13:55:43 +0900
updated : 2021-10-10 16:10:09 +0900
tag     : 
toc     : true
public  : true
parent  : [[root-index]]
latex   : false
---
* TOC
{:toc}

- BNF notation 이라고도 부른다.

## From: 한 권으로 읽는 컴퓨터 구조와 프로그래밍

> 배커스-나우르 표기법(BNF)는 인도 산스크리트 철학자 파니니(Pāṇini, 기원전 5세기)의 작업에서 뿌리를 찾아볼 수 있다.
BNF라는 이름은 포트란을 만든 미국 컴퓨터과학자인 존 배커스(John Backus, 1924~2007)와 덴마크 컴퓨터과학자 페테르 나우르(Peter Naur, 1928~2016)의 이름에서 비롯됐다.
BNF는 언어를 정의하는 형식적인 방법이다. 여기서 BNF를 자세히 다루지는 않는다.
하지만 여러 문서(예: 인터넷 프로토콜을 정의하는 RFC(request for comments)) 등에서 BNF가 쓰이기 때문에 여러분은 BNF에 익숙해져야만 한다.
다음은 부동소수점 수를 정의하는 BNF다.
>
> ```bnf
> <digit>             ::= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
> <digits>            ::= <digit> | <digits> <digit>
>
> <e>                 ::= "e" | "E"
> <sign>              ::= "+" | "-"
> <optional-sign>     ::= <sign> | ""
>
> <exponent>          ::= <e> <optional-sign> <digits>
> <optional-exponent> ::= <exponent> | ""
>
> <mantissa>          ::= <digits> | <digits> "." | "." <digits> | <digits> "." <digits>
> <floating-point>    ::= <optional-sign> <mantissa> <optional-exponent>
> ```
>
`::=`의 왼쪽에 있는 요소를 오른쪽에 있는 요소로 대치할 수 있다. `|`는 선택(`|`로 연결된 여러 가지 중 어느 하나가 가능함)을 뜻하며,
큰따옴표 안에 있는 요소는 리터럴(literal)이다. 리터럴이라는 말은 쓰여 있는 그대로 나타나야 한다는 뜻이다.
>
-- 한 권으로 읽는 컴퓨터 구조와 프로그래밍. 8장. 326쪽.

## 사례
### RFC 2141 - URN Syntax

짧은 문서인 [RFC 2141]( https://www.ietf.org/rfc/rfc2141.txt )를 읽어보면 BNF를 사용해 URN의 신택스를 표기하고 있다.

다음은 RFC 2141의 일부이다.

```bnf
<NID>         ::= <let-num> [ 1,31<let-num-hyp> ]

<let-num-hyp> ::= <upper> | <lower> | <number> | "-"

<let-num>     ::= <upper> | <lower> | <number>

<upper>       ::= "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" |
                  "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" |
                  "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" |
                  "Y" | "Z"

<lower>       ::= "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" |
                  "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" |
                  "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" |
                  "y" | "z"

<number>      ::= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" |
                  "8" | "9"
```

### From: GoF의 디자인패턴

[GoF의 디자인 패턴] 인터프리터 챕터에서, 다음 예제가 정규 표현식을 정의하는 문법이라고 가정하며 설명한다.

```bnf
expression ::= literal | alternation | sequence | repetition | '(' expression ')'
alternation ::= expression '|' expression
sequence ::= expression '&' expression
repetition ::= expression '*'
literal ::= 'a' | 'b' | 'c' | ... { 'a' | 'b' | 'c' | ... }*
```


## 참고문헌

- GoF의 디자인 패턴(개정판) / 에릭 감마, 리처드 헬름, 랄프 존슨, 존 블라시디스 공저 / 김정아 역 / 프로텍미디어 / 발행 2015년 03월 26일
- 한 권으로 읽는 컴퓨터 구조와 프로그래밍 / 조너선 스타인하트 저/오현석 역 / 책만 / 2021년 04월 08일 초판 1쇄 / 원서 : The Secret Life of Programs: Understand Computers -- Craft Better Code

