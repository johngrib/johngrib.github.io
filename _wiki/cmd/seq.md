---
layout  : wiki
title   : seq
summary : print sequences of numbers
date    : 2023-01-08 10:30:31 +0900
updated : 2024-10-04 14:30:09 +0900
tag     : bash command
resource: 25/48E43D-8A13-4DB5-9C32-D60CBD581175
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

### 범위 지정

```sh
$ seq 1 3

1
2
3
```

- `1 3` : 1부터 3까지 출력한다

```sh
$ seq 3 1

3
2
1
```

- `3 1` : 3부터 1까지 출력한다

```sh
$ seq inf
```

- `inf` : 1 부터 무한대까지 출력한다

```sh
$ seq 5 inf
```

- `5 inf` : 5 부터 무한대까지 출력한다

### -w : 간격 옵션

`-w` 옵션을 사용하면 수와 수 사이의 간격을 지정할 수 있다.

```sh
$ seq -w 0 0.2 1

0.0
0.2
0.4
0.6
0.8
1.0
```

- `0 0.2 1` : 0 부터 1까지 출력한다. 증가 단위는 `0.2`.

```sh
$ seq -w 0 5 10
00
05
10
```

- `0 5 10` : 0 부터 10까지 출력한다. 증가 단위는 `5`.


### -t : 종료 문자열 옵션

```sh
$ seq -t "~~~END~~~" -w 1 3 10

01
04
07
10
~~~END~~~
```

- `-t "~~~END~~~"` : 종료 문자열은 `~~~END~~~`.
- `1 3 10` : 1 부터 10까지 출력한다. 증가 단위는 `3`.

### -s : 구분자 옵션

```sh
$ seq -s ", " -w 1 3 10

01, 04, 07, 10,
```

- `1 3 10` : 1부터 10까지 출력한다. 증가 단위는 `3`.
- `-s ", "` : 구분자는 `, `.

### -f : format 옵션

```sh
$ seq -f %.4f 1 0.2 2

1.0000
1.2000
1.4000
1.6000
1.8000
2.0000
```

- `-f %.4f` : 소수점 4자리까지 출력한다.

## 함께 읽기

- [[/cmd/for]]

