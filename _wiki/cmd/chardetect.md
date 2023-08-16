---
layout  : wiki
title   : chardetect 명령어
summary : 문자열 인코딩을 추측한다
date    : 2023-08-16 21:17:18 +0900
updated : 2023-08-16 21:28:07 +0900
tag     : encoding
resource: 7D/82A493-4DC5-45B1-AFA4-CFA87FCF30EE
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

```bash
 # 설치
pip install chardet

 # pip3 를 쓴다면 이렇게 설치한다
pip3 install chardet
```

파일에 대해 다음과 같이 검사할 수 있다.

```bash
$ chardetect  utf-8.txt  euc-kr.txt
utf-8.txt: utf-8 with confidence 0.99
euc-kr.txt: EUC-KR with confidence 0.99

$ chardetect utf-8.txt
utf-8.txt: utf-8 with confidence 0.99

$ chardetect euc-kr.txt
euc-kr.txt: EUC-KR with confidence 0.99
```

## EUC-KR 을 판별할 때에는 file 명령의 대안이 될 수 있다 {#euc-kr}

[[/cmd/file]]는 EUC-KR 을 판별하지 못하는 문제가 있으므로, EUC-KR 을 판별할 때에는 `chardetect`를 사용하는 것을 고려하도록 한다.

```
$ file euc-kr.txt
euc-kr.txt: ISO-8859 text
```

## 함께 읽기

- [[/cmd/file]]
- [[/cmd/iconv]]

## Links

- [chardet/chardet (github.com)]( https://github.com/chardet/chardet )
- [pypi.org/project/chardet]( https://pypi.org/project/chardet/ )

