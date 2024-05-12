---
layout  : wiki
title   : ssh 명령어
summary : OpenSSH remote login client
date    : 2024-05-12 10:51:58 +0900
updated : 2024-05-12 17:16:40 +0900
tag     : 
resource: FC/B02A19-9ADD-4CF4-8920-33040E4471E4
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples


```bash
 # 192.168.123.123 서버에 john 계정으로 접속한다. (이후 패스워드 입력)
ssh john@192.168.123.123

 # rsa 키 파일을 사용해 접속한다.
ssh -i ~/.ssh/id_rsa john@192.168.123.123

 # 192.168.123.123 서버의 4000 포트를 로컬 포트 8080으로 포워딩한다.
ssh -L 8080:localhist:4000 john@192.168.123.123
```

## 함께 읽기

- [[/article/ssh-macmini-macbook]]

