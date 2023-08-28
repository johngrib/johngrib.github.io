---
layout  : wiki
title   : vimwiki 링크를 html 링크로 자동 변환하는 기능
summary : 
date    : 2023-08-28 22:01:01 +0900
updated : 2023-08-28 23:03:17 +0900
tag     : 
resource: 07/2DE815-5D45-4E0A-BEE5-9932CBAEE53F
toc     : true
public  : true
parent  : [[/blog/this]]
latex   : false
---
* TOC
{:toc}

## 기능 소개

[[/vimwiki]]{VimWiki}의 링크 포맷 문자열을 html의 `a` 태그로 렌더링해주는 기능이다.

다음과 같은 추가 기능이 있다.

- 문서의 메타 데이터를 조회하여 자동으로 레이블 생성.
- 수동으로 레이블을 지정할 수 있음.
- 문서의 섹션 아이디를 지정할 수 있음.
- code 태그 내에서도 링크를 생성할 수 있음.
- 링크 생성을 방지하기 위해 이스케이프할 수 있음.

## 이 기능을 왜 만들었나?

로컬 컴퓨터에서는 Vim에서 VimWiki로 편집하고, 웹 브라우저에서는 VimWiki 문서 링크를 a 태그로 렌더링해서 보고 싶었기 때문이다.

## 사용 방법

### 링크 생성
#### 단순 변환하는 경우

<div id="table-simple"></div>

- tr
    - VimWiki 포맷
    - `\[[/blog/this]]`
- tr
    - HTML 변환 결과
    - `<a href="/wiki/blog/this">this blog 설명서</a>`
- tr
    - 웹 브라우저에서 렌더링된 결과
    - [[/blog/this]]
- tr
    - 특징
    - 해당 문서의 타이틀이 자동으로 링크 레이블로 렌더링됨.
{:class="table-generate" data-target-id="table-simple"}

#### 수동으로 링크 레이블을 지정하는 경우

<div id="table-with-label"></div>

- tr
    - VimWiki 포맷
    - `\[[/blog/this]]{수동 레이블 지정}`
- tr
    - HTML 변환 결과
    - `<a href="/wiki/blog/this">수동 레이블 지정</a>`
- tr
    - 웹 브라우저에서 렌더링된 결과
    - [[/blog/this]]{수동 레이블 지정}
{:class="table-generate" data-target-id="table-with-label"}

#### 문서의 섹션 아이디를 지정하는 경우

<div id="table-with-section"></div>

- tr
    - VimWiki 포맷
    - `\[[/blog/this#sub-docs]]`
- tr
    - HTML 변환 결과
    - `<a href="/wiki/blog/this#sub-docs">this blog 설명서</a>`
- tr
    - 웹 브라우저에서 렌더링된 결과
    - [[/blog/this#sub-docs]]
- tr
    - 주의사항
    - 해당 문서의 섹션 아이디를 변경할 때 같이 변경해줘야 한다. 섹션 아이디가 깨지면 해당 문서의 최상단으로 이동한다.
{:class="table-generate" data-target-id="table-with-section"}

#### 수동 레이블과 섹션 아이디를 같이 지정하는 경우

<div id="table-with-label-section"></div>

- tr
    - VimWiki 포맷
    - `\[[/blog/this#sub-docs]]{수동 레이블}`
- tr
    - HTML 변환 결과
    - `<a href="/wiki/blog/this#sub-docs">수동 레이블</a>`
- tr
    - 웹 브라우저에서 렌더링된 결과
    - [[/blog/this#sub-docs]]{수동 레이블}
{:class="table-generate" data-target-id="table-with-label-section"}

#### code 태그 내에서 링크를 생성하는 경우

<div id="table-with-code"></div>

- tr
    - VimWiki 포맷
    - ``` `\[[/blog/this]]` ```
- tr
    - HTML 변환 결과
    - `<code><a href="/wiki/blog/this">this blog 설명서</a></code>`
- tr
    - 웹 브라우저에서 렌더링된 결과
    - `[[/blog/this]]`
- tr
    - 특징
    - `code` 태그 안에 있지만 `a` 링크로 작동(클릭으로 이동 가능).
{:class="table-generate" data-target-id="table-with-code"}

### 생성방지 이스케이프

#### 링크가 생성되지 않도록 이스케이프하는 경우

링크 대괄호 앞에 `\\`를 붙이면 된다.

<div id="table-with-escape"></div>

- tr
    - VimWiki 포맷
    - `\\\[[/blog/this]]`
- tr
    - HTML 변환 결과
    - `\\\[[/blog/this]]`
- tr
    - 웹 브라우저에서 렌더링된 결과
    - \\[[/blog/this]]
- tr
    - 특징
    - html에서 단순한 plain text로 렌더링됨. `\[[`, `]]`를 표기할 필요가 있을 때 사용한다.
{:class="table-generate" data-target-id="table-with-escape"}

#### code 태그 내에서 링크를 생성하지 않고 이스케이프하는 경우

링크 대괄호 앞에 `\`를 붙이면 된다.

<div id="table-with-escape-in-code"></div>

- tr
    - VimWiki 포맷
    - ``` `\\[[/blog/this]]` ```
- tr
    - HTML 변환 결과
    - `<code>\[[/blog/this]]</code>`
- tr
    - 웹 브라우저에서 렌더링된 결과
    - `\[[/blog/this]]`
- tr
    - 특징
    - 링크가 아님. `\[[`, `]]` 를 표기할 일이 있을 때 사용하면 된다.
{:class="table-generate" data-target-id="table-with-escape-in-code"}


## 구현

[create-link.js 파일의 link 함수]( https://github.com/johngrib/johngrib.github.io/blob/0f4aae169f9d5584a75b17efae8d524f42513fb9/js/create-link.js#L45-L78 )를 참고할 것.

