---
layout  : wiki
title   : 마커 인터페이스 패턴 (Marker Interface Pattern)
summary : 
date    : 2022-11-18 23:59:03 +0900
updated : 2022-11-19 14:12:54 +0900
tag     : java clojure
resource: D3/A8B38B-610C-4752-9BA1-9A23039CB3A3
toc     : true
public  : true
parent  : [[/pattern]]
latex   : false
---
* TOC
{:toc}

## From: Effective Java 3/E

>
아무 메서드도 담고 있지 않고, 단지 자신을 구현하는 클래스가 특정 속성을 가짐을 표시해주는 인터페이스를 마커 인터페이스(marker interface)라 한다.
>
-- 이펙티 자바 3/E. 아이템 41.

## From: Thinking in Java 3판

tagging interface라고 부르기도 한다.

>
객체 복제 능력을 완성하기 위해 `Cloneable` 인터페이스를 구현하는 한 가지가 더 필요하다.
이 인터페이스는 비어있기 때문 약간 이상할 것이다.
>
> ```java
> interface Cloneable {}
> ```
>
빈 인터페이스를 구현하는 이유는 `Cloneable`로 상향 캐스트하고 메소드 중 하나를 호출하려는 것은 아니다.
이러한 방법으로 인터페이스 사용하려는 것을 클래스 타입을 나타내는 플래그와 같이 행동하기 때문에 **태깅 인터페이스**(tagging interface)라고 한다.
>
-- Thinking in Java 3판. 부록A. 1120쪽.

## 사례

### Java
#### java.io.Serializable

