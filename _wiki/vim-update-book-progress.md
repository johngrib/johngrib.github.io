---
layout  : wiki
title   : 읽고 있는 책의 진행도를 Vim에서 자동으로 계산하자
summary : awk 만세
date    : 2019-11-30 21:01:19 +0900
updated : 2019-11-30 21:57:13 +0900
tag     : vim awk
toc     : true
public  : true
parent  : [[vim]]
latex   : false
---
* TOC
{:toc}

## 읽고 있는 책의 진행도를 관리하기

[[two-views-of-vim]]{Vim, 두 가지 관점} 글에서도 한 이야기이지만,
나는 읽고 있는 책들의 진행 상태를 vim으로 관리하고 있다.

```
3 % : 11 / 352
* [ ] 밑바닥부터 만드는 컴퓨팅 시스템

16 % : 47 / 279
* [ ] 컴퓨터 아나토미

66 % : 743 / 1112
* [ ] 2019-01-14 Rosen의 이산수학 공부
```

읽고 있는 책 페이지를 수정하고 파일을 저장하면 퍼센티지가 자동으로 업데이트되게 해 두었던 것인데,
다음과 같이 `awk`를 호출하는 짧은 vimscript 코드로 돌아간다.

```viml
function! UpdateBookProgress()
    let l:save_cursor = getpos(".")
    " \d+ % : \d+ / \d+ 형식의 라인이 있으면 퍼센테이지를 계산해 업데이트한다
    let l:awk_command = "awk '{print int($4 * 100 / $6), \"\\% :\", $4, $5, $6 }'"
    %g,\v^\d+ \% : \d+ \/ \d+,exe "normal! V!" . l:awk_command . "^M"
    call setpos('.', l:save_cursor)
endfunction

augroup todoauto
    autocmd BufWritePre *wiki/todo.md call UpdateBookProgress()
augroup END
```

## awk를 호출하는 코드를 분리하라

위의 방법은 아주 잘 돌아갔고 매우 만족하며 사용하고 있었다.

그런데 문득 이걸 분리해야겠다는 생각이 들었다.

그래서 다음과 같은 간단한 셸 스크립트를 먼저 만들었다.

```sh
#!/usr/bin/env bash

awk '/^#+ +[0-9]+% [0-9]+ \// { \
        point = int(100 * $3 / $5); \
        sub(/^(#+ +)[0-9]+/, $1 " " point); \
    }1' $1 > $1.replaced
cat $1.replaced > $1
\rm $1.replaced
```

* `/^#+ +[0-9]+% [0-9]+ \//`: 주어진 파일에서 정규식 패턴에 맞는 라인만을 작업 대상으로 삼는다.
* `point = int(100 * $3 / $5);`: 3번째 필드와 5번째 필드를 사용해 퍼센티지를 계산하고 int로 변환한다.
* `sub(/^(#+ +)[0-9]+/, $1 " " point);`: 기존 퍼센티지를 계산한 퍼센티지 값으로 substitute 한다(replace 한다).
* 이후는 원본 파일에 덮어쓰고, 백업 파일을 지우는 내용이다.

그리고 vim 설정 파일에서 다음과 같이 바꿔주었다.

```viml
let g:vim_wiki_set_path = expand('<sfile>:p:h')

" ...
" 생략
" ...

function! UpdateBookProgress()
    let l:cmd = g:vim_wiki_set_path . "/bookProgressUpdate.sh " . expand('%:p')
    call system(l:cmd)
    edit
endfunction

augroup todoauto
    autocmd BufWritePost *wiki/book.md call UpdateBookProgress()
augroup END
```

변경 내용은 [책 읽기 진행도 업데이트 관련 코드를 분리하라](https://github.com/johngrib/dotfiles/commit/85a9b72afd12988c22aae4c3f36a459a2c25a328 )에서 모두 읽어볼 수 있다.

## 적용 결과

다음 스크린샷은 이 작업 이후로 띄워본 로컬 위키의 `book.md` 파일의 목차이다.

![in web]( /post-img/vim-update-book-progress/69900511-aff17000-13b7-11ea-9990-38831cf016d0.png )

한편, vim에서는 파일을 편집할 때 tagbar를 통해 화면 오른쪽에 자동으로 목차가 업데이트된다.

![in vim]( /post-img/vim-update-book-progress/69900879-52135700-13bc-11ea-91bf-291a8710354e.png )

이제 목차에서 퍼센티지를 볼 수 있기 때문에 한 눈에 전체 진행도를 볼 수 있게 됐다.

그리고 예전 코드와 달리 `g` 명령을 사용하지 않기 때문에 커서 위치 처리 같은 느린 작업이 사라져서 더 빨라졌다.

## 함께 읽기

* [[two-views-of-vim]]{Vim, 두 가지 관점}


