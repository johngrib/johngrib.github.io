---
layout  : wiki
title   : Javadoc 작성하기
summary : 
date    : 2021-04-12 23:25:16 +0900
updated : 2022-01-22 10:41:03 +0900
tag     : java javadoc
resource: 87/9E7A94-A802-44B7-A248-97974C1256F7
toc     : true
public  : true
parent  : [[/java]]
latex   : false
issue-number : 169
---
* TOC
{:toc}

## 내가 Javadoc 작성을 선호하는 이유

Javadoc은 문서화를 위한 주석이기 때문에 경시되는 경우가 많다.

그러나 형식을 강제할 수 있고, IDE 지원이 있다는 특징이 있어 원칙을 갖고 작성한다면 의외의 장점을 누릴 수 있다.

나에게는 다음과 같은 경험이 있다.

- 회사에서 5개의 프로젝트를 짧은 기간 동안 살펴봐야 하는 상황.
    - 이해하기 어려운 코드를 발견할 때마다 Javadoc을 작성해 PR로 올렸다.
    - 이렇게 작성한 Javadoc이 누적되니 프로젝트에 대한 이해가 향상되었다.
    - 나 외에도 다른 동료들도 Javadoc 덕분에 어려운 코드를 이해하기 쉽게 되었다.

즉 레거시 코드를 살펴볼 때, 올바른 내용을 가진 Javadoc이 충분히 있다면 혼란을 많이 줄일 수 있었다.

- 코딩하는 사람의 입장이아니라 Javadoc을 읽는 사람의 입장에서 주석을 작성해보니 각 코드의 역할이나 책임 경계에 대해 생각해보는 시간을 많이 갖게 되었다. 그 결과 더 나은 설계를 얻게 된 경우가 종종 있었다.

## 나의 Javadoc 작성 원칙

- **목표는 특정 코드 덩어리의 대략적인 역할을 3초 안에 파악할 수 있도록 도와주는 것이다.**

나는 다음과 같이 Javadoc 주석을 작성한다.

- 가독성이 가장 중요하다.
    - 나는 영어를 잘 하지 못하므로 Javadoc은 한국어로 작성한다.
- 특정 메소드나 클래스의 "책임"을 3초 안에 파악할 수 있도록 짧고 간결하게 적는다.
- 메소드 Javadoc에 대해
    - 메소드가 무엇을 입력받아서 무엇을 리턴하는지를 반드시 설명한다.
    - 뭐가 리턴되는지만 알아도 레거시 코드 파악에 큰 도움이 된다. (Golang에서 배운 것)
    - 메소드가 어떤 경우에 어떤 예외를 던지는지를 케이스별로 설명한다.
    - 구현에 대해서는 설명하지 않는다. 구현이 바뀌면 주석도 바뀌게 된다. (구현과 주석이 커플링이 생기지 않도록 한다.)
- 클래스 Javadoc이라면, 이 클래스의 책임 또는 목표가 무엇인지를 설명한다.
- 주석은 메소드 시그니처와 클래스 시그니처 위에만 Javadoc 포맷으로 작성하고, 그 외의 주석은 가능한 한 작성하지 않는다.

추가로 나는 Javadoc의 원래 기능인 정적 사이트 빌드에는 별로 관심이 없다.


### main description

#### 리턴값을 반드시 설명한다

나는 리턴값을 설명하는 형식의 main description을 좋아한다.

처음 보는 메소드가 아무리 복잡하더라도
무엇을 받아서 무엇을 리턴하는지만 알려준다면, 그 메소드를 사용해야 하는 사람의 시간을 굉장히 절약해줄 수 있다.


리턴값을 구체적으로 언급하지 않는 형식은 불명확한 느낌이 든다.

```java
// 싫음: 리턴값이 무엇인지를 설명하지 않는다.
/**
 * 문자열이 문자들의 시퀀스 s를 포함하는지 확인합니다.
 */
public boolean contains(CharSequence s) {
```

