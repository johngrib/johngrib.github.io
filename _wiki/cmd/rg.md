---
layout  : wiki
title   : ripgrep, rg
summary : recursively search current directory for lines matching a pattern
date    : 2019-11-11 22:38:41 +0900
updated : 2023-08-24 20:37:54 +0900
tag     : bash command
resource: 05/A20F24-9271-4D5A-ACCA-63159FCBFEE5
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

### 설치
```sh
$ brew install ripgrep
```

### 인코딩을 지정하여 검색하기
```sh
$ rg --encoding=euc-kr '검색어'
```

## Link

* [BurntSushi/ripgrep][repo]


[repo]: https://github.com/BurntSushi/ripgrep
