---
layout  : wiki
title   : DRY 원칙
summary : Don't Repeat Yourself
date    : 2020-03-30 21:39:43 +0900
updated : 2023-04-09 15:47:52 +0900
tag     : 
resource: 1F/23E542-32BB-48EC-BDE2-96510E617158
toc     : true
public  : true
parent  : [[/jargon]]
latex   : false
---
* TOC
{:toc}

## 개요

> Don't Repeat Yourself
>
> 반복하지 마라

조금 더 친숙하게 말하자면 다음과 같이 말할 수도 있을 것이다.

> **복붙하지 마라**

## From: 실용주의 프로그래머

> 소프트웨어를 신뢰성 높게 개발하고,
개발을 이해하고 유지보수하기 쉽게 만드는 유일한 길은 우리가 DRY 원칙이라고 부르는 것을 따르는 것뿐이라 생각한다.
DRY 원칙이란 이것이다.  
**모든 지식은 시스템 내에서 단일하고, 애매하지 않고, 정말로 믿을만한 표현 양식을 가져야 한다.**
[^andy-66]

### 중복의 4가지 범주

실용주의 프로그래머에서는 중복을 4가지 범주로 분류한다.

>
- **강요된(impose) 중복.** 개발자들은 다른 선택이 없다고 느낀다. 환경이 중복을 요구하는 것처럼 보인다.
- **부주의한 중복.** 개발자들은 자신들이 정보를 중복하고 있다는 것을 깨닫지 못한다.
- **참을성 없는 중복.** 중복이 쉬워 보이기 때문에 개발자들이 게을러져서 중복을 하게 된다.
- **개발자간의 중복.** 한 팀에 있는(혹은 다른 팀에 있는) 여러 사람들이 동일한 정보를 중복한다.[^andy-67]

코드 내의 주석이 너무 많거나 상세하면 DRY 원칙을 위반할 수 있다.

> 코드에는 주석이 있어야 하지만, 너무 많은 것은 너무 적은 것만큼이나 좋지 않다.  
일반적으로 주석은 왜 이렇게 되어 있는지, 그 목적을 논해야 한다.
코드가 이미 어떻게 되어 있는지 보여 주기 때문에 이에 대해 주석을 다는 것은 사족이다.
게다가 이것은 DRY 원칙 위반이다.[^andy-386]

## From: Clean Code

- 많은 원칙과 기법이 중복을 없애거나 제어할 목적으로 나왔다.

> 어쩌면 중복은 소프트웨어에서 모든 악의 근원이다.
많은 원칙과 기법이 중복을 없애거나 제어할 목적으로 나왔다.
예를 들어, E.F.커드(E.F.Codd)는 자료에서 중복을 제거할 목적으로 관계형 데이터베이스에 정규 형식을 만들었다.
객체지향 프로그래밍은 코드를 부모 클래스로 몰아 중복을 없앤다.
구조적 프로그래밍, AOP(Aspect Oriented Programming), COP(Component Oriented Programming) 모두 어떤 면에서 중복 제거 전략이다.
하위 루틴을 발명한 이래로 소프트웨어 개발에서 지금까지 일어난 혁신은 소스 코드에서 중복을 제거하려는 지속적인 노력으로 보인다.
[^clean-code-60]

- 거의 모두가 이 규칙을 언급한다!

