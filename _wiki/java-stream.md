---
layout  : wiki
title   : java Stream의 사용
summary : 
date    : 2019-09-24 09:37:07 +0900
updated : 2020-05-05 15:53:44 +0900
tag     : java
toc     : true
public  : true
parent  : [[Java]]
latex   : false
---
* TOC
{:toc}

## stream?

>
Classes to support functional-style operations on streams of elements, such as map-reduce transformations on collections.

## lazy evaluation

> 스트림 파이프라인은 지연 평가(lazy evaluation)된다. 평가는 종단 연산이 호출될 때 이뤄지며, 종단 연산에 쓰이지 않는 데이터 원소는 계산에 쓰이지 않는다. 이러한 지연 평가가 무한 스트림을 다룰 수 있게 해주는 열쇠다. 종단 연산이 없는 스트림 파이프라인은 아무 일도 하지 않는 명령어인 no-op 과 같으니, 종단 연산을 빼먹는 일이 절대 없도록 하자.[^effective-45]

## 병렬화

### 합리적인 이유와 측정 없이 병렬화하지 말 것

> 스트림 안의 원소 수와 원소당 수행되는 코드 줄 수를 곱해보자. 이 값이 최소 수십만은 되어야 성능 향상을 맛볼 수 있다.[^effective-48][^stream-parallel-guidance]

스트림 파이프라인을 충분한 이유와 측정 없이 그냥 병렬화하면 안 된다. 성능이 나빠질 수 있다.

이상한 결과가 나올 수도 있다.

* 데이터 소스가 `Stream.iterate`이거나 중간 연산으로 `limit`를 쓰면 파이프라인 병렬화로는 성능을 개선할 수 없다.[^effective-48]

### 병렬화의 효과가 좋은 스트림 소스

> As a rule, performance gains from parallelism are best on streams over ArrayList, HashMap, HashSet, and ConcurrentHashMap instances; arrays; int ranges; and long ranges.[^effective-48]

병렬화의 효과가 가장 좋은 스트림의 소스는 다음과 같다.
* `ArrayList` 인스턴스
* `HashMap` 인스턴스
* `HashSet` 인스턴스
* `ConcurrentHashMap` 인스턴스
* 배열
* `int`
* `long`

### 병렬화에 가장 적합한 종단 메소드

* `Stream`의 `reduce` 메소드
* `min`, `max`, `count`, `sum` 같은 메소드
* `anyMatch`, `allMatch`, `noneMatch`처럼 조건이 맞으면 결과를 리턴하는 메소드.

### 병렬화에 적합하지 않은 메소드

* `Stream`의 `collect`. 컬렉션을 합치는 작업의 부담이 크다.


## Stream은 왜 for-each 로 돌릴 수 없는가?

> 사실 `Stream` 인터페이스는 `Iterable` 인터페이스가 정의한 추상 메서드를 전부 포함할 뿐만 아니라, `Iterable` 인터페이스가 정의한 방식대로 동작한다. 그럼에도 for-each 로 스트림을 반복할 수 없는 까닭은 바로 `Stream`이 `Iterable`을 확장(extend)하지 않아서다.[^effective-47]

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

## Examples

* 단어의 빈도를 조사해, `Map<String, Long>`에 기록한다.[^effective-46-code]

```java
Map<String, Long> freq;
try (Stream<String> words = new Scanner(file).tokens()) {
    freq = words.collect(
            Collectors.groupingBy(String::toLowerCase, Collectors.counting())
    );
} catch (FileNotFoundException e) {
```

* `Map<String, Long>` 에서 빈도 높은 단어 top 10 을 골라낸다.[^effective-46-code]

```java
List<String> topTen = freq.keySet()
    .stream()
    .sorted(Comparator.comparing(freq::get).reversed())
    .limit(10)
    .collect(Collectors.toList());
```

* 빨간색 위젯의 총 무게를 구한다.

```java
int sum = widgets.stream()
  .filter(w -> w.getColor() == RED)
  .mapToInt(w -> w.getWeight())
  .sum();
```

### collect의 사용

* 다음 예제는 [Class Collectors][java-13-collectors]문서를 참고한 것이다.

```java
// List<People>에서 사람들의 이름만 뽑아 리스트로 수집한다
List<String> list = people.stream()
    .map(Person::getName)
    .collect(Collectors.toList());

// List<People>에서 이름만 뽑아 TreeSet 으로 수집한다
Set<String> set = people.stream()
    .map(Person::getName)
    .collect(Collectors.toCollection(TreeSet::new));

// 리스트의 원소들을 콤마로 구분된 하나의 String으로 수집한다.
String joined = things.stream()
    .map(Object::toString)
    .collect(Collectors.joining(", "));

// 모든 직원 급여의 총합을 구한다
int total = employees.stream()
    .collect(Collectors.summingInt(Employee::getSalary));

// 부서별 직원 목록을 만든다
Map<Department, List<Employee>> byDept = employees.stream()
    .collect(Collectors.groupingBy(Employee::getDepartment));

// 부서별 급여 합계를 구한다
Map<Department, Integer> totalByDept = employees.stream()
    .collect(
        Collectors.groupingBy(
            Employee::getDepartment,
            Collectors.summingInt(Employee::getSalary)
        )
    );

// PASS한 학생과 FAIL한 학생 리스트를 따로 수집한다
Map<Boolean, List<Student>> passingFailing = students.stream()
    .collect(Collectors.partitioningBy(s -> s.getGrade() >= PASS_THRESHOLD));
```

## 참고문헌

* 이펙티브 자바 Effective Java 3/E / 조슈아 블로크 저/개앞맵시(이복연) 역 / 인사이트(insight) / 초판 2쇄 2018년 11월 21일

## 주석

[^effective-45]: 이펙티브 자바 3/E. 아이템 45.
[^effective-46-code]: 이펙티브 자바 3/E 아이템 46 의 예제를 약간 변형한 코드이다.
[^effective-47]: 이펙티브 자바 3/E. 아이템 47.
[^effective-48]: 이펙티브 자바 3/E. 아이템 48.
[^stream-parallel-guidance]: [When to use parallel streams][stream-parallel-guidance]

[stream-parallel-guidance]: http://gee.cs.oswego.edu/dl/html/StreamParallelGuidance.html
[java-13-collectors]: https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/util/stream/Collectors.html
