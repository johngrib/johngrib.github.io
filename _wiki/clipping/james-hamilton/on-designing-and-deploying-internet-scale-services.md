---
layout  : wiki
title   : On Designing and Deploying Internet-Scale Services By James Hamilton - Windows Live Services Platform
summary : 인터넷 규모의 서비스 설계와 배포에 대하여
date    : 2023-05-11 22:01:08 +0900
updated : 2023-05-14 12:21:40 +0900
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

자동 관리 및 프로비저닝

>
Many services are written to alert operations on failure and to depend upon human intervention for recovery.
The problem with this model starts with the expense of a 24x7 operations staff.
Even more important is that if operations engineers are asked to make tough decisions under pressure, about 20% of the time they will make mistakes.
The model is both expensive and error-prone, and reduces overall service reliability.

많은 서비스들은 장애가 발생하면 운영팀에 알림을 보내며, 장애 복구를 위해 사람의 개입을 필요로 합니다.
이러한 모델의 문제는 24시간 연중무휴로 운영팀을 가동할 수 있는 인력이 필요하다는 점입니다.
그리고 더 중요한 문제는, 운영 엔지니어가 압박을 받는 상황에서 어려운 결정을 내려야 한다면 20%의 확률로 실수를 하게 된다는 점입니다.
사람에 의존하는 모델은 비용이 많이 들 뿐만 아니라 오류가 발생하기 쉬워 전반적인 서비스의 안정성을 떨어뜨립니다.

>
Designing for automation, however, involves significant service-model constraints.
For example, some of the large services today depend upon database systems with asynchronous replication to a secondary, back-up server.
Failing over to the secondary after the primary isn't able to service requests loses some customer data due to replicating asynchronously.
However, not failing over to the secondary leads to service downtime for those users whose data is stored on the failed database server.
Automating the decision to fail over is hard in this case since its dependent upon human judgment and accurately estimating the amount of data loss compared to the likely length of the down time.
A system designed for automation pays the latency and throughput cost of synchronous replication.
And, having done that, failover becomes a simple decision: if the primary is down, route requests to the secondary.
This approach is much more amenable to automation and is considerably less error prone.

하지만 자동화를 위한 설계는 서비스 모델에 상당한 제한을 가하게 됩니다.
예를 들어, 오늘날의 몇몇 대규모 서비스는 보조 백업 서버에 비동기식으로 복제하는 데이터베이스 시스템에 의존합니다.
그러나 프라이머리 서버가 요청을 처리할 수 없는 상황이 됐을 때 보조 서버로 장애를 조치하면(failing over) 비동기식 복제로 인해 일부 고객 데이터가 손실됩니다.

하지만 그렇다고 해서 보조 서버로 장애 조치를 하지 않으면 장애가 발생한 데이터베이스 서버에 데이터가 저장된 사용자들에게 서비스 다운타임이 발생하게 됩니다.
이러한 경우에는 장애 조치를 할지 사람이 결정해야 하며, 장애 조치로 인해 발생할 데이터 손실량을 정확하게 추정해야 하기 때문에
장애 조치 결정은 자동화하는 것이 어렵습니다.

자동화를 위해 설계된 시스템은 동기식 복제를 사용할 때의 지연 시간과 처리율 비용 등의 오버헤드를 감수해야 합니다.

프라이머리 서버가 다운되면 요청을 보조 서버로 라우팅하도록 하는 방법이 있습니다.
이렇게 하면 장애 조치(failover)를 간단하게 결정할 수 있습니다.
이런 접근 방식은 자동화에 훨씬 더 적합하며, 오류 발생 가능성도 훨씬 적습니다.

>
Automating administration of a service after design and deployment can be very difficult.
Successful automation requires simplicity and clear, easy-to-make operational decisions.
This in turn depends on a careful service design that, when necessary, sacrifices some latency and throughput to ease automation.
The trade-off is often difficult to make, but the administrative savings can be more than an order of magnitude in high-scale services.
In fact, the current spread between the most manual and the most automated service we've looked at is a full two orders of magnitude in people costs.

설계와 배포를 마친 서비스의 관리를 자동화하는 것은 매우 어려운 일이 될 수 있습니다.
성공적인 자동화를 위해서는 '단순성'과 '명확하고 쉬운 운영 결정'이 필요합니다.
이런 것들은 '자동화를 위해 필요하다면 일부 지연 시간과 처리율도 희생할 수 있는 신중한 서비스 설계'에 달려 있습니다.
이런 절충점을 찾기가 어려운 경우가 많긴 하지만, 해낸다면 대규모 서비스에서는 관리 비용의 자릿수를 줄일 수도 있습니다.
실제로 현재 가장 수동적인 서비스와 가장 자동화된 서비스의 인건비 차이는 2자리수에 달합니다.

