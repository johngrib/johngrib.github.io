---
layout  : wiki
title   : 엔티티 (Entity)
summary : 
date    : 2021-10-14 23:17:27 +0900
updated : 2021-10-15 21:14:39 +0900
tag     : ddd
resource: 5E/37F311-6C7C-4AD2-AEF6-D7DCFB25EC27
toc     : true
public  : true
parent  : [[/pattern]]
latex   : false
---
* TOC
{:toc}

## From: 도메인 주도 설계

### Entity와 Value Object, 그리고 Service

>
어떤 객체가 연속성(continuity)과 식별성(identity, 각종 상태를 바탕으로 추적되거나 서로 다른 구현에 걸쳐 존재하는 것)을 지닌 것을 의미하는가?
아니면 다른 뭔가의 상태를 기술하는 속성에 불과한가?
이것은 ENTITY와 VALUE OBJECT를 구분하는 가장 기본적인 방법이다.
어떤 객체를 정의할 때 해당 객체가 한 패턴이나 다른 뭔가를 분명하게 따르게 한다면 그 객체는 더 명확해지고 견고한 설계를 위한 구체적인 설계 결정을 내리는 데 도움될 것이다.
>
또한 여러 도메인 측면 중에는 객체보다는 행동(action)이나 연산(operation)으로 좀더 명확하게 표현되는 것도 있다.
비록 이러한 측면이 전통적인 객체지향 모델링에서 다소 벗어나긴 하지만 어떤 연산의 책임을 특정 ENTITY VALUE OBJECT에서 억지로 맡기보다는 SERVICE로 표현하는 편이 나을 때가 있다.
SERVICE는 클라이언트 요청에 대해 수행되는 뭔가를 의미한다.
소프트웨어의 기술 계층에는 수많은 SERVICE가 있다.
그러한 SERVICE는 도메인에도 나타나는데, 소프트웨어에서 수행해야 하는 것에는 해당하지만 상태를 주고받지는 않는 활동을 모델링하는 경우가 여기에 해당한다.
[^ddd-84]

### ENTITY의 근본적인 개념은 추상적 연속성

>
객체 모델링을 할 때 우리는 객체의 속성에 집중하곤 하는데,
ENTITY의 근본적인 개념은 객체의 생명주기 내내 이어지는 추상적인 연속성이며,
그러한 추상적인 연속성은 여러 형태를 거쳐 전달된다는 것이다.
>
어떤 객체는 해당 객체의 속성을 자신의 주된 정의로 삼지 않는다.
그러한 객체는 오랜 시간에 걸쳐 작용하는 식별성의 이어짐을 나타내며, 종종 전혀 다른 형태로 나타나기도 한다.
간혹 그런 객체들은 다른 객체와 속성이 같지 않아도 서로 동일한 것으로 표현해야 할 때가 있다.
심지어 어떤 것은 다른 객체와 속성이 같아도 서로 구분해야 하는 경우도 있다.
잘못된 식별성은 데이터 손상으로 이어질 수 있다.
>
**어떤 객체를 일차적으로 해당 객체의 식별성으로 정의할 경우 그 객체를 ENTITY라 한다.[^ddd-93-original] ENTITY에는 모델링과 설계상의 특수한 고려사항이 포함돼 있다. ENTITY는 자신의 생명주기 동안 형태와 내용이 급격하게 바뀔 수도 있지만 연속성은 유지해야 한다. 또한 사실상 ENTITY 를 추적하려면 ENTITY에 식별성이 정의돼 있어야 한다. ENTITY의 클래스 정의와 책임, 속 성, 연관관계는 ENTITY에 포함된 특정 속성보다는 ENTITY의 정체성에 초점을 맞춰야 한다. ENTITY가 그렇게까지 급격하게 변형되지 않거나 생명주기가 복잡하지 않더라도 의미에 따라 ENTITY를 분류한다면 모델이 더욱 투명해지고 구현은 견고해질 것이다.**
>
물론 소프트웨어 시스템의 "ENTITY”는 대부분 단어의 의미 그대로 사람이나 개체를 나타내지는 않는다.
ENTITY는 생명주기 내내 이어지는 연속성과 애플리케이션 사용자에게 중요한 속성과는 독립적인 특징을 가진 것이다.
사람이나 도시, 자동차, 복권 티켓, 은행 거래와 같은 것이 ENTITY가 될 수도 있다.
>
한편으로 모델 내의 모든 객체가 의미 있는 식별성을 지닌 ENTITY인 것은 아니다.
이러한 문제는 객체지향 언어에서 모든 객체에 "동일성(identity)" 연산이 내장돼 있다는 점 때문에 혼동되기도 한다(자바의 "==" 연산자).
[^ddd-93]

