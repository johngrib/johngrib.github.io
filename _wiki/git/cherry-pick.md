---
layout  : wiki
title   : git cherry-pick
summary : 
date    : 2022-04-05 23:44:19 +0900
updated : 2022-04-09 16:55:25 +0900
tag     : git
resource: E3/A42C58-8477-4141-ABFB-53FB131AF829
toc     : true
public  : true
parent  : [[/git]]
latex   : false
---
* TOC
{:toc}

## man

### DESCRIPTION

>
Given one or more existing commits, apply the change each one introduces, recording a new commit for each. This requires your working tree to be clean (no modifications from the HEAD commit).
>
When it is not obvious how to apply a change, the following happens:
>
> 1. The current branch and HEAD pointer stay at the last commit successfully made.
> 2. The CHERRY_PICK_HEAD ref is set to point at the commit that introduced the change that is difficult to apply.
> 3. Paths in which the change applied cleanly are updated both in the index file and in your working tree.
> 4. For conflicting paths, the index file records up to three versions, as described in the "TRUE MERGE" section of git-merge(1). The working tree files will include a description of the conflict bracketed by the usual conflict markers `<<<<<<<` and `>>>>>>>`.
> 5. No other modifications are made.
>
> See git-merge(1) for some hints on resolving such conflicts.

하나 이상의 기존 커밋을 이 명령에 제공하면, 각 커밋이 도입한 변경 사항을 적용해서 각각의 새 커밋을 생성합니다. 이 작업을 하려면 작업 트리가 깨끗해야 합니다(HEAD 커밋으로부터 변경 사항이 없어야 합니다).

변경 사항을 적용이 애매한 경우라면 다음과 같은 일들이 발생하게 됩니다.

1. 현재 branch와 및 HEAD는 성공적으로 만들어진 마지막 커밋을 보고 있음.
2. 적용하기 어려운 변경 사항을 도입한 커밋을 가리키도록 CHERRY_PICK_HEAD ref가 설정됩니다.
3. 변경 사항이 깔끔하게 적용 완료된 경로는 인덱스 파일과 작업 트리에 업데이트되어 있습니다.
4. 충돌하는 경로(conflicting paths)의 경우 인덱스 파일은 git-merge(1)의 "TRUE MERGE" 섹션에 설명된 대로 최대 세 가지 버전을 기록합니다. 작업 트리 파일에는 일반적인 충돌 표시자 `<<<<<<` 및 `>>>>>>>`로 묶인 충돌에 대한 설명이 포함됩니다.
5. 그 외의 다른 수정사항이 만들어지지 않습니다.

## Examples

### fast forwad가 가능한 경우

![]( ./exam-00.svg)

- [a0]( https://github.com/johngrib/git-examples/commit/2601ac167a5b7f9ce8ebe8e9daa49c3aa1743510 ), [a1]( https://github.com/johngrib/git-examples/commit/11b3a50e929289ff2caa3a4c3ecef57bf890454c )

`br-1`에서 `a1`을 `cherry-pick` 하면...

```bash
git switch br-1
git cherry-pick a1
```

새로운 커밋 `a11`이 생성되며, `br-1`은 `a11`을 포인팅하게 된다.

![]( ./exam-01.svg)

- [a11]( https://github.com/johngrib/git-examples/commit/f3bde6a17dc094034fbe24327596f928d163d956 )

`merge`와는 달리 `cherry-pick`은 기본적으로 fast forward를 하지 않는다.
따라서 `a11`은 새로 생성된 커밋이며, `a1`과는 다른 해시값을 갖고 있다.

물론 커밋의 해시값이 다를 뿐이며, 두 커밋이 바라보고 있는 `tree`의 해시값은 똑같다.

```bash
$ git cat-file -p a1 | grep tree
tree a049352084659b9b87816f3fc8d4b37137ba6d32

$ git cat-file -p a11 | grep tree
tree a049352084659b9b87816f3fc8d4b37137ba6d32
```

그러므로 `git diff`로 비교해 보거나 [github에서 comapare 해보아도]( https://github.com/johngrib/git-examples/compare/f3bde6a..11b3a50 ) 비교할 것이 없다는 결과만 나온다.

```bash
$ git diff a1 a11

```

만약 새로운 커밋을 생성하는 것이 불필요하게 느껴진다면(하지만 보통은 이럴 필요가 없다) `--ff` 옵션을 줘서 fast forward 방식으로 `cherry-pick`을 할 수도 있다.

```bash
git switch br-1
git reset --hard a0
git cherry-pick a1 --ff
```

그러면 다음과 같이 `br-1` 파일이 `a1`을 포인팅하는 것으로 수정될 뿐, 새로운 커밋을 생성하지는 않는다.

![]( ./exam-01-ff.svg)

다만, fast forward를 할 수 없는 상황이라면 `--ff` 옵션을 사용할 수 없으니 주의한다.
물론 `cherry-pick`은 `--ff`를 쓸 일이 아예 없다시피 하다.

### \-\-no-commit 옵션의 사용

다음 상태를 보자. `br-2`에서는 파일 A를 수정한 커밋 두 개를 갖고 있다. 이 때 `br-1`에서 `a2`를 `cherry-pick` 하면..

![]( ./exam-02.svg)

- [a0]( https://github.com/johngrib/git-examples/commit/2601ac167a5b7f9ce8ebe8e9daa49c3aa1743510 ), [a2]( https://github.com/johngrib/git-examples/commit/51a07467459f27ab244ffd6f0d67b1e498127c13 )

```bash
git switch br-1
git reset --hard a0
git cherry-pick a2
```

다음과 같이 새로운 커밋 `a21`이 생성되고 `br-1`은 `a21`을 포인팅하며, 파일 `A`의 내용은 `cc`만 포함되어 있다.

![]( ./exam-02-result.svg)

- [a21]( https://github.com/johngrib/git-examples/commit/51a07467459f27ab244ffd6f0d67b1e498127c13 )

그런데 새로운 커밋을 생성하지 않고, 변경사항만 가져오고 싶다면 `--no-commit`, `-n` 옵션을 사용할 수 있다.

```bash
git reset --hard a0
git cherry-pick a2 -n
```

이렇게 하면 커밋이 추가되지 않고, 가져온 변경사항이 스테이징에 추가되어 있다.

![]( /resource/E3/A42C58-8477-4141-ABFB-53FB131AF829/exam-02-n.svg )

![]( /resource/E3/A42C58-8477-4141-ABFB-53FB131AF829/exam-02-n-terminal.jpg )

