---
layout  : wiki
title   : uname 명령어
summary : Print operating system name
date    : 2022-09-09 15:06:32 +0900
updated : 2022-09-09 15:18:46 +0900
tag     : 
resource: 2E/D85590-7EB5-41BA-B7A8-DA98364CD806
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

```sh
 # machine hardware 이름을 출력한다
uname -m

 # 네트워크 노드 네임을 출력한다
uname -n

 # processor architecture name을 출력한다
uname -p

 # OS release를 출력한다
uname -r

 # OS name을 출력한다
uname -s

 # OS version을 출력한다
uname -v

 # mnrsv 옵션을 모두 준 것과 같다
uname -a
```

Apple M1 Pro 맥북과 Intel Core i7 맥북에서 다음 옵션들을 주고 실행해보았더니 다음과 같은 결과가 나왔다.

|    | Apple M1 Pro | Intel Core i7 |
|----|--------------|---------------|
| -m | arm64        | x86_64        |
| -p | arm          | i386          |
| -s | Darwin       | Darwin        |

## 응용

- `-p` 옵션으로 애플 실리콘 프로세서로 돌아가는 컴퓨터를 구별할 수 있다. `.bashrc` 등을 작성할 때 활용할 수 있음.

