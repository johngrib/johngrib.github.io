---
layout  : wiki
title   : MariaDB Connector/J
summary : 
date    : 2021-06-26 17:43:22 +0900
updated : 2021-06-26 21:12:28 +0900
tag     : mysql
resource: 1C/CC8411-E647-4CD1-825A-68EEAF2676B1
toc     : true
public  : true
parent  : [[database]]
latex   : false
---
* TOC
{:toc}

- 이 문서는 [MariaDB Connector/J 2.7.3 문서][about-connector]를 참고하였습니다.
- MariaDB Connector/J 2.7.3 은 MySQL 서버 5.5.3 버전과 호환됩니다.

## Connection Strings

JDBC connection string 포맷은 다음과 같다.

```
jdbc:(mysql|mariadb):[replication:|loadbalance:|sequential:|aurora:]//<hostDescription>[,<hostDescription>...]/[database][?<key1>=<value1>[&<key2>=<value2>]] 
```

다음은 이 포맷을 내가 [regexper][connection-string-regexper]를 사용해 다이어그램으로 표현해 본 것이다.

![image]( /resource/wiki/mariadb-connector-j/123508148-91914a80-d6a8-11eb-9218-76f52145d45f.png )

HostDescription 포맷은 다음과 같다.

```
<host>[:<portnumber>]  or address=(host=<host>)[(port=<portnumber>)][(type=(master|slave))]
```

[공식 문서][about-connector]에서 언급하고 있는 주의사항은 다음과 같다.

>
- The host must be a DNS name or IP address.
- If the host is an IPv6 address, then it must be inside square brackets.
- The default port is 3306.
- The default type is master.
- If the failover and load-balancing mode is set to replication, then the connector assumes that the first host is master, and the others are slaves by default, if their types are not explicitly mentioned.

- 호스트는 DNS 이름 또는 IP 주소여야 한다.
- 호스트가 IPv6 주소라면 대괄호 안에 있어야 한다.
- 기본 port는 `3306`.
- 기본 type은 `master`.
- `failover`와 `load-balancing` 모드로 셋팅된 `replication`이라면, 커넥터는 유형이 명시적으로 언급되지 않은 경우 첫 번째 호스트가 `master`이고 나머지 호스트는 `slave`라고 가정한다.

HostDescription 예제는 다음과 같다.

- `localhost:3306`
- `[2001:0660:7401:0200:0000:0000:0edf:bdd7]:3306`
- `somehost.com:3306`
- `address=(host=localhost)(port=3306)(type=master)`

## Failover and Load-Balancing Modes

Failover 와 Load-Balancing 모드는 MariaDB Connector/J 1.2.0. 부터 도입되었다.

