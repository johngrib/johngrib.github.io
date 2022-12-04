---
layout  : wiki
title   : Database index
summary : 인덱스 이것저것
date    : 2021-02-17 22:28:47 +0900
updated : 2021-02-17 22:33:47 +0900
tag     : db index
resource: AA/6E2EB9-C39C-429A-9FEC-D525B0A0C39B
toc     : true
public  : true
parent  : [[database]]
latex   : false
---
* TOC
{:toc}

## 인덱스는 표준이 아니다

>
ANSI SQL 표준에는 인덱스에 대한 언급이 없다는 사실을 알고 있는가?
데이터 스토리지 구현과 최적화는 SQL 언어에 명시되어 있지 않기 때문에, 각 데이터베이스 제품은 인덱스를 다르게 구현한다.
>
대부분의 제품은 `CREATE INDEX` 문법이 비슷하지만, 제품마다 자기들만의 고유기술을 추가할 정도의 융통성은 있다.
인덱스 동작에 대한 표준은 없다.
마찬가지로, 인덱스 관리, 쿼리 자동 최적화, 쿼리 계획 리포팅, `EXPLAIN`과 같은 명령에 대한 표준도 없다.
>
인덱스에 대해 자세히 알려면 사용하는 데이터베이스 제품의 문서를 공부해야 한다.
인덱스의 특정 문법이나 기능은 많이 다를 수 있지만, 논리적 개념은 동일하다.
>
-- SQL AntiPatterns. 13장.





## 참고문헌

- [BILL] SQL AntiPatterns / 빌 카윈 저 / 윤성준 역 / 인사이트(insight) / 2011년 06월 23일 / 원제 : SQL AntiPatterns 

