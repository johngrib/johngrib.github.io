---
layout  : wiki
title   : 테스트 코드와 반증가능성에 대한 메모
summary : 실패 가능성이 높은 위험한 테스트가 중요하다
date    : 2022-08-30 21:36:47 +0900
updated : 2022-08-31 21:04:54 +0900
tag     : test karl-popper
resource: 53/BE71C3-DD62-47CF-A71A-EFB68F6AC128
toc     : true
public  : true
parent  : [[/article]]
latex   : false
---
* TOC
{:toc}

## 필수 테스트 코드를 충분히 마련하는 이상적인 방법

내가 생각하는 '필수 테스트 코드를 충분히 마련하는 이상적인 방법'은 다음과 같다.

1. 코딩한다.
2. 배포한다.
3. 새로운 버그가 발견되면, 버그를 검출하는 테스트 코드를 작성한다.
4. 버그를 고쳐서 테스트 코드가 통과하게 만든다.
5. 2로 돌아간다.
{:style="background-color: #ecf1e8;"}

이 루프를 무한히 반복하면 치명적인 버그를 모두 해결할 수 있고, 필수적인 테스트 코드도 충분히 마련할 수 있을 것이다.
버그를 잡을 때마다 해당 버그를 검출하는 테스트 코드도 추가된다.
따라서 버그가 되살아나는 일이 발생하면 테스트 코드가 실패하게 되므로 바로 파악해 조치할 수 있게 된다.

물론 이것은 농담이다. 현실에서는 이 방법을 사용할 수 없다.
이 방법은 먼저 제품을 배포해 놓고 사용자들이 버그를 발견하길 기대하고 있기 때문이다.
뿐만 아니라 현실에서 시간은 가장 소중한 자원이다.
한정된 자원을 갖고 있는 조직이나 기업, 개인은 이 루프를 무한히 반복할 수 없다.

관리하고 있는 소프트웨어에 대해 상상할 수 있는 모든 테스트 케이스를 검사하도록 테스트 코드를 작성할 수 있다면 이상적일 것이다.
그러나 그것은 자원의 한계로 인해 불가능하며,
대부분의 경우 **개발자는 어떤 테스트가 필요할지를 능동적으로 생각해서 우선순위를 고려해 테스트 코드를 작성**하게 된다.


## 나의 기준

어떤 테스트 코드 두 개가 있을 때 두 테스트 중 어느 것이 더 중요한지를 판별할만한 기준을 가져두면 유용하다고 생각한다.

각 테스트를 비교해 중요도를 따지는 것은 어려운 일이기도 하고 민감한 문제일 수도 있다.
어떤 종류의 테스트를 우선시할지는 조직마다 프로그래밍 패러다임마다 서로 다를 수 있고,
개인에 한정해서는 경험과 경력과 자신의 프로그래밍 철학에 따라 달라질 수 있는 문제라고도 생각한다.
즉 사람마다 다르다.

이 글에서는 나의 기준을 소개한다.

### 칼 포퍼의 반증가능성

나는 2003년에 철학과 과학철학 수업에서 칼 포퍼의 반증가능성을 배웠는데, 이것이 굉장한 생각의 프레임워크라 생각했다.

칼 포퍼는 어떠한 (과학)이론을 시험하는 기준으로 반증가능성을 제시했다.
이 기준은 꽤 강력한 편이며 내가 그 이후로 다양한 의사결정을 하는 데에도 많은 도움이 되었다.
그런데 이것은 이론이 얼마나 과학적인지를 판별하는 기준이기도 하므로, 테스트 우선순위 판별과도 관련이 있는 일이라 생각한다.

(칼 포퍼의 이론은 이제는 낡은 것으로도 여겨지곤 하지만, 나는 취향과 유용성 때문에 포퍼의 이론을 좋아한다.)

칼 포퍼는 "추측과 논박"에서 다음과 같은 결론을 내리며 이론의 반증가능성을 언급한다.

