---
layout  : wiki
title   : 더프의 장치 (Duff's device)
summary : 1983년에 고안된 C 언어 루프 풀기 기법
date    : 2020-10-01 23:08:10 +0900
updated : 2020-10-02 15:57:36 +0900
tag     : algorithm c black-magic 1983
toc     : true
public  : true
parent  : [[algorithm]]
latex   : false
---
* TOC
{:toc}

## 개요

- 1983년 11월 9일, 루카스 필름에서 일하던 톰 더프(Thomas Duff)가 개발한 루프 풀기(loop unrolling) 기법.[^tom-email-88]
    - 리얼 타임 애니메이션 프로그램의 속도를 향상시키기 위해 사용했다고 한다.
    - 톰 더프는 이 기법에 대해 자랑스러움과 역겨움을 동시에 느낀다고 했다.

주의: 오늘날의 컴파일러는 이 정도의 최적화는 알아서 다 해 주므로 굳이 더프의 장치처럼 코딩할 필요는 없다.

**회사에서는 절대로 쓰지 말 것.**

톰 더프가 작성한 더프의 장치 코드 구현은 다음과 같다.

```c
send(to, from, count)
register short *to, *from;
register count;
{
    register n=(count+7)/8;
    switch(count%8){
    case 0: do{ *to = *from++;
    case 7:     *to = *from++;
    case 6:     *to = *from++;
    case 5:     *to = *from++;
    case 4:     *to = *from++;
    case 3:     *to = *from++;
    case 2:     *to = *from++;
    case 1:     *to = *from++;
        }while(--n>0);
    }
}
```

이 코드는 `short` 타입 배열인 `from`의 각 원소를 `to`에 입력한다.

코드를 잘 읽어보면 다음과 같은 사실을 깨달을 수 있다.

- `do` `while`과 `switch case`가 이상하게 섞여 있다.
    - 느슨하게 정의된 C 언어 문법 `do` `while`과 `switch case`의 헛점을 사용하고 있다.
- 루프를 8개 항목으로 묶어 돌리고 있다.
    - 이렇게 하면 8번 돌아야 하는 루프는 `8 = 8 * 1` 이므로 1번 돌게 되고, 80번 돌아야 하는 루프는 `80 = 8 * 10`이므로 10번 돌게 될 것이다.
    - 10 번 돌아야 하는 루프는 `10 = 8 * 1 + 2` 이므로 1번 돌고, 나머지 2 번은 `switch`에 의해 `case 2`로 점프하여 2 번 실행될 것이다.
- `*from++`과 `*to`의 포인터 연산만으로 `from` 배열의 각 값을 `to`로 복사하고 있다.
    - 루프 인덱스 `n`의 감소 빈도가 `1/8`로 줄었다. 미세한 최적화.

기능만 따진다면 다음 코드와 같다.

```c
void normal_device(short *to, short *from, int count)
{
    int i = 0;
    for (i = 0; i < count; i++) {
        *to = from[i];
    }
}
```

즉, 더프의 장치는 굳이 루프를 풀어내는(loop unrolling) 방법들 중 하나이다.
배열의 각 값은 memory-mapped 아웃풋 레지스터 주소(`*to`)에 전달되며, 레지스터에 전달된 값은 머신이 알아서 처리한다.
톰 더프는 머신의 특성을 살려 루프 오버헤드를 줄인 최적화된 코드를 작성하기 위해 이 기법을 발명했다.

## 기원

### 번역: 1983년 11월 10일, 톰 더프의 편지

>
From research!ucbvax!dagobah!td  Sun Nov 13 07:35:46 1983  
Received: by ucbvax.ARPA (4.16/4.13)  id AA18997; Sun, 13 Nov 83 07:35:46 pst  
Received: by dagobah.LFL (4.6/4.6b)  id AA01034; Thu, 10 Nov 83 17:57:56 PST  
Date: Thu, 10 Nov 83 17:57:56 PST  
From: ucbvax!dagobah!td (Tom Duff)  
Message-Id: <8311110157.AA01034@dagobah.LFL>  
To: ucbvax!decvax!hcr!rrg, ucbvax!ihnp4!hcr!rrg, ucbvax!research!dmr, ucbvax!research!rob

(메시지 메타 정보)

> Consider the following routine, abstracted from code which copies an array of shorts into the Programmed IO data register of an Evans & Sutherland Picture System II:

_다음 루틴은 Evans & Sutherland Picture System II의 프로그램된 IO 데이터 레지스터에 `short` 배열을 복사해 넣는 추상화 된 코드입니다._

```c
    send(to, from, count)
    register short *to, *from;
    register count;
    {
        do
            *to = *from++;
        while(--count>0);
    }
```
> (Obviously, this fails if the count is zero.)  

_(`count`가 `0`인 경우 이 코드는 실패합니다.)_

>
The VAX C compiler compiles the loop into 2 instructions (a movw and a sobleq, I think.) As it turns out, this loop was the bottleneck in a real-time animation playback program which ran too slowly by about 50%.  The standard way to get more speed out of something like this is to unwind the loop a few times, decreasing the number of sobleqs.  When you do that, you wind up with a leftover partial loop.  I usually handle this in C with a switch that indexes a list of copies of the original loop body.  Of course, if I were writing assembly language code, I'd just jump into the middle of the unwound loop to deal with the leftovers.  Thinking about this yesterday, the following implementation occurred to me:

_VAC C 컴파일러는 루프를 `movw`와 `sobleq`를 사용하는 2개의 인스트럭션으로 컴파일합니다. 그리고 이렇게 컴파일된 코드는 리얼 타임 애니메이션 플레이백 프로그램에서 병목이 되며 50% 정도 느려집니다. 이러한 경우, 속도를 향상시키는 일반적인 방법은 루프를 풀어서 `sobleq` 인스트럭션의 사용을 줄이는 것입니다. 이렇게 하면 나머지 부분에 대해 부분 루프가 발생하는 문제가 있긴 합니다. 저는 C 언어로 작업할 때 이 기법을 활용해, 루프 본문의 내용을 복붙해서 리스트로 만들고 인덱스를 `switch`로 처리하곤 합니다. 제가 만약 어셈블리어로 코딩하고 있었다면 나머지 부분을 처리하기 위해 풀린 루프의 안쪽으로 점프해 들어가는 방식을 사용했겠죠. 저는 어제 이 생각을 다음과 같은 코드로 구현해 보았습니다._

>
```c
    send(to, from, count)
    register short *to, *from;
    register count;
    {
        register n=(count+7)/8;
        switch(count%8){
        case 0: do{ *to = *from++;
        case 7:     *to = *from++;
        case 6:     *to = *from++;
        case 5:     *to = *from++;
        case 4:     *to = *from++;
        case 3:     *to = *from++;
        case 2:     *to = *from++;
        case 1:     *to = *from++;
            }while(--n>0);
        }
    }
```
> Disgusting, no?  But it compiles and runs just fine.  I feel a combination of pride and revulsion at this discovery.  If no one's thought of it before, I think I'll name it after myself.

지저분해 보이죠? 하지만 컴파일도 잘 되고 실행도 잘 됩니다.
저도 이 발견에 자부심과 혐오감을 함께 느끼고 있습니다.
만약 이걸 지금까지 아무도 생각해내지 못했다면, 제 이름을 붙여도 될 것 같아요.

> It amazes me that after 10 years of writing C there are still little corners that I haven't explored fully.  (Actually, I have another revolting way to use switches to implement interrupt driven state machines but it's too horrid to go into.)

