---
layout  : wiki
title   : Floating Point 부동소수점
summary :
date    : 2018-10-28 08:03:23 +0900
updated : 2018-10-29 11:40:34 +0900
tag     : binary
toc     : true
public  : true
parent  : what
latex   : true
---
* TOC
{:toc}

# 정의

다음은 IEEE 754-2008 7~8쪽에서 인용한 것이다.

>
The set of finite floating-point numbers representable within a particular format is determined by the following integer parameters:
- $$b$$ = the radix, 2 or 10
- $$p$$ = the number of digits in the significand (precision)
- $$emax$$ = the maximum exponent $$e$$
- $$emin$$ = the minimum exponent $$e$$
    * $$emin$$ shall be $$1 − emax$$ for all formats.
The values of these parameters for each basic format are given in Table 3.2, in which each format is identified by its radix and the number of bits in its encoding. Constraints on these parameters for extended and extendable precision formats are given in 3.7.

>
Within each format, the following floating-point data shall be represented:  
- Signed zero and non-zero floating-point numbers of the form $$(−1)^s \times b^e \times m$$, where
    - $$s$$ is 0 or 1.
    - $$e$$ is any integer $$emin \le e \le emax..$$
    - $$m$$ is a number represented by a digit string of the form $$d_0 \cdot d_1 d_2...d_{p−1}$$ where $$d_i$$ is an integer digit $$0 \le d_i \lt b$$ (therefore $$0 \le m \lt b$$).
- Two infinities, $$+ \infty$$ and $$- \infty$$.
- Two NaNs, qNaN (quiet) and sNaN (signaling).


이 외에도 꽤 많은 기호/용어 정의가 있지만 이해에 필요한 최소한의 정보만 인용하였다.

# Binary format

* IEEE 754-2008 표준 문서를 보면 Binary format과 Decimal format 이 정의되어 있음을 알 수 있다.
    * Binary format은 세 종류.
    * Decimal format은 두 종류.

하지만 이 문서에서는 Decimal은 다루지 않는다.

**Table 3.5 - Binary interchange format parameters**

| Parameter     | binary16 | **binary32** | **binary64** | binary128 | binary{$$k$$} ($$k \ge 128$$)    |
|---------------|----------|--------------|--------------|-----------|----------------------------------|
| k             | 16       | **32**       | **64**       | 128       | multiple of 32<br/>$$1+w+t$$     |
| p             | 11       | **24**       | **53**       | 113       | $$k-round(4\times \log_2 k)+13$$ |
| emax          | 15       | **127**      | **1023**     | 16383     | $$2^{k-p-1}-1$$                  |
| bias, $$E-e$$ | 15       | **127**      | **1023**     | 16383     | $$emax$$                         |
| sign bit      | 1        | 1            | 1            | 1         | 1                                |
| w             | 5        | **8**        | **11**       | 15        | $$round(4\times \log_2 k)-13$$   |
| t             | 10       | **23**       | **52**       | 112       | $$k-w-1$$                        |

* k : storage width in bits. 저장 비트 수.
* p : precision in bits. the number of digits int the significant(precision).
* emax : the maximum exponent $$e$$
* sign bit : 부호 표시. 0 이면 $$+$$이고, 1 이면 $$-$$ 이다.
* w : exponent field width in bits. 지수부 비트 수.
* t : trailing significand field width in bits. 가수부 비트 수.

한편, Binary interchange floating-point format은 다음과 같은 모양을 갖추고 있다.

| S 부호 | E 지수부 | T 가수부       |
| 1 bit  | w bits   | t = p - 1 bits |

# single, double precision

* **float**은 길이가 32비트인 IEEE 단정도(single precision) 형식을 말한다.
    * float이 binary32에 해당한다.
* **double**은 길이가 64비트인 IEEE 배정도(double precision) 형식을 말한다.
    * double이 binary64에 해당한다.

# 변환 예제

## Example: -118.625를 binary64(double)로 나타내 보자

