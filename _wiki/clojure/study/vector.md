---
layout  : wiki
title   : Clojure vector
summary : 
date    : 2022-01-22 16:30:48 +0900
updated : 2022-01-25 00:14:12 +0900
tag     : clojure
toc     : true
public  : true
parent  : [[/clojure/study]]
latex   : true
---
* TOC
{:toc}

$$
\def\ceil#1{\lceil #1 \rceil}
\def\floor#1{\lfloor #1 \rfloor}
\def\frfr#1{\{ #1 \}}
$$

## defn

```clojure
(defn vector
  "Creates a new vector containing the args."
  {:added "1.0"
   :static true}
  ([] [])
  ([a] [a])
  ([a b] [a b])
  ([a b c] [a b c])
  ([a b c d] [a b c d])
    ([a b c d e] [a b c d e])
    ([a b c d e f] [a b c d e f])
  ([a b c d e f & args]
     (. clojure.lang.LazilyPersistentVector (create (cons a (cons b (cons c (cons d (cons e (cons f args))))))))))
```

## Examples

```clojure
[]       ; []
(vector) ; []

[1 2 3]        ; [1 2 3]
(vector 1 2 3) ; [1 2 3]

(type []) ; clojure.lang.PersistentVector
```

## clojure.lang.PersistentVector

`IPersistentVector`의 구현체 중 하나인 `clojure.lang.PersistentVector`.

### TransientVector

`PersistentVector`의 정적 팩토리 메소드를 보면 `TransientVector`라는 타입을 볼 수 있다.
`TransientVector`는 `PersistentVector`의 내부 클래스이다.

