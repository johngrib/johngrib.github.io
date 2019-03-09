---
layout  : wiki
title   : (요약) 이더리움 백서
summary : Ethereum White Paper
date    : 2019-01-22 22:56:21 +0900
updated : 2019-02-11 15:54:54 +0900
tag     : blockchain
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

* EVM: Ethereum Virtual Machine
* EVM code
    * stack 기반의 low-level 언어로 작성.
    * operation 을 의미하는 바이트들로 이루어진 바이트코드
    * (아희나 brainfuck 을 사용했던 경험을 떠올려보자)
* 실행
    * 기본적으로는 프로그램 카운터를 0 부터 증가시키면서 연산을 수행하는 무한 루프.
* 실행을 멈추는 조건
    * 코드의 마지막에 도달한다.
    * 오류가 발생한다.
    * STOP, RETURN 명령.

**3 가지 데이터 저장 공간**

| stack   | 스택.                                                | 실행이 끝나면 리셋된다         |
| memory  | 길이 제한을 두지 않은 바이트 배열.                   | 실행이 끝나면 리셋된다         |
| storage | The contract's long-term storage, a key/value store. | 컨트랙트를 영속적으로 보관한다 |

**EVM 코드의 실행 모델**

* 계산 상태는 8개 원소를 갖는 tuple 로 정의한다.

```
(block_state, transaction, message, code, memory, stack, pc, gas)
```

* `block_state` 는 모든 어카운트를 포함하는 전역 상태(global state) 이다.
    * 잔고와 저장소(`storage`)가 `block_state` 에 들어 있다.
* 다음을 반복한다.
    * pc(프로그램 카운터) 값을 확인한다.
    * 확인한 pc 값 번째 바이트의 명령을 실행한다.
        * 만약 pc 값이 바이트 코드의 길이보다 크면 0 으로 한다.
* 각각의 명령은 tuple 을 변화시킨다.
    * ADD: stack 에서 pop 을 두 번 해서 나온 두 값을 더한 다음, 다시 stack 에 push 한다. (1 gas 사용, pc 1 증가)
    * SSTORE: stack 에서 pop 을 두 번 한 다음, 먼저 꺼낸 값이 가리키는 컨트랙트 저장소 인덱스에 두 번째 값을 넣는다.
    * 등등...


## 블록체인과 채굴

