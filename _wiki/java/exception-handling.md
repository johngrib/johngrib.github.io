---
layout  : wiki
title   : Java의 예외 처리
summary :
date    : 2020-05-31 21:45:47 +0900
updated : 2021-10-02 23:04:00 +0900
tag     : java
resource: 23/CBE45E-96BA-41DC-879B-0497F8439911
toc     : true
public  : true
parent  : [[/java]]
latex   : false
---
* TOC
{:toc}

## 예외

> The classes Exception and Error are direct subclasses of Throwable:
>
-- [Java SE 11 Language Specification][jls11-11-1-1]

`Exception` 과 `Error` 클래스는 `Throwable`의 직접적인(direct) 서브 클래스이다.

- `Throwable`
    - `Error` (`extends Throwable`)
    - `Exception` (`extends Throwable`)

>
자바 클래스 `Throwable`은 예외로 던질 수 있는 모든 것을 설명한다.
`Throwable` 객체에는 두 가지 타입이 있다(`Throwable` 객체를 상속받는 타입이 두 가지라는 뜻이다).
`Error`는 특별한 경우를 제외하고 예외를 잡는 것에 대해 걱정할 필요가 없는 컴파일시의 시스템 에러다.
`Exception`은 모든 표준 자바 라이브러리 클래스 메소드와 개발자의 메소드에서 실행시에 던질 수 있는 기본 타입이다.
그러므로, 자바 프로그래머가 관심 있는 타입은 대체로 `Exception` 이다.
>
예외에 대한 개략적인 정보를 얻는 최선의 방법은 java.sun.com 사이트에서 다운로드 할 수 있는 HTML 자바 문서를 보는 것이다.
이 방법은 다양한 예외를 둘러보는 면에서 한 번은 할만하지만, 곧 예외들간에 이름이 다른 것을 제외하고는 별다른 점이 없다는 것을 알게 될 것이다.
또한, 자바의 예외 개수는 계속 늘어나고 있으며 기본적으로 여기에 이들을 싣는 것은 무의미하다.
제3의 벤더로부터 구한 새로운 라이브러리에는 또한 자체적인 예외들이 들어있을 것이다. 알아두어야 할 중요한 것은 개념이며, 예외로 무엇을 할지이다.
>
예외의 이름은 발생하는 문제를 나타내는 것으로, 예외 이름은 비교적 자기 자신을 설명하는 기능을 한다. 예외들이 `java.lang`에 모두 정의되는 것은 아니다.
일부는 `util`, `net`, `io`와 같은 다른 라이브러리를 지원하기 위해 만들어지는데, 이는 예외의 전체 클래스 이름을 보거나 무엇을 상속받았는지 보면 알 수 있다.
예를 들어 모든 I/O 예외들은 `java.io.IOException`을 상속받는다.
>
-- Thinking in Java(3판) 9장 409쪽

## 예외의 종류

다음은 `Throwable`의 상속 트리이다.[^yuki-261]

![Throwable 클래스와 Throwable을 상속한 객체들의 관계도 그림]( ./throwable-tree.svg )

- `Error`: 복구가 불가능한 예외
    - 예) `VirtualMachineError`, `LinkageError` 등
- `Exception`: 복구가 가능한 예외
    - Checked Exception
        - `java.lang.Exception`을 상속해 만든다.
        - `try`/`catch`로 잡아주지 않거나 메소드 시그니처에 `throws`를 명시하지 않으면 컴파일할 때 에러가 발생한다.
    - Unchecked Exception
        - `java.lang.RuntimeException`을 상속해 만든다.
        - `try`/`catch`를 쓰지 않거나 메소드 시그니처에 `throws`를 명시해주지 않아도 되지만, 그만큼 신중하게 사용하도록 한다.

### Exception: 복구가 가능한 예외

> Exception is the superclass of all the exceptions from which ordinary programs may wish to recover.
>
> The class RuntimeException is a direct subclass of Exception. RuntimeException is the superclass of all the exceptions which may be thrown for many reasons during expression evaluation, but from which recovery may still be possible.
>
> RuntimeException and all its subclasses are, collectively, the run-time exception classes.
>
-- [Java SE 11 Language Specification][jls11-11-1-1]

