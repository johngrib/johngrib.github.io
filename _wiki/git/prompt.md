---
layout  : wiki
title   : git prompt 설정
summary : 
date    : 2020-01-06 19:58:34 +0900
updated : 2023-09-25 22:38:08 +0900
tag     : git
resource: 19/D18D8A-C819-4507-AE60-26E361BF638F
toc     : true
public  : true
parent  : [[/git]]
latex   : false
---
* TOC
{:toc}

## 개요

이 문서는 git branch, status 상황 등을 간략하게 보여주는 프롬프트를 설정하는 방법을 알아본다.

## git prompt를 만들어 쓰자

나는 `gbr`이라는 이름의 함수를 만들어 사용하고 있다. 이름은 `git branch show`를 생각하고... 대충 지었다.

`gbr` 함수를 실행하면 다음과 같이 출력된다.

![gbr 함수를 실행한 모습]( /resource/19/D18D8A-C819-4507-AE60-26E361BF638F/gbr.png )

프롬프트를 설정하면 터미널에서는 다음과 같이 보이게 된다.

![나의 프롬프트를 캡처한 사진]( /resource/19/D18D8A-C819-4507-AE60-26E361BF638F/my-prompt.png )

- `[master]` - 현재 브랜치가 `master`.
- `2??` - untracked file이 2개.
- `2D` - deleted file이 2개.
- `1M` - modified file이 1개.
- `≡2` - stash에 2개가 쌓여 있음.

### gbr 함수의 코드 {#gbr-code}

코드는 다음과 같다.

그냥 [[/git]]{git}, [[/cmd/grep]]{grep}, [[/cmd/cut]]{cut}, [[/language/awk]]{awk}, [[/cmd/sort]]{sort}, [[/cmd/uniq]]{uniq}, [[/cmd/tr]]{tr}, [[/cmd/sed]]{sed} 같은 기본 도구들을 사용해 간단히 만들었다.

```sh
function gbr {
    git status --short 2> /dev/null 1> /dev/null
    if [ "$?" -ne "0" ]; then
        return 1
    else
        branch="`git branch --show-current`"
        branch_str="\033[1;031m$branch\033[0m"

        stat=`git status --short \
            | awk '{print $1}' \
            | sort | uniq -c \
            | tr '\n' ' ' \
            | sed -E 's/([0-9]+) /\1/g; s/  */ /g; s/ *$//'`

        stash_size=`git stash list | wc -l | sed 's/ //g'`
        stash_icon=" \e[0;92m≡\033[0m"
        printf "[$branch_str]$stat$stash_icon$stash_size"
        return 0
    fi
}
```

다음은 색깔과 프롬프트(`PS1`) 설정이다.

```sh
GREEN='\e[0;32m\]'
B_GREEN='\e[1;32m\]'
MAGENTA='\e[0;35m\]'
B_MAGENTA='\e[1;35m\]'
YELLOW='\e[0;33m\]'
B_YELLOW='\e[1;33m\]'
RED='\e[0;31m'
BLUE='\e[0;34m'
B_BLUE='\e[1;34m'
CYAN='\e[0;36m\]'
COLOR_END='\[\033[0m\]'

export PS1="${MAGENTA}\$(date +%Y-%m-%d-%a) \
${B_YELLOW}\$(date +%T) \
${GREEN}\u \
${B_MAGENTA}\h \
${B_BLUE}\w \
${COLOR_END}\
\$(gbr)\n\$ "
```

