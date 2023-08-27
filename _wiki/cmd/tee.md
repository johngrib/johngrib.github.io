---
layout  : wiki
title   : tee 명령어
summary : duplicate standard input
date    : 2023-08-12 19:25:15 +0900
updated : 2023-08-27 23:32:28 +0900
tag     : 
resource: 6A/31019D-87F2-416E-B905-5E06A33747D2
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

```bash
$ find . -name '*cmd*' | tee result.txt | wc -l
      21

$ cat result.txt 
./_wiki/cmd
./_wiki/dc-cmd.md
./_wiki/glow-cmd.md

... 생략

./data/metadata/dc-cmd.json
./data/metadata/ioreg-cmd.json
```

`tee`는 꼭 파이프라인 중간에서만 사용하지 않는다.

실행 시간이 오래 걸리거나, 리다이렉션을 통한 파일 저장 과정을 보고 싶은 명령 파이프라인이 있다면 마지막에 `tee`를 연결하는 패턴이 유용하다.

이렇게 하면 결과를 파일로 저장하면서도, 그와 동시에 터미널에서 출력 결과를 확인할 수 있다.

```bash
$ find . -name '*cmd*' | head | tee result.txt
./_wiki/cmd
./_wiki/dc-cmd.md
./_wiki/glow-cmd.md
./_wiki/cmd.md
./_wiki/ioreg-cmd.md
./_site/wiki/dc-cmd
./_site/wiki/cmd
./_site/wiki/ioreg-cmd
./_site/wiki/glow-cmd
./_site/data/tag/cmd.json
```

### -a : append {#option-a}

`-a` 옵션을 주면 파일을 새로 작성하지 않고, 파일의 마지막에 이어붙인다.


## 함께 읽기

- [[/pattern/pipeline#tee]]
