---
layout  : wiki
title   : 구글링하는 방법
summary : 구글 및 여러 검색 서비스 사용법
date    : 2017-12-23 18:23:50 +0900
updated : 2018-12-09 21:57:55 +0900
tag     : google twitter facebook
toc     : true
public  : true
parent  : how-to
latex   : false
---
* TOC
{:toc}

# Google

구글 검색하는 방법.

## 기본 정보

* 구글 검색은 대소문자를 구별하지 않는다.
* 구글 검색어는 32단어로 제한되어 있다.
    * 검색: [33 개의 단어로 검색한 결과](https://www.google.co.kr/search?q=1+2+3+4+5+6+7+8+9+10+11+12+13+14+15+16+17+18+19+20+21+22+23+24+25+26+27+28+29+30+31+32+33&oq=1+2+3+4+5+6+7+8+9+10+11+12+13+14+15+16+17+18+19+20+21+22+23+24+25+26+27+28+29+30+31+32+33 ) - '검색어는 32 단어로 제한됩니다.' 라는 안내 문구가 나온다.

## `""` 따옴표 안의 문자열과 정확히 일치하는 결과 검색

검색: [library keeper](https://www.google.co.kr/search?q=library+keeper )

* 17,200,000개의 검색 결과가 나온다.
* 첫 번째 검색 결과의 타이틀이 "Librarian"이다.

검색: ["library keeper"](https://www.google.co.kr/search?q=%22library+keeper%22 )

* 23,900개의 검색 결과가 나온다.
* 첫 번째 검색 결과의 타이틀이 "library-keeper - definition and meaning - Wordnik"이다.

## `-` 특정 단어 제외

검색: [library -keeper](https://www.google.co.kr/search?q=library+-keeper&oq=library+-keeper )

* `keeper`가 제외된 검색 결과가 나온다.

## `site:` 특정 사이트 검색

검색: [site:twitter.com library keeper](https://www.google.co.kr/search?q=site%3Atwitter.com+library+keeper&oq=site%3Atwitter.com+library+keeper )

* twitter.com에서 `library keeper`를 검색한 결과가 나온다.

# Twitter

트위터 검색하는 방법.

## 고급 검색

* <https://twitter.com/search-advanced > - 여기서 검색하면 된다.

## min_retweets

* 최소 리트윗 수 검색

```
starwars min_retweets:1000
```

위와 같이 검색하면 `starwars`가 들어간 트윗 중 1000 회 이상 리트윗된 트윗을 찾는다.

# Facebook

페이스북 검색하는 방법.

* 페이스북 기본 검색은 매우 구리다. 원하는 걸 정확히 찾아본 적이 별로 없다.

## URL 편집으로 검색

* 주의: 공개 설정에 내가 해당되지 않는다면 해당 인물이 조회되지 않는다.

### 이름으로 찾기

* 페이스북이 실명 표기를 정책으로 삼고 있기 때문에 사용할 수 있는 방법.
* 해당 이름을 가진 사람의 목록을 보는 가장 쉬운 방법은 다음과 같이 URL을 편집하는 것이다.

```
https://www.facebook.com/search/str/{ 사람 이름 }/users-named
```

위와 같이 검색하면 페이스북 검색어 입력칸에 다음과 같이 나온다(한글로 입력해도 된다).

`People named "사람 이름"`

그러나 `""`안을 편집해서 검색해 보면 똑같은 검색결과가 나오지 않는다는 것을 알 수 있다. 그냥 URL을 편집하자.

### 직업/회사직원 찾기

* 자기소개의 직업/직장에 작성한 명칭을 기반으로 검색하는 방법이다.
* 띄어쓰기가 필요하다면 `%20`을 써주면 된다.
* 마지막의 `present`를 `past`로 바꾸면 해당 직업을 그만두었거나 퇴사한 사람들의 목록도 볼 수 있다.

```
https://www.facebook.com/search/str/{ 회사 또는 직업 }/pages-named/employees
https://www.facebook.com/search/str/{ 회사 또는 직업 }/pages-named/employees/present    # 현재
https://www.facebook.com/search/str/{ 회사 또는 직업 }/pages-named/employees/past       # 과거
```

예를 들어, 자기소개의 직업이나 직장에 "페이스북"을 명시한 사람들을 찾는다면 다음과 같이 조회할 수 있다.

* [https://www.facebook.com/search/str/페이스북/pages-named/employees/present](https://www.facebook.com/search/str/페이스북/pages-named/employees/present )

프로그래머를 찾는다면 다음과 같이 조회할 수 있다.

* [https://www.facebook.com/search/str/programmer/pages-named/employees/present](https://www.facebook.com/search/str/programmer/pages-named/employees/present )

최근 "스타워즈: 라스트 제다이"가 개봉했다는 사실이 떠올라 은퇴한 제다이 나이트를 자칭하는 사람도 있을까 싶어 조회해 보았더니 꽤 많다.

* [https://www.facebook.com/search/str/jedi%20knight/pages-named/employees/past ](https://www.facebook.com/search/str/jedi%20knight/pages-named/employees/past )

### 지역 검색하기

* 아래와 같이 검색하면 해당 지역에 거주하고 있는 사람들의 목록을 볼 수 있다.

```
https://www.facebook.com/search/str/{ 지역이름 }/pages-named/residents
https://www.facebook.com/search/str/{ 지역이름 }/pages-named/residents/present
https://www.facebook.com/search/str/{ 지역이름 }/pages-named/residents/past
```

다음과 같이 조회하면 서울 사람들이 나온다.

* [https://www.facebook.com/search/str/%EC%84%9C%EC%9A%B8/pages-named/residents/present](https://www.facebook.com/search/str/%EC%84%9C%EC%9A%B8/pages-named/residents/present )

방문자 조회도 가능하다.

```
https://www.facebook.com/search/str/{ 지역이름 }/pages-named/visitors
https://www.facebook.com/search/str/{ 지역이름 }/pages-named/visitors/present
https://www.facebook.com/search/str/{ 지역이름 }/pages-named/visitors/past
```

### 특정 언어 사용자 검색하기

```
https://www.facebook.com/search/str/{ 언어 }/pages-named/speakers
```

한국어 사용자를 조사한다면 다음과 같이 할 수 있다.

* [https://www.facebook.com/search/str/korean/pages-named/speakers](https://www.facebook.com/search/str/korean/pages-named/speakers )

### 좋아요 검색하기

* 특정 주제에 대해 "좋아요"를 누른 사람들의 목록을 볼 수 있다.

```
https://www.facebook.com/search/str/{ 주제 }/pages-named/likers
```

수학 관련 페이지에 좋아요를 누른 사람들을 찾아보았다.

* [ https://www.facebook.com/search/str/mathematics/pages-named/likers ]( https://www.facebook.com/search/str/mathematics/pages-named/likers )

### 학생 검색하기

특정 교육기관에 student로 다니는 사람을 검색하려면 다음과 같이 할 수 있다.

```
https://www.facebook.com/search/str/{ 학교 }/pages-named/students
https://www.facebook.com/search/str/{ 학교 }/pages-named/students/present
https://www.facebook.com/search/str/{ 학교 }/pages-named/students/present
```

techers는 해 보니까 안 되었는데, 이유를 생각해보니 직업으로 찾을 수 있기 때문인듯.


### intersect로 AND 검색하기

특정 회사에 다니는 어떤 사람을 찾는다면 다음과 같이 조회할 수 있다.

```
https://www.facebook.com/search/str/사람이름/users-named/str/회사이름/employees/present/intersect
```

사람 이름과 나이 범위로 검색한다면 다음과 같이 조회할 수 있다.

```
https://www.facebook.com/search/str/{ 사람 이름 }/users-named/str/{ MIN 나이 }/{ MAX 나이 }/users-age-2/intersect
```

# Links

* [Google 검색 고객센터 - Google에서 검색하는 방법](https://support.google.com/websearch/answer/134479?hl=ko )
* [Google 검색 고객센터 - 더 정확한 웹 검색결과 얻기](https://support.google.com/websearch/answer/2466433 )
* [Facebook People Search: 5 Tips for Getting Started](https://netbootcamp.org/facebookpeoplesearchtips/ )

