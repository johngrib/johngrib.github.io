---
layout  : wiki
title   : (요약) Data Abstraction and Hierarchy by Barbara Liskov 1988
summary : 바바라 리스코프의 1988년 논문을 읽고 요약한다
date    : 2019-10-06 12:00:14 +0900
updated : 2023-04-23 20:10:34 +0900
tag     : oop
resource: 64/B75273-DD0F-40DF-812E-3A0E02EDF42F
toc     : true
public  : true
parent  : [[/clipping]]
latex   : false
---
* TOC
{:toc}

* [Data Abstraction and Hierarchy by Barbara Liskov 1988][pdf]
* 리스코프 치환 원칙(Liskov substitution principle, LSP)이 이 논문에서 나온 개념이다.
* LSP의 기원이 된 논문이라 하니 관심이 생겨 읽어보았는데, 아직까지 널리 쓰이는 개념들이 등장해서 무척 재미있게 읽었다.
    * 제네릭, 함수 전달 등등

## ABSTRACT

**개요**

* 데이터 추상화는 프로그램을보다 쉽게 수정하고 유지 관리 할 수 있도록 구성하는 유용한 방법이다.
* 상속은 데이터 추상화의 한 구현을 다른 계층과 관계지을 수 있다.
* 이 논문은 프로그램 개발 측면에서 계층 구조의 유용성을 조사한다. 그리고 데이터 추상화가 더 중요한 아이디어이긴 하지만, 계층 구조는 일부 상황에서 더욱 유용하다는 결론을 내린다.

## 1. Introduction

* 설계의 중요한 목표: 변화하는 요구 사항을 지원하기 위한 유지보수를 단순화할 수 있는 프로그램 구조를 알아내는 것.
* 데이터 추상화는 이 목표를 달성하는 좋은 방법.
* 객체 지향 프로그래밍은 주로 데이터 추상화 기술이며, 상당부분이 이 관점에서 파생된다.
    * 상속(inheritance) 개념이 여기에서 비롯되었다.
    * 이 논문은 데이터 추상화와 객체 지향 프로그래밍의 관계에 대해 설명한다.

논문 개요

* 2장: 데이터 추상화와 프로그램 개발 프로세스 역할을 정의한다.
* 3장: 상속에 대해 논의하고, 구현 계층(implementation hierarchy)과 타입 계층(type hierarchy)에 사용되는 두 가지 방법을 알아본다.
* 4장: 프로그램 설계 및 개발에서의 타입 계층의 사용.
* 5장: 타입 계층을 구현할 때 발생하는 몇 가지 문제들.
* 6장: 결론

## 2. Data Abstraction

프로그래밍 추상화의 목적은 동작(behavior)과 구현(implementation)을 분리하는 것이다.

* 최초의 프로그래밍 추상화 메커니즘은 절차(procedure)였다.
* 절차는 유용한 추상화 메커니즘이었지만, 70년대 초의 몇몇 연구자들은 절차로는 충분하지 않다는 것을 깨닫게 됐다.
    * 모듈 간의 "연결(connections)" 주위로 프로그램을 구성하는 새로운 방법을 제안.
    * 데이터 추상화(data abstraction), 추상 데이터 유형(abstract data type) 개념은 여기에서 비롯된 것이다.

데이터 추상화는 데이터 측면에서의 이점이 있다.

* 메인 아이디어: 추상화와 구현을 분리.
    * 같은 추상화의 구현을 자유롭게 대체한다.
* 데이터 객체의 구현은 그 객체가 컴퓨터 메모리에서 어떻게 표현되는지에 대한 것이다.
    * 이런 정보를 표현(representation)이라 한다.

사용자에게 영향을 주지 않으면서 표현을 변경할 수 있는 방법이 필요.

* 표현을 캡슐화.
* 표현을 직접 조작할 수 없게 한다.
* 표현을 조작하는 대리 프로그램을 사용.

데이터 추상화는 연산 집합(a set of operations)으로만 직접 조작이 가능한 객체의 집합이다.

