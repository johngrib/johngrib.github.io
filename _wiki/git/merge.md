---
layout  : wiki
title   : git merge
summary : 
date    : 2022-04-09 17:09:07 +0900
updated : 2022-04-10 11:30:55 +0900
tag     : git
resource: D0/79C444-0D52-4A33-9B05-9AAD4AB9B61C
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

### HOW CONFLICTS ARE PRESENTED

>
During a merge, the working tree files are updated to reflect the result of the merge.
Among the changes made to the common ancestor’s version, non-overlapping ones (that is, you changed an area of the file while the other side left that area intact, or vice versa) are incorporated in the final result verbatim.
When both sides made changes to the same area, however, Git cannot randomly pick one side over the other, and asks you to resolve it by leaving what both sides did to that area.
>
By default, Git uses the same style as the one used by the "merge" program from the RCS suite to present such a conflicted hunk, like this:

merge를 작업하는 동안, 워킹 트리의 파일들은 merge 결과를 반영하도록 업데이트됩니다.
공통 조상 버전을 기준으로, 양쪽의 변경사항 중 겹치지 않는 것이 최종 결과에 통합됩니다.
하지만 양쪽에서 같은 영역을 변경한 경우, Git은 한 쪽을 스스로 선택할 수 없습니다. 따라서 해당 영역에 양쪽의 작업을 모두 남겨놓고 작업을 명령한 여러분에게 해결할 것을 요청합니다.

기본적으로, Git 다음과 같이 conflict가 발생한 덩어리를 표시하기 위해 RCS suite의 "merge" 프로그램 같은 스타일의 표기법을 사용합니다.

```
Here are lines that are either unchanged from the common
ancestor, or cleanly resolved because only one side changed,
or cleanly resolved because both sides changed the same way.
<<<<<<< yours:sample.txt
Conflict resolution is hard;
let's go shopping.
=======
Git makes conflict resolution easy.
>>>>>>> theirs:sample.txt
And here is another line that is cleanly resolved or unmodified.
```

>
The area where a pair of conflicting changes happened is marked with markers `<<<<<<<`, `=======`, and `>>>>>>>`.
The part before the `=======` is typically your side, and the part afterwards is typically their side.

양쪽의 충돌이 발생한 영역은 `<<<<<<<`, `=======`, `>>>>>>>`로 표시됩니다.
`=======` 이전 부분은 일반적으로 여러분 담당(your side)이며, 그 이후 부분은 보통 상대방 담당(their side)입니다.

>
The default format does not show what the original said in the conflicting area.
You cannot tell how many lines are deleted and replaced with Barbie’s remark on your side.
The only thing you can tell is that your side wants to say it is hard and you’d prefer to go shopping, while the other side wants to claim it is easy.

기본 포맷은 conflict가 발생한 영역의 original 내용을 보여주지는 않습니다. (양쪽의 내용을 보여줄 뿐입니다)
몇 줄이 삭제대로 수정되었는지 알 수 없는 것입니다.

알 수 있는 것은 그냥 여러분의 담당 영역에 충돌 해결이 어렵다는 말이 있고 쇼핑을 가고 싶어한다는 텍스트가 있다는 것과,
상대방 영역에서는 충돌 해결이 쉽다는 말이 있다는 것입니다.

>
An alternative style can be used by setting the "merge.conflictStyle" configuration variable to either "diff3" or "zdiff3". In "diff3" style, the above conflict may look like this:

`merge.conflictStyle` 설정을 `diff3` 이나 `zdiff3`으로 설정하면 이런 기본 설정을 바꿀 수 있습니다.
`diff3` 스타일의 경우 위의 conflict는 다음과 같이 보이게 됩니다.

```
Here are lines that are either unchanged from the common
ancestor, or cleanly resolved because only one side changed,
<<<<<<< yours:sample.txt
or cleanly resolved because both sides changed the same way.
Conflict resolution is hard;
let's go shopping.
||||||| base:sample.txt
or cleanly resolved because both sides changed identically.
Conflict resolution is hard.
=======
or cleanly resolved because both sides changed the same way.
Git makes conflict resolution easy.
>>>>>>> theirs:sample.txt
And here is another line that is cleanly resolved or unmodified.
```

>
while in "zdiff3" style, it may look like this:


`zdiff3` 스타일이면 이렇습니다.

