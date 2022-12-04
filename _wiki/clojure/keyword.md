---
layout  : wiki
title   : Clojure Keyword
summary : Clojure의 Keyword
date    : 2022-11-20 21:35:56 +0900
updated : 2022-11-20 21:47:28 +0900
tag     : clojure string
resource: 80/F2208E-7766-4DD0-9985-132D5A44A72D
toc     : true
public  : true
parent  : [[/clojure]]
latex   : false
---
* TOC
{:toc}

## 코드

### 생성자

`Keyword`의 생성자는 `private` 이며, 이 생성자는 `intern` 메소드에서만 호출한다.

[Clojure 1.11.1 clojure.lang.Keyword]( https://github.com/clojure/clojure/blob/clojure-1.11.1/src/jvm/clojure/lang/Keyword.java#L63-L66 )

```java
private Keyword(Symbol sym){
    this.sym = sym;
    hasheq = sym.hasheq() + 0x9e3779b9;
}
```

`hasheq` 필드에 `sym.hasheq()`에 `0x9e3779b9`를 더한 값이 들어간다는 것에 주목.

### hasheq

[Clojure 1.11.1 clojure.lang.Keyword.hashCode]( https://github.com/clojure/clojure/blob/clojure-1.11.1/src/jvm/clojure/lang/Keyword.java#L84-L90 )

```java
public final int hashCode(){
    return sym.hashCode() + 0x9e3779b9;
}

public int hasheq() {
    return hasheq;
}
```

Java 코드에서는 `hashCode`가 있지만, Clojure에서 판별하는 해시값은 `hasheq`를 사용하므로 Clojure의 Keyword는 생성될 때 캐싱된 해시값을 그대로 사용하는 셈이다.

