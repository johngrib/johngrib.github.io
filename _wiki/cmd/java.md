---
layout  : wiki
title   : java
summary : 
date    : 2023-01-01 15:08:19 +0900
updated : 2023-01-01 16:51:06 +0900
tag     : java
resource: 30/3086D2-D92F-4CEA-914D-7CC3247B680C
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Description

>
> The `java` command starts a Java application.
> It does this by starting the Java Runtime Environment (JRE), loading the specified class, and calling that class's `main()` method.
> The method must be declared `public` and `static`, it must not return any value, and it must accept a `String` array as a parameter.
> The method declaration has the following form:
>
> ```java
> public static void main(String[] args)
> ```
[^javase11-description]

`java` 명령어는 Java 애플리케이션을 시작합니다.
이 명령은 JRE(Java Runtime Environment)를 시작하고, 지정된 클래스를 로드하고, 그 클래스의 `main()` 메소드를 호출합니다.
`main()` 메소드는 반드시 `public` `static`으로 선언되어야 하며, 리턴값이 없어야 합니다.
그리고 `String` 배열을 파라미터로 받아야 합니다.
`main()` 메소드 선언 형식은 다음과 같습니다.

```java
public static void main(String[] args)
```

## 개요

```bash
 # class 파일 실행하기
java [options] mainclass [args...] 

 # jar 파일 실행하기
java [options] -jar jarfile [args...]

 # module의 main class 실행하기
java [options] -m module[/mainclass] [args...] 
java [options] --module module[/mainclass] [args...] 
```

- `[options]`: 공백으로 구분된 옵션들.
- `mainclass`: 실행할 클래스 이름
- `-jar jarfile`: jar 파일로 캡슐화한 프로그램을 실행한다.
- `-m`, `--module module[/mainclass]`: 모듈의 기본 클래스를 실행한다.
- `[args...]`: 공백으로 구분된 인자들.

## options

- Standard options: 모든 JVM 구현에서 지원하도록 보장된 옵션.
- Extra options: Java HotSpot Virtual Machine에 특정된 옵션. `-X`로 시작한다.
- Advanced options: 고급 옵션. `-XX`로 시작한다.


한편, 옵션들 중에서 boolean 값을 갖는 것은 `+` 또는 `-`를 사용해 on / off를 표현하므로 꼭 기억해둬야 한다.

- `-XX:+OptionName`: OptionName을 활성화한다.
- `-XX:-OptionName`: OptionName을 비활성화한다.

### standard options

#### -Dproperty=value

시스템 속성 값을 설정한다.

```
-Dfoo=bar
```

공백이 포함되어 있다면 쌍따옴표를 사용한다.

```
-Dfoo="bar baz"
```

- 예제

```
 # spring.profiles.active를 dev 로 설정하고, myapp.jar를 실행한다.
java -jar -Dspring.profiles.active=dev myapp.jar
```

#### -version

output stream에 버전을 출력하고 종료한다.

#### \--version

error stream에 버전을 출력하고 종료합니다.

### Extra Options

extra option은 `-X`로 시작한다.

#### -Xmn size

[Java SE 11 문서의 -xmn 섹션](https://docs.oracle.com/en/java/javase/11/tools/java.html#GUID-3B1CE181-CD30-4178-9602-230B800D4FAE__GUID-462EA549-0BFB-4221-A803-412C63D6BA5F )

>
Sets the initial and maximum size (in bytes) of the heap for the young generation (nursery).
Append the letter `k` or `K` to indicate kilobytes, `m` or `M` to indicate megabytes, or `g` or `G` to indicate gigabytes.
The young generation region of the heap is used for new objects.
GC is performed in this region more often than in other regions.
If the size for the young generation is too small, then a lot of minor garbage collections are performed.
If the size is too large, then only full garbage collections are performed, which can take a long time to complete.
Oracle recommends that you keep the size for the young generation greater than 25% and less than 50% of the overall heap size.
The following examples show how to set the initial and maximum size of young generation to 256 MB using various units:

young generation(nursery)에 대한 heap의 initial 크기와 maximum 크기를 byte 단위로 설정합니다.
`k` 또는 `K`를 붙이면 kilobytes, `m` 또는 `M`을 붙이면 megabytes, `g` 또는 `G`를 붙이면 gigabytes로 해석하게 됩니다.
heap의 young generation은 새로운 객체를 위해 사용되는 영역입니다.
따라서 다른 영역보다 이 영역에서 GC가 더 자주 수행됩니다.
만약 young generation의 크기가 너무 작다면, minor garbage collection도 많이 수행될 것입니다.
그러나 크기가 너무 크다면, 시간이 오래 걸리는 full garbage collection만 수행될 수 있습니다.
Oracle은 young generation의 크기를 전체 heap 크기의 25% 이상 50% 미만으로 유지하는 것을 권장합니다.
다음은 다양한 단위를 사용하여 young generation의 initial 크기와 maximum 크기를 256 MB로 설정하는 예제입니다.

> ```
> -Xmn256m
> -Xmn262144k
> -Xmn268435456
> ```
[^xmn-unit-note]
>
Instead of the `-Xmn` option to set both the initial and maximum size of the heap for the young generation, you can use `-XX:NewSize` to set the initial size and `-XX:MaxNewSize` to set the maximum size.
[^javase11-xmn]

young generation의 initial 크기와 maximum 크기를 설정하는 `-Xmn` 옵션 대신에, `-XX:NewSize`를 사용하여 initial 크기를 설정하고 `-XX:MaxNewSize`를 사용하여 maximum 크기를 설정할 수도 있습니다.


## Links

- [Java SE 17]( https://docs.oracle.com/en/java/javase/17/docs/specs/man/java.html )
- [Java SE 11]( https://docs.oracle.com/en/java/javase/11/tools/java.html )
- [Java SE 8]( https://docs.oracle.com/javase/8/docs/technotes/tools/windows/java.html )

## 주석

[^javase11-description]: [Java SE 11 문서의 Description 섹션](https://docs.oracle.com/en/java/javase/11/tools/java.html#GUID-3B1CE181-CD30-4178-9602-230B800D4FAE__GUID-9A7980F2-740B-4C46-B16E-76AE38459C9B )
[^javase11-xmn]: [Java SE 11 문서의 -xmn 섹션](https://docs.oracle.com/en/java/javase/11/tools/java.html#GUID-3B1CE181-CD30-4178-9602-230B800D4FAE__GUID-462EA549-0BFB-4221-A803-412C63D6BA5F )
[^xmn-unit-note]: 참고: `256 * 1024 = 262144`, `262144 * 1024 = 268435456`