```
Here are lines that are either unchanged from the common
ancestor, or cleanly resolved because only one side changed,
or cleanly resolved because both sides changed the same way.
<<<<<<< yours:sample.txt
Conflict resolution is hard;
let's go shopping.
||||||| base:sample.txt
or cleanly resolved because both sides changed identically.
Conflict resolution is hard.
=======
Git makes conflict resolution easy.
>>>>>>> theirs:sample.txt
And here is another line that is cleanly resolved or unmodified.
```

>
In addition to the `<<<<<<<`, `=======`, and `>>>>>>>` markers, it uses another `|||||||` marker that is followed by the original text.
You can tell that the original just stated a fact, and your side simply gave in to that statement and gave up, while the other side tried to have a more positive attitude.
You can sometimes come up with a better resolution by viewing the original.

`<<<<<<<`, `=======`, `>>>>>>>` 마커에 추가로 `|||||||` 마커를 사용하며, 이 마커 이후에는 원본(original) 텍스트를 보여준다는 것을 알 수 있습니다.
읽어보면 원본은 사실을 있는 그대로 이야기했고, 상대방은 긍정적인 태도로 노력한 반면, 여러분은 굴복하고 포기했음을 알 수 있습니다.
가끔은 원본을 읽으면 더 좋은 해결을 찾을 수 있을 것입니다.

### HOW TO RESOLVE CONFLICTS

>
After seeing a conflict, you can do two things:
>
- Decide not to merge. The only clean-ups you need are to reset the index file to the `HEAD` commit to reverse 2. and to clean up working tree changes made by 2. and 3.; `git merge --abort` can be used for this.
- Resolve the conflicts. Git will mark the conflicts in the working tree. Edit the files into shape and `git add` them to the index. Use `git commit` or `git merge --continue` to seal the deal. The latter command checks whether there is a (interrupted) merge in progress before calling `git commit`.

conflict가 발생하면, 두 가지를 할 수 있습니다.

- 머지하지 않기로 결정한다. 상황을 정리하기 위해 필요한 작업은, index 파일을 `HEAD` 커밋으로 reset하여 2로 돌려놓고, 2와 3에 의해 수행된 워킹 트리 변경 사항을 정리하는 것입니다. 이 작업을 위해 `git merge --abort` 명령을 사용할 수 있습니다.
- conflict를 해결한다. Git은 워킹 트리 내의 conflict 지점에 표시를 합니다. 해당 파일들을 편집해 맞춰놓고, `git add` 명령을 써서 index에 추가하세요. `git commit` 이나 `git merge --continue` 명령으로 이런 conflict 해결 작업을 마칠 수 있습니다. 두 명령 중 후자는 `git commit` 명령을 내부적으로 호출하기 전에 merge가 진행중인지(또는 중단됐는지)를 확인합니다.

>
You can work through the conflict with a number of tools:
>
- Use a mergetool.  `git mergetool` to launch a graphical mergetool which will work you through the merge.
- Look at the diffs.  `git diff` will show a three-way diff, highlighting changes from both the `HEAD` and `MERGE_HEAD` versions.
- Look at the diffs from each branch.  `git log --merge -p <path>` will show diffs first for the `HEAD` version and then the `MERGE_HEAD` version.
- Look at the originals.  `git show :1:filename` shows the common ancestor, `git show :2:filename` shows the `HEAD` version, and `git show :3:filename` shows the `MERGE_HEAD` version.

다음과 같이 여러 도구들을 사용해 conflict를 해결할 수 있습니다.

- mergetool을 사용하세요.
    - `git mergetool` 명령을 쓰면 머지를 진행할 그래픽 도구를 시작하게 됩니다.
- diff 를 살펴보세요.
    - `git diff` 명령은 `HEAD`와 `MERGE_HEAD` 두 버전의 변경사항을 강조하는 3-way diff를 보여줍니다.
- 원본을 살펴보세요.
    - `git show :1:filename`은 공통 조상을 보여줍니다.
    - `git show :2:filename`은 `HEAD` 버전을 보여줍니다.
    - `git show :3:filename`는 `MERGE_HEAD` 버전을 보여줍니다.

### EXAMPLES

> - Merge branches fixes and enhancements on top of the current branch, making an octopus merge:
```bash
$ git merge fixes enhancements
```