>
이러한 고찰들을 통해 나는 1919-1920년 겨울에 다음과 같이 재정식화할 수 있는 결론에 이르렀다.
>
> - (1) 만약 우리가 입증을 구한다면, 거의 모든 이론들은 쉽게 입증 되거나 검증될 수 있다.
> - (2) 입증은 위험한 예측들의 결과일 때에만 가치가 있다. 다시 말해서 문제되는 이론에 의해서는 밝혀지지 않았지만, 그 이론과 양립 불가능하여 그 이론을 반박할 수 있는 사건을 우리가 예상할 수 있는 경우에만 입증으로서의 가치가 있는 것이다.
> - (3) \<좋은> 과학적 이론은 모두 일종의 금지이다. 그것은 어떤 일이 일어나는 것을 금지한다. 이론이 금지하는 것이 많으면 많을수록 그 이론은 더 좋은 이론이다.
> - (4) 가능한 어떤 사건에 의해서도 논박될 수 없는 이론은 비과학적이다. 논박 불가능성은 (흔히 생각하듯이) 이론의 장점이 아니라 단점이다.
> - (5) 이론에 대한 참된 시험은 모두 이론을 반증하거나 논박하기 위한 시도이다. 시험 가능성은 반증 가능성이다. 그러나 시험 가능성에는 정도의 차이가 있다. 어떤 이론들은 다른 이론들보다 시험 가능성이 더 높으며 논박의 기회가 더 많이 주어져 있다. 말하자면, 그것들은 더 큰 위험성을 안고 있다.
>
(중략)
>
이 모든 것을 요약하면, 이론의 과학적 지위에 대한 기준은 이론의 반증 가능성이나 논박 가능성, 또는 시험 가능성이라고 할 수 있을 것이다.
>
-- 추측과 논박. 1장. 81쪽.

다음은 반증가능성을 염두에 두고 내가 생각하는 테스트 코드의 우선순위를 나열한 것이다.
위로 올라갈수록 실패 가능성이 떨어지며, 아래로 내려갈수록 더 높은 중요도를 갖는다.

- 어떤 상황에서도 무조건 통과하는 테스트 코드는 바람직하지 않다. 그건 좋은 테스트 같지만 사실은 나쁜 테스트다.
- 코드가 잘 동작하는지 입증하는 테스트 코드를 작성하는 것은 상대적으로 쉬우며 약간 가치있다.
- 코드가 이상하게 동작하는 것을 검사하는 코드는 가치있다.
- 버그를 검사하는 테스트 코드가 가장 가치있다.
    - 특히 버그가 되살아났을 때 실패하는 테스트.
    - 이런 테스트는 절대로 삭제하면 안된다.

**나는 자원 부족으로 인해 모든 테스트를 작성하기 곤란한 상황일 때 항상 이 기준을 생각한다.**

이 기준은 TDD와 직교한다.
TDD 활동과 함께 섞어 쓸 수도 있고, TDD를 하지 않는다 하더라도 활용 가능한 개념이다.
즉 테스트 코드를 먼저 작성하는지 나중에 작성하는지는 이 기준과 무관하다.
나는 테스트 코드를 먼저 작성하건 나중에 작성하건 간에 중요한 테스트가 충분히 있는 것이 가장 중요한 목표라고 생각한다.

## 사례

간단한 사례를 살펴보자.

### 이상 동작을 검사하는 테스트 코드

```java
// + 연산자의 정상 동작을 검사한다
assertTrue(2 == 1 + 1);
assertTrue(3 == 1 + 2);
assertTrue(4 == 1 + 3);
```

내 기준에서는 위의 테스트 코드보다 아래의 테스트 코드가 더 높은 중요도를 갖는다.

```java
// + 연산자의 이상 동작을 검사한다
assertTrue(0 > (1 + Integer.MAX_VALUE));
```


### 무조건 통과하는 테스트 코드

다음은 내가 실제로 목격한 적이 있는 테스트 코드를 기억에 의존해 작성한 것이다.
이 테스트 코드의 문제는 무엇일까?

```java
@BeforeEach
void beforeEach() {
  when(productService.getProducts())
    .thenReturn(PRODUCT_LIST);
}

@Test
@DisplayName("getProducts 메소드는 상품 목록을 리턴한다.")
void it_returns_a_product_list() {
  assertThat(productService.getProducts())
    .isNotEmpty();
}
```

이 테스트 코드는 `getProducts()`의 호출 결과를 검사하고 있는데, `@BeforeEach`에서 `getProducts()`가 무조건 `PRODUCT_LIST`를 리턴하도록 조작을 하고 있다.

