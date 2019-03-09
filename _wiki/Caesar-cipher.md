---
layout  : wiki
title   : 카이사르 암호(Caesar cipher)
summary : 자리이동식 암호법
date    : 2019-03-09 18:06:30 +0900
updated : 2019-03-09 19:24:32 +0900
tags    : encryption
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


# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일

# See also

* [[discrete-math-modular]]{모듈러 연산(나머지 연산)}
