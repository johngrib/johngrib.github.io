---
layout  : wiki
title   : git 교육 자료
summary : 내일 발표인데 오늘 밤에 만든, 회사 동료들을 위해 만든 학습 자료
date    : 2020-04-01 22:24:07 +0900
updated : 2020-08-06 23:33:44 +0900
tag     : git
toc     : true
public  : false
parent  : [[git]]
latex   : true
---
* TOC
{:toc}


![][xkcd]
[^xkcd]

>
- 이게 GIT 이야. 아름다운 분산 그래프 이론의 트리 모델을 통해 프로젝트의 공동 작업을 추적하지.
- 짱이다. 근데 그거 어떻게 사용하는거야?
- 잘 모르겠는데 이 셸 명령어들을 그냥 외워서 치면 동기화가 돼. 쓰다가 에러가 나면 어딘가에 작업물을 저장한 다음에, 프로젝트를 날려버리고 복사해 둔 걸 다시 다운받으면 돼.

## 학습 준비

```sh
mkdir gittest
cd gittest
git init
```

알아둘 사항들.

- git의 주요 자료는 `blob`, `tree`, `commit` 이다.
- git의 `commit` 하나하나는
    - `tree` 하나의 포인터를 갖는다.
    - 다른 `commit` 하나의 포인터를 갖는다. 이 `commit`을 부모 커밋이라 한다.
        - 머지 커밋은 부모 커밋이 2 개.
- `tree`는 해시 트리.
- `commit` 은 부모 커밋만 알고, 자식 커밋은 모른다.
    - 이 사실로 인해 `commit`들의 관계는 수학적으로 방향성 비순환 그래프(Directed Acyclic Graph)가 된다.

## git 은 Key-Value 스토리지
### 문자열을 저장해 보자

다음 명령은 `hello`라는 문자열을 git 스토리지에 저장하고, SHA1 Key 값을 출력한다.

```sh
$ echo 'hello' | git hash-object --stdin -w
ce013625030ba8dba906f756967f9e9ca394464a
```

(만약 `-w` 옵션을 제외하고 실행하면 Dry-Run으로 돌아가므로, 저장은 안 하고 Key 값만 출력한다.)

이 값이 바로 방금 저장한 값의 Key 이다.

SHA1은 160비트이고, 16진수 한 글자는 4비트이므로 이 해시값의 길이는 $$ \frac{160}{4} = 40 $$ 글자이다.

이제 저장된 `hello`를 찾아보자.

git 은 SHA1 값의 앞 두 글자로 디렉토리로 만들고, 나머지 38글자로 파일 이름을 만들어 보관한다.

그래서 다음과 같이 `find` 명령으로 Key를 검색할 수 있다.

```sh
$ find .git/objects | grep /ce
.git/objects/ce
.git/objects/ce/013625030ba8dba906f756967f9e9ca394464a
```

`git cat-file <SHA1> -t` 명령으로 이 파일의 타입을 알 수 있다. (`-t`는 type을 의미한다.)

```sh
$ git cat-file ce013625030ba8dba906f756967f9e9ca394464a -t
blob
```

`blob`는 **B**inary **L**arge **OB**ject를 말한다. (git에 저장되는 데이터는 `blob`과 `tree`로 나뉜다.)

`git cat-file <SHA1> -p` 명령으로 이 파일의 타입을 알 수 있다. (`-p`는 pretty print를 의미한다.)

아까 저장했던 `hello`가 보인다.

```sh
$ git cat-file ce013625030ba8dba906f756967f9e9ca394464a -p
hello
```

### 파일을 저장해 보자

먼저 다음과 같이 `hello world!` 라는 문자열을 갖는 txt 파일을 만들자.

```sh
$ echo hello world! > hello.txt
```

그리고 문자열을 저장할 때처럼 `git hash-object` 명령을 사용해 저장하면 된다.

```sh
$ git hash-object -w hello.txt
a0423896973644771497bdc03eb99d5281615b51
```

잘 저장됐는지 확인해 보자.

```sh
$ find .git/objects -type f
.git/objects/a0/423896973644771497bdc03eb99d5281615b51
.git/objects/ce/013625030ba8dba906f756967f9e9ca394464a
```

`a0/423896973644771497bdc03eb99d5281615b51`가 있는 것을 보니 잘 저장된 것 같다.

`git cat-file -p` 명령을 사용하면 git에 저장된 이 파일의 내용을 볼 수 있다.

```sh
$ git cat-file a0423896973644771497bdc03eb99d5281615b51 -p
hello world!
```

이제 `hello.txt` 파일의 내용을 `hello world!` 에서 `bye world!` 로 바꿔보자.
```sh
$ sed -i '' 's/hello/bye/' hello.txt
$ cat hello.txt
bye world!
```

이제 변경된 `hello.txt` 파일을 `git` 에 저장해 보자.

```sh
$ git hash-object -w hello.txt
983669544e7f8709ea5c74f455ed05d53404c376
```

