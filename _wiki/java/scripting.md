---
layout  : wiki
title   : Java로 간단한 스크립트 작성하기
summary : 가끔 쓸 일이 있다.
date    : 2023-03-20 21:36:53 +0900
updated : 2023-03-20 22:49:16 +0900
tag     : 
resource: 25/DC3824-750D-4731-A067-0E26ABABF835
toc     : true
public  : true
parent  : [[/java]]
latex   : false
---
* TOC
{:toc}

이 방법을 쓰느니 그냥 셸 스크립트를 작성하는 것이 백만배는 편하다.

그러나 아주 가끔, 드물게 이 방법이 필요할 때(굳이 프로젝트를 구성하지 않고 java 파일 하나로만 무언가를 표현할 일이 있을 때)가 있다.

## Java 11 이상

Java 11 부터는 컴파일을 하지 않아도 간단한 java 파일을 그냥 `java` 명령으로 실행할 수 있다.

다음과 같이 `HelloWorld.java` 파일을 만든다. (`package` 선언 같은 건 필요없다.)

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
```

이제 `java` 명령으로 실행해주면 된다. 파일 이름을 제공하는 것이기 때문에 확장자도 같이 지정해준다.

```bash
 #              ↓ 파일 확장자에 주의
java HelloWorld.java
```

결과로 `Hello World`가 출력된다.

### args 사용하기

`HelloWorld.java` 파일을 다음과 같이 수정해보자.

```java
public class HelloWorld {
    public static void main(String[] args) {
        for (String arg : args) {
            System.out.println(arg);
        }
    }
}
```

그리고 args를 주면서 실행해 보면 다음과 같이 잘 출력된다.

```bash
$ java HelloWorld.java 1 2 "3 삼" 4 "5 오"
1
2
3 삼
4
5 오
```

## Java 11 미만

Java 11 미만이라면 당연히 `javac`로 컴파일해서 `class` 파일을 생성한 다음 사용해야 한다.

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
```

이제 이 파일을 컴파일한다.

```bash
javac HelloWorld.java
```

이렇게 하면 같은 디렉토리에 `HelloWorld.class` 파일이 생성된다.

이제 `HelloWorld.java` 파일은 지워도 상관없다.

그리고 다음과 같이 `HelloWorld.class` 파일을 실행하면 된다.

```bash
java HelloWorld
```

## 파일이 두 개 이상 있다면 컴파일해야 한다

다음과 같이 두 개의 파일을 만들어보자.

- `Person.java`

```java
public class Person {
    private String name;

    public Person(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

- `Main.java`

```java
public class Main {
    public static void main(String[] args) {
        Person person = new Person("홍길동");
        System.out.println("이름: " + person.getName());
    }
}
```

같은 경로에 있으므로 `Main`에서 `Person`을 `import` 하지 않고 있다는 점에 주목.

이제 다음과 같이 컴파일한다.

```bash
javac Main.java
```

그러면 `Main.class`, `Person.class` 이렇게 두 파일이 생성된다.

이제 `java`로 실행할 수 있다.

```bash
java Main
```
