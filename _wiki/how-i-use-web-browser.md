---
layout  : category
title   : 내가 웹 브라우저를 사용하는 방법
summary : 적절한 익스텐션을 사용한다
date    : 2018-03-04 00:38:22 +0900
updated : 2020-03-26 20:41:14 +0900
tag     : chrome
toc     : true
public  : true
parent  : [[my-lifehack]]
latex   : false
---
* TOC
{:toc}

## Vimium

- [Vimium (chrome)]( https://chrome.google.com/webstore/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb )
- [Vimium-ff (firefox)]( https://addons.mozilla.org/ko/firefox/addon/vimium-ff/ )
    - Firefox용 Vimium은 단축키 설정을 변경할 수 없고, 한 가지 기본 단축키만 제공한다.

Vimium은 Vim 과 유사한 키 바인딩으로 다양한 웹 브라우저 조작 기능을 제공한다.

기능이 50가지가 넘어가므로, 수시로 `?`를 입력해 도움말을 보면서 필요한 기능을 찾아보면 된다.

단순히 마우스를 안 쓰게 되는 것 이상의 강력한 기능들이 많으니 익숙해지면 좋다.

대부분의 기능은 Vim의 상식 선에서 동작한다. 즉, Vim을 알고 있다면 별로 외울 것이 없고 자연스럽게 사용할 수 있다.

### 마우스 안 쓰고 클릭하기

Vimium의 가장 강력한 기능은 `f`와 `F`이다.

웹 브라우저를 사용하다 `f`를 누르면 다음과 같이 클릭 힌트가 나타난다.

![]( /post-img/how-i-use-chrome/vimium-f.png )

클릭하고 싶은 곳의 힌트를 보고 키보드로 입력하면, Vimium이 해당 항목을 클릭해주는 방식이다.

위의 화면에서는 키보드의 `d`를 누르면 검색 입력칸을 클릭하는 효과가 난다.

`F`는 `f`와 비슷하지만 "새 탭에서 열기"로 클릭을 해준다.

### 마우스 안 쓰고 스크롤하기

Vimium은 Vim과 비슷한 키 바인딩을 활용한 스크롤 기능을 제공한다.

| 입력 | 기능                    |
|------|-------------------------|
| `j`  | 아래로 스크롤           |
| `k`  | 위로 스크롤             |
| `d`  | 반 페이지 아래로 스크롤 |
| `u`  | 반 페이지 위로 스크롤   |
| `gg` | 최상단으로 스크롤       |
| `G`  | 최하단으로 스크롤       |
| `h`  | 왼쪽으로 스크롤         |
| `l`  | 오른쪽으로 스크롤       |
| `zH` | 가장 왼쪽으로 스크롤    |
| `zL` | 가장 오른쪽으로 스크롤  |

### 열려 있는 탭을 검색해 이동하기

Vimium의 `T`를 사용하면 현재 열려 있는 탭을 검색할 수 있다.

- 검색어를 입력하면 실시간으로 필터링된다.
- 화살표로 위아래 이동하는 것도 가능하다.
- 나는 `space`키를 `T`와 똑같이 기능하도록 등록해 두었다.(`Vimium Options` - `Custom key mappings`에서 설정)
```viml
map <space> Vomnibar.activateTabSelection
```


웹 브라우저를 사용하다 `space`를 누르면 다음과 같이 탭 선택기가 열린다.

![]( /post-img/how-i-use-chrome/vimium-t.png ){:style="border: 1px solid black"}

### 상위 url 경로로 이동하기

- `gu`를 입력하면 상위 경로 url로 이동한다.

현재 페이지가 `https://github.com/johngrib/johngrib.github.io/` 일 때, `gu`를 입력하면...

`https://github.com/johngrib/` 로 이동한다는 뜻이다.

- `gU`를 입력하면 최상위 경로 url로 이동한다.

현재 페이지가 `https://github.com/johngrib/johngrib.github.io/` 일 때, `gU`를 입력하면...

`https://github.com/` 로 이동한다는 뜻이다.

## Tab Wrangler

- [Tab Wrangler(chrome)]( https://chrome.google.com/webstore/detail/tab-wrangler/egnjhciaieeiiohknchakcodbpgjnchh?hl=ko )
- [Tab Wrangler(firefox)]( https://addons.mozilla.org/ko/firefox/addon/tabwrangler/ )

### 탭을 자동으로 종료하고 검색하기

Tab Wrangler를 사용하면 일정 시간 이상 들어가지 않은 탭을 자동으로 닫아주고, 자체 히스토리에 기록한다.

물론 단축키를 등록해 수동으로 닫고 기록하는 방법도 있다. 나는 다음과 같이 설정해 두었다.

- `option` - `s`: 현재 탭을 닫고 탭 랭글러에 저장
    - 다시 볼 필요가 없는 탭은 `command`-`w`로 닫는다.
    - 다시 볼 탭은 `option`-`s`로 닫는다.
- `option` - `a`: 탭 랭글러 검색.

웹 브라우저를 사용하다가 `option` - `a`를 누르면 다음과 같이 탭 랭글러가 열린다.

검색 입력에 커서가 있으므로 곧바로 검색을 할 수 있다.

![]( /post-img/how-i-use-chrome/tab-wrangler.png )

### 상세 설정

![]( /post-img/how-i-use-chrome/config.png )

- 들어가지 않은 지 2시간 반이 지난 탭을 탭 랭글러가 수거하게 해 두었다.
- 탭이 10개 이상인 경우에만 탭을 수거하게 했다.
- 히스토리 사이즈는 1,000(최대값)으로 한다.
- 1초 활성화 옵션은 탭 이동을 통해 잠시 스쳐 지나간 탭의 타이머를 갱신하지 않게 해준다.

## 함께 읽기

- [[vimium]]

