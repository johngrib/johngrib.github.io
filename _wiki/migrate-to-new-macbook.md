---
layout  : wiki
title   : 새 맥북으로 이사가기
summary : 
date    : 2020-05-06 15:39:42 +0900
updated : 2020-05-06 16:40:02 +0900
tag     : mac
toc     : true
public  : false
parent  : index
latex   : false
---
* TOC
{:toc}

## old 맥북에서 할 일

```sh
brew install mac
brew bundle dump
```

`brew bundle dump`의 결과 `Brewfile`이 생성된다.

파일을 살펴보고 누락된 애플리케이션이 있다면 수동으로 추가해주면 된다.

이후, 이 `Brewfile`을 적당한 곳에 올려놓는다. 나는 [github]( https://raw.githubusercontent.com/johngrib/dotfiles/master/Brewfile )에 올려두었다.

## new 맥북에서 할 일
### 패스워드 설정한다
- `시스템 환경설정`
    - `보안 및 개인 정보 보호`에서 설정한다.
    - `Touch ID`에서 설정한다.

### 네트워크 설정
- `시스템 환경설정`
    - `네트워크`에서 인터넷 연결 설정을 한다.

### OS를 업데이트한다
- `시스템 환경설정`
    - `소프트웨어 업데이트`에서 업데이트하면 된다.

### xcode-select를 설치한다
터미널을 열고 다음 명령을 입력한다.
```sh
xcode-select --install
```

### Homebrew를 설치한다

다음 명령을 실행해 brew 명령어를 사용할 수 있도록 설치한다.

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

<https://brew.sh/index_ko >

### Brewfile을 실행한다

작업을 시작할 때 만들어 두었던 `Brewfile`을 다운로드받는다.

```sh
curl -O https://raw.githubusercontent.com/johngrib/dotfiles/master/Brewfile
```

이후 `Brewfile`을 다운로드 받은 곳에서 다음과 같이 입력하면 `Brewfile`에 명시된 애플리케이션을 `brew`가 알아서 설치한다.

```sh
brew bundle
```

### 트랙패드를 설정한다

`brew bundle`이 실행되는 동안 트랙패드를 설정하자.

- `시스템 환경설정` - `손쉬운 사용` - `포인터 제어기` - `트랙패드 옵션`
    - `드래그 활성화` 에서 `세 손가락으로 드래그하기`를 선택한다.


