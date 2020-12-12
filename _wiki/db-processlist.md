---
layout  : wiki
title   : Database show processlist
summary : 현재 실행중인 작업을 보여준다
date    : 2020-12-11 23:05:14 +0900
updated : 2020-12-12 13:27:57 +0900
tag     : db
toc     : true
public  : true
parent  : [[database]]
latex   : false
---
* TOC
{:toc}

## Examples
### MySQL

```sql
-- 서버 내에서 실행중인 스레드 집합에서 현재 수행중인 작업을 보여준다
-- 단 Info 를 100 자까지만 보여준다
SHOW PROCESSLIST;

-- Info 전체를 보여준다
SHOW FULL PROCESSLIST;

-- 다음과 같이 실행해도 같은 결과를 얻을 수 있다
SELECT *
FROM information_schema.processlist
ORDER BY id;
```

위의 명령을 실행하면 나오는 결과는 다음과 같은 스키마를 갖는다.

| Id  | User  | Host             | db   | Command | Time | State | Info             |
| --- | ---   | ---              | ---  | ---     | ---  | ---   | ---              |
| 18  | admin | 172.20.0.1:54670 | test | Query   | 0    | init  | SHOW PROCESSLIST |
| 19  | admin | 172.20.0.1:54674 | NULL | Sleep   | 24   |       | NULL             |

만약 `Command = Sleep` 인 경우를 제외하고 보고 싶다면 `WHERE`를 사용하면 된다.

```sql
SELECT * FROM information_schema.processlist
WHERE command != 'Sleep';
```

#### 각 필드의 의미
`Id`: Connection Identifier. 연결 아이디.
- `SELECT CONNECTION_ID()`와 같다.

`Command`: 스레드 실행중인 명령 타입을 의미한다. 자세한 내용은 [8.14.2 Thread Command Values]( https://dev.mysql.com/doc/refman/8.0/en/thread-commands.html ) 문서를 참고.
- `Sleep`: 클라이언트가 새로운 명령을 보내길 기다리고 있음.
- `Query`: 클라이언트의 쿼리 실행.
- `Kill`: 이 스레드는 다른 스레드를 kill 하고 있음.
- ...

`Time`: 스레드가 현재 상태를 유지한 시을 `seconds` 단위로 나타낸 값.

`Info`: 스레드가 실행중인 명령을 보여준다.

## Kill 명령의 사용

`processlist` 명령으로 알아낸 프로세스 아이디를 `Kill` 명령과 함께 사용하면 해당 프로세스 kill 예약을 걸 수 있다.

```sql
KILL 23414;
```

## 참고문헌

- [13.7.7.29 SHOW PROCESSLIST Statement (MySQL 8.0 Reference Manual)]( https://dev.mysql.com/doc/refman/8.0/en/show-processlist.html )
- [13.7.8.4 KILL Statement]( https://dev.mysql.com/doc/refman/8.0/en/kill.html )

