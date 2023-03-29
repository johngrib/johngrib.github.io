---
layout  : wiki
title   : pass
summary : gpg로 작동하는 패스워드 관리 도구
date    : 2023-03-28 23:24:21 +0900
updated : 2023-03-29 22:34:25 +0900
tag     : 
resource: 31/3E64C6-3BC9-4D30-8679-320FAD6F5848
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}


[www.passwordstore.org](https://www.passwordstore.org/ )

## Examples

```bash
 # install
brew install pass
```

## 튜토리얼

설치를 마친 후, `pass`를 실행하면 store가 비어있으므로 `pass init`을 실행하라는 안내문이 나온다.

```bash
$ pass
Error: password store is empty. Try "pass init".
```

### 저장소 생성

시키는 대로 `pass init`을 입력해보자. 그러면 `gpg-id`를 옵션으로 주라는 안내문이 나온다. `--path`, `-p`는 지금은 건너뛰자.

```bash
$ pass init
Usage: pass init [--path=subfolder,-p subfolder] gpg-id...
```

`gpg-id`를 제공하기 위해 [[/gpg]]{gpg} 명령을 `-k` 옵션과 함께 사용한다.

```bash
$ gpg -k
/Users/johngrib/.gnupg/pubring.kbx
----------------------------------
pub   rsa4096 2023-03-17 [SC] [expires: XXXX-XX-XX]
      2F582344457F0
uid           [ultimate] John Grib <XXXXXXXXXX@gmail.com>
sub   rsa4096 2023-03-17 [E] [expires: XXXX-XX-XX]
```

gpg id `2F582344457F0`를 복사해서 다음과 같이 `pass init`을 실행한다.

```bash
$ pass init 2F582344457F0
/Users/johngrib/.password-store
Password store initialized for 2F582344457F0
```

확인해보면 `~/.password-store` 디렉토리가 생성되어 있을 것이다.

`pass init`을 실행하면 `~/.password-store` 디렉토리가 git repository가 된다.

```bash
$ pass git init
```

### 브라우저 확장 설치

이제 브라우저 확장도 설치하자. 자신의 브라우저에 맞게 선택하면 된다.

- [Browserpass chrome extension]( https://chrome.google.com/webstore/detail/browserpass/naepdomgkenhinolocfifgehidddafch/related )
- [Browserpass firefox addon]( https://addons.mozilla.org/en-US/firefox/addon/browserpass-ce/ )

이제 [네이티브 클라이언트 앱](https://github.com/browserpass/browserpass-native )을 설치하자.
이 앱은 브라우저 확장과 함께 연동되어 브라우저에서 비밀번호를 자동으로 입력할 수 있게 해준다.

```bash
brew tap amar1729/formulae
brew install browserpass
```

```bash
$ brew install browserpass

 # ...
 # 생략
 # ...

* To configure your browser, RUN THE FOLLOWING:

$ PREFIX='/opt/homebrew/opt/browserpass' make hosts-BROWSER-user -f '/opt/homebrew/opt/browserpass/lib/browserpass/Makefile'

* Where BROWSER is one of the following: [chromium chrome vivaldi brave firefox]
********************************************************************************
```

`brew`로 설치한 과정에서 출력된 메시지를 잘 읽어보면 `make` 명령은 직접 실행해야 한다는 것을 알 수 있다.

나는 크롬을 쓰니까 `make hosts-BROWSER-user ...` 에서 `BROWSER` 부분만 `chrome`으로 바꿔서 실행한다.

```
PREFIX='/opt/homebrew/opt/browserpass' make hosts-chrome-user -f '/opt/homebrew/opt/browserpass/lib/browserpass/Makefile'
```

이제 크롬 확장 프로그램 옵션에서 `Custom gpg binary`를 입력해줘야 한다. (터미널에서 `which gpg`를 입력하면 된다.)

![]( /resource/31/3E64C6-3BC9-4D30-8679-320FAD6F5848/extension-config.png ){:style="max-width:500px"}

### 패스워드 추가

네이버에 로그인할 수 있는 아이디와 패스워드를 저장해보자.

다음은 네이버 로그인 화면이다.

![]( /resource/31/3E64C6-3BC9-4D30-8679-320FAD6F5848/naver.png ){:style="max-width:500px"}

`pass insert -m` 명령을 다음과 같이 실행한다.

```bash
$ pass insert -m login/nid.naver.com
Enter contents of nid.naver.com and press Ctrl+D when finished:

123456
Username: myid
URL: nid.naver.com/*
[master 54976ec] Add given password for nid.naver.com to store.
 1 file changed, 0 insertions(+), 0 deletions(-)
```

- `login/nid.naver.com`: `login`이라는 디렉토리에 `nid.naver.com.gpg`이라는 파일을 생성한다는 의미이다.
- `123456`: 패스워드
- `Username: myid`: 아이디로 `myid`를 기록
- `URL: nid.naver.com/*`: URL로 `nid.naver.com/*`을 기록

### 브라우저 확장에서 아이디, 패스워드 자동완성

이제 브라우저 확장에서 다음과 같이 자동완성을 제안해준다.

![]( /resource/31/3E64C6-3BC9-4D30-8679-320FAD6F5848/naver-list.png ){:style="max-width:500px"}

클릭하면 아이디와 패스워드를 자동완성해준다.

### 아이폰 앱 연동

아이폰에서 [passforios]( https://mssun.github.io/passforios/ ) (Pass for iOS)으로 들어가 앱을 다운로드 받는다.

그리고 [퀵 스타드 가이드 문서]( https://github.com/mssun/passforios/wiki#quick-start-guide-for-pass-for-ios )를 참고해 설정해 나가면 된다.

내 경우에는 다음과 같이 하였다.

1. github에 private repository를 만들고 `~/.password-store` 디렉토리를 push한다.
2. `passforios` 앱을 실행하고 `Settings`에서 다음과 같이 설정한다.
    - Password Repository
        - `GIT REPOSITORY URL`을 `ssh://git@github.com/johngrib/리포지토리이름.git`으로 지정한다. (잘 읽어보면 `:` 하나가 `/`로 바뀌어 있다는 것을 알 수 있다.)
        - `BRANCH NAME`에 자신이 원하는 브랜치 이름을 지정한다.
        - `USERNAME`은 `git`으로 지정한다. (`git`말고 다른 값은 안됨)
        - `AUTHENTICATION METHOD`는 `SSH Key`로 지정한다.
            - 여기에 자신의 ssh key를 등록해준다.
    - PGP Key
        - 자신의 공개키와 비밀키를 등록해준다.

이제 아이폰 `설정` 앱에서 `암호` - `암호 옵션` - `다음에서 자동 완성 허용`으로 들어간 다음, Pass 앱을 선택하면 다른 패스워드 관리자 앱처럼 Pass를 사용할 수 있다.

Pass 앱은 아이폰에 저장된 git repository나 다름없으므로, 휴대폰에서 패스워드를 수정하는 것도 가능하다.

