---
layout  : wiki
title   : 맥 키보드 단축키
summary : 자주 쓰는 맥 단축키 정리
date    : 2018-01-28 09:09:54 +0900
updated : 2018-01-30 10:59:24 +0900
tag     : 단축키 mac
toc     : true
public  : true
parent  : index
latex   : false
---
* TOC
{:toc}

## 변경

* 변경하고 싶은 단축키가 있다면 대부분 `시스템 환경설정` - `키보드` - `단축키`에서 재지정 할 수 있다.
* 좀 더 다양하고 복잡하게 변경하고 싶다면 [Hammerspoon](http://www.hammerspoon.org/ )과 [Karabiner-Elements](https://github.com/tekezo/Karabiner-Elements )사용을 권한다.

## 일반

| 단축키                       | 설명                                                       | 종료     | 숨김     |
| ---------------------------- | ---------------------------------------------------------- | :------: | :------: |
| `command-H`                  | hide. 현재 활성화된 앱 윈도우를 숨긴다.                    |          | O        |
| `command-M`                  | minimize. 현재 활성화된 앱 윈도우를 Dock으로 최소화한다.   |          | O        |
| `command-W`                  | window close. 활성화된 앱 윈도우를 종료한다.               | O        |          |
| `command-option-W`           | 활성화된 앱의 모든 윈도우를 종료한다.                      | O        |          |
| `command-Q`                  | quit. 활성화된 앱을 종료한다.                              | O        |          |
| `option-command-esc`         | 앱 강제 종료.                                              | O        |          |
| `command-shift-option-esc`   | 전면에 있는 앱 강제 종료.                                  | O        |          |

## 스크린샷

* 파일로 저장할 경우 기본 경로는 데스크탑이다.
* Dropbox를 사용한다면, 데스크탑이 아니라 Dropbox 디렉토리에 저장될 수 있다.
* 영역을 선택하는 경우
    * `esc`키로 취소할 수 있다.
    * `space`키를 누르면 윈도우/메뉴를 선택해 스크린샷을 찍을 수 있다.

| 단축키                    | 저장     | 범위      |
|---------------------------|----------|-----------|
| `shift-command-3`         | 파일     | 화면      |
| `shift-command-control-3` | 클립보드 | 화면      |
| `shift-command-4`         | 파일     | 영역 선택 |
| `shift-command-control-4` | 클립보드 | 영역 선택 |

### 맥북 프로의 Touch bar 스크린샷을 찍는 방법

* `shift-command-6`으로 할 수 있다.

## 시스템

| 단축키                       | 설명                                            |
|------------------------------|-------------------------------------------------|
| `control-command-power`      | 강제 재부팅                                     |
| `shift-control-option-power` | smc 초기화 (배터리가 있는 맥북 계열에서만 작동) |
| `shift-command-Q`            | 사용자 계정 로그아웃                            |
| `option-shift-command-Q`     | 강제로 사용자 계정 로그아웃                     |

## 문서 편집

### 삭제

* Emacs 스타일 단축키가 눈에 띈다.

| 단축키           | 설명                                              | 비슷한 Vim 명령 |
|------------------|---------------------------------------------------|-----------------|
| `fn-delete`      | Delete. 오른쪽으로 삭제한다.                      | `x`             |
| `control-D`      | Delete. 오른쪽으로 삭제한다.                      | `x`             |
| `control-H`      | 왼쪽으로 삭제한다.                                | `X`             |
| `option-delete`  | 커서 왼쪽의 단어를 삭제한다.                      | `db`            |
| `control-K`      | 현재 커서 위치에서 라인 마지막 글자까지 삭제한다. | `D`             |
| `command-delete` | 현재 커서 위치에서 라인 처음 글자까지 삭제한다.   | `d0`            |

### 이동

* Emacs 스타일 단축키라 할 수 있다.

| 단축키      | 설명                             | 비슷한 Vim 명령 |
|-------------|----------------------------------|-----------------|
| `control-A` | 현재 라인의 처음으로 이동한다.   | `0`             |
| `control-E` | 현재 라인의 마지막으로 이동한다. | `$`             |
| `control-F` | 오른쪽으로 이동한다.             | `l`             |
| `control-B` | 왼쪽으로 이동한다.               | `h`             |
| `control-P` | 위로 이동한다.                   | `k`             |
| `control-N` | 아래로 이동한다.                 | `j`             |
| `control-T` | 커서 좌우의 글자를 바꾼다.       | `xp`            |

### 스타일

| 단축키      | 설명                  |
|-------------|-----------------------|
| `command-T` | 서체 윈도우 보기 토글 |
| `command-B` | 볼드체                |
| `command-I` | 이탤릭체              |
| `command-U` | 밑줄 토글             |

### 기타

| 단축키              | 설명                             |
|---------------------|----------------------------------|
| `control-command-D` | 선택한 단어를 사전에서 찾아본다. |

## Finder 단축키

| 단축키             | 설명                                                   |
|--------------------|--------------------------------------------------------|
| `shift-command-G`  | 경로를 입력할 수 있는 입력칸을 보여준다.               |
| `command-I`        | info. 선택한 파일의 정보를 본다.                       |
| `shift-command-D`  | desktop. 데스크탑 디렉토리를 연다.                     |
| `shift-command-F`  | files. 나의 모든 파일 보기를 연다.                     |
| `shift-command-H`  | home. 사용자의 HOME 경로를 연다.                       |
| `option-command-L` | downLoad. 다운로드 디렉토리를 연다.                    |
| `option-command-P` | 아래쪽의 full path 경로 표시를 토글한다. 켜는 게 좋다. |
| `shift-command-N`  | 새로운 디렉토리를 만든다.                              |
| `command-T`        | 탭을 만든다.                                           |
| `command-up`       | 현재 디렉토리를 포함하는 부모 디렉토리를 연다.         |

## Links

* [Mac 키보드 단축키(support.apple.com)](https://support.apple.com/ko-kr/HT201236 )
* [Mac에서 스크린샷을 찍는 방법(support.apple.com)](https://support.apple.com/ko-kr/HT201361 )
* [맥의 하드웨어 담당하는 PRAM과 SMC의 차이와 초기화(리셋)으로 해결할 수 있는 문제 유형(BACK TO THE MAC)](http://macnews.tistory.com/742 )
* [OS X 요세미티 사용 중 화면이 뚝뚝 끊기거나 그래픽 성능이 크게 저하되는 문제와 임시 해결책 'WIndowServer 프로세스가 주범'(BACK TO THE MAC)](http://macnews.tistory.com/2706 )