`Exception` 클래스는 일반적인 프로그램에서 복구하려 하는 모든 예외의 슈퍼클래스이다.

`RuntimeException`은

- `Exception`의 direct 서브클래스이다.
- 모든 예외의 슈퍼클래스이다.
- 표현식 평가 중에 다양한 이유로 발생할 수 있으며, 복구가 가능하다.

`RuntimeException`과 그것의 모든 서브클래스를 런타임 예외 클래스 집합이라 한다.

### Error: 복구가 불가능한 예외

> Error is the superclass of all the exceptions from which ordinary programs are not ordinarily expected to recover.
>
> Error and all its subclasses are, collectively, the error classes.
>
-- [java.lang.Error (javadoc)][java-lang-error]

`Error`는 일반적인 프로그램에서 복구를 기대할 수 없는 예외들의 슈퍼클래스다.

`Error`와 그것의 모든 서브클래스를 에러 클래스 집합이라 한다.

`java.lang` 패키지에 있는 서브클래스들을 살펴보면 다음과 같다.

- [java.lang.AssertionError]( https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/AssertionError.html )
- [java.lang.LinkageError]( https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/LinkageError.html )
- [java.lang.ThreadDeath]( https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/ThreadDeath.html )
- [java.lang.VirtualMachineError]( https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/VirtualMachineError.html )

### unchecked exception 과 checked exception

#### unchecked exception

> The unchecked exception classes are the run-time exception classes and the error classes.
>
> The checked exception classes are all exception classes other than the unchecked exception classes. That is, the checked exception classes are Throwable and all its subclasses other than RuntimeException and its subclasses and Error and its subclasses.
>
-- [Java SE 11 Language Specification][jls11-11-1-1]

- unchecked exception은 run-time exception 클래스와 error 클래스를 말한다.
    - 그 외의 다른 모든 예외 클래스는 checked exception이다.

#### checked exception

- checked exception은 `java.lang.Exception`의 하위 클래스로 선언한다.

>
컴파일시에 확인되고 강제되는 예외들을 **검사 예외(checked exception)**라고 한다.
>
-- Thinking in Java(3판) 9장 397쪽

- checked exception은 `throws` 절에 명시해주거나 `try`/`catch`로 잡아줘야 한다.
    - 이렇게 하지 않으면 컴파일 에러가 발생한다.
    - 그렇기 때문에 "확인된 예외", "검사 에외" 등으로 부르는 것이다.

>
확인된 예외(checked exception)란 메서드 안에서 처리하지 않으면 반드시 메서드의 `throws` 절에 추가해야 하는 예외를 말한다.
`throws` 절에는 `Throwable` 인터페이스를 구현하는 클래스라면 어떤 것이든 나열할 수 있지만,
확인된 예외임에도 처리하지 않은 (`RuntimeException`이나 `Error` 클래스를 상속하지 않는) 예외는 반드시 나열해야 한다.
이는 자바의 자체적인 언어 기능이지만, JVM은 이를 강제하지 않으며 JVM 언어에 대한 요구 사항도 아니다.
>
-- 자바 개발자를 위한 97가지 제안. 85장. 케블린 헤니(Kevlin Henny)

다음 글도 읽어보자.

>
여러분도 알다시피 자바는 두 가지 종류의 예외를 지원한다.
>
- 확인된 예외: 회복해야 하는 대상의 예외다. 자바에서는 메서드가 던질 수 있는 확인된 예외 목록을 선언해야 한다. 아니면 해당 예외를 `try`/`catch`로 처리해야 한다.
- 미확인 예외: 프로그램을 실행하면서 언제든 발생할 수 있는 종류의 예외다. 확인된 예외와 달리 메서드 시그니처에 명시적으로 오류를 선언하지 않으면 호출자도 이를 꼭 처리할 필요가 없다.
>
자바 예외 클래스는 계층적으로 잘 조직되어 있다. [그림 3-1]은 자바의 예외 계층도 모습이다.
`Error`와 `RuntimeException` 클래스는 미확인 예외이며 `Throwable`의 서브 클래스다. 보통 이런 오류는 잡지 않는다.
`Exception` 클래스는 일반적으로 프로그램에서 잡아 회복해야 하는 오류를 가리킨다.
>
![그림 3-1. 자바의 예외 계층도]( ./throwable-relation.svg ) [^real-world-image-3-1]
>
-- 실전 자바 소프트웨어 개발. 3장.

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


