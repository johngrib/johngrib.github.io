---
layout  : wiki
title   : DataGrip 이것저것
summary : 
date    : 2024-08-15 10:51:25 +0900
updated : 2024-08-15 10:55:00 +0900
tag     : 
resource: AB/25B30C-2104-4319-BA31-E7842EC1CA5D
toc     : true
public  : true
parent  : [[/tool/jetbrains]]
latex   : false
---
* TOC
{:toc}

## DB 드라이버 다운로드 웹 페이지

DataGrip에서 사용하는 DB 드라이버는 다음 경로에 모여 있다.

<https://www.jetbrains.com/datagrip/jdbc-drivers/ >

- ABC 순으로 정렬되어 있다.
- SQLite 드라이버는 S이지만 `Xerial SQLiteJDBC`로 등록되어 있기 때문에 목록의 가장 아래쪽에 있다.

## DB 드라이버를 로컬에 저장하는 위치

DataGrip이 사용하는 DB 드라이버들은 다음 경로에 설치된다.

```
~/Library/Application Support/JetBrains/DataGrip2023.2/jdbc-drivers
```

