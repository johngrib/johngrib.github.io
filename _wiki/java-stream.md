---
layout  : wiki
title   : java Stream의 사용
summary : 
date    : 2019-09-24 09:37:07 +0900
updated : 2020-05-17 21:23:03 +0900
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

### 스트림 병렬화에 대한 조언

다음은 모던 자바 인 액션을 참고해 정리한 것이다.[^raoul-253]

>
- 확신이 서지 않으면 직접 측정하라. 병렬 스트림이 순차 스트림보다 빠르지 않은 경우도 많다.
- 박싱을 주의하라. 박싱은 성능을 크게 저하시킨다. 가급적 기본형 특화 스트림인 `IntStream`, `LongStream`, `DoubleStream` 등을 고려하라.
- 병렬 스트림에서 성능이 떨어지는 연산이 있다.
    - `limit`, `findFirst` 처럼 요소의 순서에 의존하는 연산은 비싸다.
    - `findAny`는 요소의 순서와 관계없이 연산하므로 `findFirst`보다 성능이 좋다.
    - 순서가 상관없다면 비정렬된 스트림(`unordered`를 호출해보자)에 `limit`를 호출해볼 것.
- 스트림에서 수행하는 전체 파이프라인 연산 비용을 고려하여, 병렬 스트림으로 성능을 개선할 수 있는지 생각해볼 것.
- 소량의 데이터를 다룰 때에는 병렬 스트림이 도움되지 않는다.
- 스트림을 구성하는 자료구조가 쉽게 분할할 수 있는가?
    - `ArrayList`가 `LinkedList`보다 효율적으로 분할할 수 있다.
    - Range 팩토리 메서드로 만든 기본형 스트림도 쉽게 분해할 수 있다.
- 필터 연산이 있으면 스트림의 길이를 예측할 수 없으므로 효과적으로 병렬처리할 수 있을지 알 수 없다.
- 최종 연산의 병합 과정 비용이 비싸다면 병렬 스트림에서 얻은 성능상의 이익이 상쇄될 수 있다.

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

### flatMap의 사용

```java
List<String> words = List.of("Cat", "Dog");

List<String> uniq = words.stream()
    .map(word -> word.split(""))
    .flatMap(Arrays::stream)
    .distinct()
    .collect(Collectors.toList());

// 결과는 ["C", "a", "t", "D", "o", "g"]
```

### boxed() 를 사용해 언박싱 스트림을 박싱 스트림으로 만들기

```java
IntStream intStream = Stream.of(new Person("Tom", 10), new Person("John", 8))
    .mapToInt(Person::getAge);
Stream<Integer> boxedStream = intStream.boxed();
```

### Stream.iterate 의 사용

- 수열 출력

```java
Stream.iterate(0, n -> n + 1)
    .limit(10)
    .forEach(n -> System.out.printf("%d ", n));

// 0 1 2 3 4 5 6 7 8 9
```

- Stream.iterate 를 활용한 피보나치 수열

```java
Stream.iterate(new int[]{0, 1}, n -> new int[]{ n[1], n[0] + n[1]})
    .limit(20)
    .forEach(n -> System.out.printf("%d ", n[1]));

// 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597 2584 4181 6765
```

### filer, takeWhile, dropWhile 사용

- `filter`는 `Stream`의 모든 항목을 루프하며 조건에 맞는 아이템을 수집한다.

```java
List<Integer> numbers = Stream.of(11, 16, 30, -8, 7, 4, 100)
    .filter(n -> n > 10)
    .collect(Collectors.toList());

// 11, 16, 30, 100
```

- `takeWhile`은 순서대로 아이템을 수집하다가 `Predicate`가 처음으로 `false`가 나오면 멈춘다(short circuit).

```java
List<Integer> numbers = Stream.of(11, 16, 30, -8, 7, 4, 100)
    .takeWhile(n -> n > 10)
    .collect(Collectors.toList());

// 11, 16, 30
```

