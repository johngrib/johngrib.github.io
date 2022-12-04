---
layout  : wiki
title   : Spring Core Technologies - 2. Resources
summary : 
date    : 2021-07-29 09:43:27 +0900
updated : 2021-08-04 22:11:18 +0900
tag     : java spring
resource: DE/F2DBAB-154D-4046-94C7-65DAB18CC27F
toc     : true
public  : true
parent  : [[/spring/document/core]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[/spring/document/core]]
- 이전 문서 - [[/spring/document/core/01-16-bean-factory]]
- 다음 문서 - 3. Validation, Data Binding, and Type Conversion

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

>
This class represents a resource that should be obtained from the classpath.
It uses either the thread context class loader, a given class loader, or a given class for loading resources.

이 클래스는 classpath에서 가져와야 하는 리소스를 나타냅니다.
thread context 클래스 로더, 지정된 클래스 로더, 또는 리소스를 로드하기 위해 따로 지정한 클래스를 사용합니다.

>
This `Resource` implementation supports resolution as a `java.io.File` if the class path resource resides in the file system but not for classpath resources that reside in a jar and have not been expanded (by the servlet engine or whatever the environment is) to the filesystem.
To address this, the various `Resource` implementations always support resolution as a `java.net.URL`.

`ClassPathResource`는 `Resource` 구현체입니다.
`ClassPathResource`는 클래스 패스 리소스가 파일 시스템에 있다면 `java.io.File`을 사용하지만, jar(servlet 엔진을 쓴다던가, 아무튼 jar를 쓸 수 밖에 없는 경우)에 들어있고 파일 시스템 상의 경로로 판별할 수 없는 classpath 리소스는 지원하지 않습니다.
이런 문제를 해결하기 위해, 다양한 `Resource` 구현체들은 항상 `java.net.URL`을 써서 판별합니다.

>
A `ClassPathResource` is created by Java code by explicitly using the `ClassPathResource` constructor but is often created implicitly when you call an API method that takes a `String` argument meant to represent a path.
For the latter case, a JavaBeans `PropertyEditor` recognizes the special prefix, `classpath:`, on the string path and creates a `ClassPathResource` in that case.

`ClassPathResource`는 Java 코드인 `ClassPathResource` 생성자를 통해 명시적으로 생성됩니다.
그러나 종종 경로를 의미하는 `String` 인자를 사용하는 API를 호출할 때 암묵적으로 `ClassPathResource`가 생성되기도 합니다.
이렇게 암묵적으로 생성하는 경우는 JavaBeans `PropertyEditor`가 String path에 들어있는 `classpath:`라는 prefix를 인식하고 `ClassPathResource`를 생성하는 것입니다.

#### 2.3.3. `FileSystemResource`

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-implementations-filesystemresource )

>
This is a `Resource` implementation for `java.io.File` handles.
It also supports `java.nio.file.Path` handles, applying Spring’s standard String-based path transformations but performing all operations via the `java.nio.file.Files` API.
For pure `java.nio.path.Path` based support use a `PathResource` instead.
`FileSystemResource` supports resolution as a `File` and as a `URL`.

`java.io.File`를 처리하는 `Resource` 구현체입니다.
`java.io.File` 뿐 아니라 `java.nio.file.Path` 처리도 지원하여, Spring 표준 String 기반 path 변환을 적용합니다.
그리고 `java.nio.file.Files` API를 통한 모든 작업도 수행할 수 있습니다.

다만, 순수한 `java.nio.path.Path` 기반의 지원이 필요하다면 `FileSystemResource` 대신 `PathResource`를 사용하는 것이 바람직합니다.
`FileSystemResource`는 `File`과 `URL`을 통해 리소스를 확정합니다.

#### 2.3.4. `PathResource`

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-implementations-pathresource )

>
This is a `Resource` implementation for `java.nio.file.Path` handles, performing all operations and transformations via the `Path` API.
It supports resolution as a `File` and as a `URL` and also implements the extended `WritableResource` interface.
`PathResource` is effectively a pure `java.nio.path.Path` based alternative to `FileSystemResource` with different `createRelative` behavior.

