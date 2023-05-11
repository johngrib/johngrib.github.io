---
layout  : wiki
title   : On Designing and Deploying Internet-Scale Services By James Hamilton - Windows Live Services Platform
summary : 인터넷 규모의 서비스 설계와 배포에 대하여
date    : 2023-05-11 22:01:08 +0900
updated : 2023-05-11 23:19:02 +0900
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

### Overall Application Design

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


