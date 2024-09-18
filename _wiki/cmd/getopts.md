---
layout  : wiki
title   : getopts 명령어
summary : 
date    : 2024-09-18 15:42:32 +0900
updated : 2024-09-18 15:55:51 +0900
tag     : 
resource: 04/82B335-930C-4926-855D-854A941D4DC1
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## 개요

- `getopts` 명령어는 셸 스크립트에서 `-a`, `-b` 같은 한 글자 옵션을 처리할 때 사용한다.

## Examples

다음과 같은 셸 스크립트를 작성하고 실험해보면 작동 방식을 이해할 수 있다.

```bash
#!/usr/bin/env bash

#              ↓ 처음에 오는 : 가 silent mode를 켠다
while getopts ":a:bc" opt; do
  case $opt in
    a) echo "옵션 -a, 값: $OPTARG" ;;
    b) echo "옵션 -b" ;;
    c) echo "옵션 -c" ;;
    \?) echo "지원하지 않는 옵션: -$OPTARG" >&2 ;;
    :) echo "옵션 -$OPTARG 는 인자값이 필요합니다." >&2 ;;
  esac
done
```

- `:` - 첫번째 글자 `:`는 silent mode를 의미한다.
- `a:` - `-a` 옵션을 정의. 뒤에 붙은 `:`는 `-a`에 추가 인자가 필요하다는 것을 의미.
- `b` - `-b` 옵션을 정의. 인자가 없는 옵션.
- `c` - `-c` 옵션을 정의. 인자가 없는 옵션.

아래는 `getopts-example` 이라는 이름으로 저장하고 실행한 결과이다.

```bash
$ getopts-example

```

- 옵션과 인자 없이 실행했고, 아무것도 출력되지 않았다.

```bash
$ getopts-example -a 123
옵션 -a, 값: 123

$ getopts-example2 -a
옵션 -a 는 값이 필요합니다.
```

- `-a 123`을 옵션과 그에 따른 인자로 인식하여 출력했다.
- 만약 `-a`에 대한 인자가 없다면 에러 메시지를 출력한다.

```bash
$ getopts-example -b
옵션 -b

$ getopts-example -c
옵션 -c
```

- `-b`와 `-c`를 인자 값이 없는 옵션으로 인식하여 출력했다.

```bash
$ getopts-example -d
지원하지 않는 옵션: -d
```

- `-d`는 지원하지 않는 옵션으로 인식하여 출력했다.