> 소프트웨어 설계를 거론하는 저자라면 거의 모두가 이 규칙을 언급한다.
데이비드 토머스와 앤디 헌트는 이를 DRY(Don't Repeat Yourself) 원칙이라 부른다.
켄트 벡은 익스트림 프로그래밍의 핵심 규칙 중 하나로 선언한 후 "한 번, 단 한 번만(Once, and only once)"이라 명명했다.
론 제프리스는 이 규칙을 "모든 테스트를 통과한다"는 규칙 다음으로 중요하게 꼽았다.[^clean-code-372]

- 어디서든 중복을 발견하면 없애라.

> 코드에서 중복을 발견할 때마다 추상화할 기회로 간주하라.
중복된 코드를 하위 루틴이나 다른 클래스로 분리하라.
이렇듯 추상화로 중복을 정리하면 설계 언어의 어휘가 늘어난다.
다른 프로그래머들이 그만큼 어휘를 사용하기 쉬워진다.
추상화 수준을 높였으므로 구현이 빨라지고 오류가 적어진다.
[^clean-code-373]

### 중복의 유형과 제거 방법

> 가장 뻔한 유형은 똑같은 코드가 여러 차례 나오는 중복이다.
프로그래머가 미친듯이 마우스로 긁어다 여기저기로 복사한 듯이 보이는 코드다.
이런 중복은 간단한 함수로 교체한다.
>
> 좀 더 미묘한 유형은 여러 모듈에서 일련의 `switch`/`case`나 `if`/`else`문으로 똑같은 조건을 거듭 확인하는 중복이다.
이런 중복은 다형성(polymorphism)으로 대체해야 한다.
>
> 더더욱 미묘한 유형은 알고리즘이 유사하나 코드가 서로 다른 중복이다.
중복은 중복이므로 [[/pattern/template-method]]{TEMPLATE METHOD 패턴}이나 [[/pattern/strategy]]{STRATEGY 패턴}으로 중복을 제거한다.
>
> 사실 최근 15년 동안 나온 디자인 패턴은 대다수가 중복을 제거하는 잘 알려진 방법에 불과하다.
BCNF(Boyce-Codd Normal Form) 역시 데이터베이스 스키마에서 중복을 제거하는 전략이다.
OO 역시 모듈을 정리하고 중복을 제거하는 전략이다.
짐작하겠지만, 구조적 프로그래밍도 마찬가지다.
[^clean-code-373]

## WET: DRY 원칙 위반

>
DRY 원칙의 위반은 WET 이라는 약자로 흔히 설명됩니다.
_우리는 타이핑을 즐기고, 모든 것을 두 번 작성하고, 모든 사람의 시간을 낭비합니다. (we enjoy typing, write everything twice, and waste everyone's time)_
[^clean-craftsmanship-95]

## 함께 읽기

- [[/jargon/boy-scout-rule]]
- [[/pattern/strategy]]
- [[/pattern/template-method]]

### 생각해 볼 문제: 의존성 위생 {#dependency-hygiene}

Rob Pike는 2012년 10월 25일, ["Go at Google: Language Design in the Service of Software Engineering"]( https://go.dev/talks/2012/splash.article )에서 다음과 같이 말했다.

>
Through the design of the standard library, great effort was spent on controlling dependencies.
It can be better to copy a little code than to pull in a big library for one function.
(A test in the system build complains if new core dependencies arise.)
<mark>Dependency hygiene trumps code reuse.</mark>
One example of this in practice is that the (low-level) net package has its own integer-to-decimal conversion routine to avoid depending on the bigger and dependency-heavy formatted I/O package.
Another is that the string conversion package strconv has a private implementation of the definition of 'printable' characters rather than pull in the large Unicode character class tables; that strconv honors the Unicode standard is verified by the package's tests.
[^go-at-google-7]

표준 라이브러리를 설계하면서 의존성을 컨트롤하는 데에 많은 노력을 기울였습니다.
한 개의 함수를 위해 큰 라이브러리를 끌어오는 것보다, 코드를 좀 복사하는 것이 더 나은 선택일 수 있습니다.
(시스템 빌드에서 새로운 핵심 의존성이 추가되면 테스트가 경고를 띄웁니다.)
<mark>의존성 위생이 코드 재사용보다 우선입니다.</mark>
이에 대한 실제 사례 중 하나가 (로우레벨) net 패키지입니다.
이 패키지는 더 크고 의존성이 많은 형식의 I/O 패키지에 의존하지 않기 위해 자체적으로 integer에서 decimal로의 변환 루틴을 갖고 있습니다.
또 다른 사례는 string 변환 패키지 strconv입니다.
strconv는 큰 유니코드 문자 클래스 테이블을 가져오지 않고 그 대신 'printable' 문자의 정의를 private 하게 구현하고 있습니다.
strconv가 유니코드 표준을 준수하는지는 패키지의 테스트를 통해 확인됩니다.

## 참고문헌

- Clean Code / 로버트 C. 마틴 저/박재호, 이해영 역 / 인사이트(insight) / 초판 3쇈 2016년 05월 25일
- 실용주의 프로그래머 / 앤드류 헌트,데이비드 토머스 공저 / 김창준,정지호 공역 / 인사이트(insight) / 초판 1쇄 2005년 08월 15일
- 클린 코드의 기술 / Christian Mayer 저/유동환 역 / 영진닷컴 / 1판 1쇄 2023년 01월 20일 / 원제: The Art of Clean Code: Best Practices to Eliminate Complexity and Simplify Your Life

## 주석

[^andy-66]: 실용주의 프로그래머. 7. 중복의 해악. 66쪽.
[^andy-67]: 실용주의 프로그래머. 7. 중복의 해악. 67쪽.
[^andy-386]: 실용주의 프로그래머. 44. 결국은 모두 글쓰기. 386쪽.
[^clean-code-60]: Clean Code. 3장. 60쪽.
[^clean-code-373]: Clean Code. 17장. 373쪽.
[^clean-code-372]: Clean Code. 17장. 372쪽.
[^clean-craftsmanship-95]: 클린 코드의 기술. 4장. 95쪽.
[^go-at-google-7]: [Go at Google: Language Design in the Service of Software Engineering 의 7. Dependencies in Go]( https://go.dev/talks/2012/splash.article#TOC_7. ) 마지막 문단.

