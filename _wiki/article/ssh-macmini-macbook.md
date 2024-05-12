---
layout  : wiki
title   : 거실의 낡은 맥북에서 서재의 맥미니로 ssh로 접속하기
summary : 낡은 맥북을 최신 컴퓨터의 단말기로 사용하자
date    : 2024-05-11 20:56:46 +0900
updated : 2024-05-12 10:41:21 +0900
tag     : 
resource: 0F/B2DCF3-268F-4DEA-B338-053252146B63
toc     : true
public  : true
parent  : [[/article]]
latex   : false
---
* TOC
{:toc}

## 낡은 2017년형 맥북을 활용하고 싶다

나는 2017년형 맥북을 6년 가까이 사용해왔다가 2023년부터는 맥미니를 구매해 사용하고 있다.

- [[/memo/2023#_2023-01-29]]{2023년 1월 29일 일기} - 다음 컴퓨터로 맥북이 아니라 맥미니를 선택해야겠다고 고민한 글.
- [[/memo/2023#_2023-03-17]]{2023년 3월 17일 일기} - 2023년 3월 8일에 구매한 맥미니가 도착한 날.

맥미니를 구매한 이유는 다음과 같다.

- 맥북을 데스크탑처럼 써왔다.
    - 오래 사용해왔지만, 책상 위에 고정시켜놓고 데스크탑처럼 사용하는 경우가 대부분이었다.
    - 맥북에 딸려있는 모니터, 키보드, 트랙패드는 거의 사용하지 않았다.
    - 이동하면서 사용하는 일이 거의 없다.
- 맥미니는 가성비가 좋다.
    - 맥미니는 모니터, 키보드, 트랙패드 등이 없으므로 상대적으로 저렴한 가격으로 구매 가능하다.
    - 크기가 작으므로 공간도 적게 차지한다.
    - 이미 갖고 있는 모니터, 키보드와 트랙패드를 연결하기만 하면 된다.

| 나의 맥북-2017                                                              | 나의 맥미니-2023                                                        |
|-----------------------------------------------------------------------------|-------------------------------------------------------------------------|
| ![]( /resource/0F/B2DCF3-268F-4DEA-B338-053252146B63/macbook-pro-2017.jpg ) | ![]( /resource/0F/B2DCF3-268F-4DEA-B338-053252146B63/macmini-2023.jpg ) |

그리고 1년이 지났다. 어느새 2024년 5월이 되었다.

맥미니-2023은 만족스럽게 사용하고 있지만... 맥북-2017은 뭔가 처치가 곤란하게 됐다.

- 맥북-2017은 아직까지는 동작하긴 하지만 Apple 실리콘이 아니라 Intel 프로세서를 사용하고 있어 꽤 느리다.
- 맥북-2017은 이제 중고로 팔기엔 가격이 아쉽고, 버리기엔 아직 쓸만하다.

아직 잘 돌아가는 컴퓨터를 놀리기엔 너무 아깝다!

그래서 거실에서 TV를 보며 대충 간단한 작업을 할 때 ssh를 통해 맥북-2017에서 맥미니-2023로 접속해서 사용하기로 했다.

- 맥북-2017이 아무리 느리다 해도 단말기로 쓰면 맥미니-2023의 성능을 그대로 사용할 수 있다.
- 나는 맥북-2017에서 주로 내 블로그(이 웹사이트)를 편집할 것이다.
    - 느린 맥북-2017에서 Jekyll 서버를 실행하지 않아도 된다.
        - <mark>빠른 맥미니-2023에서 Jekyll 서버를 실행하고, 맥북-2017에서는 ssh로 접속해서 사용하면 된다.</mark>
    - 느린 맥북-2017에 온갖 Vim 플러그인을 설치하지 않아도 된다.
        - <mark>빠른 맥미니-2023에 설치된 다양한 Vim 플러그인을 느린 맥북-2017에서는 굳이 설치하지 않아도 된다. ssh로 접속해서 맥미니의 Vim을 사용하면 된다.</mark>

## 설정

예전같으면 이런 과정은 굳이 기록으로 남기지 않았겠지만...
요즘은 ssh를 자주 사용하지 않아서 이 과정도 시행착오를 좀 겪었다. 까먹을까봐 기록으로 남긴다.

### 맥미니에서: 원격 로그인을 설정한다

ssh를 써먹기 위해서 다음과 같이 원격 로그인을 활성화한다.

`시스템 환경설정 - 일반 - 공유 - 원격 로그인`

![]( /resource/0F/B2DCF3-268F-4DEA-B338-053252146B63/macmini-share-login.jpg )

### 공유기 설정에서: 맥미니에 고정 IP를 할당한다

WIFI 무선 공유기 설정에 들어가서 맥미니에 고정 IP를 할당한다.

여기에서는 `192.168.123.123`으로 했다고 치자.

## 사용 예
### 맥북에서 ssh로 맥미니로 접속하기

이제 설정은 끝났다. 접속이 되나 확인하면 된다.

일단 `whoami` 명령을 써서 맥미니에서 자신의 이름이 무엇인지 확인한다. 여기에서는 `john`이라고 치자.

```bash
$ whoami
john
```

#### 패스워드로 접속하기

다음과 같이 입력하면 맥미니의 패스워드를 입력하라는 메시지가 나온다.

```
$ ssh john@192.168.123.123
(john@192.168.123.123) Password:
```

맥미니 컴퓨터를 켤 때 입력하는 패스워드를 사용하면 된다.

접속이 되면 평소대로 터미널을 사용하면 된다.

#### rsa 키로 접속하기

패스워드로 접속이 되는 건 괜찮은데, 패스워드를 일일이 입력하는 것이 귀찮다.

기왕이면 패스워드 없이 접속하는 게 편하니까 맥미니에 `ssh-keygen`으로 만들어둔 rsa 키를 사용해서 접속하자.

1. 맥미니에 생성해 둔 `~/.ssh/id_rsa` 키를 맥북에 복사한다. 이름은 다르게 해도 상관없다.
    - 여기에서는 `~/.ssh/id_rsa-macmini`라는 이름으로 저장했다고 하자.
2. 맥북에서는 rsa 파일에 대한 권한을 제한한다. `600`이면 충분하다.
    - 이렇게 안 하면 rsa 파일에 너무 많은 권한이 있어서 ssh가 거부당할 수 있다.

```
$ chmod 600 id_rsa-macmini
```

이제 패스워드를 입력하지 않아도 된다. 다음과 같이 접속하면 된다.

```
ssh -i ~/.ssh/id_rsa-macmini johngrib@192.168.123.123
```

접속이 되면 평소대로 터미널을 사용하면 된다.

### 맥북에서 맥미니의 자원을 사용해 블로그 관리하기

- 편집: ssh로 접속한 맥미니 터미널에서 Vim을 실행하고 평소대로 편집하면 된다.
- 서버 실행: ssh로 접속한 맥미니 터미널에서 Jekyll 서버를 실행하면 된다.
- 웹 브라우저로 맥미니의 localhost 웹사이트 확인: 포트를 포워딩해서 맥미니의 Jekyll 서버를 맥북에서 확인하면 된다.

```bash
ssh -L 4000:localhost:4000 john@192.168.123.123
```

위 명령을 실행하고 나면 맥북의 웹브라우저에서 `http://localhost:4000`으로 접속해 맥미니의 localhost:4000 Jekyll 서버를 확인할 수 있다.
