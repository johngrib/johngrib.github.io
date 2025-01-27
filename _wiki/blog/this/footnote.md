---
layout  : wiki
title   : footnote 팝업 기능
summary : 주석 기능
date    : 2022-12-02 15:09:21 +0900
updated : 2025-01-27 23:24:00 +0900
tag     : 
resource: 28/9B73E9-6A44-4742-AD40-1F55993DA83F
toc     : true
public  : true
parent  : [[/blog/this]]
latex   : false
---
* TOC
{:toc}

## 개요

- markdown 주석을 작성하면 웹 페이지에서 링크가 걸린 주석 넘버를 볼 수 있다.
- 웹 페이지에서 주석 넘버를 클릭하면 주석이 있는 문서 하단으로 이동한다.
- 웹 페이지에서 주석 넘버에 마우스를 올리면 주석 내용이 팝업으로 나타난다.

## 사용 방법

다음과 같이 평범하게 markdown 주석을 작성한다.

```
여기에 주석이 붙게 된다.[^my-comment]
두 번째 주석도 이렇게 붙일 수 있다.[^my-comment2]

세 번째 주석도 이렇게...[^third-note]

[^my-comment]: 주석 내용이 여기 있다.
[^my-comment2]: 두 번째 주석 내용.
[^third-note]: 세 번째 주석 내용.
```

그러면 다음과 같이 보이게 된다.

---

여기에 주석이 붙게 된다.[^my-comment]
두 번째 주석도 이렇게 붙일 수 있다.[^my-comment2]

세 번째 주석도 이렇게...[^third-note]


## 마우스 오버를 통한 팝업

주석을 웹 사이트에서 볼 때 마우스 오버를 하면 팝업으로 보여준다.

<video controls muted autoplay loop><source src=" /resource/28/9B73E9-6A44-4742-AD40-1F55993DA83F/205227869-68135216-dd8c-442a-b557-a7db53e0c3da.mp4 " type="video/mp4"></video>

### 구현

#### scss

[_base.scss]( https://github.com/johngrib/johngrib.github.io/blob/master/_sass/_base.scss#L182 )

```scss
// 팝업 주석
sup[role=doc-noteref] {
    position: absolute;

    a.footnote {
        position: relative;
        padding-bottom: 1em;
        top: -0.9em;
        text-decoration: none;

        &:before { content: "[" }
        &:after { content: "]" }
        &:hover {
            color: #df0000;
            & + .tooltiptext {
                color: red;
                // display: block; // create-link.js 에서 처리한다
            }
        }

        & + .tooltiptext {
            display: none;
            max-width: 800px;
            min-width: 300px;
            background-color: #ffffff;
            color: $main-font-color;
            text-align: left;
            border-radius: 7px;
            border: 1px solid #df0000;
            padding: 0px 12px 0px 12px;
            position: absolute;
            bottom: 29px;
            z-index: 1;
        }
    }
}
```

#### JavaScript

[create-link.js]( https://github.com/johngrib/johngrib.github.io/blob/master/js/create-link.js#L136 )

```javascript
;(function footnoteToolTip() {
    // 주석에 툴팁을 붙인다
    const supList = document.querySelectorAll('sup');
    for (let i = 0; i < supList.length; i++) {
        const sup = supList[i];

        const note = sup.querySelector('.footnote');
        if (note == undefined) {
            continue;
        }
        const id = note.getAttribute('href').replace(/^#/, "");
        const text = document.getElementById(id).innerHTML;
        sup.innerHTML += `<span class="tooltiptext" id="tooltip-${i}">${text}</span>`

        const tooltip = sup.querySelector(".tooltiptext");

        sup.addEventListener('mouseover', function() {
            const supRect = sup.getBoundingClientRect();
            const postRect =  document.querySelector('.page-content')
                .getBoundingClientRect();

            tooltip.style.display = "block";
            const tooltipRect = tooltip.getBoundingClientRect();

            if (supRect.left + tooltipRect.width > postRect.right) {
                // 툴팁이 포스트 오른쪽 경계를 넘어간다면, 넘어간 만큼 왼쪽으로 이동시킨다.
                tooltip.style.left = `-${supRect.left + tooltipRect.width - postRect.right}px`;
                tooltip.style.right = null;
                return;
            } else {
                // 오른쪽 경계를 넘어가지 않는다면, 그냥 sup 위에 띄운다.
                tooltip.style.left = `0px`;
                tooltip.style.right = null;
                return;
            }
        });

        sup.addEventListener('mouseout', function() {
            tooltip.style.display = "none";
        });
    }
})();
```


## 주석

[^my-comment]: 주석 내용이 여기 있다.
[^my-comment2]: 두 번째 주석 내용.
[^third-note]: 세 번째 주석 내용.

