---
layout  : wiki
title   : 실험하며 공부하는 GIT
summary : 아직 작성중인 글입니다
date    : 2020-04-19 22:27:20 +0900
updated : 2023-05-29 12:49:10 +0900
tag     : 
resource: 82/7A8D95-910C-4E22-951E-5BFAA3AAAC67
toc     : true
public  : true
parent  : [[/git]]
latex   : false
---
* TOC
{:toc}

참고: 이 문서는 [[/git-tutorial]]이 너무 튜토리얼 같지 않다는 피드백을 받고 작성하기 시작한 것이다.

## 학습 준비
### alias

터미널에서 다음 명령을 실행해 `l` 알리아스를 추가하도록 하자. 잘 모르겠다면 복사해서 터미널에 붙여넣고 엔터를 입력하면 된다.

```sh
git config --global alias.l \
 "log \
 --color --graph --decorate \
 --date=format:'%Y-%m-%d' \
 --abbrev-commit \
 --pretty=format:'%C(red)%h%C(auto)%d %s %C(green)(%cr)%C(bold blue) %an'"
```

이 알리아스를 수시로 사용할 것이므로, 반드시 추가해주도록 한다.

이제 `~/.gitconfig` 파일을 열고 `[alias]` 항목에 `l` 알리아스가 추가되었는지 확인하자.

다음과 같이 추가되어 있으면 성공이다. 만약 없다면 다음을 복사해 붙여넣어도 된다.

```
[alias]
    l = "log \
        --color --graph --decorate \
        --date=format:'%Y-%m-%d' \
        --abbrev-commit \
        --pretty=format:'%C(red)%h%C(auto)%d %s %C(green)(%cr)%C(bold blue) %an'"
```

### 연습용 프로젝트 생성

다음과 같이 `git-education` 이라는 이름의 디렉토리를 만들고, `git init`을 실행해주자.

```sh
mkdir git-education
cd git-education
git init
```

## 생성된 .git 디렉토리를 살펴보자

`git init`을 실행했다면 `.git` 디렉토리가 생성된다.

`tree` 명령으로 `.git` 디렉토리의 내부를 들여다보자.

(`hooks`는 지금은 볼 필요가 없으므로 `tree` 명령의 `-I` 옵션을 사용하자.)

```sh
$ tree .git -I hooks
.git
├── HEAD
├── config
├── description
├── info
│   └── exclude
├── objects
│   ├── info
│   └── pack
└── refs
    ├── heads
    └── tags

8 directories, 16 files
```

외울 필요는 없다. 어차피 언제든지 `tree` 명령으로 `.git`의 내부를 볼 수 있기 때문이다.

## a.txt 파일을 add 해보자

다음과 같이 3 개의 파일을 만들어 보자.

```sh
echo aa > a.txt
echo bb > b.txt
echo aa > c-a.txt
```

그리고 이 세 파일 중에서 `a.txt` 파일만 `git add` 해 보자.

```sh
git add a.txt
```

`git status` 명령도 실행해 보자.

```sh
$ git status
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   a.txt
```

읽어보면 `git rm --cached a.txt` 명령을 실행하면 `unstage` 할 수 있다는 것을 알 수 있다.

즉, `a.txt` 파일이 `stage`되었다는 것을 알 수 있다.

이 때 `git ls-files` 명령을 입력하면 다음과 같이 `a.txt` 파일을 볼 수 있다.

```sh
$ git ls-files
a.txt
```

### add 의 결과 .git 디렉토리에 새로 생성된 파일들

git 초보자라면 여기에서 바로 `commit`을 하려 할 텐데, `commit`하지 말고 `tree` 명령으로 `.git` 디렉토리 내에 어떤 변화가 일어났는지 살펴보도록 하자.

```sh
$ tree .git -I hooks
.git
├── HEAD
├── config
├── description
├── index   <- 새로 추가됐다
├── info
│   └── exclude
├── objects
│   ├── e6  <- 새로 추가됐다
│   │   └── 1ef7b965e17c62ca23b6ff5f0aaf09586e10e9  <- 새로 추가됐다
│   ├── info
│   └── pack
└── refs
    ├── heads
    └── tags

8 directories, 6 files
```

