---
layout  : wiki
title   : fortune 명령어
summary : 랜덤으로 격언/속담 등을 보여준다
date    : 2019-12-25 19:03:11 +0900
updated : 2019-12-25 19:16:46 +0900
tag     : bash command
toc     : true
public  : true
parent  : [[command-line]]
latex   : false
---
* TOC
{:toc}

## Examples
```sh
 # 랜덤으로 격언을 출력한다
fortune
```

## 자신만의 fortune 데이터 파일을 만들고 사용하는 방법

`%`기호로 구분된 텍스트 파일을 만든다.

```text
- 브룩스의 법칙 -
소프트웨어 개발 프로젝트에 인력을 더 투입하면,
개발은 더 늦어진다.
%
문제 해결사(Problem Solver)가 아니라
문제들의 해결사(Solver of Problems)가 되도록 자신을 변화시켜라.
- 제랄드 와인버그
%
루바르스키의 사이버네틱 곤충학 법칙
버그는 늘 한 마리가 더 있다.
```

이 파일 이름을 `quotes.txt`라는 이름으로 저장했다고 하자.

이제 [[strfile]]명령을 사용해 인덱스 파일을 만들어 준다.

```sh
strfile quotes.txt
```

그러면 `quotes.txt.dat`라는 파일이 생성된다.

이제 다음 명령으로 내가 만든 데이터 파일의 격언을 랜덤으로 볼 수 있다.

```sh
fortune quotes.txt
```
