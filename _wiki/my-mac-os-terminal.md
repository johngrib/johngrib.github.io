---
layout  : wiki
title   : macOS 초심자를 위한 터미널 공부 가이드
summary : 편안하고 즐거운 터미널 생활
date    : 2019-11-13 22:39:11 +0900
updated : 2019-11-14 00:03:25 +0900
tag     : terminal study
toc     : true
public  : true
parent  : my-lifehack
latex   : false
---
* TOC
{:toc}


* 터미널은 컴퓨터와 채팅하는 방식으로 컴퓨터에게 일을 시키는 것이다.
    * 따라서 익숙해지면 유쾌하고 편리하며, 즐겁다.
* 이 글은 과거, 터미널 학습을 막 시작했던 때의 나에게 해줄만한 조언을 나열한다.
* 만약 이 글을 읽는 여러분이 터미널 초심자라면 이 글이 도움이 될 수 있을지도 모른다.


## 단축키로 터미널을 언제든지 부를 수 있도록 설정한다

단축키로 터미널을 언제든지 부를 수 있어야 편하다.

나는 Hammerspoon으로 `F17` + `space`를 누르면 터미널이 화면에 나타나도록 설정해 두었다.

iTerm의 경우 Preferences - Keys - Hotkey 로 들어가면 설정할 수 있다.


## 새로운 명령어를 익히면 블로그에 정리한다

새로운 명령어를 익히면 반드시 기록으로 남긴다.

단, 반드시 실제 사용하는 예제 위주로 작성하도록 한다.

그리고 이렇게 작성한 기록은 터미널에서 언제든지 검색해서 볼 수 있도록 설정해둔다(나는 jekyll을 사용하고 있으므로, 블로그에 쓰는 모든 문서가 로컬에도 있다).

내가 사용하고 있는 명령 검색용 명령은 exam 함수로, 내용은 다음과 같다.

개선할 점이 많이 있긴 하지만, 그럭저럭 잘 작동한다.

```sh
function exam {
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
        | fzf --preview "pygmentize $wiki/{1}" \
        | cut -d' ' -f1 \
    `

    if [ "$name" = "" ]; then
        return 0
    fi

    bat $wiki/$name

    return 0
}
```

터미널에서 `exam`을 입력하면 다음과 같이 나타나고, 검색을 할 수 있게 된다.

![exam](https://user-images.githubusercontent.com/1855714/68771205-e1a1d180-066a-11ea-93ec-f81f08b10d3c.png )

이 스크린샷은 [[cut]] 명령을 검색한 것이다.

이 외에도 bropages, [TLDR pages](https://tldr.sh/ ) 등을 활용해 학습하도록 한다.

참고로 bropages와 tldr은 다음과 같이 설치할 수 있다.

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


## copy/paste 명령을 익힌다

macOS의 경우 `pbcopy`, `pbpaste`를 사용할 수 있다.

그리고 이 명령을 파이프와 함께 사용하도록 한다.


## 터미널이 인식하는 키에 대해 이해한다

* [[special-chars]] 문서를 읽는 것도 약간은 도움이 될 수 있다.
* `^c`, `^h`, `^m`, `^j`, `^n`, `^p`, `^b`, `^f`, `^u`, `^e`, `^w` 등에 대해 조사한다.
    * 터미널에서 이런 키 조합을 하면 어떤 결과가 나온다는 것을 알게 된 데에서 정지하지 않도록 한다.

## 검색 명령에 익숙해진다

`grep`, `egrep`, `find`, `ag` 등의 명령을 파이프와 함께 사용해보고 다양한 옵션을 실험해본다.

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

