---
layout  : wiki
title   : cut 명령어
summary : cut out selected portions of each line of a file
date    : 2019-01-15 17:09:24 +0900
updated : 2023-08-12 11:17:05 +0900
tag     : bash command
resource: 3D/795B19-8944-4EA9-9C91-67222814313B
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

### -c : 문자열 위치 지정 {#option-c}

```sh
echo 'hello world' | cut -c 1-3 # hel

                         # ↓ 이렇게 붙여도 된다
echo 'hello world' | cut -c1-3  # hel

echo 'hello world' | cut -c 3-  # llo world

echo 'hello world' | cut -c -7  # hello w

echo 'abcd efgh ijkl' | cut -c 1-3,7-8,12   # abcfgj

echo 'abcd efgh ijkl' | cut -c 1,6,11   # aei
```

### -d, -f : 구분자 지정, 필드 지정 {#option-d-f}

- `-d`: 구분자 지정
    - `-d` 옵션을 생략하면 `cut`은 기본값으로 탭 문자를 사용한다.
- `-f`: 필드 지정

```bash
 # 공백을 구분자로 사용, 2 번째 필드(f) 를 출력한다
echo 'hello world' | cut -d' ' -f2

 # : 를 구분자로 사용, 필드 범위 지정하는 방법
cut -d: -f -4 /etc/passwd     # 1 ~ 4 번 필드를 출력
cut -d: -f 4- /etc/passwd     # 4 ~ 마지막 필드를 출력
cut -d: -f 2-4 /etc/passwd    # 2 ~ 4 번 필드를 출력
cut -d: -f 3,5,8 /etc/passwd  # 3, 5, 8 번 필드를 출력
```

다음은 `-d`를 생략했을 때 기본 구분자로 탭 문자를 사용하는 것을 보여준다.

```bash
$ printf 'foo\tbar\tbaz\n' | cut -f2
bar

$ printf 'foo\nbar\nbaz\n' | cut -f2
foo
bar
baz
```

### -b : byte 단위로 자르기 {#option-b}

```bash
echo 'hello world' | cut -b 1-3 # hel
```

한글 한 글자는 3바이트이기 때문에 byte 단위로 자르려면 3의 배수 단위로 지정해야 한다.

```bash
$ echo -n '안녕하세요' | cut -b 4-6
녕
```


