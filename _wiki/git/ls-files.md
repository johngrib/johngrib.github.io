---
layout  : wiki
title   : git ls-files
summary : 
date    : 2024-07-23 21:06:44 +0900
updated : 2024-07-23 21:29:37 +0900
tag     : 
resource: 1C/79507B-DE1E-4E05-8391-8796BF9BE167
toc     : true
public  : true
parent  : [[/git]]
latex   : false
---
* TOC
{:toc}

## 개요

- `git ls-files`는 [git-scm에 Plumbing Commands로 분류되어 있는](https://git-scm.com/docs ) 저수준 Git 명령이다.
- git이 관리하고 있는 파일 목록을 출력할 수 있다.
- `git ls-files --stage`는 git 교육/학습용으로도 유용하다. 아주 작은 리포지토리를 만들고, 이 명령을 계속 실행하면서 커밋을 추가해볼 것.

## Examples


```sh
 # git이 관리하고 있는 모든 파일을 출력한다. --cached 옵션과 똑같다.
git ls-files

 # 인덱스의 파일을 출력한다.
git ls-files --stage
```

## man

이 섹션은 git version 2.45.2 를 기준으로 삼는다.

### DESCRIPTION

>
This command merges the file listing in the index with the actual working directory list, and shows different combinations of the two.
>
Several flags can be used to determine which files are shown, and each file may be printed multiple times if there are multiple entries in the index or if multiple statuses are applicable for the relevant file selection options.

이 명령은 인덱스의 파일 목록과 실제 작업 디렉토리의 목록을 합쳐서 보여주거나, 그 둘의 다양한 조합들을 보여줍니다.

여러 플래그들을 지정하여 보여줄 파일들을 선택할 수 있습니다.
단, 인덱스에 여러번 등록되어 있거나 파일 선택 옵션에 여러 상태가 적용되는 경우라면, 각 파일은 중복으로 출력될 수도 있습니다.

### OPTIONS

#### -c, \--cached

> Show all files cached in Git’s index, i.e. all tracked files. (This is the default if no `-c`/`-s`/`-d`/`-o`/`-u`/`-k`/`-m`/`--resolve-undo` options are specified.)

Git이 추적하는 모든 파일들, 즉 Git 인덱스에 캐시된 모든 파일을 보여줍니다.
(`-c`/`-s`/`-d`/`-o`/`-u`/`-k`/`-m`/`--resolve-undo` 옵션이 지정되지 않는다면, 이 옵션이 기본값입니다.)

### -d, \--deleted

### -m, \--modified

### -o, \--others

### -i, \--ignored

### -s, \--stage

>
Show staged contents' mode bits, object name and stage number in the output.

스테이징된 컨텐츠의 모드 비트, 객체 이름, 스테이지 번호를 출력합니다.



## Links

- [git-ls-files (git-scm.com)](https://git-scm.com/docs/git-ls-files )

