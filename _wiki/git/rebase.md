---
layout  : wiki
title   : git rebase
summary : Reapply commits on top of another base tip
date    : 2022-04-16 22:35:01 +0900
updated : 2022-04-16 23:50:28 +0900
tag     : git
resource: 2B/CD2F8E-4B42-4D40-A5FE-1B2BD03F49B0
toc     : true
public  : true
parent  : [[/git]]
latex   : false
---
* TOC
{:toc}

## man
### SYNOPSIS

```
git rebase [-i | --interactive] [<options>] [--exec <cmd>]
       [--onto <newbase> | --keep-base] [<upstream> [<branch>]]
git rebase [-i | --interactive] [<options>] [--exec <cmd>] [--onto <newbase>]
       --root [<branch>]
git rebase (--continue | --skip | --abort | --quit | --edit-todo | --show-current-patch)
```

### DESCRIPTION

>
If \<branch> is specified, `git rebase` will perform an automatic `git switch <branch>` before doing anything else. Otherwise it remains on the current branch.
>
If \<upstream> is not specified, the upstream configured in branch.\<name>.remote and branch.\<name>.merge options will be used (see `git-config`(1) for details) and the `--fork-point` option is assumed.
If you are currently not on any branch or if the current branch does not have a configured upstream, the rebase will abort.

- `<branch>`를 지정했다면,
    - `git rebase`는 다른 작업을 하기 전에 제일 먼저 `git switch <branch>`를 수행합니다.
    - 지정하지 않았다면 현재 브랜치를 유지합니다.
- `<upstream>`이 지정되지 않았다면,
    - `branch.<name>.remote`와 `branch.<name>.merge`에 설정된 upstream을 사용합니다.
    - 그리고 `--fork-point` 옵션이 설정되었다고 칩니다.
    - (자세한 내용은 `git-config`(1)을 참조하세요)
- 만약 현재 브랜치가 없는 상태이거나, 현재 브랜치에 upstream이 설정되어 있지 않다면 rebase는 중단됩니다.

>
All changes made by commits in the current branch but that are not in \<upstream> are saved to a temporary area.
This is the same set of commits that would be shown by `git log <upstream>..HEAD`; or by `git log 'fork_point'..HEAD`, if `--fork-point` is active (see the description on `--fork-point` below); or by `git log HEAD`, if the `--root` option is specified.

- 현재 브랜치에서 커밋을 통해 만들어진 모든 변경사항들 중, `<upstream>`에 없는 것들은 임시 영역에 저장됩니다.
    - 이렇게 저장된 커밋들은 `git log <upstream>..HEAD`로 볼 수 있는 커밋들과 같습니다.
        - `--fork-point`가 설정되어 있다면 `git log 'fork_point'..HEAD`로도 볼 수 있습니다.
        - `--root` 옵션을 지정했다면 `git log HEAD`로도 볼 수 있습니다.

>
The current branch is reset to \<upstream>, or \<newbase> if the \--onto option was supplied.
This has the exact same effect as `git reset --hard <upstream>` (or `<newbase>`).
ORIG_HEAD is set to point at the tip of the branch before the reset.

- 현재 브랜치는 `<upstream>`로 설정되며, `--onto` 옵션이 지정되었다면 `<newbase>`로 설정됩니다.
    - 이 작업은 `git reset --hard <upstream>`(또는 `<newbase>`)와 똑같습니다.
    - `ORIG_HEAD`에는 reset 하기 직전의 브랜치의 마지막 커밋이 지정됩니다.

>
The commits that were previously saved into the temporary area are then reapplied to the current branch, one by one, in order.
Note that any commits in HEAD which introduce the same textual changes as a commit in HEAD..\<upstream> are omitted (i.e., a patch already accepted upstream with a different commit message or timestamp will be skipped).

