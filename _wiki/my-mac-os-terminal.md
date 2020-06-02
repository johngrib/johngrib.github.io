---
layout  : wiki
title   : macOS 초심자를 위한 터미널 공부 가이드
summary : 편안하고 즐거운 터미널 생활
date    : 2019-11-13 22:39:11 +0900
updated : 2020-06-02 23:56:12 +0900
tag     : terminal study vim
toc     : true
public  : true
parent  : [[my-lifehack]]
latex   : false
---
* TOC
{:toc}


* 터미널은 컴퓨터와 채팅하는 방식으로 컴퓨터에게 일을 시키는 것이다.
    * 따라서 익숙해지면 유쾌하고 편리하며, 즐겁다.
* 이 글은 과거, 터미널 학습을 막 시작했던 때의 나에게 해줄만한 조언을 나열한다.
* 만약 이 글을 읽는 여러분이 터미널 초심자라면 이 글이 도움이 될 수 있을지도 모른다.
* 이 문서는 bash를 전제한다.


## 단축키로 터미널을 언제든지 부를 수 있도록 설정한다

단축키로 터미널을 언제든지 부를 수 있어야 편하다.

나는 Hammerspoon으로 `F17` + `space`를 누르면 터미널이 화면에 나타나도록 설정해 두었다.

iTerm의 경우 Preferences - Keys - Hotkey 로 들어가면 설정할 수 있다.

## prompt를 꾸며본다

`PS1`에 대해 조사하고 자신만의 프롬프트를 꾸며본다. 그러면서 `.bash_profile`, `.bashrc`와 같은 파일들에 대해서도 조사한다.

나는 다음과 같은 프롬프트를 사용하고 있다.

```sh
# colors
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

# PS1="\h:\W \u\$ "  # default promopt
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

export PS1="${MAGENTA}\$(date +%Y-%m-%d-%a) \
${B_YELLOW}\$(date +%T) \
${GREEN}\u \
${B_MAGENTA}\h \
${B_BLUE}\w \
${COLOR_END}\
\$(gbr)\n\$ "
```

`gbr` 함수는 `git branch`와 `git status --short` 결과를 간단하게 보여준다.

![prompt]( /post-img/my-mac-os-terminal/68994193-93d3d600-08c3-11ea-9525-43d22171a358.png )

* 날짜와 시간: 시계를 덜 보게 된다. 가끔 오래 걸리는 명령을 실행했을 때 언제 끝났는지를 프롬프트만 보고 알 수 있게 된다.
* working directory: pwd를 계속해서 입력해야 하는 불편함을 해소해 준다. 내가 어디에 있는지 알 수 있어 답답함이 덜하다.
* git 브랜치 이름과 그 외의 잡다한 정보.


## brew 사용법을 익힌다

