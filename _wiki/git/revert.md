---
layout  : wiki
title   : git revert
summary : Revert some existing commits
date    : 2023-05-05 17:28:51 +0900
updated : 2023-05-05 18:25:07 +0900
tag     :
resource: 48/28375A-5833-4A33-8D5C-6307856D242A
toc     : true
public  : true
parent  : [[/git]]
latex   : false
---
* TOC
{:toc}

- Version: Git 2.40.0 (2023-03-13)

## man

```
man git-revert
```

### SYNOPSIS

```
git revert [--[no-]edit] [-n] [-m <parent-number>] [-s] [-S[<keyid>]] <commit>...
git revert (--continue | --skip | --abort | --quit)
```

### DESCRIPTION

>
Given one or more existing commits, revert the changes that the related patches introduce, and record some new commits that record them.
This requires your working tree to be clean (no modifications from the HEAD commit).
>
Note: git revert is used to record some new commits to reverse the effect of some earlier commits (often only a faulty one).
If you want to throw away all uncommitted changes in your working directory, you should see git-reset(1), particularly the `--hard` option.
If you want to extract specific files as they were in another commit, you should see git-restore(1), specifically the `--source` option.
Take care with these alternatives as both will discard uncommitted changes in your working directory.
>
See "Reset, restore and revert" in git(1) for the differences between the three commands.

주어진 하나 이상의 커밋들과 관련된 패치가 도입하는 변경 사항을 되돌리고, 이를 기록하는 새로운 커밋들을 기록합니다.
이 작업을 하려면 작업 트리가 깨끗해야 합니다 (HEAD 커밋에서 수정 사항이 없어야 함).

참고: `git revert`는 이전 커밋(일반적으로 오류가 있는 커밋만)의 효과를 되돌리기 위해 새 커밋들을 기록하는 데에 사용되곤 합니다.
아직 커밋하지 않은 작업 디렉토리의 변경 사항을 모두 버리고 싶다면, git-reset(1)을 참고하세요. 특히 `--hard` 옵션을 참고하세요.
그리고 다른 커밋에 있는 특정 파일을 그대로 추출하고 싶다면, git-restore(1)을 참고하세요. 특히 `--source` 옵션을 참고하세요.
이 두 가지 옵션 모두 작업 디렉토리의 커밋되지 않은 변경 사항을 모두 삭제하므로 주의하세요.

세 명령의 차이점에 대해서는 git(1)의 "Reset, restore and revert"를 참고하세요.

### OPTIONS

#### `<commit>...`

>
Commits to revert.
For a more complete list of ways to spell commit names, see gitrevisions(7).
Sets of commits can also be given but no traversal is done by default, see git-rev-list(1) and its `--no-walk` option.

되돌릴(revert) 커밋.
커밋 이름을 지정하는 완전한 방법에 대해서는 gitrevisions(7) 문서를 참고하세요.
커밋 집합을 지정할 수도 있지만, 커밋 트리를 탐색하는 것은 default 동작이 아닙니다.
이에 대해서는 git-rev-list(1)와 `--no-walk` 옵션을 참고하세요.

#### `-e`, `--edit`

>
With this option, `git revert` will let you edit the commit message prior to committing the revert.
This is the default if you run the command from a terminal.

이 옵션을 사용하면, `git revert`는 revert를 커밋하기 전에 '커밋 메시지'를 편집할 수 있게 해줍니다.

#### `-m parent-number`, `--mainline parent-number`

>
Usually you cannot revert a merge because you do not know which side of the merge should be considered the mainline.
This option specifies the parent number (starting from 1) of the mainline and allows revert to reverse the change relative to the specified parent.
>
Reverting a merge commit declares that you will never want the tree changes brought in by the merge.
As a result, later merges will only bring in tree changes introduced by commits that are not ancestors of the previously reverted merge.
>
This may or may not be what you want.
>
See the revert-a-faulty-merge How-To[1] for more details.

일반적으로 merge 커밋을 revert하는 것은 불가능합니다.
왜냐하면 merge의 어느 쪽을 mainline으로 할 지를 알 수 없기 때문입니다.
이 옵션은 mainline의 부모 번호(1부터 시작)를 지정해서, revert 명령이 지정한 부모에 대해 변경 사항을 반대로 뒤집을 수 있게 해줍니다.

