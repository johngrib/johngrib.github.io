---
layout  : wiki
title   : git rerere
summary : Reuse recorded resolution of conflicted merges
date    : 2025-05-12 20:56:50 +0900
updated : 2025-05-18 17:26:35 +0900
tag     : 
resource: B5/4B0EC8-C7B8-44EB-9DD9-DE2D0B754127
toc     : true
public  : true
parent  : [[/git]]
latex   : false
---
* TOC
{:toc}

## 개요

conflict를 해결했던 방법을 캐시로 남겨서, 중복 발생하는 conflict를 해결할 때 재활용하는 설정이다.

## 사용 방법

`.gitconfig` 파일에 다음과 같이 추가해준다.

```
[rerere]
    enabled = true
    autoUpdate = false
```

- `rerere.enabled` - `rerere` 기능을 활성화한다.
- `rerere.autoUpdate` - 이 값을 `true`로 하면 `rerere`를 통해 conflict를 해결할 때, 해결된 상태를 자동으로 스테이징해준다.

## 실습

### conflict 후 resolve하고 commit 하면 rr-cache에 해결 기록이 생성된다

다음과 같이 1,2,3을 각 라인마다 갖는 `test.md`라는 파일 하나를 만들고, `initial commit` 이라는 이름으로 커밋한다.

```bash
seq 3 > test.md && git commit -am 'initial commit'
```

이후 `aa` 브랜치를 만들고 파일을 수정해서 `2`를 `aa`로 바꿔준다. 간단하게 커밋 메시지는 `2 -> aa`라고 해준다.

그리고 `bb` 브랜치도 만들고 `2`를 `bb`로 바꿔준다. 여기에서도 커밋 메시지는 `2 -> bb`라고 작성한다.

이제 `aa` 브랜치와 `bb` 브랜치는 서로 merge 했을 때 충돌이 날 수 밖에 없는 상황이 되었다.

![]( /resource/B5/4B0EC8-C7B8-44EB-9DD9-DE2D0B754127/rerere-tutorial-01.svg )

이제 `rerere` 관련 2개 옵션을 켜준다.

```
git config rerere.enabled true
git config rerere.autoUpdate true
```

옵션이 켜진 것은 `git config` 명령을 또 입력해서 볼 수도 있지만 다음과 같이 [[/cmd/cat]]로 설정 파일을 확인해도 된다.

```
$ cat .git/config
[core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true
        ignorecase = true
[rerere]
        enabled = true
        autoUpdate = true
```

마지막에 추가된 것을 확인할 수 있다.

이제 `aa`브랜치로 가서 `bb` 브랜치를 `merge`해보자.

```bash
git switch aa
git merge bb
```

test.md 파일에서 CONFLICT가 발생할 것이다.

```
$ cat test.md
1
<<<<<<< HEAD
aa
=======
bb
>>>>>>> bb
3
```

이것을 다음과 같이 `cc`로 수정해서 CONFLICT를 해결해 주자.

```
1
cc
3
```

`commit`을 해주면 다음 그림과 같이 merge commit이 생성된다.

![]( /resource/B5/4B0EC8-C7B8-44EB-9DD9-DE2D0B754127/rerere-tutorial-02.svg )

여기까지는 일반적인 CONFLICT resolve라 할 수 있지만 `rerere`를 사용했기 때문에 `.git`에 해당 CONFLICT를 해결한 기록이 저장됐다.

이 기록은 `.git/rr-cache`에 남아있다. [[/cmd/tree]]로 확인해 보자.

```
$ tree .git/rr-cache/
.git/rr-cache/
└── d2ebce6e2826eaee8cf95825b04d390fa5171bbf
    ├── postimage
    └── preimage

2 directories, 2 files
```

`postimage`와 `preimage` 파일이 생성되었음을 알 수 있다. 이 두 파일의 내용을 읽어보면, `preimage`는 CONFLICT 발생 상황이고 `postimage`는 CONFLICT 해결 이후 상황이 저장된 것임을 알 수 있다.

```
$ head .git/rr-cache/d2ebce6e2826eaee8cf95825b04d390fa5171bbf/*
==> .git/rr-cache/d2ebce6e2826eaee8cf95825b04d390fa5171bbf/postimage <==
1
cc
3

==> .git/rr-cache/d2ebce6e2826eaee8cf95825b04d390fa5171bbf/preimage <==
1
<<<<<<<
aa
=======
bb
>>>>>>>
3
```

git rerere 옵션이 켜져 있고, 이 캐시가 남아있게 된다면 git은 `preimage`와 똑같은 CONFLICT가 발생했을 때 `postimage`를 사용해서 CONFLICT를 resolve하게 된다.

### 주의: cherry-pick을 할 때 의도하지 않게 이전의 CONFLICT resolve가 재활용되는 케이스

위의 케이스에 이어서 CONFLICT 재활용을 실험해 보자.

또다시 `test.md` 파일의 2번째 줄 `cc`를 `aa`로 수정해 주자.

이 상태에서 `2`를 `bb`로 편집하고 싶어서 과거의 커밋인 `2 -> bb`를 [[/git/cherry-pick]] 해주기로 했다.

여기에서 CONFLICT가 발생한다.

```
$ git cherry-pick bb
Auto-merging test.md
CONFLICT (content): Merge conflict in test.md
error: could not apply 9621a00... 2 -> bb
hint: After resolving the conflicts, mark them with
hint: "git add/rm <pathspec>", then run
hint: "git cherry-pick --continue".
hint: You can instead skip this commit with "git cherry-pick --skip".
hint: To abort and get back to the state before "git cherry-pick",
hint: run "git cherry-pick --abort".
hint: Disable this message with "git config advice.mergeConflict false"
Staged 'test.md' using previous resolution.
```

![]( /resource/B5/4B0EC8-C7B8-44EB-9DD9-DE2D0B754127/rerere-tutorial-03.svg )

하지만 `git status`를 입력해보면 CONFLICT가 이미 해결되어 있고 스테이징까지 되어 있다.

```
$ git status
On branch aa
You are currently cherry-picking commit 9621a00.
  (all conflicts fixed: run "git cherry-pick --continue")
  (use "git cherry-pick --skip" to skip this patch)
  (use "git cherry-pick --abort" to cancel the cherry-pick operation)

Changes to be committed:
        modified:   test.md
```

파일의 내용을 보면 [[/git/cherry-pick]]을 사용한 의도(`2`를 `bb`로 바꾸는 것)와는 달리 아까 CONFLICT를 해결한 방법이 재사용되어 `cc`가 들어가 있음을 알 수 있다.

```
$ cat test.md
1
cc
3
```

`git cherry-pick --continue` 해주면 커밋이 생성되고 작업이 끝난다.

```
$ git cherry-pick --continue
[aa 5b36e58] 2 -> bb
 Date: Sun May 18 16:33:07 2025 +0900
 1 file changed, 1 insertion(+), 1 deletion(-)
```

이런 방식으로 의도와 다르게 캐시가 사용되는 것을 막고 싶다면 `.git/rr-cache` 디렉토리를 삭제해 주면 된다.


## 주석

[^edit-how]: vim을 쓰건 sed를 쓰건 알아서 편집한다.
