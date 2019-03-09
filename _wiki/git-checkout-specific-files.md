---
layout  : wiki
title   : git에서 다른 브랜치의 특정 파일만 체크아웃하기
summary : git checkout [branch] -- [path] 로 해결
date    : 2018-02-13 21:10:21 +0900
updated : 2018-12-02 14:32:59 +0900
tag     : til git
toc     : true
public  : true
parent  : git
latex   : false
---
* TOC
{:toc}

## 개요

다른 브랜치의 특정 파일만 체크아웃하는 방법.

다음과 같이 하면 된다.

```
git checkout <branch> -- <path>
```

## 경험

다음과 같은 상황에서 이 기능을 쓸 일이 있었다.

* 개발팀은 `develop`이라는 저장소를 쓴다.
* 디자인팀은 `design`이라는 저장소를 쓴다.
* 새로 개발하는 웹 페이지에 대해 디자인팀이 작성한 `scss` 파일이 필요하다.
    * 디자인팀의 작업 결과는 아직 `design` 저장소에만 있다.
    * 디자인팀이 관련 작업을 한 브랜치는 `new-scss`이다.

`design` 저장소 `new-scss`브랜치의 `_cdn/scss` 디렉토리의 내용만 받기 위해서는 다음과 같이 하면 된다.

```
git checkout design/new-scss -- _cdn/scss/
```

## Links

* [Quick tip: git-checkout specific files from another branch](http://nicolasgallagher.com/git-checkout-specific-files-from-another-branch/)