`java.nio.file.Path`를 처리하는 `Resource` 구현체이며, `Path` API를 사용해 변환 작업을 처리합니다.
확장된(extended) `WritableResource` 인터페이스를 구현하고 있으며, `File`과 `URL`의 resolution을 지원합니다.
`PathResource`는 순수하게 `java.nio.path.Path` 기반이기 때문에, `createRelative` 동작을 가진 `FileSystemResource`에 대한 대안책이기도 합니다.

#### 2.3.5. `ServletContextResource`

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-implementations-servletcontextresource )

>
This is a `Resource` implementation for `ServletContext` resources that interprets relative paths within the relevant web application’s root directory.

`ServletContext` 리소스에 대한 `Resource` 구현체입니다. 웹 애플리케이션의 루트 디렉토리 기준의 상대 경로를 처리합니다.

>
It always supports stream access and URL access but allows `java.io.File` access only when the web application archive is expanded and the resource is physically on the filesystem.
Whether or not it is expanded and on the filesystem or accessed directly from the JAR or somewhere else like a database (which is conceivable) is actually dependent on the Servlet container.

이 구현체는 항상 stream access와 URL access를 지원합니다.
다만 `java.io.File`의 access는 웹 애플리케이션의 아카이브가 확장되어 리소스가 물리적으로 파일 시스템에 있는 경우에만 허용됩니다.
자원이 파일 시스템에 있는지 또는 JAR 이나 데이터베이스와 같은 다른 곳에서 직접 엑세스되는지는 Servlet 컨테이너에 따라 달라질 수 있습니다.

#### 2.3.6. `InputStreamResource`

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-implementations-inputstreamresource )

>
An `InputStreamResource` is a `Resource` implementation for a given `InputStream`.
It should be used only if no specific `Resource` implementation is applicable.
In particular, prefer `ByteArrayResource` or any of the file-based `Resource` implementations where possible.

`InputStreamResource`는 `InputStream`에 대한 `Resource` 인터페이스의 구현체이며, 특정 `Resource` 구현을 적용할 수 없는 경우에만 사용해야 합니다.
가능하다면 `ByteArrayResource`나 파일 기반의 리소스 구현을 사용하세요.

>
In contrast to other `Resource` implementations, this is a descriptor for an already-opened resource.
Therefore, it returns `true` from `isOpen()`.
Do not use it if you need to keep the resource descriptor somewhere or if you need to read a stream multiple times.

다른 `Resource` 구현체들과 달리, `InputStreamResource`는 이미 열려 있는 리소스에 대한 descriptor 입니다.
따라서 `isOpen()` 메소드를 호출하면 `true`를 리턴합니다.
리소스 descriptor를 어딘가에 보관해 두어야 하거나, 스트림을 여러 차례 읽어야 하는 경우에는 `InputStreamResource`를 사용하지 마세요.

#### 2.3.7. `ByteArrayResource`

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-implementations-bytearrayresource )

>
This is a `Resource` implementation for a given byte array. It creates a `ByteArrayInputStream` for the given byte array.

이것은 주어진 byte array에 대한 `Resource` 구현체입니다. 주어진 byte array에 대해 `ByteArrayInputStream`을 생성합니다.

>
It is useful for loading content from any given byte array without having to resort to a single-use `InputStreamResource`.

일회용 `InputStreamResource`에 의존하지 않고도 주어진 byte array 에서 콘텐츠를 로드하는 데 유용합니다.

### 2.4. The `ResourceLoader` Interface

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-resourceloader )

The `ResourceLoader` interface is meant to be implemented by objects that can return (that is, load) `Resource` instances.
The following listing shows the `ResourceLoader` interface definition:

`ResourceLoader` 인터페이스는 `Resource` 인스턴스를 리턴할 수 있는(로드할 수 있는) 객체를 의미합니다.
다음은 `ResourceLoader`의 인터페이스 정의입니다.

```java
public interface ResourceLoader {

    Resource getResource(String location);

    ClassLoader getClassLoader();
}
```

>
All application contexts implement the `ResourceLoader` interface.
Therefore, all application contexts may be used to obtain `Resource` instances.

