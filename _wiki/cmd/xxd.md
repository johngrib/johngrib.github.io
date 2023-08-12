---
layout  : wiki
title   : xxd 명령어
summary : make a hexdump or do the reverse
date    : 2021-09-24 21:39:48 +0900
updated : 2023-08-12 11:19:17 +0900
tag     : bash command
resource: BF/918E84-1974-41F0-82D0-7E37B4C945F7
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

### 입력을 16진수로 변환해 출력한다

```sh
$ # 'a'가 16진수로 61 이므로 61을 출력한다.
$ echo -n a | xxd
00000000: 61                                       a
```

```sh
$ # 'k'가 16진수로 6b 이므로 6b를 출력한다.
$ echo -n k | xxd
00000000: 6b                                       k
```

```bash
$ # 입력 포맷을 주지 않고, plaintext로 출력한다.
$ echo -n a | xxd -p
61
```

### 입력을 2진수로 변환해 출력한다

```sh
$ # a => 0x61 => 0110 0001
$ echo -n a | xxd -b
00000000: 01100001                                               a
```

```sh
$ # k => 0x6b => 0110 1011
$ echo -n k | xxd -b
00000000: 01101011                                               k
```

### 한글의 바이트 확인

한 글자가 3바이트라는 것을 확인할 수 있다.

```bash
$ echo -n '안' | xxd
00000000: ec95 88                                  ...

$ echo -n '안녕' | xxd
00000000: ec95 88eb 8595                           ......

$ echo -n '안녕하' | xxd
00000000: ec95 88eb 8595 ed95 98                   .........

$ echo -n '안녕하세' | xxd
00000000: ec95 88eb 8595 ed95 98ec 84b8            ............

$ echo -n '안녕하세요' | xxd
00000000: ec95 88eb 8595 ed95 98ec 84b8 ec9a 94    ...............
```

```bash
$ echo -n '가' | xxd
00000000: eab0 80                                  ...

$ echo -n '힣' | xxd
00000000: ed9e a3                                  ...
```
