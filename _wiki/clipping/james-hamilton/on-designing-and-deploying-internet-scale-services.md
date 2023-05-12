---
layout  : wiki
title   : On Designing and Deploying Internet-Scale Services By James Hamilton - Windows Live Services Platform
summary : 인터넷 규모의 서비스 설계와 배포에 대하여
date    : 2023-05-11 22:01:08 +0900
updated : 2023-05-12 23:28:03 +0900
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

작업중

### Automatic Management and Provisioning
### Dependency Management
### Release Cycle and Testing
### Hardware Selection and Standardization
### Operations and Capacity Planning
### Auditing, Monitoring and Alerting
### Graceful Degradation and Admission Control
### Customer and Press Communication Plan
### Customer Self-Provisioning and Self-Help

### Conclusion

### Acknowledgments

### Author Biography

### References


## 주석

[^term-sla]: 역주: SLA, Service Level Agreement. 서비스 제공 업체와 고객 사이에 서비스의 품질, 책임 등에 대한 내용을 명시한 계약.

