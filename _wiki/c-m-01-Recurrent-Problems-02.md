---
layout  : wiki
title   : 구체수학 01.재귀적인 문제들.02.평면의 선들
summary : 01.RECURRENT PROBLEMS
date    : 2018-04-26 21:58:11 +0900
updated : 2018-05-18 07:04:14 +0900
tag     : math
toc     : true
public  : true
parent  : study-concrete-math
latex   : true
---
* TOC
{:toc}

# 개요

* 이 문서는 [[CONCRETE-MATH]]책의 1장을 공부하며 메모한 것입니다.
* 이 문서는 메모일 뿐이니 자세한 내용은 교재를 참고해야 합니다.


# 1.2 평면의 선들(LINES IN THE PLANE)

* 1826년 스위스 수학자 야콥 슈타이너(Jacob Steiner)가 처음으로 풀은 문제.

>
피자 칼로 피자를 n번 직선으로 자른다고 할 때 피자 조각이 최대 몇 개나 나올까?

이 문제를 다음과 같이 표현할 수 있다.

>
평면에 놓인 $$n$$개의 선(직선)으로 정의되는 영역의 최대 개수 $$L_n$$는?

* 단, 셋 이상의 선이 한 점에서 만나서는 안 된다.
* 단, 어떤 선도 다른 한 선과 평행해서는 안 된다.


## 작은 사례부터 생각한다

* 선이 0 개라면 피자는 하나.
    * $$L_0 = 1$$ &nbsp;
* 선이 1 개라면 피자는 둘.
    * $$L_1 = 2$$ &nbsp;

{% raw %}
<svg width="160" height="130">
    <g>
        <path d="M 11,95 L 151,30" stroke="#000"></path>
        <text x="60" y="30"> a </text>
        <text x="60" y="90"> b </text>
    </g>
</svg>
{% endraw %}


* 선이 2 개라면 피자는 넷.
    * $$L_2 = 4$$ &nbsp;
    * 기존의 선이 1개이므로, 새로 그은 선은 1개의 교점을 만든다.
    * 영역은 2개가 새로 생긴다.

{% raw %}
<svg width="160" height="130">
    <g>
        <path d="M 11,95 L 151,30" stroke="#000"></path>
        <path d="M 110,113 L 123,12" stroke="#000"></path>

        <text x="140" y="20"> d </text>
        <text x="60" y="30"> a </text>
        <text x="60" y="90"> b </text>
        <text x="130" y="70"> c </text>
    </g>
</svg>
{% endraw %}

* 선이 3 개라면 피자는 일곱.
    * $$L_3 = 7$$ &nbsp;
    * 기존의 선이 2개이므로, 새로 그은 선으로 인해 2개의 교점이 생긴다.
    * 영역은 3개가 새로 생긴다.

{% raw %}
<svg width="160" height="130">
    <g>
        <path d="M 11,95 L 151,30" stroke="#000"></path>
        <path d="M 123,12 L 110,113" stroke="#000"></path>
        <path d="M 151,93 L 11,30" stroke="#00f"></path>
        <text x="140" y="20" font-size="20" fill="#f00"> d </text>
        <text x="60" y="30"> 1a </text>
        <text x="20" y="60"> 2a </text>
        <text x="60" y="90"> 2b </text>
        <text x="98" y="70"> 1b </text>
        <text x="130" y="70"> 1c </text>
        <text x="121" y="102"> 2c </text>
    </g>
</svg>
{% endraw %}

곰곰히 생각해 보면 다음과 같은 사실을 알 수 있다.

* 평행한 선이 없으므로, 새로운 선을 어떤 방식으로 그어도 기존의 모든 선과 만나 교점을 만들게 된다.
    * 교점이 `1`개 추가되면 영역은 `2`개 늘어난다.
    * 교점이 `2`개 추가되면 영역은 `3`개 늘어난다.
    * 교점이 `3`개 추가되면 영역은 `4`개 늘어난다.
    * 교점이 `n`개 추가되면 영역은 `n+1`개 늘어난다.

따라서, 다음과 같이 결론내릴 수 있다.

* `n` 번째 선을 긋는다면, `n-1` 개의 교점이 추가되며, `n`개의 영역이 늘어난다.
    * 즉 `n` 번째 선을 긋는다면, `영역의 수 = 원래 있던 영역의 수 + n` 이다.

그렇다면 영역의 수에 대해 다음과 같이 점화식을 만들 수 있다.

`식 1.4`

$$
\begin{align}
& L_0 = 1; \\
& L_n = L_{n-1} + n, \quad for \; n \gt 0
\end{align}
$$

이 점화식을 python 코드로 표현하면 다음과 같다.

```python
def L(n):
    if n == 0:
        return 1
    return L(n-1) + n
```

## 점화식의 닫힌 형태의 해

이제 점화식의 닫힌 형식의 해를 구하자. (재귀나 루프가 아닌 형태의 해를 구하자.)

$$L_n = L_{n-1} + n, \quad for \; n \gt 0$$

닫힌 형식의 해를 구한다는 말이 어렵게 느껴지지만 프로그래밍 코드라고 치면 어렵지 않게 이해할 수 있다.

코드로 생각해보면 $$L_n$$의 함수 안에서 $$L_{n-1}$$을 호출하고 있으므로 재귀 함수라 할 수 있다.

몇 번이나 재귀할 지 알 수 없다.

