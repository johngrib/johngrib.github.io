---
layout  : wiki
title   : 비지터 패턴 (Visitor Pattern)
summary : 
date    : 2021-10-11 16:04:22 +0900
updated : 2021-10-11 17:28:02 +0900
tag     : GoF-design-pattern
resource: 6B/3EDA4F-9BBF-4245-9F6A-14D1680CE20A
toc     : true
public  : true
parent  : [[/pattern]]
latex   : false
---
* TOC
{:toc}

## 개요

>
객체 구조를 이루는 원소에 대해 수행할 연산을 표현합니다.
연산을 적용할 원소의 클래스를 변경하지 않고도 새로운 연산을 정의할 수 있게 합니다.
[^gof-426]

<span/>

>
Visitor(알고리즘을 캡슐화하는 객체)가 호스트 객체의 내부 상태에 접근할 수 있는 방법을 제공하여
호스트 객체에 연산을 추가할 수 있도록 한다.
이 패턴은 보통 [[/pattern/composite]]{합성 구조}의 원소들과 상호 작용하는 데 사용된다.
Visitor는 [[/pattern/composite]]{합성 구조} 안의 원소 객체들 사이를 방문하며 옮겨다닌다.
[^holub-492]

<span/>

>
Visitor는 주로 상속 없이 클래스에 메소드를 효과적으로 추가하기 위해 사용한다.
Visitor는 또한 [[/pattern/composite]]{합성 구조}의 모든 원소 객체들로부터 정보를 수집할 수도, 이들에 연산을 수행할 수도 있다.
예를 들어 Visitor가 [[/pattern/composite]]{합성 구조}에 있는 모든 원소들의 일관성을 검사할 수도 있다.
[^holub-492]

<span/>

>
[Design Patterns]의 저자 중 한 명인 Ralph Johnson에 따르면, "Visitor 패턴이 필요한 경우는 거의 없지만, 일단 필요한 경우가 생기면 다른 방법이 없다."
그렇다면 어떤 경우에 Visitor 패턴이 필요할까? 이 질문에 답하기 전에 Visitor 패턴에 대해서 조금 자세하게 설명하겠다.
>
방문자 클래스는 주어진 객체 구조에 대해 어떤 연산을 수행하는데,
이질적인<sup>heterogeneous</sup> 클래스들을 대상으로 한다.
즉, 방문을 받는 클래스들이 각각 서로 다른 종류의 정보를 담고, 그에 대한 인터페이스 또한 서로 다를 경우에 사용한다.
방문자 객체는 이질적인 대상 클래스들로부터 정보를 얻기 위해 이중 디스패치<sup>double-dispatch</sup>를 이용한다.
즉, 대상 클래스가 제공하는 `accept(Visitor visitor)`와 같은 '수납<sup>accept</sup>' 메서드의 파라미터를 통해 방문자 객체 자신을 넘기고,
대상 클래스는 수납한 방문자 객체의 콜백 메서드를 호출하여 정보를 제공하는 것이다.
>
(중략)
>
Visitor 패턴이 꼭 필요한 경우는 언제일까?
일반적으로 말하면, 이질적인 클래스들로 이루어진 어떤 객체 구조를 여러 알고리즘을 통해 처리하고 싶지만 Visitor 패턴만큼 단순하고 간결한 해결책이 없을 때 Visitor 패턴이 꼭 필요하다고 할 수 있다.
[^joshua-424]

## 구조

![]( ./visitor.svg )

## 예제
### From: 실용주의 디자인 패턴

- `Visitor` 인터페이스는 visit 연산을 선언한다.

```java
public interface Visitor {
  void visitFile(File current, int depth);

  void visitDirectory(File current, int depth, File[] contents);
}
```

- `Element`는 `accept`를 통해 `Visitor`의 방문을 받는다.

```java
public interface Element {
  void accept(Visitor v, int depth);
}
```

- `DirectoryElement`는 `ConcreteElementA`의 역할을 한다.
    - `accept`를 통해 `Visitor`의 방문을 받고, 방문한 `Visitor`의 `visitDirectory` 메소드를 호출한다.
    - `visitDirectory` 메소드에 `f.listFiles()`를 넘겨주는 것은 디렉토리의 자식 엘리먼트에도 `Visitor`가 재귀적으로 모두 방문하는 것을 의미한다.

```java
public class DirectoryElement implements Element {
  private File f;

  public DirectoryElement(File f) {
    this.f = f;
  }

  @Override
  public void accept(Visitor v, int depth) {
    v.visitDirectory(f, depth, f.listFiles());
  }
}
```

- `FileElement`는 `ConcreteElementB`의 역할을 한다.
    - `accept`를 통해 `Visitor`의 방문을 받고, 방문한 `Visitor`의 `visitFile` 메소드를 호출한다.

```java
public class FileElement implements Element {
  private File f;

  public FileElement(File f) {
    this.f = f;
  }

  @Override
  public void accept(Visitor v, int depth) {
    v.visitFile(f, depth);
  }
}
```

