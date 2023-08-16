---
layout  : wiki
title   : iconv 명령어
summary : 문자열 인코딩을 변환한다
date    : 2023-08-16 20:32:14 +0900
updated : 2023-08-16 21:11:43 +0900
tag     : 
resource: CD/E12858-1C0E-4A7C-BFCF-7C168F1B8A69
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

```bash
 # EUC-KR 파일을 UTF-8로 변환해 출력한다
iconv -f EUC-KR -t UTF-8 input-file

 # EUC-KR 파일을 UTF-8로 변환해 파일로 저장한다
iconv -f EUC-KR -t UTF-8 input-file > output-file

 # 사용 가능한 인코딩 목록을 출력한다
iconv -l
```

## 튜토리얼

다음과 같은 UTF-8 파일을 만들어 둔다.

```bash
$ cat input-utf-8.txt
가나다
abc
라마바
```

[[/cmd/file]] 명령으로 조사해보면 UTF-8 파일이라는 것을 알 수 있다.

```bash
$ file input-utf-8.txt
input-utf-8.txt: Unicode text, UTF-8 text
```

이 UTF-8 파일을 EUC-KR로 변환해 파일로 저장해 보자.

```bash
$ iconv -f EUC-KR -t UTF-8 input-utf-8.txt > output-euc-kr.txt
```

변환된 파일을 확인해보자.

```bash
$ cat output-euc-kr.txt
??????
abc
?󸶹?
```

알아볼 수 없는 걸 보면 변환이 된 것 같다.

이번에는 이렇게 생성된 EUC-KR 파일을 UTF-8로 변환해서 확인해보자.

```bash
$ iconv -f EUC-KR -t UTF-8 output-euc-kr.txt 
가나다
abc
라마바
```

UTF-8 → EUC-KR → UTF-8 과정을 통해 원래의 내용을 확인할 수 있는 것을 보니 변환이 잘 된 것 같다.

그런데 이 파일은 [[/cmd/file]] 명령으로 조사해 보면 EUC-KR 이라고 나오지 않는다.

```bash
$ file output-euc-kr.txt 
output-euc-kr.txt: ISO-8859 text
```

[[/cmd/file]]가 EUC-KR을 인식하지 못하기 때문이다.

EUC-KR 도 인식해주는 도구를 사용할 필요가 있다.
[chardet]( https://github.com/chardet/chardet )이 적절하다.

```bash
pip install chardet

 # 또는 pip3 로 설치
pip3 install chardet
```

설치가 완료된 이후 `chardetect` 명령으로 확인해보니 다음과 같았다.

```bash
$ chardetect input-utf-8.txt output-euc-kr.txt 
input-utf-8.txt: utf-8 with confidence 0.99
output-euc-kr.txt: EUC-KR with confidence 0.99
```

