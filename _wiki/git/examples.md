---
layout  : wiki
title   : git 명령 예제, 팁 모음
summary : 가끔 써먹게 될 때마다 기록해두자
date    : 2022-01-16 13:53:32 +0900
updated : 2022-01-18 22:55:30 +0900
tag     : git
resource: 4D/EBAA7E-136B-45D4-906D-9904AA06CC80
toc     : true
public  : true
parent  : [[/git]]
latex   : false
giscus  : auto
---
* TOC
{:toc}

## rerere

`.git/rr-cache` 디렉토리를 만들면 `rerere`를 켤 수 있다.

## log 검색

```sh
git log --since=2.weeks   # 오늘부터 2주 전까지의 커밋 로그를 본다
git log -S test           # 변경사항 중 test 검색
git log --grep test       # test 를 포함하는 커밋 메시지 검색

git log ref_a..ref_b          # 범위로 로그를 조회한다
git log origin/master..HEAD   # origin/master 부터 로컬 헤드까지의 커밋을 본다

git log ref_a...refb --left-right # ref_a 와 ref_b 의 교집합이 아닌 커밋 목록을 보여준다
git log ref_a ref_b ^ref_c        # ref_a, ref_b 에는 있고, ref_c 에는 없는 커밋을 본다

git log -L :func_name:file_name   # 특정 파일의 특정 함수의 히스토리를 본다. 함수 범위는 자동으로 인식한다
```

## 특정 커밋에서 변경된 파일 목록만 보기

```sh
git show f701c86 --name-only --pretty=""
```

## tracked 파일 삭제

```sh
git rm test.txt           # 이후 commit 하면 git 은 test.txt 를 더 추적하지 않는다
git rm --cached test.txt  # 파일은 삭제하지 않고 git이 test.txt 를 더 추적하지 않게 한다
git rm \*.txt             # git rm 에서 * 을 사용하는 방법
```

## tracked 파일 이름 변경

```sh
$ git mv fileA fileB        # mv, git rm, git add 의 매크로
```

## tag

```sh
git tag               # tag 목록 보기
git tag -a tag_name           # annotated tag 붙이기. 이후 vim 이 실행되어 메시지를 작성하게 된다
git tag -a tag_name 8d2c77f   # 8d2c77f commit 에 tag 붙이기
git tag tag_name              # lightWeight tag 붙이기
git push orgin tag_name       # push tag
git push origin --tags        # push 모든 tag
```

## bisect 를 사용하여 이진탐색으로 버그가 있는 commit 찾기

```sh
git bisect start HEAD a42feb7
git bisect run test.sh        # test.sh : 오류가 없으면 0, 있으면 1을 리턴하는 셸 스크립트
```

## reflog 사용

```sh
git reflog        # 로컬 HEAD 히스토리를 본다. 너무 오래된 것은 볼 수 없다.
git show HEAD@{1} # 로컬 HEAD history 1번을 본다. 즉 git show HEAD 와 똑같다.
```

나는 `reflog` 명령이 오히려 번잡스러워 그냥 `.git/logs` 파일을 열어 확인하고 작업을 할 때가 더 많다.

## commit

```sh
# 커밋 메시지 작성에 참고할 수 있도록, 변경 사항도 보여준다
git commit -v
```

```sh
# pre-commit hook을 무시한다.
git commit --no-verify
```

## filter-branch 사용
```sh
# passwords.txt 파일을 모든 히스토리에서 삭제
git filter-branch --tree-filter 'rm -f passwords.txt' HEAD
```

다음은 Pro Git 2/E에 수록된 예제이다.[^pro-git-237]

```sh
# 이메일 주소가 target@localhost인 모든 커밋의 이메일 주소를 schacon@example.com 으로 수정한다
git filter-branch --commit-filter '
    if [ "$GIT_AUTHOR_EMAIL" = "schacon@localhost" ];
    then
            GIT_AUTHOR_NAME="Scott Chacon";
            GIT_AUTHOR_EMAIL="schacon@example.com";
            git commit-tree "$@";
    else
            git commit-tree "$@";
    fi' HEAD
```

아래의 명령을 사용하면 `시작커밋` 부터 `마지막커밋` 범위의 커밋 메시지를 [[/cmd/sed]] 로 편집하게 된다.

- 참고: [What's the fastest way to edit hundreds of Git commit messages?]( https://stackoverflow.com/questions/14332551/whats-the-fastest-way-to-edit-hundreds-of-git-commit-messages )

```sh
git filter-branch --msg-filter \
 'sed -E "s/pattern/replace/"' \
 시작커밋..마지막커밋
```

## show-branch

```sh
git show-branch b02f90c8 12ae872d
```

## 최초 커밋을 업데이트하기

* [stackoverflow]( https://stackoverflow.com/a/6637891 )

```sh
git update-ref -d HEAD
```

## 특정 커밋에서 특정 파일만 체크아웃

`git checkout --help`를 보면 알 수 있다.

```
git checkout (-p|--patch) [<tree-ish>] [--] [<pathspec>...]
```

이렇게 사용하면 된다.

```sh
git checkout 해시값 -- 파일경로
```

다음과 같은 상황에서 이 기능을 쓸 일이 있었다.

* 개발팀은 `develop`이라는 저장소를 쓴다.
* 디자인팀은 `design`이라는 저장소를 쓴다.
* 새로 개발하는 웹 페이지에 대해 디자인팀이 작성한 `scss` 파일이 필요하다.
    * 디자인팀의 작업 결과는 아직 `design` 저장소에만 있다.
    * 디자인팀이 관련 작업을 한 브랜치는 `new-scss`이다.

`design` 저장소 `new-scss`브랜치의 `cdn/scss` 디렉토리의 내용만 받기 위해서는 먼저 `new-scss`를 `git fetch`로 받은 다음,
다음과 같이 checkout 해주면 된다.

```sh
git checkout design/new-scss -- cdn/scss/
```

## 참고문헌

- 프로 Git 2판 - 그림으로 이해하는 Git의 작동 원리와 사용법 / 스캇 샤콘, 벤 스트라웁 공저 / 박창우, 이성환, 최용재 공역 / 인사이트(insight) / 2016년 03월 30일

## 주석

[^pro-git-237]: 프로 Git 2판. 7.6장. 237쪽.

