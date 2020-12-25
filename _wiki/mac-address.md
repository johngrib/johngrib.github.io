---
layout  : wiki
title   : MAC address
summary : 
date    : 2020-12-25 22:50:38 +0900
updated : 2020-12-25 23:10:25 +0900
tag     : network cs
toc     : true
public  : true
parent  : [[index]]
latex   : false
---
* TOC
{:toc}

## MAC 주소?

> MAC 주소란 'LAN 포트의 주소'를 말합니다. MAC 주소는 원칙상 변경할 수 없습니다(단, 소프트웨어로 MAC 주소를 변경할 수 있는 LAN 포트도 있습니다).
그래서 MAC 주소는 '하드웨어 주소', '물리적 주소'라고도 불립니다.
라우터와 스위치는 LAN 포트 여러 개를 가지고 있는데, 각 LAN 포트마다 MAC 주소가 존재합니다.
[^gen-7-01-1]

### 포맷

MAC 주소는 48비트로 이루어져 있다.
- 8비트씩 끊어서 16진수로 변환한 다음, 구분자로 `-` 이나 `:`을 사용해 표기한다.

앞자리 24비트: vendor code
- LAN 포트를 제조한 네트워크 장비 제조사 식별 코드.
- IEEE 에서 관리한다.
    - [macvendorlookup]( https://www.macvendorlookup.com/ ) 같은 사이트에서 앞자리를 입력해 검색할 수 있다.

뒷자리 24비트: 네트워크 장비 벤더가 제조한 LAN 포트를 관리하기 위한 '시리얼 번호'.

### 브로드캐스트 MAC 주소

```
FF-FF-FF-FF-FF-FF
```

- 48자리 비트가 모두 `1`로 되어 있는 MAC 주소를 브로드캐스트 MAC 주소라 부른다.
- 통신시에 브로드캐스트 MAC 주소를 지정하면, 같은 네트워크 내의 모든 컴퓨터를 대상으로 한다.


## Links

- [MAC Address Vendors list]( https://udger.com/resources/mac-address-vendor )

## 참고문헌

- [GEN] 손으로 익히며 배우는 네트워크 첫걸음 Gene 저 / 진솔 역 / 한빛미디어 / 2017년 09월 01일


## 주석
[^gen-7-01-1]: [GEN] chapter 7. 01.1 장

