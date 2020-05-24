---
layout  : wiki
title   : 맥 키보드 단축키
summary : 자주 쓰는 맥 단축키 정리
date    : 2018-01-28 09:09:54 +0900
updated : 2019-11-19 23:57:24 +0900
tag     : 단축키 mac
toc     : true
public  : true
parent  : [[index]]
latex   : false
---
* TOC
{:toc}

## 기호

| 기호 | 키 이름  | HTML Entity | in string | Unicode Character                         |
|------|----------|-------------|-----------|-------------------------------------------|
| ⌘    | Command  | `&#x2318;`  | "\u2318"  | [PLACE OF INTEREST SIGN][command]         |
| ⌥    | Option   | `&#x2325;`  | "\u2325"  | [OPTION KEY][option]                      |
| ⇧    | Shift    | `&#x21E7;`  | "\u21E7"  | [UPWARDS WHITE ARROW][shift]              |
| ⌃    | Control  | `&#x2303;`  | "\u2303"  | [UP ARROWHEAD][control]                   |
| ⎋    | ESC      | `&#x238B;`  | "\u238B"  | [BROKEN CIRCLE WITH NORTHWEST ARROW][esc] |
| ⇪    | Capslock | `&#x21ea;`  | "\u21ea"  | [UPWARDS WHITE ARROW FROM BAR][capslock]  |
| ⏎    | Return   | `&#x23ce;`  | "\u23ce"  | [RETURN SYMBOL][return]                   |
| ⌫    | Delete   | `&#x232b;`  | "\u232b"  | [ERASE TO THE LEFT][delete]               |
| ⇥    | Tab      | `&#x21E5;`  | "\u21E5"  | [RIGHTWARDS ARROW TO BAR][tab]            |
| ⏻    | Power    | `&#x23fb;`  | "\u23fb"  | [POWER SYMBOL][power]                     |

## 시스템 기본 단축키

### 일반

| 단축키      | 설명                                                     | 종료 | 숨김 |
| ----------- | -------------------------------------------------------- | ---- | ---- |
| `⌘-H`       | hide. 현재 활성화된 앱 윈도우를 숨긴다.                  |      | O    |
| `⌘-M`       | minimize. 현재 활성화된 앱 윈도우를 Dock으로 최소화한다. |      | O    |
| `⌘-W`       | window close. 활성화된 앱 윈도우를 종료한다.             | O    |      |
| `⌘-⌥-W`     | 활성화된 앱의 모든 윈도우를 종료한다.                    | O    |      |
| `⌘-Q`       | quit. 활성화된 앱을 종료한다.                            | O    |      |
| `⌥-⌘-⎋`     | 앱 강제 종료.                                            | O    |      |
| `⌘-⇧-⌥-⎋`   | 전면에 있는 앱 강제 종료.                                | O    |      |

### 스크린샷

* 파일로 저장할 경우 기본 경로는 데스크탑이다.
* Dropbox를 사용한다면, 데스크탑이 아니라 Dropbox 디렉토리에 저장될 수 있다.
* 영역을 선택하는 경우
    * `esc`키로 취소할 수 있다.
    * `space`키를 누르면 윈도우/메뉴를 선택해 스크린샷을 찍을 수 있다.

| 단축키    | 저장     | 범위      |
|-----------|----------|-----------|
| `⇧-⌘-3`   | 파일     | 화면      |
| `⇧-⌘-^-3` | 클립보드 | 화면      |
| `⇧-⌘-4`   | 파일     | 영역 선택 |
| `⇧-⌘-^-4` | 클립보드 | 영역 선택 |
| `⇧-⌘-6`   | 파일     | Touch bar |

### 시스템

| 단축키        | 설명                                            |
|---------------|-------------------------------------------------|
| `^-⌘-⏻ `   | 강제 재부팅                                     |
| `⇧-^-⌥-⏻ ` | smc 초기화 (배터리가 있는 맥북 계열에서만 작동) |
| `⇧-⌘-Q`       | 사용자 계정 로그아웃                            |
| `⌥-⇧-⌘-Q`     | 강제로 사용자 계정 로그아웃                     |

## 문서 편집

### 삭제

* Emacs 스타일 단축키가 눈에 띈다.

| 단축키 | 설명                                              | 비슷한 Vim 명령 |
|--------|---------------------------------------------------|-----------------|
| `fn-⌫` | Delete. 오른쪽으로 삭제한다.                      | `x`             |
| `^-D`  | Delete. 오른쪽으로 삭제한다.                      | `x`             |
| `^-H`  | 왼쪽으로 삭제한다.                                | `X`             |
| `⌥-⌫`  | 커서 왼쪽의 단어를 삭제한다.                      | `db`            |
| `^-K`  | 현재 커서 위치에서 라인 마지막 글자까지 삭제한다. | `D`             |
| `⌘-⌫`  | 현재 커서 위치에서 라인 처음 글자까지 삭제한다.   | `d0`            |

### 이동

* Emacs 스타일 단축키라 할 수 있다.

