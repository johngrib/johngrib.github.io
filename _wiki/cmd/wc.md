---
layout  : wiki
title   : wc 명령어
summary : line, word, byte를 카운트한다
date    : 2023-08-13 15:05:47 +0900
updated : 2023-08-13 15:26:19 +0900
tag     : 
resource: C5/D649E5-61C6-409F-B5A1-AA40375F9CA1
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

옵션 없이 `wc` 명령을 사용하면 입력 텍스트의 newline 수, word 수, byte 수를 세어준다.

```bash
$ cat sample.txt
aaaaaaaaaaaaaaaaaa
bbbbbbbbb cccccc
dddddd eeeeee fffffff

$ wc sample.txt
       3       6      58 sample.txt
$ # 3줄, 6단어, 58바이트
```

출력결과 가장 오른쪽에 파일 이름이 출력되는 이유는 여러 파일을 입력으로 줄 수 있기 때문이다.

```bash
$ wc  sample.txt  sample2.txt
       3       6      58 sample.txt
       2       2      10 inp
       5       8      68 total
```

2개 이상의 파일을 입력하면 위와 같이 `total`도 출력된다.

### -l : line 수 출력 {#option-l}

```bash
$ wc -l sample.txt
       3 sample.txt
```

### -w : word 수 출력 {#option-w}

```bash
$ wc -w sample.txt
       6 sample.txt
```

### -c : byte 수 출력 {#option-c}

`-c` 옵션을 주면 byte 수를 출력한다.

```bash
$ wc -c sample.txt
      58 sample.txt
```

이 옵션의 이름이 `-c`인 것은 아마도 `wc`가 처음 개발되었던 1971년에는 ASCII 코드만 고려했기 때문이었을 것이다.

`-c` 옵션은 ASCII 문자에 대해서는 character 수를 제대로 출력하지만 모든 문자에 대해서 그런 것은 아니다.

예를 들어 한글은 3 byte이기 때문에 `wc -c` 로 세면 글자당 3이 나온다는 점에 주의해야 한다.

```bash
$ printf "가" | wc -c
       3

$ printf "가힣" | wc -c
       6
```

글자 수를 세려면 `-m` 옵션을 사용해야 한다.

### -m : character 수 출력 {#option-m}

`-m` 옵션을 주면 character 수를 출력한다.

```bash
$ printf "AB" | wc -m
       2

$ printf "가힣" | wc -m
       2
```

### -L : 가장 긴 line의 길이 출력 {#option-L}

이 옵션은 macOS의 `wc`에는 없다. 이 옵션이 필요하다면 [[/cmd/gnu-coreutils]]의 `wc`를 사용하도록 한다.

`-L` 옵션을 주면 가장 긴 line의 길이를 출력한다.

```bash
$ wc -L sample.txt
21 sample.txt
```

