---
layout  : wiki
title   : 카이사르 암호(Caesar cipher)
summary : 자리이동식 암호법
date    : 2019-03-09 18:06:30 +0900
updated : 2019-06-04 21:21:38 +0900
tag     : encryption
toc     : true
public  : true
parent  : what
latex   : true
---
* TOC
{:toc}

# 카이사르 암호

* 카이사르 암호는 로마의 Julius Caesar가 사용했다고 전해지는 암호 시스템이다.
* 각 알파벳을 세 글자 차이나는 글자로 치환하는 방식.
    * 예: **A**를**D**로, **X**를 **A**로 바꾸는 방식.

단순히 알파벳의 자리를 옮기는 방식이기 때문에 자리이동식 암호법(shift cipher)이라고도 부른다.

## 암호화

각 알파벳을 $$[0, 25]$$ 범위의 정수로 생각하면 암호화 방법을 다음과 같이 표현할 수 있다.

$$
f(p) = (p + 3) \bmod 26
$$

## 복호화

$$ f $$ 의 역함수 $$ f^{-1} $$를 사용하면 암호문을 복호화할 수 있다.

$$
f^{-1}(p) = (p - 3) \bmod 26
$$

## 코드로 구현해보자

`%` 연산자를 쓰기 곤란하므로 `mod` 함수부터 구현하자.

* `%` 연산자가 부호를 무시하고 나머지를 구하기 때문이다.
    * 나머지는 항상 양수여야 하는데, 음수가 나오므로 그대로 사용하기 곤란하다.
    * 가령 `-13 % 4`의 결과로 `3` 이 나와야 하는데 `-1` 이 나온다.

```js
Number.prototype.mod = function(n) {
    return ((this % n) + n) % n;
}
```

암호문으로 대문자만 사용한다는 전제 하에 몇 가지 상수를 정의하자.

```js
// A: 65, Z: 90
const PADDING = 65;
const LIMIT = 90;
const N = 26;
const KEY = 3;
```

대문자만 다룰 것이므로, 식별하는 함수도 만들어 주자.

```js
function isUpperCase(code) {
    return PADDING <= code && code <= LIMIT;
}
```

그리고 다음과 같이 암호화 알고리즘을 구현했다.

caesar 함수는 암호화와 복호화의 방식이 더하기냐 빼기냐 밖에 없기 때문에
해당 부분을 책임지는 `keyFunc`를 받아 암호/복호화하도록 하였다.

```js
function caesar(msg, keyFunc) {
    let enc = '';
    for (var i = 0; i < msg.length; i++) {
        const code = msg.charCodeAt(i);

        if (!isUpperCase(code)) {
            enc += msg[i];
            continue;
        }

        const original = code - PADDING;
        const encrypted = keyFunc(original).mod(N);
        enc += String.fromCharCode(encrypted + PADDING);
    }
    return enc;
}
```

암/복호화 여부를 결정하는 함수도 만들어 주었다.

```js
function encrypt(num) {
    return num + KEY;
}

function decrypt(num) {
    return num - KEY;
}
```

실행하면 다음과 같은 결과가 나온다.

```js
enc  = caesar("MEET YOU IN THE PARK", encrypt);
// "PHHW BRX LQ WKH SDUN"

caesar(enc, decrypt);
// "MEET YOU IN THE PARK"
```

# 아핀 암호

**Affine cipher**

다음 함수를 사용하면 카이사르 암호를 일반화할 수 있다.

$$ f(p) = (ap + b) \bmod 26 $$

단, 다음의 조건을 만족해야 한다.

* $$ a, b $$ 는 정수.
* $$ \gcd(a, 26) = 1 $$.
* $$ f $$ 는 전단사 함수(일대일 대응).

## 아핀 암호의 해독

$$
f(p) = (ap + b) \bmod 26 = c\\
$$

p 를 암호화한 결과를 c라 하자.

c는 $$ap + b$$와 $$\bmod 26$$에서 합동이므로 다음과 같이 생각할 수 있다.

$$
\begin{align}
c     & ≡ ap + b (\bmod 26) \\
c - b & ≡ ap (\bmod 26) \\
\end{align}
$$

**a 모듈로 26**의 역 $$ \bar{a} $$를 알아낼 수 있다면 다음과 같이 p를 구할 수 있다.
(전제에서 $$ \gcd(a, 26) = 1 $$ 이었으므로, **a 모듈로 26**의 역 $$\bar{a}$$는 존재한다.)

$$
\begin{align}
c - b & ≡ ap (\bmod 26) \\
\bar{a}(c-b) & ≡ a \bar{a} p (\bmod 26)  \\
\bar{a}(c-b) & ≡ p (\bmod 26)  \\
\end{align}
$$

## 글자 빈도 검사를 통한 아핀 암호의 해독

카이사르 암호, 아핀 암호의 해독은 글자 빈도를 따져보면 풀 수 있는 경우가 많다.

다음은 알파벳 빈도를 표로 나타낸 것이다.

| Letter | Count | Frequency |
|--------|-------|-----------|
| E      | 21912 | 12.02     |
| T      | 16587 | 9.10      |
| A      | 14810 | 8.12      |
| O      | 14003 | 7.68      |
| I      | 13318 | 7.31      |
| N      | 12666 | 6.95      |
| S      | 11450 | 6.28      |
| R      | 10977 | 6.02      |
| H      | 10795 | 5.92      |
| D      | 7874  | 4.32      |
| L      | 7253  | 3.98      |
| U      | 5246  | 2.88      |
| C      | 4943  | 2.71      |
| M      | 4761  | 2.61      |
| F      | 4200  | 2.30      |
| Y      | 3853  | 2.11      |
| W      | 3819  | 2.09      |
| G      | 3693  | 2.03      |
| P      | 3316  | 1.82      |
| B      | 2715  | 1.49      |
| V      | 2019  | 1.11      |
| K      | 1257  | 0.69      |
| X      | 315   | 0.17      |
| Q      | 205   | 0.11      |
| J      | 188   | 0.10      |
| Z      | 128   | 0.07      |

* [자료 출처](http://pi.math.cornell.edu/~mec/2003-2004/cryptography/subs/frequencies.html)



# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일

# See also

* [[discrete-math-modular]]{모듈러 연산(나머지 연산)}
* [[/wiki/discrete-math-linear-congruences/#a-모듈로-m-의-역inverse]]{a 모듈로 m의 역}
* [English Letter Frequency (based on a sample of 40,000 words)](http://pi.math.cornell.edu/~mec/2003-2004/cryptography/subs/frequencies.html)
* [Letter frequency](https://en.wikipedia.org/wiki/Letter_frequency)
