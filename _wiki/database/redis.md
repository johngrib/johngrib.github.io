---
layout  : wiki
title   : Redis
summary : REmote DIctionary Server
date    : 2024-04-10 12:13:20 +0900
updated : 2024-04-10 12:35:12 +0900
tag     : 
resource: 34/D5E529-A292-4C80-9F22-C877D558D592
toc     : true
public  : true
parent  : [[/database]]
latex   : false
---
* TOC
{:toc}

## 명령

### 기본

#### GET

<https://redis.io/docs/latest/commands/get/ >

```
redis> get foo
(nil)
redis> set foo "bar"
"OK"
redis> get foo
"bar"
```

#### SET

<https://redis.io/docs/latest/commands/set/ >

```
redis> set hi "Hello"
"OK"
redis> get hi
"Hello"
```

##### NX 옵션 {#set-nx}

>
NX -- Only set the key if it does not already exist.

키가 없는 경우에만 새로운 키를 설정한다.

```
redis> get bar
(nil)
redis> set bar 11 NX
"OK"
redis> get bar
"11"
```

```
redis> set bar 99 NX
(nil)
redis> get bar
"11"
```


## Links

- [Redis Commands (redis.io)](https://redis.io/docs/latest/commands/ ) - 레디스 명령 레퍼런스 문서.

## 참고문서

- 개발자를 위한 레디스 / 김가림 저 / 에이콘출판사 / 초판 2쇄 발행: 2024-01-05

