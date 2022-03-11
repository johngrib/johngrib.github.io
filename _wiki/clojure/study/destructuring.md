---
layout  : wiki
title   : Clojure의 destructuring
summary : 작성중인 문서
date    : 2022-03-11 23:16:09 +0900
updated : 2022-03-11 23:33:08 +0900
tag     : clojure
toc     : true
public  : true
parent  : [[/clojure/study]]
latex   : false
---
* TOC
{:toc}

## 구조분해?

구조분해(destructuring)은 Clojure에서 주어진 자료구조의 내부 값들에 이름을 붙여주는 기법이다.

`let` 바인딩이나, 함수에 입력되는 인자에서 구조분해를 사용하면 굉장 편리하다.

## 사용 예제

```clojure
(def names ["Kim" "Lee" "Park"])

(let [[name1 name2 name3] names]
    (println name1)
    (println name2)
    (println name3)))
```

## destructure 함수

놀랍게도 destructure는 언어 문법이 아니라 `clojure.core`에서 제공하는 함수이다.

[`let` 매크로 코드]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/clj/clojure/core.clj#L4498-L4514 )를 살펴보자.

```clojure
(defmacro let
  "binding => binding-form init-expr
  binding-form => name, or destructuring-form
  destructuring-form => map-destructure-form, or seq-destructure-form

  Evaluates the exprs in a lexical context in which the symbols in
  the binding-forms are bound to their respective init-exprs or parts
  therein.

  See https://clojure.org/reference/special_forms#binding-forms for
  more information about destructuring."
  {:added "1.0", :special-form true, :forms '[(let [bindings*] exprs*)]}
  [bindings & body]
  (assert-args
     (vector? bindings) "a vector for its binding"
     (even? (count bindings)) "an even number of forms in binding vector")
  `(let* ~(destructure bindings) ~@body))
```

마지막 줄에 주목하자. `destructure` 함수를 호출하고 있다.


[`destructure` 함수의 전문]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/clj/clojure/core.clj#L4401-L4496 )은 다음과 같다.

```clojure
;;redefine let and loop  with destructuring
(defn destructure [bindings]
  (let [bents (partition 2 bindings)
        pb (fn pb [bvec b v]
             (let [pvec
                   (fn [bvec b val]
                     (let [gvec (gensym "vec__")
                           gseq (gensym "seq__")
                           gfirst (gensym "first__")
                           has-rest (some #{'&} b)]
                       (loop [ret (let [ret (conj bvec gvec val)]
                                    (if has-rest
                                      (conj ret gseq (list `seq gvec))
                                      ret))
                              n 0
                              bs b
                              seen-rest? false]
                         (if (seq bs)
                           (let [firstb (first bs)]
                             (cond
                              (= firstb '&) (recur (pb ret (second bs) gseq)
                                                   n
                                                   (nnext bs)
                                                   true)
                              (= firstb :as) (pb ret (second bs) gvec)
                              :else (if seen-rest?
                                      (throw (new Exception "Unsupported binding form, only :as can follow & parameter"))
                                      (recur (pb (if has-rest
                                                   (conj ret
                                                         gfirst `(first ~gseq)
                                                         gseq `(next ~gseq))
                                                   ret)
                                                 firstb
                                                 (if has-rest
                                                   gfirst
                                                   (list `nth gvec n nil)))
                                             (inc n)
                                             (next bs)
                                             seen-rest?))))
                           ret))))
                   pmap
                   (fn [bvec b v]
                     (let [gmap (gensym "map__")
                           gmapseq (with-meta gmap {:tag 'clojure.lang.ISeq})
                           defaults (:or b)]
                       (loop [ret (-> bvec (conj gmap) (conj v)
                                      (conj gmap) (conj `(if (seq? ~gmap)
                                                           (if (next ~gmapseq)
                                                             (clojure.lang.PersistentArrayMap/createAsIfByAssoc (to-array ~gmapseq))
                                                             (if (seq ~gmapseq) (first ~gmapseq) clojure.lang.PersistentArrayMap/EMPTY))
                                                           ~gmap))
                                      ((fn [ret]
                                         (if (:as b)
                                           (conj ret (:as b) gmap)
                                           ret))))
                              bes (let [transforms
                                          (reduce1
                                            (fn [transforms mk]
                                              (if (keyword? mk)
                                                (let [mkns (namespace mk)
                                                      mkn (name mk)]
                                                  (cond (= mkn "keys") (assoc transforms mk #(keyword (or mkns (namespace %)) (name %)))
                                                        (= mkn "syms") (assoc transforms mk #(list `quote (symbol (or mkns (namespace %)) (name %))))
                                                        (= mkn "strs") (assoc transforms mk str)
                                                        :else transforms))
                                                transforms))
                                            {}
                                            (keys b))]
                                    (reduce1
                                        (fn [bes entry]
                                          (reduce1 #(assoc %1 %2 ((val entry) %2))
                                                   (dissoc bes (key entry))
                                                   ((key entry) bes)))
                                        (dissoc b :as :or)
                                        transforms))]
                         (if (seq bes)
                           (let [bb (key (first bes))
                                 bk (val (first bes))
                                 local (if (instance? clojure.lang.Named bb) (with-meta (symbol nil (name bb)) (meta bb)) bb)
                                 bv (if (contains? defaults local)
                                      (list `get gmap bk (defaults local))
                                      (list `get gmap bk))]
                             (recur (if (ident? bb)
                                      (-> ret (conj local bv))
                                      (pb ret bb bv))
                                    (next bes)))
                           ret))))]
               (cond
                (symbol? b) (-> bvec (conj b) (conj v))
                (vector? b) (pvec bvec b v)
                (map? b) (pmap bvec b v)
                :else (throw (new Exception (str "Unsupported binding form: " b))))))
        process-entry (fn [bvec b] (pb bvec (first b) (second b)))]
    (if (every? symbol? (map first bents))
      bindings
      (reduce1 process-entry [] bents))))
```

## 함께 읽기

- [[/clojure/guide/destructuring]]