현재 브랜치에 여러 수정 사항과 개선 사항을 합치기 위해 octopus merge를 수행합니다.

> - Merge branch obsolete into the current branch, using ours merge strategy:
```bash
$ git merge -s ours obsolete
```

사용하지 않는 브랜치를 현재 브랜치에 머지합니다. 머지 전략은 `ours`를 사용합니다.

> - Merge branch maint into the current branch, but do not make a new commit automatically:
```bash
$ git merge --no-commit maint
```
This can be used when you want to include further changes to the merge, or want to write your own merge commit message.  
You should refrain from abusing this option to sneak substantial changes into a merge commit. Small fixups like bumping release/version name would be acceptable.

maint 브랜치를 현재 브랜치에 머지합니다. 하지만 자동으로 커밋이 생성되지 않게 합니다.

이 방법은 merge에 변경사항을 따로 추가하거나, 커밋 메시지를 직접 작성하려는 경우에 쓰면 됩니다.

이 옵션을 남용해 merge 커밋에 많은 양의 변경 사항을 몰래몰래 넣는 일을 삼가해야 합니다. release/version 이름을 수정하는 것 같은 작은 변경은 괜찮습니다.

### MERGE STRATEGIES

>
The merge mechanism (`git merge` and `git pull` commands) allows the backend `merge strategies` to be chosen with `-s` option.
Some strategies can also take their own options, which can be passed by giving `-X<option>` arguments to `git merge` and/or `git pull`.

merge 메커니즘(`git merge`와 `git pull` 명령)을 사용할 때 `-s` 옵션으로 백엔드 `merge strategies`를 선택할 수 있습니다.
종류에 따라 어떤 전략은 자신만 옵션을 갖고 있기도 합니다.
이런 옵션들은 `git merge`와 `git pull` 명령에 `-X<option>` 인자를 주는 방식으로 지정할 수 있습니다.

#### ort

>
This is the default merge strategy when pulling or merging one branch.
This strategy can only resolve two heads using a 3-way merge algorithm.
When there is more than one common ancestor that can be used for 3-way merge, it creates a merged tree of the common ancestors and uses that as the reference tree for the 3-way merge.
This has been reported to result in fewer merge conflicts without causing mismerges by tests done on actual merge commits taken from Linux 2.6 kernel development history.
Additionally this strategy can detect and handle merges involving renames.
It does not make use of detected copies.
The name for this algorithm is an acronym ("Ostensibly Recursive’s Twin") and came from the fact that it was written as a replacement for the previous default algorithm, recursive.

- `ort`는 브랜치 하나를 pull 하거나 merge 할 때 사용하는 기본 merge 전략입니다.
- 이 전략은 3-way merge 알고리즘을 사용하며, 2개의 헤드만 처리할 수 있습니다.
- 만약 3-way merge에 사용할 수 있는 공통 조상이 둘 이상이라면, `ort` 전략은 공통 조상들의 merged tree를 만들고, 이 트리를 3-way merge의 레퍼런스 트리로 사용합니다.
- Linux 2.6 커널 개발할 때 실제로 발생했던 merge 커밋들로 테스트했을 때 잘못된 merge를 만들지 않으면서 merge conflict도 감소시키는 것으로 보고됐습니다.
- 이 전략은 detected copy를 사용하지 않습니다.
- 이 알고리즘의 이름 `ort`는 "Ostensibly Recursive’s Twin"의 약어이며, 이전 버전의 기본 merge 알고리즘인 recursive를 대체하기 위해 만들어졌다는 사실에서 따온 것입니다.

>
The `ort` strategy can take the following options:

`ort` 전략은 다음과 같은 옵션들이 있습니다.

##### ours

>
This option forces conflicting hunks to be auto-resolved cleanly by favoring `our` version.
Changes from the other tree that do not conflict with our side are reflected in the merge result.
For a binary file, the entire contents are taken from our side.

이 옵션은 clonflict가 발생한 덩어리들에 `our` 버전을 우선하게 해서 자동으로 깔끔하게 해결되게 합니다.
our 쪽과 충돌하지 않는 다른 트리의 변경 사항은 merge 결과에 반영됩니다.
만약 바이너리 파일이라면 파일의 전체 내용을 our 쪽에서 가져옵니다.

>
This should not be confused with the `ours` merge strategy, which does not even look at what the other tree contains at all.
It discards everything the other tree did, declaring `our` history contains all that happened in it.

