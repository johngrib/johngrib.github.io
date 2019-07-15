---
layout  : wiki
title   : GnuPG 사용법
summary : GnuPG, the GNU Privacy Guard
date    : 2018-09-10 14:24:06 +0900
updated : 2018-10-10 13:01:11 +0900
tag     : bash encryption GNU command
toc     : true
public  : true
parent  : command-line
latex   : false
---
* TOC
{:toc}

# GPG

GnuPG : GNU Privacy Guard. GPG 라고도 한다.

# 꼭 읽으세요

* 이 웹 페이지의 글은 개인의 의견을 개진한 것입니다.
    * 만일 이 글을 읽는 여러분께서 암호나 비밀 통신과 관련된 문제에 관한 조언이 필요할 경우, **암호학 전문가** 또는 **변호사**를 찾아 상담받기를 권장합니다.
    * 저는 암호학 전문가나 변호사가 아닙니다.
* 이 글은 자신을 위해 gpg 도구의 사용 방법을 메모해 둔 것입니다.
* 귀하가 이 글을 읽고 시도한 모든 일에 대해 저는 책임을 지지 않습니다.

---

* 암호화 알고리즘은 만능이 아닙니다. 언젠가는 깨질 수 있습니다.
    * 컴퓨터 연산 능력의 발전에 의해 한때 강력했던 암호가 brute force 앞에 무의미해질 수 있습니다.
    * 암호가 우연히 깨지는 경우도 있습니다.
    * 당분간만 비밀로 유지할 필요가 있는 메시지만 암호화하세요.
    * 자신의 비밀 키를 공공 장소나 인터넷 카페, 도서관 같은 곳에서 복사하거나 저장하지 마세요.
        * 가족이나 친구와 함께 사용하는 컴퓨터에 비밀 키를 보관하지 마세요.
    * 키를 주기적으로 교체하세요.
    * 전화번호나 생일, 집 주소 같은 자신의 신상 정보를 암호 생성이나 관리에 사용하지 마세요.
        * 추측하기 쉬운 문자열을 비밀 키의 패스워드로 사용하지 마세요.
        * 주민등록 번호, 계좌번호, 전화번호, 집 주소 동 호수, 우편번호, 연속/반복된 숫자, 사전에 있는 단어를 사용하지 마세요.
* **사람의 건강이나 생명, 재산, 정치적 문제 등이 걸린 중요한 메시지는 컴퓨터에 보관하지 마세요.**
    * 누군가 당신의 컴퓨터에 침투해 암호화된 메시지를 가져가 복호화를 시도할 수 있습니다.
    * 낡은 컴퓨터를 판매하거나 양도하거나 버릴 때에는 반드시 키와 암호화된 메시지를 삭제하고 하드디스크를 포맷하세요.
    * **중요한 비밀 키는 스마트카드나 USB 등에 옮긴 다음, 나만 열어볼 수 있는 물리적 금고에 넣어두세요.**
* 다른 사람의 비밀 키를 우연히 획득했다면, 가능한 한 빨리 비밀 키의 주인에게 제보하세요.
    * 타인의 비밀 키를 복제하지 마세요.
    * 타인의 비밀 키를 사용해 무언가를 암호화하거나 복호화하지 마세요.
    * 타인의 비밀 키나 공개 키를 분석하는 시도를 하지 마세요.
* 비밀 키를 타인에게 복사해주지 마세요.
    * 가족이나 연인에게도 복사해주지 마세요.
* export한 비밀 키를 모니터로 볼 때, 주위를 살펴 cctv나 비밀 카메라 또는 창문이 없는지 확인하세요.

# help

# install

## Ubuntu

```sh
$ sudo apt-get install gnupg
```

## Mac

```sh
$ brew install gnupg
```

# 버전 확인

* `--version`


# 새로운 키 생성

* `--gen-key`
* `--full-generate-key` : MacOS에서는 이 옵션을 쓰지 않으면 몇 가지 질문이 생략되고 기본 값으로 설정된다.

```sh
$ gpg --gen-key
```

그러면 몇 가지 문답을 거쳐 키를 생성하게 된다.

* 어떤 암호화 알고리즘을 사용할 것인지?
* 키의 유효기간은 어떻게 할 것인지?
    * 주의: 키 유효 기한은 **1년 이하**를 권장.
    * 불편하더라도 몇 달 주기로 유효 기한을 연장하거나 새로 생성한 키로 교체하는 것이 좋다.
    * 무기한인 키를 키 서버에 업로드했는데 키를 분실하면 잘못된 키가 영원히 유지될 수도 있다.
* 사용자의 Real name은?
* 사용자의 email 주소는?

문답을 완료하고 랜덤 바이트가 생성되면, 다음과 같이 공개 키와 비밀키가 생성되었음을 알려준다.

```
public and secret key created and signed.

pub   rsa4096 2018-09-10 [SC]
      4AB3AA77
uid                      testuser <testuser@___.com>
sub   rsa2048 2018-09-10 [E]
```

* 주의
    * 스마트 카드를 사용하는 경우, 스마트카드에서 지원하는 암호화 알고리즘을 먼저 조사하는 것이 좋다.

## 키의 구성

* 하나의 키는 관례적으로 두 개의 서브 키로 구성된다.
    * 키(primary key) : 서명할 때 쓴다.
    * 서브 키(sub key) : 암호화/복호화할 때 쓴다.

따라서 `--gen-key`로 키를 생성하면 다음과 같이 4개의 키가 생성되는 셈이다.

