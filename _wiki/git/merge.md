---
layout  : wiki
title   : git merge
summary : 
date    : 2022-04-09 17:09:07 +0900
updated : 2022-04-09 18:38:44 +0900
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
Incorporates changes from the named commits (since the time their histories diverged from the current branch) into the current branch.
This command is used by git pull to incorporate changes from another repository and can be used by hand to merge changes from one branch into another.

이름을 지정한 커밋들(해당 커밋들의 이력이 현재 브랜치에서 갈라져나간 이후)을 현재 브랜치에 통합시킵니다.

이 명령은 `git pull`명령에서 다른 저장소의 변경 사항을 통합하는 데 사용되며,
한 브랜치의 변경 사항을 다른 브랜치로 병합하기 위해 직접 사용할 수도 있습니다.

>
Assume the following history exists and the current branch is "master":

다음과 같은 히스토리가 있고, 현재 브랜치가 `master`라고 합시다.

```
      A---B---C topic
     /
D---E---F---G master
```

>
Then "`git merge topic`" will replay the changes made on the topic branch since it diverged from master (i.e., E) until its current commit (C) on top of master, and record the result in a new commit along with the names of the two parent commits and a log message from the user describing the changes.

그리고 `git merge topic` 명령을 사용하면, `master`에서 분기가 발생한 지점(E)부터 현재 커밋(C)까지 `topic` 브랜치에서 발생한 변경 사항을 재생(replace)하고 그 결과를 새로운 커밋에 기록합니다. 새로운 커밋은 두 부모 커밋과 연결되며, 사용자가 변경 사항에 대해 설명한 로그 메시지를 갖습니다.

```
      A---B---C topic
     /         \
D---E---F---G---H master
```

>
The second syntax ("`git merge --abort`") can only be run after the merge has resulted in conflicts.
`git merge --abort` will abort the merge process and try to reconstruct the pre-merge state.
However, if there were uncommitted changes when the merge started (and especially if those changes were further modified after the merge was started), `git merge --abort` will in some cases be unable to reconstruct the original (pre-merge) changes.
Therefore:
>
Warning: Running git merge with non-trivial uncommitted changes is discouraged: while possible, it may leave you in a state that is hard to back out of in the case of a conflict.

두 번째 문법인 `git merge --abort`는 merge 작업 중에 conflict가 발생한 경우에만 실행할 수 있습니다.

`git merge --aobrt`는 merge 프로세스를 중단하고, pre-merge 상태를 재구성하려 시도합니다.

그런데 merge가 시작될 때 커밋되지 않은 변경사항이 있다면 (그리고 merge가 시작된 이후에 변경 사항이 추가되었다면), `git merge --abort`는 경우에 따라 본래의(pre-merge) 변경 사항을 재구성하지 못하기도 합니다.

주의: 사소하지 않은 커밋되지 않은 변경사항이 있을 때 `git merge`를 실행하는 것은 추전하지 않습니다.
작업 중 충돌이 발생하면 복구하기 어려운 상태에 빠질 수도 있습니다.

>
The third syntax ("`git merge --continue`") can only be run after the merge has resulted in conflicts.

세 번째 문법인 `git merge --continue`도 merge 작업 중에 conflict가 발생한 경우에만 실행할 수 있습니다.

### OPTIONS

#### \--commit, \--no-commit

>
Perform the merge and commit the result.
This option can be used to override \--no-commit.

`--commit`은 merge를 수행하고, 그 결과를 commit합니다.
이 옵션은 `--no-commit` 옵션을 무시합니다.

>
With \--no-commit perform the merge and stop just before creating a merge commit, to give the user a chance to inspect and further tweak the merge result before committing.

`--no-commit`은 merge를 수행하고, merge 커밋을 생성하기 직전에 멈춥니다.
이렇게 하는 이유는 커밋을 생성하기 전에 사용자에게 merge 결과를 사용자가 확인하고 수정할 수 있는 여지를 주기 위해서입니다.

>
Note that fast-forward updates do not create a merge commit and therefore there is no way to stop those merges with \--no-commit.
Thus, if you want to ensure your branch is not changed or updated by the merge command, use \--no-ff with \--no-commit.

