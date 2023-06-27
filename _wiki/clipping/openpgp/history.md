---
layout  : wiki
title   : OpenPGP History - 2016-08-15
summary : OpenPGP의 역사
date    : 2023-06-27 21:43:59 +0900
updated : 2023-06-27 22:02:03 +0900
tag     : 
resource: 61/1C550E-2706-4E88-B330-76BDCFECC9BA
toc     : true
public  : true
parent  : [[/clipping]]
latex   : false
---
* TOC
{:toc}


이 글은 [openpgp.org](https://www.openpgp.org )의 [History](https://www.openpgp.org/about/history/ ) 문서를 번역한 것입니다.

>
OpenPGP is a non-proprietary protocol for encrypting email using public key cryptography.
The OpenPGP protocol defines standard formats for encrypted messages, signatures, private keys, and certificates for exchanging public keys.

OpenPGP는 공개키 암호화를 사용하여 이메일을 암호화하는 비독점 프로토콜입니다.
OpenPGP 프로토콜은 공개키 교환을 위한 암호화된 메시지, 서명, 개인 키 및 인증서의 표준 포맷을 정의합니다.

>
It is based on the Pretty Good Privacy (PGP) freeware software as originally developed in 1991 by [Phil Zimmermann]( http://philzimmermann.com/EN/background/index.html ).
For that, he was the target of a three-year criminal investigation, because the US government held that US export restrictions for cryptographic software were violated when PGP spread all around the world following its publication as freeware.

OpenPGP는 Phil Zimmermann이 1991년에 개발한 Pretty Good Privacy(PGP) 프리웨어 소프트웨어를 기반으로 합니다.
PGP가 프리웨어로 공개되어 전 세계로 퍼져나가고 나서, 미국 정부는 미국의 암호화 소프트웨어 수출 규제를 위반한다고 판단하여 Phil Zimmermann은 결국 3년간의 범죄 수사 대상이 됐습니다.

>
Despite the lack of funding, the lack of any paid staff, the lack of a company to stand behind it, and despite government persecution, PGP became the most widely used email encryption software in the world.
After the government dropped its case in early 1996, Zimmermann founded PGP Inc.
That company and its intellectual property were acquired by Network Associates Inc (NAI) in December 1997.
NAI continued to own and develop PGP products for commercial and freeware purposes.
In 2002, NAI discontinued development and sales of PGP, and sold the rights to it to a new company, PGP Corporation.

자금부족, 유급직원 부족, 지원하는 기업 부족, 정부의 박해에도 불구하고 PGP는 세계에서 가장 널리 사용되는 이메일 암호화 소프트웨어가 되었습니다.
그리고 1996년 초에 미국 정부가 사건을 포기한 이후에 Zimmermann은 PGP Inc를 설립했습니다.
이 회사와 지적 재산은 1997년 12월 Network Associates Inc(NAI)에 인수되었습니다.
NAI는 꾸준히 상업용 및 프리웨어 목적으로 PGP 제품을 개발하고 제공했으나,
2002년에 PGP의 개발 및 판매를 중단하고 새로운 회사인 PGP Corporation에게 권리를 양도했습니다.

>
OpenPGP is the open standards version of NAI’s PGP encryption protocol.
The OpenPGP Working Group is seeking the qualification of OpenPGP as an Internet Standard as defined by the IETF.
Each distinct version of an Internet standards-related specification is published as part of the “Request for Comments” (RFC) document series.

OpenPGP는 NAI의 PGP 암호화 프로토콜의 오픈된 표준 버전입니다.
OpenPGP 워킹 그룹은 IETF에서 정의한 인터넷 표준으로 OpenPGP가 등록되도록 애쓰고 있습니다.
인터넷 표준 관련 사양의 각 버전은 "Request for Comments"(RFC) 문서 시리즈의 일부로 게시됩니다.

>
OpenPGP is on the Internet Standards Track and is under active development.
Many e-mail clients provide OpenPGP-compliant email security as described in RFC 3156.
The current specification is RFC 4880 (November 2007), the successor to RFC 2440.
RFC 4880 specifies a suite of required algorithms consisting of ElGamal encryption, DSA, Triple DES and SHA-1.
In addition to these algorithms, the standard recommends RSA as described in PKCS #1 v1.5 for encryption and signing, as well as AES-128, CAST-128 and IDEA.
Beyond these, many other algorithms are supported.
The standard was extended to support Camellia cipher by RFC 5581 in 2009, and encryption based on elliptic curve cryptography (ECDSA, ECDH) by RFC 6637 in 2012.
Support of EdDSA will be added by draft-koch-eddsa-for-openpgp-00 proposed in 2014.

OpenPGP는 인터넷 표준 트랙에 있으며 활발히 개발 중입니다.
많은 이메일 클라이언트들이 RFC 3156에서 설명하는 OpenPGP와 호환되는 이메일 보안을 제공합니다.
현재 사양은 RFC 2440의 후속 버전인 RFC 4880(2007년 11월)입니다.
RFC 4880은 ElGamal 암호화, DSA, Triple DES 및 SHA-1로 구성된 필수 알고리즘 스위트를 명시합니다.
이 알고리즘 외에도, 해당 표준은 암호화 및 서명을 위해 PKCS #1 v1.5에서 설명하는 RSA를 권장하며, AES-128, CAST-128 및 IDEA를 권장합니다.
이 외에도 많은 다른 알고리즘들이 지원됩니다.
이 표준은 2009년 RFC 5581에 의해 Camellia 암호를 지원하도록 확장되었으며, 2012년 RFC 6637에 의해 타원 곡선 암호화(ECDSA, ECDH)를 기반으로 하는 암호화를 지원하도록 확장되었습니다.
EdDSA의 지원은 2014년 제안된 draft-koch-eddsa-for-openpgp-00에 의해 추가될 예정입니다.

>
As far as we know, [intelligence organizations]( https://www.theverge.com/2014/12/28/7458159/encryption-standards-the-nsa-cant-crack-pgp-tor-otr-snowden ) aren’t able to break it.
>
Learn more about the technical specifications of OpenPGP on our page about the standards.

우리가 알고 있는 한, 정보 기관들은 OpenPGP를 해독하지 못합니다.

OpenPGP의 기술적 사양에 대해 더 자세히 알아보려면 표준에 관한 페이지를 참조하세요.

