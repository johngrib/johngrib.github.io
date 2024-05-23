---
layout  : wiki
title   : 격리 수준 (isolation level)
summary : 
date    : 2022-12-15 23:23:05 +0900
updated : 2024-05-23 23:33:38 +0900
tag     : sql-92 db
toc     : true
public  : true
parent  : [[/database]]
latex   : false
resource: ED/C7080C-15D6-4CEB-8A4B-DCB285381536
---
* TOC
{:toc}

## 인용: SQL-92

>
X3H2-92-154/DBL CBR-002  
4.28 SQL-transactions
>
SQL-transactions initiated by different SQL-agents that access the same SQL-data or schemas and overlap in time are concurrent SQL-transactions.
>
> An SQL-transaction has an isolation level that is READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, or SERIALIZABLE. The isolation level of an SQL-transaction defines the degree to which the operations on SQL-data or schemas in that SQL-transaction are affected by the effects of and can affect operations on SQL-data or schemas in concurrent SQL-transactions. The isolation level of a SQL-transaction is SERIALIZABLE by default. The level can be explicitly set by the \<set transaction statement>.
>
The execution of concurrent SQL-transactions at isolation level
SERIALIZABLE is guaranteed to be serializable. A serializable execution is defined to be an execution of the operations of concurrently executing SQL-transactions that produces the same effect as some serial execution of those same SQL-transactions. A serial execution is one in which each SQL-transaction executes to completion before the next SQL-transaction begins.
>
The isolation level specifies the kind of phenomena that can occur during the execution of concurrent SQL-transactions. The following phenomena are possible:
>
1) P1 ("Dirty read"): SQL-transaction T1 modifies a row. SQL-transaction T2 then reads that row before T1 performs a COMMIT. If T1 then performs a ROLLBACK, T2 will have read a row that was never committed and that may thus be considered to have never existed.
>
2) P2 ("Non-repeatable read"): SQL-transaction T1 reads a row. SQL-transaction T2 then modifies or deletes that row and performs a COMMIT. If T1 then attempts to reread the row, it may receive the modified value or discover that the row has been deleted.
>
3) P3 ("Phantom"): SQL-transaction T1 reads the set of rows N that satisfy some \<search condition>. SQL-transaction T2 then executes SQL-statements that generate one or more rows that satisfy the \<search condition> used by SQL-transaction T1. If SQL-transaction T1 then repeats the initial read with the same \<search condition>, it obtains a different collection of rows.
>
The four isolation levels guarantee that each SQL-transaction will be executed completely or not at all, and that no updates will be lost. The isolation levels are different with respect to phenomena P1, P2, and P3. Table 9, "SQL-transaction isolation levels and the three phenomena" specifies the phenomena that are possible and not possible for a given isolation level.
>
-- Database Language SQL July 1992 (SQL-92). 4.28 SQL-transactions. 68쪽.

격리 수준(isolation level)은 여러 SQL 트랜잭션이 동시에 실행될 때 발생할 수 있는 현상의 종류를 명시한다.

- P1 ("Dirty read", 더티 읽기)
    1. 트랜잭션 T1이 row를 하나 수정한다.
    2. 트랜잭션 T2는 해당 row를 T1이 COMMIT하기 전에 읽는다.
    3. 만약 이런 상황에서 T1이 ROLLBACK을 하면, T2는 COMMIT되지 않은 row를 읽은 셈이 된다. 즉 존재하지 않은 데이터를 읽은 것이 된다.
- P2 ("Non-repeatable read", 반복 불가능한 읽기)
    1. 트랜잭션 T1이 row를 읽는다.
    2. 트랜잭션 T2는 해당 row를 수정하거나 삭제하고 COMMIT한다.
    3. T1이 다시 해당 row를 읽으려고 하면, 수정된 값을 획득하거나 삭제됐다는 사실을 알게 된다.
- P3 ("Phantom", 팬텀 읽기)
    1. 트랜잭션 T1이 어떤 검색 조건을 만족하는 row들의 집합 N을 읽는다.
    2. 트랜잭션 T2는 T1이 검색한 조건을 만족하는 row들을 생성하는 SQL 문을 실행한다.
    3. T1이 동일한 검색 조건으로 다시 읽기를 반복하면, 다른 row 집합을 얻게 된다.


