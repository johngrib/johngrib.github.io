---
layout  : wiki
title   : Vimwiki 사용법
summary : 로컬에서 Vim으로 관리하는 나만의 위키
date    : 2018-03-27 21:16:39 +0900
updated : 2018-03-27 23:54:39 +0900
tags    : vim wiki
toc     : true
public  : true
parent  : how-to
latex   : false
---
* TOC
{:toc}

## 개요

Vimwiki 사용법 및 관리 노하우를 기록한다.

## Vimwiki 설치

[Vim-plug](https://github.com/junegunn/vim-plug)를 사용한다면 `.vimrc`에 다음과 같이 플러그인을 정의해준다.

```viml
Plug 'vimwiki/vimwiki', { 'branch': 'dev' }
```

이후 `:so %`, `:PlugInstall`을 입력하거나, Vim을 재시작한 다음 `:PlugInstall`을 입력하면 설치가 완료된다.

## Vimwiki 설정

나는 다음과 같이 설정하여 사용하고 있다.

```viml
"1번 위키와 2번 위키
let g:vimwiki_list = [
    \{
    \   'path': '~/git/johngrib.github.io/_wiki',
    \   'ext' : '.md',
    \   'diary_rel_path': '.',
    \},
    \{
    \   'path': '~/Dropbox/wiki',
    \   'ext' : '.md',
    \   'diary_rel_path': '.',
    \},
\]

let g:vimwiki_conceallevel = 0

command! WikiIndex :VimwikiIndex
nmap <LocalLeader>ww <Plug>VimwikiIndex
nmap <LocalLeader>wi <Plug>VimwikiDiaryIndex
nmap <LocalLeader>w<LocalLeader>w <Plug>VimwikiMakeDiaryNote
nmap <LocalLeader>wt :VimwikiTable<CR>
```

### g:vimwiki_list

이 설정이 있어 여러 개의 개인 위키를 굴릴 수 있다.

하나만 사용하고 싶다면 `[]` 배열 안에 하나만 설정하면 된다.

* `path`: 위키 파일을 보관할 루트 디렉토리를 지정한다.
* `ext`: 위키 파일 형식을 지정한다.
    * Vimwiki 고유 포맷이 있지만, jekyll과의 연계 및 범용성을 위해 마크다운(`.md`) 형식을 선택했다.
* `diary_rel_path`: 다이어리 파일을 보관할 상대 경로를 지정해준다. 지정해주면 루트 디렉토리의 하위로 들어간다.

### let g:vimwiki_conceallevel = 0

이 값을 `1`로 설정하면 몇몇 특수기호가 눈에 안 보이게 된다.

* 가령 문서 내에 링크를 걸려면 `\[[link]]`과 같이 적는데, conceal 레벨을 설정하면 좌우의 `\[[  ]]`가 안 보이고, 밑줄이 보이게 된다.
* 보기엔 깔끔해도 안 보이는 문자가 있어, 커서 점프 시 짜증나는 경우가 많다.

[[vim-conceallevel]]{conceallevel} 관련 값은 특별한 이유가 있지 않는 이상 꺼놓는 쪽이 좋다고 생각한다.

* 게임이나, Startify, 음악 재생 플러그인처럼 독자적인 UI를 제공하는 플러그인인 경우에만 켜야 한다고 생각한다.
* 나는 Vimwiki의 독자적인 UI가 별로 도움이 안 된다고 생각하기 때문에 `0`으로 설정하였다.

### 단축키 설정

단축키는 `:help vimwiki`에서 보고 자주 사용할 것 같은 기능들에 매핑하면 된다.

참고: 나는 `<LocalLeader>`를 `\`키로 설정해 두었다.

* `nmap <LocalLeader>ww <Plug>VimwikiIndex`
    * `\ww`을 입력하면 1번 위키 인덱스가 열린다.
    * `2\ww`를 입력하면 2번 위키 인덱스가 열린다.

* `nmap <LocalLeader>wi <Plug>VimwikiDiaryIndex`
    * `\wi`를 입력하면 1번 위키의 다이어리 인덱스가 열린다.
    * `2\wi`를 입력하면 2번 위키의 다이어리 인덱스가 열린다.

* `nmap <LocalLeader>w<LocalLeader>w <Plug>VimwikiMakeDiaryNote`
    * `\w\w`를 입력하면 오늘의 다이어리를 만들어준다.

* `nmap <LocalLeader>wt :VimwikiTable<CR>`
    * `\wt`를 입력하면 마크다운 테이블을 만들어준다.
    * 마크다운 테이블 기본 서식을 만들어 준다. 굉장히 편리한 기능이다.

## 현재 작성중인 문서입니다.


