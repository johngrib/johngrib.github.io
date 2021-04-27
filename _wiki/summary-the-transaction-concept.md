---
layout  : wiki
title   : (요약) The Transaction Concept - Virtues and Limitations by Jim Gray, June 1981
summary : 짐 그레이의 트랜잭션 컨셉 요약
date    : 2021-04-25 14:44:36 +0900
updated : 2021-04-27 22:47:13 +0900
tag     : jim-gray transaction
toc     : true
public  : false
parent  : [[summary]]
latex   : true
---
* TOC
{:toc}

## 개요

이 개요는 내 편의대로 요약한 것이므로, 정확한 내용은 원문을 참고할 것.

...

## 요약

원문을 다음 링크에서 다운로드 받아 읽을 수 있다.

- The Transaction Concept: Virtues and Limitations by Jim Gray 1981
    - [PDF]( http://jimgray.azurewebsites.net/papers/thetransactionconcept.pdf )

### ABSTRACT

**개요**

트랜잭션은 세 가지 속성을 갖는 상태 변환을 의미한다.
- 원자성(all or nothing)
- 지속성(effects survive failures)
- 일관성(a correct transformation)

트랜잭션 개념은 데이터 관리 애플리케이션 구조화의 핵심이며, 이 개념은 일반적인 프로그래밍 체계에 적용할 수 있다.

- 이 논문은 트랜잭션 개념을 다시 설명하고 다양한 관점에서의 구현을 논의한다.
- 그러고 나서 추가적인 연구가 필요한 일부 영역을 설명할 것이다.
    1. 추상 데이터 유형 개념과 트랜잭션 개념의 통합.
    2. 트랜잭션이 하위 트랜잭션으로 구성되도록 허용하는 몇 가지 기술.
    3. 극단적으로 긴 시간(몇일, 몇 달 단위)동안 지속되는 트랜잭션의 처리.

### INTRODUCTION: What is a transaction?

**들어가며: 트랜잭션이란 무엇인가?**

트랜잭션 개념은 계약 규칙(contract law)에서 비롯된다.

- 계약을 맺을 때: 둘 이상의 당사자가 잠시 협상(negotiate)을 한 다음 거래(deal)를 한다.
- 거래: 문서의 공동 서명이나 다른 합의 행위(악수나 고개를 끄덕이는 등)에 의해 구속력이 있다.
- 만약 당사자들이 서로를 의심하거나, 안전한 거래를 원할 경우 중개자(intermediary)를 지정한다.
    - 이 중재자를 에스크로 담당자(escrow officer)라 부른다.

기독교식 결혼식은 그러한 계약의 좋은 예이다.

- 신부와 신랑은 몇일 ~ 몇년동안 협상을 한 다음, 결혼식을 진행할 목사를 임명한다.
- 목사는 가장 먼저 결혼식 하객들에게 결혼식에 반대하는 사람이 있는지를 묻는다.
- 목사는 그 다음으로 신부와 신랑에게 결혼에 동의하는지 물어본다.
- 신부와 신랑이 모두 동의하면, 목사는 두 사람이 부부가 되었음을 선언한다.

물론 계약은 단순한 약속의 일종이다. 따라서 개인이 마음먹고 규칙(법)을 위반하려 한다면 계약도 어길 수 있다.
- 그러나 법의 테두리 안에서 계약(transaction)은 처음부터 불법적으로 성사된 경우에만 해지될 수 있다.
- 잘못된 계약의 조정은 추가적인 보상 거래(법적 보상 포함)를 통해 이루어지게 된다.

트랜잭션 개념은 다음의 속성들로 나타낼 수 있다.

- 일관성(Consistency): 트랜잭션은 적법한 프로토콜을 따라야 한다.
- 원자성(Atomicity): 발생하거나 발생하지 않아야 한다. 계약에 모든 것이 구속되거나, 전혀 그렇지 않거나 해야 한다.
- 지속성(Durability): 일단 트랜잭션이 확정되면(committed), 취소할 수 없다.

### A GENERAL MODEL OF TRANSACTIONS

**일반적인 트랜잭션 모델**

트랜잭션 개념을 컴퓨터 과학 영역에 적용해보자. 우리 주변에서 볼 수 있는 대부분의 트랜잭션(은행, 자동차 렌탈, 식료품 구매)을 컴퓨터에 반영해 보면 시스템 상태 변환 과정이라는 것을 알 수 있다.

- 시스템 상태는 변경 가능한 값을 가진 장치와 레코드들로 구성된다.
- 시스템 상태에는 레코드 값 및 허용된 값 변환에 대한 단언(assertions)이 포함된다.
    - 이러한 단언을 시스템 일관성 제약이라 부른다.
- 시스템은 기록과 장치의 값을 읽고 변환하는 작업을 제공한다.
- 상태의 일관된 변환을 구성하는 작업 모음을 그룹화해서 하나의 트랜잭션을 형성할 수 있다.
- 트랜잭션은 시스템 일관성 제약을 보존한다.
    - 즉, 일관성있는 상태를 새로운 일관성 있는 상태로 변환하는 방식을 통해 규칙을 준수한다.
- 트랜잭션은 원자적이고 지속성이 있어야 한다.
    - 모든 작업이 수행된 이후에는 트랜잭션이 커밋되거나, 트랜잭션의 효과가 유지되지 않고 취소되었거나 둘 중의 하나여야 한다.

무시되어야 하는 작업이나 취소할 수 없는 작업 등을 설명하기 위해 몇 가지 개념을 더 추가하자.

>
- Unprotected: the action need not be undone or redone if the transaction must be aborted or the entity value needs to be reconstructed.
- Protected: the action can and must be undone or redone if the transaction must be aborted or if the entity value needs to be reconstructed.
- Real: once done, the action cannot be undone.

- Unprotected: 트랜잭션을 중단해야 하거나 엔티티 값을 재구성해야 하는 경우에도 작업을 실행 취소하거나 다시 실행할 필요가 없음.
- Protected: 트랜잭션을 중단해야 하거나 엔티티 값을 재구성해야 하는 경우라면 작업을 실행 취소하거나 다시 실행할 수 있음.
- Real: 일단 완료되면 작업을 취소할 수 없음.

이에 대해 다음과 같이 예를 들 수 있다.
- Unprotected: 임시 파일에 대한 작업이나 중간 메시지 전송.
- Protected: 일반적인 데이터베이스 및 메시지 작업.
- Real: 실제 존재하는 장치들(현금 지급기, 비행기 날개)에 대한 거래 약속 및 운영.

각각의 트랜잭션은 "커밋" 또는 "취소"라는 둘 중 하나의 결과를 내며 종료된다.

- 커밋된 트랜잭션의 모든 protected 또는 real 작업은 실패가 발생한 경우에도 계속 유지된다.
- 그러나 중단된(aborted) 트랜잭션의 protected 또는 real 작업의 영향은 다른 트랜잭션에서는 볼 수 없다.

일단 트랜잭션이 커밋되면, 다른 추가 트랜잭션을 실행해야지만 그 결과를 변경할 수 있다. 예를 들어 보자.

- 누군가가 돈을 부족하게 받았다면, 이에 대한 수정 조치는 부족한 만큼의 추가 금액을 지불하는 다른 트랜잭션을 실행하는 것이다.
- 이러한 사후 거래(post facto transactions)를 보상 거래(compensating transactions)라고 한다.


간단한 트랜잭션과 복잡한 트랜잭션.

- 간단한 트랜잭션은 한 줄로 이어지는 일련(linear sequence)의 작업들이다.
- 복잡한 트랜잭션은 내부에서 동시성 처리를 해야 할 수 있다.
    - 작업 그룹과의 의존성 때문에, 특정 한 작업의 초기화는 작업 그룹의 작업 결과에 따라 달라질 수 있다.
- 이러한 트랜잭션은 트랜잭션이 중첩(nested)된 것처럼 보이지만 중첩된 트랜잭션의 효과는 트랜잭션의 다른 부분에서만 볼 수 있다.

![image]( /post-img/summary-the-transaction-concept/115991313-c6c6e100-a602-11eb-8fb5-f39d555c5b49.png )

- 그림 1
    - T1: 간단한 일련의 작업.
    - T2: 병렬성과 트랜잭션 중첩이 있는 복잡한 트랜잭션.


### NonStop™: Making failures rare

**NonStop™: 실패를 거의 발생시키지 않기**

트랜잭션의 원자성과 지속성을 얻는 한 가지 방법은 절대로 실패하지 않는 완벽한 시스템을 구축하는 것이다.

다음과 같이 가정해 보자.

- 만약 당신이 실패한 적이 없는 완벽한 하드웨어와 할 일을 정확히 수행해온 소프트웨어를 만들어냈다고 하자.
- 이 시스템은 매우 인기있을 것이고 모든 거래는 항상 성공할 것이다.
- 그러나 이 시스템은 가끔 실패할 수도 있는데, 그 이유는 다음과 같다.
    - 시스템을 자신의 환경에 맞게 조정하는 사람이 실수(애플리케이션 프로그래밍 에러)를 저지른다.
    - 시스템을 운영하는 사람이 실수(데이터 입력이나 절차상의 에러)를 저지른다.
- 매우 신중하게 관리한다 해도 이 시스템은 몇 개월이나 몇 년마다 실패하는 일이 발생할 것이다.
    - 데이터 입력 오류나 인증 오류 등의 이유로 100번 중 한 번 이상은 트랜잭션이 실패할 것이다.

이에 대해 두 가지 결론을 내릴 수 있다.

1. 완벽한 시스템을 만들 필요는 없다. 천 년에 한 번 실패하는 정도로도 충분히 괜찮다.
2. 시스템이 완벽하다 할지라도, 데이터 입력 오류/자금 부족/운영자에 의한 취소/시간 초과 등으로 인해 일부 트랜잭션은 취소(abort)되게 되어 있다.

이 섹션에서는 "거의 완벽한" 시스템을 위한 기술(techniques)과 트랜잭션 처리와의 관계를 설명한다.

- 불완전성은 여러 가지 형태로 드러난다.
    - 하나의 시스템은 설계 오류나 기계 장치 오류 때문에 실패할 수 있다.
    - 오류는 사용자가 볼 수 있는 형태로 나타날 수도 있고, 검사기가 실패를 감지하여 사용자에게 보여줄 수도 있다.
- 하나의 시스템이 잘못된 작업을 수행한다면(오류가 발생했는데 감지하지 못했다면) 신뢰할 수 없는(unreliable) 시스템이다.
- 하나의 시스템이 주어진 시간 제한 내에 올바른 작업을 수행하지 않으면 가용하지 않은(unavailable) 시스템이다.
- 분명한 것은, 높은 가용성(availability)이 높은 신뢰성(reliability)보다 달성하기 어렵다는 것이다.
    - (위의 완벽한 시스템의 예를 떠올려 보자)

존 폰 노이만은 신뢰할 수 없는 구성 요소들(unreliable components)을 사용해 매우 신뢰할 수 있고(very reliable), 가용성 있는(available) 시스템을 구축할 수 있다는 것을 관찰한 바 있다. 폰 노이만의 아이디어는 다음과 같다.

- 수십년 동안 평균 무고장 시간(mean-times-to-failure)을 측정하기 위해 거대한 규모에서 다수결 함수(majority logic)를 중복해 사용한다.
    - 거대한 규모: 1개의 회선을 위해 20000개의 회선을 연결.
- 폰 노이만은 평균 고장 발생 횟수를 며칠 단위로 측정했다.
- 엄청나게 많이 사용되고 있는 시스템에 쓰인 뉴런과 진공관의 관점에서 생각했다.
- 또한 폰 노이만의 모델은 민감한 편이어서 하나의 실패만 발생해도 전체 체인을 망가뜨릴 수 있었다.


다행히도 컴퓨터 시스템은 매우 긴 기간의 평균 무고장 시간을 얻기 위해 (폰 노이만이 고려한 것과 같은) 20000개씩이나 되는 중복 요소가 필요하지 않다.

- 폰 노이만의 신경망과 달리 컴퓨터 시스템은 모듈화된 계층 구조로 이루어져 있고, 각각의 모듈은 자체 검사 기능이 있다.
    - 따라서 각 모듈은 올바르게 작동하거나, 스스로 오류를 감지하여 아무것도 하지 않는다.
    - 이러한 모듈을 **Fail-fast**라고 한다.
- 프로세서 및 메모리와 같은 Fail-fast 컴퓨터 모듈은 몇 개월 단위로 측정된 평균 무고장 시간을 달성해낸다.
- 비교적 적은 수의 모듈이 시스템을 구성하기 때문에(보통 100개 미만) 시스템 안정성을 향상시키기 위해서는 매우 제한된 중복성이 필요하다.

이 말의 의미를 알기 위해 간단하게 디스크의 경우를 생각해 보자.

- 일반적인 디스크는 약 1년에 한 번 고장난다. 고장은 디스크 표면의 불량한 지점이나, 회전축의 물리적 오류, 또는 디스크 경로상의 전기적 오류로 인해 발생한다.
- 디스크 하나를 고치거나 교체할 예비 디스크를 가져오는 데에는 약 1 시간이 걸린다.
- 만약 디스크가 이중화(미러링)되어 있고 독립적으로 실패한다면, 디스크 쌍이 둘 다 한꺼번에 다운되는 것은 약 3천년에 한 번이다.
- 좀 더 현실적으로는 평균 무고장 시간은 800년 정도이다.
- 따라서 8쌍의 디스크가 있는 시스템은 약 100년에 한 번 정도는 디스크 쌍 하나를 사용할 수 없다.
    - 만약 미러링이 없다면 동일한 시스템에서 1년에 약 8번 정도는 디스크를 사용할 수 없다.


1960년대 후반부터 이중화 디스크가 사용되었지만, 오랜 시간이 지나고 나서야 이 경험을 다음과 같이 일반화할 수 있었다.

- 모듈의 평균 무고장 시간은 개월 단위로 즉정된다.
- 모듈은 fail-fast 하게 만들 수 있다.
- 예비 모듈은 몇 초 또는 몇 분으로 측정된 평균 수리 시간을 제공한다.
- 이러한 모듈을 이중화하면 몇 백년의 동안 평균 무고장 시간을 측정할 수 있을 것이다.

이러한 아이디어를 하드웨어와 소프트웨어 양쪽에 체계적으로 적용하면 매우 신뢰할 수 있고(highly reliable), 높은 가용성을 가진(highly available) 시스템을 만들 수 있다.


높은 가용성은 시스템 디자인 컨셉의 많은 면을 다시 생각하게 한다.

예를 들어 시스템 유지보수 문제를 생각할 수 있다.

- 시스템이 작동하는 동안 특정 컴포넌트를 시스템에 연결할 수 있어야 한다.
    - 하드웨어 레벨에서 보면, 이를 위해서는 주위에 고전압이 없고, 해당 컴포넌트가 고전압과 전압 변화를 견딜 수 있다는 것 등등등에 대해 Underwriters Laboratory의 승인을 받아야 한다.
    - 소프트웨어 레벨에서는 "SYSGEN"이 없으며, 시스템이 작동하는 동안 프로그램이나 데이터 구조를 교체할 수 없음을 의미한다.
- 이러한 것들은 대부분의 최신 시스템 디자인의 관점과는 차이가 있다.
    - (높은 가용성 중심의 관점이 새로운 관점이라는 의미)

지속적인 서비스를 제공하는 시스템의 상용 버전이 시장에 나타나기 시작했다.
- 아마도 가장 잘 알려진 것은 Tandem systems일 것이다(이 논문은 Tandem Computers에서 작성되었음을 염두에 두자).
    - Tandem은 고가용성을 확보하기 위한 접근법을 NonStop(Tandem 트레이드 마크)이라 부른다.
    - 이 시스템은 일반적으로 1 ~ 10년 사이의 무고장 시간을 갖고 있다.
- 하드웨어 레벨에서 모듈과 경로는 이중화되어 있으며, 모든 컴포넌트는 안정적이고(reliable), fail-fast하게 작동하도록 설계되었다.
- 소프트웨어 레벨에서 시스템은 메시지 기반 운영 체제로 구성된다. 그리고 각 프로세스에는 기본 프로세스 또는 지원 하드웨어가 실패할 경우 기본 프로세스를 계속 작동하는 백업 프로세스를 준비할 수 있다.


고가용성 시스템을 구축하는 것은 쉽지 않은 일이다.

- 이런 시스템에서 툴이 제공되지 않을 때 내결함성(fault-tolerant) 애플리케이션을 프로그래밍하는 것은 자명하지 않은(non-trivial) 일이다.
- 프라이머리 프로세스가 실패할 경우 백업 프로세스에 의한 테이크 오버가 매우 까다롭기 때문이다.
- 백업 프로세스는 실패를 다른 프로세스로 전파하지 않고 중단된 곳에서 작업을 계속 해야한다.


내결함성(fault-tolerant) 애플리케이션을 만들기 위한 한 가지 전략은 다음과 같다.

- 각 작업 이전에 프라이머리 프로세스의 상태를 백업 프로세스에 "체크포인트"하는 것이다.
- 프라이머리 프로세스가 실패하면 백업 프로세스는 프라이머리가 남겨둔 곳부터 대화를 진행하도록 한다.
- 이러한 이벤트에서 요청자(requestor)와 서버 프로세스 사이를 다시 동기화하는 것은 매우 예민한 일이다.


내결함성 애플리케이션을 만들기 위한 또다른 전략은 다음과 같다.

- 계산의 모든 프로세스를 트랜잭션으로 함께 수집하고, 실패가 발생할 때 모든 프로세스를 초기 트랜잭션 상태로 재설정하는 것이다.
- 실패가 발생하면 트랜잭션이 (저장 지점 또는 시작 지점으로) 실행 취소되고, 새 프로세스에 의해 해당 시점부터 작동한다.
- 트랜잭션 관리에서 제공하는 backout 및 재시작 기능은 애플리케이션 프로그래머에게 실패 또는 프로세스 중복 쌍에 대한 걱정을 덜어준다.


트랜잭션 개념을 구현하는 사람은 원시 프로세스 쌍 메커니즘(primitive process-pair mechanism)을 사용해야 하며, NonStop의 섬세한 능력을 다룰 수 있어야 한다.

- 그러나 그 구현 이후부터는 모든 프로그래머가 트랜잭션 메커니즘에 의존할 수 있으므로 내결함성 소프트웨어를 쉽게 작성할 수 있다.
- 이러한 시스템의 프로그램들은 `BEGIN-TRANSACTION`, `COMMIT-TRANSACTION` 및 `ABORT-TRANSACTION` 동사를 포함한다는 점을 빼고는 기존 시스템의 프로그램과 별반 다르지 않다.


트랜잭션 개념을 사용하면 다음과 같은 장점이 있다.

- 입력 데이터나 시스템 상태가 좋아 보이지 않을 때 애플리케이션 프로그래머가 트랜잭션을 중단하는 것이 가능하다. 
    - 이 기능은 트랜잭션을 취소하는 메커니즘이 이미 들어가 있으므로 추가 비용이 들어가지 않는다.
- 또한, 트랜잭션이 logging으로 구현되면 트랜잭션 관리자를 사용하여 이전 상태와 로그를 통해 시스템 상태를 재구축할 수 있다.
    - 이 기능 덕분에 여러 건의 실패가 발생하는 경우에도 트랜잭션의 지속성을 보장할 수 있다.

요약하자면 NonStop™ 기술은 컴퓨터 시스템의 고장률을 수십년 또는 수세기 단위로 측정되도록 할 수 있다.
- 실제의 시스템은 운영자 오류(약 1년에 1번)나 애플리케이션 프로그램 오류(약 1년에 여러 차례)로 인해 몇 개월 또는 몇 년 단위로 오류가 발생할 수 있다.
- 이는 이제 제조업체에서 제공하는 소프트웨어나 하드웨어의 문제가 아닌 시스템 안정성(reliability)의 주요 한계이다.


이 섹션에서는 내결함성 애플리케이션의 구현을 용이하게 하기 위한 트랜잭션 개념의 필요성을 보여주었다.

트랜잭션 개념을 구현하는 데에는 두 가지 상이한 접근 방법이 있다. 다음 섹션에서는 이 두 가지 접근 방법을 설명한다.
- 시간 도메인 주소 지정 방법.
- 로깅 및 잠금 방법.


두 가지 기술에 대해 미리 언급하자면, 다음과 같다.
- 로깅은 모든 객체의 현재 상태를 클러스터링하고, 이전 버전을 log라는 히스토리 파일로 기록해 둔다.
- 시간 도메인 주소 지정은 각 객체의 전체 기록(모든 버전)을 객체와 함께 클러스터링 한다.

두 방법은 각각의 장점을 갖고 있다.

### UPDATE IN PLACE: A poison apple?

**덮어쓰기 업데이트는 독이 든 사과인가?**

점토판이나 종이로 된 회계 장부에 기록을 하던 회계사들은 몇 가지 괜찮은 규칙을 개발했다.
- 그런 기본 규칙 중 하나는, 자체적인 점검이 가능해서 계산이 빠르게 실패하도록 하는 복식 부기(double-entry bookkeeping)이다.
- 두 번째 규칙은 장부 기록(books)을 절대 수정하지 않는다는 것이다.
    - 오류가 발생하면 (지우고 다시 쓰는 것이 아니라) 주석을 추가하고, 장부에 새로운 보상 항목을 작성한다.
    - 이를 통해 기록은 비즈니스 거래의 완전한 히스토리가 된다.


최초의 컴퓨터 시스템은 이러한 규칙을 따랐다.
- 부기(bookkeeping) 항목은 천공 카드나 테이프에 기록되었다.
    - 한번의 실행으로 이전 마스터와 해당 일의 활동을 가져올 수 있다.
    - 그리고 그 결과는 새로운 마스터가 되며, 이전 마스터는 업데이트되지 않는다.
- 이런 방식은 회계 관행에서 가져온 것이기도 했지만, 천공 카드와 테이프의 기술적인 측면에서 비롯된 것이기도 했다.
    - 새 테이프에 쓰는 것이 기존 테이프에 다시 쓰는 것보다 쉬웠기 때문이다.


디스크나 드럼 같은 직접 엑세스 스토리지(direct access storage)가 출현하며 이러한 상황이 바뀌었다.
- 파일의 일부만 업데이트하는 것이 가능해진 것이다.
- 한 부분을 업데이트할 때 전체 디스크를 복사하는 것보다, 새 마스터를 구성하기 위해 변경한 부분만 업데이트하는 것이 꽤 매력적으로 느껴졌다.
- 이러한 기술 중 몇몇은, 특히 사이드 파일이나 변경(differential) 파일들은 이전 마스터를 업데이트하지 않았으므로 회계사들의 좋은 규칙을 따른 것이라 할 수 있었다.
- 그러나 대부분의 디스크 기반 시스템은 성능상의 이유로 덮어쓰는 업데이트(update in place)라는 유혹에 시달리게 되었다.

### TIME-DOMAIN ADDRESSING: One solution

8페이지.

덮어쓰기 방식의 업데이트는 많은 시스템 설계자들에게 수백년간 지켜져온 회계 관행을 위반하는 크나큰 잘못으로 여겨진다.

- 객체가 변경되지 않는 시스템에 대해서는 다양한 제안 사항이 있다.
    - 각 객체는 시간 기록을 갖고 있고, 객체의 주소는 단순한 이름이 아니라 `<name, time>`과 같이 된다.
    - 이러한 시스템에서 객체는 "업데이트"되지 않으며, 추가 정보를 얻기 위해 "진화(evolved)"된다.
    - 객체 진화는 새 값을 생성하고, 현재 값(시간)을 추가하는 작업으로 구성된다.
    - 이전 값은 사라지지 않고 계속 존재하며, 특정 시간을 지정하는 방식으로 주소를 지정해 찾아낼 수 있다.
- 이러한 시스템을 "시간 도메인 주소 지정(time-domain addressing)" 또는 "버전 지향 시스템(version-oriented systems)"이라 부른다.
    - 어떤 사람들은 이를 불변 객체 시스템(immutable object systems)이라 부르기도 하는데, 나(짐 그레이)는 객체는 시간이 지남에 따라 값이 변화하기 때문에 잘못된 이름이라 생각한다.


Davies와 Bjork는 time domain addressing의 구현으로 각 엔티티가 값의 시간 시퀀스를 갖는 "일반 원장(general ledger)" 방식을 제안했다.

- 이 방식은 단순히 값을 보관하고 있을 뿐만 아니라 의존성이 있는 연결구조(chain of dependencies)를 유지한다.
    - 이렇게 하면 오류가 발견되면 보상 트랜잭션이 실행될 수 있고, 오류 데이터에 의존하는 각각의 트랜잭션에 새 값을 전파할 수 있다.
    - 그러나 이러한 시스템의 내부 부기와 예상된 성능 저하는 실망스러웠음.
    - Newcastle 대학의 Graham Wood는 이 방식을 사용하면 의존성 정보가 기하 급수적으로 증가한다는 것을 보였다.


Dave Reed는 time-domain addressing 방식에 기반한 트랜잭션 시스템에 대한 가장 완벽한 제안을 했다.

- Reed의 제안에서 엔티티 `E`는 일정 기간 동안 유효한 값 `Vi`의 집합을 갖고 있다.
- 예를 들어 엔티티 `E`와 그 값의 히스토리는 다음과 같이 표현할 수 있다.

$$
E: < V0, [T0, T1) >, <V1, [T1, T2)>, <V2, [T2,*)>
$$

`E`의 의미는 다음과 같다.
- 시간 `T0` 부터 `T1`까지 `E`는 `V0` 값을 갖는다.
- 시간 `T1` 부터 `T2`까지 `E`는 `V1` 값을 갖는다.
- 시간 `T2` 부터 `E`는 `V2` 값을 가지며, 이것이 현재 값이다.

각 트랜잭션에는 고유한 실행시간이 할당되고, 모든 읽기/쓰기는 해당 시간과 관련하여 해석된다.
- 엔티티 `E`를 읽을 때 시간이 `T3`라면 그 트랜잭션은 해당하는 시간의 엔티티의 값을 얻게 될 것이다.
- 위의 예에서 `T3 > T2`이면, `V2` 값은 `[T2, T3)` 기간 동안 유효하게 된다.
- 시간 `T3`일 때 값 `V3`를 엔티티 `E`에 쓰는 트랜잭션은 새로운 시간 간격(time interval)을 시작하는 것이다.

$$
E: <V0, [T0, T1)>, <V1, [T1, T2)>,<V2, [T2, T3)>,<V3, [T3,*)>
$$

만약 $$ T2 \ge T3 $$ 이면, 이 트랜잭션은 취소된다. 과거 히스토리를 덮어쓰는 것이 되기 때문이다.

트랜잭션 쓰기는 커밋 레코드에 따라 달라진다.

- 트랜잭션을 커밋하게 되면, 시스템은 트랜잭션의 모든 업데이트의 유효성을 검사한다.
- 트랜잭션을 중단하게 되면, 시스템은 업데이트를 무효화한다.
- 커밋 또는 중단 둘 중 하나의 결과가 나오면 트랜잭션 결과를 브로드캐스팅한다.

이것이 바로 Reed의 제안을 간단히 설명한 것이다.
- 전체 설명에는 중첩 트랜잭션(nested transaction)을 포함해 다른 여러 기능들이 들어 있다.
- Reed는 글로벌한 시계 구현의 어려움을 회피하기 위해 "실제 시간"이 아니라 "의사 시간"을 사용한다.

![image]( /post-img/summary-the-transaction-concept/116098727-42e62500-a6e6-11eb-9107-97abd4752cbc.png )

그림 2. 객체 E의 여러 버전들을 표현한 그림. 세 개의 커밋된 버전(committed version)과 하나의 요청된 버전(proposed version)이 그림에 나타나 있다. `V3` 버전이 커밋되거나 중단되면 커밋 레코드와 객체 헤더가 업데이트된다.

Reed는 이 방법이 동시성 제어 문제와 안전성 문제 모두에 대한 통합 솔루션이라는 것을 확인한다.
- 그리고 이 시스템은 애플리케이션으로 하여금 time-domain addressing의 모든 기능을 사용할 수 있게 해준다.
- "작년 말에 회계 장부가 어떻게 구성되어 있었습니까?" 같은 질문을 쉽게 할 수 있게 된다.

time-domain addressing에는 다음과 같은 단점들도 있다.

>
1. Reads are writes: reads advance the clock on an object and therefore update its header. This may increase L/O activity.
2. Waits are aborts: In most cases a locking system will cause conflicts to result in one process waiting for another. In time-domain systems, conflicts abort the writer. This may preclude long-running “batch” transactions which do many updates.
3. Timestamps force a single granularity: reading a million records updates a million timestamps. A simple lock hierarchy allows sequential (whole file) and direct (single record) locking against the same data (at the same time).
4. Real operations and pseudo-time: If one reads or writes a real device, it is read at some real time or written at some real time (consider the rods of a nuclear reactor, or an automated teller machine which consumes and dispenses money). It is unclear how real time correlates with pseudo-time and how writes to real devices are modeled as versions.

1. 읽기를 할 때 쓰기가 발생한다: 읽는 행위가 객체의 시계를 앞당기므로 객체의 헤더가 업데이트된다. 이렇게 하면 L/O 활동이 증가할 수 있다.
2. 대기를 통한 중단: 대부분의 경우 잠금 시스템을 사용하면 충돌이 발생하게 되고, 하나의 프로세스가 다른 프로세스를 기다리게 된다. 시간 도메인 시스템에서 충돌이 발생하면 기록기를 중단시키게 된다. 이로 인해 많은 업데이트를 수행하는 오랜 시간 동안 돌아가는 "배치" 트랜잭션을 금지해야 할 수도 있다.
3. 타임스탬프는 단일 세분화를 강제한다: 백만 개의 레코드를 읽으면 백만 개의 타임스탬프가 업데이트된다. 단순 잠금 계층은 동일한 데이터에 대해 순차적(전체 파일) 또는 직접(단일 레코드) 잠금을 동시에 허용한다.
4. 실제 작업과 의사 시간: 실제 장치를 사용해 읽거나 쓰게 되면 실시간으로 읽고 기록하게 된다(원자로, 현금 자동 입출금기). 실시간과 의사 시간의 상관 관계 및 실제 장치에 대한 쓰기가 버전으로 모델링되는 방법은 명백하지 않다.

위의 목록에서 볼 수 있듯이, time-domain addressing 시스템 구현에 대한 모든 세부 사항이 해결된 것은 아니다.
이 개념은 유효하며, 마지막 문제를 제외한 모든 문제는 성능 문제이기 때문에 이런 시스템을 구축하려는 사람들이 해결하게 될 수도 있다. MIT와 Dave Reed와 동료들은 그런 시스템을 구축하려 노력하고 있다.

### LOGGING AND LOCKING: Another solution

**또 다른 방법: 로깅과 잠금**

Logging and locking are an alternative implementation of the transaction concept. The legendary Greeks, Ariadne and Theseus, invented logging. Ariadne gave Theseus a magic ball of string which he unraveled as he searched the Labyrinth for the Minotaur. Having slain the Minotaur, Theseus followed the string back to the entrance rather then remaining lost in the Labyrinth. This string was his log allowing him to undo the process of entering the Labyrinth. But the Minotaur was not a protected object so its death was not undone by Theseus' exit. 

로깅과 잠금은 트랜잭션 개념의 대안적인 구현이다.

- 로깅(logging)은 그리스 신화에 나오는 아리아드네와 테세우스가 발명한 것이다.
- 아리아드네는 미궁에서 미노타우로스를 찾기 위해 미궁을 탐색하려던 테세우스에게 마법의 실뭉치 공을 주었다.
- 미노타우로스를 죽인 테세우스는 미궁 안에서 길을 잃은 상태가 되었지만, 실을 따라 입구로 돌아갈 수 있었다.
- 즉, 실은 테세우스가 미궁에 들어간 과정을 취소할 수 있게끔 한 기록(log)이었던 것이다.
    - 물론 미노타우로스는 프로텍티드 객체(protected object)가 아니었기 때문에 죽음이 취소되지는 않았다.

Hansel and Gretel copied Theseus’ trick as they wandered into the woods in search of berries. They left behind a trail of crumbs that would allow them to retrace their steps by following the trail backwards, and would allow their parents to find them by following the trail forwards. This was the first undo and redo log. Unfortunately, a bird ate the crumbs and caused the first log failure. 

헨젤과 그레텔은 딸기를 찾아 숲 속을 헤매게 되었을 때 테세우스의 방법을 모방했다.
- 헨젤과 그레텔은 빵 조각을 바닥에 흘렸으므로, 그 흔적을 따라 되돌아갈 수 있었다.
    - 따라서 헨젤과 그레텔의 부모가 흔적을 따라 가면서 그들을 찾아낼 수 있게 했다.
- 이 방법은 최초의 실행 취소(undo)와 재실행(redo) 로그였던 것이다.
- 안타깝게도 그들이 흘린 빵조각은 새들이 먹었고, 최초의 로그 실패(log failure) 사례가 되었다.

![image]( /post-img/summary-the-transaction-concept/116246821-442a5700-a7a5-11eb-9729-4972dc63efce.png )

그림 3. DO-UNDO-REDO 프로토콜.
- 각각의 protected 작업을 실행하면 로그 레코드가 생성되며, 이 로그를 사용해 작업을 취소하거나 다시 실행할 수 있게 된다.
- 보호되지 않은 작업은 로그 레코드를 생성하지 않아도 된다.
- 실행취소할 수 없는 작업(real action)은 이와 관계있지만 조금 다른 프로토콜을 사용한다(다음 그림을 볼 것).


로깅의 기본적인 아이디어는, 모든 실행 취소 가능한 작업이 작업을 수행할 뿐만 아니라 작업을 실행취소할 수 있게끔 하는 실, 빵 조각, 또는 실행 취소 로그 레코드를 남겨야 한다는 것이다.

- 마찬가지로 모든 재실행 가능한 작업은 작업을 수행할 뿐만 아니라 작업을 재실행할 수 있게 해주는 재실행 로그 레코드도 생성해야 한다.
- 헨젤과 그레텔의 경험을 토대로, 이러한 로그 기록은 새들이 날아와 먹을 수 없는 튼튼한 재료로 만들어야 한다.
- 컴퓨터 측면에서 이러한 레코드는 안정적인 저장소에 보관되어야 한다.
    - 일반적으로는 각각 독립적인 장애 모드(independent failure modes)를 가진 여러 개의 비 휘발성 장치(non-volatile devices)에 레코드를 보관하는 방식으로 구현한다.
    - 때때로, 각 객체의 안정적인 사본을 기록해야 할 필요도 있다. 이를 통해 현재 상태가 이전 상태에서 재구성될 수 있도록 한다.

The log records for database operations are very simple.  They have the form: NAME OF TRANSACTION: PREVIOUS LOG RECORD OF THIS TRANSACTION: NEXT LOG RECORD OF THIS TRANSACATION: TIME: TYPE OF OPERATION: OBJECT OF OPERATION: OLD VALUE: NEW VALUE: 

DB 작업을 위한 로그 레코드는 매우 단순한다. 다음과 같은 형태를 갖는다.

```
NAME OF TRANSACTION:
PREVIOUS LOG RECORD OF THIS TRANSACTION:
NEXT LOG RECORD OF THIS TRANSACATION:
TIME:
TYPE OF OPERATION:
OBJECT OF OPERATION:
OLD VALUE:
NEW VALUE: 
```

old 값과 new 값은 객체의 완전한 복사본일 수 있지만, 일반적으로는 객체의 변경된 부분만 인코딩한다.
예를 들어, 파일 레코드의 필드 업데이트는 일반적으로 전체 파일이나 전체 레코드의 이전 값/새 값을 전부 로깅하지 않고, 그 대신 이전 및 새 필드 값과 함께 파일, 레코드 및 필드의 이름만 기록한다.

트랜잭션의 로그 레코드는 함께 스레드된다. 그러므로 하나의 트랜잭션을 실행 취소하면, 각각의 실행 취소도 해당 트랜잭션의 로그가 된다. 이 기법은 프로그램에 의해 실행된 트랜잭션 중단과 교착 상태 또는 하드웨어 오류와 같은 시스템 문제와 같은 불완전한(커밋되지 않은) 트랜잭션 후처리에 모두 사용할 수 있다.

객체의 현재 상태가 손상되는 일이 발생하면, redo 로그를 사용해 이전 상태에 대해 최근 커밋된 모든 작업을 재실행하는 방법으로 스테이블 저장소의 이전 상태에서 현자 상태를 재구성할 수 있다. 

Some actions need not generate log records. Actions on unprotected objects (e.g. writing on a scratch file), and actions which do not change the object state (e.g. reads of the object) need not generate log records.

일부 작업은 로그 레코드를 생성할 필요가 없기도 하다. 예를 들어 보호되지 않는 객체에 대한 작업(스크래치 파일에 쓰기 등)이나 객체 상태를 변경하지 않는 작업(객체 읽기)과 같은 경우는 로그 레코드를 생성할 필요가 없다.

### LIMITATIONS OF KNOWN TECHNIQUES
### NESTED TRANSACTIONS
### LONG-LIVED TRANSACTIONS
### INTEGRATION WITH PROGRAMMING LANGUAGES
### SUMMARY
### ACKNOWLEDGEMENTS
### REFERENCES

## 참고문헌

- The Transaction Concept: Virtues and Limitations by Jim Gray 1981
    - [PDF]( http://jimgray.azurewebsites.net/papers/thetransactionconcept.pdf )


