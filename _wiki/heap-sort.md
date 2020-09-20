---
layout  : wiki
title   : 힙 정렬 (Heap Sort)
summary : 그리고 우선순위 큐 (Priority Queue)
date    : 2020-09-16 23:15:57 +0900
updated : 2020-09-20 23:49:49 +0900
tag     : algorithm sort
toc     : true
public  : true
parent  : [[algorithm]]
latex   : true
---
* TOC
{:toc}

$$
\def\ceil#1{\lceil #1 \rceil}
\def\floor#1{\lfloor #1 \rfloor}
\def\frfr#1{\{ #1 \}}
$$

## 소개

도널드 커누스는 힙 정렬에 대해 다음과 같이 말한다.

> 한편, [[quick-sort]]{빠른정렬}은 오직 평균 경우에서만 효율적이며, 해당 최악의 경우는 $$N^2$$의 규모이다.
힙 정렬은 최악의 경우가 평균 경우에 비해 아주 떨어지지는 않는다는 흥미로운 성질을 가지고 있다.
프로그램 H에서는 항상
>
> $$ A \ge 1.5 N$$ , $$ B \ge N \floor{ \lg N } $$ , $$ C \ge N \floor{ \lg N } $$
>
> 가 성립하며, 따라서 입력 자료의 분포와는 무관하게 $$ 18N \floor{ \lg N } + 38 N $$ 단위 이상의 시간을 소비하는 경우는 없다.
지금까지 나온 정렬 방법들 중 정렬 시간이 $$ N \log N $$의 규모임을 보장하는 것은 힙 정렬뿐이다.
5.2.4 절에서 설명하는 병합 정렬도 이러한 성질을 더 가지고 있지만, 메모리 공간을 더 많이 소비한다.
[^TAOCP-5-2-3]

- A, B, C 세 단계에 대해서는 TAOCP 3권을 참고할 것.

로버트 세지윅은 힙 정렬에 대해 다음과 같이 언급한다.

> 힙-정렬은 정렬 알고리즘의 복잡도 연구에 있어서 대단히 중요한 역할을 한다.
왜냐하면 힙-정렬은 시간과 공간 양 측면 모두 최적 성능(상수 비율로)을 보이는 유일한 알고리즘이기 때문이다.
힙-정렬은 최악 조건에서 $$~ 2N \lg N $$ 번의 비교 횟수와 상수 크기의 추가 공간 사용을 보증한다.
메모리 용량 사정이 빠듯한 환경에서는(예를 들어 임베디드 시스템이나 저가형 모바일 기기) 힙-정렬이 많이 사용된다.
단지 몇십 줄의 코드 추가만으로(심지어 기계어로도 마찬가지이다) 최적 성능을 얻을 수 있다.
하지만 전형적인 현대의 시스템에서는 드물게 사용된다.
왜냐하면 캐시 활용 효율을 떨어뜨리기 때문이다.
배열에서 인접한 항목끼리 비교되는 상황이 드물기 때문에 [[quick-sort]]{퀵-정렬}, [[merge-sort]]{병합 정렬}, 심지어 [[shell-sort]]{셸-정렬}과 비교해서도 캐시 미스(cache miss)의 발생 횟수가 훨씬 더 많다.
>
> 반면에 우선순위 큐의 구현에 힙을 이용하는 것은 현대의 응용 환경에서 점점 더 중요해지고 있다.
왜냐하면 아주 많은 수의 데이터 삽입 작업 또는 최대(또는 최소) 항목 삭제 작업이 서로 섞여 있는 경우에도
로그 시간 성능을 보증해 주기 때문이다.
[^sedgewick-2-4]

로버트 세지윅은 힙 정렬이 전통적이면서 우아한 정렬 알고리즘(classic elegant sorting algorithm known as heapsort)이라 평하기도 했다.


Algorithms In A Nutshell에서는 힙 정렬을 스포츠 경기 토너먼트에 비유했다.

