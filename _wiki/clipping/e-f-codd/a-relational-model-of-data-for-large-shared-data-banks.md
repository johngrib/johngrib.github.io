---
layout  : wiki
title   : A Relational Model of Data for Large Shared Data Banks - E. F. Codd (1970)
summary : 대형 공유 데이터 뱅크를 위한 데이터의 관계적 모델
date    : 2025-01-26 20:29:48 +0900
updated : 2025-01-27 10:51:24 +0900
tag     : 
resource: 20/96218C-79EC-4A15-91F6-DE682155FBDB
toc     : true
public  : true
parent  : [[/clipping]]
latex   : true
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

1.2.2. 인덱싱 종속성

>
In the context of formatted data, an index is usually thought of as a purely performance-oriented component of the data representation. It tends to improve response to queries and updates and, at the same time, slow down response to insertions and deletions. From an informational standpoint, an index is a redundant component of the data representation. If a system uses indices at all and if it is to perform well in an environment with changing patterns of activity on the data bank, an ability to create and destroy indices from time to time will probably be necessary. The question then arises: Can application programs and terminal activities remain invariant as indices come and go?

형식화된 데이터의 맥락에서 인덱스는 일반적으로 데이터 표현에 있어 순수하게 성능 지향적인 구성요소로 여겨집니다. 인덱스는 조회와 갱신에 대한 응답 속도를 향상시키는 경향이 있지만, 동시에 삽입과 삭제에 대한 응답은 늦추게 됩니다. 정보의 관점에서 볼 때, 인덱스는 데이터 표현의 중복된 구성요소입니다. 만약 시스템이 인덱스를 사용하고 데이터 뱅크에 대한 활동 패턴이 변화하는 환경에서 좋은 성능을 보여야 한다면, 때때로 인덱스를 생성하고 제거할 수 있는 능력이 필요할 것입니다. 그러면 이런 의문이 생깁니다: 인덱스가 생성되고 제거되는 동안에도 응용 프로그램들과 끝단 활동들이 변함없이 유지될 수 있을까요?

>
Present formatted data systems take widely different approaches to indexing. TDMS [7] unconditionally provides indexing on all attributes. The presently released version of IMS [5] provides the user with a choice for each file: a choice between no indexing at all (the hierarchic sequential organization) or indexing on the primary key only (the hierarchic indexed sequent,ial organization). In neither case is the user’s application logic dependent on the existence of the unconditionally provided indices. IDS [8], however, permits the fle designers to select attributes to be indexed and to incorporate indices into the file structure by means of additional chains. Application programs taking advantage of the performance benefit of these indexing chains must refer to those chains by name. Such programs do not operate correctly if these chains are later removed.

현재의 형식화된 데이터 시스템들은 인덱싱에 대해 매우 다른 접근 방식을 취하고 있습니다. TDMS[7]는 모든 속성에 대해 무조건적으로 인덱싱을 제공합니다. 현재 출시된 버전의 IMS[5]는 각 파일에 대해 사용자에게 선택권을 제공합니다: 전혀 인덱싱을 하지 않는 방식(계층적 순차 구성)과 주요 키에 대해서만 인덱싱하는 방식(계층적 인덱스 순차 구성) 중에서 선택할 수 있습니다. 두 경우 모두 사용자의 응용 로직은 무조건적으로 제공되는 인덱스의 존재 여부에 종속되지 않습니다. 반면 IDS[8]는 파일 설계자가 인덱싱할 속성들을 선택하고 추가적인 체인들을 통해 인덱스를 파일 구조에 통합할 수 있도록 허용합니다. 이러한 인덱싱 체인들의 성능상 이점을 활용하는 응용 프로그램들은 반드시 그 체인들을 이름으로 참조해야 합니다. 이러한 프로그램들은 이 체인들이 나중에 제거되면 올바르게 작동하지 않습니다.

##### 1.2.3. Access Path Dependence.

