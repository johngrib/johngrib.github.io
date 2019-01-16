---
layout  : category
title   : git
summary : 
date    : 2018-12-02 10:11:09 +0900
updated : 2019-01-16 23:20:54 +0900
tags    : git command
toc     : true
public  : true
parent  : tools
latex   : false
---
* TOC
{:toc}

# Examples
## log 검색
```sh
$ git log --since=2.weeks   # 오늘부터 2주 전까지의 커밋 로그를 본다
$ git log -S test           # 변경사항 중 test 검색
$ git log --grep test       # test 를 포함하는 커밋 메시지 검색
```

## tracked 파일 삭제
```sh
$ git rm test.txt           # 이후 commit 하면 git 은 test.txt 를 더 추적하지 않는다
$ git rm --cached test.txt  # 파일은 삭제하지 않고 git 이 test.txt 를 더 추적하지 않게 한다
$ git rm \*.txt             # git rm 에서 * 을 사용하는 방법
```

## tracked 파일 이름 변경
```sh
$ git mv fileA fileB        # mv, git rm, git add 의 매크로
```

## tag
```sh
$ git tag               # tag 목록 보기
$ git tag -a tag_name           # annotated tag 붙이기. 이후 vim 이 실행, 메시지를 작성한다
$ git tag -a tag_name 8d2c77f   # 8d2c77f commit 에 tag 붙이기
$ git tag tag_name              # lightWeight tag 붙이기.
$ git push orgin tag_name       # push tag
$ git push origin --tags        # push 모든 tag
```

# Documents
