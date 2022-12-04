---
layout  : wiki
title   : CSS
summary : Cascading Style Sheets
date    : 2021-09-23 15:58:21 +0900
updated : 2021-09-23 17:58:36 +0900
tag     : 
resource: F5/A8184C-DBA8-4099-B637-B909FA43CBEF
toc     : true
public  : true
parent  : [[language]]
latex   : false
---
* TOC
{:toc}

## CSS selector

<style>
.test-area {
  border: 1px solid;
}
</style>

### *

모든 엘리먼트를 선택한다.

```css
* {
  color: red;
}
```

```html
<div>선택(div)</div>
<span>선택(span)</span>
```

{% raw %}
<style>
#test-asterisk * { color: red; }
</style>
<div id="test-asterisk" class="test-area">
    <div>선택(div)</div>
    <span>선택(span)</span>
</div>
{% endraw %}

### #id

아이디가 일치하는 엘리먼트를 하나 선택한다.

```css
#sample-id {
  color: red;
}
```

```html
<div id="test-12345">
  아이디가 일치하지 않음(#test-12345)
  <div>선택 안됨(div>)</div>
  <div>
    <p id="sample-id">선택(#sample-id)</p>
  </div>
</div>
```

{% raw %}
<style>
#test-id #sample-id { color: red; }
</style>
<div id="test-id" class="test-area">
  <div id="test-12345">
    아이디가 일치하지 않음(#test-12345)
    <div>선택 안됨(div)</div>
    <div>
      <p id="sample-id">선택(#sample-id)</p>
    </div>
  </div>
</div>
{% endraw %}


### element

해당 엘리먼트를 모두 선택한다.

```css
div {
  color: red;
}

p {
  color: blue;
}
```

```html
<div>선택(div)</div>
<span>선택 안됨(span)</span>
<span>
  <p>선택(span > p)</p>
</span>
<p>선택(p)</p>
```

{% raw %}
<style>
  #test-element div { color: red; }
  #test-element p { color: blue; }
</style>
<div id="test-element" class="test-area">
    <div>선택(div)</div>
    <span>선택 안됨(span)</span>
    <span>
      <p>선택(span > p)</p>
    </span>
    <p>선택(p)</p>
</div>
{% endraw %}

#### element1 element2

`element1` 내부에 들어있는 모든 `element2`를 선택한다.

```css
div p {
  color: red;
}
```

```html
<div>
  <p>선택(div p)</p>
  <span>선택 안됨(div span)</span>
  <span>
    <p>선택(div span p)</p>
  </span>
</div>
<span>선택 안됨(span)</span>
<p>선택 안됨(p)</p>
```

{% raw %}
<style>
div#test-el-el div p {
  color: blue;
}
</style>
<div id="test-el-el" class="test-area">
  <div>
    <p>선택(div p)</p>
    <span>선택 안됨(div span)</span>
    <span>
      <p>선택(div span p)</p>
    </span>
  </div>
  <span>선택 안됨(span)</span>
  <p>선택 안됨(p)</p>
</div>
{% endraw %}

#### element1 > element2

`element1`을 부모로 두고 있는 모든 `element2`를 선택한다.

```css
div > span {
  color: red;
}
```

```html
<div>
  <p>선택 안됨(div > p)</p>
  <span>선택(div > span)</span>
  <p>
    <span>선택 안됨(div > p > span)</span>
  </p>
  <div>
    <span>선택(div > div > span)</span>
  </div>
</div>
<span>선택 안됨(span)</span>
<p>선택 안됨(p)</p>
```

{% raw %}
<style>
div#test-el-child-el div > span {
  color: red;
}
</style>
<div id="test-el-child-el" class="test-area">
  <div>
    <p>선택 안됨(div > p)</p>
    <span>선택(div > span)</span>
    <p>
      <span>선택 안됨(div > p > span)</span>
    </p>
    <div>
      <span>선택(div > div > span)</span>
    </div>
  </div>
  <span>선택 안됨(span)</span>
  <p>선택 안됨(p)</p>
</div>
{% endraw %}

#### element1 + element2

element1 의 다음(next)에 sibling으로 있는 element2.

```css
div + p {
  color: red;
}
```

```html
<p>선택 안됨(p)</p>
<div>
  <p>선택 안됨(div > p)</p>
</div>
<p>선택(div + p)</p>
<p>선택 안됨(p + p)</p>
```

