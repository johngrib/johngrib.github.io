---
layout  : wiki
title   : Test Double(테스트 더블)
summary :
date    : 2019-07-07 07:46:18 +0900
updated : 2019-07-13 18:37:21 +0900
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


## (책) xUnit 테스트 패턴에서의 용어 정리

다음은 "xUnit 테스트 패턴"의 부록 B를 참고해 작성한 것이다.

* **SUT**: System Under `Test`, 테스트 대상 시스템, 테스트를 하려는 대상.

<table>
  <thead>
    <tr>
      <th>패턴</th>
      <th>목적</th>
      <th>동작이 있는가</th>
      <th>SUT에 간접 입력 주입</th>
      <th>SUT 간접 출력 처리</th>
      <th>테스트(테스터)가 제공하는 값</th>
      <th>예제</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td> 가짜 객체<br/>Fake Object </td>
      <td>(실행할 수 없는) 테스트를 (빠르게) 실행</td>
      <td>있음</td>
      <td>없음</td>
      <td>간접 출력을 사용함</td>
      <td>없음</td>
      <td>메모리 데이터베이스 에뮬레이터</td>
    </tr>
    <tr>
      <td>더미 객체<br/>Dummy Object</td>
      <td>속성이나 메소드 인자</td>
      <td>없음</td>
      <td>하지 않음</td>
      <td>하지 않음</td>
      <td>없음</td>
      <td>
        <code class="highlighter-rouge">Null</code>,<br/>
        <code class="highlighter-rouge">'Ignored String'</code>,<br/>
        <code class="highlighter-rouge">new Object</code>
      </td>
    </tr>
    <tr>
      <td>모의 객체<br/>Mock Object</td>
      <td>SUT의 간접 출력 검증</td>
      <td>있음</td>
      <td>선택 사항</td>
      <td>기대 값과 비교해 정확한지 검증</td>
      <td>입력(선택 사항)과 기대 출력</td>
      <td></td>
    </tr>
    <tr>
      <td>임시 테스트 스텁<br/>Temporary Test Stub</td>
      <td>아직 작성하지 않은 프로시저 코드 대신에 집어넣기 위해</td>
      <td>있음</td>
      <td>없음</td>
      <td>간접 출력을 사용함</td>
      <td>없음</td>
      <td>메모리 데이터베이스 에뮬레이터</td>
    </tr>
    <tr>
      <td>테스트 스텁<br/>Test Stub</td>
      <td>SUT의 간접 입력 검증</td>
      <td>있음</td>
      <td>한다</td>
      <td>무시함</td>
      <td>입력</td>
      <td></td>
    </tr>
    <tr>
      <td>테스트 스파이<br/>Test Spy</td>
      <td>SUT의 간접 출력 검증</td>
      <td>있음</td>
      <td>선택 사항</td>
      <td>나중에 검증하려고 갈무리해 둠</td>
      <td>입력(선택 사항)</td>
      <td></td>
    </tr>
  </tbody>
</table>





# Links

* [Test Double(xUnit Patterns.com)](http://xunitpatterns.com/Test%20Double.html )
* [Test Double(MARTINFOWLER.com)](https://www.martinfowler.com/bliki/TestDouble.html )

# 참고문헌

* xUnit 테스트 패턴 / 제라드 메스자로스 저 / 박일 역 / 에이콘출판사 / 2011년 11월 10일 / 원제 : xUnit Test Patterns: Refactoring Test Code
