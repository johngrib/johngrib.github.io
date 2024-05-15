---
layout  : wiki
title   : Kotlin Scope Functions
summary : 
date    : 2024-05-15 22:41:47 +0900
updated : 2024-05-15 23:45:46 +0900
tag     : 
resource: 90/041F07-C88C-43EA-99A3-4F25B477E67F
toc     : true
public  : true
parent  : [[/kotlin]]
latex   : false
---
* TOC
{:toc}

>
이 문서는 Kotlin 1.9.24 버전을 기준으로 한다.

## 개요

>
The Kotlin standard library contains several functions whose sole purpose is to execute a block of code within the context of an object.
When you call such a function on an object with a lambda expression provided, it forms a temporary scope.
In this scope, you can access the object without its name.
Such functions are called scope functions.
There are five of them: let, run, with, apply, and also.
>
Basically, these functions all perform the same action: execute a block of code on an object.
What's different is how this object becomes available inside the block and what the result of the whole expression is.


Kotlin 표준 라이브러리에는 객체의 컨텍스트 내에서 코드 블록을 실행하는 것이 유일한 목적인 함수들이 몇 가지 있습니다.
람다 표현식이 제공된 개체에서 이런 스코프 함수를 호출하면 임시 스코프가 생성됩니다.
이 스코프에서는 객체의 이름을 지정하지 않아도 해당 객체에 액세스할 수 있습니다.
이러한 함수를 스코프 함수라고 합니다.
스코프 함수는 `let`, `run`, `with`, `apply`, `also` 이렇게 다섯 가지가 있습니다.

기본적으로 이 함수들은 똑같은 액션을 취할 뿐입니다. 하나의 객체에 대해 코드 블록을 실행하는 것입니다.
이 함수들은 블록 내에서 객체를 사용할 수 있게 되는 방식과 전체 표현식의 결과에 대해 각기 다른 점을 갖습니다.


<div id="table1"></div>
- th
    - Function
    - Object reference
    - Return value
    - Is extension function
- td
    - let
    - it
    - Lambda result
    - Yes
- td
    - run
    - this
    - Lambda result
    - Yes
- td
    - run
    - `-`
    - Lambda result
    - No: called without the context object
- td
    - with
    - this
    - Lambda result
    - No: takes the context object as an argument
- td
    - apply
    - this
    - Context object
    - Yes
- td
    - also
    - it
    - Context object
    - Yes
{:class="table-generate" data-target-id="table1"}



## let

[let (kotlinlang.org)](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/let.html )

```kotlin
val person = Person("Alice", 25)

val ageOfAlice = person.let {
    println(it) // 블록 내에서 it으로 접근
    it.age      // 마지막줄이 블록의 리턴값이다
}

println(ageOfAlice) // 25
```

## run

[run (kotlinlang.org)](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/run.html )

```kotlin
val person = Person("Alice", 25)

val sizeOfName = person.run {
    println(this)   // 블록 내에서 this로 접근
    name.length     // 마지막줄이 블록의 리턴값이다
}
println(sizeOfName) // 5
```

- `let`과는 달리 블록 내에서 `this`로 접근한다는 점에 주의.

## with

[with (kotlinlang.org)](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/with.html )

```kotlin
val person = Person("Alice", 25)

with(person) {
    this.name = "Bob"   // 블록 내에서 this로 접근
    age = 30            // this는 생략 가능
}

println(person) // Person(name=Bob, age=30)
```

## apply

[apply (kotlinlang.org)](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/apply.html )

```kotlin
val person = Person("Alice", 25)
person.apply {
    this.age = 30   // 블록 내에서 this로 접근
    name = "Bob"    // this는 생략 가능
}

println(person) // Person(name=Bob, age=30)
```

## also

[also (kotlinlang.org)](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/also.html )

```kotlin
val person = Person("Alice", 25).also {
    println("person: $it")     // 블록 내에서 it으로 Person에 접근
}

println(person) // Person(name=Alice, age=25)
```


## Links

- [Scope functions (kotlinlang.org)](https://kotlinlang.org/docs/scope-functions.html )

