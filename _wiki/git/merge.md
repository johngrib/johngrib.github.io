---
layout  : wiki
title   : git merge
summary : 
date    : 2022-04-09 17:09:07 +0900
updated : 2022-04-10 01:12:27 +0900
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

#### \--squash, \--no-squash

>
Produce the working tree and index state as if a real merge happened (except for the merge information), but do not actually make a commit, move the HEAD, or record $GIT_DIR/MERGE_HEAD (to cause the next `git commit` command to create a merge commit).
>
This allows you to create a single commit on top of the current branch whose effect is the same as merging another branch (or more in case of an octopus).

working tree와 index의 상태를 실제로 merge가 완료된 것과 같은 상태로 만들어 줍니다(merge 정보는 포함되지 않습니다).
그러나 실제로 커밋을 생성하거나, HEAD를 옮기거나, `$GIT_DIR/MERGE_HEAD`를 기록하지는 않습니다(뒤이어 이어지는 `git commit` 명령으로 merge 커밋을 생성하게 됩니다).

이 옵션을 통해 현재 브랜치에 다른 브랜치를 merge하는 것과 동일한 효과를 갖는 단일 커밋을 생성할 수 있습니다.
(octopus merge를 하는 경우라면 여러 커밋을 생성할 수도 있습니다)

>
With \--no-squash perform the merge and commit the result. This option can be used to override \--squash.

`--no-squash`를 사용하면 merge를 수행하고 결과를 커밋합니다.
이 옵션은 `--squash`를 무시합니다.

>
With \--squash, \--commit is not allowed, and will fail.

`--squash`를 사용하면, `--commit` 옵션을 허용하지 않습니다.

#### \--[no-]verify

>
By default, the pre-merge and commit-msg hooks are run. When `--no-verify` is given, these are bypassed.
See also githooks(5).

기본적으로 merge를 할 때에는 `pre-merge`와 `commit-msg` hook이 실행됩니다.
`--no-verify`를 사용하면 이런 hook을 실행하지 않습니다.

#### -s \<strategy>, \--strategy=\<strategy>

>
Use the given merge strategy; can be supplied more than once to specify them in the order they should be tried.
If there is no -s option, a built-in list of strategies is used instead (ort when merging a single head, octopus otherwise).

주어진 merge 전략을 사용합니다.
merge 전략은 시도할 순서대로 제공할 수 있으므로, 하나 이상 지정할 수 있습니다.
만약 `-s` 옵션이 없다면, 기본적으로 내장된 전략들이 사용됩니다(단일 head일 경우에는 `ort`, 그 외의 경우에는 `octopus`).

#### \--autostash, \--no-autostash

>
Automatically create a temporary stash entry before the operation begins, record it in the special ref `MERGE_AUTOSTASH` and apply it after the operation ends.
>
This means that you can run the operation on a dirty worktree.
>
However, use with care: the final stash application after a successful merge might result in non-trivial conflicts.

작업이 시작되기 전에 임시 stash 항목을 자동으로 만들고, 특수한 ref인 `MERGE_AUTOSTASH`에 기록한 다음, 작업이 끝났을 때 `apply` 합니다.

즉, 이 옵션을 사용하면 worktree가 지저분한 상태에서도 머지 작업을 수행할 수 있게 됩니다.

그러나 merge가 성공적으로 완료된 이후의 stash 적용은 conflict를 일으킬 수 있다는 점을 주의해야 합니다.

### PRE-MERGE CHECKS

>
Before applying outside changes, you should get your own work in good shape and committed locally, so it will not be clobbered if there are conflicts.
See also git-stash(1).
`git pull` and `git merge` will stop without doing anything when local uncommitted changes overlap with files that `git pull`/`git merge` may need to update.

외부 변경 사항을 적용하기 전에, 먼저 작업 상태를 바람직한 형태로 만들어 놓고 로컬에서 커밋을 해둬야 컨플릭트가 발생해도 큰 문제가 되지 않습니다.
이에 대해 `git-stash(1)` 문서도 참고 두세요.

`git pull`과 `git merge`는 로컬에 커밋되지 않은 변경 사항이 있고, 그 변경 사항들이 `git pull`/`git merge`가 업데이트할 파일들과 충돌하는 경우에는 아무것도 수행하지 않습니다.

>
To avoid recording unrelated changes in the merge commit, `git pull` and `git merge` will also abort if there are any changes registered in the index relative to the `HEAD` commit.
(Special narrow exceptions to this rule may exist depending on which merge strategy is in use, but generally, the index must match HEAD.)

`HEAD` 커밋 기준으로 인덱스에 등록된 변경 사항이 있는 경우라면, merge 커밋에 관게 없는 변경 사항을 기록하는 것을 방지하기 위해 `git pull` `git merge`은 작업을 중단합니다.
(merge 전략별로 이 규칙에 대한 예외가 있을 수도 있지만, 일반적으로 인덱스는 HEAD와 일치해야 합니다.)

