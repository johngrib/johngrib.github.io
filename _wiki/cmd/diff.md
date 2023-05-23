---
layout  : wiki
title   : diff
summary : compare files line by line
date    : 2019-01-11 11:27:49 +0900
updated : 2021-07-21 23:15:32 +0900
tag     : bash command
resource: 87/6AB1CF-ED23-4EED-AF62-5DEE3218040C
toc     : true
public  : true
parent  : [[cmd]]
latex   : false
---
* TOC
{:toc}

## Examples
### 두 파일의 차이점 비교하기
```sh
$ diff FILE_A FILE_B
```

### 대소문자 무시
```sh
$ diff FILE_A FILE_B -i
```

### 공백문자 무시
```sh
$ diff FILE_A FILE_B -w
```

### 차이점을 좌우로 보여주기
```sh
$ diff FILE_A FILE_B -y
```

### 재귀 (디렉토리 비교)
```sh
$ diff DIR_A DIR_B -r
```

```sh
 # 차이가 있는 파일의 이름만 출력한다
$ diff DIR_A DIR_B -rq
```

