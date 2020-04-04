---
layout  : wiki
title   : vim tagbar에서 markdown을 적용시키자
summary : .vimrc와 .ctags를 약간만 손보면 된다
date    : 2018-09-14 16:38:19 +0900
updated : 2020-01-26 22:32:39 +0900
tag     : vim tagbar markdown
toc     : true
public  : true
parent  : [[Vim]]
latex   : false
---
* TOC
{:toc}

## 발단

평소 유용하게 잘 쓰고 있는 [tagbar](https://github.com/majutsushi/tagbar )가 markdown 파일을 지원하면 유용할 것 같다는 생각이 들었다.

## 공통 준비물

다음 도구들을 평소에 사용하고 있었다면 곧바로 적용하면 된다.

* [[ctags]]
* [tagbar](https://majutsushi.github.io/tagbar/ )
* [vim-gutentags](https://github.com/ludovicchabant/vim-gutentags )


## 방법 1: .ctags 수정으로 간단하게 적용하는 방법

> 이 방법이 가장 심플하고 쉬우며, 종합적으로 가장 좋은 방법이라 생각한다.

`~/.ctags` 파일을 만들고 다음 내용을 집어넣는다.

```text
--langdef=markdown
--langmap=markdown:.md
--regex-markdown=/^(#+)[ \t]+([^#]*)/\1 \2/h,header,Markdown Headers/
--regex-markdown=/\[([^\[]+)\]\(([^\)]+)\)/\1/l,link,Markdown Links/
--regex-markdown=/!\[\]\(.*[\/ ](.*\.[a-z]{3})\)/\1/i,image,Markdown Image/
```

* `langdef=markdown`: markdown 랭귀지 정의
* `langmap=markdown:.md`: `.md` 확장자를 가진 파일 지정

이제 `.vimrc` 파일을 열고 다음과 같이 `g:tagbar_type_markdown` 값을 지정해 준다.

```viml
let g:tagbar_type_markdown = {
    \ 'ctagstype' : 'markdown',
    \ 'kinds' : [
            \ 'h:headings',
            \ 'l:links',
            \ 'i:images'
        \ ],
    \ "sort" : 0
\ }
```

`sort: 0`이 중요하다. 이 값을 `1`로 설정하면, tagbar에 표시되는 태그가 정렬되기 때문에 markdown 문서의 toc를 보려는 목적에 적합하지 않다.

* 이제 평소대로 tagbar를 사용하면 된다.
* 만약 tagbar 갱신이 잘 안 된다면 갱신이 필요할 때마다 `:e`를 입력해주면 잘 돌아간다.
    * vim-gutentags를 쓰고 있다면 이런 수동 갱신을 쓸 일이 거의 없다.

### 방법 1을 응용해 vimwiki의 마크다운에도 적용하자

vimwiki는 `filetype`을 `markdown`이 아니라 `vimwiki`로 사용하고 있기 때문에 위와 같이 설정해도 tagbar가 제대로 표시되지 않을 수 있다.

위에서 설정했던 것과 거의 똑같이 `.ctags` 파일에 `vimwiki` 설정을 추가해주면 된다.

다음은 내가 사용하고 있는 `.ctags` 파일이다.

```text
--langdef=markdown
--langmap=markdown:.md
--regex-markdown=/^(#+[ \t]+.*)/\1/h,heading,headings/

--langdef=vimwiki
--langmap=vimwiki:.md
--regex-vimwiki=/^(#+[ \t]+.*)/\1/h,heading,headings/
```

그리고 `.vimrc`에 `g:tagbar_type_vimwiki`를 추가해 주면 된다.

```viml
let g:tagbar_type_vimwiki = {
    \ 'ctagstype' : 'vimwiki',
    \ 'sort': 0,
    \ 'kinds' : [
        \ 'h:Heading'
    \ ]
\ }
```

## 방법 2: markdown2ctags 를 사용하는 방법

> 이 방법은 별로 추천하지 않는다. 마크다운 파일을 저장할 때마다 자동으로 태그바가 갱신되지 않기 때문이다. 자동으로 갱신하게 하려면 vimscript를 잡다하게 작성해야 하므로 불편한 점이 많다.

이 방법은 [markdown2ctags](https://github.com/jszakmeister/markdown2ctags )를 사용하는 방법이다.

링크한 저장소에서 `markdown2ctags.py` 파일을 복사해 `~/.local/bin/`로 옮겨두자.

하지만 그렇게 하면 컴퓨터를 바꾸거나 새로운 환경을 셋팅할 때마다 귀찮게 복사해야 할 것이므로 그냥 vim plug의 `do`를 사용하면 편하다.

```viml
Plug 'jszakmeister/markdown2ctags', {'do' : 'cp ./markdown2ctags.py ~/.local/bin/markdown2ctags.py'}
```

이제 `.vimrc`에 다음과 같이 설정해 준다.

```viml
let g:tagbar_type_markdown = {
    \ 'ctagstype': 'markdown',
    \ 'ctagsbin' : '/path/to/markdown2ctags.py',
    \ 'ctagsargs' : '-f - --sort=yes --sro=»',
    \ 'kinds' : [
        \ 's:sections',
        \ 'i:images'
    \ ],
    \ 'sro' : '»',
    \ 'kind2scope' : {
        \ 's' : 'section',
    \ },
    \ 'sort': 0,
\ }
```

## 세션 관련 문제 해결

한편 자동 세션 저장 기능을 사용하고 있을 때 tagbar가 열려 있는 상태에서 vim을 종료하고 다시 실행하면 tagbar가 일시적으로 제대로 작동하지 못하는 문제가 발생할 수 있다.

이런 경우, 다음과 같이 자동으로 tagbar를 종료하고 열어주는 `augroup`을 만들면 문제를 해결할 수 있다. 아래의 예제는 마크다운 파일을 편집하는 경우에만 tagbar 자동 종료/실행이 작동하도록 되어 있다.

```viml
augroup vimwiki_tagbar
    autocmd BufRead,BufNewFile *wiki/*.md TagbarOpen
    autocmd VimLeavePre *.md TagbarClose
augroup END
```

## 함께 읽기

* [[ctags]]{ctags 명령어}

## Links

* [Markdown support #70 (github.com/majutsushi/tagbar/issues)](https://github.com/majutsushi/tagbar/issues/70 )
    * [anexusarchon님의 셋팅](https://github.com/majutsushi/tagbar/issues/70#issuecomment-30392593 )

