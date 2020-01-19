---
layout  : wiki
title   : glow 명령어
summary : 터미널에서 마크다운 화면을 렌더링해 보여준다
date    : 2020-01-19 21:37:02 +0900
updated : 2020-01-19 21:41:46 +0900
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
 # 설치한다
brew install glow

 # 도움말을 본다
glow --help

 # 마크다운 파일을 읽어 색칠해 보여준다
glow _wiki/glow-cmd.md

 # stdin으로 들어온 텍스트를 색칠해 보여준다
cat _wiki/glow-cmd.md | glow -

 # width 를 60으로 지정한다
glow _wiki/glow-cmd.md -w 60

 # dark / light 테마를 지정한다
glow _wiki/glow-cmd.md -s dark
```

## Link

* [charmbracelet/glow]( https://github.com/charmbracelet/glow )

