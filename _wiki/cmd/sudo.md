---
layout  : wiki
title   : sudo 명령어
summary : 
date    : 2024-09-21 23:15:44 +0900
updated : 2024-09-21 23:18:24 +0900
tag     : 
resource: 69/7745AF-4646-4343-B55C-389EB952EBB2
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

##

>
그렇다면 `sudo`가 왜 유용할까? 그것은 `sudo`가 root로 하나의 명령을 실행한 후, 다시 일반 사용자로 되돌아가는 것을 허용하기 때문이다.
따라서 관리를 위한 명령을 실행하려 할 때에는 매번 의식적으로 `sudo`를 사용해야 한다.
반대로 su - root를 사용하면, 서브셸을 벗어날 때까지 이후의 모든 명령을 root로 수행하게 한다.
그러므로 잠깐 딴생각을 하는 사이에 자신이 root라는 사실을 잊는다면, 실행해서는 안 될 명령을 입력하고 결국 엄청난 재난을 당하기 쉽다.
[^wicked-113]

## 참고문헌

- 셸 스크립트 - 101가지 예제로 정복하는 / Dave Taylor 저 / 여인춘 역 / 에이콘출판사 / 발행: 2005년 09월 26일 / 원제: Wicked Cool Shell Scripts

## 주석

[^wicked-113]: 셸 스크립트 - 101가지 예제로 정복하는. 5장. 113쪽.
