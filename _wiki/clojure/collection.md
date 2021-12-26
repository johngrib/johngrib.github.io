---
layout  : wiki
title   : Clojure의 collection
summary : 작성중인 문서
date    : 2021-12-26 17:48:37 +0900
updated : 2021-12-26 18:19:55 +0900
tag     : clojure
toc     : true
public  : true
parent  : [[/clojure/study]]
latex   : false
---
* TOC
{:toc}

## java.util.List 구현체
### List

List는 REPL의 출력 결과에서 `( )`로 표현된다.

그런데 `( )`로 List를 만들면 첫번째 아이템을 함수로 평가하려다 예외를 던지게 된다.

```
(1 2 3)
Execution error (ClassCastException) at tutorial.core/eval1649 (form-init10906104573479548905.clj:1).
class java.lang.Long cannot be cast to class clojure.lang.IFn (java.lang.Long is in module java.base of loader 'bootstrap'; clojure.lang.IFn is in unnamed module of loader 'app')
```

위의 에러 메시지를 잘 읽어보자. `1`을 `clojure.lang.Ifn`으로 캐스팅하려 했지만 `1`은 함수가 아니기 때문에 캐스팅이 실패한 것이다.

이런 리터럴을 함수 호출이 아니라 List로 사용하려면 평가를 방지하기 위해 `'`(quot, 인용) 심볼을 앞에 붙인다.

```clojure
'(1 2 3)
```

이렇게 만든 List의 타입은 `clojure.lang.PersistentList`이다. [[/clojure/study/PersistentList]]도 잊지 말고 읽어 두도록 하자. 연결 리스트 구조로 되어 있다는 것도 잊지 말자.

```clojure
(class '(1 2)) ; clojure.lang.PersistentList
```

한편 REPL에서 리스트를 평가해보면 다음과 같이 문자열로 표현되어 출력되는 것을 볼 수 있다.

```clojure
'(1 2 3)
=> (1 2 3)
```

이렇게 출력되도록 작동하고 있는 곳은 [`clojure.lang.RT.java`]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha3/src/jvm/clojure/lang/RT.java#L1905 )를 읽어보면 찾을 수 있다.

```java
if(x == null)
    w.write("nil");
else if(x instanceof ISeq || x instanceof IPersistentList) {
    w.write('(');
    printInnerSeq(seq(x), w);
    w.write(')');
}
```

`ISeq`나 `IPersistentList`의 구현체라면 양쪽에 `(`와 `)`를 붙여서 출력하도록 되어 있다.

보너스: 바로 윗줄을 보면 `null` 값은 `nil`로 출력하도록 되어 있으니 Java의 `null`이 Clojure에서 `nil`로 표현된다는 것도 알 수 있다.


### Vector

한편, Vector는 `[ ]`를 사용해 만들 수 있고, 타입은 `clojure.lang.PersistentVector`이다.
소스코드 [PersistentVector.java]( https://github.com/clojure/clojure/blob/541f04f1b75f95b159af0e4617643d45ebd43596/src/jvm/clojure/lang/PersistentVector.java )도 틈날 때 읽어두자.

```clojure
(type [])
=> clojure.lang.PersistentVector
```

Vector는 `get`을 사용해 인덱스에 해당하는 값을 꺼낼 수 있다.

```clojure
(def v [12 52 34 61 19]) ; Vector 선언

(get v 2)          ; 34
(get [65 31 58] 1) ; 31
```

`get`을 제외하면 Javascript와 비슷한 느낌이다.

```javascript
const v = [12, 52, 34, 61, 19];

v[2];            // 34
[65, 31, 58][2]; // 31
```

길이는 `count`로 잴 수 있다.

```clojure
(count v) ; 5
```

Vector에 아이템을 추가하려면 `conj`를 사용한다.
어원은 "conjoin(결합, 연합)"이라 한다.

```clojure
(conj v 1 2 3)
; [12 52 34 61 19 1 2 3]
```

Javascript의 `push`와 비슷하게 작동하는 것 같이 보이지만...

```javascript
v.push(1, 2, 3);

console.log(v); // [12, 52, 34, 61, 19, 1, 2, 3]
```

Javascript의 `push`는 list의 뒤에 아이템을 이어붙이기 때문에 list가 변경된다.

그러나 Clojure의 Vector는 불변 자료형이므로 `conj`를 통해 변경되지 않는다.
`conj`는 새로운 Vector를 만들어 리턴한 것이므로, `conj`의 결과에 이름을 붙일 필요가 있다면 따로 바인딩을 해줘야 한다.

```clojure
(conj v 1 2 3)
; [12 52 34 61 19 1 2 3]

(println v)
; [12 52 34 61 19]
```

한편 Vector를 슬라이싱할 때에는 `subvec`을 사용한다. 이것도 새로운 Vector를 리턴한다는 점에 주의해야 한다.

이번 예제에서는 number가 아니라 char Vector를 만들어 보자.

```clojure
(subvec [\a \b \c \d] 2)
=> [\c \d]

(subvec [\a \b \c \d] 2 3)
=> [\c]
```

Vector는 REPL에서도 `[ ]`와 같이 출력되는데, 이것도 [`RT.java`]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha3/src/jvm/clojure/lang/RT.java#L1960 )를 보면 알 수 있다.

```java
else if(x instanceof IPersistentVector) {
    IPersistentVector a = (IPersistentVector) x;
    w.write('[');
    for(int i = 0; i < a.count(); i++) {
        print(a.nth(i), w);
        if(i < a.count() - 1)
            w.write(' ');
    }
    w.write(']');
}
```

## collection용 함수

### first

`first`는 첫 번째 아이템을 리턴한다.

```clojure
(first [12 52 34 61 19]) ; 12
```

### rest

첫 번째 아이템을 제거한 리스트는 `rest`로 얻는다. 재귀할 일이 있을 때 종종 사용하게 되겠지.

```clojure
(rest [12 52 34 61 19]) ; (52 34 61 19)

(rest [1 2 3]) ; (2 3)
```


### take

`take`는 앞에서부터 잘라낸 리스트를 리턴한다.

```clojure
(take 2 [12 52 34 61 19]) ; (12 52)
```

### reverse

`reverse`는 뒤집는다.

```clojure
(reverse [12 52 34 61 19]) ; (19 61 34 52 12)
```
