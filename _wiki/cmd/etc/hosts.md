---
layout  : wiki
title   : /etc/hosts
summary : host name data base
date    : 2023-11-07 22:37:48 +0900
updated : 2023-11-07 22:53:19 +0900
tag     : 
resource: 72/5FF1CC-04B1-4565-B197-57AF51EBCED2
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## man

```bash
man hosts
```

### DESCRIPTION

>
The `hosts` file contains information regarding the known hosts on the network.
For each host a single line should be present with the following information:
>
> - Internet address
> - Official host name
> - Aliases
>
Items are separated by any number of blanks and/or tab characters.
A `#` indicates the beginning of a comment;
characters up to the end of the line are not interpreted by routines which search the file.
>
Network addresses may either be specified for IP version 4 or version 6.
IP version 4 addresses are specified in the conventional dotted address notation.
IP version 6 addresses are specified using the colon-separated notation described in RFC1924.
>
Host names may contain any printable character other than a field delimiter, newline, or comment character.
The `hosts` file is read by mDNSResponder(8) and used to supply results for calls to getaddrinfo(3), getnameinfo(3), etc.
in addition to results obtained from multicast and unicast DNS.

`hosts` 파일은 네트워크 상의 알려진 호스트에 관한 정보를 담고 있습니다.
각각의 호스트에 대해 한 줄로 표현되며, 다음 정보가 포함되어야 합니다.

- Internet address
- Official host name
- Aliases

항목들은 여러 개의 공백 문자나 탭 문자로 구분됩니다.
`#`은 주석의 시작을 나타내며, 주석 시작부분부터 줄의 끝까지의 문자들은 해석되지 않습니다.

네트워크 주소는 IPv4 또는 IPv6로 지정할 수 있습니다.
IPv4 주소는 점(`.`)을 구분자로 삼는 주소 표기법으로 지정합니다.
IPv6 주소는 RFC1924에서 설명하는 콜론(`:`)을 구분자로 삼는 표기법으로 지정합니다.

호스트 이름은 필드 구분자, 줄바꿈, 또는 주석 문자를 제외한 모든 인쇄 가능한 문자를 포함할 수 있습니다.
`hosts` 파일은 `mDNSResponder`(8)에 의해 읽히며, 멀티캐스트 및 유니캐스트 DNS에서 얻은 결과 외에도 `getaddrinfo`(3), `getnameinfo`(3) 등의 호출에 대한 결과를 제공하는 데 사용됩니다.

## 인용

>
`/etc/hosts` 파일은 이름을 IP 주소에 매핑시키는 가장 오래되고 간단한 방법이다.
각 줄은 IP 주소로 시작하고 이어서 그 주소를 나타내는 다양한 상징적 이름<sup>symbolic name</sup>이 따라온다.
>
다음은 `lollipop`이라는 호스트의 전형적인 `/etc/hosts` 파일이다.
>
> ```
> 127.0.0.1       localhost
> ::1             localhost ip6-localhost
> ff02::1         ip6-allnodes
> ff02::2         ip6-allrouters
> 192.108.21.48   lollipop.atrust.com lollipop loghost
> 192.108.21.254  chimchim-gw.atrust.com chimchim-gw
> 192.108.21.1    ns.atrust.com ns
> 192.225.33.5    licenses.atrust.com licenses-server
> ```
>
최소화된 버전은 처음 세 줄만 포함할 수도 있다.
일반적으로 `/etc/hosts` 파일의 첫 항목은 `localhost`다.
이 항목은 많은 시스템에서 필요하지 않지만 포함한다고 해서 해가 되진 않는다.
IPv4 주소와 IPv6 주소를 자유롭게 혼합해 사용할 수 있다.
`/etc/hosts`는 로컬 매핑만 포함하고 있고 각 클라이언트 시스템에서 유지해야 하기 때문에
부팅 때 필요한 매핑(예, 호스트 자체, 기본 게이트웨이, 네임 서버 등)용으로 가장 좋다.
로컬 네트워크의 나머지 부분과 외부 세계를 위한 매핑을 알아내려면 DNS와 LDAP를 사용한다.
외부 세계에서는 알 수 없게 DNS에 등록되지 않기를 바라는 매핑들을 지정할 때도 `/etc/hosts`를 사용할 수 있다.
[^handbook-635]


## 참고문헌

- 유닉스·리눅스 시스템 관리 핸드북 5/e / 에비 네메스, 가스 스나이더, 트렌트 헤인, 벤 웨일리, 댄 맥킨 저 외 2명 / 에이콘출판사 / 발행: 2022년 01월 03일 / 원제: UNIX and Linux System Administration Handbook, 5th Edition

## 주석

[^handbook-635]: 유닉스·리눅스 시스템 관리 핸드북 5/e. 13.9장. 635쪽.

