---
layout  : category
title   : Java Thread
summary : 
date    : 2024-10-05 22:19:44 +0900
updated : 2024-10-05 23:32:00 +0900
tag     : 
resource: AE/6F2D98-0294-4E72-958D-354324A5E360
toc     : true
public  : true
parent  : [[/java]]
latex   : false
---
* TOC
{:toc}

## Thread 실행

Java에서 Thread를 실행하는 방법은 크게 2가지가 있다.

- `Thread` 클래스를 상속한 클래스에서 `run()` 메소드를 오버라이딩하고, `start()` 메소드를 호출하는 방법
- `Runnable` 인터페이스 구현 클래스에서 `run()` 메소드를 구현하고, `Thread` 클래스의 생성자에 `Runnable` 인터페이스를 구현한 객체를 전달하는 방법

### Thread 클래스를 상속하는 방법 예제

```java
public class Main {
    public static void main(String[] args) {
        new Hello("John").start();
        new Hello("Loui").start();
    }
}

class Hello extends Thread {
    private final String name;

    Hello(String name) {
        this.name = name;
    }

    @Override
    public void run() {
        for (int i = 0; i < 10000; i++) {
            System.out.println("hello " + name + " " + i);
        }
    }
}
```

### Runnable 인터페이스를 구현하는 방법 예제

```java
public class Main {
    public static void main(String[] args) {
        new Thread(new Hello("John")).start();
        new Thread(new Hello("Loui")).start();
    }
}

class Hello implements Runnable {
    private final String name;

    public Hello(String name) {
        this.name = name;
    }

    @Override
    public void run() {
        for (int i = 0; i < 10000; i++) {
            System.out.println("hello " + name + " " + i);
        }
    }
}
```

## 하위 문서

<div id="sub-document-list"></div>
