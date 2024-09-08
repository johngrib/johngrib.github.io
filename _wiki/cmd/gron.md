---
layout  : wiki
title   : gron 명령어
summary : JSON을 greppable 하게 표현해준다
date    : 2024-09-08 22:44:35 +0900
updated : 2024-09-08 22:55:21 +0900
tag     : 
resource: 0F/A0E60E-5E74-465A-A516-66F2C3B68946
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Install

```bash
brew install gron
```

## Help

gron 은 [[/cmd/man]]{man 페이지}를 제공하지 않는다.

대신 `--help` 옵션을 사용할 수 있다.

```bash
gron --help
```

## Examples

다음과 같은 json 파일이 있다고 하자.

```json
[
  {
    "commit": {
      "author": {
        "date": "2016-07-02T10:51:21Z",
        "email": "mail@tomnomnom.com",
        "name": "Tom Hudson"
      }
    }
  }
]
```

다음과 같이 사용할 수 있다.

```bash
$ cat test.json | gron
json = [];
json[0] = {};
json[0].commit = {};
json[0].commit.author = {};
json[0].commit.author.date = "2016-07-02T10:51:21Z";
json[0].commit.author.email = "mail@tomnomnom.com";
json[0].commit.author.name = "Tom Hudson";
```

### jq 와의 비교 {#jq}

[[/cmd/jq]]로도 gron과 비슷한 일을 할 수 있지만 복잡한 명령을 사용해야 한다.

```bash
$ cat test.json | jq -r 'paths as $p | "\([$p[] | tostring] | join(".")) = \(getpath($p) | tojson)"'
0 = {"commit":{"author":{"date":"2016-07-02T10:51:21Z","email":"mail@tomnomnom.com","name":"Tom Hudson"}}}
0.commit = {"author":{"date":"2016-07-02T10:51:21Z","email":"mail@tomnomnom.com","name":"Tom Hudson"}}
0.commit.author = {"date":"2016-07-02T10:51:21Z","email":"mail@tomnomnom.com","name":"Tom Hudson"}
0.commit.author.date = "2016-07-02T10:51:21Z"
0.commit.author.email = "mail@tomnomnom.com"
0.commit.author.name = "Tom Hudson"
```

## 함께 읽기

- [[/cmd/jq]]

## Links

- <https://github.com/tomnomnom/gron >
