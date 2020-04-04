---
layout  : wiki
title   : (번역) 프로젝트 Jigsaw - 모듈 시스템 빠른 시작 가이드
summary : Project Jigsaw; Module System Quick-Start Guide
date    : 2019-09-12 19:31:50 +0900
updated : 2020-02-08 23:56:48 +0900
tag     : java 번역
toc     : true
public  : true
parent  : [[Java]]
latex   : false
---
* TOC
{:toc}

* 원문: [Project Jigsaw: Module System Quick-Start Guide][tutorial]
* 의역이 많으며 오역이 있을 수 있습니다.


_This document provides a few simple examples to get developers started with modules._

_The file paths in the examples use forward slashes, and the path separators are colons. Developers on Microsoft Windows should use file paths with back slashes and a semi-colon as the path separator._

이 문서는 개발자들이 모듈을 시작해볼 수 있도록 몇 가지 간단한 예제를 제공합니다.

예제의 파일 경로 구분자는 슬래쉬(/)를 사용하며, 경로 구분자는 콜론(:)입니다.
마이크로소프트 윈도우즈를 사용하는 개발자들은 백 슬래쉬(\)와 세미 콜론(;)을 구분자로 사용하세요.

## Greetings

_This first example is a module named com.greetings that simply prints "Greetings!". The module consists of two source files: the module declaration (module-info.java) and the main class._

_By convention, the source code for the module is in a directory that is the name of the module._

첫 번째 예제는 "Greetings!"를 출력하는 `com.greetings`라는 모듈입니다. 모듈은 두 개의 소스 파일로 이루어집니다.

* 모듈 선언(module-info.java) 파일
* main class 파일.

```java
// src/com.greetings/module-info.java
module com.greetings { }
```

```java
// src/com.greetings/com/greetings/Main.java
package com.greetings;
public class Main {
    public static void main(String[] args) {
        System.out.println("Greetings!");
    }
```

_The source code is compiled to the directory mods/com.greetings with the following commands:_

다음 명령을 사용하면 소스 코드는 `mods/com.greetings` 디렉토리로 컴파일됩니다.

```sh
$ mkdir -p mods/com.greetings

$ javac -d mods/com.greetings \
    src/com.greetings/module-info.java \
    src/com.greetings/com/greetings/Main.java
```

_Now we run the example with the following command:_

이제 다음 명령어를 입력하면 실행할 수 있습니다.

```sh
$ java --module-path mods -m com.greetings/com.greetings.Main
```

_--module-path is the module path, its value is one or more directories that contain modules. The -m option specifies the main module, the value after the slash is the class name of the main class in the module._

`--module-path`는 모듈 경로를 지정하며, 값은 모듈을 포함하고 있는 하나 이상의 디렉토리입니다.
`-m` 옵션은 main 모듈을 지정하며, `/` 뒤의 값은 모듈에 있는 main class의 클래스명입니다.

## Greetings world

_This second example updates the module declaration to declare a dependency on module org.astro. Module org.astro exports the API package org.astro._

두 번째 예제는 모듈 선언을 업데이트하여 `org.astro` 모듈에 대한 디펜던시를 선언합니다.
`org.astro` 모듈은 API 패키지로 `org.astro`를 내보냅니다.

* org.astro

```java
// src/org.astro/module-info.java
module org.astro {
    exports org.astro;
}
```

```java
// src/org.astro/org/astro/World.java
package org.astro;
public class World {
    public static String name() {
        return "world";
    }
}
```

* com.greetings

```java
// src/com.greetings/module-info.java
module com.greetings {
    requires org.astro;
}
```

```java
// src/com.greetings/com/greetings/Main.java
package com.greetings;
import org.astro.World;     // import
public class Main {
    public static void main(String[] args) {
        System.out.format("Greetings %s!%n", World.name());
    }
}
```

_The modules are compiled, one at a time. The javac command to compile module com.greetings specifies a module path so that the reference to module org.astro and the types in its exported packages can be resolved._

모듈은 한 번에 하나씩 컴파일됩니다. `com.greetings` 모듈을 컴파일하는 `javac` 명령은 모듈 경로를 지정하여 모듈 `com.greetings`에 대한 참조 및 내보낸 패키지의 유형을 확인할 수 있습니다.

```sh
$ mkdir -p mods/org.astro mods/com.greetings

$ javac -d mods/org.astro \
    src/org.astro/module-info.java  src/org.astro/org/astro/World.java

$ javac --module-path mods -d mods/com.greetings \
    src/com.greetings/module-info.java  src/com.greetings/com/greetings/Main.java
```

_The example is run in exactly the same way as the first example:_

이 예제는 첫 번째 예제와 완전히 똑같이 작동합니다.

```sh
$ java --module-path mods -m com.greetings/com.greetings.Main
Greetings world!
```

## Multi-module compilation

