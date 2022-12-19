---
layout  : wiki
title   : Cardinality
summary : 기수성
date    : 2022-12-19 22:57:15 +0900
updated : 2022-12-19 23:02:41 +0900
tag     : 
toc     : true
public  : true
parent  : [[/database]]
latex   : false
resource: 836F4D46-B963-4139-BF3F-AC026F7B961F
---
* TOC
{:toc}

## 선택도와 기수성

>
인덱스에서 선택도(Selectivity) 또는 기수성(Cardinality)은 거의 같은 의미로 사용되며, 모든 인덱스 키 값 가운데 유니크한 값의 수를 의미한다.
전체 인덱스 키 값은 100개인데, 그중에서 유니크한 값의 수는 10개라면 기수성은 10이다.
인덱스 키 값 가운데 중복된 값이 많아지면 많아질수록 기수성은 낮아지고 동시에 선택도 또한 떨어진다.
인덱스는 선택도가 높을수록 검색 대상이 줄어들기 때문에 그만큼 빠르게 처리된다.
>
-- Real MySQL 8.0 1권. 8.3.3.3장. 227쪽.


## 참고문헌

- Real MySQL 8.0 (1권) / 백은빈, 이성욱 저 / 위키북스 / 초판 발행 2021년 09월 08일