파일을 읽어보면 잘 저장된 것을 확인할 수 있다.

```sh
$ git cat-file 983669544e7f8709ea5c74f455ed05d53404c376 -p
bye world!
```

`find` 명령으로 찾아보면 git에 저장된 데이터가 3개 라는 사실을 알 수 있다.

```sh
$ find .git/objects -type f
.git/objects/98/3669544e7f8709ea5c74f455ed05d53404c376
.git/objects/a0/423896973644771497bdc03eb99d5281615b51
.git/objects/ce/013625030ba8dba906f756967f9e9ca394464a
```

## tree를 공부하자

다음과 같이 dir1 이라는 이름의 디렉토리를 만들고 아까 만들었던 hello.txt를 집어넣었다.

그리고 `nice world!` 라는 내용을 갖는 `nice.txt` 파일도 만들어 넣었다.

```sh
$ tree .
.
└── dir1
    ├── hello.txt
    └── nice.txt
```

그리고 `.git/index` 파일을 확인해 보면, 아직 존재하지 않는 파일이라 한다.

```sh
$ ls .git/index
ls: .git/index: No such file or directory
```

이제 `git add` 명령을 사용한 다음, `index` 파일을 확인해 보면 다음과 같이 나온다.

```sh
$ git add dir1/hello.txt
$ cat .git/index
DIRC^��%;t�^���$�e\n����
                        �6iTN�	�\t�U��4�vdir1/hello.txt�:����
�v�0UNbr|Rr�
```

`index` 파일의 용량은 112 바이트.

```sh
$ ls -l .git/index
-rw-r--r--  1 johngrib  staff  112 Apr  1 23:07 .git/index
```

이제 `nice.txt`로 `add` 한 다음, `index` 파일을 조사해 보자.

```sh
$ git add dir1/nice.txt
$ ls -lh .git/index
-rw-r--r--  1 johngrib  staff   192B Apr  1 23:08 .git/index
```

192 바이트가 되었다.

첫번째 커밋을 만들어 보자.

```sh
$ git commit
```

그 다음 확인해 보면 `index` 파일이 더 커져 있다.

```sh
$ ls -lh .git/index
-rw-r--r--  1 johngrib  staff   254B Apr  1 23:11 .git/index
```

이제 다음 명령어로 `.git/object`에 있는 해시값을 조사해 보자.

```sh
$ for h in `find .git/objects -type f | sed -E 's,.*(..)/,\1,'`; \
    do echo $h $(git cat-file $h -t) ; \
    done

50e6b10741775dc9c3aa8aac5433c05c38ca19aa tree
57477b9e8dc464ea0ba76db48e2bf9a4224cf7d1 tree
983669544e7f8709ea5c74f455ed05d53404c376 blob
ba9f69907eafcd1db49e410fdfb12eddc4c37461 commit
a0423896973644771497bdc03eb99d5281615b51 blob
dbf4afefed25d940c50bd1982db33f11d8ce284d blob
ce013625030ba8dba906f756967f9e9ca394464a blob
```

`tree` 가 두 개 있다는 것을 알 수 있다.

첫번째 트리인 `50e6b10741775dc9c3aa8aac5433c05c38ca19aa`의 내용을 조사해 보자.
```sh
$ git cat-file 50e6b10741775dc9c3aa8aac5433c05c38ca19aa -p
040000 tree 57477b9e8dc464ea0ba76db48e2bf9a4224cf7d1	dir1
```

앗! 이 tree는 `57477b9e8dc464ea0ba76db48e2bf9a4224cf7d1`, 즉 `dir1`이 포함되어 있다는 사실을 알 수 있다. 즉, `50e6b10741775dc9c3aa8aac5433c05c38ca19aa`은 루트 디렉토리다.

두 번째 트리는 `57477b9e8dc464ea0ba76db48e2bf9a4224cf7d1`. 방금 위에서 본 루트 디렉토리 안에 있었던 트리이니 이것이 `dir1`이다.

## commit을 공부하자

먼저 작성한 첫번째 커밋은 다음과 같다.

```sh
$ git log
commit ba9f69907eafcd1db49e410fdfb12eddc4c37461 (HEAD -> master)
Author: John Grib <johngrib82@gmail.com>
Date:   Wed Apr 1 23:11:17 2020 +0900

    First commit

```

이 커밋 해시값을 `cat-file`로 조사하면 어떻게 나올까?

