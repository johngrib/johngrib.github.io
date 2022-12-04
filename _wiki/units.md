---
layout  : wiki
title   : 단위, 숫자를 세는 방법
summary : 
date    : 2019-02-22 06:53:06 +0900
updated : 2021-09-12 18:41:32 +0900
tag     : unit
resource: FE/DA2033-EBBF-4B63-82E2-17EEB8758D21
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

## 데이터 단위

| 명칭      | 축약 표기 | 사이즈    |
|-----------|-----------|-----------|
| bit       |           | 1         |
| byte      |           | 8 bit     |
| kilobyte  | KB        | 1024 byte |
| megabyte  | MB        | 1024 KB   |
| gigabyte  | GB        | 1024 MB   |
| terabyte  | TB        | 1024 GB   |
| petabyte  | PB        | 1024 TB   |
| exabyte   | EB        | 1024 PB   |
| zettabyte | ZB        | 1024 EB   |
| yottabyte | YB        | 1024 ZB   |

### 바이트 크기에 대한 2의 거듭제곱 IEC 표준 명칭

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

#### From: 레이몬드 첸의 윈도우 개발 282 스토리

> 2003년에 컴퓨터 제조업체가 하드 드라이브 용량에 대해 소비자를 현혹시킨 데 대한 소송이 제기되어 한 때 물의를 일으킨 적이 있다. 이 제조업체는 1기가바이트가 10억 바이트라고 되어 있는 ISO 정의를 사용했다(대부분의 사람들은 1기가바이트가 1,024 메가바이트라고 알고 있지만).
>
> 이것은 다루기 힘든 문제이다. 컴퓨터 업계는 킬로, 메가 등의 접두사가 10의 거듭제곱인지 2의 거듭제곱인지에 대해 일관성이 없다. 2의 거듭제곱이 우세한 유일한 곳은 저장소 용량을 나타낼 때이다. 그 밖의 모든 것은 10의 거듭제곱이다. 즉, 1GHz 프로세서는 1초에 1,073,741,824 사이클이 아닌 10억 사이클의 속도로 실행된다. 28.8K 모뎀은 초당 29,491 비트가 아니라 28,800 비트의 최고 속도를 낸다(이론적으로). 그리고 19인치 모니터는 대각선으로 17.4인치 밖에 되지 않는다(마지막 것은 농담이지만, 인용되는 값이 예상하는 값과 반드시 일치하지 않는다는 예를 하나 더 든 것이다).
>
> 2의 거듭제곱에 대한 IEC 표준 명칭들이 있다. 1 키비바이트(KiB, kibibyte)는 1,024 바이트이고, 1 메비바이트(MiB, mebibyte)는 1,024 KiB 이며, 1 기비바이트(GiB, gibibyte)는 1,024 MiB 이다. 이 용어들을 실제로 사용하는 사람을 찾는 행운이 오길 바란다.
>
> 이들은 적어도 애매모호한 용량을 더 이상 사용하지는 않는다.
>
-- 레이몬드 첸의 윈도우 개발 282 스토리. Chapter 5. 67쪽.

#### From: 한 권으로 읽는 컴퓨터 구조와 프로그래밍

>
큰 수를 가리키기 위해 사용하는 표준 용어가 존재한다. 음... 예전에도 표준이 있었지만 이제는 다른 새로운 표준으로 변경됐다.
엔지니어들은 자신이 원하는 것에 가까운 뜻의 단어를 찾아내서, 마치 자기들이 원하는 뜻의 단어인 것처럼 사용하는 습관이 있다.
예를 들어 미터법에서 킬로<sup>kilo</sup>는 1천, 메가<sup>mega</sup> 는 100만, 기가<sup>giga</sup>는 10억, 테라<sup>tera</sup>는 1조를 뜻한다.
컴퓨터 엔지니어들은 이런 용어를 빌려와서 사용하되 의미를 약간 바꿔서 밑이 10 이 아니라 2인 값을 표현하게 했다.
그래서 킬로비트<sup>kilobit</sup> 킬로바이트<sup>kilobyte</sup>에서 킬로는 실제로는 1000 을 뜻하지 않고,
밑이 2이면서 1000 에 가장 가까운 수인 1024, 즉 2<sup>10</sup>을 뜻했다.
비슷하게 메가바이트<sup>megabyte</sup>(M 또는 MB)의 메가는 2<sup>20</sup>,
기가바이트<sup>gigabyte</sup>(G 또는 GB)의 기가는 2<sup>30</sup>, 테라바이트<sup>terabyte</sup>(T 또는 TB)의 테라는 200 이었다.
>
하지만 때때로 이런 말들이 밑이 10인 용어를 뜻할 때도 있다.
따라서 어떤 밑으로 해석할지 알려면 문맥을 봐야 한다.
전통적으로 디스크 크기를 다룰 때는 밑을 10으로 사용했다.
미국 변호사 한 명이 이런 사실을 모르는 척하면서 디스크 크기가 광고에 나온 것보다 작다고 디스크 제조사를 고소했다(사피어 Safier 대 WDC 소송이다.
내 생각에 이 소송은 마치 2인치x4인치 목재라는 용어가 항상 대패질하지 않고 건조하지 않은 상태의 목재 크기를 뜻했다는 사실을 무시하고 2×4 목재 의 크기가 실제로 2인치 ×4인치 크기보다 작다고 소송하는 것과 같이 멍청한 짓이다).
이로 인해 새로운 IEC 표준 접두사가 만들어졌다.
키비<sup>kibi</sup>(KiB)는 2<sup>10</sup>, 메비<sup>mebi</sup>(MiB)는 2<sup>20</sup>, 기비<sup>gibi</sup>(GiB)는 2<sup>30</sup>, 테비<sup>tebi</sup>(TiB)는 2<sup>40</sup>을 뜻한다.
'키비즈'라는 말은 마치 개 먹이 이름같이 들리는데도, 이런 용어를 쓰는 경우가 조금씩 늘고 있다.
>
-- 한 권으로 읽는 컴퓨터 구조와 프로그래밍. 1장. 78쪽.


## Deprecated
### 오래된 한국어에서 동물의 나이를 세기

- [하룻강아지 - 국립국어원, 조항범(趙恒範) / 충북대학교]( https://www.korean.go.kr/nkview/nknews/199911/16_3.htm )
    - [archive.org]( https://web.archive.org/web/20181018091322/https://www.korean.go.kr/nkview/nknews/199911/16_3.htm )

1982년에 태어난 나는 2021년인 지금까지 실생활에서 동물을 셀 때 이 단위를 쓰는 사람을 한 번도 만나보지 못했다.

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
- 한 권으로 읽는 컴퓨터 구조와 프로그래밍 / 조너선 스타인하트 저/오현석 역 / 책만 / 2021년 04월 08일 초판 1쇄 / 원서 : The Secret Life of Programs: Understand Computers -- Craft Better Code