fast-forward 업데이트는 merge 커밋을 생성하지 않기 때문에 `---no-commit` 옵션을 사용해도 중단하지 못합니다.
그러므로, merge 명령으로 인해 branch가 변경되거나 업데이트되는 것을 막고 싶다면 `--no-commit` 이 아니라 `--no-ff` 옵션을 사용하세요.

#### \--edit, -e, \--no-edit

생략

#### \--cleanup=\<mode>

생략

#### \--ff, \--no-ff, \--ff-only

>
Specifies how a merge is handled when the merged-in history is already a descendant of the current history.

merge 완료된 히스토리가 현재 히스토리의 자손에 해당된다면 merge 처리 방법을 지정합니다.

>
\--ff is the default unless merging an annotated (and possibly signed) tag that is not stored in its natural place in the refs/tags/ hierarchy, in which case \--no-ff is assumed.
>
With \--ff, when possible resolve the merge as a fast-forward (only update the branch pointer to match the merged branch; do not create a merge commit).
When not possible (when the merged-in history is not a descendant of the current history), create a merge commit.

`--ff`는 기본값이며, `refs/tags/` 계층구조에 자연스럽게 저장되지 않은 주석이 달린 태그를 를 병합하는 경우에는 `--no-ff`로 전제하고 작업하게 됩니다.

`--ff`를 사용하면, 가능한 경우에 한해 merge를 fast forward로 해결합니다.
이 방법은 branch 포인터만 merge된 브랜치와 똑같이 업데이트하고 merge 커밋을 생성하지 않습니다.
만약 fast forward가 불가능한 경우라면(즉 merge된 히스토리가 현재 히스토리의 자손이 아닌 경우) merge 커밋을 생성합니다.

>
With \--no-ff, create a merge commit in all cases, even when the merge could instead be resolved as a fast-forward.

`--no-ff`를 사용하면 fast forward로 merge를 완료할 수 있는 경우에도 merge 커밋을 생성합니다.

>
With \--ff-only, resolve the merge as a fast-forward when possible. When not possible, refuse to merge and exit with a non-zero status.

`--ff-only`를 사용하면, 가능한 경우에 한해 merge를 fast forward로 해결합니다.
만약 fast forward로 해결할 수 없는 상황이라면 merge를 하지 않고 0이 아닌 상태(오류 상태)로 종료합니다.

#### -S[\<keyid>], \--gpg-sign[=\<keyid>], \--no-gpg-sign

#### \--log[=\<n>], \--no-log

#### \--signoff, \--no-signoff

#### \--stat, -n, \--no-stat

#### \--squash, \--no-squash

>
Produce the working tree and index state as if a real merge happened (except for the merge information), but do not actually make a commit, move the HEAD, or record $GIT_DIR/MERGE_HEAD (to cause the next `git commit` command to create a merge commit).
>
This allows you to create a single commit on top of the current branch whose effect is the same as merging another branch (or more in case of an octopus).

working tree와 index의 상태를 실제로 merge가 완료된 것과 같은 상태로 만들어 줍니다(merge 정보는 포함되지 않습니다).
그러나 실제로 커밋을 생성하거나, HEAD를 옮기거나, `$GIT_DIR/MERGE_HEAD`를 기록하지는 않습니다(뒤이어 이어지는 `git commit` 명령으로 merge 커밋을 생성하게 됩니다).

이 옵션을 통해 현재 브랜치에 다른 브랜치를 merge하는 것과 동일한 효과를 갖는 단일 커밋을 생성할 수 있습니다.

>
With \--no-squash perform the merge and commit the result. This option can be used to override \--squash.

`--no-squash`를 사용하면 merge를 수행하고 결과를 커밋합니다.
이 옵션은 `--squash`를 무시합니다.

>
With --squash, --commit is not allowed, and will fail.

`--squash`를 사용하면, `--commit` 옵션을 허용하지 않습니다.

#### --[no-]verify

#### -s \<strategy>, \--strategy=\<strategy>
