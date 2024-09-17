---
layout  : wiki
title   : bc
summary : An arbitrary precision calculator language
date    : 2018-10-07 18:12:19 +0900
updated : 2024-09-17 22:11:20 +0900
tag     : bash command
resource: 2D/9A7DF4-5801-4163-BAAF-8BBC5D36B3AB
toc     : true
public  : true
parent  : [[/cmd]]
latex   : true
---
* TOC
{:toc}

## 역사

- 로린다 체리(Lorinda Cherry)

> 또 다른 예는 `bc`로, 로버트 모리스가 처음 개발한 무한 정밀도 계산기인 [[/cmd/dc]]{dc}를 위해 로린다 체리가 개발한 전처리기다.
로린다는 [[/cmd/dc]]{dc}에 전통적인 중위 산술 표기법을 제공하기 위해 `bc`를 작성했는데, [[/cmd/dc]]{dc}의 후위 표기법은 아무래도 초보자들에게는 수월하지 않았기 때문이다.
[^KER-5-195]

## Examples

### 기본

간단한 계산기로 사용할 수 있다.

```sh
$ echo '3 * 1.3' | bc
3.9

$ bc <<< 3*1.3
3.9
```

거듭제곱도 잘 계산한다.

```sh
$ echo '2^1000' | bc
10715086071862673209484250490600018105614048117055336074437503883703\
51051124936122493198378815695858127594672917553146825187145285692314\
04359845775746985748039345677748242309854210746050623711418779541821\
53046474983581941267398767559165543946077062914571196477686542167660\
429831652624386837205668069376

$ bc <<< 2^2^3
256
```

* 나눗셈은 기본적으로 정수를 리턴한다.

```sh
$ echo '1.8 / 3' | bc
0
```

### 응용: π 구하기

```sh
$ echo "scale=10; 4*a(1)" | bc -l
3.1415926532

$ echo "scale=100; 4*a(1)" | bc -l
3.141592653589793238462643383279502884197169399375105820974944592307\
8164062862089986280348253421170676
```

원리는 다음과 같다.

* `a(x)` 는 $$\arctan$$를 구한다.
* 즉, `4*a(1)`은 $$ 4 \times \arctan 1$$ 이다.
* $$ arctan 1$$ 은 `1`을 리턴하는 $$\tan$$ 값이므로, $$45^\circ$$ 를 의미한다.
* 그런데 $$45^\circ$$는 $$\pi \over 4$$ 이므로 `4*a(1)`은 $$\pi$$와 같다.

## 옵션 {#options}

### -l : mathlib 사용

`-l`, `--mathlib`: Define the standard math library.

- math 라이브러리를 정의한다.
- 이 옵션을 사용하면 암묵적으로 `scale=20`으로 설정된다.

```sh
$ echo '1.8 / 3' | bc
0

$ echo '1.8 / 3' | bc -l
.60000000000000000000
```

- 그냥 `1.8 / 3`을 하면 정수 연산을 하기 때문에 `0`이 리턴된다.
- 그러나 `-l` 옵션을 주면 `scale=20`으로 설정하기 때문에 실수 연산을 하게 되어, `0.6`을 의미하는 `.60000000000000000000`이 리턴된다.
- 즉, 나눗셈을 할 때 실수를 리턴받고 싶다면 간단하게 `-l` 옵션을 붙이면 된다고 생각해도 된다.

#### 주의: 나머지 연산 {#warning-mod}

한편, `-l` 옵션을 붙이면 소수점 연산을 하기 때문에 `%` 연산이 제대로 되지 않는다는 문제가 있다.

```sh
$ echo '12 % 5' | bc -l
0
```

이에 대한 대책으로 `scale=0` 으로 지정해주면 결과가 나온다.

```sh
$ echo 'scale=0;12 % 5' | bc -l
2

$ echo 'scale=0;12.2 % 5' | bc -l
2.2
```

다음과 같이 자신만의 math 라이브러리 파일을 만들고, `mod`함수를 추가해, `-l` 옵션과 함께 실행해주는 쪽이 편리하다.

```c
/* ~/.bcrc 파일 */
define mod(x,y) {
  tmp   = scale
  scale = 0
  ret   = x%y
  scale = tmp
  return ret
}
```

```sh
$ echo 'mod(12, 5)' | bc -l ~/.bcrc
2
```

다음과 같이 alias로 지정해 두면 편리하다.

```sh
alias bcl='bc -l ~/.bcrc -q'
```

### -q : welcome 문구 생략

`-q`, `--quiet` : Do not print the normal GNU bc welcome.

GNU bc의 경우, 실행하면 아래와 같은 내용의 welcome 문구가 출력된다.

```sh
$ bc
bc 1.07.1
Copyright 1991-1994, 1997, 1998, 2000, 2004, 2006, 2008, 2012-2017 Free Software Foundation, Inc.
This is free software with ABSOLUTELY NO WARRANTY.
For details type `warranty'.
```

이런 소개 문구가 필요 없다면 `-q` 옵션을 주면 된다.

```sh
$ bc example.bc -q
3
```

### 스크립트 파일 지정

bc는 단순한 계산기가 아니라 프로그래밍 언어이기도 하기 때문에, 코드 파일을 작성해서 돌릴 수도 있다.

```sh
$ cat example.bc

1+2
quit

$ bc example.bc
bc 1.06
Copyright 1991-1994, 1997, 1998, 2000 Free Software Foundation, Inc.
This is free software with ABSOLUTELY NO WARRANTY.
For details type `warranty'.
3
```

## 변수와 함수

