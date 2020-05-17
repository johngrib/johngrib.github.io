---
layout  : wiki
title   : Java Optional
summary : 작성중인 문서
date    : 2020-01-08 22:31:47 +0900
updated : 2020-05-17 21:36:54 +0900
tag     : java
toc     : true
public  : true
parent  : [[Java]]
latex   : false
---
* TOC
{:toc}

## 발단

작업을 하다가 다음과 같은 형식의 클래스를 하나 보게 되었다.

```java
public class FooBar {
    private Optional<String> alpha;
    private Optional<String> beta;
    private Optional<String> gamma;
    private Optional<String> delta;
    private Optional<String> epsilon;
    private Optional<String> zeta;
    private Optional<String> eta;
    private Optional<String> theta;
    private Optional<String> iota;
    ...
}
```

좋지 못한 느낌이 든다. 이게 과연 바람직한 코드인지 궁금해졌다.

## Java SE 13 API 문서를 읽어보자

다음은 `Optional` 클래스의 주석이다.

```java
/**
 * A container object which may or may not contain a non-{@code null} value.
 * If a value is present, {@code isPresent()} returns {@code true}. If no
 * value is present, the object is considered <i>empty</i> and
 * {@code isPresent()} returns {@code false}.
 *
 * <p>Additional methods that depend on the presence or absence of a contained
 * value are provided, such as {@link #orElse(Object) orElse()}
 * (returns a default value if no value is present) and
 * {@link #ifPresent(Consumer) ifPresent()} (performs an
 * action if a value is present).
 *
 * <p>This is a <a href="../lang/doc-files/ValueBased.html">value-based</a>
 * class; use of identity-sensitive operations (including reference equality
 * ({@code ==}), identity hash code, or synchronization) on instances of
 * {@code Optional} may have unpredictable results and should be avoided.
 *
 * @apiNote
 * {@code Optional} is primarily intended for use as a method return type where
 * there is a clear need to represent "no result," and where using {@code null}
 * is likely to cause errors. A variable whose type is {@code Optional} should
 * never itself be {@code null}; it should always point to an {@code Optional}
 * instance.
 *
 * @param <T> the type of value
 * @since 1.8
 */
public final class Optional<T> {
```

읽기가 좀 어려우니 Java SE 13 공식 문서의 [Class Optional &lt;T&gt;][java-13-optional] 항목에 있는 API NOTE를 읽어보자.
어차피 주석과 같은 내용이다.

> Optional is primarily intended for use as a method return type where there is a clear need to represent "no result," and where using null is likely to cause errors. A variable whose type is Optional should never itself be null; it should always point to an Optional instance.

읽기 쉽도록 간단하게 번역해보았다.

> Optional은 주로 "결과 없음(no result)"을 나타낼 필요가 있고 null을 사용하면 오류가 발생할 수 있는 메소드의 **리턴 타입으로 사용하기 위한 것**입니다. 타입이 Optional 인 변수는 절대로 null이 아니어야 하며, 항상 Optional 인스턴스를 가리켜야(point) 합니다.

## IntelliJ IDEA의 경고를 읽어보자

IntelliJ에 문제의 코드를 입력해 보면 `private Optional`이 있는 모든 필드에 경고를 띄운다. 그리고 그내용은 다음과 같다.

> Inspection info: Reports any uses of **java.util.Optional&lt;T&gt;, java.util.OptionalDouble, java.util.OptionalInt, java.util.OptionalLong** or **com.google.common.base.Optional** as the type for a field or a parameter.  
Optional was designed to provide a limited mechanism for library method return types where there needed to be a clear way to represent "no result". Using a field with type **java.util.Optional** is also problematic if the class needs to be **Serializable**, which **java.util.Optional** is not.

요약하자면 다음과 같다.

* `Optional`을 필드 타입이나 파라미터로 사용했기 때문에 나온 경고이다.
* `Optional`은 제한적으로 라이브러리 메소드 등에서 "결과 없음"을 표현하기 위해 설계된 것이다.
* `Optional`을 필드 멤버로 쓰면 해당 클래스를 `Serializable`할 때 문제가 된다.

가급적이면 `return` 구문에서만 사용하라는 것 같다.

## Modern Java in Action도 읽어보자

팀 동료인 조우현 님이 "모던 자바 인 액션"의 11장을 권하셔서 읽어 보았다.

* 다음은 "Modern Java in Action 11장"을 인용한 것이다.[^modern-377]

