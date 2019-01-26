---
layout  : wiki
title   : (요약) 이더리움 백서
summary : Ethereum White Paper
date    : 2019-01-22 22:56:21 +0900
updated : 2019-01-26 23:55:19 +0900
tags    : blockchain
toc     : true
public  : true
parent  : what
latex   : true
---
* TOC
{:toc}

>
* 면책조항
    * 이 문서는 개인의 학습을 위해 [이더리움 백서](https://github.com/ethereum/wiki/wiki/%5BKorean%5D-White-Paper )를 읽으면서 요약 정리한 노트입니다.
    * 제가 잘못 이해했거나 착각하여, 적절하지 않은 단어나 잘못된 내용을 적은 문장이 있을 수 있습니다.
    * 블록체인, 비트코인, 이더리움에 대해 자세히 알고 싶다면 이 노트가 아니라 해당 기술의 백서 또는 전문서를 조회하세요.


# 차세대 스마트 컨트랙트와 탈중앙화된 어플리케이션 플랫폼

* 비트코인의 중요한 측면: 분산합의 수단으로서의 블록체인 기술.
* 블록체인의 활용
    * 컬러드 코인(colored coins): 사용자 정의 화폐와 금융상품
    * 스마트 자산(smart property): 물리적 대상의 소유권을 표현
    * 네임코인(Name coin): 도메인 이름과 같은 비동질적 자산을 기록
    * 스마트 컨트랙트(smart contracts): 계약규칙을 구현한 코드로 디지털 자산을 관리
    * 탈중앙화된 자율 조직(decentralized autonomous organizations, DAOs)
* 이더리움은 튜링 완전한 프로그래밍 언어가 심어진 블록체인이다.
    * 상태 변환 기능이 포함된 계약을 작성할 수 있음.

# 비트코인과 기존 개념들 소개

## 역사

* 1980~90년대: 익명 e-cash 프로토콜.
    * 중앙집권 중개인에 의존하여 별로 주목받지 못함.
* 1998: b-money
    * 분산 합의, 계산 퍼즐을 푸는 방식으로 화폐를 발행하는 아이디어.
    * 분산 합의는 구현하지 못함.
* 2005: Hall Finney
    * 작업증명(proof of work) 개념 소개
* 2009: 사토시 나카모토의 탈중앙화된 화폐
    * 공개키 암호화 방식의 소유권 관리 + **작업 증명** 합의 알고리즘

### 작업 증명(proof of work)

작업 증명은 두 가지 문제를 동시에 해결하기 때문에 혁신적이다.

1. 심플하고 효과적인 합의 알고리즘.
    * 네트워크의 모든 노드가 표준 업데이트 집합에 공동으로 동의할 수 있게 됨.
2. 누구나 합의 프로세스에 참여할 수 있음.
    * 합의 결정권이 누구에게 있어야 하는가? → 해결
    * 각 노드의 결정권의 크기를 노드의 계산 능력에 직접 비례시키는 방식.
        * sybil attacks 방어 메커니즘 제공.

### 지분 증명(proof of stake)

* 작업 증명 이후 새로 등장한 합의 알고리즘.
* 각 노드의 계산능력이 아니라 화폐의 보유량에 따라 각 노드의 결정권을 계산한다.
* 작업 증명과 지분 증명 모두 암호화폐의 기반으로 사용할 수 있음.



## 상태변환 시스템으로서의 비트코인

* 암호화 화폐의 장부는 일종의 상태변환 시스템이다.
    * 상태변환 함수: `APPLY(S, TX) -> S' or ERROR`
        * S: 현재 상태
        * TX: 트랜잭션
        * S': 새로운 상태

```js
S = { Alice: 50, Bob: 50 }
TX = "Alice가 Bob에게 $20 송금"
_S = APPLY(S, TX)   // { Alice: 30, Bob: 70 }

S = { Alice: 50, Bob: 50 }
TX = "Alice가 Bob에게 $70 송금"
_S = APPLY(S, TX)   // ERROR
```

### 비트코인 상태와 트랜잭션

* 상태 S
    * 생성됐지만 아직 사용하지 않은 모든 코인의 집합.
    * 소비되지 않은 트랜잭션 출력(UTXO: Unspent Transaction Outputs)
    * 각 UTXO 에는 다음 정보가 들어 있다.
        * 코인의 금액
        * 소유자의 암호화된 공개키 정보(소유자의 주소)
* 트랜잭션 TX
    * 입력(들)
        * 보내는 쪽 지갑 주소에서 선택한 UTXO의 참조.
        * 보내는 쪽 지갑 주소에 대응되는 private key로 생성한 서명.
    * 출력
        * 상태에 추가될 새로운 UTXO 정보.

### 상태변환 함수

`APPLY(S,TX) -> S'`

1. TX의 각 입력에 대해:
    * `if` 참조된 UTXO가 S에 없다면, `return ERROR` (존재하지 않는 코인 사용 금지)
    * `if` 서명이 UTXO의 소유자와 매치되지 않으면, `return ERROR` (다른 사람의 코인 사용 금지)
1. 만약 입력의 UTXO들 금액의 총합이 출력 UTXO들 금액의 총합보다 작으면, `return ERROR` ()
2. 입력에 사용된 UTXO가 삭제되고 출력 UTXO가 추가된 S를 `return S`.

**상태변환 함수 사용 예**

* Alice가 Bob 에게 **11.7 BTC** 를 보내고자 한다.
    * 그런데 Alice가 갖고 있는 UTXO 는 **6 BTC, 4 BTC, 2 BTC** 뿐이라고 하자.
    * **6 + 4 + 2 = 12** 이므로 **12 BTC**를 보내고 **0.3 BTC**를 거스름돈으로 받으면 된다.
* 3 개의 UTXO 가 input 트랜잭션이 된다.
* 2 개의 output 이 나온다.
    1. Bob 소유의 **11.7 BTC**가 표시된 UTXO
    2. Alice 소유의 **0.3 BTC**가 표시된 UTXO

## 채굴

### 상태

* 최초의 상태(genesis state)부터 모든 트랜잭션을 순서대로 적용해서 얻어낼 수 있다.
    * 순서가 바뀌거나 중간에 다른 상태가 있으면 최종 상태는 완전히 다른 값이 되어버린다.

### 블록

* 노드는 트랜잭션을 모아 **Block**(트랜잭션 패키지)을 생성한다.
* 네트워크는 10분마다 하나의 블록을 생성하도록 계획되어 있다.
* 각 블록은 다음을 포함한다.
    * 블록 헤더
        * timestamp
        * nonce
        * 이전 블록의 hash (블록의 hash 란 블록 헤더의 hash 를 의미)
        * 모든 트랜잭션 정보로 생성한 Merkle tree 의 루트 hash.
    * 이전 블록 이후 발생한 모든 트랜잭션 목록

#### 블록 유효성을 확인하는 알고리즘

1. 블록이 참조하는 부모 블록이 유효한지 확인한다.
2. timestamp 값이 부모 블록의 timestamp 값보다 크고, 2시간 이내인지 확인한다.
3. **작업증명(proof of work)이 유효한지 확인한다.**
    * SHA-256 해시값이 목표값보다 작다면 OK.
4. `S[0]`를 이전 블록의 마지막 상태가 되도록 설정한다.
5. `TX`를 `n`개의 트랜잭션을 갖는 블록의 트랜잭션 목록으로 가정한다.
    * 트랜잭션을 순서대로 상태변환 함수에 넣어보면서 상태를 `S[1]`에서 `S[n]`까지 계속 업데이트해본다.
    * 그 과정에서 에러가 나면 false 를 리턴하며 종료한다.
6. `S[n]`을 이 블록의 마지막 상태로 등록하고 true 를 리턴한다.

### 작업증명

**작업증명의 조건**

* 블록의 SHA-256 해시값이 목표값보다 **작아야** 한다.
    * 해시값은 랜덤으로 생성된다.
* 목표값은 점점 작아진다.
    * 목표값은 2016개 블록마다 네트워크에 의해 감소하도록 조정된다.
    * 평균적으로 10분마다 새로운 블록이 생성되도록 조정된다.
* 블록 헤더의 nonce 값을 바꿔보면서 계속 해시값을 계산해보는 방법 밖에 없다.

**작업증명의 목적**

* 블록 생성을 어렵게 만들어서 조작을 방지한다.

**작업증명의 보상(채굴의 보상)**

1. 25 BTC
2. 출력금액보다 입력금액이 큰 트랜잭션이 있으면 차액 만큼의 BTC를 받는다(수수료).

* 위의 두 가지가 BTC가 새로 발행되는 **유일한 방법**이다.
* 즉, genesis state 에는 코인이 없었다.

#### 51% attack

* 공격자는 이중지불을 합리화하기 위해서 fork 를 시도할 수 있다.
    * 그러나 작업증명에 시간이 걸리기 때문에 공격자의 체인의 길이는 다른 체인에 비해 짧을 수 밖에 없다.

따라서 비트코인 네트워크는 가장 긴 블록체인을 TRUE로 인식하는 규칙을 갖는다.

* 그러므로 공격자가 자신의 체인을 가장 길게 만들기 위해서는
    * 네트워크의 다른 노드들의 계산능력 조합보다 더 큰 계산 능력을 가져야 한다.


## 머클트리

* 비트코인에서 블록이 저장되는 자료구조는 binary tree의 일종인 Merkle tree 이다.
* Merkle tree에서 노드의 hash 값은 두 자식 노드의 hash 값으로 만든다.
    * 그러므로, 누군가 특정 트랜잭션을 악의적으로 변경하면 모든 상위 노드의 hash 값이 바뀌게 된다.
    * 상위 노드의 hash 값이 바뀌면...
        * 해당 블록의 작업증명이 유효하지 않게 된다.
        * 완전히 다른 블록으로 인식되게 된다.

### full node, light node

* **완전 노드(full node)**: 각 블록의 모든 정보를 저장하고 처리하는 노드
    * 1달에 약 1GB씩 늘어나므로 용량이 엄청나다.
* **가벼운 노드(light node)**: 블록 헤더만 다운받아 갖고 있는 노드.
    * 블록헤더만으로 작업증명을 검증하므로 스마트폰처럼 용량이 작은 장비에서도 운용할 수 있다.

## 블록체인 기술을 이용한 다른 응용 사례

* 네임코인
    * 탈중앙화된 명칭 등록 데이터베이스
    * 아이디, 닉네임 등의 선점이 가능하고 다른 사람이 같은 이름을 쓸 수 없다.
* 컬러드 코인
    * 특정 비트코인 UTXO에 자신만의 "색깔"을 부여하여 새로운 화폐를 "발행"할 수 있다.
    * 사용자가 특정 색깔을 가진 UTXO만 지갑에 간직하고 그 코인을 보통 비트코인처럼 여기저기 보낼 수 있게 한다.
* 메타코인
    * 상태 이동 함수를 다르게 정의하여(APPLY'), 비트코인 시스템 위에서 운영되는 프로토콜을 갖는다.

**합의 프로토콜을 만드는 두 가지 접근방법**

1. 독립적인 네트워크를 세운다.
2. 비트코인 시스템과 연동되는 프로토콜을 세운다.

## 스크립팅

비트코인에 구현된 스크립트 언어에는 한계가 있다.

* 튜링 불완전성
    * 거래 증명시의 무한루프를 막기 위해 loop 명령을 의도적으로 누락시켰다.
    * loop가 없어도 if 문을 잔뜩 쓰면 가능하긴 한데 매우 비효율적이다.
* 가치무지하다
    * UTXO 스크립트만으로는 인출 액수를 세밀하게 통제하지 못한다.
    * 단순히 입력/출력이 있을 뿐이어서 다양한 종류의 계약 거래를 실행하지 못함.
* 다양한 상태를 표현할 수 없다
    * UTXO의 상태는 두 가지 뿐이다. 사용/사용안됨.
    * 다른 상태를 갖는 다중 단계 계약, 스크립트를 만들 수 없다.
        * 분산 환전 거래, 이중 암호 실행 프로토콜 등을 못 한다.
* 블록체인을 해독할 방법이 없다
    * UTXO는 nonce, timestamp, 이전 블록 hash 같은 블록체인 자료를 해독하지 못한다.
    * 그러므로 스크립트 언어는 무작위성을 다루지 못하게 된다.
    * 다양한 어플리케이션을 만들기 어렵게 된다.

발전된 어플리케이션을 만드는 3가지 접근법

1. 독립적인 블록체인을 만든다.
    * 만들기 어렵다는 문제가 있음.
2. 비트코인에 이미 내재된 스크립트를 이용한다.
    * 간단하지만 이용이 제한적이다.
3. 비트코인 상에서 작동하는 메타-규약을 만든다.
    * 간단하지만 확장이 곤란하다.

이런 문제들의 해결책으로 다음과 같은 특징들을 갖는, 이더리움을 만든다.

* 개발하기 쉽다.
* 더 강력한 라이트 클라이언트 기능을 갖는다.
* 경제적인 개발 환경
* 블록체인의 보안을 사용하는 어플리케이션을 만들 수 있는 프레임워크


# 이더리움

* 이더리움의 목적: 분산 어플리케이션 **제작**을 위한 대체 프로토콜
    * 튜링 완전한 언어를 내장시켜 이 목적을 이루고자 한다.

## 철학

철학은 [[Korean] White Paper](https://github.com/ethereum/wiki/wiki/%5BKorean%5D-White-Paper#%EC%9D%B4%EB%8D%94%EB%A6%AC%EC%9B%80 )에는 없어서(2019년 1월 26일 기준), [White Paper](https://github.com/ethereum/wiki/wiki/White-Paper#philosophy )를 참고하여 요약하였다.

* 단순함(Simplicity)
    * 이더리움 프로토콜은 가능한 한 단순해야 한다.
    * 평균적인 수준의 프로그래머가 전체 사양을 준수하고 구현할 수 있어야 한다.
    * 복잡도를 증가시키는 최적화는 상당한 이득이 있지 않은 이상 포함되어선 안된다.
* 보편성(Universality)
    * 이더리움 디자인 철학의 핵심은 이더리움에 특별한 기능이 없다는 것이다.
    * 튜링 완전한 스크립팅 언어를 제공한다.
        * 프로그래머가 스마트 계약이나 트랜잭션 타입을 만들 수 있도록 한다.
        * 자신만의 금융 상품이나 통화를 만들 수 있음.
* 모듈화(Modularity)
    * 이더리움 프로토콜의 각 부분은 최대한 모듈화되도록 디자인돼야 한다.
    * 이더리움의 각 모듈은 이더리움 뿐만 아니라 cryptocurrency 생태계에 이익이 되어야 한다.
* 기민함(Agility)
    * 이더리움 프로토콜은 돌에 새겨진 것이 아니다. (유연하게 바꿀 수 있다는 말)
    * 가령 확장성, 보안을 향상시킬 기회가 있다면 활용할 것이다.
* 차별과 검열의 금지(Non-discrimination and non-censorship)
    * 바람직하지 않은 사용이 있다 하더라도 검열하지 않는다.
    * 프로그래머는 이더리움에서 무한 루프를 돌릴 수도 있다.
        * (물론 이러면 수수료가 영원히 나갈 것이다)


## 이더리움 어카운트

* 상태(state)
    * [어카운트(account) object들로 구성되어 있다.](https://github.com/ethereum/go-ethereum/blob/5d921fa3a0cea9d87e7fd391c0ddd3115d00d0c4/core/state/state_object.go#L66 )

* 각각의 어카운트는 다음을 갖고 있다.
    * 주소(20 byte)
    * 상태 변환(state transition)

* 어카운트에는 다음의 네 개의 필드가 포함되어 있다.
    * nonce: 각 트랜잭션이 한번만 처리되도록 하는 카운터
    * ether balance: 이더 잔고
    * contract code: 계약 코드
    * storage: 스토리지 트리의 머클 루트

[2209fed:go-ethereum/core/state/state_object.go](https://github.com/ethereum/go-ethereum/blob/2209fede4e2cb19bc6336562fc41812ec1d56435/core/state/state_object.go#L96-L103 )에서 `Account struct`를 보면 다음과 같다.
```go
// Account is the Ethereum consensus representation of accounts.
// These objects are stored in the main account trie.
type Account struct {
    Nonce    uint64
    Balance  *big.Int
    Root     common.Hash // merkle root of the storage trie
    CodeHash []byte
}
```

* 이더(ether)
    * 이더리움의 암호-연료(crypto-fuel).
    * 트랜잭션 수수료를 지불하는데 사용.

### EOA, CA

|           | EOA                                                | CA                                        |
|-----------|----------------------------------------------------|-------------------------------------------|
| 의미      | Externally Owned Accounts                          | Contract Accounts                         |
| 한국어(?) | 외부 소유 어카운트                                 | 컨트랙트 어카운트                         |
| 코드      | 코드를 갖고 있지 않음                              | 코드를 갖고 있음                          |
| 메시지    | 메시지를 보내려면 새 트랜잭션을 만들고 서명해야 함 | 메시지를 받을 때마다 자신의 코드를 활성화 |

* CA는 코드 활성화를 통해 다음과 같은 일들을 할 수 있다.
    * 받은 메시지를 읽고 내부 저장공간에 기록한다.
    * 다른 메시지를 보낸다.
    * 컨트랙트들을 차례로 생성한다.

### 이더리움에서 컨트랙트란?

>
Note that "contracts" in Ethereum should not be seen as something that should be "fulfilled" or "complied with"; rather, they are more like "autonomous agents" that live inside of the Ethereum execution environment, always executing a specific piece of code when "poked" by a message or transaction, and having direct control over their own ether balance and their own key/value store to keep track of persistent variables.

| 계약(사회)                                                      | 계약(이더리움)       |
|-----------------------------------------------------------------|----------------------|
| 이행해야 하는 것(fulfilled)<br/>준수해야 하는 것(complied with) | 일종의 자율 에이전트 |

* 이더리움에서의 계약
    * 일종의 자율 에이전트.
    * 메시지나 트랜잭션이 도착하면 특정 코드를 실행한다.
    * 자신의 이더 잔고와 key/value 저장소를 직접 통제한다.


## 메시지와 트랜잭션

* transaction: 외부 소유 어카운트(EOA)가 보낼 메시지를 가지고 있는 서명된 데이터 패키지.
* transaction은 다음을 포함한다.
    * 메시지 수신자
    * 메시지 발신자의 서명
    * amount of ether: 발신자가 수신자에게 보내는 이더의 양
    * optional data field
    * STARTGAS 값: 트랜잭션 실행이 수행되도록 허용된 최대 계산 수
    * GASPRICE 값: 매 계산단계마다 발신처가 지불하는 수수료

**STARTGAS, GASPRICE**

* 이더리움의 anti-Denial of Service model(anti-DoS)에 중요한 역할을 한다.
* 각각의 트랜잭션은 코드 실행 시의 계산 단계 **최대값**을 설정해야 한다.
    * 코드 내의 무한루프, 계산 낭비를 방지한다.
* 계산의 기본 단위는 **gas**.
* 일반적인 계산 단계의 비용은 **1 gas**.
    * 1 gas 보다 비싼 계산도 있다.
    * 트랜잭션 데이터에 있는 모든 바이트는 바이트당 **5 gas**의 수수료가 든다.
    * 공격자가 수수료를 많이 지불하게 만드는 방식.

[2209fed:go-ethereum/core/types/transaction.go](https://github.com/ethereum/go-ethereum/blob/2209fede4e2cb19bc6336562fc41812ec1d56435/core/types/transaction.go#L38-L72 )에서 `txdata struct`를 보면 다음과 같다.

```go
type txdata struct {
    AccountNonce uint64          `json:"nonce"    gencodec:"required"`
    Price        *big.Int        `json:"gasPrice" gencodec:"required"`
    GasLimit     uint64          `json:"gas"      gencodec:"required"`
    Recipient    *common.Address `json:"to"       rlp:"nil"` // nil means contract creation
    Amount       *big.Int        `json:"value"    gencodec:"required"`
    Payload      []byte          `json:"input"    gencodec:"required"`

    // Signature values
    V *big.Int `json:"v" gencodec:"required"`
    R *big.Int `json:"r" gencodec:"required"`
    S *big.Int `json:"s" gencodec:"required"`

    // This is only used when marshaling to JSON.
    Hash *common.Hash `json:"hash" rlp:"-"`
}
```

## 메시지

* contract는 다른 contract에게 메시지를 전달할 수 있다.
* message는 serialized 되지 않는 virtual object이며 이더리움 실행 환경에서만 존재한다.
* message는 다음을 포함한다.
    * 발신자 sender
    * 수신자 recipient
    * 메시지와 함께 전송되는 amount of ether
    * optional data field
    * STARTGAS 값

[2209fed:go-ethereum/core/types/transaction.go](https://github.com/ethereum/go-ethereum/blob/2209fede4e2cb19bc6336562fc41812ec1d56435/core/types/transaction.go#L383-L395 )에서 `Message struct`를 보면 다음과 같다.

```go
type Message struct {
    to         *common.Address
    from       common.Address
    nonce      uint64
    amount     *big.Int
    gasLimit   uint64
    gasPrice   *big.Int
    data       []byte
    checkNonce bool
}
```

* 메시지는 컨트랙트가 생성한다.
    * 컨트랙트가 코드를 실행하다가 메시지 생성을 의미하는 `CALL` opcode 가 있으면 메시지를 생성하고 실행한다.
* 트랜잭션이나 컨트랙트에 의해 할당된 gas 허용치
    * 트랜잭션과 모든 하위 작업 실행에서 소모된 총 gas에 적용된다.

**gas 사용 예**

| 순서 | 작업                                                                    | 잔여 gas |
|------|-------------------------------------------------------------------------|----------|
| 0    | A(외부 실행자)가 B에게 트랜잭션과 1000 gas 를 보냄                      | 1000 gas |
| 1    | B 가 (트랜잭션 코드 실행 등으로) 600 gas 를 사용하고 C 에게 메시지 전송 | 400 gas  |
| 2    | C 가 내부 실행으로 300 gas 사용하고 B 에게 반환                         | 100 gas  |
| 3    | (이제 B 는 100 gas 를 더 사용할 수 있다.)                               | 100 gas  |

## 이더리움 상태 변환 함수

![state transition](https://web.archive.org/web/20190125161855im_/https://raw.githubusercontent.com/ethereumbuilders/GitBook/master/en/vitalik-diagrams/ethertransition.png )

`APPLY(S, TX) -> S'`

1. 유효성 확인.
    * 하나라도 이상이 있다면 **return ERROR**.
        * 트랜잭션이 형식에 맞는지(빠진 값은 없는지) 확인한다.
        * 서명이 유효한지 확인한다.
        * nonce가 발신자 어카운트의 nonce와 일치하는지 확인한다.
2. 수수료 처리
    * `STARTGAS * GASPRICE` 로 트랜잭션 수수료를 계산한다.
    * 서명을 통해 발신자의 주소를 알아낸다.
    * 발신자 어카운트의 잔고에서 수수료를 뺀다.
        * 발신자의 잔고가 충분하지 않으면 **return ERROR**.
    * 발신자 nonce 를 증가시킨다.
3. gas 값을 초기화하고 바이트 비용을 지불한다.
    * `GAS = STARTGAS`로 GAS 값을 초기화 한다.
    * 트랜잭션에서 사용된 바이트에 대한 값을 지불한다.
        * 바이트당 gas 의 특정양을 차감한다.
4. 발신자 어카운트에서 수신자 어카운트로 트랜잭션 값을 보낸다.
    * 수신자 어카운트가 존재하지 않으면 새로 생성한다.
    * 수신자 어카운트가 컨트랙트이면,
        * 컨트랙트의 코드를 끝까지 실행한다.
        * 또는 gas 가 떨어질 때까지 실행한다. 
5. 만약 발신자의 돈이 충분하지 않거나, 실행 도중 gas 가 부족하면?
    * 모든 상태 변경을 원래 상태로 복구한다.
    * 단, 지불한 수수료는 복구되지 않는다.
    * 지불한 수수료는 채굴자 어카운트로 들어간다.
6. 남은 gas 의 처리
    * 최종적으로 남아 있는 모든 gas 의 수수료는 발신자에게 돌아간다.
    * 소모된 gas 에 지불한 수수료를 채굴자에게 보낸다.

### 이해를 돕기 위한 예제

다음과 같은 컨트랙트 코드가 있다고 하자.

```python
if !self.storage[calldataload(0)]:
    self.storage[calldataload(0)] = calldataload(32)
```

* 스토리지는 비어 있다고 가정하자.
* byte 당 수수료는 5 gas 라고 하자.
* 트랜잭션은 170 바이트 길이를 갖고 있고, 내용은 다음과 같다고 하자.
    * amount of ether: 10 ether
    * STARTGAS: 2000 gas
    * GASPRICE: 0.001 ether
    * data: 64 byte를 보낸다고 하자.
        * 0 ~ 31 byte: 숫자 **2**
        * 32 ~ 63 byte: 문자열 **CHARLIE**

상태 변환 함수의 프로세스는 다음과 같이 진행될 것이다.

1. 트랜잭션의 유효성을 확인한다.
2. 수수료 처리
    * `STARTGAS * GASPRICE` 이므로 수수료는 $$2000 \times 0.001 = 2 \ \text{ether}$$.
    * 발송자의 어카운트에서 2 ether 를 뺀다. (그리고 발신자의 nonce 도 증가시킬 것이다)
3. gas 값을 초기화하고 바이트 비용을 지불한다.
    * `gas = 2000` 으로 초기화 한다.
    * 트랜잭션이 170 bytes 이므로, 수수료는 $$170 \times 5 \ gas = 850 \ gas$$.
    * 남는 gas는 $$ 2000 \ gas - 850 \ gas = 1150 \ gas $$
4. 발송자 어카운트에서 10 ether 를 빼고, 컨트랙트 어카운트에 더한다.
5. 코드를 실행한다.
    1. 컨트랙트의 index **2** 에 해당하는 스토리지가 사용되었는지 확인한다.
    2. index **2** 에 해당하는 스토리지 값을 **CHARLIE** 로 설정한다.
    * 이 작업에 187 gas 가 소비되었다고 가정하자.
        * 남아 있는 gas 는 $$ 1150 - 187 = 963 $$.
6. $$ 963 \times 0.001 \ ether = 0.963 \ ether $$ 를 발신자의 어카운트로 되돌려 준다.
7. 결과 상태를 리턴한다.

만약 트랜잭션의 수신자에게 컨트랙트가 없다면

* 총 트랜잭션 수수료는 `GASPRICE * 트랜잭션의 바이트 수` 가 된다.
* 트랜잭션과 함께 보낸 데이터는 상관 없는 데이터가 된다.

만약 메시지 실행시 gas 가 부족하면

* 메시지 실행과 그에 따른 다른 모든 실행은 원래대로 되돌려진다.
    * 그러나 부모 실행(parent execution)은 되돌려지지 않는다.
    * 이로 인해 컨트랙트가 다른 컨트랙트를 호출하는 것은 안전하다 할 수 있다.
* A 가 G gas 를 갖고 B 를 호출해도, A 의 실행은 최대 G gas 만을 잃는다.

`CREATE` opcode

* 컨트랙트를 생성하는 opcode.
* 실행 방식은 `CALL`과 비슷하지만, 실행 결과는 새로 생성된 컨트랙트의 코드를 결정한다는 차이가 있다.


## 코드 실행

## 블록체인과 채굴

# 어플리케이션

# Links

* [Ethereum White Paper](https://github.com/ethereum/wiki/wiki/White-Paper )
    * [Ethereum White Paper(web.archive.org)](https://web.archive.org/web/20190125161855/https://github.com/ethereum/wiki/wiki/White-Paper ) - 2019-01-25
    * [Ethereum White Paper 한국어](https://github.com/ethereum/wiki/wiki/%5BKorean%5D-White-Paper )
