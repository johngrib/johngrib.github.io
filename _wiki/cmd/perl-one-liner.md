---
layout  : wiki
title   : Perl 한 줄 사용
summary : 
date    : 2020-06-29 23:33:40 +0900
updated : 2024-11-28 23:04:40 +0900
tag     : bash command
resource: 53/93E136-7E69-41D7-8A7E-1A9D866F9EEA
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## 개요

- perl은 하나의 완전한 프로그래밍 언어이다.
- 하지만 나는 bash 커맨드라인에서 주로 명령어 파이프를 구성할 때 사용한다.
    - 주로 [[/cmd/sed]]{sed}를 쓰다가 [[/regex/pcre]]가 필요한 경우에 perl을 선택한다.

## Examples

### `-pe` 옵션으로 sed 처럼 사용하기 {#pe-sed}
```sh
echo 'John Grib' | perl -pe 's/(\w+)\s+(\w+)/$2 $1/'    # 출력은 Grib John
```

- `-p`: print. 실행 결과를 출력한다. 즉 `-p`가 없으면 위의 명령을 실행한 결과는 출력되지 않는다.
- `-e`: execute. 다음에 주어진 문자열을 perl 코드로 실행하는 옵션.
    - `-pe`는 `-p`와 `-e`를 합쳐서 표현한 것이다. 따로 쓰기 귀찮으니 주로 `-pe`를 사용한다.
- 주의: [[/cmd/sed]]와 다른 점
    - 위의 예제에서는 역참조로 `$2`, `$1`을 사용했지만 [[/cmd/sed]]에서는 `\2`, `\1`와 같이 `\`를 사용한다.

#### `-i` 옵션: 파일 업데이트 {#option-i}

`-i`: in-place edit. 출력 결과를 파일에 쓴다.

```sh
perl -pi -e 's/foo/bar/g' test.txt
```

- `-i`: 치환한 결과를 `test.txt` 파일에 덮어쓴다.
- `s/foo/bar/g`: 모든 `foo`를 `bar`로 치환한다.

```sh
perl -pi.backup -e 's/foo/bar/g' test.txt
```

- `-i`: 치환한 결과를 `test.txt` 파일에 덮어쓴다.
    - `-i.backup`: 원본파일 `test.txt`를 `test.txt.backup` 파일로 복사해 백업해둔다.
- `s/foo/bar/g`: 모든 `foo`를 `bar`로 치환한다.

#### if, unless 사용하기 {#if-unless}

```sh
 # sample 패턴에 매치되는 라인에 대해서만 foo를 bar로 치환한다.
perl -pi.back -e 's/foo/bar/g if /sample/' test.txt
```

```sh
 # sample 패턴에 매치되지 않는 라인에 대해서만 foo를 bar로 치환한다.
perl -pi.back -e 's/foo/bar/g unless /sample/' test.txt
```

#### PCRE 사용하기 {#sed-pcre}

[[/cmd/sed]]{sed}에서는 지원하지 않는 전후방 탐색 등을 사용할 수 있다.
(당연한 일이다. PCRE의 P는 Perl에서 따온 것이다.)

```bash
$ # 오른쪽에 22가 있는 11만 replacement로 치환한다.
$ echo 2211223311 | perl -pe 's/11(?=22)/replacement/g'
22replacement223311
```

- `11(?=22)`: 오른쪽에 `22`가 있는 `11`을 표현하는 look ahead 정규식.

```bash
$ echo "test123test" | perl -pe 's/(?<=\d)test/replacement/'
test123replacement
```

- `(?<=\d)test`: 왼쪽에 숫자가 있는 `test`를 표현하는 look behind 정규식.

### 멀티 라인 replace

#### 사례: 모든 java 파일의 만료된 License 블록 주석 삭제하기

```java
/*
 * 이 클래스는 License가 어쩌고 저쩌고...
 */

package com.grib.john.service;
```

위와 같은 상단 주석을 가진 java 파일 약 500 개에서 문제의 주석만 삭제한 명령이다.

```sh
 # 모든 java 파일에서 License가 포함된 블록 주석을 삭제한다
find . -name '*.java' \
  | xargs perl -i -pe 'BEGIN{undef $/;} s,/\*.*License.*?\*/\s*,,smg'
```

회사에서 각 파일에 추가된 라이선스 코멘트를 제거할 때 사용했다.

다음과 같이 해도 된다.

```sh
find . -name '*.java' \
  | xargs perl -i -pe 'BEGIN{undef $/;} s,/\*.*License.*?\*/\s*(package),$1,smg'
```

다음과 같이 해도 된다.

```sh
find . -name '*.java' \
  | xargs perl -i -pe 'BEGIN{undef $/;} s,/\*.*License.*?\*/\s*(?=package),,smg'
```

#### 사례: 모든 markdown 파일에서 사용하지 않는 metadata 삭제하기

```bash
ag giscus -l | grep .md$ | xargs perl -i -pe 'BEGIN{undef $/;} s,giscus *: *auto\s*---,---,smg'
```

### 터미널에 눈 내리게 하기

```bash
perl -e '$|=1;while(1){print"\e[H",map{$s=" "x80;substr($s,int(rand(80)),1)="*"for 1..3;$s."\n"}0..24;select(undef,undef,undef,0.1)}'
```

- `$|=1`: 출력 버퍼링을 끈다. (즉, 즉시 출력한다.)
- `while(1)`: 무한 루프
- `print"\e[H"`: ANSI escape code. 이 코드를 출력하면 커서를 화면의 맨 위로 이동시킨다.
- `map{  }0..24`: 0부터 24까지 loop.
- `$s=" "x80`: 80개의 공백 문자열을 만든다.
- `substr($s,int(rand(80)),1)="*"` : 주어진 문자열 `$s`의 랜덤 정수 위치에 `*` 삽입
    - `int(rand(80))`: 0부터 79 사이의 무작위 정수 생성
- `for 1..3` : 각 라인마다 3회 반복 (즉, 라인마다 3개의 `*`를 삽입)
- `$s."\n"`: 각 라인마다 개행 문자를 붙인다.
- `select(undef,undef,undef,0.1)` : 0.1초 동안 일시 정지

