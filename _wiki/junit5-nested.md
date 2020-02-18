---
layout  : wiki
title   : JUnit5로 계층 구조의 테스트 코드를 작성하기
summary : 5의 @Nested 어노테이션을 쓰면 된다
date    : 2019-12-22 10:54:33 +0900
updated : 2020-02-18 23:25:39 +0900
tag     : java test
toc     : true
public  : true
parent  : index
latex   : false
---
* TOC
{:toc}

## Describe - Context - It 패턴

내가 선호하는 BDD 테스트 코드 작성 패턴이다.

이 패턴은 코드를 설명하는 테스트 코드를 작성하는 패턴이다.
[Better Specs][betterspecs]에 잘 설명되어 있으므로, 관심이 있다면 정독한다.

이 패턴은 `Describe`, `Context`, `It` 세 단어를 핵심 키워드로 삼는다.

* `Describe`는 설명할 테스트 대상을 명시하는 역할을 한다.
* `Context`는 테스트 대상이 특정 상황에 놓인 경우를 명시한다.
    * 영어로 `Context`문을 작성할 때에는 반드시 `with` 또는 `when`으로 시작하도록 한다.
* `It`은 테스트 대상의 행동을 설명한다.
    * `It returns true`, `It responses 404`와 같이 심플하게 설명할수록 좋다.

이 방식은 테스트 코드를 계층 구조로 만들어 주기 때문에 테스트 코드를 작성하거나 읽거나 분석할 때 스코프 범위만 신경쓰면 된다는 장점이 있다.
한편 "빠뜨린" 테스트 코드를 찾기 쉽기 때문에 높은 테스트 커버리지가 필요한 경우 큰 도움이 된다.


## JUnit5의 @Nested를 사용한 계층 구조의 `D-C-I` 테스트 코드를 작성


반드시 계층 구조가 아니어도 `D-C-I` 패턴의 테스트 코드를 작성하는 것은 가능하다.

그러나 테스트 코드가 계층 구조를 이루면 테스트 결과를 보기 좋다는 장점이 있다.

또한, 테스트 결과를 보면서 누락된 테스트를 찾기 쉬운 것도 장점이다.

경험상 이 방식으로 테스트 코드를 작성하면 빠진 테스트를 찾아 메우는 작업이 굉장히 재밌어서 계속 테스트 코드를 작성하고 정비하게 된다.

Java에서는 다른 언어와 달리 메소드 내부에 메소드를 곧바로 만들 수가 없고,
JUnit4가 이너 클래스로 작성한 테스트 코드를 특별히 처리하지 않아서 애매한 느낌이었는데
JUnit5의 `@Nested`를 사용하면 계층 구조의 테스트 코드를 작성할 수 있다는 것을 알게 되었다.

다음은 가볍게 작성한 클래스 하나를 테스트하는 코드를 IntelliJ에서 돌려본 결과를 캡처한 것이다.

![]( /post-img/junit5-nested/dci-eng.png )

계층 구조이기 때문에 특정 범위를 폴드하는 것도 가능하다.

위의 테스트를 가동하는 데에 사용한 소스코드는 [내 저장소][example]에서 볼 수 있다.

* [ComplexNumber.java][example-1] - 복소수 클래스
* [ComplexNumberTest.java][example-eng] - 테스트 코드(영어)

참고: `Describe`와 `Context`는 생략해도 무방하다. 다른 언어의 BDD 프레임워크는 보통 `Describe`와 `Context`가 함수 이름이기 때문에 굳이 설명으로 작성하지 않는다.


### 한국어로 테스트 설명을 작성하기

앞에서 소개한 테스트 코드는 `Describe`, `Context`, `It` 과 같은 단어가 불필요하게 추가되어 있는 느낌이 강했다.

한국어로 작성한다면 다음과 같은 간단한 기준을 따르면 될 것 같다.

* `Describe`는 테스트 대상을 명사로 작성한다.
* `Context`는 `~인 경우`, `~할 때`, `만약 ~ 하다면` 과 같이 상황 또는 조건을 기술한다.
* `It`은 위에서 명사로 작성한 테스트 대상의 행동을 작성한다.
    * 테스트 대상의 행동은 `~이다`, `~한다`, `~를 갖는다`가 적절한다.
    * `~된다` 같은 수동형 표현은 좋지 않다.

![새롭게 작성한 테스트 문구]( /post-img/junit5-nested/test-kor.png )

즉, **BDD**가 테스트 대상의 행동을 묘사하는 방식이라는 것을 염두에 두고 작성하면 된다.

구체적으로는 다음과 같이 이어서 읽었을 때 비문이 아닌 하나의 좋은 문장이 되도록 작성하는 것이 중요하다.

> "ComplexNumber 클래스의 toString 메소드**는** 실수값과 허수값이 있다면, 실수부 + 허수부i 형식으로 표현한 문자열을 리턴한다"