* 공개 primary key
* 공개 sub key
* 비밀 primary key
* 비밀 sub key

## 문제 해결: random byte 생성 과정에서 다음으로 넘어가지 못하는 경우

* Linux에서 `--gen-key`로 새로운 키를 생성하는 도중 발생 가능한 문제.
* random byte 생성 과정에서 터무니 없이 오래 걸리거나, 멈춰 버리는 경우가 있다.
    * vagrant나 docker 에서도 발생한다. 디바이스로 수집하는 엔트로피를 충분히 수집하지 못해 발생하는 문제인듯.

다음과 같이 `urandom`을 사용하게 해주면 문제가 해결된다.

```sh
$ sudo apt-get install -y rng-tools && sudo rngd -r /dev/urandom
```

## 해지 인증서(Revocation Certificate) 만들기

* 새로운 키를 생성했다면 키를 분실했거나 의도치 않게 유출되었을 때를 대비해 해지 인증서를 만들어 두어야 한다.
* 비밀 키와 함께 오프라인 저장장치에 보관하는 것을 권장.

해지 인증서는 `--gen-revoke` 옵션으로 만들 수 있다.

```sh
$ gpg --output revoke.asc --gen-revoke 키아이디
```

# 키 목록 보기

* `--list-keys`, `-k` : 공개 키 목록을 본다. `--list-public-keys` 옵션과 똑같다.
* `--list-secret-keys`, `-K` : 비밀 키 목록을 본다.

```sh
$ gpg -k
----------------------------------
pub   rsa4096 2018-09-10 [SC] [expires: 2019-03-11]
      78BC79BB
uid           [ultimate] kim <kim@gpgtest.com>
sub   rsa4096 2018-09-10 [E]

pub   rsa2048 2018-09-11 [SC] [revoked: 2018-09-11]
      90F92F0
uid           [ revoked] lee <lee@gpgtest.com>

pub   rsa2048 2018-03-14 [SC]
      C475C477
uid           [ unknown] park <park@gpgtest.com>
sub   rsa2048 2018-03-14 [E]
```

* `pub`: 공개 키.
* `uid`: user id.
* `sub`: sub key.
* `[SC]`: 해당 키가 Signing 과 Certificate 용도로 사용된다는 의미.
* `[E]`: 해당 키가 Encryption 용도로 사용된다는 의미.
* `[expires: yyyy-mm-dd]`: 유효 기한.
* TRUST VALUES
    * ultimate, full, marginal, never, undefined, expired, unknown 순으로 신뢰도가 낮아진다.
    * `[ultimate]`: 완전히 신뢰할 수 있는 키.
    * `[revoked]`: 해지된 키.
    * `[unknown]`: 신뢰할 수 없는, 모르는 사람의 키.

한편, `--list-secret-keys`는 출력 결과가 **약간** 다르다.

```sh
$ gpg --list-secret-keys
----------------------------------
sec   rsa4096 2018-09-10 [SC] [expires: 2019-03-11]
      78BC79BB
uid           [ultimate] kim <kim@gpgtest.com>
ssb   rsa4096 2018-09-10 [E]

sec   rsa2048 2018-09-11 [SC] [revoked: 2018-09-11]
      90F92F0
uid           [ revoked] lee <lee@gpgtest.com>

sec   rsa2048 2018-03-14 [SC]
      C475C477
uid           [ unknown] park <park@gpgtest.com>
ssb   rsa2048 2018-03-14 [E]
```

* `sec`: 비밀 키.
* `ssb`: secret sub key.


# 공개 키 export

* 나의 **공개 키**로 암호화한 메시지는 나의 **비밀 키**로 복호화할 수 있다.
* 따라서 나의 공개 키를 다른 사람에게 주면, 다른 사람은 내 공개 키를 이용해 내게 보낼 메시지를 암호화할 수 있다.

> 주의: 절대 **비밀 키**가 다른 사람에게 넘어가지 않도록 조심하자.  
인터넷에 공개하거나 다른 사람에게 복사해줘도 되는 것은 **공개 키** 뿐이다.

testuser가 자신의 **공개 키**를 친구에게 주고, 서로 비밀 메시지를 주고받으려 한다고 하자.

다음과 같이 `--armor`, `--export 사용자아이디`를 입력하면 해당 사용자의 공개 키를 얻을 수 있다.

```sh
$ gpg --armor --export testuser
```

`--armor` 옵션은 `-a`로 축약할 수 있다.

```sh
$ gpg -a --export testuser
```

* `--armor` 옵션을 넣어주면 출력 결과가 ASCII 문자로 변환되어 나온다(ASCII armored output).
    * `--armor` 옵션을 넣어주지 않으면 binary OpenPGP format으로 출력된다.
    * binary format은 눈으로 봐도 알 수 없는 문자열이 잔뜩이니 `--armor` 옵션을 사용하자.

다음과 같이 공개 키를 눈으로 확인할 수 있다.

