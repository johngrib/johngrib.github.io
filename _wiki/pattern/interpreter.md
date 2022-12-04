---
layout  : wiki
title   : 인터프리터 패턴 (Interpreter Pattern)
summary : 언어를 위한 인터프리터를 구현한다.
date    : 2021-10-10 18:35:08 +0900
updated : 2021-10-11 11:39:07 +0900
tag     : GoF-design-pattern
resource: 72/1F482B-C738-43B5-A114-607E10DBDF98
toc     : true
public  : true
parent  : [[/pattern]]
latex   : true
---
* TOC
{:toc}

- 다음과 같이 불린다.
    - 인터프리터 패턴
    - 해석자 패턴
    - 해석기 패턴

## 개요

> 어떤 언어의 대해, 그 언어의 문법에 대한 표현을 정의하면서 그것(표현)을 사용하여 해당 언어로 기술된 문장을 해석하는 해석자를 함께 정의합니다.
[^gof-324]

<span/>

>
프로그램을 작성할 때 프로그램의 모든 행위를 정의하지 못하는 경우도 있다.
예를 들어 브라우저를 만들 경우 사이트 디자이너가 웹 페이지를 어떻게 행동하게 하고 싶어할지에 대해 모두 예측하는 것은 불가능하다.
그러므로 자바 스크립트와 같은 인터프리터 언어를 통해 브라우저에 브라우저 프로그래머가 구현하지 않은 행위를 추가할 수 있도록 한다.
>
Interpreter 패턴은 이러한 용도에 사용되는 인터프리터를 작성할 수 있도록 해준다.
우선 언어의 문법을 기술하는 규칙들에 대한 형식 문법을 정의한다. 그리고 각 규칙들을 클래스를 통해 구현한다.
>
이들 클래스는 Context 객체를 공유하며, Context 객체로부터 입력을 받고 변수 값을 저장하는 등의 작업을 하게 된다.
Interpreter는 실제 작업을 하는 (상태 머신과 같은) 효과적인 출력 프로세서를 생성하기도 하지만 꼭 그러한 것은 아니다.
[^holub-476]

<span/>

>
한 클래스 내의 여러 메서드에서 일종의 묵시적 언어를 이루는 요소들을 조합하고 있다면,
그 묵시적 언어의 요소들을 각각의 클래스로 정의하고
그 객체의 조합을 통해 해석 가능한 수식을 만들어낼 수 있도록 한다.
[^joshua-360]

## 구조


![인터프리터 패턴의 구조를 표현한 다이어그램]( ./interpreter.svg )

GoF의 디자인 패턴에서는 정규 표현식을 위한 인터프리터를 예로 들며 위의 구조에 대한 참여자를 설명한다.[^gof-327]

>
- `AbstractExpression(RegularExpression)`: 추상 구문 트리에 속한 모든 노드에 해당하는 클래스들이 공통으로 가져야 할 `Interprete()` 연산을 추상 연산으로 정의합니다.
- `TerminalExpression(LiteralExpression)`: 문법에 정의한 터미널 기호와 관련된 해석 방법을 구현합니다. 문장을 구성하는 모든 터미널 기호에 대해서 해당 클래스를 만들어야 합니다.
- `NonterminalExpression(AlternationExpression, RepetitionExpression, SequenceExpressions)`: 문법의 오른편에 나타나는 모든 기호에 대해서 클래스를 정의해야 합니다.
문법에 다음과 같이 정의하고 있다면, <br/> $$R ::= R_1 R_2 ... R_n $$ <br/> $$R$$에 대해서 NonterminalExpression 에 해당하는 클래스를 정의해야 합니다.
또한 터미널 기호가 아닌 모든 기호들에 대해서 `Interprete()` 연산을 구현해야 합니다.
이 `Interprete()` 연산은 $$ R_1 $$ 에서 $$ R_n $$에 이르기까지의 각 인스턴스 변수를 재귀적으로 호출하는 것이 일반적입니다.
- `Context`: 번역기에 대한 포괄적인 정보를 포함합니다.
- `Client`: 언어로 정의한 특정 문장을 나타내는 추상 구문 트리입니다. 이 추상 구문 트리는 NonterminalExpression과 TerminalExpression 클래스의 인스턴스로 구성됩니다. 이 인스턴스의 `Interprete()` 연산을 호출합니다.

## 예제

### From: 실용주의 디자인 패턴

다음은 [실용주의 디자인 패턴]의 예제를 참고해 일부 수정한 것으로,
boolean 표현식을 평가할 수 있는 간단한 언어를 인터프리터 패턴을 사용해 구현한 것이다.

- `Logic`은 `AbstractExpression`의 역할을 한다.
- `Values`는 변수명과 값을 보관하는 `Context` 역할을 한다. 즉 전역 정보를 관리한다.