>
 Many of the existing formatted data systems provide users with tree-structured files or slightly more general network models of the data. Application programs developed to work with these systems tend to be logically impaired if the trees or networks are changed in structure. A simple example follows.

현존하는 형식화된 데이터 시스템들의 상당수는 사용자들에게 트리 구조의 파일들이나 약간 더 일반화된 형태의 데이터 네트워크 모델을 제공합니다. 이러한 시스템들에서 작동하도록 개발된 응용 프로그램들은 트리나 네트워크의 구조가 변경되면 논리적으로 손상되는 경향이 있습니다. 간단한 예시를 들어보겠습니다.

>
Suppose the data bank contains information about parts and projects. For each part, the part number, part name, part description, quantity-on-hand, and quantity-on-order are recorded. For each project, the project number, project name, project description are recorded. Whenever a project makes use of a certain part, the quantity of that part committed to the given project is also recorded. Suppose that the system requires the user or file designer to declare or define the data in terms of tree structures. Then, any one of the hierarchical structures may be adopted for the information mentioned above (see Structures 1-5).

데이터 뱅크가 부품과 프로젝트에 대한 정보를 담고 있다고 가정해봅시다. 각 부품에 대해서는 부품 번호(part number), 부품 이름(part name), 부품 설명(part description), 재고 수량(quantity-on-hand), 주문 수량(quantity-on-order)이 기록됩니다. 각 프로젝트에 대해서는 프로젝트 번호(project number), 프로젝트 이름(project name), 프로젝트 설명(project description)이 기록됩니다. 프로젝트가 특정 부품을 사용할 때마다, 해당 프로젝트에 할당된 그 부품의 수량도 함께 기록됩니다. 시스템이 사용자나 파일 설계자에게 트리 구조로 데이터를 선언하거나 정의하도록 요구한다고 가정해봅시다. 그러면 위에서 언급한 정보에 대해 다음과 같은 계층 구조들 중 어느 것이든 채택될 수 있습니다(구조 1-5 참조).

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

>
Now, consider the problem of printing out the part number, part name, and quantity committed for every part used in the project whose project name is “alpha.” The following observations may be made regardless of which available tree-oriented information system is selected to tackle this problem. If a program P is developed for this problem assuming one of the five structures above-that is, P makes no test to determine which structure is in effect-then P will fail on at least three of the remaining structures. More specifically, if P succeeds with structure 5, it will fail with all the others; if P succeeds with structure 3 or 4, it will fail with at least 1,2, and 5; if P succeeds with 1 or 2, it will fail with at least 3, 4, and 5. The reason is simple in each case. In the absence of a test to determine which structure is in effect, P fails because an attempt is made to exceute a reference to a nonexistent file (available systems treat this as an error) or no attempt is made to execute a reference to a file containing needed information. The reader who is not convinced should develop sample programs for this simple problem.

이제 "alpha"라는 이름의 가상 프로젝트에서 사용하는 모든 부품의 부품 번호, 부품명, 그리고 할당량을 출력하는 상황을 생각해 보도록 합시다. 이 문제를 해결하기 위해 어떤 트리 기반 정보 시스템을 선택하든 다음과 같은 관찰이 가능합니다. 위의 다섯 가지 구조 중 하나를 가정하여 프로그램 P를 개발한다면 - 즉, P가 어떤 구조가 적용되는지 검사하지 않는다면 - P는 나머지 구조들 중 최소 세 가지에서 실패할 것입니다.
더 구체적으로, P가 구조 5에서 성공한다면 다른 모든 구조에서 실패할 것이고, P가 구조 3이나 4에서 성공한다면 최소한 1, 2, 5에서 실패할 것이며, P가 1이나 2에서 성공한다면 최소한 3, 4, 5에서 실패할 것입니다. 각각의 경우에 그 이유는 간단합니다. 어떤 구조가 적용되는지 검사하지 않으면, P는 존재하지 않는 파일을 참조하려 시도하거나(시중의 시스템들은 이를 오류로 처리함), 필요한 정보가 들어있는 파일을 참조하려는 시도를 하지 않기 때문에 실패합니다. 이 점을 확신하지 못하는 독자는 이 간단한 문제에 대한 샘플 프로그램을 직접 개발해보기 바랍니다.