모든 애플리케이션 컨텍스트는 `ResourceLoader` 인터페이스를 구현합니다.
그러므로, 어떤 애플리케이션 컨텍스트를 사용하건 `Resource` 인스턴스를 얻는 것이 가능합니다.

>
When you call `getResource()` on a specific application context, and the location path specified doesn’t have a specific prefix, you get back a `Resource` type that is appropriate to that particular application context.
For example, assume the following snippet of code was run against a `ClassPathXmlApplicationContext` instance:

특정 애플리케이션 컨텍스트의 `getResource()` 메소드를 호출할 때 파라미터로 제공하는 location path에 적절한 prefix가 없다면, 해당 애플리케이션 컨텍스트에 적합한 `Resource` 타입을 리턴하게 됩니다.
예를 들어 다음의 코드가 `ClassPathXmlApplicationContext`에서 실행되었다고 생각해 봅시다.

```java
Resource template = ctx.getResource("some/resource/path/myTemplate.txt");
```

>
Against a `ClassPathXmlApplicationContext`, that code returns a `ClassPathResource`.
If the same method were run against a `FileSystemXmlApplicationContext` instance, it would return a `FileSystemResource`.
For a `WebApplicationContext`, it would return a `ServletContextResource`.
It would similarly return appropriate objects for each context.

`ClassPathXmlApplicationContext`에 대해 위의 코드를 실행하면 `ClassPathResource`가 리턴됩니다.
만약 같은 메소드가 `FileSystemXmlApplicationContext` 인스턴스에서 실행되었다면 `FileSystemResource`를 리턴했을 것이고,
`WebApplicationContext`인스턴스라면 `ServletContextResource`를 리턴했을 것입니다.
이와 같이 각 컨텍스트에 대해 적절한 객체를 리턴하게 됩니다.

>
As a result, you can load resources in a fashion appropriate to the particular application context.

즉 이 방법으로, 특정 애플리케이션 컨텍스트에 적합한 방식으로 알아서 리소스를 로드하는 것이 가능합니다.

>
On the other hand, you may also force `ClassPathResource` to be used, regardless of the application context type, by specifying the special `classpath:` prefix, as the following example shows:

반면에 다음 예제와 같이 `classpath:` prefix를 사용하면, 어떠한 애플리케이션 컨텍스트 타입을 사용하건 간에 `ClassPathResource`를 리턴하도록 강제할 수 있습니다.

```java
Resource template = ctx.getResource("classpath:some/resource/path/myTemplate.txt");
```

>
Similarly, you can force a `UrlResource` to be used by specifying any of the standard `java.net.URL` prefixes.
The following examples use the `file` and `https` prefixes:

이와 비슷하게, 표준 `java.net.URL` prefix를 사용하면 `UrlResource`를 리턴하도록 강제하는 것도 가능합니다.
다음 예제에서는 `file`과 `https`로 prefix를 지정한 것입니다.

```java
Resource template = ctx.getResource("file:///some/resource/path/myTemplate.txt");
```

```java
Resource template = ctx.getResource("https://myhost.com/resource/path/myTemplate.txt");
```

>
The following table summarizes the strategy for converting `String` objects to `Resource` objects:

다음의 표는 `String` 변환을 통해 `Resource`를 얻는 전략을 요약한 것입니다.

>
Table 10. Resource strings
>
> | Prefix     | Example                          | Explanation                                                                                      |
> |------------|----------------------------------|--------------------------------------------------------------------------------------------------|
> | classpath: | `classpath:com/myapp/config.xml` | Loaded from the classpath.                                                                       |
> | file:      | `file:///data/config.xml`        | Loaded as a `URL` from the filesystem. See also [`FileSystemResource`][file-system-res] Caveats. |
> | https:     | `https://myserver/logo.png`      | Loaded as a `URL`.                                                                               |
> | (none)     | `/data/config.xml`               | Depends on the underlying  `ApplicationContext` .                                                |

[file-system-res]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-filesystemresource-caveats


### 2.5. The `ResourcePatternResolver` Interface

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-resourcepatternresolver )

>
The `ResourcePatternResolver` interface is an extension to the `ResourceLoader` interface which defines a strategy for resolving a location pattern (for example, an Ant-style path pattern) into `Resource` objects.

