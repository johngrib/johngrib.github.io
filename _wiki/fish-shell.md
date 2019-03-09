---
layout  : wiki
title   : fish shell
summary : 자동 완성이 편리하고 눈이 즐거운 셸
date    : 2018-03-12 22:04:50 +0900
updated : 2018-03-12 23:07:23 +0900
tag     : fish terminal
toc     : true
public  : true
parent  : command-line
latex   : false
---
* TOC
{:toc}

## 개요

명령어 history를 읽어 suggest를 해준다.

이 기능 하나만으로도 매우 큰 편의를 제공하며, 터미널을 사용하는 재미도 상당하다.

## 설치

### macOS

```sh
brew install fish
```

## 사용법

### auto suggestion

명령어를 입력하다 보면 history를 읽어서, 많이 사용한 명령어를 회색으로 보여준다.

이 때 `오른쪽 화살표` 또는 `control + f`키를 입력하면 회색으로 보여준 명령어를 완성시켜 준다.

단어 단위로 완성하고 싶다면 `meta + 오른쪽 화살표`를 입력하면 된다.

### tab 자동 완성

tab 자동완성은 bash와 큰 차이가 없지만 git branch 등이 자동완성되는 등의 편의 기능들이 더 보강되어 있다.

### prompt

나는 다음과 같은 프롬프트를 사용한다.

본래 oh my fish!의 default 테마에 딸려 있는 프롬프트인데, 몇몇 라인을 편집하여 쓰고 있다.

`~/.config/fish/functions/fish_prompt.fish`

```fish
function fish_prompt
  set -l last_command_status $status
  set -l cwd

  if test "$theme_short_path" = 'yes'
    set cwd (basename (prompt_pwd))
  else
    set cwd (prompt_pwd)
  end

  set -l fish     "⋊>"
  set -l ahead    "↑"
  set -l behind   "↓"
  set -l diverged "⥄ "
  set -l dirty    "⨯"
  set -l none     "◦"

  set -l normal_color     (set_color normal)
  set -l success_color    (set_color $fish_pager_color_progress ^/dev/null; or set_color cyan)
  set -l error_color      (set_color $fish_color_error ^/dev/null; or set_color red --bold)
  set -l directory_color  (set_color $fish_color_quote ^/dev/null; or set_color brown)
  set -l repository_color (set_color $fish_color_cwd ^/dev/null; or set_color green)
  set -l myname_color     (set_color cyan)
  set -l hostname_color   (set_color purple)

  if test $last_command_status -eq 0
    echo -n -s $normal_color $fish $normal_color
  else
    echo -n -s $error_color $fish $normal_color
  end

  if git_is_repo
    if test "$theme_short_path" = 'yes'
      set root_folder (command git rev-parse --show-toplevel ^/dev/null)
      set parent_root_folder (dirname $root_folder)
      set cwd (echo $PWD | sed -e "s|$parent_root_folder/||")
    end

    # echo -n -s " " $directory_color $cwd $normal_color
    # PS1="${YELLOW}${TIMESTAMP} ${GREEN}\u ${B_MAGENTA}\h ${YELLOW}\w ${COLOR_END} ${GIT_BRANCH}\n\$ "
    echo -n -s $myname_color (whoami) " " $hostname_color (hostname) " " $directory_color $PWD $normal_color
    echo -n -s " on " $repository_color (git_branch_name) $normal_color " "

    if git_is_touched
      echo -n -s $dirty
    else
      echo -n -s (git_ahead $ahead $behind $diverged $none)
    end
  else
    echo -n -s " " $directory_color $cwd $normal_color
  end

  echo -n -s " " \n\$ " "
end
```

## Links

* <https://fishshell.com/>
* [fish-shell(github.com)](https://github.com/fish-shell/fish-shell)
* [oh my fish(github.com)](https://github.com/oh-my-fish/oh-my-fish)
* [tutorial](https://fishshell.com/docs/current/tutorial.html)
