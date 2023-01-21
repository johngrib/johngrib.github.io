---
layout  : wiki
title   : java.time. Instant
summary : An instantaneous point on the time-line.
date    : 2023-01-21 12:32:25 +0900
updated : 2023-01-21 13:43:42 +0900
tag     : java time
resource: A9/F77713-6073-417D-B574-02E628238D03
toc     : true
public  : true
parent  : [[/java]]
latex   : false
---
* TOC
{:toc}

## 요약

- Java 1.8 부터 도입되었다.
- `Instant`는 immutable하고, thread-safe 하다.
- `Instant`는 UTC 표준 시간대에서 1970년 1월 1일 0시 0분 0초(EPOCH) 이후를 나노초 단위로 표현한다.
- `Instant`의 `toString`은 ISO-8601 형식으로 출력한다.
    - 예: `2023-01-21T04:11:49.569921Z`

## JavaDoc

## Examples

### 생성

```java
Instant now = Instant.now();
// 2023-01-21T04:14:14.386552Z
```

### 시간 연산

```java
Instant now = Instant.now();
// 2023-01-21T04:25:32.856962Z

Instant yesterday = now.minus(1, ChronoUnit.DAYS);
// 2023-01-20T04:25:32.856962Z

Instant tomorrow = now.plus(24, ChronoUnit.HOURS);
// 2023-01-22T04:25:32.856962Z
```

### 비교

```java
Instant 지금 = Instant.now();
// 2023-01-21T04:31:30.327191Z (31분 30초)

Instant _1초전 = 지금.minusSeconds(1);
// 2023-01-21T04:31:29.327191Z (31분 29초)

Instant _2분후 = 지금.plus(2, ChronoUnit.MINUTES);
// 2023-01-21T04:33:30.327191Z (33분 30초)

long 차이 = 지금.until(_1초전, ChronoUnit.SECONDS);
// -1

long 차이2 = 지금.until(_2분후, ChronoUnit.SECONDS);
// 120
```

### 문자열 파싱

```java
Instant time = Instant.parse("2023-01-21T04:14:14.386552Z");

// 다음 둘은 같다
Instant time2 = Instant.parse("2023-01-21T04:14:14.0Z");
Instant time3 = Instant.parse("2023-01-21T04:14:14Z");
```

### 타임존 변환

UTC를 "Asia/Seoul"로 변환하기.

```java
Instant now = Instant.now();
// 2023-01-21T04:21:57.277508Z

Instant plus9hour = now.atZone(ZoneOffset.ofHours(9)).toInstant();
// 2023-01-21T04:21:57.277508Z

Instant seoul = now.atZone(ZoneId.of("Asia/Seoul")).toInstant();
// 2023-01-21T04:21:57.277508Z
```

### 타입 변환

- `String` 변환

```java
String now = Instant.now().toString;
// 2023-01-21T04:14:14.386552Z
```

- `LocalDateTime`, `Instant` 상호 변환

```java
Instant now = Instant.now();

String str = now.toString();
// 2023-01-21T04:38:55.886173Z (4시 38분 55초)

LocalDateTime ldtUtc = LocalDateTime.ofInstant(now, ZoneOffset.UTC);
// 2023-01-21T04:38:55.886173 (4시 38분 55초)

LocalDateTime ldtSeoul = LocalDateTime.ofInstant(now, ZoneId.of("Asia/Seoul"));
// 2023-01-21T13:38:55.886173 (13시 38분 55초)

Instant instantUtc = ldtUtc.toInstant(ZoneOffset.UTC);
// 2023-01-21T04:42:03.352384Z (4시 42분 3초)

Instant instantSeoul = ldtSeoul.toInstant(ZoneOffset.UTC);
// 2023-01-21T13:42:03.352384Z (13시 42분 3초)
```