```java
// 좋음: 무엇을 리턴하는지 명확히 표현한다.
/**
 * 문자열이 문자들의 시퀀스 s를 포함한다면 true를 리턴하고, 그렇지 않다면 false를 리턴합니다.
 */
public boolean contains(CharSequence s) {
```

```java
// 싫음: 교체만 하고 끝나는가?
/**
 * 정규식 regex에 매치되는 서브스트링을 모두 replacement로 교체합니다.
 */
public String replaceAll(String regex, String replacement) {
    return Pattern.compile(regex).matcher(this).replaceAll(replacement);
}
```

```java
// 좋음: 교체한 값을 리턴해주는구나!
/**
 * 정규식 regex에 매치되는 서브스트링을 모두 replacement로 교체한 문자열을 생성해 리턴합니다.
 */
public String replaceAll(String regex, String replacement) {
    return Pattern.compile(regex).matcher(this).replaceAll(replacement);
}
```

#### 예외 클래스라면 어떤 경우에 던지는지 설명한다

만약 예외 클래스라면 나는 다음과 같이 표현하는 것을 좋아한다.

```java
// 좋음: Task를 못 찾으면 이 예외를 throw 하면 된다고 알려준다.
/**
 * 할 일을 찾지 못했을 때 던집니다.
 */
public class TaskNotFoundException extends RuntimeException {
```

한편 예외에 대해 "발생한다"는 표현을 쓰는 것은 좋아하지 않는다.

```java
// 싫음
/**
 * 할 일을 찾지 못했을 때 발생하는 예외입니다.
 */
public class TaskNotFoundException extends RuntimeException {
```

내가 `던집니다`라는 표현을 선호하는 것은 스탠다드 Java 라이브러리의 영향을 받은 것이다.

유명한 스탠다드 예외들의 javadoc을 읽어보자. 예외에 대해 `Thrown`이라는 표현을 사용하고 있다.

```java
/**
 * Thrown when an application attempts to use {@code null} in a
 * case where an object is required. These include:
 * ...생략
 */
public class NullPointerException extends RuntimeException {
```

```java
/**
 * Thrown to indicate that a method has been passed an illegal or
 * inappropriate argument.
 *
 * @author  unascribed
 * @since   1.0
 */
public
class IllegalArgumentException extends RuntimeException {
```



### 구현에 의존하지 않는다

구현 코드에 의존하는 Javadoc은 코드와 커플링이 생겨 좋지 않다고 생각한다. 객체지향 원칙은 주석에도 통한다.

```java
// 싫음: 지금은 루프를 돌지만, 다른 방식으로 구현이 바뀌면 주석은 거짓이 된다.
/**
 * 문자열의 앞부터 루프를 돌면서 문자열이 문자들의 시퀀스 s를 포함하는지 확인합니다.
 */
public boolean contains(CharSequence s) {
```

```java
// 좋음: 구현이 바뀌어도 사실을 말하는 주석.
/**
 * 문자열이 문자들의 시퀀스 s를 포함하는지 확인합니다.
 */
public boolean contains(CharSequence s) {
```

메소드의 책임과 역할만 짧게 설명하는 것을 좋아한다.

```java
// 싫음: 2씩 증가시키도록 변경하면 주석도 바꿔줘야 한다.
/**
 * 카운트를 1씩 증가시킵니다.
 */
public void synchronized increaseCount() {
    this.count += 1L;
}
```

```java
// 좋음
/**
 * 카운트를 증가시킵니다.
 */
public void synchronized increaseCount() {
    this.count += 1L;
}
```

## 상속 규칙

Javadoc 주석은 다음과 같은 경우에 상속된다.

- 슈퍼 클래스의 메소드를 서브 클래스의 메소드가 오버라이드하는 경우
- 슈퍼 인터페이스의 메소드를 서브 인터페이스의 메소드가 오버라이드하는 경우
- 인터페이스의 메소드를 클래스의 메소드가 구현하는 경우

한편 main description이나 `@return`, `@param`, `@throws`가 누락되면 슈퍼 클래스로부터 이어받아 내용이 채워진다.

## Standard Tags

### @deprecated

```
* @deprecated 설명
```

