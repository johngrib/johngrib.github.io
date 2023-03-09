---
layout  : wiki
title   : Why Do You Need PGP? by Phil Zimmermann
summary : PGP가 필요한 이유 - 필 짐머만
date    : 2023-03-09 22:06:47 +0900
updated : 2023-03-09 23:39:32 +0900
tag     : 
resource: BF/3FF85D-D7C5-4256-AE86-CEC02C0AED02
toc     : true
public  : true
parent  : [[/clipping]]
latex   : false
---
* TOC
{:toc}

## 번역: Why Do You Need PGP?

- 원문: [Why Do You Need PGP?]( https://groups.csail.mit.edu/mac/classes/6.805/articles/crypto/cypherpunks/zimmermann-why-pgp.html )
- 이 글은 PGP User's Guide, vol. 1 (1994년 8월)에 실린 필 짐머만의 글을 번역한 것입니다.
- 의역이 많으므로 원문과 대조해가며 읽기를 권합니다.
- 초벌 번역에 [DeepL Translator]( https://www.deepl.com/translator )를 사용하였습니다.

>
Why Do You Need PGP?  
by Phil Zimmermann  
from PGP User's Guide, vol. 1  
August, 1994 edition

<span/>

>
It's personal.
It's private.
And it's no one's business but yours.
You may be planning a political campaign, discussing your taxes, or having an illicit affair.
Or you may be doing something that you feel shouldn't be illegal, but is.
Whatever it is, you don't want your private electronic mail (E-mail) or confidential documents read by anyone else.
There's nothing wrong with asserting your privacy.
Privacy is as apple-pie as the Constitution.

개인 정보이기 때문입니다.
사생활이기 때문입니다.
그리고 다른 누구도 아닌 여러분 자신의 일이기 때문입니다.
여러분은 정치적인 일을 계획하고 있거나, 세금에 대해 논의하고 있거나, 불법적인 일을 저지르는 중일 수 있습니다.
아니면 불법이 아니어야 한다고 생각하고는 있지만 실제로는 불법인 것 같은 일을 하고 있을 수도 있습니다.
그러나 어쨌건 간에, 개인용 전자 메일(E-mail)이라던가 내 기밀 문서 같은 것을 생판 남이 읽게 되는 것을 여러분은 원하지 않을 것입니다.
프라이버시를 주장하는 것은 잘못이 아닙니다.
프라이버시는 헌법만큼 중요한 권리입니다.

>
Perhaps you think your E-mail is legitimate enough that encryption is unwarranted.
If you really are a law-abiding citizen with nothing to hide, then why don't you always send your paper mail on postcards?
Why not submit to drug testing on demand?
Why require a warrant for police searches of your house?
Are you trying to hide something?
You must be a subversive or a drug dealer if you hide your mail inside envelopes.
Or maybe a paranoid nut. Do law-abiding citizens have any need to encrypt their E-mail?

여러분 중에는 내 이메일은 불법적인 내용이 없어서 암호화가 필요 없다고 생각하는 분이 있을 수 있습니다.
하지만 만약 우리가 숨길 것이 없는 당당한 준법 시민이라면 왜 편지를 전부 우편엽서로 보내지 않는 걸까요?
누가 약물 검사를 하자고 할 때 우리가 거절하고 보는 이유가 뭘까요?
경찰이 집을 수색하려 할 때 우리는 왜 영장을 요구할까요?
우리가 뭔가를 숨기고 있기 때문인가요?
편지를 봉투 안에 숨기는 사람이 있다면 그 사람은 체제를 전복하려는 사람이거나 마약상일까요?
아니면 편집증 환자일까요?
법을 잘 지키는 시민이 이메일을 왜 암호화하려 할까요?

>
What if everyone believed that law-abiding citizens should use postcards for their mail?
If some brave soul tried to assert his privacy by using an envelope for his mail, it would draw suspicion.
Perhaps the authorities would open his mail to see what he's hiding.
Fortunately, we don't live in that kind of world, because everyone protects most of their mail with envelopes.
So no one draws suspicion by asserting their privacy with an envelope.
There's safety in numbers.
Analogously, it would be nice if everyone routinely used encryption for all their E-mail, innocent or not, so that no one drew suspicion by asserting their E-mail privacy with encryption.
Think of it as a form of solidarity.

만약 세상 모든 사람들이 '준법시민은 편지를 보낼 때 무조건 엽서만 써야 한다'고 믿는다면 어떨 것 같은가요?
만약 어떤 용기있는 사람이 편지봉투에 편지를 넣어서 프라이버시를 지키려 한다면?
그 사라은 의심을 받게 될 것입니다.
당국은 그가 뭘 숨기려 하는지 확인하려고 우편물을 개봉하게 될 것입니다.
다행히도 우리는 그런 세상에 살고 있지 않습니다.
왜냐하면 모든 사람들이 봉투를 써서 우편물 대부분을 보호하고 있기 때문입니다.
그래서 편지봉투를 써서 사생활을 숨긴다는 이유로 의심을 받는 일은 일어나지 않습니다.
많은 사람에 의해 안전이 유지되고 있는 것입니다.
이와 유사하게, 모든 사람이 모든 이메일에 일상적으로 암호화를 사용한다면, 죄가 있건 없건, 암호화를 통해 이메일 프라이버시를 주장함으로써 의심을 받는 사람도 없게 될 것입니다.
이것을 일종의 연대의식이라 생각할 수 있습니다.

>
Today, if the Government wants to violate the privacy of ordinary citizens, it has to expend a certain amount of expense and labor to intercept and steam open and read paper mail, and listen to and possibly transcribe spoken telephone conversation.
This kind of labor-intensive monitoring is not practical on a large scale. This is only done in important cases when it seems worthwhile.

정부가 일반 시민의 프라이버시를 침해하려면 상당한 비용과 인력을 동원해서 우편물을 가로채서 뜯어보고, 전화 통화를 녹음해야 합니다.
이런 방식의 노동 집약적인 감시는 대규모로 실행하기 어렵기 때문에 그럴만한 가치가 있다고 판단되는 중대한 경우에만 일어납니다.

>
More and more of our private communications are being routed through electronic channels.
Electronic mail is gradually replacing conventional paper mail.
E-mail messages are just too easy to intercept and scan for interesting keywords.
This can be done easily, routinely, automatically, and undetectably on a grand scale.
International cablegrams are already scanned this way on a large scale by the NSA.

점점 더 많은 개인적인 통신이 전자적 채널을 통해 이루어지고 있습니다.
전자 메일이 종이 편지를 점차 대체하고 있는 상황입니다.
하지만 이메일은 너무 쉽게 탈취될 수 있고, 흥미로운 키워드를 통해 탐지될 수도 있습니다.
이는 손쉽게, 일상적으로, 자동적으로, 그리고 파악하기 어려울 정도로 대규모로 일어날 수 있는 일입니다.
이미 미국 국가안보국(NSA)는 이런 식으로 국제 전신을 대규모로 스캔하고 있습니다.

>
We are moving toward a future when the nation will be crisscrossed with high capacity fiber optic data networks linking together all our increasingly ubiquitous personal computers.
E-mail will be the norm for everyone, not the novelty it is today.
The Government will protect our E-mail with Government-designed encryption protocols.
Probably most people will acquiesce to that.
But perhaps some people will prefer their own protective measures.

우리는 점점 더 보편화되고 있는 모든 개인용 컴퓨터를 연결하는 대용량 광섬유 데이터 네트워크가 전 국토에 깔리는 미래를 향해 나아가고 있습니다.
이메일은 요즘처럼 신기한 문물이 아니라 모든 사람의 상식이 될 것입니다.
정부는 정부가 직접 설계한 암호화 프로토콜로 우리의 이메일을 보호하려 할 것입니다.
그리고 대부분의 사람들은 이를 묵인하게 될 것입니다.
하지만 어떤 사람들은 자신만의 보호 조치를 취하고 싶어할 수 있습니다.

>
Senate Bill 266, a 1991 omnibus anti-crime bill, had an unsettling measure buried in it.
If this non-binding resolution had become real law, it would have forced manufacturers of secure communications equipment to insert special "trap doors" in their products, so that the Government can read anyone's encrypted messages.
It reads: "It is the sense of Congress that providers of electronic communications services and manufacturers of electronic communications service equipment shall insure that communications systems permit the Government to obtain the plain text contents of voice, data, and other communications when appropriately authorized by law."
This measure was defeated after rigorous protest from civil libertarians and industry groups.

1991년 일괄범죄 방지법안인 상원 법안 266에는 불안한 내용이 숨겨져 있었습니다.
구속력이 없는 이 결의안이 실제 법으로 제정되었다면, 보안 통신장비 제조업체는 제품에 특수한 "트랩 도어"를 설치하게 됐을 것입니다.
그러면 정부는 모든 사람의 암호화된 메시지를 읽을 수 있게 되었을 것입니다.
그 내용은 이렇습니다.
"전자 통신 서비스 제공업체와 전자 통신 서비스 장비 제조업체는 법류에 의해 적절하게 승인된 경우 정부가 음성, 데이터 및 기타 통신의 일반 텍스트 내용을 얻을 수 있도록 통신 시스템을 보장해야 한다는 것이 의회의 의견이다."
이 법안은 시민 자유주의자들과 업계의 거센 항의 끝에 무산되었습니다.

>
In 1992, the FBI Digital Telephony wiretap proposal was introduced to Congress.
It would require all manufacturers of communications equipment to build in special remote wiretap ports that would enable the FBI to remotely wiretap all forms of electronic communication from FBI offices.
Although it never attracted any sponsors in Congress in 1992 because of citizen opposition, it was reintroduced in 1994.

1992년에는, FBI의 디지털 전화 도청 제안이 의회에 제출되기도 했습니다.
이 법안은 모든 통신장비 제조업체에 특수한 원격 도청 포트를 구축하도록 요구하는 것으로,
FBI가 FBI 사무실에서 모든 형태의 전자 통신을 원격으로 도청할 수 있게 하는 내용을 갖고 있습니다.
이 법안은 1992년 시민들의 반대 때문에 의회에서 지지를 얻지 못했지만, 1994년에 다시 도입되었습니다.

>
Most alarming of all is the White House's bold new encryption policy initiative, under development at NSA since the start of the Bush administration, and unveiled April 16th, 1993.
The centerpiece of this initiative is a Government-built encryption device, called the "Clipper" chip, containing a new classified NSA encryption algorithm.
The Government is encouraging private industry to design it into all their secure communication products, like secure phones, secure FAX, etc.
AT&T is now putting the Clipper into their secure voice products.
The catch: At the time of manufacture, each Clipper chip will be loaded with its own unique key, and the Government gets to keep a copy, placed in escrow.
Not to worry, though-- the Government promises that they will use these keys to read your traffic only when duly authorized by law.
Of course, to make Clipper completely effective, the next logical step would be to outlaw other forms of cryptography.

무엇보다도 가장 놀라운 것은, 1993년 4월 16일에 공개된 부시 행정부가 출범한 이후 NSA에서 개발하고 있는 백악관의 대담한 새로운 암호화 정책 계획입니다.
이 계획의 핵심은 "클리퍼" 칩이라는 정부에서 제작한 암호화 장치입니다.
이 장치에는 새로운 종류의 NSA 기밀 암호화 알고리즘이 포함되어 있습니다.
정부는 민간 업계가 보안 전화, 보안 팩스 등 모든 보안 통신 제품에 이 칩을 집어넣도록 권장하고 있습니다.
현재 AT&T도 보안 음성 제품에 클리퍼를 적용하고 있는 상황입니다.
각각의 클리퍼 칩은 제조시에 고유한 키가 탑재되며, 정부는 사본을 에스크로에 보관합니다.
하지만 걱정할 필요가 전~혀 없습니다.
정부는 법에 의해 정식으로 승인된 경우에만 이 키를 사용하여 사용자의 트래픽을 읽을 것이라고 굳게 약속하고 있기 때문입니다.
물론, 클리퍼를 완전히 효과적으로 사용하기 위해 다른 형태의 암호화를 금지하는 다음 단계도 기다리고 있습니다.

>
If privacy is outlawed, only outlaws will have privacy.
Intelligence agencies have access to good cryptographic technology.
So do the big arms and drug traffickers.
So do defense contractors, oil companies, and other corporate giants.
But ordinary people and grassroots political organizations mostly have not had access to affordable "military grade" public-key cryptographic technology.
Until now.

프라이버시가 불법화되면 무법자만 프라이버시를 가질 수 있게 됩니다.
정보 기관은 우수한 암호화 기술에 접근할 수 있습니다.
거대 무기 기업과 마약 밀매업자도 마찬가지입니다.
방위 계약업체, 석유 회사 및 기타 거대 기업도 마찬가지입니다.
하지만 일반인과 풀뿌리 정치 단체는 대부분 저렴한 "군용" 공개 키 암호화 기술에 접근할 수 없었습니다.
지금까지는 말이죠.

>
PGP empowers people to take their privacy into their own hands.
There's a growing social need for it.
That's why I wrote it.

PGP는 사람들이 자신의 개인정보를 스스로 관리할 수 있도록 도와줍니다.
이에 대한 사회적 요구가 점점 커지고 있습니다.
이것이 바로 내가 이 글을 쓴 이유입니다.

## 함께 읽기

- [[/gpg]]

### From: 리얼월드 암호학

>
이메일은 암호화되지 않은 프로토콜로 탄생했으며, 오늘날에도 암호화되지 않았다. 이메일 탄생 당시에는 보안이 최우선이 아니었기 때문이다.
이메일 암호화는 1991년에 PGP<sub>Pretty Good Privacy</sub>라는 도구가 출시된 후 단순한 아이디어 이상이 되기 시작했다.
당시 PGP의 창시자인 필 짐머만이 PGP를 출시하기로 결정한 계기는, 같은 해 초에 가결될 뻔했던 하나의 법안 때문이었다.
이 법안은 미국 정부가 모든 전자 통신 회사 및 제조업체로부터 모든 음성 및 문자 통신을 획득할 수 있도록 허용하는 내용을 담고 있었다.
1994년 에세이 \<Why Do You Need PGP?(PGP가 필요한 이유는 무엇인가?> 에서 필 짐머만은 "PGP는 사람들이 개인 정보를 스스로 관리할 수 있도록 한다. 이에 대한 사회적 요구가 커지고 있다"라고 서술했다.
>
이 프로토콜은 1998년에 [RFC 2440][rfc-2440]에서 OpenPGP로 마침내 표준화되었으며, 거의 같은 시기에 오픈소스 구현인 GNU 프라이버시 가드<sub>GNU Privacy Guard</sub>, GPG가 출시되면서 주목을 받았다.
오늘날에 도 GPG는 여전히 주요 구현이며, 사람들은 GPG와 PGP라는 용어를 거의 같은 의미로 혼용한다.

## 참고문헌

- 리얼월드 암호학 / 데이비드 웡 저/임지순 역 / 제이펍 / 1쇄 발행 2023년 01월 20일 / 원제: Real-World Cryptography

[rfc-2440]: https://www.rfc-editor.org/rfc/rfc2440.html