만약 `getProducts()`의 구현이 변경되어서 의도하지 않게 언제나 비어 있는 리스트만 리턴하게 되는 버그가 생겼다고 생각해 보자.
이 테스트는 `when` 때문에 그런 치명적인 버그가 생겼을 때에도 통과하게 되어 있다.
마치 화재가 발생해도 경보를 울리지 않는 고장난 화재경보기 같은 테스트 코드라 할 수 있다.

## 함께 읽기
### CODE COMPLETE의 깨끗한 테스트

한편 CODE COMPLETE를 읽어보면 스티브 맥코넬도 이와 비슷한 관점을 드러내고 있음을 알 수 있다.

>
**개발자 테스트는 "깨끗한 테스트"가 되기 쉽다**
>
개발자들은 코드가 깨지는 다양한 상황에 대해서 테스트(dirty 테스트)를 하기보다는 코드가 작동하는지를 살펴보기 위해서 테스트(clean 테스트)하는 경향이 있다.
미숙한 테스트 조직은 모든 dirty 테스트마다 다섯 개 정도의 clean 테스트를 갖는 경향이 있고,
성숙한 테스트 조직은 모든 clean 테스트마다 다섯 개의 dirty 테스트를 갖는 경향이 있다.
이러한 비율은 clean 테스트를 줄임으로써 달성되는 것이 아니라 dirty 테스트보다 25배나 많은 clean 테스트를 생성함으로써 달성되는 것이다(Boris Beizer 1994).
>
-- CODE COMPLETE. 22장. 699쪽.

스티브 맥코넬은 성숙한 테스트 조직이 "깨지는 상황에 대한 테스트", 즉 dirty 테스트를 더 많이 작성한다고 말한다.

>
현실적으로 말하자면 완전한 테스트는 불가능하기 때문에, 가장 오류를 잘 발견할 것 같은 테스트 케이스를 선택하는 것이 바로 테스트의 기술이다.
10<sup>66</sup>개의 가능한 테스트 케이스 중에서 몇 개의 테스트 케이스만이 다른 테스트 케이스들이 드러내지 못하는 오류들을 드러나게 할 것이다.
여러분은 같은 결과를 반복해서 보여주는 것보다는 서로 다른 결과를 보여 주는 몇 가지의 테스트 케이스를 선택하는 데 집중할 필요가 있다.
>
테스트에 대한 계획을 수립할 때, 새로운 것을 말해주지 않는 테스트, 즉 유사한 다른 데이터가 오류를 생산하지 않을 때,
오류를 생산하지 않을 것 같은 새로운 데이터에 대한 테스트를 제거한다.
>
-- CODE COMPLETE. 22장. 701쪽.

### Gunwoo Park 님의 의견

Linkedin에서 Gunwoo Park 님과 나눈 대화를 인용한다.