보통 저지르기 쉬운 실수는 다음과 같은 것이다.

```java
@DisplayName("toString 메소드")
// 생략
@DisplayName("만약 실수값만 있고 허수값이 없다면")
// 생략
@DisplayName("실수부만 표현한 문자열이 된다")
// 생략
```

이와 같이 작성하면, 다음과 같은 이상한 문장이 된다. 어디가 이상한지 잘 모르겠다면 여러 차례 읽어보자.

> "**ComplexNumber 클래스의 toString 메소드는** 만약 실수값만 읽고 허수값이 없다면, 실수부만 표현한 **문자열이 된다**"

"toString 메소드는... 문자열이 된다" 이므로 비문이다. 즉 올바른 문장이 아니다.

올바른 문장으로 만드려면 다음과 같이 작성해야 한다.

> "**ComplexNumber 클래스의 toString 메소드는** 만약 실수값만 있고 허수값이 없다면, 실수부만 표현한 **문자열을 리턴한다**"

"toString 메소드는... 문자열을 리턴한다" 이므로 올바른 문장이다.

이와 같이 하나의 완전한 문장이 되는지 체크하며 작성하는 습관을 기를 필요가 있다.

다음은 코드 전문이다.

* [ComplexNumberKoTest.java][example-kor]

```java
package com.johngrib.example;

import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SuppressWarnings({"InnerClassMayBeStatic", "NonAsciiCharacters"})
@DisplayName("ComplexNumber 클래스")
class ComplexNumberKoTest {

  @Nested
  @DisplayName("of 메소드는")
  class Describe_of {
    private final double givenReal = 3d;
    private final double givenImagine = 3d;

    @Nested
    @DisplayName("만약 실수값만 주어지고 허수값은 없다면")
    class Context_with_real {
      @Test
      @DisplayName("i 값이 0 인 복소수를 리턴한다")
      void it_returns_a_valid_complex() {
        final ComplexNumber result = ComplexNumber.of(givenReal);

        Assertions.assertEquals(result.getImagine(), 0d, "리턴된 복소수는 허수 값으로 0 을 갖는다");
        Assertions.assertEquals(result.getReal(), givenReal, "리턴된 복소수는 실수 값으로 주어진 실수 값을 갖는다");
      }
    }

    @Nested
    @DisplayName("만약 실수값과 허수값이 주어진다면")
    class Context_with_real_and_i {
      @Test
      @DisplayName("주어진 실수값과 허수값을 갖는 복소수를 리턴한다")
      void it_returns_a_valid_complex() {
        final ComplexNumber result = ComplexNumber.of(givenReal, givenImagine);

        Assertions.assertEquals(result.getReal(), givenReal, "리턴된 복소수는 실수 값으로 주어진 실수 값을 갖는다");
        Assertions.assertEquals(result.getImagine(), givenImagine, "리턴된 복소수는 허수 값으로 주어진 허수 값을 갖는다");
      }
    }
  }

  @Nested
  @DisplayName("sum 메소드는")
  class Describe_sum {
    @Nested
    @DisplayName("만약 실수부와 허수부가 있는 두 복소수가 주어진다면")
    class Context_with_two_complex {
      private ComplexNumber a, b;

      @BeforeEach
      void prepareNumbers() {
        a = ComplexNumber.of(1d, 2d);
        b = ComplexNumber.of(32d, 175d);
      }

      ComplexNumber subject() {
        return ComplexNumber.sum(a, b);
      }

      @Test
      @DisplayName("실수부와 허수부가 올바르게 계산된 복소수를 리턴한다")
      void it_returns_a_valid_complex() {
        Assertions.assertEquals(a.getReal() + b.getReal(), subject().getReal(),
                "리턴된 복소수는 두 실수 값의 합을 실수로 갖는다");
        Assertions.assertEquals(a.getImagine() + b.getImagine(), subject().getImagine(),
                "리턴된 복소수는 두 허수 값의 합을 허수로 갖는다");
      }
    }
  }

  @Nested
  @DisplayName("toString 메소드는")
  class Describe_toString {
    @Nested
    @DisplayName("만약 실수값만 있고 허수값이 없다면")
    class Context_with_real {
      private final double givenNatual = 3d;
      private final String expectPattern = "^3(?:\\.0+)?$";
      private ComplexNumber given = ComplexNumber.of(givenNatual);

      @Test
      @DisplayName("실수부만 표현한 문자열을 리턴한다")
      void it_returns_a_valid_string() {
        Assertions.assertTrue(given.toString().matches(expectPattern));
      }
    }

    @Nested
    @DisplayName("만약 실수값이 있고 허수값도 있다면")
    class Context_with_real_and_imagine {
      private final double givenNatual = 3d;
      private final double givenImagine = 7d;
      private ComplexNumber given = ComplexNumber.of(givenNatual, givenImagine);
      private String expectPattern = "^3(?:\\.0+)?\\+7(?:\\.0+)?i$";

      @Test
      @DisplayName("실수부 + 허수부i 형식으로 표현한 문자열을 리턴한다")
      void it_returns_a_valid_string() {
        assertTrue(given.toString().matches(expectPattern));
      }
    }
  }
}
```