```sh
$ git cat-file -p ba9f69907eafcd1db49e410fdfb12eddc4c37461
tree 50e6b10741775dc9c3aa8aac5433c05c38ca19aa
author John Grib <johngrib82@gmail.com> 1585750277 +0900
committer John Grib <johngrib82@gmail.com> 1585750277 +0900
gpgsig -----BEGIN PGP SIGNATURE-----

 iQIzBAABCAAdFiEEeF5LeMXGx4vEae6QIYMbVLyA2ZAFAl6EoQoACgkQIYMbVLyA
 2ZDoXw/+JkUy8sN8ZzpaeFlQrsPBKQ4xZjP8CY1gFryiNgLE05XvfXvBQvgM1Zbl
 sbWSR0Q5lCbYZocDWZ1i3zo8/uaZSxY5+bvU4uIbUjB4jq/gfyJgK+FWmyZSuBNr
 kXzDNE7UaA1x9FblsVaoZLgL4gTqIyv7GX2CyHj+mDolfG/dZM+WKT7kjKN68ZTP
 KDA/S6vqZKtoF8kTQ4RHy51u6fpZnGqLOP9dNhjgJbtFZweF1spOIKbYYo1U4u/O
 i/SG5z5n4GfkflPOyqXzYhjy/gIvjmtqY0lq8VErXnizH1FvzGeHkfM5clATuGlD
 7St3dfz/O6U2PlhcE9ZJcGDNsxft0GjlGp1de1m9c4ZmB+iB+H7ATjfw3ojuQUyv
 M1yQo47zFDSyCXbe3rTmJY8ymWhIvZ4G68xNWdVpPSuh7cFv0pvR6KUIemrj5pc2
 1YvS8/K3G36KHuXMIAPL7Y29acjkFgSYCKZQ36snTFmSZi9NPWgEzHOYxQI3KAyy
 uDZ1C8dRTnpZgIgxI+Q+G8DjFx/m3jpmI2VaOGN07E2KdpkEbvADifOkYJ7ZDHaU
 fto7OjqSTyNIrxftjDtlpCXP3YWAFVcSJWSOkQSP6qZJv1FaXO4Bw7stt/Vctnti
 l8xbh7WitEr8Y0ZNu4fPWcQhjwrZ6RNfMdw/C1hxCSBmXxAeMqw=
 =P8C3
 -----END PGP SIGNATURE-----

First commit

```

나는 gpg로 커밋에 서명을 하기 때문에 중간에 PGP SIGNATURE가 나온다.

이 서명은 무시하고, 첫째 줄을 읽어보자.

```sh
$ git cat-file -p ba9f69907eafcd1db49e410fdfb12eddc4c37461 | head -1
tree 50e6b10741775dc9c3aa8aac5433c05c38ca19aa
```

앗 `50e6b10741775dc9c3aa8aac5433c05c38ca19aa`이 다시 나왔다. 이 해시는 프로젝트의 루트 트리였다.

이제 커밋을 하나 더 추가해보자.

먼저 nice.txt 에 `111`이라는 문자열을 추가하고 커밋해 보자.

```sh
$ echo 111 >> dir1/
hello.txt  nice.txt
$ echo 111 >> dir1/nice.txt
$ git add dir1/nice.txt
$ git commit
[master 0075146] Add 111 to nice.txt
 1 file changed, 1 insertion(+)
```

로그를 보면 두번째 커밋이 추가되어 있다.

```sh
$ git log
commit 0075146de266a55892ff4fdcf7c5f2fa49aa1295 (HEAD -> master)
Author: John Grib <johngrib82@gmail.com>
Date:   Wed Apr 1 23:29:24 2020 +0900

    Add 111 to nice.txt

commit ba9f69907eafcd1db49e410fdfb12eddc4c37461
Author: John Grib <johngrib82@gmail.com>
Date:   Wed Apr 1 23:11:17 2020 +0900

    First commit

```

이제 이 두번째 커밋의 상단을 조사해 보면 다음과 같은 내용을 볼 수 있다.

```sh
$ git cat-file -p 0075146de266a55892ff4fdcf7c5f2fa49aa1295 | head
tree dfac8e1bd45e04e0ce9fd990dc3a6767eb16c219
parent ba9f69907eafcd1db49e410fdfb12eddc4c37461
author John Grib <johngrib82@gmail.com> 1585751364 +0900
committer John Grib <johngrib82@gmail.com> 1585751364 +0900
gpgsig -----BEGIN PGP SIGNATURE-----

 iQIzBAABCAAdFiEEeF5LeMXGx4vEae6QIYMbVLyA2ZAFAl6EpUsACgkQIYMbVLyA
 2ZAQ4BAAjhWb49zIHvYFSaPipjv64Tmpdt5HTwWbiyNTOpmJ4NUYELh4X5c5XpJm
 zF379Wl909XtwOZycsz1YI4GwPpmzUPs4uVRS+291+SqYFVggWV1N/+Qe2x5S+20
 I9oHc2BZfm8/4eKlqg5uPCI1rBiQdOVuVGyyR0UlzwSnE7RvAKF2NTHSxpPduttZ
```

첫번째 줄에는 이 커밋이 지시하는 프로젝트의 루트 해시값이 있다.

두 번째 줄에는 `parent`가 있는데, 이것은 부모 커밋을 의미한다.

여기까지 알면 이 다음부터는 다 응용이다.

## 주석

[^xkcd]: 출처는 [xkcd: GIT][xkcd].
[xkcd]: https://imgs.xkcd.com/comics/git.png