3 줄이 추가됐음을 확인할 수 있다. 새로 추가된 것들은 다음과 같다.

- 파일 `index`
- 디렉토리 `e6`
    - 파일 `e6/1ef7b965e17c62ca23b6ff5f0aaf09586e10e9`

### index의 내용

먼저 `cat`과 `wc` 명령으로 `index` 파일에 대해 간단하게 조사해 보자.

```sh
$ cat .git/index
DIRC^�W7-ӨD^�W7-ӨDy62�����e�|b�#��_
�	Xn�a.txtbœ��c���,-�-�Sr��

$ cat .git/index | openssl sha256
b7185bf4bbfbac54ccf40d0df7b0e81f1b922d1be60a0579fdc6d22e02687a91

$ wc .git/index
       1       3     104 .git/index
```
`index` 파일의 용량은 `104` 바이트인 모양이다.

아쉽게도 사람이 읽을 수 없는 포맷으로 되어 있다(변화를 파악하기 쉽도록 sha256 값을 출력해 보았다).

그러나 `git ls-files --stage` 명령을 사용하면 `index`의 내용을 볼 수 있다.

```sh
$ git ls-files -s
100644 e61ef7b965e17c62ca23b6ff5f0aaf09586e10e9 0	a.txt
```

스페이스로 구분된 4개의 정보가 출력됐다. 이 정보들의 의미는 다음과 같다.

- `100644` - bits. 8진수로 표시된 숫자로 파일의 타입과 권한.[^jusung-1]
- `e61ef7b965e17c62ca23b6ff5f0aaf09586e10e9` - obejct name. 객체의 이름.
- `0` - stage number.
- `a.txt` - 파일의 이름.

### a.txt를 unstage하면 index는 어떻게 될까?

그렇다면 이제 `git rm --cached` 를 사용해 `a.txt`를 `unstage` 하면 어떻게 될까? 실험해보자.

```
$ git rm --cached a.txt
rm 'a.txt'

$ cat .git/index
DIRC9ؐ��5l~�r!l��'�A��

$ cat .git/index | openssl sha256
79dc0d556c3c637aad3efa1d3a1906e5abea7aa1ffdbb3d3ed9932eec3bf6954

$ wc .git/index
       0       1      32 .git/index

$ git ls-files -s

```

위의 실험으로 다음과 같은 사실을 확인할 수 있다.

- `index` 파일의 사이즈가 104 바이트에서 32 바이트로 줄어들었다.
- `index`에서 `a.txt` 파일이 제외되었다.

이제 다시 `add` 해보자.

```sh
$ git add a.txt

$ cat .git/index | openssl sha256
b7185bf4bbfbac54ccf40d0df7b0e81f1b922d1be60a0579fdc6d22e02687a91
```

이번엔 `b.txt` 를 `add` 해보자.

```sh
$ git add b.txt

$ cat .git/index | openssl sha256
f3d5ea975ca97c3413336c4193f36596fbafc33563008c8084c6ce324853dca0

$ wc .git/index
       1       3     176 .git/index

$ git ls-files -s
100644 e61ef7b965e17c62ca23b6ff5f0aaf09586e10e9 0	a.txt
100644 e0b3f1b09bd1819ed1f7ce2e75fc7400809f5350 0	b.txt
```

실습삼아 `c-a.txt`도 `add` 해보자.

이제 결과를 정리해보자.

| 순서 | staged                                | index 용량 | .git/index 의 sha256 값 | 설명                          |
|------|---------------------------------------|------------|-------------------------|-------------------------------|
| 1    | `a.txt`                               | 104 B      | `b7185bf4bbfb...`       | `a.txt`를 `stage`에 추가      |
| 2    |                                       | 32 B       | `79dc0d556c3c...`       | `a.txt`를 `stage`에서 제거    |
| 3    | `a.txt`                               | 104 B      | `b7185bf4bbfb...`       | `a.txt`를 `stage`에 다시 추가 |
| 4    | `a.txt` <br/> `b.txt`                 | 176 B      | `f3d5ea975ca9...`       | `b.txt`도 `stage`에 추가      |
| 5    | `a.txt` <br/> `b.txt` <br/> `c-a.txt` | 258 B      | `69da077363b7...`       | `c.txt`도 `stage`에 추가      |

