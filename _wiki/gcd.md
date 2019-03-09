---
layout  : wiki
title   : 최대공약수와 최소공배수
summary : Greatest Common Divisor, Least Common Multiple
date    : 2018-10-26 11:33:33 +0900
updated : 2019-02-21 18:06:38 +0900
tag     : math
toc     : true
public  : true
parent  : math
latex   : true
---
* TOC
{:toc}

# 정의

## 최대공약수

**GCD: The Greatest Common Divisor**
>
Let $$a$$ and $$b$$ be integers, not both zero.
The largest integer $$d$$ such that $$d \vert a$$ and $$d \vert b$$ is called
the greatest common divisor of $$a$$ and $$b$$.
The greatest common divisor of $$a$$ and $$b$$ is denoted by $$gcd(a, b)$$.

* 0 이 아닌 정수 a, b 에 대하여
    * $$d \vert a$$ 이고 $$d \vert b$$인 가장 큰 정수 $$d$$ 를 a, b의 최대공약수라 부른다.
* 최대공약수는 $$ gcd(a, b) $$ 로 표시된다.

참고: $$d \vert a$$는 $$a$$가 $$d$$로 나누어 떨어진다는 의미.

## 서로소, 상대소수

**relatively prime**

> The integers $$a$$ and $$b$$ are relatively prime if their greatest common divisor is 1.

* 정수 a, b 의 최대공약수가 1 이면
    * a, b 는 서로소이다.
    * 서로소는 상대소수라고도 한다.

## 최소공배수

**LCM: The Least Common Multiple**

>
The least common multiple of the positive integers $$a$$ and $$b$$ is the smallest positive integer
that is divisible by both $$a$$ and $$b$$.
The least common multiple of $$a$$ and $$b$$ is denoted by $$lcm(a, b)$$.

* 양의 정수 a, b 의 최소공배수는
    * a 와 b 로 나누어 떨어지는 가장 작은 양의 정수이다.
* 최소공배수는 $$ lcm(a, b) $$ 로 표시된다.

# 정리
## 최소공배수와 최대공약수의 곱

$$ a × b = gcd(a, b) × lcm(a,b) $$

## a,b의 최대공약수와 b,r의 최대공약수

>
Let $$a = bq + r$$, where $$a, b, q$$, and $$r$$ are integers.
Then $$gcd(a, b) = gcd(b, r)$$.

* $$a,b,q,r$$이 정수이고 $$ a = bq + r $$ 이면
    * $$ gcd(a, b) = gcd(b, r) $$ 이다.

**증명**

$$d \vert a$$ 이고, $$ d \vert b $$라고 가정하자.
($$ a $$와 $$ b $$를 나누었을 때 나누어 떨어지는 수 $$d$$ 가 있다고 가정하자)

그렇다면 $$a - bq$$ 도 $$ d $$ 로 나누어 떨어질 것이다.

그런데 $$r = a - bq$$ 이므로, $$ r $$ 은 $$ d $$로 나누어 떨어진다.

따라서, $$a$$ 와 $$b$$ 의 모든 공약수는 $$b$$와 $$r$$ 의 공약수이다.

한편, $$r = a - bq$$ 에서 $$bq + r = a$$ 이므로, $$b, r$$의 공약수는 $$ a, b $$의 공약수이다.

그러므로 $$ gcd(a,b) = gcd(b,r) $$.

# 유클리드 알고리즘

**The Euclidean Algorithm**

* 유클리드 호제법이라고도 한다.
    * 互: 서로
    * 除: 나누는
    * 法: 알고리즘
* go 언어로 작성한 유클리드 알고리즘.

```go
func Gcd(a, b int) int {
    x := a
    y := b
    for y != 0 {
        r := x % y
        x = y
        y = r
    }
    return x
}
```

* 다음은 재귀를 사용한 것이다.

```go
func Gcd(a, b int) int {
    if a < b {
        return Gcd(b, a)
    }
    if a%b == 0 {
        return b
    }
    return Gcd(b, a%b)
}
```

{% raw %}
<div id="locomotive-search">
    <div>a = <input type="number" value="60" id="gcd-a"/></div>
    <div>b = <input type="number" value="42" id="gcd-b"/></div>
    <div><input type="button" value="WolframAlpha에 GCD 물어보기" onClick="wolfram()"/></div>
