---
layout  : wiki
title   : uniq 명령어
summary : 중복된 라인을 찾는다
date    : 2023-08-12 15:15:13 +0900
updated : 2023-08-12 15:37:50 +0900
tag     : 
resource: 40/0A44A7-8F0B-44FA-BC13-B65F05CEADED
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

`uniq`를 쓸 때에는 보통 [[/cmd/sort]] 등을 통해 정렬을 해야 한다.

정렬되어 있지 않은 자료로는 `uniq`로 의도한 결과를 얻기 어렵다.

```bash
$ cat sample.txt
a
b
a
c
a
d
d

$ sort sample.txt | uniq
a
b
c
d
```

### -c : 중복 카운트도 함께 출력한다 {#option-c}

```bash
$ sort sample.txt | uniq -c
   3 a
   1 b
   1 c
   2 d
```

### -d : 중복된 라인만 출력한다 {#option-d}

```bash
$ sort sample.txt | uniq -d
a
d

$ sort sample.txt | uniq -cd
   3 a
   2 d
```

`-D`를 쓰면 `-d`와는 달리 중복된 라인을 '생략하지 않고' 모두 출력한다.

```bash
$ sort sample.txt | uniq -D
a
a
a
d
d
```

### -u : 중복되지 않은 라인만 출력한다 {#option-u}

```bash
$ sort sample.txt | uniq -u
b
c

$ # -u 의 결과를 카운트하면 모두 1 이다.
$ sort sample.txt | uniq -uc
   1 b
   1 c
```

### -i : 대소문자 무시 {#option-i}

```bash
$ cat sample.txt
A
a
a

$ uniq -c sample.txt
   1 A
   2 a

$ uniq -ic sample.txt
   3 A
```

### 응용

```
$ # const를 사용한 구문을 모두 찾아 중복 카운트와 함께 출력한다.
$ grep -R const | cut -d: -f 2- | sort | uniq -c | sort -n | tail
   1 const { execFile } = require('child_process');
   1 const { extractLinks } = require('./link');
   2     const fileAddress = linkString.startsWith('/')
   2     const lines = content.split('\n');
   2 const readFile = util.promisify(fs.readFile);
   2 const readdir = util.promisify(fs.readdir);
   2 const util = require('util');
   2 const {
   4 const path = require('path');
   6 const fs = require('fs');
```

```
$ # const를 사용한 구문을 모두 찾아 중복된 구문만 중복 카운트와 함께 출력한다.
$ grep -R const | cut -d: -f 2- | sort | uniq -cd | sort -n | tail
   2     const fileAddress = linkString.startsWith('/')
   2     const lines = content.split('\n');
   2 const readFile = util.promisify(fs.readFile);
   2 const readdir = util.promisify(fs.readdir);
   2 const util = require('util');
   2 const {
   4 const path = require('path');
   6 const fs = require('fs');
```

