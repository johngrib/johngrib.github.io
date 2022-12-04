---
layout  : wiki
title   : xxd 명령어
summary : make a hexdump or do the reverse
date    : 2021-09-24 21:39:48 +0900
updated : 2021-10-11 15:20:32 +0900
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

```
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

