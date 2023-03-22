---
layout  : wiki
title   : Comrade
summary : IntelliJ를 NeoVim 플러그인으로 사용하기
date    : 2023-03-22 21:15:25 +0900
updated : 2023-03-23 00:07:24 +0900
tag     : 
resource: AB/9B1B40-C711-400A-8638-91C9B5ADECDC
toc     : true
public  : true
parent  : [[/vim]]
latex   : false
---
* TOC
{:toc}

## 개요

IntelliJ와 NeoVim을 연동해서 파일 변경사항을 동기화하고, 자동완성과 린팅 등을 IntelliJ에서 받아와 NeoVim에서 사용할 수 있게 해주는 플러그인.


- [beeender/Comrade]( https://github.com/beeender/Comrade ) - NeoVim에 설치하는 플러그인
- [beeender/ComradeNeovim]( https://github.com/beeender/ComradeNeovim ) - IntelliJ에 설치하는 플러그인
    - [Comrade Neovim (JetBrains Marketplace)]( https://plugins.jetbrains.com/plugin/12153-comrade-neovim )

플러그인이 두 개가 있으며,
각각 IntelliJ와 NeoVim에 설치하여 이 둘을 통해 IntelliJ와 NeoVim이 연동되는 방식이다.

![]( /resource/AB/9B1B40-C711-400A-8638-91C9B5ADECDC/comrade.svg )

그러나 Comrade는 2020년, ComradeNeovim은 2019년 이후로는 전혀 유지보수가 되지 않는 상태.

- ComradeNeovim
    - Java 버전으로 1.8 사용
    - IntelliJ Platform Plugin SDK 0.4.7 버전 사용
        - (2022년 3월 현재 최신 버전은 1.13.2)


## 문제 해결

### Apple Silicon에서 작동하지 않는 문제 해결

Intel 맥에서는 문제없이 잘 작동했으나 내 M2 프로세서 Apple Silicon이 장착된 Mac Mini에서는 작동하지 않는 문제가 있었다.

원인이 되는 곳은 다음 코드였다.

[NvimInstance.kt]( https://github.com/johngrib/ComradeNeovim/blob/6006eaf8b26f1baec12cd84e190d7dc96cda4ed2/src/main/kotlin/org/beeender/comradeneovim/core/NvimInstance.kt#L65 )

```kotlin
import org.scalasbt.ipcsocket.UnixDomainSocket
                           // ↑ 여기가 문제!

private fun createRPCConnection(address: String): NeovimConnection {
    Log.info("Creating RPC connection from '$address'")

    val ipInfo = parseIPV4String(address)
    if (ipInfo!= null)
        return SocketConnection(Socket(ipInfo.first, ipInfo.second))
    else {
        val file = File(address)
        if (file.exists())
            return SocketConnection(
                    if (isWindows()) Win32NamedPipeSocketPatched(address)
                    else UnixDomainSocket(address))
                      // ↑ 여기가 문제!
    }
    throw IllegalArgumentException("Cannot create RPC connection from given address: '$address'.")
}
```

해결 과정을 나열해 보자면 다음과 같다.

1. sbt의 `UnixDomainSocket`을 사용하면 `UnsupportedOperationException("Not supported")`가 던져진다.
2. 왜 그런가? 로그 코드를 추가하고, 빌드하고, IntelliJ에 설치한 다음, IntelliJ 로그를 보면서 확인.

[sun.nio.ch.SocketChannelImpl.java]( https://github.com/AdoptOpenJDK/openjdk-jdk/blob/6bb7e45e8e1a8f5a3b2f9c92b610fa4236f2eb90/src/java.base/share/classes/sun/nio/ch/SocketChannelImpl.java#L223-L227 )

```java
@Override
public Socket socket() {
    synchronized (stateLock) {
        if (socket == null) {
            if (isNetSocket()) {
                socket = SocketAdaptor.create(this);
            } else {
                throw new UnsupportedOperationException("Not supported");
                // ↑ 여기에서 던진다
            }
        }
        return socket;
    }
}
```

소켓을 생성해 리턴하는 코드를 보면 `isNetSocket()`을 호출하는데, Comrade는 net socket이 아니라 unix domain socket을 사용하기 때문에 작동하지 않았던 것이다.

[`isNetSocket()` 과 `isUnixSocket()`]( https://github.com/AdoptOpenJDK/openjdk-jdk/blob/6bb7e45e8e1a8f5a3b2f9c92b610fa4236f2eb90/src/java.base/share/classes/sun/nio/ch/SocketChannelImpl.java#L174-L186 )

```java
/**
 * Returns true if this channel is to a INET or INET6 socket.
 */
boolean isNetSocket() {
    return (family == INET) || (family == INET6);
}

/**
 * Returns true if this channel is to a UNIX socket.
 */
boolean isUnixSocket() {
    return (family == UNIX);
}
```

이걸 해결하기 위해 사흘간 다양한 시도를 해 보았고 그 과정에서 새로 알게 된 것들이 몇 가지 있었다.

- Java 16 부터 Unix domain socket 이 지원된다. (`SocketChannel`, `ServerSocketChannel`)
    - [JEP-380: Unix domain socket channels]( https://inside.java/2021/02/03/jep380-unix-domain-sockets-channels/ )
    - [Internet Protocol and UNIX Domain Sockets NIO Example (docs.oracle.com)]( https://docs.oracle.com/en/java/javase/16/core/internet-protocol-and-unix-domain-sockets-nio-example.html )
- ComradeNeovim에서 사용하고 있는 [org.scalasbt.ipcsocket.UnixDomainSocket]( https://github.com/sbt/ipcsocket/blob/develop/src/main/java/org/scalasbt/ipcsocket/UnixDomainSocket.java )은 Apple Silicon을 아직 지원하지 않는다.
    - [SBT not functional on Apple M1 silicon (arm64 arch) #6187]( https://github.com/sbt/sbt/issues/6187 )
- [junixsocket — Unix Domain Sockets for Java]( https://kohlschutter.github.io/junixsocket/ )은 Apple Silicon도 지원한다.

삽질을 많이 하긴 했지만 결론적으로 sbt의 `UnixDomainSocket`을 junixsocket의 `AFUNIXSocket`으로 교체하여 해결할 수 있었다.

다음은 문제를 해결한 코드이다.

[Merge: Fix Apple Silicon issue]( https://github.com/johngrib/ComradeNeovim/commit/c8128b4f7808fd306a5edaa8f8cd58d725fffed3 )

`createRPCConnection` 함수를 좀 수정했다.

```kotlin
import org.newsclub.net.unix.AFUNIXSocket
import org.newsclub.net.unix.AFUNIXSocketAddress

private fun createRPCConnection(address: String): NeovimConnection {
    Log.info("Creating RPC connection from '$address'")

    val ipInfo = parseIPV4String(address)
    if (ipInfo!= null) {
        return SocketConnection(Socket(ipInfo.first, ipInfo.second))
    }

    val file = File(address)
    if (!file.exists()) {
        throw IllegalArgumentException("Cannot create RPC connection from given address: '$address'.")
    }

    if (isWindows()) {
        return SocketConnection(Win32NamedPipeSocketPatched(address))
    }

              // ↓ AFUNIXSocket을 사용해 문제 해결
    val socket : AFUNIXSocket = AFUNIXSocket.newInstance()
    socket.connect(AFUNIXSocketAddress.of(File(address)))
    return SocketConnection(socket)
}
```