### 식별성

>
한 객체가 속성보다는 식별성으로 구분될 경우 모델 내에서 이를 해당 객체의 주된 정의로 삼아라.
클래스 정의를 단순하게 하고 생명주기의 연속성과 식별성에 집중하라.
객체의 형태나 이력에 관계없이 각 객체를 구별하는 수단을 정의하라.
객체의 속성으로 객체의 일치 여부를 판단하는 요구사항에 주의하라.
각 객체에 대해 유일한 결과를 반환하는 연산을 정의하라.
이러한 연산은 객체에 유일함을 보장받는 기호를 덧붙여서 정의할 수 있을지도 모른다.
이 같은 식별 수단은 외부에서 가져오거나 시스템에서 자체적으로 만들어 내는 임의의 식별자일 수도 있지만,
모델에서 식별성을 구분하는 방법과 일치해야 한다.
모델은 동일하다는 것이 무슨 의미인지 정의해야 한다.
>
식별성은 원래 세상에 존재하는 것이 아니며, 필요에 의해 보충된 의미다.
사실 현실세계의 같은 사물이라도 도메인 모델에서 ENTITY로 표현되거나 표현되지 않을 수 있다.
[^ddd-94]

## javax.persistence.Entity

다음은 javax의 `@Entity` 애노테이션의 소스코드이다.

```java
package javax.persistence;

import java.lang.annotation.Target;
import java.lang.annotation.Retention;
import java.lang.annotation.Documented;
import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * Specifies that the class is an entity. This annotation is applied to the
 * entity class.
 *
 * @since 1.0
 */
@Documented
@Target(TYPE)
@Retention(RUNTIME)
public @interface Entity {

  /**
   * (Optional) The entity name. Defaults to the unqualified
   * name of the entity class. This name is used to refer to the
   * entity in queries. The name must not be a reserved literal
   * in the Jakarta Persistence query language.
   */
  String name() default "";
}
```

클래스 javadoc을 읽어보자.

>
Specifies that the class is an entity. This annotation is applied to the entity class.

- 해당 클래스가 entity 라고 명시합니다. 이 애노테이션은 entity class 에 적용됩니다.



## 참고문헌

- 도메인 주도 설계 / 에릭 에반스 저 / 이대엽 역 / 위키북스 / 2011년 07월 21일 / 원제 : Domain-Driven Design

## 주석

[^ddd-84]: 도메인 주도 설계. 5장. 84쪽.
[^ddd-93]: 도메인 주도 설계. 5장. 93쪽.
[^ddd-94]: 도메인 주도 설계. 5장. 94쪽.
[^ddd-93-original]: 에릭 에반스의 원주: 모델 ENTITY는 자바의 "엔티티 빈(entity bean)"과 같은 것이 아니다. 엔티티 빈은 ENTITY 구현을 위한 프레임워크를 목표로 했지만 그렇게 되진 않았다. 대부분의 ENTITY는 평범한 객체로 구현된다. ENTITY의 구현 방법과는 상관없이 ENTITY는 도메인 모델의 중요한 특징 가운데 하나다.

