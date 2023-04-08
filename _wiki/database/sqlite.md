---
layout  : wiki
title   : SQLite
summary : 
date    : 2021-07-31 12:41:48 +0900
updated : 2023-04-08 21:13:32 +0900
tag     : db
resource: 0E/C610B8-F99D-4CEB-96E2-BC113900DE3E
toc     : true
public  : true
parent  : [[/database]]
latex   : false
---
* TOC
{:toc}

## Examples

### 새로운 데이터베이스 생성

```sh
sqlite3 test.db

sqlite> .quit
```

### 도움말 보기

```sh
sqlite> .help
```

### describe 테이블

```sh
sqlite> .schema table_name
```

## 함께 읽기

- [SQLite의 알려지지 않은 이야기 (news.hada.io)]( https://news.hada.io/topic?id=4558 )

## 참고문헌

- [SQLite (sqlite.org)]( https://www.sqlite.org/index.html )

