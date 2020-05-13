---
layout  : wiki
title   : 파비콘
summary : 웹 브라우저 탭에 나오는 개인화된 아이콘
date    : 2020-02-09 12:48:09 +0900
updated : 2020-05-13 23:08:16 +0900
tag     : 
toc     : true
public  : true
parent  : [[blog]]
latex   : false
---
* TOC
{:toc}

## From: 레이몬드 첸의 윈도우 개발 282 스토리

레이몬드 첸의 책을 읽어보면 파비콘이 처음 등장했을 때의 분위기를 알 수 있다.

> 이 기능이 소개되었을 때 인터넷 익스플로러는 사용자가 방문하는 모든 사이트의 favicon.ico 파일을 처리하지 않도록 조심했는데, 이것이 서버에 큰 부담을 주기 때문이다.
따라서 사용자가 이 사이트를 즐겨찾기에 추가할 때만 인터넷 익스플로러가 favicon.ico 파일을 찾아서 나중에 사용하기 위해 캐시에 넣었다.
>
> favicon.ico 기능이 처음 소개되었을 때, 많은 웹 서버 관리자들은 화를 내고, 이것을 공해라고 불렀으며, 아주 미워하고, 심지어 이 기능이 인터넷 익스플로러를 사용하지 말아야 하는 충분한 이유가 된다고까지 말했다. 페이지를 열 때마다 인터넷 익스플로러가 이 파일을 찾는 것이 이 사람들을 흥분시켰다.
>
> 역설적으로, 어떤 사람은 '넷스케이프(Netscape)는 이런 실수를 하지 않을 것이다'라고 말했다. 그러나 실제로 넷스케이프는 이 '실수'를 반복했고, 한 술 더 떠서 심지어 즐겨찾기에 추가되지 않았음에도 불구하고 처음 방문할 때 무조건 favicon.ico 파일을 다운로드했다.
>
> 지금은 누가 대역폭을 낭비하고 있을까?[^raymond-60]

2020년 4월 시점에서 보기에는, 정말 옛날 이야기이다.


## 파비콘을 적용한 경험
### 파비콘을 적용한 모습

파비콘을 적용하면 다음과 같이 웹 브라우저 위쪽 탭의 타이틀 왼쪽에 파비콘이 나오게 된다.

![파비콘을 적용한 모습]( /post-img/generate-favicon/favicon.png )

### 어떻게 만드는가?

자세히 알고 싶지는 않아서 [favicon-generator][generator]의 도움을 받았다.

먼저 PNG 이미지를 하나 준비했다.

![립 글자가 하나 있는 이미지]( /resource/johngrib.png )

PNG 이미지를 넣고 돌렸더니 압축 파일을 하나 다운로드 받을 수 있었고, 압축을 풀어 보니 다음과 같은 OS별 여러 사이즈의 이미지가 나왔다.

```
$ tree .
.
├── android-icon-144x144.png
├── android-icon-192x192.png
├── android-icon-36x36.png
├── android-icon-48x48.png
├── android-icon-72x72.png
├── android-icon-96x96.png
├── apple-icon-114x114.png
├── apple-icon-120x120.png
├── apple-icon-144x144.png
├── apple-icon-152x152.png
├── apple-icon-180x180.png
├── apple-icon-57x57.png
├── apple-icon-60x60.png
├── apple-icon-72x72.png
├── apple-icon-76x76.png
├── apple-icon-precomposed.png
├── apple-icon.png
├── browserconfig.xml
├── favicon-16x16.png
├── favicon-32x32.png
├── favicon-96x96.png
├── favicon.ico
├── manifest.json
├── ms-icon-144x144.png
├── ms-icon-150x150.png
├── ms-icon-310x310.png
└── ms-icon-70x70.png

0 directories, 27 files
```

이제 html에 다음과 같은 정보를 추가해주면 된다.

```html
<link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
<link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/manifest.json">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
<meta name="theme-color" content="#ffffff">
```

## Links

- [파비콘 (wikipedia)][wikipedia]
- [favicon-generator][generator]
- [How to Add a Favicon to your Site (w3.org)]( https://www.w3.org/2005/10/howto-favicon )

[wikipedia]: https://ko.wikipedia.org/wiki/파비콘
[generator]: https://www.favicon-generator.org/

## 참고문헌

- 레이몬드 첸의 윈도우 개발 282 스토리 / 레이몬드 첸 저 / 손광수 역 / ITC / 초판 1쇄 2007년 09월 10일 / 원제 : The Old New Thing: Practical Development Throughout the Evolution of Windows

## 주석

[^raymond-60]: 레이몬드 첸의 윈도우 개발 282 스토리. Chapter 5. 60쪽.
