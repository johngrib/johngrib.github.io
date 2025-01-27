---
layout  : wiki
title   : A Relational Model of Data for Large Shared Data Banks - E. F. Codd (1970)
summary : 대형 공유 데이터 뱅크를 위한 데이터의 관계적 모델
date    : 2025-01-26 20:29:48 +0900
updated : 2025-01-27 16:30:11 +0900
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
To sum up, it is proposed that most users should interact with a relational model of the data consisting of a collection of time-varying relationships (rather than relations). Each user need not know more about any relationship than its name together with the names of its domains (role qualified whenever necessary).<sup>3</sup> Even this information might be offered in menu style by the system (subject to security and privacy constraints) upon request by the user.
>
<sup>3</sup> Naturally, as with any data put into and retrieved from a computer system, the user will normally make far more effective use of the data if he is aware of its meaning.

즉, 대부분의 사용자들은 시간에 따라 변화하는 관계들의 집합이 아닌 관계성들의 집합으로 구성된 데이터의 관계형 모델과 상호작용해야 한다고 제안합니다. 각 사용자는 관계성에 대해 그것의 이름과 도메인들의 이름(필요한 경우 역할로 한정된)만 알면 됩니다. 심지어 이러한 정보조차도 사용자의 요청에 따라 시스템이 메뉴 형식으로 제공할 수 있습니다(보안 및 개인정보 보호 제약사항에 따라).

<sup>3</sup> 당연한 말이지만, 컴퓨터 시스템에 입력되고 검색되는 다른 모든 데이터와 마찬가지로 사용자가 데이터의 의미를 알고 있을 때 그 데이터를 훨씬 더 효과적으로 사용할 수 있을 것입니다.

>
There are usually many alternative ways in which a relational model may be established for a data bank. In order to discuss a preferred way (or normal form), we must first introduce a few additional concepts (active domain, primary key, foreign key, nonsimple domain) and establish some links with terminology currently in use in information systems programming. In the remainder of this paper, we shall not bother to distinguish between relations and relationships except where it appears advantageous to be explicit.

데이터 뱅크에 대한 관계형 모델을 수립하는 방법에는 보통 여러 가지 대안이 있습니다. 선호되는 방식(또는 정규형)을 논의하기 위해서는 먼저 몇 가지 추가 개념(활성 도메인, 기본 키, 외래 키, 비단순 도메인)을 소개하고 현재 정보 시스템 프로그래밍에서 사용되는 용어와의 연관성을 확립해야 합니다. 이 논문의 나머지 부분에서는 명시적으로 구분할 필요가 있는 경우를 제외하고는 관계와 관계성을 구분하지 않겠습니다.

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

>
Normally, one domain (or combination of domains) of a given relation has values which uniquely identify each element (n-tuple) of that relation. Such a domain (or combination) is called a primary key. In the example above, part number would be a primary key, while part color would not be. A primary key is nonredundant if it is either a simple domain (not a combination) or a combination such that none of the participating simple domains is superfluous in uniquely identifying each element. A relation may possess more than one nonredundant primary key. This would be the case in the example if different parts were always given distinct names. Whenever a relation has two or more nonredundant primary keys, one of them is arbitrarily selected and called the primary key of that relation.

일반적으로 주어진 관계의 한 도메인(또는 도메인들의 조합)은 해당 관계의 각 원소(n-튜플)를 고유하게 식별하는 값들을 가집니다. 이러한 도메인(또는 조합)을 기본 키(primary key)라고 합니다. 위의 예시에서 부품 번호는 기본 키가 될 수 있지만, 부품 색상은 그렇지 않습니다. 기본 키가 단순 도메인(조합이 아닌)이거나 각 원소를 고유하게 식별하는 데 참여하는 단순 도메인 중 어느 것도 불필요하지 않은 조합일 경우, 이를 비중복 기본 키라고 합니다(nonredundant primary key). 하나의 관계는 둘 이상의 비중복 기본 키를 가질 수 있습니다. 서로 다른 부품들이 항상 서로 다른 이름을 가진다면 위의 예시가 이러한 경우에 해당합니다. 관계가 둘 이상의 비중복 기본 키를 가질 때마다, 그중 하나를 임의로 선택하여 해당 관계의 기본 키라고 부릅니다.

