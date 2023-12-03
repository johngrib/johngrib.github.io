---
layout  : wiki
title   : 최대합을 갖는 연속된 부분수열을 찾기
summary : 
date    : 2023-12-03 13:25:00 +0900
updated : 2023-12-03 20:55:28 +0900
tag     : 
resource: E6/E6FB65-8C7A-45A2-B1C7-84B3AF2BF4AB
toc     : true
public  : true
parent  : [[/problem]]
latex   : true
---
* TOC
{:toc}

## 소개

주어진 수열에서 최대합을 갖는 연속된 부분수열을 찾는 문제이다.

## 해결방법
### Brute Force $$O(n^3)$$ {#solution-o-n-3}

주어진 수열의 모든 연속된 부분수열의 합을 구하고, 그 중 최대값을 갖는 연속된 부분수열을 찾으면 된다.

다음은 존 벤틀리의 의사 코드를 인용한 것이다.

>
```c
maxsofar = 0
for i = [0, n)
    for j = [i, n)
        sum = 0
        for k = [i, j]
            sum += x[k]
        /* sum is sum of x[i..j] */
        maxsofar = max(maxsofar, sum)
```
[^bentley-150]

```java
public static Result maxSubArraySumBruteForce(double[] arr) {
    double maxSum = Double.NEGATIVE_INFINITY;
    int startIndex = 0;
    int endIndex = 0;

    for (int start = 0; start < arr.length; start++) {
        for (int end = start; end < arr.length; end++) {
            double sum = 0;
            // start 부터 end 까지의 합을 구한다.
            for (int i = start; i <= end; i++) {
                sum += arr[i];
            }
            // 최대값을 갱신한다.
            if (sum > maxSum) {
                maxSum = sum;
                startIndex = start;
                endIndex = end;
            }
        }
    }
    return new Result(maxSum, startIndex, endIndex);
}
```

### 좀 더 개선된 방법 $$O(n^2)$$ {#solution-o-n-2}

$$
\begin{align}
\sum_{k=0}^4 a_n & = ( a_0 + a_1 + ... + a_{n-1} ) + a_n \\
                 & = \sum_{k=0}^{n-1} a_k + a_n
\end{align}
$$

$$a_0$$ 부터 $$a_n$$ 까지의 합은 $$a_0$$ 부터 $$a_{n-1}$$ 까지의 합에 $$a_n$$ 를 더한 값과 같다는 사실을 활용하는 방법이다.

>
```c
maxsofar = 0
for i = [0, n)
    sum = 0
    for j = [i, n)
        sum += x[j]
        /* sum is sum of x[i..j] */
        maxsofar = max(maxsofar, sum)
```


```java
public static Result maxSubArraySumBruteForceImproved(double[] arr) {
    double maxSum = Double.NEGATIVE_INFINITY;
    int startIndex = 0;
    int endIndex = 0;

    for (int start = 0; start < arr.length; start++) {
        double sum = 0;
        for (int end = start; end < arr.length; end++) {
            sum += arr[end];
            if (sum > maxSum) {
                maxSum = sum;
                startIndex = start;
                endIndex = end;
            }
        }
    }
    return new Result(maxSum, startIndex, endIndex);
}
```

### Divide and Conquer $$O(n \log n)$$ {#divide-and-conquer}

1. 주어진 수열을 두 개의 부분 수열 A와 B로 분할한다.
2. 각 부분 수열 A와 B에 대해 각각 최대합을 갖는 부분연속수열을 찾는다.
    - 재귀를 사용한다.
3. 2에서 찾아낸 두 부분 수열을 포함하는 범위에서 부분연속수열을 찾는다.

$$
\begin{align}
T(n) & = T({n \over 2}) + T({n \over 2}) + O(n) \\
     & = 2 T({n \over 2}) + O(n) \\
\end{align}
$$

[[/master-theorem]]에 의해, 다음과 같이 정리할 수 있다.

$$T(n) = O(n \log n)$$

다음은 존 벤틀리를 인용한 것이다. 그림은 책을 참고해 내가 그렸다.