>
Since, in general, it is not practical to develop application programs which test for all tree structurings permitted by the system, these programs fail when a change in sructure becomes necessary.

일반적으로 시스템상 허용되는 모든 트리 구조를 검사하도록 응용 프로그램을 개발하는 것은 현실적이지 않은 일입니다. 따라서 이러한 일반적인 프로그램들은 구조 변경이 필요할 때마다 실패하게 됩니다.

>
Systems which provide users with a network model of the data run into similar difficulties. In both the tree and network cases, the user (or his program) is required to exploit a collection of user access paths to the data. It does not matter whether these paths are in close correspondence with pointer-defined paths in the stored representation-in IDS the correspondence is extremely simple, in TDMS it is just the opposite. The consequence, regardless of the stored representation, is that terminal activities and programs become dependent on the continued existence of the user access paths.

사용자에게 네트워크 형태의 데이터 모델을 제공하는 시스템들도 비슷한 어려움을 겪습니다. 트리와 네트워크 모두의 경우, 사용자(또는 그의 프로그램)는 데이터에 접근하기 위한 일련의 사용자 접근 경로들을 활용해야 합니다. 이러한 경로들이 저장된 표현 방식에서 포인터로 정의된 경로들과 얼마나 밀접하게 대응되는지는 중요하지 않습니다. IDS에서는 이 대응 관계가 매우 단순하고, TDMS에서는 정반대입니다. 저장 표현 방식과 무관하게, 그 결과로 끝단 작업과 프로그램들은 이러한 사용자 접근 경로가 계속 존재하는지 여부에 의존하게 됩니다.

>
One solution to this is to adopt the policy that once a user access path is defined it will not be made obsolete until all application programs using that path have become obsolete. Such a policy is not practical, because the number of access paths in the total model for the community of users of a data bank would eventually become excessively large.

이에 대한 한 가지 해결책은 사용자 접근 경로를 한번 정의하면 그 경로를 사용하는 모든 응용 프로그램이 쓸모없어질 때까지 그 경로를 폐기하지 않는다는 정책을 채택하는 것입니다. 하지만 이러한 정책은 현실적이지 않습니다. 데이터뱅크를 사용하는 전체 사용자 집단을 위한 전체 모델에서 접근 경로의 수가 결국에는 과도하게 커질 것이기 때문입니다.

#### 1.3. A RELATIONAL VIEW OF DATA

>
The term relation is used here in its accepted mathematical sense. Given sets $$ S_1, S_2, ... , S_n $$ (not necessarily distinct), $$R$$ is a relation on these n sets if it is a set of n-tuples each of which has its first element from $$S_1$$, its second element from $$S_2$$, and so on.<sup>1</sup> We shall refer to $$S_j$$ as the jth domain of $$R$$.
As defined above, $$R$$ is said to have degree n. Relations of degree 1 are often called unary, degree 2 binary, degree 3 ternary, and degree n n-ary.
>
<sup>1</sup> More concisely, $$R$$ is a subset of the Cartesian products $$S_1 \times S_2 \times ... \times S_n$$.

여기서 관계라는 용어는 수학적으로 통용되는 의미로 사용됩니다. 집합 $$ S_1, S_2, ... , S_n $$이 주어졌을 때(반드시 서로 달라야 할 필요는 없음), R은 이 n개 집합들에 대한 관계가 됩니다. 이때 R은 n-튜플들의 집합이며, 각 n-튜플의 첫 번째 원소는 $$S_1$$에서, 두 번째 원소는 $$S_2$$에서, 이런 식으로 구성됩니다.<sup>1</sup> 우리는 $$S_j$$를 R의 j번째 도메인이라고 부를 것입니다.
위에서 정의한 대로, R은 차수가 n이라고 합니다. 차수가 1인 관계는 단항 관계, 차수가 2인 관계는 이항 관계, 차수가 3인 관계는 삼항 관계, 차수가 n인 관계는 n항 관계라고 흔히 부릅니다.

