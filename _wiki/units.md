---
layout  : wiki
title   : 단위, 숫자를 세는 방법
summary : 
date    : 2019-02-22 06:53:06 +0900
updated : 2020-05-17 23:21:56 +0900
tag     : unit
toc     : true
public  : true
parent  : [[what]]
latex   : true
---
* TOC
{:toc}

## 7가지 SI 기본 단위(국제 표준)

- SI: 국제단위계(國際單位系, 프랑스어: Système international d’unités)

| 기본량 | 이름     | 기호 |
|--------|----------|------|
| 길이   | 미터     | m    |
| 질량   | 킬로그램 | kg   |
| 시간   | 초       | s    |
| 전류   | 암페어   | A    |
| 온도   | 켈빈     | K    |
| 물질량 | 몰       | mol  |
| 광도   | 칸델라   | cd   |


## 접두어

| 접두어 | 기호 | $$10^n$$     | 가까운 $$2^n$$ | 읽기     | 읽기(한국어)  |
|--------|------|--------------|----------------|----------|---------------|
| yocto  | y    | $$10^{-24}$$ | $$2^{-80}$$    | 욕토     | 억조 분의 1   |
| zepto  | z    | $$10^{-21}$$ | $$2^{-70}$$    | 젭토     | 십만조 분의 1 |
| atto   | a    | $$10^{-18}$$ | $$2^{-60}$$    | 아토     | 백경 분의 1   |
| femto  | f    | $$10^{-15}$$ | $$2^{-50}$$    | 펨토     | 천조 분의 1   |
| pico   | p    | $$10^{-12}$$ | $$2^{-40}$$    | 피코     | 일조 분의 1   |
| nano   | n    | $$10^{-9}$$  | $$2^{-30}$$    | 나노     | 십억 분의 1   |
| micro  | µ    | $$10^{-6}$$  | $$2^{-20}$$    | 마이크로 | 백만 분의 1   |
| milli  | m    | $$10^{-3}$$  | $$2^{-10}$$    | 밀리     | 천 분의 1     |
| centi  | c    | $$10^{-2}$$  | $$2^{-7}$$     | 센티     | 백 분의 1     |
| deci   | d    | $$10^{-1}$$  | $$2^{-3}$$     | 데시     | 십 분의 1     |
|        |      | $$10^{0}$$   | $$2^{0}$$      |          | 1             |
| deca   | da   | $$10^{1}$$   | $$2^{3}$$      | 데카     | 십            |
| hecto  | h    | $$10^{2}$$   | $$2^{7}$$      | 헥토     | 백            |
| kilo   | k    | $$10^{3}$$   | $$2^{10}$$     | 킬로     | 천            |
| mega   | M    | $$10^{6}$$   | $$2^{20}$$     | 메가     | 백만          |
| giga   | G    | $$10^{9}$$   | $$2^{30}$$     | 기가     | 십억          |
| tera   | T    | $$10^{12}$$  | $$2^{40}$$     | 테라     | 일조          |
| peta   | P    | $$10^{15}$$  | $$2^{50}$$     | 페타     | 천조          |
| exa    | E    | $$10^{18}$$  | $$2^{60}$$     | 엑사     | 백경          |
| zetta  | Z    | $$10^{21}$$  | $$2^{70}$$     | 제타     | 십만조        |
| yotta  | Y    | $$10^{24}$$  | $$2^{80}$$     | 요타     | 억조          |

## 바이트 크기에 대한 2의 거듭제곱 IEC 표준 명칭

- IEC: International Electrotechnical Commission. 국제전기기술위원회.

| 쓰기     | 기호 | $$2^n$$    | 읽기         |
|----------|------|------------|--------------|
| kibibyte | KiB  | $$2^{10}$$ | 키비바이트   |
| mebibyte | MiB  | $$2^{20}$$ | 메비바이트   |
| gibibyte | GiB  | $$2^{30}$$ | 기비바이트   |
| tebibyte | TiB  | $$2^{40}$$ | 테비바이트   |
| pebibyte | PiB  | $$2^{50}$$ | 페비바이트   |
| exbibyte | EiB  | $$2^{60}$$ | 엑스비바이트 |
| zebibyte | ZiB  | $$2^{70}$$ | 제비바이트   |
| yobibyte | YiB  | $$2^{80}$$ | 요비바이트   |

