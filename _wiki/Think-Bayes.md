---
layout  : wiki
title   : (책) 파이썬을 활용한 베이지안 통계
summary : 동전 던지기와 하키 승률로 배우는 데이터 분석
date    : 2018-04-08 23:07:56 +0900
updated : 2018-04-24 20:48:05 +0900
tag     : Think-Bayes bayes
toc     : true
public  : true
parent  : book
latex   : false
---
* TOC
{:toc}

# 개요

* 권정민 님의 번역서.
* 짬짬이 읽고 있는 중.

# 예제 코드 실행 환경 구축


* 예제 코드는 python2로 작성되어 있다.
* 예제 코드는 [github.com/ThinkBayes2](https://github.com/AllenDowney/ThinkBayes2 )에서 받을 수 있다.
    * 본래 [github.com/ThinkBayes](https://github.com/AllenDowney/ThinkBayes )였지만, python2 에서만 돌아가고 시간이 흐르면서 이런저런 라이브러리 의존 문제가 발생했음.

```bash
$ git clone https://github.com/AllenDowney/ThinkBayes2.git
```

* matplotlib에 의존성이 있다고 하니 pip로 다음과 같이 설치해주자.

```bash
$ pip install matplotlib
```

# Links

* [파이썬을 활용한 베이지안 통계(한빛출판네트워크)](http://www.hanbit.co.kr/store/books/look.php?p_code=B7186764823 )
* [Think Bayes(Green Tea Press)](http://greenteapress.com/wp/think-bayes/ )
* [matplotlib.org](https://matplotlib.org/ )
    * [install](https://matplotlib.org/users/installing.html )

* [AllenDowney(twitter)](https://twitter.com/AllenDowney )
    * [All code for Think Bayes now works in Python 2 and 3](https://twitter.com/allendowney/status/504349795407118336 ) - 책의 소스코드를 python3 에서도 돌아가게 수정한 버전을 저자가 공지했다.
    * [ThinkBayes2(github.com)](https://github.com/AllenDowney/ThinkBayes2 )
