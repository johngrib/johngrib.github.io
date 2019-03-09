---
layout  : wiki
title   : bash 명령어 history 다루기
summary : 사용법 및 잡다한 팁 요약
date    : 2018-09-01 18:01:04 +0900
updated : 2018-10-14 10:12:24 +0900
tag     : bash command
toc     : true
public  : true
parent  : command-line
latex   : false
---
* TOC
{:toc}

# 명령어 히스토리 조회 및 실행

## 이전 명령어 조회

이전 명령어를 보는 가장 쉬운 방법은 위아래 방향키를 몇 번 누르는 것이다.

* `↑`: 방금 실행한 명령어가 프롬프트에 나타난다.
    * 누를 때마다 더 이전에 실행한 명령어가 터미널에 나타난다.
    * `↓`로 역순으로 볼 수 있다.
* 방향키 누르는 것이 귀찮다면 `ctrl+p`, `ctrl+n` 으로도 사용 가능.
    * `ctrl+p` : emacs 에서 위쪽 화살표. previous.
    * `ctrl+n` : emacs 에서 아래쪽 화살표. next.

히스토리 목록을 보는 것이 목표라면 `history` 명령어를 사용한다.

```sh
$ history

...
 1471  fc -l
 1472  history
 1473  fc -l 1460 1463
 1474  tmux
```

`history`를 실행하면 위와 같이 히스토리 숫자와 명령어 이력이 함께 출력된다.

이 숫자를 사용하면 명령어를 다시 입력할 필요 없이, `!숫자`만으로 명령 실행이 가능하다.

* `!숫자`
    * 히스토리 목록에서 숫자에 해당하는 명령어를 실행한다.
    * 예) `!1474`: 히스토리 목록에서 `1474` 번호 명령어를 실행한다.
* `!!`
    * 번호가 가장 큰 명령어를 실행하는 명령이다.
    * 즉, 방금 실행한 명령어를 재실행하는 명령이다.

# `ctrl+r`과 `history` 사용하기

* `ctrl+r`을 입력하면 `(reverse-i-search): `가 나타나며 히스토리를 검색할 수 있게 된다.
    * `reverse-i-search` 상태에서는 최근에 사용한 명령어를 우선으로 검색해 준다.
    * 다음 검색 결과를 보려면 또다시 `ctrl+r`을 누르면 된다.

의문 : `ctrl+r`로 명령어 히스토리 후방 검색을 할 수 있다면 전방 검색은 어떻게 할 수 있지?

* `stty stop undef`를 실행하면 이후부터 `ctrl+s`로 전방 검색을 할 수 있다.
* 일일이 입력하는 것은 귀찮으니 `ctrl+s`를 쓰고 싶다면 `.bashrc`에 추가해 두자.
* 하지만 `fzf`를 사용하면 `ctrl+s`를 쓸 일이 사라진다. `fzf`가 없는 컴퓨터에서 사용하자.


## 히스토리 파일

히스토리 목록은 `~/.bash_history` 파일에 저장된다.

다음으로 간단하게 내용을 조회해볼 수 있다.

```sh
$ cat ~/.bash_history
```

그런데 터미널을 여러 개 띄워놓고 사용해보면 각각의 터미널에서 명령어 히스토리가 바로바로 연동되지 않아 불편하다.

bash 명령 히스토리는 메모리에 보관되어 있다가 쉘에서 나갈 때 `.bash_history`에 추가되기 때문이다.

그렇다면 명령어를 입력할 때마다 `.bash_history`가 업데이트되도록 하면 이 문제를 해결할 수 있다.

다음 코드를 `.bashrc`에 추가하면 명령어를 입력할 때마다 히스토리가 갱신된다.

```sh
function update_history {
    history -a
    history -c
    history -r
}
PROMPT_COMMAND="share_history; $PROMPT_COMMAND"
shopt -u histappend
```

* `PROMPT_COMMAND`
    * Bash가 프롬프트를 띄우기 전에 실행할 코드를 지정할 수 있다.
    * 예) `PROMPT_COMMAND='date'` 이렇게 하면 프롬프트가 나타날 때마다 터미널에 날짜, 시간이 표시된다.
* `history -a`: 히스토리 파일에 현재 Bash 세션의 새로운 히스토리를 추가한다.
* `history -c`: 히스토리 목록을 클리어한다.
* `history -r`: 히스토리 파일을 읽고 메모리의 히스토리 리스트에 추가한다.
* `shopt -u histappend`: Bash의 `histappend` 옵션을 끈다.

이제 터미널을 여러 개 쓰거나 탭을 많이 열어놔도 히스토리를 같이 쓸 수 있다.

* `PROMPT_COMMAND` 설정 주의
    * `PROMPT_COMMAND="share_history"` - 이렇게 설정하면 터미널이 디폴트로 지정한 프롬프트 커맨드가 실행되지 않는다.
    * 예를 들어, 새로운 터미널 탭을 열었는데 작업 디렉토리가 이어지지 않을 수 있다.
    * `PROMPT_COMMAND="share_history; $PROMPT_COMMAND"` - 이렇게 설정해 주도록 하자.

### 히스토리 사이즈 설정

`.bashrc`에 다음과 같이 적당한 숫자로 설정하자.

```sh
export HISTSIZE=2000
export HISTFILESIZE=2000
```

## [[fc]] 명령어

* `fc` 명령어를 사용하면 vim이 실행되며, 방금 실행한 명령어가 나타난다.
* 명령어를 편집하고 저장한 다음 vi를 종료하면 명령이 실행된다.
    * `set -o vi` 에디팅 모드에서의 `v`와 비슷하다.
    * 길고 복잡한 명령어를 편집할 때 편리하다.
* `fc -ln -1` 으로도 직전 명령어를 볼 수 있다.
* `fc number`를 입력하면 히스토리 넘버에 해당하는 명령어를 편집/실행할 수 있다.
* `fc number1 number2`를 입력하면 `number1`~`number2` 범위의 명령어가 나타난다.


# fzf 사용하기

* fzf를 사용하면 `ctrl+r`로 히스토리 fuzzy 검색을 할 수 있어, 전방/후방 검색 하느라 시간을 낭비하지 않아도 된다.

```sh
$ brew install fzf
```

이후 다음과 같이 단축키를 설정해주면 `ctrl+r`에 fzf의 히스토리 검색 기능이 매핑된다.

```
$(brew --prefix)/opt/fzf/install
```

자세한 설치 방법은 <https://github.com/junegunn/fzf#installation > 참고.

* `fzf`는 그 외에도 파일 검색, 디렉토리 검색/이동에도 대단히 편리할 뿐 아니라, Vim과 함께 사용하기에도 매우 좋다.

# Links

* [Bash History Builtins(gnu.org)](https://www.gnu.org/software/bash/manual/html_node/Bash-History-Builtins.html )
* [The Shopt Builtin(gnu.org)](https://www.gnu.org/software/bash/manual/html_node/The-Shopt-Builtin.html )
* [Controlling the Prompt(gnu.org)](https://www.gnu.org/software/bash/manual/html_node/Controlling-the-Prompt.html )
* [Bash Prompt HOWTO: 4.1. PROMPT_COMMAND(tldp.org)](http://tldp.org/HOWTO/Bash-Prompt-HOWTO/x264.html )
* [fzf](https://github.com/junegunn/fzf )



