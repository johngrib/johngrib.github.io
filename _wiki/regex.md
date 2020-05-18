---
layout  : wiki
title   : 정규 표현식
summary : 작성중인 문서
date    : 2020-05-18 22:45:12 +0900
updated : 2020-05-18 23:33:27 +0900
tag     : 
toc     : true
public  : true
parent  : [[index]]
latex   : true
---
* TOC
{:toc}

이 문서는 작성중입니다.

>
참고: 이 문서는 [[ag]] 명령을 사용합니다.

## 전방 탐색

- lookahead, positive lookahead 라고 부른다.

$$ (?= \text{regex} ) $$

전방 탐색은 주어진 패턴보다 뒤에(왼쪽에) 있는 문자의 일치를 판별한다.

예를 들어 $$ b(?=c) $$ 와 같은 정규식이 있다면 `c` 왼쪽에 있는 `b`에 매치된다.

- `b(?=c)`
    - $$ a \color{red}b cdbe $$ &nbsp;
        - `echo abcdbe | ag 'b(?=c)'` (잘 모르겠다면 이 명령을 복사해서 터미널에서 실행해보자.)
    - $$ bb \color{red}b c $$ &nbsp;
        - `echo bbbc | ag 'b(?=c)'`


## 부정 전방 탐색

$$ (?! \text{regex}) $$

- negative lookahead 라고 부른다.

부정 전방 탐색은 전방 탐색의 반대이다.

- `2(?!3)` - 오른쪽에 `3`이 오지 않는 `2`.
    - $$ 123 \color{red}2 4 $$ &nbsp;
        - `echo 12324 | ag '2(?!3)'`
    - $$ \color{red}{222} 23 $$ &nbsp;
        - `echo 22223 | ag '2(?!3)'`

- `(?!1234)\d{4}` - `1234`가 아닌 숫자 4개.
    - $$ 1234 $$ &nbsp;
        - `echo 1234 | ag '(?!1234)\d{4}'`
    - $$ \color{red}{1235} $$ &nbsp;
        - `echo 1235 | ag '(?!1234)\d{4}'`

다음 패턴의 부정 전방 탐색을 사용하면 완전 일치의 반대 패턴이 된다. 필요에 따라 `regex` 부분만 바꿔주면 된다.

`^(?!regex$j).*$`