데이터나 프로시저 추상화는 스펙(specification)으로 정의하고, 프로그래밍 언어로 구현된다.

* 스펙(specification)은 추상화가 무엇을 하는지 설명하지만 구현에 대해서는 생략한다.
    * 이러한 생략 덕분에 많은 구현이 가능해진다.
    * 구현이 사양에 정의된 행동을 제공한다면 올바른 구현이라 할 수 있다.
    * 올바른 구현들끼리는 서로 동일할 필요가 없다.
* 추상화가 작동하려면 구현을 캡슐화해야 한다.
    * 구현이 캡슐화되면 다른 모듈은 구현의 디테일에 의존하지 않게 된다.
    * Parnas가 주장한 정보 은닉(information hiding)과 관련이 있다.


### 2.1. Locality

스펙(specification)과 캡슐화(encapsulation)에 의해 지원되는 추상화는 프로그램 내에서의 지역성(locality)을 제공한다.

* 지역성은 프로그램을 한 번에 한 모듈씩 구현하거나, 이해하거나, 수정할 수 있도록 돕는다.

1. 스펙만 보고 구현할 수 있게 된다.
2. 모듈을 사용하는 사람은 스펙을 보고 필요한 것을 파악할 수 있다.
3. 프로그램의 작업 범위를 이해할 때 일부만 검토해 보아도 된다.
    * 스펙이 구현보다 훨씬 작기 때문에 노력을 많이 절약할 수 있다.
4. 프로그램 변경은 모듈별로 수행된다.

지역성(locality)은 빠른 프로토타이핑을 위한 기반과 프로그램의 진화를 지원한다.

* 서둘러서 만들면 성능이 뒤떨어지는 경향이 있지만, 나중에 더 나은 구현으로 대체할 수 있다.
* 잠재적인 변경을 캡슐화하기 위해 추상화를 사용할 수 있다.
    * 다양한 기계에서 프로그램을 돌리기 위해, 기계들 사이의 차이를 숨기는 추상화를 만들어 사용할 수 있다.

지역성(locality)은 데이터 추상화에 특히 중요하다.

* 데이터 구조는 복잡한 경우가 많으므로, 스펙에서 제공하는 단순한 추상 뷰를 사용하면 프로그램을 더 간단하게 만들 수 있다.
* 프로그램이 발전하면서 발생하는 변경을 데이터 추상화 안에 캡슐화하여, 최소화할 수 있다.


### 2.2. Linguistic Support for Data Abstraction

* 데이터 추상화는 여러 언어에서 지원된다.
* 최초의 언어는 Simula 67.
* CLU[^clu], Smalltalk의 경우를 설명한다.

CLU는 추상 타입(abstract type)을 구현하기 위해 cluster라는 메커니즘을 제공한다.

* 데이터 타입과 해당 타입의 연산 목록을 식별.
* 타입 객체가 표현되는 방법을 정의.
* cluster 내부에서만 사용 가능한 프로시저도 있을 수 있다.

Smalltalk에서는 데이터 추상화를 위해 클래스를 구현한다.

* 클래스는 계층 구조로 배열될 수 있다.
* 클래스는 데이터 추상화를 구현한다.
* 클래스에는 메소드가 있다.
    * 단, Smalltalk에서는 외부에서 메소드를 사용하는 것을 막지 않기 때문에 내부 메소드가 없다.

이후 CLU와 Smalltalk의 간단한 비교.


## 3. Inheritance and Hierarchy

이 섹션에서는 상속 및 계층 구조를 지원하는 방법을 다룬다.

* 상속을 사용하여 프로그램을 구성하는 것은 무엇을 의미하는가?
* 상속의 두 가지 용도
    * 구현 계층
    * 타입 계층

### 3.1. Inheritance

상속이 있는 언어에서 데이터 추상화는 서로 관계 있는 여러 부분으로 구현될 수 있다.

* Smalltalk에서 클래스는 다른 클래스 메커니즘의 서브 클래스로 선언될 수 있다.
* 서브클래스는 규칙을 적용한 인스턴스 변수와 메소드를 포함하는 클래스를 직접 구현하는 것과 같다.