## 인용: 데이터베이스 시스템

>
SQL 표준에서 한 트랜잭션이 다른 트랜잭션들과 직렬 불가능한 방식으로 수행되는 것을 허용한다.
예를 들어, 다른 트랜잭션이 기록한 데이터 항목을 그 트랜잭션이 커밋하지 않았는데도 읽는 것을 허용하는 **커밋되지 않은 데이터 읽기**[^johngrib-28527]라는 고립성 수준이 있다.
수행 시간이 오래 걸리고 결과가 정확하지 않아도 괜찮은 트랜잭션에 대해서는 이와 같은 고립성 수준을 사용할 수 있다.
만일 이런 트랜잭션을 본래의 "직렬 가능" 방식으로 수행한다면 명령어들의 교차 수행 과정에서 서로의 실행을 지연시키게 된다.
>
SQL 표준에 명시된 **고립성 수준**(isolation level)은 다음과 같다.
>
> - **직렬 가능(serializable)**은 직렬 가능한 실행을 보장한다. 그러나 곧 설명하겠지만 몇몇 데이터베이스 시스템은 특정한 경우 직렬 불가능한 실행을 허용하는 고립성 수준을 구현하기도 한다.
> - **반복 가능한 읽기(Repeatable read)**는 단지 커밋된 레코드만 읽을 수 있고 한 트랜잭션이 한 레코드를 두 번 읽는 사이에 다른 트랜잭션이 그 레코드를 갱신하지 못하도록 한다. 그러나 트랜잭션들은 직렬 가능하지 않을 수 있다. 예를 들어, 특정 조건을 만족하는 레코드를 검색할 때 커밋된 트랜잭션에 의해 삽입된 레코드 중 일부는 검색될 수도 있고 아닐 수도 있다.
> - **커밋된 데이터 읽기(Read committed)**는 커밋된 레코드만 읽을 수 있지만, 반복 가능한 읽기는 요구하지 않는다. 예를 들어, 한 트랜잭션이 한 레코드를 두 번 읽는 사이에 그 레코드는 다른 완료된 트랜잭션들에 의해 갱신될 수 있다.
> - **커밋되지 않은 데이터 읽기(Read uncommitted)**는 커밋되지 않은 데이터도 읽는다. SQL에서 허용하는 가장 낮은 수준의 고립성 수준이다.
>
위의 모든 고립성 수준은 또한 **더티 쓰기(dirty write)**를 허용하지 않는다.
즉 커밋 또는 중단되지 않은 다른 트랜잭션이 기록한 데이터 항목에 덮어쓰는 것은 허용하지 않는다.
>
많은 데이터베이스 시스템은 기본적으로 커밋된 데이터 읽기 고립성 수준으로 동작한다.
시스템의 기본 설정을 사용하지 않고 SQL을 이용해 명시적으로 고립성 수준을 설정할 수 있다. 예를 들어 문장
>
> ```sql
> set transaction isolation level serializable
> ```
>
은 고립성 수준을 직렬 가능으로 설정한다. 다른 고립성 수준도 마찬가지로 위와 같이 설정할 수 있다.
위 문법은 Oracle, PostgresSQL 그리고 SQL Server에서 지원한다. Oracle은
> ```sql
> alter session set isolation level = serializable
> ```
>
을 사용하며 DB2는 "`change isolation level`"을 사용하고 고립성 수준을 고유한 약자를 사용해 지정한다.
>
-- 데이터베이스 시스템 [7판]. 17장. 751쪽.


## 참고문헌

- [SQL-92]( http://www.contrib.andrew.cmu.edu/~shadow/sql/sql1992.txt )
    - [백업 TXT]( ./resource/ED/C7080C-15D6-4CEB-8A4B-DCB285381536/sql1992.txt )
- 데이터베이스 시스템 [7판] / Abraham Silberschatz, Henry F. Korth, S. Sudarshan 저/정연돈, 권준호 역 외 3명 정보 더 보기/감추기 / 한빛아카데미 / 초판발행: 2021년 08월 05일 / 원서: DATABASE SYSTEM CONCEPTS, Seventh Edition

## 주석

[^johngrib-28527]: JohnGrib: Read uncommitted

