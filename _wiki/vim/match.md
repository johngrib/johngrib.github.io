---
layout  : wiki
title   : vim :match
summary : 현재 윈도우에서 하이라이트할 패턴을 지정한다
date    : 2022-03-23 23:40:55 +0900
updated : 2022-10-19 23:01:32 +0900
tag     : vim
resource: EA/C316A4-B298-4AC2-A261-A994BE71BA36
toc     : true
public  : true
parent  : [[/vim]]
latex   : false
---
* TOC
{:toc}

## help

```viml
:help match
```

## 기본적인 사용

다음 명령을 vim에서 실행하면 사용 가능한 Highlighting group이 출력된다.

```
:so $VIMRUNTIME/syntax/hitest.vim
```

다음 이미지는 내 컴퓨터에서 실행한 결과를 캡처한 것이다.
이미지는 앞부분을 보여주고 있지만 결과는 총 454줄이었다.
직접 지정한 것만 출력되는 게 아니라 사용하고 있는 플러그인들이 정의한 컬러 그룹도 함께 출력되기 때문이다.

![Highlighting group이 출력된 모습]( ./colors.jpg )

이 중에서 마음에 맞는 컬러 그룹을 고르고, 다음과 같은 형식으로 명령을 입력하면 해당 패턴이 하이라이트된다.

```viml
:match colorGroup /pattern/
```

다음은 `:match Folded /nore/`를 입력해, `nore`에 `Folded` 색깔을 입힌 것이다.

![nore 패턴을 지정한 장면]( ./highlight-nore.jpg )

## 응용: 커서가 지시하는 단어를 하이라이트 시키기

[stackoverflow에서 본 팁]( https://stackoverflow.com/a/1552193 )으로, 매우 유용하게 사용하고 있다.

다음과 같이 설정하면 커서가 지시하는 단어를 하이라이트해준다.

나는 다음과 같이 커스텀 highlight인 `CursorSelected001`을 만들어 설정해 사용하고 있다.

```viml
augroup cursor_move_selected_word
    " :so $VIMRUNTIME/syntax/hitest.vim
    autocmd CursorMoved * exe printf('match CursorSelected001 /\V\<%s\>/', escape(expand('<cword>'), '/\'))
    highlight CursorSelected001 ctermfg=14 ctermbg=23 guifg=#00ffff guibg=#005f5f
augroup END
```

- `autocmd CursorMoved *`: 모든 타입의 파일에서 `CursorMoved` 이벤트가 발생할 때마다 작동하도록 한다.
- `exe`: `execute`의 축약.
- `expand('<cword>')`: 커서가 지시하고 있는 단어로 확장해주는 함수. (`:help expand()`)
- `escape( ... , '/\')`: 백슬래시 문자 이스케이핑 처리. (`:help escape()`)
- `printf('match CursorSelected001 /\V\<%s\>/', ... )`
    - 포맷 출력. `...`에 있는 내용을 `%s`에 넣어준다. 여기에서는 커서가 지시하는 단어를 넣어준다.

이렇게 설정하면 커서를 움직일 때마다 단어가 하이라이트되는 것을 볼 수 있다.

![하이라이트 예제]( ./highlight-example.gif )

## 함께 읽기

- [[/vim/highlight]]