_In the previous example then module com.greetings and module org.astro were compiled separately. It is also possible to compile multiple modules with one javac command:_

앞의 예제에서 `com.greetings`와 `org.astro`는 따로따로 컴파일됐습니다.
그런데 `javac` 명령 한 번으로 여러 모듈을 한꺼번에 컴파일하는 것도 가능합니다.

```sh
$ mkdir mods

$ javac -d mods --module-source-path src $(find src -name "*.java")

$ find mods -type f
mods/com.greetings/com/greetings/Main.class
mods/com.greetings/module-info.class
mods/org.astro/module-info.class
mods/org.astro/org/astro/World.class
```

## Packaging

_In the examples so far then the contents of the compiled modules are exploded on the file system. For transportation and deployment purposes then it is usually more convenient to package a module as a modular JAR. A modular JAR is a regular JAR file that has a module-info.class in its top-level directory. The following example creates org.astro@1.0.jar and com.greetings.jar in directory mlib._

지금까지의 예제에서는 컴파일된 모듈의 내용이 파일 시스템 위에서 전개됐습니다.
하지만 모듈을 `JAR` 모듈로 패키징하는 것이 전송이나 배포 목적상 더 편리합니다.
`JAR` 모듈은 최상위 디렉토리에 `module-info.class`가 있는 평범한 `JAR` 파일입니다.
다음 예제는 `mlib` 디렉토리에 `org.astro@1.0.jar`와 `com.greetings.jar`를 만듭니다.

```sh
$ mkdir mlib

$ jar --create --file=mlib/org.astro@1.0.jar \
    --module-version=1.0 -C mods/org.astro .

$ jar --create --file=mlib/com.greetings.jar \
    --main-class=com.greetings.Main -C mods/com.greetings .

$ ls mlib
com.greetings.jar   org.astro@1.0.jar
```

_In this example, then module org.astro is packaged to indicate that its version is 1.0. Module com.greetings has been packaged to indicate that its main class is com.greetings.Main. We can now execute module com.greetings without needing to specify its main class:_

이 예제에서는 `org.astro` 모듈은 1.0 버전으로 패키징됩니다.
`com.greetings` 모듈은 메인 클래스를 `com.greetings.Main`로 삼는 패키지가 되었습니다.
이제 우리는 메인 클래스를 일일이 지정하지 않아도 `com.greetings` 모듈을 실행할 수 있게 되었습니다.

```sh
$ java -p mlib -m com.greetings
Greetings world!
```

_The command line is also shortened by using -p as an alternative to --module-path._

_The jar tool has many new options (see jar -help), one of which is to print the module declaration for a module packaged as a modular JAR._

`--module-path`는 `-p`로 줄여 쓸 수 있습니다.

`jar` 도구에는 새로운 옵션이 많이 포함되었으며(`jar -help`를 참고하세요), 그 중 하나는 `JAR` 모듈로 패키징된 모듈의 선언을 출력하는 기능을 갖고 있습니다.

```sh
$ jar --describe-module --file=mlib/org.astro@1.0.jar
org.astro@1.0 jar:file:///d/mlib/org.astro@1.0.jar/!module-info.class
exports org.astro
requires java.base mandated
```

## Missing requires or missing exports

_Now let's see what happens with the previous example when we mistakenly omit the requires from the com.greetings module declaration:_

이제 `com.greetings` 모듈 선언에서 실수로 `requires`를 빠뜨리면 어떤 일이 발생하는지 알아봅시다.

```java
// src/com.greetings/module-info.java
module com.greetings {
    // requires org.astro;  // 실수한 부분
}
```

```sh
$ javac --module-path mods -d mods/com.greetings \
    src/com.greetings/module-info.java src/com.greetings/com/greetings/Main.java
src/com.greetings/com/greetings/Main.java:2: error: package org.astro is not visible
    import org.astro.World;
              ^
  (package org.astro is declared in module org.astro, but module com.greetings does not read it)
1 error
```

_We now fix this module declaration but introduce a different mistake, this time we omit the exports from the org.astro module declaration:_

이 때 모듈 선언을 수정했지만, 또다른 실수를 했다고 합시다. 이번에는 `org.astro`에서 `exports`를 빼먹었습니다.

```java
// src/com.greetings/module-info.java
module com.greetings {
    requires org.astro;
}
```

```java
// src/org.astro/module-info.java
module org.astro {
    // exports org.astro;   // 실수한 부분
}
```

```sh
$ javac --module-path mods -d mods/com.greetings \
    src/com.greetings/module-info.java src/com.greetings/com/greetings/Main.java
$ javac --module-path mods -d mods/com.greetings \
   src/com.greetings/module-info.java src/com.greetings/com/greetings/Main.java
src/com.greetings/com/greetings/Main.java:2: error: package org.astro is not visible
    import org.astro.World;
              ^
  (package org.astro is declared in module org.astro, which does not export it)
1 error
```

