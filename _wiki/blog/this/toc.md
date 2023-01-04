---
layout  : wiki
title   : 목차 기능
summary : 목차를 보여주는 것과 관련된 기능들
date    : 2022-12-03 23:23:21 +0900
updated : 2023-01-04 00:51:56 +0900
tag     : 
resource: BD/6C0CF6-AD44-44D5-83BE-1919BC9638C9
toc     : true
public  : true
parent  : [[/blog/this]]
latex   : false
---
* TOC
{:toc}

## 목차를 추가하는 방법

[kramdown의 Automatic "Table of Contents" Generation 기능]( https://kramdown.gettalong.org/converter/html.html#toc )을 사용한다.

자동 생성 목차를 추가하는 방법은 아주 쉽다.
다음과 같이 마크다운 문서 메타데이터 하단에 `* TOC`와 `{:toc}`를 넣어주면 된다.

```
---
layout  : wiki
title   : 목차 기능
summary : 목차를 보여주는 것과 관련된 기능들
date    : 2022-12-03 23:23:21 +0900
updated : 2022-12-03 23:32:41 +0900
---
* TOC
{:toc}
```

## 넓은 화면인 경우 목차를 오른쪽에 보여준다

| 좁은 화면                                                                                                         | 넓은 화면 (목차가 오른쪽에 나옴)                                                                                    |
|-------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|
| ![vertical]( /resource/BD/6C0CF6-AD44-44D5-83BE-1919BC9638C9/205446407-13818ba2-3ee9-4df2-994a-21f2109febdd.jpg ) | ![horizontal]( /resource/BD/6C0CF6-AD44-44D5-83BE-1919BC9638C9/205446411-308e0de6-a7e8-4ce0-9596-8e94663da2dd.jpg ) |

이 기능은 다음과 같이 scss로 구현하였다.

[_toc.scss]( https://github.com/johngrib/johngrib.github.io/blob/master/_sass/_toc.scss )

```scss
@media (min-width: 1700px) {
    ul#markdown-toc {
        position: fixed;
        top: 0;
        bottom: 0;
        left: calc(50vw + 410px);
        width: 380px;
        background-color: white;
        z-index: 1;
        font-size: 0.8em;
        overflow-y:auto;
        overflow-x:hidden;
        border: 0px solid;
        line-height: 1.5;
    }
}

#markdown-toc {
    border: 1px solid;
    padding: 10px;
    padding-left: 30px;
    background-color: #FFFFFF;
    line-height: 1.5;
}

$active-color: red;
.active-toc {
  color: $active-color;
}
.active-toc:visited {
  color: $active-color;
}
```

## 현재 보고 있는 소제목을 강조한다

포스트를 스크롤할 때 현재 읽고 있는 챕터의 소제목을 자동으로 강조해서, 내가 어디를 읽고 있는지 알려준다.

<video controls autoplay loop><source src=" /resource/BD/6C0CF6-AD44-44D5-83BE-1919BC9638C9/205447003-1d96f0a2-b93f-4ea9-9206-c81c31b17120.mp4 " type="video/mp4"><video>

구현은 [js/toc-highlight.js]( https://github.com/johngrib/johngrib.github.io/blob/master/js/toc-highlight.js )에서 읽어볼 수 있다.

70줄 정도로 여기에 인용하기엔 긴 편이므로 생략한다.

