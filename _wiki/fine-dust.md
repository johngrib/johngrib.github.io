---
layout  : wiki
title   : 미세먼지 정보 모음
summary : 미세먼지 대응에 대한 나의 노하우를 기록한다
date    : 2018-03-24 11:07:17 +0900
updated : 2018-04-02 21:13:51 +0900
tag     : tools 미세먼지
toc     : true
public  : true
parent  : useful-site
latex   : true
---
* TOC
{:toc}

## 정보

### 용어 및 개념 정리

* $$PM$$ - Particulate Matter.
    * 미세먼지. 분진이라고도 한다.
    * 입경 `10μm` 이하의 아황산가스, 질소 산화물, 납, 오존, 일산화 탄소 등을 포함하는 대기오염 물질을 말한다.
    * 학술 용어로는 미세먼지가 아니라 에어로졸(aerosol)이라 한다.
    * 70μm 부터는 중력의 영향으로 땅에 떨어진다.
* $$PM10$$ - Particle Matter 10㎛.
    * 직경 10㎛ 이하 먼지의 농도.
    * PM10부터 **미세먼지**라고 부른다.
    * 한국에서는 1995년부터 측정을 시작하였다.
* $$PM2.5$$ - Particle Matter 2.5㎛.
    * 직경 2.5㎛ 이하 먼지의 농도.
    * PM2.5부터 **초미세먼지**라고 부른다.
    * 한국에서는 2015년부터 측정을 시작하였다,
* $$μg/m^3$$ - 단위부피당 질량
* $$μg$$ - 마이크로 미터.
    * $$1×10^{−6}$$ 미터.
    * 즉 1 마이크로미터는 `0.000001` 미터이며 `0.001` 밀리미터이다.

### 거짓 : 옛날엔 미세먼지 없었는데 요즘 들어 심해졌다

**사실 : 옛날이 더 심했다.**
예전엔 미세먼지가 심각해도 단순 황사라고 생각하며 대수롭지 않게 여겼던 것.

다음 표를 보면 PM10의 경우 변동폭을 감안해도 감소 추세임을 알 수 있다.

![pm10 statistics](/post-img/2018/pm10data.png)