> 스포츠에서 토너먼트는 $$n$$개의 팀 가운데에서 '최고'의 팀을 뽑는 방식이지만,
최종 승자가 다른 $$n-1$$개의 팀과 모두 대결하라고 강요하지는 않는다.
미국에서 가장 인기 있는 농구 경기 중 하나인 NCAA 선수권 토너먼트는 본래 64개 대학팀이 선수권 우승을 향해 경쟁한다.
최종 우승팀은 결승전에 오르기까지 5개 팀과 경기를 하므로 모두 6번을 이겨야 한다.
$$ 6 = \log (64) $$인 것은 우연이 아니다.
힙 정렬(Heap Sort)은 이러한 동작을 집합 원소의 정렬에 이용한다.
[^GEO-115]


## heap의 어원

![]( /post-img/heap-sort/sand-heap.jpg ){:style="max-width: 350px;"}

모래나 곡식이 원뿔형으로 쌓여 있는 모양을 heap 이라 한다.

## 힙 정렬된 이진 트리

> Definition. A binary tree is heap-ordered if the key in each node is larger than or equal to the keys in that node’s two children (if any).
>
> 정의. 이진 트리에서 각 노드의 두 자식 노드(만약 있다면)의 키 값이 부모 노드의 키 값보다 작으면 그 이진 트리는 힙-정렬되었다고 한다.[^sedgewick-2-4]

즉, 힙-정렬 되었을 때 가장 큰 값은 루트 노드에 있다.

다음 이진 트리는 힙 정렬되었다고 할 수 있다.

![]( /post-img/heap-sort/sorted-heap.svg )

아무 노드나 잡고 부모 노드로 계속 따라 올라가면 오름차순 시퀀스를 얻을 수 있다는 특징이 있다.
위의 정렬된 힙을 예로 들자면 다음과 같다.
- 15, 18, 21
- 19, 21
- 14, 19

## 이진 힙 (binary heap)

일반적으로 이진 힙을 그냥 힙이라고 부른다.

> Definition. A binary heap is a collection of keys arranged in a complete heap-or- dered binary tree, represented in level order in an array (not using the first entry).
>
> 정의. 이진 힙은 힙-정렬된 완전 이진 트리의 노드들이 그 트리 레벨 순서대로 배열에 나열된 것이다(단 배열의 첫 번째 항목은 이용하지 않는다).[^sedgewick-2-4]

![]( /post-img/heap-sort/sorted-heap.svg )

예를 들어 위와 같이 힙-정렬된 완전 이진 트리가 있다면, 다음과 같은 배열을 만든다.

| index | 0    | 1    | 2    | 3    | 4    | 5   | 6    | 7    |
|-------|------|------|------|------|------|-----|------|------|
| value | null | (21) | (18) | (19) | (15) | (2) | (16) | (14) |

힙을 이런 방식으로 배열에 저장하면 다음과 같이 부모 노드와 자식 노드를 찾을 수 있다.

- 인덱스 $$k$$에 있는 노드의 부모는 $$\floor{ k/2 }$$에 있다.
    - 예: 배열 인덱스 `6`에 있는 `(16)`의 부모 노드는 $$ \floor{ 6 / 2 } = 3$$ 이므로 `3`에 있는 `(19)`이다.
    - 예: 배열 인덱스 `3`에 있는 `(19)`의 부모 노드는 $$ \floor{ 3 / 2 } = \floor{ 1.5 } = 1$$ 이므로 `1`. 즉 루트 노트이다.
- 인덱스 $$k$$에 있는 노드의 두 자식 노드는 $$2k$$와 $$2k+1$$에 있다.
    - 예: 배열 인덱스 `3`에 있는 `(19)`의 자식 노드는 `6`에 있는 `(16)`과 `7`에 있는 `(14)`이다.

### 힙 복구 (reheapifying)

