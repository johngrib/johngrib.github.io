---
layout  : wiki
title   : 최대공약수와 최소공배수
summary : Greatest Common Divisor, Least Common Multiple
date    : 2018-10-26 11:33:33 +0900
updated : 2019-02-20 23:03:02 +0900
tags    : math
toc     : true
public  : true
parent  : math
latex   : true
---
* TOC
{:toc}

# 정의, 정리

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

## 최소공배수와 최대공약수의 곱

$$ a \times b = gcd(a, b) \times lcm(a,b) $$

# Show me the code

* go 언어로 GCD를 작성해 보았다.

```go
package main

func gcd(a, b int) int {
    if a < b {
        return gcd(b, a)
    }
    if a%b == 0 {
        return b
    }
    return gcd(b, a%b)
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

# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일

# Links

* <https://en.wikipedia.org/wiki/Greatest_common_divisor >

