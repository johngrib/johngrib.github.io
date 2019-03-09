---
layout  : wiki
title   : Vimium - The hacker's browser
summary : 웹 브라우저에서 Vim 키맵을 사용할 수 있다
date    : 2018-03-04 00:40:04 +0900
updated : 2018-03-04 01:15:09 +0900
tag     : chrome firefox vim
toc     : true
public  : true
parent  : web-browser-extension
latex   : false
---
* TOC
{:toc}

## 개요

* Google Chrome, Firefox 에서 Vim 키맵을 사용할 수 있는 브라우저 확장 프로그램.
* Vimium에 익숙해지면 마우스 없이 키보드만으로 웹 브라우저 사용이 가능하다.

{% raw %}
<iframe width="560" height="315" src="https://www.youtube.com/embed/t67Sn0RGK54" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
{% endraw %}

## 설치 방법

다음 링크를 통해 설치하면 된다.

* [Vimium(Chrome web store)](https://chrome.google.com/webstore/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb)
* [Vimium(Firefox add-on)](https://addons.mozilla.org/en-US/firefox/addon/vimium-ff/)

## 사용 방법

* `f` - Vimium의 핵심 기능.
    * Vim 사용자가 아닌 사람도 **`f`만 알면 Vimium을 편리하게 사용할 수 있다**.
    * Vim easymotion 플러그인 처럼 웹 브라우저 상의 클릭 가능한 각 링크에 라벨을 붙여준다.
    * 라벨에 붙은 알파벳이나 숫자를 키보드로 입력하면 마우스 클릭 이벤트를 전달한다.

`f`를 제외한 나머지 기능은 Vim의 상식 선에서 동작한다. 즉, 단축키를 별로 외울 필요가 없다.

| 입력 | 기능                                                                     |
|------|--------------------------------------------------------------------------|
| `j`  | 아래로 스크롤                                                            |
| `k`  | 위로 스크롤                                                              |
| `d`  | 반 페이지 아래로 스크롤                                                  |
| `u`  | 반 페이지 위로 스크롤                                                    |
| `gg` | 최상단으로 스크롤                                                        |
| `G`  | 최하단으로 스크롤                                                        |
| `yy` | 현재 url을 클립보드로 복사                                               |
| `p`  | 클립보드의 문자열을 웹 브라우저 url 칸에 입력                            |
| `P`  | `p`와 같지만 새 창으로 결과를 열어준다                                   |
| `i`  | Insert 모드                                                              |
| `v`  | Visual 모드                                                              |
| `f`  | 핵심 기능. 클릭 가능한 오브젝트 마킹. 마킹된 문자를 입력하면 클릭해준다. |
| `F`  | `f`와 같지만 새 탭에서 열어준다.                                         |
| `o`  | open. 북마크와 히스토리를 검색한다.                                      |
| `T`  | 탭 검색. 탭 네임을 입력하여 탭 이동을 할 수 있다.                        |
| `^`  | 이전 탭으로                                                              |
| `H`  | 뒤로                                                                     |
| `L`  | 앞으로                                                                   |
| `t`  | 새 탭 생성                                                               |
| `J`  | 왼쪽 탭으로                                                              |
| `K`  | 오른쪽 탭으로                                                            |
| `g0` | 가장 왼쪽 탭으로                                                         |
| `g$` | 가장 오른쪽 탭으로                                                       |
| `r`  | 새로고침                                                                 |
| `x`  | 탭 닫기                                                                  |
| `X`  | 닫은 탭 복구                                                             |


## 주의

트위터 웹 사이트나 Gmail 처럼 자체 단축키가 있는 웹 페이지에서는 Vimium의 키맵이 우선 적용될 수 있다.

웹 사이트에서 본래 제공하는 단축키를 사용하려면 `i`를 입력하여 Insert 모드를 켜면 된다.

## Links

* <https://github.com/philc/vimium>
* [Vimium(Chrome web store)](https://chrome.google.com/webstore/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb)
* [Vimium(Firefox add-on)](https://addons.mozilla.org/en-US/firefox/addon/vimium-ff/)