힙 복구 작업으로 swim과 sink가 대표적이다. swim은 상향식으로, 노드를 타고 올라가면서 힙의 정렬 구조를 복구한다. 반대로 sink는 하향식이다. 힙을 내려가면서 복구한다.

로버트 세지윅은 힙 복구 알고리즘을 회사의 조직도에 비유해 재미있게 설명한다.

> `swim()` 작업은 신입 사원이 들어 왔을 때 그의 능력에 맞게 그보다 능력이 나은 상관을 만날 때까지 반복해서 승진시키는 것이다(능력이 부족한 상관이 있다면 자리를 바꾸면서).
그리고 `sink()` 작업은 사장이 사임해서 새로운 사장이 왔을 때 그 사장의 능력이 부족하다면 자기보다 능력이 낮은 사람들만 부하 직원으로 가지도록
반복해서 직급을 강등시키는 것이다.[^sedgewick-2-4]

#### swim

다음과 같이 힙 정렬 상태를 불완전하게 하는 노드 `23`이 있다고 하자.

![]( /post-img/heap-sort/swim-01.svg )

swim 방식을 사용하면 `23`이 다음과 같이 루트 노드까지 헤엄쳐 올라가면서(부모 노드와 자리를 바꾸면서) 힙 정렬된 상태로 복구한다.

![]( /post-img/heap-sort/swim-02.svg )

![]( /post-img/heap-sort/swim-03.svg )

```java
/**
 * k 노드의 위치를 swim 방식으로 복구한다.
 *
 * @param k 정렬 상태를 위반하는 노드의 배열 인덱스
 */
private void swim(int k) {
  int rootNode = 1;
  while ( k > rootNode && array[k/2] < array[k] ) {
    // k 가 루트 노드가 아니고 부모 노드보다 값이 크다면, 부모 노드와 위치를 바꾼다.
    int temp = array[k];
    array[k] = array[k/2];
    array[k/2] = temp;

    k = k/2;
  }
}
```

#### sink

다음과 같이 힙 정렬 상태를 불완전하게 하는 노드 `17`이 있다고 하자.

![]( /post-img/heap-sort/sink-01.svg )

sink 방식을 사용하면 `17`이 가라앉으면서(자식 노드와 자리를 바꾸면서) 힙 정렬된 상태로 복구한다.

![]( /post-img/heap-sort/sink-02.svg )

![]( /post-img/heap-sort/sink-03.svg )

```java
/**
 * k 노드의 위치를 sink 방식으로 복구한다.
 *
 * @param k 정렬 상태를 위반하는 노드의 배열 인덱스
 */
private void sink(int k) {
  int N = array.length;
  while ( 2 * k <= N ) {
    // 최하단 노드까지 도달하지 않았다면
    int j = 2 * k;
    if (j < N && array[j] < array[j+1]) {
      // 두 자식 노드 중 더 큰 값을 가진 노드를 선택한다
      j++;
    }
    if (array[k] >= array[j]) {
      // 선택한 자식 노드가 sink 노드의 값보다 작으면 작업을 끝낸다
      break;
    }
    // 그렇지 않다면 선택한 자식 노드와 sink 노드의 위치를 바꾼다
    int temp = array[k];
    array[k] = array[j];
    array[j] = temp;

    k = j;
  }
}
```

### 삽입과 삭제

| 데이터 구조   | 삽입            | 최대 항목 삭제  |
|---------------|-----------------|-----------------|
| 정렬된 배열   | $$O(N)$$        | $$O(1)$$        |
| 비정렬된 배열 | $$O(1)$$        | $$O(N)$$        |
| 힙            | $$O( \log N )$$ | $$O( \log N )$$ |

삽입과 삭제에 한하여, 힙을 사용하면 최악의 경우에도 $$O( \log N )$$만큼의 성능을 보인다.

#### 새로운 노드 삽입

- 힙을 저장하고 있는 배열의 끝 부분에(마지막 노드 바로 다음 인덱스) 새로운 값을 추가하고, 힙 사이즈에 `+1`한다.
- 새로 추가된 노드를 swim 시킨다.