## Services

_Services allow for loose coupling between service consumers modules and service providers modules._

_This example has a service consumer module and a service provider module:_

* _module com.socket exports an API for network sockets. The API is in package com.socket so this package is exported. The API is pluggable to allow for alternative implementations. The service type is class com.socket.spi.NetworkSocketProvider in the same module and thus package com.socket.spi is also exported._
* _module org.fastsocket is a service provider module. It provides an implementation of com.socket.spi.NetworkSocketProvider. It does not export any packages._

_The following is the source code for module com.socket ._

서비스를 통해 서비스 사용자 모듈과 서비스 제공자 모듈을 느슨하게 연결할 수 있습니다.

이번 예제에서는 서비스 사용자 모듈과 서비스 제공자 모듈이 등장합니다.

* `com.socket` 모듈은 네트워크 소켓을 위한 API를 export 합니다. API는 대체 구현으로 교체가 가능(pluggable) 합니다. 서비스 유형은 같은 모듈에 들어있는 `com.socket.spi.NetworkSocketProvider` 클래스이므로 `com.socket.spi` 패키지도 함께 export 됩니다.
* `org.fastsocket` 모듈은 **서비스 제공자 모듈**입니다. 이 모듈은 `com.socket.spi.NetworkSocketProvider`의 구현체를 제공하며, 어떤 패키지도 export 하지 않습니다.

다음은 `com.socket` 모듈(서비스 사용자 모듈)의 소스 코드입니다.

```java
// src/com.socket/module-info.java
module com.socket {
    exports com.socket;
    exports com.socket.spi;
    uses com.socket.spi.NetworkSocketProvider;
}
```

```java
// src/com.socket/com/socket/NetworkSocket.java
package com.socket;

import java.io.Closeable;
import java.util.Iterator;
import java.util.ServiceLoader;

import com.socket.spi.NetworkSocketProvider;

public abstract class NetworkSocket implements Closeable {
    protected NetworkSocket() { }

    public static NetworkSocket open() {
        ServiceLoader<NetworkSocketProvider> sl
            = ServiceLoader.load(NetworkSocketProvider.class);
        Iterator<NetworkSocketProvider> iter = sl.iterator();
        if (!iter.hasNext())
            throw new RuntimeException("No service providers found!");
        NetworkSocketProvider provider = iter.next();
        return provider.openNetworkSocket();
    }
}
```

```java
// src/com.socket/com/socket/spi/NetworkSocketProvider.java
package com.socket.spi;

import com.socket.NetworkSocket;

public abstract class NetworkSocketProvider {
    protected NetworkSocketProvider() { }

    public abstract NetworkSocket openNetworkSocket();
}
```

_The following is the source code for module org.fastsocket._

다음은 `org.fastsocket` 모듈(서비스 제공자 모듈)의 소스 코드입니다.

```java
// src/org.fastsocket/module-info.java
module org.fastsocket {
    requires com.socket;
    provides com.socket.spi.NetworkSocketProvider
        with org.fastsocket.FastNetworkSocketProvider;
}
```

```java
// src/org.fastsocket/org/fastsocket/FastNetworkSocketProvider.java
package org.fastsocket;

import com.socket.NetworkSocket;
import com.socket.spi.NetworkSocketProvider;

/* com.socket.spi.NetworkSocketProvider를 extends 한다 */
public class FastNetworkSocketProvider extends NetworkSocketProvider {
    public FastNetworkSocketProvider() { }

    @Override
    public NetworkSocket openNetworkSocket() {
        return new FastNetworkSocket();
    }
}
```

```java
// src/org.fastsocket/org/fastsocket/FastNetworkSocket.java
package org.fastsocket;

import com.socket.NetworkSocket;

class FastNetworkSocket extends NetworkSocket {
    FastNetworkSocket() { }
    public void close() { }
}
```

_For simplicity, we compile both modules together. In practice then the service consumer module and service provider modules will nearly always be compiled separately._

단순하게 하기 위해, 우리는 두 모듈을 함께 컴파일합시다.
실제로는 서비스 공급자와 사용자 모듈은 따로 컴파일됩니다.

```sh
$ mkdir mods
$ javac -d mods --module-source-path src $(find src -name "*.java")
```

_Finally we modify our module com.greetings to use the API._

마지막으로 API를 사용할 수 있도록 우리의 `com.greetings` 모듈을 수정해 줍시다.

```java
// src/com.greetings/module-info.java
module com.greetings {
    requires com.socket;
}
```

```java
// src/com.greetings/com/greetings/Main.java
package com.greetings;

import com.socket.NetworkSocket;

public class Main {
    public static void main(String[] args) {
        NetworkSocket s = NetworkSocket.open();
        System.out.println(s.getClass());
    }
}
```

