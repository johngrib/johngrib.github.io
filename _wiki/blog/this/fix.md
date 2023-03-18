---
layout  : wiki
title   : 이 블로그 문제 해결법들
summary : 
date    : 2023-03-18 23:13:59 +0900
updated : 2023-03-18 23:18:48 +0900
tag     : 
resource: C9/256CC7-4F58-49D8-8222-1624AC6A6136
toc     : true
public  : true
parent  : [[/blog/this]]
latex   : false
---
* TOC
{:toc}

## Permission 문제가 있다면

rbenv를 사용하여 ruby 버전을 관리하도록 한다.

* [[/cmd/rbenv]]

나는 rbenv를 통해 ruby 버전을 `3.2.1`로 맞춰놓고 사용한다.

## webrick 에서 에러가 발생한다면

ruby 3 버전부터 webrick이 기본 제공이 아니기 때문이다.

아래 명령으로 설치해주면 된다.

```bash
bundle add webrick
```

