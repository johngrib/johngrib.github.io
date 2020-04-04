---
layout  : wiki
title   : 방어적 복사 (defensive copy)
summary : 검사시점/사용시점 취약점을 방어하자
date    : 2020-01-12 22:39:36 +0900
updated : 2020-01-15 22:19:50 +0900
tag     : java pattern
toc     : true
public  : true
parent  : [[index]]
latex   : false
---
* TOC
{:toc}

## 예: 취약점이 있는 클래스

다음은 이펙티브 자바 3/E[^effective-50] 에 나오는 예제를 약간 수정한 것이다.

```java
public final class Period {
    private final Date start;
    private final Date end;

    public Period(Date start, Date end) {
        if (start.compareTo(end) > 0) {
            throw new IllegalArgumentException("start가 end보다 늦으면 안된다");
        }
        this.start = start;
        this.end = end;
    }

    public Date getStart() { return start; }
    public Date getEnd() { return end; }
}
```

* 위의 코드는 TOCTOU(Time Of Check / Time Of Use) 취약점이 있다. 즉 검사시점/사용시점 공격이 가능하다.

## 첫 번째 취약점

위의 클래스는 다음과 같은 취약점이 있다.

```java
Date start = new Date();
Date end = new Date();
Period p = new Period(start, end);

end.setYear(78);    // 취약점: p의 내부를 수정할 수 있다.
```

이 코드에 대해서 알아둘 몇 가지 사실이 있다.

* Date는 Deprecated API 이므로 이제는 사용하지 않아야 한다.
* 위의 코드에서 `Date` 대신 immutable 인 `LocalDate`나 `LocalDateTime`을 쓴다면 문제는 해결된다.

## 방어 기법: defensive copy

`LocalDate`를 사용하면 해결되는 문제지만, 꼭 `Date`만의 문제는 아니므로 방어할 방법을 알아둘 필요가 있다.

이펙티브 자바에서는 이 문제에 대해 defensive copy 기법을 소개한다. 생성자 인자로 받은 객체를 복사하는 방법이다.

```java
public Period(Date start, Date end) {
    this.start = new Date(start.getTime()); // defensive copy
    this.end = new Date(end.getTime());     // defensive copy
    if (this.start.compareTo(this.end) > 0) {
        throw new IllegalArgumentException("start가 end보다 늦으면 안된다");
    }
}
```

이펙티브 자바에서는 이 문제에 대해 다음과 같이 언급한다.

> **매개변수의 유효성을 검사하기 전에 방어적 복사본을 만들고, 이 복사본으로 유효성을 검사한 점에 주목하자.**
순서가 부자연스러워 보이겠지만 반드시 이렇게 작성해야 한다. 멀티스레딩 환경이라면 원본 객체의 유효성을 검사한 후 복사본을 만드는 그 찰나의 취약한 순간에 다른 스레드가 원본 객체를 수정할 위험이 있기 때문이다. 방어적 복사를 매개변수 유효성 검사 전에 수행하면 이런 위험에서 해방될 수 있다. 컴퓨터 보안 커뮤니티에서는 이를 검사시점/사용시점(time of check/time of use) 공격 혹은 영어 표기를 줄여서 TOCTOU 공격이라 한다.
<br/><br/>
방어적 복사에 Date의 clone 메서드를 사용하지 않은 점에도 주목하자. Date는 final이 아니므로 clone이 Date가 정의한 게 아닐 수 있다. 즉, clone이 악의를 가진 하위 클래스의 인스턴스를 반환할 수도 있다. (중략) 이런 공격을 막기 위해서는 매개변수가 제3자에 의해 확장될 수 있는 타입이라면 방어적 복사본을 만들 때 clone을 사용해서는 안 된다.


## 두 번째 취약점

그런데 생성자에 defensive copy를 적용했지만 아직 취약점이 또 있다.

```java
Date start = new Date();
Date end = new Date();
Period p = new Period(start, end);

p.getEnd().setTime(78); // 취약점: p의 내부를 변경할 수 있다.
```

## getter도 방어한다

위의 취약점을 방어하려면 getter 메소드에도 다음과 같이 defensive copy 기법을 적용해 주면 된다.

```java
public Date getStart() {
    return new Date(start.getTime());
}

public Date getEnd() {
    return new Date(end.getTime());
}
```

이제 모든 필드가 완벽하게 캡슐화되었다.

## 방어 기법: 불변 객체의 사용

defensive copy의 대안으로 함께 고려해볼만한 방법이다.

불변 객체를 만드는 가장 쉬운 방법은 `Collections`의 `unmodifiable...` 시리즈를 사용하는 것이다.

```java
private static final Integer[] PRIVATE_VALUES = new Integer[]{ 1,2,3 };
public static final List<Integer> VALUES =
    Collections.unmodifiableList(Arrays.asList(PRIVATE_VALUES));
```

## 참고문헌

* 이펙티브 자바 Effective Java 3/E / 조슈아 블로크 저/개앞맵시 역 / 인사이트(insight) / 초판 2쇄 2018년 11월 21일

## 주석

[^effective-50]: 이펙티브 자바 3/E. 아이템 50.