이 옵션을 `ours` merge 전략과 헷갈리면 안됩니다. `ours` merge 전략은 다른 트리에 포함된 내용을 전혀 고려하지 않는 전략입니다.
`ours` 전략은 다른 트리의 모든 것을 버려 버리고, `our` 히스토리에 포함된 모든 것만이 실제 역사라고 선언합니다.

##### theirs

>
This is the opposite of `ours`; note that, unlike `ours`, there is no `theirs` merge strategy to confuse this merge option with.

`ours`의 반대입니다.
`ours` 전략과 헷갈리는 `ours` 옵션과는 달리, `theirs` 전략은 없기 때문에 이 옵션은 헷갈리지 않을 것입니다.


##### ignore-space-change, ignore-all-space, ignore-space-at-eol, ignore-cr-at-eol

>
Treats lines with the indicated type of whitespace change as unchanged for the sake of a three-way merge.
Whitespace changes mixed with other changes to a line are not ignored.
See also `git-diff`(1) `-b`, `-w`, `--ignore-space-at-eol`, and `--ignore-cr-at-eol`.
>
- If `their` version only introduces whitespace changes to a line, `our` version is used;
- If `our` version introduces whitespace changes but `their` version includes a substantial change, `their` version is used;
- Otherwise, the merge proceeds in the usual way.

3-way merge를 할 때 공백 타입의 변경이 있는 라인을 변경되지 않았다고 간주하고 처리합니다.
같은 라인 안에 다른 변경 사항과 공백 변경이 섞여 있다면 무시하지 않습니다.
`git-diff`(1) `-b`, `-w`, `--ignore-space-at-eol`, `--ignore-cr-at-eol`도 참고하세요.

- `their` 버전이 한 라인에 공백 변경만 추가한 것이라면, `our` 버전을 사용합니다.
- `our` 버전이 공백 변경을 추가하지만, `their` 버전에는 상당한 변경이 포함되어 있다면, `their` 버전을 사용합니다.
- 그 외의 경우에는 일반적인 방법으로 merge가 진행됩니다.

##### renormalize

>
This runs a virtual check-out and check-in of all three stages of a file when resolving a three-way merge.
This option is meant to be used when merging branches with different clean filters or end-of-line normalization rules.
See "Merging branches with differing checkin/checkout attributes" in `gitattributes`(5) for details.

이 옵션을 사용하면 3-way merge를 해결할 때, 파일의 세 stage 모두에 대한 가상 check-out 및 check-in을 실행합니다.
이 옵션은 다른 clean 필터 또는 end-of-line normalization 규칙을 가진 브랜치와 merge할 때 사용할 수 있습니다.

자세한 내용은 `gitattributes`(5)의 "체크인/체크아웃 속성이 다른 브랜치 병합"을 참조하세요.

##### no-renormalize

>
Disables the `renormalize` option.
This overrides the `merge.renormalize` configuration variable.

`renormalize` 옵션을 끕니다. 이 옵션은 `merge.renormalize` 설정값을 무시합니다.

##### find-renames[=<n>]

>
Turn on rename detection, optionally setting the similarity threshold.
This is the default.
This overrides the merge.renames configuration variable.
See also `git-diff`(1) `--find-renames`.

rename 감지를 켭니다. 유사성 임계값을 설정할 수도 있습니다.
이 옵션은 기본값이며, 이 옵션을 명시하면 `merge.renames` 설정값을 무시합니다.
`git-diff`(1) `--find-renames`를 참조하세요.

##### rename-threshold=<n>

> Deprecated synonym for find-renames=<n>.

이제 사용되지 않으며, `find-renames=<n>`로 대체되었습니다.

##### subtree[=<path>]

>
This option is a more advanced form of `subtree` strategy, where the strategy makes a guess on how two trees must be shifted to match with each other when merging.
Instead, the specified path is prefixed (or stripped from the beginning) to make the shape of two trees to match.

이 옵션 `subtree` 전략의 발전된 형태로, merge할 때 두 트리가 서로 일치하도록 이동시켜 맞추는 방법을 추측합니다.
지정된 경로에 prefix를 붙이거나(또는 시작부분부터 제거) 해서 두 트리의 모양이 갖도록 맞춥니다.

#### recursive


#### resolve


#### octopus



#### ours


#### subtree
