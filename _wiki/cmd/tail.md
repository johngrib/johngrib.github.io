---
layout  : wiki
title   : tail 명령어
summary : display the last part of a file
date    : 2019-01-06 23:17:41 +0900
updated : 2024-09-10 21:54:43 +0900
tag     : bash command
resource: 37/4DEAA6-AC99-4BF7-80B8-03BAB23F1129
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples
```sh
 # 마지막 10 줄을 출력한다
tail test.txt
tail -n10 test.txt
tail -n 10 test.txt
tail -10 test.txt
cat test.txt | tail - 10

 # 파일의 마지막 부분을 출력하고, 추가되는대로 계속 출력해준다
 # 주의: follow하던 파일이 삭제되면 아무것도 출력하지 않는 상태로 계속 대기한다
tail -f log.txt

 # 기본적으로 -f 와 같다. 그러나 더 강력하다.
 # 파일이 삭제되어도 같은 이름의 파일이 만들어진다면 해당 파일을 계속해서 follow한다
tail -F log.txt

 # 파일의 처음 10 줄을 제외한 나머지 모두 출력
tail -n +10

 # 역순으로 출력한다
tail -r log.txt
```

* `-r` 옵션은 `-F`, `-f` 옵션과 함께 사용할 수 없다.