>
A common requirement is for elements of a relation to cross-reference other elements of the same relation or elements of a different relation. Keys provide a user-oriented means (but not the only means) of expressing such cross-references. We shall call a domain (or domain combmation) of relation R a foreign key if it is not the primary key of R but its elements are values of the primary key of some relation S (the possibility that S and R are identical is not excluded). In the relation supply of Figure 1, the combination of supplier, part, project is the primary key, while each of these three domains taken separately is a foreign key.

흔한 요구사항 중 하나는 한 관계의 원소들이 같은 관계의 다른 원소들이나 다른 관계의 원소들을 상호 참조하는 것입니다. 키는 이러한 상호 참조를 표현하기 위한 사용자 지향적인 수단을 제공합니다(단, 유일한 수단은 아닙니다). 관계 R의 도메인(또는 도메인 조합)이 R의 기본 키가 아니면서 그 원소들이 어떤 관계 S의 기본 키 값들인 경우, 이를 외래 키(foreign key)라고 부르도록 하겠습니다(여기서 S와 R이 동일할 수 있다는 가능성도 배제하지 않습니다). 그림 1의 supply 관계에서 공급업체, 부품, 프로젝트의 조합이 기본 키이며, 이 세 도메인 각각은 개별적으로 외래 키입니다.

>
In previous work there has been a strong tendency to treat the data in a data bank as consisting of two parts, one part consisting of entity descriptions (for example, descriptions of suppliers) and the other part consisting of relations between the various entities or types of entities (for example, the supply relation). This distinction is difficult to maintain when one may have foreign keys in any relation whatsoever. In the user’s relational model there appears to be no advantage to making such a distinction (there may be some advantage, however, when one applies relational concepts to machine representations of the user’s set of relationships).

이전 연구들에서는 데이터 뱅크의 데이터를 두 부분으로 나누어 다루는 경향이 강했습니다. 한 부분은 개체 설명(예: 공급업체에 대한 설명)으로 구성되고, 다른 부분은 다양한 개체들 또는 개체 유형들 간의 관계(예: supply 관계)로 구성됩니다. 그러나 어떤 관계에서든 외래 키가 존재할 수 있다는 점에서 이러한 구분을 유지하기는 어렵습니다. 사용자의 관계형 모델에서는 이러한 구분을 두는 것이 특별히 유리해 보이지 않습니다(다만 사용자의 관계 집합에 대한 기계적 표현에 관계형 개념을 적용할 때는 어느 정도 이점이 있을 수 있습니다).

>
So far, we have discussed examples of relations which are defined on simple domains-domains whose elements are atomic (nondecomposable) values. Nonatomic values can be discussed within the relational framework. Thus, some domains may have relations as elements. These relations may, in turn, be defined on nonsimple domains, and so on. For example, one of the domains on which the relation employee is defined might be salary history. An element of the salary history domain is a binary relation defined on the domain date and the domain salary. The salary history domain is the set of all such binary relations. At any instant of time there are as many instances of the salary history relation in the data bank as there are employees. In contrast, there is only one instance of the employee relation.

지금까지 우리는 단순 도메인(원소가 원자적(분해 불가능한) 값인 도메인)에 정의된 관계의 예시들을 논의했습니다. 관계형 프레임워크 내에서 비원자적 값도 논의될 수 있습니다. 따라서 일부 도메인은 관계를 원소로 가질 수 있습니다. 이러한 관계들은 다시 비단순 도메인에 정의될 수 있으며, 이는 계속 이어질 수 있습니다. 예를 들어, employee 관계가 정의된 도메인 중 하나가 급여 이력일 수 있습니다. 급여 이력 도메인의 원소는 날짜 도메인과 급여 도메인에 정의된 이진 관계입니다. 급여 이력 도메인은 이러한 모든 이진 관계의 집합입니다. 어느 시점에서든 데이터 뱅크에는 직원 수만큼의 급여 이력 관계 인스턴스가 존재합니다. 반면에 employee 관계의 인스턴스는 단 하나만 존재합니다.

>
The terms attribute and repeating group in present data base terminology are roughly analogous to simple domain and nonsimple domain, respectively. Much of the confusion in present terminology is due to failure to distinguish between type and instance (as in “record”) and between components of a user model of the data on the one hand and their machine representation counterparts on the other hand (again, we cite “record” as an example).

