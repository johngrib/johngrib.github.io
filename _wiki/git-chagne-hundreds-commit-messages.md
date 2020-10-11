---
layout  : wiki
title   : 수백 개의 git commit 메시지를 sed로 일괄 편집하기
summary : git filter-branch --msg-filter 를 사용한다
date    : 2020-10-11 20:20:04 +0900
updated : 2020-10-11 22:06:08 +0900
tag     : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

## 요약

다음 명령을 사용하면 `시작커밋` 부터 `마지막커밋` 범위의 커밋 메시지를 [[sed]] 로 편집하게 된다.

```sh
git filter-branch --msg-filter \
 'sed -E "s/pattern/replace/"' \
 시작커밋..마지막커밋
```

## Link

- [What's the fastest way to edit hundreds of Git commit messages?]( https://stackoverflow.com/questions/14332551/whats-the-fastest-way-to-edit-hundreds-of-git-commit-messages )