* 참고: -118.625는 [한국어 위키백과 IEEE 754 문서에서 예제](https://ko.wikipedia.org/wiki/IEEE_754#%EA%B5%AC%EC%A1%B0 )로 사용하고 있는 숫자이다.

메모리에 다음과 같이 공간이 할당되었다고 치고, $$-118.625$$를 binary64 즉 double로 나타내 보자.

| S 부호 | E 지수부(w bits) | T 가수부(t bits)                                     |
| 0      | 00000000000      | 0000000000000000000000000000000000000000000000000000 |

* 64 비트이므로, 지수부는 $$w = 11$$ 개 비트를 차지한다.
    * 공식으로 계산하면 $$round(4 \times \log_2 64)-13 = 24 - 13 = 11$$.
* 가수부는 $$t = 52$$ 개 비트를 차지한다.
    * 공식으로 계산하면 $$k-w-1 = 64 - 11 - 1 = 52$$.

$$-118.625$$는 음수이므로, 부호 $$S = 1$$ 이 된다.

| S 부호 | E 지수부(w bits) | T 가수부(t bits)                                     |
| **1**  | 00000000000      | 0000000000000000000000000000000000000000000000000000 |

음수는 표현했으니 이제 $$118.625$$를 이진법으로 어떻게 표현하는지 조사하자.

$$
\begin{align}
118     & = 2^6 + 2^5 + 2^4 + 2^2 + 2^1     & = & 1110110_2 \\
0.625   & = \frac{1}{2^1} + \frac{1}{2^3}   & = & 0.101_2 \\
\therefore 118.625 & = 1110110.101_2        & & \\
\end{align}
$$

이제 정규화해보자. 소수점 왼쪽에 숫자 하나만 남도록 하면 된다.

$$
1110110.101_2 = 1.110110101_2 \times 2^6 \\
$$

이제 지수부 $$E$$를 채워 보자.

정규화 결과, $$2^6$$ 을 얻었으므로, 지수 $$e = 6$$ 이다.

이제 $$bias = E - e$$ 공식에 넣어 보자.

binary64의 bias는 $$1023$$이므로, $$1023 = E - 6$$ 이 된다.

따라서 $$E = 1029 = 10000000101_2$$ 이다.

| S 부호 | E 지수부(w bits) | T 가수부(t bits)                                     |
| 1      | **10000000101**  | 0000000000000000000000000000000000000000000000000000 |

이제 가수부를 채워 보자.

$$
1110110.101_2 = 1.110110101_2 \times 2^6 \\
$$

여기에는 $$1.110110101_2$$ 에서 가장 왼쪽의 $$1$$을 제외하고 $$0.110110101_2$$ 만 사용해서, 왼쪽부터 채워 넣는다.

| S 부호 | E 지수부(w bits) | T 가수부(t bits)                                         |
| 1      | 10000000101      | **110110101**0000000000000000000000000000000000000000000 |

코드로도 확인해 보고 싶어서 다음과 같이 Go 코드를 작성하였다.

```go
package main

import (
    "fmt"
    "math"
)

func main() {
    v := float64(-118.625)
    printBin64(v)
}

func toBin64(n float64) string {
    return fmt.Sprintf("%064b", math.Float64bits(n))
}

func printBin64(n float64) {
    bin := toBin64(n)
    sign := bin[:1]
    exponent := bin[1:12]
    fraction := bin[12:]
    fmt.Println(sign + "_" + exponent + "_" + fraction)
}
```

위의 코드를 실행해보면 다음과 같이 출력된다.

```
1_10000000101_1101101010000000000000000000000000000000000000000000
```

## Example: $$\pi$$를 binary64(double)로 나타내보자

일단 $$\pi \gt 0$$ 이므로, 양수. 부호는 $$0$$이 된다.

| S 부호 | E 지수부(w bits) | T 가수부(t bits)                                     |
| **0**  | 00000000000      | 0000000000000000000000000000000000000000000000000000 |

[$$\pi$$의 이진법 표현](https://www.wolframalpha.com/input/?i=pi+to+binary )은 다음과 같다.

$$\pi = 11.001001000011111101101010100010001000010110100011000010001101..._2$$

정규화를 해보면 다음과 같을 것이다.

$$1.1001001000011111101101010100010001000010110100011000010001101..._2 \times 2^1$$

$$bias = E-e$$ 공식에 지수 $$e = 1$$을 넣어 보면...

$$1023 = E - 1$$ 이므로, $$E = 1024 = 10000000000_2$$ 이다.

| S 부호 | E 지수부(w bits) | T 가수부(t bits)                                     |
| 0      | **10000000000**  | 0000000000000000000000000000000000000000000000000000 |

이제 소수점 왼쪽의 1만 제외하고 왼쪽부터 가수부에 채워넣으면 된다.

| S 부호 | E 지수부(w bits) | T 가수부(t bits)                                         |
| 0      | 10000000000      | **1001001000011111101101010100010001000010110100011000** |

이번에도 Go 코드로 확인해 보자.

```go
printBin64(math.Pi)
```

다음과 같은 결과가 나온다.

```
0_10000000000_1001001000011111101101010100010001000010110100011000
```


## 0.5를 binary64(double)로 나타내보자

정규화 결과 지수가 음수값이 나오는 경우를 살펴보자.

부호 먼저 채우고 시작하자.

| S 부호 | E 지수부(w bits) | T 가수부(t bits)                                     |
| **0**  | 00000000000      | 0000000000000000000000000000000000000000000000000000 |

0.5의 이진 표현은 $$0.1_2$$ 이다.

정규화를 하면 $$1.0_2 \times \frac{1}{2}$$ 이 된다.

$$bias = E-e$$ 공식에 지수 $$e = -1$$을 넣어 보면...

$$1023 = E + 1$$ 이므로, $$E = 1022 = 1111111110_2$$ 이다.

| S 부호 | E 지수부(w bits) | T 가수부(t bits)                                     |
| 0      | **01111111110**  | 0000000000000000000000000000000000000000000000000000 |

이제 소수점 왼쪽의 1만 제외하고 왼쪽부터 가수부에 채워넣으면 된다.

| S 부호 | E 지수부(w bits) | T 가수부(t bits)                                         |
| 0      | 01111111110      | **0000000000000000000000000000000000000000000000000000** |

Go 코드로 확인해 보면 다음과 같이 나온다.

```
0_01111111110_0000000000000000000000000000000000000000000000000000
```

# subnormal number

>
if $$e=emin$$ and $$0<m<1$$, the floating-point number is subnormal.  
Subnormal numbers (and zero) are encoded with a reserved biased exponent value.

>
The range of the encoding’s biased exponent E shall include:
- every integer between 1 and $$2^w − 2$$, inclusive, to encode normal numbers
- the reserved value $$0$$ to encode $$\pm 0$$ and subnormal numbers
- the reserved value $$2^w − 1$$ to encode $$\pm \infty$$ and **NaNs**.

* $$\pm 0$$과 그 외의 부정규 숫자 $$E = 0$$ 이다.
* 무한대 값은 $$2^w - 1$$, 즉 `1`로 가득찬 $$E$$ 값을 갖는다.

부정규 수의 범위는 다음과 같다.

| float 부정규 최소값  | $$2^{-149} \approx 1.401 \times 10^{-45}$$              |
| double 부정규 최소값 | $$2^{-1074} \approx 4.941 \times 10^{-324}$$            |
| float 부정규 최대값  | $$2^{-126}(1-2^{-23}) \approx 1.175 \times 10^{-38}$$   |
| double 부정규 최대값 | $$2^{-1022}(1-2^{-52}) \approx 2.225 \times 10^{-308}$$ |

## $$+\infty$$

* 무한대는 E가 전부 1이고, T가 전부 0이다.

| 32 bit | 0_11111111_00000000000000000000000                                 |
| hex    | 7F80 0000                                                          |
| 64 bit | 0_11111111111_0000000000000000000000000000000000000000000000000000 |
| hex    | 7FF0 0000 0000 0000                                                |

## $$-\infty$$

| 32 bit | 1_11111111_00000000000000000000000                                 |
| hex    | FF80 0000 0000 0000                                                |
| 64 bit | 1_11111111111_0000000000000000000000000000000000000000000000000000 |
| hex    | FFF0 0000 0000 0000                                                |

## NaN

Not A Number.

>
6.2 Operations with NaNs  
Two different kinds of NaN, signaling and quiet, shall be supported in all floating-point operations. Signaling NaNs afford representations for uninitialized variables and arithmetic-like enhancements (such as complex-affine infinities or extremely wide range) that are not in the scope of this standard. Quiet NaNs should, by means left to the implementer’s discretion, afford retrospective diagnostic information inherited from invalid or unavailable data and results. To facilitate propagation of diagnostic information contained in NaNs, as much of that information as possible should be preserved in NaN results of operations.

NaN에는 두 종류가 있다.

* signaling NaN : 초기화되지 않은 변수나 표준에서 벗어난 연산 등을 표현한다.
* quiet NaN : 예외처리, 잘못된 값이나 사용 불가능한 데이터 등을 표현하는 데 사용하도록 (프로그래밍 언어) 구현자의 재량에 맡김.

>
6.2.1 NaN encodings in binary formats  
(생략)  
All binary NaN bit strings have all the bits of the biased exponent field E set to 1 (see 3.4).
A **quiet NaN** bit string should be encoded with the first bit ($$d_1$$) of the trailing significand field T being **1**.
A **signaling NaN** bit string should be encoded with the first bit of the trailing significand field being **0**.
If the first bit of the trailing significand field is 0, **some other bit of the trailing significand field must be non-zero to distinguish the NaN from infinity**.
In the preferred encoding just described, a signaling NaN shall be quieted by setting $$d_1$$ to 1, leaving the remaining bits of T unchanged.
For binary formats, the payload is encoded in the $$p−2$$ least significant bits of the trailing significand field.

NaN은 다음과 같이 표현한다.

* NaN의 E는 전부 1이다. (무한대와 같은 E를 갖고 있다.)
* 그러나 무한대와 달리 T 는 0이 아니며, T의 값에 따라 NaN의 타입을 구분한다.
* quiet NaN
    * T의 첫 번째 비트가 **1**이다.
* signaling NaN
    * T의 첫 번째 비트가 **0**이다.
        * 첫 번째 비트를 1로 바꾸면 quiet NaN이 된다.
    * 무한대와 구별하기 위해 그 뒤에 다른 값을 넣어준다.
    * 보통은 마지막에 1을 넣어주는 것 같다.

| 64 bit | 0_11111111111_1000000000000000000000000000000000000000000000000000 |
| hex    | 7FF8 0000 0000 0000                                                |
| 64 bit | 0_11111111111_0000000000000000000000000000000000000000000000000001 |
| hex    | 7FF0 0000 0000 0001                                                |

## 0.0 과 1.0

0.0 과 1.0 은 부정규 숫자는 아니지만 값을 보고 싶어 넣어 보았다.

| 32 bit | 0_00000000_00000000000000000000000                                 |
| hex    | 0000 0000                                                          |
| 64 bit | 0_00000000000_0000000000000000000000000000000000000000000000000000 |
| hex    | 0000 0000 0000 0000                                                |

* 참고로 $$1.0$$은 $$1.0 \times 2^0$$인 정규 숫자이므로 $$E - 0 = 1023 = 1111111111_2$$.

| 32 bit | 0_01111111_00000000000000000000000                                 |
| hex    | 3F80 0000                                                          |
| 64 bit | 0_01111111111_0000000000000000000000000000000000000000000000000000 |
| hex    | 3FF0 0000 0000 0000                                                |


## 극한값

### Smallest subnormal(가장 작은 부정규)

| 단정도 | 값     | $$2^{-149}$$                                                                  |
|        | 근사값 | $$1.4012984643248170709237295832899161312802619418765157... \times 10^{-45}$$ |
|        | 32 bit | 0_00000000_0000000000000000000000**1**                                        |
| 배정도 | 값     | $$2^{-1074}$$                                                                 |
|        | 근사값 | $$4.940656458412465441765687928682213723650598026143247... \times 10^{-324}$$ |
|        | 64 bit | 0_00000000000_000000000000000000000000000000000000000000000000000**1**        |

### Largest subnormal(가장 큰 부정규)

| 단정도 | 값     | $$2^{-126} \times (1 - 2^{-23})$$                                             |
|        | 근사값 | $$1.1754942106924410754870294448492873488270524287458933... \times 10^{-38}$$ |
|        | bit    | 0_00000000_11111111111111111111111                                            |
| 배정도 | 값     | $$2^{-1022} \times (1 - 2^{-52})$$                                            |
|        | 근사값 | $$2.225073858507200889024586876085859887650423112240959... \times 10^{-308}$$ |
|        | bit    | 0_00000000000_1111111111111111111111111111111111111111111111111111            |

### Smallest normal(가장 작은 정규)

| 단정도 | 값     | $$2^{-126}$$                                                                  |
|        | 근사값 | $$1.1754943508222875079687365372222456778186655567720875... \times 10^{-38}$$ |
|        | bit    | 0_0000000**1**_00000000000000000000000                                        |
| 배정도 | 값     | $$2^{-1022}$$                                                                 |
|        | 근사값 | $$2.225073858507201383090232717332404064219215980462331 \times 10^{-308}$$    |
|        | bit    | 0_0000000000**1**_0000000000000000000000000000000000000000000000000000        |

### Largest normal(가장 큰 정규)

| 단정도 | 값     | $$2^{128} \times (1 - 2^{-24})$$                                               |
|        | 근사값 | $$3.4028234663852885981170418348451692544 \times 10^{38}$$                     |
|        | bit    | 0_1111111**0**_11111111111111111111111                                         |
| 배정도 | 값     | $$2^{1024} \times (1 - 2^{-53})$$                                              |
|        | 근사값 | $$1.7976931348623157081452742373170435679807056752584499... \times 10^{308} $$ |
|        | bit    | 0_1111111111**0**_1111111111111111111111111111111111111111111111111111         |

### Max integer(최대 정수)

* 정확하게 표현할 수 있는 최대 정수

| 단정도 | 값  | $$2^{24} = 16777216$$                                              |
|        | bit | 0_10010111_00000000000000000000000                                 |
| 배정도 | 값  | $$2^{53} = 9007199254740992$$                                      |
|        | bit | 0_10000110100_0000000000000000000000000000000000000000000000000000 |

정말 정확도가 떨어지는지 확인해보자.

```go
foo := math.Pow(2, 53) - 1
bar := math.Pow(2, 53) - 2

fmt.Println(foo == bar) // false
fmt.Println(foo > bar)  // true
fmt.Println(foo < bar)  // false
fmt.Println(foo - bar)  // 1
```

* $$2^{53}$$보다 작은 수에서는 별다른 문제가 없어 보인다.

```go
foo := math.Pow(2, 53) + 1
bar := math.Pow(2, 53) + 2

fmt.Println(foo == bar) // false
fmt.Println(foo > bar)  // false
fmt.Println(foo < bar)  // true
fmt.Println(foo - bar)  // -2
```

* 그러나 1, 2가 커지가 결과가 이상하게 나와버린다.
* 크기 비교는 올바르게 나왔지만 `foo - bar`가 `-2`가 나왔다. 수학적으로는 `-1`이 나와야 한다.

# Rounding

>
4.3 Rounding-direction attributes  
Rounding takes a number regarded as infinitely precise and, if necessary, modifies it to fit in the destination’s format while signaling the inexact exception, underflow, or overflow when appropriate (see 7). Except where stated otherwise, every operation shall be performed as if it first produced an intermediate result correct to infinite precision and with unbounded range, and then rounded that result according to one of the attributes in this clause.

* 무한한 정밀도가 필요한 숫자를 다룰 때 반올림이 사용된다.
* 필요한 경우, 대상 포맷에 맞추기 위해 반올림으로 숫자를 변경한다.

>
4.3.1 Rounding-directionattributestonearest  
In the following two rounding-direction attributes, an infinitely precise result with magnitude at least $$b^{emax}(b − \frac{1}{2} b^{1−p})$$ shall round to $$\infty$$ with no change in sign; here emax and p are determined by the destination format (see 3.3). With:
- **roundTiesToEven**, the floating-point number nearest to the infinitely precise result shall be delivered; if the two nearest floating-point numbers bracketing an unrepresentable infinitely precise result are equally near, the one with an even least significant digit shall be delivered
- roundTiesToAway, the floating-point number nearest to the infinitely precise result shall be delivered; if the two nearest floating-point numbers bracketing an unrepresentable infinitely precise result are equally near, the one with larger magnitude shall be delivered.

* roundTiesToEven : 부동 소수점으로 표현할 수 없는 무한한 정밀도가 있는 숫자를 표현할 때, 두 개의 부동 소수점 숫자가 표현하려 하는 숫자와 똑같이 가까운 경우, 더 작은 최하위 숫자를 갖고 있는 숫자를 선택한다.

>
4.3.3 Rounding attribute requirements  
An implementation of this standard shall provide roundTiesToEven and the three directed rounding attributes. A decimal format implementation of this standard shall provide roundTiesToAway as a user-selectable rounding-direction attribute. The rounding attribute roundTiesToAway is not required for a binary format implementation.  
The **roundTiesToEven** rounding-direction attribute shall be the default rounding-direction attribute for results in binary formats. The default rounding-direction attribute for results in decimal formats is language- defined, but should be roundTiesToEven.

* binary format에서는 **roundTiesToEven**을 쓴다.

## 0.1 + 0.2 = 0.30000000000000004

유명한 케이스인 `0.1 + 0.2 = 0.30000000000000004`를 시뮬레이션 해보자.

`0.1` + `0.2` 를 해보면 `0.3` 이 아니라 `0.30000000000000004`가 나온다는 것은 널리 알려진 사실이다.

일단 `0.1`, `0.2`, `0.3`, `0.30000000000000004`의 비트를 보면 다음과 같다.

```
                                                                   ,,,,
0.1: 0_01111111011_1001100110011001100110011001100110011001100110011010
0.2: 0_01111111100_1001100110011001100110011001100110011001100110011010
0.3: 0_01111111101_0011001100110011001100110011001100110011001100110011
0.30000000000000004
   : 0_01111111101_0011001100110011001100110011001100110011001100110100
```

* `0.1`과 `0.2`는 이진법으로 표현했을 때 `1001`이 무한히 반복되는 무한소수이다.
* 그런데 `0.1`과 `0.2`의 비트 마지막 부분을 잘 관찰해 보면 `1001`반복이 `1010`으로 손상되어 있음을 알 수 있다.
* 반올림 때문이다.
    * `10011` 을 `10100`으로 반올림하고, 마지막 `0`을 잘라내면 `1010`이 된다.

두 수를 더해보자. 자릿수 변화를 알기 쉽도록 오른쪽 끝에 `\\`를 표시했다.

```
0.1 = 0_01111111011_1001100110011001100110011001100110011001100110011010  \\
0.2 = 0_01111111100_1001100110011001100110011001100110011001100110011010  \\
```

더해주려면 $$e$$ 값을 맞춰줘야 한다. 결과가 될 0.3 기준으로 지수를 맞춰보면 다음과 같을 것이다.
(컴퓨터는 아직 계산하지 않은 결과에 맞추지 않겠지만 이해를 쉽게 하기 위해 0.3에 맞추었다.)

```
0.1 = 0_01111111101_011001100110011001100110011001100110011001100110011010\\
0.2 = 0_01111111101_11001100110011001100110011001100110011001100110011010 \\
```

덧셈을 위해 둘 다 소수점을 왼쪽으로 이동시키면서 생략했던 `1.`을 살려놓았다.

이제 두 수의 가수부만 떼어다 계산해보면 다음과 같은 결과가 나온다.

```
   011001100110011001100110011001100110011001100110011010
 + 11001100110011001100110011001100110011001100110011010
 =100110011001100110011001100110011001100110011001100111
```

이제 이 값을 그대로 double로 표현해보자.

제일 앞의 1은 생략될 것이다.

```
00110011001100110011001100110011001100110011001100111
                                                   ^ 여기까지가 52자
```

그 다음은 길이를 52자로 맞춰야 한다. 현재 길이는 53자이므로, 마지막의 1을 반올림해야 한다.

```
0011001100110011001100110011001100110011001100110100
                                                   ^
```

이제 이렇게 얻은 가수부를 지수부와 합쳐서 표현하면 다음과 같이 된다.

```
// 0.30000000000000004
0_01111111101_0011001100110011001100110011001100110011001100110100
```

그냥 0.3 의 비트와 비교해 보면 반올림된 0.1과 0.2의 영향을 받아 0.3보다 조금 더 큰 숫자가 되었음을 알 수 있다.

```
// 0.3
0_01111111101_0011001100110011001100110011001100110011001100110011
// 0.30000000000000004                                         ^^^
0_01111111101_0011001100110011001100110011001100110011001100110100
                                                               ^^^
```

# Links

* <https://www.google.co.kr/search?q=ieee+754-2008+filetype%3Apdf >
    * [754-2008 - IEEE Standard for Floating-Point Arithmetic](https://ieeexplore.ieee.org/document/4610935 ) - Active - Approved
    * [PDF: IEEE Standard for Floating-Point Arithmetic (www.dsc.ufcg.edu.br)](http://www.dsc.ufcg.edu.br/~cnum/modulos/Modulo2/IEEE754_2008.pdf )
    * [PDF: IEEE Standard for Floating-Point Arithmetic (irem.univ-reunion.fr)](http://irem.univ-reunion.fr/IMG/pdf/ieee-754-2008.pdf )
* <https://www.google.co.kr/search?q=ieee+754-1985+filetype%3Apdf >
    * [754-1985 - IEEE Standard for Binary Floating-Point Arithmetic](https://ieeexplore.ieee.org/document/30711 ) - superseded

---

* [https://0.30000000000000004.com](https://0.30000000000000004.com)
* [메아리 저널의 2015년 11월 14일 글](http://j.mearie.org/post/133187760423/inaccuracy-and-inexactness-of-floating-point)
* [IEEE 부동 소수점 오류의 이해를 위한 자습서(archive.fo)](http://archive.fo/ZGda8 ) - Microsoft Support의 글인데 원문이 삭제되었다.

# 참고문헌

* [해커의 기쁨(제2판): 비트와 바이트 그리고 알고리즘](http://jpub.tistory.com/326 )
