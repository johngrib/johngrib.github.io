---
layout  : wiki
title   : 마커 인터페이스 패턴 (Marker Interface Pattern)
summary : 
date    : 2022-11-18 23:59:03 +0900
updated : 2022-11-19 10:01:11 +0900
tag     : 
toc     : true
public  : true
parent  : [[/pattern]]
latex   : false
---
* TOC
{:toc}

## From: Effective Java 3/E

>
아무 메서드도 담고 있지 않고, 단지 자신을 구현하 클래스가 특정 속성을 가짐을 표시해주는 인터페이스를 마커 인터페이스(marker interface)라 한다.
>
-- 이펙티 자바 3/E. 아이템 41.

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

- [Marker interface pattern (en.wikipedia.org)]( https://en.wikipedia.org/wiki/Marker_interface_pattern )

## 참고문헌

- [clojure-1.11.1 clojure.lang]( https://github.com/clojure/clojure/blob/clojure-1.11.1/src/jvm/clojure/lang/ )
- 이펙티브 자바 Effective Java 3/E / 조슈아 블로크 저/개앞맵시(이복연) 역 / 인사이트(insight) / 초판 2쇄 2018년 11월 21일

