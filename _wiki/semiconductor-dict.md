---
layout  : wiki
title   : 반도체 산업 용어 정리
summary : 산업도 이해하고 싶다
date    : 2020-12-05 14:24:43 +0900
updated : 2020-12-06 11:35:51 +0900
tag     : 반도체 용어
toc     : true
public  : true
parent  : [[index]]
latex   : false
---
* TOC
{:toc}

## 용어
### 데너드 스케일링(Dennard Scaling)
- 트랜지스터의 크기와 관계 없이 집적된 면적당 사용하는 전력은 같다는 법칙.

### EUV
- EUV(Extreme Ultra Violet), 극자외선
    - 124 ~ 10 nm 사이의 파장.
    - 광원으로서, 대기에도 흡수가 되고, 렌즈를 사용할 수도 없어 출력을 높이기 어렵다.

### Fab
- 팹(Fab, Fabrication)
    - 반도체 제조 공장.

### Fabless
- 팹리스(Fabless)
    - 공장 없이 설계만 하는 반도체 회사.

### Foundry
- 파운드리(Foundry)
    - 팹리스에게 설계도를 받아 반도체 제조, 생산만 하는 업체
    - TSMC 등

### 노광기
- 노광기(Exposurer)
    - 반도체 회로를 그리는 데 사용하는 기계.
    - 작업 대상을 광원에 노출시키는 데 사용하는 기계.

### 반도체 제품

![]( /post-img/semiconductor-dict/10602_4229_4327.jpg )

[출처]( http://www.msdkr.com/news/articleView.html?idxno=10602 )

#### 시스템 반도체와 메모리 반도체

- 시스템 반도체(System Semiconductor)
    - 연산이나 제어를 목적으로 하는 반도체
    - CPU, MPU

- 메모리 반도체(Memory Semiconductor)
    - 데이터 저장을 목적으로 하는 반도체
    - DRAM, SRAM, NAND flash

#### DRAM(Dynamic RAM)
- 1개의 트랜지스터와 1개의 저장장치로 구성된 형태의 메모리.
- 전력을 인가해도 시간이 지나가면 데이터가 날아가므로 주기적으로 리프레시해줘야 한다.
- nm 공정
    - 반도체 공정은 셀에 들어가는 트랜지스터의 gate 선폭에 따라 25nm, 20nm 등으로 부른다.
    - DRAM의 게이트 선폭이 축소되면 셀 사이즈가 감소하여 많은 장점을 얻게 된다.
        - 원가 절감, 데이터 처리 속도 향상, 전력 소모 감소…
        - DRAM은 미세 공정 기술이 핵심이다.

#### 캐패시터(Capacitor)
- 전하를 저장하는 기기.
- DRAM에서 데이터 1 비트를 저장하는 데 사용.

#### O-S-D
- 광전자공학(optoelectronics), 센서(Sensor), 디스크리트(Discretes)
- 디스크리트(Discrete) 소자
    - 다이오드(Diode), 트랜지스터(Transistor) 등.
    - On/Off 와 같이 단순한 기능을 하는 제품.

#### IC
- 집적회로(integrated circuit) 반도체
- 수십억 개의 전자부품, 디스크리트 소자를 한 개의 칩 속에 집적한 형태.
- CPU, GPU, PMIC(Power Management IC), CIS(CMOS Image Sensor), FPGA, DDI 등
- 최소한의 소자를 이용해서 세트업체가 요구하는 스펙을 충족시키는 설계 능력이 중요.

#### 패키지(Package)
- 완성된 칩을 검은색 플라스틱에 넣어서 만든 제품.
- 완제품인 경우도 있고, 다른 PCB에 연결될 수도 있다.

### 기구, 협회

- [WSTS(World Semiconductor Trade Statistics)]( https://www.wsts.org/ )
    - 세계 반도체 무역 시장 통계 기구.
    - 1986년 비영리 단체로 설립.
    - 업계에서 유일하게 월간 산업 출하 통계를 낸다.
- [KSIA]( https://www.ksia.or.kr/ )
    - 한국 반도체 산업 협회
    - [Silicon Times]( https://www.ksia.or.kr/infomationKSIA.php?data_tab=2 )를 격주로 발간한다

## 참고문헌

- 반도체 제국의 미래 / 정인성 저 / 이레미디어 / 초판 4쇄 2020년 6월 24일

