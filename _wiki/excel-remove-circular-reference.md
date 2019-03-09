---
layout  : wiki
title   : 엑셀 셀 순환 참조 문제 해결하기
summary : 
date    : 2018-09-19 11:44:51 +0900
updated : 2018-09-19 11:49:01 +0900
tag     : excel
toc     : true
public  : true
parent  : Excel
latex   : false
---
* TOC
{:toc}

# 순환 참조 탐색

* 아래의 스크린샷과 같이 `D1`셀에 `=SUM(A1:D1)`과 같이 자기 자신을 참조하는 순환 참조가 발생했다고 하자.
* `수식`-`오류 검사`-`순환 참조`로 어느 셀에 순환 참조가 걸렸는지 확인할 수 있다.

![image](https://user-images.githubusercontent.com/1855714/45728039-32ea3880-bc01-11e8-824e-a353c826002c.png)


# Links

* [Remove or allow a circular reference (support.office.com)](https://support.office.com/en-us/article/remove-or-allow-a-circular-reference-8540bd0f-6e97-4483-bcf7-1b49cd50d123 )