현재 데이터베이스 용어에서 속성(attribute)과 반복 그룹(repeating group)은 각각 단순 도메인과 비단순 도메인에 대략적으로 대응됩니다. 현재 용어의 많은 혼란은 유형과 인스턴스를 구분하지 못하는 것("레코드"의 경우처럼)과, 데이터에 대한 사용자 모델의 구성 요소들과 이에 대응되는 기계적 표현을 구분하지 못하는 것(다시 한 번 "레코드"를 예로 들 수 있음)에서 비롯됩니다.

#### 1.4. NORMAL FORM

1.4. 정규형

>
A relation whose domains are all simple can be represented in storage by a two-dimensional column-homogeneous array of the kind discussed above. Some more complicated data structure is necessary for a relation with one or more nonsimple domains. For this reason (and others to be cited below) the possibility of eliminating nonsimple domains appears worth investigating. <sup>4</sup> There is, in fact, a very simple elimination procedure, which we shall call normalization.
>
<sup>4</sup> M. E. Sanko of IBM, San Jose, independently recognized the desirability of eliminating nonsimple domains.

단순한 관계를 갖는 모든 도메인은 앞서 논의한 것과 같은 열-동질적인 2차원 배열로 저장소에 표현될 수 있습니다. 그러나 하나 이상의 비단순 도메인을 가진 관계의 경우에는 더 복잡한 데이터 구조가 필요합니다. 이러한 이유로(그리고 이후에 설명할 다른 이유들로 인해) 비단순 도메인을 제거할 수 있는 가능성을 조사해볼 가치가 있습니다.<sup>4</sup> 실제로 정규화라고 부를 매우 간단한 제거 절차가 있습니다.

<sup>4</sup> IBM 산호세의 M. E. Sanko도 독립적으로 비단순 도메인을 제거하는 것이 바람직하다는 점을 인식한 바 있다.

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

<span/>

>
Normalization proceeds as follows. Starting with the relation at the top of the tree, take its primary key and expand each of the immediately subordinate relations by inserting this primary key domain or domain combination. The primary key of each expanded relation consists of the primary key before expansion augmented by the primary key copied down from the parent relation. Now, strike out from the parent relation all nonsimple domains, remove the top node of the tree, and repeat the same sequence of operations on each remaining subtree.

정규화는 다음과 같이 진행됩니다. 트리의 최상위 관계에서 시작하여, 그것의 기본 키를 가져와서 직접 종속된 각 관계들을 이 기본 키 도메인 또는 도메인 조합을 삽입하여 확장합니다. 확장된 각 관계의 기본 키는 확장 전의 기본 키에 상위 관계에서 복사해 온 기본 키를 추가한 것으로 구성됩니다. 이제 상위 관계에서 모든 비단순 도메인을 제거하고, 트리의 최상위 노드를 제거한 다음, 남아있는 각 서브트리에 대해 동일한 연산 순서를 반복합니다.

>
The result of normalizing the collection of relations in Figure 3 (a) is the collection in Figure 3 (b). The primary key of each relation is italicized to show how such keys are expanded by the normalization.

그림 3 (a)의 관계 집합을 정규화한 결과가 그림 3 (b)의 집합입니다. 각 관계의 기본 키는 정규화에 의해 키가 어떻게 확장되는지 보여주기 위해 이탤릭체로 표시되어 있습니다.

>
If normalization as described above is to be applicable, the unnormalized collection of relations must satisfy the following conditions :
>
- (1) The graph of interrelationships of the nonsimple domains is a collection of trees.
- (2) No primary key has a component domain which is nonsimple.

위에서 설명한 정규화가 적용되기 위해서는, 비정규화된 관계들의 집합이 다음 조건들을 만족해야 합니다:

- (1) 비단순 도메인들의 상호 관계를 나타내는 그래프가 트리들의 집합이어야 합니다.
- (2) 어떤 기본 키도 비단순 도메인을 구성 요소로 가지면 안 됩니다.

>
The writer knows of no application which would require any relaxation of these conditions. Further operations of a normalizing kind are possible. These are not discussed in this paper.

본 저자는 이러한 조건들의 완화가 필요한 어떤 응용 사례도 알지 못합니다. 정규화와 관련된 추가적인 연산들이 가능합니다. 이것들은 이 논문에서는 다루지 않습니다.

>
The simplicity of the array representation which becomes feasible when all relations are cast in normal form is not only an advantage for storage purposes but also for communication of bulk data between systems which use widely different representations of the data. The communication form would be a suitably compressed version of the array representation and would have the following advantages:
- (1) It would be devoid of pointers (address-valued or displacement-valued ).
- (2) It would avoid all dependence on hash addressing schemes.
- (3) It would contain no indices or ordering lists.

