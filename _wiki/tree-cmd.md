---
layout  : wiki
title   : tree 명령어
summary : 디렉토리의 내용을 트리 구조로 보여준다
date    : 2020-02-09 23:09:43 +0900
updated : 2020-02-09 23:17:05 +0900
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
```