```sh
$ javac -d mods/com.greetings/ -p mods $(find src/com.greetings/ -name "*.java")
```

_Finally we run it:_

이제 실행해 봅시다.

```sh
$ java -p mods -m com.greetings/com.greetings.Main
class org.fastsocket.FastNetworkSocket
```

_The output confirms that the service provider has been located and that it was used as the factory for the NetworkSocket._

출력을 보면 서비스 제공자가 `NetworkSocket`의 팩토리로 사용되었음을 확인할 수 있습니다.

## The linker

_jlink is the linker tool and can be used to link a set of modules, along with their transitive dependences, to create a custom modular run-time image (see JEP 220)._

_The tool currently requires that modules on the module path be packaged in modular JAR or JMOD format. The JDK build packages the standard and JDK-specific modules in JMOD format._

_The following example creates a run-time image that contains the module com.greetings and its transitive dependences:_

`jlink`는 링커 도구이며, 커스텀 모듈 방식의 런타임 이미지를 만들 목적으로 모듈 집합을 디펜던시와 함께 링크하는데 사용할 수 있습니다.

이 도구는 현재 모듈 경로의 모듈을 `JAR` 또는 `JMOD` 형식으로 패키징해야 사용할 수 있습니다.
JDK 빌드는 표준 및 JDK-specific 모듈을 JMOD 형식으로 패키징합니다.

다음 예제는 `com.greetings` 및 해당 디펜던시들을 포함하는 런타임 이미지를 만듭니다.

```sh
jlink --module-path $JAVA_HOME/jmods:mlib --add-modules com.greetings --output greetingsapp
```

_The value to --module-path is a PATH of directories containing the packaged modules. Replace the path separator ':' with ';' on Microsoft Windows._

_$JAVA_HOME/jmods is the directory containing java.base.jmod and the other standard and JDK modules._

_The directory mlib on the module path contains the artifact for module com.greetings._

_The jlink tool supports many advanced options to customize the generated image, see jlink --help for more options._


`--module-path`는 패키지 모듈이 들어있는 디렉토리의 경로입니다.
MS 윈도우즈에서는 `:`를 `;`로 바꿔서 해보세요.

`_$JAVA_HOME/jmods`는 `java.base.jmod`와 기타 표준 JDK 모듈을 포함하는 디렉토리입니다.

모듈 경로의 `mlib` 디렉토리에는 `com.greetings` 모듈의 아티팩트가 있습니다.

`jlink` 도구는 생성된 이미지를 커스터마이즈하기 위한 여러 고급 옵션들을 제공합니다.
자세한 내용은 `jlink --help`를 참고하세요.

## --patch-module

_Developers that checkout java.util.concurrent classes from Doug Lea's CVS will be used to compiling the source files and deploying those classes with -Xbootclasspath/p._

_-Xbootclasspath/p has been removed, its module replacement is the option --patch-module to override classes in a module. It can also be used to augment the contents of module. The --patch-module option is also supported by javac to compile code "as if" part of the module._

_Here's an example that compiles a new version of java.util.concurrent.ConcurrentHashMap and uses it at run-time:_

Doug Lea의 CVS에서 `java.util.concurrent` 클래스들을 체크아웃하면, 소스 파일을 컴파일하고 `-Xbootclasspath/p` 옵션으로 배포하는 데에 사용할 수 있습니다.

`-Xbootclasspath/p`는 현재 제거되었으며, `--patch-module` 옵션으로 교체되었습니다.
`--patch-module`은 모듈의 내용을 추가하는 데에 사용할 수 있습니다.
`--patch-module` 옵션은 `javac`도 지원하며, 모듈이 "있는 것처럼" 컴파일 할 수 있습니다.

다음 예제는 `java.util.concurrent.ConcurrentHashMap`의 새로운 버전을 컴파일하고, 런타임에서 사용하는 것을 보여줍니다.

```sh
javac --patch-module java.base=src -d mypatches/java.base \
    src/java.base/java/util/concurrent/ConcurrentHashMap.java

java --patch-module java.base=mypatches/java.base ...
```

## More information

* [The State of the Module System](https://openjdk.java.net/projects/jigsaw/spec/sotms/ )
* [JEP 261: Module System](https://openjdk.java.net/jeps/261 )
* [Project Jigsaw](https://openjdk.java.net/projects/jigsaw/ )

## License 관련 사항

* 이 번역문의 원문은 [GPLv2](https://openjdk.java.net/legal/gplv2+ce.html )를 따릅니다.
* 이 번역문의 원문 주소는 [이곳][tutorial] 입니다.
* 번역하는 과정에서 상당한 의역과 임의의 내용 추가가 있었습니다.

## Links

* [Project Jigsaw: Module System Quick-Start Guide][tutorial]

[tutorial]: https://openjdk.java.net/projects/jigsaw/quick-start