## 인용
### From: 이펙티브 자바

이펙티브 자바(3판) "10장. 예외"도 함께 읽어보자.

이펙티브 자바는 챕터 제목만 읽어도 도움이 된다.

- 아이템 69. 예외는 진짜 예외 상황에만 사용하라
- 아이템 70. 복구할 수 있는 상황에는 검사 예외를, 프로그래밍 오류에는 런타임 예외를 사용하라
- 아이템 71. 필요 없는 검사 예외 사용은 피하라
- 아이템 72. 표준 예외를 사용하라
- 아이템 73. 추상화 수준에 맞는 예외를 던져라
- 아이템 74. 메서드가 던지는 모든 예외를 문서화하라
- 아이템 75. 예외의 상세 메시지에 실패 관련 정보를 담으라
- 아이템 76. 가능한 한 실패 원자적으로 만들라
- 아이템 77. 예외를 무시하지 말라

### From: Thinking in Java

#### 예외를 이용한 에러 처리

Thinking in Java(3판)는 대한 역사적인 관점에서 예외를 설명한다.

>
**자바의 기본 철학은 "형식에 맞지 않는 코드는 실행되지 않을 것이다"이다.**
>
에러를 잡기에 이상적인 시기는 프로그램을 실행하기 전 컴파일할 때이다. 그러나 모든 에러를 컴파일할 때 감지할 수 있는 것은 아니다.
나머지 문제들은 에러의 발원지로 하여금, 그 문제를 적절하게 처리하는 방법을 알고 있는 수신자에게 정보를 전달하도록 하여서 어떤 형식을 통해 실행시에 처리되어야 한다.
>
C를 비롯한 다른 초기 언어에서는 다중 에러 처리 스키마(multiple error-handling scheme)가 있어서, 이들은 대체로 프로그래밍 언어의 한 부분으로서가 아니라, 약정으로 제정되었다.
일반적으로 에러가 발생하면, 특정한 값을 반환하거나 플래그를 설정하며, 수신자 쪽에서는 그 값이나 플래그를 보고 잘못된 것이 있는지 확인한다.
그러나 수년이 지나자, 라이브러리를 사용하는 프로그래머는 자신이 완벽하다고 여기는 경향이 있다는 것을 알게 되었다.
"에러는 다른 부분에서 발생한 것이고, 내 코드에는 에러가 없다"라고 단정하는 경향이 있다.
따라서 프로그래머들이 에러 조건을 검토하지 않는것 도 놀랄 일은 아니다(때로는 에러 조건이 너무 황당해서 에러를 찾아내지 못하는 경우도 있다).
만약 코드상에서 메소드를 호출할 때마다 에러를 철저하게 확인한다면, 그 코드를 읽는 것은 악몽이 될 것이다.
프로그래머들은 시스템을 부추겨서 이런 언어들을 없애도록 할 수도 있으므로, 이런 접근 방법으로 에러를 처리하는 것이 방대하고, 견고하며, 유지보수하기 쉬운 프로그램을 만들기에는 걸림돌이 된다는 사실을 받아들이려 하지 않을 것이다.
>
해결책은 에러 처리로부터 일상적인 본질을 취하여, 형식을 강화하는 것이다.
예외 처리의 구현은 1960년대의 운영체제로 거슬러 가면, 베이직에도 "on error goto"가 있었으므로, 사실상 오랫동안 사용되었던 방법이다.
그러나 C++의 예외 처리는 Ada에 기반하였으며, 자바의 경우는 비록 오브젝트 파스칼(Object Pascal)과 유사해 보이기는 하지만, 근본적으로는 C++ 에 기반한 것이다.
>
"예외(exception)"란 말의 의미는 "그것에 대한 이의를 제기하다"이다.
문제가 발생하는 지점에서는 어떻게 해야 할지를 모를 수 있지만, 이것을 그저 기분 좋게 넘어갈 수만은 없다는 것을 알고 있을 것이다.
진행을 멈추고 누군가, 어딘가에서 할 일을 찾아내야 한다. 그러나 현재 컨텍스트에서는 문제를 해결할 정확한 정보가 없다.
그러므로 누군가 합당한 판단을 내릴 수 있는, 한 단계 높은 컨텍스트로 그 문제를 넘겨 주어야 한다(명령 체인과 매우 유사하다).
>
예외의 더 큰 장점은 에러 처리 코드가 깔끔해진다는 것이다.
특정 에러를 확인하고, 프로그램의 각처에서 이를 처리해야 하지만 대신, 더 이상 메소드 호출 시점에 확인하지 않아도 된다(누군가가 예외를 잡도록 되어 있기 때문이다).
그리고 소위 예외 처리기(exception handler)라는 곳에서만 문제를 처리하면 된다.
이렇게 함으로써 코드량이 줄어들고, 잘못됐을 때 실행될 코드와 하려는 일을 기술하는 코드를 분리할 수 있다.
일반적으로 조회, 작성 그리고 디버깅 코드는 이전 방식의 에러 처리를 이용하는 것보다는 예외를 이용하면 더 깔끔하게 작성할 수 있다.
>
예외 처리는 자바가 에러를 보고하는 공식적인 방법일 뿐이기 때문에, 자바 컴파일러는 이를 강제하고 있으며, 예외 처리에 대해 배우지 않고도 작성할 수 있는 예제가 이 책에는 아주 많이 있다. 이 장은 예외를 적합하게 처리하도록 하기 위해 작성해야 할 코드와 작성한 메소드에 문제가 생길 때, 예외를 생성할 수 있는 방법에 대해 알려줄 것이다.
>
-- Thinking in Java(3판) 9장 435쪽

