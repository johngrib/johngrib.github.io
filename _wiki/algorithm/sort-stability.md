---
layout  : wiki
title   : 정렬 안정성 (Stability)
summary : 정렬 후에도 같은 키들의 상대적인 순서가 정렬 이전과 같게 유지되는 정렬 방법
date    : 2020-10-04 22:39:45 +0900
updated : 2023-11-13 23:43:41 +0900
tag     : algorithm sort
resource: 3B/256007-7DF1-4BCB-98E1-6D5E155C469D
toc     : true
public  : true
parent  : [[/algorithm]]
latex   : true
---
* TOC
{:toc}

## 의미

### From: 로버트 세지윅 알고리즘 4판

> A sorting method is _stable_ if it preserves the relative order of equal keys in the array.
>
> 정렬 후에도 같은 키들의 상대적인 순서가 정렬 이전과 동일하게 유지되는 정렬 방법을 안정 정렬이라고 부른다.
[^SED-2-5]

### From: CLRS

> 계수 정렬의 중요한 특징은 **안정성(stable)**을 가진다는 점이다.
이는 출력 배열에서 값이 같은 숫자가 입력 배열에 있던 것과 같은 순서로 나타나는 것을 뜻한다.
즉, 두 숫자가 같을 때는 입력 배열에서 먼저 나타나는 것이 출력 배열에서도 먼저 나타난다.
보통 안정성이라는 특성이 중요할 때는 정렬되는 원소에 부속 데이터가 붙어 다닐 때뿐이다. 계수 정렬의 안정성은 다른 이유로도 중요한데, 계수 정렬이 종종 기수 정렬의 서브 루틴으로 쓰이기 때문이다.
다음 절에서 기수 정렬이 정확하게 동작하기 위해 계수 정렬의 안정성이 필수임을 보게 될 것이다.
[^CLRS-8-2]

### From: TAOCP 3권

> 정렬의 목표는 키들을 비감소 순서
>
> $$ K_{p(1)} \le K_{p(2)} \le ... \le K_{p(N)} $$
>
> 로 재배치하는, 색인 $$ \{ 1,2, ..., N \}$$의 한 순열 $$p(1) p(2) ... p(N)$$을 결정하는 것이다.
같은 키를 가진 레코드들이 정렬 후에도 원래의 상대 순서를 유지하는 경우 그러한 정렬을 안정적(stable)이라고 부른다.
다른 말로 하면, 안정적 정렬은 다음과 같은 성질을 가진다.
>
> $$ K_{p(i)} = K_{p(j)} $$ 이고 $$ i \lt j $$ 이면 항상 $$p(i) \lt p(j)$$.
[^TAOCP-3-23]

## 안정 정렬의 예

다음과 같은 데이터가 있다고 하자. 이 데이터는 시간 기준으로 정렬되어 있는 상태이다.

| 장소    | 시간     |
|---------|----------|
| Chicago | 09:00:00 |
| Seattle | 09:10:11 |
| Seattle | 09:10:25 |
| Chicago | 09:20:03 |

이 때 이 데이터를 장소를 기준으로 (알파벳순으로) 정렬 했을 때 다음과 같이 시간의 상대적인 순서가 보존된다면 안정 정렬된 것이다.

| 장소    | 시간     |
|---------|----------|
| Chicago | 09:00:00 |
| Chicago | 09:20:03 |
| Seattle | 09:10:11 |
| Seattle | 09:10:25 |

그러나 다음과 같이 장소를 정렬한 이후 시간의 상대적인 순서가 원본과 어긋난다면 안정 정렬되지 않은 것이다.

| 장소    | 시간         |
|---------|--------------|
| Chicago | **09:20:03** |
| Chicago | 09:00:00     |
| Seattle | 09:10:11     |
| Seattle | 09:10:25     |

## 다양한 정렬 알고리즘 비교

- [[/insertion-sort]]와 [[/algorithm/merge-sort]]가 안정 정렬에 해당한다.

| algorithm                                | stable? | in place? | 실행 시간                   | 추가 공간 | 비고                                    |
|------------------------------------------|---------|-----------|-----------------------------|-----------|-----------------------------------------|
| [[/algorithm/selection-sort]]{선택 정렬} | no      | yes       | $$N^2$$                     | 1         |                                         |
| [[/insertion-sort]]{삽입 정렬}           | **yes** | yes       | $$N$$ 에서 $$N^2$$ 사이     | 1         | 사전 정렬된 정도에 영향을 받음          |
| [[/algorithm/shell-sort]]{셸 정렬}       | no      | yes       | $$N \log N? \\ N^{6/5}?$$   | 1         |                                         |
| [[/algorithm/quick-sort]]{퀵 정렬}       | no      | yes       | $$N \log N$$                | $$\lg N$$ | 확률적으로 보증됨                       |
| [[/algorithm/quick-sort]]{3중 퀵 정렬}   | no      | yes       | $$N$$에서 $$N \log N$$ 사이 | $$\lg N$$ | 확률적이면서, 입력 키들에 영향을 받는다 |
| [[/algorithm/merge-sort]]{병합 정렬}     | **yes** | no        | $$N \log N$$                | $$N$$     |                                         |
| [[/heap-sort]]{힙 정렬}                  | no      | yes       | $$N \log N$$                | 1         |                                         |

출처[^SED-2-5]

## 참고문헌

- [CLRS] Introduction to Algorithms 3판 / 토머스 코멘, 찰스 레이서손, 로날드 리베스트, 클리포드 스타인 공저 / 문병로, 심규석, 이충세 공역 / 한빛아카데미 / 2014년 06월 30일
- [KNU] The Art of Computer Programming 3 정렬과 검색(개정2판) / 도널드 커누스 저 / 한빛미디어 / 초판 2쇄 2013년 02월 10일
- [SED] 알고리즘 [개정4판] / 로버트 세지윅, 케빈 웨인 저/권오인 역 / 길벗 / 초판발행 2018년 12월 26일

## 주석

[^SED-2-5]: [SED] 2.5장
[^TAOCP-3-23]: [KNU] 3권. 23쪽.
[^CLRS-8-2]: [CLRS] 8.2장.

