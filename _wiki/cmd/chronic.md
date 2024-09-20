---
layout  : wiki
title   : chronic 명령어
summary : 명령이 실패한 경우에만 결과를 출력한다
date    : 2024-09-20 16:50:11 +0900
updated : 2024-09-20 17:18:47 +0900
tag     : 
resource: 43/70C709-21F1-4BAF-BC6C-FE8E3E914B05
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## 개요

- `chronic`은 [[/cmd/moreutils]] 패키지에 포함된 명령이다.
- 다른 명령을 실행하고, 그 명령이 실패한 경우에만 결과를 출력해주는 기능을 갖고 있다.
    - 이런 특성으로 인해 [[/cmd/crontab]]과 같이 사용하기 좋다.

## Example

```bash
$ chronic echo hello

$ chronic rm 123
rm: 123: No such file or directory
```

- `echo hello`는 성공하므로 아무것도 출력되지 않는다.
- `rm 123`은 실패하므로 에러 메시지가 출력된다.

## 함께 읽기

- [[/cmd/crontab]]

