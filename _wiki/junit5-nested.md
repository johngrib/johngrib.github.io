---
layout  : wiki
title   : JUnit5로 계층 구조의 테스트 코드 작성하기
summary : 5의 @Nested 어노테이션을 쓰면 된다
date    : 2019-12-22 10:54:33 +0900
updated : 2020-06-09 08:33:18 +0900
tag     : java test
toc     : true
public  : true
parent  : [[index]]
latex   : false
---
* TOC
{:toc}

* 참고: 이 글의 모든 코드는 [Github repository][example-snapshot]에 올려 두었다.

## Describe - Context - It 패턴

내가 선호하는 BDD 테스트 코드 작성 패턴이다.

**이 패턴은 코드의 행동을 설명하는 테스트 코드를 작성한다.**

[Better Specs][betterspecs]에 이 패턴이 잘 설명되어 있으므로, 관심이 있다면 정독한다.

다른 BDD 패턴인 `Given` - `When` - `Then`과 비슷한 철학을 갖고 있지만 미묘하게 다른 점이 있다.

`Describe` - `Context` - `It` 은 상황을 설명하기보다는 테스트 대상을 주인공 삼아 행동을 더 섬세하게 설명하는 데에 적합하다.

`Describe`, `Context`, `It` 세 단어가 핵심 키워드.

| 키워드     | 설명                                |
|------------|-------------------------------------|
| `Describe` | 설명할 테스트 대상을 명시한다.      |
| `Context`  | 테스트 대상이 놓인 상황을 설명한다. |
| `It`       | 테스트 대상의 행동을 설명한다.      |

* 영어로 `Context`문을 작성할 때에는 반드시 `with` 또는 `when`으로 시작하도록 한다.
* `It` 구문은 `It returns true`, `It responses 404`와 같이 심플하게 설명할수록 좋다.

이 방식은 다음과 같은 장점이 있다.

* 테스트 코드를 계층 구조로 만들어 준다.
* 테스트 코드를 추가하거나 읽을 때 스코프 범위만 신경쓰면 된다.
* "빠뜨린" 테스트 코드를 찾기 쉽다.
    * 높은 테스트 커버리지가 필요한 경우 큰 도움이 된다.
* 재미있다. 중독성이 있다.
    * 이유는 설명하기 어려운데 이 방식을 나에게 소개받은 지인 대부분이 재미있으며, 중독성이 있다고 말했다.

잘 모르겠으면 다음과 같이 생각하면 쉽다. 사용하면서 점점 활용을 넓혀가면 된다고 생각한다.

| 키워드     | 설명                                               |
|------------|----------------------------------------------------|
| `Describe` | 테스트 대상이 되는 클래스, 메소드 이름을 명시한다. |
| `Context`  | 테스트할 메소드에 입력할 파라미터를 설명한다.      |
| `It`       | 테스트 대상 메소드가 무엇을 리턴하는지 설명한다.   |

## 계층 구조를 갖는 테스트 코드의 겉모습

보통 다른 언어의 `D-C-I` 패턴을 지원하는 BDD 테스트 프레임워크에서는 다음과 같은 형태의 테스트 코드를 작성하게 된다.

```go
Describe("Sum", func() {
  Context("With 300 and 200", func() {
    It("returns 500", func() {
      Expect(Sum(300, 200)).To(Equal(500))
    })
  })

  Context("With -300 and 200", func() {
    It("returns -100", func() {
      Expect(Sum(-300, 200)).To(Equal(-100))
    })
  })
})
```

이와 같은 형태를 갖는 테스트 코드의 장점을 다시 강조하자면 다음 두 가지이다.

* 테스트 결과가 계층 구조로 출력된다는 것이다.
* `Describe`, `Context`, `It`함수를 테스트 프레임워크에서 지원해준다.
    * 테스트 대상과 테스트 조건, 결과가 스코프로 확실히 구분된다.

그런데 내가 Java로 코딩을 하며 많이 목격하기도 했고, 직접 작성했던 많은 BDD 테스트 방식은 보통 다음과 같은 것이었다.

```java
// given
int a = 300;
int b = 200;

// when
int result = sum(a, b);

// then
assertEquals(result, 500);
```

