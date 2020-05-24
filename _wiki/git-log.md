---
layout  : wiki
title   : git log
summary : 
date    : 2019-12-01 08:14:22 +0900
updated : 2019-12-01 19:20:57 +0900
tag     : git
toc     : true
public  : true
parent  : [[git]]
latex   : false
---
* TOC
{:toc}

## 로그 그래프

나는 로그 그래프 확인에 다음 알리아스를 사용해왔다.

```sh
l = "log \
    --color --graph \
    --abbrev-commit \
    --pretty=format:'%Cred%h %Creset-%C(yellow)%d %Creset%s %Cgreen(%cr)%C(bold blue)<%an>'"
```

`git l`을 입력하면 다음과 같이 출력된다.

![]( /post-img/git-log/69907636-866a3000-141b-11ea-8b50-732c038279a3.png )

그리고 최근에 다음과 같이 바꿔서 사용하기 시작했다.

```sh
l = "log \
    --color --graph --decorate \
    --date=format:'%Y-%m-%d' \
    --pretty=format:'%C(cyan)%h%C(auto)%d %s %C(magenta)(%ad)%C(bold blue) %an'"
```

![]( /post-img/git-log/69907643-a26dd180-141b-11ea-9359-9a809f5b621e.png )



