---
layout  : wiki
title   : ls 명령어
summary : 디렉토리의 내용을 출력한다
date    : 2023-08-01 22:38:15 +0900
updated : 2023-08-03 23:28:16 +0900
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
drwxr-xr-x   15 johngrib staff  480 2023-08-02 Wed 21:24:50 .git
-rw-r--r--    1 johngrib staff  165 2023-03-17 Fri 23:31:10 .gitignore
-rw-r--r--    1 johngrib staff  11K 2023-07-31 Mon 21:04:13 404.html
-rw-r--r--    1 johngrib staff 1.1K 2023-03-17 Fri 23:31:10 LICENSE
-rw-r--r--    1 johngrib staff  734 2023-03-17 Fri 23:31:10 README.md
```

출력 결과는 컬럼별로 다음과 같은 의미를 갖는다.

1. 파일의 접근 권한 정보.
    - 첫 글자: "file type" 이라 부른다.
        - `-`: 파일
        - `d`: 디렉토리
        - `l`: 심볼릭 링크
        - `c`: 문자 특수 파일. 터미널이나 모뎀같이 바이트의 열로 데이터를 처리하는 디바이스.
        - `b`: 블록 특수 파일. 하드 디스크나 CD-ROM 같이 블록 단위의 데이터를 처리하는 디바이스.
    - 첫 글자 이후 9개 글자: "file mode"라 부른다.
        - `_rwx______`: 파일 소유자(Owner) 퍼미션.
        - `____rwx___`: 파일 소유 그룹(Group) 퍼미션.
        - `_______rwx`: 기타 사용자(World) 퍼미션.
2. 하드 링크의 수.
3. 파일 소유자의 이름.
4. 파일을 소유한 그룹의 이름.
5. 파일 크기(byte)
6. 파일 최종 수정 날짜.
7. 파일 최종 수정 요일.
8. 파일 최종 수정 시간.
9. 파일 이름.

#### file mode

> <div id="file_mode_table"></div>
[^command-line-book-92]

- th
    - 속성
    - 파일
    - 디렉토리
- td
    - `r`
    - 파일 열기와 읽기를 허용한다.
    - 실행 속성이 설정되어 있으면 디렉토리의 내용물을 나열할 수 있게끔 허용한다.
- td
    - `w`
    - 이 속성은 파일 쓰기 또는 잘라내기는 허용하지만, 이름 변경이나 파일 삭제는 허용하지 않는다. 파일 삭제나 파일 이름 변경은 디렉토리 속성에 의해 결정된다.
    - 실행 속성이 설정되어 있으면 디렉토리 내의 파일들을 생성, 삭제, 이름 변경이 가능하도록 허용한다.
- td
    - `x`
    - 파일이 프로그램으로 처리되고 파일이 실행되도록 허용한다. 스크립트 언어에서 작성된 프로그램 파일들은 읽기 기능으로 설정되어 있어야만 실행 가능하다.
    - 디렉토리에 들어올 수 있도록 허용한다(예를 들어 `cd directory`와 같이).
{:class="table-generate" data-target-id="file_mode_table"}


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

### -t : 수정 시간 순으로 나열 {#option-t}

`-t` 옵션을 사용하면 수정 시간 순으로 출력한다. 가장 최근에 수정된 파일이 제일 위에 나온다.

```bash
ls -t

 # 수정시간 역순으로 나열
ls -tr
```

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

## 참고문헌

- 리눅스 커맨드라인 완벽 입문서 / 윌리엄 E. 샤츠 주니어 저 / 이종우, 정영신 공역 / 비제이퍼블릭(BJ퍼블릭) / 초판 1쇄 발행: 2013년 01월 11일 / 원제: The Linux Command Line

## 주석

[^coreutils]: <https://formulae.brew.sh/formula/coreutils >
[^command-line-book-92]: 리눅스 커맨드라인 완벽 입문서. 9장. 92쪽.

