---
layout  : wiki
title   : vim tagbar에서 markdown을 적용시키자
summary : .vimrc와 .ctags를 약간만 손보면 된다
date    : 2018-09-14 16:38:19 +0900
updated : 2018-09-14 16:58:16 +0900
tag     : vim tagbar markdown
toc     : true
public  : true
parent  : Vim
latex   : false
---
* TOC
{:toc}

# 발단

* 평소 유용하게 잘 쓰고 있는 [tagbar](https://github.com/majutsushi/tagbar )가 markdown 파일을 지원하면 유용할 것 같다는 생각이 들었다.
* 직접 플러그인을 만들어 볼까 하고 검색하다가, 설정을 약간만 바꿔주면 된다는 것을 알게 되었다.

# 준비물

다음 도구들을 평소에 사용하고 있었다면 곧바로 적용하면 된다.

* `ctags`
* [tagbar](https://majutsushi.github.io/tagbar/ )
* [vim-gutentags](https://github.com/ludovicchabant/vim-gutentags )

# 설정

## .ctags

`~/.ctags` 파일을 만들고 다음 내용을 집어넣는다.

```.ctags
--langdef=markdown
--langmap=markdown:.md
--regex-markdown=/^(#+)[ \t]+([^#]*)/\1 \2/h,header,Markdown Headers/
--regex-markdown=/\[([^\[]+)\]\(([^\)]+)\)/\1/l,link,Markdown Links/
--regex-markdown=/!\[\]\(.*[\/ ](.*\.[a-z]{3})\)/\1/i,image,Markdown Image/
```

* `langdef=markdown`: markdown 랭귀지 정의
* `langmap=markdown:.md`: `.md` 확장자를 가진 파일 지정

## .vimrc

`.vimrc` 파일을 열고 다음과 같이 `g:tagbar_type_markdown` 값을 지정해 준다.

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

# 사용

* 평소대로 tagbar를 사용하면 된다.
* 만약 tagbar 갱신이 잘 안 된다면 갱신이 필요할 때마다 `:e`를 입력해주면 잘 돌아간다.

# Links

* [Markdown support #70 (github.com/majutsushi/tagbar/issues)](https://github.com/majutsushi/tagbar/issues/70 )
    * [anexusarchon님의 셋팅](https://github.com/majutsushi/tagbar/issues/70#issuecomment-30392593 )
