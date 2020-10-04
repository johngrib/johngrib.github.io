---
layout  : wiki
title   : 정렬 안정성 (Stability)
summary : 
date    : 2020-10-04 22:39:45 +0900
updated : 2020-10-04 23:05:54 +0900
tag     : algorithm sort
toc     : true
public  : true
parent  : [[algorithm]]
latex   : true
---
* TOC
{:toc}

## 의미

> A sorting method is _stable_ if it preserves the relative order of equal keys in the array.
>
> 정렬 후에도 같은 키들의 상대적인 순서가 정렬 이전과 동일하게 유지되는 정렬 방법을 안정 정렬이라고 부른다.
[^SED-2-5]

## 안정 정렬의 예

다음과 같은 데이터가 있다고 하자. 이 데이터는 시간 기준으로 정렬되어 있는 상태이다.

| 장소    | 시간     |
|---------|----------|
| Chicago | 09:00:00 |
| Seattle | 09:10:11 |
| Seattle | 09:10:25 |
| Chicago | 09:20:03 |

이 때 이 데이터를 장소를 (알파벳순으로) 정렬 했을 때 다음과 같이 시간의 상대적인 순서가 보존된다면 안정 정렬된 것이다.

| 장소    | 시간     |
|---------|----------|
| Chicago | 09:00:00 |
| Chicago | 09:20:03 |
| Seattle | 09:10:11 |
| Seattle | 09:10:25 |

그러나 다음과 같이 장소를 정렬한 이후 시간의 상대적인 순서가 원본과 어긋난다면 안정 정렬되지 않은 것이다.

| 장소    | 시간     |
|---------|----------|
| Chicago | 09:20:03 |
| Chicago | 09:00:00 |
| Seattle | 09:10:11 |
| Seattle | 09:10:25 |

## 다양한 정렬 알고리즘 비교

- [[insertion-sort]]와 [[merge-sort]]가 안정 정렬에 해당한다.

| algorithm                     | stable? | in place? | 실행 시간                   | 추가 공간 | 비고                                    |
|-------------------------------|---------|-----------|-----------------------------|-----------|-----------------------------------------|
| [[selection-sort]]{선택 정렬} | no      | yes       | $$N^2$$                     | 1         |                                         |
| [[insertion-sort]]{삽입 정렬} | **yes** | yes       | $$N$$ 에서 $$N^2$$ 사이     | 1         | 사전 정렬된 정도에 영향을 받음          |
| [[shell-sort]]{셸 정렬}       | no      | yes       | $$N \log N? \\ N^{6/5}?$$   | 1         |                                         |
| [[quick-sort]]{퀵 정렬}       | no      | yes       | $$N \log N$$                | $$\lg N$$ | 확률적으로 보증됨                       |
| [[quick-sort]]{3중 퀵 정렬}   | no      | yes       | $$N$$에서 $$N \log N$$ 사이 | $$\lg N$$ | 확률적이면서, 입력 키들에 영향을 받는다 |
| [[merge-sort]]{병합 정렬}     | ***yes* | no        | $$N \log N$$                | $$N$$     |                                         |
| [[heap-sort]]{힙 정렬}        | no      | yes       | $$N \log N$$                | 1         |                                         |

출처[^SED-2-5]

## 참고문헌

- [SED] 알고리즘 [개정4판] / 로버트 세지윅, 케빈 웨인 저/권오인 역 / 길벗 / 초판발행 2018년 12월 26일

## 주석

[^SED-2-5]: [SED] 2.5장