_C 언어를 사용한 지 10년이 지났는데도 제가 아직 모르는 영역이 있다는 것이 놀라울 뿐입니다. (사실, 저는 `switch`를 사용해 인터럽트를 기반으로 한 상태 머신을 구현하는 방법 같은 괴상망측한 방법도 알고 있지만 굳이 여기에서 말하진 않겠습니다.)_

> Many people (even bwk?) have said that the worst feature of C is that switches don't break automatically before each case label.  This code forms some sort of argument in that debate, but I'm not sure whether it's for or against.
>
> yrs trly  
Tom

_많은 사람들(브라이언 커니핸 조차도?)이 C 언어 최악의 기능은 `switch`문이 각각의 `case`에 대해 자동으로 `break`가 걸리지 않는 것이라고 말해왔습니다. 이 코드는 그러한 논란의 연장선에 있지만, 저는 이 코드가 그에 대해 찬성/반대 중 어느 쪽의 근거가 될지는 모르겠습니다._


## Bjarne Stroustrup의 언급

비야네 스트롭스트룹의 "C++ Programming Language"에 더프의 장치를 소개하는 연습문제가 있다.[^example-6-6-15]

> 15 . (*1.5) What does the following example do?
```cpp
void send(int* to, int* from, int count)
//  Duff's device. Helpful comment deliberately deleted.
{
    int n = (count+7) / 8;
    switch (count%8) {
      case 0:   do { *to++ = *from++;
      case 7:        *to++ = *from++;
      case 6:        *to++ = *from++;
      case 5:        *to++ = *from++;
      case 4:        *to++ = *from++;
      case 3:        *to++ = *from++;
      case 2:        *to++ = *from++;
      case 1:        *to++ = *from++;
           } while (--n>0);
    }
}
```
Why would anyone write something like that?

## Zed Shaw 가 소개한 더프의 장치

### 문자열을 복사하는 버전

