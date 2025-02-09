---
layout  : wiki
title   : A Relational Model of Data for Large Shared Data Banks - E. F. Codd (1970)
summary : 대형 공유 데이터 뱅크를 위한 데이터의 관계적 모델
date    : 2025-01-26 20:29:48 +0900
updated : 2025-02-09 16:37:48 +0900
tag     : 
resource: 20/96218C-79EC-4A15-91F6-DE682155FBDB
toc     : true
public  : true
parent  : [[/clipping]]
latex   : true
---
* TOC
{:toc}

## 개요

원문: [A Relational Model of Data for Large Shared Data Banks (University of Pennsylvania)](https://www.seas.upenn.edu/~zives/03f/cis550/codd.pdf )

- E. F. Codd의 이 1970년 논문을 통해 RDB 개념이 창안되었다.
    - **관계형 데이터베이스의 이론적인 기초를 제시한 전설적인 논문이다.**
    - 컴퓨터 과학 역사상 가장 중요한 논문을 꼽으면 10위 이내에 꼽히곤 하는 논문이기도 하다.
    - Codd는 1981년 튜링상을 수상하였다.

E. F. Codd는 이 논문에서 집합론과 관계 이론을 토대로 새로운 종류의 데이터 모델을 제안하는데, 이 모델은 데이터의 논리적 구조와 물리적 구조를 분리하여 데이터를 독립시킨다는 혁신을 가져왔다고 할 수 있다.

이 논문에서 소개하는 RDB 개념이 등장하기 이전의 데이터베이스는 주로 계층형이나 네트워크형 모델을 사용하고 있었고, 이런 모델들은 데이터 구조가 복잡하고 데이터의 사용이나 수정이 물리적인 저장 방식에 강하게 의존하는 문제가 있었다.


## 함께 읽기

- [[/clipping/out-of-the-tar-pit]]
    - 계층형/네트워크/관계 문제에 대해서는 [[/clipping/out-of-the-tar-pit]]에서도 중요하게 다루는 주제이므로, 이 논문과 함께 읽어보는 것도 좋을 것이다.
- [[/people/fred-brooks#ted-codd]]
    - 프레드 브룩스는 IBM 재직중일 때 장래가 촉망되는 직원, Ted Codd(Edgar Frank "Ted" Codd)를 미시간 대학에 보내 박사 학위를 취득할 수 있게 해 주었다고 한다. 그 이후 Codd는 관계형 데이터베이스 개념을 창안하게 되었으므로, 프레드 브룩스는 자신이 IBM에서 했던 일 중 가장 생산적인 일이 Codd를 대학에 보낸 것이었다고 한 바 있다.
- [Edgar F. ("Ted") Codd - United States - 1981 (amturing.acm.org)](https://amturing.acm.org/award_winners/codd_1000892.cfm )
    - 1981년 튜링상 수상자 Ted Codd를 소개하는 글.
- [IBM System R](https://en.wikipedia.org/wiki/IBM_System_R )
    - SQL이 처음으로 구현된 시스템.

## 번역

>
참고: 초벌 번역은 claude가 90% 정도 진행했고, 나는 조금씩만 수정했다.
이후로는 반복적으로 읽으며 표현을 조금씩 수정하고 있다.
{:style="background-color: #ecf1e8;"}

<span/>

>
E. F. Codd  
IBM Research Laboratory, San Jose, California

>
Future users of large data banks must be protected from having to know how the data is organized in the machine (the internal representation).
A prompting service which supplies such information is not a satisfactory solution.
Activities of users at terminals and most application programs should remain unaffected when the internal representation of data is changed and even when some aspects of the external representation are changed.
Changes in data representation will often be needed as a result of changes in query, update, and report traffic and natural growth in the types of stored information.

미래의 대형 데이터 뱅크[^data-bank] 사용자들은 기계 내부에서 데이터가 어떻게 구성되어 있는지(내부 표현)를 알아야 할 필요로부터 보호받아야 합니다.
이러한 정보를 제공해주는 프롬프트 서비스는 그다지 좋은 해결책이라 할 수 없습니다.
데이터의 내부 표현이나 외부 표현의 일부가 변경되더라도, 대부분의 응용 프로그램이나 단말 사용자 활동은 그러한 변경의 영향을 받지 않아야 합니다.
쿼리, 업데이트, 보고서 트래픽의 변화와 저장되는 정보 유형의 자연스러운 증가로 인해 데이터 표현의 변경은 종종 필요하게 될 것입니다.

[^data-bank]: 역주: 데이터 뱅크라는 용어는 오늘날 기준 '데이터베이스'라고 이해해도 무방할 것으로 보인다.

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

대규모의 구조화된 데이터 뱅크에 대한 공유 접근을 제공하는 시스템들에 기본 관계 이론을 적용하는 것이 이 논문의 주제입니다. Childs[1]의 논문을 제외하고, 지금까지는 데이터 시스템에서 관계 이론은 주로 연역적 질의응답 시스템에 한정되어 적용되어 왔습니다. Levin과 Maron[2]이 이 분야의 연구들에 대한 풍부한 참고문헌을 제공하고 있습니다.

>
In contrast, the problems treated here are those of data independence - the independence of application programs and terminal activities from growth in data types and changes in data representation - and certain kinds of data inconsistency which are expected to become troublesome even in nondeductive systems.

반면 이 논문에서 다루는 문제들은 데이터 독립성과 관련된 것입니다. (여기서 데이터 독립성이란 응용 프로그램과 단말 작업이 데이터 타입이 증가하거나 데이터 표현 방식이 변경되어도 영향을 받지 않는 것을 의미합니다.) 그리고 비연역적 시스템에서도 문제가 될 것으로 예상되는 특정 유형의 데이터 불일치 문제도 다룹니다.

>
The relational view (or model) of data described in Section 1 appears to be superior in several respects to the graph or network model [3,4] presently in vogue for noninferential systems. It provides a means of describing data with its natural structure only-that is, without superimposing any additional structure for machine representation purposes. Accordingly, it provides a basis for a high level data language which will yield maximal independence between programs on the one hand and machine representation and organization of data on the other.

1장에서 설명하는 **데이터의 관계적 관점**(또는 모델)은 기계 표현을 위한 어떠한 추가 구조도 덧붙이지 않고, 데이터의 자연스러운 구조만을 기술할 수 있는 방법을 제공하며, 프로그램과 데이터의 기계적 표현 및 구성 사이에서 최대한의 독립성을 보장하는 고수준 데이터 언어를 위한 기반을 제공합니다. **관계적 관점**은 현재 비추론적 시스템에서 주류를 이루고 있는 그래프 모델이나 네트워크 모델[3,4]보다 여러 면에서 우수할 것이라 생각합니다.

>
A further advantage of the relational view is that it forms a sound basis for treating derivability, redundancy, and consistency of relations-these are discussed in Section 2. The network model, on the other hand, has spawned a number of confusions, not the least of which is mistaking the derivation of connections for the derivation of relations (see remarks in Section 2 on the “connection trap”).

관계의 도출 가능성, 중복성, 일관성을 다루기 위한 탄탄한 이론적 기반을 제공한다는 점이 관계적 관점의 또다른 장점이라 할 수 있습니다(이는 2장에서 상세히 다룹니다). 반면 네트워크 모델은 여러 혼란의 원인이 되었는데, 그 중에서도 특히 심각한 문제는 연결의 도출을 관계의 도출로 잘못 이해하게 만든다는 것입니다(이른바 '연결 함정'에 대해서는 2장을 참조하시기 바랍니다).

>
Finally, the relational view permits a clearer evaluation of the scope and logical limitations of present formatted data systems, and also the relative merits (from a logical standpoint) of competing representations of data within a single system. Examples of this clearer perspective are cited in various parts of this paper. Implementations of systems to support the relational model are not discussed.

관계적 관점을 사용하면 현재의 구조화된 데이터 시스템이 가진 범위와 논리적 한계를 더 명확하게 평가할 수 있습니다. 그리고 단일 시스템 내에서 서로 경쟁하는 데이터 표현 방식들의 상대적 장점도 논리적 관점에서 더 분명하게 파악할 수 있습니다. 이렇게 명확한 관점을 보여주는 예시들은 본 논문 전반에 걸쳐 제시됩니다. 단, 관계 모델을 지원하는 시스템의 구현 방식은 본 논문의 논의 대상이 아님을 밝힙니다.

#### 1.2. DATA DEPENDENCIES IN PRESENT SYSTEMS

1.2. 현 세대 시스템에서의 데이터 종속성[^title-1-2]

[^title-1-2]: 역주: 여기에서 말하는 현 세대는 1970년이 기준.

>
The provision of data description tables in recently developed information systems represents a major advance toward the goal of data independence [5,6,7]. Such tables facilitate changing certain characteristics of the data representation stored in a data bank. However, the variety of data representation characteristics which can be changed without logically impairing some application programs is still quite limited. Further, the model of data with which users interact is still cluttered with representational properties, particularly in regard to the representation of collections of data (as opposed to individual items). Three of the principal kinds of data dependencies which still need to be removed are: ordering dependence, indexing dependence, and access path dependence. In some systems these dependencies are not clearly separable from one another.

최근에 개발된 정보 시스템들에서 데이터 설명 테이블을 제공하는 것은 데이터 독립성이라는 목표를 향한 큰 진전이라 할 수 있습니다[5,6,7]. 이러한 테이블들로 인해 데이터 뱅크에 저장된 데이터 표현의 특정 특성들을 변경하는 작업이 용이해지기 때문입니다. 하지만 응용 프로그램들의 논리적 손상 없이 변경할 수 있는 데이터 표현 특성들의 범위는 아직도 매우 제한적입니다.[^change-type-1-2]
더욱이 사용자가 다루는 데이터 모델에는, 특히 개별 항목이 아닌 데이터 집합을 다룰 때, 여전히 데이터 표현 방식에 관한 불필요한 세부사항들이 뒤섞여 있습니다.

[^change-type-1-2]: 역주: 데이터 타입을 바꾸면 응용 프로그램의 로직이 깨지는 것은 2025년 현재에도 여전히 어려운 문제로 남아있다.

##### 1.2.1. Ordering Dependence.

1.2.1. 순서 종속성

>
Elements of data in a data bank may be stored in a variety of ways, some involving no concern for ordering, some permitting each element to participate in one ordering only, others permitting each element to participate in several orderings. Let us consider those existing systems which either require or permit data elements to be stored in at least one total ordering which is closely associated with the hardware-determined ordering of addresses. For example, the records of a file concerning parts might be stored in ascending order by part serial number. Such systems normally permit application programs to assume that the order of presentation of records from such a file is identical to (or is a subordering of) the stored ordering. Those application programs which take advantage of the stored ordering of a file are likely to fail to operate correctly if for some reason it becomes necessary to replace that ordering by a different one. Similar remarks hold for a stored ordering implemented by means of pointers.

데이터 뱅크의 데이터 요소들은 다양한 방식으로 저장될 수 있는데, 순서를 전혀 고려하지 않는 방식도 있고, 각 요소가 하나의 순서에만 참여하도록 하는 방식도 있으며, 각 요소가 여러 순서에 참여할 수 있게 하는 방식도 있습니다. 이제 기존 시스템들 중 일부를 살펴보겠습니다. 이 시스템들은 데이터 요소들을 저장할 때 하드웨어 주소의 물리적 순서와 밀접하게 연관된 최소한 하나의 전체 순서를 요구하거나 허용합니다.

예를 들어, 부품에 관한 파일의 레코드들은 부품 일련번호의 오름차순으로 저장될 수 있습니다. 이러한 시스템들은 일반적으로 응용 프로그램이 이런 파일로부터 레코드를 전달받는 순서가 저장된 순서와 동일하다고(또는 저장된 순서의 부분 순서라고) 가정하는 것을 허용합니다. 그런데 파일의 저장 순서를 활용하는 응용 프로그램들은 어떤 이유로든 그 순서를 다른 것으로 교체해야 할 필요가 생기면 제대로 작동하지 않게 될 가능성이 높습니다. 저장하는 순서를 포인터를 통해 구현한 경우에 대해서도 비슷한 설명이 적용됩니다.

>
It is unnecessary to single out any system as an example, because all the well-known information systems that are marketed today fail to make a clear distinction between order of presentation on the one hand and stored ordering on the other. Significant implementation problems must be solved to provide this kind of independence.

특정 시스템을 굳이 예시로 들 필요는 없을 것입니다. 오늘날 시장에 나와 있는 유명한 정보 시스템들 모두 표현상의 순서와 저장 순서를 명확히 구분하지 못하고 있기 때문입니다. 이러한 종류의 독립성을 제공하기 위해서는 구현상의 핵심적인 문제들이 해결되어야 합니다.


##### 1.2.2. Indexing Dependence.

1.2.2. 인덱싱 종속성

>
In the context of formatted data, an index is usually thought of as a purely performance-oriented component of the data representation. It tends to improve response to queries and updates and, at the same time, slow down response to insertions and deletions. From an informational standpoint, an index is a redundant component of the data representation. If a system uses indices at all and if it is to perform well in an environment with changing patterns of activity on the data bank, an ability to create and destroy indices from time to time will probably be necessary. The question then arises: Can application programs and terminal activities remain invariant as indices come and go?

구조화된 데이터의 관점에서, 인덱스는 일반적으로 데이터 표현에 있어 완전히 성능만을 위한 구성요소로 여겨지곤 합니다. 인덱스는 조회와 갱신에 대한 응답 속도를 향상시키지만, 삽입과 삭제에 대한 응답은 늦추는 경향이 있습니다. 정보적 측면에서 보면 인덱스는 데이터 표현의 중복된 구성요소입니다. 만약 시스템이 인덱스를 사용하고 데이터뱅크에 대한 사용 패턴이 변화하는 환경에서도 좋은 성능을 발휘해야 한다면, 상황에 따라 때때로 인덱스를 생성하고 제거할 수도 있는 능력이 필요할 것입니다. 그렇다면 이런 의문이 생길 수 있습니다: 인덱스가 생성되고 제거되는 동안에도 응용 프로그램과 단말 작업이 이전과 같이 작동할 수 있을까요?

>
Present formatted data systems take widely different approaches to indexing. TDMS [7] unconditionally provides indexing on all attributes. The presently released version of IMS [5] provides the user with a choice for each file: a choice between no indexing at all (the hierarchic sequential organization) or indexing on the primary key only (the hierarchic indexed sequent,ial organization). In neither case is the user’s application logic dependent on the existence of the unconditionally provided indices. IDS [8], however, permits the fle designers to select attributes to be indexed and to incorporate indices into the file structure by means of additional chains. Application programs taking advantage of the performance benefit of these indexing chains must refer to those chains by name. Such programs do not operate correctly if these chains are later removed.

현존하는 구조화된 데이터 시스템들은 인덱싱에 대해서 각자 매우 다른 접근 방식을 취하고 있습니다. 예를 들어 TDMS[7]는 모든 속성에 대해 무조건 인덱싱을 제공합니다. 그리고 최신 버전의 IMS[5]는 각 파일에 대해 사용자에게 선택권을 제공하며, 전혀 인덱싱을 하지 않는 방식(계층적 순차 구성)과 기본 키에 대해서만 인덱싱하는 방식(계층적 인덱스 순차 구성) 중에서 선택할 수 있도록 되어 있습니다.
두 경우 모두 사용자의 응용 로직은 무조건적으로 제공되는 인덱스의 존재 여부에 종속되지 않습니다. 반면 IDS[8]는 파일 설계자가 인덱싱할 속성들을 선택하고 추가적인 체인들을 통해 인덱스를 파일 구조에 통합할 수 있도록 허용합니다. 이러한 인덱싱 체인들의 성능상 이점을 활용하는 응용 프로그램들은 해당 체인들의 이름을 직접 참조해야 합니다. 이러한 프로그램들은 이 체인들이 나중에 제거되면 올바르게 작동하지 않는 문제가 있습니다.

##### 1.2.3. Access Path Dependence. {#section-1-2-3}

1.2.3. 접근 경로 종속성

<span id="section-1-2-3-1"/>

>
 Many of the existing formatted data systems provide users with tree-structured files or slightly more general network models of the data. Application programs developed to work with these systems tend to be logically impaired if the trees or networks are changed in structure. A simple example follows.

기존의 구조화된 데이터 시스템들 상당수는 사용자들에게 트리 구조의 파일들을 제공하거나 그보다 좀 더 일반화된 형태의 데이터 네트워크 모델을 제공합니다. 그런데 이러한 시스템에서 작동되도록 개발된 응용 프로그램들은 기반을 이루는 트리나 네트워크의 구조가 변경되면 논리적 오류도 발생하게 됩니다. 간단한 예시를 들어보겠습니다.

<span id="section-1-2-3-2"/>

>
Suppose the data bank contains information about parts and projects. For each part, the part number, part name, part description, quantity-on-hand, and quantity-on-order are recorded. For each project, the project number, project name, project description are recorded. Whenever a project makes use of a certain part, the quantity of that part committed to the given project is also recorded. Suppose that the system requires the user or file designer to declare or define the data in terms of tree structures. Then, any one of the hierarchical structures may be adopted for the information mentioned above (see Structures 1-5).

데이터 뱅크가 부품과 프로젝트에 대한 정보를 담고 있다고 가정해봅시다. 각 부품마다 부품 번호(part number), 부품 이름(part name), 부품 설명(part description), 재고 수량(quantity-on-hand), 주문 수량(quantity-on-order)이 기록됩니다. 그리고 각 프로젝트마다 프로젝트 번호(project number), 프로젝트 이름(project name), 프로젝트 설명(project description)이 기록됩니다. 또한 프로젝트에서 특정 부품을 사용할 때마다 해당 프로젝트에 할당된 부품의 수량도 함께 기록됩니다. 이때 시스템이 사용자나 파일 설계자에게 데이터를 트리 구조로 선언하거나 정의하도록 요구한다고 가정해봅시다. 그러면 앞서 언급한 정보들은 다음과 같은 계층 구조들(구조 1-5) 중 어느 것으로도 구성될 수 있습니다.


>
Structure 1. Projects Subordinate to Parts
>
> ```
> File Segment Fields
> F    PART    part #
>              part name
>              part description
>              quantity-on-hand
>              quantity-on-order
>      PROJECT project #
>              project name
>              project description
>              quantity committed
> ```

예제 구조 1. 부품에 종속된 프로젝트들

>
Structure 2. Parts Subordinate to Projects
>
> ```
> File Segment Fields
> F    PROJECT project #
>              project name
>              project description
>      PART    part #
>              part name
>              part description
>              quantity-on-hand
>              quantity-on-order
>              quantity committed
> ```

예제 구조 2. 프로젝트에 종속된 부품들

>
Structure 3. Parts and Projects as Peers
Commitment Relationship Subordinate to Projects
>
> ```
> File Segment Fields
> F    PART    part #
>              part name
>              part description
>              quantity-on-hand
>              quantity-on-order
> G    PROJECT project #
>              project name
>              project description
>      PART    part #
>              quantity committed
> ```

예제 구조 3. 부품과 프로젝트가 동등한 관계로, 프로젝트에 종속된 할당 관계

>
Structure 4. Parts and Projects as Peers
Commitment Relationship Subordinate to Parts
>
> ```
> File Segment Fields
> F    PART    part #
>              part description
>              quantity-on-hand
>              quantity-on-order
>      PROJECT project #
>              quantity committed
> G    PROJECT project #
>              project name
>              project description
> ```

예제 구조 4. 부품과 프로젝트가 동등한 관계로, 부품에 종속된 할당 관계

>
Structure 5. Parts, Projects, and
Commitment Relationship as Peers
>
> ```
> File Segment Fields
> F    PART    part #
>              part name
>              part description
>              quantity-on-hand
>              quantity-on-order
> G    PROJECT project #
>      project name
>      project description
> H    COMMIT  part #
>      project #
>      quantity committed
> ```

예제 구조 5. 부품, 프로젝트, 할당 관계가 모두 동등함.

<span id="section-1-2-3-3"/>

>
Now, consider the problem of printing out the part number, part name, and quantity committed for every part used in the project whose project name is “alpha.” The following observations may be made regardless of which available tree-oriented information system is selected to tackle this problem. If a program P is developed for this problem assuming one of the five structures above-that is, P makes no test to determine which structure is in effect-then P will fail on at least three of the remaining structures. More specifically, if P succeeds with structure 5, it will fail with all the others; if P succeeds with structure 3 or 4, it will fail with at least 1,2, and 5; if P succeeds with 1 or 2, it will fail with at least 3, 4, and 5. The reason is simple in each case. In the absence of a test to determine which structure is in effect, P fails because an attempt is made to exceute a reference to a nonexistent file (available systems treat this as an error) or no attempt is made to execute a reference to a file containing needed information. The reader who is not convinced should develop sample programs for this simple problem.

이제 "alpha"라는 이름의 프로젝트에서 사용하는 모든 부품의 부품 번호, 부품명, 그리고 할당량을 출력하는 문제가 있다고 생각해 봅시다. 이 문제를 해결하기 위해 어떤 트리 기반 정보 시스템을 선택하든 다음과 같은 관찰이 가능합니다. 위의 다섯 가지 구조 중 하나를 가정하여 프로그램 P를 개발한다면 - 즉, P가 어떤 구조가 적용되는지 검사하지 않는다면 - P는 나머지 구조들 중 최소 세 가지에서 실패할 것입니다.

더 구체적으로, P가 구조 5에서 성공한다면 다른 모든 구조에서 실패할 것이고, P가 구조 3이나 4에서 성공한다면 최소한 1, 2, 5에서 실패할 것이며, P가 1이나 2에서 성공한다면 최소한 3, 4, 5에서 실패할 것입니다. 각각의 경우에 그 이유는 간단합니다. 어떤 구조가 적용되는지 검사하지 않으면, P는 존재하지 않는 파일을 참조하려 시도하거나(기존 시스템들은 이를 오류로 처리함), 필요한 정보가 들어있는 파일을 참조하려는 시도를 하지 않기 때문에 실패합니다. 이 점을 확신하지 못하는 독자는 이 간단한 문제에 대한 샘플 프로그램을 직접 개발해보기 바랍니다.

<span id="section-1-2-3-4"/>

>
Since, in general, it is not practical to develop application programs which test for all tree structurings permitted by the system, these programs fail when a change in sructure becomes necessary.

일반적으로 시스템상 허용되는 모든 트리 구조를 검사하도록 응용 프로그램을 개발하는 것은 비현실적입니다.
따라서 이런 방식의 프로그램들은 구조를 변경해야 할 때 실패하게 됩니다.

<span id="section-1-2-3-5"/>

>
Systems which provide users with a network model of the data run into similar difficulties. In both the tree and network cases, the user (or his program) is required to exploit a collection of user access paths to the data. It does not matter whether these paths are in close correspondence with pointer-defined paths in the stored representation-in IDS the correspondence is extremely simple, in TDMS it is just the opposite. The consequence, regardless of the stored representation, is that terminal activities and programs become dependent on the continued existence of the user access paths.

사용자에게 네트워크 형태의 데이터 모델을 제공하는 시스템들도 비슷한 어려움을 겪습니다. 트리를 사용하는 경우와 네트워크를 사용하는 경우 모두 사용자(또는 그의 프로그램)는 데이터에 접근하기 위한 일련의 사용자 접근 경로들을 활용해야 합니다. 이러한 경로들이 저장된 표현 방식에서 포인터로 정의된 경로들과 얼마나 밀접하게 대응되는지는 중요하지 않습니다. IDS에서는 이 대응 관계가 매우 단순하고, TDMS에서는 정반대입니다. 저장 표현 방식과 무관하게, 단말 작업과 프로그램들은 이러한 사용자 접근 경로가 계속 존재하는지에 의존하게 됩니다.

<span id="section-1-2-3-6"/>

>
One solution to this is to adopt the policy that once a user access path is defined it will not be made obsolete until all application programs using that path have become obsolete. Such a policy is not practical, because the number of access paths in the total model for the community of users of a data bank would eventually become excessively large.

이에 대한 한 가지 해결책은 사용자 접근 경로를 한번 정의하면 그 경로를 사용하는 모든 응용 프로그램이 더 이상 사용되지 않을 때까지 그 경로를 폐기하지 않는다는 정책을 채택하는 것입니다. 하지만 이런 정책은 비현실적입니다. 데이터뱅크 사용자 전체를 위한 모델에서 접근 경로의 수가 결국엔 과도하게 많아질 수 밖에 없기 때문입니다.

#### 1.3. A RELATIONAL VIEW OF DATA

1.3. 데이터에 대한 관계형 관점

<span id="section-1-3-1"/>

>
The term relation is used here in its accepted mathematical sense. Given sets $$ S_1, S_2, ... , S_n $$ (not necessarily distinct), $$R$$ is a relation on these n sets if it is a set of n-tuples each of which has its first element from $$S_1$$, its second element from $$S_2$$, and so on.<sup>1</sup> We shall refer to $$S_j$$ as the jth domain of $$R$$.
As defined above, $$R$$ is said to have degree n. Relations of degree 1 are often called unary, degree 2 binary, degree 3 ternary, and degree n n-ary.
>
<sup>1</sup> More concisely, $$R$$ is a subset of the Cartesian products $$S_1 \times S_2 \times ... \times S_n$$.

여기서 관계라는 용어는 수학적으로 통용되는 의미로 사용됩니다. 집합 $$ S_1, S_2, ... , S_n $$이 주어졌을 때(반드시 서로 달라야 할 필요는 없음), R은 이 n개 집합들에 대한 관계가 됩니다.
이때 R은 n-튜플들의 집합이며, 각 n-튜플의 첫 번째 원소는 $$S_1$$에서, 두 번째 원소는 $$S_2$$에서, 이런 식으로 구성됩니다.<sup>1</sup>
우리는 $$S_j$$를 R의 j번째 도메인이라고 부를 것입니다.
위에서 정의한 대로, R은 차수가 n이라고 합니다. 차수가 1인 관계는 단항 관계, 차수가 2인 관계는 이항 관계, 차수가 3인 관계는 삼항 관계, 차수가 n인 관계는 n항 관계라고 흔히 부릅니다.

<sup>1</sup> 더 간단히 말하자면, R은 카테시안 곱 $$S_1 \times S_2 \times ... \times S_n$$의 부분집합입니다.

<span id="section-1-3-2"/>

>
For expository reasons, we shall frequently make use of an array representation of relations, but it must be remembered that this particular representation is not an essential part of the relational view being expounded. An array which represents an n-ary relation R has the following properties:
>
> - (1) Each row represents an n-tuple of R.
> - (2) The ordering of rows is immaterial.
> - (3) All rows are distinct.
> - (4) The ordering of columns is significant-it corresponds to the ordering $$S_1, S_2, ... , S_n$$ of the domains on which R is defined (see, however, remarks below on domain-ordered and domain-unordered relations).
> (5) The significance of each column is partially conveyed by labeling it with the name of the corresponding domain.

이 논문에서는 설명을 위해 관계를 표현할 때 배열 표현을 자주 사용할 것입니다. 그러나 이런 표현 방식이 여기서 설명하고자 하는 관계형 관점의 필수적인 부분은 아니라는 점은 염두에 두어야 합니다. n항 관계 R을 표현하는 배열은 다음과 같은 특성을 가집니다:

- (1) 각 행은 R의 n-튜플을 나타냅니다.
- (2) 행의 순서는 중요하지 않습니다.
- (3) 모든 행은 서로 다릅니다.
- (4) 열의 순서는 중요합니다. 이는 R이 정의된 도메인들의 순서 $$S_1, S_2, ..., S_n$$에 대응됩니다(단, 도메인 순서가 있는 관계와 도메인 순서가 없는 관계에 대한 아래 설명 참조).
- (5) 각 열의 의미는 해당 도메인의 이름을 붙임으로써 부분적으로 전달됩니다.

<span id="section-1-3-3"/>

>
The example in Figure 1 illustrates a relation of degree 4, called supply, which reflects the shipments-in-progress of parts from specified suppliers to specified projects in specified quantities.
>
> ```
> supply (supplier part project quantity)
>            1       2     5       17
>            1       3     5       23
>            2       3     7        9
>            2       7     5        4
>            4       1     1       12
> ```
>
FIG. 1. A relation of degree 4

그림 1은 supply라고 이름을 붙인 4항 관계의 예시를 보여줍니다. 이 관계는 특정 공급자(supplier)가 특정 프로젝트(project)에 특정 부품(part)을 특정 수량(quantity)만큼 공급하고 있는 현황을 나타냅니다.

그림 1. 4항 관계의 예

<span id="section-1-3-4"/>

>
One might ask: If the columns are labeled by the name of corresponding domains, why should the ordering of columns matter? As the example in Figure 2 shows, two columns may have identical headings (indicating identical domains) but possess distinct meanings with respect to the relation. The relation depicted is called component. It is a ternary relation, whose first two domains are called part and third domain is called quantity. The meaning of component (x, y, z) is that part x is an immediate component (or subassembly) of part y, and z units of part x are needed to assemble one unit of part y. It is a relation which plays a critical role in the parts explosion problem.
>
> ```
> component (part part quantity)
>             1     5       9
>             2     5       7
>             3     5       2
>             2     6      12
>             3     6       3
>             4     7       1
>             6     7       1
> ```
>
FIG. 2. A relation with-two identical domains

다음과 같은 의문이 들 수 있습니다: 열에 해당 도메인의 이름으로 이미 라벨이 붙어 있다면, 열의 순서가 왜 중요할까요? 그림 2에서 보여주는 예시처럼, 두 개의 열이 동일한 헤더(즉, 동일한 도메인을 의미)를 가질 수 있지만 해당 관계에서는 서로 다른 의미를 가질 수 있습니다. 여기서 보여주는 관계는 component라고 부릅니다. 이는 삼항 관계로, 처음 두 개의 도메인은 part이고 세 번째 도메인은 quantity입니다. component(x, y, z)의 의미는 다음과 같습니다: 부품 x는 부품 y의 직접적인 구성요소(또는 하위 조립품)이며, 부품 y 한 개를 조립하는 데 부품 x가 z개 필요하다는 뜻입니다. 이는 부품 전개(parts explosion) 문제에서 핵심적인 역할을 하는 관계입니다.

그림 2. 동일한 도메인을 두 개 가진 관계의 예

<span id="section-1-3-5"/>

>
It is a remarkable fact that several existing information systems (chiefly those based on tree-structured files) fail to provide data representations for relations which have two or more identical domains. The present version of IMS/360 [5] is an example of such a system.

주목할 만한 사실은, 현존하는 여러 정보 시스템들(주로 트리 구조의 파일을 기반으로 하는 시스템들)이 두 개 이상의 동일한 도메인을 가진 관계를 표현하지 못한다는 점입니다. IMS/360[5]의 현재 버전은 이러한 시스템의 한 예시입니다.

<span id="section-1-3-6"/>

>
The totality of data in a data bank may be viewed as a collection of time-varying relations. These relations are of assorted degrees. As time progresses, each n-ary relation may be subject to insertion of additional n-tuples, deletion of existing ones, and alteration of components of any of its existing n-tuples.

데이터 뱅크의 모든 데이터는 시간에 따라 변화하는 관계들의 집합으로 볼 수 있습니다. 이러한 관계들은 다양한 항수를 가집니다. 시간이 흐름에 따라, 각각의 n항 관계에는 새로운 n-튜플이 삽입되거나, 기존 n-튜플이 삭제되거나, 기존 n-튜플의 구성요소가 변경될 수 있습니다.

<span id="section-1-3-7"/>

>
In many commercial, governmental, and scientific data banks, however, some of the relations are of quite high degree (a degree of 30 is not at all uncommon). Users should not normally be burdened with remembering the domain ordering of any relation (for example, the ordering supplier, then part, then project, then quantity in the relation supply). Accordingly, we propose that users deal, not with relations which are domain-ordered, but with relationships which are their domain-unordered counterparts.2 To accomplish this, domains must be uniquely identifiable at least within any given relation, without using position. Thus, where there are two or more identical domains, we require in each case that the domain name be qualified by a distinctive role name, which serves to identify the role played by that domain in the given relation. For example, in the relation component of Figure 2, the first domain part might be qualified by the role name sub, and the second by super, so that users could deal with the relationship component and its domains-sub.part super.part, quantity-without regard to any ordering between these domains.
>
<sup>2</sup> In mathematical terms, a relationship is an equivalence class of those relations that are equivalent under permutation of domains (see Section 2.1.1).

하지만 많은 상업용, 정부용, 과학용 데이터 뱅크에서는 상당히 높은 차수의 관계들이 존재합니다(30항짜리가 나오는 경우도 있음). 사용자들이 각 관계의 도메인 순서를 기억해야 하는 부담을 지는 것은 바람직하지 않습니다(supply 관계를 예로 들면 공급자, 부품, 프로젝트, 수량이라는 순서가 있음). 따라서 우리는 사용자들이 도메인 순서가 정해진 관계가 아니라, 도메인 순서가 정해지지 않은 대응물인 관계성(relationship)을 다루도록 제안합니다.<sup>2</sup> 이를 위해서는 도메인들의 위치에 의존하지 않고도 적어도 주어진 관계 내에서는 도메인을 고유하게 식별 가능해야 합니다. 따라서 두 개 이상의 동일한 도메인이 있는 경우, 각각의 도메인 이름은 해당 관계에서 그 도메인이 수행하는 역할을 식별하는 고유한 역할 이름으로 한정되어야 합니다. 예를 들어, 그림 2의 component 관계에서 첫 번째 part 도메인은 sub라는 역할 이름으로, 두 번째는 super라는 역할 이름으로 한정할 수 있습니다. 이렇게 하면 사용자들은 이들 도메인 간의 순서와 관계없이 component라는 관계성과 그 도메인들(sub.part, super.part, quantity)을 다룰 수 있게 됩니다.

<sup>2</sup>수학적 용어로, 관계성은 도메인들의 순열 하에서 서로 동등한 관계들의 동치류입니다(2.1.1절 참조).

<span id="section-1-3-8"/>

>
To sum up, it is proposed that most users should interact with a relational model of the data consisting of a collection of time-varying relationships (rather than relations). Each user need not know more about any relationship than its name together with the names of its domains (role qualified whenever necessary).<sup>3</sup> Even this information might be offered in menu style by the system (subject to security and privacy constraints) upon request by the user.
>
<sup>3</sup> Naturally, as with any data put into and retrieved from a computer system, the user will normally make far more effective use of the data if he is aware of its meaning.

즉, 대부분의 사용자들은 시간에 따라 변화하는 관계들의 집합이 아닌 관계성들의 집합으로 구성된 데이터의 관계형 모델과 상호작용해야 한다고 제안합니다. 각 사용자는 관계성에 대해 그것의 이름과 도메인들의 이름(필요한 경우 역할로 한정된)만 알면 됩니다. 심지어 이러한 정보조차도 사용자의 요청에 따라 시스템이 메뉴 형식으로 제공할 수 있습니다(보안 및 개인정보 보호 제약사항에 따라).

<sup>3</sup> 당연한 말이지만, 컴퓨터 시스템에 입력되고 검색되는 다른 모든 데이터와 마찬가지로 사용자가 데이터의 의미를 알고 있을 때 그 데이터를 훨씬 더 효과적으로 사용할 수 있을 것입니다.

<span id="section-1-3-9"/>

>
There are usually many alternative ways in which a relational model may be established for a data bank. In order to discuss a preferred way (or normal form), we must first introduce a few additional concepts (active domain, primary key, foreign key, nonsimple domain) and establish some links with terminology currently in use in information systems programming. In the remainder of this paper, we shall not bother to distinguish between relations and relationships except where it appears advantageous to be explicit.

데이터 뱅크에 대한 관계형 모델을 수립하는 방법에는 보통 여러 가지 대안이 있습니다. 선호되는 방식(또는 정규형)을 논의하기 위해서는 먼저 몇 가지 추가 개념(활성 도메인, 기본 키, 외래 키, 비단순 도메인)을 소개하고 현재 정보 시스템 프로그래밍에서 사용되는 용어와의 연관성을 확립해야 합니다. 이 논문의 나머지 부분에서는 명시적으로 구분할 필요가 있는 경우를 제외하고는 관계와 관계성을 구분하지 않겠습니다.

<span id="section-1-3-10"/>

>
Consider an example of a data bank which includes relations concerning parts, projects, and suppliers. One relation called part is defined on the following domains:
>
> - (1) part number
> - (2) part name
> - (3) part color
> - (4) part weight
> - (5) quantity on hand
> - (6) quantity on order
>
and possibly other domains as well. Each of these domains is, in effect, a pool of values, some or all of which may be represented in the data bank at any instant. While it is conceivable that, at some instant, all part colors are present, it is unlikely that all possible part weights, part names, and part numbers are. We shall call the set of values represented at some instant the active domain at that instant.

부품, 프로젝트, 공급업체에 관한 관계들을 포함하는 데이터 뱅크의 예시를 살펴보겠습니다. part라고 하는 한 관계는 다음과 같은 도메인들에 대해 정의됩니다.

- (1) 부품 번호
- (2) 부품 이름
- (3) 부품 색상
- (4) 부품 무게
- (5) 재고 수량
- (6) 주문 수량

그리고 다른 도메인들도 있을 수 있습니다. 이러한 각 도메인은 사실상 값들의 집합이며, 이 값들 중 일부 또는 전부가 특정 시점의 데이터 뱅크에 표현될 수 있습니다. 어떤 시점에 모든 부품들의 색상이 존재할 수 있다고 생각할 수 있지만, 가능한 모든 부품 무게, 부품 이름, 부품 번호가 존재할 가능성은 낮습니다. 특정 시점에 표현된 값들의 집합을 그 시점의 활성 도메인이라고 부르도록 하겠습니다.

<span id="section-1-3-11"/>

>
Normally, one domain (or combination of domains) of a given relation has values which uniquely identify each element (n-tuple) of that relation. Such a domain (or combination) is called a primary key. In the example above, part number would be a primary key, while part color would not be. A primary key is nonredundant if it is either a simple domain (not a combination) or a combination such that none of the participating simple domains is superfluous in uniquely identifying each element. A relation may possess more than one nonredundant primary key. This would be the case in the example if different parts were always given distinct names. Whenever a relation has two or more nonredundant primary keys, one of them is arbitrarily selected and called the primary key of that relation.

일반적으로 주어진 관계의 한 도메인(또는 도메인들의 조합)은 해당 관계의 각 원소(n-튜플)를 고유하게 식별하는 값들을 가집니다. 이러한 도메인(또는 조합)을 기본 키(primary key)라고 합니다. 위의 예시에서 부품 번호는 기본 키가 될 수 있지만, 부품 색상은 그렇지 않습니다. 기본 키가 단순 도메인(조합이 아닌)이거나 각 원소를 고유하게 식별하는 데 참여하는 단순 도메인 중 어느 것도 불필요하지 않은 조합일 경우, 이를 비중복 기본 키라고 합니다(nonredundant primary key). 하나의 관계는 둘 이상의 비중복 기본 키를 가질 수 있습니다. 서로 다른 부품들이 항상 서로 다른 이름을 가진다면 위의 예시가 이러한 경우에 해당합니다. 관계가 둘 이상의 비중복 기본 키를 가질 때마다, 그중 하나를 임의로 선택하여 해당 관계의 기본 키라고 부릅니다.

<span id="section-1-3-12"/>

>
A common requirement is for elements of a relation to cross-reference other elements of the same relation or elements of a different relation. Keys provide a user-oriented means (but not the only means) of expressing such cross-references. We shall call a domain (or domain combmation) of relation R a foreign key if it is not the primary key of R but its elements are values of the primary key of some relation S (the possibility that S and R are identical is not excluded). In the relation supply of Figure 1, the combination of supplier, part, project is the primary key, while each of these three domains taken separately is a foreign key.

흔한 요구사항 중 하나는 한 관계의 원소들이 같은 관계의 다른 원소들이나 다른 관계의 원소들을 상호 참조하는 것입니다. 키는 이러한 상호 참조를 표현하기 위한 사용자 친화적인 수단을 제공합니다(단, 유일한 수단은 아닙니다). 관계 R의 도메인(또는 도메인 조합)이 R의 기본 키가 아니면서 그 원소들이 어떤 관계 S의 기본 키 값들인 경우, 이를 외래 키(foreign key)라고 부르도록 하겠습니다(여기서 S와 R이 동일할 수 있다는 가능성도 배제하지 않습니다). 그림 1의 supply 관계에서 공급업체, 부품, 프로젝트의 조합이 기본 키이며, 이 세 도메인 각각은 개별적으로 외래 키입니다.

<span id="section-1-3-13"/>

>
In previous work there has been a strong tendency to treat the data in a data bank as consisting of two parts, one part consisting of entity descriptions (for example, descriptions of suppliers) and the other part consisting of relations between the various entities or types of entities (for example, the supply relation). This distinction is difficult to maintain when one may have foreign keys in any relation whatsoever. In the user’s relational model there appears to be no advantage to making such a distinction (there may be some advantage, however, when one applies relational concepts to machine representations of the user’s set of relationships).

이전 연구들에서는 데이터 뱅크의 데이터를 두 부분으로 나누어 다루는 경향이 강했습니다. 한 부분은 개체 설명(예: 공급업체에 대한 설명)으로 구성되고, 다른 부분은 다양한 개체들 또는 개체 유형들 간의 관계(예: supply 관계)로 구성됩니다. 그러나 어떤 관계에서든 외래 키가 존재할 수 있다는 점에서 이러한 구분을 유지하기는 어렵습니다. 사용자의 관계형 모델에서는 이러한 구분을 두는 것이 특별히 유리해 보이지 않습니다(다만 사용자의 관계 집합에 대한 기계적 표현에 관계형 개념을 적용할 때는 어느 정도 이점이 있을 수 있습니다).

<span id="section-1-3-14"/>

>
So far, we have discussed examples of relations which are defined on simple domains-domains whose elements are atomic (nondecomposable) values. Nonatomic values can be discussed within the relational framework. Thus, some domains may have relations as elements. These relations may, in turn, be defined on nonsimple domains, and so on. For example, one of the domains on which the relation employee is defined might be salary history. An element of the salary history domain is a binary relation defined on the domain date and the domain salary. The salary history domain is the set of all such binary relations. At any instant of time there are as many instances of the salary history relation in the data bank as there are employees. In contrast, there is only one instance of the employee relation.

지금까지 우리는 단순 도메인(원소가 원자적(분해 불가능한) 값인 도메인)에 정의된 관계의 예시들을 논의했습니다. 관계형 프레임워크 내에서 비원자적 값도 논의될 수 있습니다. 따라서 일부 도메인은 관계를 원소로 가질 수 있습니다. 이러한 관계들은 다시 비단순 도메인에 정의될 수 있으며, 이는 계속 이어질 수 있습니다. 예를 들어, employee 관계가 정의된 도메인 중 하나가 급여 이력일 수 있습니다. 급여 이력 도메인의 원소는 날짜 도메인과 급여 도메인에 정의된 이진 관계입니다. 급여 이력 도메인은 이러한 모든 이진 관계의 집합입니다. 어느 시점에서든 데이터 뱅크에는 직원 수만큼의 급여 이력 관계 인스턴스가 존재합니다. 반면에 employee 관계의 인스턴스는 단 하나만 존재합니다.

<span id="section-1-3-15"/>

>
The terms attribute and repeating group in present data base terminology are roughly analogous to simple domain and nonsimple domain, respectively. Much of the confusion in present terminology is due to failure to distinguish between type and instance (as in “record”) and between components of a user model of the data on the one hand and their machine representation counterparts on the other hand (again, we cite “record” as an example).

현재 데이터베이스 용어에서 속성(attribute)과 반복 그룹(repeating group)은 각각 단순 도메인과 비단순 도메인에 대략적으로 대응됩니다. 현재 용어의 많은 혼란은 유형과 인스턴스를 구분하지 못하는 것("레코드"의 경우처럼)과, 데이터에 대한 사용자 모델의 구성 요소들과 이에 대응되는 기계적 표현을 구분하지 못하는 것(다시 한 번 "레코드"를 예로 들 수 있음)에서 비롯됩니다.

#### 1.4. NORMAL FORM

1.4. 정규형

<span id="section-1-4-1"/>

>
A relation whose domains are all simple can be represented in storage by a two-dimensional column-homogeneous array of the kind discussed above. Some more complicated data structure is necessary for a relation with one or more nonsimple domains. For this reason (and others to be cited below) the possibility of eliminating nonsimple domains appears worth investigating. <sup>4</sup> There is, in fact, a very simple elimination procedure, which we shall call normalization.
>
<sup>4</sup> M. E. Sanko of IBM, San Jose, independently recognized the desirability of eliminating nonsimple domains.

모든 도메인이 단순한 관계들은 앞서 논의한 것과 같은 열-동질적인 2차원 배열로 저장소에 표현될 수 있습니다. 그러나 하나 이상의 비단순 도메인을 가진 관계의 경우에는 더 복잡한 데이터 구조가 필요합니다. 이러한 이유로(그리고 이후에 설명할 다른 이유들로 인해) 비단순 도메인을 제거할 수 있는 가능성을 조사해볼 가치가 있습니다.<sup>4</sup> 실제로 정규화라고 부를 매우 간단한 제거 절차가 있습니다.

<sup>4</sup> IBM 산호세의 M. E. Sanko도 독립적으로 비단순 도메인을 제거하는 것이 바람직하다는 점을 인식한 바 있다.

<span id="section-1-4-2"/>

>
Consider, for example, the collection of relations exhibited in Figure 3 (a). Job history and children are nonsimple domains of the relation employee. Salary history is a nonsimple domain of the relation job history. The tree in Figure 3 (a) shows just these interrelationships of the nonsimple domains.

예를 들어, 그림 3 (a)에 제시된 관계들의 집합을 살펴봅시다. 직무 이력(job history)과 자녀(children)는 employee 관계의 비단순 도메인입니다. 급여 이력(salary history)은 직무 이력 관계의 비단순 도메인입니다. 그림 3 (a)의 트리는 이러한 비단순 도메인들의 상호 관계만을 보여줍니다.

>
> ```
>               employee
>    ┌─────────────┴───────────┐
> jobhistory               children
>    │
> salaryhistory
> ```
>
> employee (_man#_, name, birthdate, jobhistory, children)  
> jobhistory (_jobdate_, title, salaryhistory)  
> salaryhistory (_salarydate_, salary)  
> children (_childname_, birthyear)  
>
> FIG. 3(a). Unnormalized set
>
>
> employee' (_man#_, name, birthdate)  
> jobhistory' (_man#_, _jobdate_, title)  
> salaryhistory' (_man#_, _jobdate_, _salarydate_, salary)  
> children' (_man#_, _childname_, birthyear)  
>
> FIG. 3(b). Normalized set

<span id="section-1-4-3"/>

>
Normalization proceeds as follows. Starting with the relation at the top of the tree, take its primary key and expand each of the immediately subordinate relations by inserting this primary key domain or domain combination. The primary key of each expanded relation consists of the primary key before expansion augmented by the primary key copied down from the parent relation. Now, strike out from the parent relation all nonsimple domains, remove the top node of the tree, and repeat the same sequence of operations on each remaining subtree.

정규화는 다음과 같이 진행됩니다. 트리의 최상위 관계에서 시작하여, 그것의 기본 키를 가져와서 직접 종속된 각 관계들을 이 기본 키 도메인 또는 도메인 조합을 삽입하여 확장합니다. 확장된 각 관계의 기본 키는 확장 전의 기본 키에 상위 관계에서 복사해 온 기본 키를 추가한 것으로 구성됩니다. 이제 상위 관계에서 모든 비단순 도메인을 제거하고, 트리의 최상위 노드를 제거한 다음, 남아있는 각 서브트리에 대해 동일한 연산 순서를 반복합니다.

<span id="section-1-4-4"/>

>
The result of normalizing the collection of relations in Figure 3 (a) is the collection in Figure 3 (b). The primary key of each relation is italicized to show how such keys are expanded by the normalization.

그림 3 (a)의 관계 집합을 정규화한 결과가 그림 3 (b)의 집합입니다. 각 관계의 기본 키는 정규화에 의해 키가 어떻게 확장되는지 보여주기 위해 이탤릭체로 표시되어 있습니다.

<span id="section-1-4-5"/>

>
If normalization as described above is to be applicable, the unnormalized collection of relations must satisfy the following conditions :
>
- (1) The graph of interrelationships of the nonsimple domains is a collection of trees.
- (2) No primary key has a component domain which is nonsimple.

위에서 설명한 정규화가 적용되기 위해서는, 비정규화된 관계들의 집합이 다음 조건들을 만족해야 합니다:

- (1) 비단순 도메인들의 상호 관계를 나타내는 그래프가 트리들의 집합이어야 합니다.
- (2) 어떤 기본 키도 비단순 도메인을 구성 요소로 가지면 안 됩니다.

<span id="section-1-4-6"/>

>
The writer knows of no application which would require any relaxation of these conditions. Further operations of a normalizing kind are possible. These are not discussed in this paper.

본 저자는 이러한 조건들의 완화가 필요한 어떤 응용 사례도 알지 못합니다. 정규화와 관련된 추가적인 연산들이 가능합니다. 이것들은 이 논문에서는 다루지 않습니다.

<span id="section-1-4-7"/>

>
The simplicity of the array representation which becomes feasible when all relations are cast in normal form is not only an advantage for storage purposes but also for communication of bulk data between systems which use widely different representations of the data. The communication form would be a suitably compressed version of the array representation and would have the following advantages:
- (1) It would be devoid of pointers (address-valued or displacement-valued ).
- (2) It would avoid all dependence on hash addressing schemes.
- (3) It would contain no indices or ordering lists.

모든 관계가 정규형으로 변환되었을 때 가능해지는 배열 표현의 단순성은 저장 목적에서뿐만 아니라, 매우 다른 데이터 표현 방식을 사용하는 시스템들 간의 대량 데이터 통신에서도 장점이 됩니다. 통신 형식은 배열 표현을 적절히 압축한 버전이 될 것이며 다음과 같은 장점들을 가질 것입니다.

(1) 포인터(주소값 또는 변위값)가 없을 것입니다.
(2) 해시 주소 지정 방식에 대한 모든 의존성을 피할 수 있을 것입니다.
(3) 인덱스나 정렬 리스트를 포함하지 않을 것입니다.

<span id="section-1-4-8"/>

>
If the user’s relational model is set up in normal form, names of items of data in the data bank can take a simpler form than would otherwise be the case. A general name would take a form such as
>
$$ R(g).r.d $$
>
where R is a relational name; g is a generation identifier (optional); r is a role name (optional); d is a domain name. Since g is needed only when several generations of a given relation exist, or are anticipated to exist, and r is needed only when the relation R has two or more domains named
d, the simple form R.d will often be adequate.

사용자의 관계형 모델이 정규형으로 설정되면, 데이터 뱅크의 데이터 항목들의 이름이 그렇지 않은 경우보다 더 단순한 형태를 가질 수 있습니다. 일반적인 이름은 다음과 같은 형태를 가질 것입니다.

$$ R(g).r.d $$

여기서 R은 관계 이름이고, g는 세대 식별자(선택사항)이며, r은 역할 이름(선택사항)이고, d는 도메인 이름입니다. g는 주어진 관계의 여러 세대가 존재하거나 존재할 것으로 예상될 때만 필요하고, r은 관계 R이 이름이 d인 도메인을 두 개 이상 가질 때만 필요하므로, 단순한 형태인 $$R.d$$가 종종 충분할 것입니다.

#### 1.5. SOME LINGUISTIC ASPECTS

1.5. 언어적 측면

<span id="section-1-5-1"/>

>
The adoption of a relational model of data, as described above, permits the development of a universal data sub-language based on an applied predicate calculus. A first-order predicate calculus suffices if the collection of relations is in normal form. Such a language would provide a yardstick of linguistic power for all other proposed data languages, and would itself be a strong candidate for embedding (with appropriate syntactic modification) in a variety of host Ianguages (programming, command- or problem-oriented). While it is not the purpose of this paper to describe such a language in detail, its salient features would be as follows.

위에서 설명한 관계형 데이터 모델의 채택은 술어 논리학을 응용한 보편적 데이터 하위 언어의 개발을 가능하게 합니다. 관계들의 집합이 정규형이라면 일차 술어 논리학으로 충분합니다. 이러한 언어는 다른 모든 제안된 데이터 언어들의 언어적 능력을 측정하는 기준이 될 것이며, 그 자체로 다양한 호스트 언어들(프로그래밍, 명령어 또는 문제 지향적)에 (적절한 구문 수정과 함께) 내장되기 위한 유력한 후보가 될 것입니다. 이 논문의 목적이 그러한 언어를 상세히 설명하는 것은 아니지만, 그것의 두드러진 특징들은 다음과 같을 것입니다.

<span id="section-1-5-2"/>

>
Let us denote the data sublanguage by R and the host language by H. R permits the declaration of relations and their domains. Each declaration of a relation identifies the primary key for that relation. Declared relations are added to the system catalog for use by any members of the user community who have appropriate authorization. H permits supporting declarations which indicate, perhaps less permanently, how these relations are represented in storage. R permits the specification for retrieval of any subset of data from the data bank. Action on such a retrieval request is subject to security constraints.

데이터 하위 언어를 R[^data-sublanguage]로, 호스트 언어를 H로 표기하겠습니다. R은 관계들과 그들의 도메인을 선언하는 것을 허용합니다. 각 관계의 선언은 해당 관계의 기본 키를 식별합니다. 선언된 관계들은 적절한 권한을 가진 사용자 커뮤니티의 모든 구성원들이 사용할 수 있도록 시스템 카탈로그에 추가됩니다. H는 이러한 관계들이 저장소에서 어떻게 표현되는지를 나타내는, 아마도 덜 영구적인, 지원 선언들을 허용합니다. R은 데이터 뱅크로부터 어떤 데이터의 부분집합이라도 검색하도록 명세하는 것을 허용합니다. 이러한 검색 요청에 대한 동작은 보안 제약조건들의 적용을 받습니다.

[^data-sublanguage]: 역주: 훗날 데이터 하위 언어를 구현한 사례가 바로 SQL이다. [SQL이 처음으로 구현된 IBM System R 프로젝트에 대한 글](https://en.wikipedia.org/wiki/IBM_System_R )도 함께 읽어볼 만하다.

<span id="section-1-5-3"/>

>
The universality of the data sublanguage lies in its descriptive ability (not its computing ability). In a large data bank each subset of the data has a very large number of possible (and sensible) descriptions, even when we assume (as we do) that there is only a finite set of function subroutines to which the system has access for use in qualifying data for retrieval. Thus, the class of qualification expressions which can be used in a set specification must have the descriptive power of the class of well-formed formulas of an applied predicate calculus. It is well known that to preserve this descriptive power it is unnecessary to express (in whatever syntax is chosen) every formula of the selected predicate calculus. For example, just those in prenex normal form are adequate [9].

데이터 하위 언어의 보편성은 그것의 (계산적 능력이 아니라) 기술(descriptive) 능력에 있습니다. 대규모 데이터 뱅크에서 데이터의 각 부분집합은 매우 많은 수의 가능한(그리고 의미 있는) 기술 방식들을 가지고 있습니다. 이는 검색을 위한 데이터 조건에 사용할 수 있도록 시스템이 접근 가능한 함수 서브루틴들의 집합이 유한하다고 가정하더라도(우리가 그렇게 하는 것처럼) 그렇습니다. 따라서, 집합 명세에 사용될 수 있는 조건 표현식들의 부류는 응용 술어 논리학의 잘 구성된 공식들의 부류가 가진 기술적 능력을 가져야 합니다. 이러한 기술적 능력을 보존하기 위해서는 선택된 술어 논리학의 모든 공식을 (어떤 구문이 선택되든) 표현할 필요가 없다는 것은 잘 알려져 있습니다. 예를 들어, 전치 정규형(prenex normal form)에 있는 것들만으로도 충분합니다[9].

<span id="section-1-5-4"/>

>
Arithmetic functions may be needed in the qualification or other parts of retrieval statements. Such functions can be defined in H and invoked in R.

산술 함수들은 검색문의 조건 부분이나 다른 부분들에서 필요할 수 있습니다. 이러한 함수들은 H에서 정의되고 R에서 호출될 수 있습니다.

<span id="section-1-5-5"/>

>
A set so specified may be fetched for query purposes only, or it may be held for possible changes. Insertions take the form of adding new elements to declared relations without regard to any ordering that may be present in their machine representation. Deletions which are effective for the community (as opposed to the individual user or sub-communities) take the form of removing elements from declared relations. Some deletions and updates may be triggered by others, if deletion and update dependencies between specified relations are declared in R.

이렇게 명세된 집합은 질의 목적으로만 가져올 수도 있고, 또는 가능한 변경을 위해 보유될 수도 있습니다. 삽입은 기계 표현에 존재할 수 있는 어떤 순서와도 무관하게 선언된 관계들에 새로운 원소들을 추가하는 형태를 취합니다. (개별 사용자나 하위 커뮤니티가 아닌) 전체 커뮤니티에 대해 유효한 삭제는 선언된 관계들로부터 원소들을 제거하는 형태를 취합니다. 일부 삭제와 갱신은 다른 것들에 의해 트리거될 수 있는데, 이는 지정된 관계들 간의 삭제 및 갱신 의존성이 R에서 선언된 경우입니다.

<span id="section-1-5-6"/>

>
One important effect that the view adopted toward data has on the language used to retrieve it is in the naming of data elements and sets. Some aspects of this have been discussed in the previous section. With the usual network view, users will often be burdened with coining and using more relation names than are absolutely necessary, since names are associated with paths (or path types) rather than with relations.

데이터를 바라보는 관점이 데이터를 검색하는 데 사용되는 언어에 미치는 한 가지 중요한 영향은 데이터 원소들과 집합들의 명명에 있습니다. 이러한 측면들의 일부는 이전 절에서 논의되었습니다. 통상적인 네트워크 관점에서는, 이름들이 관계가 아닌 경로들(또는 경로 유형들)과 연관되어 있기 때문에, 사용자들은 종종 절대적으로 필요한 것보다 더 많은 관계 이름들을 만들고 사용해야 하는 부담을 지게 될 것입니다.

<span id="section-1-5-7"/>

>
Once a user is aware that a certain relation is stored, he will expect to be able to exploit<sup>5</sup> it using any combination of its arguments as “knowns” and the remaining arguments as “unknowns,” because the information (like Everest) is there. This is a system feature (missing from many current informat.ion systems) which we shall call (logically) symmetric expZoitation of relations. Naturally, symmetry in performance is not to be expected.
>
<sup>5</sup> Exploiting a relation includes query, update, and delete.

일단 사용자가 특정 관계가 저장되어 있다는 것을 알게 되면, 그는 그 관계의 인자들의 어떤 조합이든 "알려진 것들"로, 그리고 나머지 인자들을 "알려지지 않은 것들"로 사용하여 그것을 활용<sup>5</sup>할 수 있기를 기대할 것입니다. 왜냐하면 그 정보는 (에베레스트 산처럼) 거기에 있기 때문입니다. 이것은 (많은 현재의 정보 시스템들에서 누락된) 시스템 특징으로, 우리는 이것을 관계들의 (논리적으로) 대칭적 활용이라고 부를 것입니다. 당연히, 성능에서의 대칭성은 기대할 수 없습니다.

<sup>5</sup> 관계의 활용에는 질의, 갱신, 삭제가 포함됩니다.

<span id="section-1-5-8"/>

>
To support symmetric exploitation of a single binary relation, two directed paths are needed. For a relation of degree n, the number of paths to be named and controlled is n factorial.

단일 이항 관계의 대칭적 활용을 지원하기 위해서는 두 개의 방향성 있는 경로들이 필요합니다. 차수가 n인 관계의 경우, 이름을 지정하고 제어해야 하는 경로들의 수는 n 팩토리얼입니다.

>
**역주**
>
네트워크 모델에서 이항 관계의 대칭적 활용은 다음과 같이 예시를 들 수 있다.
>
> - 직원 → 부서
> - 부서 → 직원
>
> 그런데 이항 관계는 2! 이므로 2개 밖에 안되지만, 3항 관계인 경우에는 3!로 수가 훨씬 늘어나는 문제점이 있다.
>
> - 직원 → 부서 → 프로젝트
> - 직원 → 프로젝트 → 부서
> - 부서 → 직원 → 프로젝트
> - 부서 → 프로젝트 → 직원
> - 프로젝트 → 직원 → 부서
> - 프로젝트 → 부서 → 직원
>
> 하지만 모든 경로를 미리 만들어둘 수는 없으므로(10항 관계라면 `10! = 3,628,800`), 몇 가지 경로만 선택적으로 만들어두게 되며, 상황에 따라 필요한 것보다 더 많은 새로운 경로를 시스템에 추가하는 방향으로 발전되어 간다.  
> 그러나 관계형 모델을 사용하는 현대적인 SQL을 사용하면 이런 문제가 매우 단순해진다. `FROM`과 `JOIN`으로 `부서`, `직원`, `프로젝트` 테이블을 연결해주면 되기 때문이다.
{:style="background-color: #ecf1e8;"}


<span id="section-1-5-9"/>

>
Again, if a relational view is adopted in which every n-ary relation ($$ n > 2 $$) has to be expressed by the user as a nested expression involving only binary relations (see Feldman’s LEAP System [10], for example) then $$ 2n - 1 $$ names have to be coined instead of only $$ n + 1 $$ with direct n-ary notation as described in Section 1.2. For example, the 4-ary relation supply of Figure 1, which entails 5 names in n-ary notation, would be represented in the form
>
$$ P (supplier, Q (part, R (project, quantity))) $$
>
in nested binary notation and, thus, employ 7 names.

다시 말해서, 모든 n항 관계($$ n > 2 $$)를 사용자가 오직 이항 관계들만을 포함하는 중첩된 표현으로 나타내야 하는 관계적 관점이 채택된다면(예를 들어, Feldman의 LEAP 시스템 [10] 참조), 1.2절에서 설명된 것처럼 직접적인 n항 표기법으로는 단지 $$ n+1 $$ 개만 필요한 것에 비해 $$ 2n−1 $$ 개의 이름들을 만들어야 합니다. 예를 들어, 그림 1의 4항 관계인 supply는 n항 표기법에서는 5개의 이름들이 수반되지만, 중첩된 이항 표기법에서는 다음과 같은 형태로 표현되며...

$$ P (supplier, Q (part, R(project, quantity))) $$

따라서 7개의 이름들을 사용하게 됩니다.

>
A further disadvantage of this kind of expression is its asymmetry. Although this asymmetry does not prohibit symmetric exploitation, it certainly makes some bases of interrogation very awkward for the user to express (consider, for example, a query for those parts and quantities related to certain given projects via Q and R).

이러한 종류의 표현의 또 다른 단점은 그것의 비대칭성입니다. 이 비대칭성이 대칭적 활용을 금지하지는 않지만, 확실히 일부 질의 기반들을 사용자가 표현하기에 매우 불편하게 만듭니다 (예를 들어, Q와 R을 통해 주어진 특정 프로젝트들과 관련된 부품들과 수량들을 찾는 질의를 상상해보세요).


#### 1.6. EXPRESSIBLE, NAMED, AND STORED RELATIONS

1.6. 표현 가능한, 명명된, 그리고 저장된 관계

<span id="section-1-6-1"/>

>
Associated with a data bank are two collections of relations: the named set and the expressible set. The named set is the collection of all those relations that the community of users can identify by means of a simple name (or identifier). A relation R acquires membership in the named set when a suitably authorized user declares R; it loses membership when a suitably authorized user cancels the declaration of R.

데이터 뱅크와 관련하여 두 가지 관계 집합이 있습니다. 명명된 집합과 표현 가능한 집합입니다. 명명된 집합은 사용자 커뮤니티가 간단한 이름(또는 식별자)으로 식별할 수 있는 모든 관계들의 집합입니다. 관계 R은 적절한 권한을 가진 사용자가 R을 선언할 때 명명된 집합의 구성원이 되고, 적절한 권한을 가진 사용자가 R의 선언을 취소할 때 구성원 자격을 잃게 됩니다.

<span id="section-1-6-2"/>

>
The expressible set is the total collection of relations that can be designated by expressions in the data language. Such expressions are constructed from simple names of relations in the named set; names of generations, roles and domains; logical connectives; the quantifiers of the predicate calculations;<sup>6</sup> and certain constant relation symbols such as `=`, `>`.
The named set is a subset of the expressible set-usually a very small subset.
>
<sup>6</sup> Because each relation in a practical data bank is a finite set at every instant of time, the existential and universal quantifiers can be expressed in terms of a function that counts the number of elements in any finite set.

표현 가능한 집합은 데이터 언어의 표현식들로 지정될 수 있는 모든 관계들의 집합입니다. 이러한 표현식들은 명명된 집합에 있는 관계들의 단순한 이름들, 세대들의 이름들, 역할들과 도메인들의 이름들, 논리 연결사들, 술어 계산의 한정자들<sup>6</sup>, 그리고 `=`, `>` 같은 특정 상수 관계 기호들로부터 구성됩니다. 명명된 집합은 표현 가능한 집합의 부분집합입니다 - 보통은 매우 작은 부분집합입니다.

<sup>6</sup> 실용적인 데이터 뱅크에서 각 관계는 모든 시점에서 유한 집합이기 때문에, 존재 한정자와 전칭 한정자는 임의의 유한 집합의 원소 개수를 세는 함수로 표현될 수 있습니다.

<span id="section-1-6-3"/>

>
Since some relations in the named set may be time-independent combinations of others in that set, it is useful to consider associating with the named set a collection of statements that define these time-independent constraints. We shall postpone further discussion of this until we have introduced several operations on relations (see Section 2).

명명된 집합의 일부 관계들이 해당 집합의 다른 관계들의 시간 독립적인(시간과 무관한) 조합일 수 있기 때문에, 명명된 집합과 이러한 시간 독립적인 제약조건들을 정의하는 진술문들의 집합을 연관시키는 것이 유용합니다.[^constraints] 이에 대한 추가 논의는 관계들에 대한 여러 연산들을 소개한 후로 미루도록 하겠습니다(2장 참조).

[^constraints]: 역주: 현대적인 RDBMS에서는 Foreign Key(참조 무결성), Unique Key(고유성), Not Null(필수 값) 등의 제약 조건으로 구현된다. 이들은 시간과 관계없이 데이터의 일관성을 보장하는 역할을 한다.

<span id="section-1-6-4"/>

>
One of the major problems confronting the designer of a data system which is to support a relational model for its users is that of determining the class of stored representations to be supported. Ideally, the variety of permitted data representations should be just adequate to cover the spectrum of performance requirements of the total collection of installations. Too great a variety leads to unnecessary overhead in storage and continual reinterpretation of descriptions for the structures currently in effect.

사용자들을 위한 관계형 모델을 지원하는 데이터 시스템 설계자가 직면하는 주요 문제 중 하나는 지원해야 할 저장 표현들의 유형을 결정하는 것입니다. 이상적으로는, 허용되는 데이터 표현들의 다양성이 전체 설치 환경들의 성능 요구사항 범위를 충족시키기에 딱 적절해야 합니다. 너무 큰 다양성은 저장소의 불필요한 오버헤드와 현재 적용 중인 구조들에 대한 설명을 지속적으로 재해석해야 하는 결과를 초래합니다.

<span id="section-1-6-5"/>

>
For any selected class of stored representations the data system must provide a means of translating user requests expressed in the data language of the relational model into corresponding-and efficient-actions on the current stored representation. For a high level data language this presents a challenging design problem. Nevertheless, it is a problem which must be solved-as more users obtain concurrent access to a large data bank, responsibility for providing efficient response and throughput shifts from the individual user to the data system.

선택된 저장 표현들의 유형에 대해, 데이터 시스템은 관계형 모델의 데이터 언어로 표현된 사용자 요청들을 현재의 저장 표현에 대한 대응되는 - 그리고 효율적인 - 동작들로 변환하는 수단을 제공해야 합니다. 고수준 데이터 언어의 경우 이는 도전적인 설계 문제가 됩니다. 그럼에도 불구하고, 이는 반드시 해결되어야 할 문제입니다 - 더 많은 사용자들이 대규모 데이터 뱅크에 동시 접근함에 따라, 효율적인 응답과 처리량을 제공하는 책임이 개별 사용자로부터 데이터 시스템으로 이전되기 때문입니다.

### 2. Redundancy and Consistency

2\. 중복성과 일관성

#### 2.1. OPERATIONS ON RELATIONS

2.1. 관계들에 대한 연산

<span id="section-2-1-1"/>

>
Since relations are sets, all of the usual set operations are applicable to them. Nevertheless, the result may not be a relation; for example, the union of a binary relation and a ternary relation is not a relation.

관계들은 집합이므로, 모든 일반적인 집합 연산들을 관계들에 적용할 수 있습니다. 그러나 그 결과가 반드시 관계가 되는 것은 아닙니다. 예를 들어, 이항 관계와 삼항 관계의 합집합은 관계가 아닙니다.

<span id="section-2-1-2"/>

>
The operations discussed below are specifically for relations. These operations are introduced because of their key role in deriving relations from other relations. Their principal application is in noninferential information systems-systems which do not provide logical inference services-although their applicability is not necessarily destroyed when such services are added.

아래에서 논의되는 연산들은 특별히 관계들을 위한 것입니다. 이러한 연산들은 다른 관계들로부터 관계를 도출하는 데 있어 핵심적인 역할을 하기 때문에 도입되었습니다. 이 연산들의 주된 적용은 논리적 추론 서비스를 제공하지 않는 비추론적 정보 시스템들에서 이루어지지만, 그러한 서비스들이 추가된다고 해서 반드시 적용 가능성이 사라지는 것은 아닙니다.

<span id="section-2-1-3"/>

>
Most users would not be directly concerned with these operations. Information systems designers and people concerned with data bank control should, however, be thoroughly familiar with them.

대부분의 사용자들은 이러한 연산들과 직접적으로 관련될 일이 없을 것입니다. 하지만 정보 시스템 설계자들과 데이터 뱅크 제어를 담당하는 사람들은 이들을 철저히 숙지해야 합니다.

##### 2.1.1. Permutation.

2.1.1. 순열

<span id="section-2-1-1-1"/>

>
A binary relation has an array representation with two columns. Interchanging these columns yields the converse relation. More generally, if a permutation is applied to the columns of an n-ary relation, the resulting relation is said to be a permutation of the given relation. There are, for example, `4! = 24` permutations of the relation supply in Figure 1, if we include the identity permutation which leaves the ordering of columns unchanged.

이항 관계는 두 개의 열(column)을 가진 배열 표현을 갖습니다. 이 열들을 서로 교환하면 역관계가 됩니다. 더 일반적으로, n항 관계의 열들에 순열을 적용하면, 그 결과로 나오는 관계를 주어진 관계의 순열이라고 합니다. 예를 들어, 그림 1의 supply 관계에는 열의 순서를 변경하지 않는 항등 순열을 포함하여 `4! = 24`개의 순열이 있습니다.

<span id="section-2-1-1-2"/>

>
Since the user’s relational model consists of a collection of relationships (domain-unordered relations), permutation is not relevant to such a model considered in isolation. It is, however, relevant to the consideration of stored representations of the model. In a system which provides symmetric exploitation of relations, the set of queries answerable by a stored relation is identical to the set answerable by any permutation of that relation. Although it is logically unnecessary to store both a relation and some permutation of it, performance considerations could make it advisable.

사용자의 관계형 모델은 관계성들(도메인-비순서화된 관계들)의 집합으로 구성되어 있으므로, 순열은 독립적으로 고려된 그러한 모델과는 관련이 없습니다. 하지만 모델의 저장 표현들을 고려할 때는 관련이 있습니다. 관계들의 대칭적 활용을 제공하는 시스템에서는, 저장된 관계로 답변 가능한 질의들의 집합이 그 관계의 임의의 순열로 답변 가능한 집합과 동일합니다. 관계와 그것의 어떤 순열을 모두 저장하는 것이 논리적으로는 불필요하지만, 성능 고려사항으로 인해 이를 권장할 수 있습니다.[^performance-considerations]

[^performance-considerations]: 역주: 현대적인 RDMBS에서의 인덱스를 설명하는 부분이라 할 수 있다.

##### 2.1.2. Projection.

2.1.2. 투영

<span id="section-2-1-2-1"/>

>
Suppose now we select certain columns of a relation (striking out the others) and then remove from the resulting array any duplication in the rows. The final array represents a relation which is said to be a projection of the given relation.

관계의 특정 열들을 선택하고(다른 열들은 제거하고) 그 결과로 나온 배열에서 행들의 중복을 제거한다고 가정해봅시다. 최종 배열은 주어진 관계의 투영이라고 하는 관계를 나타냅니다.

<span id="section-2-1-2-2"/>

>
A selection operator π is used to obtain any desired permutation, projection, or combination of the two operations. Thus, if L is a list of k indices <sup>7</sup> $$ L = i_1, i_2, ..., i_k $$ and R is an n-ary relation (n ≥ k), then $$ π_L $$ (R) is the k-ary relation whose jth column is column $$ i_i $$ of $$ R(j = 1, 2, ..., k) $$ except that duplication in resulting rows is removed. Consider the relation supply of Figure 1. A permuted projection of this relation is exhibited in Figure 4. Note that, in this particular case, the projection has fewer n-tuples than the relation from which it is derived.
>
<sup>7</sup> When dealing with relationships, we use domain names (role-qualified whenever necessary) instead of domain positions.

원하는 순열, 투영, 또는 이 두 연산의 조합을 얻기 위해 선택 연산자 π가 사용됩니다. 따라서, L이 k개의 인덱스들로 이루어진 리스트<sup>7</sup> $$ L = i_1, i_2, ..., i_k $$ 이고 R이 n항 관계($$ n ≥ k $$)일 때, $$ π_L $$ (R)은 그 j번째 열이 R의 $$i_j$$열인$$(j = 1, 2, ..., k)$$ k항 관계입니다. 단, 결과로 나오는 행들의 중복은 제거됩니다. 그림 1의 supply 관계를 살펴봅시다. 이 관계의 순열 투영이 그림 4에 나와 있습니다. 이 특정한 경우에서, 투영은 원래의 관계보다 더 적은 수의 n-튜플을 가지고 있다는 점에 주목하십시오.

<sup>7</sup> 관계성들을 다룰 때는 도메인 위치 대신 도메인 이름들(필요할 때마다 역할이 한정된)을 사용합니다.

##### 2.1.3. Join.

2.1.3. 조인

<span id="section-2-1-3-1"/>

>
Suppose we are given two binary relations, which have some domain in common. Under what circumstances can we combine these relations to form a ternary relation which preserves all of the information in the given relations?

공통된 도메인을 가진 두 개의 이진 관계가 주어졌다고 가정해봅시다. 어떤 상황에서 우리는 주어진 관계들의 모든 정보를 보존하는 삼진 관계를 형성하기 위해 이 관계들을 결합할 수 있을까요?[^join]

[^join]: 역주: SQL에서의 JOIN을 떠올리면 이해하기 쉽다.

<span id="section-2-1-3-2"/>

>
The example in Figure 5 shows two relations R, S, which are joinable without loss of information, while Figure 6 shows a join of R with S. A binary relation R is joinable with a binary relation S if there exists a ternary relation U such that $$ π_{12}(U) = R $$ and $$ π_{23}(U) = S $$. Any such ternary relation is called a join of R with S. If R, S are binary relations such that $$ π_2 (R) = π_1 (S) $$, then R is joinable with S.
One join that always exists in such a case is the natural join of R with S defined by
>
$$ R*S = \{ (a, b, c):R(a, b) \land S(b, c) \} $$
>
where $$ R(a, b) $$ has the value true if $$(a, b)$$ is a member of R
and similarly for $$S(b, c)$$. It is immediate that
>
$$ π_{12}(R*S) = R $$
>
and
>
$$ π_{23}(R*S) = S. $$

그림 5는 정보의 손실 없이 조인 가능한 두 관계 R, S 를 보여주고, 그림 6은 R 과 S의 조인을 보여줍니다.
$$ π_{12}(U) = R $$ 이고 $$ π_{23}(U) = S $$인 삼진 관계 U가 존재할 때 이진 관계 R 은 이진 관계 S와 조인 가능합니다.
이러한 삼진 관계를 R과 S의 조인이라 합니다.
R, S 가 이진 관계이고 $$ π_2 (R) = π_1 (S) $$ 일 때, R 은 S와 조인 가능합니다.
이러한 경우에 항상 존재하는 하나의 조인은 다음과 같이 정의되는 R과 S의 자연 조인입니다.

$$ R*S = \{ (a, b, c):R(a, b) \land S(b, c) \} $$

여기에서 $$ R(a, b) $$는 $$(a, b)$$가 R의 멤버일 때 참 값을 가지며, $$S(b, c)$$에 대해서도 마찬가지입니다. 따라서 다음의 둘이 성립함을 알 수 있습니다.

$$ π_{12}(R*S) = R $$

그리고

$$ π_{23}(R*S) = S. $$

>
**역주**: 어려운 문장 같지만 현대적인 SQL에 대한 지식이 있다면 이해하기 쉽다.
{:style="background-color: #ecf1e8;"}
> $$ π_{12}(U) = R $$ 이고 $$ π_{23}(U) = S $$인 삼진 관계 U가 존재할 때 이진 관계 R 은 이진 관계 S와 조인 가능합니다.
이러한 삼진 관계를 R과 S의 조인이라 합니다.
{:style="background-color: #dddddd;"}
>
> - $$ π_{12}(U) $$는 U의 1번 컬럼과 2번 컬럼을 중복 없이 선택하는 것을 의미한다.
> - $$ π_{23}(U) $$은 U의 2번 컬럼과 3번 컬럼을 중복 없이 선택하는 것을 의미한다.
> - $$ π_{12}(U) $$ 와 $$ π_{23}(U) $$는 둘 다 U의 2번 컬럼을 갖고 있으므로 서로 조인이 가능하다는 의미이다.
>
> 수식이 있어 어려워 보이지만 공통 컬럼이 있는 두 개의 이진관계가 있다면 서로 조인이 가능하다는 간단한(그러나 중요한) 의미이다.
{:style="background-color: #ecf1e8;"}

<span/>

>
**역주**: 여기에서는 JOIN 을 정의한다.
{:style="background-color: #ecf1e8;"}
> $$ R*S = \{ (a, b, c):R(a, b) \land S(b, c) \} $$
{:style="background-color: #dddddd;"}
> - $$ R(a,b) $$: R이라는 관계에서 a, b 라는 컬럼 2개가 있고,
> - $$ S(b,c) $$: S라는 관계에서 b, c 라는 컬럼 2개가 있다고 할 때,
> - $$\{ (a, b, c): R(a,b) \land S(b,c) \}$$: (a, b, c) 3개의 컬럼으로 도출되는 R(a,b)와 S(b,c)의 논리곱을...
> - $$ R * S $$: R 과 S의 JOIN 이라 정의한다.
>
{:style="background-color: #ecf1e8;"}

<span/>

>
**역주**: 여기에서는 JOIN 을 역으로 풀어 원래의 관계로 돌아갈 수 있음을 설명한다.
{:style="background-color: #ecf1e8;"}
> 다음의 둘이 성립함을 알 수 있습니다. $$ π_{12}(R*S) = R $$ 그리고 $$ π_{23}(R*S) = S. $$
{:style="background-color: #dddddd;"}
> - $$ R $$ = U의 1번 컬럼과 2번 컬럼을 선택한 것. (a, b)
> - $$ S $$ = U의 2번 컬럼과 3번 컬럼을 선택한 것. (b, c)
> - $$ R * S $$ = R과 S의 JOIN. (a, b, c)
> - $$ π_{12}(R*S) = R $$: R과 S의 JOIN 에서 1번 컬럼과 2번 컬럼을 중복 없이 선택하면 R이 된다. (a, b)
> - $$ π_{23}(R*S) = S $$: R과 S의 JOIN 에서 2번 컬럼과 3번 컬럼을 중복 없이 선택하면 S가 된다. (b, c)
>
{:style="background-color: #ecf1e8;"}

<span id="section-2-1-3-3"/>

>
Note that the join shown in Figure 6 is the natural join of R with S from Figure 5. Another join is shown in Figure 7.

그림 6에 나타난 조인은 그림 5의 R과 S의 자연 조인임을 주목하십시오. 또 다른 조인이 그림 7에 나와 있습니다.

>
$$
\begin{array}{ccc}
\Pi_{31}(supply) & (project & supplier) \\
                 &     5    &    1      \\
                 &     5    &    2      \\
                 &     1    &    4      \\
                 &     7    &    2      \\
\end{array}
$$
>
> FIG. 4. A permuted projection of the relation in Figure 1

그림 4. 그림 1의 관계의 순열 투영

>
$$
\begin{array}{ccc}
R \ (supplier & part) & S \ (part & project) \\
        1     &   1   &        1  &    1     \\
        2     &   1   &        1  &    2     \\
        2     &   2   &        2  &    1     \\
\end{array}
$$
>
> FIG. 5. Two joinable relations

그림 5. 조인 가능한 두 관계

>
$$
\begin{array}{ccc}
R*S & (supplier & part & project) \\
    &     1     &   1  &    1     \\
    &     1     &   1  &    2     \\
    &     2     &   1  &    1     \\
    &     2     &   1  &    2     \\
    &     2     &   2  &    1     \\
\end{array}
$$
>
> FIG. 6. The natural join of R with S (from Figure 5)

그림 6. R과 S의 자연 조인 (그림 5로부터)

>
$$
\begin{array}{ccc}
U & (supplier & part & project) \\
  &     1     &   1  &    2     \\
  &     2     &   1  &    1     \\
  &     2     &   2  &    1     \\
\end{array}
$$
>
> FIG. 7. Another join of R with S (from Figure 5)

그림 7. R과 S의 다른 조인 (그림 5로부터)

<span id="section-2-1-3-4"/>

>
Inspection of these relations reveals an element (element 1) of the domain part (the domain on which the join is to be made) with the property that it possesses more than one relative under R and also under S. It is this element which gives rise to the plurality of joins. Such an element in the joining domain is called a point of ambiguity with respect to the joining of R with S.

이 관계들을 살펴보면 조인 도메인(조인이 이루어지는 도메인)의 한 원소(원소 1)가 R과 S 모두에서 하나 이상의 관련 원소를 가지는 특성이 있음을 알 수 있습니다. 바로 이 원소로 인해 다수의 조인이 발생하게 됩니다. 조인 도메인에서 이러한 원소를 R과 S의 조인에 대한 모호점이라고 합니다.[^point-of-ambiguity]

[^point-of-ambiguity]: 역주: 현대적인 SQL에서는 이러한 모호한 JOIN 중복 결과를 방지하기 위해 `DISTINCT`나 `GROUP BY` 같은 것들을 사용한다.

<span id="section-2-1-3-5"/>

>
If either $$π_1 (R)$$ or S is a function <sup>8</sup> no point of ambiguity can occur in joining R with S. In such a case, the natural join of R with S is the only join of R with S. Note that the reiterated qualification “of R with S” is necessary, because S might be joinable with R (as well as R with S), and this join would be an entirely separate consideration. In Figure 5, none of the relations $$R, π_{21}(R), S, π_{21}(S)$$ is a function.
>
<sup>8</sup> A function is a binary relation, which is one-one or many-one, but not one-many.

$$π_1 (R)$$ 또는 S가 함수<sup>8</sup>일 경우, R과 S의 조인에서 모호점이 발생할 수 없습니다. 이런 경우라면 R과 S의 자연 조인이 R과 S의 유일한 조인이 됩니다. "R과 S의"라는 반복되는 한정어구가 필요한데, 이는 S가 R과 조인 가능할 수 있고(R이 S와 조인 가능한 것과 마찬가지로), 이 조인은 완전히 별개의 고려 사항이 되기 때문입니다. 그림 5에서, $$R, π_{21}(R), S, π_{21}(S)$$ 중 어느 것도 함수가 아닙니다.

<sup>8</sup> 함수는 일대일 또는 다대일이지만 일대다가 아닌 이진 관계이기 때문.

<span id="section-2-1-3-6"/>

>
Ambiguity in the joining of R with S can sometimes be resolved by means of other relations. Suppose we are given, or can derive from sources independent of R and S, a relation T on the domains project and supplier with the following properties :
>
> - (1) $$ π_1 (T) = π_2 (S) $$,
> - (2) $$ π_2 (T) = π_1 (R) $$,
> - (3) $$ T(j, s) \rightarrow \exists p (R (S, p) \land S(p, j)) $$,
> - (4) $$ R(s, p) \rightarrow \exists j (S (p, j) \land T(j, s)) $$,
> - (4) $$ S(p, j) \rightarrow \exists s (T (j, s) \land R(s, p)) $$,
>
then we may form a three-way join of R, S, T; that is, a ternary relation such that
>
$$ π_{12} (U) = R, π_{23} (U) = S, π_{31} (U) = T. $$

R과 S의 조인에서의 모호성은 때때로 다른 관계들을 통해 해결될 수 있습니다. R과 S와는 독립적인 출처로부터 주어지거나 도출할 수 있는, 프로젝트와 공급자 도메인에 대한 관계 T가 다음과 같은 속성을 가진다고 가정해봅시다:

- (1) $$ π_1 (T) = π_2 (S) $$,
- (2) $$ π_2 (T) = π_1 (R) $$,
- (3) $$ T(j, s) \rightarrow \exists p (R (S, p) \land S(p, j)) $$,
- (4) $$ R(s, p) \rightarrow \exists j (S (p, j) \land T(j, s)) $$,
- (4) $$ S(p, j) \rightarrow \exists s (T (j, s) \land R(s, p)) $$,

그러면 R, S, T의 삼중 조인을 형성할 수 있습니다. 즉, 다음을 만족하는 삼진 관계를 만들 수 있습니다:[^trs-join]

$$ π_{12} (U) = R, π_{23} (U) = S, π_{31} (U) = T. $$


[^trs-join]: 역주: T와 S가 공유하는 컬럼이 하나 있고, T와 R이 공유하는 컬럼이 하나 있으며, 이를 통해 R과 S를 조인할 수 있다는 의미이다.

<span id="section-2-1-3-7"/>

>
Such a join will be called a cyclic 3-join to distinguish it from a linear S-join which would be a quaternary relation V such that
>
$$ π_{12} (V) = R, π_{23} (V) = S, π_{34} (V) = T. $$

이러한 조인은 순환 3-조인이라고 부르며, 이는 다음과 같은 사원 관계 V로 표현되는 선형 3-조인과 구별하기 위함입니다:

$$ π_{12} (V) = R, π_{23} (V) = S, π_{34} (V) = T. $$

<span id="section-2-1-3-8"/>

>
While it is possible for more than one cyclic 3-join to exist (see Figures 8,9, for an example), the circumstances under which this can occur entail much more severe constraints
>
$$
\begin{array}{rrlrrlrrl}
R & (s  & p) & \ S & (p & j) & \ T & (j & s) \\
  &  1  & a  &     &  a & d  &     &  d & 1  \\
  &  2  & a  &     &  a & e  &     &  d & 2  \\
  &  1  & b  &     &  b & d  &     &  e & 2  \\
  &     &    &     &  b & e  &     &  e & 2  \\
\end{array}
$$
>
> FIG. 8. Binary relations with a plurality of cyclic 3-joins
>
$$
\begin{array}{rrclrrcl}
U & (s & p & j) & \ \ U' & (s & p & i) \\
  &  1 & a & d  &        &  1 & a & d  \\
  &  2 & a & e  &        &  2 & a & d  \\
  &  2 & b & d  &        &  2 & a & e  \\
  &  2 & b & e  &        &  2 & b & d  \\
  &    &   &    &        &  2 & b & e  \\
\end{array}
$$
>
> FIG. 9. Two cyclic 3-joins of the relations in Figure 8
>
than those for a plurality of 2-joins. To be specific, the relations R, S, T must possess points of ambiguity with respect to joining R with S (say point x), S with T (say y), and T with R (say a), and, furthermore, y must be a relative of x under S, z a relative of y under T, and x a relative of z under R. Note that in Figure 8 the points $$ x = a ; y = d ; z = 2 $$ have this property.

하나 이상의 순환 3-조인이 존재할 수 있지만(예시는 그림 8, 9 참조), 이는 여러 개의 2-조인이 존재하는 경우보다 훨씬 더 엄격한 제약 조건을 필요로 합니다.

$$
\begin{array}{rrlrrlrrl}
R & (s  & p) & \ S & (p & j) & \ T & (j & s) \\
  &  1  & a  &     &  a & d  &     &  d & 1  \\
  &  2  & a  &     &  a & e  &     &  d & 2  \\
  &  1  & b  &     &  b & d  &     &  e & 2  \\
  &     &    &     &  b & e  &     &  e & 2  \\
\end{array}
$$

그림 8. 여러 개의 순환 3-조인을 가진 이진 관계들

$$
\begin{array}{rrclrrcl}
U & (s & p & j) & \ \ U' & (s & p & i) \\
  &  1 & a & d  &        &  1 & a & d  \\
  &  2 & a & e  &        &  2 & a & d  \\
  &  2 & b & d  &        &  2 & a & e  \\
  &  2 & b & e  &        &  2 & b & d  \\
  &    &   &    &        &  2 & b & e  \\
\end{array}
$$

그림 9. 그림 8의 관계들의 두 가지 순환 3-조인

구체적으로, 관계 R, S, T는 R과 S의 조인(예를 들어 점 x), S와 T의 조인(예를 들어 y), 그리고 T와 R의 조인(예를 들어 z)에 대해 모호성이 있는 지점들을 가져야 하며, 더 나아가 y는 S 하에서 x의 관련 원소여야 하고, z는 T 하에서 y의 관련 원소여야 하며, x는 R 하에서 z의 관련 원소여야 합니다. 그림 8에서 점 $$ x = a ; y = d ; z = 2 $$가 이러한 속성을 가지고 있음을 확인할 수 있습니다.

<span id="section-2-1-3-9"/>

>
The natural linear 3-join of three binary relations R, S, T is given by
>
$$ R*S*T = { (a, b, c, d):R (a, b) \land S (b, c) \land T (c, d)} $$
>
where parentheses are not needed on the left-hand side because the natural 2-join (*) is associative. To obtain the cyclic counterpart, we introduce the operator y which produces a relation of degree n - 1 from a relation of degree n by tying its ends together. Thus, if R is an n-ary relation
(n ≥ 2), the tie of R is defined by the equation
>
$$ \gamma(R) = \{(a_1, a_2, ... , a_{n-1}):R(a_1, a_2, ..., a_{n-1}, a_n) \land a_1 = a_n \}. $$
>
We may now represent the natural cyclic S-join of R, S, T by the expression
>
$$ \gamma (R*S*T). $$

세 개의 이진 관계 R, S, T의 자연 선형 3-조인은 다음과 같이 주어집니다:

$$ R*S*T = { (a, b, c, d):R (a, b) \land S (b, c) \land T (c, d)} $$

여기서 자연 2-조인(*)이 결합법칙을 만족하기 때문에 좌변에는 괄호가 필요하지 않습니다. 순환 대응물을 얻기 위해, 우리는 연산자 γ[^call-gamma]를 도입합니다. 이 연산자는 양 끝을 함께 묶음으로써 차수 n인 관계로부터 차수 n-1인 관계를 만들어냅니다. 따라서 R이 n항 관계일 때(n ≥ 2), R의 묶음은 다음 방정식으로 정의됩니다:

$$ \gamma(R) = \{(a_1, a_2, ... , a_{n-1}):R(a_1, a_2, ..., a_{n-1}, a_n) \land a_1 = a_n \}. $$

이제 R, S, T의 자연 순환 3-조인을 다음 표현식으로 나타낼 수 있습니다:

$$ \gamma (R*S*T). $$

[^call-gamma]: 역주: γ는 그리스 문자로 감마(gamma).

<span id="section-2-1-3-10"/>

>
Extension of the notions of linear and cyclic S-join and their natural counterparts to the joining of n binary relations (where n ≥ 3) is obvious. A few words may be appropriate, however, regarding the joining of relations which are not necessarily binary. Consider the case of two relations R (degree r), S (degree s) which are to be joined on p of their domains $$(p < r, p < s)$$. For simplicity, suppose these p domains are the last p of the r domains of R, and the first p of the s domains of S. If this were not so, we could always apply appropriate permutations to make it
so. Now, take the Cartesian product of the first r-p domains of R, and call this new domain A. Take the Cartesian product of the last p domains of R, and call this B. Take the Cartesian product of the last s-p domains of S and call this C.

선형 및 순환 3-조인의 개념과 그들의 자연적 대응물을 n개의 이진 관계들의 조인으로 확장하는 것(여기서 n ≥ 3)은 명백합니다. 하지만 반드시 이진일 필요가 없는 관계들의 조인에 대해서는 몇 마디 설명이 필요할 수 있습니다. 차수가 r인 관계 R과 차수가 s인 관계 S가 p개의 도메인에서 조인되는 경우를 고려해봅시다$$(p<r,p<s)$$. 설명을 단순화하기 위해, 이 p개의 도메인들이 R의 r개 도메인 중 마지막 p개와 일치하고, S의 s개 도메인 중 처음 p개와 일치한다고 가정합시다. 만약 그렇지 않다면, 우리는 항상 적절한 순열을 적용하여 그렇게 만들 수 있습니다. 이제 R의 처음 r-p개 도메인들의 카테시안 곱을 취하고, 이 새로운 도메인을 A라고 부릅시다. R의 마지막 p개 도메인들의 카테시안 곱을 취하고, 이를 B라고 부릅시다. S의 마지막 s-p개 도메인들의 카테시안 곱을 취하고 이를 C라고 부릅시다.

<span id="section-2-1-3-11"/>

>
We can treat R as if it were a binary relation on the domains A, B. Similarly, we can treat S as if it were a binary relation on the domains B, C. The notions of linear and cyclic 3-join are now directly applicable. A similar approach can be taken with the linear and cyclic n-joins of n relations of assorted degrees.

우리는 R을 마치 도메인 A와 B 상의 이진 관계인 것처럼 다룰 수 있습니다. 유사하게, S를 도메인 B와 C 상의 이진 관계인 것처럼 다룰 수 있습니다. 이제 선형 및 순환 3-조인의 개념을 직접 적용할 수 있습니다. 이와 같은 접근 방식은 다양한 차수를 가진 n개 관계들의 선형 및 순환 n-조인에도 적용될 수 있습니다.

##### 2.1.4. Composition.

2.1.4. 합성

<span id="section-2-1-4-1"/>

>
The reader is probably familiar with the notion of composition applied to functions. We shall discuss a generalization of that concept and apply it first to binary relations. Our definitions of composition and composability are based very directly on the definitions of join and joinability given above.

이 논문의 독자들은 아마도 함수에 적용되는 합성의 개념에 익숙할 것입니다. 우리는 그 개념의 일반화에 대해 논의하고 이를 먼저 이진 관계에 적용할 것입니다. 우리의 합성과 합성 가능성에 대한 정의는 앞서 제시한 조인과 조인 가능성의 정의에 매우 직접적으로 기반합니다.

<span id="section-2-1-4-2"/>

>
Suppose we are given two relations R, S. T is a camposition of R with S if there exists a join U of R with S such that $$ T = π_{13} (U) $$. Thus, two relations are composable if and only if they are joinable. However, the existence of more than one join of R with S does not imply the existence of more than one composition of R with S.

두 관계 R, S가 주어졌다고 가정합시다. R과 S의 조인 U가 존재하여 $$ T = π_{13} (U) $$ 를 만족할 때, T는 R과 S의 합성이라고 합니다. 따라서, 두 관계는 조인 가능할 때만, 그리고 그때에만 합성 가능합니다. 하지만, R과 S의 조인이 하나 이상 존재한다고 해서 반드시 R과 S의 합성이 하나 이상 존재한다는 것을 의미하지는 않습니다.

<span id="section-2-1-4-3"/>

>
Corresponding to the natural join of R with S is the natural composition <sup>9</sup> of R with S defined by
>
$$ R \cdot S = π_{13} (R*S). $$
>
Taking the relations R, S from Figure 5, their natural composition is exhibited in Figure 10 and another composition is exhibited in Figure 11 (derived from the join exhibited in Figure 7).
>
$$
\begin{array}{ccc}
R \cdot S & (project  & supplier) \\
          &     1     &     1     \\
          &     1     &     2     \\
          &     2     &     1     \\
          &     2     &     2     \\
\end{array}
$$
>
> FIG. 10. The natural composition of R with S (from Figure 5)
>
$$
\begin{array}{ccc}
T & (project  & supplier) \\
  &     1     &     2     \\
  &     2     &     1     \\
\end{array}
$$
>
> FIG. 11. Another composition of R with S (from Figure 5)
>
<sup>9</sup> Other writers tend to ignore compositions other than the natural one, and accordingly refer to this particular composition as the composition-see, for example, Kelley’s “General Topology.”

R과 S의 자연 조인에 대응하여, R과 S의 자연 합성<sup>9</sup>은 다음과 같이 정의됩니다:

$$ R \cdot S = π_{13} (R*S). $$

그림 5의 관계 R, S를 가져와서, 이들의 자연 합성은 그림 10에서 보여지며, 또 다른 합성은 그림 11에서 보여집니다(그림 7에서 보여진 조인으로부터 도출됨).

$$
\begin{array}{ccc}
R \cdot S & (project  & supplier) \\
          &     1     &     1     \\
          &     1     &     2     \\
          &     2     &     1     \\
          &     2     &     2     \\
\end{array}
$$

그림 10. R과 S의 자연 합성(그림 5로부터)

$$
\begin{array}{ccc}
T & (project  & supplier) \\
  &     1     &     2     \\
  &     2     &     1     \\
\end{array}
$$

그림 11. R과 S의 또 다른 합성(그림 5로부터)

<sup>9</sup> 다른 저자들은 자연 합성 이외의 합성들을 무시하는 경향이 있으며, 따라서 이 특정한 합성을 그냥 합성이라고 부릅니다 - 예를 들어, Kelley의 "일반 위상수학"을 참고하세요.

<span id="section-2-1-4-4"/>

>
When two or more joins exist, the number of distinct compositions may be as few as one or as many as the number of distinct joins. Figure 12 shows an example of two relations which have several joins but only one composition. Note that the ambiguity of point c is lost in composing R with S, because of unambiguous associations made via the points a, b, d, e.
>
$$
\begin{array}{ccc}
R & (supplier & part) & \quad S & (part & project) \\
  &     1     &   a   &         &   a   &    g     \\
  &     1     &   b   &         &   b   &    f     \\
  &     1     &   c   &         &   c   &    f     \\
  &     2     &   c   &         &   c   &    g     \\
  &     2     &   d   &         &   d   &    g     \\
  &     2     &   e   &         &   e   &    f     \\
\end{array}
$$
>
FIG 12. Many joins, only one composition

두 개 이상의 조인이 존재할 때, 서로 다른 합성의 수는 최소 하나에서 최대 서로 다른 조인의 수만큼일 수 있습니다. 그림 12는 여러 조인을 가지지만 오직 하나의 합성만을 가지는 두 관계의 예를 보여줍니다. 점 a, b, d, e를 통한 명확한 연관성으로 인해, R과 S를 합성할 때 점 c의 모호성이 사라진다는 점에 주목하세요.

$$
\begin{array}{ccc}
R & (supplier & part) & \quad S & (part & project) \\
  &     1     &   a   &         &   a   &    g     \\
  &     1     &   b   &         &   b   &    f     \\
  &     1     &   c   &         &   c   &    f     \\
  &     2     &   c   &         &   c   &    g     \\
  &     2     &   d   &         &   d   &    g     \\
  &     2     &   e   &         &   e   &    f     \\
\end{array}
$$

그림 12. 여러 조인이 가능하나 오직 하나의 합성만을 가지는 예

<span id="section-2-1-4-5"/>

>
Extension of composition to pairs of relations which are not necessarily binary (and which may be of different degrees) follows the same pattern as extension of pairwise joining to such relations.

반드시 이항 관계일 필요가 없는(그리고 차수가 다를 수 있는[^diff-degree]) 관계 쌍들에 대한 합성의 확장은, 그러한 관계들에 대한 쌍별 조인의 확장과 같은 패턴을 따릅니다.

[^diff-degree]: 역주: 차수가 다를 수 있다는 것은 속성의 개수가 서로 다를 수 있다는 뜻.

<span id="section-2-1-4-6"/>

>
A lack of understanding of relational composition has led several systems designers into what may be called the connection trap. This trap may be described in terms of the following example. Suppose each supplier description is linked by pointers to the descriptions of each part supplied by that supplier, and each part description is similarly linked to the descriptions of each project which uses that part. A conclusion is now drawn which is, in general, erroneous: namely that, if all possible paths are followed from a given supplier via the parts he supplies to the projects using those parts, one will obtain a valid set of all projects supplied by that supplier. Such a conclusion is correct only in the very special case that the target relation between projects and suppliers is, in fact, the natural composition of the other two relations-and we must normally add the phrase “for all time,” because this is usually implied in claims concerning path-following techniques.

관계적 합성에 대한 이해 부족으로 인해 여러 시스템 설계자들이 이른바 '연결 함정(connection trap)'에 빠지게 되었습니다. 이 함정은 다음 예시를 통해 설명될 수 있습니다. 각 공급자 설명이 그 공급자가 공급하는 각 부품의 설명들과 포인터로 연결되어 있고, 각 부품 설명이 비슷한 방식으로 그 부품을 사용하는 각 프로젝트의 설명들과 연결되어 있다고 가정해 봅시다. 이제 일반적으로 잘못된 결론이 도출됩니다: 즉, 주어진 공급자로부터 그가 공급하는 부품들을 거쳐 그 부품들을 사용하는 프로젝트들까지 가능한 모든 경로를 따라가면, 그 공급자가 공급하는 모든 프로젝트들의 유효한 집합을 얻을 수 있다는 것입니다. 이러한 결론은 잘못된 것이며 프로젝트와 공급자 사이의 대상 관계가 실제로 다른 두 관계의 자연 합성인 매우 특별한 경우에만 옳습니다 - 그리고 보통 우리는 "모든 시점에서"라는 구절을 추가해야 합니다. 왜냐하면 이는 일반적으로 경로 추적 기법에 대한 주장에서 암시되기 때문입니다.


##### 2.1.5. Restriction.

2.1.5. 제한

<span id="section-2-1-5-1"/>

>
A subset of a relation is a relation. One way in which a relation S may act on a relation R to generate a subset of R is through the operation restriction of R by S. This operation is a generalization of the restriction of a function to a subset of its domain, and is defined as follows.

'관계'의 부분집합 또한 '관계'입니다.[^subset-of-a-relation] 그러므로 관계 S에 의한 R의 제한 연산은, 관계 S가 관계 R에 작용하여 R의 부분집합을 생성하는 방법들 중 하나입니다. 이 연산은 함수를 그 정의역의 부분집합으로 제한하는 것을 일반화한 것이며, 다음과 같이 정의됩니다.

[^subset-of-a-relation]: 역주: '관계'의 부분집합도 '관계'. 이 문장을 번역하면서 `SELECT * FROM (SELECT * FROM R WHERE ...) AS subset` 같은 SQL 쿼리가 떠올랐다.

<span id="section-2-1-5-2"/>

>
Let L, M be equal-length lists of indices such that $$ L = i_1 , i_2, ... , i_k, M = j_1, j_2, ... , j_k $$ where k ≤ degree of R and k ≤ degree of S. Then the L, M restriction of R by S denoted $$ R_L \vert _M S $$ is the maximal subset R’ of R such that
>
$$ π_L(R’) = π_M(S). $$
>
The operation is defined only if equality is applicable between elements of $$ π_{i_h}(R) $$ on the one hand and $$ π_{j_h} (S)$$ on the other for all $$ h = 1, 2, ... , k $$.

L, M이 같은 길이를 가진 인덱스 목록이라고 하고 $$ L = i_1 , i_2, ... , i_k, M = j_1, j_2, ... , j_k $$ 이며, 여기서 k 는 R의 차수 이하이고 S의 차수 이하라고 합시다. 그러면 $$ R_L \vert _M S $$ 로 표기되는 S에 의한 R의 L, M의 제한은 다음을 만족하는 R 의 최대 부분집합 R’입니다:

$$ π_L(R’) = π_M(S). $$

이 연산은 모든 $$ h = 1, 2, ... , k $$에 대해 $$ π_{i_h}(R) $$ 원소들과 $$ π_{j_h} (S)$$ 원소들 사이에 등호 연산이 적용 가능할 때만 정의됩니다.[^maximal-subset]

[^maximal-subset]: 역주: 최대 부분집합이라는 표현이 좀 헷갈리긴 하지만, `SELECT * FROM (SELECT * FROM R WHERE ...) AS subset` 같은 SQL 쿼리를 생각하면 이해할 수 있다. `SELECT * FROM ( ... ) AS subset` 은 `SELECT * FROM R WHERE ...`의 부분집합일 수 밖에 없다. 즉, $$ π_L(R’) = π_M(S) $$은 원본 테이블의 컬럼들로 데이터 선택이 제한된다는 의미이기도 하다.

<span id="section-2-1-5-3"/>

>
The three relations R, S, R’ of Figure 13 satisfy the equation $$ R' = R_{(2,3)} \vert_{(1,2)} S $$.
>
$$
\begin{array}{rrr}
R & (s & p & j) & S & (p & j) & R' & (s & p & j) \\
  &  1 & a & A  &   &  a & A  &    &  1 & a & A  \\
  &  2 & a & A  &   &  c & B  &    &  1 & a & A  \\
  &  2 & a & B  &   &  b & B  &    &  2 & b & B  \\
  &  2 & b & A  &   &    &    &    &    &   &    \\
  &  2 & b & B  &   &    &    &    &    &   &    \\
\end{array}
$$
>
> FIG. 13. Example of restriction

그림 13의 세 관계 R, S, R'은 $$ R' = R_{(2,3)} \vert_{(1,2)} S $$ 식을 만족합니다.

<span id="section-2-1-5-4"/>

>
We are now in a position to consider various applications of these operations on relations.

이제 우리는 이러한 관계들에 대한 연산의 다양한 응용을 살펴볼 수 있게 되었습니다.

#### 2.2. REDUNDANCY

2.2. 중복성

<span id="section-2-2-1"/>

>
Redundancy in the named set of relations must be distinguished from redundancy in the stored set of representations. We are primarily concerned here with the former. To begin with, we need a precise notion of derivability for relations.

명명된 관계들의 집합에서의 중복성은 저장된 표현들의 집합에서의 중복성과 구별되어야 합니다. 여기서 우리는 주로 전자에 관심이 있습니다. 먼저, 우리는 관계들의 도출 가능성에 대한 정확한 개념이 필요합니다.

<span id="section-2-2-1-1"/>

>
Suppose Θ is a collection of operations on relations and each operation has the property that from its operands it yields a unique relation (thus natural join is eligible, but join is not). A relation R is Θ-derivable from a set S of relations if there exists a sequence of operations from the collection Θ which, for all time, yields R from members of S. The phrase “for all time” is present, because we are dealing with time-varying relations, and our interest is in derivability which holds over a significant period of time. For the named set of relationships in noninferential systems, it appears that an adequate collection $$Θ_1$$ contains the following operations: projection, natural join, tie, and restriction. Permutation is irrelevant and natural composition need not be included, because it is obtainable by taking a natural join and then a projection. For the stored set of representations, an adequate collection $$Θ_2$$ of operations would include permutation and additional operations concerned with sub-setting and merging relations, and ordering and connecting their elements.

Θ가 관계들에 대한 연산들의 집합이고 각 연산이 피연산자들로부터 유일한 관계를 산출하는 속성을 가진다고 가정해봅시다(따라서 자연 조인은 적격이지만, 조인은 그렇지 않습니다). 관계 R이 관계들의 집합 S로부터 Θ-도출 가능하다는 것은, Θ 집합으로부터의 연산들의 순서가 존재하여 이 연산들이 모든 시점에서 S의 원소들로부터 R을 산출한다는 의미입니다. "모든 시점에서"라는 구절이 있는 이유는, 우리가 시간에 따라 변하는 관계들을 다루고 있으며, 우리의 관심사는 상당한 시간 동안 유지되는 도출 가능성이기 때문입니다. 비추론 시스템에서 명명된 관계들의 집합에 대해, 적절한 연산들의 집합 $$ Θ_1 $$
 은 다음 연산들을 포함하는 것으로 보입니다: 투영, 자연 조인, 묶음, 그리고 제한. 순열은 무관하며 자연 합성은 포함될 필요가 없습니다. 왜냐하면 자연 합성은 자연 조인을 취한 후 투영을 함으로써 얻을 수 있기 때문입니다. 저장된 표현들의 집합에 대해서는, 적절한 연산들의 집합 $$ Θ_2 $$는 순열과 관계들의 부분집합화 및 병합, 그리고 그들의 원소들의 정렬과 연결에 관련된 추가적인 연산들을 포함할 것입니다.

> **역주**: 복잡하니 간단하게 정리.
>
> - Θ 도출 가능성의 조건
>     - 연산은 유일한 결과를 산출해야 한다.
>     - 시간의 흐름과 관계 없이 동일한 결과를 산출해야 한다.
> - $$ Θ_1 $$: 논리적 연산
>     - 투영(projection)
>     - 자연 조인(natural join)
>     - 묶음(tie)
>     - 제한(restriction)
> - $$ Θ_2 $$: 물리적 연산
>     - 순열(permutation)
>     - 부분집합화(sub-setting)
>     - 병합(merging)
>     - 정렬(ordering)
>     - 연결(connecting)
{:style="background-color: #ecf1e8;"}

##### 2.2.1. Strong Redundancy.

2.2.1. 강한 중복성

<span id="section-2-2-1-1"/>

>
A set of relations is strongly redundant if it contains at least one relation that possesses a projection which is derivable from other projections of relations in the set. The following two examples are intended to explain why strong redundancy is defined this way, and to demonstrate its practical use. In the first example the collection of relations consists of just the following relation :
>
$$ employee \ (serial\#, name, manager\#, managername) $$
>
with $$ serial\# $$ as the primary key and $$ manager\# $$ as a foreign key. Let us denote the active domain by $$Δ_t$$, and suppose that
>
$$ Δ_t (manager\#) \subset Δ_t (serial\#) $$
>
and
>
$$ Δ_t (managername) \subset Δ_t (name) $$
>
for all time t. In this case the redundancy is obvious: the domain managername is unnecessary. To see that it is a strong redundancy as defined above, we observe that
>
$$ π_{34} (employee) = π_{12} (empZoyee)_1 \vert_1 π_3 (employee). $$
>
In the second example the collection of relations includes a relation S describing suppliers with primary key s#, a relation D describing departments with primary key d#, a relation J describing projects with primary key j#, and the following relations:
>
$$ P(s\#, d\#, ...), \ \ Q(s\#, j\#, ...), \ \ R(d\#, j\#, ...), $$
>
where in each case ... denotes domains other than s#, d#, j#. Let us suppose the following condition C is known to hold independent of time: supplier s supplies department d (relation P) if and only if supplier s supplies some project j (relation Q) to which d is assigned (relation R). Then, we can write the equation
>
$$ π_{12} (P) = π_{12} (Q) \cdot π_{21} (R) $$
>
and thereby exhibit a strong redundancy.

관계들의 집합은 만약 그 집합이 그 집합 내 다른 관계들의 투영들로부터 도출 가능한 투영을 가진 관계를 하나 이상 포함하고 있다면 강한 중복성을 가집니다. 다음의 두 예제는 강한 중복성이 이런 방식으로 정의되는 이유를 설명하고, 그것의 실제적 활용을 보여주기 위한 것입니다. 첫 번째 예제에서 관계들의 집합은 다음의 관계만으로 구성됩니다:

$$ employee \ (serial \#, name, manager\#, managername) $$

여기에서 serial# 은 기본 키이고 manager# 은 외래 키입니다.
활성 도메인을 $$Δ_t$$로 표시하고, 모든 시점 t에 대해 다음이 성립한다고 가정합시다:

$$ Δ_t, (manager\#) \subset Δ_t (serial\#) $$

그리고

$$ Δ_t, (managername) \subset Δ_t (name) $$

이 경우 중복성은 명백합니다: managername 도메인은 불필요합니다.[^explain-managername-domain] 이것이 위에서 정의한 대로 강한 중복성이라는 것을 다음 식을 통해 확인할 수 있습니다.

$$ π_{12} (P) = π_{12} (Q) \cdot π_{21} (R) $$

두 번째 예제에서 관계들의 집합은 기본 키 s#를 가진 공급자들을 설명하는 관계 S, 기본 키 d#를 가진 부서들을 설명하는 관계 D, 기본 키 j#를 가진 프로젝트들을 설명하는 관계 J, 그리고 다음의 관계들을 포함합니다:

$$ P(s\#, d\#, ...), \ \ Q(s\#, j\#, ...), \ \ R(d\#, j\#, ...), $$

여기서 각각의 경우 ...는 s#, d#, j# 이외의 도메인들을 나타냅니다. 다음 조건 C가 시간과 무관하게 성립한다고 가정합시다: 공급자 s가 부서 d에 공급한다면(관계 P) 그리고 오직 그 경우에만 공급자 s가 d가 배정된(관계 R) 어떤 프로젝트 j에 공급한다(관계 Q). 그러면, 우리는 다음 방정식을 쓸 수 있고

$$ π_{12} (P) = π_{12} (Q) \cdot π_{21} (R) $$

이를 통해 강한 중복성을 보여줄 수 있습니다.

[^explain-managername-domain]: 역주: foreign key가 있으므로 굳이 managername을 양쪽 테이블에 중복으로 저장할 필요가 없다는 의미.

<span id="section-2-2-1-2"/>

>
An important reason for the existence of strong redundancies in the named set of relationships is user convenience. A particular case of this is the retention of semi-obsolete relationships in the named set so that old programs that refer to them by name can continue to run correctly. Knowledge of the existence of strong redundancies in the named set enables a system or data base administrator greater freedom in the selection of stored representations to cope more efficiently with current traffic. If the strong redundancies in the named set are directly reflected in strong redundancies in the stored set (or if other strong redundancies are introduced into the stored set), then, generally speaking, extra storage space and update time are consumed with a potential drop in query time for some queries and in load on the central processing units.

명명된 관계들의 집합에 강한 중복성이 존재하는 중요한 이유 중 하나는 사용자 편의성입니다. 이러한 특별한 경우는 이전 프로그램들이 이름으로 참조하는 반쯤 폐기된 관계들을 명명된 집합에 유지하여 그 프로그램들이 계속해서 올바르게 실행될 수 있도록 하는 것입니다. 명명된 집합에 강한 중복성이 존재한다는 것을 아는 것은 시스템이나 데이터베이스 관리자가 현재의 트래픽을 더 효율적으로 처리하기 위한 저장 표현들을 선택하는 데 있어 더 큰 자유도를 갖게 합니다. 만약 명명된 집합의 강한 중복성이 저장된 집합의 강한 중복성으로 직접 반영되거나(또는 다른 강한 중복성이 저장된 집합에 도입된다면), 일반적으로 말해서 추가적인 저장 공간과 갱신 시간이 소비되며, 일부 질의에 대한 질의 시간과 중앙 처리 장치의 부하가 잠재적으로 감소할 수 있습니다.

##### 2.2.2. Weak Redundancy.

2.2.2. 약한 중복성

>
A second type of redundancy may exist. In contrast to strong redundancy it is not characterized by an equation. A colIection of relations is weakly redundant if it contains a relation that has a projection which is not derivable from other members but is at all times a projection of some join of other projections of relations in the collection.

두 번째 유형의 중복성도 있습니다. 강한 중복성과는 대조적으로 이는 방정식으로 특징지어지지 않습니다. 관계들의 집합은 만약 그 집합이 다른 멤버들로부터는 도출될 수 없지만 항상 그 집합 내 다른 관계들의 투영들의 어떤 조인의 투영인 투영을 가진 관계를 포함하고 있다면 약한 중복성을 가집니다.

>
We can exhibit a weak redundancy by taking the second example (cited above) for a strong redundancy, and assuming now that condition C does not hold at all times.
The relations $$ π_{12} (P), π_{12} (Q), π_{12} (R) $$ are complex <sup>10</sup> relations with the possibility of points of ambiguity occurring from time to time in the potential joining of any two. Under these circumstances, none of them is derivable from the other two. However, constraints do exist between them, since each is a projection of some cyclic join of the three of them. One of the weak redundancies can be characterized
by the statement: for all time, $$ π_{12} (P) $$ is some composition of $$ π_{12} (Q) $$ with $$ π_{21} (R) $$. The composition in question might be the natural one at some instant and a nonnatural one at another instant.
>
<sup>10</sup> A binary relation is complex if neither it nor its converse is a function.

우리는 강한 중복성에 대한 두 번째 예제(위에서 인용한)를 가져와서 이제는 조건 C가 항상 성립하지는 않는다고 가정함으로써 약한 중복성을 보여줄 수 있습니다.
관계들 $$ π_{12} (P), π_{12} (Q), π_{12} (R) $$은 복잡한<sup>10</sup> 관계들로, 임의의 두 관계의 잠재적 조인에서 모호성이 수시로 발생할 수 있습니다. 이러한 상황에서는 이들 중 어느 것도 다른 두 관계로부터 도출될 수 없습니다. 하지만 이들 간에는 제약이 존재하는데, 각각이 이 세 관계의 어떤 순환적 조인의 투영이기 때문입니다. 약한 중복성 중 하나는 다음 진술로 특징지어질 수 있습니다: 모든 시점에서 $$ π_{12} (P) $$는 $$ π_{12} (Q) $$와 $$ π_{21} (R) $$의 임의의 합성입니다. 여기서 언급된 합성은 어떤 순간에는 자연스러운 것일 수 있고 다른 순간에는 자연스럽지 않은 것일 수 있습니다.

<sup>10</sup> 이항 관계는 만약 그 관계나 그것의 역관계 중 어느 것도 함수가 아닐 경우 '복잡하다'고 표현합니다.

>
Generally speaking, weak redundancies are inherent in the logical needs of the community of users. They are not removable by the system or data base administrator. If they appear at all, they appear in both the named set and the stored set of representations.

일반적으로 말해서, 약한 중복성은 사용자 커뮤니티의 논리적 요구사항에 내재되어 있습니다. 이는 시스템이나 데이터베이스 관리자가 제거할 수 없습니다. 만약 이것이 나타난다면, 명명된 집합과 저장된 표현들의 집합 모두에서 나타납니다.

#### 2.3. CONSISTENCY

2.3. 일관성

>
Whenever the named set of relations is redundant in either sense, we shall associate with that set a collection of statements which define all of the redundancies which hold independent of time between the member relations. If the information system lacks-and it most probably will-detailed semantic information about each named relation, it cannot deduce the redundancies applicable to the named set. It might, over a period of time, make attempts to induce the redundancies, but such attempts would be fallible.

명명된 관계들의 집합이 어느 의미에서든 중복성을 가질 때마다, 우리는 그 집합에 멤버 관계들 간에 시간과 무관하게 성립하는 모든 중복성을 정의하는 진술들의 집합을 연관시킬 것입니다. 만약 정보 시스템이 각 명명된 관계에 대한 상세한 의미론적 정보를 가지고 있지 않다면(그리고 아마도 대부분 그럴 것입니다), 명명된 집합에 적용 가능한 중복성을 추론할 수 없습니다. 시간이 지나면서 중복성을 귀납적으로 찾으려 시도할 수는 있지만, 그러한 시도는 오류를 범할 수 있습니다.

>
Given a collection C of time-varying relations, an associated set Z of constraint statements and an instantaneous value V for C, we shall call the state (C, Z, V) consistent or inconsistent according as V does or does not satisfy Z.
For example, given stored relations R, S, T together with the constraint statement “$$ π_{12}(T) $$ is a composition of $$ π_{12}(R) $$ with $$ π_{12}(S) $$“, we may check from time to time that the values stored for R, S, T satisfy this constraint. An algorithm for making this check would examine the first two columns of each of R, S, T (in whatever way they are represented in the system) and determine whether
>
- (1) $$ π_{1}(T) = π_{1}(R) $$,
- (2) $$ π_{2}(T) = π_{2}(S) $$,
- (3) for every element pair (a, c) in the relation $$ π_{12}(T) $$ there is an element b such that (a, b) is in $$ π_{12}(R) $$ and (b, c) is in $$ π_{12}(S) $$.
>
There are practical problems (which we shall not discuss here) in taking an instantaneous snapshot of a collection of relations, some of which may be very large and highly variable.

시간에 따라 변하는 관계들의 집합 C, 그와 연관된 제약 진술들의 집합 Z, 그리고 C의 순간적인 값 V가 주어졌을 때, 상태 (C, Z, V)는 V가 Z를 만족하는지 여부에 따라 일관적이거나 비일관적이라고 부를 것입니다.

예를 들어, 저장된 관계 R,S,T가 "$$ π_{12}(T) $$ 는 $$ π_{12}(R) 과 $$ π_{12}(S) $$ 의 합성이다"라는 제약 진술과 함께 주어졌을 때, 우리는 때때로 R, S, T에 대해 저장된 값들이 이 제약을 만족하는지 확인할 수 있습니다. 이 확인을 수행하는 알고리즘은 R, S, T의 처음 두 열을 (시스템에서 어떤 방식으로 표현되든) 검사하여 다음을 판단할 것입니다:

- (1) $$ π_{1}(T) = π_{1}(R) $$,
- (2) $$ π_{2}(T) = π_{2}(S) $$,
- (3) 관계 $$ π_{12}(T) $$ 의 모든 원소 쌍 (a, c)에 대해 $$ π_{12}(R) $$에 (a, b)가 있고 $$ π_{12}(S) $$에 (b, c)가 있는 어느 원소 b가 존재한다.

매우 크고 가변성이 높은 관계들을 포함할 수 있는 관계들의 집합의 순간적인 스냅샷을 얻는 데는 실질적인 문제들이 있습니다(여기서는 논의하지 않을 것입니다).

>
It is important to note that consistency as defined above is a property of the instantaneous state of a data bank, and is independent of how that state came about. Thus, in particular, there is no distinction made on the basis of whether a user generated an inconsistency due to an act of omission or an act of commission. Examination of a simple example will show the reasonableness of this (possibly unconventional) approach to consistency.

위에서 정의된 일관성은 데이터 뱅크의 순간적인 상태의 속성이며, 그 상태가 어떻게 발생했는지와는 무관하다는 점에 주목하는 것이 중요합니다. 따라서 특히, 사용자가 부작위 행위로 인해 비일관성을 발생시켰는지 작위 행위로 인해 발생시켰는지에 따른 구분은 없습니다. 간단한 예제를 살펴보면 이러한 (아마도 비전통적인) 일관성에 대한 접근 방식의 합리성을 보여줄 수 있습니다.

>
Suppose the named set C includes the relations S, J, D, P, Q, R of the example in Section 2.2 and that P, Q, R possess either the strong or weak redundancies described therein (in the particular case now under consideration, it does not matter which kind of redundancy occurs). Further, suppose that at some time t the data bank state is consistent and contains no project j such that supplier 2 supplies project j and j is assigned to department 5. Accordingly, there is no element (2,5) in $$ π_{12}(P) $$. Now, a user introduces the element (2, 5) into $$ π_{12}(P) $$ by inserting some appropriate element into P. The data bank state is now inconsistent.
The inconsistency could have arisen from an act of omission, if the input (2, 5) is correct, and there does exist a project j such that supplier 2 supplies j and j is assigned to department 5. In this case, it is very likely that the user intends in the near future to insert elements into Q and R which will have the effect of introducing (2, j) into $$ π_{12}(Q) $$ and (5, j) in $$ π_{12}(R) $$. On the other hand, the input (2, 5) might have been faulty. It could be the case that the user intended to insert some other element into P-an element whose insertion would transform a consistent state into a consistent state. The point is that the system will normally have no way of resolving this question without interrogating its environment (perhaps the user who created the inconsistency).

2.2절의 예제에서 명명된 집합 C가 관계 S, J, D, P, Q, R을 포함하고, P, Q, R이 거기서 설명된 강한 중복성이나 약한 중복성을 가진다고 가정해봅시다(현재 고려 중인 특정 사례에서는 어떤 종류의 중복성이 발생하는지는 중요하지 않습니다). 또한, 어떤 시점 t에서 데이터 뱅크 상태가 일관적이고 공급자 2가 공급하고 부서 5에 할당된 프로젝트 j가 없다고 가정해봅시다. 따라서 $$ π_{12}(P) $$에는 원소 (2,5)가 없습니다. 이제 사용자가 P에 적절한 원소를 삽입함으로써 $$ π_{12}(P) $$에 원소 (2,5)를 도입합니다. 이제 데이터 뱅크 상태는 비일관적이 됩니다.

이러한 비일관성은 만약 입력 (2,5)가 올바르고, 공급자 2가 공급하고 부서 5에 할당된 프로젝트 j가 실제로 존재한다면 부작위 행위로 인해 발생했을 수 있습니다. 이 경우, 사용자는 가까운 미래에 Q와 R에 원소들을 삽입하여 
$$ π_{12}(Q) $$에 (2,j)를, $$ π_{12}(R) $$에 (5,j)를 도입하려는 의도를 가지고 있을 가능성이 매우 높습니다. 반면에, 입력 (2,5)가 잘못되었을 수도 있습니다. 사용자가 P에 다른 원소를 삽입하려 했을 수 있는데, 그 원소의 삽입은 일관적인 상태를 일관적인 상태로 변환했을 것입니다. 핵심은 시스템이 일반적으로 환경(아마도 비일관성을 만든 사용자)에 질의하지 않고는 이 문제를 해결할 방법이 없다는 것입니다.

>
There are, of course, several possible ways in which a system can detect inconsistencies and respond to them. In one approach the system checks for possible inconsistency whenever an insertion, deletion, or key update occurs.
Naturally, such checking will slow these operations down. If an inconsistency has been generated, details are logged internally, and if it is not remedied within some reasonable time interval, either the user or someone responsible for the security and integrity of the data is notified. Another approach is to conduct consistency checking as a batch operation once a day or less frequently. Inputs causing the inconsistencies which remain in the data bank state at checking time can be tracked down if the system maintains a journal of all state-changing transactions. This latter approach would certainly be superior if few non-transitory inconsistencies occurred.

물론 시스템이 비일관성을 감지하고 대응하는 방법에는 여러 가지가 있습니다. 한 가지 접근법은 삽입, 삭제 또는 키 갱신이 발생할 때마다 시스템이 가능한 비일관성을 검사하는 것입니다.
당연히 이러한 검사는 이들 연산의 속도를 늦출 것입니다. 만약 비일관성이 발생했다면, 세부사항이 내부적으로 기록되고, 적절한 시간 간격 내에 해결되지 않으면 사용자나 데이터의 보안과 무결성을 책임지는 담당자에게 통보됩니다. 또 다른 접근법은 하루에 한 번 또는 그보다 덜 빈번하게 일괄 처리 작업으로 일관성 검사를 수행하는 것입니다. 시스템이 상태를 변경하는 모든 트랜잭션의 기록을 유지한다면, 검사 시점에 데이터 뱅크 상태에 남아있는 비일관성을 일으킨 입력들을 추적할 수 있습니다. 이 후자의 접근법은 일시적이지 않은 비일관성이 거의 발생하지 않는 경우에 분명히 더 우수할 것입니다.

#### 2.4. SUMMARY

2.4. 요약

>
In Section 1 a relational model of data is proposed as a basis for protecting users of formatted data systems from the potentially disruptive changes in data representation caused by growth in the data bank and changes in traffic.
A normal form for the time-varying collection of relationships is introduced.

1절에서는 데이터 뱅크의 성장과 트래픽의 변화로 인해 발생하는 데이터 표현의 잠재적인 파괴적 변화로부터 구조화된 데이터 시스템의 사용자들을 보호하기 위한 기반으로서 관계형 데이터 모델이 제안되었습니다.
시간에 따라 변하는 관계들의 집합에 대한 정규형이 도입되었습니다.

>
In Section 2 operations on relations and two types of redundancy are defined and applied to the problem of maintaining the data in a consistent state. This is bound to become a serious practical problem as more and more different types of data are integrated together into common data banks.

2절에서는 관계에 대한 연산들과 두 가지 유형의 중복성이 정의되었고, 이를 데이터를 일관된 상태로 유지하는 문제에 적용했습니다. 이는 점점 더 많은 서로 다른 유형의 데이터가 공통 데이터 뱅크로 통합됨에 따라 중요한 실제적 문제가 될 것이 분명합니다.

>
Many questions are raised and left unanswered. For example, only a few of the more important properties of the data sublanguage in Section 1.4 are mentioned. Neither the purely linguistic details of such a language nor the implementation problems are discussed. Nevertheless, the material presented should be adequate for experienced systems programmers to visualize several approaches. It is also hoped that this paper can contribute to greater precision in work on formatted data systems.

많은 질문들이 제기되었지만 답변되지 않은 채로 남아있습니다. 예를 들어, 1.4절의 데이터 서브언어의 중요한 특성들 중 일부만이 언급되었습니다. 그러한 언어의 순수하게 언어학적인 세부사항이나 구현 문제들은 논의되지 않았습니다. 그럼에도 불구하고, 제시된 자료는 경험 있는 시스템 프로그래머들이 여러 가지 접근 방식을 구상하기에 충분할 것입니다. 또한 이 논문이 구조화된 데이터 시스템에 관한 연구에서 더 큰 정확성을 확보하는 데 기여할 수 있기를 바랍니다.

### Acknowledgment.

>
It was C. T. Davies of IBM Poughkeepsie who convinced the author of the need for data independence in future information systems. The author wishes to thank him and also F. P. Palermo, C. P. Wang, E. B. Altman, and M. E. Senko of the IBM San Jose Research Laboratory for helpful discussions.

IBM Poughkeepsie의 C. T. Davies가 미래 정보 시스템에서 데이터 독립성의 필요성을 저자에게 확신시켰습니다. 저자는 그와 IBM 산호세 연구소의 F. P. Palermo, C. P. Wang, E. B. Altman, 그리고 M. E. Senko에게 유익한 토론을 해준 것에 대해 감사를 표하고 싶습니다.

>
RECEIVED SEPTEMBER, 1969; REVISED FEBRUARY, 1970

1969년 9월 접수; 1970년 2월 수정

### REFERENCES

1. CHILDS, D. L. Feasibility of a set-theoretical data structure - a general structure based on a reconstituted definition of relation. Proc. IFIP Cong., 1968, North Holland Pub. Co., Amsterdam, p. 162-172.
2. LEVEIN, R. E., AND MARON, M. E. A computer system for inference execution and data retrieval. Comm. ACM 10, 11 (Nov. 1967), 715-721.
3. BACHMAN, C. W. Software for random access processing. Datumation (Apr. 1965), 36-41.
4. McGEE, W. C. Generalized file processing. In Annual Review in Automatic Programming 6, 13, Pergamon Press, New York, 1969, pp. 77-149.
5. Information Management System/360, Application Description Manual H20-0524-1. IBM Corp., White Plains, N. Y., July 1968.
6. GIS (Generalized Information System), Application Description Manual H20-0574. IBM Corp., White Plains, N. Y., 1965.
7. BLEIER, R. E. Treating hierarchical data structures in the SDC time-shared data management system (TDMS). Proc. ACM 22nd Nat. Conf., 1967, MD1 Publications, Wayne, Pa., pp. 41-49.
8. IDS Reference Manual GE 625/635, GE Inform. Sys. Div., Pheonix, Ariz., CPB 1093B, Feb. 1968.
9. CHURCH, A. An Introduction to Mathematical Logic I. Princeton U. Press, Princeton, N.J., 1956.
10. FELDMAN, J. A., AND ROVNER, P. D. An Algol-based associative language. Stanford Artificial Intelligence Rep. AI-66, Aug. 1, 1968.

## 주석