## 파일 해시 값의 의미

그리고 `ls-files -s` 로 `stage`된 파일들의 목록을 확인해 보자.

```sh
$ git ls-files -s
100644 e61ef7b965e17c62ca23b6ff5f0aaf09586e10e9 0	a.txt
100644 e0b3f1b09bd1819ed1f7ce2e75fc7400809f5350 0	b.txt
100644 e61ef7b965e17c62ca23b6ff5f0aaf09586e10e9 0	c-a.txt
```

`add`했던 세 개의 파일을 확인할 수 있다. 그런데 잘 읽어보면 `a.txt`와 `c-a.txt` 파일의 해시값이 `e61ef7b9...e10e9`로 똑같다는 사실을 발견할 수 있다.

그 이유는 두 파일의 내용이 똑같기 때문이다.

```sh
$ cat a.txt
aa
$ cat c-a.txt
aa
$ diff a.txt c-a.txt

```

`git cat-file -p`를 사용해면 해시 값으로 파일의 내용을 출력해볼 수 있다.

```sh
$ git cat-file -p e61ef7b965e17c62ca23b6ff5f0aaf09586e10e9
aa
```

이 해시 값과 파일의 내용을 `.git/objects` 디렉토리에 보관하고 있다.

```sh
$ tree .git -I hooks
.git
├── HEAD
├── config
├── description
├── index
├── info
│   └── exclude
├── objects
│   ├── e0
│   │   └── b3f1b09bd1819ed1f7ce2e75fc7400809f5350
│   ├── e6
│   │   └── 1ef7b965e17c62ca23b6ff5f0aaf09586e10e9  <- 이 파일
│   ├── info
│   └── pack
└── refs
    ├── heads
    └── tags

9 directories, 7 files
```

`objects`의 하위 디렉토리 이름 `e6`와 파일 이름 `1ef7b9...`을 합쳐보면 `e61ef7b9...`가 된다.

첫 두 글자가 디렉토리가 되는 것이다. 16진수 두 글자이므로 디렉토리는 `00` 부터 `ff`까지 모두 256개가 존재할 수 있을 것이다.

즉, git 은 일종의 key-value 스토리지를 구현해 사용하고 있다.

이때 `value`는 파일의 내용을 압축한 것이고, `key`는 `value`의 SHA1 값이다.

따라서 `git`은 같은 내용을 가진 파일은 `.git/objects`에 따로따로 저장하지 않고 하나로 저장하는 것이다.

공간을 효율적으로 사용하면서 검색도 편리한 좋은 방법이다.

그런데 파일의 내용 말고 **파일의 이름**은 어디에 저장하는 것일까?

## Commit

그걸 알아보기 위해 `git commit` 명령으로 일단 첫번째 커밋을 해보자.

```sh
$ git commit
[master (root-commit) b1e3da0] Initial commit
 3 files changed, 3 insertions(+)
 create mode 100644 a.txt
 create mode 100644 b.txt
 create mode 100644 c-a.txt
```

`git log` 명령을 사용해 보면 이 커밋의 대략적인 정보를 볼 수 있다.

```
$ git log
commit b1e3da05289980f2eb11521683257305b1620a3f (HEAD -> master)
Author: JohnGrib <johngrib82@gmail.com>
Date:   Mon May 29 11:36:43 2023 +0900

    Initial commit
```

정보가 너무 많아서 복잡하니 처음에 설정했던 `git l` 알리아스를 사용해서 보도록 하자.

```
$ git l
* b1e3da0 (HEAD -> main) Initial commit (29 seconds ago) JohnGrib
```

commit 해시값 `b1e3da05289980f2eb11521683257305b1620a3f`가 `b1e3da0`로 축약되어 출력되는 것을 볼 수 있다.

