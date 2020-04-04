---
layout  : wiki
title   : Integer 이것저것
summary : 
date    : 2019-12-08 17:38:25 +0900
updated : 2019-12-08 18:51:17 +0900
tag     : 
toc     : true
public  : true
parent  : [[index]]
latex   : true
---
* TOC
{:toc}

## 범위 관련

* `Integer.MAX_VALUE`는 $$2^{31} -1 = 2,147,483,647$$ 이다.
* `Integer.MIN_VALUE`는 $$-2^{31} = -2,147,483,648$$ 이다.

따라서 다음과 같은 컴파일 에러가 가능하다.

```java
/* Java */
// 정상
int a = -2147483648;
long b = -9223372036854775808L;

// compile error
int c = -(2147483648);
long d = -(9223372036854775808L);
```

