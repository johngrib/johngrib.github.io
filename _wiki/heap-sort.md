---
layout  : wiki
title   : 힙 정렬 (Heap Sort)
summary : 
date    : 2020-09-16 23:15:57 +0900
updated : 2020-09-19 14:58:18 +0900
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


| 배열 인덱스 | 0 | 1    | 2    | 3    | 4    | 5   | 6    | 7    |
|-------------|---|------|------|------|------|-----|------|------|
| 값          |   | (21) | (18) | (19) | (15) | (2) | (16) | (14) |

힙을 이런 방식으로 배열에 저장하면 다음과 같이 부모 노드와 자식 노드를 찾을 수 있다.

- 인덱스 $$k$$에 있는 노드의 부모는 $$\floor{ k/2 }$$에 있다.
    - 예: 배열 인덱스 `6`에 있는 `(16)`의 부모 노드는 $$ \floor{ 6 / 2 } = 3$$ 이므로 `3`에 있는 `(19)`이다.
    - 예: 배열 인덱스 `3`에 있는 `(19)`의 부모 노드는 $$ \floor{ 3 / 2 } = \floor{ 1.5 } = 1$$ 이므로 `1`. 즉 루트 노트이다.
- 인덱스 $$k$$에 있는 노드의 두 자식 노드는 $$2k$$와 $$2k+1$$에 있다.
    - 예: 배열 인덱스 `3`에 있는 `(19)`의 자식 노드는 `6`에 있는 `(16)`과 `7`에 있는 `(14)`이다.

## 힙 복구 (reheapifying)

힙 복구 작업으로 swim과 sink가 대표적이다. swim은 상향식으로, 노드를 타고 올라가면서 힙의 정렬 구조를 복구한다. 반대로 sink는 하향식이다. 힙을 내려가면서 복구한다.

### swim

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

### sink

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


## 참고문헌

- 알고리즘 [개정4판] / 로버트 세지윅, 케빈 웨인 저/권오인 역 / 길벗 / 초판발행 2018년 12월 26일

## 주석

[^sedgewick-2-4]: 알고리즘 [개정4판]. 2.4장.
