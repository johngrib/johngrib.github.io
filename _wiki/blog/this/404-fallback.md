---
layout  : wiki
title   : 주소가 변경된 문서로 redirect 해주는 기능
summary : 
date    : 2021-07-22 23:54:01 +0900
updated : 2021-07-23 00:03:13 +0900
tag     : 
resource: 63/671956-024A-45EB-9A42-18BCFAFD74FD
toc     : true
public  : true
parent  : [[/blog/this]]
latex   : false
---
* TOC
{:toc}

## 기능 소개

이 기능은 오래된 문서의 URL을 통해 접근했을 경우, 해당 문서의 변경된 경로로 보내주는 기능이다.


## 이 기능을 왜 만들었나?

블로그를 오래 관리하다 보니 어떤 문서는 이름을 바꾸기도 하고 어떤 문서는 경로를 옮기기도 한다.

상식적으로는 HTTP 301 을 쓰는 것이 맞겠지만, github page에 jekyll로 돌리고 있는데 HTTP 301을 쓰기가 애매하다.

그래서 만들었다.

## 구현

[404.html]( https://github.com/johngrib/johngrib.github.io/blob/master/404.html )

{% raw %}
```html
---
layout: default
permalink: /404.html
---

<div class="container">
  <h1>404</h1>

  <p><strong>Page not found :(</strong></p>
  <p>The requested page could not be found.</p>
</div>
<script>
    const url = window.location.pathname;
    console.log(url);

    // 여기에 fallback 문서 경로 목록을 나열해 준다.
    const fallbackRouter = {
        '/wiki/spring-documents-overview/': '/wiki/spring/document/overview/'
    };

    // 현재 주소가 fallback 문서 목록에 존재한다면, 올바른 경로로 보내준다.
    if (fallbackRouter[url]) {
        window.location.href = fallbackRouter[url];
    }
</script>
```
{% endraw %}

위의 fallback 문서 경로 목록을 보자.

```javascript
const fallbackRouter = {
    '/wiki/spring-documents-overview/': '/wiki/spring/document/overview/'
};
```

이 코드는 `'/wiki/spring-documents-overview/'` 주소는 이제 이사간 주소이니, 같은 문서의 새 주소인 `'/wiki/spring/document/overview/'`로 이동하라는 의미이다.

다음 경로로 접속해 보면 404 페이지로 갔다가 올바른 주소로 강제로 옮겨지는 것을 경험할 수 있다.

https://johngrib.github.io/wiki/spring-documents-overview/

