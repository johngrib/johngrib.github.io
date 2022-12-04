---
layout  : wiki
title   : column 명령어
summary : column 기준으로 수직 정렬한다
date    : 2022-03-29 23:53:40 +0900
updated : 2022-03-29 23:59:10 +0900
tag     : bash command
resource: 2F/065C96-B53A-4BE5-8E07-A6058DCAC435
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

```bash
$ printf "aa,b,c\na,bbbbb,cc\naaaa,bb,ccc\n" | column -ts,
aa    b      c
a     bbbbb  cc
aaaa  bb     ccc
```

- `-t`: column을 판별해 테이블로 만든다.
- `-s,`: 구분자를 지정한다. 구분자는 `,`를 사용한다.

