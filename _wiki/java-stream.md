---
layout  : wiki
title   : java.util.stream의 사용
summary : 
date    : 2019-09-24 09:37:07 +0900
updated : 2019-09-26 12:32:37 +0900
tag     : java
toc     : true
public  : false
parent  : Java
latex   : false
---
* TOC
{:toc}

## stream?

>
Classes to support functional-style operations on streams of elements, such as map-reduce transformations on collections.

## Examples

```java
int sum = widgets.stream()
  .filter(w -> w.getColor() == RED)
  .mapToInt(w -> w.getWeight())
  .sum();
```