모든 관계가 정규형으로 변환되었을 때 가능해지는 배열 표현의 단순성은 저장 목적에서뿐만 아니라, 매우 다른 데이터 표현 방식을 사용하는 시스템들 간의 대량 데이터 통신에서도 장점이 됩니다. 통신 형식은 배열 표현을 적절히 압축한 버전이 될 것이며 다음과 같은 장점들을 가질 것입니다.

(1) 포인터(주소값 또는 변위값)가 없을 것입니다.
(2) 해시 주소 지정 방식에 대한 모든 의존성을 피할 수 있을 것입니다.
(3) 인덱스나 정렬 리스트를 포함하지 않을 것입니다.

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

>
The adoption of a relational model of data, as described above, permits the development of a universal data sub-language based on an applied predicate calculus. A first-order predicate calculus suffices if the collection of relations is in normal form. Such a language would provide a yardstick of linguistic power for all other proposed data languages, and would itself be a strong candidate for embedding (with appropriate syntactic modification) in a variety of host Ianguages (programming, command- or problem-oriented). While it is not the purpose of this paper to describe such a language in detail, its salient features would be as follows.

위에서 설명한 관계형 데이터 모델의 채택은 술어 논리학을 응용한 보편적 데이터 하위 언어의 개발을 가능하게 합니다. 관계들의 집합이 정규형이라면 일차 술어 논리학으로 충분합니다. 이러한 언어는 다른 모든 제안된 데이터 언어들의 언어적 능력을 측정하는 기준이 될 것이며, 그 자체로 다양한 호스트 언어들(프로그래밍, 명령어 또는 문제 지향적)에 (적절한 구문 수정과 함께) 내장되기 위한 유력한 후보가 될 것입니다. 이 논문의 목적이 그러한 언어를 상세히 설명하는 것은 아니지만, 그것의 두드러진 특징들은 다음과 같을 것입니다.

>
Let us denote the data sublanguage by R and the host language by H. R permits the declaration of relations and their domains. Each declaration of a relation identifies the primary key for that relation. Declared relations are added to the system catalog for use by any members of the user community who have appropriate authorization. H permits supporting declarations which indicate, perhaps less permanently, how these relations are represented in storage. R permits the specification for retrieval of any subset of data from the data bank. Action on such a retrieval request is subject to security constraints.

데이터 하위 언어를 R로, 호스트 언어를 H로 표기하겠습니다. R은 관계들과 그들의 도메인을 선언하는 것을 허용합니다. 각 관계의 선언은 해당 관계의 기본 키를 식별합니다. 선언된 관계들은 적절한 권한을 가진 사용자 커뮤니티의 모든 구성원들이 사용할 수 있도록 시스템 카탈로그에 추가됩니다. H는 이러한 관계들이 저장소에서 어떻게 표현되는지를 나타내는, 아마도 덜 영구적인, 지원 선언들을 허용합니다. R은 데이터 뱅크로부터 어떤 데이터의 부분집합이라도 검색하도록 명세하는 것을 허용합니다. 이러한 검색 요청에 대한 동작은 보안 제약조건들의 적용을 받습니다.

>
The universality of the data sublanguage lies in its descriptive ability (not its computing ability). In a large data bank each subset of the data has a very large number of possible (and sensible) descriptions, even when we assume (as we do) that there is only a finite set of function subroutines to which the system has access for use in qualifying data for retrieval. Thus, the class of qualification expressions which can be used in a set specification must have the descriptive power of the class of well-formed formulas of an applied predicate calculus. It is well known that to preserve this descriptive power it is unnecessary to express (in whatever syntax is chosen) every formula of the selected predicate calculus. For example, just those in prenex normal form are adequate [9].

데이터 하위 언어의 보편성은 그것의 (계산적 능력이 아니라) 기술(descriptive) 능력에 있습니다. 대규모 데이터 뱅크에서 데이터의 각 부분집합은 매우 많은 수의 가능한(그리고 의미 있는) 기술 방식들을 가지고 있습니다. 이는 검색을 위한 데이터 한정에 사용할 수 있도록 시스템이 접근 가능한 함수 서브루틴들의 집합이 유한하다고 가정하더라도(우리가 그렇게 하는 것처럼) 그렇습니다. 따라서, 집합 명세에 사용될 수 있는 한정 표현식들의 부류는 응용 술어 논리학의 잘 구성된 공식들의 부류가 가진 기술적 능력을 가져야 합니다. 이러한 기술적 능력을 보존하기 위해서는 선택된 술어 논리학의 모든 공식을 (어떤 구문이 선택되든) 표현할 필요가 없다는 것은 잘 알려져 있습니다. 예를 들어, 전치 정규형(prenex normal form)에 있는 것들만으로도 충분합니다[9].

