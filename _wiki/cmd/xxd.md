---
layout  : wiki
title   : xxd 명령어
summary : make a hexdump or do the reverse
date    : 2021-09-24 21:39:48 +0900
updated : 2023-09-02 16:43:45 +0900
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

### 기본 사용법 {#basic}

대화형으로 입력을 받아 16진수로 변환해 출력한다.

```bash
$ xxd
ab
00000000: 6162 0a                                  ab.
```

- 위의 예제에서 키보드로 입력한 키는 `a`, `b`, `Enter`, `^D`.
- 출력 결과는 다음과 같이 해석할 수 있다.
    - `00000000`: 주소 정보. 입력의 0번째 바이트.
    - `61`: 0번째 바이트 값 61 (a)
    - `62`: 1번째 바이트 값 62 (b)
    - `0a`: 2번째 바이트 값 0a (newline)
    - 마지막의 `ab`: 입력한 문자열.
    - `.`: 종결 표시.

### -p : 주소 정보와 입력값을 생략한다 {#option-p}

`-p` 옵션을 주면 주소 정보와 입력값을 생략한다.

```bash
$ xxd -p
ab
61620a
```

- `61`: a
- `62`: b
- `0a`: newline

`^H` 같은 특수한 키의 hex값을 조사하기 편하다.

```bash
$ xxd
^HH
00000000: 0848 0a
```

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

UTF-8 이라면 한 글자가 3바이트라는 것을 확인할 수 있다.

```bash
$ echo $LANG
en_US.UTF-8

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

## 함께 읽기

- [[/vim/xxd-hex-edit]]

