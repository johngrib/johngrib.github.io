---
layout  : wiki
title   : Transducers
summary : 번역 중인 문서
date    : 2022-06-21 23:35:47 +0900
updated : 2022-06-21 23:43:21 +0900
tag     : clojure 번역
toc     : true
public  : true
parent  : [[/clojure/reference]]
latex   : false
---
* TOC
{:toc}

- 원문: [Transducers]( https://clojure.org/reference/transducers )

## Transducers : Clojure Reference 문서 번역

>
Transducers are composable algorithmic transformations.
They are independent from the context of their input and output sources and specify only the essence of the transformation in terms of an individual element.
Because transducers are decoupled from input or output sources, they can be used in many different processes - collections, streams, channels, observables, etc.
Transducers compose directly, without awareness of input or creation of intermediate aggregates.

### Terminology
### Defining Transformations With Transducers
#### Using Transducers
#### transduce
#### eduction
#### into
#### sequence
### Creating Transducers
#### Early termination
#### Transducers with reduction state
### Creating Transducible Processes

