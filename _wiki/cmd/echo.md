---
layout  : wiki
title   : echo 명령어
summary : 텍스트를 출력한다
date    : 2023-08-06 19:23:44 +0900
updated : 2023-08-06 19:41:52 +0900
tag     : 
resource: 15/C5E42C-4282-4B96-8807-143148C1A330
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## 옵션

- `--help`: 도움말을 출력한다.
- `-n`: 뒤따라 오는 개행문자(trailing newline)를 제거하고 출력한다.
- `-E`: `-e` 옵션을 무시한다.
    - 기본값.
- `-e`: 백슬래시로 시작하는 이스케이프 시퀀스를 해석해 출력에 적용한다.
    - `\\`: backslash
    - `\a`: alert (BEL)
    - `\b`: backspace
    - `\c`: produce no further output
    - `\e`: escape
    - `\f`: form feed
    - `\n`: new line
    - `\r`: carriage return
    - `\t`: horizontal tab
    - `\v`: vertical tab
    - `\0NNN`: byte with octal value NNN (1 to 3 digits)
    - `\xHH`: byte with hexadecimal value HH (1 to 2 digits)

## 주의사항 {#caution}

`echo`는 이식성에 좀 문제가 있으므로, 여러 플랫폼에서 사용하려 한다면 `printf`를 쓰는 것도 고려할 것.

한편, macOS의 `echo`는 잘 작동하긴 하는데 [[/cmd/man]]{man 페이지}가 뭔가 좀 이상하다.

`man echo`를 해봐도 `-e` 옵션은 소개하지 않고 `-n` 옵션만 소개를 하는데, 실제로 사용해보면 `-e`도 잘 작동한다.

찝찝하다면 GNU coreutils 를 설치해서 사용할 것.

## Examples

```bash
$ echo "a\nb\nc"
a\nb\nc

$ # -e 옵션을 사용하면 \n 을 개행문자로 해석한다.
$ echo -e "a\nb\nc"
a
b
c
```

```bash
$ # -n 옵션 없이 사용하면 echo는 마지막에 개행문자를 출력한다.
$ echo "hello " && echo "123" && echo "  END"
hello 
123
  END

$ # -n 옵션은 마지막의 개행문자를 출력하지 않는다.
$ echo -n "hello " && echo -n "123" && echo -n "  END  "
hello 123  END  
```

```bash
$ # \b(백스페이스) 사용
$ echo -e "abc\bd"
abd

$ # \xHH 로 16진수 문자를 출력할 수 있다.
$ echo -e "a\x48b"
aHb
```

