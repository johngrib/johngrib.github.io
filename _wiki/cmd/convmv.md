---
layout  : wiki
title   : convmv 명령어
summary : 파일 이름의 문자 인코딩을 변환해준다
date    : 2023-09-03 12:48:28 +0900
updated : 2023-09-03 13:11:58 +0900
tag     : 한글
resource: 0D/A53DF0-3300-4A1A-8DF9-B7A5FAB237BF
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Installation

<https://formulae.brew.sh/formula/convmv >

```bash
brew install convmv
```

## alias

나는 다음과 같이 alias를 설정해두었다.

```bash
alias convmv-nfc='convmv -f utf-8 -t utf-8 --nfc --notest'
```

## Examples

나는 주로 macOS의 [[/tools/alacritty]] 터미널에서 한글 파일명의 자소가 분리된 것을 교정할 때 사용한다.

```bash
convmv -f utf-8 -t utf-8 --nfc --notest filename
```

다음과 같이 사용할 수 있다.

![]( /resource/0D/A53DF0-3300-4A1A-8DF9-B7A5FAB237BF/notest.png )


