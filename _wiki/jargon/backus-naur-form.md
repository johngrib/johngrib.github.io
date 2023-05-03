---
layout  : wiki
title   : 배커스-나우르 표기법 (Backus-Naur form)
summary : 
date    : 2021-09-23 13:55:43 +0900
updated : 2023-04-13 22:21:09 +0900
tag     : 
resource: 8B/8C9CB0-84EB-46CD-9952-02B9F919B7C8
toc     : true
public  : true
parent  : [[/jargon]]
latex   : true
---
* TOC
{:toc}

- BNF notation 이라고도 부른다.

## Backus-Naur Form

> 배커스-나우르 표기법(BNF)은 인도 산스크리트 철학자 파니니(Pāṇini, 기원전 5세기)의 작업에서 뿌리를 찾아볼 수 있다.
BNF라는 이름은 포트란을 만든 미국 컴퓨터과학자인 [[/people/john-w-backus]]{존 배커스(John Backus, 1924~2007)}와 덴마크 컴퓨터과학자 페테르 나우르(Peter Naur, 1928~2016)의 이름에서 비롯됐다.
BNF는 언어를 정의하는 형식적인 방법이다. 여기서 BNF를 자세히 다루지는 않는다.
하지만 여러 문서(예: 인터넷 프로토콜을 정의하는 [[/_rfc]]{RFC(request for comments)}) 등에서 BNF가 쓰이기 때문에 여러분은 BNF에 익숙해져야만 한다.
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
[^jona-326]

### 사례: RFC 2141 - URN Syntax

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

### 사례: 미국 우편주소

다음은 해커 영어사전에 수록된 미국 우편주소의 BNF이다.[^hacker-dict-132]

```bnf
<postal-address> ::= <name-part><street-address> <zip-part>

<personal-part> ::= <name> | <initial> "."

<name-part> ::= <personal-part><last-name>[<jr-part>] <EOL>
              | <personal-part><name-part>

<street-address> ::= [<apt>]<house-num><street-name> <EOL>

<zip-part> ::= <town-name> "." <state-code><ZIP-code> <EOL>
```

- `<postal-address> ::= <name-part><street-address> <zip-part>`
    - 우편주소(postal-address)는 이름 부분(name-part)과 거리 주소(street-address) 그리고 우편번호(zip-part)로 구성된다.
- `<personal-part> ::= <name> | <initial> "."`
    - 개인 부분(personal-part)은 이름(name) 또는 이름의 이니셜과 점(.)으로 구성된다.
- `<name-part> ::= <personal-part><last-name>[<jr-part>] <EOL>`
    - 이름 부분(name-part)은 위에서 정의한 개인 부분(personal-part)과 성(last-name)으로 구성된다. 선택적으로 `Jr.` `Sr.` 같은 접미사(jr-part)가 올 수 있다.
    - 또는 이름 부분(name-part)은 개인 부분(personal-part)과 이름 부분(name-part)으로 구성된다.
- `<street-address> ::= [<apt>]<house-num><street-name> <EOL>`
    - 거리 주소(street-address)는 선택적으로 아파트 번호(apt)가 올 수 있고, 건물 번호(house-num)와 거리 이름(street-name)으로 구성된다.
- `<zip-part> ::= <town-name> "." <state-code><ZIP-code> <EOL>`
    - 우편번호(zip-part)는 도시 이름(town-name)과 점(.), 주 코드(state-code) 그리고 우편번호(ZIP-code)로 구성된다.


## Extended Backus-Naur Form

Extended Backus-Naur Form은 Niklaus Wirth[^wirth]가 설계했다.
[^alex-233]

### 사례: GoF의 디자인패턴

[GoF의 디자인 패턴] 인터프리터 챕터에서, 다음 예제가 정규 표현식을 정의하는 문법이라고 가정하며 설명한다.[^gof-324]

```bnf
expression ::= literal | alternation | sequence | repetition | '(' expression ')'
alternation ::= expression '|' expression
sequence ::= expression '&' expression
repetition ::= expression '*'
literal ::= 'a' | 'b' | 'c' | ... { 'a' | 'b' | 'c' | ... }*
```

### 사례: C++ 서브셋 정의