한편 html 보고서를 출력하면 다음과 같이 나온다.

![]( /post-img/junit5-nested/result.png )

### subject 메소드의 사용

위의 예제를 잘 살펴봤다면 `subject` 메소드를 발견했을 것이다.

`subject` 메소드는 테스트 대상을 실행하는 코드를 캡슐화하는 역할을 한다.

이를 통해 테스트 대상이 되는 코드의 시그니처가 변경되었을 때 여러 개의 테스트가 줄줄이 깨져나가는 상황을 쉽게 고칠 수 있다.

```java
@Test
@DisplayName("리턴된 복소수는 두 실수 값의 합을 실수로 갖는다")
void it_returns_a_valid_complex() {

  /* BAD: sum 메소드의 시그니처가 변경되면 고쳐야 할 곳 1 */
  ComplexNumber result = ComplexNumber.sum(a, b);

  Assertions.assertEquals(a.getReal() + b.getReal(), subject().getReal());
}

@Test
@DisplayName("리턴된 복소수는 두 허수 값의 합을 허수로 갖는다")
void it_returns_a_valid_complex() {

  /* BAD: sum 메소드의 시그니처가 변경되면 고쳐야 할 곳 2 */
  ComplexNumber result = ComplexNumber.sum(a, b);

  Assertions.assertEquals(a.getImagine() + b.getImagine(), result.getImagine());
}
```

만약 위의 예에서 `subject` 메소드를 사용하지 않는다면, `ComplexNumber.sum` 메소드의 인자 타입이나 갯수가 변경될 경우 두 테스트 코드를 수정해야 한다. 그러나 `subject` 메소드가 있다면 `subject` 하나만 고치면 된다.

```java
ComplexNumber subject() {
  /* sum 메소드의 시그니처가 변경되면 여기만 고치면 된다 */
  return ComplexNumber.sum(a, b);
}

@Test
@DisplayName("리턴된 복소수는 두 실수 값의 합을 실수로 갖는다")
void it_returns_a_valid_complex() {
  ComplexNumber result = subject(); /* 비슷한 테스트는 subject 호출로 해결한다 */

  Assertions.assertEquals(a.getReal() + b.getReal(), subject().getReal());
}

@Test
@DisplayName("리턴된 복소수는 두 허수 값의 합을 허수로 갖는다")
void it_returns_a_valid_complex() {
  ComplexNumber result = subject(); /* 비슷한 테스트는 subject 호출로 해결한다 */

  Assertions.assertEquals(a.getImagine() + b.getImagine(), result.getImagine());
}
```

`subject`는 특히 테스트 코드가 많이 딸린 복잡한 코드의 테스트에서 빛을 발한다.

### 상속을 사용한 테스트 중복 제거

또한, 검사해야 할 조건이 많아 `Context`나 비슷한 테스트가 지루하게 반복될 경우 공통되는 핵심 부분만 뽑아낸 `Context` 클래스를 상속하여 사용할 수도 있다.

해당 테스트의 주제와 관련있는 조건부만 오버라이드하는 방식으로 사용하면 된다.

다음은 상속을 사용해 중복을 제거한 테스트 코드의 예제이다.

```java
// 공통되는 부분만 뽑아낸 abstract class
abstract class ContextTwoComplex {
  ComplexNumber givenA() {
    return ComplexNumber.of(1d, 2d);
  }
  ComplexNumber givenB() {
    return ComplexNumber.of(3d, 4d);
  }
  ComplexNumber subject() {
    return ComplexNumber.sum(givenA(), givenB());
  }
}

@Nested
@DisplayName("sum 메소드는")
class Describe_sum {

  // 다음의 테스트는 ContextTwoComplex 의 메소드를 그대로 사용한다

  @Nested
  @DisplayName("만약 실수부와 허수부가 있는 두 복소수가 주어진다면")
  class Context_with_two_complex extends ContextTwoComplex {

    @Test
    @DisplayName("실수부와 허수부가 올바르게 계산된 복소수를 리턴한다")
    void it_returns_a_valid_complex() {
      Assertions.assertEquals(
        givenA().getReal() + givenB().getReal(),
        subject().getReal(),
        "리턴된 복소수는 두 실수 값의 합을 실수로 갖는다"
      );
      Assertions.assertEquals(
        givenA().getImagine() + givenB().getImagine(),
        subject().getImagine(),
        "리턴된 복소수는 두 허수 값의 합을 허수로 갖는다"
      );
    }
  }

  // 다음의 테스트는 ContextTwoComplex 의 givenA 를 오버라이드하여,
  // 차이나는 부분만 정의하여 테스트한다

  @Nested
  @DisplayName("만약 두 복소수 중 하나가 null 이라면")
  class Context_with_one_complex extends ContextTwoComplex {

    // 이 테스트의 주제가 복소수 하나가 null 인 경우이므로
    // 아래와 같이 오버라이드한다
    @Override
    ComplexNumber givenA() {
      return null;
    }

    @Test
    @DisplayName("에외를 던진다")
    void it_returns_a_valid_complex() {
      Assertions.assertThrows(
        NullPointerException.class,
        this::subject   // () -> { subject(); } // 이렇게 해도 된다
      );
    }
  }
}
```


