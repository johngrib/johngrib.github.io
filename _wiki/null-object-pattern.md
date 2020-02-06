---
layout  : wiki
title   : 널 오브젝트 패턴 (Null Object Pattern)
summary : 인터페이스는 구현하지만 아무 일도 하지 않는 객체
date    : 2019-10-07 22:48:28 +0900
updated : 2020-02-06 23:57:32 +0900
tag     : pattern
toc     : true
public  : true
parent  : [[design-pattern]]
latex   : false
---
* TOC
{:toc}

* 1996년 7월 28일 Bobby Woolf의 논문, The Null Object Pattern

## 개요

* Null 객체 패턴은 GoF의 디자인 패턴 목록에는 없는 패턴이다.
* 하지만 코딩을 하다 보면 자연스럽게 터득해 사용하게 되는 기법이기도 하다.
* 구현의 심플함에 비해 유용하고, 나름의 중요한 의미가 있는 패턴이다.
* 주의
    * 이 패턴을 잘못 도입하면 예외나 에러를 탐지하기 어려워지는 경우가 있다.
    * 도입했을 때 클래스와 코드가 마구 늘어난다면 이 패턴이 적절하지 않은 상황이거나 잘못 구현한 것이다.

다음은 내가 작성한 코드이다.

```java
public interface Notify {
    void send() ;
}

public class EmailNotify implements Notify {
    public void send() {
        System.out.println("send email");
    }
}

// Null 객체
public class NullNotify implements Notify {
    public void send() {
        // 아무 것도 하지 않는다
    }
}
```

## 예제
### 클린 소프트웨어의 예제

클린 소프트웨어에는 null 객체 패턴을 단순하게 적용한 예제가 소개되어 있다.[^clean]

```java
Employee e = DB.getEmployee("Bob");
if (e != null && e.isTimeToPay(today)) {
    e.pay();
}
```

null 체크 코드는 흔한 관용구이지만, 읽기도 불편하고 실수하기도 쉽다는 문제가 있다.

만약 존재하지 않는 직원을 조회했을 때 null을 리턴하는 것이 아니라, Employee 인터페이스를 구현하면서 아무 일도 하지 않는 Employee 구현체 인스턴스를 리턴하게 하면 다음과 같이 null 체크 코드를 삭제할 수 있다.

```java
Employee e = DB.getEmployee("Bob");
if (e.isTimeToPay(today)) {  // null 체크 삭제
    e.pay();
}
```

`Employee`의 인터페이스는 다음과 같다.

```java
import java.util.Date;

public interface Employee {
    public boolean isTimeToPay(Date payDate);
    public void pay();

    // Employee.NULL은 null 객체
    public static final Employee NULL = new Employee() {
        public boolean isTimeToPay(Date payDate) {
            return false;
        }
        public void pay() {
            // 아무 것도 하지 않는다
        }
    }
}
```

* 여기에서 존재하지 않는 직원을 익명 내부 클래스로 만드는 것은 싱글 인스턴스를 보장하는 방법이다.
* `NullEmployee` 클래스를 명시적으로 만들지 않고도 해결하는 방법이다.

### 이펙티브 자바의 예제

이펙티브 자바 3/E의 아이템 54는 `null` 대신, 빈 컬렉션이나 배열을 리턴할 것을 권장한다.[^effective-325]

```java
// 길이가 0 인 배열은 불변이다.
private static final Cheese[] EMPTY_CHEESE_ARRAY = new Cheese[0];

// cheesesInStock 이 비어 있으면 EMPTY_CHEESE_ARRAY 를 리턴한다.
public Cheese[] getCheeses() {
    return cheesesInStock.toArray(EMPTY_CHEESE_ARRAY);
}
```

## 널 객체 패턴에 대한 인용

### 클린 소프트웨어

엉클 밥은 Null 객체 패턴에 대해 다음과 같이 언급한 바 있다.

> 이 패턴은 종종 null 검사의 필요를 제거하고, 코드를 단순화하는 데 도움이 된다.[^clean]

### 리팩토링

마틴 파울러는 "리팩토링"에서 Null 검사를 줄이는 방법으로 Null 객체의 사용을 소개한 바 있다.

> null 값을 검사하는 코드가 계속 나올 땐 null 값을 널 객체로 만들자.[^fowler0]

"리팩토링"에는 론 제프리스의 널 객체 활용 사례도 함께 등장한다.[^fowler0]

>
재미있게도 널 객체를 사용할 때 잘못되는 경우는 거의 없다.
널 객체는 실제 객체와 똑같은 모든 메시지에 응답하므로 시스템은 왠만해서는 정상 작동한다.
잘못돼서 빠져나오는 부분이 없으므로 문제를 감지하거나 찾기가 힘들어질 때도 있다.
물론 객체를 검사하기 시작하면 곧바로 널 객체가 잘못된 위치에 있음을 알게 될 것이다.

"문제를 감지하거나 찾기가 힘들어질 때도 있다"는 단점을 꼭 염두에 둘 것.

### 테스트 주도 개발

켄트 벡은 "테스트 주도 개발"에서 다음과 같이 널 객체를 소개한다.

> 객체의 특별한 상황을 표현하고자 할 때 어떻게 해야 할까? 그 특별한 상황을 표현하는 새로운 객체를 만들면 된다.
그리고 이 객체에 다른 정상적인 상황을 나타내는 객체와 동일한 프로토콜을 제공한다.[^kent-null-object]

"테스트 주도 개발"에는 켄트 벡과 에리히 감마(GoF 중 한 명)가 나눈 논쟁에 대한 이야기도 실려 있다.

>
에리히 감마와 OOPSLA의 튜토리얼 하나를 진행하다가 JHotDraw 어딘가에 널 객체가 적절한지 아닌지에 대한 논쟁을 한 적이 있다.
결국 조건문 하나를 제거하기 위해서 널 객체를 도입하는 데 드는 비용이 코드 열 줄이라고 에리히가 계산할 때까지 나는 논쟁에서 점수를 앞서고 있었다.
나는 후반부 라운드에 나오는 TKO(techical knock-out)가 싫다.
(우리는 또한 조직적이지 못하고 허술해 보인다고 청중에게 극도로 나쁜 점수를 받았다.
그들은 분명, 생산적인 설계 토론이 어렵긴 하지만 배울 수 있는 기술이라는 것을 알지 못했다.)[^kent-null-object]


## Bobby Woolf의 논문 번역

