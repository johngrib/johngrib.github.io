---
layout  : wiki
title   : rans 명령어
summary : More advanced usage of regular expressions
date    : 2020-05-19 21:52:22 +0900
updated : 2020-05-19 22:02:31 +0900
tag     : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

## Install

```sh
brew tap sinya8282/rans
brew install --HEAD rans
```

## Examples

```sh
 # syntax 도움말을 본다
rans --syntax
```

```sh
 # 정규식 ^a+b$ 를 DFA 타입의 그래프 언어로 출력한다
rans '^a+b$' --dfa
```

### graphviz 명령과 함께 사용하기

`graphviz`는 다음과 같이 설치한다.

```sh
brew install graphviz
```

설치가 와료되면 `dot` 명령을 사용할 수 있다.

간단한 정규식을 pdf 파일로 출력해 보자.

```sh
 # 정규식 ^a+b$ 를 DFA 그래프로 표현한 pdf를 출력한다
rans '^a+b$' --dfa | dot -Tpdf -o result.pdf
```

결과는 다음과 같다.

![image]( /post-img/rans-cmd/82329213-eb423280-9a1b-11ea-935e-928cad14a748.png )


## Links

- [RANS : More advanced usage of regular expressions.]( http://sinya8282.github.io/RANS/ )