>
이 경우, 원래 문제는 크기가 n인 벡터를 다루므로,
그것을 두 부분으로 나누는 가장 자연스러운 방법은 거의 같은 크기를 가지는 두 벡터로 나누는 것이다.
이 두 벡터를 a, b라 하자.
>
![]( /resource/E6/E6FB65-8C7A-45A2-B1C7-84B3AF2BF4AB/divide-and-conquer-1.svg )
>
다음에는 a와 b에 대하여 각각 최대합을 가지는 부분벡터를 재귀적으로 찾는다.
그 부분벡터를 각각 $$m_a$$와 $$m_b$$라 하자.
>
![]( /resource/E6/E6FB65-8C7A-45A2-B1C7-84B3AF2BF4AB/divide-and-conquer-2.svg )
>
전체 벡터에서 최대합을 가지는 부분벡터는 $$m_a$$나 $$m_b$$ 중의 하나이기 때문에,
이렇게 하면 문제를 다 푼 것이라 생각하기 쉽다. 이것은 거의 맞다.
그러나 실제로 최대합을 가지는 부분벡터는 a나 b에 완전히 포함될 수도 있지만,
a와 b의 경계에 걸쳐 있을 수도 잇다.
이와 같이 경계에 걸치면서 최대합을 가지는 벡터를 $$m_c$$라고 하자.
>
![]( /resource/E6/E6FB65-8C7A-45A2-B1C7-84B3AF2BF4AB/divide-and-conquer-3.svg )
>
따라서 나누어 푸는 알고리즘은 $$m_a$$와 $$m_b$$를 재귀적으로 구하고,
다른 어떤 방법으로 $$m_c$$를 구하여, 셋 중에서 최대값을 리턴한다.
>
이 정도의 설명만으로도 코드를 작성하기에 충분하다.
이제 남은 것은 작은 벡터들을 다루는 방법과 $$m_c$$를 구하는 방법이다.
앞의 문제는 쉽다. 한 개의 요소를 가진 벡터의 최대합은 그 벡터에 속한 바로 그 값이다(만약 음수라면 0이 최대값이다).
그리고 빈 벡터의 최대합은 0이라고 정의했다.
$$m_c$$를 계산할 때 $$m_c$$의 왼쪽 부분은 a와 b의 경계에서 시작하여 a쪽으로 뻗어나가는 부분벡터들 중에서 합이 최대가 되는 벡터이고, $$m_c$$의 오른쪽 부분도 마찬가지 방법으로 구할 수 있다.
위의 사실을 종합하여, 다음과 같이 알고리즘 3에 대한 코드를 작성할 수 있다.
>
```c
float maxsum3(l, u)
    if (l > u) /* zero elements */
        return 0
    if (l == u) /* one element */
        return max(0, x[l])
    m = (l + u) / 2
    /* find max crossing to left */
    lmax = sum = 0
    for (i = m; i >= l; i--)
        sum += x[i]
        lmax = max(lmax, sum)
    /* find max crossing to right */
    rmax = sum = 0
    for i = (m, u]
        sum += x[i]
        rmax = max(rmax, sum)
    return max(lmax + rmax, maxsum3(l, m), maxsum3(m+1, u))
```

>
알고리즘 3은 다음과 같이 호출된다.
>
```c
answer = maxsum3(0, n-1)
```
[^bentley-153]

다음은 존 벤틀리의 의사코드를 Java로 표현한 것이다.

```java
private static double maxSum3(double[] arr, int l, int u) {
    if (l > u) { // zero elements
        return 0;
    }
    if (l == u) { // one element
        return Math.max(0, arr[l]);
    }

    int m = (l + u) / 2;

    // Find max crossing to left
    double lmax = 0, sum = 0;
    for (int i = m; i >= l; i--) {
        sum += arr[i];
        lmax = Math.max(lmax, sum);
    }

    // Find max crossing to right
    double rmax = 0;
    sum = 0;
    for (int i = m + 1; i <= u; i++) {
        sum += arr[i];
        rmax = Math.max(rmax, sum);
    }

    // Combine the results
    double maxLeftRight = Math.max(maxSum3(arr, l, m), maxSum3(arr, m + 1, u));

    return Math.max(lmax + rmax, maxLeftRight);
}
```

