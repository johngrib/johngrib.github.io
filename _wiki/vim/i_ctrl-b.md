---
layout  : wiki
title   : Vim의 i_CTRL-B
summary : 많은 사람들이 실수하여 기능이 지워진 키
date    : 2025-12-19 22:50:37 +0900
updated : 2025-12-19 23:11:24 +0900
tag     : 
resource: F2/C63B18-9BE7-495F-B023-C74A84A252F4
toc     : true
public  : true
parent  : [[/vim]]
latex   : false
---
* TOC
{:toc}



## i_CTRL-B-gone

vi 에서 insert 모드의 `CTRL-B` 키에 대한 설명을 보기 위해` :help i_CTRL-B`를 입력하면 `i_CTRL-B-gone` 항목으로 점프하게 된다.

해당 항목은 `i_CTRL-B` 키가 없는 이유를 설명한다.

```
CTRL-B in Insert mode gone				*i_CTRL-B-gone*
--------------------------

When Vim was compiled with the |+rightleft| feature, you could use CTRL-B to
toggle the 'revins' option.  Unfortunately, some people hit the 'B' key
accidentally when trying to type CTRL-V or CTRL-N and then didn't know how to
undo this.  Since toggling the 'revins' option can easily be done with the
mapping below, this use of the CTRL-B key is disabled.  You can still use the
CTRL-_ key for this |i_CTRL-_|. >
   :imap <C-B> <C-O>:set revins!<CR>
```

다음은 위의 글을 번역한 것이다.

```
입력 모드에서는 CTRL-B 가 제거되었습니다.    *i_CTRL-B-gone*
--------------------------

예전에는 |+rightleft| 기능옵션과 함께 Vim을 컴파일한 경우,
CTRL-B 키를 사용해서 'revins' 옵션을 토글할 수 있었습니다.
그런데 CTRL-V 나 CTRL-N 키를 입력하려다가 CTRL-B 를 실수로 누르는 경우,
바뀐 상태를 어떻게 되돌려야 하는지 알지 못해 난감해하는 사람들도 발생했습니다.

아래에 소개하는 매핑을 통해 'revins' 옵션을 간단하게 토글할 수 있기 때문에,
CTRL-B 키의 기능은 비활성 처리했습니다.
이 기능은 |i_CTRL-_| 키로도 사용할 수 있습니다.

   :imap <C-B> <C-O>:set revins!<CR>
```

- `+rightleft`: 오른쪽에서 왼쪽 방향으로 글을 쓰는 언어를 지원하는 기능. 아랍어나 히브리어 등이 해당.
    - `:help rightleft`로 관련 설명을 읽어볼 수 있다.
- `revins`: insert 모드에서 글자가 오른쪽에서 왼쪽 방향으로 작성되게 하는 옵션.


## 나의 i_CTRL-B 사용

위에서의 이유로, insert 모드에서 `CTRL-B`는 자유롭게 할당할 수 있는 키라 할 수 있다.

나는 다음과 같이 설정하여 insert 모드에서 앞뒤의 괄호로 이동할 때 사용한다.

```
autocmd FileType vimwiki inoremap <C-f> <Esc>:let @z=@/<CR>/\v[)"}\]\.]<CR>:let @/=@z<CR>a
autocmd FileType vimwiki inoremap <C-b> <Esc>:let @z=@/<CR>?\v[("{\[\.]<CR>:let @/=@z<CR>i
```