## 타 언어 테스트 프레임워크의 D-C-I 패턴

### Ruby

다음은 [Better Specs][betterspecs]에서 인용한 것이다.

```ruby
describe '#destroy' do

  context 'when resource is found' do
    it 'responds with 200'
    it 'shows the resource'
  end

  context 'when resource is not found' do
    it 'responds with 404'
  end

  context 'when resource is not owned' do
    it 'responds with 404'
  end
end
```

### Go - Ginkgo

Go 언어에서는 Ginkgo 테스트 프레임워크를 사용해 `Describe - Context - It` 패턴의 테스트 코드를 작성할 수 있다.

다음은 [Ginkgo: A Golang BDD Testing Framework][ginkgo]에서 인용한 것이다.

```go
var _ = Describe("Book", func() {
    var (
        longBook  Book
        shortBook Book
    )

    BeforeEach(func() {
        longBook = Book{
            Title:  "Les Miserables",
            Author: "Victor Hugo",
            Pages:  1488,
        }

        shortBook = Book{
            Title:  "Fox In Socks",
            Author: "Dr. Seuss",
            Pages:  24,
        }
    })

    Describe("Categorizing book length", func() {
        Context("With more than 300 pages", func() {
            It("should be a novel", func() {
                Expect(longBook.CategoryByLength()).To(Equal("NOVEL"))
            })
        })

        Context("With fewer than 300 pages", func() {
            It("should be a short story", func() {
                Expect(shortBook.CategoryByLength()).To(Equal("SHORT STORY"))
            })
        })
    })
})
```

### PHP - Kahan

Php 언어에서는 Kahlan으로 `Describe - Context - It` 패턴의 테스트 코드를 작성할 수 있다.

Kahlan을 쓰면 매우 세련된 느낌의 테스트 코드를 작성할 수 있었다. Php가 주력 언어가 아닌데도 Kahlan을 사용하면서 굉장히 좋다는 느낌을 받았었다.

다음은 [Kahlan github의 README.md][kahlan]에서 인용한 것이다.


```php
<?php

describe("Example", function() {

    it("makes an expectation", function() {

         expect(true)->toBe(true);

    });

    it("expects methods to be called", function() {

        $user = new User();
        expect($user)->toReceive('save')->with(['validates' => false]);
        $user->save(['validates' => false]);

    });

    it("stubs a function", function() {

        allow('time')->toBeCalled()->andReturn(123);
        $user = new User();
        expect($user->save())->toBe(true)
        expect($user->created)->toBe(123);

    });

    it("stubs a class", function() {

        allow('PDO')->toReceive('prepare', 'fetchAll')->andReturn([['name' => 'bob']]);
        $user = new User();
        expect($user->all())->toBe([['name' => 'bob']]);

    });

});
```

### Kotlin - Spek

Kotlin에는 [Spek][kotlin-spek]이 있다.

```kotlin
object CalculatorSpec: Spek({
    describe("A calculator") {
        val calculator by memoized { Calculator() }

        describe("addition") {
            it("returns the sum of its arguments") {
                assertEquals(3, calculator.add(1, 2))
            }
        }
    }
})
```

[betterspecs]: http://www.betterspecs.org/ko/
[ginkgo]: https://onsi.github.io/ginkgo/
[kahlan]: https://github.com/kahlan/kahlan
[kotlin-spek]: https://www.spekframework.org/specification/

[example]: https://github.com/johngrib/example-junit5/
[example-1]: https://github.com/johngrib/example-junit5/blob/56811e8647e115f11a6bf10c911734ea41a87677/src/main/java/com/johngrib/example/ComplexNumber.java
[example-eng]: https://github.com/johngrib/example-junit5/blob/56811e8647e115f11a6bf10c911734ea41a87677/src/test/java/com/johngrib/example/ComplexNumberTest.java
[example-kor]: https://github.com/johngrib/example-junit5/blob/bc256b273952a1fd1a355b9343e2ab51f77fac96/src/test/java/com/johngrib/example/ComplexNumberKoTest.java