- `Directory`는 `ObjectStructure` 역할을 한다.
    - `traverse` 메소드에 `Visitor`를 넘기면, `Visitor`는 해당 디렉토리의 모든 자식 디렉토리/파일에 방문할 것이다.
    - 만약 `Visitor`가 자신이 방문한 경로를 화면에 출력하는 기능을 갖는다면 모든 자식 경로가 출력될 것이다.
    - 만약 `Visitor`가 특정 파일을 찾는 기능을 갖는다면, 자신이 방문한 모든 자식 경로에서 특정 파일을 찾으려 할 것이고 찾은 결과를 화면에 출력하거나, `Visitor` 내의 변수에 저장하거나 할 수 있다.

```java
public class Directory {
  private File root;

  public Directory(String root) {
    this.root = new File(root);
  }

  public void traverse(Visitor visitor) {
    topDown(root, visitor, 0);
  }

  private void topDown(File root, Visitor visitor, int depth) {
    Element e = root.isFile()
        ? new FileElement(root)
        : new DirectoryElement(root);
    e.accept(visitor, depth);

    if (!root.isFile()) {
      File[] children = root.listFiles();

      for (File child : children) {
        topDown(child, visitor, depth + 1);
      }
    }
  }
}
```

## 고려할 점들

### 장점과 단점

- 캡슐화 위반에 대해 고려해 볼 점이 있다.

>
- 장점: 생각하지 못했던 연산을 쉽게 추가할 수 있다.
- 장점: 드물게 사용되는 연산을 외부에 정의할 수 있기 때문에 클래스가 작아진다.
- 장점: Visitor는 원소들을 방문하면서 상태를 축적할 수 있다. '모바일 에이전트'는 리모트 객체(예를 들어 데이터베이스 서버)에 방문하여 분산 데이터베이스로부터 합성 결과를 축적할 수 있다.
- 단점: 합성 객체의 내부 구조가 Visitor에 열리게 되고, 이는 캡슐화를 위반하는 것이다. 예를 들어 트리의 원소에 넘겨진 사악한 Visitor가 이들의 '키'값을 바꾼다면 트리는 쓰레기가 되어버린다. 또한 Visitor는 그들이 방문하는 객체와 강결합되어 있다.
[^holub-492]

### 캡슐화 위반에 대한 반론

>
어떤 프로그래머들은 이런저런 이유로 Visitor 패턴에 반대하기도 한다.
Visitor 패턴을 잘 알지도 못하면서 말이다.
예를 들어, 어떤 프로그래머는 방문자 클래스가 캡슐화 원칙에 위배되기 때문에 좋아하지 않는다고 말한 적이 있다.
즉, 방문자 클래스가 대상 클래스의 어떤 메서드를 사용해야 하는데 그 메서드가 public 이 아니라면 그 메서드의 접근 제한을 풀어야 하고, 이것이 캡슐화 특성을 깨뜨린다는 주장이다.
옳은 말이다. 그러나 Visitor 패턴을 구현할 때 대부분의 경우는 그럴 필요가 없다(예제 절 참조).
설사 몇몇 메서드의 접근 제한을 풀어줘야 하는 경우라도,
Visitor 패턴을 사용하지 않고 코드를 꾸려가는 것보다 대상 클래스의 캡슐화 특성을 양보하는 편이 치러야 하는 대가가 훨씬 적다.
[^joshua-428]

### Strategy 패턴과의 비교

> Visitor는 어떤 의미에서 '방문하는 전략(Visiting Strategy)'이다.
하지만 Visitor의 포커스는 자료 구조의 각 노드를 방문하면서 무언가를 한다는 것이다.
[[/pattern/strategy]]{Strategy}는 훨씬 일반적이고 자료 구조와 특별한 연관이 없다.


## 참고문헌

- GoF의 디자인 패턴(개정판) / 에릭 감마, 리처드 헬름, 랄프 존슨, 존 블라시디스 공저 / 김정아 역 / 프로텍미디어 / 발행 2015년 03월 26일
- 실전 코드로 배우는 실용주의 디자인 패턴 / Allen Holub 저 / 송치형 편역 / 사이텍미디어 / 발행 2006년 07월 19일 / 원제 : Holub on Patterns : Learning Design Patterns by Looking at Code
- 패턴을 활용한 리팩터링 / 조슈아 케리에브스키 저 / 윤성준, 조상민 공역 / 인사이트(insight) / 신판 1쇄 발행 2011년 02월 09일 / 원제 : REFACTORING TO PATTERNS

## 주석

[^gof-426]: GoF의 디자인 패턴. 5장. 426쪽.
[^holub-492]: 실전 코드로 배우는 실용주의 디자인 패턴. Appendix. 492쪽.
[^joshua-424]: 패턴을 활용한 리팩터링. 10장. 424쪽.
[^joshua-428]: 패턴을 활용한 리팩터링. 10장. 428쪽.