<sup>1</sup> 더 간단히 말하면, R은 카테시안 곱 $$S_1 \times S_2 \times ... \times S_n$$의 부분집합입니다.

>
For expository reasons, we shall frequently make use of an array representation of relations, but it must be remembered that this particular representation is not an essential part of the relational view being expounded. An array which represents an n-ary relation R has the following properties:
>
> - (1) Each row represents an n-tuple of R.
> - (2) The ordering of rows is immaterial.
> - (3) All rows are distinct.
> - (4) The ordering of columns is significant-it corresponds to the ordering $$S_1, S_2, ... , S_n$$ of the domains on which R is defined (see, however, remarks below on domain-ordered and domain-unordered relations).
> (5) The significance of each column is partially conveyed by labeling it with the name of the corresponding domain.

이 논문에서는 설명의 편의를 위해 관계를 표현할 때 배열 표현을 자주 사용할 것입니다. 그러나 이러한 표현 방식이 여기서 설명하고자 하는 관계형 관점의 필수적인 부분은 아니라는 점은 염두에 두어야 합니다. n항 관계 R을 표현하는 배열은 다음과 같은 특성을 가집니다:

- (1) 각 행은 R의 n-튜플을 나타냅니다.
- (2) 행의 순서는 중요하지 않습니다.
- (3) 모든 행은 서로 다릅니다.
- (4) 열의 순서는 중요합니다. 이는 R이 정의된 도메인들의 순서 $$S_1, S_2, ..., S_n$$에 대응됩니다(단, 도메인 순서가 있는 관계와 도메인 순서가 없는 관계에 대한 아래 설명 참조).
- (5) 각 열의 의미는 해당 도메인의 이름으로 열에 라벨을 붙임으로써 부분적으로 전달됩니다.

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

>
One might ask: If the columns are labeled by the name of corresponding domains, why should the ordering of columns matter? As the example in Figure 2 shows, two columns may have identical headings (indicating identical domains) but possess distinct meanings with respect to the relation. The relation depicted is called component. It is a ternary relation, whose first two domains are called part and third domain is called quantity. The meaning of component (2, y, z) is that part x is an immediate component (or subassembly) of part y, and z units of part 5 are needed to assemble one unit of part y. It is a relation which plays a critical role in the parts explosion problem.
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

>
It is a remarkable fact that several existing information systems (chiefly those based on tree-structured files) fail to provide data representations for relations which have two or more identical domains. The present version of IMS/360 [5] is an example of such a system.

주목할 만한 사실은, 현존하는 여러 정보 시스템들(주로 트리 구조의 파일을 기반으로 하는 시스템들)이 두 개 이상의 동일한 도메인을 가진 관계를 표현하지 못한다는 점입니다. IMS/360[5]의 현재 버전이 이러한 시스템의 한 예시입니다.

>
The totality of data in a data bank may be viewed as a collection of time-varying relations. These relations are of assorted degrees. As time progresses, each n-ary relation may be subject to insertion of additional n-tuples, deletion of existing ones, and alteration of components of any of its existing n-tuples.

데이터 뱅크의 모든 데이터는 시간에 따라 변화하는 관계들의 집합으로 볼 수 있습니다. 이러한 관계들은 다양한 항수를 가집니다. 시간이 흐름에 따라, 각각의 n항 관계에는 새로운 n-튜플이 삽입되거나, 기존 n-튜플이 삭제되거나, 기존 n-튜플의 구성요소가 변경될 수 있습니다.

