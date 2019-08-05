---
layout  : wiki
title   : Vimwiki 사용법
summary : 로컬에서 Vim으로 관리하는 나만의 위키
date    : 2018-03-27 21:16:39 +0900
updated : 2019-08-05 15:19:26 +0900
tag     : vim wiki
public  : true
parent  : Vim
latex   : false
---
* TOC
{:toc}



## 개요

[Vimwiki](https://github.com/vimwiki/vimwiki )는 Vim에서 돌아가는 파일 기반 위키 플러그인이다.

> 참고로 이 위키의 모든 문서는 Vimwiki로 작성하였다.

* 각 문서는 단순한 텍스트 파일이다.
    * 어떤 운영체제나 어떤 에디터에서도 열어볼 수 있다.
    * Git을 사용할 수 있다.
    * Git을 사용할 줄 모르더라도 위키 경로를 Dropbox 하위 디렉토리로 지정하면 자동으로 백업 및 버전 관리가 된다.

* 로컬에서 돌아가는 위키이다.
    * 인터넷이 연결되지 않은 상태에서도 사용할 수 있다.
    * 회사 업무 참고 사항이라던가, 개인적인 할 일 목록을 적어두기에도 좋다.

* Vim 플러그인이다.
    * Vimwiki의 다양한 기능을 보조로 사용하면 Vim으로 마크다운 문서를 작성할 때 한층 편리해진다.
    * 예: 마크다운 표를 만들 때 각 행의 `|` 기호를 자동으로 정렬해 준다.
    * 문서 내에 `http://www...` 과 같은 형식의 문자열이 있다면, 간단하게 그 위에 커서를 놓고 엔터를 입력하는 것만으로도 웹 브라우저에서 해당 주소를 열어준다.


## Vimwiki 설치 방법

### Vim-plug

[Vim-plug](https://github.com/junegunn/vim-plug )를 사용한다면 `.vimrc`에 다음과 같이 플러그인을 정의해준다.

```viml
Plug 'vimwiki/vimwiki', { 'branch': 'dev' }
```

이후 `:so %`, `:PlugInstall`을 입력하거나, Vim을 재시작한 다음 `:PlugInstall`을 입력하면 설치가 완료된다.

### Vundle

[Vundle](https://github.com/VundleVim/Vundle.vim )을 사용한다면  `.vimrc`에 다음과 같이 플러그인을 정의해준다.

```viml
Plugin 'vimwiki/vimwiki'
```

이후 `:so %`, `:PlugInstall`을 입력하거나, Vim을 재시작한 다음 `:PluginInstall`을 입력하면 설치가 완료된다.


### 플러그인 관리자 없이 설치하기

플러그인 관리자가 없다면, Vim의 기본 플러그인 경로에 Vimwiki 파일을 전부 복사해주면 된다.

물론, `git clone`이 가장 쉬운 방법이다.

```sh
$ cd ~/.vim
$ mkdir plugin
$ cd plugin
$ git clone https://github.com/vimwiki/vimwiki.git
$ cd vimwiki
$ git checkout dev
```

이후 Vim을 실행한다.



## Vimwiki 설정

Vimwiki를 사용하기 전에, 먼저 몇 개의 위키를 사용할 것인지 먼저 생각해야 한다.

나는 두 개의 위키를 사용하고 있다.

* Github page를 통해 공개용으로 사용하고 있는 wiki.
* 공개하기 곤란한 정보를 기록하는 개인용 wiki.

이를 위해 `.vimrc`에 다음과 같이 설정하여 쓰고 있다.

```viml
" 로컬 리더 키 설정은 취향이니 각자 마음에 드는 키로 설정한다
let maplocalleader = "\\"

"1번 위키(공개용)와 2번 위키(개인용)
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

" vimwiki의 conceallevel 을 끄는 쪽이 좋다
let g:vimwiki_conceallevel = 0

" 자주 사용하는 vimwiki 명령어에 단축키를 취향대로 매핑해둔다
command! WikiIndex :VimwikiIndex
nmap <LocalLeader>ww <Plug>VimwikiIndex
nmap <LocalLeader>wi <Plug>VimwikiDiaryIndex
nmap <LocalLeader>w<LocalLeader>w <Plug>VimwikiMakeDiaryNote
nmap <LocalLeader>wt :VimwikiTable<CR>

" F4 키를 누르면 커서가 놓인 단어를 위키에서 검색한다.
nnoremap <F4> :execute "VWS /" . expand("<cword>") . "/" <Bar> :lopen<CR>

" Shift F4 키를 누르면 현재 문서를 링크한 모든 문서를 검색한다
nnoremap <S-F4> :execute "VWB" <Bar> :lopen<CR>
```

### g:vimwiki_list

이 설정이 있어 여러 개의 개인 위키를 굴릴 수 있다.

하나만 사용하고 싶다면 `[]` 배열 안에 하나만 설정하면 된다.

* `path`: 위키 파일을 보관할 루트 디렉토리를 지정한다.
    * `path`를 github page 경로로 지정하면 설정하기 나름으로 [나만의 웹 위키](/blog/2017/12/06/my-wiki/)로도 활용할 수 있다.
    * 개인적인 로컬 위키로 사용한다면 Dropbox 하위 경로로 지정하는 것도 방법이다.
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



## 필수 기능 소개

Vimwiki는 크게 다음 몇 가지 기능만 기억하면 충분히 유용하게 사용할 수 있다.

### 기본 기능

* `Enter`키로 링크를 생성할 수 있다.
* `Enter`키로 링크를 타고 이동할 수 있다.
* `BackSpace`키로 이전 문서로 돌아갈 수 있다.

팁 : 새로 작성한 문서는 꼭 `index.md`에 링크를 추가해주는 것이 좋다.

### 마크다운 표 편집 기능

* `:VimwikiTable` 명령으로 마크다운의 표 기본 서식을 입력할 수 있다.
    * 표에서 `tab`을 입력하면 커서가 표의 다음 칸으로 이동한다.
    * 표에서 `Shift + tab`을 입력하면 커서가 표의 이전 칸으로 이동한다.
    * 표에서 입력을 마칠 때마다, 표의 구분선이 자동으로 정렬된다.

### 검색 기능

* `:VWS /regexp/` 를 입력하면 된다. (`/ /`를 보면 알겠지만, 정규식으로 검색해도 된다.)
    * `:VWS /미세먼지/`로 검색하면 미세먼지로 검색해 나온 첫 번째 검색 결과 파일을 열어준다.
    * 검색 결과 전체를 보고 싶다면 `:lopen` 명령을 입력한다.
    * 다음과 같이 파일 목록과 검색된 라인의 프리뷰를 보여준다.
    * 원하는 파일을 고른 다음 `Enter`를 치면 해당 파일이 열린다.
        * `<NL>`이나 `<CR>`에 `map`이 걸려 있으면 검색 결과에서 파일이 안 열리므로 주의.

![vimwiki-search](/wiki-img/vim/vimwiki-search.jpg)

* 이미지의 마지막 줄을 읽어보면 `:VWS` 명령은 `:vimgrep` 명령어를 사용한 것임을 알 수 있다.
    * 그러나 `:VWS`는 마크다운 파일에서만 검색하므로 조금 더 빠르게 검색 결과를 얻을 수 있다.

`:VWS /검색어/`를 입력하고 이후 `:lopen` 명령을 주는 게 귀찮아서 나는 다음과 같이 설정하여 사용하고 있다.

```viml
nnoremap <F4> :execute "VWS /" . expand("<cword>") . "/" <Bar> :lopen<CR>
```

위와 같이 설정해 두면, 검색하고 싶은 단어 위에 커서를 놓고 `F4`만 누르면 검색 결과 목록을 보여준다.

목록에서 `Enter`키로 원하는 파일을 열어볼 수 있다.



### 현재 문서를 링크한 모든 파일 검색

`:VWB`로 현재 문서를 링크한 문서를 찾을 수 있다.

하지만 역시 `:lopen` 명령을 추가로 사용해야 모든 목록을 볼 수 있으니 나는 다음과 같이 설정하여 사용하고 있다.

```viml
nnoremap <S-F4> :execute "VWB" <Bar> :lopen<CR>
```

위와 같이 설정해 두면, 문서 편집 중에 `Shift + F4` 키를 누르면 현재 문서를 링크한 모든 문서의 목록을 보여준다.

목록에서 `Enter`키로 원하는 파일을 열어볼 수 있다.


### Todo, 일기

* `Ctrl + Space` 키로 체크박스를 check / uncheck 할 수 있다.
* `:VimwikiMakeDiaryNote` 명령으로 오늘 날짜의 일기 파일을 생성할 수 있다.
    * 예: `2018-03-28.md`

일기 목록 자동 생성 등의 기능도 있지만, 나는 별로 사용하지 않는다.

본격적으로 사용하고 싶다면 `:help vimwiki`에서 `diary` 항목을 찾아보면 된다.



## 튜토리얼

### 인덱스 파일 생성, 새로운 문서 생성

* 1 . Vim에서 `:VimwikiIndex` 또는 지정한 단축키를 입력하여 위키 인덱스를 연다.
    * 인덱스가 없다면 새로 만들 것인지를 물어본다. `y`로 응답하면 된다.
    * `index.md` 파일이 열린다.
    * `index.md`는 상호 연결이 가능한 위키의 root가 되는 가장 중요한 파일이므로, 삭제하지 않도록 한다.
* 2 . 위키 인덱스에 새로 추가하고 싶은 항목을 작성한다.

```md
할-일-목록
MacBook-사용-노하우
미세먼지에-대하여
```

* 3 . 이 상태에서 `할-일-목록`에 커서를 놓고 엔터를 치면 다음과 같이 양쪽에 대괄호를 이중으로 씌운다.
    * `할-일-목록`에 링크가 생긴 것이다.

```md
[[할-일-목록]]
MacBook-사용-노하우
미세먼지에-대하여
```

* 3 . `할-일-목록`에 커서를 놓고 한 번 더 엔터를 치면 `할-일-목록.md`라는 파일을 열어준다.
    * 엔터 키는 두 가지 역할을 한다.
        1. 링크 생성
        2. 링크로 이동
    * 참고로 "뒤로 가기" 역할을 하는 `BackSpace`를 누르면 먼저 편집하던 파일로 돌아간다.

### Todo 기능 사용

* 1 . `할-일-목록.md` 파일에 다음과 같이 할 일을 두 가지만 작성해 보자.

```md
* 청소기 먼지통 비우기
* 미세먼지에-대하여 문서 작성하기
```

* 2 . 이 때 커서를 `청소기 먼지통 비우기`에 놓고 `Ctrl + Space`를 입력해보면 다음과 같이 왼쪽에 체크박스가 나타난다.

```md
* [ ] 청소기 먼지통 비우기
* 미세먼지에-대하여 문서 작성하기
```

* 3 . 한 번 더 `Ctrl + Space`를 입력하면 체크박스에 `X`로 표시를 할 수 있다.
    * `Ctrl + Space`는 두 가지 역할을 한다.
        1. 체크박스 생성
        2. 체크박스 check / uncheck 토글

```md
* [X] 청소기 먼지통 비우기
* 미세먼지에-대하여 문서 작성하기
```

* 4 . 참고로 다음과 같이 계층 구조를 만들면, 하위 아이템에 `Ctrl + Space`로 체크를 했을 때 상위 체크박스에도 자동으로 체크가 된다.
    * 다음은 `청소기 먼지통 비우기`를 체크하자, `이번주에 할 일들`에 부분 완료되었음을 의미하는 `o`가 체크된 것이다.

```md
* [o] 이번주에 할 일들
    * [X] 청소기 먼지통 비우기
    * [ ] 미세먼지에-대하여 문서 작성하기
```

* 5 . 만약 다음과 같이 모든 하위 아이템에 체크를 하면, 자동으로 상위 아이템에도 완료를 의미하는 `X`가 체크된다.
    * 편리하면서 재미있는 기능이다.

```md
* [X] 이번주에 할 일들
    * [X] 청소기 먼지통 비우기
    * [X] 미세먼지에-대하여 문서 작성하기
```

* 6 . 이번엔 `미세먼지에-대하여`문서를 만들고 작성해 보자.
    * `미세먼지에-대하여`에 커서를 놓고 엔터를 입력하면 링크가 생긴다.
    * 한 번 더 엔터를 입력하면 `미세먼지에-대하여.md`파일을 만들고 열어준다.

```md
* [X] 이번주에 할 일들
    * [X] 청소기 먼지통 비우기
    * [X] [[미세먼지에-대하여]] 문서 작성하기
```

* 9 . `미세먼지에-대하여.md` 파일에 원하는 내용을 작성해준다.

## Vim-startify와 함께 사용하기

Vimwiki는 [Vim-startify](https://github.com/mhinz/vim-startify )와 함께 사용하면 굉장히 쉽고 빠르게 열고 닫을 수 있다.

Vimwiki 사용 중 session을 저장하고, 저장한 session을 필요할 때마다 불러오는 방식으로 사용하면 적절하다.

Startify와 함께 사용하는지 아닌지에 따라 Vimwiki의 활용도는 큰 차이가 난다고 생각한다.

## YouCompleteMe와 함께 사용하기

자동완성 플러그인 [YouCompleteMe](https://github.com/Valloric/YouCompleteMe )는 기본적으로 Vimwiki를 무시하도록 설정되어 있다.

```viml
let g:ycm_filetype_blacklist = {
    \ 'tagbar' : 1,
    \ 'qf' : 1,
    \ 'notes' : 1,
    \ 'markdown' : 1,
    \ 'unite' : 1,
    \ 'text' : 1,
    \ 'vimwiki' : 1,
    \ 'pandoc' : 1,
    \ 'infolog' : 1,
    \ 'mail' : 1
    \}
```

아래에서 넷째 줄을 보면 `vimwiki`가 있기 때문에 YouCompleteMe가 동작하지 않는 것이다.

blacklist에서 Vimwiki만 제거하거나, 다음과 같이 blacklist를 다 비워주도록 설정하면, Vimwiki에서 YouCompleteMe의 자동완성 기능을 사용할 수 있다.

```viml
let g:ycm_filetype_blacklist = {}
```

## UltiSnips와 함께 사용하기

Vimwiki에서 [UltiSnips](https://github.com/SirVer/ultisnips )를 사용하려 할 때 가장 문제가 되는 것은 테이블에서 컬럼을 이동하는 단축키인 `<Tab>`과 UltiSnips의 자동 완성 단축키인 `<Tab>`이 겹치는 것이다.

다음과 같이 문제를 해결할 수 있다.

```viml
" Vimwiki의 테이블 단축키를 사용하지 않도록 한다
let g:vimwiki_table_mappings = 0

augroup vimwikiauto
    " <C-s> 로 테이블에서 오른쪽 컬럼으로 이동한다.
    autocmd FileType vimwiki inoremap <C-s> <C-r>=vimwiki#tbl#kbd_tab()<CR>
    " <C-a> 로 테이블에서 왼쪽 컬럼으로 이동한다.
    autocmd FileType vimwiki inoremap <C-a> <Left><C-r>=vimwiki#tbl#kbd_shift_tab()<CR>
augroup END
```

## Vimscript 서포트 코드

### 메타데이터의 `updated` 항목 자동 업데이트

파일을 편집할 때마다 `updated`의 시간을 손으로 편집해주는 건 굉장히 귀찮은 일이다.

따라서 다음과 같이 호출하면 `updated`의 시간을 자동으로 현재 시간으로 수정해주는 함수를 `.vimrc`에 추가해주자.

```viml
function! LastModified()
    if g:md_modify_disabled
        return
    endif
    if &modified
        " echo('markdown updated time modified')
        let save_cursor = getpos(".")
        let n = min([10, line("$")])
        keepjumps exe '1,' . n . 's#^\(.\{,10}updated\s*: \).*#\1' .
            \ strftime('%Y-%m-%d %H:%M:%S +0900') . '#e'
        call histdel('search', -1)
        call setpos('.', save_cursor)
    endif
endfun
```

위의 함수가 자동으로 호출되도록 `autocmd`로 등록해준다.

```viml
autocmd BufWritePre *.md call LastModified()
```

### 새로운 문서 파일을 만들었을 때 기본 형식이 입력되도록 한다

메타 데이터를 일일이 입력하는 것 역시 귀찮으니 다음과 같이 `.vimrc`에 추가해주자.

`g:vimwiki_list` 배열의 `path` 경로를 확인하여,
현재 파일이 Vimwiki의 하위 경로에 있고, 내용이 한 줄 밖에 없다면
메타 데이터 기본 값을 넣어주는 함수이다.

```viml
function! NewTemplate()

    let l:wiki_directory = v:false

    for wiki in g:vimwiki_list
        if expand('%:p:h') . '/' == wiki.path
            let l:wiki_directory = v:true
            break
        endif
    endfor

    if !l:wiki_directory
        return
    endif

    if line("$") > 1
        return
    endif

    let l:template = []
    call add(l:template, '---')
    call add(l:template, 'layout  : wiki')
    call add(l:template, 'title   : ')
    call add(l:template, 'summary : ')
    call add(l:template, 'date    : ' . strftime('%Y-%m-%d %H:%M:%S +0900'))
    call add(l:template, 'updated : ' . strftime('%Y-%m-%d %H:%M:%S +0900'))
    call add(l:template, 'tags    : ')
    call add(l:template, 'toc     : true')
    call add(l:template, 'public  : true')
    call add(l:template, 'parent  : ')
    call add(l:template, 'latex   : false')
    call add(l:template, '---')
    call add(l:template, '* TOC')
    call add(l:template, '{:toc}')
    call add(l:template, '')
    call add(l:template, '# ')
    call setline(1, l:template)
    execute 'normal! G'
    execute 'normal! $'

    echom 'new wiki page has created'
endfunction
```

위의 함수가 자동으로 호출되도록 `autocmd`로 등록해준다.

```viml
autocmd BufRead,BufNewFile *.md call NewTemplate()
```

### augroup 등록

위의 함수들을 다음과 같이 `autocmd`로 등록하고, `augroup`으로 묶어주면 된다.

다음은 내가 사용하고 있는 설정이다.

```viml
augroup vimwikiauto
    autocmd BufWritePre *wiki/*.md call LastModified()
    autocmd BufRead,BufNewFile *wiki/*.md call NewTemplate()
augroup END
```

## Links

* [Vimwiki](https://github.com/vimwiki/vimwiki )
* [Vim-plug](https://github.com/junegunn/vim-plug )
* [Vundle](https://github.com/VundleVim/Vundle.vim )
* [Vim-startify](https://github.com/mhinz/vim-startify )


* [Vimwiki + Jekyll + Github.io로 나만의 위키를 만들자](/blog/2017/12/06/my-wiki/ )
* [[vim-conceallevel]]{Vim에서 글자나 기호가 사라진다면 conceallevel을 확인해보자}