>
Best practices in designing for automation include:

자동화를 위한 설계를 달성하기 위한 최선의 방법들은 다음과 같습니다.

>
- Be restartable and redundant.
All operations must be restartable and all persistent state stored redundantly.

- 재시작이 가능하게 만들고, 이중화할 것.

모든 작업은 재시작이 가능해야 하며, 모든 영속적 상태는 이중화되어 저장되어야 합니다.

>
- Support geo-distribution.
All high scale services should support running across several hosting data centers.
In fairness, automation and most of the efficiencies we describe here are still possible without geo-distribution.
But lacking support for multiple data center deployments drives up operations costs dramatically.
Without geo-distribution, it's difficult to use free capacity in one data center to relieve load on a service hosted in another data center.
Lack of geo-distribution is an operational constraint that drives up costs.

- 지리적으로 분산시킬 것.

모든 대규모 서비스는 여러 호스팅 데이터 센터에서 가동될 수 있어야 합니다.
사실 엄밀하게 말하자면 여기에서 설명하는 자동화나 대부분의 효율적인 것들은 지리적으로 분산하지 않아도 가능하긴 합니다.

그러나 여러 데이터센터에 걸친 배포를 지원하지 않는다면 운영 비용이 크게 증가하게 됩니다.
지리적 분산이 없다면 한 데이터센터의 여유 용량을 사용한다 해도, 다른 데이터센터에서 호스팅중인 서비스의 부하를 완화하기 어렵습니다.
지리적 분산이 부족하면 운영상의 제약이 생겨 비용이 증가하게 됩니다.

>
- Automatic provisioning and installation.
Provisioning and installation, if done by hand, is costly, there are too many failures, and small configuration differences will slowly spread throughout the service making problem determination much more difficult.

- 자동으로 프로비저닝하고 설치할 것.

프로비저닝과 설치를 수작업으로 하면 비용이 많이 들고, 실수를 많이 할 수 있으며, 작은 설정의 차이가 서비스 전체에 서서히 확산되어 문제를 파악하기가 훨씬 어려워집니다.

>
- Configuration and code as a unit. Ensure that
    - the development team delivers the code and the configuration as a single unit,
    - the unit is deployed by test in exactly the same way that operations will deploy it, and
    - operations deploys them as a unit.

>
Services that treat configuration and code as a unit and only change them together are often more reliable.
If a configuration change must be made in production, ensure that all changes produce an audit log record so it's clear what was changed, when and by whom, and which servers were effected (see section 2.7).
Frequently scan all servers to ensure their current state matches the intended state.
This helps catch install and configuration failures, detects server misconfigurations early, and finds non-audited server configuration changes.

- 설정과 코드를 하나의 단위로 묶어 관리할 것.
    - 개발팀은 코드와 설정을 하나의 단위로 제공해야 합니다.
    - 운영팀이 배포하는 것과 똑같은 방식으로 테스트를 통해 배포할 수 있어야 합니다.
    - 운영팀은 코드와 설정을 하나로 묶어 배포해야 합니다.

설정과 코드를 하나의 단위로 취급하고 같이 변경하는 서비스가 더 안정적인 경우가 많습니다.

만약 프로덕션 환경에서 설정을 변경해야 한다면, 모든 변경 사항이 감사 로그 레코드를 생성하게 해서 변경된 내용, 변경된 시기, 변경한 사람, 영향을 받은 서버를 명확하게 파악할 수 있도록 해야 합니다(섹션 2.7 참고).

모든 서버를 빈번하게 검사해서 현재 상태가 의도한 상태와 일치하는지도 확인해야 합니다.
이렇게 하면 설치와 설정 관련 실패를 잡아내는 데 도움이 되며, 서버의 잘못된 구성을 조기에 감지할 수 있고, 감사되지 않은 서버의 설정 변경을 찾을 수 있습니다.

>
- Manage server roles or personalities rather than servers.
Every system role or personality should support deployment on as many or as few servers as needed.

- 서버의 역할과 특성을 관리할 것.

모든 시스템 역할이나 특성은 필요한 만큼의 서버에 배포할 수 있어야 합니다.

>
- Multi-system failures are common.
Expect failures of many hosts at once (power, net switch, and rollout). Unfortunately, services with state will have to be topology-aware. Correlated failures remain a fact of life.

- 한 번에 하나만 장애가 발생한다고 생각하지 말 것.

한번에 여러 호스트의 장애(전원, 네트워크 스위치, 롤아웃)가 발생할 수 있습니다.
안타깝게도 상태를 갖는 서비스는 토폴로지도 파악해야 합니다.
상호 연관된 장애는 일상입니다.

