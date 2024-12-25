---
layout  : wiki
title   : SQLite
summary : 
date    : 2021-07-31 12:41:48 +0900
updated : 2024-12-25 16:40:19 +0900
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

## DataGrip에서 사용하기 {#datagrip}

DataGrip에서 SQLite를 사용하기 위한 드라이버는 JetBrains 홈페이지에 있는 링크에서 다운로드 받을 수 있다.

<https://www.jetbrains.com/datagrip/jdbc-drivers/ >

목록에서 `Xerial SQLiteJDBC`를 찾으면 된다.

DataGrip에서는 버튼만 클릭하면 SQLite 드라이버를 다운로드해주지만,
자동 다운로드가 되지 않거나 곤란한 경우에는 직접 다운로드 받아서 설치하면 된다.

설치 주소는 대충 다음과 같은 형식을 갖는다.

```
~/Library/Application\ Support/JetBrains/DataGrip2023.2/jdbc-drivers/Xerial\ SQLiteJDBC/
```

`Xerial SQLiteJDBC` 경로에 `sqlite-jdbc-x.xx.x.jar` 드라이버 파일을 넣어주고 사용하도록 한다.
경로가 없다면 직접 만들어주면 된다.

물론 경로를 꼭 맞춰줘야 할 필요는 없다.
그러나 기왕이면 다른 드라이버들이 저장된 경로와 비슷하게 해줘야 실수로 엉뚱한 곳으로 옮기거나 삭제하는 일을 방지할 수 있다.
(`~/Downloads`에 저장한 드라이버 파일을 DataGrip에서 사용하고 있다가 실수로 드라이버 파일을 삭제하는 경우도 가능할 것이다.)


## 함께 읽기

- [The Untold Story of SQLite With Richard Hipp (corecursive.com)](https://corecursive.com/066-sqlite-with-richard-hipp/ )
    - [SQLite의 알려지지 않은 이야기 (news.hada.io)]( https://news.hada.io/topic?id=4558 )
- [How bloom filters made SQLite 10x faster - 2024-12-22](https://avi.im/blag/2024/sqlite-past-present-future/ )
    - [Bloom 필터로 10배 빨라진 SQLite](https://news.hada.io/topic?id=18399 )

## 참고문헌

- [SQLite (sqlite.org)]( https://www.sqlite.org/index.html )


