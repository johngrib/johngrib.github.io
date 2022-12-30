---
layout  : wiki
title   : Markdown
summary : 
date    : 2022-12-30 17:36:07 +0900
updated : 2022-12-30 22:59:46 +0900
tag     : 
resource: C7/560D95-CA1F-4AA4-A4C4-134414A9C712
toc     : true
public  : true
parent  : [[/language]]
latex   : false
---
* TOC
{:toc}

## Examples

### 인라인 스타일

- **굵게**
    - `**굵게**`, `__굵게__`
    - font-weight: bold;
- _기울이기_
    - `_기울이기_`, `*기울이기*`
    - font-style: italic;
- ***굵게+기울이기***
    - `***굵게+기울이기***`, `___굵게+기울이기___`
    - font-weight: bold; font-style: italic;
- `code`
    - ``` `code` ```
    - \<code>code</code>
- ~~취소선~~
    - `~~취소선~~`
    - text-decoration: line-through;
- escape는 `\` 를 사용
    - `\**굵게\**`, \**굵게**
    - `\*기울이기\*`, \*기울이기*
    - ``` \`code` ```, \`code`
    - `\~~취소선~~`, \~~취소선~~

### 용어 정의를 위한 dt, dd 태그의 적용

```markdown
강아지
: 어린 개.
: 어린 손자나 자식을 귀엽다는 뜻으로 이르는 말.
```

강아지
: 어린 개.
: 어린 손자나 자식을 귀엽다는 뜻으로 이르는 말.

### 소제목 링크

```markdown
[Examples 소제목으로 점프](#examples)
```

[Examples 소제목으로 점프](#examples)

### 커스텀 id 부여하기

```markdown
#### 커스텀 아이디를 붙일 소제목 {#custom-id}
```

위와 같이 하면 아래와 같이 소제목이 렌더링되며, 아이디는 `custom-id`가 된다.

#### 커스텀 아이디를 붙일 소제목 {#custom-id}

### 표

```
| col1 | col2 | col3 |
|------|------|------|
| 1-1  | 1-2  | 1-3  |
| 2-1  | 2-2  | 2-3  |
```

| col1 | col2 | col3 |
|------|------|------|
| 1-1  | 1-2  | 1-3  |
| 2-1  | 2-2  | 2-3  |

```
| left align | center align | right align |
| :---       | :------:     | ----:       |
| 1-1        | 1-2          | 1-3         |
| 2-1        | 2-2          | 2-3         |
```

| left align | center align | right align |
| :---       | :------:     | ----:       |
| 1-1        | 1-2          | 1-3         |
| 2-1        | 2-2          | 2-3         |


### 체크박스

```
- [x] 빨래하기
- [ ] 청소하기
    - [ ] 책상 청소
    - [X] 화장실 청소
- [ ] 공부하기
    - [X] 수학
    - [X] 과학
```

- [x] 빨래하기
- [ ] 청소하기
    - [ ] 책상 청소
    - [X] 화장실 청소
- [ ] 공부하기
    - [X] 수학
    - [X] 과학

### 수평선

다음과 같이 입력하면 \<hr> 태그(수평선)로 표현된다.

```
---
수평선1

---
수평선2
```

---
수평선1

---
수평선2

## 참고문헌

- <https://www.markdownguide.org/extended-syntax/ >
