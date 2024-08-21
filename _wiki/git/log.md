---
layout  : wiki
title   : git log
summary : 로그를 잘 읽어야 한다
date    : 2019-12-01 08:14:22 +0900
updated : 2024-08-21 21:57:52 +0900
tag     : git
resource: 1A/6E0987-315D-4ECC-B38E-2937C808EB7C
toc     : true
public  : true
parent  : [[/git]]
latex   : false
---
* TOC
{:toc}

## 내가 사용하는 알리아스 {#my-alias}

### git l {#alias-l}

나는 로그 그래프 확인에 주로 다음 알리아스를 사용한다.

```sh
l = "log \
    --color --graph \
    --abbrev-commit \
    --pretty=format:'%Cred%h %Creset-%C(yellow)%d %Creset%s %Cgreen(%cr)%C(bold blue)<%an>'"
```

`git l`을 입력하면 다음과 같이 출력된다.

![]( /resource/1A/6E0987-315D-4ECC-B38E-2937C808EB7C/69907636-866a3000-141b-11ea-8b50-732c038279a3.png )

### git lh {#alias-lh}

나는 25줄만 보고 싶은 경우가 흔한 편이어서 다음과 같이 `git lh`로 `git l`의 결과를 앞부분만 잘라 보는 편이다.

```sh
lh = "!git l | head -25"
```

### git lf {#alias-lf}

`git --log --follow`를 사용해 특정 파일 하나의 히스토리만 보고 싶을 때 쓴다. `fzf`를 통해 파일을 선택할 수 있다.

```
lf = "!# 주어진 file의 history를 출력합니다.;\n\
    fzf --preview=\"bat {}\" | xargs git l --follow"
lfp = "!# 주어진 file의 history를 자세히 출력합니다.;\n\
    fzf --preview=\"bat {}\" | xargs git l --follow -p"
```

## Commit Ranges

두 hash값의 차이를 다음과 같이 확인할 수 있다.

```
git log b ^a
```

- 주어진 커밋 `b`에서 링크를 추적할 수 있는 커밋들을 보여준다.
- `^`가 붙은 커밋 `a`에서 추적할 수 있는 커밋들은 보여주기 대상에서 제외한다.

이 표기법은 좀 헷갈리므로, 같은 기능을 하는 `..` 표기법을 사용하는 것이 좀 더 편하다.

```bash
git log a..b
```

다음과 같은 git 그래프가 있다고 가정하자.

![]( /resource/1A/6E0987-315D-4ECC-B38E-2937C808EB7C/git-log-b-to-a.svg )

다음 명령을 입력하면...

```bash
git log a..b
```

커밋 `c2`, `c3`, `c4`가 출력된다.


Pro Git의 표현을 빌리자면 `..` 표기법(Double Dot)을 <mark>"a에는 없지만.. b 에는 있는 커밋"</mark>[^pro-git-210]이라 설명할 수 있다.

나는 그냥 <mark>a 다음부터 b까지의 커밋을 보여준다</mark>고 생각하고 작업한다.

이 설명대로 생각하면 간단하게 응용할 수 있다.
예를 들어 <mark>"master 이후 develop에 추가된 커밋들"</mark>을 보고 싶다면 다음과 같이 하면 된다.

```bash
git log master..develop
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

## \--pretty {#option-pretty}

### \--pretty=format {#pretty-format}

>
이 섹션에서는 `--pretty=format` 뒤에 붙여주는 포맷을 몇 가지 설명한다.
더 자세한 내용은 `man git-log`에서 `PRETTY FORMATS` 섹션을 참고할 것.
{:style="background-color: #ecf1e8;"}

```
git log --pretty=format:'%Cred%h %Creset-%C(yellow)%d %Creset%s %Cgreen(%cr)%C(bold blue)<%an>'
```

위와 같이 입력하면 아래와 같이 출력된다.

![]( /resource/1A/6E0987-315D-4ECC-B38E-2937C808EB7C/69907636-866a3000-141b-11ea-8b50-732c038279a3.png )

- 문자 하나
    - `%n`: 개행문자
    - `%%`: `%` 문자
    - `%x00`: 16진수 문자
- 포매팅에 사용
    - `%Cred`: 빨간색 (이후 문자들이 빨간색으로 출력된다)
    - `%Cgreen`: 초록색
    - `%Cblue`: 파란색
    - `%Creset`: 컬러 리셋 (리셋 이후부터 문자들의 색상이 기본색으로 출력된다)
- 커밋에 대한 정보
    - `%H`: 커밋 해시값
    - `%h`: 커밋 해시값(짧은 버전)
    - `%T`: 트리 해시값
    - `%t`: 트리 해시값(짧은 버전)
    - `%an`: 저자 이름 (author name)
    - `%ae`: 저자 이메일 (author email)
    - `%d`: 레퍼런스 이름(태그, 브랜치 이름 등)
    - `%s`: 커밋 메시지 제목
    - `%cr`: 커밋 날짜(상대적 날짜)

## 참고문헌

- Pro Git 2/E / 스캇 샤콘, 벤 스트라웁 공저 / 박창우, 이성환, 최용재 공역 / 인사이트(insight) / 2016년 03월 30일
    - [git-scm.com]( https://git-scm.com/book/en/v2/Git-Tools-Revision-Selection#_double_dot )
    - [한국어]( https://git-scm.com/book/ko/v2/Git-%EB%8F%84%EA%B5%AC-%EB%A6%AC%EB%B9%84%EC%A0%84-%EC%A1%B0%ED%9A%8C%ED%95%98%EA%B8%B0#_double_dot )

## 주석

[^pro-git-210]: Pro Git, 7.1장, 210쪽. '이 표현은 "master에는 없지만, experiment에는 있는 커밋"을 의미한다.'