여기에서 소개하는 C++ 서브셋 정의는 Alexander Stepanov의 Elements of Programming에 부록으로 수록된 것으로, Bjarne Stroustrup이 작성한 것이다.[^alex-233]
[^alex-intro]
그런데 국내에 번역 출간된 [Elements of Programming 프로그래밍의 이해]가 절판되었다고 하니 부록 전체를 인용한다.[^out-of-print-2018]
몇몇 표현은 내가 수정하였다.

#### 구문 표기법

>
식별자(identifier)는 비종단 기호(nonterminal symbol)를 나타내기 위해 이용되었으며 리터럴(literal)은 종단 기호(terminal symbol)를 나타냅니다.
간결성을 위해 식별자와 문자(character)는 더 자세히 정의하지 않습니다.
>
> ```bnf
> syntax      = {production}.
> production  = identifier "=" expression ".".
> expression  = term {"|" term}.
> term        = factor {factor}.
> factor      = identifier | literal
>                 | "(" expression ")"
>                 | "[" expression "]"
>                 | "{" expression "}".
> literal     = """" character {character} """".
> ```
>
> 반복은 괄호로 `{a}`와 같이 나타내며 `ϵ | a | aa | aaa |`를 의미합니다.[^epsilon]
임의성(optionality)은 괄호로 `[a]`와 같이 나타내며 `a | ϵ` 를 의미합니다.
둥근 괄호는 단순히 그룹화의 역할을 하며 예를 들어 `(a | b) c`는 `ac | bc`와 같습니다.
종단 기호 즉 리터럴은 인용 부호 안에 표시됩니다(인용부호가 리터럴 자체로 나타나는 경우에는 두 번 씁니다).

#### 어휘 규정

> 다음은 식별자와 리터럴의 구문을 제공합니다.
>
> ```bnf
> identifier  = (letter | "_") {letter | "_" | digit}.
> literal     = boolean | integer | real.
> boolean     = "false" | "true".
> integer     = digit {digit}.
> real        = integer "." [integer] | "." integer.
> ```
>
> 주석은 두 개의 슬래시에서 시작하여 라인의 끝에서 종료됩니다.
>
> ```bnf
> comment     = "//" {character} eol.
> ```

#### 기본 타입

> 세 가지 C++ 타입을 이용합니다. Bool은 참과 거짓 값이며 int는 부호 있는 정수 값, double은 IEEE 64 비트 부동소수점 값입니다.
>
> ```bnf
> basic_type = "bool" | "int" | "double".
> ```

#### 식

>
식은 런타임이나 컴파일 타임이 될 수 있습니다.
컴파일 타임 식은 값이나 타입을 평가할 수 있습니다.
>
식은 다음의 문법으로 정의됩니다. 문법 내에서 아래에 오는 결과물 안의 연산자는 바깥 결과물보다 높은 선행 순서를 가집니다.
>
> ```bnf
> expression      = conjunction {"||" conjunction}.
> conjunction     = equality {"&&" equality}.
> equality        = relational {("==" | "!=") relational}.
> relational      = additive {("<" | ">" | "<=" | ">=") additive}.
> additive        = multiplicative {("+" | "-") multiplicative}.
> multiplicative  = prefix {("*" | "/" | "%") prefix}.
> prefix          = ["-" | "!" | "const"] postfix.
> postfix         = primary {"." identifier
>                     | "(" [expression_list] ")"
>                     | "[" expression "]"
>                     | "&"}.
> primary         = literal | identifier | "(" expression ")"
>                     | basic_type | template_name | "typename".
> expression_list = expression {"," expression}.
> ```
>
`||` 및 `&&` 연산자는 각각 `∨`(disjunction)와 `∧`(conjunction)를 지정합니다.
피연산자(operand)는 Boolean 값이어야 합니다.
첫 번째 피연산자는 두 번째 피연산자보다 먼저 평가됩니다.
첫 번째 피연산자가 식의 결과를 결정하면(`true ||`, `false &&`)[^alex-235-typo] 두 번째 피연산자는 평가되지 않으며 결과는 첫 번째 피연산자의 값이 됩니다.
접두어 `!` 는 `¬`(negation) 이며 Boolean 값에 적용되어야 합니다.
>
- `==` 와 `!=` 은 각각 등식, 부등식 연산자이며 Boolean 값을 반환합니다.
- `<`, `>`, `<=`, `>=` 는 각각 보다 작은, 보다 큰, 이하, 이상을 나타내며 Boolean 값을 반환합니다.
- `+`와 `-`는 각각 더하기와 빼기를 나타내며 접두어 `-`는 덧셈에 대한 역원을 나타냅니다.
- `*`, `/`, `%` 는 각각 곱셈, 나눗셈, 나머지를 나타냅니다.
- 접미어 `.`(dot)는 구조 타입의 오브젝트를 취하여 점 뒤에 오는 식별자에 해당하는 구성요소를 반환합니다.
- 접미어 `()`는 적용 연산자가 정의된 프로시저나 오브젝트를 취하여 주어진 인자와 함께 프로시저의 호출 결과 또는 함수 오브젝트의 호출 결과를 반환합니다. 타입에 적용할 경우 `()` 는 인자를 이용하여 생성을 수행하며 타입 함수에 적용할 경우 다른 타입을 반환합니다.
- 접미어 `[]`는 인덱스 연산자가 정의된 오브젝트를 취하여 괄호 안의 식의 값으로 정의되는 위치 에 있는 요소를 반환합니다.
- 접두어 `const`는 피연산자의 상수 버전에 해당하는 타입을 반환하는 타입 연산자입니다.
- 접미어 `&`는 피연산자의 레퍼런스 타입을 반환하는 타입 연산자입니다.

