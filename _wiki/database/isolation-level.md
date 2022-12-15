---
layout  : wiki
title   : 격리 수준 (isolation level)
summary : 
date    : 2022-12-15 23:23:05 +0900
updated : 2022-12-15 23:54:13 +0900
tag     : sql-92
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



## 참고문헌

- [SQL-92]( http://www.contrib.andrew.cmu.edu/~shadow/sql/sql1992.txt )
    - [백업 TXT]( ./resource/ED/C7080C-15D6-4CEB-8A4B-DCB285381536/sql1992.txt )