| 단축키 | 설명                             | 비슷한 Vim 명령 |
|--------|----------------------------------|-----------------|
| `^-A`  | 현재 라인의 처음으로 이동한다.   | `0`             |
| `^-E`  | 현재 라인의 마지막으로 이동한다. | `$`             |
| `^-F`  | 오른쪽으로 이동한다.             | `l`             |
| `^-B`  | 왼쪽으로 이동한다.               | `h`             |
| `^-P`  | 위로 이동한다.                   | `k`             |
| `^-N`  | 아래로 이동한다.                 | `j`             |
| `^-T`  | 커서 좌우의 글자를 바꾼다.       | `xp`            |

### 스타일

| 단축키 | 설명                  |
|--------|-----------------------|
| `⌘-T`  | 서체 윈도우 보기 토글 |
| `⌘-B`  | 볼드체                |
| `⌘-I`  | 이탤릭체              |
| `⌘-U`  | 밑줄 토글             |

### 기타

| 단축키  | 설명                             |
|---------|----------------------------------|
| `^-⌘-D` | 선택한 단어를 사전에서 찾아본다. |

## Finder 단축키

| 단축키  | 설명                                                   |
|---------|--------------------------------------------------------|
| `⇧-⌘-G` | 경로를 입력할 수 있는 입력칸을 보여준다.               |
| `⌘-I`   | info. 선택한 파일의 정보를 본다.                       |
| `⇧-⌘-D` | desktop. 데스크탑 디렉토리를 연다.                     |
| `⇧-⌘-F` | files. 나의 모든 파일 보기를 연다.                     |
| `⇧-⌘-H` | home. 사용자의 HOME 경로를 연다.                       |
| `⌥-⌘-L` | downLoad. 다운로드 디렉토리를 연다.                    |
| `⌥-⌘-P` | 아래쪽의 full path 경로 표시를 토글한다. 켜는 게 좋다. |
| `⇧-⌘-N` | 새로운 디렉토리를 만든다.                              |
| `⌘-T`   | 탭을 만든다.                                           |
| `⌘-up`  | 현재 디렉토리를 포함하는 부모 디렉토리를 연다.         |

## 단축키 변경
### 시스템 기본 단축키를 변경하기

* 변경하고 싶은 단축키가 있다면 대부분 `시스템 환경설정` - `키보드` - `단축키`에서 재지정 할 수 있다.
* 좀 더 다양하고 복잡하게 변경하고 싶다면 [Hammerspoon](http://www.hammerspoon.org/ )과 [Karabiner-Elements](https://github.com/tekezo/Karabiner-Elements )사용을 권한다.

### 단축키가 없는 기능에 단축키를 등록하기

화면 상단 풀다운 메뉴에서 특정 기능을 선택할 수 있다면, 단축키로 등록할 수 있다.

1. `시스템 환경설정` - `키보드` - `단축키` - `앱 단축키`에서 단축키를 등록할 앱을 선택한다.
2. 등록할 기능까지 도달하는 메뉴를 순서대로 나열하고 `->`로 연결한다.

예를 들어 "미리보기.app"의 상단 메뉴 `도구` 안에 있는 `크기 조절...`을 등록하고 싶다면 다음과 같이 `도구->크기 조절...`로 작성한 다음 단축키를 등록하면 된다.

![preview.app]( /post-img/mac-keyboard-shortcuts/69153977-81a3a300-0b22-11ea-80a5-a6aa557a98f4.png )

그러면 다음과 같이 등록한 단축키를 사용할 수 있게 된다.

![menu of preview.app]( /post-img/mac-keyboard-shortcuts/69154235-faa2fa80-0b22-11ea-86f2-62232789a34a.png )

## Links

* [Mac 키보드 단축키(support.apple.com)](https://support.apple.com/ko-kr/HT201236 )
* [Mac에서 스크린샷을 찍는 방법(support.apple.com)](https://support.apple.com/ko-kr/HT201361 )
* [맥의 하드웨어 담당하는 PRAM과 SMC의 차이와 초기화(리셋)으로 해결할 수 있는 문제 유형(BACK TO THE MAC)](http://macnews.tistory.com/742 )
* [OS X 요세미티 사용 중 화면이 뚝뚝 끊기거나 그래픽 성능이 크게 저하되는 문제와 임시 해결책 'WIndowServer 프로세스가 주범'(BACK TO THE MAC)](http://macnews.tistory.com/2706 )

[command]: https://www.fileformat.info/info/unicode/char/2318/index.htm
[option]: https://www.fileformat.info/info/unicode/char/2325/index.htm
[shift]: https://www.fileformat.info/info/unicode/char/21e7/index.htm
[control]: https://www.fileformat.info/info/unicode/char/2303/index.htm
[esc]: https://www.fileformat.info/info/unicode/char/238b/index.htm
[capslock]: https://www.fileformat.info/info/unicode/char/21ea/index.htm
[return]: https://www.fileformat.info/info/unicode/char/23ce/index.htm
[delete]: https://www.fileformat.info/info/unicode/char/232b/index.htm
[tab]: https://www.fileformat.info/info/unicode/char/21e5/index.htm
[power]: https://www.fileformat.info/info/unicode/char/23fb/index.htm

