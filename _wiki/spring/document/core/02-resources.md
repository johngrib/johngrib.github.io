---
layout  : wiki
title   : Spring Core Technologies - 2. Resources
summary : 
date    : 2021-07-29 09:43:27 +0900
updated : 2021-08-01 00:44:50 +0900
tag     : java spring
toc     : true
public  : true
parent  : [[/spring/document/core]]
latex   : false
---
* TOC
{:toc}

## 2. Resources

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources )

>
This chapter covers how Spring handles resources and how you can work with resources in Spring. It includes the following topics:

이 챕터는 Spring이 리소스를 처리하는 방법과, Spring을 통해 리소스를 사용하는 방법을 설명합니다.

- [Introduction]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-introduction )
- [The `Resource` Interface]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-resource )
- [Built-in `Resource` Implementations]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-implementations )
- [The `ResourceLoader` Interface]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-resourceloader )
- [The `ResourcePatternResolver` Interface]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-resourcepatternresolver )
- [The `ResourceLoaderAware` Interface]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-resourceloaderaware )
- [Resources as Dependencies]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-as-dependencies )
- [Application Contexts and Resource Paths]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-app-ctx )


### 2.1. Introduction

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-introduction )

>
Java’s standard `java.net.URL` class and standard handlers for various URL prefixes, unfortunately, are not quite adequate enough for all access to low-level resources.
For example, there is no standardized `URL` implementation that may be used to access a resource that needs to be obtained from the classpath or relative to a `ServletContext`.
While it is possible to register new handlers for specialized `URL` prefixes (similar to existing handlers for prefixes such as `http:`),
this is generally quite complicated, and the `URL` interface still lacks some desirable functionality, such as a method to check for the existence of the resource being pointed to.

불행히도 Java의 표준 `java.net.URL` 클래스와 다양한 URL prefix에 대한 표준 핸들러는 저수준 리소스에 대한 모든 엑세스에 충분하지 않습니다.
예를 들어, classpath 또는 `ServletContext` 상대 경로에 있는 리소스에 엑세스하는 일에 사용할 수 있는 표준화된 `URL` 구현체가 없습니다.
특수한 `URL` prefix를 다루기 위해 새로운 처리기를 등록하는 것도 가능하지만(`http:` 같은 prefix 처리기와 비슷) 이런 작업은 일반적으로 꽤나 복잡한데다가,
`URL` 인터페이스에는 리소스의 존재여부를 확인하는 메소드 같은 몇몇 중요 기능들이 부족하다는 문제가 있습니다.

### 2.2. The Resource Interface

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-introduction )

>
Spring’s `Resource` interface located in the `org.springframework.core.io.` package is meant to be a more capable interface for abstracting access to low-level resources.
The following listing provides an overview of the `Resource` interface.
See the [`Resource`]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/core/io/Resource.html ) javadoc for further details.

Spring의 `Resource` 인터페이스는 `org.springframework.core.io.`패키지에 있습니다. 이 패키지는 저수준 리소스에 대한 엑세스를 추상화하기 위한 유용한 인터페이스들을 담고 있습니다.
다음 목록은 `Resource` 인터페이스를 보여줍니다.
자세한 내용은 `Resource`의 javadoc을 참고하세요.

```java
public interface Resource extends InputStreamSource {

    boolean exists();

    boolean isReadable();

    boolean isOpen();

    boolean isFile();

    URL getURL() throws IOException;

    URI getURI() throws IOException;

    File getFile() throws IOException;

    ReadableByteChannel readableChannel() throws IOException;

    long contentLength() throws IOException;

    long lastModified() throws IOException;

    Resource createRelative(String relativePath) throws IOException;

    String getFilename();

    String getDescription();
}
```

>
As the definition of the `Resource` interface shows, it extends the `InputStreamSource` interface.
The following listing shows the definition of the `InputStreamSource` interface:

`Resource` 인터페이스의 정의를 보면 `InputStreamSource` 인터페이스를 상속하고 있다는 것을 알 수 있습니다.
다음은 `InputStreamSource` 인터페이스의 정의입니다.

```java
public interface InputStreamSource {

    InputStream getInputStream() throws IOException;
}
```