>
- Recover at the service level.
Handle failures and correct errors at the service level where the full execution context is available rather than in lower software levels.
For example, build redundancy into the service rather than depending upon recovery at the lower software layer.

- 서비스 레벨에서 장애를 복구할 수 있도록 할 것.

하위 소프트웨어 레벨이 아닌 전체 실행 컨텍스트를 사용할 수 있는 서비스 레벨에서 장애를 처리하고 오류를 수정해야 합니다.
예를 들어, 하위 소프트웨어 계층의 복구에 의존하는 대신 서비스를 이중화하여 구축해야 합니다.

>
- Never rely on local storage for non-recoverable information.
Always replicate all the non-ephemeral service state.

- 복구 불가능한 정보에 대해 로컬 저장소에 의존하지 말 것.

모든 비휘발성 서비스 상태는 항상 복제해야 합니다.

>
- Keep deployment simple.
File copy is ideal as it gives the most deployment flexibility.
Minimize external dependencies.
Avoid complex install scripts.
Anything that prevents different components or different versions of the same component from running on the same server should be avoided.

- 배포 과정을 단순하게 할 것.

파일 복사 방식은 가장 유연한 배포 방식이므로 이상적입니다.
외부 의존성을 최소화해야 합니다.
그리고 복잡한 설치 스크립트는 가능한 한 피해야 합니다.
동일한 서버에서 다른 컴포넌트 또는 동일한 컴포넌트의 다른 버전을 실행하지 못하게 하는 것은 피하도록 합니다.

>
- Fail services regularly.
Take down data centers, shut down racks, and power off servers.
Regular controlled brown-outs will go a long way to exposing service, system, and network weaknesses.
Those unwilling to test in production aren't yet confident that the service will continue operating through failures.
And, without production testing, recovery won't work when called upon.

- 정기적으로 서비스를 실패시켜 볼 것.

데이터센터를 다운시키고, 랙을 종료하고, 서버의 전원을 내려보세요.
정기적으로 통제된 브라운-아웃은 서비스, 시스템, 네트워크의 약점을 드러내는 데 큰 도움이 될 것입니다.
프로덕션 환경에서 테스트하지 않으려는 기업은 장애가 발생해도 서비스가 계속 운영될 것이라고 장담할 수 없습니다.
또한 프로덕션 환경의 테스트 없이는 장애가 발생해도 복구가 제대로 이루어지지 않을 것입니다.

#### Dependency Management

의존성 관리

>
Dependency management in high-scale services often doesn't get the attention the topic deserves.
As a general rule, dependence on small components or services doesn't save enough to justify the complexity of managing them.
Dependencies do make sense when:
>
- the components being depended upon are substantial in size or complexity, or
- the service being depended upon gains its value in being a single, central instance.

>
Examples of the first class are storage and consensus algorithm implementations.
Examples of the second class of are identity and group management systems.
The whole value of these systems is that they are a single, shared instance so multi-instancing to avoid dependency isn't an option.

대규모 서비스에서의 상호 의존 관리는 종종 그 중요도만큼의 관심을 받지 못합니다.
일반적으로 관리 복잡도를 이유로 작은 컴포넌트나 작은 서비스에 대해 의존하게 만들곤 하는데, 그것을 정당화할 만큼 충분히 비용을 절약하지 못하는 것이 보통입니다.
의존성은 다음과 같은 경우에 의미가 있습니다.

- 의존 컴포넌트의 크기나 복잡도가 상당한 규모인 경우
- 의존 서비스가 단일 중앙 인스턴스로서의 가치를 얻는 경우

저장소와 합의 알고리즘 구현과 같은 것들이 첫번째 경우의 예라 할 수 있습니다.
ID와 그룹 관리 시스템 같은 것들은 두번째 경우의 예라 할 수 있습니다.
이런 시스템들의 경우 단일한 공유 인스턴스를 유지한다는 점에서 가치가 있으므로, 의존성을 피하기 위한다는 이유로 다중 인스턴스를 사용할 수 없습니다.

>
Assuming that dependencies are justified according to the above rules, some best practices for managing them are:

위의 규칙에 따라 의존이 정당화될 수 있다고 가정한다면, 의존성을 관리하기 위한 몇 가지 모범 사례는 다음과 같습니다.

>
- Expect latency.
Calls to external components may take a long time to complete.
Don't let delays in one component or service cause delays in completely unrelated areas.
Ensure all interactions have appropriate timeouts to avoid tying up resources for protracted periods.
Operational idempotency allows the restart of requests after timeout even though those requests may have partially or even fully completed.
Ensure all restarts are reported and bound restarts to avoid a repeatedly failing request from consuming ever more system resources.

- 지연 시간을 예측할 것.