macOS용 패키지 관리자인 [Homebrew](https://brew.sh/index_ko ) 사용법을 익혀두면 다양한 프로그램을 쉽게 설치하고 관리할 수 있다.

`install`, `uninstall`, `list`, `doctor`, `cask`, `tap` 등의 사용법을 익힌다.

훗날 익숙해지면 대안에 대해서도 알아본다. 다른 OS에서는 사람들이 어떤 도구를 사용하는지도 알아본다.

짬이 나면 `brew cask`에 대해서도 알아본다.

`Brefile`과 `bundle` 명령어를 사용할 수 있다면 스크립트를 사용해 여러 프로그램을 하나의 명령으로 설치할 수도 있다.

## 명령어 사용법을 검색하는 방법을 익힌다

### man을 읽는다

`man`은 공식 매뉴얼을 가장 쉽게 읽을 수 있는 방법이다. 읽는 버릇을 들이면 좋다.

```sh
man echo
```

### 새로운 명령어를 익히면 블로그에 정리한다

새로운 명령어를 익히면 반드시 기록으로 남기고, 검색할 수 있게 한다.

이렇게 하면 터미널 명령에 익숙해지는 것은 시간 문제이다.

내가 사용하고 있는 명령 검색용 명령은 직접 작성한 `exam`이라는 이름의 스크립트로, 내용은 다음과 같다.

개선할 점이 많이 있긴 하지만 그럭저럭 잘 작동한다.

```sh
#!/usr/bin/env bash

wiki=`stat -f "%N" ~/johngrib.github.io/_wiki`

if [ "$wiki" = "" ]; then
    echo "invalid wiki location."
    return 0
fi

name=`egrep 'tag\s*:.*command( |$)' $wiki/* -l 2> /dev/null \
    | xargs egrep 'summary|title' \
    | awk -F':' 'NR%2==1 { name=$1; title=$3 } NR%2==0 { print name, ":", title, ":", $3 }' \
    | sed "s,"$wiki"/,," \
    | column -ts':' \
    | sort \
    | fzf --preview "showPreview $wiki/{1}" --query="$1" \
    | cut -d' ' -f1 \
`

if [ "$name" = "" ]; then
    exit
fi

showPreview $wiki/$name | less -R -X
```

아래쪽에 있는 `showPreview`의 내용은 다음과 같다.

```sh
#!/usr/bin/env bash

tail -n +16 $1 | glow - -s dark
```

터미널에서 `exam`을 입력하면 다음과 같이 나타나고, 검색을 할 수 있게 된다.

![exam]( /post-img/my-mac-os-terminal/68771205-e1a1d180-066a-11ea-93ec-f81f08b10d3c.png )

이 스크린샷은 [[cut]] 명령을 검색한 것이다.

### bro, tldr 명령을 설치하고 사용법을 익힌다

[bropages](http://bropages.org/ ), [TLDR pages](https://tldr.sh/ )는 터미널 명령에 대한 예제를 제공하는 유용한 웹 사이트인데, 로컬 터미널에서 예제를 검색하는 기능을 제공한다.

다음과 같이 설치할 수 있다.

```sh
$ gem install bropages
$ brew install tldr
```

다음과 같이 사용할 수 있다.

```sh
$ bro find      # find 사용법에 대해 형에게 물어본다
$ tldr find     # find 사용법을 간결하게 알아본다
```

## 파이프 사용법을 익힌다

파이핑을 익히면 여러 명령을 조합해 내가 원하는 형태로 결과를 가공할 수 있다.

예를 들어 다음 명령어 조합은 실행할 때마다 `가위`, `바위`, `보` 중 하나를 랜덤으로 출력한다.

```sh
$ echo -e "가위\n바위\n보" | sort -R | head -1
```

익숙해지면 자연히 `sed`, `awk`, `tee`의 사용법도 익히게 될 것이다.


## 리다이렉션을 익힌다

리다이렉션을 익히는 것은 단순히 다음 기호들의 의미를 익히는 것 이상의 중요한 의미가 있다.

`>`, `>>`, `<`, `<<`, `&`, `1`, `2`

다음 문서를 열심히 읽고 다양하게 응용해 본다.

[3.6 Redirections]( https://www.gnu.org/software/bash/manual/html_node/Redirections.html )

시간이 날 때 다른 사람들이 작성한 셸 스크립트를 찾아보고 `/dev/null`에 대해서도 알아본다.

줄줄이 딸려오는 다양한 문서들을 즐겁게 따라가며 읽는다.


## GUI와 함께 어울릴 수 있는 명령어를 익힌다

macOS의 경우 `pbcopy`, `pbpaste`를 사용할 수 있다.

그리고 이 명령을 파이프와 함께 사용하도록 한다.

`open` 명령어, `m-cli`도 익혀두면 편리하다.

## 터미널이 인식하는 키에 대해 이해한다

* [[special-chars]] 문서를 읽는 것도 약간은 도움이 될 수 있다.
* `^c`, `^h`, `^m`, `^j`, `^n`, `^p`, `^b`, `^f`, `^u`, `^e`, `^w` 등에 대해 조사한다.
    * 터미널에서 이런 키 조합을 하면 어떤 결과가 나온다는 것을 알게 된 데에서 정지하지 않도록 한다.

## 검색 명령에 익숙해진다

`grep`, `egrep`, `find`, `ag` 등의 명령을 파이프와 함께 사용해보고 다양한 옵션을 실험해본다.

## 변수 설정, if, for의 사용법을 익힌다

변수를 설정하고 if와 for를 사용할 수 있게 되면 할 수 있는 것이 많아진다.

## 내 컴퓨터에 있는 명령어들 중 모르는 것이 있나 확인한다

적어도 내 컴퓨터에 뭐가 있는지는 알아두면 좋은 경우가 많다.

있는데도 몰라서 못 쓰는 경우도 많은데다가, 설치해놓고 잊고 사는 경우도 있다.

내 경우에는 `.bashrc`에 다음 명령을 넣어둬서, 터미널을 열 때마다 `/usr/local/bin`에 있는 파일 중 하나를 랜덤으로 추천받게 했다.

```sh
ls /usr/local/bin | sort -R | head -1 | xargs printf "Do you know about %s ?\n"
```

이렇게 하면 터미널을 열 때마다 다음과 같은 질문이 출력된다.

```
Do you know about cowsay ?
```

만약 `cowsay`가 무슨 명령인지 모른다면 곧바로 다음과 같이 사용 방법을 조사한다.

```sh
$ bro cowsay
$ tldr cowsay
$ man cowsay    # 자세히 알고 싶은 경우 반드시 읽는다
```

## vim 사용법을 익힌다

vim을 그냥 익히지만 말고, vim 안에서 다양한 다른 터미널 명령어들을 활용하는 방법에 대해 고민하도록 한다.

이에 대해서는 [vim 에디터는 터미널 도구]( ../../wiki/two-views-of-vim/#vim-에디터는-터미널-도구 ) 문서를 읽어보면 도움이 될 수 있다.

## fzf 사용법을 익힌다

fzf는 터미널 사용 경험을 매우 즐겁게 만들어주는 위대한 프로그램이다.

fzf를 설치하고, `^t`와 `^[c`(M-c)를 열심히 사용해보도록 한다.

fzf에 익숙해지면 fzf를 사용해 이런저런 선택기를 만들어 본다.

* [fav-dir](https://github.com/johngrib/fav-dir )은 작년에 fzf를 활용해 만든 디렉토리 즐겨찾기 셸 스크립트인데, 매일 수십번씩 사용하고 있다.
* [[git-alias]]{편리한 git alias 설정하기} 문서에는 내 fzf 사용 노하우가 많이 포함되어 있다.

## fc 명령어를 사용한다

fc 명령어를 사용하면 전에 입력한 명령을 vim에서 편집할 수 있다.

편집을 마친 후, 저장하고 종료하면 실행된다. 매우 긴 명령이나 위험한 명령을 사용할 때 요긴하다.

fc 명령어에 익숙해지면 `control-x, control-e`도 사용해 보고, `export EDITOR`에 대해 구글링해 본다.

## 잡다한 것을 계속해서 만들어 본다

뭐라도 좋으니 잡다한 셸 스크립트를 계속해서 만들어 본다.

어차피 자신의 맥 로컬에서 돌아가는 것이므로 속도 걱정은 하지 말고 엉망으로 만든다.

그리고 짬짬이 쓰면서 생각날 때마다 조금씩 고친다.

누가 보아도 똥 코드라 부를 것 같은 부끄러운 코드라도 한 번 만들어 보는 것이 아무 것도 하지 않는 것보다 낫다.

터미널에서 쓸 수 있는 명령은 몇 백 가지가 넘는다. 쓰다 보면 아이디어가 찾아오게 되어 있다.

예를 들어 작년 12월 31일, 나는 갑자기 github의 contribute 그래프를 터미널에서 보면 재미있겠다는 생각이 들어 다음과 같은 결과를 보여주는 셸 스크립트를 만들었다.

* [contribute](https://github.com/johngrib/dotfiles/blob/master/bin/contribute )

![contribute]( /post-img/my-mac-os-terminal/68949124-b949dc80-07fc-11ea-962b-c3bbef16dbf5.png )

이 셸 스크립트는 엉망이지만 그럭저럭 돌아갔고, 이후 github이 메인화면을 개편하면서 이상하게 돌아가게 되었는데 오늘 고쳤더니 예전처럼 잘 돌아간다.

그리고 셸 스크립트를 다루는 실력이 아주 약간은 증진되었다고 느꼈다.

나는 이 셸 스크립트와 다른 잡다한 셸 스크립트들을 계속 고치면서 사용할 것이다. 그리고 이 외에 다른 재미있는 것들도 계속 만들어갈 생각이다.


