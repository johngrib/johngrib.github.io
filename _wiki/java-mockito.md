---
layout  : wiki
title   : mockito를 테스트에 사용하기
summary : 
date    : 2021-04-17 23:00:42 +0900
updated : 2021-04-18 12:31:29 +0900
tag     : java test
resource: 52/D75524-D1C5-4C0B-9914-5A0A1AD02855
toc     : true
public  : true
parent  : [[java]]
latex   : false
---
* TOC
{:toc}

## 버전

이 문서에서는 다음 버전을 사용하였다.

- `org.springframework.boot:spring-boot-starter-test:2.3.5.RELEASE`
    - `org.mockito:mockito-core:3.3.3`
    - `org.mockito:mockito-junit-jupiter:3.3.3`
- `org.junit.jupiter:junit-jupiter-api:5.6.2`

## Examples

아래의 예제에 사용된 `import`는 모두 다음과 같다.

```java
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.atLeast;
import static org.mockito.Mockito.atMost;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.inOrder;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InOrder;
```

예제용 클래스는 다음과 같다.

```java
class Bird {
  void fly() {
    System.out.println("fly");
  }

  void walk() {
    System.out.println("walk");
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getName() {
    return this.name;
  }

  public String talk(String sentence) {
    return String.format("%s %s", this.name, sentence);
  }
}
```

### verify 검증
#### verify

```java
private final Bird bird = mock(Bird.class);

@DisplayName("'verify.메소드()' 호출은")
@Nested class Describe_verify {

  @DisplayName("메소드 호출이 있었다는 것을 검증한다")
  @Test void test1() {
    bird.fly();

    verify(bird).fly();
  }

  @DisplayName("never와 함께 사용하면 메소드 호출이 없었다는 것을 검증한다")
  @Test void test2() {
    bird.walk();

    verify(bird, never()).fly();
  }

  @DisplayName("times와 함께 사용하면 메소드 호출 횟수를 검증한다")
  @Test void test3() {
    for (int i = 0; i < 3; i++) {
      bird.fly();
    }

    verify(bird, times(3)).fly();
  }

  @DisplayName("atLeast, atMost와 함께 사용하면 메소드 호출 최소/최대 횟수를 검증한다")
    @Test void test4() {
      for (int i = 0; i < 3; i++) {
        mockingBird.fly();
      }

      verify(mockingBird, atLeast(2)).fly();
      verify(mockingBird, atMost(4)).fly();
    }
  }

  @DisplayName("argument를 제공하면 argument를 검증한다")
  @Test void test5() {
    mockingBird.setName("Kachi");

    verify(mockingBird).setName("Kachi");
    verify(mockingBird).setName(anyString());   // String 타입 검증
  }
}
```

#### verifyNoMoreInteractions

```java
private final Bird bird = mock(Bird.class);

@DisplayName("verifyNoMoreInteractions는")
@Nested class Describe_verifyNoMoreInteractions {

  @DisplayName("verify 이후 다른 인터랙션이 없었다는 것을 검증한다")
  @Test void test4() {
    mockingBird.fly();

    verify(mockingBird).fly();
    verifyNoMoreInteractions(mockingBird);
  }
}
```

#### verifyNoInteractions

참고: `verifyZeroInteractions`는 3.0.1 부터 deprecated 되었으므로, `verifyNoInteractions`를 사용하도록 한다.

```java
private final Bird bird = mock(Bird.class);

@DisplayName("verifyNoInteractions는")
@Nested class Describe_verifyNoInteractions {

  @DisplayName("아무런 인터랙션이 없었다는 것을 검증한다")
  @Test void test5() {

    verifyNoInteractions(mockingBird);
  }
}
```

#### inOrder

```java
@DisplayName("inOrder는")
@Nested class Describe_inOrder{
  private final Bird mockingBird = mock(Bird.class);
  private final InOrder order = inOrder(mockingBird);   // 이 부분에 주목

  @DisplayName("메소드 호출 순서를 검증한다")
  @Test void test5() {
    mockingBird.fly();
    mockingBird.walk();
    mockingBird.fly();

    order.verify(mockingBird).fly();
    order.verify(mockingBird).walk();
    order.verify(mockingBird).fly();
  }
}
```

#### ArgumentCaptor의 사용

```java
@DisplayName("ArgumentCaptor는")
@Nested class Describe_ArgumentCaptor {
  private final Bird mockingBird = mock(Bird.class);
  private final ArgumentCaptor<String> captor = ArgumentCaptor.forClass(String.class);

  @DisplayName("argument를 캡처한다")
  @Test void test() {
    mockingBird.setName("Kachi");

    verify(mockingBird).setName(captor.capture());
    Assertions.assertEquals("Kachi", captor.getValue());
  }
}
```

### when을 사용한 method stubbing

#### thenReturn, doReturn
```java
private final Bird mockingBird = mock(Bird.class);

@DisplayName("thenReturn으로 리턴값을 지정할 수 있다")
@Test void test1() {
  mockingBird.setName("Kachi");
  when(mockingBird.getName()).thenReturn("dummy name");

  Assertions.assertEquals("dummy name", mockingBird.getName());
}

@DisplayName("thenReturn으로 리턴값을 순차적으로 지정할 수 있다")
@Test void test2() {
  mockingBird.setName("Kachi");
  when(mockingBird.getName())
      .thenReturn("dummy name")
      .thenReturn("false name")
      .thenThrow(new RuntimeException("3번 부르면 예외를 던집니다."));

  Assertions.assertEquals("dummy name", mockingBird.getName());
  Assertions.assertEquals("false name", mockingBird.getName());
  Assertions.assertThrows(RuntimeException.class, () -> mockingBird.getName());
}

@DisplayName("doReturn으로 리턴값을 지정할 수 있다")
@Test void test3() {
  mockingBird.setName("Kachi");
  doReturn("false name").when(mockingBird).getName(); // 이렇게도 가능하다

  Assertions.assertEquals("false name", mockingBird.getName());
}
```

#### thenThrow, doThrow

```java
@DisplayName("thenThrow로 예외를 던지게 할 수 있다")
@Test void test4() {
  when(mockingBird.talk(anyString())).thenThrow(RuntimeException.class);

  Assertions.assertThrows(RuntimeException.class, () -> mockingBird.talk("hello"));
}

@DisplayName("doThrow로 예외를 던지게 할 수 있다")
@Test void test5() {
  // void를 리턴하는 메소드는 doThrow로 테스트할 수 있다.
  doThrow(RuntimeException.class).when(mockingBird).setName(anyString());

  Assertions.assertThrows(RuntimeException.class, () -> mockingBird.setName("Kachi"));
}
```

## 참고문헌

- [Mockito JavaDoc]( https://javadoc.io/doc/org.mockito/mockito-core/latest/org/mockito/Mockito.html )

