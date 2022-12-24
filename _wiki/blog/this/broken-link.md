---
layout  : wiki
title   : 깨진 문서 링크를 표시해주는 기능
summary : 
date    : 2022-12-24 21:03:35 +0900
updated : 2022-12-24 21:23:57 +0900
tag     : 
resource: B1/F75A3A-F7CC-4B33-857A-4DEEF91C864E
toc     : true
public  : true
parent  : [[/blog/this]]
latex   : false
---
* TOC
{:toc}

## 기능 소개

이 기능은 [[존재하지-않는-문서]]와 같이 잘못된 내부 문서 링크에 표시를 해주는 기능이다.

다음은 [[/root-index]]의 링크 하나가 잘못 연결된 경우를 보여준다. [[/java-enhancements]] 문서의 연결이 잘못된 상황이다.

![링크 하나가 잘못 연결된 모습]( /resource/B1/F75A3A-F7CC-4B33-857A-4DEEF91C864E/209435411-f38c1422-b532-451c-a335-f87072110b24.png )

화면에 `404 Not Found`라고 표시되는 것을 볼 수 있다.

한편 브라우저 콘솔에서도 로그를 출력하므로, 잘못된 로그가 많은 경우에는 브라우저 콘솔에서 한번에 확인하기 쉽도록 했다.

위의 잘못된 링크 \\[[/java-enhancements]]는 실제 링크인 \\[[/java/enhancements]]로 연결해주면 해결된다.

![해결된 모습]( /resource/B1/F75A3A-F7CC-4B33-857A-4DEEF91C864E/209435960-d2a46e2e-7eee-408f-ac60-b32b1a418fe8.png )

## 이 기능을 왜 만들었나?

문서의 수가 몇 백개를 넘어가게 되고, 가끔식 문서 이름을 변경하거나 디렉토리를 옮기다 보니 가끔씩 잘못된 링크를 만들고도 모르고 지나가는 경우가 생겼기 때문이다.

이 기능을 통해 각 페이지에서 잘못된 링크를 눈으로 쉽게 찾아낼 수 있게 되었다.

## 구현

[2021년 7월 20일 커밋]( https://github.com/johngrib/johngrib.github.io/commit/40dba0c03  )

- [_base.scss]( https://github.com/johngrib/johngrib.github.io/blob/4a72278c5cba1626032504536db3d022b4d6170a/_sass/_base.scss#L146-L172 )

```scss
.link-404 {
    @extend .error-link;
    &:after {
        content: "[404 Not Found]"
    }
}

.link-400 {
    @extend .error-link;
    &:after {
        content: "[400 Bad Request]"
    }
}

.link-408 {
    @extend .error-link;
    &:after {
        content: "[408 Request Timeout]"
    }
}

.link-500 {
    @extend .error-link;
    &:after {
        content: "[500 Internal Server Error]"
    }
}
```

- [create-link.js]( https://github.com/johngrib/johngrib.github.io/blob/4a72278c5cba1626032504536db3d022b4d6170a/js/create-link.js#L80-L117 )

```js
;(function() {
    // 파일 이름이 링크 텍스트로 드러난 것을 문서의 타이틀로 교체해준다.
    const list = document.querySelectorAll('.no-labeled-link');

    for (var i = 0; i < list.length; i++) {
        insertTitle(i, list);
    }
    /**
     * 타이틀이 누락된 문서의 타이틀을 가져와 입력해 줍니다.
     */
    function insertTitle(index, list) {
        const item = list[index];
        if (item == undefined) {
            return;
        }
        const target = item.getAttribute('data-name')
            .replace(/#.*$/, '');

        let status = undefined;
        fetch(`/data/metadata/${target}.json`)
            .then(response => {
                status = response.status;
                return response.json()
            })
            .then(function(data) {
                if (data == null) {
                    return;
                }
                item.innerText = data.title;
                return;
            })
            .catch(function(error) {
                item.classList.add('broken-link');
                item.innerHTML += `<sub class="link-${status}"></sub>`
                console.log(target, status);
            });
    }
})();
```
