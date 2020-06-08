---
layout  : wiki
title   : Java의 예외 처리
summary :
date    : 2020-05-31 21:45:47 +0900
updated : 2020-06-08 23:42:16 +0900
tag     : java
toc     : true
public  : true
parent  : [[Java]]
latex   : false
---
* TOC
{:toc}

## 예외의 종류

Java Language Specification 11의 11.1.1. 절에 잘 나와 있다.

[11.1.1. The Kinds of Exceptions]( https://docs.oracle.com/javase/specs/jls/se11/html/jls-11.html#jls-11.1.1 )

> The classes Exception and Error are direct subclasses of Throwable:

- `Exception` 과 `Error` 클래스는 `Throwable`의 직접적인(direct) 서브 클래스이다.

### Exception: 복구가 가능한 예외

> Exception is the superclass of all the exceptions from which ordinary programs may wish to recover.
>
> The class RuntimeException is a direct subclass of Exception. RuntimeException is the superclass of all the exceptions which may be thrown for many reasons during expression evaluation, but from which recovery may still be possible.
>
> RuntimeException and all its subclasses are, collectively, the run-time exception classes.

`Exception` 클래스는 일반적인 프로그램에서 복구하려 하는 모든 예외의 슈퍼클래스이다.

`RuntimeException`은

- `Exception`의 direct 서브클래스이다.
- 모든 예외의 슈퍼클래스이다.
- 표현식 평가 중에 다양한 이유로 발생할 수 있으며, 복구가 가능하다.

`RuntimeException`과 그것의 모든 서브클래스를 런타임 예외 클래스 집합이라 한다.

### Error: 복구가 불가능한 예외

[java.lang.Error]( https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/Error.html )

> Error is the superclass of all the exceptions from which ordinary programs are not ordinarily expected to recover.
>
> Error and all its subclasses are, collectively, the error classes.

`Error`는 일반적인 프로그램에서 복구를 기대할 수 없는 예외들의 슈퍼클래스다.

`Error`와 그것의 모든 서브클래스를 에러 클래스 집합이라 한다.

`java.lang` 패키지에 있는 서브클래스들을 살펴보면 다음과 같다.

- [java.lang.AssertionError]( https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/AssertionError.html )
- [java.lang.LinkageError]( https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/LinkageError.html )
- [java.lang.ThreadDeath]( https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/ThreadDeath.html )
- [java.lang.VirtualMachineError]( https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/VirtualMachineError.html )

### checked 와 unchecked exception

> The unchecked exception classes are the run-time exception classes and the error classes.
>
> The checked exception classes are all exception classes other than the unchecked exception classes. That is, the checked exception classes are Throwable and all its subclasses other than RuntimeException and its subclasses and Error and its subclasses.


- unchecked exception은 run-time exception 클래스와 error 클래스를 말한다.
    - 그 외의 다른 모든 예외 클래스는 checked exception이다.


## From: 이펙티브 자바

이펙티브 자바(3판) "10장. 예외"도 함께 읽어보자.

이펙티브 자바는 챕터 제목만 읽어도 도움이 된다.

- 아이템 69. 예외는 진짜 예외 상황에만 사용하라
- 아이템 70. 복구할 수 있는 상황에는 검사 예외를, 프로그래밍 오류에는 런타임 예외를 사용하라
- 아이템 71. 필요 없는 검사 예외 사용은 피하라
- 아이템 72. 표준 예외를 사용하라
- 아이템 73. 추상화 수준에 맞는 예외를 던져라
- 아이템 74. 메서드가 던지는 모든 예외를 문서화하라
- 아이템 75. 예외의 상세 메시지에 실패 관련 정보를 담으라
- 아이템 75. 가능한 한 실패 원자적으로 만들라
- 아이템 76. 예외를 무시하지 말라

## From: Thinking in Java

### 예외 지침

다음은 Thinking in Java(3판)의 예외 지침이다.[^thinking-439]

> 다음과 같은 목적으로 예외를 사용한다.
1. 적합한 수준에서 문제를 처리한다(어떻게 할지 모르는 경우에는 예외를 잡지 않도록 한다).
2. 문제를 수정하고 예외를 발생시켰던 메소드를 다시 호출한다.
3. 수정 부분을 교정하고 메소드를 재실행하지 않고 계속 진행한다.
4. 메소드에서 산출하기로 되어 있었던 것을 대신할 수 있는 대안 결과를 추정한다.
5. 현재의 컨텍스트에서 할 수 있는 것을 하고, 상위 컨텍스트에 대해 동일한 예외를 다시 던진다.
6. 현재의 컨텍스트에서 할 수 있는 것을 하고, 상위 컨텍스트에 대해 다른 예외를 던진다.
7. 프로그램을 종료한다.
8. 단순화한다(예외 설계가 좀더 복잡해지면, 사용하기가 힘들고 성가시게 된다).
9. 라이브러리와 프로그램을 안전하게 한다(이는 디버깅을 위한 단기적인 투자이며, 견고한 애플리케이션을 위한 장기적 투자이다).

## From: 토비의 스프링

### 예외 처리 핵심 원칙

> 예외를 처리할 때 반드시 지켜야 할 핵심 원칙은 한 가지다.
모든 예외는 적절하게 복구되든지 아니면 작업을 중단시키고 운영자 또는 개발자에게 분명하게 통보돼야 한다.
[^toby-1-281]

### 예외처리 방법

#### 예외 복구

예외 상황을 파악하고 문제를 해결해서 정상 상태로 돌려놓는 방법이다.

> 예외로 인해 기본 작업 흐름이 불가능하면 다른 작업 흐름으로 자연스럽게 유도해주는 것이다.
이런 경우 예외상황은 다시 정상으로 돌아오고 예외를 복구했다고 볼 수 있다.
단, `IOException` 에러 메시지가 사용자에게 그냥 던져지는 것은 예외 복구라고 볼 수 없다.
예외가 처리됐으면 비록 기능적으로는 사용자에게 예외상황으로 비쳐도
애플리케이션에서는 정상적으로 설계된 흐름을 따라 진행돼야 한다.
[^toby-1-285]

#### 예외처리 회피

예외처리를 자신이 처리하지 않고 호출한 쪽에 던지는 것으로, 두 가지 방법이 있다.

- `throws`를 선언하여 예외가 발생하면 알아서 던지게 하는 방법.

```java
// 방법 1
public void add() throws SQLException {
    // JDBC API
}
```

- `catch`로 일단 예외를 잡은 다음 다시 예외를 던지는 방법.

```java
// 방법 2
public void add() throws SQLException {
  try {
    // JDBC API
  } catch(SQLException e) {
    // 로그 출력
    throw e;
  }
}
```

> 예외를 회피하는 것은 예외를 복구하는 것처럼 의도가 분명해야 한다.
콜백/템플릿처럼 긴밀한 관계에 있는 다른 오브젝트에게 예외처리 책임을 분명히 지게 하거나,
자신을 사용하는 쪽에서 예외를 다루는 게 최선의 방법이라는 분명한 확신이 있어야 한다.
[^toby-1-288]

#### 예외 전환

exception translation 이라고도 한다.

발생한 예외를 상황에 맞는 적절한 예외로 전환해 던지는 방법이다.

> 예외 전환은 보통 두 가지 목적으로 사용된다.  
첫째는 내부에서 발생한 예외를 그대로 던지는 것이 그 예외상황에 대한 적절한 의미를 부여해주지 못하는 경우에,
의미를 분명하게 해줄 수 있는 예외로 바꿔주기 위해서다.
API가 발생하는 기술적인 로우레벨을 상황에 적합한 의미를 가진 예외로 변경하는 것이다.
>
> (중략)
>
> 보통 전환하는 예외에 원래 발생한 예외를 담아서 중첩 예외(nested exception)로 만드는 것이 좋다.
중첩 예외는 `getCause()` 메소드를 이용해서 처음 발생한 예외가 무엇인지 확인할 수 있다.
>
> (중략)
>
> 두 번째 전환 방법은 예외를 처리하기 쉽고 단순하게 만들기 위해 포장(wrap)하는 것이다.
중첩 예외를 이용해 새로운 예외를 만들고 원인(cause)이 되는 예외를 내부에 담아서 던지는 방식은 같다.
하지만 의미를 명확하게 하려고 다른 예외로 전환하는 것이 아니다.
주로 예외처리를 강제하는 **체크 예외를 언체크 예외인 런타임 예외로 바꾸는 경우에 사용**한다.
>
> (중략)
>
> 어차피 복구가 불가능한 예외라면 가능한 한 빨리 런타임 예외로 포장해 던지게 해서 다른 계층의 메소드를 작성할 때 불필요한 `throws` 선언이 들어가지 않도록 해줘야 한다.
[^toby-1-288]

## java.lang 의 Throwable 상속 트리

다음은 Java 11의 `Throwable`의 타입 계층 구조 중 `java.lang` 패키지에 소속된 것들만 나열한 것이다.

- `*`: 별 표시가 있는 클래스가 unchecked exception 이다.
    - `RuntimeException`과 `Error` 타입이 unchecked exception이다.

```
Throwable (java.lang)
    Error (java.lang) *
        AnnotationFormatError (java.lang.annotation) *
        AssertionError (java.lang) *
        VirtualMachineError (java.lang) *
            StackOverflowError (java.lang) *
            UnknownError (java.lang) *
            InternalError (java.lang) *
            OutOfMemoryError (java.lang) *
        LinkageError (java.lang) *
            ClassCircularityError (java.lang) *
            IncompatibleClassChangeError (java.lang) *
                NoSuchFieldError (java.lang) *
                InstantiationError (java.lang) *
                IllegalAccessError (java.lang) *
                NoSuchMethodError (java.lang) *
                AbstractMethodError (java.lang) *
            BootstrapMethodError (java.lang) *
            ClassFormatError (java.lang) *
                GenericSignatureFormatError (java.lang.reflect) *
                UnsupportedClassVersionError (java.lang) *
            UnsatisfiedLinkError (java.lang) *
            NoClassDefFoundError (java.lang) *
            ExceptionInInitializerError (java.lang) *
            VerifyError (java.lang) *
        ThreadDeath (java.lang) *
    Exception (java.lang)
        CloneNotSupportedException (java.lang)
        StringConcatException (java.lang.invoke)
        ReflectiveOperationException (java.lang)
            IllegalAccessException (java.lang)
            NoSuchFieldException (java.lang)
            NoSuchMethodException (java.lang)
            InstantiationException (java.lang)
            ClassNotFoundException (java.lang)
            InvocationTargetException (java.lang.reflect)
        LambdaConversionException (java.lang.invoke)
        IllegalClassFormatException (java.lang.instrument)
        UnmodifiableClassException (java.lang.instrument)
        RuntimeException (java.lang) *
            IndexOutOfBoundsException (java.lang) *
            ArithmeticException (java.lang) *
            LayerInstantiationException (java.lang) *
            ClassCastException (java.lang) *
            UnmodifiableModuleException (java.lang.instrument) *
            BytecodeGenerationException in InvokerBytecodeGenerator (java.lang.invoke) *
            SecurityException (java.lang) *
            InaccessibleObjectException (java.lang.reflect) *
            AnnotationTypeMismatchException (java.lang.annotation) *
            ArrayStoreException (java.lang) *
            EnumConstantNotPresentException (java.lang) *
            WrongMethodTypeException (java.lang.invoke) *
            IncompleteAnnotationException (java.lang.annotation) *
            MalformedParametersException (java.lang.reflect) *
            UndeclaredThrowableException (java.lang.reflect) *
            InvalidModuleDescriptorException (java.lang.module) *
            TypeNotPresentException (java.lang) *
            IllegalMonitorStateException (java.lang) *
            NegativeArraySizeException (java.lang) *
            UnsupportedOperationException (java.lang) *
            ResolutionException (java.lang.module) *
            IllegalStateException (java.lang) *
            NullPointerException (java.lang) *
            IllegalCallerException (java.lang) *
            FindException (java.lang.module) *
            MalformedParameterizedTypeException (java.lang.reflect) *
            IllegalArgumentException (java.lang) *
        InterruptedException (java.lang)
```

### Throwable 클래스

### Error 클래스

### Exception 클래스


#### RuntimeException 클래스

```java
/**
 * {@code RuntimeException} is the superclass of those
 * exceptions that can be thrown during the normal operation of the
 * Java Virtual Machine.
 *
 * <p>{@code RuntimeException} and its subclasses are <em>unchecked
 * exceptions</em>.  Unchecked exceptions do <em>not</em> need to be
 * declared in a method or constructor's {@code throws} clause if they
 * can be thrown by the execution of the method or constructor and
 * propagate outside the method or constructor boundary.
 *
 * @author  Frank Yellin
 * @jls 11.2 Compile-Time Checking of Exceptions
 * @since   1.0
 */
public class RuntimeException extends Exception {
```

- `RuntimeException`은 Java Virtual Machine의 정상적인 작동 중에 발생할 수 있는 예외의 수퍼 클래스이다.
- `RuntimeException`과 그 서브 클래스는 unchecked exceptions 이다.

## 참고문헌

- [Java Language Specification 11]( https://docs.oracle.com/javase/specs/jls/se11/html/jls-11.html )
- Thinking in Java [3판] / Bruce Eckel 저 / 이용원 외 공역 / 대웅미디어 / 초판 1쇄 2003년 07월 26일
- 이펙티브 자바 Effective Java 3/E / 조슈아 블로크 저/개앞맵시(이복연) 역 / 인사이트(insight) / 초판 2쇄 2018년 11월 21일
- 토비의 스프링 3.1 vol 1 / 이일민 저 / 에이콘출판사 / 초판 4쇄 2013년 06월 10일

## 주석

[^toby-1-281]: 토비의 스프링 3.1 vol 1. 4.1.1장. 281쪽.
[^toby-1-285]: 토비의 스프링 3.1 vol 1. 4.1.3장. 285쪽.
[^toby-1-288]: 토비의 스프링 3.1 vol 1. 4.1.3장. 288쪽.
[^thinking-439]: Thinking in Java. 9장. 435쪽.

