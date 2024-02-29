---
layout  : wiki
title   : 최적화 규칙 (Rules of Optimization)
summary : 최적화하지 말 것
date    : 2023-09-24 22:34:19 +0900
updated : 2024-02-29 21:43:13 +0900
tag     : 
resource: BA/DB229E-FFFD-4FED-B598-9EA607662445
toc     : true
public  : true
parent  : [[/jargon]]
latex   : false
---
* TOC
{:toc}

## Michael A. Jackson

>
Rule 1: Don't do it.  
Rule 2 (for experts only): Don't do it yet.  
― Michael A. Jackson

<span/>

>
최적화의 첫 번째 규칙 : 최적화하지 말라.  
최적화의 두 번째 규칙(전문가들만) : 아직 최적화하지 말라.  
-- 마이클 A. 잭슨 Michael A. Jackson
[^bea-275]

## Donald E. Knuth

[[/people/donald-ervin-knuth]] 교수는 1974년에 쓴 'Structured Programming With Go To Statements' 에서 다음과 같이 쓴 바 있다.[^knuth-go-pdf]

>
There is no doubt that the grail of efficiency leads to abuse.
Programmers waste enormous amounts of time thinking about, or worrying about, the speed of noncritical parts of their programs, and these attempts at efficiency actually have a strong negative impact when debugging and maintenance are considered. We should forget about small efficiencies, say about 97% of the time: premature optimization is the root of all evil.

효율성에 대한 추종은 남용하게 되기 마련입니다.
프로그래머들은 프로그램에서 덜 중요한 부분들의 속도에 대해 생각하거나 걱정하면서 엄청난 시간을 낭비합니다.
그리고 디버깅과 유지보수를 고려해보면 이런 효율성을 위한 시도들이 실제로 꽤 부정적인 영향을 끼칩니다.
우리는 사소한 효율성들에 대해서는 97% 정도는 잊을 필요가 있습니다.
섯부른 최적화는 모든 악의 근원입니다.

>
Yet we should not pass up our opportunities in that critical 3%.
A good programmer will not be lulled into complacency by such reasoning, he will be wise to look carefully at the critical code; but only after that code has been identified.
It is often a mistake to make a priori judgments about what parts of a program are really critical, since the universal experience of programmers who have been using measurement tools has been that their intuitive guesses fail.
After working with such tools for seven years, I've become convinced that all compilers written from now on should be designed to provide all programmers with feedback indicating what parts of their programs are costing the most; indeed, this feedback should be supplied automatically unless it has been specificMly turned off.

그럼에도 불구하고, 그 중요한 3%의 기회를 놓쳐서는 안 됩니다.
좋은 프로그래머는 이런 섯부른 최적화를 이유로 자기만족에 빠지지 않을 것이며, 핵심적인 코드라고 판단한 코드에 주의를 집중할 정도로 현명할 것입니다.
프로그램의 어떤 부분이 정말 중요한지에 대해 선입견을 가지고 판단하는 것은 흔하게 저지르는 실수입니다. 측정 도구를 사용해온 프로그래머들의 보편적 경험을 통해 직관적 추측이 실패한다는 것을 알 수 있습니다.
이런 도구들과 함께 일한 지 7년이 되어갑니다. 앞으로 만들어질 모든 컴파일러들은 프로그래머들에게 그들의 프로그램 중 어느 부분이 가장 많은 비용을 들이고 있는지를 알려주는 피드백을 제공하도록 설계되어야 한다고 확신하게 되었습니다. 실제로, 이런 피드백은 특별히 꺼놓지 않는 한은 자동으로 제공되어야 합니다.

## 함께 읽기

- [PrematureOptimization (wiki.c2.com)](https://wiki.c2.com/?PrematureOptimization )
- [[/people/donald-ervin-knuth]]

## 참고문헌

- [Structured Programming with go to Statements - DONALD E. KNUTH (web.archive.org)](http://web.archive.org/web/20130731202547/http://pplab.snu.ac.kr/courses/adv_pl05/papers/p261-knuth.pdf )
- 뷰티풀 아키텍처 / 디오미디스 스피넬리스 저 / 지오지아스 고시아스 편 / 지앤선(志&嬋) / 발행 2010년 03월 08일 / 원제: Beautiful Architecture: Leading Thinkers Reveal the Hidden Beauty in Software Design


## 주석

[^bea-275]: 뷰티풀 아키텍처. 275쪽.
[^knuth-go-pdf]: [Structured Programming with go to Statements - DONALD E. KNUTH (web.archive.org)](http://web.archive.org/web/20130731202547/http://pplab.snu.ac.kr/courses/adv_pl05/papers/p261-knuth.pdf ) 268쪽(PDF 상으로는 8쪽).

