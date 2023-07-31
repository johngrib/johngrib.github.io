---
layout  : wiki
title   : compgen
summary : 
date    : 2023-07-31 22:25:01 +0900
updated : 2023-07-31 23:35:27 +0900
tag     : 
resource: A0/6E25F3-64EB-4A7C-A624-180E0305B37F
toc     : true
public  : true
parent  : [[/cmd/bash]]
latex   : false
---
* TOC
{:toc}

`compgen`을 통해 bash 셸에서의 자동 완성 가능한 목록을 출력할 수 있다.

## 도움말 보기

`compgen`은 `help` 명령어로 도움말을 볼 수 있다.

```bash
$ man compgen   # man 으로는 볼 수 없다.
No manual entry for compgen

$ help compgen
compgen: compgen [-abcdefgjksuv] [-o option] [-A action] [-G globpat] [-W wordlist] [-P prefix] [-S suffix] [-X filterpat] [-F function] [-C command] [word]
    Display the possible completions depending on the options.  Intended
    to be used from within a shell function generating possible completions.
    If the optional WORD argument is supplied, matches against WORD are
    generated.
```

## Examples

```bash
 # 현재 bash 셸의 모든 자동완성 대상 목록을 출력한다.
compgen -A variable

 # 모든 자동완성 대상 alias를 출력한다.
compgen -a

 # 모든 자동완성 대상 builtin 명령어 목록을 출력한다.
compgen -b

 # 모든 자동완성 대상 command를 출력한다.
compgen -c

 # 자동완성 대상 파일 이름 목록(현재 디렉토리 기준)을 출력한다.
compgen -f

 # 모든 자동완성 대상 keyword 목록을 출력한다.
compgen -k

 # 모든 자동완성 대상 사용자 목록을 출력한다.
compgen -u

 # 모든 자동완성 대상 변수 목록을 출력한다.
compgen -v
```