`ResourcePatternResolver` 인터페이스는 `ResourceLoader` 인터페이스를 확장한 것이며, location pattern(Ant 스타일의 path pattern)을 읽고 `Resource` 객체로 해석하려는 목적을 갖고 있습니다.

```java
public interface ResourcePatternResolver extends ResourceLoader {

    String CLASSPATH_ALL_URL_PREFIX = "classpath*:";

    Resource[] getResources(String locationPattern) throws IOException;
}
```

>
As can be seen above, this interface also defines a special `classpath*:` resource prefix for all matching resources from the class path.
Note that the resource location is expected to be a path without placeholders in this case — for example, `classpath*:/config/beans.xml`.
JAR files or different directories in the class path can contain multiple files with the same path and the same name.
See [Wildcards in Application Context Constructor Resource Paths]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-app-ctx-wildcards-in-resource-paths ) and its subsections for further details on wildcard support with the `classpath*:` resource prefix.

위의 예제에서 알 수 있듯이, 이 인터페이스는 class path에서 일치하는 모든 리소스를 의미하는 `classpath*:` prefix를 정의합니다.
이 경우 리소스의 경로에는 placeholder가 없어야 합니다(예: `classpath*:/config/beans.xml`).
JAR 파일이나 class path의 다른 디렉토리들도 이 표기법으로 지정이 가능합니다.
`classpath*:` 리소스 prefix를 사용한 와일드카드 지원에 대한 자세한 내용은 [Wildcards in Application Context Constructor Resource Paths]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-app-ctx-wildcards-in-resource-paths ) 문서를 참고하세요.

>
A passed-in `ResourceLoader` (for example, one supplied via [`ResourceLoaderAware`]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-resourceloaderaware ) semantics) can be checked whether it implements this extended interface too.

전달된 `ResourceLoader`(예: `ResourceLoaderAware`를 통해 제공된)도 이런 확장 인터페이스를 구현하는지를 확인할 수 있습니다.

>
`PathMatchingResourcePatternResolver` is a standalone implementation that is usable outside an `ApplicationContext` and is also used by `ResourceArrayPropertyEditor` for populating `Resource[]` bean properties.
`PathMatchingResourcePatternResolver` is able to resolve a specified resource location path into one or more matching `Resource` objects.
The source path may be a simple path which has a one-to-one mapping to a target `Resource`, or alternatively may contain the special `classpath*:` prefix and/or internal Ant-style regular expressions (matched using Spring’s `org.springframework.util.AntPathMatcher` utility).
Both of the latter are effectively wildcards.

`PathMatchingResourcePatternResolver`는 `ApplicationContext` 외부에서 사용할 수 있는 standalone 구현체이며, `Resource[]` bean 프로퍼티를 채워넣기 위해 `ResourceArrayPropertyEditor`에서도 사용됩니다.
`PathMatchingResourcePatternResolver`는 지정된 리소스 경로를 일치하는 하나 이상의 `Resource` 객체들로 확정할 수 있습니다.
source path는 대상 `Resource`에 대한 일대일 매핑이 있는 간단한 경로를 쓰거나, 또는 `classpath*:` prefix, 또는 Ant 스타일의 정규식(Spring의 `org.springframework.util.AntPathMatcher` utility를 사용)를 사용할 수 있습니다.
마지막 두 가지는 사실상 와일드카드라 할 수 있습니다.

> (i)
The default `ResourceLoader` in any standard `ApplicationContext` is in fact an instance of `PathMatchingResourcePatternResolver` which implements the `ResourcePatternResolver` interface.
The same is true for the `ApplicationContext` instance itself which also implements the `ResourcePatternResolver` interface and delegates to the default `PathMatchingResourcePatternResolver`.


### 2.6. The `ResourceLoaderAware` Interface

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-resourceloaderaware )

### 2.7. Resources as Dependencies

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-as-dependencies )

### 2.8. Application Contexts and Resource Paths

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-app-ctx )

## 함께 읽기

- 목록으로 - [[/spring/document/core]]
- 이전 문서 - [[/spring/document/core/01-16-bean-factory]]
- 다음 문서 - 3. Validation, Data Binding, and Type Conversion

