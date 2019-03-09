---
layout  : category
title   : git
summary : 
date    : 2018-12-02 10:11:09 +0900
updated : 2019-01-29 16:43:48 +0900
tag     : git command
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

$ git log -L :func_name:file_name   # 특정 파일의 특정 함수의 히스토리를 본다. 함수 범위는 자동으로 인식한다
```

## 특정 커밋에서 변경된 파일 목록만 보기
```sh
$ git show f701c86 --name-only --pretty=""
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

## filter-branch 사용
```sh
$ git filter-branch --tree-filter 'rm -f passwords.txt' HEAD    # passwords.txt 파일을 모든 히스토리에서 삭제
$ git filter-branch --commit-filter '
    if [ "$GIT_AUTHOR_EMAIL" = "schacon@localhost" ];
    then
            GIT_AUTHOR_NAME="Scott Chacon";
            GIT_AUTHOR_EMAIL="schacon@example.com";
            git commit-tree "$@";
    else
            git commit-tree "$@";
    fi' HEAD    # 모든 커밋의 이메일 주소를 수정한다
```

# 참고문헌
* 프로 Git 2판 - 그림으로 이해하는 Git의 작동 원리와 사용법 / 스캇 샤콘, 벤 스트라웁 공저 / 박창우, 이성환, 최용재 공역 / 인사이트(insight) / 2016년 03월 30일

# Documents
