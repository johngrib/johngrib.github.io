---
layout  : wiki
title   : Java synchronized
summary : 
date    : 2022-03-14 21:19:24 +0900
updated : 2022-03-14 21:47:05 +0900
tag     : java 번역
resource: 22/D08151-CE22-4709-9B37-11A4CF3D5862
toc     : true
public  : true
parent  : [[/java]]
latex   : false
---
* TOC
{:toc}

## Java 17 문서 번역

[원문]( https://docs.oracle.com/javase/specs/jls/se17/html/jls-14.html#jls-14.19 )

### 14.19. The synchronized Statement

>
A `synchronized` statement acquires a mutual-exclusion lock ([§17.1](https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.1 )) on behalf of the executing thread, executes a block, then releases the lock.
While the executing thread owns the lock, no other thread may acquire the lock.

`synchronized` 문은 실행 중인 스레드를 위해 상호 배타적인 잠금(17.1절)을 획득하고,
블록을 실행한 다음 잠금을 해제합니다.
실행 중인 스레드가 잠금을 획득하고 있는 동안에는 다른 스레드는 해당 잠금을 획득할 수 없습니다.

>
| SynchronizedStatement: <br/> &emsp; synchronized ( [Expression](https://docs.oracle.com/javase/specs/jls/se17/html/jls-15.html#jls-Expression ) ) [Block](https://docs.oracle.com/javase/specs/jls/se17/html/jls-14.html#jls-Block ) |

<span/>

>
**The type of _Expression_ must be a reference type, or a compile-time error occurs.**
>
A `synchronized` statement is executed by first evaluating the _Expression_. Then:
>
> - If evaluation of the _Expression_ completes abruptly for some reason, then the `synchronized` statement completes abruptly for the same reason.
> - **Otherwise, if the value of the _Expression_ is `null`, a `NullPointerException` is thrown.**
> - Otherwise, let the non-`null` value of the _Expression_ be `V`. The executing thread locks the monitor associated with `V`. Then the _Block_ is executed, and then there is a choice:
>     - If execution of the Block completes normally, then the monitor is unlocked and the synchronized statement completes normally.
>     - If execution of the Block completes abruptly for any reason, then the monitor is unlocked and the synchronized statement completes abruptly for the same reason.

표현식의 타입은 레퍼런스 타입이어야 하며, 그렇지 않으면 컴파일 타임 에러가 발생합니다.

`synchronized` 문이 실행될 때에는 가장 먼저 표현식을 평가하게 됩니다.

- 만약 표현식의 평가가 어떠한 이유로 불완전하게 종료된다면 `synchronized` 문도 같은 이유로 불완전 종료됩니다.
- 표현식의 값이 `null` 이라면 `NullPointerException` 예외가 던져집니다.
- 표현식의 `null`이 아닌 값을 `V`라고 할 때, 실행중인 스레드는 `V`와 관련된 모니터를 잠근 후 블록을 실행합니다. 그리고 블록이 실행된 다음에는 다음과 같은 선택지를 갖게 됩니다.
    - 만약 블록의 실행이 정상 종료된다면, 모니터의 잠금은 해제(unlocked)되며, `synchronized` 문도 정상 종료됩니다.
    - 만약 블록의 실행이 어떤 이유로 불완전 종료된다면, 모니터의 잠금은 해제(unlocked)되며, `synchronized` 문도 같은 이유로 불완전 종료됩니다.

>
The locks acquired by `synchronized` statements are the same as the locks that are acquired implicitly by `synchronized` methods ([§8.4.3.6](https://docs.oracle.com/javase/specs/jls/se17/html/jls-8.html#jls-8.4.3.6 )).
A single thread may acquire a lock more than once.

`synchronized`문을 통해 얻는 잠금은 `synchronized` 메소드를 통해 암묵적으로 얻을 수 있는 잠금과 같습니다.
싱글 스레드는 하나의 대상에 대해 한 번 이상의 잠금을 획득할 수 있습니다.

>
Acquiring the lock associated with an object does not in itself prevent other threads from accessing fields of the object or invoking un-`synchronized` methods on the object.
Other threads can also use `synchronized` methods or the `synchronized` statement in a conventional manner to achieve mutual exclusion.

객체와 연관된 잠금의 획득은, 잠겨 있는 객체의 필드에 다른 스레드가 접근하는 것을 자동으로 방지하지 못하며, 잠겨 있는 객체에 있는 비동기화된(unsynchronized) 메소드를 호출하는 것도 방지하지 못합니다.

다른 스레드는 상호배타를 달성하기 위해 관례적으로 `synchronized` 메소드나 `synchronized`문을 사용합니다.

>
**Example 14.19-1. The synchronized Statement**
>
> ```java
> class Test {
>     public static void main(String[] args) {
>         Test t = new Test();
>         synchronized(t) {
>             synchronized(t) {
>                 System.out.println("made it!");
>             }
>         }
>     }
> }
> ```
>
This program produces the output:

위의 예제는 다음 결과를 출력합니다.

>
> ```
> made it!
> ```

>
Note that this program would deadlock if a single thread were not permitted to lock a monitor more than once.

참고로 이 에제 프로그램은 싱글 스레드에 두 번 이상의 잠금을 허용하지 않는다면 데드락을 일으킬 수 있습니다.

## 참고문헌

- [14.19. The synchronized Statement (JLS 17)]( https://docs.oracle.com/javase/specs/jls/se17/html/jls-14.html#jls-14.19 )