이제 이 commit 에 어떤 정보가 담겼는지 확인해 보자.  `git cat-file -p` 명령을 사용하면 된다.

```sh
$ git cat-file -p b1e3da0
tree c8f8b7e0ad11143d1e3a7724def5b2744b9b9668
author JohnGrib <johngrib82@gmail.com> 1685327803 +0900
committer JohnGrib <johngrib82@gmail.com> 1685327803 +0900
gpgsig -----BEGIN PGP SIGNATURE-----

 iQIzBAABCAAdFiEEPrNLtUbPL1hEV/CL1bjZX7J58s8FAmR0D8IACgkQ1bjZX7J5
 8s/snQ/+JYdKvwOAGwSFrVvaBlowuagweK81nZaTYhsSZ2ruHzJoq8OpI2qPp8h9
 knsMZRzGi9LXfxXJ/8DAqT/BuC74C8+Fg2baHdDVPDkLu4g29RTL6eXm+FHJsG1P
 9GbvsqyWrfs0hUkRuQXAgVAjUlo8oD7+rWojswwoRx+5yk4U62zG6tMF//aJMVm2
 jyPyoKcUriHjO9sDQGM6QkjV/ONiFRk19bdBs/lhvI0LZAY2lHJsMEJuNH0UpLB4
 4UO2rJDQc1VabCPRqHoOiuR+zDYC2OUnJnLPXP4fJ1yqcQQz6nLnjv9qjrkOIQqE
 ClhxRrAAVGry58IaoIT358ulxfq6hfZtgctOKdVs6OXgwwmtuK1FDcKCYh3vsX8Y
 mmjA7i1T4na3HIGuVxAMHdf938KgkYXKt/TXTEhToxRE8n8Of9BgS4EJQpiQhIbC
 R5knpv2qVks0jBUSCepBsKK6WGMOQikO2imz01sNg3tKGt4Q/Xpalhh/b2nLkJIA
 5bOlOPqvGfz8XvsU9fGXCnBW/7lOAnqN1GtHX213Ic1bv2WS5ca2+csN878ZcpqI
 MA3siCnLZnm70Ul8156SQCCSrLfjUYgJK361sO0HD12pMIi8T2pDxNTmvcXTRBkQ
 lrXlFiCV/G/+ZHEv3vpZm9RY95aLbzRr2f5n7O1aNuGIhJa1BSU=
 =VgGp
 -----END PGP SIGNATURE-----

Initial commit
```

commit 의 내용을 보면 순서대로 다음의 정보들이 나열되어 있음을 알 수 있다.

- tree
- author
- committer
- gpg signature
    - `gpgsig -----BEGIN PGP SIGNATURE-----` 부터 `-----END PGP SIGNATURE-----` 까지.
    - 내가 커밋에 [[/gpg]]{gpg}로 서명을 하기 때문에 포함되어 있다.
    - 만약 이 글을 읽는 여러분이 커밋에 서명을 하고 있지 않다면 이 부분이 없을 것이다.
- commit message
    - 내가 작성한 `Initial commit` 이라는 커밋 메시지.

여기에서 `tree`에 주목해 보자.

`tree`는 무엇을 의미하는 것일까?

`tree`의 의미가 궁금하다면 옆에 있는 해시 값 `c8f8b7e0ad11143d1e3a7724def5b2744b9b9668`을 보도록 하자.

git은 기본적으로 key-value 스토리지이고, 해시 값을 key 로 사용하고 있으므로 무언가 해시 값이 보이면 값에 대해 `cat-file`로 읽어보면 의미를 파악하기 쉽다.

```sh
$ git cat-file -p c8f8b7e0ad11143d1e3a7724def5b2744b9b9668
100644 blob e61ef7b965e17c62ca23b6ff5f0aaf09586e10e9	a.txt
100644 blob e0b3f1b09bd1819ed1f7ce2e75fc7400809f5350	b.txt
100644 blob e61ef7b965e17c62ca23b6ff5f0aaf09586e10e9	c-a.txt
```

