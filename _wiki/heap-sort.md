---
layout  : wiki
title   : 힙 정렬 (Heap Sort)
summary : 
date    : 2020-09-16 23:15:57 +0900
updated : 2020-09-19 13:56:27 +0900
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

## 힙 (Heap)

### 힙 정렬된 상태 (heap ordered)

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

### 이진 힙 (binary heap)

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

## 참고문헌

- 알고리즘 [개정4판] / 로버트 세지윅, 케빈 웨인 저/권오인 역 / 길벗 / 초판발행 2018년 12월 26일

## 주석

[^sedgewick-2-4]: 알고리즘 [개정4판]. 2.4장.
