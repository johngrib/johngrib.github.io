---
layout  : wiki
title   : 컴포짓 패턴 (Composite Pattern)
summary : 개별 객체와 복합 객체를 모두 동일하게 다룰 수 있도록 한다.
date    : 2021-10-05 17:08:26 +0900
updated : 2021-10-10 00:23:20 +0900
tag     : 
toc     : true
public  : true
parent  : [[/pattern]]
latex   : false
---
* TOC
{:toc}

- 다음과 같이 불린다.
    - Composite Pattern, 컴포짓 패턴, 복합체 패턴

## 의도

>
부분과 전체의 계층을 표현하기 위해 객체들을 모아 트리 구조로 구성합니다.
사용자로 하여금 개별 객체와 복합 객체를 모두 동일하게 다룰 수 있도록 하는 패턴입니다.
[^gof-226]


## 요약

![컴포짓 패턴의 구조를 표현한 다이어그램]( ./composite.svg )

- `Component`: 집합 관계에 포함시킬 수 있는 객체의 인터페이스.
- `Leaf`
    - 트리 구조의 말단.
    - 자식이 없는 객체의 행동을 정의한다.
    - `Component` 인터페이스를 구현한다.
- `Composite`
    - 자식이 있는 객체의 행동을 정의한다.
    - 자식 `Component`를 갖는다.
    - `Component` 인터페이스를 구현한다.
- `Client`
    - `Component` 인터페이스를 사용해 복합체 구조 내의 객체들을 조작한다.



## 예제: Java 언어로 배우는 디자인 패턴 입문

이 책에서는 파일, 디렉토리 구조를 컴포짓 패턴으로 작성한 예를 보여준다. 아래의 예제들은 내가 일부를 수정한 것이다.

- `Entry`는 `Component`에 해당한다. 단, 인터페이스가 아니라 추상 클래스로 작성되었다.

```java
// Component
public abstract class Entry {
  public abstract String getName();

  public abstract int getSize();

  public Entry add(Entry entry) throws FileTreatmentException {
    throw new FileTreatmentException();
  }

  public void printList() {
    printList("");
  }

  protected abstract void printList(String prefix);

  public String toString() {
    return getName() + " (" + getSize() + ")";
  }
}
```

- `Directory`는 `Composite`에 해당한다.
    - `Directory`는 여러 자식을 갖고 있을 수 있다.

```java
public class Directory extends Entry {
  private String name;
  // 디렉토리는 자식 디렉토리, 자식 파일들을 가질 수 있다.
  private ArrayList<Entry> children = new ArrayList<>();

  public Directory(String name) {
    this.name = name;
  }

  @Override
  public String getName() {
    return name;
  }

  @Override
  public int getSize() {
    int size = 0;
    for (Entry entry : children) {
      size += entry.getSize();
    }
    return size;
  }

  @Override
  public Entry add(Entry entry) {
    children.add(entry);
    return this;
  }

  @Override
  protected void printList(String prefix) {
    System.out.println(prefix + "/" + this);
    for (final Entry entry : children) {
      entry.printList(prefix + "/" + name);
    }
  }
}
```

- `File`은 `Leaf`에 해당한다.
    - `File`은 자식을 갖지 않는다.

```java
public class File extends Entry {
  private String name;
  private int size;

  public File(final String name, final int size) {
    this.name = name;
    this.size = size;
  }

  @Override
  public String getName() {
    return name;
  }

  @Override
  public int getSize() {
    return size;
  }

  @Override
  protected void printList(final String prefix) {
    System.out.println(prefix + "/" + this);
  }
}
```

## 고려할 점

>
Composite 패턴으로 리팩터링하는 주된 목적은 무엇일까? 코드를 더 단순하게 만드는 것이다.
>
예를 들어, 컴포짓을 이용해 XML을 생성하면 태그나 속성을 추가하기 위한 코드를 반복할 필요가 없기 때문에(이 작업을 컴포짓 태그가 알아서 할 것이다)
코드가 단순해지고 코드량도 줄어든다.[^joshua-251]

- 만약 코드를 더 단순하게 만들지 못한다면 컴포짓 패턴의 도입은 적절하지 않을 수 있다.

## 참고문헌

- GoF의 디자인 패턴(개정판) / 에릭 감마, 리처드 헬름, 랄프 존슨, 존 블라시디스 공저 / 김정아 역 / 프로텍미디어 / 발행 2015년 03월 26일
- Java 언어로 배우는 디자인 패턴 입문 [개정판] / Yuki Hiroshi 저 / 이규흥 역 / 영진닷컴 / 1판 9쇄 2017년 3월 5일
- 패턴을 활용한 리팩터링 / 조슈아 케리에브스키 저 / 윤성준, 조상민 공역 / 인사이트(insight) / 신판 1쇄 발행 2011년 02월 09일 / 원제 : REFACTORING TO PATTERNS

## 주석

[^gof-226]: GoF의 디자인 패턴(개정판). 챕터 4. 226쪽.
[^joshua-251]: 패턴을 활용한 리팩터링. 7장. 251쪽.
