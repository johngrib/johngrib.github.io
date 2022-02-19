---
layout  : wiki
title   : 콜라츠 추측 (Collatz Conjecture)
summary : 
date    : 2022-02-19 23:33:26 +0900
updated : 2022-02-19 23:51:17 +0900
tag     : 
toc     : true
public  : true
parent  : [[/problem]]
latex   : true
---
* TOC
{:toc}

## 콜라츠 시퀀스의 구현

- JavaScript

```javascript
#!/usr/bin/env node

function collatzSequence(n) {
    var seq = [n];
    while (n !== 1) {
        if (n % 2 === 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        seq.push(n);
    }
    return seq;
}

console.log(
    collatzSequence(
        parseInt(process.argv[2], 10)));
```

위의 구현을 파일에 저장하고 실행하면 다음과 같은 콜라츠 시퀀스를 얻을 수 있다.

```
$ ./collatz.js 123
[
  123, 370, 185, 556, 278, 139, 418, 209, 628, 314,
  157, 472, 236, 118,  59, 178,  89, 268, 134,  67,
  202, 101, 304, 152,  76,  38,  19,  58,  29,  88,
   44,  22,  11,  34,  17,  52,  26,  13,  40,  20,
   10,   5,  16,   8,   4,   2,   1
]

$ ./collatz.js 7
[
   7, 22, 11, 34, 17, 52, 26,
  13, 40, 20, 10,  5, 16,  8,
   4,  2,  1
]
```



## 참고문헌

- [Collatz conjecture (en.wikipedia.org]( https://en.wikipedia.org/wiki/Collatz_conjecture )
- [Collatz Problem (mathworld.wolfram.com)]( https://mathworld.wolfram.com/CollatzProblem.html )
- [콜라츠 추측 (ko.wikipedia.org)]( https://ko.wikipedia.org/wiki/%EC%BD%9C%EB%9D%BC%EC%B8%A0_%EC%B6%94%EC%B8%A1 )