```sh
$ gpg -a --export testuser
-----BEGIN PGP PUBLIC KEY BLOCK-----

mQENBFuWILQBCACXfJbKayPzNksIq06PpHb/jy/5C1pXFJY/jvQY3r8ccgt018k5
RFdyv6qh4zAM8RlBWQMTNNmrFX7P938hiAZ/R+cJh+iwHH3Z8z4MPYoemhvluuI/
ny1ouXGmYFkHTozh2Ev9aoS2zJ1U0VMGpMKyfXOocIFxEGYiP99uKaszVD9KgeZw
HhpM/rsX4hTDAPPvrVAGD4Nu9ntbbyII6UDpKoAf4bwqRUJ1qi8cIBSJQyC4LS5R
lhWe+iGGxNyv0y7v/dPW6NUxU/B8O9qSPhXNA17AdAncwZoFlBdXUHKskkhSAjkm
Iw3hQZgvO3DsuJWFHDUkCFuBEb99Udnf/3aFABEBAAG0KHRlc3R1c2VyIDxqb2hu
Z3JpYjgyK3Rlc3R1c2VyQGdtYWlsLmNvbT6JAVQEEwEIAD4WIQSM3cREfw683P7w
ndHUAoZI0Pf+cwUCW5YgtAIbAwUJA8JnAAULCQgHAgYVCgkICwIEFgIDAQIeAQIX
gAAKCRDUAoZI0Pf+cxh2B/9pR8HzVLc+CXLPlRzsji3euxKyFWO7m1qzUceC7tg2
hXgaufiBLDph19X6QKqZFRzcLLWlSyp9cAdfXwnMvgeTtqDGUb/6w4MbVgGO3V8G
d2inubF86PkRAxXuroaQguUj2/d75Xu3g4b3/HmfwytFWj0N5Yz86gn0xFUHP2BD
5hU4AK84tfzn9hrUmbAyYNsdR5mC5k00Z4sArI70gC6e4N4IdOewzADm+ysO3NVk
(생략)
ufIMNQazrGeSnOo4L7mGKpYIGoyUVPcY7i9Slzo6YYxnuQENBFuWILQBCAC8zneN
SaiChy6i0WeHW//jWv1EmM5qxQnXAEncOh7tJYJyCCn9XHxkyzqXYd49y7X+ZM/J
VtpyxApWEaEKP6ZF2T/nYCO1zbm3qXO/5kEDBmuIctLv+3CMfWM4xxZBk8l2F/5y
dxWDBPBAe2WM6bpKJPY1V4GSSHZ2pqm35nlZWIsVFkX7hR9HjAh/wTJHfDV9a+fy
KmPuV1f/XVMZ3WEV4nufB09/d1p8enfyM4h5SgRtdD/5Q8m+louMowmEfVBC5Zh9
0RcQa1w4vJ2uEEg7sLhLnEKEQJfc5ZdT/3jP46IOCHRNNGOWGC11h1h+xyknTWaF
XIGnMQNtpsW1ZZ5VABEBAAGJATwEGAEIACYWIQSM3cREfw683P7wndHUAoZI0Pf+
cwUCW5YgtAIbDAUJA8JnAAAKCRDUAoZI0Pf+c41iB/9FSFwkoXRrxrB15Le7xdFR
AK53RgbYG3tlWLwv2ZbEbMvNB25KoEXJzfIY+dtY1RF3BLKNNuakl3+tB1S6ErO7
n5ExA+1yIsP6gKnvltvYvEzWYcC3gdpSDwnDXzipZ6nNaUH6jO7vlU6Ibz6xaLRZ
G47kEJUICkIPKmn8pla0phWhzh+C1NwGr7y6tHwfwc7tmJlWXqQv4fImj7xasRCs
f//mhn4NZRemZPbjhxbj8QMrKOMHrg4mjLpEqmQhzMnOt5lHGuMaUrg0F5AKxLos
9Z+MxrjADsqOvaT5rgZIsDzRWTt8fK7x/M6YjreIaIh4kPSeKCqS9vp+Ix7lrLb+
=3hoW
-----END PGP PUBLIC KEY BLOCK-----
```

친구에게 보내려면 다음과 같이 파일로 저장한 다음 보내도록 하자.

```sh
$ gpg --armor --export testuser > testuser.asc
```

* 친구는 보내고 싶은 메시지나 파일을 testuser의 공개 키로 암호화하여 보내줄 것이다.
* 친구가 보내준 암호화된 파일을, testuser는 자신의 비밀 키로 복호할 수 있다.

testuser의 공개 키로 암호화한 것은 testuser의 비밀 키로만 복호화할 수 있으므로
testuser가 비밀 키가 유출되지 않도록 잘 관리한다면 충분히 안전하게 메시지를 주고 받을 수 있게 된 것이다.

## 키 서버로 전송하기

주의 : 키 서버로 자신의 공개 키를 올리기 전에 다음을 읽고 충분히 고민할 것.

* 키 서버에 공개 키를 한 번 올리면 절대 지울 수 없습니다. (게다가 키 서버들끼리 정보를 공유.)
* 비밀 키를 분실하거나 유출해도 지울 수 없습니다.
    * Revocation Certificate 만을 키 서버에 추가로 올려, 해당 공개키를 사용하지 말 것을 알릴 수 있을 뿐입니다.
* 공개 키를 올릴 때 자신의 Real Name과 email이 전 세계에 알려지므로, 신상정보를 스스로 퍼뜨리는 행위일 수 있습니다.
    * 자신의 아이디나 이메일에 들어간 단어가 다른 사람을 자극하거나 공격하지는 않는지 숙고하세요.
    * 자신의 이름과 이메일을 사용해 올바르지 못하거나 불법적인 행동을 하지 마세요.

공개 키는 친구에게 보내는 것 뿐 아니라 다음과 같이 키 서버로 전송해 세상에 퍼뜨릴 수도 있다.