> 2003년에 컴퓨터 제조업체가 하드 드라이브 용량에 대해 소비자를 현혹시킨 데 대한 소송이 제기되어 한 때 물의를 일으킨 적이 있다. 이 제조업체는 1기가바이트가 10억 바이트라고 되어 있는 ISO 정의를 사용했다(대부분의 사람들은 1기가바이트가 1,024 메가바이트라고 알고 있지만).
>
> 이것은 다루기 힘든 문제이다. 컴퓨터 업계는 킬로, 메가 등의 접두사가 10의 거듭제곱인지 2의 거듭제곱인지에 대해 일관성이 없다. 2의 거듭제곱이 우세한 유일한 곳은 저장소 용량을 나타낼 때이다. 그 밖의 모든 것은 10의 거듭제곱이다. 즉, 1GHz 프로세서는 1초에 1,073,741,824 사이클이 아닌 10억 사이클의 속도로 실행된다. 28.8K 모뎀은 초당 29,491 비트가 아니라 28,800 비트의 최고 속도를 낸다(이론적으로). 그리고 19인치 모니터는 대각선으로 17.4인치 밖에 되지 않는다(마지막 것은 농담이지만, 인용되는 값이 예상하는 값과 반드시 일치하지 않는다는 예를 하나 더 든 것이다).
>
> 2의 거듭제곱에 대한 IEC 표준 명칭들이 있다. 1 키비바이트(KiB, kibibyte)는 1,024 바이트이고, 1 메비바이트(MiB, mebibyte)는 1,024 KiB 이며, 1 기비바이트(GiB, gibibyte)는 1,024 MiB 이다. 이 용어들을 실제로 사용하는 사람을 찾는 행운이 오길 바란다.
>
> 이들은 적어도 애매모호한 용량을 더 이상 사용하지는 않는다.[^raymond-67]

## Deprecated
### 오래된 한국어에서 동물의 나이를 세기

- [하룻강아지 - 국립국어원, 조항범(趙恒範) / 충북대학교]( https://www.korean.go.kr/nkview/nknews/199911/16_3.htm )
    - [archive.org]( https://web.archive.org/web/20181018091322/https://www.korean.go.kr/nkview/nknews/199911/16_3.htm )

| 나이 | 세는 말                                                                                                                                  |
|------|------------------------------------------------------------------------------------------------------------------------------------------|
| 1    | [하릅]( https://ko.dict.naver.com/small_detail.nhn?docid=41298500 ), [한습]( https://ko.dict.naver.com/small_detail.nhn?docid=41541900 ) |
| 2    | [이듭]( https://ko.dict.naver.com/small_detail.nhn?docid=30396000 ), [두습]( https://ko.dict.naver.com/small_detail.nhn?docid=10590600 ) |
| 3    | [사릅]( https://ko.dict.naver.com/small_detail.nhn?docid=19154300 ), [세습]( https://ko.dict.naver.com/small_detail.nhn?docid=21588800 ) |
| 4    | [나릅]( https://ko.dict.naver.com/small_detail.nhn?docid=6611600 )                                                                       |
| 5    | [다습]( https://ko.dict.naver.com/small_detail.nhn?docid=8431700 )                                                                       |
| 6    | [여습]( https://ko.dict.naver.com/small_detail.nhn?docid=26646000 )                                                                      |
| 7    | [이롭]( https://ko.dict.naver.com/small_detail.nhn?docid=30418600 )                                                                      |
| 8    | [여듭]( https://ko.dict.naver.com/small_detail.nhn?docid=26592100 )                                                                      |
| 9    | [구릅]( https://ko.dict.naver.com/small_detail.nhn?docid=4154600 ), [아습]( https://ko.dict.naver.com/small_detail.nhn?docid=24781900 )  |
| 10   | [열릅]( https://ko.dict.naver.com/small_detail.nhn?docid=27068500 ), [담불]( https://ko.dict.naver.com/small_detail.nhn?docid=8849300 )  |


## Links

* [큰 수의 이름(wikipedia)](https://ko.wikipedia.org/wiki/%ED%81%B0_%EC%88%98%EC%9D%98_%EC%9D%B4%EB%A6%84 )

## 참고문헌

- 레이몬드 첸의 윈도우 개발 282 스토리 / 레이몬드 첸 저 / 손광수 역 / ITC / 초판 1쇄 2007년 09월 10일 / 원제 : The Old New Thing: Practical Development Throughout the Evolution of Windows

## 주석

[^si]: international system of units
[^raymond-67]: 레이몬드 첸의 윈도우 개발 282 스토리. Chapter 5. 67쪽.