merge 커밋을 revert하는 것은, merge로 가져온 트리 변경 사항을 더 이상 원하지 않는다고 선언하는 것입니다.
따라서 나중에 merge를 하게 되면 이전에 revert한 merge의 조상이 아닌 커밋이 가져온 트리 변경 사항만 도입하게 됩니다.

이것은 사용자가 원하지 않는 결과를 가져올 수 있습니다.

더 자세한 내용은 잘못된 병합 되돌리기(revert-a-faulty-merge How-To[1])를 참고하세요.

#### `--no-edit`

>
With this option, git revert will not start the commit message editor.

이 옵션을 사용하면 `git revert`가 커밋 메시지 편집기를 시작하지 않습니다.

#### `--cleanup=<mode>`

>
This option determines how the commit message will be cleaned up before being passed on to the commit machinery.
See git-commit(1) for more details.
In particular, if the `<mode>` is given a value of scissors, scissors will be appended to MERGE_MSG before being passed on in the case of a conflict.

이 옵션은 커밋 메시지가 커밋 기능에 전달되기 전에 어떻게 정리(clean up)될 지를 결정합니다.

더 자세한 내용은 git-commit(1)을 참고하세요.

특히, 만약 `<mode>`에 scissors 값을 주면, 충돌이 발생한 경우 MERGE_MSG에 scissors가 추가됩니다.

#### `-n`, `--no-commit`

>
Usually the command automatically creates some commits with commit log messages stating which commits were reverted.
This flag applies the changes necessary to revert the named commits to your working tree and the index, but does not make the commits.
In addition, when this option is used, your index does not have to match the HEAD commit.
The revert is done against the beginning state of your index.
>
This is useful when reverting more than one commits' effect to your index in a row.

`git revert` 명령은 일반적으로는 어떤 커밋이 revert되었는지를 기록하는 커밋 메시지를 가진 커밋들을 자동으로 생성합니다.

그러나 이 플래그를 사용하면 주어진 커밋을 작업 트리와 인덱스에서 되돌리기 위해 필요한 변경 사항을 적용하긴 하지만, 커밋을 생성하지는 않습니다.
또한 이 옵션을 사용하면, 인덱스가 HEAD 커밋과 일치할 필요가 없습니다.
revert는 인덱스의 초기 상태에 대해 수행됩니다.

이것은 인덱스에 연속적으로 여러 커밋의 효과를 revert 하려는 경우에 유용합니다.

#### `-S[<keyid>]`, `--gpg-sign[=<keyid>]`, `--no-gpg-sign`

>
GPG-sign commits.
The `keyid` argument is optional and defaults to the committer identity; if specified, it must be stuck to the option without a space.
`--no-gpg-sign` is useful to countermand both `commit.gpgSign` configuration variable, and earlier `--gpg-sign`.

커밋에 GPG 서명을 합니다.
`keyid` 인자는 선택 옵션이고, 기본값은 커미터의 identity 입니다.
만약 `keyid`를 지정하려면 옵션 뒤에 공백 없이 붙여서 써야 합니다.
`--no-gpg-sign`은 `commit.gpgSign` 설정 변수와 이전의 `--gpg-sign`을 무효화할 때 유용합니다.

#### `-s`, `--signoff`

>
Add a Signed-off-by trailer at the end of the commit message. See the signoff option in git-commit(1) for more information.

커밋 메시지 끝에 Signed-off-by trailer를 추가합니다.
더 자세한 내용은 git-commit(1)의 `signoff` 옵션을 참고하세요.

#### `--strategy=<strategy>`

>
Use the given merge strategy.
Should only be used once.
See the MERGE STRATEGIES section in git-merge(1) for details.

지정한 merge 전략을 사용합니다.
전략은 한 번에 한 개만 지정할 수 있습니다.
더 자세한 내용은 git-merge(1)의 MERGE STRATEGIES 섹션을 참고하세요.

#### `-X<option>`, `--strategy-option=<option>`

>
Pass the merge strategy-specific option through to the merge strategy.
See git-merge(1) for details.