```java
public interface Logic {
  // Logic.Values 는 Boolean 변수들을 보관하는 일종의 namespace 이다.
  public static class Values {
    static Map<String, Boolean> vars = new HashMap<>();

    // 변수명과 변수값을 할당한다.
    static void assign(String key, boolean value) {
      if (key == null || key.length() <= 0) {
        throw new LogicException("assign failed");
      }
      vars.put(key, value ? Boolean.TRUE : Boolean.FALSE);
    }

    // 변수 이름으로 변수값을 찾는다.
    static boolean lookup(String key) {
      Object got = vars.get(key);
      return (Boolean) got;
    }
  }

  boolean evaluate();
}
```

- `ANDLogic`은 `NonterminalExpression`이며, AND 연산을 정의한다.

```java
public class ANDLogic implements Logic {
  Logic left, right;

  public ANDLogic(Logic left, Logic right) {
    this.left = left;
    this.right = right;
  }

  @Override
  public boolean evaluate() {
    return left.evaluate() && right.evaluate();
  }
}
```

- `ORLogic`은 `NonterminalExpression`이며, OR 연산을 정의한다.

```java
public class ORLogic implements Logic {
  Logic left, right;

  public ORLogic(Logic left, Logic right) {
    this.left = left;
    this.right = right;
  }

  @Override
  public boolean evaluate() {
    return left.evaluate() || right.evaluate();
  }
}
```

- `NOTLogic`은 `NonterminalExpression`이며, NOT 연산을 정의한다.

```java
public class NOTLogic implements Logic {
  Logic value;

  public NOTLogic(Logic value) {
    this.value = value;
  }

  @Override
  public boolean evaluate() {
    return !value.evaluate();
  }
}
```

- `Variable`은 `TerminalExpression`이며, 이름과 값을 갖는 변수를 정의한다.

```java
public class Variable implements Logic {
  private String name;

  public Variable(String name) {
    this.name = name;
  }

  @Override
  public String toString() {
    return this.name;
  }

  @Override
  public boolean evaluate() {
    return Logic.Values.lookup(name);
  }
}
```

이 인터프리터는 다음과 같이 사용할 수 있다. 주어진 표현식 문자열을 읽고 코드 변환을 자동으로 해주는 파서를 만드는 과정은 생략한다.

| 표현식            | 코드 변환           |
|-------------------|---------------------|
| <span id="exp1"/> | <span id="exp1-1"/> |
| <span id="exp2"/> | <span id="exp2-1"/> |

```js
A = true
B = false
A && B
```
{:class="dynamic-insert" data-target-selector="#exp1"}

```java
Logic.Values.assign("A", true);
Logic.Values.assign("B", false);

Logic term1 = new ANDLogic(
    new Variable("A"), new Variable("B"));
```
{:class="dynamic-insert" data-target-selector="#exp1-1"}

```js
A = true
B = false
A && !B
```
{:class="dynamic-insert" data-target-selector="#exp2"}

```java
Logic.Values.assign("A", true);
Logic.Values.assign("B", false);

Logic term2 = new ANDLogic(
    new Variable("A"), new NOTLogic(new Variable("B")));
```
{:class="dynamic-insert" data-target-selector="#exp2-1"}

## 잘 알려진 사용 예
### 객체지향 컴파일러 구현

>
해석자 패턴은 객체지향 컴파일러 구현에 널리 사용합니다.
스몰토크 언어는 물론이고 SPECTalk도 이 패턴을 이용해서 입력 파일 형식을 해석합니다.
QOCA에서는 제약 사항을 해석하기 위해서 이 패턴을 사용합니다.
>
가장 일반적인 형태는 [[/pattern/composite]]{복합체 패턴}이 사용되는 곳에 해석자 패턴을 사용할 수 있는 것입니다.
그러나 [[/pattern/composite]]{복합체 패턴}으로 정의한 클래스들이 하나의 언어 구조를 정의할 때만 해석자 패턴이라고 합니다.
[^gof-338]

### java.util.regex.Pattern

`Pettern`의 내부에 인터프리터 패턴이 적용되어 있다. 내용이 상당히 방대하므로 `Begin`과 `End`만 인용해 본다.

```java
static final class Begin extends Node {
  boolean match(Matcher matcher, int i, CharSequence seq) {
    int fromIndex = (matcher.anchoringBounds) ?
      matcher.from : 0;
    if (i == fromIndex && next.match(matcher, i, seq)) {
      matcher.first = i;
      matcher.groups[0] = i;
      matcher.groups[1] = matcher.last;
      return true;
    } else {
      return false;
    }
  }
}
```

```java
static final class End extends Node {
  boolean match(Matcher matcher, int i, CharSequence seq) {
    int endIndex = (matcher.anchoringBounds) ?
      matcher.to : matcher.getTextLength();
    if (i == endIndex) {
      matcher.hitEnd = true;
      return next.match(matcher, i, seq);
    }
    return false;
  }
}
```

### Specification 패턴과 Query Object 패턴