#### throw 키워드

>
`throw` 키워드는 놀랄만한 일들을 몇 가지 발생시킨다.
일반적으로 먼저 `new`를 이용하여 에러 조건을 나타내는 객체를 생성할 것이다. 결과가 되는 참조를 던지는 것을 제공한다.
메소드에서 객체 타입을 반환해주기로 되어 있는 것이 아니더라도, 객체는 사실상 메소드에서 "반환된" 것이다.
너무 깊게 생각하면 문제가 될 수 있겠지만, 가장 단순하게 생각하자면 에러 처리는 또 다른 형태의 반환 메커니즘이라고 볼 수 있다.
또한 예외를 던지면 보통의 스코프를 빠져 나올 수 있다. 그러나 값은 반환되며, 메소드나 스코프를 빠져 나온다.
>
반환하는 곳이 정상적인 메소드 호출의 반환 위치와는 완전히 다르기 때문에, 보통의 메소드 반환과 유사한 점은 없다(예외를 던진 곳으로부터 호출 스택상의 몇 레벨 정도 멀리 떨어진 적합한 에러 처리기에 의해 종료된다).
>
또한, 원하는 Throwable(예외 루트 클래스) 타입의 객체를 던져줄 수 있다.
일반적으로, 서로 다른 에러 타입에 대해 각각 다른 예외 클래스를 던져줄 것이다.
에러 정보는 예외 객체 내부나 예외 클래스 이름에서 암시적으로 나타나므로, 더 큰 컨텍스트 안에 있더라도 그 예외가 무엇을 하는 것인지 알 수 있다(때때로, 예외 객체 안에는 예외 타입 정보만 들어 있을 수도 있다).
-- Thinking in Java(3판) 9장 388쪽

#### 예외 지침

다음은 Thinking in Java(3판)의 예외 지침이다.

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
>
-- Thinking in Java(3판) 9장 435쪽

### From: 토비의 스프링

#### 예외 처리 핵심 원칙

> 예외를 처리할 때 반드시 지켜야 할 핵심 원칙은 한 가지다.
모든 예외는 적절하게 복구되든지 아니면 작업을 중단시키고 운영자 또는 개발자에게 분명하게 통보돼야 한다.
[^toby-1-281]

#### 예외처리 방법

##### 예외 복구

예외 상황을 파악하고 문제를 해결해서 정상 상태로 돌려놓는 방법이다.