{% raw %}
<style>
div#test-el-next-el div + p {
  color: red;
}
</style>
<div id="test-el-next-el" class="test-area">
  <p>선택 안됨(p)</p>
  <div>
    <p>선택 안됨(div > p)</p>
  </div>
  <p>선택(div + p)</p>
  <p>선택 안됨(p + p)</p>
</div>
{% endraw %}

#### element1 ~ element2

element1 이후의 sibling으로 있는 모든 element2.

```css
div~p {
  color: red;
}
```

```html
<p>선택 안됨(앞에 같은 레벨의 div가 없음)</p>
<div>
  <p>선택 안됨(div > p)</p>
</div>
<p>선택(div + p 이면서 동시에 div ~ p)</p>
<span>선택 안됨(span)</span>
<p>선택(div ~ p)</p>
<div>
  <p>선택 안됨(div > p. p 가 div와 같은 레벨이 아님)</p>
</div>
```

{% raw %}
<style>
div#test-el-prev-el div~p {
  color: red;
}
</style>
<div id="test-el-prev-el" class="test-area">
  <p>선택 안됨(앞에 같은 레벨의 div가 없음)</p>
  <div>
    <p>선택 안됨(div > p)</p>
  </div>
  <p>선택(div + p 이면서 동시에 div ~ p)</p>
  <span>선택 안됨(span)</span>
  <p>선택(div ~ p)</p>
  <div>
    <p>선택 안됨(div > p. p 가 div와 같은 레벨이 아님)</p>
  </div>
</div>
{% endraw %}

### ,(콤마)의 사용

콤마를 사용하면 여러 조건을 하나로 묶어 표현할 수 있다.

```css
div, p {
  color: red;
}
```

```html
<div>선택(div)</div>
<span>선택 안됨(span)</span>
<span>
  <p>선택(span > p)</p>
</span>
<p>선택(p)</p>
```

{% raw %}
<style>
  #test-comma div, #test-comma p { color: red; }
</style>
<div id="test-comma" class="test-area">
  <div>선택(div)</div>
  <span>선택 안됨(span)</span>
  <span>
    <p>선택(span > p)</p>
  </span>
  <p>선택(p)</p>
</div>
{% endraw %}


### .class

HTML 엘리먼트의 `class` 어트리뷰트에 클래스 값이 있는 엘리먼트를 선택한다.

```css
.foo {
  color: blue;
}
```

```html
<div class="bar">선택 안됨</div>
<div class="foo">선택(foo)</div>
<div class="foo bar">선택(foo 포함)</div>
<div class="bar foo">선택(foo 포함)</div>
<div class="foobar">선택 안됨(foobar 는 foo가 아님)</div>
```

{% raw %}
<style>
#test-class.test-area .foo { color: red; }
</style>
<div id="test-class" class="test-area">
  <div class="bar">선택 안됨</div>
  <div class="foo">선택(foo)</div>
  <div class="foo bar">선택(foo 포함)</div>
  <div class="bar foo">선택(foo 포함)</div>
  <div class="foobar">선택 안됨(foobar 는 foo가 아님)</div>
</div>
{% endraw %}

#### element.class

해당 클래스를 갖고 있는 엘리먼트

```css
div.bar {
  color: blue;
}
```

```html
<div class="bar">선택(div.bar)</div>
<p class="bar">선택 안됨(p.bar)</p>
<div class="foo1 bar">선택(div.bar)</div>
<div class="bar foo1">선택(div.bar)</div>
<div class="foobar">선택 안됨(div.foobar)</div>
```

{% raw %}
<style>
  div#test-el-cl.test-area div.bar { color: red; }
</style>
<div id="test-el-cl" class="test-area">
  <div class="bar">선택(div.bar)</div>
  <p class="bar">선택 안됨(p.bar)</p>
  <div class="foo1 bar">선택(div.bar)</div>
  <div class="bar foo1">선택(div.bar)</div>
  <div class="foobar">선택 안됨(div.foobar)</div>
</div>
{% endraw %}

#### .class.class

여러 클래스를 모두 갖는 엘리먼트.

```css
.red.blue {
  color: purple;
}
```

```html
<div class="red">선택 안됨(red만 있음)</div>
<div class="red blue">선택(red blue)</div>
<div class="blue red">선택(blue red)</div>
<div class="blue">선택 안됨(blue만 있음)</div>
```