merge 전략에 대한 상세 옵션을 지정합니다.
더 자세한 내용은 git-merge(1)을 참고하세요.

#### `--rerere-autoupdate`, `--no-rerere-autoupdate`

>
After the rerere mechanism reuses a recorded resolution on the current conflict to update the files in the working tree, allow it to also update the index with the result of resolution.
`--no-rerere-autoupdate` is a good way to double-check what `rerere` did and catch potential mismerges, before committing the result to the index with a separate `git add`.

현재의 conflict에 대해 rerere 매커니즘이 기록한 해결 방법을 재사용하여 작업 트리의 파일을 업데이트한 후, 인덱스도 해결 결과로 업데이트할 수 있도록 합니다.

`--no-rerere-autoupdate`는 이후에 별도의 `git add`로 인덱스에 결과를 커밋하기 전에`rerere`가 무엇을 했는지를 재확인하고 잘못된 병합을 잡아내기 위한 좋은 방법입니다.

#### `--reference`

>
Instead of starting the body of the log message with "This reverts \<full object name of the commit being reverted>.", refer to the commit using "--pretty=reference" format (cf.  git-log(1)).

The `revert.reference` configuration variable can be used to enable this option by default.

로그 메시지를 "This reverts \<revert된 커밋의 전체 객체 이름>."로 시작하지 않고, 다른 커밋의 메시지를 `--pretty=reference` 포맷으로 참고하도록 합니다.

### SEQUENCER SUBCOMMANDS

#### `--continue`

>
Continue the operation in progress using the information in .git/sequencer.
Can be used to continue after resolving conflicts in a failed `cherry-pick` or `revert`.

`.git/sequencer`의 정보를 사용해 진행 중인 작업을 계속합니다.

실패한 `cherry-pick` 또는 `revert`에서 충돌을 해결한 후에 작업을 이어나가는 데 사용할 수 있습니다.

#### `--skip`

>
Skip the current commit and continue with the rest of the sequence.

현재 커밋을 건너뛰고 나머지 시퀀스를 계속 진행합니다.

#### `--quit`

>
Forget about the current operation in progress.
Can be used to clear the sequencer state after a failed `cherry-pick` or `revert`.

현재 진행중인 작업을 중단합니다.
`cherry-pick` 또는 `revert`에 실패한 후에 시퀀서 상태를 지우는 데 사용할 수 있습니다.

#### `--abort`

>
Cancel the operation and return to the pre-sequence state.

작업을 취소하고 시퀀스 이전 상태로 돌아갑니다.

### EXAMPLES

>
```bash
git revert HEAD~3
```

>
Revert the changes specified by the fourth last commit in HEAD and create a new commit with the reverted changes.

HEAD에서 네 번째 커밋의 변경 사항을 되돌리고, 되돌린 변경 사항을 포함하는 새 커밋을 만듭니다.

>
```bash
git revert -n master~5..master~2
```

>
Revert the changes done by commits from the fifth last commit in master (included) to the third last commit in master (included), but do not create any commit with the reverted changes.
The revert only modifies the working tree and the index.

master의 다섯 번째 커밋(포함)부터 세 번째 커밋(포함)까지의 변경 사항을 되돌리지만, 되돌린 변경 사항을 포함하는 커밋은 생성하지 않습니다.
revert의 작업 결과로 작업 트리와 인덱스만 변경됩니다.


### CONFIGURATION

>
Everything below this line in this section is selectively included from the git-config(1) documentation. The content is the same as what’s found there:

이 섹션의 내용은 git-config(1) 문서에서 일부를 선택해 가져온 것입니다.
따라서 원본 문서의 내용은 여기에 있는 것과 같습니다.

#### `revert.reference`

>
Setting this variable to `true` makes `git revert` behave as if the `--reference` option is given.

이 값을 `true`로 설정하면 `git revert`가 `--reference` 옵션을 지정한 것과 똑같이 작동합니다.

### SEE ALSO

>
git-cherry-pick(1)

### GIT

>
Part of the git(1) suite

### NOTES

>
1. revert-a-faulty-merge How-To git-htmldocs/howto/revert-a-faulty-merge.html
