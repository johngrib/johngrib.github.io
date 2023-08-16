---
layout  : wiki
title   : file 명령어
summary : 파일 타입을 조사한다
date    : 2020-09-03 18:38:21 +0900
updated : 2023-08-16 21:28:36 +0900
tag     : bash command
resource: B7/996220-E8A4-40A7-ACA2-3F8B880DC616
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

### 파일과 디렉토리에 대한 정보를 조사할 수 있다

```bash
$ file .gitignore
.gitignore: ASCII text
```

```bash
$ file ~/dotfiles/
/Users/johngrib/dotfiles/: directory
```

```bash
$ file /bin/bash
/bin/bash: Mach-O universal binary with 2 architectures: [x86_64:Mach-O 64-bit executable x86_64] [arm64e:Mach-O 64-bit executable arm64e]
/bin/bash (for architecture x86_64):	Mach-O 64-bit executable x86_64
/bin/bash (for architecture arm64e):	Mach-O 64-bit executable arm64e
```

### 파일 인코딩을 조사할 수 있다
```
$ file test.txt
test.csv: ISO-8859 text, with CRLF line terminators

$ file -I test.txt
test.csv: text/plain; charset=iso-8859-1
```

## 함께 읽기

- [[/cmd/chardetect]]
- [[/cmd/iconv]]

