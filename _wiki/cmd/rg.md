---
layout  : wiki
title   : ripgrep, rg
summary : recursively search current directory for lines matching a pattern
date    : 2019-11-11 22:38:41 +0900
updated : 2025-01-29 21:07:12 +0900
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

### 페이징 {#paging}

rg는 자체 페이징이 없기 때문에 [[/cmd/less]]와 조합해 사용해야 페이징을 할 수 있다.

단 별다른 옵션 없이 `less`와 조합하면 색깔이 제대로 표시되지 않으므로 다음과 같이 옵션을 추가해야 한다.

```bash
rg --color always '검색어' | less -R
```

매번 옵션을 추가하는 것이 귀찮으므로 나는 `.bashrc`에 다음과 같이 alias를 설정해두고 사용한다.

```bash
alias rg='rg --color always'
alias less='less -R'
```

위와 같이 alias를 설정한 후에는 다음과 같이 사용할 수 있다.

```bash
rg '검색어' | less
```

## Link

* [BurntSushi/ripgrep][repo]


[repo]: https://github.com/BurntSushi/ripgrep