`tree c8f8b7e0...`의 내용은 3개의 해시값과 3개의 파일이라는 것을 확인할 수 있다.

## 해시값을 계산해 보자

key로 사용하는 해시값이 많이 등장하기 때문에 해시값을 어떻게 생성하는지 궁금할 것이다.

이번에는 해시값을 생성해 보자.

다음 포맷의 문자열을 만든 다음, SHA1 로 해싱하면 된다.

```
타입 길이\0내용
```

- 타입: blob, tree, commit 세 가지가 있다.
- 길이: 내용의 길이를 바이트 단위로 표현한 것. wc로 세면 쉽다.
- 내용: 파일의 내용이나, 트리의 내용, 커밋의 내용.
- `\0`: 널 문자. ASCII 코드로 0.

### a.txt 해시값 계산

워낙 짧아서 아직 잊지는 않았겠지만, `a.txt` 파일의 내용을 다시 한번 확인해 보자.

```sh
$ cat a.txt
aa
```

byte 길이를 재보면 `3`이 나온다.

```sh
$ wc -c < a.txt
       3
```

앗 `aa`는 2글자인데 왜 3이 나왔을까? 파일 마지막에 LF(`\n`, `0A`)가 있기 때문이다.

`xxd`로 파일을 읽어보면...

```sh
$ xxd -p a.txt
61610a
```

`a`를 의미하는 ASCII 값 `61`이 두 번 나오고, LF를 의미하는 ASCII 값 `0A`가 마지막에 한 번 나온다는 것을 확인할 수 있다.

아무튼 이제 `a.txt`의 길이를 알게 됐으니 다음과 같이 포맷을 맞출 수 있다. 파일의 내용은 `blob`이니 `blob`으로 시작하면 된다.

```
blob 3\0aa\n
```

이 값을 SHA1 로 해싱해보면 그동안 보아왔던 `e61ef7b9`가 나온다.

```sh
$ printf "blob 3\0aa\n" | openssl sha1
e61ef7b965e17c62ca23b6ff5f0aaf09586e10e9
```

물론 `openssl`이 아니라 다른 해싱 명령어를 사용해도 똑같은 결과가 나온다.

```sh
$ printf "blob 3\0aa\n" | shasum
e61ef7b965e17c62ca23b6ff5f0aaf09586e10e9  -

$ printf "blob 3\0aa\n" | sha1sum
e61ef7b965e17c62ca23b6ff5f0aaf09586e10e9  -
```

당연히 같은 방법으로 `b.txt`의 내용도 해시값을 출력해볼 수 있다.

```sh
$ printf "blob 3\0bb\n" | sha1sum
e0b3f1b09bd1819ed1f7ce2e75fc7400809f5350  -
```

이제 `ls-files`의 결과를 보면서 해시값을 확인해보자.

```sh
$ git ls-files -s
100644 e61ef7b965e17c62ca23b6ff5f0aaf09586e10e9 0	a.txt
100644 e0b3f1b09bd1819ed1f7ce2e75fc7400809f5350 0	b.txt
100644 e61ef7b965e17c62ca23b6ff5f0aaf09586e10e9 0	c-a.txt
```

### tree 해시값 계산

이번에는 저 세 파일을 포함하고 있는 tree의 해시값을 계산해 보자.

먼저 앞에서 살펴봤던 첫 커밋의 내용을 다시 조회해 보자.

