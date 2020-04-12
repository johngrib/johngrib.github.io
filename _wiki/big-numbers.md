---
layout  : wiki
title   : 좀 큰 숫자들
summary : 
date    : 2019-07-19 14:42:52 +0900
updated : 2020-04-12 15:25:18 +0900
tag     : 
toc     : true
public  : true
parent  : [[index]]
latex   : true
---
* TOC
{:toc}

$$
\def\ceil#1{\lceil #1 \rceil}
\def\floor#1{\lfloor #1 \rfloor}
\def\frfr#1{\{ #1 \}}
\def\bigceil#1{ \biggr\lceil #1 \biggr\rceil }
\def\bigfloor#1{ \biggr\lfloor #1 \biggr\rfloor }
$$

## 7 자리 - 로또 복권 경우의 수

```
  8,145,060
```

## 7 자리 - 서울시민의 수

- [출처: 행정안전부 주민등록 인구 및 세대 현황]( http://27.101.213.4/statMonth.do )

| 기준일      | 인구 수                   | 자리수 |
|-------------|---------------------------|--------|
| 2019년 12월 | 약 `9,729,107` 명 (973만) | 7 자리 |

## 8 자리 - 한국 인구 수

- [출처: 행정안전부 주민등록 인구 및 세대 현황]( http://27.101.213.4/statMonth.do )

| 기준일      | 인구 수                     | 자리수 |
|-------------|-----------------------------|--------|
| 2019년 12월 | 약 `51,849,861` 명 (5184만) | 8 자리 |

## 10 자리 - IPv4 주소 공간

- IPv4의 IP 주소는 32비트 이진수.
- [$$ \ceil{\log_{10} n} = 10 $$]( https://www.wolframalpha.com/input/?i=log_10+%282%5E32%29 )

```
2^{32} =
  4,294,967,296
```

## 10 자리 - 세계 인구 수

- [출처](https://www.worldometers.info/ )

| 기준일     | 인구 수                             | 자리수  |
|------------|-------------------------------------|---------|
| 2020-04-12 | 약 `7,777,189,571` 명 (77억 7718만) | 10 자리 |
| 2019-07-19 | 약 `7,718,603,090` 명 (77억 1860만) | 10 자리 |

## 13 자리 - 잔여 석유 배럴 수

| 기준일     | 잔여(barrel)                   | 자리수  | 고갈까지             |
|------------|--------------------------------|---------|----------------------|
| 2020-04-12 | 약 `1,511,989,370,363` barrels | 13 자리 | `15,768` 일(43.2 년) |

## 39 자리 - IPv6 주소 공간

- IPv6의 IP 주소는 128비트 이진수.
- [$$ \ceil{\log_{10} 2^{128}} = 39 $$]( https://www.wolframalpha.com/input/?i=log_10+%282%5E128%29 )

```
2^{128} =
340,282,366,920,938,463,463,374,607,431,
768,211,456
```

* 2019년 7월 19일 기준으로 세계 인구는 [약 7,718,603,090 명](https://www.worldometers.info/ )이다.

IPv6의 주소 공간을 세계 인구로 나눠 보면 약 $$ 44,086,004,028,604,412,079,359,117,224 $$ 이 나온다.

즉, 1명당 IP 주소를 이만큼 나눠줄 수 있다는 것.

## 49 자리 - $$2^{160}$$

- [$$ \ceil{\log_{10} 2^{160}} = 49 $$]( https://www.wolframalpha.com/input/?i=log_10+%282%5E160%29 )

```
2^{160} =
  1,461,501,637,330,902,918,203,684,832,
716,283,019,655,932,542,976
```
- SHA1

## 51 자리 - 지구의 원자 수

- 약 $$1.33 \times 10^{50}$$ 개.[^jlab] [^boyslife]
- [$$ \ceil{\log_{10} n} = 51 $$]( https://www.wolframalpha.com/input/?i=log_10+133000000000000000000000000000000000000000000000000 )

```
133,000,000,000,000,000,000,000,000,000,
000,000,000,000,000,000,000
```

[SHA1 공간보다 $$91.0023$$ 배 크다.]( https://www.wolframalpha.com/input/?i=133000000000000000000000000000000000000000000000000+%2F+%282%5E%7B160%7D%29%3B+ )

$$ \frac{ 1.33 \times 10^{50} }{ 2^{160} } = 91.0023 $$

## 78 자리 - $$2^{256}$$

- [$$ \ceil{\log_{10} 2^{256}} = 78 $$]( https://www.wolframalpha.com/input/?i=log_10+%282%5E256%29 )

```
2^{256} =
115,792,089,237,316,195,423,570,985,008,
687,907,853,269,984,665,640,564,039,457,
584,007,913,129,639,936
```

- SHA256

## 81 자리 - 우주 전체의 원자 수

약 $$10^{80}$$ 개.

- 참고 자료
    - [How Many Atoms Exist in the Universe?]( https://www.thoughtco.com/number-of-atoms-in-the-universe-603795 )
    - [How Many Atoms Are There In The Universe?]( https://www.scienceabc.com/nature/universe/how-many-atoms-are-there-in-the-universe.html )

## 101 자리 - Googol

$$10^{100}$$

## 155 자리 - $$2^{512}$$

- [$$ \ceil{\log_{10} 2^{512}} = 155 $$]( https://www.wolframalpha.com/input/?i=log_10+%282%5E512%29 )

```
2^{512} =
 13,407,807,929,942,597,099,574,024,998,
205,846,127,479,365,820,592,393,377,723,
561,443,721,764,030,073,546,976,801,874,
298,166,903,427,690,031,858,186,486,050,
853,753,882,811,946,569,946,433,649,006,
084,096
```

- SHA512

## 24,862,048 자리 - 2018년기준 발견된 가장 큰 소수

$$2^{82,589,933}-1$$

- [Largest known prime number]( https://en.wikipedia.org/wiki/Largest_known_prime_number )


## Link

* <https://www.worldometers.info/ >

## 주석

[^jlab]: [How many atoms are there in the world?](https://education.jlab.org/qa/mathatom_05.html )
[^boyslife]: [How Many Atoms Are There In The World?]( https://headsup.boyslife.org/many-atoms-world/ )

