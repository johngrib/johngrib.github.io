---
layout  : wiki
title   : Vim의 방식으로 웹 브라우저를 조작하기
summary : Vimium, Tridactyl
date    : 2018-03-04 00:40:04 +0900
updated : 2021-02-06 20:16:36 +0900
tag     : chrome firefox vim
toc     : true
public  : true
parent  : [[index]]
latex   : false
---
* TOC
{:toc}

## Vimium

* Google Chrome, Firefox 에서 Vim 키맵을 사용할 수 있는 브라우저 확장 프로그램.
* Vimium에 익숙해지면 마우스 없이 키보드만으로 웹 브라우저 사용이 가능하다.

{% raw %}
<iframe width="560" height="315" src="https://www.youtube.com/embed/t67Sn0RGK54" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
{% endraw %}

### 설치 방법

다음 링크를 통해 설치하면 된다.

* [Vimium(Chrome web store)](https://chrome.google.com/webstore/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb)
* [Vimium(Firefox add-on)](https://addons.mozilla.org/en-US/firefox/addon/vimium-ff/)

### 사용 방법

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


### 주의

트위터 웹 사이트나 Gmail 처럼 자체 단축키가 있는 웹 페이지에서는 Vimium의 키맵이 우선 적용될 수 있다.

웹 사이트에서 본래 제공하는 단축키를 사용하려면 `i`를 입력하여 Insert 모드를 켜면 된다.

## Tridactyl

- Firefox에서만 사용할 수 있는 add on.

### 기본적인 사용 방법

| 입력             | 기능                                                                             |
|------------------|----------------------------------------------------------------------------------|
| `hjkl`           | 스크롤                                                                           |
| `b`              | 탭 목록. vim의 `:buffers`와 비슷한 느낌. `tab`으로 선택할 수 있다.               |
| `t`, `o`, `w`    | 새 탭(`t`), 현재 탭(`o`), 새 창(`w`)에서 링크 열기. 히스토리와 북마크 검색 가능. |
| `T`, `O`, `W`    | 새 탭(`t`), 현재 탭(`o`), 새 창(`w`)에 현재 보고 있는 웹 페이지 열기.            |
| `H`, `L`         | 히스토리 이전, 다음 페이지로 이동.                                               |
| `yy`             | 현재 url을 클립보드로 복사.                                                      |
| `zi`, `zo`, `zz` | 줌 인, 줌 아웃, 줌 복원.                                                         |
| `f`, `F`         | 클릭 가능한 링크 마킹. 선택하면 (링크) 클릭. `F`는 새 탭에서 열어준다.           |
| `;y`             | `f`와 비슷하게 사용 가능. 선택하면 링크를 클립보드로 복사한다.                   |
| `;k`             | `f`와 비슷하게 사용 가능. 선택한 엘리먼트를 화면에서 숨긴다. 광고 치울 때 좋다.  |
| `;k`             | `f`와 비슷하게 사용 가능. 선택한 엘리먼트를 화면에서 숨긴다. 광고 치울 때 좋다.  |

### .tridactylrc 파일의 사용

[Exemplar .tridactylrc files][tridactylrc] 문서를 참고하도록 한다.

1. `:nativeinstall`을 파이어폭스에서 입력하고 시키는대로 따라 한다.
2. `~/.tridactylrc` 파일을 작성하고, `:source` 또는 `:restart` 한다. vim과 비슷하네!

`.tridactylrc` 파일의 [vim 신택스 컬러링 플러그인]( https://github.com/tridactyl/vim-tridactyl )도 있으므로 설치해 주었다.

나의 [.tridactylrc]( https://github.com/johngrib/dotfiles/blob/master/.tridactylrc ).

## Links

- Vimium
    - <https://github.com/philc/vimium >
    - [Vimium(Chrome web store)](https://chrome.google.com/webstore/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb)
    - [Vimium(Firefox add-on)](https://addons.mozilla.org/en-US/firefox/addon/vimium-ff/)
- Tridactyl
    - <https://github.com/tridactyl/tridactyl >
    - [Firefox add on]( https://addons.mozilla.org/ko/firefox/addon/tridactyl-vim/ )
    - [Exemplar .tridactylrc files][tridactylrc]

## 함께 읽기

- [[how-i-use-web-browser]]{내가 웹 브라우저를 사용하는 방법}


[tridactylrc]: https://github.com/tridactyl/tridactyl/wiki/Exemplar-.tridactylrc-files
