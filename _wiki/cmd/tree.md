---
layout  : wiki
title   : tree 명령어
summary : 디렉토리의 내용을 트리 구조로 보여준다
date    : 2020-02-09 23:09:43 +0900
updated : 2022-03-06 21:02:05 +0900
tag     : bash command
resource: 49/A43344-11FD-46E0-BC88-5A17A47B1797
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

```sh
 # mac에서는 brew 를 이용해 설치할 수 있다.
brew install tree
```

```sh
 # 현재 디렉토리의 모든 하위 파일과 모든 하위 디렉토리를 본다.
tree .

 # 하위 디렉토리만 본다.
tree . -d

 # 파일 이름만 출력하지 않고 절대경로까지 모두 출력한다.
tree . -f

 # 인덴트와 그래프는 출력하지 않고 파일 이름만 출력한다.
tree . -i

 # 그래프 출력 없이 하위의 모든 파일을 절대 경로로 출력한다.
tree . -i -f

 # 주어진 경로를 무시한다. 여러 경로를 지정하려면 `|`를 구분자로 삼는다.
tree . -I "node_modules|bin"

 # 1 depth 하위 디렉토리까지만 본다.
tree . -L 1

 # html 파일만 본다
tree --prune -P '*.html'

 # vim.md 로 이름이 끝나는 파일만 본다
tree --prune -P '*vim.md'
```

