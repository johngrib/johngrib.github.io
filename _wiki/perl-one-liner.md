---
layout  : wiki
title   : Perl 한 줄 사용
summary : 
date    : 2020-06-29 23:33:40 +0900
updated : 2020-07-18 21:14:38 +0900
tag     : bash command
toc     : true
public  : true
parent  : [[command-line]]
latex   : false
---
* TOC
{:toc}

## Examples

### sed 처럼 사용하기
```sh
echo 'John Grib' | perl -pe 's/(\w+)\s+(\w+)/$2 $1/'    # 출력은 Grib John
```

- `-e`: execute. 다음에 주어진 문자열을 perl 코드로 실행하는 옵션.
- `-p`: print. 실행 결과를 출력한다. 즉 `-p`가 없으면 위의 명령을 실행한 결과는 출력되지 않는다.

```sh
 # test.txt 파일의 모든 foo를 bar로 치환하고, 파일에 덮어쓴다.
perl -pi -e 's/foo/bar/g' test.txt
```

- `-i`: in-place edit. 출력 결과를 파일에 쓴다.

```sh
 # test.txt 파일을 test.txt.backup 파일로 백업해두고,
 # 모든 foo를 bar로 치환하고, test.txt 파일에 덮어쓴다.
perl -pi.backup -e 's/foo/bar/g' test.txt
```

```sh
 # sample 패턴에 매치되는 라인에 대해서만 foo를 bar로 치환한다.
perl -pi.back -e 's/foo/bar/g if /sample/' test.txt
```

```sh
 # sample 패턴에 매치되지 않는 라인에 대해서만 foo를 bar로 치환한다.
perl -pi.back -e 's/foo/bar/g unless /sample/' test.txt
```

### 멀티 라인 replace
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

