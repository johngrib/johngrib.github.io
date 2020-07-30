---
layout  : wiki
title   : awk
summary : pattern-directed scanning and processing language
date    : 2019-01-23 11:18:43 +0900
updated : 2020-07-30 20:32:09 +0900
tag     : command
toc     : true
public  : true
parent  : [[programming-language]]
latex   : false
---
* TOC
{:toc}

## Examples

```sh
awk '/search_pattern/ { action; }' file
```

### 80자보다 긴 모든 행을 출력하기
```sh
awk 'length > 80' test.txt
```

### 필드 구분자 지정하기
```sh
$ awk -F':' '{ print $1 }' /etc/passwd  # 구분자를 : 로 지정
$ awk -F'/' '{ print $1 }' /etc/passwd  # 구분자를 / 로 지정
```

### sum 구하기
```sh
$ awk '{s+=$1} END {print s}' test.txt  # ' 를 "로 쓰지 않도록 주의한다
```

### 마지막 필드 출력하기
```sh
$ awk '{print $NF}'
```

### 중복된 라인 제거하기
```sh
$ awk '!strmap[$0]++' test.txt
```
* uniq는 인접한 중복 값들만 제거하지만, 이 방법을 쓰면 파일 전체에서 중복 값을 제거한다.

### 대소문자 변환
```sh
$ echo 'ASDF' | awk '{print tolower($0)}'
$ echo 'asdf' | awk '{print toupper($0)}'
```

### 행 번호의 사용
#### 각 행에 행 번호를 붙여주기
```sh
awk '{print NR, $0}' test.txt
```

#### 홀짝 라인을 조인하기
```sh
 # exam 함수에서도 사용한 방법이다
awk 'NR%2==0 {print p","$0;} NR%2 {p=$0;}' test.txt
```

만약 test.txt 파일의 내용이 다음과 같다면...

```
1
2
3
4
5
```

다음과 같이 출력된다.

```
1,2
3,4
```


## 함께 읽기
* [[vim-update-book-progress]]

## Link

* [How To Use awk In Bash Scripting](https://www.cyberciti.biz/faq/bash-scripting-using-awk/ )

