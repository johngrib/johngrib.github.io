---
layout  : wiki
title   : HTML
summary : 
date    : 2021-02-26 22:32:35 +0900
updated : 2021-04-17 18:44:10 +0900
tag     : language
resource: 4E/479F04-03F3-4F72-A7E4-8B98D1B73D9D
toc     : true
public  : true
parent  : [[language]]
latex   : false
---
* TOC
{:toc}

## HTML의 역사

>
![image]( /resource/4E/479F04-03F3-4F72-A7E4-8B98D1B73D9D/109306749-f667a000-7882-11eb-88fe-0da4aa1c03b2.png )
>
HTML은 1991년 웹의 창시자인 유럽입자물리연구소(CERN)의 팀 버너스-리(Tim Berners-Lee)가 인터넷상의 정보를 표현하는 언어로 개발하였다.
1993년 미국 일리노이 대학의 연구원인 마크 앤드리슨(Marc Andreessen)과 에릭 비나(Eric Bina)가 만든 모자익(Mosaic)이라는 웹브라우저에 의해 보편화되기 시작하였다.
그 후 IETF(Internet Engineering Task Force)에 의해 1995년에 HTML 2.0 이 개발되었다.
이후에 넷스케이프 내비게이터(Netscape Navigator)와 인터넷 익스플로러(Internet Explorer) 등 상업용 브라우저가 개발되고,
1994년 웹 컨소시엄(W3C: World Wide Web Consortium)이 결성되면서 HTML도 빠르게 성장하여 1998년 4월에 4.0 버전이 발표되었다.
HTML은 사용하기 간편한 반면에 사용 가능한 태그가 제한적이고 정교한 페이지를 표현하기에는 기능이 부족하였다.
따라서 HTML 4.0에서는 동적 HTML 문서를 표현하기 위해 스타일시트를 지정하는 CSS 기능과 동적 상호 작용을 위한 코드를 표현하기 위한 자바스크립트 언어가 포함되었다.
그 이후 4.0의 개정판이 1999년에 발표된 HTML 4.01 이며, 이는 2014년 HTML5 가 표준으로 채택되기 전까지 표준으로 사용되어 왔다.
2000년 이후에는 HTML과 XML을 합쳐서 XHTML 1.0 이 등장하였고, W3C 에서는 XHTML 을 차세대 웹 표준으로 강력하게 추진하였지만
널리 사용되고 있는 HTML 에 밀려 좀처럼 보급되지 못하였다.
>
이에 모질라(Mozilla), 애플(Apple), 오페라(Opera) 등의 웹브라우저 개발사들이 2004년에
공동으로 WHATWG(Web Hypertext Application Technology Working Group)라는 공개 커뮤니티를 결성하여
W3C와는 별도로 후속 HTML 모델을 논의하여 상당한 성과를 만들어 냈다.
여기에 자극을 받아 W3C도 2007년부터 참여하여 HTML5를 제정하고 2008년에 초안을 공개하였다.
드디어 2014년 10월에 HTML5 가 HTML 의 차세대 웹 표준으로 W3C에서 채택되어 웹 애플리케이션 개발 플랫폼으로서 활발히 사용되고 있다.
[^LEE-1]

## W3C 권고안의 추진 단계

- **노트(Note)**
    - 기술 문서로 제안하기 위해 제시된 문서
    - 표준화하기 위한 구조나 사항을 기록하여 정리한 문서
- **초안(WD, Working Draft)
    - 아직 완전하지 않은 WG(Working Group)의 아이디어를 정리한 문서
    - FPWD(First Publication Working Draft): 첫번째 초안
    - LC(Last Call Working Draft): 마지막 초안
- **후보 권고안(CR, Candidate Recommendation)**
    - 심사를 거친 작업 최종안
- **제안 권고안(PR, Proposed Recommendation)**
    - 최종적인 권고안이 될 수 있는 전 단계
- **권고안(Recommendation)**
    - W3C에 참여하는 회원들에게 동의를 얻은 표준안
    - 최종적으로 표준화 규격을 정의한 문서

## 참고: 조직

- W3C ( <https://www.w3.org > ): 웹의 장기적인 성장을 보장하기 위한 공개 표준을 개발하는 국제적인 커뮤니티
- WHATWG ( <https://whatwg.org > ): 웹을 통해 애플리케이션을 작성하고 전개할 수 있는 새로운 기술 개발을 위해 만든 공개 커뮤니티

## DOCTYPE

- `<!DOCTYPE>`은 HTML 파일의 최상단에 선언한다.
- 브라우저가 올바르게 웹페이지를 표시할 수 있도록 HTML 버전과 종류를 선언하는 용도.

### HTML5

```
<!DOCTYPE html>
```

### HTML 4.01

```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
```

```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
```

### XHTML 1.0

```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml-transitional.dtd">
```

## 기억해둘만한 태그
### 문서 편집시 내가 자주 사용하는 물리적 표현 태그

참고: [HTML Living Standard]( https://html.spec.whatwg.org/multipage/text-level-semantics.html )

- `<b>`: (비교글자) <b>텍스트를 진하게 표현한다</b>
- `<i>`: (비교글자) <i>텍스트를 이탤릭체로 표현한다</i>
- `<s>`: (비교글자) <s>취소선을 표현한다</s>
- `<u>`: (비교글자) <u>밑줄을 표현한다</u>
- `<sup>`: (비교글자) <sup>윗첨자를 표현한다</sup>
- `<sub>`: (비교글자) <sub>아랫첨자를 표현한다</sub>
- `<small>`: (비교글자) <small>텍스트를 작게 표현한다</small>

### 논리적 표현 태그

- `<strong>`: (비교글자) <strong>중요한 내용</strong>
- `<kbd>`: (비교글자) <kbd>키보드로 입력한 내용을 표현한다. 약간 진한 글자로 나온다.</kbd>
- `<em>`: (비교글자) <em>강조하는 내용</em>
- `<var>`: (비교글자) <var>변수</var>
- `<dfn>`: (비교글자) <dfn>용어 정의</dfn>
- `<cite>`: (비교글자) <cite>책, 논문 등 인용 매체의 제목</cite>
- `<code>`: (비교글자) <code>print("Hello World!") # 소스코드</code>
- `<q>`: (비교글자) <q>짧은 인용구. 자동으로 쌍따옴표가 양쪽에 붙는다.</q>

### 리스트 태그

- Unordered List: 순서 없는 목록
    - `<ul>`, `<li>`로 표현
- Ordered List: 순서 있는 목록
    - `<ol>`, `<li>`로 표현
    - `<ol type="1" start="2" reversed>`
        - `type`으로 순서 표시를 지정할 수 있음. `1`, `a`, `A`, `i`, `I`를 넣어 사용해보자.
        - `start`로 시작 값을 지정할 수 있음.
        - `reversed`로 숫자를 역순으로 지정할 수 있음.
    - `<li value="3">`
        - `value`를 사용해 특정 list item만 번호를 따로 지정할 수 있다.
- Description List: key / value 형식의 목록
    - `<dl>`, `<dt>`, `<dd>`로 표현.

## 참고문헌

- [HTML 5.2]( https://www.w3.org/TR/html52/ )
- [LEE] HTML웹프로그래밍 / 이관용 저 / 한국방송통신대학교출판문화원 / 2017년 01월 25일

## 주석

[^LEE-1]: [LEE] 1장.