상속 메커니즘의 문제점: 데이터 추상화를 손상시킬 수 있다.

캡슐화를 위반하는 세 가지 경우.

* 서브 클래스가 수퍼 클래스의 인스턴트 변수에 엑세스.
* 서브 클래스가 수퍼 클래스의 private 오퍼레이션을 호출.
* 서브 클래스가 수퍼 클래스의 수퍼 클래스를 직접 참조.

캡슐화 위반과 관련하여

* 캡슐화를 위반하지 않으면 스펙만으로 수퍼클래스의 연산(operations)을 추측할 수 있다.
* 캡슐화를 위반하면 지역화의 장점을 잃게 된다.
* 캡슐화를 위반할 때의 편리한 점도 있긴 하지만 바람직하지는 않다.


### 3.2. Implementation Hierarchy

상속의 구현

* 기존의 다른 타입과 유사한 데이터 타입을 구현하는 기술.
* 중복 작업을 수행하는 방법: 추상 타입을 다른 타입의 표현으로 사용하는 것.

### 3.3. Type Hierarchy

* 타입 계층은 서브 타입과 수퍼 타입으로 이루어진다.
* 하위 타입은 수퍼 타입의 모든 동작과 추가 기능을 이어받는다.

>
What is wanted here is something like the following substitution property [6]: If for each object o1 of type S there is an object o2 of type T such that for all programs P defined in terms of T, the behavior of P is unchanged when o1 is substituted for o2, then S is a subtype of T.
<br><br>
여기에 필요한 것은 다음과 같은 치환(substitution) 원칙이다.
S 타입의 객체 o1 각각에 대응하는 T 타입 객체 o2가 있고,
T 타입을 이용해서 정의한 모든 프로그램 P에서 o2의 자리에 o1을 치환하더라도 P의 행위가 변하지 않는다면,
S는 T의 하위 타입이다.

* (이 부분은 "리스코프 치환 원칙(Liskov Substitution Principle, LSP)"로 널리 알려져 있다.)
* (나는 이 부분을 찾기 위해 이 논문을 읽기 시작했다.)

"서브 타입"과 "수퍼 타입"이라는 단어를 사용해 의미론적 구분을 강조.

* 서브 클래스와 수퍼 클래스는 프로그래밍 언어의 개념.

서브 타입이 아닌 몇 가지 예.

* 집합(set)은 리스트(list)의 서브 타입이 아니며, 그 반대도 아니다.
* 스택(stack)과 큐(queue)도 서로의 서브 타입이 아니다.

서브 타입의 예

* 인덱스가 있는 컬렉션
    * arrays, sequences, indexed sets
* 여러 종류의 입력/출력 장치를 통합하는 추상적 디바이스
    * 추상 디바이스는 모든 디바이스를 지원한다.
    * 서브 타입 작업은 디바이스마다 다르다.

상속 메커니즘을 사용해 서브 타입 계층을 구현할 수 잇다.

## 4. Benefits of Type Hierarchy

데이터 추상화는 강력한 도구.

* 타입 계층은 데이터 추상화에 유용하다.
* 이 섹션에서는 프로그램 설계 개발에서 서브 타입을 사용하는 방법과, 라이브러리 구성의 사용에 대해 알아본다.

### 4.1. Incremental Design

* 데이터 추상화는 설계의 진행에 따라 점진적으로 개발된다.
* 디자인의 초기 단계에서는 데이터 추상화 작업의 일부와 동작을 일부만 알 수 있다.

설계 과정을 각 타입 노드의 연결 그래프를 통해 보여준다.

* 타입 그룹을 단일 타입으로 처리하는 것보다 서브 타입으로 추적하는 것이 좋다.
    * 설계 오류의 영향을 제한할 수 있다는 장점.
    * 문제가 발견되면 상속 구조를 따라 올라가며 검토할 수 있음.
    * 의사 결정 과정을 계층 구조에 나타내어 혼란을 피할 수 있다.
