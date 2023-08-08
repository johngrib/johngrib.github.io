---
layout  : wiki
title   : arch 명령어
summary : CPU 아키텍처 이름을 출력한다
date    : 2023-08-08 20:58:13 +0900
updated : 2023-08-08 21:04:44 +0900
tag     : 
resource: EC/7BC7E1-6EE7-468B-8438-FB1254474954
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

```bash
 # 도움말을 출력한다
arch -h
```

애플실리콘 컴퓨터에서 실행하면 다음과 같이 `arm64`를 출력한다.

```bash
$ arch
arm64
```

## 함께 읽기

- [[/cmd/gnu-coreutils]]
- [[/cmd/uname]]: `arch`는 `uname -m`과 같은 결과를 출력한다.