> 예외로 인해 기본 작업 흐름이 불가능하면 다른 작업 흐름으로 자연스럽게 유도해주는 것이다.
이런 경우 예외상황은 다시 정상으로 돌아오고 예외를 복구했다고 볼 수 있다.
단, `IOException` 에러 메시지가 사용자에게 그냥 던져지는 것은 예외 복구라고 볼 수 없다.
예외가 처리됐으면 비록 기능적으로는 사용자에게 예외상황으로 비쳐도
애플리케이션에서는 정상적으로 설계된 흐름을 따라 진행돼야 한다.
[^toby-1-285]

##### 예외처리 회피

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

##### 예외 전환

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


### From: 실전 자바 소프트웨어 개발

>
고전적인 C 프로그래밍에서는 수많은 `if` 조건을 추가해 암호 같은 오류 코드를 반환했다.
하지만 그 방법에는 여러 단점이 존재한다.
먼저 전역으로 공유된 가변 상태에 의존해 최근에 발생한 오류를 검색해야 한다. 이 때문에 코드 부분이 따로 분리되어 이해하기가 어려워진다.
결과적으로 코드를 유지보수하기 어렵다.
또한 어떤 값이 실제 값인지 아니면 오류를 가리키는 값인지 구분하기가 어렵다.
강력한 형식 시스템이 있었다면 이 문제를 해결하는 데 조금이나마 도움이 되었을 것이다.
마지막으로 제어 흐름이 비즈니스 로직과 섞이면서 코드를 유지보수하거나 프로그램의 일부를 따로 테스트하기도 어려워진다.
>
자바는 이런 문제를 해결하도록 예외를 일급 언어 기능으로 추가하고 다음과 같은 장점을 제공한다.
- 문서화: 메서드 시그니처 자체에 예외를 지원한다.
- 형식 안전성: 개발자가 예외 흐름을 처리하고 있는지를 형식 시스템이 파악한다.
- 관심사 분리: 비즈니스 로직과 예외 회복(recovery)이 각각 `try`/`catch` 블록으로 구분된다.
>
다만 예외 기능으로 복잡성이 증가한다는 단점이 생긴다.


## 참고문헌

- [Java Language Specification 11]( https://docs.oracle.com/javase/specs/jls/se11/html/jls-11.html )
- Thinking in Java [3판] / Bruce Eckel 저 / 이용원 외 공역 / 대웅미디어 / 초판 1쇄 2003년 07월 26일
- 실전 자바 소프트웨어 개발 / 라울-게이브리얼 우르마, 리처드 워버턴 저/우정은 역 / 한빛미디어 / 초판 1쇄 2020년 06월 20일 / 원제 : Real-World Software Development
- 이펙티브 자바 Effective Java 3/E / 조슈아 블로크 저/개앞맵시(이복연) 역 / 인사이트(insight) / 초판 2쇄 2018년 11월 21일
- 자바 개발자를 위한 97가지 제안 / 케블린 헤니, 트리샤 지 저/장현희 역 / 제이펍 / 2020년 12월 24일 / 원서 : 97 Things Every Java Programmer Should Know
- 자바로 배우는 리팩토링 입문 / 유키 히로시 저/서수환 역 / 길벗 / 초판 발행 2017년 10월 31일
- 토비의 스프링 3.1 vol 1 / 이일민 저 / 에이콘출판사 / 초판 4쇄 2013년 06월 10일

## 주석

[^toby-1-281]: 토비의 스프링 3.1 vol 1. 4.1.1장. 281쪽.
[^toby-1-285]: 토비의 스프링 3.1 vol 1. 4.1.3장. 285쪽.
[^toby-1-288]: 토비의 스프링 3.1 vol 1. 4.1.3장. 288쪽.
[^yuki-261]: 자바로 배우는 리팩토링 입문. 10장. 261쪽을 참고해 그렸음.
[^jls11-11-1-1]: [Java Language Specification 11 - 11.1.1][jls11-11-1-1]
[^real-world-image-3-1]: 실전 자바 소프트웨어 개발 3장. 그림 3-1을 보고 따라 그린 그림이다.

[jls11-11-1-1]: https://docs.oracle.com/javase/specs/jls/se11/html/jls-11.html#jls-11.1.1
[java-lang-error]: https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/Error.html
