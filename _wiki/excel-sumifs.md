---
layout  : wiki
title   : SUMIFS 함수 사용법
summary : 조건에 맞는 값의 sum 값을 구한다
date    : 2018-04-26 17:52:29 +0900
updated : 2018-09-17 11:13:38 +0900
tag     : excel
toc     : true
public  : true
parent  : Excel
latex   : false
---
* TOC
{:toc}

# 개요

* `SUM`함수와 비슷하나, 조건을 걸 수 있다.

문법은 다음과 같다.

```
SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)
```

* `sum_range` : 더할 값의 범위
* `criteria_range1` : 조건1을 검사할 범위
    * `criteria1` : 조건1
* `criteria_range2` : 조건2를 검사할 범위
    * `criteria2` : 조건2
* ...
* 조건 n (조건의 수에 제한이 없다)

# 응용

다음과 같은 엑셀 파일이 있다고 하자.

|   | A    | B  | C                        |
|---|------|----|--------------------------|
| 1 | John | 6  | 2018/04/25  1:35:00 오후 |
| 2 | Loui | 20 | 2018/04/26  2:15:00 오후 |
| 3 | John | 17 | 2018/04/27  8:33:00 오전 |
| 4 | Loui | 21 | 2018/04/28  3:35:00 오후 |

만약 `2018/04/26  2:15:00 오후` 이후, `John`의 `B` 값의 총합을 구하고 싶다면 다음과 같이 하면 된다.

```
=SUMIFS(B1:B4, A1:A4, "John", C1:C4, ">=" & C2)
```

참고로 비교 연산자는 다음과 같이 사용할 수 있다.

* 같다 : `=` 또는 생략 (위에서 `"John"`은 `"=John"`과 같다.)
* 같지 않다 : `<>`
* 크다 : `>`
* 크거나 같다 : `>=`
* 작다 : `<`
* 작거나 같다 : `<=`

위에서 사용한 엑셀 함수 코드를 sql로 비유하자면 다음과 같다.

```sql
SELECT
    SUM(B)
FROM TABLE
WHERE
    A = 'John'
AND C >= unix_timestamp('2018-04-26 02:15:00')
```


# Links

* [SUMIFS 함수(support.office.com)](https://support.office.com/ko-kr/article/sumifs-%ED%95%A8%EC%88%98-c9e748f5-7ea7-455d-9406-611cebce642b )


