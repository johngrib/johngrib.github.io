---
layout  : wiki
title   : 빌더 패턴(Builder Pattern)
summary : 객체의 생성 방법과 표현 방법을 분리한다
date    : 2018-02-12 08:18:46 +0900
updated : 2021-10-16 16:34:07 +0900
tag     : pattern
resource: 28/8D0CB8-8125-483C-9C40-5BA23E68C4DB
toc     : true
public  : true
parent  : [[pattern]]
latex   : false
---
* TOC
{:toc}

- GoF 스타일의 빌더 패턴을 예제 코드를 통해 빠르게 이해하고 싶다면 이 문서 아래쪽의 [Text와 Html을 빌드하는 에제]( #사례-text와-html을-빌드하는-예제 )가 이해하기 쉬우니 참고할 것.

## 개요

빌더 패턴(Builder Pattern)은 객체를 생성할 때 흔하게 사용하는 패턴이다.

자바로 코딩할 때 다음과 같은 스타일로 객체를 생성하는 코드가 있다면, 빌더 패턴을 사용했다고 추측할 수 있다.

```java
Member customer = Member.build()
    .name("홍길동")
    .age(30)
    .build();
```

나는 회사에서 업무용 코드를 통해 빌더 패턴을 처음 접했다.

그리고 다음의 두 책을 통해 좀 더 자세히 알게 되었다.

* [[GoF-Design-Pattern]] : 소프트웨어 디자인 패턴의 원조라 할 수 있는 책.
* 이펙티브 자바(Effective Java) : 조슈아 블로흐가 직접 쓴 자바 코딩 스타일 책.

그런데 두 책에서 다루고 있는 빌더 패턴의 설명이 좀 다르다.

* 이펙티브 자바의 빌더 패턴
    * GoF의 빌더 패턴보다 좀 더 코딩 위주의 활용법을 설명한다.
        * 코드 읽기/유지보수가 편해지므로 빌더 패턴을 쓰라고 한다.
    * GoF가 책을 썼을 때에는 상대적으로 덜 중요했던 객체 일관성, 변경 불가능성 등의 특징을 설명한다.
* GoF의 빌더 패턴
    * 객체의 생성 알고리즘과 조립 방법을 분리하는 것이 목적이다.

두 책의 관점이 다르고, 이펙티브 자바(2001년)가 GoF의 디자인 패턴(1994년)보다 나중에 나왔기 때문인 것 같다.

한편 함께 살펴봐야 할 패턴 중 lombok의 `@Builder`를 사용하는 기법이 있다.

이 기법은 이펙티브 자바 스타일의 빌더 패턴을 더 쉽게 사용할 수 있도록 고안된 것인데 단점이 뚜렷하므로 주의해서 사용해야 하지만,
named parameter를 지원하지 않는 Java에서 생성자를 호출할 때 각 parameter에 이름을 붙여 넘겨주는 느낌으로 사용할 수 있다는 장점이 있다.

그러나 이러한 방식의 사용은 GoF의 빌더 패턴의 의도와는 차이가 있으므로 커뮤니케이션할 때 "빌더 패턴"이라는 명칭을 사용하려 한다면 주의를 기울일 필요가 있다.

lombok의 `@Builder`를 통해 빌더 패턴을 접했다면 GoF의 빌더 패턴이 신기하면서도 생소하게 느껴질 수 있다.

따라서 이 문서는 다음과 같은 순서로 빌더 패턴을 비교하며 설명한다.

- Effective Java의 빌더 패턴을 소개한다.
- lombok의 `@Builder`를 소개한다.
- GoF의 빌더 패턴을 소개하고, 위의 두 방식과의 차이점을 알아본다.


## Effective Java의 빌더 패턴

>
- 규칙 2. 생성자 인자가 많을 때는 Builder 패턴 적용을 고려하라 (2판)
- 아이템 2. 생성자에 매개변수가 많다면 빌더를 고려하라 (3판)

이펙티브 자바에서 말하는 빌더 패턴은 객체 생성을 깔끔하고 유연하게 하기 위한 기법이다.

책의 내용 전개를 요약해 소개하자면 다음과 같다.

* 객체 생성을 깔끔하게
    * 점층적 생성자 패턴(telescoping constructor pattern) 소개
    * 점층적 생성자 패턴의 대안으로 자바빈 패턴 소개
    * 자바빈 패턴의 대안으로 빌더 패턴 소개
* 객체 생성을 유연하게
    * 빌더 인터페이스를 작성하여 다양한 빌더를 사용하는 방법 소개

### 객체 생성을 깔끔하게

#### 점층적 생성자 패턴

점층적 생성자 패턴을 만드는 방법은 다음과 같다.

1. 필수 인자를 받는 **필수** 생성자를 하나 만든다.
2. 1 개의 선택적 인자를 받는 생성자를 추가한다.
3. 2 개의 선택적 인자를 받는 생성자를 추가한다.
4. ...반복
5. 모든 선택적 인자를 다 받는 생성자를 추가한다.

```java
// 점층적 생성자 패턴 코드의 예 : 회원가입 관련 코드
public class Member {

    private final String name;      // 필수 인자
    private final String location;  // 선택적 인자
    private final String hobby;     // 선택적 인자

    // 필수 생성자
    public Member(String name) {
        this(name, "출신지역 비공개", "취미 비공개");
    }

    // 1 개의 선택적 인자를 받는 생성자
    public Member(String name, String location) {
        this(name, location, "취미 비공개");
    }

    // 모든 선택적 인자를 다 받는 생성자
    public Member(String name, String location, String hobby) {
        this.name = name;
        this.location = location;
        this.hobby = hobby;
    }
}
```

##### 장점

`new Member("홍길동", "출신지역 비공개", "취미 비공개")` 같은 호출이 빈번하게 일어난다면, `new Member("홍길동")`로 대체할 수 있다.

##### 단점

* 다른 생성자를 호출하는 생성자가 많으므로, 인자가 추가되는 일이 발생하면 코드를 수정하기 어렵다.
* 코드 가독성이 떨어진다.
    * 특히 인자 수가 많을 때 호출 코드만 봐서는 의미를 알기 어렵다.

```java
// 호출 코드만으로는 각 인자의 의미를 알기 어렵다.
NutritionFacts cocaCola = new NutritionFacts(240, 8, 100, 3, 35, 27);
NutritionFacts pepsiCola = new NutritionFacts(220, 10, 110, 4, 30);
NutritionFacts mountainDew = new NutritionFacts(230, 10);
```

#### 자바빈 패턴

따라서 이에 대한 대안으로 자바빈 패턴(JavaBeans pattern)을 소개한다.

이 패턴은 `setter`메서드를 이용해 생성 코드를 읽기 좋게 만드는 것이다.

```java
NutritionFacts cocaCola = new NutritionFacts();
cocaCola.setServingSize(240);
cocaCola.setServings(8);
cocaCola.setCalories(100);
cocaCola.setSodium(35);
cocaCola.setCarbohdydrate(27);
```

##### 장점

* 이제 각 인자의 의미를 파악하기 쉬워졌다.
* 복잡하게 여러 개의 생성자를 만들지 않아도 된다.

##### 단점

* 객체 일관성(consistency)이 깨진다.
    * 1회의 호출로 객체 생성이 끝나지 않았다.
    * 즉 한 번에 생성하지 않고 생성한 객체에 값을 떡칠하고 있다.
* `setter` 메서드가 있으므로 변경 불가능(immutable)클래스를 만들 수가 없다.
    * 스레드 안전성을 확보하려면 점층적 생성자 패턴보다 많은 일을 해야 한다.

#### 빌더 패턴(Effective Java 스타일)

```java
// Effective Java의 Builder Pattern
public class NutritionFacts {
    private final int servingSize;
    private final int servings;
    private final int calories;
    private final int fat;
    private final int sodium;
    private final int carbohydrate;

    public static class Builder {
        // Required parameters(필수 인자)
        private final int servingSize;
        private final int servings;

        // Optional parameters - initialized to default values(선택적 인자는 기본값으로 초기화)
        private int calories      = 0;
        private int fat           = 0;
        private int carbohydrate  = 0;
        private int sodium        = 0;

        public Builder(int servingSize, int servings) {
            this.servingSize = servingSize;
            this.servings    = servings;
        }

        public Builder calories(int val) {
            calories = val;
            return this;    // 이렇게 하면 . 으로 체인을 이어갈 수 있다.
        }
        public Builder fat(int val) {
            fat = val;
            return this;
        }
        public Builder carbohydrate(int val) {
            carbohydrate = val;
            return this;
        }
        public Builder sodium(int val) {
            sodium = val;
            return this;
        }
        public NutritionFacts build() {
            return new NutritionFacts(this);
        }
    }

    private NutritionFacts(Builder builder) {
        servingSize  = builder.servingSize;
        servings     = builder.servings;
        calories     = builder.calories;
        fat          = builder.fat;
        sodium       = builder.sodium;
        carbohydrate = builder.carbohydrate;
    }
}
```

위와 같이 하면 다음과 같이 객체를 생성할 수 있다.

```java
NutritionFacts.Builder builder = new NutritionFacts.Builder(240, 8);
builder.calories(100);
builder.sodium(35);
builder.carbohydrate(27);
NutritionFacts cocaCola = builder.build();
```

또는 다음과 같이 사용할 수도 있다.

```java
// 각 줄마다 builder를 타이핑하지 않아도 되어 편리하다.
NutritionFacts cocaCola = new NutritionFacts
    .Builder(240, 8)    // 필수값 입력
    .calories(100)
    .sodium(35)
    .carbohydrate(27)
    .build();           // build() 가 객체를 생성해 돌려준다.
```

##### 장점

* 각 인자가 어떤 의미인지 알기 쉽다.
* `setter` 메소드가 없으므로 변경 불가능 객체를 만들 수 있다.
* 한 번에 객체를 생성하므로 객체 일관성이 깨지지 않는다.
* `build()` 함수가 잘못된 값이 입력되었는지 검증하게 할 수도 있다.

#### Lombok @Builder

이런 스타일의 빌더 패턴이라면 롬복의 `@Builder` 애노테이션으로 쉽게 사용할 수 있다.

다음과 같이 클래스 또는 생성자에 `@Builder` 애노테이션을 붙여주면 이펙티브 자바 스타일과 비슷한 빌더 패턴 코드가 빌드된다.

```java
@Builder
public class NutritionFacts {
    private final int servingSize;
    private final int servings;
    private final int calories;
    private final int fat;
    private final int sodium;
    private final int carbohydrate;
}
```

또는 다음과 같이 생성자에 `@Builder`를 붙여줄 수도 있다.

```java
public class NutritionFacts {
    private final int servingSize;
    private final int servings;
    private final int calories;
    private final int fat;
    private final int sodium;
    private final int carbohydrate;

    @Builder
    public NutritionFacts(int servingSize, int servings, int calories, int fat, int sodium, int carbohydrate) {
        this.servingSize = servingSize;
        this.servings = servings;
        // ...
    }
}
```

사용은 다음과 같이 할 수 있다.

```java
NutritionFacts.NutritionFactsBuilder builder = NutritionFacts.builder();
builder.calories(230);
builder.fat(10);
NutritionFacts facts = builder.build();
```

물론 `.`체인도 된다.

```java
NutritionFacts facts = NutritionFacts.builder()
    .calories(230)
    .fat(10)
    .build();
```

##### 주의할 점: 클래스 선언부에 @Builder를 사용하지 말 것

`@Builder`를 클래스에 달아주면 `@AllArgsConstructor`도 같이 달아주는 것과 같기 때문에 바람직하지 않다.

가급적 직접 만든 생성자에 달아주는 것이 낫다. 나는 회사에서 코딩할 때에는 절대로 `@Builder`를 클래스에 달아주지 않는다.

>
Finally, applying `@Builder` to a class is as if you added `@AllArgsConstructor(access = AccessLevel.PACKAGE)` to the class and applied the `@Builder` annotation to this all-args-constructor.
This only works if you haven't written any explicit constructors yourself.
If you do have an explicit constructor, put the `@Builder` annotation on the constructor instead of on the class.
Note that if you put both `@Value` and `@Builder` on a class, the package-private constructor that `@Builder` wants to generate 'wins' and suppresses the constructor that `@Value` wants to make.
[^lombok-builder]

##### 주의할 점: lombok의 @Builder는 GoF의 빌더 패턴과 같지 않음

lombok의 `@Builder`는 GoF의 빌더 패턴과 같지 않다는 점에 주의해야 한다. (예를 들어 lombok의 `@Builder`는 `Director`를 제공하지 않는다.)

수많은 프로젝트에서 `@Builder`는 Java 언어에서 지원하지 않는 기능인 named parameter의 대체제로 쓰이는 정도 이상의 역할을 하지 않는다.

| Java   | <span id="example-java-builder"/>       |
| Python | <span id="example-python-named-param"/> |

```java
NutritionFacts facts = NutritionFacts.builder()
    .calories(230)
    .fat(10)
    .build();
```
{:class="dynamic-insert" data-target-selector="#example-java-builder"}


```python
window.addNewControl(title = "Title",
                     xPosition = 20,
                     yPosition = 50,
                     width = 100,
                     height = 50,
                     drawingNow = True)
```
{:class="dynamic-insert" data-target-selector="#example-python-named-param"}

만약 Java에서 named parameter가 지원되었다면 lombok의 `@Builder`는 지금보다 훨씬 적게 사용되었을지도 모른다.

### 객체 생성을 유연하게

빌더 패턴을 사용하면 하나의 빌더 객체로 여러 객체를 만드는 것도 가능하다.

> 인자가 설정된 빌더는 훌륭한 추상적 팩토리다.

위의 인용구는 이펙티브 자바의 저자인 조슈아 블로흐가 GoF 책의 빌더 패턴 부분을 인용한 것이다.

```java
public interface Builder<T> {
    public T build();
}
```

위와 같은 인터페이스를 만들고, 빌더 클래스가 `implements` 하게 하면 된다.


## GoF 디자인 패턴의 빌더 패턴

빌더 패턴의 의도는 다음과 같다.

> Separate the construction of a complex object from its representation so that
the same construction process can create different representations.

> 복잡한 객체를 생성하는 방법과 표현하는 방법을 정의하는 클래스를 별도로 분리하여
서로 다른 표현이라도 이를 생성할 수 있는 동일한 구축 공정을 제공할 수 있도록 한다.

책에 실린 번역어가 좀 어렵다. 하지만 원문과 비교해 잘 읽어보면 핵심은 다음과 같다.

* 다음을 분리한다.
    * 객체를 생성하는 방법.
    * 객체를 표현하는 방법.

참여 객체는 다음과 같다.

* Builder : 빌더 인터페이스.
* ConcreteBuilder : 빌더 인터페이스 구현체. 부품을 합성하는 방식에 따라 여러 구현체를 만든다.
* Director : Builder를 사용해 객체를 생성한다.
* Product : Director가 Builder로 만들어낸 결과물.

builder 는 부품을 만들고, director 는 builder가 만든 부품을 조합해 제품을 만든다고 할 수 있다.

즉 다음과 같은 조합이 가능하다.

|                          | 평범한 방/문을 만드는 Builder | 레고로 방/문을 만드는 Builder |
|--------------------------|-------------------------------|-------------------------------|
| 아파트를 만드는 Director | 평범한 아파트                 | 레고로 만든 아파트            |
| 주택을 만드는 Director   | 평범한 주택                   | 레고로 만든 주택              |
| 학교를 만드는 Director   | 평범한 학교                   | 레고로 만든 학교              |

### 사례: 미로 게임을 만드는 예제

이해를 돕기 위해 GoF에서는 미로를 만드는 코드를 예제로 삼는다.

- `Builder` 인터페이스

```c++
/* Builder 인터페이스 */
class MazeBuilder {
    public :
        virtual void BuildMaze() { }
        virtual void BuildRoom(int room) { }
        virtual void BuildDoor(int roomFrom, int roomTo) { }
        virtual Maze* GetMaze() { return 0; }
    protected :
        MazeBuilder();
}
```

- `Builder` 구현체

* 빌더 구현체는 방과 문, 미로를 만든다.
* 방과 문을 몇 개를 만들고 어떤 순서로 조합하는지를 아는 것은 디렉터의 일이다.
* 다음과 같이 목적에 따라 여러 가지로 만들 수 있다.

```c++
/* 표준적인 방, 문, 미로를 만드는 Builder 구현체 */
class StandardMazeBuilder : public MazeBuilder {
    public :
        StandardMazeBuilder();
        virtual void BuildMaze();
        virtual void BuildRoom(int);
        virtual void BuildDoor(int, int);

        Virtual Maze* GetMaze();
    private :
        Direction CommonWall(Room*, Room*);
        Maze* _currentMaze;
};

/* 미로는 만들지 않고 방과 문의 숫자를 세는 Builder 구현체 */
class CountingMazeBuilder : public MazeBuilder {
    public :
        CountingMazeBuilder();
        virtual void BuildMaze();
        virtual void BuildRoom(int);
        virtual void BuildDoor(int, int);
        virtual void AddWall(int, Direction);
        void GetCount(int &, int &) const;
    private :
        int _doors;
        int _rooms;
}
```

- `Director`

* 디렉터는 빌더에게 방을 몇 개 만들고, 문을 몇 개 만들 것을 지시하여 미로를 완성한다.
* 빌더는 시키는대로 방과 문만 잘 만들면 된다.

```c++
/* 기본 미로를 만드는 Director */
Maze* MazeGame::CreateMaze(MazeBuilder& builder) {
    builder.BuilderMaze();
    builder.BuildRoom(1);
    builder.BuildRoom(2);
    builder.BuildDoor(1, 2);

    return builder.GetMaze();
}

/* 복잡한 미로를 만드는 Director */
Maze* MazeGame::CreateComplexMaze(MazeBuilder& builder) {
    builder.BuildRoom(1);
    // ...
    builder.BuildRoom(1001);

    return builder.GetMaze();
}
```

사용은 다음과 같이 한다.

```c++
Maze * maze;                    /* product */
MazeGame game;                  /* director */
StandardMazeBuilder builder;    /* builder */
game.CreateMaze(builder);
maze = builder.GetMaze();
```

### 사례: Text와 Html을 빌드하는 예제

다음은 "Java 언어로 배우는 디자인 패턴 입문"의 예제[^yuki-122]를 참고해 내가 좀 다른 방식으로 작성한 예제이다.

- `Builder`는 `Director`가 사용할 재료를 제공한다.

```java
public interface Builder {
  void makeTitle(String title);
  void makeString(String str);
  void makeItems(String[] items);
  void close();
  String getResult();
}
```

- `Director`는 비즈니스 로직을 제공한다.
    - `ToDoListDirector`는 할일 목록 작성을 감독한다.

```java
public class ToDoListDirector {
  private Builder builder;

  public ToDoListDirector(Builder builder) {
    this.builder = builder;
  }

  public void construct() {
    builder.makeTitle("TODO List");
    builder.makeString("아침에 할 일");
    builder.makeItems(new String[]{"조깅", "세탁기 돌리기"});
    builder.makeString("저녁에 할 일");
    builder.makeItems(new String[] {"청소하기", "공부하기", "다음날 출근 준비"});
    builder.close();
  }
}
```

- `TextBuilder`는 텍스트 형식의 문서를 빌드한다.

```java
public class TextBuilder implements Builder {
  private StringBuffer buffer = new StringBuffer();

  @Override
  public void makeTitle(String title) {
    buffer.append("===================\n")
        .append("[" + title + "]\n");
  }

  @Override
  public void makeString(String str) {
    buffer.append("- " + str + "\n");
  }

  @Override
  public void makeItems(String[] items) {
    for (String item : items) {
      buffer.append("  - " + item + "\n");
    }
  }

  @Override
  public void close() {
    buffer.append("===================\n");
  }

  @Override
  public String getResult() {
    return buffer.toString();
  }
}
```

- `HtmlBuilder`는 HTML 형식의 문서를 빌드한다.

```java
public class HtmlBuilder implements Builder {
  private String html = "";

  @Override
  public void makeTitle(String title) {
    html += "<html><head><title>" + title + "</title></head>\n"
        + "<body>\n"
        + "<h1>" + title + "</h1>\n";
  }

  @Override
  public void makeString(String str) {
    html += "<p>" + str + "</p>\n";
  }

  @Override
  public void makeItems(String[] items) {
    html += "<ul>\n";
    for (String item : items) {
      html += "<li>" + item + "</li>\n";
    }
    html += "</ul>\n";
  }

  @Override
  public void close() {
    html += "</body></html>";
  }

  @Override
  public String getResult() {
    return html;
  }
}
```

`Director`가 `TextBuilder`를 사용하게 해보자.

```java
Builder builder = new TextBuilder();
ToDoListDirector director = new ToDoListDirector(builder);
director.construct();

System.out.println(builder.getResult());
```

출력 결과는 다음과 같다.

```text
===================
[TODO List]
- 아침에 할 일
  - 조깅
  - 세탁기 돌리기
- 저녁에 할 일
  - 청소하기
  - 공부하기
  - 다음날 출근 준비
===================
```

이번엔 `Director`가 `HtmlBuilder`를 사용하게 해보자.

```java
Builder builder = new HtmlBuilder();
ToDoListDirector director = new ToDoListDirector(builder);
director.construct();

System.out.println(builder.getResult());
```

출력 결과는 다음과 같다.

{% raw %}
```text
<html><head><title>TODO List</title></head>
<body>
<h1>TODO List</h1>
<p>아침에 할 일</p>
<ul>
<li>조깅</li>
<li>세탁기 돌리기</li>
</ul>
<p>저녁에 할 일</p>
<ul>
<li>청소하기</li>
<li>공부하기</li>
<li>다음날 출근 준비</li>
</ul>
</body></html>
```
{% endraw %}

### From: 실전 코드로 배우는 실용주의 디자인 패턴

빌더 패턴이 어떤 문제를 해결하는가?

>
비즈니스 로직과 UI 로직을 분리하는 것이 바람직하지만, OO 시스템에서는 구현 상세를 노출시킬 수 없다.
올바로 정의된 클래스는 상태 정보를 반환하는 'get' 메소드를 갖지 않기 때문에 객체는 자신의 UI를 스스로 빌드해야 한다.
객체는 종종 하나 이상의 표현을 제공할 필요가 있는데, 이 경우 비즈니스 로직 코드를 다중 표현을 생성하기 위한 표현 코드로 난잡하게 하는 것은 바람직하지 않다.
>
Builder는 표현 코드를 Director('비즈니스') 객체로부터 분리하여 Builder 객체가 처리하도록 함으로써 이 문제를 처리한다.
Builder는 또한 이후에 새로운 표현을 기존 코드에 영향을 미치지 않으면서도 추가할 수 있도록 해준다.
>
이제 UI 애플리케이션이 아닌 경우를 예로 들어 보자.
신용카드 처리 프로그램의 경우, 각 신용카드사별로 서로 다른 결제 프로토콜을 필요로 하는데,
이들은 동일한 정보가 다른 방식으로 표현되는 것이다.
Builder는 비즈니스 로직과 표현을 분리시켜 어느 프로세스가 정보를 받는지 알 필요 없이 패킷을 만들 수 있게 해준다.
세부 데이터 구성은 감추어져 있다.
이는 프로세서에 독립적인 인터페이스를 통해 통신하는 'Concrete Builder'가 담당한다.
[^holub-446]

빌더 패턴의 장점

>
Builder는 객체의 표현을 '비즈니스' 로직과 멋지게 분리해 주어 비즈니스 로직을 수정하지 않으면서도 새로운(혹은 변화된) 표현을 쉽게 추가할 수 있도록 해준다.
[^holub-446]

빌더 패턴의 단점

>
- Builder 인터페이스의 변화는 이를 구현한 모든 클래스에 영향을 미친다.
- 어떤 UI 요소는 같은 인터페이스로 처리하기 어려울 수도 있다(예를 들어 HTML vs 스윙).
[^holub-446]

## 함께 읽기

- [[GoF-Design-Pattern]]
- [[/pattern/factory]]

## 참고문헌

- 도서
    - Java 언어로 배우는 디자인 패턴 입문 [개정판] / Yuki Hiroshi 저 / 이규흥 역 / 영진닷컴 / 1판 9쇄 2017년 3월 5일
    - 실전 코드로 배우는 실용주의 디자인 패턴 / Allen Holub 저 / 송치형 편역 / 지앤선(志&嬋) / 2006년 07월 19일 발행 / 원제 : Holub on Patterns : Learning Design Patterns by Looking at Code
    - 이펙티브 자바 (2판) / 조슈아 블로크 저 / 이병준 역 / 인사이트(insight) / 초판 2쇄 2015년 07월 21일
    - 이펙티브 자바 (3판) / 조슈아 블로크 저/개앞맵시 역 / 인사이트(insight) / 초판 2쇄 2018년 11월 21일
- 웹 문서
    - [Builder Pattern(wikipedia)]( https://en.wikipedia.org/wiki/Builder_pattern )
    - [Design Patterns(wikipedia)]( https://en.wikipedia.org/wiki/Design_Patterns )
    - [Item 2: Consider a builder when faced with many constructor parameters]( http://www.informit.com/articles/article.aspx?p=1216151&seqNum=2 )
    - [Project Lombok @Builder]( https://projectlombok.org/features/Builder )

## 주석

[^lombok-builder]: 출처는 <https://projectlombok.org/features/Builder >.
[^yuki-122]: Java 언어로 배우는 디자인 패턴 입문 [개정판]. 챕터 7. 122쪽.
[^holub-446]: 실전 코드로 배우는 실용주의 디자인 패턴. 446쪽.