이런 종류의 테스트는 잘 작동하지만, 그냥 주석을 사용하기 때문에 강제성을 띄지 못해 아쉬운 면이 없지 않아 있다.

이 글에서는 Java 에서 `D-C-I` 패턴을 사용해 위와 같은 형태의 테스트 코드를 계층형으로 작성하는 방법을 소개한다.


## JUnit5의 @Nested를 사용해 계층 구조 테스트 코드를 작성하자

Java에서는 다른 언어와 달리 메소드 내부에 메소드를 곧바로 만들 수가 없다.

다만 이너 클래스를 사용하면 시각적으로 계층적을 보이는 테스트 코드를 작성하는 것은 가능했다.

그러나 JUnit4는 이너 클래스로 작성한 테스트 코드를 직접 지원하지 않아 테스트 결과를 계층형으로 출력해주지 않는다는 문제가 있었다.

그러다 JUnit5의 `@Nested`를 사용하면 계층 구조의 테스트 코드를 작성할 수 있다는 것을 알게 되었다.

다음은 가볍게 작성한 클래스 하나를 테스트하는 코드를 IntelliJ에서 돌려본 결과를 캡처한 것이다.

![]( /post-img/junit5-nested/dci-eng.png )

계층 구조이기 때문에 특정 범위를 폴드하는 것도 가능하다.

위의 테스트를 가동하는 데에 사용한 소스코드는 [내 저장소][example-snapshot]에서 볼 수 있다.

* [ComplexNumber.java][example-1] - 복소수 클래스
* [ComplexNumberTest.java][example-eng] - 테스트 코드(영어)

| 참고                                                                                                                                                       |
|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Describe`와 `Context`는 생략해도 무방하다. 다른 언어의 BDD 프레임워크는 보통 `Describe`와 `Context`가 함수 이름이기 때문에 굳이 설명으로 작성하지 않는다. |

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

* [ComplexNumberKoTest.java][example-kor]

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

### JPA 와 함께 사용하기

#### 단순한 형태의 테스트

다음과 같은 `JpaRepository`를 추가했다고 하자.

* [MemberRepository][jparepo]

```java
public interface MemberRepository extends JpaRepository<Member, Long> {
}
```

자동으로 주어지는 `save` 메소드는 다음과 같이 테스트할 수 있다.

* [MemberRepositoryTest][jpatest]

```java
@ExtendWith(SpringExtension.class)
@DataJpaTest
@DisplayName("MemberRepository")
class MemberRepositoryTest {

  @Autowired
  private MemberRepository repository;
  final String givenName = "홍길동";

  @Nested
  @DisplayName("save 메소드")
  class Describe_save {

    @BeforeEach
    void prepare() {
      repository.deleteAll();
    }

    @Nested
    @DisplayName("멤버 객체가 주어지면")
    class Context_with_a_member {
      final Member givenMember = new Member(givenName);

      @Test
      @DisplayName("주어진 객체를 저장하고, 저장된 객체를 리턴한다")
      void it_saves_obj_and_returns_a_saved_obj() {
        Assertions.assertNull(givenMember.getId(),
          "저장되지 않은 객체는 아이디가 null 이다");

        final Member saved = repository.save(givenMember);

        Assertions.assertNotNull(saved.getId(),
          "저장된 객체는 아이디가 추가되어 있다");
        Assertions.assertEquals(saved.getName(), givenName);
      }
    }
  }
}
```

테스트 결과는 다음과 같다.

![]( /post-img/junit5-nested/save-method.png )


#### Invalid Data Access Api Usage Exception 예외가 발생하는 테스트

그런데 다음과 같은 메소드가 추가되었다고 하자.

* [MemberRepository][jparepo]

```java
public interface MemberRepository extends JpaRepository<Member, Long> {

