---
layout  : wiki
title   : show processlist
summary : 현재 실행중인 작업 상태를 보여준다
date    : 2020-12-11 23:05:14 +0900
updated : 2022-12-21 00:38:08 +0900
tag     : db
resource: 7B/F99C9C-DC2A-4549-ACB8-B2F3E8A7DA11
toc     : true
public  : true
parent  : [[/database]]
latex   : false
---
* TOC
{:toc}

## From: MySQL 성능 최적화

>
각 MySQL 연결 또는 스레드에는 주어진 시간에 수행 중인 작업을 보여주는 상태가 있습니다.
이러한 상태를 보는 방법은 여러 가지가 있지만, 가장 쉬운 방법은 `SHOW FULL PROCESSLIST` 명령을 사용하는 것입니다(상태는 명령 열에 표시됨).
쿼리가 수명 주기를 거치면서 상태가 여러 번 변경되고, 그래서 수십 개의 상태가 있습니다.
MySQL 매뉴얼은 모든 상태에 대한 신뢰할 수 있는 정보 소스이지만 다음에 그 몇 가지를 나열하고 의미를 설명합니다.
>
`Sleep`  
스레드가 클라이언트의 새 쿼리를 기다리는 중입니다.
>
`Query`  
스레드가 쿼리를 실행 중이거나 결과를 클라이언트로 다시 보냅니다.
>
`Locked`  
스레드는 서버 수준에서 테이블 잠금이 부여되기를 기다리고 있습니다. InnoDB의 행 잠금과 같이 스토리지 엔진에 의해 구현되는 잠금은 스레드가 Locked 상태로 전환되지 않습니다.
>
`Analyzing and statistics`  
스레드가 스토리지 엔진 통계를 확인하고 쿼리를 최적화하고 있습니다.
>
`Copying to tmp table [on disk]`  
스레드가 쿼리를 처리하고 결과를 임시 테이블(아마도 `GROUP BY`, 파일 정렬, 또는 `UNION`을 충족시키기 위해)에 복사하고 있습니다.
상태가 'on disk'로 끝나면 MySQL은 메모리 내 테이블을 디스크 테이블로 변환합니다.
>
`Sorting result`  
스레드가 결과 셋을 정렬하고 있습니다.
>
최소한 기본 상태를 아는 것이 도움이 됩니다.
그래야 쿼리에서 '누가 공을 가지고 있는지'를 알 수 있습니다.
사용량이 많은 서버에서는 일반적으로 statistics와 같은 상태로 상당한 시간을 소요하기 시작하는 것을 볼 수 있습니다.
이것은 일반적으로 뭔가 잘못되었다는 것을 나타냅니다.
>
-- MySQL 성능 최적화. 8장. 233쪽.


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

- MySQL 성능 최적화 / 실비아 보트로스, 제레미 틴리 저/류수미, 송희정 역 / 위키북스 / 초판발행 2022년 09월 22일 /  원제 : High Performance MySQL 4E
- [13.7.7.29 SHOW PROCESSLIST Statement (MySQL 8.0 Reference Manual)]( https://dev.mysql.com/doc/refman/8.0/en/show-processlist.html )
- [13.7.8.4 KILL Statement]( https://dev.mysql.com/doc/refman/8.0/en/kill.html )