- `dropWhile`은 `Predicate`가 처음으로 `false`를 리턴한 이후로 모두 수집한다. 그 이전은 모두 버린다.

```java
List<Integer> numbers = Stream.of(11, 16, 30, -8, 7, 4, 100, -10)
    .dropWhile(n -> n > 10)
    .collect(Collectors.toList());

// -8, 7, 4, 100, -10
// (11, 16, 30 은 n > 10 에 해당되어 모두 버려졌다)
```

### 합, 최소값, 최대값을 구하는 다양한 방법들

```java
Optional<Integer> sum = Stream.of(11, 16, 30, -8, 7, 4, 100, -10)
    .reduce(Integer::sum);
// 150
```

```java
Optional<Integer> min = Stream.of(11, 16, 30, -8, 7, 4, 100, -10)
    .reduce(Integer::min);
// -10
```

```java
OptionalInt mas = IntStream.of(11, 16, 30, -8, 7, 4, 100, -10)
    .max();
// 100
```

### range의 사용

```java
IntStream.range(1, 3).forEach(System.out::println);
// 1
// 2
```

```java
IntStream.rangeClosed(1, 3).forEach(System.out::println);
// 1
// 2
// 3
```

```java
IntStream.rangeClosed(1, 4).sum();  // 10
```

### Collectors의 사용

Collectors는 크게 두 가지 용도로 사용한다.

- 스트림을 하나의 결과로 요약한다.
- 스트림 아이템을 여러 그룹으로 분할한다.

다음과 같은 `Stream`이 있다고 하자.

```java
@Getter
class Person {
  int age; String name; Hobby hobby;

  public Person(String name, int age, Hobby hobby) {
    this.age = age;
    this.name = name;
    this.hobby = hobby;
  }
}

enum Hobby { Swimming, Reading, Writing }

Stream<Person> people = Stream.of(
  new Person("John", 45, Hobby.Swimming),
  new Person("Jane", 56, Hobby.Reading),
  new Person("Tom", 32, Hobby.Reading));
```

#### 문자열 join

```java
people.map(Person::getName)
  .collect(Collectors.joining());
// JohnJaneTom

people.map(Person::getName)
  .collect(Collectors.joining(", "));
// John, Jane, Tom
```

#### 최대값 찾기

다음과 같이 `age`값이 최대인 사람을 찾을 수 있다.

```java
Optional<Person> oldestPerson = people.collect(
  Collectors.maxBy(Comparator.comparingInt(Person::getAge)));
```

`Collectors`를 사용하지 않는다면 다음과 같이 하면 된다.

```java
Optional<Person> oldestPerson = people.max(
  Comparator.comparingInt(Person::getAge));
```

#### 최소값 찾기

```java
Optional<Person> oldestPerson = people.collect(
  Collectors.minBy(Comparator.comparingInt(Person::getAge)));
```

```java
Optional<Person> oldestPerson = people.min(
  Comparator.comparingInt(Person::getAge));
```

#### 합계 구하기

```java
int total = people.collect(Collectors.summingInt(Person::getAge));
```

```java
int total = people.mapToInt(Person::getAge).sum();
```

#### 평균 구하기

```java
double average = people.collect(
  Collectors.averagingDouble(Person::getAge));
```

#### SummaryStatistics 으로 다양한 통계 보고서 보기

- `IntSummaryStatistics`
- `LongSummaryStatistics`
- `DoubleSummaryStatistics`

```java
IntSummaryStatistics statistics = people.collect(
        Collectors.summarizingInt(Person::getAge));

statistics.getAverage();  // 44.333333333333336
statistics.getCount();    // 3
statistics.getMax();      // 56
statistics.getMin();      // 32
statistics.getSum();      // 133
```

#### 그룹화

##### groupingBy

`groupingBy`의 시그니처는 다음과 같다.

```java
public static <T, K> Collector<T, ?, Map<K, List<T>>>
groupingBy(Function<? super T, ? extends K> classifier)
```

