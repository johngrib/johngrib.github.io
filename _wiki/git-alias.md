---
layout  : wiki
title   : 편리한 git alias 설정하기
summary : 나만의 git alias를 만들어 보자
date    : 2018-12-02 10:26:37 +0900
updated : 2019-08-31 18:54:03 +0900
tag     : fzf git bash
toc     : true
public  : true
parent  : git
latex   : false
---
* TOC
{:toc}

# git alias?

* git을 매일 사용한다면 자연스럽게 git의 온갖 명령어와 옵션에 익숙해지게 된다.
* 하지만 익숙해지는 것과 별개로, 여전히 입력하기 귀찮은 길고 복잡한 명령들이 있다.
* alias를 사용하면 귀찮은 명령들을 쉽고 재미있게 축약하여 사용할 수 있다.


# 일반적으로 널리 쓰이는 git alias

다음은 보통 널리 쓰이는 git alias를 설정한 .gitconfig 파일의 `[alias]` 섹션이다.

```perl
[alias]
    s = status -s
    co = checkout
    ci = commit
    br = branch
```

위와 같이 설정하면 다음과 같이 사용할 수 있다.

* `git s` 는 `git status -s` 와 똑같다.
* `git co ...` 는 `git checkout`와 똑같다.
* ...

`status -s`나 `checkout`는 매번 입력하기에는 너무 긴 문자열이라 손가락이 피곤하다.

이러한 alias라면 확실히 편리하게 사용할 수 있을 것이다.

그리고 다음 alias는 필수 alias라고 생각하는 것이다. 몇 년 전 예전 회사 동료 H 님에게 받은 이후로 잘 사용하고 있다. git의 log 그래프를 보기 좋게 해주니 이런 종류의 alias를 사용하지 않고 있었다면 반드시 등록해서 사용하도록 하자.

```perl
[alias]
l = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr)%C(bold blue)<%an>%Creset' --abbrev-commit
```


# git alias에서 셸 명령어 사용하기

바로 위에서 사용한 git alias는 편리하고 심플하다.

하지만 셸 명령어를 사용할 수 있다면 좀 더 재미있고 강력하게 사용할 수 있다.

* 느낌표로 시작하는 alias는 셸 스크립트로 작동하게 된다.

Hello World 부터 찍어보며 시작해보자.

```perl
[alias]
    test = "!echo Hello World"
```

실행하면 Hello World가 출력된다.

```sh
$ git test
Hello World
```

이것으로 다양한 기능을 `git` 명령어에 덕지덕지 갖다 붙일 수 있다.


## 현재 브랜치 이름 출력하기

이 alias는 branch 목록에서 `*`, 즉 현재 브랜치 이름을 가져온다.

```perl
[alias]
    b0 = "!git branch | awk '/^\\*/{print $2}'"
```

구조는 심플하다.

* 브랜치 목록을 가져온다.
* `awk`로 파이핑한다.
    * `*`로 시작하는 행을 찾는다.
    * 2번째 단어를 출력한다.

## 현재 브랜치를 백업하는 브랜치 만들기

이번에는 현재 브랜치를 백업하는 브랜치를 만드는 alias를 만들어 보자.

```perl
[alias]
    b0 = "!git branch | awk '/^\\*/{print $2}'"
    back = "!git branch backup-`git b0`"
```

`git back`을 실행하면, 현재 브랜치 이름 앞에 `backup-`을 붙인 백업 브랜치를 만들어 준다.

만약 현재 브랜치가 `master`라면, `backup-master` 브랜치가 만들어진다.

## 머지된 브랜치 청소하기

다음 alias를 사용하면 이미 머지를 마쳤지만 귀찮아서 지우지 않고 있었던 브랜치들을 한꺼번에 삭제할 수 있다.

```perl
[alias]
    cleanbranch = "!git branch -d $(git branch --merged | grep -v '^\\*\\|\\<master$')"
```

구조는 다음과 같다.

* 서브셸
    * 머지된 브랜치 목록을 가져온다.
    * `grep`으로 파이핑한다.
        * `*`로 시작하는 라인을 제외한다.
        * `단어경계master`로 끝나는 라인을 제외한다.
