---
layout  : wiki
title   : git 설정하기
summary : 
date    : 2025-03-02 21:30:14 +0900
updated : 2025-03-02 21:56:27 +0900
tag     : 
resource: 47/B2ECDF-0368-4077-B08F-9995FC3E0E5C
toc     : true
public  : true
parent  : [[/git]]
latex   : false
---
* TOC
{:toc}

## man

```
man git-config
```

## 설정

### alias

[[/git-alias]] 참고.

### branch

#### branch.sort

```
[branch]
    sort = -committerdate
```

- `committerdate` : 최근 커밋 순으로 정렬해 보여준다.

### column

#### coumn.ui

```
[column]
    ui = auto
```

- `auto`: 출력이 터미널인 경우 컬럼을 사용한다.


### core

#### core.editor

이 값을 설정하지 않으면 기본적으로 `$VISUAL` 또는 `$EDITOR` 환경 변수에 지정된 에디터를 사용한다.

나는 다음과 같이 사용하고 있다.

```
[core]
    editor = /opt/homebrew/bin/nvim -u ~/dotfiles/nvim/init-gitcommit.vim
```

#### core.excludesfile

내 컴퓨터의 모든 로컬 리포지토리에 적용할 전역 `.gitignore` 파일을 지정한다.

```
[core]
    excludesfile = ~/.gitignore_global
```

나는 `~/.gitignore_global` 파일에 `tags`만 넣어두고 쓰고 있다.

### tag

#### tag.sort

```
[tag]
    sort = version:refname
```

- `version:refname` : 태그 이름을 (알파벳순이 아니라) 버전 순으로 정렬해 보여준다.

## 함께 읽기

- [Git 코어 개발자는 Git을 어떻게 설정하고 사용할까? (news.hada.io)](https://news.hada.io/topic?id=19441 ) - Scott Chacon의 글과 그와 관련된 코멘트들이 읽을만한다.