* 보통 마지막 서브 타입을 개발하며 디자인이 끝나게 된다.

### 4.2. Related Types

서브 타입의 두 번째 용도는 관계형 타입(related types).

* 설계자는 설계하다 보면 서로 비슷하지만 조금씩 다른 여러 데이터 추상화를 사용한다는 것을 깨닫게 된다.

관계형 타입은 두 가지 방법으로 발생한다.

* 관계가 사전에 정의된 경우
    * 이런 경우에는 계층 구조가 프로그램을 설명하는 좋은 방법일 수 있다.
    * 상속을 구현 메커니즘으로 사용할 것.
* 개발하다 관계가 만들어지는 경우
    * 이런 경우에는 계층 구조가 올바른 방법이 아닐 수 있다.

### 4.3. Organizing a Type Library

계층 구조는 타입 라이브러리를 구성할 때 유용하다.

* 다른 사람들이 구현한 모듈을 재사용할 때, 원하는 모듈이 존재하는지 쉽게 파악할 수 있다면 좋다.
    * 계층 구조는 프로그램 라이브러리를 구성하는 방법으로 유용하다.
* 계층 구조를 사용하면 비슷한 타입을 그룹으로 묶을 수 있다.
* 전체 라이브러리를 단일 루트에서 시작되는 것으로 치고, 익스플로러를 제공하는 방법을 쓰면 라이브러리 검색이 편할 것이다.


## 5. Type Hierarchy and Inheritance

프로그래밍 언어에서 타입 계층 구조를 지원하는지 아닌지는 필수적인 것은 아니다.

* 타입 계층 구조 개념을 구성 원칙(organizing principle)로 사용하는 것이 필요하다.
* 최종적으로 서브 타입이 나오며 구현이 마무리되는 경우, 나중에 추가 작업이 있을 때 상속을 통해 문제를 해결할 수 있다.
    * 데이터 추상화를 지원하는 모든 언어가 여기에 적합하다.
* 그러나 관계형 타입(related types)에는 언어가 특수한 지원을 해 줄 필요가 있다.

### 5.1. Polymorphism

> A polymorphic procedure or data abstraction is one that works for many different types. For example, consider a procedure that does sorting. In many languages, such a procedure would be implemented to work on an array of integers; later, if we needed to sort an array of strings, another procedure would be needed. This is unfortunate. The idea of sorting is independent of the particular type of element in the array, provided that it is possible to compare the elements to determine which ones are smaller than which other ones. We ought to be able to implement one sort procedure that works for all such types. Such a procedure would be polymorphic.

>
다형성 프로시저나 데이터 추상화는 수많은 다양한 타입에 적용되는 것이다.
예를 들어 정렬을 수행하는 프로시저를 생각해 보자.
많은 언어에서 이 절차는 int 배열에서 돌아가게 구현되므로,
나중에 문자열 배열의 정렬이 필요하게 되었을 때 다른 프로시저가 필요하게 된다.
안타까운 일이 아닐 수 없다.
정렬의 개념은 각 원소들이 서로 큰지 작은지만 비교할 수 있는 것이 중요하지, 배열의 원소들의 타입이 무엇인지와는 독립된 것이기 때문이다.
우리는 모든 타입에 적합한 정렬 프로시저를 구현할 수 있어야 한다. 그리고 그런 프로시저는 다형성(polymorphic)이 될 것이다.

* 프로그램에 관련된 타입들이 있다면, 다형성을 생각할 수 있다.
* 관계를 미리 정의했더라도 다형성이 발생할 수 있다.
* 다형성을 위해 계층 구조를 사용한다는 것.
    * 다형성 모듈이 수퍼 타입.

관계를 정의하기 전에 먼저 타입이 존재한다면 계층 구조는 작동하지 않는다.

이럴 때 수퍼 타입을 도입하면 타입 유니버스가 복잡해진다.