```sh
$ git cat-file -p b1e3da0
tree c8f8b7e0ad11143d1e3a7724def5b2744b9b9668
author JohnGrib <johngrib82@gmail.com> 1685327803 +0900
committer JohnGrib <johngrib82@gmail.com> 1685327803 +0900
gpgsig -----BEGIN PGP SIGNATURE-----

 iQIzBAABCAAdFiEEPrNLtUbPL1hEV/CL1bjZX7J58s8FAmR0D8IACgkQ1bjZX7J5
 8s/snQ/+JYdKvwOAGwSFrVvaBlowuagweK81nZaTYhsSZ2ruHzJoq8OpI2qPp8h9
 knsMZRzGi9LXfxXJ/8DAqT/BuC74C8+Fg2baHdDVPDkLu4g29RTL6eXm+FHJsG1P
 9GbvsqyWrfs0hUkRuQXAgVAjUlo8oD7+rWojswwoRx+5yk4U62zG6tMF//aJMVm2
 jyPyoKcUriHjO9sDQGM6QkjV/ONiFRk19bdBs/lhvI0LZAY2lHJsMEJuNH0UpLB4
 4UO2rJDQc1VabCPRqHoOiuR+zDYC2OUnJnLPXP4fJ1yqcQQz6nLnjv9qjrkOIQqE
 ClhxRrAAVGry58IaoIT358ulxfq6hfZtgctOKdVs6OXgwwmtuK1FDcKCYh3vsX8Y
 mmjA7i1T4na3HIGuVxAMHdf938KgkYXKt/TXTEhToxRE8n8Of9BgS4EJQpiQhIbC
 R5knpv2qVks0jBUSCepBsKK6WGMOQikO2imz01sNg3tKGt4Q/Xpalhh/b2nLkJIA
 5bOlOPqvGfz8XvsU9fGXCnBW/7lOAnqN1GtHX213Ic1bv2WS5ca2+csN878ZcpqI
 MA3siCnLZnm70Ul8156SQCCSrLfjUYgJK361sO0HD12pMIi8T2pDxNTmvcXTRBkQ
 lrXlFiCV/G/+ZHEv3vpZm9RY95aLbzRr2f5n7O1aNuGIhJa1BSU=
 =VgGp
 -----END PGP SIGNATURE-----

Initial commit
```

출력 결과의 첫 번째 줄에 `tree`가 있다.
이것이 바로 첫 커밋의 tree의 해시값이다.

```
tree c8f8b7e0ad11143d1e3a7724def5b2744b9b9668
```

이 tree의 해시값 첫 네 글자인 `c8f8`로 조회해보면 tree의 내용은 파일 3개로 이루어져 있다.

```sh
$ git cat-file -p c8f8
100644 blob e61ef7b965e17c62ca23b6ff5f0aaf09586e10e9	a.txt
100644 blob e0b3f1b09bd1819ed1f7ce2e75fc7400809f5350	b.txt
100644 blob e61ef7b965e17c62ca23b6ff5f0aaf09586e10e9	c-a.txt
```

하지만 이것은 사람이 읽기 쉽게 출력한 것이고 실제로 `c8f8`의 내용은 다음과 같다.

```sh
$ git cat-file tree c8f8
100644 a.txt???e?|b?#??_
?	Xn?100644 b.txt??с????.u?t??SP100644 c-a.txt???e?|b?#??_
?	Xn?
```

해시값이 바이트값으로 출력이 됐기 때문에 사람이 읽기 쉽지 않은데, 이 출력값을 적절히 개행해보면 해시값만 알아보기 어렵다는 것을 알 수 있다. 즉 이상한 값으로 변형된 것이 아니라 표현 방법만 다른 것이다.

```sh
$ git cat-file tree c8f8 | LC_ALL=C tr '\n' ' ' | LC_ALL=C sed 's/10064/\n10064/g'

100644 a.txt???e?|b?#??_ ?	Xn?
100644 b.txt??с????.u?t??SP
100644 c-a.txt???e?|b?#??_ ?	Xn?
```

실제로 `xxd`를 사용해 출력해보면 `e61ef...`, `e01b3f...`가 다 들어가 있음을 알 수 있다.

```sh
$ git cat-file tree c8f8 | xxd -p
31303036343420612e74787400e61ef7b965e17c62ca23b6ff5f0aaf0958
6e10e931303036343420622e74787400e0b3f1b09bd1819ed1f7ce2e75fc
7400809f535031303036343420632d612e74787400e61ef7b965e17c62ca
23b6ff5f0aaf09586e10e9
```

다음은 위의 `xxd` 출력 결과를 알아보기 쉽게 내가 손으로 정돈해 본 것이다.

