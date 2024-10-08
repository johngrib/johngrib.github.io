---
layout  : wiki
title   : 무협지 주인공 제임스 고슬링(James Gosling)
summary : 중학생 때 전산학과에 침입해 독학으로 프로그래밍을 터득
date    : 2018-02-08 12:06:18 +0900
updated : 2024-08-31 20:51:27 +0900
tag     : story james-gosling 인물 gnu emacs
resource: E7/46DD4B-8AB0-4CFC-BD41-F4156B282929
toc     : true
public  : true
parent  : [[/people]]
latex   : false
---
* TOC
{:toc}

## Links

- [트위터](https://x.com/errcraft )
- [링크드인](https://www.linkedin.com/in/jamesgosling/ )

## 제임스 고슬링 인터뷰 중에서

>
여름 학기 동안 전산학과에 침입하는 방법을 스스로 깨달았어요.
문마다 번호판이 달린 자물쇠가 있었어요.
문 앞에 와서 비밀번호를 누르면 문이 열리고 들어가는 식이었죠.
그냥 아무렇지도 않게 근처에 서 있다가 번호를 누르는 걸 보기만 하면 됐어요.
일단 그렇게 건물에 들어가기만 하면 사용자 ID나 비밀번호 같은 걸 걸어두지 않은 컴퓨터가 많이 있었죠.
TSS8이라는 운영체제를 돌리는 시간 공유 PDP-8 장비를 아주 많이 썼어요.
처음에는 거의 뼈대만 있는 PDP-8으로 시작했죠.
어떤 연구실 한 구석에 있는, 아무도 쓰지 않는 컴퓨터였죠.
그걸로 혼자 공부하기 시작했어요.
처음에 배운 언어는 공식 계산기<sup>FOrmula CALculator</sup>에서 이름을 따온 Focal5라는 이름의 언어였어요.
포트란하고 비슷한 일을 해 주는 꽤 단순한 언어였죠.
곡선을 인쇄한다든가 블랙잭, 솔리테어 게임 같은 걸 하기도 했어요.
그리고 Focal5가 워낙 제한이 많은 언어였기 때문에 어셈블리 언어도 배우기 시작했어요.
그렇게 PDP-8에서 어셈블리 코드를 만들기 시작했죠.
거의 비슷한 시기에 여기저기 돌아다니다가 그 대학교에서 수업용으로 쓰던 IBM 컴퓨터(IBM 360, 50, 40시리즈 등)도 건드리기 시작했어요.
그걸로 포트란 프로그램하고 PL1 프로그램을 만들었죠.
그리고 좀 있다가 학교에서 CDC 컴퓨터를 구입하기 시작했고,
CDC 포트란을 쓰는 방법도 공부했죠.
언젠가부터 대학생들하고 어울리기 시작했어요.
대학생들은 제가 아직 고등학교도 들어가지 못한 어린 학생이라는 걸 금세 알아챘죠.
별로 개의친 않았어요. 수업 조교들도 다들 제가 겨우 중학생이라는 걸 알고 있는 것 같았어요.
제가 뭘 부수거나 하지만 않으면 제가 근처에서 놀아도 신경 쓰지 않는 분위기였죠.
교수님도 두 분 알게 됐는데, 신기하다는 반응이었어요.
얼마 안 있어서 교수님 중 한 분이 물리학과와 함께 일하게 돼서 소프트웨어 만드는 걸 도와줄 사람이 필요했는데, 저한테 물어보더라고요.
그렇게 갓 15살이 됐을 무렵에 물리학과에서 일하게 됐어요.
그 후로 앞만 보고 여기까지 오게 된 것 같습니다.
[^interview]

## 제임스 고슬링과 emacs

* Emacs를 만든 리처드 스톨만이 GNU용으로 다시 만들 때 Gosling Emacs의 코드를 사용할지 고민했다고 한다.
    * 그러나 그러지는 않았다.

> 스톨먼은 GNU용 이맥스를 바닥에서부터 작성하기보다는 고슬링 이맥스(Gosling Emacs)라고 불리는 프로그램에서 코드를 빌려왔다. 이 프로그램은 Gosmacs 혹은 gmacs라고 불렸는데 제임스 고슬링이 카네기멜런 대학원생 시절이었던 1981년에 만든 것이다. 고슬링이 이 프로그램을 만들면서 자유롭게 배포해도 된다고 했고, 고슬링과 함께 작업했던 개발자가 스톨먼에게 말하기를 그 프로그램의 코드를 다른 프로젝트에 사용했지만 아무 문제도 없었다고 했기 때문에 스톨먼은 GNU용 이맥스에 고슬링의 코드를 집어넣어도 괜찮으리라고 믿었다. 하지만 결국은 그렇지 않았다. 고슬링은 1984년에 Gosmacs를 유니프레스(UniPress)라는 소프트웨어 회사에 팔았는데 이 회사는 스톨먼의 의도를 알게 되자 GNU에게 법적 소송을 하겠다고 위협했다.  
결국 마침내 스톨먼은 길고 힘든 길을 따라가기로 마음을 굳혔다. 그는 완전히 바닥에서부터 GNU용 이맥스 프로그램을 작성했다. 유니프레스나 기타 다른 곳에서 쓰는 사용 코드가 전혀 섞여 있지 않은 GNU 이맥스는 1985년에 완성되었고 GNU가 성공적으로 발표한 최초의 프로그램이 되었다.
[^emacs]

## 어떤 사건이 경력 전환에 영향을 주었나?

>
당신이 태어난 1955년 이후로 어떤 역사적인 사건이 자신의 경력을 전환시키는 데 영향을 주었다고 생각하십니까?
>
**제임스** 네, 살아오는 동안 많은 사건들이 있었습니다.
나의 부모님은 카네기 멜론 대학에서 2마일 떨어진 곳에 살고 있었습니다.
저는 거기에서 중학교와 고등학교 시절을 보냈습니다.
고등학교에 다니고 있을 때 물리학 분야에서 일을 얻게 되었는데 정말 대단한 경험이었죠.
대부분의 사람들은 많은 일을 동시에 해내고 있던 카네기 멜론 대학에 가는 것이 미친 짓이라고 생각했습니다.
ARPANET(Advanced Research Projects Agency Network)이 생겼을 때 모든 종류의 네트워킹 프로토콜이 바로 그곳에서 만들어졌습니다.
저는 거의 30년 전[^ed-burns-203-when]에 처음으로 네트워크 프로토콜 스택을 작성했습니다.
>
**에드** 그것은 TCP(Transmission Control Protocol) 형식 같은 것이었습니까?
>
**제임스** 그것은 TCP의 선조격이었죠. 저는 실제로 상당수의 프로토콜을 작성했습니다.
제가 했던 일 중의 하나는 아마 PUP VSP(PARC Universal Packet Vendor Specific Protocol) 프로토콜들의 독립적인 구현이었을 겁니다.
PUP VSP를 찾아보면 이들은 TCP/IP(Transmission Control Protocol/Internet Protocol)의 변형임을 알 수 있습니다.
사실 VSP를 만들면서 배운 것들이 실제로 TCP/IP 설계에 영향을 주었습니다.
저는 아주 일찍이 최저 수준에서 어떤 일이 일어나는지를 알았습니다.
[^ed-burns-7]

## IT 분야에 입문하는 사람들에게

>
**에드** 그건 그렇고 IT 분야라는 이 게임에 뒤늦게 들어오려는 사람들을 위해 당신의 입장에서는 어떤 충고를 해주시겠습니까?
아마 이들은 갓 대학을 졸업했겠죠? 그들은 집에서 8비트 컴퓨터를 가지고 놀면서 자란 경험이 없습니다.
이들의 첫 컴퓨터는 이미 펜티엄이나 그 이상의 기종이었겠죠, 그런 역사적 배경을 가지고 있지 않는 경우 이들에게 어떻게 설명해야 할까요?
>
**제임스** 독서가 많은 도움을 줄 겁니다. 즐겨야 합니다. 네트워킹 프로토콜을 가지고 놀아야 하죠.
재미삼아 자신만의 것을 구현해 보고 버리기도 해야 합니다.
>
**에드** 이제 성공적인 개발자들의 특성에 관해 알아볼 때가 된 것 같습니다.
방금 언급한 것처럼 호기심이 그런 특성 중의 하나입니다.
성공적인 개발자의 몇 가지 다른 특징에 관해 말씀해 주시겠습니까?
>
**제임스** 끈기가 필요합니다.
어떤 것이 제대로 동작하지 않을 때 고집스런 집중력으로 도대체 문제가 무엇인지 알아내려고 하는 모습입니다.
많은 사람들은 쉽게 포기합니다. 하지만 하는 일에 정말 몰두하는 사람도 있습니다.
계속해서 전진할 수 있는 유일한 방법은 쓸데없는것 을 버리는 것입니다.
저는 버리는 데 선수이죠.
중요하다고 생각하는 것들은 대개 최소 세 번은 그것이 필요하다고 확신한 것입니다.
중요한 것일수록 더 자주 버려야 합니다.
많은 사람들은 프로그램을 작성하기 전에 앉아서 어떤 것을 상당히 심도 있게 분석합니다.
그래서 저는 이런 행동을 버려야 할 것이라고 가정하고 선행 분석을 거의 수행하지 않습니다.
샤워장이든 어디서든 골똘히 생각하겠지만 "코딩을 시작할 시간"이라는 임계값은 낮습니다.
저는 생각한 것을 코딩하기 시작합니다.
사람들은 제가 어디선가 코딩한 이런 개념을 활용하기 시작하고 저는 이 개념이 잘 동작하도록 조금씩 손을 봅니다.
잘 안되면 다른 것을 찾아 다시 시도하죠.
저는 직접 해보는 것을 아주 신뢰합니다.
배우는 과정에서 배우는 것이죠.
>
**에드** 협업 기술은 어떤가요?
>
**제임스** 분명히 중요한 부분이죠.
협업은 재미있는 부분인데 대부분의 사람들이 실제로 위기에 빠질 때 동작하는 협업 본능이 특정 코드나 알고리즘 같기 때문입니다.
저는 적어도 두어 가지의 협업의 다른 수준을 발견했습니다.
하나는 "나는 내가 맡은 일을 하고 당신은 당신의 일을 하고 이 일들을 하나로 만드는 것"입니다.
또 다른 하나는 두 사람이 동일한 알고리즘을 바라보고 결과를 만들어 내려고 하는 것입니다.
>
**에드** 짝 프로그래밍이군요.
>
**제임스** 데이터 구조 및 알고리즘을 만들기 위해 짝 프로그래밍 또는 화이트보드에서 짝으로 일하는 겁니다.
적어도 저는 제가 누군가와 함께 할 수 없는 경우가 아니라면 실제로 두 번째인 짝 프로그래밍으로 더 성공했습니다.
>
**에드** 서로 잘 맞아야겠죠.
>
**제임스** 그것은 어울림이 필요하고 어울림은 상당히 흔치 않다는 것을 발견했습니다.
나이가 들어 더 성미가 까다로워질수록 이런 모습은 드물어집니다.
그러나 멋지게 프로그래밍할 수 있는 사람들이 있습니다.
당신이 그런 사람이라면 멋지겠죠.
그러나 당신이 그런 사람이 아니라면......
집단은 동적이어서 거기서 각자 어떤 부분을 맡고 있고 당신은 그 부분이 서로 어울리게 하는 것이 중요하죠.
거의 모든 뛰어난 프로젝트들은 더 많은 사람들이 어울려 작업합니다.
[^ed-burns-7]

## 제임스 고슬링이 영향을 받은 책들

>
빌 울프(Bill Wulf)가 지은 『"The Design of an Optimizing Compiler(Elsevier, 1980)』라는 책이 있었죠.
제가 수강했던 한 과정은 기본적으로 "그 책을 읽고 그 책에 관해 많은 대화"를 하는 것이었습니다.
신선한 경험이었죠.
>
**에드** 그럼, 당신의 경력에서 유용성을 발견한 다른 책은 어떤 것이 있습니까?
많은 사람들이 헤롤드 아벨슨(Harold Abelson)과 제럴드 제이 서스먼(Gerald Jay Sussman)이 집필한 『컴퓨터 프로그램의 구조와 해석(Structure and Interpretation of Computer Programs (SICP), MIT Press, 1996)』을 컴퓨터 과학 교과서의 표준으로 참조합니다.
>
**제임스** 저의 경우는 다릅니다. 저에게 큰 영향을 끼쳤던 책은 윌리엄 알렌 울프(William Allan Wulf)가 집필한 『The Design of an Optimizing Compiler (Elsevier, 1980)』였습니다.
그 하나가 가장 큰 영향을 끼쳤죠.
브라이언 커닝햄(Brian Kernighan)과 데니스 리치(Dennis Ritchie)가 집필한 『C 언어 프로그래밍(The C Programming Language, Prentice Hall, 1988)』도 그 하나입니다.
Simula 67 매뉴얼은 저에게 대단한 물건이었습니다.
도날드 크누스(Donald E. Knuth) 시리즈도 빼놓을 수 없습니다.
>
**에드** 『The Art of Computer Programming』 말씀이시죠?
>
**제임스** 도날드 크누스가 집필한 『The Art of Computer Programm-ing(Addison-Wesley Professional, 1998)』은 정말 대단한 책입니다.
저는 PP8 및 CDC6000 시리즈 같은 장비에 대한 아키텍처 매뉴얼로부터 대단히 많은 것을 얻었습니다.
저는 이들 모두를 거의 100번 가까이 읽었습니다.
[^ed-burns-7]

## 은퇴 선언

[2024-07-02, 제임스 고슬링은 LinkedIn에 다음 글을 올렸다](https://www.linkedin.com/posts/jamesgosling_ive-finally-retired-after-a-crazy-number-activity-7213740307538956289-26YU/ ).

>
I've finally retired.
After a crazy number of years as a software engineer, it's time for me to just have fun.
The last 7 years at Amazon have been great, despite COVID-19 and industrial craziness.
I've got a long list of side projects to plough through. It'll be fun.

드디어 은퇴했습니다.
수많은 세월 동안 소프트웨어 엔지니어로 지냈고, 이제는 그냥 즐길 시간이 되었네요.
COVID-19와 혼란스러운 업계 상황에도 불구하고 아마존에서의 마지막 7년은 멋진 나날이었습니다.
처리해야 할 사이드 프로젝트 목록이 아직 길게 남아있습니다. 재미있겠어요.

## 참고문헌

* 세상을 뒤흔든 프로그래머들의 비밀 / 에드 번즈 저 / 김도균 역 / 정보문화사 / 초판 1쇄 발행: 2010년 02월 19일 / 원제: Secrets of the Rock Star Programmers: Riding the IT Crest
* 프로그래머로 사는 법 / 샘 라이트스톤 저/서환수 역 / 한빛미디어 / 초판 4쇄 2013년 12월 30일 / 원서 : Making it Big in Software: Get the Job. Work the Org. Become Great.
* 프리-오픈소스 소프트웨어 혁명의 역사 / 크리스토퍼 토찌 저/이재범 역 / 지식함지 / 초판 1쇄 2019년 12월 12일

## 주석

[^interview]: 프로그래머로 사는 법. 326쪽.
[^emacs]: 프리-오픈소스 소프트웨어 혁명의 역사. 2장. 91쪽.
[^ed-burns-203-when]: [Ed Burns의 이 책은 McGraw Hill에서 2008년 3월 13일에 1판이 출간됐다](https://www.amazon.com/Secrets-Rock-Star-Programmers-Riding/dp/0071490833 ). 따라서 30년전이라면 1970 년대 후반일 것이다.

[^ed-burns-7]: 세상을 뒤흔든 프로그래머들의 비밀. 인터뷰 7.
