---
layout  : wiki
title   : TOML
summary : Tom's Obvious, Minimal Language
date    : 2018-10-23 10:06:00 +0900
updated : 2018-10-23 11:01:12 +0900
tag     : toml data-format
toc     : true
public  : true
parent  : programming-language
latex   : false
---
* TOC
{:toc}

# Comparison with json

* 다음은 <https://github.com/toml-lang/toml#example >의 내용을 복사해 온 것이다.

```toml
# This is a TOML document.

title = "TOML Example"

[owner]
name = "Tom Preston-Werner"
dob = 1979-05-27T07:32:00-08:00 # First class dates

[database]
server = "192.168.1.1"
ports = [ 8001, 8001, 8002 ]
connection_max = 5000
enabled = true

[servers]

  # Indentation (tabs and/or spaces) is allowed but not required
  [servers.alpha]
  ip = "10.0.0.1"
  dc = "eqdc10"

  [servers.beta]
  ip = "10.0.0.2"
  dc = "eqdc10"

[clients]
data = [ ["gamma", "delta"], [1, 2] ]

# Line breaks are OK when inside arrays
hosts = [
  "alpha",
  "omega"
]
```

* 다음은 위의 toml 텍스트를 <https://toolkit.site/format.html >에서 json 형식으로 변환하고, 개행을 조금 손본 것이다.

```json
{
  "title": "TOML Example",
  "owner": {
    "name": "Tom Preston-Werner",
    "dob": "1979-05-27T15:32:00.000Z"
  },
  "database": {
    "server": "192.168.1.1",
    "ports": [ 8001, 8001, 8002 ],
    "connection_max": 5000,
    "enabled": true
  },
  "servers": {
    "alpha": {
      "ip": "10.0.0.1",
      "dc": "eqdc10"
    },
    "beta": {
      "ip": "10.0.0.2",
      "dc": "eqdc10"
    }
  },
  "clients": {
    "data": [
      [ "gamma", "delta" ],
      [ 1, 2 ]
    ],
    "hosts": [ "alpha", "omega" ]
  }
}
```

두 형식을 비교해보면 기본적인 사용법은 파악할 수 있다.


# 기억해 둘 점들

* 가급적이면 key를 쓸 때에는 따옴표를 적어주자.
    * 따옴표가 없다면 key에 사용할 수 있는 문자는 `A-Za-z0-9_-`로 한정된다.

```toml
k.ey = "value"      # error
"k.ey" = "value"    # ok

키 = "value"    # error
"키" = "value"  # ok
```

* multi line string은 python처럼 세 개의 따옴표를 사용한다.

```toml
str1 = """
Roses are red
Violets are blue"""
```

* 여러 줄로 작성하지만, 한 줄로 인식하길 바란다면 `\`를 사용한다.

```toml
# The following strings are byte-for-byte equivalent:
str1 = "The quick brown fox jumps over the lazy dog."

str2 = """
The quick brown \


  fox jumps over \
    the lazy dog."""

str3 = """\
       The quick brown \
       fox jumps over \
       the lazy dog.\
       """
```

* 긴 숫자를 알아보기 쉽게 세 글자마다 표시를 하고 싶다면 perl 언어처럼 `_`를 쓰면 된다.

```toml
int6 = 5_349_221
flt8 = 224_617.445_991_228
```

* 배열을 작성할 때, 여러 줄로 표기한다면 마지막에 콤마를 넣어도 된다.

```toml
arr7 = [
  1, 2, 3
]

arr8 = [
  1,
  2, # this is ok
]
```

* 테이블의 포함 관계는 `.`으로 표시한다

```toml
[servers]

  # Indentation (tabs and/or spaces) is allowed but not required
  [servers.alpha]
  ip = "10.0.0.1"
  dc = "eqdc10"

  [servers.beta]
  ip = "10.0.0.2"
  dc = "eqdc10"
```

* 상위 테이블 내용이 없다면 일일이 계층을 명시하지 않고 생략해도 된다

```toml
# [x] you
# [x.y] don't
# [x.y.z] need these
[x.y.z.w] # for this to work
```

* inline 테이블을 쓸 때에는 `=`을 쓴다.

```toml
name = { first = "Tom", last = "Preston-Werner" }
point = { x = 1, y = 2 }
animal = { type.name = "pug" }
```

* 다음은 위의 inline 테이블과 같은 테이블이다.

```toml
[name]
first = "Tom"
last = "Preston-Werner"

[point]
x = 1
y = 2

[animal]
type.name = "pug"
```

# Links

* [toml(github.com)](https://github.com/toml-lang/toml )
* <https://learnxinyminutes.com/docs/toml/ >
* [Online TOML to JSON converter](https://toml-to-json.matiaskorhonen.fi/ )

