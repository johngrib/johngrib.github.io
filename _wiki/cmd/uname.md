---
layout  : wiki
title   : uname 명령어
summary : Print operating system name
date    : 2022-09-09 15:06:32 +0900
updated : 2023-08-08 21:09:54 +0900
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

|      | Apple M1 Pro | Intel Core i7 |
|------|--------------|---------------|
| `-m` | arm64        | x86_64        |
| `-p` | arm          | i386          |
| `-s` | Darwin       | Darwin        |

## 응용

`-p` 옵션으로 애플 실리콘 프로세서로 돌아가는 컴퓨터를 구별할 수 있다.

`.bash_profile`, `.bashrc` 등을 작성할 때 활용할 수 있다.

예를 들어 [[/cmd/brew]]는 애플 실리콘 프로세서에서는 `/opt/homebrew`에 설치되고, 인텔 프로세서에서는 `/usr/local`에 설치되기 때문에 `uname -p`를 써서 `PATH` 설정을 할 수 있다.

다음은 나의 `.bash_profile`의 일부이다.


```bash
if [[ $(uname -p) == 'arm' ]]; then
    # 프로세서가 arm 즉 Apple Silicon 이라면
    export PATH="/opt/homebrew/bin:$PATH"
    export PATH="/opt/homebrew/sbin:$PATH"
    eval "$(/opt/homebrew/bin/brew shellenv)"
else
    export PATH="/usr/local/bin:$PATH"
    export PATH="/usr/local/sbin:$PATH"
    eval "$(/usr/local/bin/brew shellenv)"
    export PATH="/usr/local/opt/node@16/bin:$PATH"
fi
```

## 함께 읽기

- [[/cmd/gnu-coreutils]]
- [[/cmd/arch]] - `arch` 명령어는 `uname -m`과 같은 결과를 출력한다.