외부 컴포넌트를 호출하는 것은 작업 완료까지 시간이 오래 걸릴 수 있습니다.
하나의 컴포넌트나 서비스의 딜레이로 인해 전혀 관계 없는 영역에서 딜레이가 발생하지 않도록 해야 합니다.
모든 상호 작용에 적절한 타임아웃이 있는지 확인해서 어떤 리소스가 오랫동안 점유되지 않도록 해야 합니다.
멱등성을 보장하면 요청이 일부만 완료되었건 전부 완료되었건 간에 상관 없이 타임아웃 이후에도 요청을 재시작할 수 있습니다.
반복적으로 실패하는 요청 때문에 시스템 리소스가 더 많이 소모되지 않도록 모든 재시작을 보고하도록 하고, 재시작을 제한할 수 있어야 합니다.

>
- Isolate failures.
The architecture of the site must prevent cascading failures.
Always "fail fast." When dependent services fail, mark them as down and stop using them to prevent threads from being tied up waiting on failed components.

- 장애를 격리할 것.

사이트의 아키텍처는 연쇄적인 장애를 미연에 방지해야 합니다.
항상 "빠르게 실패"해야 합니다.
의존관계에 있는 서비스가 장애가 나면 해당 서비스를 다운된 것으로 표시하고 사용을 중단해서, 장애가 난 컴포넌트를 기다리는 스레드가 리소스를 점유하는 것을 막아야 합니다.

>
- Use shipping and proven components.
Proven technology is almost always better than operating on the bleeding edge.
Stable software is better than an early copy, no matter how valuable the new feature seems.
This rule applies to hardware as well.
Stable hardware shipping in volume is almost always better than the small performance gains that might be attained from early release hardware.

- 배포되고 검증된 컴포넌트를 사용할 것.

검증된 기술이 최신 기술을 사용하는 것보다 더 나은 경우가 거의 대부분입니다.
새로운 기능이 아무리 괜찮아 보여도, 아직 초기 버전이라면 안정적인 소프트웨어가 더 나은 선택입니다.
이 원칙은 하드웨어에도 적용됩니다.
성능을 조금 향상시키기 위해 초기 릴리스된 하드웨어를 쓰는 것보다, 대량으로 출시되는 안정적인 하드웨어를 쓰는 것이 거의 항상 더 낫습니다.

>
- Implement inter-service monitoring and alerting.
If the service is overloading a dependent service, the depending service needs to know and, if it can't back-off automatically, alerts need to be sent.
If operations can't resolve the problem quickly, it needs to be easy to contact engineers from both teams quickly.
All teams with dependencies should have engineering contacts on the dependent teams.

- 서비스 간 모니터링과 알림을 구현할 것.

의존성이 있는 서비스에 과부하가 걸린다면 해당 서비스를 의존하고 있는 서비스에서 그 사실을 알아야 하며,
만약 자동으로 백오프[^auto-back-off]할 수 없다면 알림을 보내야 합니다.
운영팀에서 신속하게 문제를 해결할 수 없는 상황이라면 양쪽 팀의 엔지니어에게 빠르게 연락할 수 있어야 합니다.
의존관계가 있는 모든 팀에는 의존하는 팀의 엔지니어와 연락할 수 있는 연락처가 있어야 합니다.

>
- Dependent services require the same design point.
Dependent services and producers of dependent components need to be committed to at least the same SLA as the depending service.

- 의존 관계에 있는 서비스들끼리는 동일한 설계 포인트를 둘 것.

의존 관계에 있는 서비스와 의존하는 컴포넌트를 만드는 사람은 의존하는 서비스와 최소한 동일한 SLA를 보장해야 합니다.

>
- Decouple components.
Where possible, ensure that components can continue operation, perhaps in a degraded mode, during failures of other components.
For example, rather than re-authenticating on each connect, maintain a session key and refresh it every N hours independent of connection status.
On reconnect, just use existing session key.
That way the load on the authenticating server is more consistent and login storms are not driven on reconnect after momentary network failure and related events.

- 컴포넌트들을 디커플링할 것.

가능한 한, 컴포넌트는 다른 컴포넌트에 장애가 발생한 동안에도 성능 저하 모드로라도 계속 작동할 수 있어야 합니다.
예를 들어 연결할 때마다 다시 인증을 하는 대신, 세션 키를 유지하도록 해서 연결 상태와 관계 없이 N시간마다 인증을 갱신하도록 합니다.
재연결을 할 때에는 기존의 세션 키를 사용하면 됩니다.
이렇게 하면 인증 서버의 부하가 더 일정하게 유지되고, 잠시 동안 네트워크 장애가 발생한 이후에도 로그인 폭풍이 발생하지 않습니다.

#### Release Cycle and Testing

릴리스 주기와 테스팅