![block_chain](https://web.archive.org/web/20190125161855im_/https://raw.githubusercontent.com/ethereumbuilders/GitBook/master/en/vitalik-diagrams/apply_block_diagram.png )

* 이더리움 블록체인과 비트코인 블록체인의 주요 차이점
    * 이더리움 블록은 트랜잭션 리스트와 가장 최근의 상태(state) 복사본을 가지고 있다.
    * 이더리움은 블록 넘버와 difficulty 가 블록 내에 저장된다.

이더리움의 블록 검증 알고리즘은 다음과 같다.

1. 참조하고 있는 이전 블록이 exists 하고 valid 한지를 확인한다.
2. 현재 블록의 timestamp를 확인한다.
    * 현재 블록의 timestamp가 이전 블록의 timestamp보다 큰지를 확인한다.
    * 현재 블록의 timestamp가 현 시점을 기준으로 15분 후보다 작은 값인지 확인한다.
3. 블록 넘버, difficulty, 트랜잭션 루트, 삼촌 루트(uncle root), gas limit 등 기타 다양한 이더리움 로우 레벨 개념들이 valid 한지 확인한다.
4. 블록에 포함된 작업 증명이 유효한지 확인한다.
5. 이전 블록의 마지막 state를 `S[0]`라 하자.
6. 현재 블록의 n 개의 트랜잭션 리스트를 `TX`라 하자.
    * `[0, n-1]` 범위에 대해 루프를 돌면서, `S[i+1] = APPLY(S[i], TX[i])` 로 설정한다.
    * 루프 도중 에러가 리턴되거나, GASLIMIT을 초과하면 루프를 종료하고 에러를 리턴한다.
7. 단, 채굴자에게 주는 리워드를 블록에 포함시킨 다음, `S_FINAL = S[n]` 으로 선언한다.
8. `S_FINAL` 의 머클 트리 루트가 블록 헤더가 갖고 있는 최종 상태 루트와 같은지를 검증한다.
    * 같다면 그 블록은 유효한 블록이다.

이 방법을 쓰면 각 블록마다 전체 상태를 저장하게 된다.

* 비효율적으로 보일 수 있지만 실제로는 비트코인과 비교할 수 있을 정도로 효율이 좋다.
    * 상태가 트리 구조로 저장되기 때문이다.
    * 변경이 필요한 블록은 몇 개가 되었건 트리의 작은 부분일 뿐이다.
* 인접한 두 개의 블록 간에는 트리의 대부분의 내용이 같다.
    * 한 번 데이터가 저장되면 포인터(서브트리의 해시)를 사용하여 참조할 수 있다.
* 패트리시아 트리(Patricia tree)
    * 패트리시아 트리는 머클 트리 개념을 수정한 것이다.
    * 단지 노드를 수정할 뿐 아니라, 효율적으로 삽입하거나 삭제할 수 있다.
    * 모든 상태 정보가 마지막 블록에 포함되어 있어, 전체 블록체인 히스토리를 모두 저장할 필요가 사라진다.
    * 이 방법을 비트코인에 적용한다면 20~50배의 공간을 절약할 수 있을 것이다.

**컨트랙트 코드는 "어디에서" 실행되는가?**

* 컨트랙트 코드 실행 프로세스는 블록 검증 알고리즘의 한 부분이다.
* 트랜잭션이 블록 B에 포함된다면,
    * 현재 또는 미래에 블록 B를 다운로드하고 검증하는 모든 노드가 그 트랜잭션에 의해 발생할 코드를 실행하게 된다.

# 어플리케이션

이더리움으로 3 종류의 어플리케이션을 만들 수 있다.

1. 금융 어플리케이션
    * 돈과 관련된 컨트랙트를 설정하고 관리.
    * 예: 하위화폐(실제 돈과 환율이 연동된 화폐), 파생상품, 헷지 컨트랙트, 예금용 전자지갑, 유언장, 고용계약 등등
2. 준 금융 어플리케이션
    * 금전이 관여되긴 하지만 비 화폐적인 면이 있는 계약용
3. 금융과 관련이 없는 어플리케이션
    * 온라인 투표, 분권형 거버넌스...

## 토큰 시스템

이더리움에서 토큰 시스템은 쉽게 구현할 수 있다.

* 모든 화폐 or 토큰 시스템은 결국 한 가지 오퍼레이션만을 수행하는 DB 이다.
    * A 라는 주체의 화폐/토큰을 x 만큼 차감하고, B 에게 x 만큼 지급한다.
    * A 가 이 거래를 승인한다.

이더리움에서 위의 로직을 컨트랙트에 반영시키기만 하면 된다.

가령 [Serpent의 경우 토큰 시스템을 실행하는 기본적인 코드](https://github.com/ethereum/serpent/blob/d460382f56003b9d56bafafe930f8b606d4b039f/examples/subcurrency.se#L7-L11 )는 다음과 같다.

```python
def send(to, value):
    if self.storage[msg.sender] >= value:
        # 보내는 사람의 storage에서 value 차감
        self.storage[msg.sender] = self.storage[msg.sender] - value
        # 받는 사람의 storage에 value 지급
        self.storage[to] = self.storage[to] + value
```

* 이 코드는 은행 시스템의 상태변환함수를 그대로 적용한 것이다.
* 이 정도 코드가 토큰 시스템을 만드는 데 필요한 전부이다.

이더리움을 토대로 만드는 토큰 시스템의 중요한 특징

* 거래비용을 거래 시에 사용한 화폐로 직접 지불할 수 있다.
    * 컨트랙트를 집행하기 위해 발송인에게 보내야 하는 수수료 만큼의 이더 잔고가 있어야 한다.
    * 컨트랙트 집행시 수수료로 받는 내부화폐를 이더 거래소에서 환전하여 이더 잔고로 충전할 수 있다.
* (비트코인에 기반한 메타화폐는 이런 특징이 없다)

## 파생상품과 가치안정통화

* 파생상품
    * "스마트 컨트랙트"의 가장 일반적인 어플리케이션.
    * 코드로 실행할 수 있는 가장 간단한 형태의 어플리케이션.

* 금융 컨트랙트의 어려운 점
    * 계약에서 규정하는 자산의 시세를 외부에서 참조해야 한다는 것.
    * 이더/달러(ETH/USD) 환율을 제공할 수 있는 컨트랙트가 필요하다.

그러므로 헷지(hedge) 컨트랙트는 다음과 같은 구조를 갖게 될 것이다.

1. A가 1000 이더를 입금할 때까지 기다린다.
2. B가 1000 이더를 입금할 때까지 기다린다.
3. 입금된 이더의 달러가치를 기록한다. 이걸 `$X` 라 하자.
4. 30일 후, A나 B가 컨트랙트를 재활성화할 수 있게 한다.
    * 컨트랙트의 내용: 당시 환율을 적용한 금액을 계산하여, A 에게는 `$X`를 송금하고, 당시 총금액의 나머지를 B에게 송금한다.


가상화폐 상거래 활성화의 장애물: 가상화폐의 높은 변동성

* 가상화폐/블록체인 자산의 보안성과 편의성을 누리고 싶어하는 사람들은 많다.
    * 그러나 하루만에 수십 % 급락할 수 있다는 리스크는 두렵다.
    * (이런 리스크 문제는 일반적으로는 자산 발행자가 보증을 서는 것으로 해결한다.)

보증을 서는 방식을 적용한다면 다음과 같이 될 것이다.

* 가상화폐 발행자는 가상화폐를 지불하는 자에게 **그에 상응하는 베이스 자산**을 제공할 것이라고 **공개적인 약속**을 한다.
    * 이 메커니즘은 가상화폐가 아닌 자산을 블록체인 자산화 시키는 결과를 가져온다.
* 그렇다면 자산 발행인을 어떻게 신뢰할 것인가?
    * 파생상품이 대안이 된다.
    * 암호화 담보자산(이더 등)의 가격이 상승할 거라는 데에 베팅(파생상품)하는 투자자들의 시장이 그 역할을 담당하게 된다.
        * 자산을 보증하기 위한 펀드를 자산 발행자 한 명이 제공하는 방식이 아님.
        * 파생상품을 통한 보증 역시 완전히 탈중앙화된 방법론은 아님.


## 신원조회/평판 시스템

* 네임코인
    * 최초의 알트코인(비트코인 이후 등장한 가상화폐들을 말한다)
    * 이름, 도메인 네임, 이메일 등등을 등록하는 명의등록 시스템.

명의등록 시스템의 기본적인 컨트랙트는 다음과 같은 형태를 갖는다.

```python
def register(name, value):
    if !self.storage[name]:
        self.storage[name] = value
```

* insert 만 가능한 db 의 형태.
* 누구나 소량의 ether를 사용해 명의를 등록할 수 있고, 한 번 등록하면 영구히 보존된다.


## 분산형 파일 저장소

이더리움을 토대로 한 일종의 "Dropbox" 시스템.

* 업로드한 파일을 수많은 암호화된 조각으로 잘라내서 여러 노드에 공유하는 방식.

분산형 드롭박스의 컨트랙트는 다음과 같다.

1. 유저가 업로드하려는 데이터를 블록으로 잘라낸다.
2. 해당 데이터를 암호화한다.
3. 암호화된 데이터로 머클 트리를 만든다.

유저 개개인은 본인의 하드디스크를 대여해주고 소액의 보상을 받는다.

* N 개의 블록마다 랜덤으로 머클트리의 인덱스를 뽑는다.
* 해당 인덱스를 저장해주겠다는 주체에게 X 만큼의 이더를 지불한다.

자신의 파일을 다시 다운로드 받고 싶을 때에는

* 소액결제 채널 프로토콜로 값을 지불하고 파일을 복원한다.


## 탈중앙화된 자율조직

* 탈중앙화된 자율조직(Decentralized Autonomous Organizations; DAO)
    * 일정 비율 이상(예: 67% 약 2/3)의 구성원이 동의하여 조직(자금) 운용 권한/코드 변경 권한을 갖는다.
    * 암호화 블록체인 기술을 사용하여 자금을 배분한다는 점이 여타 기업이나 집단과 다른 점이다.

DAO 코딩 개요

* 구성원의 2/3 가 동의/거부하면 자동으로 코드가 변경되도록 한다.
    * 동의/거부 코드를 각기 다른 컨트랙트로 분리시켜둔다.
    * 그리고 각 컨트랙트를 불러낼 수 있는 주소를 제공하여, 코드를 교체하는 것처럼 할 수 있다.

단순한 DAO 컨트랙트에는 3가지의 트랜잭션이 있을 수 있다.

* `[0, i, K, V]`: 저장공간 인덱스 `K`에 있는 주소를 `V`로 바꾸라는 제안을 등록. 해당 제안의 인덱스는 `i`.
* `[0, i]`: 제안 `i`에 찬성하는 투표를 등록.
* `[2, i]`: 충분한 투표가 이루어졌을 때 제안 `i`를 완결.

컨트랙트는 모든 오픈 스토리지에 변경 데이터와 투표 정보 등을 보관한다.

어떤 스토리지 변경이건 2/3 투표를 받으면 마지막으로 확정시키는 트랜잭션이 그 변경을 집행하게 된다.

* 탈중앙화된 기업
    * 각 어카운트가 0 이상의 지분을 가질 수 있게 한다.
    * 어떤 결정을 내리기 위해서는 지분의 2/3 가 필요하다.
    * 자산 관리 기능, 지분을 매매할 수 있는 오퍼를 낼 수 있는 능력, 다른 오퍼들을 수락할 수 있는 능력 등이 필요.


## 추가적인 어플리케이션들
# 그 밖의 이슈들
## 수정된 GHOST 도입
## 수수료
## 연산과 튜링완전성
## 통화 그리고 발행
## 채굴 중앙집중화
## 확장성
# 결론


# Links

* [Ethereum White Paper](https://github.com/ethereum/wiki/wiki/White-Paper )
    * [Ethereum White Paper(web.archive.org)](https://web.archive.org/web/20190125161855/https://github.com/ethereum/wiki/wiki/White-Paper ) - 2019-01-25
    * [Ethereum White Paper 한국어](https://github.com/ethereum/wiki/wiki/%5BKorean%5D-White-Paper )
