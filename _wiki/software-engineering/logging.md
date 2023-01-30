---
layout  : wiki
title   : logging 이것저것
summary : 
date    : 2023-01-28 13:06:07 +0900
updated : 2023-01-28 13:13:09 +0900
tag     : 
resource: F3/6BC950-02AD-4443-BB31-E0814FE1A51B
toc     : true
public  : true
parent  : [[/software-engineering]]
latex   : false
---
* TOC
{:toc}

## From: 마스터링 스프링 클라우드

>
모든 로그를 동일한 `INFO` 레벨로 사용하는 것은 매우 나쁜 사례다.
어떤 정보는 다른 것보다 더 중요하다.
그래서 로그 엔트리가 어떤 로그 레벨로 로그를 남겨야 하는지 결정하는 것이 어렵다.
>
> - `TRACE`: 이것은 매우 자세한 정보로서 개발을 위한 것이다. 개발 후 운영 환경에서는 단기간 동안 임시 파일로 취급해 유지할 것이다.
> - `DEBUG`: 이 레벨은 프로그램에서 발생하는 모든 것을 로그로 남긴다. 개발자가 디버깅 또는 문제 해결에 주로 사용한다. `DEBUG`와 `TRACE`의 구분이 가장 어렵다.
> - `INFO`: 운영 중에 가장 중요한 정보를 이 레벨의 로그로 남긴다. 이 메시지는 개발자뿐 아니라 운영자와 고급 사용자도 쉽게 이해할 수 있어야 하는데, 애플리케이션이 무엇을 하고 있는지 빠르게 찾을 수 있게 하기 위함이다.
> - `WARN`: 에러가 될 만한 모든 이벤트를 이 레벨의 로그로 남긴다. 로그를 남기는 프로세스는 계속 진행할 수 있지만, 그 프로세스에 각별한 주의를 기울여야 한다.
> - `ERROR`: 보통 예외를 이 레벨에 남긴다. 여기서 중요한 것은 예를 들어 하나의 비즈니스 로직 실행이 성공하지 못했다고 해서 모든 곳에서 예외를 던지지 않도록 하는 것이다.
> - `FATAL`: 이 자바 로깅 레벨은 애플리케이션을 중단시킬 수 있는 잠재성을 가진 매우 중대한 에러 이벤트를 로그로 남기도록 지정한다.
>
다른 좋은 로깅 사례도 많지만, 여기서는 마이크로서비스 기반 시스템에서 사용할 만한 가장 중요한 것을 이야기했다.
로깅의 관점에서 한 가지 더 언급할 가치가 있는 것은 정규화다.
로그를 쉽게 이해하고 해석하려면 당연히 로그가 언제, 어떻게 수집됐는지, 무슨 내용을 담고 있는지, 로그가 왜 배출됐는지를 알아야 한다.
다시 말하면 Time(언제), Hostname(어디서), AppName(누구)과 같은 모든 마이크로서비스 에서 정규화돼야 하는 특히 중요한 특징이 있다는 것이다.
이 장의 뒤에서 보게 되겠지만, 이런 정규화는 시스템에서 중앙화 방식으로 로그를 수집하도록 구현할 때 매우 유용하다.
[^msc-180]

## 참고문헌

- 마스터링 스프링 클라우드 / 피요트르 민코프스키 저/김민석 역 / 위키북스 / 초판발행 2018년 11월 07일 / 원제: Mastering Spring Cloud

## 주석

[^msc-180]: 마스터링 스프링 클라우드. 9장. 180쪽.