최악의 경우에도 $$ O( \log N ) $$만큼의 성능을 보인다.

15개의 노드를 보관할 수 있는 길이 16짜리 배열에 다음과 같이 힙 하나가 정렬된 상태로 들어 있다고 하자.

| index | 0    | 1    | 2    | 3    | 4    | 5   | 6    | 7   | 8   | 9   | 10  | 11 | 12 | 13 | 14 | 15 |
|-------|------|------|------|------|------|-----|------|-----|-----|-----|-----|----|----|----|----|----|
| value | null | (22) | (16) | (19) | (14) | (8) | (15) | (1) | (5) | (9) | (7) |    |    |    |    |    |

이 힙에 이미 추가된 노드들의 바로 뒤인 `11`번 인덱스에 새로운 노드 `(20)`을 추가한다고 하자.
그래프로 표현하면 다음과 같을 것이다.

![]( /post-img/heap-sort/insert-01.svg )

다음과 같이 `(20)`을 추가하면 정렬이 깨진 상태가 된다.

![]( /post-img/heap-sort/insert-02.svg )

따라서 `(20)`은 swim을 시켜서 힙 정렬된 상태로 돌려놓아야 한다. 한 단계씩 swim 시켜보자.

![]( /post-img/heap-sort/insert-03.svg )

`(8)`과 `(20)`을 바꿨다. 그러나 아직 `(16)`이 위에 있다.

![]( /post-img/heap-sort/insert-04.svg )

`(16)`과 `(20)`을 바꿨다. `(20)`위에는 `(22)`가 있으므로 swim이 끝난다.

#### 루트 노드의 삭제

- 힙의 루트 노드를 제거한다.
- 힙의 마지막 노드를 루트 노드로 옮긴다.
- 힙 사이즈를 `-1`한다.
- 루트 노드를 sinc 시킨다.

최악의 경우에도 $$ O( \log N ) $$만큼의 성능을 보인다.

루트 노드를 왜 삭제하는가?

- 힙의 루트 노드는 힙에 들어있는 모든 값들 중 가장 큰 값을 갖고 있다.
    - 힙에서 루트 노드를 계속해서 빼내면, 우선순위 큐로 사용할 수 있다.

다음과 같이 정렬된 힙에서 루트 노드 `(22)`를 제거한다고 하자.

![]( /post-img/heap-sort/remove-01.svg )

루트 노드를 제거한 다음, 배열의 마지막에 있는 노드 `(8)`를 루트 위치로 옮긴다.

![]( /post-img/heap-sort/remove-02.svg )

이제 `(8)`에 sinc 연산을 적용한다. `(20)`과 `(19)` 중 더 큰 노드와 `(8)`의 자리를 바꾼다.

![]( /post-img/heap-sort/remove-03.svg )

`(16)`과 `(8)`이 자리를 바꾸고 sink 연산은 종료된다.

![]( /post-img/heap-sort/remove-04.svg )

### 배열 사이즈 자동 조정

소박하긴 하지만, 이 방법을 쓰면 힙이 사용하는 배열 사이즈가 부족할 일은 없다.

- `insert`가 발생할 때마다 배열 사이즈를 두 배로 늘려준다.
- `deleteMax`가 발생할 때마다 배열 사이즈를 반으로 줄인다.

이 외에도 다양한 방법이 있다.


## 다중 힙 (Multiway Heap)

상황에 따라 힙 정렬된 3중 트리(heap-ordered ternary tree)를 고려할 수 있다.

- 인덱스 `k`에 있는 노드의 자식 노드 배열 인덱스는 $$3k-1, 3k, 3k+1$$.
- 인덱스 `k`에 있는 노드의 부모 노드 인덱스는 $$ \floor{ (k+1) / 3 } $$.

이와 비슷한 방법으로 3개 이상의 자식 노드를 갖는 다중 트리로 응용할 수 있다.

