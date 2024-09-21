---
layout  : wiki
title   : 맥북 설정하기
summary : 새 맥북 셋팅하면서 작성하는 문서
date    : 2020-05-06 15:39:42 +0900
updated : 2024-09-21 22:21:15 +0900
tag     : mac
resource: 56/A48CC2-67A4-4C57-951C-7902E53A7719
toc     : true
public  : true
parent  : [[/mac]]
latex   : false
---
* TOC
{:toc}

## old 맥북에서 new 맥북으로 이사가기
### 마이그레이션 지원 사용
old 맥북에서 new 맥북으로 이사갈 때에는 마이그레이션 지원을 사용하면 쉽다.

- [콘텐츠를 새 Mac으로 옮기는 방법 (support.apple.com)](https://support.apple.com/ko-kr/HT204350 )

### 마이그레이션 지원을 사용하지 않는 경우

마이그레이션 지원을 사용하지 않고 new 맥북을 처음부터 셋팅한다면 `Brewfile`을 고려하자.

### old 맥북에서 할 일
#### Brewfile 생성

```sh
brew install mac
brew bundle dump
```

`brew bundle dump`의 결과 `Brewfile`이 생성된다.

파일을 살펴보고 누락된 애플리케이션이 있다면 수동으로 추가해주면 된다.

이후, 이 `Brewfile`을 적당한 곳에 올려놓는다. 나는 [github]( https://raw.githubusercontent.com/johngrib/dotfiles/master/Brewfile )에 올려두었다.

`brew cask`를 평소에 잘 활용해 왔다면 Google Chrome, Firefox, Dropbox, Sequal Pro, 다양한 폰트... 등도 `Brewfile`에 추가될 것이다.

나중에 이 파일을 `brew`를 통해 실행하면 이 수많은 애플리케이션을 자동으로 설치해준다. 일일이 설치하는 것을 싫어한다면 설정하는 방법 문서를 잘 읽고 최대한 많이 추가해주자.

### new 맥북에서 할 일

#### Xcode 설치

App Store에 들어가서 Xcode를 설치한다.

꽤 오래 걸릴 수 있으므로 가장 먼저 시작하도록 한다.

#### 패스워드 설정
- `시스템 환경설정` - `Touch ID 및 암호`

#### 네트워크 설정
- `시스템 환경설정` - `네트워크`에서 인터넷 연결 설정을 한다.

#### 배터리 설정
- `시스템 환경설정` - `배터리` - `전원 어댑터`에서 `네트워크 연결 시 깨우기`를 해제한다.
    - 이게 선택되어 있으면 잠자기 모드를 켜놔도 맥이 금방 다시 깨어난다.

#### OS 업데이트
- `시스템 환경설정` - `일반` - `소프트웨어 업데이트`에서 최신 버전으로 업데이트한다.

#### 터미널을 열고..

##### bash를 기본 셸로 설정

맥 기본 셸이 짜증나는 `zsh`로 바뀐 이후로 번거로운 절차가 하나 추가됐다.

다음과 같이 [[/cmd/chsh]] 명령을 사용해 `bash`를 기본 셸로 사용하도록 설정한다.

```
chsh -s /bin/bash
```

##### dotfiles 다운로드

dotfiles를 다운로드 받는다.

```bash
cd ~
git clone git@github.com:johngrib/dotfiles.git
```

##### .bashrc 와 .bash_profile 링크

```bash
cd ~
ln -s ~/dotfiles/.bash_profile
ln -s ~/dotfiles/.bashrc
```

이후 터미널을 재시작하거나, 새 탭을 열고 거기에서 작업한다.

##### Xcode license 동의서 읽고 확인

이걸 안 하면 brew bundle 명령을 실행할 때 설치되지 않는 것들이 있다. 어차피 해야 한다.

```bash
sudo xcodebuild -license
```

`space` 키를 입력해 아래로 스크롤하며 읽으면 된다.
내용에 동의한다면 마지막 페이지에서 `agree`를 입력하고 엔터 키를 누른다.

#### xcode-select 설치
맥에서 개발을 하려면 `xcode-select`가 있어야 한다. 터미널을 열고 다음 명령을 입력한다.
```sh
xcode-select --install
```

#### Homebrew 설치

다음 명령을 실행해 brew 명령어를 사용할 수 있도록 설치한다.

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

- 명령 출처는 <https://brew.sh/ >.

#### Brewfile 실행

작업을 시작할 때 만들어 두었던 `Brewfile`을 다운로드받는다.

```sh
curl -O https://raw.githubusercontent.com/johngrib/dotfiles/master/Brewfile
```

이후 `Brewfile`을 다운로드 받은 곳에서 다음과 같이 입력하면 `Brewfile`에 명시된 애플리케이션을 `brew`가 알아서 설치한다.

```sh
brew bundle
```

`Brewfile`을 잘 만들어 뒀다면 old 맥북에서 사용했던 어지간한 애플리케이션은 다 설치될 것이다.

#### 터미널 설정

`brew bundle` 명령은 시간이 꽤 걸린다. 그동안 터미널 설정이나 해놓자.

##### 터미널 컬러 스킴 설정

`터미널` - `환경설정` - `프로파일` - 톱니바퀴 아이콘 - `가져오기...` 에서 [내 터미널 컬러 스킴 파일](https://github.com/johngrib/dotfiles/tree/master/color-scheme )을 선택한다.

이후 새로 추가된 `color-scheme`을 `기본`으로 선택해 준다.

##### Option - Meta키 매핑

`터미널` - `환경설정` - `프로파일` - `키보드`에서 `Option을 Meta키로 사용`에 체크해준다.

#### hammerspoon 설정

hammerspoon 은 `Brewfile`을 실행할 때 함께 설치되었을 것이다.

설치되어 있지 않았다면 brew cask 로 설치해 준다.

```bash
brew install --cask hammerspoon
```

설정은 다음과 같이 다운로드한다.

```bash
cd ~
git clone https://github.com/johngrib/hammerspoon-config.git .hammerspoon

```

이후 `시스템 환경설정` - `개인정보 보호 및 보안` - `손쉬운 사용` 에서 `hammerspoon`에 체크해준다.

#### 패스워드 관리자에 로그인

이후 입력할 비밀번호가 많으므로, 패스워드 관리자를 실행해 로그인한다.

내 경우에는 BitWarden.

#### 웹 브라우저 실행

`Brewfile`을 실행하면서 Google Chrome도 함께 설치되었을 것이다.

설치가 안 됐다면 다음 명령을 실행해 준다.

```bash
brew install --cask google-chrome
```

실행하고 로그인한다. 다른 일을 하는 동안 확장 프로그램 등이 알아서 동기화될 것이다.

#### gpg 설정

새 컴퓨터에서 사용할 새 공개키/비밀키 쌍을 생성하도록 한다.

```sh
gpg --full-generate-key
```

[[/cmd/gpg]] 참고.

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

#### sshkey 생성

```sh
ssh-keygen
```

이후 생성된 공개 키(`~/ssh/id_rsa.pub` 파일의 내용)를 github `settings` - `SSH and GPG keys` - `SSH keys`에 등록해 준다.

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

#### dotfiles 설정

github이나 Dropbox 등에 넣어둔 dotfiles 디렉토리를 new 맥북에 다운로드 받고, 심볼릭 링크 등을 예전과 같이 연결한다. 미리 만들어 둔 셸 스크립트가 있으면 편하다.

#### vim 설정

- [vim-plug]( https://github.com/junegunn/vim-plug )를 설치한다.

#### JetBrains Toolbox 다운로드

JetBrains Toolbox를 다운받은 다음, 라이선스를 갖고 있는 IDE를 설치한다.

### 모든 작업이 끝나고, old 맥북에서 할 일

다음 문서를 읽고 old 맥북의 데이터를 모두 처분한다.

- [사용하던 Mac을 팔거나 선물로 주거나 보상 판매를 위해 반납하기 전에 수행할 작업](https://support.apple.com/ko-kr/HT201065 )


## new 맥북 쓸만하게 설정하기

기본 설정은 끝났다. 이제 내 취향과 편의를 위한 설정을 해보자.

### 트랙패드, 마우스 설정

#### 세 손가락 드래그

- `시스템 환경설정` - `손쉬운 사용` - `포인터 제어기` - `트랙패드 옵션`
    - `드래그 스타일` 에서 `세 손가락으로 드래그하기`를 선택한다.

#### 마우스 포인터 사이즈 설정

`시스템 환경설정` - `손쉬운 사용` - `디스플레이` - `포인터`에서 커서 크기를 적절하게 조절한다.

#### 더블 클릭 속도를 빠르게

`시스템 환경설정` - `손쉬운 사용` - `포인터 제어기`에서 다음을 설정한다.

- `이중 클릭 속도`를 빠르게 한다. (오른쪽으로 조절기를 옮겨준다.)

#### 스크롤이 항상 표시되게 한다

`시스템 환경설정` - `화면 모드` - `스크롤 막대보기`에서 `항상`을 체크한다.


### finder 설정

#### 하단 정보 메뉴 설정
finder를 실행한 다음, 상단 메뉴 `보기`를 선택한다.

- `경로 막대 보기`를 선택한다.
- `상태 막대 보기`를 선택한다.

그러면 다음 이미지와 같이 파인더 아래쪽에 경로와 용량 등의 정보가 나온다.

![image]( /resource/56/A48CC2-67A4-4C57-951C-7902E53A7719/82563757-971d8680-9bb2-11ea-90c8-73ef23b27f8f.png )

경로 막대의 경로는 더블 클릭하면 해당 위치로 한번에 이동할 수 있다.

#### 정렬 설정

finder를 실행한 다음, `설정` - `고급` - `폴더 우선 정렬`에서 `윈도우에서(이름순으로 정렬 시)`를 체크한다.

이렇게 하면 디렉토리/파일 여부가 정렬 최우선순위가 된다.

#### 파일 확장자 설정

finder `설정` - `고급` - `모든 파일 확장자 보기`를 체크한다.

### 키보드 설정

`시스템 환경설정` - `키보드`

- `키 반복 속도`를 가장 빠르게 설정한다.
- `반복 지연 시간`을 가장 짧게 설정한다.

키를 꾹 누르고 있으면 매우 빠르게 반복입력되는데, 특히 방향키를 누르고 있을 때 이 설정의 효과를 체감할 수 있다.

- `키보드 탐색`을 사용 설정한다.
    - `Tab`, `Shift + Tab`으로 선택 메뉴를 이동할 수 있게 된다.

#### 키보드 단축키...

- `디스플레이`
    - `디스플레이 밝기 감소` 체크 해제.
    - `디스플레이 밝기 증가` 체크 해제.
- `기능 키`
    - `F1, F2 등의 키를 표준 기능 키로 사용`에 체크한다.

#### 키보드 탭

- `Fn키 누르기`를 `F1, F2 등의 키 보기`로 설정한다.

#### 텍스트 입력 - 입력 소스 - 편집...

- `맞춤법 자동 수정` 체크를 해제한다.
- `자동으로 단어를 대문자로 시작` 체크를 해제한다.
- `스페이스를 두 번 눌러 마침표 추가` 체크를 해제한다.
- `스마트 인용 및 대시 사용` 체크를 해제한다. 반드시!

이 옵션을 선택하면 따옴표가 휘어진 모양으로 변환되는 것을 막을 수 있다.

간혹 동료 개발자와 문자열을 메신저 등으로 주고 받을 때, 따옴표가 변형되어 컴파일러가 알아보지 못하는 경우가 있는데 이 옵션을 해제하면 그런 상황을 방지할 수 있다.

- `큰따옴표`를 `"abc"`로 바꾼다.
- `작은따옴표`를 `'abc'`로 바꾼다.

### 사운드 설정

- `시스템 환경설정` - `사운드`에서 `메뉴 막대에서 음량 보기`를 체크한다.

메뉴 막대에 음량 아이콘이 표시된다.

- `사용자 인터페이스 사운드 효과 재생`을 체크 해제한다.

이 설정을 해제하면 화면 스크린샷을 찍을 때 "찰칵" 소리가 나지 않게 된다.


### iCloud 설정

`시스템 환경설정` - `Apple ID` - `iCloud Drive`에서 `데스크탑 및 문서 폴더`를 체크 해제한다.

### 메뉴바 아이콘 간격 조정 {#menu-bar-icon-spacing}

다음 명령을 실행하고 컴퓨터를 재부팅하면 스크린 최상단 메뉴바 아이콘들의 간격이 지정한 픽셀만큼 좁혀준다.

```bash
 # 간격을 5 픽셀로 줄인다
defaults -currentHost write -globalDomain NSStatusItemSelectionPadding -int 5
defaults -currentHost write -globalDomain NSStatusItemSpacing -int 5
```

- before
    - ![]( /resource/56/A48CC2-67A4-4C57-951C-7902E53A7719/menu-bar-before.jpg )
- after
    - ![]( /resource/56/A48CC2-67A4-4C57-951C-7902E53A7719/menu-bar-after.jpg )

메뉴바에 아이콘을 많이 올려놓고 쓰는 편이라면 이 설정이 도움이 된다.

### 배치된 윈도우에 여백 포함

macOS Sequoia (2024년 9월)부터 추가된 설정.

`시스템 환경설정` - `데스크탑 및 Dock` - `윈도우` - `배치된 윈도우에 여백 포함`을 체크 해제한다.
