---
layout  : wiki
title   : Sequences
summary : Clojure Reference 문서 번역
date    : 2022-06-19 14:22:33 +0900
updated : 2022-06-19 16:06:29 +0900
tag     : clojure 번역
resource: A2/59829C-7442-43CF-AE57-780176B185BD
toc     : true
public  : true
parent  : [[/clojure/reference]]
latex   : false
---
* TOC
{:toc}

- 원문: [Sequences]( https://clojure.org/reference/sequences )

## Sequences : Clojure Reference 문서 번역

>
Clojure defines many algorithms in terms of sequences (seqs).
A seq is a logical list, and unlike most Lisps where the list is represented by a concrete, 2-slot structure, Clojure uses the ISeq interface to allow many data structures to provide access to their elements as sequences.
The [seq][seq] function yields an implementation of ISeq appropriate to the collection.
Seqs differ from iterators in that they are persistent and immutable, not stateful cursors into a collection.
As such, they are useful for much more than foreach - functions can consume and produce seqs, they are thread safe, they can share structure etc.
>
Most of the sequence library functions are _lazy_, i.e. functions that return seqs do so incrementally, as they are consumed, and thus consume any seq arguments incrementally as well.
Functions returning lazy seqs can be implemented using the [lazy-seq][lazy-seq] macro.
See also [lazy][lazy].

Clojure는 많은 알고리즘을 sequence(seq)의 관점에서 정의합니다.
seq는 논리적인 list인데, 구체적인 2-slot 구조를 가진 일반적인 Lisp의 list와는 달리 Clojure는 ISeq 인터페이스를 사용해 많은 자료구조의 원소에 시퀀스의 방식으로 접근할 수 있도록 해줍니다.

[seq][seq] 함수는 컬렉션에 적합한 ISeq 구현을 제공해줍니다.
Seq는 iterator와 달리 persistent하고 immutable하며, 상태 기반의 커서를 사용하지 않습니다.
Clojure의 함수들은 seq를 생성할 수 있고, 소비할 수 있으며, 스레드 안전하며, 구조를 공유하는 것도 가능하다는 점에서 foreach를 통한 반복이나 순회보다 유용합니다.

대부분의 sequence 라이브러리 함수들은 lazy하게 작동합니다.
seq를 리턴하는 함수들은 호출될 때마다 점진적으로 작업을 해나가므로, seq의 모든 인자들도 점진적으로 소비된다는 것입니다.
[lazy-seq][lazy-seq] 매크로를 사용하면 lazy seq를 구현할 수 있습니다.
자세한 내용은 [lazy][lazy]를 참고하세요.

>
When [seq][seq] is used on objects that implement Iterable, the resulting sequence is still immutable and persistent, and will represent a single pass across the data.
Because that pass might happen lazily, the pass might see changes that happen after [seq][seq] has been called.
Also, if the backing iterator is subject to ConcurrentModificationException, then so too is the resulting seq.
When seq is used on native Java arrays, changes to the underlying array will be reflected in the seq - you must copy the source array to get full immutability.
That said, there is still a lot of utility to using seq on Iterables and arrays since seqs support multi-pass and lazy algorithms.
Robust programs should not mutate arrays or Iterables that have seqs on them.
>
Many of the functions in the seq library take one or more collections, call [seq][seq] on them, and then operate on the resulting seq.
In other words, many of these functions take collections but operate on their seqs.

Iterable을 구현하는 객체에 [seq][seq] 함수를 사용해서 얻는 결과 sequence도 immutable하며 persistent 합니다.
그리고 단일한 접근(single pass)을 통해 데이터를 가로지를 수 있음을 표현하는 것이기도 합니다.
접근이 lazy하게 발생하기 때문에, 변화의 결과는 [seq][seq]가 호출된 이후 시점부터 볼 수 있게 됩니다.

또한 backing iterator가 ConcurrentModificationException의 영향을 받는다면 결과 seq도 똑같은 예외의 영향을 받을 것입니다.

만약 Java의 네이티브 array에 seq를 적용한다면 바탕이 되는 array에 가해지는 변경이 seq에 반영됩니다.
완전한 불변성이 필요하다면 반드시 원본 array를 복사해서 사용해야 합니다.

seq가 다양한 접근(multi-pass)과 lazy 알고리즘을 지원하기 때문에 Iterable이나 array를 기반으로 seq를 사용할 수 있는 편의 기능들이 있습니다.
만약 견고한 프로그램을 만들고자 한다면 seq를 적용한 array나 Iterable의 내용을 절대로 변경하면 안 됩니다.

seq 라이브러리의 많은 함수들은 하나 이상의 collection을 받아 [seq][seq] 함수에 적용한 다음, 그 결과로 얻은 seq로 작업을 합니다.
즉, 다양한 함수들이 collection을 받는 것 같지만 실제로는 seq로 바꿔서 작업을 수행합니다.


### The Seq interface

#### (first coll)

>
Returns the first item in the collection.
Calls seq on its argument.
If coll is nil, returns nil.

collection의 첫번째 아이템을 리턴합니다.

`first` 함수는 인자로 받은 collection에 seq를 호출하는 방식으로 작동합니다.
만약 coll 이 nil이면 `first` 함수는 nil을 리턴합니다.

>
> **역주**
>
> [clojure.core의 first 함수][core.first]를 보면 `seq`는 보이지 않고 `clojure.lang.RT.first`를 호출하는 방식으로 되어 있다.
>
> ```clojure
> (def
>  ^{:arglists '([coll])
>    :doc "Returns the first item in the collection. Calls seq on its
>     argument. If coll is nil, returns nil."
>    :added "1.0"
>    :static true}
>  first (fn ^:static first [coll] (. clojure.lang.RT (first coll))))
> ```
>
> [`RT.first` Java 메소드][RT.first]로 따라 들어가서 살펴보면 `seq`를 네이티브 Java 코드에서 사용하고 있음을 알 수 있다.
>
> ```java
> static public Object first(Object x){
>     if(x instanceof ISeq)
>         return ((ISeq) x).first();
>     ISeq seq = seq(x);
>     if(seq == null)
>         return null;
>     return seq.first();
> }
> ```
{:style="background-color: #ecf1e8;"}

#### (rest coll)

>
Returns a sequence of the items after the first.
Calls seq on its argument.
If there are no more items, returns a logical sequence for which **seq** returns nil.

첫번째 아이템 이후의 아이템들의 sequence를 리턴합니다.
인자로 받은 collection에 seq를 호출하는 방식으로 작동합니다.
만약 첫번째 아이템 이후의 아이템들이 없다면, `seq` 함수가 nil을 리턴하는 논리적 sequence를 리턴합니다.

>
**역주**
>
[`rest` 함수][core.rest]의 내용을 보면 [`clojure.lang.RT`의 Java 메소드 `more`][RT.more]를 호출하고 있음을 알 수 있다.
>
> ```clojure
> (def
>  ^{:arglists '([coll])
>    :tag clojure.lang.ISeq
>    :doc "Returns a possibly empty seq of the items after the first. Calls seq on its
>   argument."
>    :added "1.0"
>    :static true}  
>  rest (fn ^:static rest [x] (. clojure.lang.RT (more x))))
> ```
>
`seq == null` 부분을 읽어보면 [`PersistentList.EMPTY`][EMPTY]를 리턴하도록 되어 있다.
>
> ```java
> static public ISeq more(Object x){
>     if(x instanceof ISeq)
>         return ((ISeq) x).more();
>     ISeq seq = seq(x);
>     if(seq == null)
>         return PersistentList.EMPTY;
>     return seq.more();
> }
> ```
>
한편 `PersistentList.EMPTY`의 타입인 [`EmptyList`][EmptyList]는 간단한 [[/pattern/null-object]] 구현이다.
>
> ```java
> final public static EmptyList EMPTY = new EmptyList(null);
>
> public Object first() {
>     return null;
> }
> public ISeq next() {
>     return null;
> }
> public ISeq more() {
>     return this;
> }
> public int count(){
>     return 0;
> }
> ```
{:style="background-color: #ecf1e8;"}


#### (cons item seq)

>
Returns a new seq where item is the first element and seq is the rest.
>
For a discussion of **rest** vs. **next** and **lazy-seq** see [lazy][lazy].

주어진 item을 첫번째 원소로 삼고, seq를 나머지로 삼는 새로운 seq를 리턴합니다.

`rest` vs `next`, `lazy-seq`에 대한 논의는 [lazy][lazy]문서를 참고하세요.

>
**역주**
>
[`cons` 함수][core.cons]의 내용을 보면 [`clojure.lang.RT`의 Java 메소드 `cons`][RT.cons]를 호출하고 있음을 알 수 있다.
>
> ```clojure
> (def
>  ^{:arglists '([x seq])
>     :doc "Returns a new seq where x is the first element and seq is
>     the rest."
>    :added "1.0"
>    :static true}
>
>  cons (fn* ^:static cons [x seq] (. clojure.lang.RT (cons x seq))))
> ```
>
Java 코드를 잘 읽어보면 `Cons`가 연결 리스트 구조로 이루어져 있음을 추측할 수 있다.
>
> ```java
> static public ISeq cons(Object x, Object coll){
>     //ISeq y = seq(coll);
>     if(coll == null)
>         return new PersistentList(x);
>     else if(coll instanceof ISeq)
>         return new Cons(x, (ISeq) coll);
>     else
>         return new Cons(x, seq(coll));
> }
> ```
{:style="background-color: #ecf1e8;"}

### The Seq library

>
This is a sampling of the primary sequence functions, grouped broadly by their capabilities.
Some functions can be used in different ways and so appear in more than one group.
There are many more listed in the [API](https://clojure.github.io/clojure/ ) section.
>
Since Clojure 1.7, Clojure also provides [transducers][transducers], an alternate model for composable transformations on collections.
Transducers decouple the input, processing, and output parts of transformation and allow reuse of transformations in more contexts, such as core.async channels.
Many of the sequence functions in the list below will create transducers if the input collection is omitted.
See the Transducers page for more details.

이 목록은 중요한 sequence 함수들을 용도별로 나열해 본 것입니다.
용도에 따라 사용 방식이 달라지는 함수도 있어서 둘 이상의 그룹에 포함된 것도 있습니다.
[API](https://clojure.github.io/clojure/ )에 가보면 더 많은 함수들을 볼 수 있습니다.

Clojure 1.7 부터 Clojure는 컬렉션에 대한 조합 가능한 변환기 모델로 [transducer][transducer]도 제공합니다.
transducer는 변환 과정을 이루는 입력, 처리, 출력 부분을 분리하여, core.async 채널 같은 더 다양한 컨텍스트에서 변환 로직을 재사용할 수 있게 해줍니다.
아래 목록에 있는 많은 sequence 함수들은 입력 collection이 생략된 경우라면 transducer를 생성합니다.
자세한 내용은 Transducers 페이지를 참고하세요.

#### Seq in, Seq out

>
Shorter seq from a longer seq: [distinct][distinct] [filter][filter] [remove][remove] [for][for] [keep][keep] [keep-indexed][keep-indexed]  
Longer seq from a shorter seq: [cons][cons] [concat][concat] [lazy-cat][lazy-cat] [mapcat][mapcat] [cycle][cycle] [interleave][interleave] [interpose][interpose]  
Seq with head-items missing: [rest][rest] [next][next] [fnext][fnext] [nnext][nnext] [drop][drop] [drop-while][drop-while] [nthnext][nthnext] [for][for]  
Seq with tail-items missing: [take][take] [take-nth][take-nth] [take-while][take-while] [butlast][butlast] [drop-last][drop-last] [for][for]  
Rearrangment of a seq: [flatten][flatten] [reverse][reverse] [sort][sort] [sort-by][sort-by] [shuffle][shuffle]  
Create nested seqs: [split-at][split-at] [split-with][split-with] [partition][partition] [partition-all][partition-all] [partition-by][partition-by]  
Process each item of a seq to create a new seq: [map][map] [pmap][pmap] [mapcat][mapcat] [for][for] [replace][replace] [reductions][reductions] [map-indexed][map-indexed] [seque][seque]

#### Using a seq

>
Extract a specific-numbered item from a seq: [first][first] [ffirst][ffirst] [nfirst][nfirst] [second][second] [nth][nth] [when-first][when-first] [last][last] [rand-nth][rand-nth]  
Construct a collection from a seq: [zipmap][zipmap] [into][into] [reduce][reduce] [set][set] [vec][vec] [into-array][into-array] [to-array-2d][to-array-2d] [frequencies][frequencies] [group-by][group-by]  
Pass items of a seq as arguments to a function: [apply][apply]  
Compute a boolean from a seq: [not-empty][not-empty] [some][some] [reduce][reduce] [seq?][seq?] [every?][every?] [not-every?][not-every?] [not-any?][not-any?] [empty?][empty?]  
Search a seq using a predicate: [some][some] [filter][filter]  
Force evaluation of lazy seqs: [doseq][doseq] [dorun][dorun] [doall][doall]  
Check if lazy seqs have been forcibly evaluated: [realized?][realized?]

#### Creating a seq

>
Lazy seq from collection: [seq][seq] [vals][vals] [keys][keys] [rseq][rseq] [subseq][subseq] [rsubseq][rsubseq]  
Lazy seq from producer function: [lazy-seq][lazy-seq] [repeatedly][repeatedly] [iterate][iterate]  
Lazy seq from constant: [repeat][repeat] [range][range]  
Lazy seq from other objects: [line-seq][line-seq] [resultset-seq][resultset-seq] [re-seq][re-seq] [tree-seq][tree-seq] [file-seq][file-seq] [xml-seq][xml-seq] [iterator-seq][iterator-seq] [enumeration-seq][enumeration-seq]

[EMPTY]: https://github.com/clojure/clojure/blob/clojure-1.11.1/src/jvm/clojure/lang/PersistentList.java#L68
[EmptyList]: https://github.com/clojure/clojure/blob/clojure-1.11.1/src/jvm/clojure/lang/PersistentList.java#L151-L340
[RT.cons]: https://github.com/clojure/clojure/blob/clojure-1.11.1/src/jvm/clojure/lang/RT.java#L680-L688
[RT.first]: https://github.com/clojure/clojure/blob/clojure-1.11.1/src/jvm/clojure/lang/RT.java#L690-L697
[RT.more]: https://github.com/clojure/clojure/blob/clojure-1.11.1/src/jvm/clojure/lang/RT.java#L720-L727
[apply]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/apply
[butlast]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/butlast
[concat]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/concat
[cons]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/cons
[core.cons]: https://github.com/clojure/clojure/blob/clojure-1.11.1/src/clj/clojure/core.clj#L22-L29
[core.first]: https://github.com/clojure/clojure/blob/clojure-1.11.1/src/clj/clojure/core.clj#L49-L55
[core.rest]: https://github.com/clojure/clojure/blob/clojure-1.11.1/src/clj/clojure/core.clj#L66-L73
[cycle]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/cycle
[distinct]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/distinct
[doall]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/doall
[dorun]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/dorun
[doseq]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/doseq
[drop-last]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/drop-last
[drop-while]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/drop-while
[drop]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/drop
[empty?]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/empty?
[enumeration-seq]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/enumeration-seq
[every?]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/every?
[ffirst]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/ffirst
[file-seq]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/file-seq
[filter]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/filter
[first]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/first
[flatten]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/flatten
[fnext]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/fnext
[for]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/for
[frequencies]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/frequencies
[group-by]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/group-by
[interleave]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/interleave
[interpose]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/interpose
[into-array]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/into-array
[into]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/into
[iterate]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/iterate
[iterator-seq]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/iterator-seq
[keep-indexed]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/keep-indexed
[keep]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/keep
[keys]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/keys
[last]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/last
[lazy-cat]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/lazy-cat
[lazy-seq]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/lazy-seq
[lazy]: https://clojure.org/reference/lazy
[line-seq]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/line-seq
[map-indexed]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/map-indexed
[map]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/map
[mapcat]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/mapcat
[next]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/next
[nfirst]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/nfirst
[nnext]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/nnext
[not-any?]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/not-any?
[not-empty]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/not-empty
[not-every?]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/not-every?
[nth]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/nth
[nthnext]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/nthnext
[partition-all]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/partition-all
[partition-by]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/partition-by
[partition]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/partition
[pmap]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/pmap
[rand-nth]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/rand-nth
[range]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/range
[re-seq]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/re-seq
[realized?]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/realized?
[reduce]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/reduce
[reductions]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/reductions
[remove]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/remove
[repeat]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/repeat
[repeatedly]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/repeatedly
[replace]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/replace
[rest]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/rest
[resultset-seq]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/resultset-seq
[reverse]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/reverse
[rseq]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/rseq
[rsubseq]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/rsubseq
[second]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/second
[seq?]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/seq?
[seq]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/seq
[seque]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/seque
[set]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/set
[shuffle]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/shuffle
[some]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/some
[sort-by]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/sort-by
[sort]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/sort
[split-at]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/split-at
[split-with]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/split-with
[subseq]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/subseq
[take-nth]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/take-nth
[take-while]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/take-while
[take]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/take
[to-array-2d]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/to-array-2d
[transducers]: https://clojure.org/reference/transducers
[tree-seq]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/tree-seq
[vals]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/vals
[vec]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/vec
[when-first]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/when-first
[xml-seq]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/xml-seq
[zipmap]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/zipmap

