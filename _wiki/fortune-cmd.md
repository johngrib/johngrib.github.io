---
layout  : wiki
title   : fortune 명령어
summary : 랜덤으로 격언/속담 등을 보여준다
date    : 2019-12-25 19:03:11 +0900
updated : 2020-01-08 21:52:14 +0900
tag     : bash command
toc     : true
public  : true
parent  : [[command-line]]
latex   : false
---
* TOC
{:toc}

## Installation
```sh
brew install fortune
```

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
(strfile 명령은 fortune 명령을 설치할 때 함께 설치된다.)

```sh
strfile quotes.txt
```

그러면 `quotes.txt.dat`라는 파일이 생성된다.

이제 다음 명령으로 내가 만든 데이터 파일의 격언을 랜덤으로 볼 수 있다.

```sh
#!/usr/bin/env bash

fortune quotes.txt
```

## git hook 과 함께 사용한 경험

fortune 파일을 편집하고 나서 `strfile` 명령을 실행하기 귀찮았던 나는, `pre-commit` hook을 사용해 자동으로 `git add`된 파일만 골라 dat 파일을 생성하기로 했다.

그래서 다음과 같은 `pre-commit` 파일을 작성했다.

```sh
#!/usr/bin/env bash

git diff --cached --name-only | xargs strfile
git add *.dat
```

그런데 이랬더니 열심히 작성한 fortune 파일이 오염되는 상황이 발생했다.

생각해보니 `strfile` 명령에 2개의 인자를 주게 되었을 때, 두 번째 인자를 dat 파일로 지정하는 방식이어서 fortune 파일이 오염되는 것이라는 사실을 알 수 있었다.

따라서 다음과 같이 `for` 명령을 사용해 루프하는 방식으로 고쳤고 이상 없이 잘 사용하게 되었다.

```sh
#!/usr/bin/env bash

for file in `git diff --cached --name-only | egrep '\.fortune$'` ; do
    strfile $file
done
git add *.dat
```

## See Also

* [[strfile-cmd]]
