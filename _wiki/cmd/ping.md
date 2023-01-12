---
layout  : wiki
title   : ping
summary : bash commandxcode-select --install
date    : 2023-01-12 21:58:23 +0900
updated : 2023-01-12 22:18:07 +0900
tag     : bash command
resource: 5F/5F2755-B6F1-4283-8ED3-3DCB55F0C13F
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## 어원

>
**ping** [음파 탐지기의 펄스(sonar pulse)를 뜻하는 잠수함 승무원의 용어에서]
>
1. 명사. 다른 사람의 존재 및 생존 유무를 알려고 또는 주의를 주려고 컴퓨터가 보내는 작은 네트워크 메시지(ICMP ECHO)를 뜻하는 은어. 유닉스 명령어인 **ping(8)**은 이러한 것을 수동적으로 작동시키는 데 사용될 수 있다(**ping(8)**의 저작자는 이 명칭이 'Packet INternet Groper'의 머릿글자에서 나온 것이라는 널리 퍼진 민간 어원학에 대해서 부정하고 있다는 사실에 주목하기 바란다). 종종 전화상의 인사말로 사용된다. **ACK**, **ENQ** 참조.
>
-- 해커 영어사전. 506쪽.

## Examples

```bash
 # ping을 보낸다
ping www.google.com

 # ping을 3번 보낸다
ping -c3 www.google.com

 # ping을 3번 보낸다. 보낼 때마다 알림음(beep)을 낸다
ping -c3 -a www.google.com
```

## 참고문헌

- 해커 영어사전 제3판 / ERIC S.RAYMOND 편 / 기전연구사 / 1998년 12월 25일 제1판 제1발행.
    - [jargon file ping]( http://catb.org/~esr/jargon/html/P/ping.html )
