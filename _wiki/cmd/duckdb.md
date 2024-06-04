---
layout  : wiki
title   : duckdb
summary : 
date    : 2024-06-04 21:46:32 +0900
updated : 2024-06-04 22:31:19 +0900
tag     : 
resource: AA/23928D-3A6B-40B9-AAD9-048022AE5477
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Installation

```bash
brew install duckdb
```

## Examples

### CSV

다음과 같은 csv 파일이 있다고 하자.

```csv
ID,name,math,science,english
1,Kim Cheolsu,85,90,78
2,Lee Younghee,88,92,95
3,Park Minsoo,70,85,80
4,Choi Jiwoo,95,88,92
5,Kim Junho,78,74,80
```

`duckdb -c` 를 사용해 다음과 같이 csv 파일에 대해 SQL을 사용할 수 있다.

```
$ duckdb -c "select * from 'test.csv'"
┌───────┬──────────────┬───────┬─────────┬─────────┐
│  ID   │     name     │ math  │ science │ english │
│ int64 │   varchar    │ int64 │  int64  │  int64  │
├───────┼──────────────┼───────┼─────────┼─────────┤
│     1 │ Kim Cheolsu  │    85 │      90 │      78 │
│     2 │ Lee Younghee │    88 │      92 │      95 │
│     3 │ Park Minsoo  │    70 │      85 │      80 │
│     4 │ Choi Jiwoo   │    95 │      88 │      92 │
│     5 │ Kim Junho    │    78 │      74 │      80 │
└───────┴──────────────┴───────┴─────────┴─────────┘
```

`where`, `like`, `limit` 등을 사용할 수 있다. 대부분의 SQL 문법을 지원한다.

```
$ duckdb -c "select name, math from read_csv('test.csv') where name like 'K%'"
┌─────────────┬───────┐
│    name     │ math  │
│   varchar   │ int64 │
├─────────────┼───────┤
│ Kim Cheolsu │    85 │
│ Kim Junho   │    78 │
└─────────────┴───────┘
```

한글도 잘 작동하므로, 한글 데이터 파일에 대해서도 문제없다.

### JSON

JSON 에 대해서도 SQL을 사용할 수 있다.

```json
[
  {"ID": 1, "name": "Kim Cheolsu", "math": 85, "science": 90, "english": 78},
  {"ID": 2, "name": "Lee Younghee", "math": 88, "science": 92, "english": 95},
  {"ID": 3, "name": "Park Minsoo", "math": 70, "science": 85, "english": 80},
  {"ID": 4, "name": "Choi Jiwoo", "math": 95, "science": 88, "english": 92},
  {"ID": 5, "name": "Kim Junho", "math": 78, "science": 74, "english": 80}
]
```

```
$ duckdb -c "select * from read_json('test.json')"
┌───────┬──────────────┬───────┬─────────┬─────────┐
│  ID   │     name     │ math  │ science │ english │
│ int64 │   varchar    │ int64 │  int64  │  int64  │
├───────┼──────────────┼───────┼─────────┼─────────┤
│     1 │ Kim Cheolsu  │    85 │      90 │      78 │
│     2 │ Lee Younghee │    88 │      92 │      95 │
│     3 │ Park Minsoo  │    70 │      85 │      80 │
│     4 │ Choi Jiwoo   │    95 │      88 │      92 │
│     5 │ Kim Junho    │    78 │      74 │      80 │
└───────┴──────────────┴───────┴─────────┴─────────┘
```

```
$ duckdb -c "select * from 'test.json' limit 2"
┌───────┬──────────────┬───────┬─────────┬─────────┐
│  ID   │     name     │ math  │ science │ english │
│ int64 │   varchar    │ int64 │  int64  │  int64  │
├───────┼──────────────┼───────┼─────────┼─────────┤
│     1 │ Kim Cheolsu  │    85 │      90 │      78 │
│     2 │ Lee Younghee │    88 │      92 │      95 │
└───────┴──────────────┴───────┴─────────┴─────────┘
```

`read_json('/dev/stdin')`이나 `read_csv('/dev/stdin')`을 사용하면 stdin으로부터 데이터를 읽을 수 있다.

```
$ cat test.json | duckdb -c "select name, english from read_json('/dev/stdin') where name like 'K%'"
┌─────────────┬─────────┐
│    name     │ english │
│   varchar   │  int64  │
├─────────────┼─────────┤
│ Kim Cheolsu │      78 │
│ Kim Junho   │      80 │
└─────────────┴─────────┘
```

## Links

- [duckdb.org](https://duckdb.org/ )
- [DuckDB as the New jq (www.pgrs.net)]( https://www.pgrs.net/2024/03/21/duckdb-as-the-new-jq/ )
- [Shredding Deeply Nested JSON, One Vector at a Time (duckdb.org)](https://duckdb.org/2023/03/03/json.html )

