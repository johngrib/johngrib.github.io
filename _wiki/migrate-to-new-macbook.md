---
layout  : wiki
title   : 새 맥북으로 이사가기
summary : 
date    : 2020-05-06 15:39:42 +0900
updated : 2020-05-07 10:44:00 +0900
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

### OS 업데이트
- `시스템 환경설정`
    - `소프트웨어 업데이트`에서 업데이트하면 된다.

### xcode-select 설치
터미널을 열고 다음 명령을 입력한다.
```sh
xcode-select --install
```

### Homebrew 설치

다음 명령을 실행해 brew 명령어를 사용할 수 있도록 설치한다.

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

<https://brew.sh/index_ko >

### Brewfile 실행

작업을 시작할 때 만들어 두었던 `Brewfile`을 다운로드받는다.

```sh
curl -O https://raw.githubusercontent.com/johngrib/dotfiles/master/Brewfile
```

이후 `Brewfile`을 다운로드 받은 곳에서 다음과 같이 입력하면 `Brewfile`에 명시된 애플리케이션을 `brew`가 알아서 설치한다.

```sh
brew bundle
```

### 패스워드 관리자에 로그인

이후 입력할 비밀번호가 많으므로, 패스워드 관리자를 실행해 로그인한다.

### 웹 브라우저 실행

`Brewfile`을 실행하면서 Google Chrome도 함께 설치되었을 것이다.

실행하고 로그인한다. 다른 일을 하는 동안 확장 프로그램 등이 알아서 동기화될 것이다.


### dotfiles 설정

github이나 Dropbox 등에 넣어둔 dotfiles 디렉토리를 new 맥북에 다운로드 받고, 심볼릭 링크 등을 예전과 같이 연결한다. 미리 만들어 둔 셸 스크립트가 있으면 편하다.

### bash를 기본 셸로 설정

맥 기본 셸이 짜증나는 `zsh`로 바뀐 이후로 번거로운 절차가 하나 추가됐다.

다음과 같이 `bash`를 기본 셸로 사용하도록 설정한다.

```
chsh -s /bin/bash
```

### 터미널 설정

`터미널` - `환경설정` - `프로파일` - 톱니바퀴 아이콘 - `가져오기...` 에서 내 터미널 컬러 스킴 파일을 선택한다.

이후 새로 추가된 `color-scheme`을 `기본`으로 선택해 준다.

`터미널` - `환경설정` - `프로파일` - `키보드`에서 `Option을 Meta키로 사용`에도 체크해준다.

### 트랙패드 설정

- `시스템 환경설정` - `손쉬운 사용` - `포인터 제어기` - `트랙패드 옵션`
    - `드래그 활성화` 에서 `세 손가락으로 드래그하기`를 선택한다.

### hammerspoon 설정

- hammerspoon 은 `Brewfile`을 실행할 때 함께 설치되었을 것이다.
- 설정 파일도 dotfiles 디렉토리를 다운로드 받고 심볼릭 링크를 연결하는 단계에서 설치가 끝났을 것이다.
- `시스템 환경설정` - `보안 및 개인 정보 보호` - `손쉬운 사용` 에서 `hammerspoon`에 체크해준다.

### 웹 브라우저 설정

웹 브라우저를 실행해 로그인한다.

### gpg 설정

새 컴퓨터에서 사용할 새 공개키/비밀키 쌍을 생성하도록 한다.

```sh
gpg --full-generate-key
```

생성했다면 ~/.gitconfig 에 다음과 같이 서명할 키 아이디를 추가해 준다.

```sh
[user]
    name = JohnGrib
    email = 이메일 주소
    signingkey = 키 아이디
[commit]
    gpgsign = true
[include]
    path = ~/dotfiles/.gitconfig
```

이후 생성된 공개 키를 github `settings` - `SSH and GPG keys` - `GPG keys`에 등록해 준다.

### sshkey 생성

```sh
ssh-keygen
```

이후 생성된 공개 키를 github `settings` - `SSH and GPG keys` - `SSH keys`에 등록해 준다.

그리고 `~/.ssh/config` 파일을 생성하고 다음과 같이 추가해 준다.

```
Host github.com
 Hostname ssh.github.com
 Port 443
```

다음 명령어를 실행해주면 github ssh 연결에 큰 문제가 없을 것이다.

```
ssh -T git@github.com
```