> **도메인 모델에 Optional을 사용했을 때 데이터를 직렬화할 수 없는 이유**
<br/><br/>
"예제 11-4"에서는 Optional로 우리 도메인 모델에서 값이 꼭 있어야 하는지 아니면 값이 없을 수 있는지 여부를 구체적으로 표현할 수 있었다. 놀랍게도 Optional 클래스의 설계자는 이와는 다른 용도로만 Optional 클래스를 사용할 것을 가정했다. 자바 언어 아키텍트인 브라이언 고츠(Brian Goetz)는 Optional의 용도가 선택형 반환값을 지원하는 것이라고 명확하게 못박았다.
<br/><br/>
Optional 클래스는 필드 형식으로 사용할 것을 가정하지 않았으므로 Serializable 인터페이스를 구현하지 않는다. 따라서 우리 도메인 모델에 Optional을 사용한다면 직렬화(serializable) 모델을 사용하는 도구나 프레임워크에서 문제가 생길 수 있다. 이와 같은 단점에도 불구하고 여전히 Optional을 사용해서 도메인 모델을 구성하는 것이 바람직하다고 생각한다. 특히 객체 그래프에서 일부 또는 전체 객체가 null일 수 있는 상황이라면 더욱 그렇다. 직렬화 모델이 필요하다면 다음 예제에서 보여주는 것처럼 Optional로 값을 반환받을 수 있는 메서드를 추가하는 방식을 권장한다.
```java
public class Person {
    private Car car;
    public Optional<Car> getCarAsOptional() {
        return Optional.ofNullable(car);
    }
}
```

모던 자바 인 액션의 저자는 "이와 같은 단점에도 불구하고 여전히 `Optional`을 사용해서 도메인 모델을 구성하는 것이 바람직하다고 생각한다"고 한다.

## sonarsource rules를 읽어보자

sonarqube, sonarlint 등의 소스인 sonarsource에서는 Major code smell로 ["Optional" should not be used for parameters][rspec-3553]를 분류한다.

>
The Java language authors have been quite frank that Optional was intended for use only as a return type, as a way to convey that a method may or may not return a value.
<br/><br/>
And for that, it's valuable but using Optional on the input side increases the work you have to do in the method without really increasing the value. With an Optional parameter, you go from having 2 possible inputs: null and not-null, to three: null, non-null-without-value, and non-null-with-value. Add to that the fact that overloading has long been available to convey that some parameters are optional, and there's really no reason to have Optional parameters.
<br/><br/>
The rule also checks for Guava's Optional, as it was the inspiration for the JDK Optional. Although it is different in some aspects (serialization, being recommended for use as collection elements), using it as a parameter type causes exactly the same problems as for JDK Optional.

하지만 파라미터로 사용하는 경우에 대해서만 이야기하고, 필드에서 사용하는 것에 대한 이야기는 하지 않는다.


## 다른 글들도 읽어보자

[Java Optional 바르게 쓰기][homoefficio]

* 뒤태지존님의 글. 매우 깔끔하고 이해하기 쉽다.
* 설계 의도대로 사용하는 것이 해가 적을 것이라는 결론.
* 다양한 안티패턴과 올바른 사용법을 소개한다.

[26 Reasons Why Using Optional Correctly Is Not Optional][reasons-26]

* "Optional을 올바르게 사용하는 것이 선택 사항이 아닌 이유"라는 재미있는 제목.
* 26가지 근거를 들며 `Optional`을 설계 의도대로 사용해야 한다고 주장하는 내용.

[Optional Anti-Patterns][optional-anti-patterns]

* `Optional` 사용시 피해야 할 패턴에 대해 설명한다.
* 첫 번째 케이스가 `Optional`을 필드 값으로 사용하는 경우.

## Links

* [Java SE 13 Class Optional &lt;T&gt;][java-13-optional]
* [Java Optional 바르게 쓰기][homoefficio]
* [26 Reasons Why Using Optional Correctly Is Not Optional][reasons-26]
* [Optional Anti-Patterns][optional-anti-patterns]

## 참고문헌

* 모던 자바 인 액션 / 라울-게이브리얼 우르마, 마리오 푸스코, 앨런 마이크로프트 저/우정은 역 / 한빛미디어 / 초판 1쇄 2019년 08월 01일 / 원제: Modern Java in Action

## 주석

[^modern-377]: 모던 자바 인 액션. 11장. 377쪽.
[java-13-optional]: https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/util/Optional.html
[homoefficio]: http://homoefficio.github.io/2019/10/03/Java-Optional-%EB%B0%94%EB%A5%B4%EA%B2%8C-%EC%93%B0%EA%B8%B0/
[reasons-26]: https://dzone.com/articles/using-optional-correctly-is-not-optional
[optional-anti-patterns]: https://dzone.com/articles/optional-anti-patterns
[rspec-3553]: https://rules.sonarsource.com/java/RSPEC-3553

