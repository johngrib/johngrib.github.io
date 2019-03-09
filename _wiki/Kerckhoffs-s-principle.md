---
layout  : wiki
title   : 커코프의 원칙(Kerckhoffs's principle)
summary : 암호의 안전성은 알고리즘이 아니라 키의 비밀성에만 의존해야 한다
date    : 2018-10-10 09:27:05 +0900
updated : 2018-10-10 09:57:22 +0900
tag     : encryption
toc     : true
public  : true
parent  : proverb
latex   : false
---
* TOC
{:toc}

# 의미

* 암호화 알고리즘이 공개되어도, 키만 잘 지키면 안전할 수 있는 암호 체계를 만들어야 한다.
    * 우리가 어떤 암호화 알고리즘을 사용하고 있는지 공격자가 알고 있어도, 공격이 어려워야 한다.
    * 실제 환경에서는 알고리즘을 잘 안 바꾸고, 쓰던 것을 계속 사용하곤 한다.
        * 키의 비밀성을 유지하는 것보다 알고리즘의 비밀성을 유지하는 것이 더 어렵다.
    * 알고리즘이 공개되면, 더 많은 버그를 찾아내어 알고리즘을 개선시킬 수 있다.
        * 비공개 알고리즘을 상대적으로 신뢰하기 어려운 이유.
    * 비밀이 적으면 적을수록 시스템은 안전하다.


# 기원

* 1883년, La Cryptographie Militaire에 실린 커코프(Auguste Kerckhoffs)의 글에서 비롯됐다.
* 군사용 암호의 설계 원칙에 대한 내용이다.

[원문][PDF]은 프랑스어지만, 다음은 [위키백과][WIKI]의 내용을 인용한 것이다.

>
1. The system must be practically, if not mathematically, indecipherable;
2. It should not require secrecy, and it should not be a problem if it falls into enemy hands;
3. It must be possible to communicate and remember the key without using written notes, and correspondents must be able to change or modify it at will;
4. It must be applicable to telegraph communications;
5. It must be portable, and should not require several persons to handle or operate;
6. Lastly, given the circumstances in which it is to be used, the system must be easy to use and should not be stressful to use or require its users to know and comply with a long list of rules.
>
Some are no longer relevant given the ability of computers to perform complex encryption, but his second axiom, now known as Kerckhoffs's principle, is still critically important.

다음은 [한국어 위키백과][KOREAN]에 실린 번역문이다.

>
1. 암호체계는 수학적으로는 해독불가능하지 않다고 하더라도, 실질적으로 그래야한다.
2. 암호체계는 비밀에 붙여질 필요가 없어야만 하며, 적의 손에 떨어지더라도 문제가 없어야 한다.
3. 키는 글로 쓰여지지 않더라도 교환 혹은 보관할 수 있어야 한다. 당사자들의 의지에 의해서 바뀌거나 수정될 수 있어야 한다.
4. 전신에 적용할 수 있어야 한다.
5. 이동이 가능해야하며, 암호 체계의 사용과 기능을 위해 여러 사람의 협력을 필요로 하지 않아야 한다.
6. 마지막으로, 시스템의 활용을 요구하는 여러 상황들이 주어졌을 때, 암호 체계는 이용이 쉬워야 하며, 정신적인 압박감이나 여러 규칙들의 관찰을 필요로 하지 않아야 한다.
>
몇가지 항목들은 복잡한 암호화를 수행할 수 있는 컴퓨터의 존재로 인해 더이상 의미가 없어졌지만, 2번째 항목은 이제 케르크호프스의 원리로 알려지게 되었으며, 아직까지도 매우 중요한 의미를 가지고 있다.


# Links

* [Kerckhoffs's principle (wikipedia)][WIKI]
    * [한국어][KOREAN]
* [Kerckhoffs' principles from « La cryptographie militaire »](http://petitcolas.net/kerckhoffs/index.html )
* [PDF: Auguste Kerckhoffs, « La cryptographie militaire », Journal des sciences militaires, vol. IX, pp. 161–191, Février 1883.][PDF]

[WIKI]: https://en.wikipedia.org/wiki/Kerckhoffs%27s_principle
[KOREAN]: https://ko.wikipedia.org/wiki/%EC%BC%80%EB%A5%B4%ED%81%AC%ED%98%B8%ED%94%84%EC%8A%A4%EC%9D%98_%EC%9B%90%EB%A6%AC
[PDF]: http://petitcolas.net/kerckhoffs/crypto_militaire_2.pdf

