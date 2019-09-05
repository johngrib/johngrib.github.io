---
layout  : wiki
title   : RSA 암호(RSA Encryption)
summary : 
date    : 2019-03-10 09:24:37 +0900
updated : 2019-09-05 18:25:20 +0900
tag     : encryption
toc     : true
public  : true
parent  : what
latex   : true
---
* TOC
{:toc}

# Cryptosystem

RSA 암호시스템에서 각 개인은 공개 키와 개인 키를 갖는다.

* 공개 키: $$(n, e)$$
* 개인 키: $$(n, d)$$

키를 얻는 방법은 다음과 같다.

* 200자리 이상의 큰 소수 둘을 찾아 선택하고 $$p, q$$라 한다.
    * 단, $$ p \ne q $$.
* $$n = p \times q$$ 라 한다.
    * 이 $$n$$은 암/복호화할 때 modulus로 쓸 것이다.
* $$ (p - 1)(q - 1) $$ 을 계산해서, 이것을 $$\varphi(n)$$이라 한다.
* $$ \varphi(n) $$ 과 서로소인 정수 $$e$$를 찾아 선택한다.
    * 단, $$ e \lt \varphi(n) $$.
* $$ d \times e ≡ 1 (\bmod \varphi(n)) $$ 이 성립하는 $$ d $$를 구한다.
    * 즉 $$e$$ 모듈로 $$\varphi(n)$$의 역을 구하고, 그것을 $$d$$라고 한다.

이 때 공개키는 $$ (n, e) $$ 이고, 개인 키는 $$(n, d)$$ 가 된다.

# Encryption

평문 $$M$$을 암호화한다고 하자.

1. 평문 $$M$$의 각 알파벳을 두 자리 숫자로 변환한다.
    * A는 00, B는 01, C는 02, ...
2. 이 숫자들을 붙여 커다란 하나의 숫자열로 만든다.
3. 숫자열을 같은 크기의 블록들로 나눈다.
    * 단, 각 블록의 길이는 n을 초과하지 않는 짝수여야 한다.
    * 마지막 블록의 길이가 다른 블록보다 짧다면 평문에 더미 문자열을 덧붙여서 길이를 맞춘다.
4. 이제 숫자로 바뀐 평문들의 블록을 $$ m_1, m_2, ..., m_k $$ 를 얻었다.
5. $$C = M^e \bmod n$$ 을 사용하여 각 블록 $$ m_i $$를 암호화된 블록 $$c_i$$로 변환한다.
6. 암호화된 $$c_1, c_2, ..., c_k$$를 암호문의 수신자에게 보낸다.

## 암호화 예제

> Encrypt the message STOP using the RSA cryptosystem with key $$(2537, 13)$$.
Note that $$2537 = 43 \times 59$$, $$p = 43$$ and $$q = 59$$ are primes,
and $$\gcd(e,(p − 1)(q − 1)) = gcd(13,42 \times 58) = 1$$.

다음 조건들을 사용해 공개 키 $$(2537, 13)$$ 으로 평문 "**STOP**"을 암호화하시오.

$$
2537 = 43 \times 59 \\
p = 43 \\
q = 59 \\
\gcd(e,(p − 1)(q − 1)) = \gcd(13,42 \times 58) = 1
$$

일단 STOP 을 숫자로 변환하자. A 를 00, B를 01 이라 하면...

| S  | T  | O  | P  |
| 18 | 19 | 14 | 15 |

블록의 길이를 4로 정했다고 하자. 그러면 이 숫자는 두 개의 블록으로 쪼개지게 된다.

$$
m_1 = 1819 \\
m_2 = 1415 \\
$$

이제 각 블록을 $$ C = M^e \bmod n $$ 에 넣으면 된다!

공개 키가 $$(n, e) = (2537, 13)$$ 이므로, $$n = 2537$$ 이고 $$e = 13$$ 이다.

$$
\begin{align}
c_1 & = (1819)^{13} \bmod 2537 \\
    & = 2081 \\
c_2 & = (1415)^{13} \bmod 2537 \\
    & = 2182 \\
\end{align}
$$