>
Specification[^evans-238]과 Query Object[^fowler-337] 패턴은 Interpreter 패턴을 매우 적극적으로 사용하는 예다.
두 패턴은 모두 단순한 문법과 객체의 조합을 이용해 검색 조건식을 모델화하는 것으로, 검색 조건식과 그 표현을 분리하는 데 유용하게 쓰일 수 있다.
예를 들어, Query Object 패턴은 쿼리를 일반화해 모델로 만들기 때문에 데이터베이스에 실제로 쿼리할 때 사용되는 SQL로 쉽게 변환할 수 있다.
>
인터프리터는 시스템 설정을 런타임에 변경하기 위해 사용되는 경우도 많다.
예를 들어, 시스템에서 사용자 인터페이스를 통해 사용자가 원하는 설정을 쿼리 형태로 입력받은 다음, 그 쿼리를 나타내는 해석 가능한 객체 구조를 동적으로 생성할 수 있다.
이런 식으로 인터프리터는 시스템 내의 모든 동작이 정적이어서,
동적으로 설정할 수 없는 경우에는 불가능한 훨씬 더 큰 강력함과 융통성을 제공할 수 있다.
[^joshua-363]

## 고려할 점들

>
Interpreter는 단순한 언어를 해석할 때 유용한 패턴이다.
문법을 불과 클래스 몇 개로 모델화할 수 있을 때, 그 언어는 단순하다고 말한다.
단순한 언어의 문장<sup>sentence</sup>이나 수식<sup>expression</sup>은 그 문법을 정의하는 클래스들의 인스턴스를 조합해 표현할 수 있다.
이때는 보통, Composite 패턴을 이용한다.
>
Interpreter 패턴에 대한 반응에 따라 프로그래머를 두 부류로 나눌 수 있다.
한 쪽은 인터프리터의 구현을 쉽게 생각하는 반면, 다른 한 쪽은 전혀 그렇게 생각하지 않는다.
그러나 구문 분석 트리<sup>parse tree</sup>나 추상 문법 트리<sup>abstract syntax tree</sup>, 종단/비종단 수식<sup>terminal/nonterminal expression</sup> 등과 같은 용어를 아느냐 모르느냐에 상관없이,
Interpreter 패턴을 구현하는 것은 [[/pattern/composite]]{Composite 패턴}보다 약간 더 복잡할 뿐이다.
단지 어려운 점은 어떤 경우에 인터프리터가 필요한지를 아는 것이다.
>
언어가 복잡하거나 반대로 아주 단순한 경우에는 인터프리터가 필요 없다.
복잡한 언어를 다룬다면, 파싱과 문법 정의, 해석 등의 기능을 지원하는 JavaCC[^javacc] 같은 전문 도구를 사용하는 것이 좋다.
예를 들어, 나는 어떤 프로젝트에서 동료들과 함께 20개가 넘는 클래스가 필요한 문법을 구현하기 위해 파서 생성기를 이용 했다.
클래스 20개는 Interpreter 패턴을 이용해 직접 만들기에 버거운 숫자였기 때문이다.
또 다른 프로젝트에서는 언어의 문법이 너무 단순해서, 해석을 위한 클래스를 따로 구현할 필요도 없었다.
>
어떤 언어의 문법을 10개 이하의 클래스로 구현할 수 있다면, Interpreter 패턴을 사용하는 것이 좋다.
검색 조건식을 통해 객체나 데이터베이스를 검색하는 것이 바로 그런 문법에 해당한다.
[^joshua-361]


## 참고문헌

- GoF의 디자인 패턴(개정판) / 에릭 감마, 리처드 헬름, 랄프 존슨, 존 블라시디스 공저 / 김정아 역 / 프로텍미디어 / 발행 2015년 03월 26일
- 실전 코드로 배우는 실용주의 디자인 패턴 / Allen Holub 저 / 송치형 편역 / 사이텍미디어 / 발행 2006년 07월 19일 / 원제 : Holub on Patterns : Learning Design Patterns by Looking at Code
- 패턴을 활용한 리팩터링 / 조슈아 케리에브스키 저 / 윤성준, 조상민 공역 / 인사이트(insight) / 신판 1쇄 발행 2011년 02월 09일 / 원제 : REFACTORING TO PATTERNS

## 주석

[^gof-324]: GoF의 디자인 패턴. 5장. 324쪽.
[^gof-327]: GoF의 디자인 패턴. 5장. 327쪽.
[^gof-338]: GoF의 디자인 패턴. 5장. 338쪽.
[^holub-476]: 실전 코드로 배우는 실용주의 디자인 패턴. Appendix. 476쪽.
[^joshua-360]: 패턴을 활용한 리팩터링. 8장. 360쪽.
[^joshua-361]: 패턴을 활용한 리팩터링. 8장. 361쪽.
[^joshua-363]: 패턴을 활용한 리팩터링. 8장. 363쪽.
[^javacc]: [Java Compiler Compiler (JavaCC)]( https://javacc.github.io/javacc/ )
[^evans-238]: 에릭 에반스의 도메인 주도 설계 238쪽 참고.
[^fowler-337]: 마틴 파울러의 엔터프라이즈 애플리케이션 아키텍처 패턴 13장 337쪽 참고.

