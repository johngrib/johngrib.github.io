---
layout  : wiki
title   : UML
summary : Unified Modeling Language
date    : 2020-07-02 23:23:45 +0900
updated : 2020-07-04 22:38:25 +0900
tag     : oop
toc     : true
public  : true
parent  : [[index]]
latex   : false
---
* TOC
{:toc}

> 대부분의 경우, UML을 너무 적게 사용하는 편이 너무 많이 사용하는 것보다 낫다.[^bob-c3]

## Examples

다음은 "UML, 실전에서는 이것만 쓴다!"에 나오는 코드와 UML을 참고하여 일부 수정한 것이다.[^bob-c1]

```java
public class TreeMap implements Map {
  public void add(Comparable key, Object value) { /* ... */  }
  public Object get(Comparable key) { /* ... */ }
  private void walk() { /* ... */ }

  private TreeMapNode topNode;
}

static class TreeMapNode {
  private TreeMapNode[] nodes  = new TreeMapNode[2];
  private Comparable itsKey;
  private Object itsValue;

  public void add(Comparable key, Object value) { /* ... */  }
  public Object find(Comparable key) { /* ... */  }
}
```

![]( /post-img/uml/uml-01.svg )

- `+`: `public`
- `-`: `private`
- `#`: `protected`
- `~`: `default`
- `:`
    - 변수 이름 뒤에 `:`을 찍고 타입을 적는다.
    - 메소드(함수) 이름 뒤에 `:`을 찍고 리턴 타입을 적는다.
- `화살표`: 연관 관계.
    - `숫자`: 화살표에 붙어 있는 숫자는 참조를 몇 개 갖는지를 표시한다.
        - `*`: 여러 개. 갯수에 제한이 없는 경우엔 숫자 대신 `*`을 쓴다.

### 엉클 밥의 화살표 팁

> 화살촉을 조심해서 그리지 않으면 그 화살촉이 상속을 표현하는지 연관을 표현하는지 구분하기 힘들 수도 있다.
이 둘을 더 명확하게 구분하려고 나는 종종 상속 관계는 세로로, 연관 관계는 가로로 그린다.
UML에서 화살촉의 방향은 모두 소스 코드 의존성의 방향이다.[^bob-c3]

## UML에 대한 조언 모음

다이어그램을 그려야 할 경우

> 누군가에게, 또는 여러분 자신에게 코드 일부분의 구조를 설명할 때 다이어그램을 그려라. 이제는 코드를 직접 보는 편이 설명이 더 잘 이해된다고 느끼는 시점에서 다이어그램을 그리는 작업을 멈춘다.
[^bob-c2]

다이어그램을 그리지 말아야 할 경우

> - 다이어그램을 안 그리면 죄책감을 느끼거나, 훌륭한 설계자는 누구나 다이어그램을 그린다는 생각이 든다고 다이어그램을 그리지 마라.
훌륭한 설계자는 코드를 작성하며 다이어그램을 꼭 필요할 때만 그린다.
> - 코딩을 시작하기에 앞서 설계 단계의 포괄적인 문서를 만들기 위해서 다이어그램을 그리지 마라. 이런 문서는 거의 언제나 하등 쓸모가 없으며 시간만 엄청나게 잡아먹는다.
[^bob-c2]

## guillemet에 대하여

```
«interface»
```

- 인터페이스 표시 양쪽에 있는 `«`과 `»` 기호를 길러멧(guillemet)이라 부른다고 한다.
    - 프랑스어, 러시아어에서 인용 부호로 사용한다고 한다.
- 이게 키보드에 있는 `<`, `>`를 두 개 이어 붙여서 만드는 `<<`, `>>`와 다른 기호라고 한다.
    - 하지만 굳이 이걸 알 필요도 없고 `<<`, `>>`를 쓰는 게 더 편리하니 무시하자.


## 참고문헌

-  UML, 실전에서는 이것만 쓴다 / 로버트 C. 마틴 (지은이), 이용원, 정지호 (옮긴이) / 인사이트 / 초판 2쇄 2004년 10월 5일 / 원제: UML for Java Programmers

## 주석

[^bob-c1]: UML, 실전에서는 이것만 쓴다. 1장.
[^bob-c2]: UML, 실전에서는 이것만 쓴다. 2장.
[^bob-c3]: UML, 실전에서는 이것만 쓴다. 3장.