</div>
{% endraw %}

{% raw %}
<script>
function wolfram() {

    var a = parseInt(document.getElementById('gcd-a').value, 10);
    var b = parseInt(document.getElementById('gcd-b').value, 10);
    var c = a - 1;

    var url = `https://www.wolframalpha.com/input/?i=gcd%7B${a},${b}%7D`;

    window.open(url, '_blank');
}
</script>
{% endraw %}

# 베주의 정리와 베주의 항등식

**Bézout's theorem**

> If $$a$$ and $$b$$ are positive integers,
then there exist integers $$s$$ and $$t$$ such that $$gcd(a, b) = sa + tb$$.

* 양의 정수 $$a, b$$ 에 대하여
    * $$ gcd(a, b) = sa + tb $$를 만족하는 정수 $$ s, t $$ 가 존재한다.

**Bézout’s identity**

> If $$a$$ and $$b$$ are positive integers,
then integers $$s$$ and $$t$$ such that $$gcd(a, b) = sa + tb$$ are called Bézout coefficients of $$a$$ and $$b$$
(after Étienne Bézout, a French mathematician of the eighteenth century).
Also, the equation $$gcd(a, b) = sa + tb$$ is called **Bézout’s identity**.

* 양의 정수 $$a, b$$에 대하여, $$ gcd(a,b) = sa + tb $$ 를 만족하는 정수 $$ s, t $$를 $$ a, b $$의 베주 계수라 부른다.
* 방정식 $$gcd(a, b) = sa + tb$$를 베주의 항등식이라 부른다.

**GCD as Linear Combinations**

베주 항등식에 의해 $$gcd(a,b)$$는 $$a, b$$ 정수 계수를 갖는 선형결합으로 표현할 수 있다.

$$ gcd(a,b) = sa + tb $$

가령, $$ gcd(24, 60) = 12 $$이므로 $$ s = -2, \ t = 1 $$ 이다.

$$
\begin{align}
gcd(24, 60)
    & = 12 \\
    & = -2 × 24 + 1 × 60 \\
\end{align}
$$

숫자가 약간 커지면 유클리드 호제법을 사용하면 된다.

$$gcd(625442, 215326)$$ 의 경우를 생각해 보자.

$$
\begin{align}
625442 & = 2 × 215326 + 194790 \\
215326 & = 1 × 194790 + 20536 \\
194790 & = 9 × 20536 + 9966 \\
20536 & = 2 × 9966 + 604 \\
9966 & = 16 × 604 + 302 \\
604 & = 2 × \color{red}{302} + 0 \\
\end{align}
\\
\\
\therefore \gcd(625442, 215326) = 302
$$

유클리드 호제법의 계산 과정을 참고해 적절히 대입하면 베주의 항등식으로 표현하기 용이하다.

$$
\begin{align}
\color{red}{302}
    & = 9966 - 16 × \color{purple}{604} \\
    & = 9966 - 16 × (20536 - 2 × 9966) \\
    & = - 16 × 20536 + 33 × \color{purple}{9966} \\
    & = - 16 × 20536 + 33 × (194790 - 9 × 20536) \\
    & = -(16 + 33 × 9) × 20536 + 33 × 194790 \\
    & = -313 × \color{purple}{20536} + 33 × 194790 \\
    & = -313 × (\color{blue}{215326} - 194790) + 33 × 194790 \\
    & = -313 × \color{blue}{215326} + 346 × \color{purple}{194790} \\
    & = -313 × \color{blue}{215326} + 346 × (\color{blue}{625442} - 2 × \color{blue}{215326}) \\
    & = (-313 -2 × 346) × 215326 + 346 × 625442 \\
\end{align}
$$

$$
\therefore
\color{red}{302}
    = -1005 × \color{red}{215326} + 346 × \color{red}{625442} \\
$$

# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일

# Links

* <https://en.wikipedia.org/wiki/Greatest_common_divisor >
* [베주 항등식(wikipedia)](https://ko.wikipedia.org/wiki/%EB%B2%A0%EC%A3%BC_%ED%95%AD%EB%93%B1%EC%8B%9D )

