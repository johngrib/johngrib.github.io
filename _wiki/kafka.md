---
layout  : wiki
title   : Apache Kafka
summary : 
date    : 2023-04-23 22:07:35 +0900
updated : 2023-04-23 22:43:27 +0900
tag     : kafka
resource: 89/BA2F48-41B3-410F-A771-F5F63028152F
toc     : true
public  : true
parent  : [[/index]]
latex   : false
---
* TOC
{:toc}

## Kafka 이것저것
### Kafka는 파일 시스템에 저장한다

#### From: Kafka 3.3 Documentation

[Don't fear the filesystem!](https://kafka.apache.org/33/documentation.html#design_filesystem )

>
Kafka relies heavily on the filesystem for storing and caching messages.
There is a general perception that "disks are slow" which makes people skeptical that a persistent structure can offer competitive performance.
In fact disks are both much slower and much faster than people expect depending on how they are used; and a properly designed disk structure can often be as fast as the network.

Kafka는 메시지 저장과 캐싱을 위해 파일 시스템에 크게 의존합니다.
"디스크는 느리다"는 일반적인 인식이 있기 때문에, 많은 사람들은 퍼시스턴트 구조가 뛰어난 성능을 제공할 수 있을지를 의심합니다.
사실 디스크는 사용 방식에 따라 사람들의 생각보다 훨씬 느리기도 하고 빠르기도 합니다.
그리고 적절하게 설계된 디스크 구조는 종종 네트워크만큼 빠를 수 있습니다.

>
The key fact about disk performance is that the throughput of hard drives has been diverging from the latency of a disk seek for the last decade.
As a result the performance of linear writes on a JBOD configuration with six 7200rpm SATA RAID-5 array is about 600MB/sec but the performance of random writes is only about 100k/sec—a difference of over 6000X.
These linear reads and writes are the most predictable of all usage patterns, and are heavily optimized by the operating system.
A modern operating system provides read-ahead and write-behind techniques that prefetch data in large block multiples and group smaller logical writes into large physical writes.
A further discussion of this issue can be found in this [ACM Queue article]( http://queue.acm.org/detail.cfm?id=1563874 ); they actually find that [sequential disk access can in some cases be faster than random memory access!]( http://deliveryimages.acm.org/10.1145/1570000/1563874/jacobs3.jpg )

디스크 성능에 관한 중요한 사실은 지난 10년 동안 하드 드라이브의 처리율이 디스크 검색 지연 시간과 차이가 나고 있다는 것입니다.
그 결과, 6개의 7200rpm SATA RAID-5 어레이가 있는 JBOD 구성에서 선형 쓰기 성능은 초당 약 600MB이지만 랜덤 쓰기 성능은 초당 약 100k에 불과하여 6000배 이상의 차이가 납니다.
이러한 선형 읽기 및 쓰기는 모든 사용 패턴 중에서 가장 예측 가능하며 운영 체제에 의해 크게 최적화되어 있습니다.
최신 운영 체제는 큰 블록 배수로 데이터를 미리 가져오고 작은 논리적 쓰기를 큰 물리적 쓰기로 그룹화하는 read-ahead 및 write-behind 기술을 제공합니다.
이 문제에 대한 자세한 논의는 이 ACM Queue article에서 확인할 수 있으며,
실제로 순차적 디스크 액세스가 경우에 따라 랜덤 메모리 액세스보다 빠를 수 있습니다!

>
To compensate for this performance divergence, modern operating systems have become increasingly aggressive in their use of main memory for disk caching.
A modern OS will happily divert all free memory to disk caching with little performance penalty when the memory is reclaimed.
All disk reads and writes will go through this unified cache.
This feature cannot easily be turned off without using direct I/O, so even if a process maintains an in-process cache of the data, this data will likely be duplicated in OS pagecache, effectively storing everything twice.

이러한 성능 차이를 보완하기 위해 최신 운영 체제는 디스크 캐싱을 위해 메인 메모리를 점점 더 적극적으로 사용하고 있습니다.
최신 OS는 메모리를 회수할 때 성능 저하가 거의 없이 모든 여유 메모리를 디스크 캐싱으로 전환합니다.
모든 디스크 읽기와 쓰기는 이 통합 캐시를 거치게 됩니다.
이 기능은 직접 I/O를 사용하지 않으면 쉽게 끌 수 없으므로 프로세스가 데이터의 인프로세스 캐시를 유지하더라도 이 데이터는 OS 페이지 캐시에 복제되어 사실상 모든 것을 두 번 저장하는 셈이 됩니다.

> Furthermore, we are building on top of the JVM, and anyone who has spent any time with Java memory usage knows two things:
>
> 1. The memory overhead of objects is very high, often doubling the size of the data stored (or worse).
> 2. Java garbage collection becomes increasingly fiddly and slow as the in-heap data increases.

또한, 우리는 JVM을 기반으로 구축하고 있으며, Java 메모리 사용량을 조금이라도 사용해 본 사람이라면 두 가지를 알고 있습니다:

1. 객체의 메모리 오버헤드가 매우 높아서 저장된 데이터의 크기가 두 배가 되는 경우가 많습니다(또는 더 심해지기도 합니다).
2. Java 가비지 컬렉션은 힙 내 데이터가 증가함에 따라 점점 더 복잡하고 느려집니다.

>
As a result of these factors using the filesystem and relying on pagecache is superior to maintaining an in-memory cache or other structure—we at least double the available cache by having automatic access to all free memory, and likely double again by storing a compact byte structure rather than individual objects.
Doing so will result in a cache of up to 28-30GB on a 32GB machine without GC penalties.
Furthermore, this cache will stay warm even if the service is restarted, whereas the in-process cache will need to be rebuilt in memory (which for a 10GB cache may take 10 minutes) or else it will need to start with a completely cold cache (which likely means terrible initial performance).
This also greatly simplifies the code as all logic for maintaining coherency between the cache and filesystem is now in the OS, which tends to do so more efficiently and more correctly than one-off in-process attempts.
If your disk usage favors linear reads then read-ahead is effectively pre-populating this cache with useful data on each disk read.

이러한 요인으로 인해 <mark>파일 시스템을 사용하고 페이지 캐시에 의존하는 것이 인메모리 캐시나 다른 구조를 유지하는 것보다 우수하며</mark>, 모든 여유 메모리에 자동으로 액세스하여 사용 가능한 캐시를 최소 두 배로 늘리고 개별 객체가 아닌 압축 바이트 구조를 저장하여 다시 두 배로 늘릴 수 있습니다.
이렇게 하면 32GB 머신에서 GC 페널티 없이 최대 28~30GB의 캐시를 확보할 수 있습니다.

또한 이 캐시는 <mark>서비스가 다시 시작되더라도 따뜻하게 유지</mark>되는 반면, 처리 중인 캐시는 메모리에서 다시 빌드해야 하거나(10GB 캐시의 경우 10분이 소요될 수 있음) 완전히 콜드 캐시에서 시작해야 합니다(초기 성능이 형편없을 가능성이 높음).

또한 <mark>캐시와 파일 시스템 간의 일관성을 유지하기 위한 모든 로직이 이제 OS에 있으므로 코드가 크게 단순화되며</mark>, 일회성 인프로세스 시도보다 더 효율적이고 정확하게 수행하는 경향이 있습니다.

디스크 사용량이 선형 읽기를 선호하는 경우, 미리 읽기는 각 디스크 읽기에 유용한 데이터로 이 캐시를 효과적으로 미리 채웁니다.

>
This suggests a design which is very simple: rather than maintain as much as possible in-memory and flush it all out to the filesystem in a panic when we run out of space, we invert that.
All data is immediately written to a persistent log on the filesystem without necessarily flushing to disk.
In effect this just means that it is transferred into the kernel's pagecache.

이는 매우 간단한 설계를 제안합니다.
가능한 한 많은 인메모리를 유지하고 공간이 부족할 때 당황하여 파일 시스템으로 모두 플러시하는 대신, 이를 뒤집습니다.
<mark>모든 데이터는 디스크에 플러시할 필요 없이 파일 시스템의 영구 로그에 즉시 기록됩니다</mark>.
사실상 이것은 커널의 페이지 캐시로 전송된다는 것을 의미합니다.

>
This style of pagecache-centric design is described in an [article](http://varnish-cache.org/wiki/ArchitectNotes ) on the design of Varnish here (along with a healthy dose of arrogance).

이러한 페이지 캐시 중심의 디자인 스타일은 Varnish 디자인에 대한 기사에서 설명합니다(약간의 오만함도 함께).

#### From: [[/clipping/kafka-a-distributed-messaging-system-for-log-processing#choice-file-system-page-cache]]{2011년 LinkedIn 논문}

- Kafka 개발팀은 '일반적이지 않은' 선택을 결정했다.
- 메모리에 저장하지 않고 파일 시스템에 저장한다는 것.

>
Another unconventional choice that we made is to avoid explicitly caching messages in memory at the Kafka layer.
Instead, we rely on the underlying file system page cache.
This has the main benefit of avoiding double buffering---messages are only cached in the page cache.
This has the additional benefit of retaining warm cache even when a broker process is restarted.
Since Kafka doesn’t cache messages in process at all, it has very little overhead in garbage collecting its memory, making efficient implementation in a VM-based language feasible.
Finally, since both the producer and the consumer access the segment files sequentially, with the consumer often lagging the producer by a small amount, normal operating system caching heuristics are very effective (specifically write-through caching and readahead).
We have found that both the production and the consumption have consistent performance linear to the data size, up to many terabytes of data.
[^kafka-2011-paper-choice-file-system-page-cache]

우리가 선택한 또다른 일반적이지 않은 선택은 Kafka 레이어에서 메모리에 메시지를 캐싱하지 않는다는 것입니다.
대신, 우리는 <mark>기본 파일 시스템 페이지 캐시를 사용합니다</mark>.
이로 인해 메시지는 페이지 캐시에만 캐싱되므로, 더블 버퍼링을 피할 수 있습니다.
또한 브로커 프로세스가 재시작되어도 캐시가 유지되는 추가적인 장점이 있습니다.

Kafka가 프로세스에서 전혀 메시지를 캐싱하지 않기 때문에, 메모리의 가비지 컬렉팅 오버헤드가 거의 없습니다.
그러므로 VM 기반 언어에서 효율적인 구현이 가능합니다.
마지막으로, 프로듀서와 컨슈머가 모두 세그먼트 파일에 순차적으로 접근하며,
컨슈머가 프로듀서보다 작은 양만큼 뒤쳐져 있기 때문에,
일반적인 운영체제 캐싱 휴리스틱이 매우 효과적으로 작동합니다(특히 write-through caching과 readahead).
우리는 발행과 소비가 데이터 크기에 대해 선형적으로 일관된 성능을 갖는다는 것을 확인했습니다.
그리고 이는 수 테라바이트의 데이터 규모에서도 적용됩니다.

#### From: 아파치 카프카 애플리케이션 프로그래밍 with 자바

>
카프카는 메모리나 데이터베이스에 저장하지 않으며 따로 캐시메모리를 구현하여 사용하지도 않는다.
파일 시스템에 저장하기 때문에 파일 입출력으로 인해 속도 이슈가 발생하지 않을까 의문을 가질 수 있다.
일반적으로 파일 시스템은 다루기 편하지만 지속적으로 입출력할 경우 메모리에 올려서 사용하는 것보다 처리 속도가 현저히 느리기 때문이다.
그러나 카프카는 페이지 캐시(page cache)를 사용하여 디스크 입출력 속도를 높여서 이 문제를 해결했다.
페이지 캐시란 OS에서 파일 입출력의 성능 향상을 위해 만들어 놓은 메모리 영역을 뜻한다.
한번 읽은 파일의 내용은 메모리의 페이지 캐시 영역에 저장시킨다.
추후 동일한 파일의 접근이 일어나면 디스크에서 읽지 않고 메모리에서 직접 읽는 방식이다.
JVM 위에서 동작하는 카프카 브로커가 페이지 캐시를 사용하지 않는다면 지금과 같이 빠른 동작을 기대할 수 없다.
페이지 캐시를 사용하지 않으면 카프카에서 캐시를 직접 구현해야 했을 것이고,
지속적으로 변경되는 데이터 때문에 가비지 컬렉션이 자주 일어나 속도가 현저히 느려질 것이기 때문이다.
이러한 특징 때문에 카프카 브로커를 실행하는데 힙 메모리 사이즈를 크게 설정할 필요가 없다.
[^kafka-app-programming-java-66]

## 참고문헌

- [[/clipping/kafka-a-distributed-messaging-system-for-log-processing]] - Kafka를 소개한 LinkedIn의 2011년 논문.
- 아파치 카프카 애플리케이션 프로그래밍 with 자바 / 최원영 저 / 비제이퍼블릭(BJ퍼블릭) / 초판 1쇄 발행: 2021년 04월 14일

## 주석

[^kafka-2011-paper-choice-file-system-page-cache]: [[/clipping/kafka-a-distributed-messaging-system-for-log-processing#choice-file-system-page-cache]]. Kafka를 소개한 2011년 논문. 3쪽. Efficient transfer. 
[^kafka-app-programming-java-66]: 아파치 카프카 애플리케이션 프로그래밍 with 자바. 3장. 65쪽.