>
Testing in production is a reality and needs to be part of the quality assurance approach used by all internet-scale services.
Most services have at least one test lab that is as similar to production as (affordably) possible and all good engineering teams use production workloads to drive the test systems realistically.
Our experience has been, however, that as good as these test labs are, they are never full fidelity.
They always differ in at least subtle ways from production.
As these labs approach the production system in fidelity, the cost goes asymptotic and rapidly approaches that of the production system.

프로덕션 환경에서의 테스트는 가장 현실에 가까운 테스트이며, 모든 인터넷 규모의 서비스에서 사용하는 품질보증 접근방식의 일부가 되어야 합니다.

대부분의 서비스에는 프로덕션 환경과 최대한 (저렴하면서) 비슷한 테스트 공간이 하나 이상 있으며,
모든 우수한 엔지니어링 팀은 프로덕션 워크로드를 사용해 테스트 시스템을 현실적으로 구동합니다.
그러나 우리의 경험상, 이런 테스트 공간은 아무리 훌륭하다 하더라도 완벽하지는 않았습니다.

테스트 환경은 항상 프로덕션 환경과 미묘하게 다릅니다.
이러한 테스트 환경이 프로덕션 환경과 유사해질수록 비용은 기하급수적으로 증가하게 되어, 결국 프로덕션 환경의 비용에 빠르게 가까워집니다.

>
We instead recommend taking new service releases through standard unit, functional, and production test lab testing and then going into limited production as the final test phase.
Clearly we don't want software going into production that doesn't work or puts data integrity at risk, so this has to be done carefully.
The following rules must be followed:
>
- the production system has to have sufficient redundancy that, in the event of catastrophic new service failure, state can be quickly be recovered,
- data corruption or state-related failures have to be extremely unlikely (functional testing must first be passing),
- errors must be detected and the engineering team (rather than operations) must be monitoring system health of the code in test, and
- it must be possible to quickly roll back all changes and this roll back must be tested before going into production.

따라서 우리는 새로운 서비스 릴리스에 대해 표준 단위, 기능, 프로덕션 테스트를 거쳐 제한된 프로덕션 환경으로 넘어가는 것을 권장합니다.

작동하지 않거나 데이터 무결성을 해치는 소프트웨어가 프로덕션에 적용되는 것을 원하지 않기 때문에, 이 과정은 신중하게 수행되어야 합니다.
이를 위해서는 다음의 규칙들을 반드시 따라야 합니다.

- 신규 서비스로 인한 치명적인 장애가 발생하더라도 상태를 신속하게 복구할 수 있는 충분한 이중화가 프로덕션 시스템에 있어야 합니다.
- 데이터 손상이나 상태 관련 장애가 발생할 가능성이 매우 낮아야 합니다. (기능 테스트가 먼저 통과되어야 합니다.)
- (운영팀이 아닌) 엔지니어링 팀이 테스트 중인 코드의 시스템 상태를 모니터링하고, 오류를 감지해야 합니다.
- 모든 변경 사항은 신속하게 롤백할 수 있어야 하며, 그러한 롤백도 프로덕션에 적용되기 전에 테스트되어야 합니다.

>
This sounds dangerous.
But we have found that using this technique actually improves customer experience around new service releases.
Rather than deploying as quickly as possible, we put one system in production for a few days in a single data center.
Then we bring one new system into production in each data center.
Then we'll move an entire data center into production on the new bits.
And finally, if quality and performance goals are being met, we deploy globally.
This approach can find problems before the service is at risk and can actually provide a better customer experience through the version transition.
Big-bang deployments are very dangerous.

이런 방법이 위험해 보일 것입니다.
하지만 이 방법을 사용하면 실제로 새로운 서비스 릴리스에 대한 고객 경험이 개선된다는 사실을 발견했습니다.

1. 일단 가능한 선에서 빨리 배포하는 대신, 하나의 시스템을 단일 데이터 센터에서 며칠 동안 프로덕션에 배치합니다.
2. 그런 다음 각 데이터 센터에서 새로운 시스템을 하나씩 프로덕션에 도입합니다.
3. 그리고 전체 데이터 센터를 새로운 버전에 대한 프로덕션 환경으로 전환합니다.
4. 마지막으로 품질과 성능 목표가 충족되면 전 세계에 배포합니다.

이러한 접근 방법은 서비스가 위험에 처하기 전에 문제를 발견할 수 있게 해주며, 버전 전환을 통해 실제로 더 나은 고객 경험을 제공할 수도 있습니다.
빅뱅 배포는 매우 위험합니다.

>
Another potentially counter-intuitive approach we favor is deployment mid-day rather than at night.
At night, there is greater risk of mistakes.
And, if anomalies crop up when deploying in the middle of the night, there are fewer engineers around to deal with them.
The goal is to minimize the number of engineering and operations interactions with the system overall, and especially outside of the normal work day, to both reduce costs and to increase quality.

