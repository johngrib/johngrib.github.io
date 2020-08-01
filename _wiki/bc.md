---
layout  : wiki
title   : bc
summary : An arbitrary precision calculator language
date    : 2018-10-07 18:12:19 +0900
updated : 2020-08-01 15:34:21 +0900
tag     : bash command
toc     : true
public  : true
parent  : [[programming-language]]
latex   : true
---
* TOC
{:toc}

## 역사

- 로린다 체리(Lorinda Cherry)

> 또 다른 예는 `bc`로, 로버트 모리스가 처음 개발한 무한 정밀도 계산기인 [[dc-cmd]]{dc}를 위해 로린다 체리가 개발한 전처리기다.
로린다는 [[dc-cmd]]{dc}에 전통적인 중위 산술 표기법을 제공하기 위해 `bc`를 작성했는데, [[dc-cmd]]{dc}의 후위 표기법은 아무래도 초보자들에게는 수월하지 않았기 때문이다.
[^KER-5-195]

## Examples

* 간단한 계산기로 사용할 수 있다.

```sh
$ echo '3 * 1.3' | bc
3.9

$ bc <<< 3*1.3
3.9
```

* 거듭제곱도 잘 계산한다.

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

### mathlib 옵션의 사용

* 나눗셈을 할 때 실수를 리턴받고 싶다면 `-l` 옵션을 붙이면 된다.
    * `-l`, `--mathlib`: Define the standard math library.

```sh
$ echo '1.8 / 3' | bc -l
.60000000000000000000
```

* `-l` 옵션을 붙이면 디폴트로 부동소수점 연산을 하기 때문에 `%` 연산이 제대로 되지 않는다는 문제가 있다.

```sh
$ echo '12 % 5' | bc -l
0
```

* `scale=0` 으로 지정해주면 결과가 나오긴 한다.

```sh
$ echo 'scale=0;12 % 5' | bc -l
2

$ echo 'scale=0;12.2 % 5' | bc -l
2.2
```

* 다음과 같이 자신만의 math 라이브러리 파일을 만들고, `mod`함수를 추가해, `-l` 옵션과 함께 실행해주는 쪽이 편리하다.

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

* 다음과 같이 alias로 지정해 두면 편리하다.

```sh
alias bc='bc -l ~/.bcrc -q'
```

* bc는 단순한 계산기가 아니라 프로그래밍 언어이기 때문에, 코드 파일을 작성해서 돌릴 수도 있다.

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

* 소개 문구가 필요 없다면 `-q` 옵션을 주면 된다.
    * `-q`, `--quiet` : Do not print the normal GNU bc welcome.

```sh
$ bc example.bc -q
3
```

## 기본 함수 목록

* `s(x)` - The sine of x, x is in radians.
* `c(x)` - The cosine of x, x is in radians.
* `a(x)` - The arctangent of x, arctangent returns radians.
* `l(x)` - The natural logarithm of x.
* `e(x)` - The exponential function of raising e to the value x.
* `j(n,x)` - The bessel function of integer order n of x.

## 유용한 함수

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

## 기타

### $$\pi$$ 구하기

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

## 함께 읽기

- [[dc-cmd]]{dc}

## Links

* [bc (gnu.org)](https://www.gnu.org/software/bc/ )
    * [Functions](https://www.gnu.org/software/bc/manual/html_chapter/bc_5.html )
    * [Examples](https://www.gnu.org/software/bc/manual/html_chapter/bc_6.html#SEC19 )
* [GNU bc (phodd.net)](http://phodd.net/gnu-bc/ )
* [Bc(programming language) (wikipedia)](https://en.wikipedia.org/wiki/Bc_(programming_language)#References)
* [bash, bc modulo does not work with -l flag (stackoverflow.com)](https://stackoverflow.com/questions/27470210/bash-bc-modulo-does-not-work-with-l-flag )

## 참고문헌

- [KER] 유닉스의 탄생 / 브라이언 커니핸 저/하성창 역 / 한빛미디어 / 2020년 08월 03일 / 원서 : UNIX: A History and a Memoir

## 주석

[^KER-5-195]: [KER] 5장. 195쪽.

