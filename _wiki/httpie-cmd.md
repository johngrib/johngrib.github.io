---
layout  : wiki
title   : http 명령어 (HTTPie)
summary : 아직 curl이 더 익숙하긴 하지만...
date    : 2021-01-17 13:12:24 +0900
updated : 2021-01-17 13:24:20 +0900
tag     : command http
toc     : true
public  : true
parent  : [[command-line]]
latex   : false
---
* TOC
{:toc}

## Installation

```sh
brew install httpie
```

## Examples

```sh
 # 간단한 GET 메소드 리퀘스트
http httpie.io/hello
https httpie.io/hello

 # -v : 결과 뿐 아니라 리퀘스트도 보고 싶을 경우
https -v httpie.io/hello

 # --offline : 오프라인 모드. 리퀘스트만 보고 싶을 때 쓰기 좋다
https --offline httpie.io/hello

 # 파일 다운로드
http --download pie.dev/image/png
http pie.dev/image/png > image.png  # curl 과 똑같은 느낌으로도 사용 가능
```


## Links

- <https://httpie.io/ >
- [HTTPie Docs]( https://httpie.io/docs )