직관적으로는 이상한 접근 방법으로 보일 수 있겠지만, 우리는 밤보다는 낮에 배포하는 것을 선호합니다.
밤에는 실수할 위험이 더 큽니다.
또한 한밤중에는 배포하다 문제가 발생하더라도 그 문제를 해결할 수 있는 엔지니어의 수가 더 적습니다.

목표는 엔지니어링과 운영팀이 시스템과 상호작용하는 횟수를 전반적으로 최소화하고, 특히 정상적인 업무 시간 이외에 이런 상호작용을 최소화함으로써 비용을 줄이고 품질을 높이는 것입니다.

>
Some best practices for release cycle and testing include:

릴리스 주기와 테스트에 대한 몇 가지 모범 사례는 다음과 같습니다.

>
- Ship often.
Intuitively one would think that shipping more frequently is harder and more error prone.
We've found, however, that more frequent releases have less big-bang changes.
Consequently, the releases tend to be higher quality and the customer experience is much better.
The acid test of a good release is that the user experience may have changed but the number of operational issues around availability and latency should be unchanged during the release cycle.
We like shipping on 3-month cycles, but arguments can be made for other schedules.
Our gut feel is that the norm will eventually be less than three months, and many services are already shipping on weekly schedules.
Cycles longer than three months are dangerous.

- 자주 배포하세요.

느낌상으로는 자주 배포하면 더 어렵고 오류도 더 발생하기 쉬울 거라고 생각할 수 있습니다.
하지만 우리는 릴리스 빈도가 높을수록 큰 폭의 변경(big-bang changes)도 줄어들게 된다는 사실을 발견했습니다.
결과적으로 릴리스의 품질이 향상되고 고객 경험도 훨씬 더 좋아지는 경향을 끌어낼 수 있습니다.

사용자 경험은 변할 수 있지만, 릴리스 주기 동안 가용성과 지연 시간에 관한 운영 이슈의 수는 변하지 않아야 하는 것이 좋은 릴리스에 대한 결정적인 시험이라 할 수 있습니다.

우리는 3개월 주기로 릴리스하는 것을 선호하지만, 다른 방식의 일정을 적용할 수도 있습니다.
우리의 직감으로는 결국 3개월 미만이 표준이 될 것으로 보며, 이미 많은 서비스가 주 단위(week)로 출시되고 있습니다.
3개월보다 긴 주기는 위험합니다.

>
- Use production data to find problems.
Quality assurance in a large-scale system is a data-mining and visualization problem, not a testing problem.
Everyone needs to focus on getting the most out of the volumes of data in a production environment.
A few strategies are:
    - Measurable release criteria. Define specific criteria around the intended user experience, and continuously monitor it. If availability is supposed to be 99%, measure that availability meets the goal. Both alert and diagnose if it goes under.
    - Tune goals in real time. Rather than getting bogged down deciding whether the goal should be 99% or 99.9% or any other goal, set an acceptable target and then ratchet it up as the system establishes stability in production.
    - Always collect the actual numbers. Collect the actual metrics rather than red and green or other summary reports. Summary reports and graphs are useful but the raw data is needed for diagnosis.
    - Minimize false positives. People stop paying attention very quickly when the data is incorrect. It's important to not over-alert or operations staff will learn to ignore them. This is so important that hiding real problems as collateral damage is often acceptable.
    - Analyze trends. This can be used for predicting problems. For example, when data movement in the system diverges from the usual rate, it often predicts a bigger problem. Exploit the available data.
    - Make the system health highly visible. Require a globally available, real-time display of service health for the entire organization. Have an internal website people can go at any time to understand the current state of the service.
    - Monitor continuously. It bears noting that people must be looking at all the data every day. Everyone should do this, but make it the explicit job of a subset of the team to do this.

- 프로덕션 데이터를 사용해 문제를 찾아낼 것.

대규모 시스템에서의 품질 보증은 테스트 문제보다는 데이터 마이닝과 시각화에 달려 있습니다.
모든 사람이 프로덕션 환경의 방대한 데이터를 최대한 활용하는 데 집중해야 합니다.
이를 위한 전략들은 다음과 같습니다.

- 릴리즈 기준을 달성했는지 측정할 것. 사용자들이 어떤 경험을 갖기를 바라는지에 대해 구체적인 기준을 정의하고, 이를 지속적으로 모니터링합니다. 가용성이 99% 여야 하는 경우라면, 가용성 목표를 달성하고 있는지를 측정하세요. 목표를 달성하지 못하고 있다면 알림을 날리고 원인을 진단해야 합니다.

