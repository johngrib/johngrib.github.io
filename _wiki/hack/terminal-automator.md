---
layout  : wiki
title   : MacOS Automator를 사용해 터미널에 기능 붙이기
summary : 궁여지책
date    : 2025-09-12 20:03:44 +0900
updated : 2025-09-17 17:24:39 +0900
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

> 참고
>
> 저장한 서비스는 `~/Library/Services` 경로에서 찾을 수 있다.
{:style="background-color: #ecf1e8;"}

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

## 좀 더 발전시킨 버전: 화면에 표시된 URL 선택기 만들기

MacOS 기본 터미널은 URL에 `command + 클릭`을 하는 방식으로 웹 브라우저로 열거나, 텍스트에 패턴을 지정해 특정한 URL로 변환해 열어주는 기능이 없다.

- [최근의 iTerm 에서는 http(s)?에 링크를 걸어주는 것은 기본 기능이기도 하며, 간단한 설정으로 지라 티켓번호 등에 jira 사이트와 연결되는 링크를 거는 것도 가능하다](https://iterm2.com/feature-reporting/Hyperlinks_in_Terminal_Emulators.html ).
- [Alacritty 같은 벽창호 터미널 에뮬레이터에서도 hint 기능을 사용해 vimium처럼 링크를 여는 것이 가능하다.](https://github.com/johngrib/dotfiles/commit/ed7955a1bb1e4884b2e39fc4876e6d4def0f1085 )
- 다양한 설정이 가능한 WezTerm, Ghostty 에서도 제공하는 기능.

다음 이미지는 alacritty에서 hint 기능을 사용하는 장면이다.
`f`를 누르면 `https://johngrib.github.io`를 웹 브라우저에서 열어주는 방식.

![]( /resource/41/831002-AA3A-46CA-9B67-F5731EDFB4FE/alacritty-hint.jpg )

하지만 MacOS 빌트인 터미널에는 이런 기능이 없다. 여기에서는 셸 스크립트와 osascript를 사용해서 alacritty와 비슷한 느낌의 URL 선택기를 만들어본다.

### 아이디어

아이디어는 다음과 같다.

1. Terminal 화면에 표시된 텍스트를 확보한다.
2. 해당 텍스트에 포함된 http(s) URL 이나 JIRA 티켓번호 같은 것이 있는지 찾아서 표시한다.
3. 선택기를 제공한다.
4. 선택을 마치면, 선택한 URL 이나 티켓번호와 관련된 주소를 웹 브라우저에서 열어준다.

### osascript (AppleScript)를 호출하는 셸 스크립트를 사용한다

아래의 셸 스크립트는 현재 `Terminal`앱 화면에 표시된 텍스트를 `$TEMP_FILE`로 저장한다.

```bash
TEMP_FILE="/tmp/terminal_content.txt"

osascript << EOF > /dev/null
    tell application "Terminal"
        set terminal_text to contents of selected tab of front window
    end tell
    do shell script "echo " & quoted form of terminal_text & " > $TEMP_FILE"
EOF
```

### open-link-in-screen 셸 스크립트 작성

이제 재료는 다 갖춰졌다.

나는 아래와 같이 스크립트를 작성하였다. (조금 편집한 버전이다)

```bash
#!/usr/bin/env bash

 # 변수 준비
TERMINAL_HEIGHT=$(stty size | awk '{print $1}')

OPEN_FLAG=false
if [[ "$1" == "-o" ]]; then
    OPEN_FLAG=true
    shift
fi

TEMP_FILE="/tmp/terminal_content.txt"
cleanup() {
    local EXIT_CODE=$?
    \rm -f "$TEMP_FILE"
    exit $EXIT_CODE
}
trap cleanup EXIT
trap 'trap - EXIT; cleanup' INT TERM

handle_url() {
    local url="$1"
    if [[ "$OPEN_FLAG" == true ]]; then
        open "$url"
    else
        if [[ "$url" =~ ^[[:space:]]*$ ]]; then
            return
        fi
        echo "$url"
    fi
}

 # 스크린 텍스트 확보
osascript << EOF > /dev/null
    tell application "Terminal"
        set terminal_text to contents of selected tab of front window
    end tell
    do shell script "echo " & quoted form of terminal_text & " > $TEMP_FILE"
EOF

 # 스크린 내 URL 후보
REGEX="((jira|project)[- ]?[0-9]+)|(https?://[^ ]+)"
URL_LIST=$(tail -"$TERMINAL_HEIGHT" "$TEMP_FILE" \
    | sed '/^[[:space:]]*$/d' \
    | ggrep --color=always -P -i "$REGEX|$" \
    | tac \
    | fzf --ansi --no-reverse \
    | ggrep -o -P -i "$REGEX")

while IFS= read -r url; do
    if [[ "$url" =~ ^https?:// ]]; then
        handle_url "$url"
        exit;
    elif [[ "$url" =~ ^project ]]; then
        INPUT=$(echo "$url" | tr ' ' '-' | tr '[:lower:]' '[:upper:]')
        URI="https://jira.atlassian.net/browse/$INPUT"
        handle_url "$URI"
        exit;
    elif [[ "$url" =~ ^jira || "$url" =~ ^JIRA ]]; then
        INPUT=$(echo "$url" | tr ' ' '-' | tr '[:lower:]' '[:upper:]')
        URI="https://jira.daumkakao.com/browse/$INPUT"
        handle_url "$URI"
        exit;
    fi
done <<< "$URL_LIST"
```

### 사용법

터미널에서 간단하게 `open-link-in-screen -o`를 실행하면 된다.

만약 `-o` 옵션을 생략하면 선택한 결과 URL을 터미널에 출력하고 끝난다.

다만 매번 명령어를 입력해 실행하기는 번거로우므로, `.bashrc`에 다음과 같이 `bind` 입력을 등록하였다.

```bash
bind '"\ee": "\C-u  open-link-in-screen -o  \C-m"'
```

이렇게 하면 `option + e` 를 입력하는 것으로 화면에 보이는 https URL 이나 지라 티켓 번호 등을 선택해 웹 브라우저에서 열 수 있다.

<video controls autoplay loop><source src="/resource/41/831002-AA3A-46CA-9B67-F5731EDFB4FE/terminal-open.mp4" type="video/mp4"></video>

## Links

- osascript를 사용한 실제 작업: <https://github.com/johngrib/dotfiles/commit/53298df343ba109fd4a920424ea28566fcd284d5 >
