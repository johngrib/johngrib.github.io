---
layout  : wiki
title   : git cherry-pick
summary : 
date    : 2022-04-05 23:44:19 +0900
updated : 2022-04-06 00:05:03 +0900
tag     : git
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