- 실시간으로 목표를 조정할 것.
목표가 99% 인지, 99.9% 인지, 아니면 다른 목표인지 결정하는데 시간을 낭비하지 말고, 우선 수용 가능한 목표를 설정한 다음 시스템이 프로덕션 환경에서 안정성을 확립할 때마다 목표를 높여나가세요.

- 항상 실제 수치를 수집할 것.
빨간색 초록색 등으로 요약된 보고서가 아닌 실제 지표를 수집하세요.
요약 보고서와 그래프는 유용하긴 하지만, 정확한 진단을 위해서는 원시 데이터가 필요합니다.

- 거짓 양성을 최소화할 것.
사람들은 정확하지 않은 데이터에 대해 매우 빠르게 관심을 잃어갑니다.
너무 많은 알림을 보내지 않도록 주의해야 합니다.
그렇지 않으면 운영 직원들이 알림을 무시하게 될 것입니다.
이것은 매우 중요한 문제인데, 실제적인 문제를 부수적인 피해로 여겨 숨겨지는 상황도 종종 허용되곤 합니다.

- 추세를 분석할 것.
추세를 분석하면 문제를 예측할 수 있습니다.
예를 들어 시스템 내 데이터 이동이 평소와 다른 속도로 변화한다면, 더 큰 문제를 예측하는 상황으로 이어지는 경우가 많습니다.
사용 가능한 데이터를 최대한 활용하세요.

- 시스템 상태를 눈으로 확인하기 좋게 만들 것.
전체 조직에서 전역적으로 사용 가능한 실시간 서비스 상태 표시를 요구하세요.
언제든지 직원들이 들어가서 서비스의 현재 상태를 파악할 수 있는 내부 웹사이트를 만드세요.

- 지속적으로 모니터링할 것.
사람들이 하루도 빠짐없이 모든 데이터를 살펴보고 있어야 한다는 것을 명심하세요.
모든 사람이 이 일을 해야 하지만, 팀의 하위 집합에게는 이 작업을 명시적으로 맡겨야 합니다.

>
- Invest in engineering.
Good engineering minimizes operational requirements and solves problems before they actually become operational issues.
Too often, organizations grow operations to deal with scale and never take the time to engineer a scalable, reliable architecture.
Services that don't think big to start with will be scrambling to catch up later.

- 엔지니어링에 투자할 것.
좋은 엔지니어링은 운영 요구 사항을 최소화하고, 실제 운영 문제가 발생하기 전에 문제를 해결합니다.
규모 확장에 대응하기 위해 운영팀을 확장하는 조직은 매우 많이 있지만,
확장 가능하고 안정적인 아키텍처를 엔지니어링하는 데 시간을 할애하는 조직은 많지 않습니다.
처음부터 큰 그림을 그리지 않는 서비스는 나중에 따라잡기 위해 뒤늦게 애쓰게 될 것입니다.

>
- Support version roll-back. Version roll-back is mandatory and must be tested and proven before roll-out. Without roll-back, any form of production-level testing in very high risk. Reverting to the previous version is a rip cord that should always be available on any deployment.

- 버전 롤백을 지원할 것.
버전 롤백은 필수적이며, 배포 전에 테스트되고 검증되어야 합니다.
롤백이 없다면 어떤 형태의 프로덕션 수준 테스트라도 매우 높은 위험을 수반하게 됩니다.
이전 버전으로 되돌릴 수 있는 것은 모든 배포에서 항상 가능해야 합니다.

>
- Maintain forward and backward compatibility. This vital point strongly relates to the previous one. Changing file formats, interfaces, logging/ debugging, instrumentation, monitoring and contact points between components are all potential risk. Don't rip out support for old file formats until there is no chance of a roll back to that old format in the future.

- 앞뒤 버전과의 호환성을 유지할 것.
이 항목은 바로 앞의 것과 밀접한 관련이 있습니다.
파일 포맷, 인터페이스, 로깅/디버깅, 계측, 모니터링, 컴포넌트 간의 연결 포인트를 변경하는 것은 모두 잠재적인 위험 요소입니다.
미래에 '이전 포맷으로 롤백할 가능성이 사라질 때'까지는 이전 파일 포맷의 지원을 중단하면 안됩니다.

>
- Single-server deployment.
This is both a test and development requirement.
The entire service must be easy to host on a single system.
Where single-server deployment is impossible for some component (e.g., a dependency on an external, non-single box deployable service), write an emulator to allow single-server testing.
Without this, unit testing is difficult and doesn't fully happen.
And if running the full system is difficult, developers will have a tendency to take a component view rather than a systems view.

