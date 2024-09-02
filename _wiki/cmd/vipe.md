---
layout  : wiki
title   : vipe 명령어
summary : bash 파이프 사이에 vi 편집을 끼워넣을 수 있다
date    : 2024-08-31 17:09:51 +0900
updated : 2024-09-02 20:59:31 +0900
tag     : 
resource: 30/66E144-420F-4421-8ABA-5FA94B93AD0A
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## 개요

`vipe`는 [[/cmd/moreutils]] 패키지에 포함된 명령이다.

[70줄 정도의 짧은 perl 스크립트](https://github.com/pgdr/moreutils/blob/c8086c5f8803cef57b3e6bad30f25d6544b618c2/vipe )로 되어 있다.

## Examples

```bash
ls -l | vipe | wc -l
```

위와 같이 파이프 커맨드 사이에 끼워넣으면, 중간에 vi가 실행되어 다음 명령으로 전달하기 전의 텍스트를 편집할 수 있다.