* 서브셸에서 얻은 브랜치 목록을 `git branch -d`로 삭제한다.


## fzf로 선택 ui 추가하기

[fzf](https://github.com/junegunn/fzf )를 사용하면 선택 ui를 추가할 수 있어 더 편리한 alias를 만들 수 있다.

### 브랜치 선택기

다음 alias를 사용하면 브랜치 목록을 보고 검색어/위-아래 화살표 키를 사용해 브랜치를 선택, checkout 할 수 있다.

```perl
[alias]
    ch = "!git checkout $(git branch | fzf)"
```

![gitch](https://user-images.githubusercontent.com/1855714/49334948-c5598000-f625-11e8-9de3-11eaee3d8bc2.gif)

브랜치 이름만 나오게 하면 좀 심심하니까 `-vv`로 각 브랜치의 가장 마지막 commit의 hash 값 일부와 커밋 메시지 첫번째 라인도 보이도록 하자.

```perl
[alias]
    ch = "!git checkout $(git branch -vv | grep -v '^\\*' | fzf | awk '{print $1}')"
```

구조는 다음과 같다.

* 서브셸
    * `git branch -vv` 목록을 가져온다.
    * `grep`으로 `*`로 시작하는 라인 제외한다.
    * `fzf`로 사용자가 선택하게 한다.
    * `awk`로 사용자가 선택한 라인에서 branch 이름만 가져온다.
* 서브셸에서 얻은 브랜치 이름으로 `git checkout` 한다.

### add 선택기

`git add`를 할 때 스테이징할 파일과 아닌 파일이 마구 섞여 있다면 손가락이 바빠진다.

이번에는 fzf를 써서 add 선택기를 만들어 보자.

* 여러 아이템을 선택하고 싶을 땐 fzf에 `-m` 옵션을 주면 된다.
    * `tab`키로 체크/해제가 가능하다.

```perl
[alias]
    s = status -s
    a = "!git add $(git status -s | fzf -m | awk '{print $2}')"
```

`git a`를 입력하고 `tab` 키로 추가하고 싶은 파일만 체크한 다음, 엔터 키를 치면 된다.

![git-a](https://user-images.githubusercontent.com/1855714/49334580-91c62800-f61c-11e8-88d0-be5636161d8a.gif )

## 일회용 함수 선언으로 복잡한 셸 스크립트 실행하기

git alias 안에서 복잡한 셸 명령어나 스크립트를 실행하는 데에는 한계가 있다.

하지만 함수를 선언해 쓰는 꼼수를 사용하면 이런저런 재미있고 유용한 alias를 만들 수 있다.

### sync 도우미 만들기

다음 alias는 `$1`을 인식하므로, 사용자가 입력한 옵션을 사용할 수 있다.

```perl
[alias]
    b0 = "!git branch | awk '/^\\*/{print $2}'"
    sync = "!f() { git fetch $1 && git reset --hard $1/$(git b0); }; f"
```

예를 들어 다음과 같이 사용하면...

```sh
$ git sync upstream
```

다음 명령어를 사용한 것과 똑같다.

```sh
$ git fetch upstream
$ git reset --hard upstream/현재브랜치이름
```

물론 `upstream`외에도 다른 remote를 지정해 사용할 수 있다.

### branch 도우미 만들기

다음은 내가 즐겨 쓰고 있는 alias이다.

```perl
[alias]
    bb = "! # Branch tools. Type 'git bb help' ; \n\
        f() { \n\
            if [ $# = 0 ]; then \
                git checkout $(git branch -vv | grep -v '^\\*' | fzf | awk '{print $1}'); \
            elif [ $1 = 'help' ]; then \
                echo 'git bb           : Select and checkout branch'; \
                echo 'git bb c, clean  : Clean all merged branches'; \
                echo 'git bb d, D      : Delete seleted branches(D: force)'; \
                echo 'git bb l, list   : List branches excluding the current branch'; \
                echo 'git bb m, merged : List merged branches excluding the current and master branches'; \
            elif [ $1 = 'd' -o $1 = 'D' ]; then \
                git branch -$1 $(git bb list | fzf -m); \
            elif [ $1 = 'clean' -o $1 = 'c' ]; then \
                git branch -d $(git bb merged); \
            elif [ $1 = 'list' -o $1 = 'l' ]; then \
                git branch | grep -v '^\\*'; \
            elif [ $1 = 'merged' -o $1 = 'm' ]; then \
                git branch --merged | grep -v '^\\*\\|\\<master$'; \
            else \
                git bb help; \
            fi; \
        }; f"
```

복잡해 보이지만 작은 기능들을 여럿 모아 놓았을 뿐이다.

* `git bb` : 브랜치 선택기
* `git bb help` : 도움말

| 명령어      | 기능                                             | 다른 입력 방법  |
|-------------|--------------------------------------------------|-----------------|
| git bb      | 브랜치 선택기                                    |                 |
| git bb c    | 머지된 브랜치들 한꺼번에 삭제                    | git bb clean    |
| git bb d    | 브랜치 선택, 삭제                                |                 |
| git bb D    | 브랜치 선택, 강제로 삭제                         |                 |
| git bb l    | 브랜치 목록 보기(현재 브랜치 제외)               | git bb list     |
| git bb m    | 머지된 브랜치 목록 보기(현재/master 브랜치 제외) | git bb merged   |
| git bb help | 도움말 보기                                      | git bb 아무거나 |

옵션이 많아서 헷갈리지 않도록 도움말도 추가해 놓았다.

```
$ git bb help
git bb           : Select and checkout branch
git bb c, clean  : Clean all merged branches
git bb d, D      : Delete seleted branches(D: force)
git bb l, list   : List branches excluding the current branch
git bb m, merged : List merged branches excluding the current and master branches
```

각 옵션 앞에 `-`, `--`를 붙일까 말까 고민했지만 그냥 이 정도가 편한 것 같아서 더 건드리지는 않았다.

### merged branch clean 도우미 만들기

위의 `git bb clean`은 다음 명령을 실행한다.

```sh
git branch -d $(git branch --merged | grep -v '^\*\|\<master$')
```

이 기능은 잘 작동한다.

그러나 여러 대의 컴퓨터로 작업을 하다 보면
같은 이름을 가진 브랜치라도 헤드의 값이 달라서
내가 보기에는 머지된 것 같은데 `--merged`로는 나오지 않는 브랜치가 발생할 수 있다.

사실 이건 내가 착각한 것일 뿐 `--merged`의 오작동이 아니다.

그러나 어쨌든 불편한 건 불편한 것이므로 다음과 같은 alias를 만들어 보았다.

```perl
blist = "!git branch | grep -v '^\\*'"
blist-merged = "!git branch --merged | grep -v '^\\*\\|\\<master$'"
bclean = "! # Search and delete merged branches;\n\
    git branch -d $(git blist-merged); \
    for branch in $(git blist) ; do \
        echo \"\nSearch :\\033[32m $branch \\033[0m\"; \
        if [ $(git l | grep $branch -c) -gt 0 ]; then \
            git l | egrep \"Merge.*$branch\" -C 2; \
            read -p \"Delete $branch? [y|n] \" -r; \
            REPLY=${REPLY:-"n"}; \
            if [ $REPLY = \"y\" ]; then \
                git branch -D $branch; \
                echo \"\\033[32m$branch \\033[0mhas been\\033[31m deleted\\033[0m.\n\"; \
            fi; \
        fi; \
    done \n\
"
```

이 alias는 밤에 잠을 자다가 떠오른 아이디어였는데, 낮에도 이런 괜찮은 생각이 떠오르면 좋겠다.

아무튼 이 `bclean`을 `git bb clean`으로 등록해 두고 실행하면 다음과 같이 돌아간다.

![gitbbc](https://user-images.githubusercontent.com/1855714/49380943-339d6000-f756-11e8-93de-2274e3b4a5c3.gif)

* 이 alias를 실행하면 일단 다음 명령어를 실행해 merged branch를 일괄적으로 삭제한다.

```sh
git branch -d $(git branch --merged | grep -v '^\*\|\<master$')
```

* 그리고 브랜치 목록을 조회한 다음, for 루프를 돈다.
    * git log graph에서 `Merge.*브랜치이름`의 문자열을 찾아 보여준다.
    * 위에서 보여준 해당 브랜치 이름을 삭제할 것인지를 물어본다.

어느 정도는 수작업으로 하던 것이었기에 이렇게 만들어 놓으니 편리하고 재미있다.

`git bb c`, `git bb clean`, `git bclean` 모두 잘 동작한다.

검색 결과의 윗줄/아랫줄을 보여주는 라인 수를 조절하고 싶다면 다음 구문의 `-C 2`에서 2를 변경하면 된다.

```
git l | egrep \"Merge.*$branch\" -C 2; \
```

## fzf preview를 사용해 미리보기 기능 추가하기

fzf의 preview 옵션을 사용하면 뭔가 일일이 확인하고 선택하는 과정을 단축할 수 있다.

### 브랜치 선택기에 로그 그래프 미리보기 기능 추가하기

ch를 다음과 같이 수정해보자.

```perl
[alias]
    ch = "!git checkout $(git bselect)"
    bselect = "! # select branch with preview; \n\
        f() { \
            _height=$(stty size | awk '{print $1}');\
            git branch | egrep -v '^\\*' | fzf --preview \"git l {1} | head -n $_height\"; \
        }; f"
```

* 하나의 알리아스로 만들어도 되겠지만 `bselect`는 여러모로 쓸모가 있을 것 같아 따로 만들었다.
* 터미널 높이 길이 값으로 `$LINES`를 쓰면 더 깔끔했겠지만, git alias 설정 문자열 내에서는 `$LINES`값이 제대로 출력되지 않아 `stty size`를 사용했다.

![gitch](https://user-images.githubusercontent.com/1855714/49552798-6901a380-f938-11e8-9c62-8b9228492f55.gif)

### add 파일 선택기에 미리보기 기능 추가하기

이번엔 a를 다음과 같이 수정하자.

```perl
[alias]
    a = "! # add files with fzf preview diffs; \n\
        f() { \
            _height=$(stty size | awk '{print $1}');\
            git s | fzf -m --preview \"git diff {2} | head -n $_height | pygmentize\" | awk '{print $2}' | xargs git add; \
        }; f"
```

* 코드 미리보기에 색깔을 칠해주기 위해 [Pygment](http://pygments.org/)를 사용했다.
    * 설치는 심플하게 `pip3 install Pygments`

![gita_](https://user-images.githubusercontent.com/1855714/49553461-2392a580-f93b-11e8-9117-ea0d32c24ee0.gif)

#### 파일 이름 옆에 변경 라인 숫자 보여주기

이 글을 작성하고 며칠이 지났다.

각 파일별 변경된 라인 숫자를 보여주면 좀 더 편할 것 같아서 다음과 같이 수정해 보았다.

```perl
a = "!git diff-select | xargs git add"
diff-select = "! # add files with fzf preview diffs; \n\
    f() { \
        _height=$(stty size | awk '{print $1}');\
        git diff-info \
        | fzf -m --header \"$(git diff --shortstat)\" --preview \
            \"if [[ {1} == '??' ]]; then cat {3}; else git diff {3}; fi \
            | head -n $_height \
            | pygmentize\" \
        | awk '{print $3}'; \
    }; f"
diff-info = "! # get diff info;\n\
    fileA=/tmp/git-s-$(uuidgen); \
    fileB=/tmp/git-diff-$(uuidgen); \
    git s | awk '{print $2,$1}' > $fileA; \
    git diff --numstat | awk '{print $3,$1,$2}' > $fileB; \
    join -t' ' -a 1 $fileA $fileB | awk '{print $2, \"(+\"$3 \",-\"$4\")\", $1}' | sed 's/(+,-)/./' | column -t -s' ' ; \
    rm -f $fileA $fileB; \
"
```

실행하면 다음과 같이 아래쪽에 변경에 대한 전체 정보가 나오고, 각 파일별로 추가/삭제 정보가 나온다.

![image](https://user-images.githubusercontent.com/1855714/49681236-6db58b80-fae1-11e8-8b39-11a24531cfbb.png)

# 헷갈릴 때 사용하는 alias 추가하기

이제 꽤 많은 alias가 추가되었다.

매일 쓰는 alias라면 괜찮겠지만 자주 안 쓰는 alias는 잊을 수도 있다.

물론 `.gitconfig` 파일을 열어 보면 되지만, 그것도 귀찮으니 그냥 모든 git alias를 조회하는 alias를 추가하도록 하자.

```perl
[alias]
    alias = "!git config --list | egrep '^alias.+'"
```

이제 `git alias`를 입력하면 모든 git alias를 볼 수 있다.

```
$ git alias
alias.l=log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr)%C(bold blue)<%an>%Creset' --abbrev-commit
alias.lh=!git l | head -n 25
alias.s=status -s
alias.co=checkout
alias.ci=commit
alias.bb=! # Branch tools. Type 'git bb help' ; 
alias.b0=!git branch | awk '/^\*/{print $2}'
alias.back=!git branch backup-`git b0`
alias.assume=update-index --assume-unchanged
alias.unassume=update-index --no-assume-unchanged
alias.assumed=!git ls-files -v | grep ^h | cut -c 3-
alias.ch=!git checkout $(git branch -vv | grep -v '^\*' | fzf | awk '{print $1}')
alias.a=!git add $(git status -s | fzf -m | awk '{print $2}')
alias.cleanbranch=!git branch -d $(git branch --merged | grep -v '^\*\|\<master$')
alias.deletebranch=!git branch -d $(git branch | grep -v '^\*\|\<master$' | fzf -m)
alias.alias=!git config --list | egrep '^alias.+'
alias.diffs=!git diff $(git status -s | egrep '^\s*M' | awk '{print $2}' | fzf -m)
alias.sync=!f() { git fetch $1 && git reset --hard $1/$(git b0); }; f
```

* `bb` 알리아스를 제일 위쪽에 주석을 추가하고 `\n`을 붙인 이유가 이것 때문이다.

그런데 이대로는 가독성이 별로 좋지 못하므로, `sed`를 써서 앞의 alias 명에 색을 칠해 보자.

```perl
[alias]
    alias = "!git config --list | egrep '^alias.+' | sed -e 's/^alias\\.//' | sed -e 's/^[^=]*=/\\'$'\\033[31m&\\033[(B\\033[m/'"
```

![image](https://user-images.githubusercontent.com/1855714/49335205-8d097000-f62c-11e8-9ba1-97ab3d49d792.png)

## alias 설명서를 보기 좋게 다듬어 보자

* `column` 명령어를 사용하면 터미널에 출력되는 문자열을 표와 같이 정렬할 수 있다.

```perl
alias = "!# Prints all aliases.;\n\
    git config --list \
    | egrep '^alias.+' \
    | sed -e 's/^alias\\.//' \
    | sed -e 's/^[^=]*=/\\'$'\\033[31m&\\033[(B\\033[m/' \
    | column -t -s'=' \
    | sed 's/!#* *//; s/;$//' \
    | cut -c1-85"
```

* 위의 alias 명령어를 사용하면 `!# ...;\n\` 의 `...` 영역에 설명을 쓸 수 있다.

다음은 나중에 사용하기 쉽도록 설명을 추가한 것이다.

구글 번역기를 열심히 돌리며 영작했다.

![image](https://user-images.githubusercontent.com/1855714/49694946-5efcd080-fbd6-11e8-9aed-2c678882c010.png)

# 나의 git config

다음 링크에서 나의 최신 .gitconifg 파일을 볼 수 있다.

* [.gitconfig](https://github.com/johngrib/dotfiles/blob/master/.gitconfig )


# Links

* [2.7 Git Basics - Git Aliases](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases )
* [Git alias with parameters](https://jondavidjohn.com/git-aliases-parameters/ )
* [.gitconfig](https://github.com/johngrib/dotfiles/blob/master/.gitconfig )

* 도구
    * <https://github.com/junegunn/fzf >
    * <http://pygments.org/ >
