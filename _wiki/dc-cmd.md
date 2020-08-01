---
layout  : wiki
title   : dc 명령어
summary : an arbitrary percision calculator
date    : 2020-08-01 15:32:11 +0900
updated : 2020-08-01 15:44:04 +0900
tag     : bash command calculator
toc     : true
public  : true
parent  : [[command-line]]
latex   : false
---
* TOC
{:toc}

## Examples

- `f` 스택에 들어간 값들을 본다

```
1
2
f
2   <= stack에 들어간 값을 위에서부터 꺼내어 보여준다
1
```

```
1
2
+   <= stack에 들어간 2, 1을 pop해서 더한 값(3)을 push 한다
f
3   <= 출력된 결과
```

```
1
2
3
+   <= stack에 들어간 3, 2를 pop해서 더한 값(5)을 push 한다
f
5   <= 출력된 결과는 5, 1
1
```

