---
layout  : wiki
title   : 랜덤 링크
summary : 
date    : 2021-07-20 21:49:15 +0900
updated : 2021-07-20 22:18:12 +0900
tag     : 
toc     : true
public  : true
parent  : [[/blog/this]]
latex   : false
---
* TOC
{:toc}

## 기능 소개

![image]( /post-img/random-link/126327221-5e7fe6fc-2356-48b8-8004-7b21d790626a.png )

화면 상단의 `random` 버튼을 클릭하면 이 블로그의 모든 문서들 중 하나로 랜덤하게 이동하는 기능이다.

[2017년 12월 2일에 만들어 블로그에 추가하였다.]( https://github.com/johngrib/johngrib.github.io/commit/e17be769fc782b9789cc718cbb9272a76da130f2 )

## 이 기능을 왜 만들었나?

이 기능이 있으면 재미있을 것 같아서 만들었다.

그런데 만들고 보니 유지보수와 학습에 도움이 되는 아주 좋은 기능이었다.

블로그에 붙인 랜덤 버튼을 자주 누르면 과거에 작성한 글의 결함이나 부족한 점을 발견하고 수정하게 된다.

## 구현

[_layouts/wikiindex.html]( https://github.com/johngrib/johngrib.github.io/blob/master/_layouts/wikiindex.html )

### 화면 상단의 랜덤 버튼

```html
<a
    class="site-title-right"
    href="/wiki/index/#random"
    onClick="if(typeof random === 'function')random()"
>
    random
</a>
```

랜덤 버튼을 클릭하면 `/wiki/index/#random`으로 보내준다.

### wiki index

{% raw %}
```html
---
layout: default
---
<!-- wiki index 는 기본적으로 `display:none` 상태이다. -->
<div class="post-main" style="display:none">
    <header class="post-header">
        <h1 class="page-title">{{ page.title }}</h1>
    </header>
    <article class="post-content wiki-list">
        {{ content }}
    </article>
</div>
<script>
    // DOMContentLoaded 상태에 따라 init 함수를 호출한다.
    if (document.readyState === 'complete' || document.readyState !== 'loading') {
      init();
    } else {
      document.addEventListener('DOMContentLoaded', init);
    }

    // 현재 페이지의 url fragment가 `#random` 이라면 random 함수를 호출한다.
    // 랜덤이 아니라면 wiki index의 display를 block 으로 바꾸어 사용자에게 보여준다.
    function init() {
        if(/#random$/.test(window.location.href)) {
            return random();
        }
        document.querySelector('div.post-main').style.display = 'block';
    };

    // 인덱스 페이지의 모든 `a` 태그 링크를 가져와서 그 중 하나를 대충 랜덤으로 선택하여 이동한다.
    function random() {
        var list = document.querySelectorAll('.wiki-list a')
        var random = Math.floor((Math.random() * list.length));
        var url = list[random].href;
        window.location.href = url;
    }
</script>
```
{% endraw %}