- 그러고 나서 이전에 임시 공간에 저장한 커밋들이 현재 브랜치에 하나씩 순서대로 적용됩니다.
- `HEAD..<upstream>`에 포함된 커밋들과 똑같은 텍스트 변경을 도입하는 모든 커밋들은 작업 대상에서 제외됩니다.
    - 즉, 이미 upstream에 적용된 커밋들과 변경사항이 같다면, 커밋 메시지가 다르거나 타임스탬프가 달라도 생략됩니다.

>
It is possible that a merge failure will prevent this process from being completely automatic.
You will have to resolve any such merge failure and run `git rebase --continue`.
Another option is to bypass the commit that caused the merge failure with `git rebase --skip`.
To check out the original \<branch> and remove the .git/rebase-apply working files, use the command `git rebase --abort` instead.

- 작업들이 진행되는 도중에, 병합 실패가 발생하면 작업이 자동으로 완료되지 않고 중단될 수 있습니다.
- 여러분은 병합 실패 문제를 해결하고 나서, `git rebase --continue`를 실행해야 합니다.
- 또는 `git rebase --skip` 명령으로 병합 실패의 원인이 된 커밋을 건너뛰는 방법도 있습니다.
- 만약 원본 `<branch>`를 확인하고 `.git/rebase-apply` 작업 파일을 삭제하려면, `git rebase --abort` 명령을 사용하세요.

>
Assume the following history exists and the current branch is "topic":

다음과 같은 히스토리가 있을 때, 현재 브랜치가 `topic` 이라고 생각해 봅시다.

```
      A---B---C topic
     /
D---E---F---G master
```

>
From this point, the result of either of the following commands:

이 시점에서, 다음 명령의 결과는 아래와 같습니다.

```bash
git rebase master
git rebase master topic
```

>
would be:

```
              A'--B'--C' topic
             /
D---E---F---G master
```

>
**NOTE:** The latter form is just a short-hand of `git checkout topic` followed by `git rebase master`.
When rebase exits `topic` will remain the checked-out branch.

- 참고: 두 명령 중 후자는 `git rebase master`를 실행하고 나서 `git checkout topic`를 실행하는 축약 명령입니다.
- rebase 가 종료되면, `topic` 브랜치는 체크아웃을 마친 현재 브랜치가 됩니다.

>
If the upstream branch already contains a change you have made (e.g., because you mailed a patch which was applied upstream), then that commit will be skipped and warnings will be issued (if the `merge` backend is used).
For example, running `git rebase master` on the following history (in which `A'` and `A` introduce the same set of changes, but have different committer information):

- 만약 upstream 브랜치에 이미 변경 사항들이 포함되어 있다면, 그에 해당하는 커밋들은 작업을 건너뛰게 되며 경고가 뜰 것입니다. (뒷단에서 `merge`가 사용되는 경우)
- 예를 들어, 아래와 같은 히스토리에서 `git rebase master`를 실행한다고 해 봅시다. (여기에서 `A'`와 `A`는 동일한 변경 사항을 도입하지만, 커밋 정보는 다르다고 합시다)

```
      A---B---C topic
     /
D---E---A'---F master
```

>
will result in:

결과는 이렇습니다. (`A`가 `F`와 `C'` 사이에 없음)

```
               B'---C' topic
              /
D---E---A'---F master
```

>
Here is how you would transplant a topic branch based on one branch to another, to pretend that you forked the topic branch from the latter branch, using `rebase --onto`.

이번에는 `rebase --onto`를 사용해서 topic 브랜치를 다른 브랜치로 이식하는 방법을 알아봅시다.

>
First let’s assume your `topic` is based on branch `next`.
For example, a feature developed in `topic` depends on some functionality which is found in `next`.

먼저, `topic` 브랜치가 `next` 브랜치를 베이스로 삼고 있다고 해봅시다.

예를 들어, `topic` 브랜치에서 개발된 기능이 `next`에 있는 어떤 기능에 의존하고 있다고 합시다.

```
o---o---o---o---o  master
     \
      o---o---o---o---o  next
                       \
                        o---o---o  topic
```

