---
layout  : wiki
title   : Java의 내부 클래스는 static으로 선언하자
summary : 메모리를 더 먹고, 느리고, 바깥 클래스가 GC 대상에서 빠질 수 있다
date    : 2021-02-11 19:01:50 +0900
updated : 2021-02-14 13:18:58 +0900
tag     : java memory-leak
toc     : true
public  : true
parent  : [[Java]]
latex   : false
---
* TOC
{:toc}

## 중첩 클래스

다음과 같이 다른 클래스 안에 정의된 클래스를 중첩 클래스(nested class)라고 부른다.[^JOS-24]

```java
public class TestClass {

  class NestedClass {
  }
}
```

## 경고: Inner class may be 'static'

위의 예제처럼 `NestedClass` 와 같은 중첩 클래스를 선언하면 인스펙터가 다음과 같이 경고를 해준다. 경고 주제는 Memory.

![image]( /post-img/java-inner-class-may-be-static/107623207-557ebf80-6c9c-11eb-91c4-9b53d14a8880.png )

이 경고는 다음과 같이 `NestedClass`를 `static`으로 선언해주면 조건을 만족하여 다시 나타나지 않는다.

```java
public class TestClass {

  /* ↓ */
  static class NestedClass {
  }
}
```

이제 경고 내용을 읽어보자.

>
Reports any inner classes which may safely be made static. An inner class may be static if it doesn't reference its enclosing instance.
>
A static inner class does not keep an implicit reference to its enclosing instance. This prevents a common cause of memory leaks and uses less memory per instance of the class.

이를 대충 번역해 보자면 다음과 같다.

>
위험 없이 static 으로 만들수 있는 내부 클래스를 발견했습니다. 내부 클래스가 자신의 바깥 클래스 인스턴스를 참조하지 않는다면, 내부 클래스는 static으로 선언해도 됩니다.
>
static 내부 클래스는 자신의 바깥 클래스 인스턴스의 임시적 참조를 유지하지 않습니다. 즉 static 내부 클래스로 선언하면 메모리 누수의 일반적인 원인을 예방할 수 있고, 클래스의 각 인스턴스당 더 적은 메모리를 사용하게 됩니다.

## 인용: 이펙티브 자바

이 문제는 IDE에서 경고해주기 때문에 흔하게 볼 수 있으며, 조슈아 블로흐가 이펙티브 자바에서도 강조하고 있는 내용이기도 하다.

>
정적 멤버 클래스와 비정적 멤버 클래스의 구문상 차이는 단지 static이 붙어있고 없고 뿐이지만, 의미상 차이는 의외로 꽤 크다.
비정적 멤버 클래스의 인스턴스는 바깥 클래스의 인스턴스와 암묵적으로 연결된다.
그래서 비정적 멤버 클래스의 인스턴스 메서드에서 정규화된 this를 사용해 바깥 인스턴스의 메서드를 호출하거나 바깥 인스턴스의 참조를 가져올 수 있다.
정규화된 this란 `클래스명.this` 형태로 바깥 클래스의 이름을 명시하는 용법을 말한다.[JLS, 15.8.4]
따라서 개념상 중첩 클래스의 인스턴스가 바깥 인스턴스와 독립적으로 존재할 수 있다면 정적 멤버 클래스로 만들어야 한다.
비정적 멤버 클래스는 바깥 인스턴스 없이는 생성할 수 없기 때문이다.
>
비정적 멤버 클래스의 인스턴스와 바깥 인스턴스 사이의 관계는 멤버 클래스가 인스턴스화될 때 확립되며, 더 이상 변경할 수 없다.
이 관계는 바깥 클래스의 인스턴스 메서드에서 비정적 멤버 클래스의 생성자를 호출할 때 자동으로 만들어지는 게 보통이지만,
드물게는 직접 `바깥 인스턴스의 클래스.new MemberClass(args)`를 호출해 수동으로 만들기도 한다.
예상할 수 있듯, 이 관계 정보는 비정적 멤버 클래스의 인스턴스 안에 만들어져 메모리 공간을 차지하며, 생성 시간도 더 걸린다.

- 요약
    - `static`이 아닌 멤버 클래스의 인스턴스는 바깥 클래스의 인스턴스와 암묵적으로 연결된다.
    - 왜냐하면 `static`이 아닌 멤버 클래스는 바깥 인스턴스 없이는 생성할 수 없기 때문이다.
    - 두 클래스의 관계는 멤버 클래스의 인스턴스 안에 만들어지며, 메모리를 차지한다. 생성도 느리다.

>
**멤버 클래스에서 바깥 인스턴스에 접근할 일이 없다면 무조건 static을 붙여서 정적 멤버 클래스로 만들자.**
static을 생략하면 바깥 인스턴스로의 숨은 외부 참조를 갖게 된다.
앞서도 얘기했듯 이 참조를 저장하려면 시간과 공간이 소비된다.
더 심각한 문제는 가비지 컬렉션이 바깥 클래스의 인스턴스를 수거하지 못하는 메모리 누수가 생길 수 있다는 점이다(아이템 7).
참조가 눈에 보이지 않으니 문제의 원인을 찾기 어려워 때때로 심각한 상황을 초래하기도 한다.

- 바깥 클래스 인스턴스의 참조를 멤버 클래스가 갖고 있으므로, 바깥 클래스 인스턴스가 쓰레기 수거 대상에서 빠지게 된다.


## 참고문헌

- [JOS] 이펙티브 자바 (3판) / 조슈아 블로크 저/개앞맵시 역 / 인사이트(insight) / 초판 2쇄 2018년 11월 21일

## 주석

[^JOS-24]: [JOS] 아이템 24. 멤버 클래스는 되도록 static으로 만들라