[jdk-17+35 java.io.Serializable]( https://github.com/openjdk/jdk/blob/jdk-17%2B35/src/java.base/share/classes/java/io/Serializable.java )

```java
package java.io;

/**
 * Serializability of a class is enabled by the class implementing the
 * java.io.Serializable interface.
 *
 * (생략)
 *
 * @author  unascribed
 * @see java.io.ObjectOutputStream
 * @see java.io.ObjectInputStream
 * @see java.io.ObjectOutput
 * @see java.io.ObjectInput
 * @see java.io.Externalizable
 * @since   1.1
 */
public interface Serializable {
}
```

#### java.lang.Cloneable

[jdk-17+35 java.lang.Cloneable]( https://github.com/openjdk/jdk/blob/jdk-17+35/src/java.base/share/classes/java/lang/Cloneable.java )

```java
package java.lang;

/**
 * A class implements the <code>Cloneable</code> interface to
 * indicate to the {@link java.lang.Object#clone()} method that it
 * is legal for that method to make a
 * field-for-field copy of instances of that class.
 * <p>
 * Invoking Object's clone method on an instance that does not implement the
 * <code>Cloneable</code> interface results in the exception
 * <code>CloneNotSupportedException</code> being thrown.
 * <p>
 * By convention, classes that implement this interface should override
 * {@code Object.clone} (which is protected) with a public method.
 * See {@link java.lang.Object#clone()} for details on overriding this
 * method.
 * <p>
 * Note that this interface does <i>not</i> contain the {@code clone} method.
 * Therefore, it is not possible to clone an object merely by virtue of the
 * fact that it implements this interface.  Even if the clone method is invoked
 * reflectively, there is no guarantee that it will succeed.
 *
 * @author  unascribed
 * @see     java.lang.CloneNotSupportedException
 * @see     java.lang.Object#clone()
 * @since   1.0
 */
public interface Cloneable {
}
```

다음은 위의 JavaDoc을 번역한 것이다.

>
`Cloneable` 인터페이스를 구현하는 클래스는 `Object.clone()` 메소드를 통해 클래스 인스턴스의 필드 간 복사본을 만드는 것이 허용됩니다.
`Cloneable` 인터페이스를 구현하지 않은 인스턴스에 대해 `Object.clone()` 메소드를 호출하면 `CloneNotSupportedException` 예외가 던져집니다.
>
관례상, 이 인터페이스를 구현하는 클래스는 `Object.clone()` 메소드(protected)를 오버라이드해야 합니다.
이 메소드를 오버라이드하는 방법에 대해서는 `Object.clone()`을 참고하세요.
>
이 인터페이스는 `clone` 메소드를 포함하지 않습니다.
따라서, 이 인터페이스를 구현하는 것만으로는 객체를 복제할 수 없습니다.
리플렉션을 통해 `clone` 메소드를 호출하더라도, 복제가 성공한다고 보장할 수 없습니다.

참고: [jdk-17+35 java.lang.Object#clone]( https://github.com/openjdk/jdk/blob/jdk-17%2B35/src/java.base/share/classes/java/lang/Object.java#L228 )

```java
protected native Object clone() throws CloneNotSupportedException;
```

### Clojure

#### clojure.lang.Sequential

[clojure-1.11.1 clojure.lang.Sequential]( https://github.com/clojure/clojure/blob/clojure-1.11.1/src/jvm/clojure/lang/Sequential.java )

```java
package clojure.lang;

/**
 * Copyright (c) Rich Hickey. All rights reserved.
 * The use and distribution terms for this software are covered by the
 * Eclipse Public License 1.0 (http://opensource.org/licenses/eclipse-1.0.php)
 * which can be found in the file epl-v10.html at the root of this distribution.
 * By using this software in any fashion, you are agreeing to be bound by
 * the terms of this license.
 * You must not remove this notice, or any other, from this software.
 */
public interface Sequential {
}
```

#### clojure.lang.Fn

[clojure-1.11.1 clojure.lang.Fn]( https://github.com/clojure/clojure/blob/clojure-1.11.1/src/jvm/clojure/lang/Fn.java )

```java
/**
 *   Copyright (c) Rich Hickey. All rights reserved.
 *   The use and distribution terms for this software are covered by the
 *   Eclipse Public License 1.0 (http://opensource.org/licenses/eclipse-1.0.php)
 *   which can be found in the file epl-v10.html at the root of this distribution.
 *   By using this software in any fashion, you are agreeing to be bound by
 * 	 the terms of this license.
 *   You must not remove this notice, or any other, from this software.
 **/

/* rich Nov 25, 2008 */

package clojure.lang;

public interface Fn{
}
```

#### clojure.lang.IRecord

[clojure-1.11.1 clojure.lang.IRecord](https://github.com/clojure/clojure/blob/clojure-1.11.1/src/jvm/clojure/lang/IRecord.java )

```java
/**
 *   Copyright (c) Rich Hickey. All rights reserved.
 *   The use and distribution terms for this software are covered by the
 *   Eclipse Public License 1.0 (http://opensource.org/licenses/eclipse-1.0.php)
 *   which can be found in the file epl-v10.html at the root of this distribution.
 *   By using this software in any fashion, you are agreeing to be bound by
 * 	 the terms of this license.
 *   You must not remove this notice, or any other, from this software.
 **/

package clojure.lang;

public interface IRecord {
}
```

#### clojure.lnag.IType

[clojure-1.11.1 clojure.lang.IType]( https://github.com/clojure/clojure/blob/clojure-1.11.1/src/jvm/clojure/lang/IType.java )

```java
/**
 *   Copyright (c) Rich Hickey. All rights reserved.
 *   The use and distribution terms for this software are covered by the
 *   Eclipse Public License 1.0 (http://opensource.org/licenses/eclipse-1.0.php)
 *   which can be found in the file epl-v10.html at the root of this distribution.
 *   By using this software in any fashion, you are agreeing to be bound by
 * 	 the terms of this license.
 *   You must not remove this notice, or any other, from this software.
 **/

package clojure.lang;

public interface IType {
}
```

#### clojure.lang.MapEquivalence

[clojure-1.11.1 clojure.lang.MapEquivalence]( https://github.com/clojure/clojure/blob/clojure-1.11.1/src/jvm/clojure/lang/MapEquivalence.java )

```java
/**
 *   Copyright (c) Rich Hickey. All rights reserved.
 *   The use and distribution terms for this software are covered by the
 *   Eclipse Public License 1.0 (http://opensource.org/licenses/eclipse-1.0.php)
 *   which can be found in the file epl-v10.html at the root of this distribution.
 *   By using this software in any fashion, you are agreeing to be bound by
 * 	 the terms of this license.
 *   You must not remove this notice, or any other, from this software.
 **/

/* rich Aug 4, 2010 */

package clojure.lang;

//marker interface
public interface MapEquivalence{
}
```

이 Java 인터페이스에는 주석으로 `//marker interface`라고 메모가 남겨져 있다.


## 함께 읽기

- [[/java/object-clone]]

## 참고문헌

- Thinking in Java [3판] / Bruce Eckel 저 / 이용원 외 공역 / 대웅미디어 / 초판 1쇄 2003년 07월 26일
- [Marker interface pattern (en.wikipedia.org)]( https://en.wikipedia.org/wiki/Marker_interface_pattern )
- [clojure-1.11.1 clojure.lang]( https://github.com/clojure/clojure/blob/clojure-1.11.1/src/jvm/clojure/lang/ )
- 이펙티브 자바 Effective Java 3/E / 조슈아 블로크 저/개앞맵시(이복연) 역 / 인사이트(insight) / 초판 2쇄 2018년 11월 21일