  /**
   * 방문 카운터를 증가시킨다.
   *
   * @return 업데이트된 레코드의 수
   */
  @Query("update Member m "
          + "set m.visited = m.visited + :plus "
          + "where m.id = :id ")
  @Modifying(clearAutomatically = true, flushAutomatically = true)
  int increaseCount(@Param("id") Long id, @Param("plus") int plus);
}
```

이 메소드를 다음과 같이 테스트하면...

* [MemberRepositoryTest][jpatest]

```java
@Nested
@DisplayName("increase 메소드 - JPA 어노테이션이 없어 실패하는 테스트")
class Describe_increase {
  @Nested
  @DisplayName("저장된 멤버 객체의 아이디와 증가할 숫자가 주어지면")
  class Context_with_a_member {
    final int givenNumber = 3;
    Member givenMember;
    long givenId() {
      return givenMember.getId();
    }

    @BeforeEach
    void preapre() {
      givenMember = repository.save(new Member(givenName, 0));
    }

    @Test
    @DisplayName("방문 카운트를 증가시키고, 업데이트된 레코드 수를 리턴한다")
    void it_increases_count_and_returns_count_of_updated_records() {
      Assertions.assertEquals(givenMember.getVisited(), 0,
              "실행 전의 카운트는 0 이다");

      final int updatedRecords = repository.increaseCount(givenId(), givenNumber);

      Assertions.assertEquals(updatedRecords, 1,
              "한 건이 업데이트되었다");
      Assertions.assertEquals(
              givenNumber,
              repository.findById(givenId()).get().getVisited(),
              "주어진 증가 숫자만큼 방문 카운트가 증가한다"
      );
    }
  }
}
```

다음과 같은 에러 메시지가 출력되며 테스트가 실패한다.

>
org.springframework.dao.InvalidDataAccessApiUsageException: No EntityManager with actual transaction available for current thread - cannot reliably process 'flush' call;
nested exception is javax.persistence.TransactionRequiredException: No EntityManager with actual transaction available for current thread - cannot reliably process 'flush' call

![]( /post-img/junit5-nested/increase-fail.png )


이유는 뻔한데 `@Nested` 때문이다.

##### 해결 방법: Context에 @DataJpaTest 를 달아준다

가장 쉬운 해결 방법은 `Context` 클래스에 `@DataJpaTest`를 달아 주는 것이다.

`/* ! 필수 ! */` 라고 주석을 적어둔 곳에 주목하자.

* [MemberRepositoryPassTest.java][resolve-anno]

```java
@Nested
@DisplayName("increase 메소드 - DataJpaTest 어노테이션을 사용하는 테스트")
class Describe_increase {
  @Nested
  @DataJpaTest  /* ! 필수 ! */
  @DisplayName("저장된 멤버 객체의 아이디와 증가할 숫자가 주어지면")
  class Context_with_a_member {
    final int givenNumber = 3;
    Member givenMember;
    long givenId() {
      return givenMember.getId();
    }

    /* ! 필수 ! */
    @Autowired
    private MemberRepository repository;

    @BeforeEach
    void preapre() {
      givenMember = repository.save(new Member(givenName, 0));
    }

    @Test
    @DisplayName("방문 카운트를 증가시키고, 업데이트된 레코드 수를 리턴한다")
    void it_increases_count_and_returns_count_of_updated_records() {
      Assertions.assertEquals(givenMember.getVisited(), 0,
              "실행 전의 카운트는 0 이다");

      final int updatedRecords = repository.increaseCount(givenId(), givenNumber);

      Assertions.assertEquals(updatedRecords, 1,
              "한 건이 업데이트되었다");
      Assertions.assertEquals(
              givenNumber,
              repository.findById(givenId()).get().getVisited(),
              "주어진 증가 숫자만큼 방문 카운트가 증가한다"
      );
    }
  }
}
```

![]( /post-img/junit5-nested/resolve-annotation.png )


이 방법은 잘 작동한다. 그러나 `Context` 마다 모두 `@DataJpaTest`를 붙여주는 건 괜찮은데, 일일이 `@Autowired private MemberRepository repository`를 넣어주는 것이 너무 귀찮다.

##### 해결 방법: @DataJpaTest 가 붙은 클래스를 상속한다

다음과 같이 약간 싱글톤 패턴 비슷한 모양이 나오는 클래스를 먼저 만든다.

* [MemberRepositoryPassWithExtendsTest.java][resolve-inherit]

```java
MemberRepository repository;

