---
layout  : wiki
title   : Python3
summary : 
date    : 2018-05-02 20:32:02 +0900
updated : 2018-05-02 21:25:22 +0900
tags    : language
toc     : true
public  : true
parent  : programming-language
latex   : false
---
* TOC
{:toc}

이 문서는 3.6 버전을 전제합니다.

# Hello World!

```python
# Comment 주석은 이렇게 쓴다.
print("Hello World!")

# , 를 사용해서 출력할 수 있다.
print("Hello", "World!")
```

# String

## concat

```python
'one' + ' ' + 'two' # 'one two'
```

## repeat

```python
"." * 5     # '.....'
```

## formatting

```python
test = "test... {}"
test.format(False)  # 'test... False'

foo = "{} {} {}"
foo.format(1, 2, 3) # '1 2 3'

foo.format(
    "one",
    "two",
    "three"
)
# 'one two three'
```

## interpolation

```python
val = 2 + 3
text = f"two plus three is {val}"
print(text) # two plus three is 5
```

## multiline

```python
print("foo\nbar\nbaz\nqux")
# foo
# bar
# baz
# qux

print("""
foo
bar
baz
""")
#
# foo
# bar
# baz
#
```

## user input

* 사용자 입력을 받으려면 `input()`함수를 쓴다.
* `print`에 `end = ' '`와 같이 주면, 개행 대신 마지막 문자열을 지정할 수 있다.

```
# REPL
>>> print("What's your name?")
What's your name?
>>> name = input()
John
>>> name
'John'
>>> print("What's your name?", end = ' ')
What's your name? >>>
```

## user input (number)

```
# REPL
>>> num = int(input())
42
>>> pi = float(input())
3.14
```