직접 계산한다면 숫자가 꽤 크므로 나머지를 구하는 연산은 [이진법을 사용해 거듭제곱 수의 나머지를 구하는 알고리즘](/wiki/discrete-math-modular/#이진법을-사용해-거듭제곱-수의-나머지-구하기)을 사용하자.

암호화된 메시지는 다음과 같다.

$$2081$$ $$2182$$

# Decryption

해독키 $$d$$는 $$e$$ 모듈로 $$(p-1)(q-1)$$의 역이므로, $$ de ≡ 1 \pmod{(p-1)(q-1)} $$ 이다.

($$e$$와 $$(p-1)(q-1)$$이 서로소이기 때문에 역 $$d$$는 반드시 존재한다.)

따라서 $$ de = 1 + k (p-1)(q-1) $$ 인 정수 k 가 반드시 존재한다.

$$ C^d ≡ (M^e)^d (\bmod n) $$ 이므로, 원문 $$M$$을 얻어내기 위해 다음과 같이 생각할 수 있다.

$$
\begin{align}
C^d & ≡ (M^e)^d \pmod n \\
    & ≡ M^{ed} \pmod n \\
    & ≡ M^{1+k(p-1)(q-1)} \pmod n \\
\end{align}
$$


한편 $$p, q$$가 소수이므로 다음과 같이 [[Fermat-s-little-theorem]]{페르마의 소정리}를 사용할 수 있다.

$$
M^{p-1} ≡ 1 \pmod p \\
M^{q-1} ≡ 1 \pmod q
$$

그러므로 $$C^d, M$$은 $$ \bmod p $$에서 합동이다.

$$
\begin{align}
C^d & ≡ M \times M^{k \color{red}{(p-1)}(q-1)} \pmod p \\
    & ≡ M \times 1^{k(q-1)} \pmod p \\
    & ≡ M \pmod p \\
\end{align}
$$

같은 방법으로, $$C^d, M$$은 $$ \bmod q $$에서도 합동이다.

$$
\begin{align}
C^d & ≡ M \times M^{k(p-1) \color{red}{(q-1)}} \pmod q \\
    & ≡ M \times 1^{k(p-1)} \pmod q \\
    & ≡ M \pmod q \\
\end{align}
$$

따라서 다음과 같이 정리할 수 있다.

$$ C^d ≡ M \pmod{pq} $$


## 복호화 예제

> We receive the encrypted message 0981 0461. What is the decrypted message if it was encrypted using the RSA cipher from Example 8?

* 암호화된 메시지 $$0981, 0461$$가 위의 암호화 예제와 같은 조건으로 암호화되었다고 하자.
* 원문은 무엇인가?

위의 예제에서는 공개 키 $$(n, e) = (2537, 13)$$을 제공했다.
그러나 개인 키 $$(d, e)$$는 제공하지 않아서 $$d$$가 무엇인지 모른다.

$$d$$부터 구하자.

$$
\begin{align}
d \cdot e & ≡ 1 (\bmod \varphi(n)) \\
          & ≡ 1 (\bmod (p-1) \cdot (q-1))  \\
d \cdot 13 & ≡ 1 (\bmod (43-1) \cdot (59-1)) \\
          & ≡ 1 (\bmod 2436) \\
\end{align}
$$

$$d$$는 13 모듈로 2436 의 역이다.

[역을 구하는 방법](/wiki/discrete-math-linear-congruences/#a-모듈로-m-의-역inverse)을 사용해서 역을 구해보자.

$$
\begin{align}
d \cdot 13 = 1 (\bmod 2436)
\end{align}
$$

먼저 [유클리드 호제법](/wiki/gcd/#유클리드-알고리즘)을 사용해 $$gcd(13, 2436)$$을 찾도록 하자.

$$
\begin{align}
2436 & = 13 \times 187 + 5 \\
13 & = 5 \times 2 + 3 \\
5 & = 3 \times 1 + 2 \\
3 & = 2 \times 1 + 1 \\
2 & = 1 \times 1 + 1 \\
1 & = 1 \times 1 + 0 \\
\end{align}
$$

$$\gcd(13, 2436) = 1$$ 이다.

베주의 항등식을 만들면 사칙연산만으로 쉽게 역을 구할 수 있다.

$$ 1 = s \times 13 + t \times 2436 $$

$$
\begin{align}
1 & = 3 - 2 \\
  & = 3 - (5 - 3) \\
  & = 2 \times 3 - 5 \\
  & = 2 \times 3 - (2436 - 13 \times 187) \\
  & = 2 \times (13 - 5 \times 2) - (2436 - 13 \times 187) \\
  & = (2 + 187) \times 13 - 4 \times 5 - 2436 \\
  & = 189 \times 13 - 4 \times (2436 - 13 \times 187) - 2436 \\
  & = (189 + 4 \times 187) \times 13 + ( -4 -1 ) \times 2436 \\
  & = \color{red}{937} \times 13 -5 \times 2436 \\
\end{align}
$$

따라서 $$13 \times d$$를 $$2436$$으로 나누었을 때 나머지 1 이 나오게 하는 수 $$d$$는 $$937$$ 이다.

이제 블록 $$C$$를 해독하기 위해 다음 식에 입력만 하면 된다.

$$
\begin{align}
M & = C^d \bmod pq  \\
  & = C^{937} \bmod 2537 \\
\end{align}
$$

$$ 0981, 0461 $$ 을 넣어보자.

$$
\begin{align}
m_1 & = 981^{937} \bmod 2537 \\
    & = 704 \\
m_2 & = 461^{937} \bmod 2537 \\
    & = 1115 \\
\end{align}
$$

$$0704, 1115$$가 나왔다.

A 가 00 이고, B 가 01 이었으므로, 다음과 같이 원문을 알아낼 수 있다.

| 07 | 04 | 11 | 15 |
| H  | E  | L  | P  |



# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일