### 다중 힙의 퍼포먼스 트레이드 오프

다중 힙을 고려할 때에는 다음 두 가지의 트레이드 오프를 염두에 두어야 한다.

- 노드 하나가 갖는 자식 노드의 수 $$d$$ 가 늘어나면 트리의 높이도 낮아진다.
    - $$ \log_d N $$.
- 자식 노드의 수가 늘어나므로 자식들 중에서 가장 큰 노드를 찾는 속도는 느려진다.

## 힙 정렬

| 최고            | 평균            | 최저            |
|-----------------|-----------------|-----------------|
| $$O(n \log n)$$ | $$O(n \log n)$$ | $$O(n \log n)$$ |

힙 정렬은 두 단계로 구성된다.

- 힙 구성(heap construction)
    - 정렬 대상 배열을 heap으로 해석해 배열 아이템을 재배치한다.
- 정렬 취합(sortdown)
    - 최하단 노드부터 하나씩 root로 올려 올바른 위치로 sink 시킨다.

코드를 읽어보면 우아한 논리가 눈에 들어온다.

다음은 [로버트 세지윅의 예제 코드][heap-java]를 일부 수정하고 주석을 붙인 것이다.

```java
/** 주어진 배열을 정렬한다. */
public static void sort(Comparable[] array) {
  final int n = array.length;

  for (int k = n / 2; k >= 1; k--) {
  // 힙을 구성한다(힙의 최하단 레벨은 sink 할 수 없으니 제외).
    sink(array, k, n);
  }

  int k = n;
  while (k > 1) {
  // 정렬 취합. 최하단부터 노드를 하나씩 root로 올려놓고 sink 시킨다.
    exchange(array, 1, k--);
    sink(array, 1, k);
  }
}

/**
 * k 인덱스 노드를 인덱스 n 지점까지 sink 시킨다.
 *
 * @param array 힙 노드가 보관되어 있는 배열
 * @param k     sink 대상 노드 인덱스
 * @param n     sink 대상이 되는 부분 힙의 경계 인덱스
 */
private static void sink(Comparable[] array, int k, int n) {
  while (2 * k <= n) {
    int j = 2 * k;
    if (j < n && less(array, j, j + 1)) {
      j++;
    }
    if (!less(array, k, j)) {
      break;
    }
    exchange(array, k, j);
    k = j;
  }
}

private static boolean less(Comparable[] array, int i, int j) {
  return array[i - 1].compareTo(array[j - 1]) < 0;
}

private static void exchange(Comparable[] array, int i, int j) {
  Comparable swap = array[i - 1];
  array[i - 1] = array[j - 1];
  array[j - 1] = swap;
}
```

이 코드(알고리즘 2.7)에 대해 로버트 세지윅은 다음과 같이 말한다.

> 알고리즘 2.7은 이러한 아이디어를 바탕으로 한 온전한 구현으로, 1964년 힙-정렬을 발명한 윌리엄스(J.W. Williams)와
힙-정렬을 개선한 플로이드(R.W. Floyd)의 전통적인 방식을 따르고 있다.
비록 이 코드의 루프가 각각 서로 다른 작업을 하는 듯이 보이지만(첫 번째는 힙을 구성하고 두 번째는 힙을 파괴[^sedgewick-326]하면서 정렬을 취합한다)
두 루프 모두 `sink()` 메서드를 기반으로 하고 있다.

힙 구성, 정렬 취합과 관련된 다음 두 명제는 증명된 것이다. 증명은 어렵지 않으므로 생략한다.

> 명제 R. `sink()` 작업에 기반한 힙 구성은 N개의 항목에 대해 수행할 때 `2N`보다 적은 수의 비교 연산과 `N`보다 적은 수의 교환 연산을 사용한다.
>
> 명제 S. 힙-정렬은 `N`개 항목을 정렬하는데 $$ 2N \lg N + 2N $$보다 적은 비교 연산(그리고 그 절반만큼의 교환 연산)을 수행한다.
[^sedgewick-2-4]