#### 열거

>
열거는 목록 내의 각 식별자에 해당하는 고유 값을 가진 타입을 생성합니다.
열거에 대해 정의된 연산은 등식, 관계 연산, 부등식, 생성, 소멸, 할당과 같은 정칙 타입이어야 합니다.
>
> ```bnf
> enumeration     = "enum" identifier "{" identifier_list "}" ";".
> identifier_list = identifier {"," identifier}.
> ```

#### 구조체

>
구조체[^alex-235]는 데이터 구성요소를 호출한 명칭과 타입을 가진 오브젝트의 이종 튜플로 구성된 타입입니다.
각각의 데이터 구성요소는 개별 오브젝트나 상수 크기의 배열에 해당합니다.
또한 구조는 생성자와 소멸자, 구성요소 연산자(할당, 적용, 인덱스), 지역 `typedef`의 정의를 포함할 수 있습니다.
적용 연산자 구성요소를 가진 구조는 함수 오브젝트(function object)라 합니다.
구조의 바디를 누락하면 포워드 선언을 허용합니다.
>
> ```bnf
> structure       = "struct" structure_name [structure_body] ";".
> structure_name  = identifier.
> structure_body  = "{" {member} "}".
> member          = data_member
>                     | constructor | destructor
>                     | assign | apply | index
>                     | typedef.
> data_member     = expression identifier ["[" expression "]"] ";".
> constructor     = structure_name "(" [parameter_list] ")"
>                     [":" initializer_list] body.
> destructor      = "~" structure_name "(" ")" body.
> assign          = "void" "operator" "="
>                     "(" parameter ")" body.
> apply           = expression "operator" "[" "]"
>                     "(" parameter ")" body.
> 
> initializer_list = initializer {"," initializer}.
> initializer      = identifier "(" [expression_list] ")".
> ```
>
구조 타입의 상수 레퍼런스를 취하는 생성자는 복사 생성자(copy constructor)입니다.
복사 생성자가 정의되지 않으면 구성요소마다 복사생성자가 생성됩니다.
인자가 없는 생성자는 디폴트 생성자(default constructor)입니다.
구성요소별 디폴트 생성자는 다른 생성자가 정의되지 않은 경우에만 생성됩니다.
할당 연산자가 정의되지 않으면 구성요소마다 할당 연산자가 생성됩니다.
소멸자가 제공되지 않으면 구성요소별 소멸자가 생성됩니다.
초기화 목록에 있는 각각의 식별자는 구조 데이터 구성요소의 식별자입니다.
생성자가 초기화 목록을 가지고 있으면 구조의 데이터 구성요소는 식 목록에 맞는 생성자로 구성됩니다.
>
이러한 모든 구성은 생성자의 바디가 실행되기 이전에 수행됩니다.

