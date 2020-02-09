---
layout  : wiki
title   : 파비콘 추가하는 방법
summary : 그냥 favicon-generator를 쓰면 된다
date    : 2020-02-09 12:48:09 +0900
updated : 2020-02-09 12:59:33 +0900
tag     : 
toc     : true
public  : true
parent  : [[blog]]
latex   : false
---
* TOC
{:toc}

## 파비콘을 적용한 모습

파비콘을 적용하면 다음과 같이 웹 브라우저 위쪽 탭의 타이틀 왼쪽에 파비콘이 나오게 된다.

![파비콘을 적용한 모습]( /post-img/generate-favicon/favicon.png )

## 어떻게 만드는가?

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

* [파비콘 (wikipedia)][wikipedia]
* [favicon-generator][generator]

[wikipedia]: https://ko.wikipedia.org/wiki/파비콘
[generator]: https://www.favicon-generator.org/