## Java의 PriorityQueue

Java는 1.5 버전부터 `java.util` 패키지에 `PriorityQueue` 클래스를 제공하고 있다. (`PriorityQueue` 주석을 읽어보면 Josh Bloch와 Doug Lea가 작성자이다.)

`PriorityQueue`는 위에서 언급한 힙 정렬과 같이 가장 작은 값을 루트 노드로 위치시키는 방법으로 순서를 유지한다.

다음은 Java 11 버전 `PriorityQueue` 클래스의 `queue` 멤버에 대한 주석이다. 클래스 주석보다 짧으면서 본질을 잘 알려준다.

```java
/**
 * Priority queue represented as a balanced binary heap: the two
 * children of queue[n] are queue[2*n+1] and queue[2*(n+1)].  The
 * priority queue is ordered by comparator, or by the elements'
 * natural ordering, if comparator is null: For each node n in the
 * heap and each descendant d of n, n <= d.  The element with the
 * lowest value is in queue[0], assuming the queue is nonempty.
 */
transient Object[] queue; // non-private to simplify nested class access
```

다음 번역은 내가 한 것이다.

> 균형 이진 트리로 표현된 우선순위 큐(Priority queue).
`queue[n]`노드의 두 자식 노드는 `queue[2*n+1]`과 `queue[2*(n+1)]` 입니다.
우선순위 큐는 `comparator`에 의해 정렬되며 `comparator`가 `null`인 경우에는 원소의 자체적인 순서(`Comparable` 구현한 것을 말함)에 따라 정렬됩니다.
힙에 포함된 모든 노드 `n` 과 그 자식 노드 `d` 에 대해 `n <= d` 가 성립합니다.
`queue`가 비어 있지 않다면, 가장 작은 값은 `queue[0]`에 있습니다.

읽어보는 김에 클래스 주석도 함께 읽어보자.

```java
/**
 * An unbounded priority {@linkplain Queue queue} based on a priority heap.
 * The elements of the priority queue are ordered according to their
 * {@linkplain Comparable natural ordering}, or by a {@link Comparator}
 * provided at queue construction time, depending on which constructor is
 * used.  A priority queue does not permit {@code null} elements.
 * A priority queue relying on natural ordering also does not permit
 * insertion of non-comparable objects (doing so may result in
 * {@code ClassCastException}).
 *
 * <p>The <em>head</em> of this queue is the <em>least</em> element
 * with respect to the specified ordering.  If multiple elements are
 * tied for least value, the head is one of those elements -- ties are
 * broken arbitrarily.  The queue retrieval operations {@code poll},
 * {@code remove}, {@code peek}, and {@code element} access the
 * element at the head of the queue.
 *
 * <p>A priority queue is unbounded, but has an internal
 * <i>capacity</i> governing the size of an array used to store the
 * elements on the queue.  It is always at least as large as the queue
 * size.  As elements are added to a priority queue, its capacity
 * grows automatically.  The details of the growth policy are not
 * specified.
 *
 * <p>This class and its iterator implement all of the
 * <em>optional</em> methods of the {@link Collection} and {@link
 * Iterator} interfaces.  The Iterator provided in method {@link
 * #iterator()} and the Spliterator provided in method {@link #spliterator()}
 * are <em>not</em> guaranteed to traverse the elements of
 * the priority queue in any particular order. If you need ordered
 * traversal, consider using {@code Arrays.sort(pq.toArray())}.
 *
 * <p><strong>Note that this implementation is not synchronized.</strong>
 * Multiple threads should not access a {@code PriorityQueue}
 * instance concurrently if any of the threads modifies the queue.
 * Instead, use the thread-safe {@link
 * java.util.concurrent.PriorityBlockingQueue} class.
 *
 * <p>Implementation note: this implementation provides
 * O(log(n)) time for the enqueuing and dequeuing methods
 * ({@code offer}, {@code poll}, {@code remove()} and {@code add});
 * linear time for the {@code remove(Object)} and {@code contains(Object)}
 * methods; and constant time for the retrieval methods
 * ({@code peek}, {@code element}, and {@code size}).
 *
 * <p>This class is a member of the
 * <a href="{@docRoot}/java.base/java/util/package-summary.html#CollectionsFramework">
 * Java Collections Framework</a>.
 *
 * @since 1.5
 * @author Josh Bloch, Doug Lea
 * @param <E> the type of elements held in this queue
 */
@SuppressWarnings("unchecked")
public class PriorityQueue<E> extends AbstractQueue<E>
    implements java.io.Serializable {
```

