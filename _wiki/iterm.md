---
layout  : wiki
title   : iTerm2
summary : 문제 해결 및 설정 경험을 모아본다
date    : 2020-03-23 11:35:51 +0900
updated : 2020-05-12 22:00:11 +0900
tag     : mac
toc     : true
public  : true
parent  : [[tools]]
latex   : false
---
* TOC
{:toc}

> 참고: 나는 iTerm을 어쩌다 가끔 보조 용도로 쓴다. 나는 주로 macOS의 기본 터미널을 사용한다.

## 설치
```sh
brew cask install iterm2
```

## 내가 좋아하는 설정들
### 단축키로 iterm을 부르기

`Preferences` - `Keys` - `HotKey` - `Show/hide all windows with a system-wide hotkey` 에서 설정할 수 있다.

나는 보통 `option` - `space` 로 지정해 쓴다.

언제라도 `option` - `space`를 입력하면 iterm 이 나타나므로, 명령어를 입력하기 쉬워진다.


### 폰트 설정

`Preferences` - `Profiles` - `Text` - `Font`에서 지정하면 된다.

내가 좋아하는 [[coding-font]]{Meslo LG} 폰트를 등록해 준다.

현재 내가 사용하고 있는 설정은 다음과 같다.

- MseloLGMDZ Nerd Font Mono
    - Regular
    - size 14
    - Anti-aliased

나는 ligatures 를 몹시 싫어하기 때문에 `Use ligatures` 옵션은 반드시 꺼둔다.

### 커스텀 컬러 스킴 사용하기

1. [나의 아이텀 컬러 스킴]( https://raw.githubusercontent.com/johngrib/dotfiles/master/johngrib.itermcolors )을 다운받는다.
2.  `Preferences` - `Profiles` - `Colors` 에서 `Color Presets` 선택기를 클릭한다.
3. `Import`를 클릭하고 다운받은 파일을 선택한다.
4. 다시 `Color Presets` 선택기를 클릭하고, 컬러 스킴 이름인 `johngrib`을 선택한다.

### iTerm에서도 Meta 키를 사용하기

`Preferences` - `Profiles` - `Keys` 에서 `Left Option Key` 항목을 `Esc+`로 체크해 준다. 이걸 체크하지 않으면 `option` 키는 그냥 특수 문자를 생성하는 키 조합일 뿐이다.


### 새로운 탭/윈도우가 워킹 디렉토리를 유지하게 하기

`Preferences` - `Profiles` - `General` - `Working Directory`에서 `Reuse previous session's directory`를 체크한다.


### 새로운 탭을 열 때, 현재 탭의 바로 오른쪽에 열어주게 하기

- `Preferences` - `Advanced` - `Tabs` 에서 `Tabs: New tabs are added at the end, not next to current tab`을 `No` 로 변경한다.
- `Preferences` - `Advanced` 에서 `new tabs`로 검색해도 찾을 수 있다.

이 옵션이 `Yes`이면 새로운 탭을 열 때마다 가장 오른쪽에 생겨난다. 탭을 많이 열고 사용하는 나는 이 옵션을 반드시 `No`로 설정한다.