* 새로운 수퍼 타입을 추가하면 다형성 모듈에서 사용하는 모든 유형을 서브 타입으로 만들어야 하기 때문.
* 가령 sortable 이라는 새로운 타입을 추가하면 모든 원소 유형을 서브 타입으로 만들어야 한다.
* 새로운 타입이 추가될 때마다 이런 수퍼 타입을 고려해야 한다.

다형성 모듈이 다른 타입을 사용할 수 있도록 하는 방법.

* 관계 타입 하나에 해당하는 객체를 다형성 모듈에 인수로 전달하는 방식.
* 이 방법을 그룹화 방법(grouping approach)이라 한다.

그룹화 방식을 사용하는 CLU의 경우, 정렬 프로시저의 헤더는 다음과 같다.

```
sort = proc [T: type] (a: array[T])
    where T has lt: proctype (T, T) returns (bool)
```

이 헤더는 매개변수 T를 indicated signature를 가진 It 이라는 operation이 있는 타입으로 제한한다.

좀 더 일반화할 수 있는 방법은 필요한 연산을 프로시저 인수로 단순하게 전달하는 것이다.
예를 들어 정렬은 배열과 순서를 결정하는 루틴, 이렇게 두 개의 인자만 받으면 된다. 
(물론 이 해법은 Smalltalk에서는 잘 작동하지 않는다. Smalltalk에서 프로시저는 개별적으로 정의할 수 없기 때문이다.)


### 5.2. Multiple Implementations

* 동일한 타입의 여러 구현을 갖는 것은 종종 유용하다.
* 동일한 프로그램 내에서 같은 타입이지만 다른 표현의 객체를 사용하는 것이 바람직할 때가 있다.

## 6. Conclusions

추상화, 특히 데이터 추상화는 요구 사항이 변경됨에 따라 유지보수가 용이한 프로그램을 개발하는 데에 있어 중요한 기술이다. 데이터 추상화는 미래에 변경될 수 있는 복잡한 대상(자료 구조)을 숨기므로 특히 중요하다고 할 수 있다.
추상화를 통해 데이터를 사용하는 프로그램에 영향을 주지 않고 데이터의 표현을 지역적으로(locally) 변경할 수 있다.

상속한 하나의 타입이 계층적으로 다른 타입과 관계될 수 있도록 만드는 구현 메커니즘이다.
상속은 두 가지 방법으로 사용된다.

1. 다른 타입의 구현에서 파생되어 구현하는 방법
2. 서브타입을 정의하는 방법

첫 번째 방법은 다른 타입의 표현으로 사용하는 것이기 때문에 별로 흥미롭지 않다고 본다.
그러나 서브타입을 만드는 것은 새로운 기능(new ability)을 추가하는 것이므로 중요하다.

서브 타입에는 세 가지 용도가 있다.

1. 점진적 설계(incremental design)가 진행되는 동안 설계 변경의 영향을 제한하고, 설계 문서를 구성하는 방법을 제공한다.
2. 관계 타입을 그룹화할 수 있는 방법을 제공한다.
3. 타입 라이브러리를 구성하는 편리하고 합리적인 방법이다.

상속은 서브 타입 계층을 구현하는 데 사용할 수 있다.
수퍼 타입이 먼저 발명되었을 경우 관계 타입을 다룰 때 주로 상속이 필요한데,
수퍼 클래스에서 한 번만 공통적인 기능을 구현한 다음 각 서브 타입에 대해 별도로 확장을 구현하는 것이 편리하기 때문이다.

데이터 추상화가 더 중요하긴 하지만, 타입 계층은 그 유용성을 확장시킨다고 결론내린다.
게다가 때때로 상속은 타입 계층 구조를 표현하기 위해 필요하며, 그렇기 때문에 프로그래밍 언어에서 제공하는 유용한 메커니즘이다.


## Links

* [Data Abstraction and Hierarchy][pdf]


## 주석

[pdf]: https://pdfs.semanticscholar.org/36be/babeb72287ad9490e1ebab84e7225ad6a9e5.pdf

[^clu]: CLU는 바바라 리스코프가 만든 프로그래밍 언어이다.