이를 재귀 루프하지 않는 "간단한" 형태로 교체한 이후를 닫힌 형식이라 생각하면 적당할 것 같다.
(책에서는 좀 더 엄격하게 정의한다)

아무튼, 다음과 같이 전개해보면 재귀 구조임을 쉽게 알 수 있다.

$$
\begin{align}
L_n & = L_{n-1} + n \\
    & = L_{n-2} + (n-1) + n \\
    & = L_{n-3} + (n-2) + (n-1) + n \\
    & ... \\
    & = L_0 + 1 + 2 + ... + (n-2) + (n-1) + n \\
    & = 1 + 1 + 2 + ... + (n-2) + (n-1) + n \\
    & = 1 + (\text{1부터 n까지의 합}) \\
    & = 1 + S_n, \quad where \; S_n = 1 + 2 + 3 + ... + n \\
\end{align}
$$

한편, $$S_n = { n(n + 1) \over 2 }$$ (`1`부터 `n`까지 더한 결과)이므로, 해는 다음과 같다.

$$
L_n = 1 + {n(n+1) \over 2}, \quad for \; n \ge 0
$$

이제 수학적 귀납법으로 해를 검증해보자.

$$
\begin{align}
L_n & = L_{n-1} + n \\
    & = \left(1 + {(n-1)(n) \over 2} \right) + n \\
    & = 1 + {n^2 - n \over 2} + \frac{2n}{2} \\
    & = 1 + {n^2 + n \over 2} \\
    & = 1 + {n(n + 1) \over 2} \\
\end{align}
$$

첫 번째 라인과 마지막 라인만 놓고 보면 닫힌 형태의 해를 찾아냈음을 알 수 있다.

$$
\begin{align}
L_n & = L_{n-1} + n \\
    & = 1 + {n(n + 1) \over 2} \\
\end{align}
$$

이를 코드로 표현하면 다음과 같다. 함수 `L(n)`에서 재귀를 제거했다고 볼 수 있겠다.

```python
def L(n):
    return 1 + (n * (n+1))/2
```


## 평면의 선 변형 문제

이번에는 직선이 아니라 `V`자 모양으로 꺾인 선을 사용하는 문제이다.

꺾인 부분을 `zig`라고 부르도록 하자.

>
평면에 놓인 $$n$$개의 꺾인 선들이 정의하는 영역들의 최대 개수 $$Z_n$$은?

* $$Z_1 = 2$$ &nbsp;

{% raw %}
<svg width="160" height="130">
    <g>
        <path d="M 40,60 L 160,10" stroke="#000"></path>
        <path d="M 40,60 L 160,120" stroke="#000"></path>
        <text x="30" y="50"> 1 </text>
        <text x="140" y="60"> 2 </text>
    </g>
</svg>
{% endraw %}

* $$Z_2 = 7$$ &nbsp;

{% raw %}
<svg width="160" height="130">
    <g>
        <path d="M 40,60 L 160,20" stroke="#000"></path>
        <path d="M 40,60 L 160,90" stroke="#000"></path>
        <path d="M 100,120 L 60,10" stroke="#000"></path>
        <path d="M 100,120 L 130,10" stroke="#000"></path>
        <text x="60" y="100"> 1 </text>
        <text x="90" y="30"> 2 </text>
        <text x="140" y="20"> 3 </text>
        <text x="140" y="70"> 4 </text>
        <text x="90" y="90"> 5 </text>
        <text x="65" y="65"> 6 </text>
        <text x="90" y="60"> 7 </text>
    </g>
</svg>
{% endraw %}

복잡해 보이지만, 책을 따라 잘 생각해보면 위의 직선 문제에서 교점 너머의 영역을 합치는 방식과 같다는 것을 알 수 있다.

* 직선 문제라면 선이 `2`개일 때 다음 그림과 같이 `1, 2, 3, 4` 네 영역이 생길 것이다.
* 그러나 꺾인 선 문제에서는 `1`, `(2+3+4)` 이렇게 두 개의 영역이 생긴다.

{% raw %}
<svg width="160" height="130">
    <g>
        <path d="M 160,10 L 85,65" stroke="#000"></path>
        <path d="M 160,120 L 85,65" stroke="#000"></path>
        <path stroke-dasharray="5,5" d="M 10,10 L 85,65" stroke="#000"></path>
        <path stroke-dasharray="5,5" d="M 10,120 L 85,65" stroke="#000"></path>
        <text x="130" y="65"> 1 </text>
        <text x="80" y="100"> 2 </text>
        <text x="30" y="65"> 3 </text>
        <text x="80" y="20"> 4 </text>
    </g>
</svg>
{% endraw %}

즉, 꺾인 선이 하나 늘어날 때마다 영역을 `2`개씩 잃게 된다.

$$
\begin{align}
Z_n & = L_{2n} - 2n \\
    & = \left( { 2n ( 2n + 1 ) \over 2 } + 1 \right) - 2n \\
    & = 2n^2 - n + 1,   \quad for \; n \ge 0 \\
\end{align}
$$

위의 식의 첫 번째 라인은 점화식이므로 다음과 같이 재귀 함수로 표현할 수 있다.

```python
def Z(n):
    return L(2*n) - 2*n
```

마지막 라인의 닫힌 형식은 다음과 같다. 재귀를 제거한 형태이지만 두 함수는 완전히 똑같은 결과를 낸다. 최적화했다고도 볼 수 있겠다.

```python
def Z(n):
    return 2*n*n - n + 1
```


# Links

* [[CONCRETE-MATH]]


