---
layout  : wiki
title   : git log
summary : 
date    : 2019-12-01 08:14:22 +0900
updated : 2022-03-13 11:13:19 +0900
tag     : git
toc     : true
public  : true
parent  : [[/git]]
latex   : false
---
* TOC
{:toc}

## 로그 그래프

나는 로그 그래프 확인에 주로 다음 알리아스를 사용한다.

```sh
l = "log \
    --color --graph \
    --abbrev-commit \
    --pretty=format:'%Cred%h %Creset-%C(yellow)%d %Creset%s %Cgreen(%cr)%C(bold blue)<%an>'"
```

`git l`을 입력하면 다음과 같이 출력된다.

![]( ./69907636-866a3000-141b-11ea-8b50-732c038279a3.png )