>
Arithmetic functions may be needed in the qualification or other parts of retrieval statements. Such functions can be defined in H and invoked in R.

산술 함수들은 검색문의 한정 부분이나 다른 부분들에서 필요할 수 있습니다. 이러한 함수들은 H에서 정의되고 R에서 호출될 수 있습니다.

>
A set so specified may be fetched for query purposes only, or it may be held for possible changes. Insertions take the form of adding new elements to declared relations without regard to any ordering that may be present in their machine representation. Deletions which are effective for the community (as opposed to the individual user or sub-communities) take the form of removing elements from declared relations. Some deletions and updates may be triggered by others, if deletion and update dependencies between specified relations are declared in R.

이렇게 명세된 집합은 질의 목적으로만 가져올 수도 있고, 또는 가능한 변경을 위해 보유될 수도 있습니다. 삽입은 기계 표현에 존재할 수 있는 어떤 순서와도 무관하게 선언된 관계들에 새로운 원소들을 추가하는 형태를 취합니다. (개별 사용자나 하위 커뮤니티가 아닌) 전체 커뮤니티에 대해 유효한 삭제는 선언된 관계들로부터 원소들을 제거하는 형태를 취합니다. 일부 삭제와 갱신은 다른 것들에 의해 촉발될 수 있는데, 이는 지정된 관계들 간의 삭제 및 갱신 의존성이 R에서 선언된 경우입니다.

>
One important effect that the view adopted toward data has on the language used to retrieve it is in the naming of data elements and sets. Some aspects of this have been discussed in the previous section. With the usual network view, users will often be burdened with coining and using more relation names than are absolutely necessary, since names are associated with paths (or path types) rather than with relations.

데이터를 바라보는 관점이 데이터를 검색하는 데 사용되는 언어에 미치는 한 가지 중요한 영향은 데이터 원소들과 집합들의 명명에 있습니다. 이러한 측면들의 일부는 이전 절에서 논의되었습니다. 통상적인 네트워크 관점에서는, 이름들이 관계가 아닌 경로들(또는 경로 유형들)과 연관되어 있기 때문에, 사용자들은 종종 절대적으로 필요한 것보다 더 많은 관계 이름들을 만들고 사용해야 하는 부담을 지게 될 것입니다.

>
Once a user is aware that a certain relation is stored, he will expect to be able to exploit<sup>5</sup> it using any combination of its arguments as “knowns” and the remaining arguments as “unknowns,” because the information (like Everest) is there. This is a system feature (missing from many current informat.ion systems) which we shall call (logically) symmetric expZoitation of relations. Naturally, symmetry in performance is not to be expected.
>
<sup>5</sup> Exploiting a relation includes query, update, and delete.

일단 사용자가 특정 관계가 저장되어 있다는 것을 알게 되면, 그는 그 관계의 인자들의 어떤 조합이든 "알려진 것들"로, 그리고 나머지 인자들을 "알려지지 않은 것들"로 사용하여 그것을 활용<sup>5</sup>할 수 있기를 기대할 것입니다. 왜냐하면 그 정보는 (에베레스트 산처럼) 거기에 있기 때문입니다. 이것은 (많은 현재의 정보 시스템들에서 누락된) 시스템 특징으로, 우리는 이것을 관계들의 (논리적으로) 대칭적 활용이라고 부를 것입니다. 당연히, 성능에서의 대칭성은 기대할 수 없습니다.

<sup>5</sup> 관계의 활용에는 질의, 갱신, 삭제가 포함됩니다.

>
To support symmetric exploitation of a single binary relation, two directed paths are needed. For a relation of degree n, the number of paths to be named and controlled is n factorial.

단일 이항 관계의 대칭적 활용을 지원하기 위해서는 두 개의 방향성 있는 경로들이 필요합니다. 차수가 n인 관계의 경우, 이름을 지정하고 제어해야 하는 경로들의 수는 n 팩토리얼입니다.

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

