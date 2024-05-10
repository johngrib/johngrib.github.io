---
layout  : wiki
title   : split 명령어
summary : 
date    : 2024-05-10 23:03:42 +0900
updated : 2024-05-10 23:14:52 +0900
tag     : 
resource: 17/6DFD45-3BBB-4083-9B68-16F26945FC83
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Options

### -l : 라인 단위로 분할

```bash
split -l 10000 input.txt
```

- input.txt 파일을 1만줄짜리 파일 여러개로 분할한다
- `-l 10000` : 1만줄씩 분할
- 분할된 모든 파일을 이어붙이면 원본 파일과 동일하다.
    - 분할된 파일은 `xaa`, `xab`, `xac`, ... 와 같이 자동으로 이름이 붙여진다.


예를 들어 다음과 같이 실행하면 100줄짜리 파일 10개가 생성된다.

```bash
$ seq 1000 | split -l 100

$ ls -alh
total 40K
drwxr-xr-x  12 johngrib staff  384 2024-05-10 Fri 23:10:14 .
drwxr-x---+ 84 johngrib staff 2.7K 2024-05-10 Fri 23:09:44 ..
-rw-r--r--   1 johngrib staff  292 2024-05-10 Fri 23:10:14 xaa
-rw-r--r--   1 johngrib staff  400 2024-05-10 Fri 23:10:14 xab
-rw-r--r--   1 johngrib staff  400 2024-05-10 Fri 23:10:14 xac
-rw-r--r--   1 johngrib staff  400 2024-05-10 Fri 23:10:14 xad
-rw-r--r--   1 johngrib staff  400 2024-05-10 Fri 23:10:14 xae
-rw-r--r--   1 johngrib staff  400 2024-05-10 Fri 23:10:14 xaf
-rw-r--r--   1 johngrib staff  400 2024-05-10 Fri 23:10:14 xag
-rw-r--r--   1 johngrib staff  400 2024-05-10 Fri 23:10:14 xah
-rw-r--r--   1 johngrib staff  400 2024-05-10 Fri 23:10:14 xai
-rw-r--r--   1 johngrib staff  401 2024-05-10 Fri 23:10:14 xaj
```

분할된 파일들은 모두 `x`로 시작하는 이름을 갖게 되며, 알파벳순으로 이어지는 내용을 갖는다.

```
$ tail -1 xaa
100

$ head -1 xab
101
```

### -d : 분할되는 파일 이름에 알파벳이 아니라 숫자를 사용한다

`-d` 옵션을 사용하면 분할된 파일들이 `x00`, `x01`, `x02`, ... 와 같은 숫자로 끝나는 이름을 갖게 된다.

```bash
$ seq 1000 | split -l 100 -d

$ ll
total 40K
drwxr-xr-x  12 johngrib staff  384 2024-05-10 Fri 23:13:45 .
drwxr-x---+ 84 johngrib staff 2.7K 2024-05-10 Fri 23:09:44 ..
-rw-r--r--   1 johngrib staff  292 2024-05-10 Fri 23:13:45 x00
-rw-r--r--   1 johngrib staff  400 2024-05-10 Fri 23:13:45 x01
-rw-r--r--   1 johngrib staff  400 2024-05-10 Fri 23:13:45 x02
-rw-r--r--   1 johngrib staff  400 2024-05-10 Fri 23:13:45 x03
-rw-r--r--   1 johngrib staff  400 2024-05-10 Fri 23:13:45 x04
-rw-r--r--   1 johngrib staff  400 2024-05-10 Fri 23:13:45 x05
-rw-r--r--   1 johngrib staff  400 2024-05-10 Fri 23:13:45 x06
-rw-r--r--   1 johngrib staff  400 2024-05-10 Fri 23:13:45 x07
-rw-r--r--   1 johngrib staff  400 2024-05-10 Fri 23:13:45 x08
-rw-r--r--   1 johngrib staff  401 2024-05-10 Fri 23:13:45 x09
```