여기에서 `lmax + rmax`가 $$m_c$$이며, `maxSum3(arr, l, m)`가 $$m_a$$, `maxSum3(arr, m + 1, u)`가 $$m_b$$이다.

위의 코드는 다음과 같이 호출하면 된다.

```java
double maxSum = maxSum3(arr, 0, arr.length - 1);
```


### Scanning 알고리즘 $$O(n)$$ {#scanning}

>
이 알고리즘은 배열의 맨 왼쪽에서(요소 `x[0]`) 시작하여 오른쪽 끝까지(요소 `x[n-1]`) 읽어가면서,
그때까지의 최대합을 가지는 부분벡터를 보관한다.
초기의 최대합은 0이다.
만약 `x[0..i-1]`에 대해 문제를 풀었다면, 이것을 어떻게 확장하여 `x[i]`를 포함하도록 할 수 있을까?
앞의 나누어 푸는 알고리즘과 비슷한 추론을 해보자.
처음 `i`개의 요소 중에서 최대합을 가지는 부분벡터는 처음 `i-1`개의 요소 내에 포함되거나(이를 `maxsofar`에 저장할 것이다), 위치 `i`에서 끝날 것이다(이는 `maxendinghere`에 저장할 것이다).
>
![]( /resource/E6/E6FB65-8C7A-45A2-B1C7-84B3AF2BF4AB/scanning.svg )
>
알고리즘 3[^divide-and-conquer]과 같은 코드를 사용하여 `maxendinghere`를 처음부터 다시 계산한다면 또 다른 $$O(n^2)$$ 알고리즘이 된다.
이 문제점은 알고리즘 2의 기반이 되는 기법을 사용하여 피할 수 있다.
처음부터 다시 계산하는 대신에, 위치 `i-1`에서 끝나는 최대합을 가지는 부분벡터를 이용한다.
이렇게 하여 다음과 같은 알고리즘 4를 만들 수 있다.
>
```c
maxsofar = 0
maxendinghere = 0
for i = [0, n)
    /* invariant : maxendinghere and maxsofar are accurate for x[0..i-1] */
    maxendinghere = max(maxendinghere + x[i], 0)
    maxsofar = max(maxsofar, maxendinghere)
```

>
이 프로그램을 이해하기 위한 핵심은 변수 `maxendinghere`이다.
루프 내의 첫번째 대입문이 실행되기 전에는 `maxendinghere`에 위치 `i-1`에서 끝나는 최대합을 가지는 부분벡터의 합이 저장되어 있다.
대입문이 실행되면 위치 `i`에서 끝나는 최대합을 가지는 부분벡터의 합이 저장된다.
`x[i]`가 양수라면 이 대입문은 값을 `x[i]`만큼 증가시킨다.
만약 음수라면 `0`이 된다(이 경우에는 위치 `i`에서 끝나는 최대합을 가지는 부분벡터가 빈 벡터이므로).
코드가 이해하기는 어렵지만, 대신에 짧고 빠르다.
이 프로그램의 실행시간은 $$O(n)$$이며, 따라서 이를 선형적 알고리즘이라고 할 수 있다.
[^bentley-155]

다음은 이 방법을 Java로 작성한 것이다.

```java
public static double maxSubArraySum(double[] arr) {
    double maxSoFar = 0;
    double maxEndingHere = 0;

    for (int i = 0; i < arr.length; i++) {
        maxEndingHere = Math.max(maxEndingHere + arr[i], 0);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }

    return maxSoFar;
}
```

배열을 한 번만 읽고, 두 개의 변수만 사용한다.