[clojure.lang.PersistentVector::create]( https://github.com/clojure/clojure/blob/5451cee06b9e31513a19e596e4e155d1f08d2a8d/src/jvm/clojure/lang/PersistentVector.java#L91 )

```java
static public PersistentVector create(List list){
    int size = list.size();
    if (size <= 32)
        return new PersistentVector(size, 5, PersistentVector.EMPTY_NODE, list.toArray());

    TransientVector ret = EMPTY.asTransient();
    for(int i=0; i<size; i++)
        ret = ret.conj(list.get(i));
    return ret.persistent();
}
```

1. size가 32 이하라면 `new PersistentVector`를 호출하며 `list.toArray()`를 넘긴다.
    - 이렇게 넘겨준 `list.toArray()`는 새로 생성된 `PersistentVector`의 tail이 된다.
2. 그러나 32를 초과한다면 `TransientVector`를 생성한다.
    - `asTransient()`는 `return new TransientVector(this);`.
3. `items`를 순회하며 `TransientVector`의 `conj`를 호출해 `item`을 하나하나 붙여준다.
    - 이 `conj`는 매번 새로운 벡터를 생성하지 않는다. `TransientVector`의 상태를 바꿔가며 작업을 한다.
    - [[/clojure/reference/transient]] 문서 참고.
4. 루프가 끝나면 `TransientVector`를 `PersistentVector`로 변환해 리턴한다.

`persistent()`는 단순하게 `arraycopy`를 수행한 다음, `new PersistentVector`를 리턴한다.

```java
public PersistentVector persistent(){
    ensureEditable();
    root.edit.set(null);
    Object[] trimmedTail = new Object[cnt-tailoff()];
    System.arraycopy(tail,0,trimmedTail,0,trimmedTail.length);
    return new PersistentVector(cnt, shift, root, trimmedTail);
}
```

`TransientVector`는 `PersistentVector`를 생성하는 과정에서 퍼포먼스를 위해 임시로 생성하는 mutable한 자료구조로, 성능을 위해 선택된 방식이다.

단, `TransientVector`는 생성 과정에서만 사용되며, `PersistentVector`의 생성 결과로 공유되지는 않는다.

### 생성과 구조

`PersistentVector` 클래스를 열어보면 다음과 같은 멤버 필드들을 볼 수 있다.

[clojure.lang.PersistentVector]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/jvm/clojure/lang/PersistentVector.java#L39-L49 )

```java
final static AtomicReference<Thread> NOEDIT = new AtomicReference<Thread>(null);
public final static Node EMPTY_NODE = new Node(NOEDIT, new Object[32]);

final int cnt;
public final int shift;
public final Node root;
public final Object[] tail;
final IPersistentMap _meta;

public final static PersistentVector EMPTY =
    new PersistentVector(0, 5, EMPTY_NODE, new Object[]{});
```

- `Node EMPTY_NODE`: 비어있는 초기화된 노드. 길이는 `32`.
- `int cnt`: 벡터의 길이
- `int shift`: 
- `Node root`: 루트 노드
- `Object[] tail`: 벡터의 꼬리
- `IPersistentMap _meta`: 벡터의 메타 정보

여기에 있는 `root`와 `tail`이 `PersistentVector`에 담겨 있는 아이템을 나누어 갖게 된다.

`root`는 각각 `32`개의 아이템을 갖는 배열의 배열이며, `tail`은 `32`개 까지의 아이템을 가질 수 있는 배열이다.

`PersistentVector`를 생성할 때 임시로 만든 `TransientVector`에 `conj`를 사용해 새로운 아이템을 계속해서 추가하게 된다.
이 때 `tail`은 일종의 버퍼 역할을 하는데 `tail`에 32개의 아이템이 들어가게 되면 `tail`이 `root`에 추가되는 방식으로 작동한다.

아래는 이렇게 90개의 아이템이 있는 경우를 내가 그림으로 그린 것이다.

![]( ./vector-90.svg )

만약 아이템이 96개라면 `tail`의 아이템이 32개로 꽉 차게 된다.

![]( ./vector-96.svg )

아이템이 1개 더 있는 97개라면 `tail`이 그대로 `root[2]`가 되며, 새로운 `tail`이 만들어진다.

![]( ./vector-97.svg )

그림 속의 새로 만든 `tail`은 마치 1칸만 갖고 있는 것 같지만 실제로는 32 사이즈를 갖는 배열이다.

이 과정은 [`clojure.lang.PersistentVector::create(List list)`의 `return` 문](https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/jvm/clojure/lang/PersistentVector.java#L99 )에 break point를 찍어두고 벡터를 생성해보면 쉽게 관찰할 수 있다.

![]( ./create-break-point.jpg )

이렇게 `tail`에 값을 할당하거나, `tail`을 `root`로 옮겨 달아주는 작업은 `conj` 메소드를 읽어보면 알 수 있다.

[clojure.lang.PersistentVector::conj]( https://github.com/clojure/clojure/blob/5451cee06b9e31513a19e596e4e155d1f08d2a8d/src/jvm/clojure/lang/PersistentVector.java#L579 )

```java
public TransientVector conj(Object val){
    ensureEditable();
    int i = cnt;
    // tail에 아직 공간이 남아있다면 아이템을 tail에 할당해준다.
    if(i - tailoff() < 32)
        {
        tail[i & 0x01f] = val;
        ++cnt;
        return this;
        }
    // tail의 32칸이 꽉 차있는 상태라면,
    // tail을 root로 옮기고, tail을 새로 생성한다.
    // 이번에 추가하는 아이템은 새로 만든 tail에 할당해준다.
    Node newroot;
    Node tailnode = new Node(root.edit, tail);  // tail을 포함하고 있는 새로운 루트 노드
    tail = new Object[32];                      // 새로 만든 empty tail. 길이는 32.
    tail[0] = val;
    int newshift = shift;
    // 만약 root가 overflow 한다면...
    if((cnt >>> 5) > (1 << shift))
        {
        newroot = new Node(root.edit);
        newroot.array[0] = root;
        newroot.array[1] = newPath(root.edit,shift, tailnode);
        newshift += 5;
        }
    else
        newroot = pushTail(shift, root, tailnode);
    root = newroot;
    shift = newshift;
    ++cnt;
    return this;
}
```

여기에서 흥미로운 것은 root가 overflow 하게 되었을 때 `newroot`를 만들고, 기존의 `root`를 `newroot`의 `[0]`에 할당하는 부분이다.
`shift`와 `newshift`를 읽어보면 5씩 증가하는 값이라는 것을 알 수 있으므로, 이렇게 트리를 구성하는 기준도 `32`라는 것을 추측할 수 있다.

```java
// 만약 root가 overflow 한다면...
if((cnt >>> 5) > (1 << shift))
    {
    newroot = new Node(root.edit);
    newroot.array[0] = root;
    newroot.array[1] = newPath(root.edit,shift, tailnode);
    newshift += 5;
    }
```

따라서 아이템이 97개인 경우에 대한 그림도 트리 구조로 다시 그릴 수 있다.

![]( ./vector-97-tree.svg )

그리고 `root` 아이템의 수가 `32`를 초과하게 된다면 트리의 깊이도 깊어질 것이다.

이제 이걸 실험해 보자. 먼저 떠오르는 수는 `1024`와 `1056`이다.

$$ 32 \times 32 = 1024 $$

$$ 32 \times 32 + 32 = 1056 $$

아이템의 수가 1025개라면 다음과 같이 된다.

![]( ./vector-1025-tree.svg )

아이템의 수가 1056개라면 tail까지 꽉 차게 되며, 1057개가 되면 트리에 계층 구조가 만들어진다.

![]( ./vector-1057-tree.svg )

그림 속 `root[1].root[0]`을 빨간색으로 색칠한 이유는 해당 노드가 아이템의 수가 1056개일때까지는 tail이었다는 점을 강조하기 위해서이다.

그런데 이 그림을 보다보면 차수가 13인 B+ Tree와 유사한 모양을 갖고 있다는 것도 알 수 있다.

![]( ./bplus-example.png )

다만 `PersistentVector`는 B+ Tree와는 기능과 용도가 다르다.
`PersistentVector`는 B+ Tree와는 달리 값 탐색을 위한 구조로 만들어진 Tree가 아니며 인덱스를 통한 랜덤 접근을 지원하는 유사 배열 구현으로 볼 수 있다.

### 트리의 높이

아이템의 수에 따른 트리의 높이를 실험해보면 다음과 같다.

| 아이템의 수 | 트리의 높이 | tail 개수 | 아이템의 수           |
|------------:|:-----------:|:---------:|-----------------------|
| 1           | 0           | 1         | $$ 1 $$               |
| 32          | 0           | 32        | $$ 32 $$              |
| 33          | 2           | 1         | $$ 32 + 1 $$          |
| 1,056       | 2           | 32        | $$ 32 ^ 2 + 32 $$     |
| 1,057       | 3           | 1         | $$ 32 ^ 2 + 32 + 1 $$ |
| 32,800      | 3           | 32        | $$ 32 ^ 3 + 32 $$     |
| 32,801      | 4           | 1         | $$ 32 ^ 3 + 32 + 1 $$ |
| 1,048,608   | 4           | 32        | $$ 32 ^ 4 + 32 $$     |
| 1,048,609   | 5           | 1         | $$ 32 ^ 4 + 32 + 1 $$ |
| 33,554,464  | 5           | 32        | $$ 32 ^ 5 + 32 $$     |

잘 살펴보면 규칙이 눈에 보인다.
다음과 같이 규칙에 따라 트리의 높이를 계산하는 식 $$ f(n) $$을 만들어 보았다.

$$
f(n) =
\begin{cases}
    0,  & \text{if } \ 0 \le n \lt 33 \\
    2, & \text{if } \ 33 \le n \lt 65 \\
    \floor{ \log_{32} (N-33) } + 1, & \text{if } \ 65 \le n \\
\end{cases}
$$

{% raw %}
<div id="locomotive-search">
    <div>N = <input type="number" value="32800" id="vector-item-count"/>, f(n) = <span id="tree-height">3</span> </div>
    <div><input type="button" value="Tree 높이 계산하기" onClick="calcHeight()"/>
    <input type="button" value="WolframAlpha에 물어보기" onClick="wolfram()"/></div>
</div>
{% endraw %}

{% raw %}
<script>
function wolfram() {
    var cnt = parseInt(document.getElementById('vector-item-count').value, 10);
    var url = `https://www.wolframalpha.com/input/?i=floor%28log32%28${cnt}-33%29%29+%2B+1` ;
    window.open(url, '_blank');
}
function calcHeight() {
    var cnt = parseInt(document.getElementById('vector-item-count').value, 10);
    var div = document.getElementById('tree-height');
    var result = '';
    if (0 <= cnt && cnt < 33) {
        result = '0';
    } else if (33 <= cnt && cnt < 65) {
        result = '2';
    } else if (65 <= cnt) {
        result = Math.floor(Math.log(cnt - 33) / Math.log(32)) + 1;
    }
    div.innerHTML = result;
}
</script>
{% endraw %}

### nth를 통한 랜덤 엑세스

아이템의 수가 65 이상일 때 트리의 높이가 $$\floor{ \log_{32} (N-33) } + 1 $$ 이므로
랜덤 엑세스 퍼포먼스는 $$O( \log_{32} N )$$ 이라는 것을 알 수 있다.

아이템의 수가 3355만 4465개가 되어야 높이가 6에 도달한다는 걸 생각해 보면 랜덤 엑세스 퍼포먼스는 괜찮은 편이다.

이제 이 작업을 수행하는 `nth` 메소드를 살펴보자.

[clojure.lang.PersistentVector::nth]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/jvm/clojure/lang/PersistentVector.java#L161 )

```java
public Object nth(int i){
    ensureEditable();               // TransientVector 라면 예외를 던진다
    Object[] node = arrayFor(i);
    return node[i & 0x01f];
}
```

읽어보면 `arrayFor`에 인덱스값을 넘겨 배열을 받아오는데, 이건 해당 인덱스의 아이템이 포함되어 있는 노드 하나를 가져오는 작업이다.

노드 하나는 다음과 같이 가져온다.

```java
private Object[] arrayFor(int i){
    if(i >= 0 && i < cnt)
        {
        if(i >= tailoff())
            return tail;
        Node node = root;
        for(int level = shift; level > 0; level -= 5)
            node = (Node) node.array[(i >>> level) & 0x01f];
        return node.array;
        }
    throw new IndexOutOfBoundsException();
}
```

- 인덱스 `i`가 `tailoff()` 이상이면 `tail`을 리턴한다.
- 그렇지 않다면 `root` 노드의 깊이를 타고 내려가서 (이 과정에서 `for` 루프가 사용된다) 해당 인덱스가 포함된 노드를 리턴한다.


### Clojure 컴파일러의 벡터 생성

`Compiler::compile` 메소드의 시그니처는 다음과 같다.

[clojure.lang.Compiler::compile]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/jvm/clojure/lang/Compiler.java#L7757 )

```java
public static Object compile(
    Reader rdr, String sourcePath, String sourceName) throws IOException {
```

시그니처를 읽어보면 소스코드 파일 패스와 이름을 받아서 `Reader`로 읽고 뭔가를 한다는 것을 알 수 있다.

30줄 정도 더 내려가보자. `objx`의 `internalName`과 `objtype`을 결정하는 곳이 보인다.
아직 `objx`는 초기화만 되어 있는 상태라고 볼 수 있다.

[clojure.lang.Compiler::compile]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/jvm/clojure/lang/Compiler.java#L7792-L7796 )

```java
ObjExpr objx = new ObjExpr(null);
objx.internalName = sourcePath.replace(File.separator, "/").substring(0, sourcePath.lastIndexOf('.'))
                  + RT.LOADER_SUFFIX;

objx.objtype = Type.getObjectType(objx.internalName);
```

이후 `LispReader`가 form을 읽고, `compile1` 메소드로 `objx`와 form을 넘겨준다.

```java
for(Object r = LispReader.read(pushbackReader, false, EOF, false, readerOpts); r != EOF;
    r = LispReader.read(pushbackReader, false, EOF, false, readerOpts))
    {
        LINE_AFTER.set(pushbackReader.getLineNumber());
        COLUMN_AFTER.set(pushbackReader.getColumnNumber());
        compile1(gen, objx, r);
        LINE_BEFORE.set(pushbackReader.getLineNumber());
        COLUMN_BEFORE.set(pushbackReader.getColumnNumber());
    }
```

`compile1`은 form을 분석하고 expression을 생성한 다음, 넘겨받은 `objx`에 대해 `emit`을 실행한다.

```java
Expr expr = analyze(C.EVAL, form);
objx.keywords = (IPersistentMap) KEYWORDS.deref();
objx.vars = (IPersistentMap) VARS.deref();
objx.constants = (PersistentVector) CONSTANTS.deref();
expr.emit(C.EXPRESSION, objx, gen);
expr.eval();
```

`Expr`은 인터페이스이고, `Expr`의 벡터 구현체는 `VectorExpr` 이다. 그러므로 다음 메소드 `emit`이 실행된다.

[clojure.lang.Compiler.VectorExpr::emit]( https://github.com/clojure/clojure/blob/5451cee06b9e31513a19e596e4e155d1f08d2a8d/src/jvm/clojure/lang/Compiler.java#L3239 )

```java
public void emit(C context, ObjExpr objx, GeneratorAdapter gen){
    if(args.count() <= Tuple.MAX_SIZE)
        {
        for(int i = 0; i < args.count(); i++) {
            ((Expr) args.nth(i)).emit(C.EXPRESSION, objx, gen);
            }
        gen.invokeStatic(TUPLE_TYPE, createTupleMethods[args.count()]); // 여기
        }

    else
        {
        MethodExpr.emitArgsAsArray(args, objx, gen);
        gen.invokeStatic(RT_TYPE, vectorMethod);    // 여기
        }

    if(context == C.STATEMENT)
        gen.pop();
}
````

`// 여기`라고 표시한 부분을 보면 `createTupleMethods`와 `vectorMethod`가 보인다.

`createTupleMethods`의 정의는 다음과 같다.

[clojure.lang.Compiler]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/jvm/clojure/lang/Compiler.java#L140-L166 )

```java
final static Method createTupleMethods[] = {Method.getMethod("clojure.lang.IPersistentVector create()"),
    Method.getMethod("clojure.lang.IPersistentVector create(Object)"),
    Method.getMethod("clojure.lang.IPersistentVector create(Object,Object)"),
    Method.getMethod("clojure.lang.IPersistentVector create(Object,Object,Object)"),
    Method.getMethod("clojure.lang.IPersistentVector create(Object,Object,Object,Object)"),
    Method.getMethod("clojure.lang.IPersistentVector create(Object,Object,Object,Object,Object)"),
    Method.getMethod("clojure.lang.IPersistentVector create(Object,Object,Object,Object,Object,Object)")
};
```

`vectorMethod`는 이러하다.

```java
final static Method vectorMethod = Method.getMethod("clojure.lang.IPersistentVector vector(Object[])");
```

즉, `clojure.lang.IPersistentVector`의 정적 팩토리 메소드의 시그니처를 `String`으로 표현한 것을 `getMethod`를 통해 `Method`로 확보하고 있는 것이다.

잘 읽어보면 배열의 인덱스(`0` ~ `6`)이 인자의 수와 일치한다는 것도 알 수 있다.
아마도 벡터 표현식에 포함된 인자의 수를 통해 벡터를 생성하는 메소드에 접근할 것이다.

한편 이 메소드들은 `clojure.lang.Tuple` 클래스에 정의된 것들이다.

[clojure.lang.Tuple]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/jvm/clojure/lang/Tuple.java )

```java
public class Tuple{
    static final int MAX_SIZE = 6;

    public static IPersistentVector create(){return PersistentVector.EMPTY;}
    public static IPersistentVector create(Object v0)
        {return RT.vector(v0);}
    public static IPersistentVector create(Object v0, Object v1)
        {return RT.vector(v0, v1);}
    public static IPersistentVector create(Object v0, Object v1, Object v2)
        {return RT.vector(v0, v1, v2);}
    public static IPersistentVector create(Object v0, Object v1, Object v2, Object v3)
        {return RT.vector(v0, v1, v2, v3);}
    public static IPersistentVector create(Object v0, Object v1, Object v2, Object v3, Object v4)
        {return RT.vector(v0, v1, v2, v3, v4);}
    public static IPersistentVector create(Object v0, Object v1, Object v2, Object v3, Object v4, Object v5)
        {return RT.vector(v0, v1, v2, v3, v4, v5);}
}
```

## 참고문헌

- <https://clojuredocs.org/clojure.core/vector >
- [Understanding Clojure's Persistent Vectors, pt. 1]( https://hypirion.com/musings/understanding-persistent-vector-pt-1 )
- [Understanding Clojure's Persistent Vectors, pt. 2]( https://hypirion.com/musings/understanding-persistent-vector-pt-2 )
- [Understanding Clojure's Persistent Vectors, pt. 3]( https://hypirion.com/musings/understanding-persistent-vector-pt-3 )

