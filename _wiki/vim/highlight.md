---
layout  : wiki
title   : vim :highlight
summary : 
date    : 2022-10-19 22:00:27 +0900
updated : 2022-10-19 22:24:26 +0900
tag     : vim
resource: B2/EAB4AC-124E-4FC0-BEE2-A30235F90329
toc     : true
public  : true
parent  : [[/vim]]
latex   : false
---
* TOC
{:toc}

## 사용 사례

### MatchParen

MatchParen은 괄호짝의 색깔을 지정한다.

`:help MatchParen`을 입력하면 다음과 같은 설명을 볼 수 있다.

>
MatchParen	The character under the cursor or just before it, if it
		is a paired bracket, and its match. |pi_paren.txt|
>

나는 아래와 같이 빨간색으로 설정해 사용하고 있다.

```viml
highlight MatchParen ctermbg=red guibg=#ff0000
```

<video controls autoplay loop width="100%"><source src=" /resource/B2/EAB4AC-124E-4FC0-BEE2-A30235F90329/196702197-4313e945-3f9f-4b31-a98d-7940ee647fca.mp4 " type="video/mp4"></video>

## 함께 읽기

- [[/vim/match]]