#### 프로시저

>
프로시저는 반환 타입으로 구성되거나 반환 값이 없는 경우 `void` 뒤에 이름과 파라미터 목록이 오는 식으로 구성됩니다.
이름은 식별자나 연산자가 됩니다. 파라미터 식은 타입을 생성해야 합니다. 바디가 없는 프로시저 시그니처는 포워드 선언을 허용합니다.
>
> ```bnf
> procedure       = (expression | "void") procedure_name
>                     "(" [parameter_list] ")" (body | ";").
> procedure_name  = identifier | operator.
> operator        = "operator"
>                     ("==" | "<" | "+" | "-" | "*" | "/" | "%").
> parameter_list  = parameter {"," parameter}.
> parameter       = expression [identifier].
> body            = compound.
> ```
>
목록에 포함된 연산자만이 정의 가능합니다.
연산자 `!=`의 정의는 `==`의 항에서 생성됩니다.
연산자 `>`, `<=`와 `>=`의 정의는 `<`의 항에서 생성됩니다.
프로시저가 호출되면 각 인자 식의 값은 해당 파라미터로 묶이며 프로시저의 바디가 수행됩니다.

#### 구문

> 구문은 프로시저와 생성자, 소멸자, 구성요소 연산자의 바디를 구성합니다.
>
> ```bnf
> statement       = [identifier ":"]
>                     (simple_statement | assignment
>                     | construction | control_statement
>                     | typedef).
> simple_statement = expression ";".
> assignment      = expression "=" expression ";".
> construction    = expression identifier [initialization] ";".
> initialization  = "(" expression_list ")" | "=" expression.
> control_statement = return | conditional | switch | while | do
>                         | compound | switch | break | goto.
> return          = "return" [expression] ";".
> conditional     = "if" "(" expression ")" statement
>                     ["else" statement].
> switch          = "switch" "(" expression ")" "{" {case} "}".
> case            = "case" expression ":" {statement}.
> while           = "while" "(" expression ")" statement.
> do              = "do" statement
>                     "while" "(" expression ")" ";".
> compound        = "{" {statement} "}".
> break           = "break" ";".
> goto            = "goto" identifier ";".
> typedef         = "typedef" expression identifier ";".
> ```
>
프로시저 호출에 해당하는 간단한 구문은 부작용을 평가 받습니다.
할당은 왼쪽 오브젝트의 타입에 대한 할당 연산자에 적용됩니다.
구성의 첫 번째 식은 생성할 타입을 제공하는 타입 식입니다.
초기화를 실시하지 않는 구성은 디폴트 생성자에 적용됩니다.
괄호 식 목록을 가진 구성은 매칭 생성자를 적용합니다.
뒤에 식이 오는 등호를 가진 구성은 복사 생성자를 적용합니다.
식은 생성되는 오브젝트와 같은 타입을 가져야 합니다.
>
- `return` 구문은 식의 값을 함수 결과로 나타내는 동시에 현재 함수의 호출자에 대한 통제를 반환합니다. 식은 함수의 반환타입 값을 평가해야 합니다.
- 조건문은 식의 값이 참일 때 첫 번째 구문을 실행합니다. 식이 거짓이고 `else` 절이 오면 두 번 째 구문이 실행됩니다. 식은 반드시 `Boolean`으로 평가되어야 합니다.
- `switch` 구문은 식을 평가한 다음 매칭 값을 가진 `case` 레이블이 따라오는 첫 번째 구문을 실행합니다. `switch` 구문의 끝 또는 `break` 구문까지 실행됩니다. `switch` 구문의 식은 정수나 열거로 평가되어야 합니다.
- `while` 구문은 식을 반복 평가하고 식이 참인 경우에만 실행합니다. `do` 구문은 구문을 반복 실 행하고 식이 거짓이 될 때까지 평가합니다. 두 가지 경우 모두 식은 반드시 `Boolean`으로 평가되어야 합니다.
- `compound` 구문은 순서대로 구문의 시퀀스를 실행합니다.[^alex-239-compound]
- `goto` 구문은 현재 함수에서 해당 레이블 뒤에 오는 구문의 실행을 전달합니다.
- `break` 구문은 가장 작은 `switch`, `while`, `do` 구문의 실행을 종료합니다. 종료된 구문 다음 구문으로 실행이 계속됩니다.
- `typedef` 구문은 타입의 앨리어스를 정의합니다.

