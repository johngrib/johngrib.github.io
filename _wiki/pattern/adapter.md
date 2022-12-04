---
layout  : wiki
title   : 어댑터 패턴 (Adapter Pattern)
summary : 서로 일치하지 않는 인터페이스를 가진 클래스를 함께 동작시킨다
date    : 2019-10-29 14:53:41 +0900
updated : 2021-10-10 14:13:55 +0900
tag     : pattern
resource: F1/22F75B-0A13-4845-A03D-0865E1EDEDFB
toc     : true
public  : true
parent  : [[pattern]]
latex   : false
---
* TOC
{:toc}

* 다음과 같이 불린다.
  * 어댑터(Adapter, Adaptor)
  * 적응자
  * 래퍼(Wrapper)

## 의도

GoF 책에서는 다음과 같이 패턴의 의도를 밝힌다.[^gof]

> 클래스의 인터페이스를 사용자가 기대하는 인터페이스 형태로 적응(변환) 시킵니다.
서로 일치하지 않는 인터페이스를 갖는 클래스들을 함께 동작시킵니다.

헤드 퍼스트 디자인 패턴에서는 다음과 같이 정의한다.[^head-281]

> 한 클래스의 인터페이스를 클라이언트에서 사용하고자 하는 다른 인터페이스로 변환합니다.
어댑터를 이용하면 인터페이스 호환성 문제 때문에 같이 쓸 수 없는 클래스들을 연결해서 쓸 수 있습니다.

앨런 홀럽은 이 패턴이 다음과 같은 문제를 해결한다고 설명한다.[^holub-456]

>
- 현재 사용하고 있는 라이브러리가 더 이상 요구에 부합하지 않아 재작성하거나, 다른 라이브러리를 사용해야 할 때가 있다. 다른 라이브러리를 사용하는 경우 Adapter 패턴을 이용해 기존 코드를 가능한 적게 변경하면서 새로운 라이브러리로 교체할 수 있다.
- 기존 버전의 클래스가 다른 인터페이스를 가지도록, 예를 들어 메소드의 파라미터를 변경하거나 반환 값의 타입을 변경해야 한다면? 기존 버전과 새로운 버전의 메소드를 모두 갖는 비대한 클래스를 만들 수도 있을 것이다. 하지만 대부분의 경우 심플한 클래스(새로운 버전)를 만들고 Adapter를 이용하여 새로운 객체가 기존 코드에 존재하는 것처럼 보이게 하는 것이 더 낫다.

패턴을 활용한 리팩터링에서는 다음 조건을 모두 만족한다면 Adapter 패턴으로 리팩터링하는 것을 권장하고 있다.[^joshua-334]

>
- 두 클래스가 동일하거나 유사한 작업을 수행하지만 인터페이스가 서로 다른 경우.
- 두 클래스가 공통 인터페이스를 가지면, 클라이언트 코드가 더 간단하고 명료해질 수 있는 경우.
- 외부 라이브러리라서 인터페이스를 바꾸고 싶어도 쉽게 바꿀 수 없는 경우, 또는 인터페이스가 프레임워크의 일부라서 이미 많은 클라이언트에서 사용되고 있는 경우, 또는 소스 코드를 갖고 있지 않는 경우.

## 요약

특정 인터페이스를 지원하지 않는 대상 객체를 인터페이스를 지원하는 Adapter에 집어넣어서 사용하는 방법이라 할 수 있다.

다음은 헤드 퍼스트 디자인 패턴의 다이어그램을 참고해 그린 것이다.[^head-281]

![]( ./adapter-head-first-281.svg )

다이어그램에 나타나 있는 상황을 설명하자면 다음과 같다.

- Client는 <span style="color: blue">Target</span> 인터페이스를 구현한 <span style="color: purple">Adaptee</span>가 필요하다.
- <span style="color: purple">Adaptee</span>는 <span style="color: blue">Target</span>인터페이스를 구현하지 않고 있다.
    - <span style="color: purple">Adaptee</span>는 이미 개발이 완료되어 사용중이다.
    - <span style="color: purple">Adaptee</span>를 변경하는 것이 적절하지 않은 상황이다.

따라서 다음과 같이 어댑터 패턴을 고려할 수 있다. 코드는 내가 작성했다.

