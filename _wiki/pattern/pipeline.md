---
layout  : wiki
title   : 파이프라인 (Pipeline)
summary : 데이터 스트림을 처리하는 시스템 구조를 제공한다
date    : 2021-10-31 11:38:24 +0900
updated : 2021-10-31 14:36:38 +0900
tag     : posa architecture
toc     : true
public  : true
parent  : [[/pattern]]
latex   : false
---
* TOC
{:toc}

## Pipes and Filters

>
Pipes and Filters 아키텍처 패턴은 시스템의 태스크를 몇 개의 순차적 프로세싱 단계(sequential processing step)들로 구분한다.
이 단계들은 해당 시스템 내부를 오가는 데이터 흐름(data flow)에 의해 연결된다.
그러므로 어떤 단계의 출력 데이터는 다음 단계의 입력 데이터에 해당된다.
각 프로세싱 단계는 필터 컴포넌트에 의해 구현된다.
**필터**(filter)는 증분적(incremental)으로 (다시 말해 출력을 산출하기 위해 들어온 모든 입력을 한꺼번에 처리하는 것이 아니라 입력이 일정량 들어오는 대로 출력을 바로바로 산출하는 방식으로) 데이터를 처리해 전달한다.
이렇게 처리해야 낮은 레이턴시(latency)를 얻을 수 있으며 병렬 프로세싱이 실제로 가능하게 된다.
스템에 들어오는 입력은 텍스트 파일과 같은 **데이터 소스**(data source)에 의해 제공된다.
출력은 파일, 터미널, 애니메이션 프로그램과 같은 **데이터 싱크**(data sink)로 전달된다.
데이터 소스, 필터, 데이터 싱크는 순서대로 각각 **파이프**(pipe)로 연결되어 있다.
각 파이프는 인접한 프로세싱 단계들 간의 데이터 흐름을 처리한다.
파이프로 연결된 일련의 필터들을 **프로세싱 파이프라인**(processing pipeline)이라고 한다.
[^posa-59]

## 메모

데이터 처리 스트림을 담당하는 시스템이나 컴포넌트를 만들 때, 다음과 같은 필요가 있다면 이 패턴을 고려할 수 있다.

- 프로세싱 순서를 바꿀 수 있어야 한다.
- 각각의 프로세싱 단계를 제외하거나 새로 개발해 추가할 수 있어야 한다.
- 각각의 프로세싱 단계를 재조합할 수 있어야 한다.

한편, 다음과 같은 문제를 함께 고려해야 한다.

- 데이터는 주로 각 프로세싱 단계의 입출력을 통해서 전달된다.
    - 따라서 인접한 프로세싱 단계가 아니라면 정보를 공유하지 못할 수 있다.
- 병렬 처리가 필요하다면 파이프 구성을 한 줄로 만들지 않는 것도 고려한다.

## 구현

[패턴 지향 소프트웨어 아키텍처(POSA)]에서 소개하는 구현 단계를 단계주제만 모아보면 다음과 같다.[^posa-65]

1. 시스템의 태스크를 일련의 프로세싱 단계에 따라 구분한다.
2. 각 파이프 사이로 전달할 수 있도록 데이터 포맷을 정의한다.
3. 각 파이프를 어떻게 연결할지 결정한다.
4. 필터를 설계하고 구현한다.
5. 오류 핸들링을 설계한다.
6. 프로세싱 파이프라인을 설정한다.

### 데이터 포맷

필터 재조합을 용이하게 하려면 데이터 포맷을 하나로 통일하는 방법을 선택할 수 있다.

이렇게 통일된 포맷의 대표적인 예는 유닉스 명령어 조합일 것이다.
- 유닉스 명령어들은 텍스트 문자열을 입력받아, 텍스트 문자열을 출력한다.
- 즉 입출력 타입이 String으로 통일되어 있는 셈이다.

>
단 하나의 포맷으로 정의하 는 것이 가장 유연성(flexibility)을 높일 수 있다.
왜냐하면 그래야 필터를 쉽게 재조합할 수 있기 때문이다.
유닉스 필터 프로그램의 경우, 데이터 포맷은 행구조(line-structured) ASCII 텍스트이다.
하지만 이 포맷은 효율의 면에서 불리하다.
예를 들어 부동소수점 수(floating point number)의 텍스트 표현은 파이프로 전달하기에는 턱없이 비효율적이다.
왜냐하면 ASCII와 부동소수점 표현 사이의 잦은 변환(conversion)이 요구되기 때문이다.
만약 유연성과 각기 다른 데이터 표현에 대한 선택권을 모두 원한다면,
의미적으로 동등한 표현 사이에 데이터를 변환하기 위해서 변환 필터 컴포넌트를 만드는 것도 좋다.
>
또한 입력의 끝을 표기하는 방식도 정의해야 한다.
만약 시스템 서비스가 파이프 연결을 위해 사용되면, 입력 끝(end-of-input) 오류 조건을 만족해야 한다.
다른 파이프 구현의 경우 입력 끝을 표시하기 위해 특정 데이터 값을 사용할 수 있다.
입력 끝 표시로 흔히 사용되는 예로 `0`(zero), `-1`, `$`, `control-D`, `control-Z` 등이 있다.
[^posa-65]

### 전역 상태 공유를 사용하는 경우

다음은 Mocha 컴파일러를 예로 든 것이다. 이 예는 Pipes and Filters 패턴을 엄격하게 따르지는 않는다.

![전역 상태를 공유하는 파이프 구조]( ./global-symbol-table.svg )

- 모든 단계들이 심볼 테이블을 통해 전역 상태를 공유한다.
- 이 방식은 인접 프로세싱 단계를 통해서만 데이터를 얻는다는 규칙을 위반한다.

왜 규칙을 위반하면서까지 전역 상태를 공유하는가?

- 성능 때문이다.
    - 파이프가 전역 정보를 추가 데이터로 넘겨주게 되면 데이터 구조가 복잡해지고, 파이프라인 데이터 크기가 커진다.
    - 전역 상태를 사용해 파이프가 최소한의 정보만 넘겨주도록 설계한 것.

### tee의 사용

다음은 tee를 사용한 출력방향 전환과 결합의 예제이다.[^posa-71]

```sh
# 우선 예비 이름을 붙여 파이프 두 개를 생성한다
mknod pipeA p
mknod pipeB p

# 유닉스 필터를 사용해 프로세싱을 진행한다
# 백그라운드에 프로세스를 생성한다
sort pipeA > pipeB &
# 메인 파이프라인
cat file | tee pipeA | sort -u | comm -13 -pipeB
```

![tee 를 사용해 방향 전환을 하는 파이프 구조]( ./tee.svg )


## 참고문헌

- 패턴 지향 소프트웨어 아키텍처 Volume 1 / Frank Buschmann 외 / 김지선 역 / 지앤선(志&嬋) / 발행 2008년 01월 18일

## 주석

[^posa-59]: 패턴 지향 소프트웨어 아키텍처 Volume 1. 2장. 59쪽.
[^posa-65]: 패턴 지향 소프트웨어 아키텍처 Volume 1. 2장. 65쪽.
[^posa-71]: 패턴 지향 소프트웨어 아키텍처 Volume 1. 2장. 71쪽.