>
If all named commits are already ancestors of `HEAD`, `git merge` will exit early with the message "Already up to date."

만약 모든 커밋이 이미 `HEAD`의 조상이라면, `git merge`는 "Already up to date."라는 메시지를 남기고 종료됩니다.

### FAST-FORWARD MERGE

>
Often the current branch head is an ancestor of the named commit.
This is the most common case especially when invoked from `git pull`: you are tracking an upstream repository, you have committed no local changes, and now you want to update to a newer upstream revision.
In this case, a new commit is not needed to store the combined history; instead, the `HEAD` (along with the index) is updated to point at the named commit, without creating an extra merge commit.
>
This behavior can be suppressed with the `--no-ff` option.

종종 현재 브랜치의 head가 머지 대상으로 지정한 커밋의 조상일 때가 있습니다.
이런 경우는 보통 `git pull`에 merge를 호출할 때 일반적으로 발생합니다.
upstream repository를 따라가고 있고, 로컬에서 변경사항을 커밋하지 않았을 때 upstream의 최신 버전으로 업데이트하려 하는 상황이 이런 경우입니다.
이럴 때에 히스토리를 통합하기 위해 새로운 커밋을 만들지 않아도 됩니다.
그러는 대신 `HEAD`(인덱스 포함)가 포인팅하는 대상을 머지 대상 커밋으로 지정하도록 업데이트하고 끝냅니다.

이러한 동작은 `--no-ff` 옵션을 사용하여 무시할 수 있습니다.

### TRUE MERGE

>
Except in a fast-forward merge (see above), the branches to be merged must be tied together by a merge commit that has both of them as its parents.

fast-forward merge를 제외하고, merge 되어야 하는 브랜치들은 양쪽을 부모로 삼는 merge 커밋으로 연결되어야 합니다.

>
A merged version reconciling the changes from all branches to be merged is committed, and your HEAD, index, and working tree are updated to it.
It is possible to have modifications in the working tree as long as they do not overlap; the update will preserve them.

merge할 모든 브랜치의 변경사항을 조정하는 merged version이 커밋되고 나면, HEAD, index, working tree도 그에 맞춰 업데이트됩니다.
작업이 겹치지만 않는다면 워킹 트리에 있는 변경사항은 유지될 수 있습니다. 업데이트를 해도 변경 사항은 보존됩니다.

>
When it is not obvious how to reconcile the changes, the following happens:
>
1. The `HEAD` pointer stays the same.
2. The `MERGE_HEAD` ref is set to point to the other branch head.
3. Paths that merged cleanly are updated both in the index file and in your working tree.
4. For conflicting paths, the index file records up to three versions: stage 1 stores the version from the common ancestor, stage 2 from `HEAD`, and stage 3 from `MERGE_HEAD` (you can inspect the stages with `git ls-files -u`). The working tree files contain the result of the "merge" program; i.e. 3-way merge results with familiar conflict markers `<<< === >>>`.
5. No other changes are made. In particular, the local modifications you had before you started merge will stay the same and the index entries for them stay as they were, i.e. matching `HEAD`.


만약 변경 사항을 조정하는 방법이 명확하지 않다면, 다음과 같은 일들이 벌어집니다.

1. HEAD 포인터가 변경되지 않습니다.
2. `MERGE_HEAD` ref가 다른 브랜치의 head를 포인팅하도록 설정됩니다.
3. 깔끔하게 merge된 히스토리 경로는 index 파일과 워킹 트리에도 업데이트됩니다.
4. conflict가 발생한 경로의 경우, index 파일은 최대 3개의 버전을 저장합니다.
    - stage 1: 공통 조상의 버전을 저장
    - stage 2: `HEAD`의 버전을 저장
    - stage 3: `MERGE_HEAD`의 버전을 저장 (`git ls-files -u` 명령으로 각 stage들을 조사할 수 있습니다)
    - 워킹 트리 파일들은 "merge" 프로그램의 결과를 포함하는데, `<<<`, `===`, `>>>` conflict 표시가 있는 3-way merge 결과가 그 내용입니다.
5. 그 외에 다른 변경 사항은 없습니다. 특히, merge를 시작하기 전의 로컬 변경 사항은 그대로 유지됩니다. index 항목들도 그대로 유지됩니다. 즉, `HEAD`와 일치합니다.

>
If you tried a merge which resulted in complex conflicts and want to start over, you can recover with `git merge --abort`.

만약 merge를 시도했는데 복잡한 conflict가 발생해서, 처음부터 다시 시도하고 싶다면 `git merge --abort` 명령을 사용해서 복구할 수 있습니다.

