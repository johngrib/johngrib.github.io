---
layout  : wiki
title   : A Relational Model of Data for Large Shared Data Banks - E. F. Codd (1970)
summary : 대형 공유 데이터 뱅크를 위한 데이터의 관계적 모델
date    : 2025-01-26 20:29:48 +0900
updated : 2025-01-26 21:42:38 +0900
tag     : 
resource: 20/96218C-79EC-4A15-91F6-DE682155FBDB
toc     : true
public  : true
parent  : [[/clipping]]
latex   : false
---
* TOC
{:toc}

- [A Relational Model of Data for Large Shared Data Banks (University of Pennsylvania)](https://www.seas.upenn.edu/~zives/03f/cis550/codd.pdf )

## _

>
E. F. Codd  
IBM Research Laboratory, San Jose, California

>
Future users of large data banks must be protected from having to know how the data is organized in the machine (the internal representation).
A prompting service which supplies such information is not a satisfactory solution.
Activities of users at terminals and most application programs should remain unaffected when the internal representation of data is changed and even when some aspects of the external representation are changed.
Changes in data representation will often be needed as a result of changes in query, update, and report traffic and natural growth in the types of stored information.

대형 데이터 뱅크의 미래 사용자들은 데이터가 기계 내부에서 어떻게 구성되어 있는지(내부 표현)를 알아야 할 필요로부터 보호받아야 합니다.
이러한 정보를 제공해주는 프롬프트 서비스는 만족스러운 해결책이라 할 수 없습니다.
데이터의 내부 표현이 변경되거나 외부 표현의 일부가 변경된다 하더라도, 끝단에서의 사용자 활동과 대부분의 응용 프로그램은 영향을 받지 않아야 합니다.
쿼리, 업데이트, 보고 트래픽의 변화와 저장된 정보 유형의 자연스러운 증가로 인해 데이터 표현의 변경은 종종 필요할 수 밖에 없습니다.

>
Existing noninferential, formatted data systems provide users with tree-structured files or slightly more general network models of the data.
In Section 1, inadequacies of these models are discussed.
A model based on n-ary relations, a normal form for data base relations, and the concept of a universal data sublanguage are introduced.
In Section 2, certain operations on relations (other than logical inference) are discussed and applied to the problems of redundancy and consistency in the user’s model.

현존하는 비추론적 형식 데이터 시스템들은 사용자들에게 트리 구조 파일이나 약간 더 일반화된 형태의 네트워크 데이터 모델을 제공합니다.
1장에서는 이러한 모델들의 부적절성(inadequacies)에 대해 논의합니다.
n항(n-ary) 관계에 기반한 모델, 데이터베이스 관계를 위한 정규형(normal form), 그리고 보편적 데이터 서브언어의 개념을 소개합니다.
2장에서는 관계에 대한 특정 연산들(논리적 추론 외의)을 논의하고, 이를 사용자 모델에서의 중복성(redundancy)과 일관성(consistency) 문제에 적용합니다.

>
KEY WORDS AND PHRASES: data bank, data base, data structure, data
organization, hierarchies of data, networks of data, relations, derivability,
redundancy, consistency, composition, join, retrieval language, predicate
calculus, security, data integrity
CR CATEGORIES: 3.70, 3.73, 

### 1. Relational Model and Normal Form

1\. 관계형 모델과 정규형

#### 1.1. INTRODUCTION

1.1. 서론

>
This paper is concerned with the application of elementary relation theory to systems which provide shared access to large banks of formatted data. Except for a paper by Childs [1], the principal application of relations to data systems has been to deductive question-answering systems. Levin and Maron [2] provide numerous references to work in this area.

본 논문은 대규모 형식 데이터 뱅크에 대한 공유 접근을 제공하는 시스템에 기초적인 관계 이론을 적용하는 것입니다. Childs[1]의 논문을 제외하면, 데이터 시스템에 대한 관계의 주된 적용은 연역적 질의응답 시스템에 국한되어 왔습니다. Levin과 Maron[2]은 이 분야의 연구에 대한 다수의 참고문헌을 제공합니다.

>
In contrast, the problems treated here are those of data independence - the independence of application programs and terminal activities from growth in data types and changes in data representation - and certain kinds of data inconsistency which are expected to become troublesome even in nondeductive systems.

반면에, 여기서 다루는 문제들은 데이터 독립성 - 데이터 타입의 증가와 데이터 표현의 변화로부터의 응용 프로그램과 끝단 사용의 독립성 - 그리고 비연역적 시스템에서조차 문제가 될 것으로 예상되는 특정 유형의 데이터 불일치에 관한 것입니다.

>
The relational view (or model) of data described in Section 1 appears to be superior in several respects to the graph or network model [3,4] presently in vogue for noninferential systems. It provides a means of describing data with its natural structure only-that is, without superimposing any additional structure for machine representation purposes. Accordingly, it provides a basis for a high level data language which will yield maximal independence between programs on the one hand and machine representation and organization of data on the other.

1장에서 설명하는 데이터의 관계적 관점(또는 모델)은 비추론적 시스템에서 현재 유행하는 그래프 또는 네트워크 모델[3,4]보다 여러 면에서 우수한 것으로 보입니다. 이는 기계적 표현을 위한 어떠한 추가 구조도 덧씌우지 않고 오직 자연스러운 구조로만 데이터를 기술하는 수단을 제공합니다. 따라서 한편으로는 프로그램과 데이터의 기계적 표현 및 구성 사이에서 최대한의 독립성을 제공하는 고수준 데이터 언어의 기반을 제공합니다.

>
A further advantage of the relational view is that it forms a sound basis for treating derivability, redundancy, and consistency of relations-these are discussed in Section 2. The network model, on the other hand, has spawned a number of confusions, not the least of which is mistaking the derivation of connections for the derivation of relations (see remarks in Section 2 on the “connection trap”).

관계적 관점의 또 다른 장점은 관계의 도출 가능성, 중복성, 일관성을 다루기 위한 합리적인 기반을 형성한다는 것입니다 - 이에 대해서는 2장에서 논의합니다. 반면에 네트워크 모델은 여러 가지 혼란을 야기했는데, 그중 가장 작지 않은 것이 연결의 도출을 관계의 도출로 오해하는 것입니다("연결 함정"에 대해서는 2장의 설명 참조).

>
Finally, the relational view permits a clearer evaluation of the scope and logical limitations of present formatted data systems, and also the relative merits (from a logical standpoint) of competing representations of data within a single system. Examples of this clearer perspective are cited in various parts of this paper. Implementations of systems to support the relational model are not discussed.

마지막으로, 관계적 관점은 현재의 형식화된 데이터 시스템의 범위와 논리적 한계를 더 명료하게 평가할 수 있게 해주며, 단일 시스템 내에서 경쟁하는 데이터 표현들의 상대적 장점도 (논리적 관점에서) 더 확실하게 평가할 수 있게 해줍니다. 이러한 더 명확한 관점의 예시들은 본 논문의 여러 부분에서 소개할 것입니다. 그러나 관계 모델을 지원하는 시스템의 구현에 대해서는 논의하지 않습니다.

#### 1.2. DATA DEPENDENCIES IN PRESENT SYSTEMS

>
The provision of data description tables in recently developed information systems represents a major advance toward the goal of data independence [5,6,7]. Such tables facilitate changing certain characteristics of the data representation stored in a data bank. However, the variety of data representation characteristics which can be changed without logically impairing some application programs is still quite limited. Further, the model of data with which users interact is still cluttered with representational properties, particularly in regard to the representation of collections of data (as opposed to individual items). Three of the principal kinds of data dependencies which still need to be removed are: ordering dependence, indexing dependence, and access path dependence. In some systems these dependencies are not clearly separable from one another.

최근 개발된 정보 시스템에서 데이터 설명 테이블을 제공하는 것은 데이터 독립성이라는 목표 측면에서의 주요한 발전이라 할 수 있습니다[5,6,7]. 이러한 테이블 덕분에 데이터 뱅크에 저장된 데이터 표현의 특정한 특성들을 편리하게 변경할 수 있게 되었습니다.
하지만 응용 프로그램들을 논리적으로 손상시키지 않고 변경할 수 있게끔 해주는 데이터 표현 특성들의 다양성은 아직도 매우 제한적입니다. 게다가, 사용자와 상호작용하는 데이터 모델은 여전히 표현적 속성들이 불필요하게 혼재되어 있는데, 특히 개별 항목이 아닌 데이터 집합의 표현 측면에서 그러합니다. 아직도 제거하지 못한 중요한 데이터 종속성 세 가지는 순서 종속성, 인덱싱 종속성, 접근 경로 종속성이라 할 수 있습니다. 그리고 몇몇 시스템에서는 이러한 종속성들이 서로 명확히 구분되지 않습니다.

##### 1.2.1. Ordering Dependence.

1.2.1. 순서 종속성

>
Elements of data in a data bank may be stored in a variety of ways, some involving no concern for ordering, some permitting each element to participate in one ordering only, others permitting each element to participate in several orderings. Let us consider those existing systems which either require or permit data elements to be stored in at least one total ordering which is closely associated with the hardware-determined ordering of addresses. For example, the records of a file concerning parts might be stored in ascending order by part serial number. Such systems normally permit application programs to assume that the order of presentation of records from such a file is identical to (or is a subordering of) the stored ordering. Those application programs which take advantage of the stored ordering of a file are likely to fail to operate correctly if for some reason it becomes necessary to replace that ordering by a different one. Similar remarks hold for a stored ordering implemented by means of pointers.

데이터 뱅크의 데이터 요소들은 다양한 방식으로 저장될 수 있습니다. 어떤 방식은 순서를 전혀 고려하지 않고, 어떤 방식은 각 요소가 하나의 순서에만 참여하도록 허용하며, 또 다른 방식은 각 요소가 여러 순서에 참여할 수 있도록 허용합니다. 하드웨어가 결정하는 주소의 순서와 밀접하게 연관된 적어도 하나의 전체 순서로 데이터 요소들을 저장하도록 요구하거나 허용하는 기존 시스템들을 살펴보겠습니다.
예를 들어, 부품에 관한 파일의 레코드들은 부품 일련번호의 오름차순으로 저장될 수 있습니다. 이러한 시스템들은 일반적으로 응용 프로그램이 이런 파일로부터 레코드를 제시받는 순서가 저장된 순서와 동일하다고(또는 저장된 순서의 부분 순서라고) 가정하는 것을 허용합니다. 파일의 저장 순서를 활용하는 응용 프로그램들은 어떤 이유로든 그 순서를 다른 것으로 교체해야 할 필요가 생기면 제대로 작동하지 않을 가능성이 높습니다. 포인터를 통해 구현된 저장 순서에 대해서도 비슷한 설명이 적용됩니다.

>
It is unnecessary to single out any system as an example, because all the well-known information systems that are marketed today fail to make a clear distinction between order of presentation on the one hand and stored ordering on the other. Significant implementation problems must be solved to provide this kind of independence.

특정 시스템을 굳이 예시로 들 필요는 없을 것입니다. 오늘날 시장에 나와 있는 잘 알려진 정보 시스템들 모두가 제시 순서와 저장 순서를 명확히 구분하지 못하고 있기 때문입니다. 이러한 종류의 독립성을 제공하기 위해서는 중요한 구현상의 문제들이 해결되어야 합니다.

##### 1.2.2. Indexing Dependence.