#### 템플릿

>
템플릿은 하나 이상의 타입이나 상수로 파라미터화된 구조나 프로시저를 허용합니다.
템플릿 정의와 템플릿 이름은 `<`과 `>`를 구분문자(delimiter)로 이용합니다.
>
> ```bnf
> template        = template_decl
>                     (structure | procedure | specialization).
> specialization  = "struct" structure_name "<" additive_list ">"
>                     [structure_body] ";".
> template_decl   = "template" "<" [parameter_list] ">" [constraint].
> constraint      = "requires" "(" expression ")".
> 
> template_name   = (structure_name | procedure_name)
>                     ["<" additive_list ">"].
> additive_list   = additive {"," additive}.
> ```
>
template name이 우선 이용된 경우 템플릿 인자로 대체되는 템플릿 파라미터를 가진 구조나 프로시저를 생성하는데 템플릿 정의가 이용됩니다.
이러한 템플릿 인자는 template name의 구분 식 목록에서 명시적으로 주어지거나 프로시저에서는 프로시저 인자 타입에서 가져올 수 있습니다.
>
템플릿 구조는 인자가 특수화되지 않은 템플릿 구조 버전 전에 매치되었을 때 고려된 템플릿의 대체 정의가 있을 때 특수화될 수 있습니다.
>
템플릿의 정의가 제한조건을 포함하면 템플릿 인자 타입과 값은 require가 따르는 Boolean 식을 충족해야 합니다.

## 함께 읽기

- [[/people/john-w-backus]]

## 참고문헌

- GoF의 디자인 패턴(개정판) / 에릭 감마, 리처드 헬름, 랄프 존슨, 존 블라시디스 공저 / 김정아 역 / 프로텍미디어 / 발행 2015년 03월 26일
- 프로그래밍의 이해 / Alexander Stepanov, Paul McJones 지음 / 신용태 옮김 / PEARSON / 1쇄 발행 2012년 12월 26일 / 원서 : Elements of Programming
- 한 권으로 읽는 컴퓨터 구조와 프로그래밍 / 조너선 스타인하트 저/오현석 역 / 책만 / 2021년 04월 08일 초판 1쇄 / 원서 : The Secret Life of Programs: Understand Computers -- Craft Better Code
- 해커 영어사전 제3판 / ERIC S.RAYMOND 편 / 기전연구사 / 1998년 12월 25일 제1판 제1발행 / 원제: The New Hacker's Dictionary

## 주석

[^gof-324]: GoF의 디자인 패턴. 5장. 324쪽.
[^jona-326]: 한 권으로 읽는 컴퓨터 구조와 프로그래밍. 8장. 326쪽.
[^wirth]: 파스칼 언어의 설계자.
[^alex-233]: 프로그래밍의 이해. Appendix B. 233쪽.
[^alex-235]: 번역서에서는 "구조"로 번역되어 있었으나, 나에게 더 익숙한 단어인 "구조체"로 옮겼다.
[^alex-235-typo]: 번역서에서는 (`참 ||`, `거짓 &&`)으로 되어 있었으나 코드로서의 외양을 살리고 싶어 (`true ||`, `false &&`)로 옮겼다.
[^epsilon]: `ϵ`는 `\epsilon` 이다.
[^out-of-print-2018]: 알라딘 인터넷 서점에 의하면 [2018년 10월 22일에 절판이 확인되었다]( https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=22416971 ).
[^alex-239-compound]: 번역서에서는 "혼합"이라 번역되어 있었으나, "compound"로 옮겼다.
[^alex-intro]: 프로그래밍의 이해. 서문. xii쪽.
[^hacker-dict-132]: 해커 영어사전. 132쪽. 인터넷 문서로는 [catb.org의 BNF 항목]( http://catb.org/jargon/html/B/BNF.html ) 참고.
