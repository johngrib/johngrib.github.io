---
layout  : wiki
title   : Java HotSpot VM Serial Collector
summary :
date    : 2019-09-29 09:31:31 +0900
updated : 2019-09-29 15:23:35 +0900
tag     : java gc
toc     : true
public  : true
parent  : [[garbage-collection]]
latex   : false
---
* TOC
{:toc}


## Serial Collector

멀티 프로세서에서는 비효율적인 GC이지만, 100MB 정도로 작은 규모의 데이터셋을 사용하는 애플리케이션이라면 멀티 프로세서에서도 쓸만하다. Serial Collector는 VM이 운영체제와 하드웨어 환경에 따라 자동으로 선택하거나, `-XX:+UseSerialGC` 옵션으로 활성화할 수 있다.

## Native 코드를 읽어보자

* OpenJDK의 JVM C++ 코드를 읽으면서 내가 알고 있는 사실들을 확인해 보자.
* 코드 출처는 [@ 55739:7e2238451585 jdk-13+24](https://hg.openjdk.java.net/zgc/zgc/file/7e2238451585/src/ )
* 읽다보면 의외의 깨달음을 얻게 될지도 모른다.

### eden과 survivor의 max size 계산

* [DefNewGeneration::DefNewGeneration]( https://hg.openjdk.java.net/zgc/zgc/file/7e2238451585/src/hotspot/share/gc/serial/defNewGeneration.cpp#l169 )

```cpp
_eden_space = new ContiguousSpace();
_from_space = new ContiguousSpace(); /* survivor (from 역할) */
_to_space   = new ContiguousSpace(); /* survivor (to 역할) */

if (_eden_space == NULL || _from_space == NULL || _to_space == NULL) {
  vm_exit_during_initialization("Could not allocate a new gen space");
}

// Compute the maximum eden and survivor space sizes. These sizes
// are computed assuming the entire reserved space is committed.
// These values are exported as performance counters.
uintx size = _virtual_space.reserved_size();
_max_survivor_size = compute_survivor_size(size, SpaceAlignment);
_max_eden_size = size - (2*_max_survivor_size); /* eden max 사이즈 계산 */

// allocate the performance counters

// Generation counters -- generation 0, 3 subspaces
_gen_counters = new GenerationCounters("new", 0, 3,
  min_size, max_size, &_virtual_space);
_gc_counters = new CollectorCounters(policy, 0);
_eden_counters = new CSpaceCounters(
    "eden", 0, _max_eden_size, _eden_space,
                                    _gen_counters);
_from_counters = new CSpaceCounters("s0", 1, _max_survivor_size, _from_space,
                                    _gen_counters);
_to_counters = new CSpaceCounters("s1", 2, _max_survivor_size, _to_space,
                                  _gen_counters);
```

* survivor 두 개(s0, s1)는 같은 max 크기를 가진다.
* eden 사이즈는 할당된 young 영역의 공간에서 두 개의 survivor size를 뺀 값으로 계산된다.

### 두 Survivor의 스왑

[void DefNewGeneration::swap_spaces](https://hg.openjdk.java.net/zgc/zgc/file/7e2238451585/src/hotspot/share/gc/serial/defNewGeneration.cpp#l291 )

```cpp
void DefNewGeneration::swap_spaces() {
  /* from 과 to 를 swap 한다. */
  ContiguousSpace* s = from();
  _from_space        = to();
  _to_space          = s;
  eden()->set_next_compaction_space(from());
  // The to-space is normally empty before a compaction so need
  // not be considered.  The exception is during promotion
  // failure handling when to-space can contain live objects.
  from()->set_next_compaction_space(NULL);

  if (UsePerfData) {
    CSpaceCounters* c = _from_counters;
    _from_counters = _to_counters;
    _to_counters = c;
  }
}
```

### Aging

[oop DefNewGeneration::copy_to_survivor_space](https://hg.openjdk.java.net/zgc/zgc/file/7e2238451585/src/hotspot/share/gc/serial/defNewGeneration.cpp#l739 )

```cpp
oop DefNewGeneration::copy_to_survivor_space(oop old) {
  assert(is_in_reserved(old) && !old->is_forwarded(),
         "shouldn't be scavenging this oop");
  size_t s = old->size();   /* old 객체의 사이즈 */
  oop obj = NULL;

  // Try allocating obj in to-space (unless too old)
  if (old->age() < tenuring_threshold()) {
    /* old 객체의 age가 임계값 미만이면 survivor(to)영역에 객체의 크기만한 공간을 마련한다 */
    obj = (oop) to()->allocate_aligned(s);
  }

  // Otherwise try allocating obj tenured
  if (obj == NULL) {
    /* 공간이 마련되지 않았다면 old 영역으로 보내버린다(promotion) */
    obj = _old_gen->promote(old, s);
    if (obj == NULL) {
      handle_promotion_failure(old);
      return old;
    }
  } else {
    /* 공간이 마련됐다면 survivor(to) 영역으로 보낸다 */
    // Prefetch beyond obj
    const intx interval = PrefetchCopyIntervalInBytes;
    Prefetch::write(obj, interval);

    // Copy obj
    Copy::aligned_disjoint_words((HeapWord*)old, (HeapWord*)obj, s);

    // Increment age if obj still in new generation
    /* 아직 new gen에 있으므로 객체는 나이를 먹는다 */
    obj->incr_age();
    age_table()->add(obj, s);
  }

  // Done, insert forward pointer to obj in this header
  old->forward_to(obj);

  return obj;
}
```

## License

* 이 글에 포함된 OpenJDK 코드는 "[The GNU General Public License (GPL)][GPL]" 라이선스를 따릅니다.
* 이 글에 포함된 OpenJDK 코드에 대해 들여쓰기, 줄바꿈 등을 수정하였으며 한국어가 포함된 주석은 제가 작성한 것입니다.

[GPL]: https://hg.openjdk.java.net/zgc/zgc/file/7e2238451585/LICENSE
