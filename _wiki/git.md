---
layout  : category
title   : git
summary : 
date    : 2018-12-02 10:11:09 +0900
updated : 2019-01-19 23:23:30 +0900
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

$ git log ref_a..ref_b          # 범위로 로그를 조회한다
$ git log origin/master..HEAD   # origin/master 부터 로컬 헤드까지의 커밋을 본다

$ git log ref_a...refb --left-right # ref_a 와 ref_b 의 교집합이 아닌 커밋 목록을 보여준다
$ git log ref_a ref_b ^ref_c        # ref_a, ref_b 에는 있고, ref_c 에는 없는 커밋을 본다
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

## bisect 를 사용하여 이진탐색으로 버그가 있는 commit 찾기
```sh
$ git bisect start HEAD a42feb7
$ git bisect run test.sh        # test.sh : 오류가 없으면 0, 있으면 1을 리턴하는 셸 스크립트
```

## reflog 사용
```sh
$ git reflog        # 로컬 HEAD 히스토리를 본다. 너무 오래된 것은 볼 수 없다.
$ git show HEAD@{1} # 로컬 HEAD history 1번을 본다. 즉 git show HEAD 와 똑같다.
```

## commit
```sh
$ git commit -v     # 커밋 메시지 작성에 참고할 수 있도록, 변경 사항도 보여준다
```

# Documents