다음과 같이 사용할 수 있다.

```java
Map<Hobby, List<Person>> splitByHobby = people.collect(
  Collectors.groupingBy(Person::getHobby));

// Swimming: [John]
// Reading: [Jane, Tom]
```

```java
Map<Boolean, List<Person>> splitByAge50 = people.collect(
  Collectors.groupingBy(p -> p.getAge() > 50));

// true: [Jane]
// false: [John, Tom]
```

##### partitioningBy

`partitioningBy`의 시그니처는 다음과 같다.

```java
public static <T> Collector<T, ?, Map<Boolean, List<T>>>
partitioningBy(Predicate<? super T> predicate)
```

`groupingBy`는 `Function`을 인자로 받았지만, `partitioningBy`는 `Predicate`를 받는다는 차이점이 있다.

`partitioningBy`가 리턴하는 `Map`의 key는 언제나 `Boolean`이다.

다음과 같이 사용할 수 있다.

```java
Map<Boolean, List<Person>> splitByHobby = people.collect(
  Collectors.partitioningBy(
    p -> p.getHobby() == Hobby.Swimming));
```

### peek을 디버깅 목적으로 사용하기

`java.util.stream.Stream` 인터페이스의 `peek` 메소드 주석을 읽어보면 디버깅 목적으로 활용할 수 있음을 알 수있다.

```java
    /**
...
     * @apiNote This method exists mainly to support debugging, where you want
     * to see the elements as they flow past a certain point in a pipeline:
     * <pre>{@code
     *     Stream.of("one", "two", "three", "four")
     *         .filter(e -> e.length() > 3)
     *         .peek(e -> System.out.println("Filtered value: " + e))
     *         .map(String::toUpperCase)
     *         .peek(e -> System.out.println("Mapped value: " + e))
     *         .collect(Collectors.toList());
     * }</pre>
```

즉, 다음과 같은 코드가 있다면,

```java
Stream.of("one", "two", "three", "four")
    .filter(e -> e.length() > 3)
    .map(String::toUpperCase)
    .collect(Collectors.toList());
```

다음과 같이 스트림의 각 요소를 소비하지 않으면서 실행할 수 있다.

```java
Stream.of("one", "two", "three", "four")
    .filter(e -> e.length() > 3)
    .peek(e -> System.out.println("Filtered value: " + e))
    .map(String::toUpperCase)
    .peek(e -> System.out.println("Mapped value: " + e))
    .collect(Collectors.toList());
```

람다와 스트림을 조합한 코드는 디버깅이 어렵기 때문에, 복잡한 코드를 디버깅 할 때에는 `peek`의 사용을 고려하는 것도 좋은 방법이다.

`forEach`는 스트림을 소비하기 때문에 `peek`처럼 쓸 수 없다.

## 참고문헌

- 이펙티브 자바 Effective Java 3/E / 조슈아 블로크 저/개앞맵시(이복연) 역 / 인사이트(insight) / 초판 2쇄 2018년 11월 21일
- 모던 자바 인 액션 / 라울-게이브리얼 우르마, 마리오 푸스코, 앨런 마이크로프트 저/우정은 역 / 한빛미디어 / 2019년 08월 01일 / 원제 : Modern Java in Action

## 주석

[^effective-45]: 이펙티브 자바 3/E. 아이템 45.
[^effective-46-code]: 이펙티브 자바 3/E 아이템 46 의 예제를 약간 변형한 코드이다.
[^effective-47]: 이펙티브 자바 3/E. 아이템 47.
[^effective-48]: 이펙티브 자바 3/E. 아이템 48.
[^stream-parallel-guidance]: [When to use parallel streams][stream-parallel-guidance]
[^raoul-253]: 모던 자바 인 액션. 7장. 253쪽.

[stream-parallel-guidance]: http://gee.cs.oswego.edu/dl/html/StreamParallelGuidance.html
[java-13-collectors]: https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/util/stream/Collectors.html