{% raw %}
<style>
#test-multi-class .red.blue {
  color: purple;
}
</style>

<div id="test-multi-class" class="test-area">
  <div class="red">선택 안됨(red만 있음)</div>
  <div class="red blue">선택(red blue)</div>
  <div class="blue red">선택(blue red)</div>
  <div class="blue">선택 안됨(blue만 있음)</div>
</div>
{% endraw %}

### [attribute]

해당 어트리뷰트를 갖는 엘리먼트.

```css
[data-test] {
  color: red;
}
```

```html
<div>선택 안됨</div>
<div data-test="123">선택</div>
<div>선택 안됨</div>
```

{% raw %}
<style>
#test-attr [data-test] {
  color: red;
}
</style>

<div id="test-attr" class="test-area">
  <div>선택 안됨</div>
  <div data-test="123">선택(data-test 어트리뷰트가 있음)</div>
  <div>선택 안됨</div>
</div>
{% endraw %}

#### [attribute=value]

해당 어트리뷰트를 갖고 있고, 값까지 일치하는 엘리먼트.

```css
[data-test=hello] {
  color: red;
}
```

```html
<div>선택 안됨</div>
<div data-test="hello">선택(data-test 키가 있고, 값이 hello)</div>
<div data-test="42">선택 안됨(data-test 키는 있지만, 값이 hello가 아님)</div>
```

{% raw %}
<style>
#test-attr-value [data-test=hello] {
  color: red;
}
</style>

<div id="test-attr-value" class="test-area">
  <div>선택 안됨</div>
  <div data-test="hello">선택(data-test 키가 있고, 값이 hello)</div>
  <div data-test="42">선택 안됨(data-test 키는 있지만, 값이 hello가 아님)</div>
</div>
{% endraw %}


### :

TODO

## From: 한 권으로 읽는 컴퓨터 구조와 프로그래밍

>
CSS는 나중에 나온 아이디어다.
HTML을 개발할 때는 아무도 이를 생각하지 못했다.
그 결과 꽤 이상한 요소가 있다.
HTML 안에는 미리 정의된 의미가 있는 다양한 엘리먼트가 있다.
예를 들어 `<b>` 엘리먼트는 텍스트를 굵은 글꼴<sup>bold</sup>로 만들고, `<i>` 엘리먼트는 텍스트를 기울인 글꼴<sup>italics</sup>로 만든다.
하지만 리스트 9-5의 CSS를 쓰면 의미(화면에 표시되는 방식)를 반대로 바꿀 수 있다.
>
> _리스트 9-5 CSS를 사용해 `<i>`와 `<b>` 의미 뒤바꾸기_
>
> ```css
> b {
>     font-style: italic;
>     font-weight: normal;
> }
> i {
>     font-style: normal;
>     font-weight: bold;
> }
> ```
>
CSS는 여러 HTML 원소들 사이의 구분을 각 원소의 의도 및 목적과 관계없이 없애버렸다.
HTML 엘리먼트들이 정해진 디폴트<sup>default</sup> 스타일이 있다고 생각하는 독자도 있겠지만,
CSS를 통해 이런 스타일이 바뀌고 나면 원소 이름은 원래 목적과 아무 관계가 없게 된다.
>
CSS는 원래 애트리뷰트를 엘리먼트와 연관시키는 더 유연한 메커니즘을 제공하기 위해 고안됐다.
이를 통해, 원래 HTML에는 없던 애트리뷰트가 엘리먼트에 추가됐다.
이로 인해 HTML과 CSS에서 일부 애트리뷰트를 동시에 설정할 수 있고, 나머지는 CSS에서만 설정할 수 있다.
프로그래머 사회에서는 예전 방식의 애트리뷰트 설정을 아예 더 이상 사용하지 말아야 한다는 입장이 꽤 강하지만,
이런 주장은 기존 코드를 유지보수하는 문제를 고려하지 않은 주장이다.
>
-- 한 권으로 읽는 컴퓨터 구조와 프로그래밍. 9장. 357쪽.

## 참고문헌

- [CSS Selector Reference (w3schools.com)]( https://www.w3schools.com/cssref/css_selectors.asp )
- 한 권으로 읽는 컴퓨터 구조와 프로그래밍 / 조너선 스타인하트 저/오현석 역 / 책만 / 2021년 04월 08일 초판 1쇄 / 원서 : The Secret Life of Programs: Understand Computers -- Craft Better Code

