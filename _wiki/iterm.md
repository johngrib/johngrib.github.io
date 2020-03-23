---
layout  : wiki
title   : iTerm2
summary : 문제 해결 및 설정 경험을 모아본다
date    : 2020-03-23 11:35:51 +0900
updated : 2020-03-23 11:49:12 +0900
tag     : mac
toc     : true
public  : true
parent  : [[tools]]
latex   : false
---
* TOC
{:toc}

## 설치
```sh
brew cask install iterm2
```

## 내가 좋아하는 설정들
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