@DataJpaTest
class JpaTest {
  @Autowired MemberRepository memberRepository;

  public MemberRepository getMemberRepository() {
    if (repository == null) {
      repository = memberRepository;
    }
    return repository;
  }
}
```

그리고 다음과 같이 `Context`가 위의 클래스를 상속하게 해주면 된다.

`repository` 변수 대신 `getMemberRepository` 메소드만 사용해주면 된다.

* [MemberRepositoryPassWithExtendsTest.java][resolve-inherit]

```java
@Nested
@DisplayName("increase 메소드 - DataJpaTest 어노테이션을 상속으로 해결한 테스트")
class Describe_increase {
  @Nested
  @DisplayName("저장된 멤버 객체의 아이디와 증가할 숫자가 주어지면 - 여기에서 JpaTest를 상속한다")
  class Context_with_a_member extends JpaTest { /* ! 필수 ! */
    final int givenNumber = 3;
    Member givenMember;
    long givenId() {
      return givenMember.getId();
    }

    @BeforeEach
    void prepare() {
      givenMember = getMemberRepository().save(new Member(givenName, 0));
    }

    @Test
    @DisplayName("방문 카운트를 증가시키고, 업데이트된 레코드 수를 리턴한다")
    void it_increases_count_and_returns_count_of_updated_records() {
      Assertions.assertEquals(givenMember.getVisited(), 0,
              "실행 전의 카운트는 0 이다");

      final int updatedRecords = getMemberRepository().increaseCount(givenId(), givenNumber);

      Assertions.assertEquals(updatedRecords, 1,
              "한 건이 업데이트되었다");
      Assertions.assertEquals(
              givenNumber,
              getMemberRepository().findById(givenId()).get().getVisited(),
              "주어진 증가 숫자만큼 방문 카운트가 증가한다"
      );
    }
  }
}
```

![]( /post-img/junit5-nested/resolve-inherit.png )

이 방법이 그나마 편해서 사용하고 있다. 그러나 더 좋은 방법이 있기를 바란다.

##### 해결 방법: @ExtendWith 를 쓰고 상속한다

그냥 `@ExtendWith(SpringExtension.class)`를 쓰고 객체를 상속하면 바로 위에서 사용한 보일러 플레이트 코드는 전부 필요가 없다.

```java
@ExtendWith(SpringExtension.class)
@DataJpaTest
@Getter
class JpaTest {
  @Autowired MemberRepository memberRepository;
}
```

요즘의 나는 이 방법을 주로 사용하고 있다.

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
[example-snapshot]: https://github.com/johngrib/example-junit5/tree/a5b4aeb4f7711dc84e3e531dc6f09815f392a949
[example-1]: https://github.com/johngrib/example-junit5/blob/81a12afe2c9405afb5faa43da7eb46d7aad188a7/src/main/java/com/johngrib/example/math/ComplexNumber.java
[example-eng]: https://github.com/johngrib/example-junit5/blob/81a12afe2c9405afb5faa43da7eb46d7aad188a7/src/test/java/com/johngrib/example/math/ComplexNumberTest.java
[example-kor]: https://github.com/johngrib/example-junit5/blob/81a12afe2c9405afb5faa43da7eb46d7aad188a7/src/test/java/com/johngrib/example/math/ComplexNumberKoTest.java
[jparepo]: https://github.com/johngrib/example-junit5/commit/a5b4aeb4f7711dc84e3e531dc6f09815f392a949#diff-7b8fd71b884d0277e6c1436787cc5e75
[jpatest]: https://github.com/johngrib/example-junit5/commit/a5b4aeb4f7711dc84e3e531dc6f09815f392a949#diff-31c578db0d1719a05d6477038214d1c7
[resolve-anno]: https://github.com/johngrib/example-junit5/commit/a5b4aeb4f7711dc84e3e531dc6f09815f392a949#diff-dd8b588364151772ee73a9d72dcf0419
[resolve-inherit]: https://github.com/johngrib/example-junit5/commit/a5b4aeb4f7711dc84e3e531dc6f09815f392a949#diff-d448362a92356e56b2ea1d6f86f9ea30

