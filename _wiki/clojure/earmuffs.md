---
layout  : wiki
title   : Clojure earmuffs (*귀마개*)
summary : 
date    : 2022-02-20 21:20:48 +0900
updated : 2022-02-27 00:04:00 +0900
tag     : clojure
resource: 46/F5D1A3-CB3C-4979-B74C-BA36A7D5D390
toc     : true
public  : true
parent  : [[/clojure/study]]
latex   : false
---
* TOC
{:toc}

## From: 클로저 시작하기

> 앨리스가 좋아하는 음식들을 위한 이름공간을 새로 만들어보자.
이것을 `alice.favfoods`라고 하자.
>
> ```clojure
> (ns alice.favfoods)
> ;=> nil
> ```
>
이 시점에서, REPL의 현재 이름공간은 REPL이 시작될 때의 디폴트 이름공간에서 우리가 새롭게 정의한 `alice.favfoods`로 바뀌었다.
이것은 `*ns*`가 반환하는 값을 보면 확인할 수 있다.
`ns` 양옆에 붙인 별표를 '귀마개'라고 부르는데, 다시 바인딩(rebinding)할 수 있는 것을 표시하는 관례이다.
>
> ```clojure
> *ns*
> ;=> #object[clojure.lang.Namespace 0x356680cb "alice.favfoods"]
> ```

## 함께 읽기

- [[/clojure/guide/reading-clojure-characters#var-name&#45;&#45;&#45;earmuffs]]


## 참고문헌

- 클로저 시작하기 / 캐린 마이어 저 / 박상규, 김만명, 김영태 공역 / 인사이트(insight) / 초판 1쇄 발행 2016년 04월 01일 / 원제: Living Clojure