failover와 관련된 자세한 내용은 [failover description]( https://mariadb.com/kb/en/failover-and-high-availability-with-mariadb-connector-j/ )을 참고할 것.

### sequential

`sequential`

>
This mode supports connection failover in a multi-master environment, such as MariaDB Galera Cluster. This mode does **not** support load-balancing reads on slaves. The connector will try to connect to hosts in the order in which they were declared in the connection URL, so the first available host is used for all queries.
>
For example, let's say that the connection URL is the following: `jdbc:mariadb:sequential:host1,host2,host3/testdb`
>
When the connector tries to connect, it will always try host1 first. If that host is not available, then it will try host2. etc. When a host fails, the connector will try to reconnect to hosts in the same order.
>
This mode has been available since [MariaDB Connector/J 1.3.0]( https://mariadb.com/kb/en/mariadb-connector-j-130-release-notes/ )

- 이 모드는 MariaDB Galera Cluster와 같은 멀티 master 환경에서의 커넥션 failover를 지원합니다.
- **주의**: 이 모드는 slave에 대해서는 load-balancing 읽기를 지원하지 않습니다.
- 커넥터는 connection URL에 지정된 순서대로 호스트에 연결을 시도합니다.
    - 따라서 첫번째로 지정된 호스트는 모든 쿼리에서 사용하게 됩니다.

### loadbalance

`loadbalance`

>
This mode supports connection load-balancing in a multi-master environment, such as MariaDB Galera Cluster. This mode does **not** support load-balancing reads on slaves. The connector performs load-balancing for all queries by randomly picking a host from the connection URL for each connection, so queries will be load-balanced as a result of the connections getting randomly distributed across all hosts.
>
Before 2.4.2, this option was named `failover` - alias still exist for compatibility - .
>
This mode has been available since MariaDB Connector/J 1.2.0

- 이 모드는 MariaDB Galera Cluster와 같은 멀티 master 환경에서의 커넥션 load-balancing을 지원합니다.
- **주의**: 이 모드는 slave에 대해서는 load-balancing 읽기를 지원하지 않습니다.
- 커넥터는 각 커넥션마다 모든 쿼리에 대해 하나의 호스트를 랜덤하게 골라서 load-balancing을 수행합니다.
- 2.4.2 이전 버전에서는 이 옵션의 이름이 `loadbalance`가 아니라 `failover` 였습니다.
    - 버전 호환성을 위해 `failover` 알리아스는 아직 쓸 수 있습니다.

### replication

`replication`

>
This mode supports connection failover in a master-slave environment, such as a MariaDB Replication cluster. The mode supports environments with one or more masters. This mode does support load-balancing reads on slaves if the connection is set to read-only before executing the read. The connector performs load-balancing by randomly picking a slave from the connection URL to execute read queries for a connection.
>
This mode has been available since MariaDB Connector/J 1.2.0

- 이 모드는 MariaDB Replication cluster와 같은 master-slave 환경에서 커넥션 failover 를 지원합니다.
- 이 모드는 커넥션이 read를 실행하기 전에 read-only로 설정되어 있을 경우, slave에서의 load-balancing 읽기를 지원합니다.
- 커넥터는 커넥션 URL에서 slave를 랜덤하게 선택하여 커넥션에 대한 read 쿼리를 실행하여 load-balancing을 수행합니다.

### aurora

`aurora`

>
This mode supports connection failover in an Amazon Aurora cluster. This mode does support load-balancing reads on slave instances if the connection is set to read-only before executing the read. The connector performs load-balancing by randomly picking a slave instance to execute read queries for a connection.
>
This mode has been available since MariaDB Connector/J 1.2.0

- 이 모드는 Amazon Aurora cluster에서의 failover를 지원합니다.
- 이 모드는 커넥션이 read를 실행하기 전에 read-only로 설정되어 있을 경우, slave 인스턴스에서의 load-balancing 읽기를 지원합니다.
- 커넥터는 커넥션에 대해 read 쿼리를 실행하기 위해 랜덤하게 slave 인스턴스를 선택하여 load-balancing을 수행합니다.


AWS에서 Aurora를 쓰고 있다면 `aurora` 옵션은 꼭 알아둬야 한다.

이걸 설정하지 않아 failover 성능 테스트 때 failover가 작동하지 않아 고생한 적이 있다.

다음 예와 같이 `jdbc:mariadb:aurora` 처럼 작성하면 된다.

```
spring:
  datasource:
    hikari:
      jdbc-url: jdbc:mariadb:aurora://___.rds.amazonaws.com:3306/db_name?autoReconnect=true&...
      driver-class-name: org.mariadb.jdbc.Driver
      username:
      password:
      maximum-pool-size:
```

## Optional URL Parameters

### Essential Parameters

#### user

> Database user name.

#### password

> Password of database user.

#### rewriteBatchedStatements

>
For insert queries, rewrite batchedStatement to execute in a single executeQuery.
>
example:
>
`insert into ab (i) values (?)` with first batch values = 1, second = 2 will be rewritten
`insert into ab (i) values (1), (2)`.
>
If query cannot be rewriten in "multi-values", rewrite will use multi-queries : `INSERT INTO TABLE(col1) VALUES (?) ON DUPLICATE KEY UPDATE col2=?` with values [1,2] and [2,3]" will be rewritten
`INSERT INTO TABLE(col1) VALUES (1) ON DUPLICATE KEY UPDATE col2=2;INSERT INTO TABLE(col1) VALUES (3) ON DUPLICATE KEY UPDATE col2=4`
>
when active, the useServerPrepStmts option is set to false
Default: false. Since 1.1.8"

- insert 쿼리에 대해 batchedStatement로 쿼리를 다시 작성해 하나의 executeQuery 에서 실행한다.

예를 들어 다음과 같은 쿼리가 있고, `?`에 들어갈 값으로 `1`, `2`가 주어진다면...

```sql
insert into ab (i) values (?)
```

다음과 같은 쿼리로 재작성하여 실행한다.

```sql
insert into ab (i) values (1), (2)
```

만약 multi-values 형태로 재작성이 불가능한 쿼리라면, multi-queries를 사용한다.

예를 들어 다음과 같은 쿼리가 있고, `[1,2]`와 `[2,3]`값이 주어진다면...

```sql
INSERT INTO TABLE(col1) VALUES (?) ON DUPLICATE KEY UPDATE col2=?
```

다음과 같은 쿼리로 재작성하여 실행한다.

```sql
INSERT INTO TABLE(col1) VALUES (1) ON DUPLICATE KEY UPDATE col2=2;
INSERT INTO TABLE(col1) VALUES (3) ON DUPLICATE KEY UPDATE col2=4
```

- 이 옵션이 활성화되면 `useServerPrepStmts` 옵션은 `false`로 설정된다.
- 기본값: `false`

#### connectTimeout

>
The connect timeout value, in milliseconds, or zero for no timeout.
Default: 30 000. Since 1.1.8

- 기본값: `30000`(ms 이므로 30초).

#### useServerPrepStmts

>
PrepareStatement are prepared on the server side before executing. The applications that repeatedly use the same queries have value to activate this option, but the general case is to use the direct command (text protocol).
if rewriteBatchedStatements is set to true, this option will be set to false
Default: false (was true before 1.6.0). Since 1.3.0

- 기본값: `false`

#### useBatchMultiSend

>
**Not compatible with aurora**
>
Driver will can send queries by batch.
>
If set to false, queries are sent one by one, waiting for the result before sending the next one.
>
If set to true, queries will be sent by batch corresponding to the useBatchMultiSendNumber option value (default 100) or according to the [max_allowed_packet]( https://mariadb.com/kb/en/server-system-variables/#max_allowed_packet ) server variable if the packet size does not permit sending as many queries. Results will be read later, avoiding a lot of network latency when the client and server aren't on the same host.
>
This option is mainly effective when the client is distant from the server. More information [here]( https://mariadb.com/kb/en/option-batchmultisend-description/ )
>
Default: true (false if using aurora failover) . Since 1.5.0

- 기본값: `true`

#### allowLocalInfile

> Permit loading data from file. see [LOAD DATA LOCAL INFILE]( https://mariadb.com/kb/en/about-mariadb-connector-j/#load-data-infile ).
Default: false. Since 1.2.1

- 기본값: `false`

#### useMysqlMetadata

> [databaseMetaData.getDatabaseProductName()]( https://docs.oracle.com/en/java/javase/11/docs/api/java.sql/java/sql/DatabaseMetaData.html#getDatabaseProductName() ) return "MariaDB" or "MySQL" according to server type (since 2.4.0). This option permit to force returning "MySQL" even if server is MariaDB to permit compatibility with frameworks that doesn't support MariaDB.
Default: false. Since 2.4.1

- 기본값: `false`

### TLS Parameters


### Pool Parameters

pool 설정은 [pool documentation]( https://mariadb.com/kb/en/pool-datasource-implementation/ )을 참고할 것.

#### pool

>
Use pool. This option is useful only if not using a DataSource object, but only a connection object.
Default: false. since 2.2.0

- pool을 사용한다.
- 기본값: `false`


#### poolName

>
Pool name that permits identifying threads.
default: auto-generated as MariaDb-pool-<pool-index> since 2.2.0

- 스레드 식별을 허용하는 pool 이름.
- 기본값: `MariaDb-pool-<pool-index>`으로 자동 생성.


#### maxPoolSize

>
The maximum number of physical connections that the pool should contain.
Default: 8. since 2.2.0

- pool에 포함되어야 하는 최대 물리적 연결의 수.
- 기본값: `8`

#### minPoolSize

>
When connections are removed due to not being used for longer than than "maxIdleTime", connections are closed and removed from the pool. "minPoolSize" indicates the number of physical connections the pool should keep available at all times. Should be less or equal to maxPoolSize.
Default: maxPoolSize value. Since 2.2.0

- `maxIdleTime`이 넘어가도록 사용되지 않아 제거된 connection은 close 되며, pool에서 remove 된다.
- `minPoolSize`는 pool이 항상 사용 가능한 상태로 유지해야 하는 물리적 연결의 수를 의미한다.
- 이 값은 `maxPoolSize`보다 작거나 같아야 한다.
- 기본값: `maxPoolSize`와 같음.


#### poolValidMinDelay

>
When asking a connection to pool, the pool will validate the connection state. "poolValidMinDelay" permits disabling this validation if the connection has been borrowed recently avoiding useless verifications in case of frequent reuse of connections. 0 means validation is done each time the connection is asked.
Default: 1000 (in milliseconds). Since 2.2.0

- pool에 connection을 요청할 때, pool은 connection의 상태 유효성을 검사하는데...
- `poolValidMinDelay`는 connection을 자주 재사용하는 경우에 불필요한 유효성 검증을 줄일 수 있다.
- 이 값이 `0`이라면 connection이 요청될 때마다 validation이 수행된다는 뜻이다.
- 기본값: `1000`(ms 이므로 1초).


#### maxIdleTime

>
The maximum amount of time in seconds that a connection can stay in the pool when not used. This value must always be below @wait_timeout value - 45s
Default: 600 in seconds (=10 minutes), minimum value is 60 seconds. Since 2.2.0

- connection이 사용되지 않을 때 pool에 stay할 수 있는 최대 시간(초 단위).
- 이 값은 항상 `@wait_timeout 값 - 45초` 미만이어야 한다.
- 기본값: `600`(seconds 이므로 600초 = 10분).
    - 최소값: `60`초.


#### staticGlobal

>
Indicates the values of the global variables [max_allowed_packet]( https://mariadb.com/kb/en/server-system-variables/#max_allowed_packet ), [wait_timeout]( https://mariadb.com/kb/en/server-system-variables/#wait_timeout ), [autocommit]( https://mariadb.com/kb/en/server-system-variables/#autocommit ), [auto_increment_increment]( https://mariadb.com/kb/en/replication-and-binary-log-server-system-variables/#auto_increment_increment ), [time_zone]( https://mariadb.com/kb/en/server-system-variables/#time_zone ), [system_time_zone]( https://mariadb.com/kb/en/server-system-variables/#system_time_zone ) and [tx_isolation]( https://mariadb.com/kb/en/server-system-variables/#tx_isolation )) won't be changed, permitting the pool to create new connections faster.
Default: false. Since 2.2.0

- 전역 변수(`max_allowed_packet`, `wait_timeout`, `autocommit`, `auto_increment_increment`, `time_zone`, `system_time_zone`, `tx_isolation`)의 값이 변경되지 않으며, pool에서 새 connection을 더 빠르게 만들 수 있습니다.
- 기본값: `false`

#### useResetConnection

>
When a connection is closed() (given back to pool), the pool resets the connection state. Setting this option, the prepare command will be deleted, session variables changed will be reset, and user variables will be destroyed when the server permits it (`>=` [MariaDB 10.2.4]( https://mariadb.com/kb/en/mariadb-1024-release-notes/ ), `>=` MySQL 5.7.3), permitting saving memory on the server if the application make extensive use of variables. Must not be used with the useServerPrepStmts option
Default: false. Since 2.2.0

- connection이 close 되면(pool로 반환되면), pool은 connection state를 리셋합니다.
- 이 옵션을 설정하면
    - prepare 명령은 삭제되고,
    - session 변수는 reset 되며
    - 애플리케이션이 변수를 광범위하게 사용한다면... 서버가 허용하는 경우(MariaDB 10.2.4 버전 이상, MySQL 5.7.3 버전 이상) user variables는 destroyed 되어 메모리를 절약(saving)할 수 있습니다.
    - `useServerPrepStmts` 옵션과 같이 사용하면 안됩니다.
- 기본값: `false`

#### registerJmxPool

>
Register JMX monitoring pools.
Default: true. Since 2.2.0

- JMX 모니터링 pool을 등록합니다.
- 기본값: `true`

### Log Parameters

#### log

>
Enable log information.
require Slf4j version > 1.4 dependency.
Log level correspond to Slf4j logging implementation
Default: false. Since 1.5.0

- log information을 활성화.
- `Slf4j` 1.4 버전 이상에 의존합니다.
- log level은 Slf4j 로깅 구현에 해당.
- 기본값: `false`

#### maxQuerySizeToLog

>
Only the first characters corresponding to this options size will be displayed in logs
Default: 1024. Since 1.5.0

- 이 옵션에 설정한 앞 부분 문자만 로그에 표시.
- 기본값: `1024` 글자.

#### slowQueryThresholdNanos

>
Will log query with execution time superior to this value (if defined )
Default: 1024. Since 1.5.0

- 실행 시간이 이 값보다 긴 쿼리를 기록합니다.
- 기본값: `1024`. (ms인듯)

#### profileSql

>
log query execution time.
Default: false. Since 1.5.0

- 쿼리 수행 시간을 로깅합니다.
- 기본값: `false`

### Infrequently Used Parameters

**자주 사용하지 않는 파라미터들**

#### ...

#### socketTimeout

>
Defined the network socket timeout (SO_TIMEOUT) in milliseconds. Value of 0 disables this timeout.
If the goal is to set a timeout for all queries, since [MariaDB 10.1.1]( https://mariadb.com/kb/en/mariadb-1011-release-notes/ ), the server has permitted a solution to limit the query time by setting a system variable, [max_statement_time]( https://mariadb.com/kb/en/server-system-variables/#max_statement_time ). The advantage is that the connection then is still usable.
Default: 0 (standard configuration) or 10000ms (using "aurora" failover configuration).
since 1.1.7

- network socket timeout (SO_TIMEOUT)을 milliseconds 단위로 정의.
- 만약 모든 쿼리에 대해 timeout을 설정하는 것이 목표라면, 서버 시스템 변수 `max_statement_time`을 설정하여 쿼리 시간 리미트를 설정할 수도 있습니다.
- 이 값이 `0`이면 timeout이 비활성화됩니다.
- 기본값:
    - `0` (표준 설정)
    - `10000`ms (`aurora` failover 설정을 한 경우)

#### ...

#### autocommit

>
Set default autocommit value on connection initialization
Default: true. Since 2.2.0

- connection이 초기화될 때 설정할 디폴트 autocommit 값을 정합니다.
- 기본값: `true`

#### ...

### Failover and Load Balancing Parameters

#### autoReconnect

>
If this parameter is enabled and Failover and Load Balancing Mode is not in use, the connector will simply try to reconnect to its host after a failure. This is referred to as **Basic Failover**.  
If this parameter is enabled and Failover and Load Balancing Mode is in use, the connector will blacklist the failed host and try to connect to a different host of the same type. This is referred to as **Standard Failover**.  
Default is false.  
since 1.1.7

- 이 값이 활성화되었을 때, failover와 load balancing 모드가 사용중이 아니라면 connector는 실패 후 호스트에 연결을 재시도합니다.
    - 이를 기본 장애 조치(Basic Failover)라 부릅니다.
- 이 값이 활성화되었을 때, failover와 load balancing 모드가 사용중이라면 connector는 실패한 호스트를 blacklist에 추가하고 동일한 타입의 다른 호스트에 connect를 시도합니다.
    - 이를 표준 장애 조치(Standard Failover)라 부릅니다.
- 기본값: `false`

#### retriesAllDown

>
When the connector is performing a failover and all hosts are down, this parameter defines the maximum number of connection attempts the connector will make before throwing an exception.  
Default: 120 seconds.  
since 1.2.0

- connector가 failover를 수행하고 모든 호스트가 다운되었을 때, 이 값은 connector가 예외를 던지기 전에 시도할 최대 connection 시도 횟수입니다.
- 기본값: `120`초.

#### failoverLoopRetries

>
When the connector is searching silently for a valid host, this parameter defines the maximum number of connection attempts the connector will make before throwing an exception.  
This parameter differs from the "retriesAllDown" parameter because this silent search is used in situations where the connector can temporarily workaround the problem, such as by using the master connection to execute reads when the slave connection fails.  
Default: 120.  
since 1.2.0

- connector가 유효한 호스트를 자동으로 검색할 때, 이 값은 connector가 예외를 던지기 전에 시도할 최대 connection 시도 횟수입니다.
- 이 값은 `retriesAllDown`과 다릅니다.
- 이 값의 설정으로 인한 자동 검색은 (master connection을 사용하여 slave connection이 fail할 때 read를 실행하는 것과 같이) connector가 문제를 일시적으로 해결할 수 있는 상황에서 사용되기 때문입니다.
- 기본값: `120`.

#### validConnectionTimeout
>
When multiple hosts are configured, the connector verifies that the connections haven't been lost after this much time in seconds has elapsed.  
When this parameter is set to 0, no verification will be done.  
Default:120 seconds  
since 1.2.0

- 여러 개의 호스트가 설정된 경우, connector는 설정한 시간이 지난 후에도 연결이 끊어지지 않았는지 확인합니다.
- 이 값이 `0`이라면 확인을 하지 않습니다.
- 기본값: `120`초.

#### loadBalanceBlacklistTimeout
>
When a connection fails, this host will be blacklisted for the amount of time defined by this parameter.
When connecting to a host, the driver will try to connect to a host in the list of non-blacklisted hosts and, only if none are found, attempt blacklisted ones.  
This blacklist is shared inside the classloader.  
Default: 50 seconds.  
since 1.2.0

- connection이 fail하면, 해당 호스트는 이 값에 설정한 시간 동안 blacklist에 추가됩니다.
- 호스트에 연결할 때, 드라이버는 blacklist에 없는 호스트 목록에 들어있는 호스트에 연결을 시도합니다.
    - 만약 모든 호스트가 blacklist에 들어있다면 blacklist에 들어있는 호스트에 연결을 시도합니다.
- 이 blacklist는 classloader 내부에서 공유됩니다.
- 기본값: `50`초.

#### assureReadOnly

>
When this parameter enabled when a Failover and Load Balancing Mode is in use, and a read-only connection is made to a host, assure that this connection is in read-only mode by setting the session to read-only.  
Default to false.  
Since 1.3.0

- 이 값이 설정되었을 때, failover 와 load balancing 모드가 사용중이고, read-only connection이 호스트와 연결되었다면, 이 커넥션은 세션을 read-only로 설정하여, 이 read-only 모드가 됩니다.
- 기본값: `false`

#### allowMasterDownConnection

>
When the replication Failover and Load Balancing Mode is in use, allow the creation of connections when the master is down. If no masters are available, then the default connection will be a slave, and Connection.isReadOnly() will return true.  
Default: false. Since 2.2.0

- replication failover와 load balancing 모드가 사용중일 때, master가 down 됐다면, connection들의 생성을 허용합니다.
- 사용 가능한 master가 없다면, default connection은 slave가 되고, `Connection.isReadOnly()` 는 `true`를 리턴합니다.
- 기본값: `false`


## 참고문헌

- [About MariaDB Connector/J (mariadb.com)][about-connector]
- [mariadb-connector-j(github.com)]( https://github.com/mariadb-corporation/mariadb-connector-j )

[about-connector]: https://mariadb.com/kb/en/about-mariadb-connector-j/
[connection-string-regexper]: https://regexper.com/#jdbc%3A%28%3F%3Amysql%7Cmariadb%29%3A%28%3F%3Areplication%3A%7Cloadbalance%3A%7Csequential%3A%7Caurora%3A%29%5C%2F%5C%2F%3ChostDescription%3E%28%3F%3A%2C%3ChostDescription%3E%5C.%5C.%5C.%29%3F%5C%2F%28%3F%3Adatabase%29%28%3F%3A%5C%3F%3Ckey1%3E%3D%3Cvalue1%3E%28%3F%3A%26%3Ckey2%3E%3D%3Cvalue2%3E%29%3F%29%3F

