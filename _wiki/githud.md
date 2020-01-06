---
layout  : wiki
title   : gitHUD로 git prompt를 쉽게 표시하자
summary : 
date    : 2020-01-06 19:58:34 +0900
updated : 2020-01-07 08:50:31 +0900
tag     : git
toc     : true
public  : true
parent  : [[git]]
latex   : false
---
* TOC
{:toc}

## Installation
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

![prompt]( /post-img/githud/githud.png )

## 프롬프트 설명서

[Prompt Explained](https://github.com/gbataille/gitHUD/blob/master/docs/PROMPT_EXPLAINED.md ) 문서를 보면 된다.

## 문제 해결

```
githudd: /usr/local/var/run/githudd.pid: openFd: does not exist (No such file or directory)
```

실행했을 때 다음과 같은 경고가 나온다면 다음 명령으로 쉽게 해결할 수 있다.

```sh
mkdir /usr/local/var/run
```

## Links

* [gitHUD](https://github.com/gbataille/gitHUD )
* [Prompt Explained](https://github.com/gbataille/gitHUD/blob/master/docs/PROMPT_EXPLAINED.md )
