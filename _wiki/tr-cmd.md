---
layout  : wiki
title   : tr 명령어
summary : translate characters
date    : 2019-11-18 13:52:25 +0900
updated : 2019-11-18 21:34:14 +0900
tag     : bash command
toc     : true
public  : true
parent  : [[command-line]]
latex   : false
---
* TOC
{:toc}

## Examples

```sh
# 대문자를 소문자로 변환
echo 'ASDF' | tr '[:upper:]' '[:lower:]'
```

