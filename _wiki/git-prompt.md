---
layout  : wiki
title   : git prompt 설정
summary : 
date    : 2020-01-06 19:58:34 +0900
updated : 2020-03-27 23:26:44 +0900
tag     : git
toc     : true
public  : true
parent  : [[git]]
latex   : false
---
* TOC
{:toc}

## 개요

이 문서는 git branch, status 상황 등을 간략하게 보여주는 프롬프트를 설정하는 방법을 알아본다.

- 2017년 ~ 2020년 3월까지 gitHUD를 잘 사용해 왔다.
- 그러나 gitHUD는 다음과 같은 단점이 있다.
    - 컴퓨터를 바꿀 때마다 설치해야 한다.
    - 한글을 처리하지 못한다는 단점이 있다.
- 2020년 3월 부터는 직접 셸 스크립트로 만든 git prompt를 사용하고 있다.


## git prompt를 만들어 쓰자

나는 `gbr`이라는 이름의 함수를 만들어 사용하고 있다. 이름은 `git branch show`를 생각하고... 대충 지었다.

`gbr` 함수를 실행하면 다음과 같이 출력된다.

![gbr 함수를 실행한 모습]( /post-img/git-prompt/gbr.png )

프롬프트를 설정하면 터미널에서는 다음과 같이 보이게 된다.

![나의 프롬프트를 캡처한 사진]( /post-img/git-prompt/my-prompt.png )

- `[master]` - 현재 브랜치가 `master`.
- `2??` - untracked file이 2개.
- `2D` - deleted file이 2개.
- `1M` - modified file이 1개.
- `≡2` - stash에 2개가 쌓여 있음.

### gbr 함수의 코드

코드는 다음과 같다.

그냥 `git`, `grep`, `cut`, `awk`, `sort`, `uniq`, `tr`, `sed` 같은 기본 도구들을 사용해 간단히 만들었다.

```sh
function gbr {
    git status --short 2> /dev/null 1> /dev/null
    if [ "$?" -ne "0" ]; then
        return 1
    else
        branch="`git branch | grep '^\*' | cut -c 3-`"
        branch_str="\033[1;031m$branch\033[0m"

        stat=`git s \
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



## gitHUD의 사용
### Installation
```sh
brew tap gbataille/homebrew-gba
brew install githud
```

위와 같이 설치한 다음, `.bash_profile`이나 `.bashrc` 에서 프롬프트 변수인 `PS1`에 `githud`를 사용하도록 수정해주면 된다.

다음은 내가 사용하고 있는 `PS1`이다.

```sh
export PS1="${MAGENTA}\$(date +%Y-%m-%d-%a) \
${B_YELLOW}\$(date +%T) \
${GREEN}\u \
${B_MAGENTA}\h \
${B_BLUE}\w \
${COLOR_END}\
\$(/usr/local/bin/githud bash)\n\$ "
```

* `bash` 사용자라면 `/usr/local/bin/githud bash`를 쓴다.
* `zsh` 사용자라면 `/usr/local/bin/githud zsh`를 쓴다.

이 프롬프트를 사용하면 다음과 같은 프롬프트가 나타난다.

![prompt]( /post-img/git-prompt/githud.png )

### 프롬프트 설명서

[Prompt Explained](https://github.com/gbataille/gitHUD/blob/master/docs/PROMPT_EXPLAINED.md ) 문서를 보면 된다.

### 문제 해결

```
githudd: /usr/local/var/run/githudd.pid: openFd: does not exist (No such file or directory)
```

실행했을 때 다음과 같은 경고가 나온다면 다음 명령으로 쉽게 해결할 수 있다.

```sh
mkdir /usr/local/var/run
```

## Links

- [gitHUD](https://github.com/gbataille/gitHUD )
    - [Prompt Explained](https://github.com/gbataille/gitHUD/blob/master/docs/PROMPT_EXPLAINED.md )

