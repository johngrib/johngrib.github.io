---
layout  : wiki
title   : ditto 명령어
summary : copy directory hierarchies, create and extract archives
date    : 2020-03-08 19:19:29 +0900
updated : 2022-02-14 22:51:08 +0900
tag     : bash command
resource: CA/FEE562-6828-4788-AF90-499EBA973667
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

### 디렉토리 병합

`dir1`에 다음과 같은 파일들이 있다고 하자.

| 파일명        | 내용 |
|---------------|------|
| `/dir1/a.txt` | `aa` |
| `/dir1/b.txt` | `bb` |

그리고 `directory2`에는 다음과 같은 파일들이 있다고 하자.

| 파일명              | 내용       |
|---------------------|------------|
| `/directory2/a.txt` | `에이에이` |
| `/directory2/c.txt` | `씨씨`     |

이 때 다음 명령을 입력하면, `dir1`의 파일들을 복사해서 `directory2`에 덮어쓰기한다.

```bash
ditto dir1 directory2
```

결과는 이렇다. (`dir1`은 변경 없음)

| 파일명              | 내용   |
|---------------------|--------|
| `/directory2/a.txt` | `aa`   |
| `/directory2/b.txt` | `bb`   |
| `/directory2/c.txt` | `씨씨` |

### 압축 해제


```bash
 # test.zip 파일의 압축을 해제해서 unzip-directory 디렉토리에 풀어놓는다.
ditto -V -x -k --sequesterRsrc --rsrc test.zip ./unzip-directory
```