출처 : [e-나라지표 : 주요 도시 대기오염도](http://www.index.go.kr/potal/main/EachDtlPageDetail.do?idx_cd=2789#nv20_chart)

### WHO 권장 기준

[WHO 가이드라인(2005년)](http://apps.who.int/iris/bitstream/handle/10665/69477/WHO_SDE_PHE_OEH_06.02_eng.pdf;jsessionid=C7B45C293E04454D05199B047BFCC917?sequence=1 )를 읽어보면 다음의 수치를 권장하고 있음을 알 수 있다.

|       | 24시간       | 1년간        |
|-------|--------------|--------------|
| PM2.5 | $$10µg/m^3$$ | $$25µg/m^3$$ |
| PM10  | $$20µg/m^3$$ | $$50µg/m^3$$ |

즉, 24시간 동안 노출되는 PM2.5 초미세먼지의 평균 단위부피당 질량이 $$10µg/m^3$$를 넘어서지 않는 것이 건강에 이롭다.


### 필터 등급에 대하여

[NIOSH Guide to the Selection and Use of Particulate Respirators](https://www.cdc.gov/niosh/docs/96-101/default.html)에 의하면
위의 표에 있는 `N95`, `P100` 과 같은 용어의 접두어 의미는 다음과 같다.

* `N` for Not resistant to oil : 오일 입자(윤활제, 절삭유, 글리세린 등) 저항 없음.
* `R` for Resistant to oil : 오일 입자에 저항 있음.
* `P` for oil Proof : 오일 입자 면역(`R`보다 강력함).

또한, NIOSH의 필터 등급은 다음과 같다.

| 클래스 | 효율(%) | 오염 물질 유형                                  |
|--------|---------|-------------------------------------------------|
| N100   | 99.97   | 고체 및 수성 미립자(비 오일 에어로졸: 미세먼지) |
| N99    | 99      | ..                                              |
| N95    | 95      | ..                                              |
| R100   | 99.97   | 모든 오염 물질                                  |
| R99    | 99      | ..                                              |
| R95    | 95      | ..                                              |
| P100   | 99.97   | 모든 오염 물질                                  |
| P99    | 99      | ..                                              |
| P95    | 95      | ..                                              |

* 위의 등급을 부여받기 위해서는 여러 조건을 만족해야 하며, 테스트 기준이 되는 미세 입자의 사이즈는 **0.3μm**이다.
* 따라서 PM2.5를 걱정하고 있다면 `N`, `R`, `P` 중 아무거나 선택하면 된다.


## 오늘의 미세먼지 농도를 직접 알아보기

### 웹사이트

* [EarthWindMap](https://earth.nullschool.net/#current/particulates/surface/level/overlay=pm2.5/orthographic=-231.08,37.26,1646 )
    * 미세먼지의 움직임, 바람의 방향, 해류의 흐름, 오로라(space 옵션) 등을 지구본에서 실시간으로 볼 수 있다.
    * **화면이 굉장히 아름답다.** 남는 태블릿 pc가 있다면 전자액자로 띄워 놓는 것도 좋을 것 같다.

* [AQICN](http://aqicn.org/nearest/kr)
    * 미세먼지 세계지도를 볼 수 있다.
    * 한/중/일을 비교하기 편리하다.
    * 북유럽, 북미, 오스트레일리아의 공기가 거의 언제나 좋다는 것도 알 수 있다.
    * 단, PM 2.5 값에 대해 자체적인 수치를 표시하고 있으므로, 숫자보다는 **주위 다른 지역과의 비교**를 위해 보는 것이 좋다.

* [tenki.jp/particulate_matter](http://www.tenki.jp/particulate_matter/)
    * 일본 기상협회 미세먼지 예측 시스템.
    * 들어가서 동영상 재생 버튼을 눌러 보면, 한/중/일 지도 위에 **기준 시간부터 48 시간 이후까지의 대기중 미세먼지 농도 변화를 색깔로 보여 준다**.
    * 내일이 괜찮을지 궁금할 때 들어가서 보면 좋다.

### 스마트폰 애플리케이션

수많은 앱이 있지만 다음의 두 앱을 사용하고 있다.

* 창문닫아요
    * 환경부 기준과 WHO 기준을 선택해 볼 수 있다.
    * WHO 기준이 더 엄격하므로, WHO로 설정해서 사용하자.
    * "전세계" 버튼을 클릭하면 [AQICN](http://aqicn.org/nearest/kr) 지도를 보여준다는 점이 좋다.
    * 다운로드 링크 : [App Store](https://itunes.apple.com/kr/app/%EC%B0%BD%EB%AC%B8%EB%8B%AB%EC%95%84%EC%9A%94/id1036031815?mt=8), [Google Play](https://play.google.com/store/apps/details?id=com.dkworks.simple_air&hl=ko)
* 미세미세
    * WHO 기준이 기본 설정이다.
    * UI가 알기 쉽고 사용하기도 편리하다.
    * 아래로 스크롤하면 일별/시간별 예보도 함께 볼 수 있다.
    * 다운로드 링크 : [App Store](https://itunes.apple.com/kr/app/%EB%AF%B8%EC%84%B8%EB%AF%B8%EC%84%B8-%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80-%EC%B4%88%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80/id1091911730?mt=8), [Google Play](https://play.google.com/store/apps/details?id=cheehoon.ha.particulateforecaster&hl=ko)

### 봇

* 미세즈눅 : [@x_nuk](https://twitter.com/x_nuk) 님이 만든 미세먼지 알림봇.
    * 트위터에 `미세즈눅 서울`, `미세즈눅 수원`과 같이 글을 쓰면 봇이 해당 지역에 대한 미세먼지 정보를 멘션으로 달아준다.
    * **트잉여에게 유용.**

## 측정기

집에 민감한 측정기가 있으면 매우 유용하다.

나는 어웨어와 샤오미 PM2.5 측정기를 사용하고 있다.

다음은 내가 지난 1.5 년간 미세먼지 측정기와 공기청정기를 함께 사용하면서 얻게 된 노하우이다.

* 미세먼지 수치가 높은 날인데, 집 안의 공기도 나쁜 것 같다. 환기를 해야 할까?
    * 일단 마스크를 쓰고 창문을 2~3분 정도 열어본다.
    * 미세먼지 수치가 올라가는지 내려가는지를 확인한다.
    * 수치가 올라갔다면 집 밖의 공기가 집 안의 공기보다 나쁜 것이다. 얼른 창문을 닫는다.
    * 수치가 내려갔다면 환기를 통해 이득을 보고 있는 것이다. 30분 뒤에 다시 확인한다.

* 집에서 생활하다가 문득 측정기 수치를 본다.
    * 어떤 활동이 집안 미세먼지를 증가시키는지를 구체적으로 알게 된다.
    * 청소, 요리 등등.
    * 숫자가 막 올라가고 있다면 자연히 창문을 열게 된다.

* 창문을 꽉 닫아두어도 바깥 공기가 안 좋으면 집안 미세먼지 농도도 평소보다 높다는 것을 알게 된다.
    * 바깥 미세먼지 농도가 높으면 평소보다 공기청정기를 강하게 돌리는 등의 조치를 하게 된다.
    * 불을 적게 쓰는 요리를 선택하게 된다.


### AWAIR

[AWAIR](https://getawair.com/pages/ko-how-it-works) - 어웨어

* 가격은 약 20만원 정도.
* 트위터 계정[@getawair](https://twitter.com/getawair)도 운영중.

장점

* 미세먼지 외에, 온도, 습도, 이산화탄소 농도, 화학물질 농도 등을 함께 표시해준다.

* 공기 상태를 어플로 확인 가능.
    * 어웨어를 여러 개 갖고 있어도 어플 하나로 모든 장비의 수치를 확인 가능하다.
    * 거실, 현관, 아이 방...과 같이 여러 방을 어플로 관리 가능하다는 점이 좋다.

* 이산화탄소 센서가 예민하다.
    * 어웨어 앞에서 두 사람이 이야기를 하면 이산화탄소 농도가 조금씩 올라가는 것을 볼 수 있다.
    * 먼지 외에 이산화탄소도 환기의 목표로 삼게 된다.

* 화학물질 센서를 통해 많은 것을 깨닫게 된다.
    * 처음 어웨어를 사면 화학물질 수치가 최소값으로 나오는데 며칠 지나면서부터 정확한 측정값이 나오기 시작한다.
    * 측정값이 생각보다 높아서 이를 개선하기 위해 집안을 다시 돌아보게 된다는 장점이 있다.
    * 집 안의 쓰레기통을 뚜껑이 달린 것으로 바꾸기만 해도 수치가 꽤 내려간다.
    * 재활용 쓰레기 등을 모아두기만 해도 화학물질 수치가 꽤 올라간다. (쓰레기를 버리고 돌아오면 수치가 내려가고 있음)
    * 집 안에 스티로폼이 있으면 스티로폼을 치워보자. 수치가 내려간다.
    * 빨래를 집 안에 너는 것보다 집 밖이나 베란다에 너는 쪽이 바람직하다는 것을 알게 된다.

* 어플을 설치하지 않아도 장비 앞면의 그래프와 점수로 상태를 확인할 수 있다.

단점

* 수치가 분 단위로 바뀐다.

* 미세먼지 센서가 PM2.5가 아니라 PM10 용인 것 같다.
    * PM2.5 측정기와 함께 쓰면서 알게 된 것이다.

* 1년 이상 쓰면 미세먼지 수치 최소값이 점점 올라간다.
    * 센서에 먼지가 끼기 때문이다.
    * 서비스 센터가 없어 AS를 받을 수 없다.
    * 분해하지 않고 먼지 청소 스프레이로 직접 청소하는 것을 권장하지만 권장 방법으로는 큰 효과가 없다.
    * 어쩔 수 없이 분해해서 청소해야 하는데 아직 안 해봤다. 조만간 해 볼 생각.

* 어플을 설치하지 않으면 각 항목의 정확한 수치를 알 수 없다.

### 샤오미 PM 2.5 측정기

* 가격은 약 5~6만원 정도.
* 다른 기능은 없고 PM 2.5 만 보여준다.
* [알리 익스프레스](https://ko.aliexpress.com/wholesale?catId=0&initiative_id=SB_20180323182956&SearchText=%EC%83%A4%EC%98%A4%EB%AF%B8+pm2.5)에서 쉽게 구매할 수 있다.
    * 단, 무료 배송을 선택하면 약 3~4주의 배송 기간을 기다려야 한다.

장점

* 초 단위로 수치가 변화한다. 환기를 하면 빠르게 변화를 알 수 있다.
* PM 2.5 하나만 보여준다.
* 사이즈가 작다. 가로/세로/높이 6.4cm * 3.5cm * 6.3cm 정도.

* 충전식이라, 충전해두면 전원을 연결하지 않아도 사용할 수 있다.
    * 지하철이나 자동차에서도 미세먼지 상태를 볼 수 있다.
    * 평범한 안드로이드 스마트폰 충전 케이블을 연결하면 충전된다.

* 내부에 작은 팬이 있어, 센서에 끼는 먼지를 스스로 청소한다.
    * 즉 AS가 거의 필요 없다.
    * 1년 이상 사용해도 청소할 필요를 못 느낌.

* 전면 패널에 커다란 숫자로 미세먼지 농도를 표기해준다.

* 어플을 설치하지 않아도 사용에 아무런 문제가 없다.

단점

* PM 2.5 하나만 보여준다. (장점이자 단점)
* 샤오미 어플로 지난 이력을 조회할 수 있지만, 샤오미 어플은 기본 언어가 중국어이다.

## 공기청정기

공기청정기를 구매하고 약 2년간 사용하면서 다음과 같은 생각을 하게 되었다.

* 가장 싸구려 공기청정기를 가동한다 해도, 가동되는 동안은 공기가 정화된다.
* 그렇다면 어떤 공기청정기를 사용한다 해도 해당 공기청정기를 최대한 활용해 집안 공기를 정화하는 방법은 24시간 가동하는 것이다.
* 24시간 가동할 때의 가장 큰 문제점은 뭘까?
    * 전기 요금.
    * 소음.

따라서, 가격이 비슷한 공기청정기 중에서 고민한다면, 소음이 가장 적은 공기청정기를 구매하는 쪽이 좋다고 생각한다.

공기도 공기지만 사람이 생활을 해야 하기 때문이다. 집안에 소음이 너무 많으면 스트레스를 받는다.

우리 부부가 구매한 공기청정기는 [발뮤다 에어엔진](http://www.balmuda.co.kr/shop/goods/goods_list.php?&category=001).

약 50만원 정도로 구매했는데, 처음엔 비싸다고 생각했지만 굉장히 조용해서 아내의 선택에 감사하고 있다.

한편 발뮤다 에어엔진은 조용한 공기청정기 제품들 중에선 값싼 편에 속한다는 것도 나중에 알게 되었다.


다음은 우리 부부가 추가로 구매하고 싶었지만 비용 문제로 아직 구매하지 못한 공기청정기들이다.

* [블루 에어](http://blueairkorea.co.kr/shop/main/html.php?htmid=setGoods/air.htm)
* [아이큐 에어](https://www.iqair.co.kr/productDetail)


## 마스크

* 마스크는 모든 미세먼지를 막지는 못하지만 호흡시 들이마시게 되는 미세먼지의 양을 많이 줄일 수 있다.
* 아무리 좋은 마스크라도 쓰고 바깥에 나가는 것보다, 공기청정기를 강하게 돌리고 있는 집 안에 있는 쪽이 대부분의 경우에 더 낫다.
* 미세먼지 농도가 심한 날엔 집 안에서도 마스크를 쓰는 것도 고려해야 한다.

3M의 보고서 [TO WHOMSOEVER IT MAY CONCERN Respirators for protection against PM2.5](https://multimedia.3m.com/mws/media/1313143O/respirators-for-protection-agains.pdf )
를 읽어보면 다음과 같은 표를 볼 수 있다.

**PM2.5와 PM10 방지용 3M(TM) 마스크 가이드**

![mask guide](/post-img/2018/mask-guide.jpg)

* 이 보고서에서 추천하는 미세먼지 마스크는 5 종이다.
    * `8511`, `8210`, `9322+`, `9332+`, `8822`
    * 옥션이나 지마켓 등에서 `3M 8511 마스크`와 같이 검색하면 아주 잘 나온다.
* 잘 모르겠으면 [NIOSH](https://www.cdc.gov/niosh/index.htm) N95 인증을 받은 마스크를 선택한다.

### 일회용 마스크

N95 정도가 적절하다.

* [3M 9105 N95 VFlex Particulate Respirator Regular 50 Box](https://www.amazon.com/gp/product/B005KLZAYU/ref=oh_aui_detailpage_o00_s00?ie=UTF8&psc=1 )
    * 50개에 25달러 정도로, 2박스 정도 사두면 거의 1년간 쓸 수 있다.

### 내가 쓰는 마스크


위의 3M 추천 마스크는 모두 1회용이라는 단점이 있다.

<iframe width="auto" height="auto" src="https://www.youtube.com/embed/bTBgIObKP9E" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

* [3M 6500 마스크 시리즈](https://www.3m.com/3M/en_US/worker-health-safety-us/personal-protective-equipment/half-face-respirator/ )
    * 다른 마스크가 1회용이므로 계속 쓸 수 있는 마스크를 둘 사서 아내와 함께 쓰고 있다.
    * 이 마스크에 정화통 + 필터 결합용 리테이너 + [5N11 필터(NIOSH 인증을 받은 N95)](https://multimedia.3m.com/mws/media/251905O/particulate-filer-5n11-n95.pdf )를 끼우면 된다.
    * 실내에서는 이거 하나로 해결.
    * 실외에서 쓰고 다니면 폰으로 내 사진을 찍어가는 사람들이 있으니 주의.

이런 종류의 마스크의 사용을 고려한다면 다음 문서를 열심히 읽도록 한다.

* [6000시리즈 반면형 호흡보호구 사용설명서](https://github.com/johngrib/johngrib.github.io/files/1865106/6200.Facepice.Manual.ko.pdf)

다음은 위의 사용설명서에서 방진 필터 정보만을 골라낸 것이다.


| 제품 번호 | 제품 설명                                                                                                                 | 한국산업안전보건공단 인증 규격형식 및 용도 |
|-----------|---------------------------------------------------------------------------------------------------------------------------|--------------------------------------------|
| 5N11      | N95 Particulate Filter (N95 필터)                                                                                         | 1 급 방진필터                              |
| 5P71      | P95 Particulate Filter(P95 필터)                                                                                          | 1 급 방진필터                              |
| 2071      | P95 Particulate Filter(P95 필터)                                                                                          | 1 급 방진필터                              |
| 2078      | P95 Particulate Filter, 3M recommended for ozone protection, with nuisance level organic vapor/acid gas relief (P95 필터) | 1 급 방진필터                              |
| 2091      | P100 Particulate Filter (P100 필터)                                                                                       | 특급 방진필터                              |
| 2097      | P100 Particulate Filter, 3M recommended for ozone protection, with nuisance level organic vapor relief (P100 필터)        | 특급 방진필터                              |
| 7093      | P100 Particulate Filter (P100 필터)                                                                                       | 특급 방진필터                              |


### 내가 쓰는 마스크 모듈

* [603 아답터](https://multimedia.3m.com/mws/media/573889O/3m-6000-series-respirator-filter-adapter-603.pdf )
    * 마스크에 5N11 필터를 끼울 수 있게 해주는 아답터이다.
    * 가격은 2 개에 4000~5000원 정도.
* [5N11 필터](http://www.respiratormaskprotection.com/data-sheets/3m-5n11-n95-technical-info.pdf )
    * NIOSH N95 인증을 받은 미세먼지 필터.
    * 가격은 하나에 1200~1500원 정도.

* [3M 501 리테이너](https://solutions.3m.com/wps/portal/3M/en_EU/PPE_SafetySolutions_EU/Safety/Product_Catalogue/~/3M-Pre-Filter-Retainer-501?N=5548169+3292402977+3294857473&rt=rud )
    * 아답터에 필터를 올리고, 리테이너를 끼워 고정시키면 된다.
    * 가격은 하나에 1000원 정도.

* [3M 2091, P100 필터](http://multimedia.3m.com/mws/media/5189O/particulate-filter-2091-p100.pdf?&fn=3026_2091P100Filter.pdf)
    * 마스크에 바로 끼울 수 있다. 즉, 아답터나 리테이너가 필요 없다.


### 나의 모듈 조합

[3M Filter Selection](https://github.com/johngrib/johngrib.github.io/files/1865121/Filter.Selection.Sheet.CHFILTERFITSheet.pdf ) 문서를 참고하면 된다.

* 3M 6500 마스크 + 603 아답터 + 5N11 필터 + 501 리테이너 - N95 이므로 PM0.3을 95% 차단.
* 3M 6500 마스크 + 2091, P100 필터 - P100 이므로 PM0.3과 오일 입자를 99.97% 차단.
* 3M 6500 마스크 + 2291, P100 필터 - P100 이므로 PM0.3과 오일 입자를 99.97% 차단.


## Links

* 미세먼지 자료 관련 사이트
    * [Particulates(wikipedia)](https://en.wikipedia.org/wiki/Particulates)
    * [WHO Air quality guidelines for particulate matter, ozone, nitrogen dioxide and sulfur dioxide](http://apps.who.int/iris/bitstream/handle/10665/69477/WHO_SDE_PHE_OEH_06.02_eng.pdf;jsessionid=C7B45C293E04454D05199B047BFCC917?sequence=1) - WHO 공기 질 가이드라인 - 미세먼지, 오존, 이산화질소, 이산화황에 대하여.
    * [e-나라지표 : 주요 도시 대기오염도](http://www.index.go.kr/potal/main/EachDtlPageDetail.do?idx_cd=2789#nv20_chart)
    * [EarthWindMap](https://earth.nullschool.net/#current/particulates/surface/level/overlay=pm2.5/orthographic=-231.08,37.26,1646 )
    * [AQICN](http://aqicn.org/nearest/kr)
    * [tenki.jp/particulate_matter](http://www.tenki.jp/particulate_matter/)
    * [@x_nuk](https://twitter.com/x_nuk)님 트위터
* 스마트폰 애플리케이션
    * 창문닫아요 : [App Store](https://itunes.apple.com/kr/app/%EC%B0%BD%EB%AC%B8%EB%8B%AB%EC%95%84%EC%9A%94/id1036031815?mt=8), [Google Play](https://play.google.com/store/apps/details?id=com.dkworks.simple_air&hl=ko)
    * 미세미세 : [App Store](https://itunes.apple.com/kr/app/%EB%AF%B8%EC%84%B8%EB%AF%B8%EC%84%B8-%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80-%EC%B4%88%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80/id1091911730?mt=8), [Google Play](https://play.google.com/store/apps/details?id=cheehoon.ha.particulateforecaster&hl=ko)
* 측정기
    * [AWAIR](https://getawair.com/pages/ko-how-it-works )
        * 트위터 계정 [@getawair](https://twitter.com/getawair)
    * [샤오미 PM2.5 측정기(알리 익스프레스)](https://ko.aliexpress.com/wholesale?catId=0&initiative_id=SB_20180323182956&SearchText=%EC%83%A4%EC%98%A4%EB%AF%B8+pm2.5 )
* 공기청정기
    * [발뮤다 에어엔진](http://www.balmuda.co.kr/shop/goods/goods_list.php?&category=001 )
    * [블루 에어](http://blueairkorea.co.kr/shop/main/html.php?htmid=setGoods/air.htm)
    * [아이큐 에어](https://www.iqair.co.kr/productDetail)
* 마스크
    * [6000시리즈 반면형 호흡보호구 사용설명서](https://github.com/johngrib/johngrib.github.io/files/1865106/6200.Facepice.Manual.ko.pdf) - [원본 링크](http://innovation.3m.co.kr/safety/jsp/download.jsp?FileOld=6200%20Facepice%20Manual.pdf&FileNew=ohnes_2015012013121433.pdf )
    * [TO WHOMSOEVER IT MAY CONCERN Respirators for protection against PM2.5](https://multimedia.3m.com/mws/media/1313143O/respirators-for-protection-agains.pdf )
    * [3M 6500 마스크 시리즈](https://www.3m.com/3M/en_US/worker-health-safety-us/personal-protective-equipment/half-face-respirator/ )
    * [603 아답터](https://multimedia.3m.com/mws/media/573889O/3m-6000-series-respirator-filter-adapter-603.pdf )
    * [5N11 필터](https://multimedia.3m.com/mws/media/251905O/particulate-filer-5n11-n95.pdf )
    * [3M 501 리테이너](https://solutions.3m.com/wps/portal/3M/en_EU/PPE_SafetySolutions_EU/Safety/Product_Catalogue/~/3M-Pre-Filter-Retainer-501?N=5548169+3292402977+3294857473&rt=rud )
    * [3M Filter Selection](https://github.com/johngrib/johngrib.github.io/files/1865121/Filter.Selection.Sheet.CHFILTERFITSheet.pdf ) - [원본 링크](http://multimedia.3m.com/mws/media/439882O/3mtm-filter-fitting-data-sheet.pdf )


