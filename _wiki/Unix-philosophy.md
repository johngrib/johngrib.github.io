---
layout  : wiki
title   : Unix philosophy
summary : 유닉스 철학
date    : 2018-07-15 07:34:20 +0900
updated : 2018-07-15 10:18:57 +0900
tag     : 
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# 기원

* [위키백과에 의하면](https://en.wikipedia.org/wiki/Unix_philosophy )
유닉스 철학은 Ken Tompson에 의해 고안되었다.
* 최초로 문서화된 것은 1978년, THE BELL SYSTEM TECHNICAL JOURNAL. 7월/8월호.
    * 해당 저널은 격월간이었던 것으로 보이며(JULY-AUGUST 1978), 57호였다.
    * 57호의 표제는 "UNIX TIME-SHARING SYSTEM".
    * Douglas McIlroy가 Foreword(서문, 머리말)을 썼는데, 이 서문의 "Style" 부분에 유닉스 철학의 개념들이 등장한다.

![THE BELL SYSTEM TECHNICAL JOURNAL](https://user-images.githubusercontent.com/1855714/42728954-3538fff4-8803-11e8-88ad-aa2f297773f5.png )

# 유닉스 철학

다음은 Doublas McIlroy가 쓴 Foreword의 "Style" 부분이다(1902쪽).

>
Style
A number of maxims have gained currency among the builders and users of the UNIX system to explain and promote its characteristic style:  
(i) Make each program do one thing well. To do a new job, build afresh rather than complicate old programs by adding new "features."  
(ii) Expect the output of every program to become the input to another, as yet unknown, program. Don't clutter output with extraneous information. Avoid stringently columnar or binary input formats. Don't insist on interactive input.  
(iii) Design and build software, even operating systems, to be tried early, ideally within weeks. Don't hesitate to throw away the clumsy parts and rebuild them.  
(iv) Use tools in preference to unskilled help to lighten a programming task, even if you have to detour to build the tools and expect to throw some of them out after you've finished using them.  

번역하자면 다음과 같다.

1. 각 프로그램이 한 가지 일을 잘 하도록 만들 것. 새로운 작업을 할 때에는 오래된 프로그램에 새로운 "기능"을 추가해 복잡하게 만들지 말고, 새로운 프로그램을 만들 것.
2. 모든 프로그램의 출력이 아직 알려지지 않은 다른 프로그램의 입력으로도 쓰일 수 있다고 고려할 것. 무관한 정보로 출력을 어지럽히지 말 것. 엄격하게 열을 맞춰야 하거나 바이너리 형태로 된 입력 포맷은 사용하지 말 것. 대화형 입력을 고집하지 말 것.
3. 소프트웨어를 설계하고 만들 때, 가까운 시간 안에 실행해 돌려볼 수 있도록 작업할 것. 몇 주 내에 첫 결과물이 나올 수 있도록 하는 것이 이상적이다. 만드는 것이 운영체제라 하더라도 똑같다. 어설픈 부분이 있으면 주저하지 말고 다시 만들 것.
4. 프로그래밍 작업을 줄이고자 할 때에는, 어설픈 수작업보다 도구를 사용하는 쪽을 선호할 것. 설령 도구를 빌드하기 위해 한참 돌아가야 하고 사용 후 바로 버린다 하더라도 도구를 써서 일을 끝낼 것.

## Peter H. Salus의 요약

Eric Raymond는 The Art of Unix Programming에서
[Peter H. Salus](https://en.wikipedia.org/wiki/Peter_H._Salus )가 [요약한 유닉스 철학을 다음과 같이 소개](http://www.catb.org/~esr/writings/taoup/html/ch01s06.html )하였다.

>
This is the Unix philosophy: Write programs that do one thing and do it well. Write programs to work together. Write programs to handle text streams, because that is a universal interface.

번역하자면 다음과 같다.

>
유닉스 철학이란 이러하다:
* 프로그램이 한 가지 일을 잘 하도록 만들어라.
* 프로그램이 서로 협력하도록 만들어라.
* 프로그램이 텍스트 스트림을 처리하도록 만들어라.
    * 텍스트 스트림은 범용 인터페이스이기 때문이다.

## Rob Pike의 6가지 규칙

한편 Eric Raymond는 Rob Pike의 여섯 가지 규칙도 언급한다.

Rob Pike는 [Notes on Programming in C](http://www.lysator.liu.se/c/pikestyle.html )의 Complexity 파트에 다음과 같이 썼다.

>
Most programs are too complicated - that is, more complex than they need to be to solve their problems efficiently.  Why? Mostly it's because of bad design, but I will skip that issue here because it's a big one.  But programs are often complicated at the microscopic level, and that is something I can address here.  
<br/>
Rule 1.  You can't tell where a program is going to spend its time.  Bottlenecks occur in surprising places, so don't try to second guess and put in a speed hack until you've proven that's where the bottleneck is.
<br/>
Rule 2.  Measure.  Don't tune for speed until you've measured, and even then don't unless one part of the code overwhelms the rest.
<br/>
      Rule 3.  Fancy algorithms are slow when n is small, and n is usually small.  Fancy algorithms have big constants. Until you know that n is frequently going to be big, don't get fancy.  (Even if n does get big, use Rule 2 first.)   For example, binary trees are always faster than splay trees for workaday problems.
<br/>
Rule 4.  Fancy algorithms are buggier than simple ones, and they're much harder to implement.  Use simple algorithms as well as simple data structures.
<br/>
The following data structures are a complete list for almost all practical programs:
<br/>
array  
linked list  
hash table  
binary tree  
<br/>
Of course, you must also be prepared to collect these into compound data structures.  For instance, a symbol table might be implemented as a hash table containing linked lists of arrays of characters.
<br/>
Rule 5.  Data dominates.  If you've chosen the right data structures and organized things well, the algorithms will almost always be self­evident.  Data structures, not algorithms, are central to programming.  (See Brooks p. 102.)
<br/>
Rule 6.  There is no Rule 6.

대충 번역하자면 다음과 같다.

>
대부분의 프로그램들은 너무 복잡하다. 말하자면, 문제를 해결하는 데에 필요한 정도보다 더 복잡하다.
왜 그럴까? 대부분은 잘못된 디자인 때문이지만, 그건 너무나 굉장한 주제이기 때문에 여기서는 언급하지 않는다.
그러나 프로그램은 종종 미세한 부분에서부터 복잡합니다. 이에 대해 언급하고자 한다.
<br/>
* 규칙 1. 프로그램이 충분히 빠르다고 말하지 말 것. 병목은 생각지도 못한 곳에서 발생하곤 하기 때문에, 함부로 추측하지 말고 병목의 위치를 찾아내기 전까지 스피드 핵을 할 것.
* 규칙 2. 측정할 것. 측정하기 전에는 속도를 조정하지 말 것. 심지어 한 부분의 코드가 나머지 전체의 속도를 좌우한다고 해도 측정 없이 속도를 조정하지 말 것.
* 규칙 3. 근사한 알고리즘은 n이 작으면 느린 경우가 많다. 그리고 대부분의 경우, n은 작다. 근사한 알고리즘들은 기본적인 비용이 있기 마련이다. n이 빈번하게 큰 값이 된다는 것을 알기 전까지는 멋을 부리지 말 것(심지어 n이 꽤 커지더라도 규칙 2를 먼저 적용할 것).
* 규칙 4. 근사한 알고리즘은 심플한 알고리즘보다 버그가 생기기 쉽고, 구현하기도 어렵다. 심플한 알고리즘과 심플한 자료 구조를 사용할 것.
    * 거의 모든 실용적인 프로그램들은 다음의 자료구조들만 써도 된다.
        * 배열
        * 링크드 리스트
        * 해시 테이블
        * 이진 트리
    * 물론 이런 자료구조를 합친 콜렉션을 쓸 줄도 알아야 한다.
* 규칙 5. 데이터가 최고다. 올바른 자료 구조를 선택하고 잘 조직하면, 알고리즘은 자연히 따라올 것이다. 프로그래밍의 핵심은 알고리즘이 아니라 자료구조다.
* 규칙 6. 규칙 6은 없다.

# Links

* [Unix philosophy(wikipedia)](https://en.wikipedia.org/wiki/Unix_philosophy )
* [The Art of Unix Programming(Eric Raymond)](http://www.catb.org/~esr/writings/taoup/html/index.html )
    * [Basics of the Unix Philosophy](http://www.catb.org/~esr/writings/taoup/html/ch01s06.html )
* [Notes on Programming in C(Rob Pike)](http://www.lysator.liu.se/c/pikestyle.html )
* 인물
    * [Ken Tompson](https://en.wikipedia.org/wiki/Ken_Thompson )
    * [Douglas McIlroy](https://en.wikipedia.org/wiki/Douglas_McIlroy )
    * [Peter H. Salus](https://en.wikipedia.org/wiki/Peter_H._Salus )