```java
// Adaptee 는 이미 개발이 완료됐고, 수정하기 곤란한 상황이다.
class Adaptee {
  Response specificRequest() {
    return new Response();
  }
}

// 클라이언트가 사용하려는 인터페이스.
interface Target {
  Response request();
}

// Adapter는 Adaptee를 감싸고 있으며, Target 인터페이스를 구현한다.
class Adapter implements Target {
  private final Adaptee adaptee;

  public Adapter(Adaptee adaptee) {
    this.adaptee = adaptee;
  }

  @Override
  public Response request() {
    return this.adaptee.specificRequest();
  }
}
```

- <span style="color: red">Adapter</span> 클래스를 만들고, <span style="color: purple">Adaptee</span>를 내부에 갖고 있게 한다.
    - <span style="color: red">Adapter</span>는 <span style="color: blue">Target</span>을 구현한다.
    - <span style="color: red">Adapter</span>의 `request()`는 <span style="color: purple">Adaptee</span>의 `specificRequest()`를 감싸고 있다.

이제 `Adaptee`를 다음과 같이 `Adapter`에 집어넣어서 `Target` 인터페이스로 사용할 수 있다.

```java
Target target = new Adapter(adaptee)
```

## 예제
### From: 헤드 퍼스트 디자인 패턴

다음은 헤드 퍼스트 디자인 패턴의 예제이다.[^head-example]

* 다음은 오리를 표현한 것이다.

```java
interface Duck {
  public void quack();  // 오리는 꽉꽉 소리를 낸다
  public void fly();
}

class MallardDuck implements Duck {
  @Override
  public void quack() {
    System.out.println("Quack");
  }
  @Override
  public void fly() {
    System.out.println("I'm flying");
  }
}
```

* 다음은 칠면조를 표현한 것이다. 두 새의 인터페이스가 다르다는 점에 주목.

```java
interface Turkey {
  public void gobble();   // 칠면조는 골골거리는 소리를 낸다
  public void fly();
}

class WildTurkey implements Turkey {
  @Override
  public void gobble() {
    System.out.println("Gobble gobble");
  }
  @Override
  public void fly() {
    System.out.println("I'm flying a short distance");
  }
}
```

* 그리고 이것이 바로 어댑터이다.

```java
class TurkeyAdapter implements Duck {
  Turkey turkey;

  public TurkeyAdapter(Turkey turkey) {
    this.turkey = turkey;
  }
  @Override
  public void quack() {
    turkey.gobble();
  }
  @Override
  public void fly() {
    // 칠면조는 멀리 날지 못하므로 다섯 번 날아서 오리처럼 긴 거리를 날게 한다
    for (int i = 0; i < 5; i++) {
      turkey.fly();
    }
  }
}
```

이 어댑터를 다이어그램으로 표현하자면 다음과 같다. 어댑터 `TurkeyAdapter`를 통해 `Turkey`를 `Duck`처럼 사용할 수 있게 된 것이다.

![]( ./adapter-duck.svg )

### Java의 Collections.enumeration

>
Java의 첫 버전(JDK 1.0)에는 `Enumeration`이라는 인터페이스가 있어서 `Vector`나 `Hashtable`과 같은 컬렉션을 순회하는 데 사용되었다.
그런데 Java가 점점 더 발전하면서 JDK에 더 나은 컬렉션 클래스들이 추가되었고 `Iterator` 인터페이스가 그 역할을 대신하게 되었다.
그러나 `Enumeration` 인터페이스를 사용해 작성된 코드와도 상호 동작이 가능해야 하므로,
JDK에는 다음과 같이 Java의 익명 내부 클래스 기능을 이용해 `Iterator`를 어댑팅하는 생성 메서드를 제공한다.
[^joshua-359]

다음은 Java 11의 `Collections::enumeration` 이다.
책에서 제공된 코드는 제네릭이 도입되기 이전의 형태를 띄고 있으므로, Java 11의 코드를 인용하였다.

```java
/**
 * Returns an enumeration over the specified collection.  This provides
 * interoperability with legacy APIs that require an enumeration
 * as input.
 *
 * <p>The iterator returned from a call to {@link Enumeration#asIterator()}
 * does not support removal of elements from the specified collection.  This
 * is necessary to avoid unintentionally increasing the capabilities of the
 * returned enumeration.
 *
 * @param  <T> the class of the objects in the collection
 * @param c the collection for which an enumeration is to be returned.
 * @return an enumeration over the specified collection.
 * @see Enumeration
 */
public static <T> Enumeration<T> enumeration(final Collection<T> c) {
    return new Enumeration<T>() {
        private final Iterator<T> i = c.iterator();

        public boolean hasMoreElements() {
            return i.hasNext();
        }

        public T nextElement() {
            return i.next();
        }
    };
}
```

