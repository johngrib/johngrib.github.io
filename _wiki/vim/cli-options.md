---
layout  : wiki
title   : Vim 의 CLI 옵션들
summary : 작성 중인 문서
date    : 2024-09-07 17:33:16 +0900
updated : 2024-09-07 17:48:19 +0900
tag     : 
resource: 86/9983A2-4FB6-4BFB-8A79-FEDDE89F50AD
toc     : true
public  : true
parent  : [[/vim]]
latex   : false
---
* TOC
{:toc}

## `-` {#dash}

`-` 를 사용하면 표준 입력을 받아 편집할 수 있다.

```bash
ls | vim -
```

### +number {#plus-number}

지정한 행번호로 커서가 이동된 상태로 vim이 시작된다.

```bash
seq 10 | vim - +5
```

- 5번 행으로 이동된 상태로 vim이 시작된다.

```bash
vim +514 file.txt
```

- file.txt 파일의 514번 행으로 커서가 이동된 상태로 vim이 시작된다.


### +/pattern {#plus-pattern}

지정한 패턴을 검색해 매칭된 첫 번째 결과로 커서가 이동된 상태로 vim이 시작된다.

```bash
seq 1 100000 | vim - +/999
```

- 1 ~ 100000 을 출력한 결과에서 999를 검색해 매칭된 첫 번째 결과로 커서가 이동된 상태로 vim이 시작된다.

#### very magic 도 사용 가능하다 {#plus-pattern-very-magic}

```bash
 seq 1 100000 | vim - +'/\v9{2,3}1{2,}'
```

- 따옴표로 잘 감싸면 `\v`로 very magic 정규식을 사용하는 것도 가능하다.
- 위와 같이 실행하면 커서가 `9911`로 이동된 상태로 vim이 시작된다.