>
We want to make `topic` forked from branch `master`; for example, because the functionality on which `topic` depends was merged into the more stable `master` branch.
We want our tree to look like this:

`master` 브랜치에서 분기된 `topic` 브랜치를 만들고 싶다고 합시다.
예를 들어, `topic`에서 의존하고 있었던 어떤 기능이 더 안정적인 `master` 브랜치에 병합된 상황이라 합시다.

그래서 그 결과가 다음과 같이 보이길 바란다고 생각해 봅시다.

```
o---o---o---o---o  master
    |            \
    |             o'--o'--o'  topic
     \
      o---o---o---o---o  next
```

>
We can get this using the following command:

다음 명령으로 이런 결과를 얻을 수 있습니다.

```bash
git rebase --onto master next topic
```

>
Another example of \--onto option is to rebase part of a branch.
If we have the following situation:

`--onto` 옵션의 또 다른 사용 예는 브랜치의 일부만 리베이스하는 것입니다.
다음과 같은 상황이 있다고 합시다.

```
                        H---I---J topicB
                       /
              E---F---G  topicA
             /
A---B---C---D  master
```

>
then the command

아래의 커맨드를 사용하면...

```bash
git rebase --onto master topicA topicB
```

>
would result in:

다음과 같은 결과가 나옵니다.

```
             H'--I'--J'  topicB
            /
            | E---F---G  topicA
            |/
A---B---C---D  master
```

>
This is useful when topicB does not depend on topicA.

이 방법은 `topicB`가 `topicA`에 의존하지 않을 때 유용합니다.

>
A range of commits could also be removed with rebase. If we have the following situation:

`rebase`를 사용해 여러 커밋을 범위 단위로 삭제할 수도 있습니다.
다음과 같은 상황이 있다고 합시다.

```
E---F---G---H---I---J  topicA
```

>
then the command

이 커맨드를 사용하면...

```bash
git rebase --onto topicA~5 topicA~3 topicA
```

>
would result in the removal of commits F and G:

`F`와 `G` 커밋이 사라진 결과가 나옵니다.

```
E---H'---I'---J'  topicA
```

>
This is useful if F and G were flawed in some way, or should not be part of topicA.
Note that the argument to \--onto and the \<upstream> parameter can be any valid commit-ish.

이런 작업은 `F`와 `G`에 뭔가 결함이 있거나, `topicA`에 포함되면 안될 때 유용합니다.

`--onto`와 `<upstream>`의 파라미터는 유효한 commit 이라면 무엇이든 가능합니다.

>
In case of conflict, `git rebase` will stop at the first problematic commit and leave conflict markers in the tree.
You can use `git diff` to locate the markers (`<<<<<<`) and make edits to resolve the conflict.
For each file you edit, you need to tell Git that the conflict has been resolved, typically this would be done with

conflict가 발생하면, `git rebase`는 문제가 생긴 첫 번째 커밋에서 작업을 중단하고, 트리에 conflict 표시를 남겨둡니다.

여러분은 `git diff`를 사용해서 이런 표시(`<<<<<<`)를 찾아보고, conflict를 해결하는 작업을 할 수 있습니다.

편집하는 각각의 파일들에 대해, 여러분이 직접 해당 파일들이 해결됐다는 것을 git에 알려줘야 합니다.
이렇게 알려주는 작업은 다음 명령을 쓰면 됩니다.

```bash
git add <filename>
```

>
After resolving the conflict manually and updating the index with the desired resolution, you can continue the rebasing process with

수동으로 직접 conflict를 해결한 다음, git index를 업데이트하고, 다음 명령으로 rebase 작업을 계속하도록 할 수 있습니다.

```bash
git rebase --continue
```

>
Alternatively, you can undo the `git rebase` with

`git rebase` 작업을 취소하고 되돌리고 싶다면 다음 명령을 쓰면 됩니다.

```bash
git rebase --abort
```

