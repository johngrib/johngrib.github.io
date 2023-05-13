---
layout  : wiki
title   : On Designing and Deploying Internet-Scale Services By James Hamilton - Windows Live Services Platform
summary : 인터넷 규모의 서비스 설계와 배포에 대하여
date    : 2023-05-11 22:01:08 +0900
updated : 2023-05-13 14:31:56 +0900
tag     : 
resource: DA/DBCC95-AC92-4DFB-BD61-E7904C9B783D
toc     : true
public  : true
parent  : [[/clipping]]
latex   : false
---
* TOC
{:toc}

- 원문
    - [On Designing and Deploying Internet-Scale Services (PDF)]( https://s3.amazonaws.com/systemsandpapers/papers/hamilton.pdf )
    - [On Designing and Deploying Internet-Scale Services (HTML)]( https://www.usenix.org/legacy/event/lisa07/tech/full_papers/hamilton/hamilton_html/index.html )
- 2007년 11월에 James Hamilton이 발표한 논문

## 번역

### ABSTRACT

초록

>
The system-to-administrator ratio is commonly used as a rough metric to understand administrative costs in high-scale services.
With smaller, less automated services this ratio can be as low as 2:1, whereas on industry leading, highly automated services, we’ve seen ratios as high as 2,500:1.
Within Microsoft services, Autopilot [1] is often cited as the magic behind the success of the Windows Live Search team in achieving high system-to-administrator ratios. While auto-administration is important, the most important factor is actually the service itself.
Is the service efficient to automate?
Is it what we refer to more generally as operations-friendly?
Services that are operationsfriendly require little human intervention, and both detect and recover from all but the most obscure failures without administrative intervention.
This paper summarizes the best practices accumulated over many years in scaling some of the largest services at MSN and Windows Live.

'시스템 대 관리자의 비율'은 대규모 서비스에서의 관리 비용을 파악하기 위해 일반적으로 사용되는 대략적인 지표입니다.
규모가 작고 덜 자동화된 서비스에서는 이 비율이 2:1 까지 낮아지기도 하지만, 업계를 선도하는 고도로 자동화된 서비스에서는 이 비율이 2500:1 까지 올라가기도 합니다.

Microsoft 서비스에서, Autopilot은 Windows Live Search 팀이 달성한 높은 '시스템 대 관리자 비율'의 성공의 비결로 자주 언급됩니다.

자동화된 관리도 중요하지만, 실제로 가장 중요한 요소는 서비스 자체입니다.
그 서비스는 자동화하기 좋은가?
보통 말하곤 하는 운영 친화적인 서비스인가?
운영 친화적인 서비스는 사람의 개입이 거의 필요하지 않으며, 가장 난해한 종류의 장애를 제외한 모든 장애를 관리자의 개입 없이 감지하고 스스로 복구할 수 있습니다.

이 논문은 MSN과 Windows Live에서 수년 동안 대규모 서비스를 확장하면서 축적된 모범적인 사례들을 요약합니다.

### Introduction

서론

>
This paper summarizes a set of best practices for designing and developing operations-friendly services.
This is a rapidly evolving subject area and, consequently, any list of best practices will likely grow and morph over time.
Our aim is to help others
>
- deliver operations-friendly services quickly and
- avoid the early morning phone calls and meetings with unhappy customers that non-operations-friendly services tend to yield.

이 논문은 운영 친화적인 서비스를 설계하고 개발하기 위한 모범 사례들을 요약합니다.
이 분야는 빠르게 진화하고 있기 때문에, 모든 모범 사례들은 시간이 지남에 따라 계속 늘어나고 바뀌게 될 가능성이 높습니다.
우리의 목표는 이 글을 읽는 다른 사람들이 다음과 같은 문제를 해결할 수 있도록 돕는 것입니다.

- 운영 친화적인 서비스를 빠르게 제공하기
- 운영 친화적이지 않은 서비스에서 종종 발생하곤 하는 '새벽에 걸려오는 전화'와 '열받은 고객과의 회의'를 줄이기

>
The work draws on our experiences over the last 20 years in high-scale data-centric software systems and internet-scale services, most recently from leading the Exchange Hosted Services team (at the time, a mid-sized service of roughly 700 servers and just over 2.2M users).
We also incorporate the experiences of the Windows Live Search, Windows Live Mail, Exchange Hosted Services, Live Communications Server, Windows Live Address Book Clearing House (ABCH), MSN Spaces, Xbox Live, Rackable Systems Engineering Team, and the Messenger Operations teams in addition to that of the overall Microsoft Global Foundation Services Operations team.
Several of these contributing services have grown to more than a quarter billion users.
The paper also draws heavily on the work done at Berkeley on Recovery Oriented Computing [2, 3] and at Stanford on Crash-Only Software [4, 5].

이 작업은 지난 20년간 대규모 데이터 중심 소프트웨어 시스템과 인터넷 규모의 서비스에서 얻은 경험을 바탕으로 합니다.
가장 최근에는 Exchange 호스팅 서비스 팀(당시 약 700대의 서버와 220만명 이상의 사용자가 있는 중간 규모의 서비스)을 이끈 경험이 있습니다.
또한, Microsoft 전체의 글로벌 기반 서비스 운영팀의 경험에 더해, Windows Live Search, Windows Live Mail, Exchange Hosted Services, Live Communications Server, Windows Live Address Book Clearing House (ABCH), MSN Spaces, Xbox Live, Rackable Systems Engineering Team, Messenger Operations 팀의 경험도 포함하고 있습니다.

이들 중 몇몇은 2.5억명 이상의 사용자를 갖는 서비스로 성장했습니다.

이 논문은 또한 복구 지향 컴퓨팅(Recovery Oriented Computing)에 대한 버클리의 연구와 충돌 전용 소프트웨어(Crash-Only Software)에 대한 스탠포드의 연구를 상당부분 참고하고 있습니다.

>
Bill Hoffman [6] contributed many best practices to this paper, but also a set of three simple tenets worth considering up front:
>
> - Expect failures. A component may crash or be stopped at any time. Dependent components might fail or be stopped at any time. There will be network failures. Disks will run out of space. Handle all failures gracefully.
> - Keep things simple. Complexity breeds problems. Simple things are easier to get right. Avoid unnecessary dependencies. Installation should be simple. Failures on one server should have no impact on the rest of the data center.
> - Automate everything. People make mistakes. People need sleep. People forget things. Automated processes are testable, fixable, and therefore ultimately much more reliable. Automate wherever possible.
>
These three tenets form a common thread throughout much of the discussion that follows.

Bill Hoffman은 많은 모범적인 사례들을 이 문서에 기여했으며, 또한 다음과 같은 세 가지 간단한 원칙도 제시했습니다.

- 장애를 예상할 것. 어떤 컴포넌트이건 언제든지 충돌하거나 중단될 수 있고, 의존관계에 있는 컴포넌트들도 언제든지 실패하거나 중단될 수 있습니다. 네트워크 장애가 발생할 수 있으며, 디스크 공간이 부족할 수도 있습니다. 모든 장애를 우아하게 처리하세요.
- 단순하게 할 것. 복잡성은 문제를 발생시킵니다. 단순한 것이야말로 제대로 작동하기 쉽습니다. 불필요한 의존성을 피하도록 하세요. 설치도 단순해야 합니다. 한 서버에서 장애가 발생해도 나머지 데이터센터에 영향을 미치지 않도록 하세요.
- 모든 것을 자동화할 것. 사람은 실수를 합니다. 사람은 잠을 자야 하고, 무언가를 잊어버리기도 합니다. 자동화된 프로세스는 테스트도 가능하고 수정도 가능하므로 결국 사람보다 훨씬 안정적입니다. 가능한 한 모든 것을 자동화하세요.

이 세 가지 원칙은 이후의 논의 전반에 걸쳐 공통적인 주제로 등장합니다.

### Recommendations

권장 사항

>
This section is organized into ten sub-sections, each covering a different aspect of what is required to design and deploy an operations-friendly service.
These sub-sections include overall service design; designing for automation and provisioning; dependency management; release cycle and testing; hardware selection and standardization; operations and capacity planning; auditing, monitoring and alerting; graceful degradation and admission control; customer and press communications plan; and customer self provisioning and self help.

이 섹션은 운영 친화적인 서비스를 설계하고 배포하는 데 필요한 다양한 측면을 다루는 10개의 하위 섹션으로 이루어져 있습니다.

이 하위 섹션들은 전반적인 서비스 설계, 자동화와 프로비저닝을 위한 설계, 의존성 관리, 릴리스 주기와 테스트, 하드웨어 선택과 표준화, 운영과 용량 계획, 감사, 모니터링과 알림, 점진적 기능 저하(graceful degradation)와 어드미션 컨트롤, 고객과 언론 커뮤니케이션 계획, 고객의 셀프 프로비저닝과 셀프 도움말 등을 다룹니다.

#### Overall Application Design

애플리케이션 설계 전반에 대하여

>
We have long believed that 80% of operations issues originate in design and development, so this section on overall service design is the largest and most important.
When systems fail, there is a natural tendency to look first to operations since that is where the problem actually took place.
Most operations issues, however, either have their genesis in design and development or are best solved there.
>
Throughout the sections that follow, a consensus emerges that firm separation of development, test, and operations isn't the most effective approach in the services world.
The trend we've seen when looking across many services is that low-cost administration correlates highly with how closely the development, test, and operations teams work together.

우리는 운영 중 발생하는 문제의 80%가 설계와 개발에서 비롯된다고 오랫동안 믿어왔습니다.
따라서 전반적인 서비스 설계를 다루는 이 섹션은 가장 많은 내용을 담고 있으며 가장 중요합니다.
시스템에 장애가 발생하면, 실제로 문제를 다루는 곳이 운영 부서이기 때문에 당연하다는 듯이 운영 부서를 먼저 살펴보는 경향이 있습니다.
그러나 대부분의 운영 문제는 근본적으로 설계와 개발 과정에서 비롯된 것이므로, 설계와 개발 과정에서 해결하는 것이 가장 좋습니다.

다음 섹션을 통해 '개발, 테스트, 운영을 엄격하게 분리하는 것'이 '서비스 업계에서 썩 효과적인 접근 방식이 아니라는 것'에 대한 공감대가 형성되고 있음을 살펴봅니다.

우리는 많은 서비스를 살펴본 결과, 관리 비용의 절감은 개발팀, 테스트팀, 운영팀이 얼마나 밀접하게 협력하는가와 크게 연관되어 있다는 경향성을 발견했습니다.

>
In addition to the best practices on service design discussed here, the subsequent section, "Designing for Automation Management and Provisioning," also has substantial influence on service design.
Effective automatic management and provisioning are generally achieved only with a constrained service model.
This is a repeating theme throughout: simplicity is the key to efficient operations.
Rational constraints on hardware selection, service design, and deployment models are a big driver of reduced administrative costs and greater service reliability.

이 섹션에서 설명하는 '모범적인 서비스 설계 사례'들 외에도 다음 섹션인 '자동화 관리와 프로비저닝을 위한 설계'도 서비스 설계에 상당한 영향을 미칩니다.
효과적으로 자동화된 관리와 프로비저닝은 일반적으로 제한된 서비스 모델을 통해서만 달성할 수 있습니다.

'단순함이 효율적인 운영의 핵심'이라는 것은 이 논문 전반에 걸쳐 반복되는 주제입니다.

하드웨어 선택, 서비스 설계, 배포 모델에 대한 합리적인 제약조건은 관리 비용을 줄이고 서비스 신뢰성을 높이는 큰 원동력이 됩니다.

>
Some of the operations-friendly basics that have the biggest impact on overall service design are:

서비스 설계 전반에 걸쳐 가장 큰 영향을 미치는 운영 친화적 기본 사항은 다음과 같습니다.

>
- Design for failure.
This is a core concept when developing large services that comprise many cooperating components.
Those components will fail and they will fail frequently.
The components don't always cooperate and fail independently either.
Once the service has scaled beyond 10,000 servers and 50,000 disks, failures will occur multiple times a day.
If a hardware failure requires any immediate administrative action, the service simply won't scale cost-effectively and reliably.
The entire service must be capable of surviving failure without human administrative interaction.
Failure recovery must be a very simple path and that path must be tested frequently.
Armando Fox of Stanford [4, 5] has argued that the best way to test the failure path is never to shut the service down normally.
Just hard-fail it.
This sounds counter-intuitive, but if the failure paths aren't frequently used, they won't work when needed [7].

- 장애를 대비한 설계.

서로 협력하는 많은 컴포넌트들로 구성된 대규모 서비스를 개발할 때의 핵심 개념이라 할 수 있습니다.
서비스를 구성하는 컴포넌트들은 빈번하게 장애를 겪을 수 있습니다.
컴포넌트들은 항상 잘 협력하다가 혼자서만 장애를 겪거나 하지는 않습니다.
서비스가 10,000대의 서버와 50,000개의 디스크를 넘어서는 규모가 되면, 하루에도 여러 번의 장애가 발생할 수 있습니다.
만약 하드웨어 장애로 인해 즉각적인 관리 조치가 필요한 상황이라면, 효율적인 비용을 쓰면서 안정적으로 서비스를 확장할 수는 없습니다.

즉, 사람이 개입해서 관리하지 않아도 전체 서비스가 스스로 장애를 극복할 수 있어야 합니다.
장애를 복구하는 방법은 매우 단순해야 하며, 그 방법도 자주 테스트해야 합니다.

Stanford 대학교의 Armando Fox는 장애 경로를 테스트하는 가장 좋은 방법은 서비스를 정상적으로 종료하지 않는 것이라고 주장했습니다.
그냥 서비스를 강제로 종료하는 것이 그 방법입니다.
이 방법은 역설적으로 들릴 수 있지만, 이런 장애 경로를 자주 테스트해보지 않으면 필요할 때 제대로 작동하지 않을 수 있습니다.

>
- Redundancy and fault recovery.
The mainframe model was to buy one very large, very expensive server.
Mainframes have redundant power supplies, hot-swappable CPUs, and exotic bus architectures that provide respectable I/O throughput in a single, tightly-coupled system.
The obvious problem with these systems is their expense.
And even with all the costly engineering, they still aren't sufficiently reliable.
In order to get the fifth 9 of reliability, redundancy is required.
Even getting four 9's on a single-system deployment is difficult.
This concept is fairly well understood industry-wide, yet it's still common to see services built upon fragile, non-redundant data tiers.
Designing a service such that any system can crash (or be brought down for service) at any time while still meeting the service level agreement (SLA) requires careful engineering.
The acid test for full compliance with this design principle is the following:
is the operations team willing and able to bring down any server in the service at any time without draining the work load first?
If they are, then there is synchronous redundancy (no data loss), failure detection, and automatic take-over.
As a design approach, we recommend one commonly used approach to find and correct potential service security issues: security threat modeling.
In security threat modeling [8], we consider each possible security threat and, for each, implement adequate mitigation.
The same approach can be applied to designing for fault resiliency and recovery.
Document all conceivable component failures modes and combinations thereof.
For each failure, ensure that the service can continue to operate without unacceptable loss in service quality, or determine that this failure risk is acceptable for this particular service (e.g., loss of an entire data center in a non-geo-redundant service).
Very unusual combinations of failures may be determined sufficiently unlikely that ensuring the system can operate through them is uneconomical.
Be cautious when making this judgment.
We've been surprised at how frequently "unusual" combinations of events take place when running thousands of servers that produce millions of opportunities for component failures each day.
Rare combinations can become commonplace.

- 이중화, 그리고 장애 복구

메인프레임 모델은 매우 크고 비싼 서버 한 대를 구매하는 것이었습니다.
메인프레임은 이중화된 전원 공급장치, 핫-스왑이 가능한 여러 CPU들, 강하게 결합된 단일 시스템 위에서 돌아가는 상당한 수준의 I/O 처리율을 제공하는 굉장한 버스 아키텍처를 갖추고 있습니다.
이런 시스템들의 가장 큰 문제는 비용이라 할 수 있습니다.
상당한 비용이 소모되는 엔지니어링에도 불구하고, 이런 시스템들은 충분한 신뢰성을 제공하지 못합니다.

신뢰성을 99.999%까지 높이기 위해서는 이중화를 해야 합니다.
단일 시스템 배포에서는 99.99%의 신뢰성을 확보하는 것조차도 어렵습니다.
업계 전반에 걸쳐 이런 이중화의 개념은 상당히 잘 알려져 있는데도, 이중화되지 않은 데이터 계층 위에 구축된 취약한 서비스는 여전히 많이 있습니다.

서비스 수준 협약(SLA)[^term-sla]을 충족시키면서도 시스템이 언제든지 다운되거나 서비스가 중단되어도 괜찮도록 서비스를 설계하려면 신중한 엔지니어링이 필요합니다.

이러한 설계 원칙을 완벽하게 준수하는지에 대한 가장 엄격한 테스트는 다음 질문이라 할 수 있습니다.
운영팀이 특별히 더 작업을 하지 않아도 언제든지 서비스의 모든 서버를 중단할 수 있고, 그것에 대응할 수도 있는가?
만약 그것이 가능하다면 동기식 이중화(데이터 손실 없음), 장애 감지, 그리고 자동 인수인계 기능을 갖추고 있는 것입니다.

설계의 관점에서, 우리는 잠재적인 서비스 보안 문제를 찾고 수정하기 위해 흔히 사용되는 방법 중 하나인 '보안 위협 모델링'을 추천합니다.
보안 위협 모델링은 가능한 모든 보안 위협을 고려하고, 각각에 대해 적절한 완화 조치를 구현하는 것입니다.

장애 복원력 및 복구를 위한 설계에서도 이와 같은 접근 방식을 적용할 수 있습니다.
이론적으로 가능한 모든 컴포넌트들의 장애 상황과 그것들의 복합적인 조합을 문서화하는 것입니다.
각 장애에 대해, '서비스 품질상 절대 허용할 수 없는 피해' 없이 서비스가 계속 운영 가능한지 확인하거나, 특정 서비스에 대해 이런 장애 위험이 허용 가능한 수준인지를 판단합니다(예: 지리적으로 이중화되지 않은 서비스인데, 전체 데이터 센터 장애가 발생함).

매우 이례적인 장애 상황의 조합인 경우, 장애가 발생할 가능성이 충분히 낮다고 판단하고 그런 장애에 대응한 시스템 운영을 보장하는 것이 경제적이지 않다고 판단하는 것도 가능합니다.
물론 이러한 판단을 내릴 때에는 신중을 기해야 합니다.
우리는 매일 수백만 건의 컴포넌트 장애가 발생하는 수천대의 서버를 운영하면서 "비정상적인" 사건의 조합이 얼마나 자주 발생하는지를 경험했습니다.
규모에 따라 매우 드문 조합도 일상적인 사건이 될 수 있는 것입니다.

>
- Commodity hardware slice.
All components of the service should target a commodity hardware slice.
For example, storage-light servers will be dual socket, 2- to 4-core systems in the $1,000 to $2,500 range with a boot disk.
Storage-heavy servers are similar servers with 16 to 24 disks.
The key observations are:
    - large clusters of commodity servers are much less expensive than the small number of large servers they replace,
    - server performance continues to increase much faster than I/O performance, making a small server a more balanced system for a given amount of disk,
    - power consumption scales linearly with servers but cubically with clock frequency, making higher performance servers more expensive to operate, and
    - a small server affects a smaller proportion of the overall service workload when failing over.

- 상용 하드웨어 조각을 사용할 것.

서비스를 구성하는 모든 컴포넌트는 상용 하드웨어 조각을 타겟으로 해야 합니다.
예를 들어, 가벼운 스토리지가 필요한 서버는 부트 디스크가 있는 듀얼 소켓, 2~4 코어 시스템이며 가격은 $1000 ~ $2500 정도일 것입니다.
스토리지가 많이 필요한 서버는 전자와 유사하지만 16~24개의 디스크를 가진 서버일 것입니다.
우리가 관찰한 핵심 사항들은 다음과 같습니다.

- 대규모의 일반적인 서버 클러스터는 그들이 대체하는 적은 수의 대형 서버들보다 훨씬 저렴합니다.
- 서버 성능은 I/O 성능보다 훨씬 빠르게 증가하고 있으므로, 같은 양의 디스크에 대해 더 작은 서버를 갖추면 더 균형 잡힌 시스템이 될 것입니다.
- 전력 소비는 서버의 수에 따라 선형적으로 증가하지만, 클럭 주파수에 대해서는 세제곱으로 증가하므로, 더 높은 성능의 서버는 운영비가 더 많이 듭니다.
- 작은 서버는 장애를 겪는다 해도 전체 서비스가 처리하는 작업량에 그만큼 작은 영향을 미칩니다.

>
- Single-version software.
Two factors that make some services less expensive to develop and faster to evolve than most packaged products are
    - the software needs to only target a single internal deployment and
    - previous versions don't have to be supported for a decade as is the case for enterprise-targeted products.

>
Single-version software is relatively easy to achieve with a consumer service, especially one provided without charge.
But it's equally important when selling subscription-based services to non-consumers.
Enterprises are used to having significant influence over their software providers and to having complete control over when they deploy new versions (typically slowly).
This drives up the cost of their operations and the cost of supporting them since so many versions of the software need to be supported.
The most economic services don't give customers control over the version they run, and only host one version.
Holding this single-version software line requires
>
- care in not producing substantial user experience changes release-to-release and
- a willingness to allow customers that need this level of control to either host internally or switch to an application service provider willing to provide this people-intensive multi-version support.

- 단일한 버전의 소프트웨어.

어지간한 패키지 제품보다, 더 적은 비용으로 개발되고 더 빠르게 발전하는 몇몇 서비스들은 두 가지 특징을 갖고 있습니다.

- 내부적으로 단일한 버전의 배포만을 타겟으로 삼습니다.
- 엔터프라이즈 대상 제품의 경우와 같이 과거 버전을 10년이나 지원하지 않아도 됩니다.

특히, 무료로 제공되는 소비자 서비스라면 단일한 버전의 소프트웨어를 구현하기가 상대적으로 쉽습니다.
그러나 소비자를 대상으로 하지 않는 구독 기반의 서비스를 판매할 때에도 '단일 버전'은 중요합니다.

기업체들은 소프트웨어 공급업체에 상당한 영향력을 행사할 수 있고,
새로운 버전을 배포하는 시기를(일반적으로 느리게) 완전히 통제하는 데 익숙합니다.
이로 인해 해당 소프트웨어의 많은 과거 버전들을 지원해야 하므로 운영 비용과 지원 비용이 증가합니다.
가장 경제적인 서비스는 실행 버전에 대해 고객에게 통제권을 주지 않습니다. 그냥 하나의 버전만 호스팅합니다.

이러한 단일 버전 소프트웨어 정책을 유지하려면 다음과 같은 것들을 유의해야 합니다.

- 릴리스마다 사용자 경험이 크게 변경되지 않도록 주의해야 합니다.
- 이러한 통제 수준을 필요로 하는 고객들이 내부적으로 호스팅해서 직접 제어할 수 있게 해주거나, 관리 인력이 필요한 다중 버전 지원을 직접 관리하려는 애플리케이션 서비스 제공자로 전환할 수 있도록 기꺼이 허용해줘야 합니다.

>
- Multi-tenancy.
Multi-tenancy is the hosting of all companies or end users of a service in the same service without physical isolation, whereas single tenancy is the segregation of groups of users in an isolated cluster.
The argument for multi-tenancy is nearly identical to the argument for single version support and is based upon providing fundamentally lower cost of service built upon automation and large-scale.

멀티-테넌시.

멀티 테넌시는 물리적인 격리 없이 동일한 서비스에서 모든 회사나 엔드 유저들을 호스팅하는 것이고,
싱글 테넌시는 격리된 클러스터에서 사용자 그룹을 분리하는 것을 말합니다.

멀티 테넌시를 지지하는 주장은 단일 버전 지원을 지지하는 주장과 거의 동일하며, 자동화와 대규모를 기반으로 근본적으로 저렴한 서비스 비용을 제공하는 것을 토대로 삼고 있습니다.

>
In review, the basic design tenets and considerations we have laid out above are:
>
- design for failure,
- implement redundancy and fault recovery,
- depend upon a commodity hardware slice,
- support single-version software, and
- enable multi-tenancy.

위에서 설명한 기본적인 설계 원칙과 고려사항들은 다음과 같습니다.

- 장애를 대비해 설계할 것.
- 이중화, 그리고 장애 복구.
- 저가의 하드웨어 조각에 의존할 것.
- 단일 버전 소프트웨어를 지원할 것.
- 멀티 테넌시를 가능하게 할 것.

>
We are constraining the service design and operations model to maximize our ability to automate and to reduce the overall costs of the service.
We draw a clear distinction between these goals and those of application service providers or IT outsourcers.
Those businesses tend to be more people intensive and more willing to run complex, customer specific configurations.

우리는 서비스 설계와 운영 모델을 제한함으로써 자동화 능력을 극대화하고, 서비스의 전반적인 비용을 절감하고자 합니다.
우리는 '이러한 목표'와 '애플리케이션 서비스 제공자나 IT 아웃소싱 업체의 목표'를 명확히 구분합니다.
후자의 비즈니스는 많은 인력을 필요로 하며 고객 특화된 복잡한 구성을 실행하는 것에 더 집중하는 경향이 있습니다.

>
More specific best practices for designing operations-friendly services are:

운영 친화적인 서비스를 설계하기 위한 보다 구체적인 모범 사례는 다음과 같습니다:

>
- Quick service health check.
This is the services version of a build verification test.
It's a sniff test that can be run quickly on a developer's system to ensure that the service isn't broken in any substantive way.
Not all edge cases are tested, but if the quick health check passes, the code can be checked in.

- 빠른 서비스 헬스 체크.
이것은 빌드 검증 테스트의 서비스 버전입니다.
개발자의 시스템에서 빠르게 실행해서 서비스가 실제로 살아있는지 확인할 수 있는 sniff 테스트라 할 수 있습니다.
이것으로 모든 엣지 케이스가 테스트되는 것은 아니지만 빠른 헬스 체크가 통과되면 코드를 체크인할 수 있습니다.

>
- Develop in the full environment.
Developers should be unit testing their components, but should also be testing the full service with their component changes.
Achieving this goal efficiently requires single-server deployment (section 2.4), and the preceding best practice, a quick service health check.

- 완전한 환경에서 개발할 것.

개발자들은 자신이 개발중인 컴포넌트에 대해 단위 테스트를 해야 하지만, 컴포넌트 변경사항을 포함해 전체 서비스도 테스트해야 합니다.
이 목표를 효율적으로 달성하려면 '단일 서버 배포'(2.4절)와 앞서 설명한 '빠른 서비스 헬스 체크'가 필요합니다.

>
- Zero trust of underlying components. Assume that underlying components will fail and ensure that components will be able to recover and continue to provide service. The recovery technique is service-specific, but common techniques are to
    - continue to operate on cached data in read-only mode or
    - continue to provide service to all but a tiny fraction of the user base during the short time while the service is accessing the redundant copy of the failed component.

- 기본 컴포넌트를 절대 신뢰하지 않기(zero trust).

기본 컴포넌트에 장애가 발생했다고 생각하고, 해당 컴포넌트들이 복구되면 서비스를 계속 제공할 수 있는지 확인하도록 합니다.
복구 기술은 서비스에 따라 달라질 수 있지만, 일반적으로는 다음과 같습니다:

- 읽기전용 모드로 캐시된 데이터를 사용해 계속 운영합니다.
- 장애가 발생한 컴포넌트의 이중화된 복사본에 서비스가 엑세스하는 짧은 시간 동안, 극히 일부 사용자 집단을 제외한 모든 사용자에게 서비스를 제공할 수 있도록 합니다.


>
- Do not build the same functionality in multiple components.
Foreseeing future interactions is hard, and fixes have to be made in multiple parts of the system if code redundancy creeps in.
Services grow and evolve quickly. Without care, the code base can deteriorate rapidly.

- 같은 기능을 여러 컴포넌트에 구현하지 말 것.

미래의 상호작용을 예측하는 것은 어려우며, 중복된 코드가 있다면 시스템의 여러 부분에서 수정을 해야 합니다.
서비스는 계속 성장하며 빠르게 진화해나갑니다.
이런 면에 신경쓰지 않으면 코드 베이스가 빠르게 악화될 수 있습니다.

>
- One pod or cluster should not affect another pod or cluster.
Most services are formed of pods or sub-clusters of systems that work together to provide the service, where each pod is able to operate relatively independently.
Each pod should be as close to 100% independent and without inter-pod correlated failures.
Global services even with redundancy are a central point of failure.
Sometimes they cannot be avoided but try to have everything that a cluster needs inside the clusters.

- 하나의 pod 또는 클러스터가 다른 pod나 다른 클러스터에 영향을 끼치지 않아야 한다.

대부분의 서비스는 서비스를 제공하기 위해 함께 작동하는 시스템의 pod나 서브 클러스터로 구성되며, 각 pod는 비교적 독립적으로 작동할 수 있습니다.
각 pod는 거의 100% 독립적으로 돌아갈 수 있어야 하고 pod간 상호 연관된 장애가 발생하지 않아야 합니다.
이중화를 갖춘 글로벌 서비스에서도 중앙 장애점이 존재합니다.
이런 장애 포인트는 때때로 피할 수 없지만, 클러스터가 필요로 하는 모든 것을 클러스터 내부에 갖추도록 노력해야 합니다.

>
- Allow (rare) emergency human intervention.
The common scenario for this is the movement of user data due to a catastrophic event or other emergency.
Design the system to never need human interaction, but understand that rare events will occur where combined failures or unanticipated failures require human interaction.
These events will happen and operator error under these circumstances is a common source of catastrophic data loss.
An operations engineer working under pressure at 2 a.m. will make mistakes.
Design the system to first not require operations intervention under most circumstances, but work with operations to come up with recovery plans if they need to intervene.
Rather than documenting these as multi-step, error-prone procedures, write them as scripts and test them in production to ensure they work.
What isn't tested in production won't work, so periodically the operations team should conduct a "fire drill" using these tools.
If the service-availability risk of a drill is excessively high, then insufficient investment has been made in the design, development, and testing of the tools.

- 비상시에는 사람의 개입을 허용할 것(드문 경우이긴 하지만).

사람이 개입하는 상황에 대한 일반적인 시나리오는 재난이나 비상사태로 인해 사용자 데이터를 이동시키는 것입니다.
사람의 개입이 필요하지 않도록 시스템을 설계하긴 해야 합니다.
그러나 복합적인 장애 또는 예상치 못한 장애로 인해 사람의 개입이 필요한 드문 상황이 발생할 수 있다는 것도 이해해야 합니다.
이런 일들이 발생했을 때 운영자가 실수를 저지르는 상황은 치명적인 데이터 손실의 일반적인 원인이기도 합니다.
운영 엔지니어가 새벽 2시에 압박감을 느끼며 작업을 하면 얼마든지 실수를 할 수 있습니다.

대부분의 상황에서 운영자의 개입이 필요하지 않도록 시스템을 설계하되, 개입이 필요한 경우가 발생하면 운영팀과 협력하여 복구 계획을 마련해야 합니다.
이러한 것들을 여러 단계의 절차를 설명하는 내용으로 문서화하는 것보다(오히려 문서 때문에 오류가 생길 수 있음), 스크립트로 작성하고 실제 운영 환경에서 테스트하여 작동하는지 확인하는 것이 좋습니다.
프로덕션 환경에서 테스트되지 않은 것은 작동하지 않는다고 생각하고, 주기적으로 이런 도구들을 써서 운영팀의 "소방 훈련"을 실시해야 합니다.
소방 훈련을 하는 것이 서비스 가용성에 대해 지나치게 높은 위험이 된다면, 도구의 설계, 개발, 테스트에 충분한 투자가 이루어지지 않았다는 것을 반증하는 것입니다.

>
- Keep things simple and robust.
Complicated algorithms and component interactions multiply the difficulty of debugging, deploying, etc.
Simple and nearly stupid is almost always better in a high-scale service-the number of interacting failure modes is already daunting before complex optimizations are delivered.
Our general rule is that optimizations that bring an order of magnitude improvement are worth considering, but percentage or even small factor gains aren't worth it.

- 단순하고 견고하게 만들 것.

복잡한 알고리즘과 컴포넌트들 간의 상호작용은 디버깅, 배포 등의 작업을 어렵게 만듭니다.
대규모 서비스에서는 복잡한 최적화를 적용하기 이전에도, 이미 상호작용으로 인해 발생 가능한 장애의 경우의 수가 많아서 매우 어렵습니다.
따라서 단순하고, 좀 멍청해 보이는 것이 오히려 더 좋은 경우가 많습니다.
일반적으로 성능을 10배 이상 향상시키는 최적화는 고려할 가치가 있지만, 몇 퍼센트 정도의 작은 성능 향상은 고려할 가치가 없습니다.

>
- Enforce admission control at all levels.
Any good system is designed with admission control at the front door.
This follows the long-understood principle that it's better to not let more work into an overloaded system than to continue accepting work and beginning to thrash.
Some form of throttling or admission control is common at the entry to the service, but there should also be admission control at all major components boundaries.
Work load characteristic changes will eventually lead to sub-component overload even though the overall service is operating within acceptable load levels.
See the note below in section 2.8 on the "big red switch" as one way of gracefully degrading under excess load.
The general rule is to attempt to gracefully degrade rather than hard failing and to block entry to the service before giving uniform poor service to all users.

- 모든 레벨에서 출입 통제를 강제할 것.

모든 좋은 시스템들은 전면에서부터 출입 통제를 강제하도록 설계되어 있습니다.
이런 관행은 '과부하가 걸린 시스템에 더 많은 작업을 허용하지 않는 것'이 '계속해서 작업을 수락해서 과부하가 발생하게 만드는 것'보다 낫다는 오래된 원칙에 따른 것입니다.
서비스 진입점에서 어떤 형태로건 쓰로틀링을 하거나 진입 제어를 하는 것이 일반적이긴 하지만, 그 외의 모든 주요 컴포넌트들의 경계에서도 진입을 제어하는 것이 있어야 합니다.
'전체 서비스가 수용할 수 있는 부하 수준' 내에서 작동한다 하더라도,
'작업량 부하 특성(work load characteristic)의 변화'는 결국 하위 컴포넌트의 과부하로 이어질 수 있습니다.

아래의 섹션 2.8의 "큰 빨간 스위치"에 대한 노트를 참고해서, 과부하 상태에서 우아하게 성능을 저하시키는 방법을 알아보길 바랍니다.

일반적인 규칙은 다음과 같습니다.

- 강력한 장애를 유발하기 전에 우아하게 성능을 저하시키는 시도를 할 것.
- 모든 사용자에게 일괄적으로 수준이 떨어진 서비스를 제공하기 전에, 서비스 진입을 차단할 것.

>
- Partition the service.
Partitions should be infinitely-adjustable and fine-grained, and not be bounded by any real world entity (person, collection...).
If the partition is by company, then a big company will exceed the size of a single partition.
If the partition is by name prefix, then eventually all the P's, for example, won't fit on a single server.
We recommend using a look-up table at the mid-tier that maps fine-grained entities, typically users, to the system where their data is managed.
Those fine-grained partitions can then be moved freely between servers.

- 서비스를 여러 파티션으로 나눌 것.

파티션들은 무제한으로 조정할 수 있어야 하고, 세밀하게 나눌 수 있어야 합니다.
실제 세계의 무언가(사람, 컬렉션 등)에 의해 제한되어서는 안됩니다.

만약 회사별로 파티션을 분할하면 대기업은 단일 파티션의 크기를 초과하게 됩니다.
그리고, 만약 이름 접두사를 기준으로 파티션을 분할하면 예를 들어 모든 'P'가 단일 서버에 들어갈 수 없게 됩니다.

일반적으로 사용자들을 시스템에 매핑하는 룩업 테이블을 미드 티어에 사용하는 것을 권장합니다.
그러면 이렇게 세분화한 파티션들을 자유롭게 서버들 사이에서 이동시킬 수 있습니다.

>
- Understand the network design.
Test early to understand what load is driven between servers in a rack, across racks, and across data centers.
Application developers must understand the network design and it must be reviewed early with networking specialists on the operations team.

- 네트워크 설계를 이해할 것.

서버 랙 내부, 랙과 랙 사이, 데이터 센터 간에 어떤 부하가 발생하는지를 이해하기 위해 초기부터 테스트를 해야 합니다.
애플리케이션 개발자는 네트워크 설계를 이해해야 하고, 운영팀의 네트워킹 전문가들과 함께 초기에 설계를 검토해야 합니다.

>
- Analyze throughput and latency.
Analysis of the throughput and latency of core service user interactions should be performed to understand impact.
Do so with other operations running such as regular database maintenance, operations configuration (new users added, users migrated), service debugging, etc.
This will help catch issues driven by periodic management tasks.
For each service, a metric should emerge for capacity planning such as user requests per second per system, concurrent on-line users per system, or some related metric that maps relevant work load to resource requirements.

- 처리율과 지연시간을 분석할 것.

핵심 서비스의 사용자 상호작용에 대한 처리율과 지연 시간을 분석하고 그 영향력을 이해해둬야 합니다.
이런 분석은 정기적인 데이터베이스 메인터넌스, 운영 설정(새로운 사용자 추가, 사용자 마이그레이션), 서비스 디버깅 등과 같은 다른 운영 작업을 수행하면서도 진행해야 합니다.
이를 통해 주기적인 관리 작업으로 인해 발생하는 문제를 파악하는 데에 도움이 됩니다.

각각의 서비스에 대해서도 시스템당 초당 사용자 요청 수, 시스템당 동시 온라인 사용자 수, 관련된 작업 부하를 리소스 요구 사항에 매핑하는 관련 메트릭과 같은 용량 계획을 위한 메트릭을 볼 수 있어야 합니다.

>
- Treat operations utilities as part of the service.
Operations utilities produced by development, test, program management, and operations should be code-reviewed by development, checked into the main source tree, and tracked on the same schedule and with the same testing.
Frequently these utilities are mission critical and yet nearly untested.

- 운영용 유틸리티를 서비스의 일부로 취급할 것.

개발팀, 테스트팀, 프로그램 관리팀 및 운영팀에서 만들어 쓰는 운영용 유틸리티는 개발할 때부터 코드 리뷰를 거쳐 메인 소스코드에 체크인하고 같은 일정흐름과 같은 테스트를 통해 추적 관리되어야 합니다.
이런 유틸리티들은 업무에 필수적인데도 거의 테스트되지 않는 경우가 많습니다.

>
- Understand access patterns.
When planning new features, always consider what load they are going to put on the backend store.
Often the service model and service developers become so abstracted away from the store that they lose sight of the load they are putting on the underlying database.
A best practice is to build it into the specification with a section such as, "What impacts will this feature have on the rest of the infrastructure?" Then measure and validate the feature for load when it goes live.

- 접근 패턴을 이해할 것.

새로운 기능을 계획할 때마다 백엔드 스토어에 어떤 부하를 주게 될 것인지를 항상 고려해야 합니다.
서비스 모델과 서비스 개발자들은 종종 추상화에 너무 빠져서 백엔드 데이터베이스에 어떤 부하를 주는지를 놓치는 경우가 많습니다.

이에 대한 모범적인 접근은 "이 기능이 다른 인프라에 어떤 영향을 끼치게 될까요?"와 같은 섹션을 스펙 문서에 추가하고,
해당 기능이 라이브로 올라갈 때 부하를 측정하고 검증하는 것입니다.

>
- Version everything.

Expect to run in a mixed-version environment.
The goal is to run single version software but multiple versions will be live during rollout and production testing.
Versions n and n+1 of all components need to coexist peacefully.

- 모든 것을 버전 관리할 것.

여러 버전이 혼합된 환경에서 가동될 수 있다고 예상해둬야 합니다.
목표는 단일 버전의 소프트웨어를 가동하는 것이지만, 롤아웃과 프로덕션 테스트 과정에서는 여러 버전이 동시에 실행될 수 있습니다.
즉, 모든 컴포넌트의 n 버전과 n+1 버전이 평화롭게 공존하며 돌아갈 수 있어야 합니다.

>
- Keep the unit/functional tests from the previous release.
These tests are a great way of verifying that version n-1 functionality doesn't get broken.
We recommend going one step further and constantly running service verification tests in production (more detail below).

- 이전 릴리스의 단위/기능 테스트를 유지할 것.

이런 테스트들은 n-1 버전의 기능이 깨지지 않았는지를 확인하는 좋은 방법입니다.
우리는 여기에서 한 걸음 더 나아가 프로덕션 환경에서 서비스 검증 테스트를 지속적으로 실행하는 것을 권장합니다(아래에서 자세히 설명합니다).

>
- Avoid single points of failure.
Single points of failure will bring down the service or portions of the service when they fail.
Prefer stateless implementations.
Don't affinitize requests or clients to specific servers.
Instead, load balance over a group of servers able to handle the load.
Static hashing or any static work allocation to servers will suffer from data and/or query skew problems over time.
Scaling out is easy when machines in a class are interchangeable.
Databases are often single points of failure and database scaling remains one of the hardest problems in designing internet-scale services.
Good designs use fine-grained partitioning and don't support cross-partition operations to allow efficient scaling across many database servers.
All database state is stored redundantly (on at least one) fully redundant hot standby server and failover is tested frequently in production.

- 단일 장애 포인트를 피할 것.

단일 장애 포인트는 장애가 발생하면 서비스 전체 또는 일부를 다운시킬 수 있습니다.
가능한 한 상태를 갖지 않도록 구현해야 합니다(stateless implementation).
그리고 요청이나 클라이언트를 특정 서버에 한정시키지 말아야 합니다.
그렇게 하지 말고, 부하를 처리할 수 있는 여러 서버들의 그룹에 로드 밸런싱을 하세요.
정적 해싱, 서버에 대한 정적 작업 할당과 같은 것들은 시간이 지남에 따라 데이터나 쿼리의 불균형 문제가 발생할 수 있습니다.
한 클래스의 머신이 서로 교체 가능하다면 스케일 아웃이 쉬워집니다.

데이터베이스가 단일 장애 포인트가 되는 경우가 많으며, 데이터베이스 확장은 인터넷 규모의 서비스를 설계할 때 가장 어려운 문제 중 하나입니다.
좋은 설계는 세밀한 파티션을 사용하며, 많은 데이터베이스 서버를 효율적으로 확장할 수 있도록 파티션 간의 작업을 지원하지 않습니다.
모든 데이터베이스 상태는 완전히 이중화된 핫 스탠바이 서버(적어도 하나)에 중복으로 저장하고, 프로덕션 환경에서는 자주 장애 조치(failover) 테스트를 진행해야 합니다.


#### Automatic Management and Provisioning

작업중

#### Dependency Management
#### Release Cycle and Testing
#### Hardware Selection and Standardization
#### Operations and Capacity Planning
#### Auditing, Monitoring and Alerting
#### Graceful Degradation and Admission Control
#### Customer and Press Communication Plan
#### Customer Self-Provisioning and Self-Help

### Conclusion

### Acknowledgments

### Author Biography

### References


## 주석

[^term-sla]: 역주: SLA, Service Level Agreement. 서비스 제공 업체와 고객 사이에 서비스의 품질, 책임 등에 대한 내용을 명시한 계약.