>
[**Gunwoo Park:**]( https://www.linkedin.com/feed/update/urn:li:activity:6970420519053496320?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A6970420519053496320%2C6970594169010495488%29 )
>
좋은 글 감사합니다.
>
"버그를 검사하는 테스트 코드가 가장 가치있다"라는 명제에 대해서는 공감합니다. 하지만 코드를 작성하면서 어느 부분에서 버그가 일어날지 미리 예측하는 것이 사실상 매우 어렵다는 생각이 듭니다. 경험치가 쌓이면 감이라는게 생기기도 하지만, 이마저도 한계가 있다고 봅니다.
>
제가 전에 다니던 핀테크 회사에 Open API가 나름 정교하게 구성되어 있었는데, 안타깝게도 테스트 코드가 없어서 제가 작성하는 역할을 도맡았습니다. 제 접근 방식은 상당히 많은 수의 E2E 테스트 케이스를 작성하는 것이었습니다. 지금 생각하면 대부분은 clean test case였다고 생각했지만, 저는 양으로 밀어붙이는 것으로 승부를 보았고, 이는 확실하게 효과를 보았습니다. 만약 제가 dirty test case를 뽑아내려고 노력했다면, 더 좋은 결과를 보았을지 의문이 드네요.

<span/>

>
[**JohnGrib Lee:**]( https://www.linkedin.com/feed/update/urn:li:activity:6970420519053496320?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A6970420519053496320%2C6970594169010495488%29&replyUrn=urn%3Ali%3Acomment%3A%28activity%3A6970420519053496320%2C6970596872499453954%29 )
>
좋은 의견 감사합니다. 말씀하신 경우도 훌륭하다고 생각해요. 실제로 저도 테스트 코드를 작성할 때 명백한 경우가 아니면 처음부터 버그를 예측해 만들지는 않습니다. 점진적인 테스트 확보 측면의 관점으로 봐주시면 적절할 것 같습니다. 저는 모든 테스트 코드가 이래야 한다는 일반론이 아니고 제 선호를 말한 것이라 할 수 있어요. dirty 테스트만 만들어야 한다는 의도는 아니었습니다.
>
한편, 말씀해주신 반론이 좋아서 허락해주신다면 제 글에 인용해 소개하고 싶습니다. 감사합니다!

### Pak Youngrok 님과 골빈해커 님의 의견

Twitter에서의 Pak Youngrok 님과 골빈해커 님의 의견을 인용한다.

>
[**Pak Youngrok:**]( https://twitter.com/pakyoungrok/status/1564814301462167552?s=20&t=xPd_R0P0O1GVtkpx8abklQ )
저는 좀 다른 관점인데, 전 정상동작 테스트가 더 중요하다고 봐요.
정상동작 테스트는 항상 통과하는 테스트와 경우가 많이 다르기도 하고, 사용자 가치를 전달하는 것은 정상동작이지 버그 없음이 아니니까요.
테스트 코드 자체가 핵심을 이해할 수 있는 문서 역할을 한다는 점도 중요하구요.
>
[**Pak Youngrok:**]( https://twitter.com/pakyoungrok/status/1564814717050560513?s=20&t=xPd_R0P0O1GVtkpx8abklQ )
버그가 발생하면 테스트 코드를 작성해서 문제를 해결하고 이런 테스트를 쌓아나가자는 전략도 저는 좀 경계합니다.
테스트 코드를 중요도 낮은 케이스로 채우게 될 가능성이 높고, 기능 자체가 변경되면서 한 번에 필요 없어지는 테스트의 숫자도 많아질 수 있어요.
>
[**골빈해커:**]( https://twitter.com/golbin/status/1564859683202285568?s=20&t=xPd_R0P0O1GVtkpx8abklQ )
저는 두 가지를 같이 쓰면 좋다고 생각하는데요.
우선 처음에 아주 간단하게 쉽게 통과 할 수 있는 기본적인 테스트만 만들고, 그 이후에 발생하는 버그 혹은 추가 요구사항을 넣으면서 깨지는 부분에 대한 테스트를 만드는 형태로 하는게 좋지 않을까 합니다.
>
[**골빈해커:**]( https://twitter.com/golbin/status/1564860213966303232?s=20&t=xPd_R0P0O1GVtkpx8abklQ )
이렇게 하면 초반에 기본적인 테스트만 만들면서 테스트 케이스 작성에 대한 부담을 줄이고, 그러면 이후에 테스트 추가를 쉽게 할 수 있게 되고, 엣지 케이스는 그 이후에 채워나가는 형태로 부담을 줄일 수 있으니까요.
진리의 "난 둘 다"? 😂
>
[**Pak Youngrok:**]( https://twitter.com/pakyoungrok/status/1564868441126752256?s=20&t=xPd_R0P0O1GVtkpx8abklQ )
큰 틀에서의 방향성은 동의합니다.
그렇게 늘어나는 테스트 케이스의 코드들도 프로덕션 코드와 같은 기준으로 refactor mercilessly를 한다면 부작용도 최소화할 수 있구요.
다만, 엣지 케이스의 종류에 따라 테스트 케이스를 작성하지 않는 게 유익한 경우도 많은 거 같아요.

## 참고문헌

- CODE COMPLETE [2판] / Steve McConnell 저 / 서우석 역 / 정보문화사 / 2005년 04월 22일 초판 발행
- 추측과 논박 1 / 칼 라이문트 포퍼 저 / 민음사 / 1판 1쇄 펴냄 2001년 11월 28일
