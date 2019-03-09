---
layout  : wiki
title   : python3로 간단하게 파일 전송하기
summary : 같은 사무실이면 메신저로 보내지 말고 python3 -m http.server
date    : 2018-09-18 20:45:43 +0900
updated : 2018-09-18 23:08:50 +0900
tag     : python ip curl
toc     : true
public  : true
parent  : Python3
latex   : false
---
* TOC
{:toc}

# 개요

* 같은 네트워크 내의 컴퓨터라면 python의 http.server를 사용해 쉽게 파일을 공유할 수 있다.
* 우리 회사의 중요한 파일을 다른 회사의 메신저를 통해 보내는 게 찝찝하다면 사용해 보자.
* 기왕이면 받을 사람의 공개 키로 암호화해 보내면 더욱 안전하게 전송할 수 있을 것이다.

# 방법

* 전송하고 싶은 파일이 있는 디렉토리로 이동한다.
* 다음 명령어를 실행한다.

```sh
$ python3 -m http.server

Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

* `8000` 포트가 열렸다는 걸 기억해두자.
* 이제 `ifconfig`로 사무실 네트워크 내 내 컴퓨터의 ip 주소를 조사하자.

```sh
$ ifconfig | egrep -o 'inet\s.+(\d+\.){3}\d+' | grep -v '127.0.0.1' | awk '{print $2}'
```

* 명령어가 길어서 타이핑하기 귀찮으면 다음과 같이 대충 찾아도 된다.

```sh
$ ifconfig | grep 'inet '
```

* 이제 내 컴퓨터의 ip 주소와 포트 번호, 파일명을 조합해 uri를 만들고 파일을 받으려는 사람에게 uri만 보내주면 된다.

예를 들어 내 컴퓨터의 ip 주소가 `192.168.0.8`이고 보내려는 파일이 `myfile.txt`라면 주소는 다음과 같을 것이다.

```
http://192.168.0.8:8000/myfile.txt
```

받는 사람은 웹 브라우저에서 저 링크를 타고 들어가거나, `curl`로 받으면 된다.

```sh
$ curl -O http://192.168.0.8:8000/myfile.txt
```

