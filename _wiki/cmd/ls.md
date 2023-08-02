---
layout  : wiki
title   : ls 명령어
summary : 디렉토리의 내용을 출력한다
date    : 2023-08-01 22:38:15 +0900
updated : 2023-08-02 22:06:41 +0900
tag     : 
resource: 11/37B4FA-48D2-4D33-B630-23CA30753E4A
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

- 옛날 MS-DOS의 `dir` 같은 명령이다.

## 일러두기

나는 macOS의 builtin `ls`가 아니라 [GNU Coreutils]( https://www.gnu.org/software/coreutils/ )의 `ls`를 사용한다.[^coreutils]

```bash
 # coreutils 설치
brew install coreutils
```

macOS builtin `ls`와 큰 차이가 있는 것은 아니지만 출력 결과의 날짜 포맷을 지정하는 기능이 있기 때문이다.

## 나의 alias

나는 `.bashrc`에 다음과 같이 `ls`와 관련된 alias를 설정해두었다.

```bash
 # alias ls='ls -G'; #osx
alias ls='gls --color=tty --time-style="+%Y-%m-%d %a %H:%M:%S"';
alias ll='gls -alh --color'
alias l.='ls -dG .*'

alias lsa='exa --time-style="long-iso"';
alias lla='exa --time-style="long-iso" -alh'
```

## Examples

### 여러 디렉토리 나열

```bash
$ # css, js 디렉토리의 내용을 나열한다.
$ ls css js
css:
main.scss

js:
category.js  create-link.js  parent.js  shortcut.js  toc-highlight.js

$ # -l 옵션을 줘도 작동한다.
$ ls -l css js
css:
total 4
-rwxr-xr-x 1 johngrib staff 546 2023-03-17 Fri 23:31:10 main.scss

js:
total 24
-rw-r--r-- 1 johngrib staff 2719 2023-04-01 Sat 14:05:49 category.js
-rw-r--r-- 1 johngrib staff 6769 2023-03-17 Fri 23:31:10 create-link.js
-rw-r--r-- 1 johngrib staff 1852 2023-03-17 Fri 23:31:10 parent.js
-rw-r--r-- 1 johngrib staff 3071 2023-03-17 Fri 23:31:10 shortcut.js
-rw-r--r-- 1 johngrib staff 2007 2023-03-17 Fri 23:31:10 toc-highlight.js
```

### -l : 파일의 상세 정보 출력 {#option-l}

`-l` 옵션을 사용하면 파일의 상세 정보를 출력한다.

```bash
$ ls -l
total 7.9M
drwxr-xr-x   47 johngrib staff 1.5K 2023-08-02 Wed 21:20:55 .
drwxr-x---+  76 johngrib staff 2.4K 2023-08-02 Wed 21:09:34 ..
-rw-r--r--    1 johngrib staff  11K 2023-07-17 Mon 22:16:00 .DS_Store
drwxr-xr-x   15 johngrib staff  480 2023-08-02 Wed 21:24:50 .git
-rw-r--r--    1 johngrib staff  165 2023-03-17 Fri 23:31:10 .gitignore
drwxr-xr-x    3 johngrib staff   96 2023-03-17 Fri 23:49:37 .jekyll-cache
-rw-r--r--    1 johngrib staff 472K 2023-08-02 Wed 21:21:00 .jekyll-metadata
-rw-r--r--    1 johngrib staff  11K 2023-07-31 Mon 21:04:13 404.html
-rw-r--r--    1 johngrib staff 1.3K 2023-03-18 Sat 00:11:56 Gemfile
-rw-r--r--    1 johngrib staff 2.3K 2023-07-31 Mon 20:41:38 Gemfile.lock
-rw-r--r--    1 johngrib staff 1.1K 2023-03-17 Fri 23:31:10 LICENSE
-rw-r--r--    1 johngrib staff  734 2023-03-17 Fri 23:31:10 README.md
-rw-r--r--    1 johngrib staff 1.6K 2023-04-23 Sun 11:58:26 _config.yml
-rw-r--r--    1 johngrib staff  763 2023-03-17 Fri 23:31:10 _config.yml.sample
```

### -a : 모든 파일 보기 {#option-a}

- `-a` 옵션을 사용하면 숨김 파일을 포함한 모든 파일을 보여준다.
- 함께 자주 사용하는 옵션들
    - `-h`: 파일 크기를 사람이 읽기 쉽게 출력한다.
    - `-l`: 파일의 상세 정보를 출력한다.

```bash
 # 숨김 파일을 포함한 모든 파일을 보여준다.
ls -a

 # 숨김 파일을 포함한 모든 파일의 상세 정보를 보여준다.
ls -al

 # 숨김 파일을 포함한 모든 파일의 상세 정보를 보여주고, 파일 크기를 사람이 읽기 쉽게 출력한다.
ls -alh
```

### -R : 하위 디렉토리를 재귀적으로 탐색 {#option-R}

`-R` 옵션을 사용하면 하위 디렉토리를 재귀적으로 탐색한다.

```bash
ls -R
```

### -r : 역순으로 나열 {#option-reverse}

`-r` 옵션을 사용하면 역순으로 출력한다.

```bash
ls -r
```

이 옵션을 사용하면 `ls | sort -r` 과 비슷한 결과를 얻을 수 있다.

### -i : 파일의 inode 번호 출력 {#option-i}

`-i` 옵션을 사용하면 파일의 inode 번호를 출력한다.

```bash
$ ls -i /bin/[
1152921500312434706 '/bin/['

$ ls -i /bin/test
1152921500312434706 /bin/test
```

위의 예제에서는 `/bin/[`와 `/bin/test`의 inode 번호가 같다는 것을 알 수 있다. `/bin/[`와 `/bin/test`는 같은 파일(`1152921500312434706`)에 대한 하드 링크이기 때문이다.

두 파일에 대해 `-l` 옵션으로 조사해보면 해당 파일에 대한 하드 링크가 2개 (2번째 필드)라는 것을 알 수 있다.

```bash
$ ls -l  /bin/[  /bin/test
-rwxr-xr-x 2 root wheel 134224 2023-06-15 Thu 19:08:29 '/bin/['
-rwxr-xr-x 2 root wheel 134224 2023-06-15 Thu 19:08:29  /bin/test
```

## 주석

[^coreutils]: <https://formulae.brew.sh/formula/coreutils >

