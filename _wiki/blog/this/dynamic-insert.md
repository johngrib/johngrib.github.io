---
layout  : wiki
title   : dynamic-insert 기능
summary : 특정 항목을 지정한 위치로 옮겨주는 기능
date    : 2021-07-28 14:46:18 +0900
updated : 2021-07-28 15:36:52 +0900
tag     : 
resource: 85/D7E7B8-F58E-4A8A-847A-1F4C47CD4DCB
toc     : true
public  : true
parent  : [[/blog/this]]
latex   : false
---
* TOC
{:toc}

## 기능 소개

```html
<span id="here"/>

1 첫번째

2 두번째

3 세번째 (삽입할 아이템)
{:class="dynamic-insert" data-target-selector="#here"}
```

위와 같이 `{:class="dynamic-insert" data-target-selector="셀렉터 작성"}`를 작성해 주면 해당 아이템을 셀렉터에 해당하는 곳으로 옮겨주는 기능이다.

위의 예제는 다음과 같이 실행되어야 한다.

```text
3 세번째 (삽입할 아이템)

1 첫번째

2 두번째
```

다음은 위의 예제를 실제 작동시킨 결과이다.

---

<span id="here"/>

1 첫번째

2 두번째

3 세번째 (삽입할 아이템)
{:class="dynamic-insert" data-target-selector="#here"}

---

## 이 기능을 왜 만들었나?

복잡한 표를 구성할 때 필요해서 만들었다.

## 사용 방법 예

예를 들어 다음과 같은 표가 있다고 하자.

| 1  | 2  | 3  |
|----|----|----|
| 4  | 5  | 6  |
| 7  | 8  | 9  |
| 10 | 11 | 12 |

이 테이블의 `4`번 위치에 다음 코드 인용문을 삽입하고 싶다.

```javascript
console.log('hello world!');
```

그리고 8 번 위치에는 다음 테이블을 삽입하고 싶다.

| A | B |
| C | D |

그렇다면 다음과 같이 하면 된다.

```html
| 1  | 2  | 3  |
|----|----|----|
| 4  | 5  | 6  |
| 7  | 8  | 9  |
| 10 | 11 | 12 |
{:id="test-table"}

\```javascript
console.log('hello world!');
\```
{:class="dynamic-insert" data-target-selector="#test-table > tbody > tr:nth-child(1) > td:nth-child(1)"}

| A | B |
| C | D |
{:class="dynamic-insert" data-target-selector="#test-table > tbody > tr:nth-child(2) > td:nth-child(2)"}
```

결과는 다음과 같다.

| 1  | 2  | 3  |
|----|----|----|
| 4  | 5  | 6  |
| 7  | 8  | 9  |
| 10 | 11 | 12 |
{:id="test-table"}

```javascript
console.log('hello world!');
```
{:class="dynamic-insert" data-target-selector="#test-table > tbody > tr:nth-child(1) > td:nth-child(1)"}

| A | B |
| C | D |
{:class="dynamic-insert" data-target-selector="#test-table > tbody > tr:nth-child(2) > td:nth-child(2)"}

## 구현

[a722a5d7ffa10b291f05101f3a8fa1b6a05fe364]( https://github.com/johngrib/johngrib.github.io/commit/a722a5d7ffa10b291f05101f3a8fa1b6a05fe364 )

```javascript
;(function() {
    const source = document.querySelectorAll('.dynamic-insert');

    if (source == null) {
        return;
    }

    for (let i = 0; i < source.length; i++) {
        const item = source[i];

        const target = item.getAttribute('data-target-selector');
        document.querySelector(target).innerHTML = item.outerHTML;
        item.remove();
    }
})();
```
