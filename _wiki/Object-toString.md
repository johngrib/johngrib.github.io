---
layout  : wiki
title   : java.lang.Object.toString 메소드
summary :
date    : 2018-03-10 23:04:50 +0900
updated : 2018-03-11 15:12:10 +0900
tag     : java 번역
toc     : true
public  : true
parent  : Java
latex   : false
---
* TOC
{:toc}

버전: Java 1.8

## 원문

```java
/**
 * Returns a string representation of the object. In general, the
 * {@code toString} method returns a string that
 * "textually represents" this object. The result should
 * be a concise but informative representation that is easy for a
 * person to read.
 * It is recommended that all subclasses override this method.
 * <p>
 * The {@code toString} method for class {@code Object}
 * returns a string consisting of the name of the class of which the
 * object is an instance, the at-sign character `{@code @}', and
 * the unsigned hexadecimal representation of the hash code of the
 * object. In other words, this method returns a string equal to the
 * value of:
 * <blockquote>
 * <pre>
 * getClass().getName() + '@' + Integer.toHexString(hashCode())
 * </pre></blockquote>
 *
 * @return  a string representation of the object.
 */
public String toString() {
    return getClass().getName() + "@" + Integer.toHexString(hashCode());
}
```

## 번역

객체의 String 표현형을 리턴합니다.

일반적으로, toString 메소드는 this 객체를 "텍스트로 표현"한 문자열을 리턴합니다.
결과는 간결하면서도 충분한 정보를 담고 있어야 하며, 사람이 읽기 쉬운 형태여야 합니다.

Object의 모든 서브클래스에 대해 이 메소드의 오버라이드를 권장합니다.

Object 클래스의 toString 메소드는 인스턴스 객체의 클래스 이름, '@'기호, 그리고 16진수로 표현된 객체의 해시 코드로 구성된 문자열을 리턴합니다.
즉, 이 메소드는 다음과 같은 문자열을 리턴합니다.

```java
getClass().getName() + '@' + Integer.toHexString(hashCode())
```

* @return 객체를 문자열로 표현한 값

## Effective Java - toString 메소드 재정의에 대한 조언들

[[Effective-Java]]에서는 다음과 같은 규칙을 제안하고 있다.

> 규칙 10. toString은 항상 재정의하라

그 외에도 세 가지의 실천적인 조언을 찾아볼 수 있었다.

* 가능하다면 toString 메소드는 객체 내의 중요 정보를 전부 담아 반환해야 한다.
* toString이 반환하는 문자열의 형식을 명시하건 그렇지 않건 간에, 어떤 의도인지는 문서에 분명하게 남겨야 한다.
* toString이 반환하는 문자열에 포함되는 정보들은 전부 프로그래밍을 통해서 가져올 수 있도록 하라.
    * toString 반환값을 파싱해서 쓰는 일이 없도록 한다. toString 구현이 바뀌면 그런 코드는 다 못 쓰게 된다.


## Project Lombok의 toString 메소드 자동 구현

Lombok의 `@ToString`를 사용하면 `equals`와 `hashCode` 메소드를 자동으로 만들어준다.

다음은 롬복 홈페이지에서 복사해 온 코드이다.

```java
import lombok.ToString;

@ToString(exclude="id")
public class ToStringExample {
    private static final int STATIC_VAR = 10;
    private String name;
    private Shape shape = new Square(5, 10);
    private String[] tags;
    private int id;

    public String getName() {
        return this.getName();
    }

    @ToString(callSuper=true, includeFieldNames=true)
    public static class Square extends Shape {
        private final int width, height;

        public Square(int width, int height) {
            this.width = width;
            this.height = height;
        }
    }
}
```

위와 같이 `@ToString` 어노테이션을 사용하면 다음과 같은 toString 메소드가 자동생성된다.

```java
@Override public String toString() {
    return
        "Square(super=" + super.toString() +
        ", width=" + this.width +
        ", height=" + this.height +
        ")";
}
}

@Override public String toString() {
    return
        "ToStringExample(" + this.getName() +
        ", " + this.shape +
        ", " + Arrays.deepToString(this.tags) +
        ")";
}
```

## Links

* [[Effective-Java]]
* [@ToString](https://projectlombok.org/features/ToString) - Lombok