>
In many commercial, governmental, and scientific data banks, however, some of the relations are of quite high degree (a degree of 30 is not at all uncommon). Users should not normally be burdened with remembering the domain ordering of any relation (for example, the ordering supplier, then part, then project, then quantity in the relation supply). Accordingly, we propose that users deal, not with relations which are domain-ordered, but with relationships which are their domain-unordered counterparts.2 To accomplish this, domains must be uniquely identifiable at least within any given relation, without using position. Thus, where there are two or more identical domains, we require in each case that the domain name be qualified by a distinctive role name, which serves to identify the role played by that domain in the given relation. For example, in the relation component of Figure 2, the first domain part might be qualified by the role name sub, and the second by super, so that users could deal with the relationship component and its domains-sub.part super.part, quantity-without regard to any ordering between these domains.
>
<sup>2</sup> In mathematical terms, a relationship is an equivalence class of those relations that are equivalent under permutation of domains (see Section 2.1.1).

하지만 많은 상업용, 정부용, 과학용 데이터 뱅크에서는 상당히 높은 차수의 관계들이 존재합니다(30항짜리가 나오는 경우도 있음). 사용자들이 각 관계의 도메인 순서를 기억해야 하는 부담을 지는 것은 바람직하지 않습니다(supply 관계를 예로 들면 공급자, 부품, 프로젝트, 수량이라는 순서가 있음). 따라서 우리는 사용자들이 도메인 순서가 정해진 관계가 아니라, 도메인 순서가 정해지지 않은 대응물인 관계성(relationship)을 다루도록 제안합니다.<sup>2</sup> 이를 위해서는 도메인들이 위치에 의존하지 않고도 적어도 주어진 관계 내에서는 고유하게 식별 가능해야 합니다. 따라서 두 개 이상의 동일한 도메인이 있는 경우, 각각의 도메인 이름은 해당 관계에서 그 도메인이 수행하는 역할을 식별하는 고유한 역할 이름으로 한정되어야 합니다. 예를 들어, 그림 2의 component 관계에서 첫 번째 part 도메인은 sub라는 역할 이름으로, 두 번째는 super라는 역할 이름으로 한정할 수 있습니다. 이렇게 하면 사용자들은 이들 도메인 간의 순서와 관계없이 component라는 관계성과 그 도메인들(sub.part, super.part, quantity)을 다룰 수 있게 됩니다.

<sup>2</sup>수학적 용어로, 관계성은 도메인들의 순열 하에서 서로 동등한 관계들의 동치류입니다(2.1.1절 참조).

>
To sum up, it is proposed that most users should interact with a relational model of the data consisting of a collection of time-varying relationships (rather than relations). Each user need not know more about any relationship than its name together with the names of its domains (role qualified whenever necessary): Even this information might be offered in menu style by the system (subject to security and privacy constraints) upon request by the user.

즉, 대부분의 사용자들은 시간에 따라 변화하는 관계들의 집합이 아닌 관계성들의 집합으로 구성된 데이터의 관계형 모델과 상호작용해야 한다고 제안합니다. 각 사용자는 관계성에 대해 그것의 이름과 도메인들의 이름(필요한 경우 역할로 한정된)만 알면 됩니다. 심지어 이러한 정보조차도 사용자의 요청에 따라 시스템이 메뉴 형식으로 제공할 수 있습니다(보안 및 개인정보 보호 제약사항에 따라).

>
There are usually many alternative ways in which a relational model may be established for a data bank. In order to discuss a preferred way (or normal form), we must first introduce a few additional concepts (active domain, primary key, foreign key, nonsimple domain) and establish some links with terminology currently in use in information systems programming. In the remainder of this paper, we shall not bother to distinguish between relations and relationships except where it appears advantageous to be explicit.

데이터 뱅크에 대한 관계형 모델을 수립하는 방법에는 보통 여러 가지 대안이 있습니다. 선호되는 방식(또는 정규형)을 논의하기 위해서는 먼저 몇 가지 추가 개념(활성 도메인, 기본 키, 외래 키, 비단순 도메인)을 소개하고 현재 정보 시스템 프로그래밍에서 사용되는 용어와의 연관성을 확립해야 합니다. 이 논문의 나머지 부분에서는 명시적으로 구분할 필요가 있는 경우를 제외하고는 관계와 관계성을 구분하지 않겠습니다.