* 논문인데도 글이 꽤 재미있고 웃긴다.
* null 객체를 활용하는 다양한 사례를 소개하고 있어서 읽는 재미가 있을 뿐 아니라 공학적으로도 흥미로운 글이라고 생각한다.
    * [Implementation](#implementation)과 [Known Uses](#known-uses)에서 생각해볼 점들이 많다.
    * [Simple Code](#simple-code)는 Smalltalk로 작성된 예제를 보여주는데, 내 번역이 엉망이라 이해하기 어려울 수 있다. 잘 이해가 안 간다면 [NullScope](#nullscope)를 먼저 읽는 것이 도움이 될 것이다.
* 의역이 많은 관계로 내용을 정확히 파악하고 싶다면 원본 논문을 읽어보길 권한다.

### Intent

**의도**

_Provide a surrogate for another object that shares the same interface but does nothing. The Null Object encapsulates the implementation decisions of how to "do nothing" and hides those details from its collaborators._

같은 인터페이스를 공유하지만 아무 일도 하지 않는, 다른 객체를 대체할 수 있는 객체를 제공하세요. Null 객체는 "아무것도 하지 않는" 일에 대한 구현을 캡슐화하여 세부사항을 협력자에게 숨깁니다.

### Also Known As

**다른 이름**

Stub, Active Nothing

### Motivation

**동기**

>
Sometimes a class that requires a collaborator does not need the collaborator to do anything. However, the class wishes to treat a collaborator that does nothing the same way it treats one that actually provides behavior.  
Consider for example the Model-View-Controller paradigm in Smalltalk-80. A View uses its Controller to gather input from the user. This is an example of the Strategy pattern [GHJV95, page 315], since the Controller is the View’s strategy for how it will gather input.  
A view can be read-only. Since the view does not gather input from the user, it does not require a controller. Yet View and its subclasses are implemented to expect a controller and they use their controller extensively.  
If no instances of the "view" class ever needed a controller, then the class would not need to be a subclass of View. It could implemented as a visual class similar to View that did not require a controller. However, this will not work for a class that has some instances which require a controller and some which do not. In that case, the class needs to be a subclass of View and all of its instances will require a controller. Thus the view class requires a controller but a particular instance does not.

종종 어떤 클래스를 다루다 보면 아무 행동도 하지 않는 종류의 협력자가 필요한 경우가 생깁니다.
그런데 우리는 그 아무 일도 하지 않는 협력자를, 무언가 일을 하는 다른 협력자와 똑같은 방식으로 다룰 수 있기를 바랍니다.

Smalltalk-80의 Model-View-Controller 패러다임을 예로 들어 봅시다.
하나의 View는 자신의 Controller를 써서 사용자의 입력을 받습니다.
이런 입력 방식은 Strategy pattern의 한 예라 할 수 있습니다.
Controller가 View의 strategy 역할을 하는 셈이기 때문입니다.

만약 사용자의 입력을 전혀 받지 않는 View 가 있다면 Controller가 필요하지 않을 것이고, 그런 View는 읽기 전용이 될 것입니다.
물론 View와 View의 서브클래스들은 Controller를 전제하고 구현되며, Controller를 광범위하게 사용합니다.

만약 "view" 역할을 하는 클래스의 인스턴스들이 Controller를 쓰지 않는다면, 그 클래스는 굳이 View의 서브클래스로 만들지 않아도 괜찮겠죠. 그냥 View와 비슷하되 Controller를 쓰지 않는 visual class로 구현하면 될 것입니다.
하지만 이 방법은 Controller를 쓰는 인스턴스와 안 쓰는 인스턴스가 섞여 있을 때에는 쓸 수 없습니다.
그런 경우에는 View의 서브클래스를 만들어서 그 클래스의 인스턴스들이 Controller를 쓰게 해야 할 것입니다.
즉 Controller를 쓰는 View 클래스가 나오게 되는데, 이 클래스의 몇몇 인스턴스들은 Controller가 필요없다는 문제가 생깁니다.

>
One way to solve this problem would be to set the instance’s controller to nil. This would not work very well though because the view constantly sends its controller messages that only Controller understands (like isControlWanted and startUp). Since UndefinedObject (nil’s class) does not understand these Controller messages, the view would have to check its controller before sending those messages. If the controller were nil, the view would have to decide what to do. All of this conditional code would clutter the view’s implementation. If more than one view class could have nil as its controller, the conditional code for handling nil would be difficult to reuse. Thus using nil as a controller does not work very well.  
Another way to solve this problem would be to use a read-only controller. Some controllers can be set in read-only mode so that they ignore input. Such a controller still gathers input, but when in read- only mode, it processes the input by doing nothing. If it were in edit mode, it would process that same input by changing the model’s state. This is overkill for a controller which is always going to be read- only. Such a controller does not need to do any processing depending on its current mode. Its mode is always read-only, so no processing is necessary. Thus a controller which is always read-only should be coded to perform no processing.  
Instead, what we need is a controller that is specifically coded to be read-only. This special subclass of Controller is called NoController. It implements all of Controller’s interface, but does nothing. When asked isControlWanted, it automatically answers no. When told to startUp, it automatically does nothing and returns self. It does everything a controller does, but it does so by doing nothing. 

이 문제를 해결하는 방법 하나는 문제가 되는 인스턴스들의 Controller를 nil로 설정하는 것입니다.
그런데 View는 Controller만 이해할 수 있는 메시지(`isControlWanted`, `startUp` 같은 것들)를 지속적으로 Controller로 보내기 때문에 이 방법은 잘 돌아가지 않습니다.
nil의 클래스인 UndefinedObject는 이러한 Controller 메시지를 이해하지 못하기 때문입니다. 그래서 View는 메시지를 전송하기 전에 Controller가 nil인지 체크하고, nil이 맞으면 어떻게 해야 할 지 정해줘야 합니다. 이런 조건문 코드가 들어가게 되면 View의 구현이 혼란스러워집니다. 둘 이상의 다양한 View 클래스가 Controller로 nil을 갖는 상황에서 nil을 핸들링하는 조건문 코드는 재사용하기 어렵습니다.
그러므로 View의 Controller를 nil로 설정해 쓰는 기법도 좋은 방법은 아닙니다.

이 문제를 해결하는 또 다른 방법 하나는 읽기 전용 Controller를 사용하는 것입니다.
몇몇 Controller가 입력을 무시하게 하기 위해 읽기 전용 모드로 설정하는 방법입니다.
이러한 Controller는 입력은 계속 받고는 있지만, 읽기 전용 모드이기 때문에 입력을 받아도 아무 것도 안 하는 방식으로 입력을 처리합니다.
만약 편집 모드가 있다면 어떨까요. 편집 모드의 컨트롤러가 입력을 받으면, 입력에 맞게 모델의 상태를 변경하는 것으로 처리했을 것입니다.
이것은 읽기 전용 모드만 있는 Controller에 있어서는 필요 이상의 일(overkill)입니다.
그냥 항상 읽기 전용 모드이므로 모드에 따른 처리를 수행할 필요도 없기 때문입니다.
따라서 항상 읽기 전용인 Controller는 아무것도 처리하지 않도록 코딩해야 합니다.

그 대신, 읽기 전용으로 코딩된 특별한 Controller가 필요합니다. 이 특별한 컨트롤러 서브 클래스는 NoController라고 합니다. NoController는 Controller의 인터페이스를 모두 구현하지만, 아무 일도 하지 않습니다. `isControlWanted`라는 질문을 받으면 자동으로 "no"라고 응답합니다. `startUp`하라고 하면 자동으로 아무 것도 하지 않고 `self`를 리턴할 뿐입니다. NoController는 Controller의 모든 행위를 하지만, 그 행위의 내용은 모두 비어 있습니다.

```ascii-art
View ------> Controller
             ----------
          isControlWanted
              startUp
            ┌─────┴─────┐ . . .
            │           │
TextController        NoController
--------------        ------------
isControlWanted      isControlWanted ---> ^false
    startUp             startUp      ---> ^self
```

>
This diagram illustrates how a view requires a controller and how that controller may be a NoController. The NoController implements all of the behavior that any controller does, but it does so by doing nothing.  
NoController is an example of the Null Object pattern. The Null Object pattern describes how to develop a class that encapsulates how a type of object should do nothing. Because the do nothing code is encapsulated, its complexity is hidden from the collaborator and can easily be reused by any collaborator that wants it.  
The key to the Null Object pattern is an abstract class that defines the interface for all objects of this type. The Null Object is implemented as a subclass of this abstract class. Because it conforms to the abstract class’ interface, it can be used any place this type of object is needed. 

이 다이어그램은 Controller를 쓰는 View와, Controller가 NoController인 경우를 보여줍니다.
NoController는 controller의 모든 행동을 구현하고 있지만, 그 구현 내용은 아무 것도 하지 않는 것입니다.

NoController는 Null 객체 패턴의 한 예입니다. Null 객체 패턴은 아무 일도 하지 않는 작업을 캡슐화하는 클래스를 만드는 방법을 알려줍니다. "아무 일도 하지 않는 코드"는 캡슐화되기 때문에 코드의 복잡도는 협력자에게 숨겨지며, 필요로 하는 모든 협력자가 쉽게 재사용할 수 있습니다.

Null 객체 패턴의 핵심은 해당 타입의 모든 객체에 대한 인터페이스를 정의하는 추상 클래스라 할 수 있습니다.
Null 객체가 이 추상 클래스의 서브 클래스로 구현되기 때문입니다. Null 객체가 추상 클래스의 인터페이스를 따르기 때문에, 이런 타입의 객체가 필요한 모든 곳에서 사용할 수 있게 됩니다.

### Applicability

**활용성**

> Use the Null Object pattern when
* an object requires a collaborator. The Null Object pattern does not introduce this collaboration--it makes use of a collaboration that already exists.
* some collaborator instances should do nothing.
* you want clients to be able to ignore the difference between a collaborator which provides real behavior and that which does nothing. This way, the client does not have to explicitly check for nil or some other special value.
* you want to be able to reuse the do nothing behavior so that various clients which need this behavior will consistently work the same way.
* all of the behavior which might need to be do nothing behavior is encapsulated within the collaborator class. If some of the behavior in that class is do nothing behavior, most or all of the class’ behavior will be do nothing. [Coplein96]

다음과 같은 경우에 Null 객체 패턴을 사용하세요.

* 어떤 객체가 협력자를 필요로 할 때. Null 객체 패턴이 이러한 협력을 제공하는 것은 아니고, 이미 존재하는 협력 구조를 사용할 뿐입니다.
* 클라이언트가 실제 행동을 제공하는 협력자와 아무 것도 하지 않는 협력자 사이의 차이점을 무시할 수 있기를 바랄 때. 이 방법을 쓰면 클라이언트는 명시적인 nil 체크나 그 외의 특별한 값을 체크하지 않아도 됩니다.
* 아무 것도 하지 않는 것을 재사용하여, 다양한 클라이언트가 일관성 있게 같은 방식으로 작동하기를 바랄 때.
* 아무 것도 하지 않는 것을 필요로 하는 모든 행동을 협력자 클래스 내에 캡슐화하고 싶을 때. 만약 해당 클래스의 몇몇 행동이 아무 것도 하지 않는다면, 클래스의 대부분의 행동은 아무 것도 하지 않게 됩니다.

### Structure

**구조**

```ascii-art
Client ------> AbstractObject
------         --------------
                   request
                ┌─────┴─────┐ . . .
                │           │
           RealObject    NullObject
           ----------    ----------
            request       request  ---> "do nothing"
```

### Participants

**참여자**

>
* Client (View)
    * requires a collaborator.
* AbstractObject (Controller)
    * declares the interface for Client’s collaborator.
    * implements default behavior for the interface common to all classes, as appropriate.
* RealObject (TextController)
    * defines a concrete subclass of AbstractObject whose instances provide useful behavior that Client expects.
* NullObject (NoController)
    * provides an interface identical to AbstractObject’s so that a null object can be substituted for a real object.
    * implements its interface to do nothing. What exactly it means to do nothing is subjective and depends on what sort of behavior Client is expecting. Some requests may be fulfilled by doing something which gives a null result.
    * when there is more than one way to do nothing, more than one NullObject class may be required.

* Client(View)
    * 협력자를 필요로 한다.
* AbstractObject (Controller)
    * 클라이언트의 협력자를 위한 인터페이스를 명시한다.
    * 모든 클래스의 기본이 되는 공통 인터페이스의 기본 행동을 구현한다.
* RealObject (TextController)
    * 클라이언트가 예상하는 유용한 행동을 제공하는 인스턴스를 위한 콘크리트 서브클래스를 정의한다.
* NullObject (NoController)
    * AbstractObject와 똑같은 인터페이스를 제공하여, null 객체가 실제 객체를 대체할 수 있게 한다.
    * 인터페이스를 구현하되 아무것도 하지 않게 한다.
    * "아무 것도 하지 않음"은 주관적인 기준이며, 클라이언트가 기대하는 행동에 의존한다. 가령 어떤 리퀘스트에 대해 null 결과를 돌려주는 방식으로 수행될 수도 있다.
    * 만약 아무 것도 하지 않을 방법이 여러 가지가 있다면, 하나 이상의 NullObject 클래스가 필요할 수도 있다.

### Colaborations

**협업 방법**

> Clients use the AbstractObject class interface to interact with their collaborators. If the receiver is a RealObject, then the request is handled to provide real behavior. If the receiver is a NullObject, the request is handled by doing nothing or at least providing a null result.

클라이언트는 AbstractObject 클래스 인터페이스를 사용하여 협력자와 상호작용합니다. 
만약 수신자가 RealObject이면 리퀘스트는 실제 행동으로 처리됩니다.
만약 수신자가 NullObject이면 리퀘스트는 아무 일도 하지 않는 방식으로 처리되거나, null 결과를 돌려받게 됩니다.

### Consequences

**결과**

> The Null Object pattern
* defines class hierarchies consisting of real objects and null objects. Null objects can be used in place of real objects when the object is expected to do nothing. Whenever client code expects a real object, it can also take a null object.
* makes client code simple. Clients can treat real collaborators and null collaborators uniformly. Clients normally don’t know (and shouldn’t care) whether they’re dealing with a real or a null collaborator. This simplifies client code, because it avoids having to write testing code which handles the null collaborator specially.
* encapsulates the do nothing code into the null object. The do nothing code is easy to find. Its variation with the AbstractObject and RealObject classes is readily apparent. It can be efficiently coded to do nothing, rather than having to go through the motions of doing something, but ultimately doing nothing. It does not require variables that contain null values because those values can be hard-coded as constants or the do nothing code can avoid using those values altogether.
* makes the do nothing code in the null object easy to reuse. Multiple clients which all need their collaborators to do nothing will all do nothing the same way. If the do nothing behavior needs to be modified, the code can be changed in one place. Thereafter, all clients will continue to use the same do nothing behavior, which is now the modified do nothing behavior.
* makes the do nothing behavior difficult to distribute or mix into the real behavior of several collaborating objects. The same do nothing behavior cannot easily be added to several classes unless those classes all delegate the behavior to a class which can be a null object class.
* can necessitate creating a new NullObject class for every new AbstractObject class.
* can be difficult to implement if various clients do not agree on how the null object should do
nothing.
* always acts as a do nothing object. The Null Object does not transform into a Real Object.


* null 객체 패턴은 실제 객체와 null 객체로 이루어진 클래스 계층을 정의합니다. 객체가 아무 일도 하지 않기를 기대할 때 null 객체를 실제 객체 대신 사용할 수 있습니다. 클라이언트가 항상 실제 객체를 예상하는 상황에서도 null 객체를 사용할 수 있습니다.
* null 객체 패턴을 사용하면 클라이언트 코드가 심플해집니다. 클라이언트는 실제 협력자와 null 협력자를 같은 방식으로 다룰 수 있습니다. 클라이언트는 일반적으로 협력하는 객체가 실제 협력자인지 null 협력자인지를 알지 못합니다(알 필요도 없습니다). 이 방식은 null 협력자를 특별히 처리하는 테스트 코드를 만들지 않아도 되므로 클라이언트 코드를 단순하게 만듭니다.
* null 객체 패턴은 아무 것도 하지 않는 코드를 null 객체로 캡슐화합니다. 아무것도 하지 않는 코드는 찾기 쉽습니다. AbstractObject와 RealObject 클래스의 차이점은 쉽게 파악할 수 있습니다. 게다가 어떤 일을 복잡하게 처리해야 하는 것이 아니라 진짜 완전 아무것도 하지 않기 때문에 능률적입니다. 상수를 하드코딩해도 되고, 아예 값을 사용하지 않을 수도 있기 때문에 Null 값을 갖는 변수들도 필요하지 않습니다. 
* null 객체 패턴으로 만든, 아무것도 하지 않는 코드를 가진 null 객체는 재사용이 쉽습니다. 아무것도 하지 않는 협력자가 필요한 여러 클라이언트들도 똑같은 방식으로 아무것도 하지 않을 수 있습니다. 만약 아무 것도 하지 않는 행동에 변경이 필요하다면, 한 곳에서만 코드를 수정하면 됩니다. 수정한 이후 모든 클라이언트는 수정된 아무 것도 하지 않는 행동으로 똑같이 아무 것도 하지 않는 행동을 계속할 것입니다.
* null 객체 패턴은 아무 것도 하지 않는 행동을 여러 협력 객체의 실제 동작에 제공하거나 혼합하기 어렵게 만듭니다. 널 객체 클래스가 될 수 있는 클래스에 행동을 위임하지 않으면, 아무것도 하지 않는 행동은 여러 클래스에 쉽게 추가할 수 없습니다. 
* null 객체 패턴으로 인해 모든 새로운 AbstractObject 클래스에 대해 새로운 NullObject 클래스를 만들어야 할 수 있습니다.
* 여러 클라이언트가 null 객체가 아무 것도 하지 않는 것에 대해 동의하지 않는다면 구현이 곤란해질 수 있습니다.
* null 객체는 항상 아무 일도 하지 않는 객체로 존재해야 합니다. null 객체는 실제 객체로 변환되면 안 됩니다.

### Implementation

**구현**

>
There are several issues to consider when implementing the Null Object pattern:
1. Null Object as Singleton. The Null Object class is often implemented as a Singleton [GHJV95, page 127]. Since a null object usually does not have any state, its state can’t change, so multiple instances are identical. Rather than use multiple identical instances, the system can just use a single instance repeatedly.
2. Special null instance of Real Object. As mentioned in the Consequences, the Null Object pattern can cause a single Real Object class to explode into three classes: AbstractObject, RealObject, and NullObject. Thus even if the entire abstract object hierarchy can be implemented with one RealObject class (and no subclasses), at least one subclass is required to implement the NullObject class. One way to avoid this class explosion is to implement the null object as a special instance of RealObject rather than as a subclass of AbstractObject. The variables in this null instance would have null values. This may be sufficient to cause the null instance to do nothing. For example, a composite object whose children is an empty list acts like a leaf object.
3. Clients don’t agree on null behavior. If some clients expect the null object to do nothing one way and some another, multiple NullObject classes will be required. If the do nothing behavior must be customized at run time, the NullObject class will require pluggable variables so that the client can specify how the null object should do nothing (see the discussion of pluggable adaptors in the Adapter pattern [GHJV95, page 142]). Again, a way to avoid this explosion of NullObject subclasses of a single AbstractObject class is to make the null objects special instances of RealObject or a single NullObject subclass. If a single NullObject class is used, its implementation can become an example of the Flyweight pattern [GHJV95, page 195]. The behavior which all clients expect of a particular null object becomes the flyweight’s intrinsic behavior and that which each client customizes is the flyweight’s extrinsic behavior.
4. Transformation to Real Object. A Null Object does not transform to become a Real Object. If the object may decide to stop providing do nothing behavior and start providing real behavior, it is not a null object. It may be a real object with a do nothing mode, such as a controller which can switch in and out of read-only mode. If it is a single object which must mutate from a do nothing object to a real one, it should be implemented with the Proxy pattern [GHJV95, page 207]. Perhaps the proxy will start off using a null object, then switch to using a real object, or perhaps the do nothing behavior is implemented in the proxy for when it doesn’t have a subject. The proxy is not required if the client is aware that it may be using a null collaborator. In this case, the client can take responsibility for swapping the null object for a real one when necessary.
5. Null Object is not Proxy. The use of a null object can be similar to that of a Proxy [GHJV95, page 207], but the two patterns have different purposes. A proxy provides a level of indirection when accessing a real subject, thus controlling access to the subject. A null collaborator does not hide a real object and control access to it, it replaces the real object. A proxy may eventually mutate to start acting like a real subject. A null object will not mutate to start providing real behavior, it will always provide do nothing behavior.
6. Null Object as special Strategy. A Null Object can be a special case of the Strategy pattern [GHJV95, page 315]. Strategy specifies several ConcreteStrategy classes as different approaches for accomplishing a task. If one of those approaches is to consistently do nothing, that ConcreteStrategy is a NullObject. For example, a Controller is a View’s Strategy for handling input, and NoController is the Strategy that ignores all input.
7. Null Object as special State. A Null Object can be a special case of the State pattern [GHJV95, page 305]. Normally, each ConcreteState has some do nothing methods because they’re not appropriate for that state. In fact, a given method is often implemented to do something useful in most states but to do nothing in at least one state. If a particular ConcreteState implements most of its methods to do nothing or at least give null results, it becomes a do nothing state and as such is a Null Object. For example, the state that represents a user who is not logged in allows the user to do nothing but log in, so it is a null state. [Wallingford96]
8. The Null Object class is not a mixin. Null Object is a concrete collaborator class that acts as the collaborator for a client which needs one. The null behavior is not designed to be mixed into an object that needs some do nothing behavior. It is designed for a class which delegates to a collaborator all of the behavior that may or may not be do nothing behavior. [Coplein96]

.

1. Null 객체는 싱글톤입니다. Null 객체 클래스는 종종 싱글톤으로 구현됩니다. Null 객체는 주로 아무 상태를 갖지 않으며, 그 상태는 바꿀 수 없습니다. 즉 여러 인스턴스를 만들어도 똑같은 셈입니다. 여러 개의 똑같은 인스턴스를 사용하는 것보다 단일 인스턴스를 반복적으로 사용하는 것이 낫습니다.
2. 실제 객체의 특별한 null 인스턴스. 결론에서 언급했듯이, null 객체 패턴을 적용하면 하나의 실제 객체 클래스가 AbstractObject, RealObject, Null Object 이렇게 세 가지 클래스로 분화될 수 있습니다. 따라서 원래 서브클래스 없이 RealObject 클래스 하나만으로도 전체 추상 객체 계층을 구현할 수 있는 상태였다 하더라도, NullObject 클래스를 구현하려면 최소한 하나의 서브클래스가 필요하게 됩니다. 이러한 클래스 증식을 방지하는 방법 하나는 AbstractObject의 하위 클래스로 NullObject를 구현하지 않고, RealObject의 특별한 인스턴스를 하나 만들어서 null 객체로 사용하는 것입니다. 이 null 인스턴스의 변수에는 null 값을 넣어줘서, 이로 인해 null 인스터스가 아무것도 하지 않도록 하면 됩니다. 예를 들어 트리 구조에서 비어 있는 리스트를 자식으로 가진 컴포지트 객체는 리프(leaf) 객체처럼 작동하게 됩니다.
3. null 행동에 동의하지 않는 클라이언트가 있는 경우. 만약 몇몇 클라이언트가 null 객체가 한 가지 방법으로만 아무 일도 하지 않기를 기대한다면, 여러 개의 NullObject 클래스가 필요할 수 있습니다. 만약 아무 일도 하지 않는 행동이 런타임에 커스터마이즈되어야 한다면, NullObject 클래스에 탈부착 가능한(pluggable) 변수들을 추가해서 클라이언트가 null 객체의 행동을 명시할 수 있도록 해야 할 것입니다(Adapter pattern의 pluggable adaptors에 대한 논의를 참고하세요). 다시 한 번 강조하자면, 단일 AbstractObject 클래스를 상속받은 NullObject가 폭발적으로 늘어나지 않게 하는 방법은 RealObject를 써서 특별한 인스턴스를 만들거나 하나의 NullObject 서브클래스를 만드는 것입니다. 만약 싱글 null 객체 클래스를 사용한다면, 그 클래스의 구현은 Flyweight 패턴의 예가 될 수 있습니다. 모든 클라이언트가 특정한 null 객체에 기대하는 동작은 flyweight의 내부 동작이 되며, 각 클라이언트가 커스터마이즈하는 동작은 flyweight의 외부 동작이 됩니다.
4. RealObject로의 변환. Null 객체가 RealObject로 변환되지 않도록 해야 합니다. 만약 객체가 아무 동작도 수행하지 않는 것을 중지하고 실제 행동을 시작하기로 결정한다면, 그것은 null 객체가 아닙니다. 그렇게 되면 읽기 전용 모드를 켜고 끌 수 있는 컨트롤러처럼 아무 것도 하지 않는 모드를 가진 실제 객체가 됩니다. 아무 것도 하지 않는 객체에서 실제 객체로 변화할 필요가 있는 단일 객체라면 Proxy Pettern으로 구현하도록 합니다. Proxy가 null 객체를 사용하도록 시작한 다음, 실제 객체를 사용하도록 전환하거나, 아니면 Subject가 없는 경우 proxy에서 아무 행동을 하지 않도록 구현할 수 있습니다.  클라이언트가 null 협력자를 사용하고 있는 것을 알고 있는 경우에는 proxy가 필요하지 않습니다. 이러한 경우 클라이언트는 필요할 때 null 객체를 실제 객체로 교체할 책임을 갖게 됩니다.
5. null 객체는 proxy가 아닙니다. null 객체와 proxy는 사용 면에서 비슷해 보이지만, 두 패턴은 목적이 다릅니다. proxy는 실제 subject에 엑세스할 때 간접 레벨을 제공하여 subject에 대한 엑세스를 컨트롤합니다. 반면 null 협력자는 실제 객체와 실제 객체에 대한 엑세스를 제어하지 않습니다. null 협력자는 실제 객체를 대체할 뿐입니다. 그리고 proxy는 실제 subject처럼 행동하기 시작하도록 변형될 수 있습니다. 그러나 null 객체는 실제 행동을 제공하도록 변형되지 않으며, 항상 아무 것도 하지 않는 행동만을 제공합니다.
6. 특별한 전략으로서의 null 객체. 널 객체는 strategy 패턴의 특이한 케이스로도 볼 수 있습니다. strategy 패턴은 다른 전략을 가진 작업들의 수행을 위해 몇 가지 ConcreteStrategy 클래스를 만드는데, 이 때 아무 것도 하지 않는 전략이 있다면 해당 concreteStrategy는 null 객체라 할 수 있습니다. 예를 들어 Controller는 입력을 처리하기 위한 View의 전략이고, NoController는 모든 입력을 무시하는 View의 전략입니다.
7. Null 객체는 특수한 상태(State)입니다. 즉 null 객체는 State 패턴의 특수한 경우로도 볼 수 있습니다. 일반적으로 각각의 ConcreteState가 적절한 상태가 아닐 경우에는 아무 일도 하지 않는 메소드를 갖곤 하기 때문입니다. 실제로 주어진 메소드는 대부분의 상태에서 무언가 유용한 일을 하지만, 어떤 특정한 상태에서는 아무 일도 하지 않도록 구현되기도 합니다. 특정 콘크리트 State가 아무 것도 하지 않거나 null을 리턴할 목적으로 대부분의 메소드를 구현하면 아무것도 수행하지 않는 것과 다름 없는 상태가 되고 null 객체가 됩니다. 예를 들어 로그인하지 않은 사용자를 표현하는 상태에서 사용자는 로그인만 할 수 있으므로, null 상태라 할 수 있습니다.
8. null 객체 클래스는 믹스인이 아닙니다. null 객체는 클라이언트를 위한 협력자 역할을 하는 콘크리트 협력자 클래스입니다. null 동작은 아무 일도 하지 않는 동작이 필요한 객체와 믹스되도록 설계되지 않았습니다. null 객체는 아무런 동작도 하지 않을 수 있는 모든 동작을 협력자에게 위임하는 클래스를 위해 설계되었습니다.

### Simple Code

**간단한 예제 코드**

> For an example implementation of the Null Object pattern, let’s look at the implementation of the NullScope class in VisualWorks Smalltalk (described in the Known Uses).  
NullScope is a special class in the NameScope hierarchy. A NameScope knows how to search for a variable with a particular name (variableAt:from:), an undeclared variable (undeclared:from:), and iterate through its variables (namesAndValuesDo:). (The way these messages get passed from one scope to the next is an example of the Chain of Responsibility pattern [GHJV95, page 223].)

널 객체 패턴의 예제로, VisualWorks Smalltalk에서의 NullScope 클래스 구현을 살펴봅시다.

`NullScope`는 `NameScope` 계층의 특수한 클래스입니다. `NameScope`는 이름을 가진 변수(`variableAt:from:`), 선언하지 않은 변수(`undeclared:from:`)를 찾는 방법을 알고 있으며, 자신의 변수들을(`namesAndValuesDo:`)를 순회하며 찾는 방법도 알고 있습니다. (이렇게 메시지가 어느 스코프에서 다음 스코프로 전달되는 기법은 Chain of Responsibility 패턴의 예라 할 수 있습니다.)

```smalltalk
Object ()
    NameScope (outerScope)

NameScope>>variableAt:from:
    ^self subclassResponsibility

NameScope>>undeclared:from:
    ^outerScope undeclared: name from: varNode

NameScope>>namesAndValuesDo:
    self subclassResponsibility
```

> A StaticScope represents the scope for class and global variables. A LocalScope represents the scope for instance variables and method variables. They implement variableAt:from: and namesAndValuesDo: in a pretty straightforward manner that is essentially the same for both classes.

`StaticScope`는 클래스와 전역 변수의 스코프를 나타냅니다.
`LocalScope`는 인스턴스 변수와 메소드 변수의 스코프를 나타냅니다.
이 스코프들은 각자 두 클래스의 핵심인 `variableAt:from:`과 `namesAndValuesDo:`를 간단하게 구현합니다.

```smalltalk
Object ()
    NameScope (outerScope)
        LocalScope (...)
        StaticScope (...)

LocalScope>>variableAt:from:
    "find and return the variable, or"
    "변수를 찾아 리턴한다. 또는,"
    ^outerScope variableAt: name from: varNode

LocalScope>>namesAndValuesDo:
    "iterate through the receiver's variables, then"
    "수신자의 변수들을 순회한다. 그리고"
    outerScope namesAndValuesDo: aBlock
```

> A NullScope represents the outermost scope. This is either the most global scope's outer scope or the outer scope for a clean or copy block (a block that does not have an outer context). It inherits the instance variable outerScope but never uses it. It never contains the declarations for any variables, so its code is pretty simple.

`NullScope`는 가장 바깥쪽의 스코프를 나타냅니다. 이 스코프는 전역 스코프의 가장 바깥쪽 스코프이거나 clean 또는 copy block(외부 컨텍스트가 없는 블록)의 바깥쪽 스코프입니다.
이 스코프는 `outerScope` 변수의 인스턴스를 상속받고는 있지만 절대 사용하지는 않습니다.
어떤 변수의 선언도 포함하고 있지 않기 때문에 코드가 아주 심플합니다.

```smalltalk
Object ()
    NameScope (outerScope)
        LocalScope (...)
        NullScope ()
        StaticScope (...)

NullScope>>variableAt:from:
    "There are no definitions here."
    "어떤 변수의 선언도 여기에는 없음"
    ^nil

NullScope>>namesAndValuesDo:
    "Do nothing"
    "아무 것도 하지 않는다"
```

> What is most interesting about NullScope is how it implements undeclared:from:. NameScope just passes the request to its outer scope. StaticScope and LocalScope inherit this implementation. So none of those classes do anything. But NullScope implements the method to return the variable from the dictionary of undeclared variables.

`NullScope`에서 가장 흥미로운 것은 `undeclared:from:`의 구현입니다.
`NameScope`는 리퀘스트를 자신의 외부 스코프로 전달하기만 합니다. 그리고 `StaticScope`와 `LocalScope`는 이 구현을 상속받습니다.
따라서 이 클래스들은 아무 일도 하지 않습니다(전달만 합니다). 그러나 `NullScope`는 선언되지 않은 변수들의 딕셔너리에서 변수를 찾아 리턴하도록 구현되어 있습니다.

```smalltalk
NullScope>>undeclared:from:
    "Find the variable in Undeclared and return it.
    If the variable is not in Undeclared, add it
    and return it."
    "Undeclared에서 변수를 찾아 리턴한다.
    만약 그 변수가 Undeclared에 없다면, Undeclared에 등록한 다음 리턴한다"
```

> This is how variables become undeclared: If variableAt:from: fails to find the variable in any of the scopes, the client calls undeclared:from: to find it in Undeclared. If it isn’t already in Undeclared, it gets added. The hierarchy should encapsulate this decision and hide it from the client by implementing NullScope>>variableAt:from: to send undeclared:from:, but the NullScope can’t do that without knowing the scope that the search originally started from.  
Notice how NullScope factors the special code out of the real NameScope classes (StaticScope and LocalScope) and encapsulates them into NullScope. This avoids special tests, makes the difference between the general behavior (in NameScope) and the special behavior (in NullScope) easy to see, and makes the special behavior easy to reuse.

이것이 바로 변수들이 `undeclared:`로 등록되는 방법입니다. 만약 `variableAt:from:`이 모든 스코프에서 변수를 찾아봤는데도 찾지 못했다면, 클라이언트는 `undeclared:from:`을 호출하여 `Undeclared`에서 찾으려 합니다. 그리고 만약 `Undeclared`에 그 변수가 없다면 `Undeclared`에 그 변수가 추가되는 것입니다. 이 계층 구조는 이러한 결정을 캡슐화하여(`NullScope>>variableAt:from:`이 `undeclared:from:`로 요청을 보내도록 구현하는 방식으로), 클라이언트에게 숨깁니다. 그러나 `NullScope`는 검색이 어디에서부터 시작되었는지를 모르면 이런 일을 할 수 없습니다.

`NullScope`가 실제 `NameScope` 클래스(`StaticScope`와 `LocalScope`)에서 특별한 코드를 사용해 `NullScope`로 캡슐화하는 방법에 주목합시다. 이렇게 하면 특수한 테스트를 피하고, 일반적인 동작(`NameScope`)과 특수 동작(`NullScope`)과의 차이점을 쉽게 관찰할 수 있게 만들며, 재사용이 쉬워집니다.

### Known Uses

**잘 알려진 사용예**

#### NoController

> NoController, the Null Object class in the motivating example, is a class in the Controller hierarchy of VisualWorks Smalltalk. [VW95]

VisualWorks Smalltalk의 Controller 계층에 있는 `NoController`.

#### NullDragMode

> NullDragMode is a class in the DragMode hierarchy in VisualWorks Smalltalk. A DragMode is used to implement placement and dragging of visuals in the window painter. Subclasses represent different ways that dragging that can be done. (The DragMode hierarchy is an example of the Strategy pattern [GHJV95, page 315].) For example, an instance of CornerDragMode represents that one of the visual's resize handles is being dragged, so the visual should stay in the same place but its size should change. Alternatively, a SelectionDragMode means that the entire visual is being dragged, so its size should remain fixed but its position should follow the mouse.  
A NullDragMode is a counterpart to CornerDragMode that represents an attempt to resize a visual that cannot be resized (such as a text label, whose fixed size is determined by the characters it contains and their font size). The various drag modes implement a method, dragObject:startingAt:inController:, which processes the dragging motion of the mouse. It uses a block to control how the dragging is done. In NullDragMode, this method uses an empty block that does nothing. Thus a NullDragMode responds to the mouse’s drag motions by doing nothing. [VW95]

`NullDragMode`는 VisualWorks Smalltalk의 `DragMode` 계층에 있는 클래스입니다. `DragMode`는 윈도우 그림판(painter)의 비주얼 아이템 배치와 마우스 드래그를 구현하는 데 사용됩니다. 서브클래스들은 드래그를 처리하는 다양한 방법들을 표현합니다(`DragMode` 계층구조는 스트레티지 패턴의 예가 될 수 있습니다). 예를 들어 `CornerDragMode`의 인스턴스는 비주얼 아이템의 사이즈 조절 손잡이를 마우스로 잡아 끌고 있다는 것을 의미합니다. 따라서 비주얼 아이템의 위치는 고정되어 있지만 크기는 바뀌어야 합니다. `SelectionDragMode`는 전체 비주얼 아이템을 드래그하는 것을 의미합니다. 즉 크기는 고정되어 있지만 위치는 마우스를 따라 이동하게 됩니다.

`NullDragMode` 기능은 비주얼 아이템의 크기를 조절하는 `CornerDragMode`와 상충됩니다.
`NullDragMode`는 크기 조절이 안 되는 비주얼 아이템(예: 폰트 사이즈와 텍스트의 길이에 따라 크기가 결정되는 텍스트 레이블)을 나타내기 때문입니다. 다양한 드래그 모드들이 마우스의 드래그 동작을 처리하는 `dragObject:startingAt:inController:` 메소드를 구현합니다. 그리고 이 모드들은 모두 마우스를 드래그할 때 나오는 네모를 사용해 작업을 처리합니다. 하지만 `NullDragMode`의 이 메소드만은 아무 일도 하지 않는 비어 있는 네모를 사용하여, `NullDragMode`는 마우스의 드래그 움직임에 대해 아무 일도 하지 않는 것으로 응답하게 됩니다.

#### NullInputManager

> NullInputManager is a class in the InputManager hierarchy is VisualWorks Smalltalk. An InputManager provides a platform-neutral, object interface to platform events that may affect the handling of internationalized (foreign language) input. (Since it wraps the platform resources to give them a standard object interface, this is an example of the Adapter pattern [GHJV95, page 142].) Subclasses such as X11InputManager represent specific platforms. NullInputManager represents platforms which don’t support internationalization. The methods it implements do little if anything whereas their counterparts is X11InputManager do real work. [VW95]

`NullInputManager`는 VisualWorks Smalltalk의 InputManager 계층에 있는 클래스입니다. `InputManager`는 플랫폼 중립적인 객체 인터페이스를 제공하여 국제화(외국어) 입력 처리를 핸들링할 수 있습니다(이 방식은 플랫폼 리소스를 래핑하여 표준적인 객체 인터페이스를 제공하므로, Adapter 패턴의 한 예라 할 수 있습니다). `X11InputManager`와 같은 서브클래스는 특정 플랫폼을 나타내는데, `NullInputManager`는 국제화를 지원하지 않는 플랫폼을 나타냅니다. `X11InputManager`가 구현하는 메소드는 실제로 작동하지만, `NullInputManager`가 구현하는 메소드는 아무것도 하지 않습니다.

#### NullScope

> NullScope is a class in the NameScope hierarchy is VisualWorks Smalltalk. A NameScope represents the scope of a particular set of variables. What kind of variable it is (global, class level, or method level) defines what kind of NameScope it will use. For example, a StaticScope is assigned to global and class variables and a LocalScope is assigned to instance and temporary variables. Every scope has an outer scope. This is used to access variables whose scope is greater than the current level. It allows the compiler to warn the programmer if he is declaring a variable with the same name as another variable which has already been declared (usually in an outer scope). Thus NameScopes form a tree, with the global scope at the root and branches for class scopes that contain branches for method scopes.
However, since all scopes have an outer scope, what is the global scope’s outer scope? It is a NullScope, a scope which never contains any variables. When looking for a variable declaration, each scope keeps looking in its outer scope until either it finds the declaration or until it hits a NullScope. NullScope knows to stop the search and answer that the variable apparently has not been declared (within the scope of the code that initiated the search). This could be handled as a special case in StaticScope, that if it is the global scope, then it should expect its outer scope to be nil, but the special case is coded more cleanly in the special class NullScope. This allows NullScope to be reused by clean and copy blocks, ones which are so simple that they have no outer scope. NullScope is implemented as a Singleton because the system never needs more than one instance [GHJV95, page 127]. [VW95]

`NullScope`는 VisualWorks Smalltalk의 `NameScope` 계층에 있는 클래스입니다. `NameScope`는 특정 변수 집합의 스코프를 의미합니다. 어떤 변수(global, class level, method level)이건 간에 `NameScope`를 정의해야 합니다. 예를 들어, `StaticScope`는 전역 및 클래스 변수에 할당에 쓰이고, `LocalScope`는 인스턴스 및 임시 변수 할당에 쓰입니다. 한편 모든 스코프는 외부 범위의 스코프를 갖고 있는데, 이것은 현재 스코프보다 더 높은 레벨의 변수에 엑세스하는 데에 사용됩니다. 먼저 (보통 바깥쪽 스코프에서) 선언된 다른 변수와 겹치는 이름을 갖는 변수를 선언하면 컴파일러가 프로그래머에게 경고를 주곤 하는데, 이 기능을 통해 가능한 것입니다. `NameScope`는 루트와 메소드 스코프/클래스 스코프/전역 스코프를 브랜치로 갖는 트리 형태를 갖습니다. 

그런데 모든 스코프에는 외부 스코프가 있다고 했습니다. 그렇다면 전역 스코프의 외부 스코프는 무엇일까요?
그것은 바로 `NullScope`이며, `NullScope`는 어떠한 변수도 갖고 있지 않습니다.
변수 선언을 탐색할 때 각 스코프는 `NullScope`에 도달할 때까지 스코프를 넘어가며 탐색을 수행합니다.
`NullScope`는 검색을 중지하고 (검색을 시작한 코드부터의 스코프 내에서는) 해당 변수가 선언되지 않았다고 응답하게 됩니다. 이런 방식은 전역 스코프인 경우 `StaticScope`에서는 특수한 케이스로 처리될 수 있습니다. 전역 스코프라면 외부 스코프를 nil로 기대하게 되는데, 이 특별한 케이스는 특수 클래스인 `NullScope`을 쓰기 때문에 더 명확하게 코딩됩니다.
이를 통해 `NullScope`를 외부 스코프가 없는 매우 간단한 clean과 copy 블록으로 재사용할 수 있습니다.
`NullScope`의 인스턴스는 시스템이 두 개 이상 필요로 하지 않기 때문에 싱글톤으로 구현됩니다.

#### NullLayoutManager

> The LayoutManager hierarchy in the Java AWT toolkit does not have a null object class but could use one such as NullLayout. A Container can be assigned a LayoutManager (an example of the Strategy pattern [GHJV95, page 315]). If a particular Container does not require a LayoutManager, the variable can be set to nil. Unfortunately, this means that Container’s code is cluttered with lots of checks for a nil LayoutManager. Container’s code would be simpler if it used a null object like NullLayoutManager instead of nil. [Gamma96]

Java AWT 툴킷의 `LayoutManager` 계층에는 null 객체 클래스가 없지만, `NullLayout`이라 할 수 있는 것이 있습니다.
하나의 Container는 `LayoutManager`에 할당할 수 있는데(Strategy 패턴의 예), 특정 Container에 `LayoutManager`가 필요하지 않다면 변수를 nil로 설정할 수 있습니다. 안타깝게도 이것은 Container의 코드가 LayoutManager가 nil인지 아닌지 체크하는 코드들로 복잡해지는 것을 의미합니다. Container 코드는 nil 대신 `NullLayoutManager`와 같은 null 객체를 사용하면 더 단순해질 수 있습니다.

#### Null_Mutex

> The Null_Mutex class is a mutual exclusion mechanism in the ASX (ADAPTIVE Service eXecutive) framework implemented in C++. The framework provides several mechanisms (e.g., Strategies [GHJV95, page 315]) for concurrency control. The Mutex class defines a non-recursive lock for a thread that will not call itself while the lock is established. The RW_Mutex class defines a lock that allows multiple simultaneous threads for reading but only one thread during a write. The Null_Mutex class defines a lock for a service that is always run in a single thread and does not contend with other threads. Since locking is not really necessary, Null_Mutex doesn’t really lock anything; its acquire and release methods do nothing. This avoids the overhead of acquiring locks when they’re not really needed. [Schmidt94]

`Null_Mutex` 클래스는 C++로 구현된 ASX(ADAPTIVE Service eXecutive) 프레임워크의 상호 배제 메커니즘입니다.
이 프레임워크는 동시성 제어를 위한 몇 가지 메커니즘(Strategy 패턴)을 제공합니다.
`Mutex` 클래스는 잠금이 설정된 동안 자기 자신을 호출하지 않는 스레드에 대해 비-재귀적인 잠금을 정의합니다.
`RW_Mutex` 클래스는 읽기 작업에 대해 여러 개의 동시 스레드를 허용하고 쓰기 작업은 하나의 스레드만 허용하는 잠금을 정의합니다.
`Null_Mutex` 클래스는 항상 싱글 스레드에서 실행되고 다른 스레드와 충돌하지 않는 서비스에 대한 잠금을 정의합니다.
`Null_Mutex`의 잠금은 필요한 것이 아니기 때문에 `Null_Mutex`는 실제로는 아무것도 잠그지 않습니다.
잠금과 릴리즈 메소드가 아무것도 하지 않는 것입니다. 이 방법으로 인해 실제로는 쓸모없는 잠금이 획득되는 오버헤드를 피할 수 있게 됩니다.

#### Null Lock

> Null Lock is a type of lock mode (e.g., State [GHJV95, page 305]) in VERSANT Object Database Management System. Three of the lock modes VERSANT uses are write lock, read lock, and null lock. Write lock blocks other write locks and read locks on the same object so that no one else can read or change the object while you’re changing it. Read lock blocks write locks but allows other read locks so that other people can read the object while you’re reading it but they can’t change it.
Null lock does not block other locks and cannot be blocked by other locks. Thus it guarantees you immediate access to the object, even if someone else has already locked it, but it does not guarantee you that the object will be in a consistent state when you access it. Null lock is not really a lock because it doesn’t perform any locking, but it acts like a lock for operations that require some type of lock. [Versant95]

null 잠금은 VERSANT Object Database Management System의 잠금 모드 유형입니다(State 패턴).
VERSANT의 세 가지 잠금 모드는 쓰기 잠금, 읽기 잠금, null 잠금 입니다.
쓰기 잠금은 대상 객체에 대해 다른 쓰기 잠금들과 읽기 잠금들을 차단하여, 변경이 일어나는 동안 다른 누군가가 객체를 읽거나 수정을 하는 것을 막아줍니다.
읽기 잠금은 쓰기 잠금을 차단하지만 다른 읽기 잠금은 허용하여, 다른 누군가가 객체를 읽을 수는 있지만 수정을 하지는 못하게 합니다.
null 잠금은 다른 잠금을 차단하지 않으며, 다른 잠금에 의해서도 차단되지 않습니다.
따라서 누군가가 이미 잠금을 한 경우에도 객체에 엑세스할 수 있지만 대상 객체의 상태가 일관성있다는 보장을 하지는 못합니다.
null 잠금은 잠금을 하지 않기 때문에 실제로는 잠금이 아니라 할 수 있습니다.
그러나 잠금 타입이 필요한 경우에는 마치 잠금처럼 행동합니다.

#### NullIterator

> The Iterator pattern documents a special case called NullIterator [GHJV95, pages 67-68 and 262]. Each node in a tree might have an iterator for its children. Composite nodes would return a concrete iterator, but leaf nodes would return an instance of NullIterator. A NullIterator is always done with traversal; when asked isDone, it always returns true. In this way a client can always use an iterator to iterate over the nodes in a structure even when there are no more nodes.

Iterator 패턴에는 `NullIterator`라는 특수한 사례가 있습니다.
트리의 각 노드에는 자식 노드에 대한 반복자가 있을 수 있습니다.
콤포지트 노드는 콘크리트 반복자를 리턴하지만, 리프 노드는 `NullIterator` 인스턴스를 리턴합니다.
`NullIterator`는 순회의 마지막입니다. `isDone`이 요청되면 `NullIterator`는 항상 `true`를 리턴합니다.
이런 방식으로 클라이언트는 더 이상의 노드가 없는 경우에도 반복자를 사용하여
트리 구조의 노드를 반복할 수 있습니다.

#### Z-Node

> Procedural languages have null data types that are like null objects. Sedgewick’s z-node is a dummy node that is used as the last node in a linked list. When a tree node requires a fixed number of child nodes but does not have enough children, he uses z-nodes as substitutes for the missing children. In a list, the z-node protects the delete procedure from needing a special test for deleting an item from an empty list. In a binary tree, a node without two children would need one or two null links, but the null z-node is used instead. This way a search algorithm can simply skip z-node branches; when it has run out of non- z-node branches, it knows the search did not find the item. In this way, z-nodes are used to avoid special tests the way null objects are. [Sedge88]

절차 언어에는 null 객체와 같은 null 데이터 타입이 있습니다. Sedgewick의 z-node는 링크드 리스트의 마지막 노드로 사용되곤 하는 더미 노드입니다. 트리 노드에 고정된 수의 자식 노드가 필요할 때 자식의 수가 부족하다면, z-node들을 사용해 부족한 자식 노드를 대신합니다. 리스트에서의 z-node는 비어 있는 리스트에서 아이템을 삭제할 때 특수한 검사가 필요하지 않게 하는 방식으로 삭제 프로시저를 보호합니다. 이진 트리에서 자식이 둘 다 없는 노드에는 1~2 개의 null 링크가 필요하지만, z-node를 null 대신 사용할 수 있습니다. 이렇게 하면 탐색 알고리즘이 z-node 브랜치를 간단하게 건너뛸 수 있습니다.
z-node가 아닌 브랜치를 모두 탐색했다면, 탐색을 통해 원하는 아이템을 찾지 못했다는 것입니다.
이런 식으로 z-node는 null 객체와 같은 방법으로 특수한 테스트를 회피하는 데에 사용됩니다.

#### NULL Handler

> The Decoupled Reference pattern shows how to access objects via Handlers so that their true location is hidden from the client. When a client requests an object that is no longer available, rather than let the program crash, the framework returns a NULL Handler. This Handler acts like other Handlers but fulfills requests by raising exceptions or causing error conditions. [Weibel96]

Decoupled Reference 패턴은 클라이언트로부터 실제 위치를 숨기는 핸들러를 통해 객체에 엑세스하는 방법을 보여줍니다.
클라이언트가 유효하지 않은 객체를 요청하면 프로그램이 크래쉬 상태로 빠지는 것이 아니라, 프레임워크가 null 핸들러를 리턴합니다. 이 핸들러는 다른 핸들러랑 비슷하게 작동하지만 예외나 에러 조건을 발생시키는 방식으로 리퀘스트를 처리합니다.

### Related Patterns

**관련 패턴**

> The NullObject class can usually be implemented as a Singleton [GHJV95, page 127] since multiple instances would act exactly the same and have no internal state that could change.  
When multiple null objects are implemented as instances of a single NullObject class, they can be implemented as Flyweights [GHJV95, page 195].  
NullObject is often used as one class in a hierarchy of Strategy classes [GHJV95, page 315]. It represents the strategy to do nothing.  
NullObject is often used as one class in a hierarchy of State classes [GHJV95, page 305]. It represents the state in which the client should do nothing.  
NullObject can be a special kind of Iterator [GHJV95, page 257] which doesn’t iterate over anything.  
NullObject may be a special class in a hierarchy of Adapters [GHJV95, page 142]. Whereas an adapter normally wraps another object and converts its interface, a null adapter would pretend to wrap another object without actually wrapping anything.  
Bruce Anderson has also written about the Null Object pattern, which he also refers to as “Active Nothing.” [Anderson95]  
NullObject is a special case of the Exceptional Value pattern in The CHECKS Pattern Language [Cunningham95]. An Exceptional Value is a special Whole Value (another pattern) used to represent exceptional circumstances. It will either absorb all messages or produce Meaningless Behavior (another pattern). A NullObject is one such Exceptional Value.

`NullObject` 클래스는 일반적으로 싱글톤으로 구현됩니다. 여러 인스턴스가 똑같이 작동하고, 내부 상태 변경이 없기 때문입니다.

여러 null 객체가 단일 `NullObject` 클래스의 인스턴스로 구현된 경우, Flyweight 패턴을 적용해 구현할 수 있습니다.

`NullObject`는 Strategy 클래스 계층에서 아무것도 하지 않는 전략을 나타내는 하나의 클래스로 사용되는 경우가 많습니다.

`NullObject`는 아무것도 반복하지 않는 특수한 종류의 반복자일 수 있습니다.

`NullObject`는 Adapter 계층의 특수한 클래스일 수 있습니다. 어댑터는 일반적으로 다른 객체를 랩핑하고 해당 인터페이스를 변환하는 반면, null 어댑터는 실제로는 래핑을 하지 않고 다른 객체를 래핑하는 것처럼 가장합니다.

Bruce Anderson은 Null 객체 패턴에 대해 글을 쓴 바 있는데, 그 글에서는 "Active nothing"이라는 이름으로 언급됩니다.

`NullObject`는 CHECKS 패턴 언어의 Exceptional Value 패턴의 특수한 경우입니다. Exceptional Value는 예외적인 상황을 나타내는 데 사용되는 특별한 Wole Value(다른 패턴)입니다. 그것은 모든 메시지를 흡수하거나 Meaningless Behavior(다른 패턴)을 생성합니다. `NullObject`는 그러한 Exceptional Value 중의 하나에 해당됩니다.

## 참고문헌

* 웹 문서
    * [The Null Object Pattern by Bobby Woolf 1996][pdf]
* 도서
    * 클린 소프트웨어 / 로버트 C. 마틴 저 / 이용원, 김정민, 정지호 공역 / 제이펍 / 초판 1쇄 2017년 05월 15일 / 원제 : Agile Software Development, Principles, Patterns, and Practices
    * 리팩토링 / 마틴 파울러 저 / 김지원 역 / 한빛미디어 / 초판 2쇄 2013년 03월 07일 / 원서 : Refactoring (Addison-Wesley Professional; 1 edition, 1999)
    * 테스트 주도 개발 / 켄트 벡 저 / 김창준, 강규영 공역 / 인사이트(insight) / 초판 1쇄 2005년 01월 02일 / 원제 : Test-Driven Development By Example
    * 이펙티브 자바 Effective Java 3/E / 조슈아 블로크 저/개앞맵시(이복연) 역 / 인사이트(insight) / 초판 2쇄 2018년 11월 21일

## 주석

[pdf]: https://www.cs.oberlin.edu/~jwalker/refs/woolf.ps
[^clean]: 클린 소프트웨어. CHAPTER 17. 245쪽.
[^fowler0]: 리팩토링. Null 검사를 널 객체에 위임. 310쪽.
[^kent-null-object]: 테스트 주도 개발. 30장. 274쪽.
[^effective-325]: 이펙티브 자바. 아이템 54. 325쪽.