- 단일 서버 배포.
이것은 테스트와 개발 관점의 요구 사항입니다.
전체 서비스는 단일 시스템에서 쉽게 호스팅할 수 있어야 합니다.
일부 컴포넌트 때문에 단일 서버 배포가 불가능하다면(예: 단일 서버 배포 불가능한 외부 서비스에 대한 의존), 단일 서버 테스트를 허용하는 에뮬레이터를 개발하세요.
이렇게 하지 않으면 단위 테스트가 어렵고 완전히 수행되지도 않습니다.
또한 전체 시스템을 실행하는 것이 어렵다면, 개발자들이 시스템 관점보다는 개별 컴포넌트 기준의 관점을 취하게 되는 경향이 있습니다.

>
- Stress test for load.
Run some tiny subset of the production systems at twice (or more) the load to ensure that system behavior at higher than expected load is understood and that the systems don't melt down as the load goes up.


- 부하 테스트를 수행할 것.
예상보다 높은 부하에서 시스템이 어떻게 동작하는지 파악하고 부하가 증가해도 시스템이 다운되지는 않는지 확인하기 위해, 프로덕션 시스템의 작은 하위 집합에 두 배(또는 그 이상)의 부하를 주는 테스트를 하세요.

>
- Perform capacity and performance testing prior to new releases.
Do this at the service level and also against each component since work load characteristics will change over time.
Problems and degradations inside the system need to be caught early.

- 새 릴리스 전에 용량 및 성능 테스트를 수행할 것.
서비스 전체 레벨에서, 그리고 시간의 흐름에 따라서도 부하 특성이 달라질 수 있기 때문에 각 컴포넌트 단위에서 이런 테스트를 수행하세요.
시스템 내부의 문제와 저하를 조기에 발견해야 합니다.


>
- Build and deploy shallowly and iteratively.
Get a skeleton version of the full service up early in the development cycle.
This full service may hardly do anything at all and may include shunts in places but it allows testers and developers to be productive and it gets the entire team thinking at the user level from the very beginning.
This is a good practice when building any software system, but is particularly important for services.

- 얕게, 반복적으로 빌드하고 배포할 것.
개발에 들어선 주기 초반에 전체 서비스의 뼈대 버전을 빨리 만드세요.
이렇게 만든 전체 서비스는 거의 아무것도 하지 않을 수도 있고, 몇몇 기능이 작동하지 않을 수도 있지만 테스터와 개발자가 생산적으로 일할 수 있게 해주며, 팀 전체가 처음부터 사용자 관점으로 생각하게 만들어줍니다.
이것은 모든 종류의 소프트웨어 시스템을 구축할 때 좋은 방법이며 특히 서비스를 구축할 때 더 중요합니다.

>
- Test with real data.
Fork user requests or workload from production to test environments.
Pick up production data and put it in test environments.
The diverse user population of the product will always be most creative at finding bugs.
Clearly, privacy commitments must be maintained so it's vital that this data never leak back out into production.

- 실제 데이터로 테스트할 것.
프로덕션 환경의 사용자의 요청이나 워크로드 등을 테스트 환경으로 포크하세요.
프로덕션 데이터를 가져와서 테스트 환경에 적용하세요.
제품의 다양한 사용자 집단은 다양한 버그를 항상 가장 창의적인 방법으로 찾아내곤 합니다.
물론 개인 정보 보호에 대한 약속을 지켜야 하므로, 이 데이터가 프로덕션 환경으로 다시 유출되지 않도록 주의해야 합니다.

>
- Run system-level acceptance tests. Tests that run locally provide sanity check that speeds iterative development. To avoid heavy maintenance cost they should still be at system level.

- 시스템 레벨의 인수 테스트(acceptance test)를 수행할 것.
로컬에서 실행하는 테스트는 반복적인 개발 속도를 가속화하는 건전성 검사를 제공합니다.
유지 보수 비용이 많이 드는 것을 방지하려면 이런 테스트들은 여전히 시스템 레벨에서 수행되어야 합니다.


>
- Test and develop in full environments.
Set aside hardware to test at interesting scale.
Most importantly, use the same data collection and mining techniques used in production on these environments to maximize the investment.

- 전체 환경에서 테스트하고 개발할 것.
특정한 규모에서 테스트할 수 있는 하드웨어를 따로 마련하세요.
가장 중요한 것은, 이 환경에서 프로덕션에서 사용하는 것과 동일한 데이터 수집 및 마이닝 기법을 사용해서 투자 효율을 극대화하는 것입니다.


#### Hardware Selection and Standardization

작업중

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
[^auto-back-off]: 역주: 백오프, back-off. 네트워크에서 특정 컴포넌트가 과부하가 걸리거나 장애 상태가 되었을 때 요청률을 일시적으로 줄이는 전략. 이를 통해 장애를 완화하는 시간을 확보하고, 더 심각한 상황이 되는 것을 방지한다. 이진 지수 백오프(Binary Exponential Backoff) 등이 대표적 예.
