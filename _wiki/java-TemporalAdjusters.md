---
layout  : wiki
title   : Java TemporalAdjusters
summary : 날짜 조정기
date    : 2020-05-17 21:57:50 +0900
updated : 2020-05-17 22:33:37 +0900
tag     : java
toc     : true
public  : true
parent  : [[Java]]
latex   : false
---
* TOC
{:toc}

## Examples

예제로 사용할 2011년 12월 달력은 다음과 같다.

```sh
$ cal 12 2011
   December 2011
Su Mo Tu We Th Fr Sa
             1  2  3
 4  5  6  7  8  9 10
11 12 13 14 15 16 17
18 19 20 21 22 23 24
25 26 27 28 29 30 31
```

그리고 이 문서의 예제들에서는 다음의 `LocalDate` 객체를 사용한다.

```java
LocalDate date = LocalDate.of(2011, 12, 15);
```

### 1일을 리턴하는 메소드
#### firstDayOfYear
해당 해의 1월 1일을 리턴한다.

```java
// 2011-01-01
date.with(TemporalAdjusters.firstDayOfYear());
```

#### firstDayOfNextYear
다음 해의 1월 1일을 리턴한다.

```java
// 2012-01-01
date.with(TemporalAdjusters.firstDayOfNextYear());
```

#### firstDayOfMonth
해당 월의 1일을 리턴한다.

```java
// 2011-12-01
date.with(TemporalAdjusters.firstDayOfMonth());
```

#### firstDayOfNextMonth
다음 달의 1일을 리턴한다.

```java
// 2012-01-01
date.with(TemporalAdjusters.firstDayOfMonth());
```

### 마지막 날짜를 리턴하는 메소드
#### lastDayOfYear

해당 년도의 마지막 날짜를 리턴한다.

```java
// 2011-12-31
date.with(TemporalAdjusters.lastDayOfYear());
```

#### lastDayOfMonth

해당 월의 마지막 날짜를 리턴한다. 특히 2월에 유용할듯.

```java
// 2011-12-31
date.with(TemporalAdjusters.lastDayOfMonth());
```

### 요일 기준으로 리턴하는 메소드
#### dayOfWeekInMonth

해당 월의 `n` 번째 요일에 해당하는 날짜를 리턴한다.

```java
// 2011-12-01 (첫번째 목요일)
date.with(TemporalAdjusters.dayOfWeekInMonth(1, DayOfWeek.THURSDAY));

// 2011-12-07 (첫번째 수요일)
date.with(TemporalAdjusters.dayOfWeekInMonth(1, DayOfWeek.WEDNESDAY));
```
### lastInMonth

해당 월의 마지막 주어진 요일을 리턴한다.

다음 예제는 2011년 12월의 마지막 월요일에 해당하는 날짜를 리턴한다.

```java
// 2011-12-26
date.with(TemporalAdjusters.lastInMonth(DayOfWeek.MONDAY));
```


### firstInMonth

해당 월의 첫 번째 주어진 요일에 해당하는 날짜를 리턴한다.

다음 예제는 2011년 12월의 첫 번째 월요일에 해당하는 날짜를 리턴한다.

```java
// 2011-12-05
date.with(TemporalAdjusters.firstInMonth(DayOfWeek.MONDAY));
```

### nextOrSame

- 해당 날짜가 주어진 요일이면 그 날짜를 리턴한다.
- 그렇지 않다면 그 이후의 가장 가까운 주어진 요일을 리턴한다.

```java
// 2011-12-19
date.with(TemporalAdjusters.nextOrSame(DayOfWeek.MONDAY));
// 2011-12-15
date.with(TemporalAdjusters.nextOrSame(DayOfWeek.THURSDAY));
```

## 참고문헌

- [Class TemporalAdjusters]( https://docs.oracle.com/javase/8/docs/api/java/time/temporal/TemporalAdjusters.html )

