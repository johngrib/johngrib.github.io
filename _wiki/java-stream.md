---
layout  : wiki
title   : java.util.stream의 사용
summary : 
date    : 2019-09-24 09:37:07 +0900
updated : 2020-01-14 21:23:10 +0900
tag     : java
toc     : true
public  : false
parent  : Java
latex   : false
---
* TOC
{:toc}

## stream?

>
Classes to support functional-style operations on streams of elements, such as map-reduce transformations on collections.

## lazy evaluation

> 스트림 파이프라인은 지연 평가(lazy evaluation)된다. 평가는 종단 연산이 호출될 때 이뤄지며, 종단 연산에 쓰이지 않는 데이터 원소는 계산에 쓰이지 않는다. 이러한 지연 평가가 무한 스트림을 다룰 수 있게 해주는 열쇠다. 종단 연산이 없는 스트림 파이프라인은 아무 일도 하지 않는 명령어인 no-op 과 같으니, 종단 연산을 빼먹는 일이 절대 없도록 하자.[^effective-45]
[^effective-45]

## Examples

```java
int sum = widgets.stream()
  .filter(w -> w.getColor() == RED)
  .mapToInt(w -> w.getWeight())
  .sum();
```

## 주의할 점

### 무조건 스트림으로 바꾸면 가독성을 해칠 수 있다

이펙티브 자바 3에서는 다음과 같이 조언한다.

> 스트림을 처음 쓰기 시작하면 모든 반복문을 스트림으로 바꾸고 싶은 유혹이 일겠지만, 서두르지 않는 게 좋다. 스트림으로 바꾸는 게 가능할지라도 코드 가독성과 유지보수 측면에서는 손해를 볼 수 있기 때문이다. 중간 정도 복잡한 작업에도 스트림과 반복문을 적절히 조합하는 게 최선이다. 그러니 **기존 코드는 스트림을 사용하도록 리팩터링하되, 새 코드가 더 나아 보일 때만 반영하자.**[^effective-45]

### stream의 사용이 적절한 경우

>
* 원소들의 시퀀스를 일관되게 변환한다.
* 원소들의 시퀀스를 필터링한다.
* 원소들의 시퀀스를 하나의 연산을 사용해 결합한다(더하기, 연결하기, 최솟값 구하기 등).
* 원소들의 시퀀스를 컬렉션에 모은다(아마도 공통된 속성을 기준으로 묶어 가며).
* 원소들의 시퀀스에서 특정 조건을 만족하는 원소를 찾는다.[^effective-45]

## 참고문헌

* 이펙티브 자바 Effective Java 3/E / 조슈아 블로크 저/개앞맵시(이복연) 역 / 인사이트(insight) / 초판 2쇄 2018년 11월 21일

## 주석

[^effective-45]: 이펙티브 자바 3/E. 아이템 45.

