---
layout  : wiki
title   : 카테고리 기능
summary : 
date    : 2023-04-01 14:16:07 +0900
updated : 2023-04-01 14:56:19 +0900
tag     : 
resource: D2/FFB5C1-C55D-4DDB-97B9-6E91D473D2C3
toc     : true
public  : true
parent  : [[/blog/this]]
latex   : false
---
* TOC
{:toc}

## 기능 소개

문서의 `layout`을 `category`로 설정하면 해당 문서를 카테고리로 사용할 수 있는 기능이다.

### 문서를 부모 문서로 지정하기

- `layout`을 `category`로 설정하면 된다.

```markdown
---
layout  : category
title   : 문서의 타이틀
summary : 

 이하 생략
---
```

### 문서를 자식 문서로 지정하기

- `layout`을 `wiki`로 설정하면 된다.
- 부모로 지정할 문서의 링크를 `parent`에 지정해 주면 된다.

다음은 [[/blog/this]] (`\\[[/blog/this]]`)문서를 부모로 삼는 서브 문서의 예이다.

```markdown
---
layout  : wiki
title   : 서브 문서
toc     : true
public  : true
parent  : [[/blog/this]]
latex   : false
---
```

물론 자식 문서도 category를 지정하면 부모문서가 되어 자식 문서들과 연결될 수 있다.

- `layout`을 `category`로 설정하면 된다.

```markdown
---
layout  : category
title   : 서브 문서
toc     : true
public  : true
parent  : [[/blog/this]]
latex   : false
---
```

이렇게 문서를 연결해준 다음 해당 자식 문서로 들어가면,
최상단에 다음과 같이 ROOT부터 순서대로 부모 문서들이 나열되는 것을 볼 수 있다.

![]( /resource/D2/FFB5C1-C55D-4DDB-97B9-6E91D473D2C3/229267427-9af0bc3d-872b-4914-8fd0-74c4d54abfad.png )

### 부모 문서에서 자식 문서 목록을 보여주기

`layout`이 `category`라면 자동으로 문서 최하단에 자식 문서 목록을 보여준다.

다음은 [[/clojure]] 문서의 예이다.

![image]( /resource/D2/FFB5C1-C55D-4DDB-97B9-6E91D473D2C3/229268069-075bf7ba-874a-4dcf-99d8-9c5bc8947fc4.png )

자동 삽입되는 자식 문서들은 `document-list` 아이디를 갖는 미리 지정된 `div` 태그에 삽입된다.

[_layouts/category.html]( https://github.com/johngrib/johngrib.github.io/blob/acf3f11a1c9e6200a83ddc025fc1a6d97f064a0a/_layouts/category.html#L31-L36 )

```html
{% raw %}
    </header>
    <article class="post-content">
        {{ content }}
        <!-- ↓ 자식 문서는 여기에 입력된다 -->
        <div id="document-list"></div>
    </article>
{% endraw %}
```

만약 삽입되는 위치를 지정하고 싶다면 `sub-document-list`라는 아이디를 갖는 `div` 태그를 만들어서 원하는 위치에 넣어주면 된다.
단, 하위 문서들을 넣을 때 소제목은 자동생성되지 않으므로 아래와 같이 `##`나 `###` 등을 사용해서 소제목을 붙여주는 것이 바람직하다.

```markdown
{% raw %}
    ## 내가 하위 문서를 집어넣고 싶은 위치

    <div id="sub-document-list"></div>
{% endraw %}
```


## 구현

- [_layouts/category.html]( https://github.com/johngrib/johngrib.github.io/blob/acf3f11a1c9e6200a83ddc025fc1a6d97f064a0a/_layouts/category.html#L31-L36 )
- [js/category.js]( https://github.com/johngrib/johngrib.github.io/blob/acf3f11a1c9e6200a83ddc025fc1a6d97f064a0a/js/category.js )
- [js/parent.js]( https://github.com/johngrib/johngrib.github.io/blob/acf3f11a1c9e6200a83ddc025fc1a6d97f064a0a/js/parent.js )



