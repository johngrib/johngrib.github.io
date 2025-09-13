---
layout  : wiki
title   : MacOS Automator를 사용해 터미널에 기능 붙이기
summary : 궁여지책
date    : 2025-09-12 20:03:44 +0900
updated : 2025-09-13 17:39:49 +0900
tag     : 
resource: 41/831002-AA3A-46CA-9B67-F5731EDFB4FE
toc     : true
public  : true
parent  : [[/hack]]
latex   : false
---
* TOC
{:toc}

## URL 선택 후 웹 브라우저로 열어주기

iTerm 이나 WezTerm 같은 터미널 에뮬레이터에서는 제공하는 기능이지만 MacOS의 기본 터미널에서는 제공하지 않는 기능이다.

보통은 그냥 iTerm을 쓰면 해결되는데 그냥 터미널을 써야 하는 상황이라면 이 방법도 나쁘지 않다.

### automator로 서비스 만들기

1. Automator 를 실행하고 `빠른 동작`을 선택한다.
2. 다음과 같이 입력한다.
    - 현재 수신하는 작업흐름: `텍스트`
    - 선택 항목 위치: `터미널.app`
    - 입력: `전체 선택 항목`
    - 출력이 선택한 텍스트를 대치함: `선택 해제`
3. 동작으로는 `셸 스크립트 실행`을 찾아 드래그해둔다.
4. `셸 스크립트 실행`에서...
    - 셸: 적당히... `/bin/bash`
    - 통과 입력: `인수`

그리고 `셸 스크립트 실행`의 소스코드로 다음을 입력한다.

```bash
#!/bin/bash

selected_text="$1"
upper_text=$(echo "$selected_text" | tr '[:lower:]' '[:upper:]')

if [[ "$selected_text" =~ ^https?:// ]]; then
    open "$selected_text"
    exit 0
fi

 # JIRA 티켓 패턴 체크 (JIRA + 숫자)
if [[ "$upper_text" =~ ^JIRA[\ -]?[0-9]+$ ]]; then
    # 공백을 하이픈으로 변경
    jira_ticket=$(echo "$upper_text" | sed 's/ /-/g')
    open "https://jira.company.com/browse/$jira_ticket"
    exit 0
fi

 # 매칭되지 않으면 알림
osascript -e "display notification \"No pattern matched: $selected_text\" with title \"Smart Text Handler\""
```

이후 `command + s`를 눌러 저장한다.

![]( /resource/41/831002-AA3A-46CA-9B67-F5731EDFB4FE/terminal-uri.jpg )

그리고 나서 단축키를 설정하러 가면 된다.

`시스템 설정` - `키보드` - `키보드 단축키...` - `서비스` - `텍스트` 에 가보면 내가 저장한 이름으로 서비스가 등록되어 있다.

해당 서비스에 단축키를 등록해주면 된다.

또는 위의 내용을 셸 스크립트 파일로 저장하고, Automator에서 다음과 같이 스크립트를 지정해줘도 된다.

```bash
{파일까지의 전체 경로}/셸-스크립트-파일명 "$1"
```

### 사용법

#### 터미널에서 드래그 선택 후 우클릭

터미널에서 관련된 문자열이 출력되었을 때, 마우스로 드래그하고 우클릭하면 `서비스`에서 내가 만든 기능을 찾을 수 있다.

![]( /resource/41/831002-AA3A-46CA-9B67-F5731EDFB4FE/use-by-right-click.jpg )

#### 단축키 사용

터미널에서 관련된 문자열이 출력되었을 때, 마우스로 드래그하고 키보드 설정에서 지정해둔 단축키를 입력하면 된다.

## 참고

저장한 서비스는 `~/Library/Services` 경로에서 찾을 수 있다.