- 이 API를 더 이상 사용하지 않는다는 것을 나타낸다.
- 이 태그는 `@Deprecated` 애노테이션이 붙은 코드 덩어리에 javadoc을 작성할 때 많이 사용한다.
- JDK 1.0 부터 도입.

```java
// java.lang.String.java
/**
 * ...생략
 * @deprecated This method does not properly convert bytes into characters.
 * As of JDK&nbsp;1.1, the preferred way to do this is via the
 * {@code String} constructors that take a {@link
 * java.nio.charset.Charset}, charset name, or that use the platform's
 * default charset.
 * ...생략
 */
@Deprecated(since="1.1")
public String(byte ascii[], int hibyte, int offset, int count) {
```

`@deprecated`를 작성할 때에는 다음을 염두에 두어야 한다.

- 해당 API가 유효한 범위를 알려줘야 한다.
- 해당 API를 대체할 수 있는 API를 알려줘야 한다.
- 가능하다면 deprecated된 이유를 알려주면 좋다.

다음 예제를 보자. [Spring 프레임워크 5.3.1 MediaType.APPLICATION_JSON_UTF8의 javadoc]( https://docs.spring.io/spring-framework/docs/5.3.1/javadoc-api/org/springframework/http/MediaType.html#APPLICATION_JSON_UTF8 ) 이다.

```java
// org.springframework.http.MediaType
/**
 * Public constant media type for {@code application/json;charset=UTF-8}.
 * @deprecated as of 5.2 in favor of {@link #APPLICATION_JSON}
 * since major browsers like Chrome
 * <a href="https://bugs.chromium.org/p/chromium/issues/detail?id=438464">
 * now comply with the specification</a> and interpret correctly UTF-8 special
 * characters without requiring a {@code charset=UTF-8} parameter.
 */
@Deprecated
public static final MediaType APPLICATION_JSON_UTF8;
```

> @deprecated as of 5.2 in favor of APPLICATION_JSON since major browsers like Chrome now comply with the specification  and interpret correctly UTF-8 special characters without requiring a charset=UTF-8 parameter.

- Spring 5.2 버전부터 `APPLICATION_JSON_UTF8`이 deprecated 되었음을 알려주고 있다.
- `APPLICATION_JSON_UTF8`을 대체하는 것은 `APPLICATION_JSON`이다.
- deprecated된 이유는 Chrome과 같은 주요 브라우저가 이제 스펙을 준수하며, `charset=UTF-8` 파라미터가 없이도 `UTF-8` 특수문자를 올바르게 해석하기 때문이다.

### @throws

```
* @throws 예외클래스 설명
```

- 던지는 예외와 예외가 던져지는 케이스에 대해 설명한다.
    - 예외 타입을 명시한다.
    - 예외가 어떤 상황에 던져지는지를 나열한다.
- JDK 1.2부터 도입.
- `@exception`과 똑같지만, `@exception`보다 `@throws`의 사용이 더 권장된다.

[subSequence]( https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#subSequence-int-int- )

```java
// java.lang.String.java
/**
 ...생략
 * @throws  IndexOutOfBoundsException
 *          if {@code beginIndex} or {@code endIndex} is negative,
 *          if {@code endIndex} is greater than {@code length()},
 *          or if {@code beginIndex} is greater than {@code endIndex}
 *
 * @since 1.4
 * @spec JSR-51
 */
public CharSequence subSequence(int beginIndex, int endIndex) {
    return this.substring(beginIndex, endIndex);
}
```

나는 한국어로 작성할 때 다음과 같이 작성하는 것을 선호한다.

- 예외를 던지게 되는 상황을 충분히 나열한다.
- 각 상황에 대해 `~인 경우`로 표현을 마친다.

```java
/**
 ...생략
 * @throws IndexOutOfBoundsException
 *          beginIndex 또는 endIndex가 0보다 작은 경우,
 *          endIndex가 length() 보다 큰 경우,
 *          beginIndex가 endIndex보다 큰 경우
 *
 * @since 1.4
 * @spec JSR-51
 */
public CharSequence subSequence(int beginIndex, int endIndex) {
    return this.substring(beginIndex, endIndex);
}
```

### @exception

- `@throws`와 똑같다.
- JDK 1.0 부터 도입. `@throws`가 `@exception`보다 권장되므로 `@throws`만 써도 된다.

### @param

```
* @param 파라미터-이름 설명
* @param <타입-파라미터-이름> 설명
```

- 파라미터의 의미에 대해 설명한다.

```java
/**
 * @param string  the string to be converted
 * @param type    the type to convert the string to
 * @param <T>     the type of the element
 * @param <V>     the value of the element
 */
<T, V extends T> V convert(String string, Class<T> type) {
```

```java
/**
 * @param <E> Type of element stored in a list
 */
public interface List<E> extends Collection<E> {
```

나는 한국어로 작성할 때 다음과 같이 작성하는 것을 선호한다.

- 명사형으로 간단하게.
- 번역이 애매한 영어 단어는 그대로.
- 줄맞춤은 할 때도 있고 안 할 때도 있다.

```java
/**
 * @param string 변환할 문자열
 * @param type 주어진 문자열을 변환할 목표 타입
 * @param <T> element의 타입
 * @param <V> element의 값
 */
<T, V extends T> V convert(String string, Class<T> type) {
```

### @return

```
* @return 설명
```

- 리턴값에 대해 설명한다.
- JDK 1.0 부터 도입.

#### boolean 메소드의 경우

##### 케이스를 명확히 표기한다

나는 한국어로 작성할 때 다음과 같이 작성하는 것을 선호한다.

- main description은 다음과 같이 마침표가 있는 문장형으로 작성한다.
    - `서버가 대기중이라면 true, 대기중이 아니라면 false를 리턴합니다.`
    - `비어 있는 문자열이면 true를 리턴합니다.`
    - `적합한 문자열인 경우에만 true를 리턴합니다.`
- `@return`은 명사형으로 짧게 작성한다.
    - `서버가 대기중이라면 true, 대기중이 아니라면 false`
    - `비어 있는 문자열이면 true`
    - `적합한 문자열인 경우에만 true`

나는 `여부`라는 단어를 사용하는 것을 매우 싫어하여 다음과 같이 쓰는 일은 없다.

- `~인지 여부`

어떤 경우에 `true`이고 어떤 경우에 `false`가 되는지 명확하게 적는 것을 선호한다.

실제로 Java 스탠다드 라이브러리에서도 `boolean` 메소드에 대해 `true` 케이스와 `false` 케이스를 설명하는 경우가 많다.

```java
// String.java
/**
 * Returns true if and only if this string contains the specified
 * sequence of char values.
 *
 * @param s the sequence to search for
 * @return true if this string contains {@code s}, false otherwise
 * @since 1.5
 */
public boolean contains(CharSequence s) {
    return indexOf(s.toString()) >= 0;
}
```

다음은 위의 코드를 내 취향대로 작성한 것이다.

```java
/**
 * 문자열이 주어진 char 값들의 시퀀스를 포함하고 있다면 true를 리턴합니다.
 *
 * @param s 포함하고 있는지 탐색할 문자 시퀀스
 * @return 문자열이 s를 포함하고 있다면 true, 그렇지 않다면 false
 * @since 1.5
 */
public boolean contains(CharSequence s) {
    return indexOf(s.toString()) >= 0;
}
```

##### main description과 @return의 중복에 대해

```java
// String.java
/**
 * Returns {@code true} if, and only if, {@link #length()} is {@code 0}.
 *
 * @return {@code true} if {@link #length()} is {@code 0}, otherwise
 * {@code false}
 *
 * @since 1.6
 */
public boolean isEmpty() {
    return value.length == 0;
}
```

스탠다드 라이브러리의 Javadoc을 읽다보면 위와 같이 main description과 `@return`이 중복된 내용을 갖고 있는 것을 볼 수 있다.

하지만 두 문장이 완전히 똑같지는 않으며, description과 `@return`의 역할이 다르다는 점을 고려하고 읽어야 한다.
description은 메소드의 역할에 대해 설명하며, `@return`은 리턴값에 대해 설명하기 때문에 둘의 목적은 다르다.

한편으로는 빌드된 Javadoc 정적 사이트에서 description과 `@return` 태그가 멀리 떨어져 있기 때문이기도 하다.

나는 회사 내에서만 통용되는 코드에서는 이런 경우에 한해 종종 다음 예제와 같이 `@return` 태그를 생략하기도 한다.

```java
/**
 * 문자열의 길이가 0이라면 true, 그렇지 않다면 false를 리턴합니다.
 */
public boolean isEmpty() {
    return value.length == 0;
}
```

### @see

```
@see 클래스
@see 패키지경로.클래스
@see 패키지경로.클래스#멤버
@see 패키지경로.클래스#멤버 label
@see <a href="url">label</a>
```

- 참고해야 하는 대상을 작성한다.
- 빌드된 Javadoc 정적 사이트에 `See Also:` 섹션을 만들어 주고, `@see`의 내용을 그 안에 채워넣는다.
    - `@see`의 모든 항목은 자동으로 하이퍼링크가 걸린다.
- JDK 1.0 부터 도입.

예를 들어 java.lang.String 클래스의 Javadoc에는 다음과 같이 `@see` 태그를 사용하고 있는데...

```java
/**
 ...생략
 * @see     java.lang.Object#toString()
 * @see     java.lang.StringBuffer
 * @see     java.lang.StringBuilder
 * @see     java.nio.charset.Charset
 * @since   1.0
 * @jls     15.18.1 String Concatenation Operator +
 */

public final class String
    implements java.io.Serializable, Comparable<String>, CharSequence {
```

[빌드된 결과]( https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/String.html )는 다음과 같은 겉모습을 갖는다.

```
See Also:
Object.toString(), StringBuffer, StringBuilder, Charset, Serialized Form
```

### @hidden

- API 문서를 빌드할 때 이 태그가 있으면 해당 항목은 숨긴다.
- JDK 9 부터 도입.

### @author

- `@author`는 작성자를 의미한다.
- JDK 1.0 부터 도입.

spec 문서에서는 콤마(`,`)를 사용해 여러 사람의 이름을 명시할 수 있다고 되어 있지만 실제 Java의 스탠다드 라이브러리에서는 다음과 같이 태그 하나에 한 사람의 이름을 작성하고 있다.

```java
// java.lang.String.java
/**
 ...생략
 * @author  Lee Boynton
 * @author  Arthur van Hoff
 * @author  Martin Buchholz
 * @author  Ulf Zibis
 ...생략
 */
```

- 나는 git이 이 기능을 충분히 대신해준다고 생각하고 있기 때문에 `@author` 태그는 사용하지 않는다.

### @uses

```
* @uses 서비스-타입 설명
```

- 모듈 선언에 대한 문서의 주석에만 사용 가능.
- 모듈에서 해당 서비스를 사용할 수 있음을 나타낸다.
- JDK 9 부터 도입.

### 그 외

`@provides`, `@serialData`, `@serialField`, `@serial`, `@since`, `@version`

## Inline Tags

인라인 태그는 중괄호(`{ }`)로 감싸 표현한다.

### @code

```
{@code 코드}
```

- 중괄호로 감싼 `코드`를 `<code>` 태그를 씌워 빌드한다.
- JDK 1.5 부터 도입.

### @link

```
{@link 패키지.클래스#멤버 label}
```

- 인라인 링크를 삽입한다.
- JDK 1.4 부터 도입.

## 명령 예제

```sh
# gradle 을 사용하는 경우
gradlew javadoc
```

## 참고문헌

- [Java SE 11 Javadoc Guide (docs.oracle.com)]( https://docs.oracle.com/en/java/javase/11/javadoc/javadoc.html )
- [Documentation Comment Specification for the Standard Doclet (docs.oracle.com)]( https://docs.oracle.com/en/java/javase/11/docs/specs/doc-comment-spec.html )

