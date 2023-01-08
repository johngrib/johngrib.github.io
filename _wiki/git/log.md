---
layout  : wiki
title   : git log
summary : 로그를 잘 읽어야 한다
date    : 2019-12-01 08:14:22 +0900
updated : 2022-03-13 12:33:34 +0900
tag     : git
resource: 1A/6E0987-315D-4ECC-B38E-2937C808EB7C
toc     : true
public  : true
parent  : [[/git]]
latex   : false
---
* TOC
{:toc}

## 로그 그래프

나는 로그 그래프 확인에 주로 다음 알리아스를 사용한다.

```sh
l = "log \
    --color --graph \
    --abbrev-commit \
    --pretty=format:'%Cred%h %Creset-%C(yellow)%d %Creset%s %Cgreen(%cr)%C(bold blue)<%an>'"
```

`git l`을 입력하면 다음과 같이 출력된다.

![]( /resource/1A/6E0987-315D-4ECC-B38E-2937C808EB7C/69907636-866a3000-141b-11ea-8b50-732c038279a3.png )

## Commit Ranges

두 hash값의 차이를 다음과 같이 확인할 수 있다.

```bash
git log master..develop
```

Pro Git에서는 위에서 사용한 `..` 표기법(Double Dot)을 "master에는 없지만.. develop 에는 있는 커밋들"[^pro-git-210]이라 설명한다.

이 설명대로 생각하면 간단하게 응용할 수 있다.
위의 예제를 뒤집어서 "develop에는 있지만.. master에는 없는 커밋들"을 보고 싶다면 다음과 같이 하면 된다.

```bash
git log develop..master
```

branch 이름은 단순한 레퍼런스이므로 다음과 같이 사용할 수도 있다.

```bash
git log b6c69..528cb

git l b6c69..528cb  # 알리아스 사용
```

같은 의미를 `^reference`와 `--not reference`를 사용해 표현할 수도 있다.
`..` 표현은 편리하지만 2개까지만 비교할 수 있으므로, 이 방법은 3개 이상의 해시를 비교할 때 유용하다.

```bash
 # master에는 없지만.. develop 에는 있는 커밋들

git log master..develop      # 두 개 비교이므로 .. 으로 가능
git log ^master develop      # 위와 같다
git log develop --not master # 위와 같다
```

3개를 비교한다면 `..` 표기법으로는 할 수 없다. 그러므로 `^`나 `--not`을 사용한다.

```bash
 # master, develop에는 있지만 hotfix 에는 없는 커밋들

git log master develop ^hotfix          # 위와 같다
git log master developt --not hotfix    # 위와 같다
```


## 참고문헌

- Pro Git 2/E / 스캇 샤콘, 벤 스트라웁 공저 / 박창우, 이성환, 최용재 공역 / 인사이트(insight) / 2016년 03월 30일
    - [git-scm.com]( https://git-scm.com/book/en/v2/Git-Tools-Revision-Selection#_double_dot )
    - [한국어]( https://git-scm.com/book/ko/v2/Git-%EB%8F%84%EA%B5%AC-%EB%A6%AC%EB%B9%84%EC%A0%84-%EC%A1%B0%ED%9A%8C%ED%95%98%EA%B8%B0#_double_dot )

## 주석

[^pro-git-210]: Pro Git, 7.1장, 210쪽.
