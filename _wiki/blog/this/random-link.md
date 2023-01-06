---
layout  : wiki
title   : 랜덤 링크를 열어주는 기능
summary : 이 웹 사이트의 핵심 기능
date    : 2021-07-20 21:49:15 +0900
updated : 2023-01-06 12:52:21 +0900
tag     : 
resource: 87/AA5089-14C8-43D7-909A-5CF34596EE2A
toc     : true
public  : true
parent  : [[/blog/this]]
latex   : false
---
* TOC
{:toc}

## 전체 문서 랜덤 열기

![image]( /resource/87/AA5089-14C8-43D7-909A-5CF34596EE2A/126327221-5e7fe6fc-2356-48b8-8004-7b21d790626a.png )

화면 상단의 `random` 버튼을 클릭하면 이 블로그의 모든 문서들 중 하나로 랜덤하게 이동하는 기능이다.

[2017년 12월 2일에 만들어 블로그에 추가하였다.]( https://github.com/johngrib/johngrib.github.io/commit/e17be769fc782b9789cc718cbb9272a76da130f2 )

재미있을 것 같아서 만든 기능이었는데 만들고 보니 유지보수와 학습에 도움이 되는 아주 좋은 기능이었다.

블로그에 붙인 랜덤 버튼을 자주 누르면 과거에 작성한 글의 결함이나 부족한 점을 발견하고 수정하게 된다.

### 구현

#### 2021-07-25

2021년 7월 25일 업데이트 이전의 랜덤 문서 구현은 다음과 같았다.

1. url fragment에 `#random`을 붙여서 `wiki/index`로 이동한다.
2. `wiki/index`에서는 url에 `#random`이 붙어 있다면 `wiki/index`의 모든 링크 중 하나를 랜덤하게 선택해 이동한다.

이 방식의 단점은 다음과 같았다.

- 랜덤 이동을 할 때마다 인덱스 페이지로 이동한 다음, 다시 랜덤 문서로 이동해야 하므로 비효율적이었다.
- 랜덤 이동을 할 때마다 중간에 인덱스를 경유하기 때문에 뒤로 가기 버튼을 누를 때마다 이전의 경로로 제대로 돌아가지 못하는 문제가 있다.
    - 뒤로 가기를 누르면 `wiki/index#random` 으로 돌아갔기 때문에 어느 페이지가 열릴지 알 수 없다.

업데이트 이후로는 다음과 같이 작동한다.

1. 전체 문서 url 리스트 파일을 가져온다.
2. 리스트에서 랜덤하게 url 하나를 골라 이동한다.

이렇게 바꾸었으므로 인덱스를 경유하기 때문에 발생하는 비효율, 뒤로 가기가 제대로 작동하지 않는 문제가 해결되었다.

##### 전체 문서 url 리스트 파일

[/data/total-document-url-list.json]( https://github.com/johngrib/johngrib.github.io/commit/ba9c77887561e01594f4c393ab7fa3881774407f#diff-3640675555321254a293087b299927355212e40fd9e1bdaa5a4dc5797461a4d4 )

`total-document-url-list.json`은 공개된 모든 문서의 url을 리스트 형식으로 갖고 있는 파일이다.

랜덤 버튼을 클릭하면 이 파일을 읽고, 그 중 한 문서를 랜덤을 선택해 이동한다.

이 json 파일은 [generateData.js]( https://github.com/johngrib/johngrib.github.io/commit/8e3d024b3c727adefd041a68a7a7486f102efde8 )에서 생성하므로, jekyll의 파일 생성 기능에 의존하지 않는다.

##### 화면 상단의 랜덤 버튼

{% raw %}
```html
<header class="header">
    <div>
        <a class="site-title" href="{{ site.baseurl }}/">{{ site.title }}</a>
    </div>
    <div>
        <a class="site-title-right" href="/about/">me</a>
    </div>
    <div>
        <!-- 랜덤 버튼을 클릭하면 goToRandomDocument 함수를 호출한다 -->
        <a id="random-button" class="site-title-right" href="" onClick="goToRandomDocument()">random</a>
    </div>
    <div>
        <a class="site-title-right" href="/wiki/index/">wiki</a>
    </div>
</header>
<script>
// 전체 문서 목록을 읽어온 다음, 랜덤으로 하나를 선택해 이동한다
function goToRandomDocument() {
    fetch(`/data/total-document-url-list.json`)
        .then(response => response.json())
        .then(function(data) {
            const num = getRandomInt(0, data.length);
            window.location.href = data[num];
        })
        .catch(function(error) {
            console.log(error);
        });
}

// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/random#두_값_사이의_정수_난수_생성하기
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

// ctrl + r 로 랜덤 문서로 이동한다.
;(function(){
    var isCtrl = false;

    document.onkeyup=function(e){
        if (e.which == 17) {
            isCtrl = false;
        }
    }

    document.onkeydown=function(e){
        if(e.which == 17) {
            isCtrl = true;
        }
        if(e.which == 82 && isCtrl == true) {
            goToRandomDocument();
        }
    }
})();
</script>
```
{% endraw %}


#### 2021-07-25 이전

[_layouts/wikiindex.html]( https://github.com/johngrib/johngrib.github.io/blob/master/_layouts/wikiindex.html )

#### 화면 상단의 랜덤 버튼

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

#### wiki index

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


## 현재 문서 내 랜덤 링크 열기

[[/links/2023]] 같은 많은 링크가 들어있는 페이지를 열어놓은 상태에서 랜덤하게 링크를 열어보고 싶은 생각에 만들었다.

1. 문서 페이지를 하나 열어놓고 `ctrl + shift + r` 키를 입력한다.
2. 본문에 포함된 링크 중 하나가 랜덤으로 선택되어 웹 브라우저 새 탭으로 열린다.
    - 이렇게 랜덤하게 선택되어 열린 링크는 `.link-checked` css 클래스로 표시되어 시각적으로 구분할 수 있다.
    - 웹 브라우저 개발자 콘솔에 선택된 링크의 정보가 `console.log`로 출력된다.

### 사용 예

예를 들어 다음과 같은 상태에서 `ctrl + shift + r` 키를 입력해보자.

![예제 화면]( /resource/87/AA5089-14C8-43D7-909A-5CF34596EE2A/210924583-b3863061-4cce-46a3-865e-ba9eee8aa2e0.png )

[[/jekyll-category-tag]] 문서가 선택되어 새 탭으로 열린다.

읽고 있는 페이지로 돌아가보면 [[/jekyll-category-tag]] 링크가 눈에 띄는 색으로 바뀌어 있음을 알 수 있다.

그리고 웹 브라우저 개발자 콘솔을 확인해보면 랜덤하게 선택된 링크에 대한 로그도 출력되어 있다.

![랜덤 링크가 열린 이후]( /resource/87/AA5089-14C8-43D7-909A-5CF34596EE2A/210925187-1e3530e6-27e2-4ae9-a839-32dfbdcaebc2.png )

구글 크롬이라면 이 로그에 마우스 우클릭을 해서 `Scroll into view` 기능을 사용할 수도 있다.
`Scroll into view`를 클릭하면 해당 링크가 보이는 위치로 화면이 스크롤된다.

위아래로 긴 문서에서 해당 링크를 찾아낼 때 유용하다.

![scroll into view를 선택하는 모습]( /resource/87/AA5089-14C8-43D7-909A-5CF34596EE2A/210925492-63181049-12ce-4edf-a19b-b85c1573e435.png )

한편 체크된 링크 표시는 새로고침을 하기 전까지는 계속 남아있게 된다.
따라서 문서 내 랜덤 링크 기능을 여러번 사용하면 다음과 같이 체크된 링크가 점점 늘어나게 된다.

다음은 문서 내 랜덤 링크 기능을 두 번 사용한 결과를 캡처한 것이다.

![image]( /resource/87/AA5089-14C8-43D7-909A-5CF34596EE2A/210925835-05fb4480-cc62-4149-9e8c-5d56e90bf908.png )

체크된 링크는 문서 내 랜덤 링크 기능의 후보에서 제외된다.
그러므로 문서 내 랜덤 링크 기능을 계속 사용하면 결국 모든 링크를 열어보게 된다.

링크에 대한 체크를 초기화하고 싶다면 그냥 새로고침을 하면 된다.

### 구현

[/js/shortcut.js]( https://github.com/johngrib/johngrib.github.io/blob/709db05a7812f7d83f9a968aa859e30651b143da/js/shortcut.js#L18-L34 )

```javascript
// 현재 보고 있는 문서에 포함된 링크 중 하나를 랜덤 선택해 열어줍니다.
function openRandomLink() {
    const links = document.querySelectorAll('.post-content a[href]:not(.link-checked):not([href^="#"]):not([href^="mailto"]):not([href^="javascript"])');

    if (links == null || links.length == null || links.length == 0) {
        return;
    }

    const num = getRandomInt(0, links.length);
    const link = links[num];

    window.open(link.getAttribute('href'), '_blank');
    console.log('opened')
    console.log(link);

    link.classList.add('link-checked');
}
```