### length와 scale {#length-and-scale}

>
`bc`를 사용할 때 `length`와 `scale`의 차이를 이해하는 것은 매우 중요하다.
bc와 관련해 `length`는 숫자에서 소수 전체의 자리 수를 의미하는 반면,
`scale`은 소수점 이후의 자리 수를 의미한다.
그러므로 `10.25`의 `length`는 4이고 `scale`은 2이다.
`3.14159`의 경우, `length`는 6이고 `scale`은 5이다.
>
`bc`는 디폴트로 변화 가능한 `length` 값을 갖지만 `scale`은 0이다.
따라서 아무 것도 수정하지 않을 경우, `bc`는 `s(( ))`과 똑같이 동작한다.
[^wicked-30]

- `length` : 소수점 아래를 포함한 전체 자리수
- `scale` : 소수점 이하 자리수

### 기본 함수 목록

* `s(x)` - The sine of x, x is in radians.
* `c(x)` - The cosine of x, x is in radians.
* `a(x)` - The arctangent of x, arctangent returns radians.
* `l(x)` - The natural logarithm of x.
* `e(x)` - The exponential function of raising e to the value x.
* `j(n,x)` - The bessel function of integer order n of x.

### 유용한 커스텀 함수

* 정수 변환

```c
define int(number) {
    auto oldscale
    oldscale = scale
    scale = 0
    number /= 1 /* round number down */
    scale = oldscale
    return number
}
```

* factorial

```c
define f(x) {
    if (x <= 1) return (1);
    return (f(x-1) * x);
}
```

## 나의 설정 {#my-setting}

### .bcrc 파일 {#my-bcrc}

간단하게 이정도 설정하고 사용하고 있다.

<https://github.com/johngrib/dotfiles/blob/master/.bcrc >

```c
define mod(x,y) {
  tmp   = scale
  scale = 0
  ret   = x%y
  scale = tmp
  return ret
}

/* to int */
define int(number) {
    auto oldscale
    oldscale = scale
    scale = 0
    number /= 1 /* round number down */
    scale = oldscale
    return number
}

/* factorial */
define f(x) {
    if (x <= 1) return (1);
    return (f(x-1) * x);
}
```

### bc 래핑 스크립트

Dave Taylor는 저서 'Wicked Cool Shell Scripts'에서 `bc`를 래핑한 스크립트 `bcscript`를 소개한다.[^wicked-30]

```bash
#!/bin/bash

# scriptbc--Wrapper for 'bc' that returns the result of a calculation

if ["$1" = "-p" ] ; then
  precision=$2
  shift 2
else
  precision=2  # Default
fi

bc -q -l << EOF
  scale=$precision
  $*
  quit
EOF

exit 0
```

`bcscript`는 `-p 10` 처럼 옵션을 주는 방식으로 소수점 아래 몇 자리까지 출력할지 지정할 수 있다.

나는 이 스크립트를 참고해 살짝 수정해 사용하고 있다.

<https://github.com/johngrib/dotfiles/blob/master/bin/%2Cbc >

아래는 나의 스크립트 `,bc`이다.

- `bcscript`처럼 `-p` 옵션으로 소수점 자릿수를 지정할 수 있다.
- `.bcrc` 파일을 기본으로 읽어들인다.

```bash
#!/usr/bin/env bash

# bc 명령의 wrapper

if [ "$1" = "-p" ]; then
    precision=$2
    # args에서 $1, $2를 지운다. (즉 -p 와 $2 를 지운다)
    shift 2
else
    # -p 를 지정하지 않는 경우, 실수 연산은 소숫점 아래 2자리까지 출력한다.
    precision=2
fi

bc -q -l ~/dotfiles/.bcrc << EOF
    scale=$precision
    $*
    quit
EOF
# -q : bc의 welcome 문구를 출력하지 않는다.
# -l : bc를 실행할 때, math 라이브러리로 ~/.bcrc 파일을 읽어들인다.

exit 0
```

다음과 같이 사용한다.

```bash
$ ,bc -p 6 997/991
1.006054

$ ,bc -p 7 997/991
1.0060544

$ ,bc -p 8 997/991
1.00605449
```

- 각각 소수점 아래로 6, 7, 8자리까지 출력되는 것을 확인할 수 있다.

## 함께 읽기

- [[/cmd/dc]]

## Links

* [bc (gnu.org)](https://www.gnu.org/software/bc/ )
    * [Functions](https://www.gnu.org/software/bc/manual/html_chapter/bc_5.html )
    * [Examples](https://www.gnu.org/software/bc/manual/html_chapter/bc_6.html#SEC19 )
* [GNU bc (phodd.net)](http://phodd.net/gnu-bc/ )
* [Bc(programming language) (wikipedia)](https://en.wikipedia.org/wiki/Bc_(programming_language)#References)
* [bash, bc modulo does not work with -l flag (stackoverflow.com)](https://stackoverflow.com/questions/27470210/bash-bc-modulo-does-not-work-with-l-flag )

## 참고문헌

- 셸 스크립트 / Dave Taylor 저 / 여인춘 역 / 에이콘출판사 / 발행: 2005년 09월 26일 / 원제: Wicked Cool Shell Scripts
- 유닉스의 탄생 / 브라이언 커니핸 저/하성창 역 / 한빛미디어 / 2020년 08월 03일 / 원제: UNIX: A History and a Memoir

## 주석

[^KER-5-195]: 유닉스의 탄생. 5장. 195쪽.
[^wicked-30]: 셸 스크립트. 1장. 30쪽.


