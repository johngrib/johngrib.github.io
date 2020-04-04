---
layout  : wiki
title   : JDK 13 둘러보기
summary : 
date    : 2019-09-19 10:40:38 +0900
updated : 2020-03-04 21:19:06 +0900
tag     : java
toc     : true
public  : true
parent  : [[Java]]
latex   : false
---
* TOC
{:toc}

* 2019년 9월 17일, JDK 13이 릴리즈됐다.

## 개요

[OpenJDK 13 문서][open-jdk-13]를 보면 다음 다섯 가지를 주요 기능으로 꼽고 있다.

>
* 350: [Dynamic CDS Archives](https://openjdk.java.net/jeps/350 )
* 351: [ZGC: Uncommit Unused Memory](https://openjdk.java.net/jeps/351 )
* 353: [Reimplement the Legacy Socket API](https://openjdk.java.net/jeps/353 )
* 354: [Switch Expressions (Preview)](https://openjdk.java.net/jeps/354 )
* 355: [Text Blocks (Preview)](https://openjdk.java.net/jeps/355 )

## Dynamic CDS Archives

* Java 애플리케이션 실행이 종료될 때 CDS가 동적으로 작동하도록 향상되었다.
* CDS는 [Application Class-Data Sharing](https://openjdk.java.net/jeps/310 )의 줄임말인데, 성능(주로 시작 시간)을 향상시키기 위해 Java 애플리케이션 프로세스들 사이에 공통적인 클래스 메타데이터를 공유하는 기능이다.

## ZGC: Uncommit Unused Memory

* ZGC가 오랫동안 사용하지 않은 heap 메모리를 운영체제로 돌려주지 않는 문제가 있었는데, 이번에 수정됐다.

## Reimplement the Legacy Socket API

* 레거시 소켓 API를 재구현했다.

이유가 무엇일까? 문서의 Motivation을 읽어보자.

>
The java.net.Socket and java.net.ServerSocket APIs, and their underlying implementations, date back to JDK 1.0. The implementation is a mix of legacy Java and C code that is painful to maintain and debug. The implementation uses the thread stack as the I/O buffer, an approach that has required increasing the default thread stack size on several occasions. The implementation uses a native data structure to support asynchronous close, a source of subtle reliability and porting issues over the years. The implementation also has several concurrency issues that require an overhaul to address properly. In the context of a future world of fibers that park instead of blocking threads in native methods, the current implementation is not fit for purpose.

`java.net.Socket`과 `java.net.ServerSocket` API 기본 구현을 살펴보자면 JDK 1.0으로 거슬러 올라가야 합니다. 당시의 구현은 레거시 Java와 C 코드가 혼합된 형태였습니다. 유지보수와 디버깅이 매우 고통스러웠죠.
스레드 스택을 I/O 버퍼로 사용했는데, 이 방법은 디폴트 스레드 스택의 크기를 몇 번이고 늘려줘야 했습니다.
그리고 네이티브 자료 구조를 사용해 구현한 비동기 close에는 수 년 동안 미묘한 안정성/이식성 문제가 있었습니다.
또한 정밀 검사가 필요한 다양한 동시성 문제가 있었습니다. 미래의 광섬유 통신망에서는 스레드를 블록(blocking)하는 것보다 대기(park)시키는 방식이 대세일 것입니다. 현재의 구현은 이에 적합하지 않았습니다.


## Switch Expressions (Preview)

* 12에서도 Preview 였는데 13에서도 Preview.
* Preview 이므로 `--enable-preview` 옵션을 줘야 사용할 수 있는 기능이다.

### Arrow labels

* `:` 대신 `->`를 사용할 수 있다.

```java
static void howMany(int k) {
    switch (k) {
        case 1  -> System.out.println("one");
        case 2  -> System.out.println("two");
        default -> System.out.println("many");
    }
}
```

full through가 없기 때문에 `break`를 쓰지 않아도 된다.

다음과 같이 호출하면,

```java
howMany(1);
howMany(2);
howMany(3);
```

이렇게 출력된다.

```
one
two
many
```

### expression

switch가 expression으로 사용될 수 있다.

```java
static void howMany(int k) {
    System.out.println(
        switch (k) {
            case  1 -> "one"
            case  2 -> "two"
            default -> "many"
        }
    );
}
```

즉, 다음과 같이 변수 할당을 할 수 있다.

```java
T result = switch (arg) {
    case L1 -> e1;
    case L2 -> e2;
    default -> e3;
};
```

### Yielding a value

`yield` 키워드가 추가되었다.

```java
int j = switch (day) {
    case MONDAY  -> 0;
    case TUESDAY -> 1;
    default      -> {
        int k = day.toString().length();
        int result = f(k);
        yield result;   // 일종의 return문 같은 느낌
    }
};
```

`yield`는 `:`를 사용한 전통적인 `switch` 문에서도 쓸 수 있다.

```java
int result = switch (s) {
    case "Foo": 
        yield 1;
    case "Bar":
        yield 2;
    default:
        System.out.println("Neither Foo nor Bar, hmmm...");
        yield 0;
};
```

## Text Blocks (Preview)

Preview 이므로 `--enable-preview` 옵션을 줘야 사용할 수 있는 기능이다.

* 이제 Java에서도 1차원 문자 시퀀스가 아니라 2차원 텍스트 블록을 사용할 수 있다!
* String 보간(interpolation)은 지원되지 않는다.

```java
String html = """
              <html>
                  <body>
                      <p>Hello, world</p>
                  </body>
              </html>
              """;
```

한편, 왼쪽 공백을 `"""`의 위치를 통해 조절할 수 있다.

다음과 같은 코드를 작성해 보았다. 공백을 파악하기 쉽게 스페이스를 `.`으로 바꾸었다.

```java
public class Main {
    public static void main(String[] args) {
        String test = """
            왼쪽 공백 보존
""".replaceAll(" ", ".");
// 가장 왼쪽이 기준

        String test2 = """
        왼쪽 공백 무시
        """.replaceAll(" ", ".");
//      ^ 이 위치가 기준

        String test3 = """
        왼쪽 공백 4칸
    """.replaceAll(" ", ".");
//  ^ 이 위치가 기준

        System.out.println(test);
        System.out.println(test2);
        System.out.println(test3);
    }
}
```

그러자 다음과 같이 출력됐다.

```
............왼쪽.공백.보존

왼쪽.공백.무시

....왼쪽.공백.4칸
```


## 참고문헌

* [JDK 13][open-jdk-13]

[open-jdk-13]: https://openjdk.java.net/projects/jdk/13/