>
Some of the most important methods from the `Resource` interface are:
>
- `getInputStream()`: Locates and opens the resource, returning an `InputStream` for reading from the resource. It is expected that each invocation returns a fresh `InputStream`. It is the responsibility of the caller to close the stream.
- `exists()`: Returns a `boolean` indicating whether this resource actually exists in physical form.
- `isOpen()`: Returns a `boolean` indicating whether this resource represents a handle with an open stream. If `true`, the `InputStream` cannot be read multiple times and must be read once only and then closed to avoid resource leaks. Returns `false` for all usual resource implementations, with the exception of `InputStreamResource`.
- `getDescription()`: Returns a description for this resource, to be used for error output when working with the resource. This is often the fully qualified file name or the actual URL of the resource.

`Resource` 인터페이스의 중요한 메소드들은 다음과 같습니다.

- `getInputStream()`: 리소스를 open하고, 리소스를 읽기 위한 `InputStream`을 리턴합니다.
    - 이 메소드를 리턴할 때마다 새로운 `InputStream`이 리턴되게 됩니다.
    - stream을 닫는 것은 메소드 호출자의 책임입니다.
- `exists()`: 리소스가 실제로 존재하는지를 나타내는 `boolean` 값을 리턴합니다.
- `isOpen()`: 리소스가 open된 stream에 의해 처리중인지를 나타내는 `boolean` 값을 리턴합니다.
    - 리턴값이 `true`이면 `InputStream`은 여러번 읽을 수 없으며, 한 번만 읽고 나서 반드시 close 해줘야 리소스 누수를 방지할 수 있습니다.
    - `InputStreamResource`를 제외한 모든 일반적인 리소스 구현에 대해서는 `false`를 리턴합니다.
- `getDescription()`: 리소스에 대한 설명을 리턴합니다.
    - 이 설명은 리소스로 작업할 때 error output으로 사용됩니다.
    - 이 값은 보통 파일 이름이거나 리소스의 실제 URL입니다.

>
Other methods let you obtain an actual `URL` or `File` object representing the resource (if the underlying implementation is compatible and supports that functionality).

이 외의 다른 메소드들은 호출하면 리소스를 나타내는 실제 `URL`이나 `File` 객체를 얻게 해줍니다.

>
Some implementations of the `Resource` interface also implement the extended [`WritableResource`]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/core/io/WritableResource.html ) interface for a resource that supports writing to it.

`Resource` 인터페이스의 몇몇 구현체들은 쓰기를 지원하는 리소스에 대해 `WritableResource` 인터페이스를 확장하기도 합니다.

>
Spring itself uses the `Resource` abstraction extensively, as an argument type in many method signatures when a resource is needed.
Other methods in some Spring APIs (such as the constructors to various `ApplicationContext` implementations) take a `String` which in unadorned or simple form is used to create a `Resource` appropriate to that context implementation or, via special prefixes on the `String` path, let the caller specify that a specific `Resource` implementation must be created and used.

Spring 자체는 리소스가 필요할 때 다양한 메소드 시그니처를 사용해 인자의 타입으로 `Resource`의 추상화를 지웒합니다.
Spring API의 몇몇 다른 메소드(예: 다양한 `ApplicationContext` 구현체들의 생성자)는 평범하거나 간단한 `String`을 받습니다.
이러한 `String`은 `Resource`를 생성하는 데 사용되는 것이며, 해당 컨텍스트 구현체에 적합한 리소스를 만드는 데에 사용되거나, 경로의 특수한 prefix를 통해 호출자가 특정한 `Resource` 구현체를 만들어야 한다는 것을 명시해 줍니다.

>
While the `Resource` interface is used a lot with Spring and by Spring, it is actually very convenient to use as a general utility class by itself in your own code, for access to resources, even when your code does not know or care about any other parts of Spring.
While this couples your code to Spring, it really only couples it to this small set of utility classes, which serves as a more capable replacement for `URL` and can be considered equivalent to any other library you would use for this purpose.

`Resource` 인터페이스는 Spring 내부에서도 많이 사용되는 편입니다. 이 인터페이스는 Spring의 다른 부분을 잘 몰라도 사용할 수 있으므로, 여러분이 코딩을 통해 자원에 엑세스하려 할 때 평범한 유틸리티 클래스로 사용해도 매우 편리할 것입니다.
`Resource` 인터페이스를 사용하면 여러분의 코드와 Spring 사이에 커플링이 생기게 되지만, 작은 규모의 유틸리티 클래스들과의 커플링인 정도이므로 심각한 것은 아닙니다.
그리고 그 유틸리티 클래스들은 `URL`을 효과적으로 대체할 수 있는 것들이며, 비슷한 목적의 다른 라이브러리들과 큰 차이가 없을 것입니다.