```sh
313030363434 20 612e74787400     e61ef7b965e17c62ca23b6ff5f0aaf09586e10e9
313030363434 20 622e74787400     e0b3f1b09bd1819ed1f7ce2e75fc7400809f5350
313030363434 20 632d612e74787400 e61ef7b965e17c62ca23b6ff5f0aaf09586e10e9
```

- `0x313030363434`: `100644`
- `0x20`: SP (스페이스)
- `0x612e74787400`: `a.txt`
    - <div id="a-txt-hex"></div>
- `0x622e74787400`: `b.txt`
- `0x632d612e74787400`: `c-a.txt`

| 61 | 2e | 74 | 78 | 74 | 00   |
|----|----|----|----|----|------|
| a  | .  | t  | x  | t  | NULL |
{:class="dynamic-insert" data-target-selector="#a-txt-hex"}


아무튼 포맷에 맞추기 위해 길이를 재보자.

```sh
$ git cat-file tree c8f8 | wc -c
     101
```

이제 다음과 같이 입력하면 `c8f8...` 을 얻을 수 있다.

```sh
$ (printf "tree 101\0"; git cat-file tree c8f8) | openssl sha1
c8f8b7e0ad11143d1e3a7724def5b2744b9b9668
```

### commit 해시값 계산

이제 commit의 해시값도 출력해보자.

```sh
$ git cat-file commit b1e3
tree c8f8b7e0ad11143d1e3a7724def5b2744b9b9668
author JohnGrib <johngrib82@gmail.com> 1685327803 +0900
committer JohnGrib <johngrib82@gmail.com> 1685327803 +0900
gpgsig -----BEGIN PGP SIGNATURE-----
 
 iQIzBAABCAAdFiEEPrNLtUbPL1hEV/CL1bjZX7J58s8FAmR0D8IACgkQ1bjZX7J5
 8s/snQ/+JYdKvwOAGwSFrVvaBlowuagweK81nZaTYhsSZ2ruHzJoq8OpI2qPp8h9
 knsMZRzGi9LXfxXJ/8DAqT/BuC74C8+Fg2baHdDVPDkLu4g29RTL6eXm+FHJsG1P
 9GbvsqyWrfs0hUkRuQXAgVAjUlo8oD7+rWojswwoRx+5yk4U62zG6tMF//aJMVm2
 jyPyoKcUriHjO9sDQGM6QkjV/ONiFRk19bdBs/lhvI0LZAY2lHJsMEJuNH0UpLB4
 4UO2rJDQc1VabCPRqHoOiuR+zDYC2OUnJnLPXP4fJ1yqcQQz6nLnjv9qjrkOIQqE
 ClhxRrAAVGry58IaoIT358ulxfq6hfZtgctOKdVs6OXgwwmtuK1FDcKCYh3vsX8Y
 mmjA7i1T4na3HIGuVxAMHdf938KgkYXKt/TXTEhToxRE8n8Of9BgS4EJQpiQhIbC
 R5knpv2qVks0jBUSCepBsKK6WGMOQikO2imz01sNg3tKGt4Q/Xpalhh/b2nLkJIA
 5bOlOPqvGfz8XvsU9fGXCnBW/7lOAnqN1GtHX213Ic1bv2WS5ca2+csN878ZcpqI
 MA3siCnLZnm70Ul8156SQCCSrLfjUYgJK361sO0HD12pMIi8T2pDxNTmvcXTRBkQ
 lrXlFiCV/G/+ZHEv3vpZm9RY95aLbzRr2f5n7O1aNuGIhJa1BSU=
 =VgGp
 -----END PGP SIGNATURE-----
```

```sh
$ git cat-file commit b1e3 | wc -c
    1032
```

```sh
$ (printf "commit 1032\0"; git cat-file commit b1e3) | openssl sha1
b1e3da05289980f2eb11521683257305b1620a3f
```

잘 출력된다.

## 주석

[^jusung-1]: [Jusung]( https://github.com/Jusung )님의 이슈 [#170](https://github.com/johngrib/johngrib.github.io/issues/170 )를 통해 잘못 작성된 내용 교정.