이 방법은 카데인 알고리즘(Kadane's algorithm)이라고도 부른다.

## 함께 읽기

- Introduction to Algorithms
    - 존 벤틀리는 이 주제와 관련된 내용으로 이 책의 4장을 참고하라고 한다.[^bentley-165]
- 알고리즘 트레이닝
    - 3.5.2 장 '고전적인 예제 문제들'의 '1차원 최대 구간 합 문제'에서 이 주제를 다루며, 나아가 '2차원 최대 구간 합 문제'에 대한 내용도 이어진다.
- 다이내믹 프로그래밍 완전 정복
    - 챕터 4. 122~126쪽 참고.

### From: 컴퓨팅의 정수

우쥔은 이 문제의 응용방법 중 하나로 최대 이익을 갖는 주식 보유 기간을 언급한다.

>
예제와 관련해 필자가 경험한 문제는 최대 이익을 가지는 주식 보유 기간을 찾는 문제였다.
주식 투자자라면 주식의 투자 이익이 가장 큰 기간, 즉 매수일부터 가장 큰 수익을 내는 매도일까지 기간이 궁금하다.
장기적으로 주식을 보유한다면 수익은 항상 증가한다.
그러나 체계적 위험이 주가에 미치는 영향을 제외하면 어떤 개별 종목이 됐든 해당 종목을 사는 것이 시장 전체보다 높은 수익을 가지는 매수 매도 기간이 있다.
물론 그 시점 이후에는 지수 펀드를 매수한 것보다 실적이 안좋을 수 있다.
미국의 다우존스 지수 초창기 구성 종목 회사들은 현재 구성 종목에는 존재하지 않는다.
즉 잘나가는 회사들도 보유 가치가 없을 정도로 '노화'되는 때가 있다.
개별 주식의 일일 가격 변동 값에서 해당일의 체계적 위험을 제외하면 일련의 양수 및 음수의 실수 수열을 추출할 수 있다.
앞선 수열은 (체계적 위험을 제거한 후) 주식의 일일 상승률 및 하락률로 간주될 수 있다.
주식 시장에서는 그 누구도 매도 시점을 예측할 수 없어 이론적인 최대 수익은 참고 기준일 뿐이다.
그래서 주식 거래자 실력을 절대적인 수치로 측정할 때 사용한다.
[^wujun-31]

## 참고문헌

- Introduction to Algorithms 3판 / 토머스 코멘, 찰스 레이서손, 로날드 리베스트, 클리포드 스타인 공저 / 문병로, 심규석, 이충세 공역 / 한빛아카데미 / 2014년 06월 30일
- [Maximum subarray problem (wikipedia.org)]( https://en.wikipedia.org/wiki/Maximum_subarray_problem )
- 다이내믹 프로그래밍 완전 정복 / 미나크시, 카말 라와트 저/박상은 역 / 한빛미디어 / 초판 1쇄 발행: 2019년 10월 04일 / 원제: Dynamic Programming for Coding Interviews by Meenakshi & Kamal Rawat
- 생각하는 프로그래밍 / 존 벤틀리 저 / 윤성준, 조상민 공역 / 인사이트(insight) / 초판 6쇄 발행: 2007년 07월 20일
- 알고리즘 트레이닝: 자료 구조, 알고리즘 문제 해결 핵심 노하우 / 스티븐 할림, 펠릭스 할림 공저 / 김진현 역 / 인사이트(insight) / 초판 1쇄 발행: 2017년 06월 20일 / 원제: Competitive Programming: The New Lower Bound of Programming Contests (Handbook for ACM ICPC and IOI Contestants)
- 컴퓨팅의 정수 / 우쥔 저/신준기 역 / 제이펍 / 1쇄 발행: 2023년 08월 08일 / 원제: 计算之魂

## 주석

[^bentley-150]: 생각하는 프로그래밍. 칼럼 8. 150쪽의 의사 코드를 인용하였다.
[^bentley-153]: 생각하는 프로그래밍. 칼럼 8. 153쪽.
[^bentley-155]: 생각하는 프로그래밍. 칼럼 8. 155쪽.
[^bentley-165]: 생각하는 프로그래밍. 칼럼 8. 165쪽.
[^divide-and-conquer]: Divide and Conquer $$O(n \log n)$$ 섹션에서 다룬 방법을 말한다.
[^wujun-31]: 컴퓨팅의 정수. 1.3장. 31쪽.

