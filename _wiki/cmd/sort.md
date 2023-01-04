---
layout  : wiki
title   : sort
summary : 정렬한다
date    : 2018-08-31 09:14:52 +0900
updated : 2022-12-30 23:12:06 +0900
tag     : bash sort command
resource: 0F/C08091-20AE-4A88-83AD-0735D902E917
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## 사용법

### 기본적인 사용법

* 파일의 내용을 라인 단위로 정렬해 출력한다.

```sh
$ sort filename
```

* `-r`, `--reverse`: 파일의 내용을 역순으로 정렬해 출력한다.

```sh
$ sort -r filename
```

* `-n`, `--numeric-sort`: 숫자로 정렬한다.

```sh
$ # 기본 옵션으로 정렬하면 194, 35를 문자열로 정렬하므로 194가 앞서게 된다
$ sort test

194
35
522

$ # 숫자 옵션으로 정렬해야 35가 194보다 앞서게 된다.
$ sort -n test

35
194
522
```

* `-u`, `--unique`

```sh
$ cat sorted
35
35
194
522

$ sort -u sorted
194
35
522
```

* `-c`, `--check`: 정렬되었는지 체크한다.
    * `-u` 옵션과 섞어서 쓰면 중복된 값이 있어도 보고를 출력한다.

```sh
$ # 숫자로 정렬한 파일 sorted를 준비한다
$ sort -n test > sorted
$ cat sorted
35
194
522

$ # 랜덤하게 섞어놓은 파일 randomed를 준비한다
$ sort -R test > randomed
$ cat randomed
522
194
35

$ # randomed 는 정렬되었는가? 비정렬된 부분에 대한 보고가 출력된다.
$ sort -c randomed
sort: randomed:2: disorder: 194

$ # sorted 가 정렬되었는가? 정렬되지 않았다는 결과가 나온다
$ sort -c sorted
sort: sorted:2: disorder: 194

$ # sorted 가 숫자로 정렬되었는가? 숫자로 정렬된 상태이므로 보고가 나오지 않는다
$ sort -cn sorted

$ # 옵션을 이렇게 따로 줘도 상관없다
$ sort -c -n sorted
```

* `-R`, `--random-sort`

```sh
$ # 이것으로 터미널에서 가위바위보를 할 수 있다!
$ echo -e "가위\n바위\n보" | sort -R | head -1
```


### 필드 기준 정렬

다음과 같은 파일이 있다고 할 때

```sh
$ cat test

1 9 4
3 5 8
5 2 2
```

* `-k숫자` 옵션을 주는 방식으로 기준 필드를 정할 수 있다.

```sh
$ sort test -k1

1 9 4
3 5 8
5 2 2

$ sort test -k2

5 2 2
3 5 8
1 9 4

$ sort test -k3

5 2 2
1 9 4
3 5 8
```

* `-t` 옵션을 주면 field separator를 지정할 수 있다.

```sh
$ # grep 으로 파일별로 test가 몇 번 나타나는지 체크한 후, sort로 빈도수 기준 정렬
$ grep -c test * | sort -t: -k2 -n -r
tags:903
package.json:1
generateData.js:1
test.md:0
```

### prefix 공백 무시

>
`-b`, `--ignore-leading-blanks`
>
Ignore leading blank characters when comparing lines.



다음과 같은 텍스트가 있을 때 `-b` 옵션을 사용하면 prefix 공백을 무시하고 정렬할 수 있다. Vim에서 `:'<,'>!sort -b` 와 같이 사용하기에도 좋다.

```text
    * [[/blog/this/random-link]]
    * [[/blog/this/table-generate]]
* [[/blog/this ]]
* [[my-wiki ]]
    * [[my-wiki/123]]
    * [[/blog/this/img-migration-to-resource]]
* [[favicon]]
* [[create-jekyll-blog]]
    * [[/blog/this/404-fallback]]
* [[jekyll-category-tag]]
    * [[/blog/this/todo]]
```

결과는 다음과 같다.

```text
* [[/blog/this ]]
    * [[/blog/this/404-fallback]]
    * [[/blog/this/img-migration-to-resource]]
    * [[/blog/this/random-link]]
    * [[/blog/this/table-generate]]
    * [[/blog/this/todo]]
* [[create-jekyll-blog]]
* [[favicon]]
* [[jekyll-category-tag]]
* [[my-wiki ]]
    * [[my-wiki/123]]
```

## 함께 읽기

- [[/cmd/grep]]

