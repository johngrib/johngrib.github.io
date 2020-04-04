---
layout  : wiki
title   : asciidoc을 위한 vim 설정
summary : 아직 별로 대단한 건 없다
date    : 2020-02-13 22:42:59 +0900
updated : 2020-02-13 22:50:24 +0900
tag     : vim asciidoc
toc     : true
public  : true
parent  : [[Vim]]
latex   : false
---
* TOC
{:toc}

## vim tagbar에 asciidoc의 toc가 나오게 하자

어차피 vim-gutentag 이 자동으로 ctags 를 돌려주고 있으므로 ctags에 새로운 언어 설정만 해주면 된다.

따라서 `~/.ctags` 에 다음 내용을 추가해준다.

[.ctags]( https://github.com/johngrib/dotfiles/blob/468c29278c9efb88a1143100db33fce698b96cb8/.ctags )

```ctags
--langdef=asciidoc
--langmap=asciidoc:.adoc
--regex-asciidoc=/^(\=+[ \t]+.*)/\1/h,heading,headings/
```

이제 tagbar가 asciidoc 을 어떻게 보여줄지에 대한 설정을 추가해준다.

[set-tagbar.vim]( https://github.com/johngrib/dotfiles/blob/468c29278c9efb88a1143100db33fce698b96cb8/vim-include/set-tagbar.vim )

```viml
let g:tagbar_type_asciidoc = {
    \ 'ctagstype' : 'asciidoc',
    \ 'sort': 0,
    \ 'kinds' : [
        \ 'h:Heading'
    \ ]
\ }
```

위에서 가장 중요한 것은 `'sort': 0` 인데, 이 설정을 해주지 않으면 tagbar에서 자동으로 정렬이 되어 toc의 의미가 없다.

## snippet 파일 이름 위에 커서를 두고 엔터를 누르면 파일이 열리게 하자

생각나는대로 그냥 다음과 같이 코딩했다. 해보니 잘 돌아간다. 이렇게 대충 만드는 게 vim의 참맛이겠지...

[set-asciidoc.vim]( https://github.com/johngrib/dotfiles/blob/468c29278c9efb88a1143100db33fce698b96cb8/vim-include/set-asciidoc.vim )

```viml
augroup asciidoc_set
    autocmd FileType asciidoc nnoremap <CR> :call OpenAsciidocFile()<CR>
augroup END

function! OpenAsciidocFile()
    let l:line = getline('.')
    let l:regex = '^include::{snippets}\(.*\.adoc\)\[\]\s*$'
    if l:line =~? l:regex
        let l:prefix = "build/generated-snippets"
        let l:path = substitute(l:line, "^include::{snippets}", l:prefix, "")
        let l:path = substitute(l:path, "\[\]\s*$", "", "")
        execute "edit " . l:path
    endif
endfunction
```