[pgp.key-server.io](https://pgp.key-server.io/ )를 선택해 전송해 보았다.

```sh
$ gpg --keyserver pgp.key-server.io --send-key 키아이디
gpg: sending key 21831..... to hkp://pgp.key-server.io
```

이제 지구상의 누군가가 나에게 암호화된 메시지를 보내고 싶다면
키 서버에서 내 아이디나 이메일을 검색해 공개 키를 얻어, 메시지를 암호화해 나한테 보내줄 수 있다.


## 해지 인증서(Revocation Certificate) 사용하기

* 키를 분실했거나 의도치 않게 유출되었다면, 해지 인증서를 키 서버에 올려야 한다.
    * 해지 인증서를 올리면 내 비밀 키는 유출되었으므로 신뢰할 수 없다고 세상에 알리는 것과 같다.

미리 만들어 둔 해지 인증서를 `--import` 한 다음, 키 서버로 전송하면 된다.

이후 키 서버로 들어가 키를 검색해 보면 `revoke`되었다는 표시가 뜨는 것을 확인할 수 있다.


# 공개 키 import

testuser의 친구가 testuser의 공개 키를 가져와 자신의 컴퓨터에 등록하는 상황이라 하자.

공개 키 파일을 준비한 다음, 다음과 같이 `--import` 옵션을 사용하면 된다.

```sh
$ gpg --import testuser.asc
gpg: key D0F7FE73: public key "testuser <testuser@___.com>" imported
gpg: Total number processed: 1
gpg:               imported: 1  (RSA: 1)
```

# 비밀 키 import

`--import` 옵션을 사용하면 된다.

```sh
$ gpg --import 비밀키파일
```

# 비밀 키 비밀번호 변경

비밀 키의 비밀번호는 `--edit-key` 옵션으로 변경할 수 있다.

`gpg>` 프롬프트가 나타났을 때 `passwd`를 입력하면 기존 비밀번호/신규 비밀번호를 물어본다.

물어보는 대로 입력하고 `save`를 치면 변경 절차가 완료된다.

```sh
$ gpg --edit-key 비밀키아이디

gpg> passwd

gpg> save
```

# 암호화

* 필수
    * `--encrypt`, `-e`: 암호화.
    * `--recipient`, `-r`: 누구의 공개 키를 사용해 암호화할 것인지를 지정한다.
* 선택
    * `--armor`, `-a`: ASCII 문자를 사용해 출력한다.
    * `--output`, `-o`: 출력 파일명을 지정한다.

친구가 testuser에게 암호화된 메시지를 보낸다고 하자.

```sh
$ echo 'hello testuser!' | gpg --encrypt --armor --recipient testuser
```

축약 옵션을 사용해도 된다.

```sh
$ echo 'hello testuser!' | gpg -ea --recipient testuser

-----BEGIN PGP MESSAGE-----
Version: GnuPG v1

hQEMA5DmoKGLUuVCAQgAl4BaAa6WziQpnyPO9uiGCrkCJTMFgJMPJ7AcX6IXa5kS
e4ux32gieoBIkeg30LgTpwprPoBCS3l4h8nWE5X3GpPUC+gkde2STyP1FSbCon/C
4/I/Zo6p2/3UDAtXyzKZAELG/IXgyX+sut8mfinmdFRoT6xB77GcOITDtrX0DAoJ
(생략)
AhAhb8ADIDA21XLcZ0z7vVFEuhvPheWgWN0RouatRnI7t7zaiCm3t5OQtDmoMhLF
ssafE4at7QwoCHS6tUw+hI3nvGYyFMzJdTmMnAxFbNJLAbdAekveojWeDahnwTDm
l/9XIBCX5wt7K4/gNGEqqC9jDNqgmWDdtFUM/uPjPsHZajZG3uOIbfsxTQT9X7l9
B65GoPB9OoB/A7tk
=/qH6
-----END PGP MESSAGE-----
```

파일로 저장하고 싶다면 다음과 같이 하면 된다.

```sh
$ echo 'hello testuser!' | gpg -ea --recipient testuser > to_testuser.txt
```

또는 `--output` 옵션을 사용해도 된다. `-o`로도 쓸 수 있다.

```sh
$ echo 'hello testuser!' | gpg -o to_testuser.txt -ea --recipient testuser
```

이제 친구는 이 파일을 testuser에게 이메일이나 메신저로 전송하면 된다.

testuser가 갖고 있는 비밀 키가 아니면 복호화가 불가능한(적어도 RSA 2048이 깨지기 전까지는) 안전한 메시지이므로 안심하고 보낼 수 있다.


# 복호화

testuser는 친구가 보낸 파일을 받아 복호화하려 한다.

복호화는 아주 쉽다. `--decrypt` 옵션을 주면 된다.

```sh
$ gpg --decrypt testmsg.txt 
gpg: encrypted with 2048-bit RSA key, ID 90E6A0A18B52E542, created 2018-09-10
      "testuser <testuser@___.com>"
hello testuser!
```

친구가 보낸 메시지는 바로 `hello testuser!` 였다.

결과를 파일로 저장하고 싶다면 `--output 파일명` 옵션을 사용한다. `-o`로도 쓸 수 있다.

```sh
$ gpg -o decrypted.txt --decrypt testmsg.txt
$ cat decrypted.txt

hello testuser!
```

# 유효 기한 관리

* 키 유효 기한은 1년 이하를 권장.
    * 불편하더라도 몇 달 주기로 유효 기한을 연장하거나 새로 생성한 키로 교체하는 것이 좋다.
* 만료가 없는 키를 생성했다 하더라도 다음과 같이 만료일을 수정할 수 있다.

```sh
$ gpg --edit-key 키아이디
```

이후 아래와 같이 `expire`를 입력하고, 기간을 설정해주고(`6m`: 6개월) 저장한 다음 종료하면 된다.


```sh
$ gpg --edit-key 키아이디

gpg> expire

Changing expiration time for the primary key.
Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0) 6m
Key expires at 월  3/11 12:22:33 2019 KST
Is this correct? (y/N) y

sec  rsa4096/....
     created: 2018-09-10  expires: 2019-03-11  usage: SC  
     trust: ultimate      validity: ultimate
ssb  rsa4096/....
     created: 2018-09-10  expires: never       usage: E   
[ultimate] (1). testuser <testuser@___.com>

gpg> save
```

# 서명

* 비밀 키를 사용해 암호화하는 것을 서명이라 한다.
* 서명은 공개 키로 복호화할 수 있다.

비밀 키를 사용해 메시지를 암호화하는 것을 서명이라 한다.

서명을 통해 다음의 이득을 얻을 수 있다.

* Authentication(인증): 개인 키의 소유자가 해당 메시지를 암호화했음을 인증할 수 있다.
* Integrity(손상 없음): 메시지가 서명된 이후 누군가에 의해 변경/조작되었는지 여부를 알 수 있다.
* Non-repudiation(부인 방지): 서명 사실을 증명하는 증거가 될 수 있다.

공개 키를 가진 사람이라면 누구나 서명을 확인할 수 있으므로 다양한 분야에서 폭넓게 쓰인다.

## 서명 검증하기

* `--verify`

```sh
$ gpg --verify test.asc 

gpg: Signature made Thu 13 Sep 2018 01:37:42 AM UTC using RSA key ID BC80D990
gpg: Good signature from "lee <lee@gpgtest.com>"
Primary key fingerprint: C80B C466
```

## 서명하기

* `--sign`, `-s`: 비밀 키를 사용해 전자 서명을 할 수 있다.

```sh
$ cat msg.txt

345-2346-3345 계좌에서 100만원을 인출해 234-3456-456-123 계좌로 입금하세요.

$ # 서명한다
$ gpg --sign --armor msg.txt

$ cat msg.txt.asc
-----BEGIN PGP MESSAGE-----

owEBYwKc/ZANAwAIASGDG1S8gNmQAawcYgloZWxsby50eHRbmcfmaGVsbG8gd29y
bGQhCokCMwQAAQgAHRYhBHheS3jFxseLxGnukCGDG1S8gNmQBQJbmcfmAAoJECGD
G1S8gNmQbI0P/3yr5hO445dEfUO8r+r4pdJHxSy0aScvPcjs1F8PMc+plK3XHWD4
+13v8I30ipyq2KuGbA3cJnBy3MUT2msJKvgEuWmI6YQcZtTiyHwPQa+zA9zw8egu8
RRL/6hQubRASn6NRU06h7/r9vVETv4N7q7TGrltBsodfxe8Zx7LhBkrGXYd7KIGZ
3DhbG9cSP4N1pybLfCmvO0+nCgAnGBoFeSX4Mu6Z5B7kjUC5UyBo5/xgxZlgry/o
0lgX01Bd9wMNU2FyX5ZZgajfTP+kQQnAMOrgnzq1ry3yL34F3gSLNimJMXhRUboP
jo+IOBbno42X//GwNQbOkNoH03aAEZRpVZw5xp9koUtm1uFkPvHorn8YeWCs0VAL
wMIwkY2e19XeEsPI8p3gNt4+Pu/ir2eZ6FR6QXgMxTMLSX5zRo1Mg4HdZHKsDDJO
eS6Gcdn+5kILKNClmXifNbXfkPdalaazpGeSHDvOunyYFoftwhMvn9jeyuv68LO1
jvXkJjIJR+E/zCY4HlSGhw5ajLcLQ6X8oI0k3OUa/WflB+wIDWsISfoeJpnwIKw+
keSwyUMXlv68CmmO89W7FJN5JoytRnRS3hBtZMK3gFH/DsWUmgDWXJHC
=cnAL
-----END PGP MESSAGE-----
```

서명한 파일을 받는 쪽(공개 키를 갖고 있는 쪽)에서는 다음과 같이 복호화하여 메시지를 읽어볼 수 있다.

```sh
$ gpg -d test.asc 

345-2346-3345 계좌에서 100만원을 인출해 234-3456-456-123 계좌로 입금하세요.

gpg: Signature made Thu 13 Sep 2018 01:37:42 AM UTC using RSA key ID BC80D990
gpg: Good signature from "lee <lee@gpgtest.com>"
Primary key fingerprint: 5B79 C4C7 ...
```

일부러 심각한 예제 메시지를 선택했다. 메시지의 내용이 중요할수록 서명도 중요하기 때문이다.

내가 나의 비밀 키를 통해 위의 메시지를 서명했다면, 내 공개 키를 갖고 있는 은행의 어느 지점에서 메시지를 받아도

* 내 메시지를 복호화해서 볼 수 있다.
* 보낸 사람이 나라는 사실도 확인할 수 있다.
* 만약 누군가 메시지를 가로채 입금 계좌번호를 변경해도 변조된 메시지라는 사실을 알아챌 수 있다.

서명한 파일을 수정하고 `--verify`로 검사해보면 문제가 있고 인증이 안된다는 출력을 볼 수 있다.

## 원문을 보존하며 서명하기

* `--clear-sign`, `--clearsign`

```sh
$ gpg --clearsign msg.txt

$ cat msg.txt.asc 

-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

선거 공약대로 345-2346-3345 계좌에서 100만원을 인출해 234-3456-456-123 계좌로 입금하세요.
-----BEGIN PGP SIGNATURE-----

iQIzBAEBCAAdFiEEeF5LeMXGx4vEae6QIYMbVLyA2ZAFAluZzXIACgkQIYMbVLyA
4ZAo+Q//Xk/42INpTo7olUhJsfUcnOiCCxaNf9Ee0qjwYYn6h1GWH0CpfSQIVOQA
ZJq9S/EzCZ8fhATAz75sNyQgHaiKnbYfSD4qAhil3KlKU8A7XJ8630gWrSuk9QQ+
DozglD6HJ1mmgfCvz/gMlbgC8Unt4AD8UPoGgh254F5Z5JkJBACikFm0BNn6OUtt
oXj2CmlJNhPHJiFyoJyVnaZtyVMiL0d+Kl1SuzXMuRjTtJNEfXBeYEiDrEERWIhY
YI7zVXnW4TojRp+IoK8cyWxVgCeALcN0gG3X0pkIPQerAEcRIYna1Kt/J2Ta23nx
P8DfRZhfdiKwW1Z68yNBxCCtOzZRomW5S20uqP5J8XdYVkDR/vby6OPKX0DIrcaO
BsDqgjvUtKLI4fctzCASHNXGOIV+EhWO2wJ4FRxFH/h58V99z+to/xEXy5xJA6CS
peq33banFmFCX8W5Jgw1QX0lIMGtiYyv4YqOTRo4XA+iym6K2nPYoKalN/Dn/rmJ
SZh3mngkFrcgADl0TkHcGi5z8S+fOl7TOpsmyKl0hQQgNy/6kEo=
=ekDW
-----END PGP SIGNATURE-----
```

* 서명된 파일을 읽어 보면 위와 같이 원본 메시지가 위쪽에 함께 들어가 있음을 알 수 있다.
* 원본 메시지를 읽어볼 수 있기 때문에 공개 키가 없는 사람에게 보여도 상관 없거나 보여줘야 하는 메시지를 서명할 수 있다.

원본 메시지만을 읽어보고 싶다면 다음과 같이 복호화하면 된다.

```sh
$ gpg -d msg.txt.asc 
선거 공약대로 345-2346-3345 계좌에서 100만원을 인출해 234-3456-456-123 계좌로 입금하세요.
gpg: Signature made 목  9/13 11:37:38 2018 KST
gpg:                using RSA key 9EE92
gpg: Good signature from "lee <lee@gpgtest.com>"
```

그렇다면 수록된 원본 메시지를 수정해보면 어떨까?

(`100만원`을 `100원`으로 바꿔 보았다.)

```sh
$ gpg -d msg.txt.asc 

선거 공약대로 345-2346-3345 계좌에서 100원을 인출해 234-3456-456-123 계좌로 입금하세요.

gpg: Signature made 목  9/13 11:37:38 2018 KST
gpg:                using RSA key 69EE904
gpg: BAD signature from "lee <lee@gpgtest.com>"

$ gpg --verify hello.txt.asc 

gpg: Signature made 목  9/13 11:37:38 2018 KST
gpg:                using RSA key 69EE904
gpg: BAD signature from "lee <lee@gpgtest.com>"
```

그러면 `-d`로 복호화해도, `--verify`로 검증해도 `BAD signature`라는 출력이 나온다.

## 원문 파일과 따로 서명하기

* `--detach-sign`, `-b`: 원문과 분리된 서명 파일을 생성한다.

원본 파일의 용량이 크다면 서명 파일을 따로 생성해서 함께 보내주는 방법도 있다.

gpg로 서명 파일과 원본 파일을 함께 검사해보는 방식으로 메시지의 변조 여부를 알 수 있다.

```sh
$ gpg --detach-sign -a msg.txt 
```

검증은 다음과 같이 할 수 있다.

```sh
$ # gpg --verify 서명파일 원본파일
$ gpg --verify msg.txt.asc msg.txt
gpg: Signature made 목  9/13 11:58:29 2018 KST
gpg:                using RSA key EE91
gpg: Good signature from "lee <lee@gpgtest.com>"
```

만약 메시지가 변경되었다면 다음과 같이 `BAD signature`가 출력된다.

```sh
$ gpg --verify msg.txt.asc msg.txt
gpg: Signature made 목  9/13 11:58:29 2018 KST
gpg:                using RSA key EE91
gpg: BAD signature from "lee <lee@gpgtest.com>"
```

## 타인의 공개 키에 서명하기

* `--sign-key`: 타인의 공개 키에 나의 서명을 덧붙여 TRUST VALUE를 상향시킬 수 있다.
    * 대면하며 함께 일하는 신원이 분명한 직장 동료나, 친한 친구 등의 공개 키에만 서명하도록 한다.
    * 타인의 공개 키 신뢰성을 내 아이디, 이름, 이메일을 걸고 보증하는 것이므로 신중히 결정하도록 한다.

```sh
$ gpg --sign-key myfriend

pub  rsa2048/81D89
     created: 2018-09-13  expires: 2019-09-13  usage: SC  
     trust: unknown       validity: unknown
sub  rsa2048/CB3A1
     created: 2018-09-13  expires: 2019-09-13  usage: E   
[ unknown] (1). myfriend <myfriend@gpgtest.com>

pub  rsa2048/81D89
     created: 2018-09-13  expires: 2019-09-13  usage: SC  
     trust: unknown       validity: unknown
 Primary key fingerprint: F6BE E0DF F81D 89FF

     myfriend <myfriend@gpgtest.com>

This key is due to expire on 2019-09-13.
Are you sure that you want to sign this key with your
key "lee <lee@gpgtest.com>" (54B90)

Really sign? (y/N) y
```

이후 공개 키 목록을 다시 조회해 보면, `unknown`이었던 myfriend의 TRUST VALUE가 `full`로 올라갔음을 확인할 수 있다.

```sh
$ gpg -k
~/.gnupg/pubring.kbx
----------------------------------
pub   rsa4096 2018-09-10 [SC] [expires: 2019-03-11]
      81D89
uid           [ultimate] lee <lee@gpgtest.com>
sub   rsa4096 2018-09-10 [E]

pub   rsa2048 2018-09-13 [SC] [expires: 2019-09-13]
      FF3002
uid           [  full  ] myfriend <myfriend@gpgtest.com>
sub   rsa2048 2018-09-13 [E] [expires: 2019-09-13]
```

# 부록: keybase 사용하기

* <https://keybase.io/ >

>
Keybase aims to provide public keys that can be trusted without any backchannel communication. If you need someone's public key, you should be able to get it, and know it's the right one, without talking to them in person.

* 암호화 관련 이런 저런 기능을 제공하는 서비스.
* 공개 키 서버로도 사용할 수 있다.
* 인터넷에서 자신의 신원을 증명하는 용도로도 사용할 수 있다.
    * 익명을 선호한다면 가입/사용하기 전에 고민해 볼 것.

keybase 커맨드 라인 도구는 맥이라면 다음과 같이 설치할 수 있다.

```sh
$ brew tap homebrew/cask
$ brew cask install keybase
```

## 회원가입/로그인

* <https://keybase.io >에서 회원 가입이 가능하다.
* 커맨드 라인에서도 회원 가입이 가능하다.

```sh
$ keybase signup
```

* 로그인은 다음과 같이 한다.

```sh
$ keybase login
```

## 공개 키 업로드하기

다음 명령어를 입력한 다음, 공개 키 목록에서 업로드할 공개 키의 번호를 선택하면 된다.

```sh
$ keybase pgp select
```

그러면 다음과 같이 공개 키가 업로드 된다.

<https://keybase.io/johngrib/key.asc >

즉, 이제 내 공개 키가 필요한 사람이 있다면 다음 커맨드만 알려주면 된다.

```sh
$ curl https://keybase.io/johngrib/key.asc | gpg --import
```

## keybase 스마트폰 앱 사용하기

* keybase 스마트폰 앱을 쓰면 폰에서도 공개키로 암호화해서 친구나 동료에게 메시지를 보낼 수 있다.
* 공개 키 암호화 알고리즘이 필요한 대화는 keybase 앱으로 쉽게 할 수 있다.

휴대폰에 먼저 keybase 앱을 설치한다.

* <https://keybase.io/download >

앱을 열고 `login` 한 다음, 내 컴퓨터로 지정한 장치로 인증 선택.

```sh
$ keybase device add
```

이후 `2) Mobile phone`을 선택하면 터미널에 QR 코드가 출력된다.

휴대폰으로 QR 코드를 찍으면 앱에 로그인하게 된다.



# 부록: git commit에 sign하기

## .gitconfig 설정

* git commit에 자신의 비밀 키로 서명하는 것은 바람직한 습관이다.
* 오픈 소스 프로젝트나 회사의 특성에 따라 commit 에 sign을 요구하는 경우가 있다.

`~/.gitconfig` 파일의 `user` 섹션에 `signingkey` 값을 추가하고, 자신의 키 아이디를 입력한다.

```
[user]
    email = johngrib@test.com
    name = John Grib
    signingkey = 1234ABCDE
```

이후 `git commit`에 `-S` 옵션을 붙이면 커밋할 때 자동으로 비밀 키로 서명을 한다.

**비밀 키를 사용해 서명하는 것이므로, 커밋할 때마다 gpg가 패스워드를 물어본다.**

일일이 `-S` 옵션을 붙이는 게 귀찮으므로 나는 다음과 같이 설정하였다.

```
[user]
    email = johngrib@test.com
    name = John Grib
    signingkey = 1234ABCDE
[commit]
    gpgsign = true
```

이렇게 하면 `-S` 옵션을 주지 않아도 자동으로 서명을 한다.

## 문제 해결: Mac에서 signingkey 설정 후 commit이 안 될 경우

다음을 시도해 보도록 하자.

* `gnupg`를 업데이트 한다.
* pinentry-mac 을 설치한다.
* gpg-agent를 kill.

```sh
$ brew upgrade gnupg
$ brew install pinentry-mac
$ echo "pinentry-program /usr/local/bin/pinentry-mac" >> ~/.gnupg/gpg-agent.conf
$ killall gpg-agent
```

이후 재시도해본다.

## .gitconfig 모듈화하기

* 나는 `.gitconfig` 파일을 github의 [dotfiles](https://github.com/johngrib/dotfiles/blob/master/.gitconfig ) repo에 올려 관리하고 있다.
* 그렇다면 `signingkey` 값도 함께 공개된 github repo에 올려도 될까?
    * 어차피 commit에 서명해서 github에 push하면 `Verified` 눌렀을 때 `GPG key ID`를 보여준다.
    * 서명해서 커밋한다면 key id는 공개될 수 밖에 없는 것으로 보인다.

그래도 별로 올리고 싶지 않다던가, 집 컴퓨터와 회사 컴퓨터 설정에서 다른 부분만을 따로 관리하고 싶다면 다음 방법들이 있을 것이다.

1. `.gitconfig`를 github repo로 관리하지 않는다.
2. `.gitconfig`에서 특정 중요 값만 분리해 include하는 방식을 쓴다.

나는 두 번째 방법을 선택했다.

`.gitconfig`에는 파일을 include 할 수 있는 기능이 있다.

다음과 같이 하면 된다.

```
[include]
    path = ~/dotfiles/.gitconfig
```

따라서 나는 다음과 같이 두 개의 파일로 나누어 include 하게 했다.

* `~/dotfiles/.gitconfig` : github 에 올려 관리하는 파일.
* `~/.gitconfig` : github 에 올리지 않는 정보가 들어있는 파일.
    * 이 파일에 `~/dotfiles/.gitconfig`를 include 한다.
    * 이 파일은 로컬에서만 관리한다.

```
[user]
    name = John Grib
    email = 이메일 주소
    signingkey = 1234ABCDE
[commit]
    gpgsign = true
[include]
    path = ~/dotfiles/.gitconfig
```

그리고 github repo로 관리하고 있는 `~/dotfiles/.gitconfig` 파일에서는 `[user]`, `[commit]` 섹션을 삭제해주면 된다.

## github에 공개 키 등록하기

commit에 서명을 하기 시작했다면 github에도 공개키를 등록하여, github이 서명을 알아보도록 설정한다.

* <https://github.com/settings/keys >

로그인하고 위의 링크로 들어가 `GPG keys`에 `gpg --export --armor 키아이디`로 가져온 공개 키를 복붙해 등록해주면 된다.

이후 github에서 서명된 commit 옆에 `Verified`가 나타난다.
클릭해보면 **This commit was signed with a verified signature.** 라는 문구가 나오며 프로필 사진과 사용자 아이디, GPG key ID도 함께 보여준다.

# Links

* [RFC 4880 - OpenPGP Message Format 5.5](https://tools.ietf.org/html/rfc4880#section-5.5 )
* [gnupg.org](https://www.gnupg.org/index.html )
* [pgp.key-server.io](https://pgp.key-server.io/ )
* [RSA(cryptosystem) (wikipedia)](https://en.wikipedia.org/wiki/RSA_(cryptosystem) )
    * [RSA 암호(wikipedia)](https://ko.wikipedia.org/wiki/RSA_%EC%95%94%ED%98%B8 )
* [Digital signature(wikipedia)](https://en.wikipedia.org/wiki/Digital_signature )
    * [디지털 서명(wikipedia)](https://ko.wikipedia.org/wiki/%EB%94%94%EC%A7%80%ED%84%B8_%EC%84%9C%EB%AA%85 )
* <https://wiki.debian.org/Subkeys >

---

* 사용법 및 주의점
    * [The comp.security.pgp FAQ (www.pgp.net)](http://www.pgp.net/pgpnet/pgp-faq/pgp-faq.html )
    * [Security Questions (www.pgp.net)](http://www.pgp.net/pgpnet/pgp-faq/pgp-faq-security-questions.html )
    * [Getting Started with Gnu Privacy Guard](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/4/html/Step_by_Step_Guide/ch-gnupg.html )
    * [OpenPGP Best Practices (riseup.net)](https://riseup.net/en/security/message-security/openpgp/gpg-best-practices )
    * [GnuPG 리눅스에서 안전하게 통신하기](http://www.linuxlab.co.kr/docs/01-01-3.htm )
    * [CREATING THE PERFECT GPG KEYPAIR (alexcabal.com)](https://alexcabal.com/creating-the-perfect-gpg-keypair/ )
    * [How to gpg sign a file without encryption](https://access.redhat.com/solutions/1541303 )

---

* random byte 문제 해결
    * [GPG does not have enough entropy](https://serverfault.com/a/214620 )
    * [How to Generate Enough 'Entropy' for GPG Key Generation Process on Fedora Linux](https://it.toolbox.com/blogs/edmonbegoli/how-to-generate-enough-entropy-for-gpg-key-generation-process-on-fedora-linux-041410 )
    * [(Linux) random number generators](http://egloos.zum.com/studyfoss/v/5168232 )
    * [docker에서 GnuPG 키 생성 문제 해결과 파일 암호화/복호화 하기](http://blog.saltfactory.net/generate-gpg-key-inside-docker/ )

---

* <https://keybase.io/ >
    * <https://librewiki.net/wiki/Keybase >
    * <https://keybase.io/docs/command_line >

---

* git 서명 관련
    * [Managing commit signature verification (help.github.com)](https://help.github.com/articles/managing-commit-signature-verification/ )
    * [Git 도구 - 내 작업에 서명하기](https://git-scm.com/book/ko/v2/Git-%EB%8F%84%EA%B5%AC-%EB%82%B4-%EC%9E%91%EC%97%85%EC%97%90-%EC%84%9C%EB%AA%85%ED%95%98%EA%B8%B0 )

