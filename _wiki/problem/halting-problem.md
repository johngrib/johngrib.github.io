---
layout  : wiki
title   : 정지 문제
summary : The Halting Problem
date    : 2019-02-10 21:30:53 +0900
updated : 2024-04-11 23:43:21 +0900
tag     : cs
resource: 15/7FF532-F47A-4166-8597-D6CA737285DA
toc     : true
public  : true
parent  : [[/problem]]
latex   : true
---
* TOC
{:toc}

**어떤 프로그램이 어떤 입력값을 받았을 때 유한한 단계의 절차를 마치고 멈추는지, 아니면 무한 루프하는지 판정하는 알고리즘이 존재하는가?**

## 문제의 의의

세상엔 컴퓨터로 풀기 쉬운 문제가 있고, 풀기 어려운 문제가 있다.

그런데 세상엔 컴퓨터로 풀 수 없는 문제도 있다.

정지 문제는 컴퓨터로 풀 수 없는 문제들 중 하나이다.

* "**해결 불가능한(unsolvable)**" 문제
    * 풀 수 있는 알고리즘이 없는 문제.
    * 해결 불가능한 문제가 **존재**한다는 역사상 첫 번째 증명은, 앨런 튜링의 "정지 문제" 이다.

## 문제 개요

모든 프로그램은 입력값을 넣고 실행하면 다음 둘 중 하나와 같이 된다.

1. 유한한 절차를 거친 다음, 리턴값을 내놓는다.
2. 무한 루프에 빠진다.

그런데 프로그램을 실행하기 전에 먼저 소스 코드를 검토해서, 무한루프할지 알아낼 수 있다면 유용하지 않을까?

그런 무한 루프를 검토하는 프로그램을 **H**라 하자.

프로그램 H는 **모든** 입력에 대해 정확한 결과를 리턴한다.

"**H 를 만드는 것이 가능한가?**"

## 증명

**H를 만드는 것은 불가능하다.**

### 귀류법을 통한 증명

이는 귀류법을 통해 증명할 수 있다.

1. H를 만드는 것이 가능하다고 가정한다.
2. H가 잘못된 결과를 리턴하는 경우를 찾아낸다.
3. 전제에 모순되므로, H를 만드는 것은 가능하지 않다.

#### H를 만드는 것이 가능하다고 가정하자

* H를 구현하는 함수 `H(P, I)` 가 있다고 가정하자.
    * `P` 는 검사할 프로그램의 소스 코드이다.
    * `I` 는 `P` 에 입력할 입력값이다.

H를 구현하는 `H(P, I)` 는 `P(I)` 가 무한 루프하는지 아닌지를 검사하는 프로그램이라 할 수 있다.

* `P(I)`가 유한한 단계 내에 리턴값을 내놓는다면 `true`를 리턴한다.
* `P(I)`가 무한루프한다면 `false`를 리턴한다.

이해를 돕기 위해 예를 들어 보자.

만약 다음의 python 함수를 `H(P, I)`에 집어넣는다면 어떻게 될까?

```python
def test(I):
    while I > 0:
        print("hello")
    return 42
```

* `test(3)` 은 `while`을 빠져나가지 못하고 무한히 **hello**를 출력할 것이다.
    * 따라서 `H(test, 3)` 은 `false`를 리턴한다.
* `test(-1)` 은 `42`를 리턴할 것이다.
    * 따라서 `H(test, -1)` 은 `true`를 리턴한다.

H를 구현한 `H(P, I)`는 `test(3)`과, `test(-1)` 에 대해서는 잘 작동한다.

#### H가 잘못된 결과를 리턴하는 경우를 찾아낸다

하지만 `H(P, I)` 가 판정에 실패하는 함수를 만들 수 있다면 어떨까?

다음 함수를 보자. 이 함수는 `H(P, I)`의 헛점을 드러내기 위해 악의적으로 만든 것이다.

```python
def foo(x):
    if H(x, x):
        while true:
            print("hello")
    else:
        return 42
```

이제 이 `foo` 함수의 입력값으로 `foo`를 넣어서... `foo(foo)`와 같이 호출한다고 하자.

그렇다면 `H(P, I)` 에 `H(foo, foo)`와 같이 입력할 수 있을 것이다.

`H(foo, foo)` 는 어떤 결과를 리턴할까?

아마도 둘 중 하나일 것이다.

* `H(foo, foo)` 가 `true`를 리턴하는 경우.
    * 즉, `foo(foo)`는 무한루프하지 않고 `42`를 리턴할 것이다.
    * 그런데 과연 그럴까? `foo(foo)`를 실행한다고 생각하며 소스코드를 들여다보자.
    * `H(foo, foo)` 가 `true` 이므로, `foo(x)` 의 안쪽에서 `while true` 로 진입한다.
    * 결과적으로 `H(foo, foo)` 가 `true` 를 리턴하기 때문에 `foo(foo)` 는 무한히 루프한다.
    * 즉, `H(foo, foo)` 는 `false`를 리턴해야 맞다.
<br/><br/>
* `H(foo, foo)` 가 `false`를 리턴하는 경우.
    * 즉, `foo(foo)`는 무한루프할 것이다.
    * 그런데 과연 그럴까? `foo(foo)`를 실행한다고 생각하며 소스코드를 들여다보자.
    * `H(foo, foo)` 가 `false` 이므로, `foo(foo)`는 `42`를 리턴하고 정지한다.
    * 결과적으로 `H(foo, foo)` 가 `false` 를 리턴하기 때문에 `foo(foo)` 는 무한히 루프하지 않는다.
    * 즉, `H(foo, foo)` 는 `true`를 리턴해야 맞다.

따라서 H를 구현한 `H(P, I)` 가 정확히 판별할 수 없는 함수가 적어도 하나 존재한다.

이는 전제에 모순된다.

따라서 H를 만드는 것은 불가능하다.

## 참고문헌 및 Links

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일
* 컴퓨터과학이 여는 세계 / 이광근 저 / 인사이트(insight) / 2017년 02월 28일
* [Halting  problem (AI study)](http://www.aistudy.co.kr/computer/halting_problem.htm )