분량이 상당하니 핵심이 되는 몇몇 부분만 발췌해 요약해 보자.

- 우선순위 힙 방식을 구현한, 크기 제한이 없는 우선순위 큐.
- 원소들은 `Comparable` 순서나, 생성자에 제공된 `comparator`에 의해 정렬된다.
- `null` 원소를 허용하지 않는다.
- `head` 노드는 지정된 정렬방식으로 얻은 가장 작은 값을 갖습니다.
- 크기 제한이 없다고 했지만 내부적으로 원소를 배열로 보관하고 있으므로, 용량(capacity)이 있다.
    - 원소가 추가되면 용량이 자동으로 증가하게 구현되어 있다.
- 이 구현체는 스레드 안전하지 않다.
- 이 구현체의 enqueuing과 dequeuing 기능을 구현한 메소드들의 시간 복잡도는 $$O( \log n )$$ 이다.

### add, offer 메소드

새로운 값을 추가하는 `offer`, `add` 메소드 코드를 읽어보자. 한국어 주석은 내가 추가한 것이다.

```java
/**
 * Inserts the specified element into this priority queue.
 *
 * @return {@code true} (as specified by {@link Queue#offer})
 * @throws ClassCastException if the specified element cannot be
 *         compared with elements currently in this priority queue
 *         according to the priority queue's ordering
 * @throws NullPointerException if the specified element is null
 */
public boolean offer(E e) {
    if (e == null)
        throw new NullPointerException();
    modCount++;
    int i = size;
    if (i >= queue.length) {
        // 용량을 초과할 것 같으면 용량을 늘려준다
        grow(i + 1);
    }
    // 새로운 노드를 바닥에 추가하고, swim 시켜서 올려보낸다
    siftUp(i, e);

    // 사이즈를 갱신하고 끝낸다
    size = i + 1;
    return true;
}

/**
 * 생략: offer와 똑같다.
 */
public boolean add(E e) {
    return offer(e);
}
```

#### shiftUp 메소드 (swim 역할)

이번엔 swim 역할을 하는 `shiftUp` 메소드를 읽어보자. 이번에도 한국어 주석은 내가 작성한 것이다.

`PriorityQueue`는 값이 작을수록 상위 노드로 올라가게 되므로, 부모가 swim 연산 노드보다 작은 값을 가지면 swim이 종료된다.

```java
private void siftUp(int k, E x) {
    if (comparator != null)
        siftUpUsingComparator(k, x, queue, comparator);
    else
        siftUpComparable(k, x, queue);
}

private static <T> void siftUpComparable(int k, T x, Object[] es) {
    Comparable<? super T> key = (Comparable<? super T>) x;
    while (k > 0) {
        // 부모 노드
        int parent = (k - 1) >>> 1;
        Object e = es[parent];
        // 부모 노드보다 값이 크다면 swim을 멈춘다.
        if (key.compareTo((T) e) >= 0)
            break;
        // 그렇지 않다면 부모 노드와 자리를 바꾼다.
        es[k] = e;
        k = parent;
    }
    es[k] = key;
}
```

### poll 메소드