> (i)
The `Resource` abstraction does not replace functionality. It wraps it where possible. For example, a `UrlResource` wraps a URL and uses the wrapped `URL` to do its work.
{:style="background-color: #ecf1e8;"}

- (i)
    - `Resource` 추상화는 기능을 덮어쓰지 않고, 가능한 한 래핑합니다.
    - 예를 들어 `UrlResource`는 URL을 래핑한 `URL`을 사용해 작업을 수행합니다.

### 2.3. Built-in `Resource` Implementations

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-implementations )

>
Spring includes several built-in `Resource` implementations:

Spring에는 `Resource` 구현체가 몇 가지 포함되어 있습니다.

>
- [`UrlResource`]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-implementations-urlresource )
- [`ClassPathResource`]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-implementations-classpathresource )
- [`FileSystemResource`]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-implementations-filesystemresource )
- [`PathResource`]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-implementations-pathresource )
- [`ServletContextResource`]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-implementations-servletcontextresource )
- [`InputStreamResource`]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-implementations-inputstreamresource )
- [`ByteArrayResource`]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-implementations-bytearrayresource )

>
For a complete list of `Resource` implementations available in Spring, consult the "All Known Implementing Classes" section of the [`Resource`]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/core/io/Resource.html ) javadoc.

Spring에서 사용 가능한 `Resource` 구현체의 전체 목록은 `Resource` javadoc의 "All Known Implementing Classes" 섹션을 참고하세요.

#### 2.3.1. `UrlResource`

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-implementations-urlresource )

>
`UrlResource` wraps a `java.net.URL` and can be used to access any object that is normally accessible with a URL, such as files, an HTTPS target, an FTP target, and others.
All URLs have a standardized `String` representation, such that appropriate standardized prefixes are used to indicate one URL type from another.
This includes `file:` for accessing filesystem paths, `https:` for accessing resources through the HTTPS protocol, `ftp:` for accessing resources through FTP, and others.

`UrlResource`는 `java.net.URL`을 래핑합니다. 따라서 파일이나, HTTPS, FTP와 같이 일반적으로 URL로 접근할 수 있는 모든 객체에 엑세스할 때 사용할 수 있습니다.
모든 URL에는 표준화된 `String` 형식이 있으므로 표준화된 prefix를 알맞게 사용하여 하나의 URL 타입을 다른 URL 타입으로 표시할 수 있습니다.
여기에는 `file:`처럼 파일시스템 경로에 엑세스하기 위한 prefix도 포함되며, HTTPS 프로토콜을 통해 리소스에 엑세스하는 목적의 `https:`, FTP를 통해 리소스에 엑세스하려는 목적의 `ftp:`도 포함됩니다.

>
A `UrlResource` is created by Java code by explicitly using the `UrlResource` constructor but is often created implicitly when you call an API method that takes a `String` argument meant to represent a path.
For the latter case, a JavaBeans `PropertyEditor` ultimately decides which type of `Resource` to create.
If the path string contains a well-known (to property editor, that is) prefix (such as `classpath:`), it creates an appropriate specialized `Resource` for that prefix.
However, if it does not recognize the prefix, it assumes the string is a standard URL string and creates a `UrlResource`.

`UrlResource`는 Java 코드에서 명시적으로 `UrlResource` 생성자를 사용하여 생성할 수 있습니다.
그러나 경로를 나타내는 `String` 인자를 사용하는 API 메소드를 호출할 때 암시적으로 생성되는 경우가 더 많습니다.

후자의 경우 생성할 `Resource`의 타입을 JavaBeans `PropertyEditor`가 최종적으로 결정합니다.
만약 경로 문자열이 `PropertyEditor`가 알고 있는 prefix(`classpath:` 같은 것들)로 시작한다면 그에 적합한 `Resource`를 생성하게 됩니다.

그러나 판별할 수 없는 prefix가 주어진 경우라면 해당 문자열을 표준 URL로 전제하고 `UrlResource`를 생성하게 됩니다.


#### 2.3.2. `ClassPathResource`

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-implementations-classpathresource )