- javadoc을 읽어보면 enumeration 입력이 필요한 경우의 legacy API를 언급하고 있다.
- 메소드 바디를 읽어보면 `Enumeration`의 동작인 `hasMoreElements`와 `nextElement`를 제공하지만 해당 메소드들의 내부는 `Iterator`의 메소드들로 어댑팅 되어 있음을 확인할 수 있다.

## 상속을 사용하는 기법

어댑터 패턴은 합성을 사용하는 기법과 상속을 사용하는 기법이 있다.

이 문서에서 지금까지 설명한 방법은 모두 `Adaptee`를 `Adapter` 내부에 포함시켜 사용하고 있다. 즉 합성을 사용한 방법이었다.

여기에서는 상속을 사용하는 방법을 다룬다. 그러나 대부분의 경우 상속이 바람직하지 않은 해결책일 수 있음을 염두에 두어야 한다.

같은 주제를 두고 두 가지 솔루션을 함께 살펴보자.

다음 예제는 `ObjectInputStream`이 `Iterator` 인터페이스를 지원하도록 만든 `WrappedObjectIterator`라는 어댑터를 보여준다.[^holub-457]


```java
// Adapter. 합성을 사용.
class WrappedObjectIterator implements Iterator {
  private boolean atEndOfFile = false;
  private final ObjectInputStream in;   // Adaptee를 갖고 있다(합성, contain).

  public  WrappedObjectIterator(ObjectInputStream in) {
    this.in = in;
  }

  @Override
  public boolean hasNext() {
    return atEndOfFile == false;
  }

  @Override
  public Object next() {
    // Adaptee의 readObject()를 Iterator.next()로 감싼다.
    try {
      return in.readObject();
    } catch (Exception e) {
      atEndOfFile = true;
      return null;
    }
  }

  @Override
  public void remove() {
    throw new UnsupportedOperationException();
  }
}
```

다음은 상속을 사용하는 방법이다.

```java
// Adapter. 상속을 사용.
class ObjectIterator extends ObjectInputStream implements Iterator {
  private boolean atEndOfFile = false;

  public ObjectIterator(InputStream src) throws IOException {
    super(src);
  }

  @Override
  public boolean hasNext() {
    return atEndOfFile == false;
  }

  @Override
  public Object next() {
    try {
      return readObject();  // super의 readObject()를 호출한다.
    } catch (Exception e) {
      atEndOfFile = true;
      return null;
    }
  }

  @Override
  public void remove() {
    throw new UnsupportedOperationException();
  }
}

```

## 참고문헌

- GoF의 디자인 패턴(개정판) / 에릭 감마, 리처드 헬름, 랄프 존슨, 존 블라시디스 공저 / 김정아 역 / 프로텍미디어 / 발행 2015년 03월 26일
- Head First Design Patterns / 에릭 프리먼 등저 / 서환수 역 / 한빛미디어 / 초판 16쇄 2017년 5월 10일
- 실전 코드로 배우는 실용주의 디자인 패턴 / Allen Holub 저 / 송치형 편역 / 사이텍미디어 / 발행 2006년 07월 19일 / 원제 : Holub on Patterns : Learning Design Patterns by Looking at Code
- 패턴을 활용한 리팩터링 / 조슈아 케리에브스키 저 / 윤성준, 조상민 공역 / 인사이트(insight) / 신판 1쇄 발행 2011년 02월 09일 / 원제 : REFACTORING TO PATTERNS

## 주석

[^gof]: GoF의 디자인 패턴(개정판). 196쪽.
[^head-example]: Head First Design Patterns. 276쪽.
[^head-281]: Head First Design Patterns. 281쪽.
[^holub-456]: 실전 코드로 배우는 실용주의 디자인 패턴. 456쪽.
[^holub-457]: 실전 코드로 배우는 실용주의 디자인 패턴. 457쪽의 예제에 내가 작성한 주석을 추가하였다.
[^joshua-334]: 패턴을 활용한 리팩터링. 8장. 334쪽.
[^joshua-359]: 패턴을 활용한 리팩터링. 8장. 359쪽.
