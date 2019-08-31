---
layout  : wiki
title   : 헐리우드 원칙(Hollywood Principle)
summary : "Do not call us, we call You."
date    : 2019-08-31 13:30:16 +0900
updated : 2019-08-31 16:29:20 +0900
tag     : 
toc     : true
public  : true
parent  : proverb
latex   : false
---
* TOC
{:toc}

# 기원

헐리우드에서 오디션에 실패한 배우들이 듣던 말이라고 한다.

누가 가장 먼저 한 말인지는 알 수 없으나
미국의 저널리스트이자 TV 쇼 패널이었던 Dorothy Mae Kilgallen이 1944년에 쓴 칼럼에 이 문구가 나온 것이 가장 오랜 기록인 것으로 보인다.

>
17 March 1944, Lowell (MA) Sun, Dorothy Kilgallen column, pg. 23, cols. 3-4:  
Fables from the Forties:  
Our heroine could have had any number of good jobs behind a desk, but her passion was singing. She’d have sung for nothing if any one had let her, but even at those rates the opportunities were few and far between. Audition after audition left her with nothing but “Sorry” and “Not the type” and “Don’t call us, we’ll call you” and a heart that was close to breaking.

[출처](https://www.barrypopik.com/index.php/new_york_city/entry/dont_call_us_well_call_you/ )

# Inversion of Control 과의 관계

## GoF의 디자인 패턴

헐리우드 원칙은 "GoF의 디자인 패턴"의 [[template-method-pattern]]{템플릿 메서드 패턴} 챕터에서 찾아볼 수 있다. GoF는 **inverted control**이라는 표현을 쓴다.

> Template methods lead to an inverted control structure that's sometimes referred to as "the Hollywood principle,"
that is, "Don't call us, we'll call you".
This refers to how a parent class calls the operations of a subclass and not the other way around.

국내 출간된 GoF의 책에서는 다음과 같이 번역되어 있다.

> 템플릿 메서드는 "할리우드 원칙(Hollywood principle)"이라는 역전된 제어 구조를 끌어냅니다.
"전화하지 마세요. 우리가 연락할게요(Don't call us, we'll call you)."라는 것입니다.
다시 말해, 부모 클래스는 서브클래스에 정의된 연산을 호출할 수 있지만 반대 방향의 호출은 안 됩니다.

그리고 아래쪽에 역자인 김정아 님의 다음과 같은 주석이 있다.[^kim]

> 옮긴이 주: 뽑기 어려운 사원에게 나중에 연락할 테니 자꾸 전화하지 말라는 회사 측의 말로 자주 쓰인다.
1960년대 미국에서 면접관들이 쓰기 시작한 말인데,
나중에 극장에서 배우들의 오디션을 보고 거절할 때 더 많이 써 유명해졌다.

## Michael Mattson의 1996년 논문

한편 Inversion of Control 단어가 처음 등장했다고 하는 Michael Mattson의 1996년 논문 [Object-Oriented Frameworks: A survey of methodological issues][o-o-framework]의 Conclusions (98쪽) 부분을 읽어보면 다음과 같은 문단이 있다.

>
The major difference between an object-oriented framework and a class library is that the framework calls the application code. Normally the application code calls the class library. This inversion of control is sometimes named the Hollywood principle, "Do not call us, we call You".  
<br/>
객체지향 프레임워크와 클래스 라이브러리의 큰 차이점은 프레임워크가 애플리케이션 코드를 호출한다는 것입니다. 일반적으로는 애플리케이션 코드가 클래스 라이브러리를 호출합니다. 이러한 제어의 역전(inversion of control)은 때때로 헐리우드 원칙이라고도 합니다. "우리에게 전화(call)하지 마세요. 우리가 당신을 부를(call) 것입니다".

## Head First Design Patterns

헤드 퍼스트 디자인 패턴의 템플릿 메소드 패턴 챕터를 보면 굉장히 친절한 설명이 있다.

>
헐리우드 원칙을 활용하면 "의존성 부패(dependency rot)"를 방지할 수 있습니다.
어떤 고수준 구성요소가 저수준 구성요소에 의존하고, 그 저수준 구성요소는 다시 고수준 구성요소에 의존하고,
그 고수준 구성요소는 다시 또 다른 구성요소에 의존하고,
그 다른 구성요소는 또 저수준 구성요소에 의존하는 것과 같은 식으로 의존성이 복잡하게 꼬여있는 것을 의존성 부패라고 부릅니다.
이렇게 의존성이 부패되면 시스템이 어떤 식으로 디자인된 것인지 거의 아무도 알아볼 수 없게 되죠.  
<br/>
헐리우드 원칙을 사용하면, 저수준 구성요소에서 시스템에 접속을 할 수는 있지만, 언제 어떤 식으로 그 구성요소들을 사용할지는 고수준 구성요소에서 결정하게 됩니다.
즉, 고수준 구성요소에서 저수준 구성요소에게 "먼저 연락하지 마세요. 제가 먼저 연락 드리겠습니다"라고 얘기를 하는 것과 같죠.

# 함께 읽기

* [[spring-ioc]]{Inversion of Control}
* [[template-method-pattern]]{템플릿 메소드 패턴}

# 참고문헌

* 웹 문서
    * [Phrase Finder](https://www.phrases.org.uk/meanings/dont-call-us.html )
    * ["Don't call us, we'll call you" (entertainment saying) (barrypopik.com)](https://www.barrypopik.com/index.php/new_york_city/entry/dont_call_us_well_call_you/ )
* 서적
    * GoF의 디자인 패턴 / Erich Gamma 외 3인 공저 / 김정아 역 / 피어슨에듀케이션코리아(PTG) / 초판 6쇄 2005년 10월 20일
    * GoF의 디자인 패턴(개정판) / 에릭 감마, 리처드 헬름, 랄프 존슨, 존 블라시디스 공저 / 김정아 역 / 프로텍미디어 / 발행 2015년 03월 26일
    * Head First Design Patterns / 에릭 프리먼 등저 / 서환수 역 / 한빛미디어 / 초판 16쇄 2017년 5월 10일

# 주석

[^kim]: 김정아 님의 주석은 2005년 번역본에는 없고, 프로텍미디어에서 출판한 2015년 개정판에 있다.

[o-o-framework]: https://www.semanticscholar.org/paper/Object-Oriented-Frameworks-%3A-A-Survey-of-Issues-Mattsson/1d13fcb7b9b2bef5e2be3728d3168588a0e55c47
