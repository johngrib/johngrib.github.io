---
layout  : wiki
title   : 후속 규칙(Rule of succession)
summary : (s + 1) / (n + 2)
date    : 2018-04-06 06:40:22 +0900
updated : 2018-04-24 22:03:17 +0900
tag     : math 확률 bayes
toc     : true
public  : true
parent  : math
latex   : true
---
* TOC
{:toc}

# 개요

* 라플라스 법칙(Laplace's Law)이라고도 부른다.

사전 정보가 부족한 상태에서 **사건의 역사를 토대로** 사건의 확률을 **추정**할 때 사용할 수 있다.

* 시행의 결과 성공/실패를 알 수 있는 테스트가 있다 하자.
    * 각 테스트는 서로에게 영향을 주지 않는 독립 사건이라 하자.
* 테스트를 n 번을 수행했더니, 성공이 s회 발생하였다.
* 그렇다면 다음 번 테스트의 성공 확률은 얼마일까?

$$ P(X_{n+1} = 1 \mid X_1 + ... + X_n = s) = \frac{s + 1}{n + 2} $$

* 간단하게 $$\frac{s + 1}{n + 2}$$로 계산을 끝낼 수 있다.
* 사건에 대해 `n`과 `s`외에 아무런 정보가 없을 때 사용할 수 있는 방법이다.

증명의 수학적 디테일은 [wikipedia의 Mathematical details](https://en.wikipedia.org/wiki/Rule_of_succession#Mathematical_details )를 참고할 것.


## 응용

사전 정보 없이 어떤 복권을 다섯 장 사 보았는데 당첨이 세 장 나왔다.

기쁜 마음에 복권을 하나 더 구매할 때, 여섯 번째 복권도 당첨이 될 확률에 대해 추정할 수 있을까?

* 이 복권에 대한 정보가 아무것도 없는 상태이다.
* 참고할 수 있는 것은 내가 구매했던 다섯 장의 복권과, 세 장이 당첨되었다는 것 뿐이다.
* 이와 같이 누구나 쉽게 당첨되는 복권인지 당첨자가 극소수에 지나지 않는 복권인지를 **모른다면** 후속 규칙을 사용할 수 있다.
* $$\frac{3 + 1}{5 + 2} = \frac{4}{7}$$ 로 당첨 확률을 추정할 수 있다.

## 후속 규칙의 합리성

* 누군가 복권을 두 장 사서 두 장 다 당첨이 되었다.
* 후속 규칙을 알고 있다면, 이런 상황에서 "두 번 해봤는데 두 번 다 당첨됐잖아... $$\frac{2}{2}$$ 인 셈이니까 세 번째도 당첨되겠지?"라고 생각하는 일을 예방할 수 있다.
* 후속 규칙을 토대로 생각한다면, $$\frac{1 + 2}{2 + 2} = \frac{3}{4}$$이니까 뭔가 당첨 확률이 높긴 하지만 항상 당첨될 리는 없다고 생각하게 된다.


# Links

* <https://en.wikipedia.org/wiki/Rule_of_succession >
* [라플라스 succession rule-베이지안 통계(techntalk.tistory.com)](http://techntalk.tistory.com/entry/%EB%9D%BC%ED%94%8C%EB%9D%BC%EC%8A%A4-succession-rule-%EB%B2%A0%EC%9D%B4%EC%A7%80%EC%95%88-%ED%86%B5%EA%B3%84-Bayesian-Statistics%EC%9D%98-%EC%A2%8B%EC%9D%80-%EC%98%88 )
* [과학과 심리학: 과학적 방법, 실험의 논리, 과학적 추론 - 이정모(www.academia.edu)](https://www.academia.edu/2191498/Science_and_Psychology_Theory_of_Science_Scientific_Methodology_and_Cognitive_Psychology_text_in_Korean_?ends_sutd_reg_path=true ) - 이정모 성균관대 심리학과 명예교수의 페이퍼 137쪽.