제드 쇼는 Learn C the Hard Way에서 더프의 장치를 응용해 문자열 `from`을 문자열 `to`로 복사하는 함수를 소개한다.[^zed-23]

```c
int duffs_device(char *from, char *to, int count)
{
  {
    int n = (count + 7) / 8;

    switch (count % 8) {
      case 0:
        do {
          *to++ = *from++;
          case 7:
          *to++ = *from++;
          case 6:
          *to++ = *from++;
          case 5:
          *to++ = *from++;
          case 4:
          *to++ = *from++;
          case 3:
          *to++ = *from++;
          case 2:
          *to++ = *from++;
          case 1:
          *to++ = *from++;
        } while (--n > 0);
    }
  }

  return count;
}
```

문자열을 복사하는 아주 변태같은 방법이라 할 수 있다.

위의 함수를 실행하면...

```c
int main(int argc, char *argv[])
{
  char from[10] = { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i' };
  char to[10] = { '0', '1', '2' };

  printf("장치 실행 전 [from]: %s, [to]: %s\n", from, to);
  duffs_device(from, to, 10);
  printf("장치 실행 후 [from]: %s, [to]: %s\n", from, to);
  memset(from, '1', 9);
  printf("from 변경 후 [from]: %s, [to]: %s\n", from, to);

  return 0;
}
```

다음과 같은 출력 결과를 볼 수 있다.

```
장치 실행 전 [from]: abcdefghi, [to]: 012
장치 실행 후 [from]: abcdefghi, [to]: abcdefghi
from 변경 후 [from]: 111111111, [to]: abcdefghi
```

- `012`였던 `to` 문자열이 `abcdefghi`가 되었다.
- `from`과 `to`의 주소는 다르다.

### do while을 제거하고 goto를 사용한 버전

다음은 `switch case`와 `do while`가 섞인 부분 때문에 이해하지 못하는 사람들을 위해 제드 쇼가 작성한 `goto` 버전의 더프의 장치 코드이다.

이 코드도 `from` 문자열을 `to` 문자열로 복사한다.

```c
int zeds_device(char *from, char *to, int count)
{
  {
    int n = (count + 7) / 8;

    switch (count % 8) {
      case 0:
again: *to++ = *from++;

      case 7:
      *to++ = *from++;
      case 6:
      *to++ = *from++;
      case 5:
      *to++ = *from++;
      case 4:
      *to++ = *from++;
      case 3:
      *to++ = *from++;
      case 2:
      *to++ = *from++;
      case 1:
      *to++ = *from++;
      if (--n > 0)
        goto again;
    }
  }

  return count;
}
```

## memcpy

메모리 복사를 위해서 더프의 장치를 쓸 이유는 없다.
컴파일러와 아키텍처에 따라 더프의 장치를 구현한 코드가 평범한 루프보다 더 빠르리라는 보장이 없다.
오히려 CPU의 파이프라이닝과 분기 예측을 방해할 수도 있다.

그리고 어지간한 경우엔 스탠다드 C 라이브러리의 [memcpy]( https://github.com/gcc-mirror/gcc/blob/f9989b51a9bc3b0ad31bb5ad2c805ca03427801e/libgcc/memcpy.c )로도 충분하다.

```c
/* Public domain.  */
#include <stddef.h>

void *
memcpy (void *dest, const void *src, size_t len)
{
  char *d = dest;
  const char *s = src;
  while (len--)
    *d++ = *s++;
  return dest;
}
```

## 참고문헌

- [ZED] 깐깐하게 배우는 C / 제드 쇼 저/정기훈 역 / 인사이트(insight) / 2018년 02월 05일 / 원제: Learn C the Hard Way
- [BJA] The C++ Programming Language: Special Edition / 비야네 스트롭스트룹 (지은이) / Addison-Wesley Professional / 2000년 2월
- [The amazing Duff’s Device by Tom Duff!]( http://doc.cat-v.org/bell_labs/duffs_device )
- [Re: Explanation, please!]( http://www.lysator.liu.se/c/duffs-device.html )
- [Duff's device (wikipedia)]( https://en.wikipedia.org/wiki/Duff%27s_device )
- [Tom Duff (wikipedia)]( https://en.wikipedia.org/wiki/Tom_Duff )
- [libgcc/memcpy.c]( https://github.com/gcc-mirror/gcc/blob/f9989b51a9bc3b0ad31bb5ad2c805ca03427801e/libgcc/memcpy.c )


## 주석

[^example-6-6-15]: "The C++ Programming Language (3rd Edition)" 6.6 Exercises. 15번 문제.

[^tom-email-88]: 아카이빙된 [톰 더프의 이메일][tom-email-88].
[^zed-23]: [ZED] 23장.

[tom-email-88]: http://doc.cat-v.org/bell_labs/duffs_device