`poll` 메소드는 다음 예제와 같이 최상단 노드, 즉 `head`의 값을 dequeuing 한다.

```java
PriorityQueue<Comparable> queue = new PriorityQueue<>();
queue.addAll(List.of(5, 6, 12, 1, 95, 7, 53));

for (int i = 0; i < 7; i++) {
  System.out.print(queue.poll() + ", ");
}
```

출력 결과는 다음과 같다.

```
1, 5, 6, 7, 12, 53, 95,
```

`poll` 메소드의 코드는 다음과 같다.

```java
public E poll() {
    final Object[] es;
    final E result;

    if ((result = (E) ((es = queue)[0])) != null) {
        modCount++;
        final int n;

        // 마지막 노드 x를 선택한다.
        final E x = (E) es[(n = --size)];
        // 마지막 노드가 있었던 곳에 null 을 입력한다.
        es[n] = null;
        if (n > 0) {
            // 노드 x 를 최상단부터 sink 시킨다
            final Comparator<? super E> cmp;
            if ((cmp = comparator) == null)
                siftDownComparable(0, x, es, n);
            else
                siftDownUsingComparator(0, x, es, n, cmp);
        }
    }
    return result;
}
```

#### shiftDown 메소드 (sink 역할)

```java
private void siftDown(int k, E x) {
    if (comparator != null)
        siftDownUsingComparator(k, x, queue, size, comparator);
    else
        siftDownComparable(k, x, queue, size);
}

private static <T> void siftDownComparable(int k, T x, Object[] es, int n) {
    // assert n > 0;
    Comparable<? super T> key = (Comparable<? super T>)x;
    int half = n >>> 1;           // loop while a non-leaf
    while (k < half) {
        // 왼쪽과 오른쪽 두 자식 노드들 중 더 작은 노드를 선택한다.
        int child = (k << 1) + 1; // assume left child is least
        Object c = es[child];
        int right = child + 1;
        if (right < n &&
            ((Comparable<? super T>) c).compareTo((T) es[right]) > 0)
            c = es[child = right];
        // 자식 노드 선택이 끝났다면 자식과 값을 비교한다.
        // 자식 노드보다 값이 작다면 sink를 멈춘다.
        if (key.compareTo((T) c) <= 0)
            break;
        // 그렇지 않다면 자식 노드와 자리를 바꾼다.
        es[k] = c;
        k = child;
    }
    es[k] = key;
}
```

## 참고문헌

- [ROB] 알고리즘 [개정4판] / 로버트 세지윅, 케빈 웨인 저/권오인 역 / 길벗 / 초판발행 2018년 12월 26일
- [GEO] 사전처럼 바로 찾아 쓰는 알고리즘 / 조지 T. 하인만, 게리 폴리케, 스탠리 셀코 공저 / 전경원 역 / 한빛미디어 / 초판 2쇄 2011년 10월 20일 / 원제: Algorithms In A Nutshell
- [TAOCP] The Art of Computer Programming 3 정렬과 검색(개정2판) [양장] / 도널드 커누스 저 / 한빛미디어 / 초판 2쇄 2013년 02월 10일

## 주석

[^sedgewick-2-4]: [ROB]. 2.4장.
[^sedgewick-326]: 이 부분은 [ROB]에서는 "두 번째는 힙을 삭제하면서 정렬을 취합한다"라고 번역되어 있으나, 원서에서는 "and the second destroys the heap for the sortdown"라고 되어 있다. 그리고 정렬 취합 단계는 부분 힙이나 힙의 루트 노드를 삭제하는 것이 아니라 힙의 정렬 구조를 불완전하게 만든 다음 정렬되도록 하는 작업이기 때문에 이 글에서는 "파괴"라는 단어로 옮겼다.
[^GEO-115]: [GEO]. 4장. 힙 정렬.
[^TAOCP-5-2-3]: [TAOCP] 5.2.3장.

[heap-java]: https://algs4.cs.princeton.edu/24pq/Heap.java.html

