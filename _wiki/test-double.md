---
layout  : wiki
title   : Test Double(테스트 더블)
summary :
date    : 2019-07-07 07:46:18 +0900
updated : 2019-07-07 09:46:14 +0900
tag     : test
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# 테스트 더블?

* [xUnit Test Patterns](http://www.acornpub.co.kr/book/xunit )의 저자인 제라드 메스자로스(Gerard Meszaros)가 만든 용어로, [스턴트 더블](https://en.wikipedia.org/wiki/Stunt_double )(영화 촬영에서 말하는 스턴트 대역 배우)에서 아이디어를 얻었다고 한다.
    * [스턴트 더블 이미지](https://www.google.co.kr/search?q=stunt+double&lr=&complete=1&hl=ko&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjnx6Dnu6HjAhUbwIsBHSZSDyIQ_AUIECgB&biw=960&bih=977 )를 검색해보면 마치 쌍둥이 같은 스턴트 더블 배우들의 멋진 사진을 볼 수 있다.

제라드 메스자로스는 [Test Double 문서](http://xunitpatterns.com/Test%20Double.html )에서 다음과 같이 테스트 더블을 소개한다.

> When we are writing a test in which we cannot (or chose not to) use a real depended-on component (DOC), we can replace it with a Test Double. The Test Double doesn't have to behave exactly like the real DOC; it merely has to provide the same API as the real one so that the SUT thinks it is the real one!

* 테스트 코드를 작성할 때 실제 DOC(depoended-on component; 의존 구성 요소)를 사용할 수 없다면, DOC 대신 테스트 더블로 대체할 수 있음.
* 테스트 더블은 실제 DOC와 똑같이 행동하지 않아도 되며, 똑같은 API만 제공하면 된다.


한편 마틴 파울러는 자신의 블로그에서 제라드 메스자로스의 테스트 더블 개념을 다음과 같이 짧게 소개한다.

> Test Double is a generic term for any case where you replace a production object for testing purposes. There are various kinds of double that Gerard lists:

* 테스트 더블은 테스트 목적을 위해 프로덕션 객체를 다른 무언가로 교체하는 모든 경우를 표현하는 용어이다.

# 테스트 더블의 종류

xunits 문서에서 잘 설명하고 있지만 마틴 파울러의 소개가 간단하여 이해하기 쉬웠다.

>
* Fake objects actually have working implementations, but usually take some shortcut which makes them not suitable for production (an [InMemoryTestDatabase](https://www.martinfowler.com/bliki/InMemoryTestDatabase.html ) is a good example).
* Stubs provide canned answers to calls made during the test, usually not responding at all to anything outside what's programmed in for the test.
* Spies are stubs that also record some information based on how they were called. One form of this might be an email service that records how many messages it was sent.
* Mocks are pre-programmed with expectations which form a specification of the calls they are expected to receive. They can throw an exception if they receive a call they don't expect and are checked during verification to ensure they got all the calls they were expecting.

* Dummy 객체는 전달되지만 실제로는 사용되지 않는다. 일반적으로 매개 변수 목록을 채우기 위해 사용된다.
* Fake 객체는 실제로 작동하는 구현이지만 일반적으로 프로덕션에는 적합하지 않은 꼼수를 사용한다(InMemoryTestDatabase 가 좋은 예).
* Stub은 테스트 중에 호출되면 미리 준비된 결과를 제공한다. 보통은 테스트를 위해 프로그래밍한 내용이 아니면 응답하지 않는다.
* Spy는 자신이 호출된 방법/과정 등의 정보를 기록하는 stub. 보낸 메일의 수를 기록하는 이메일 서비스를 예로 들 수 있다.
* Mock은 호출했을 때 사전에 정의된 명세대로의 결과를 돌려주도록 미리 프로그램되어있다. 예상치 못한 호출이 있을 경우 예외를 던질 수 있으며, 모든 호출이 예상된 것이었는지 확인할 수 있다.



# Links

* [Test Double(xUnit Patterns.com)](http://xunitpatterns.com/Test%20Double.html )
* [Test Double(MARTINFOWLER.com)](https://www.martinfowler.com/bliki/TestDouble.html )
