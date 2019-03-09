---
layout  : wiki
title   : Go WaitGroup에 1외에 다른 값을 Add 하면?
summary : 더하는 숫자가 중요한 게 아니라 0을 맞추는 게 중요
date    : 2018-11-29 07:42:53 +0900
updated : 2018-11-29 11:11:32 +0900
tag     : gloang goroutine
toc     : true
public  : true
parent  : Golang
latex   : true
---
* TOC
{:toc}

# 발단

Golang Korea(Facebook public group)에 [이런 질문이 올라왔다](https://www.facebook.com/groups/golangko/permalink/1093797934131018/ ).

>
go routine에서 sync.WaitGroup.Add(int n) 의 인자로 꼭 1만 넣어야 하는건 아니잔아요? 제가 본 예제는 죄다 1만 입력하여 호출합니다.  
1 이상의 값을 넣을때 두개가 다른 점이 뭣인지 알고 싶어요.

`WaitGroup`을 사용한다면 고루틴을 하나 실행할 때 `Add(1)`을 하는 건 당연한 거라고 생각해왔다.

`Done()`이 들어가 있는 한 개의 고루틴을 실행했는데 `Add(3)`를 하면 `Wait()`는 남은 2개 고루틴의 `Done()`를 기다릴 것이므로 에러가 나거나 더 진행되질 않아 프로그램이 실질적으로 죽은 것과 같이 될 것이다.

어느 쪽의 결과가 나오건 제대로 만든 바람직한 코드라고 할 수 없다. 끝.

하지만 이렇게 끝내면 뭔가 아쉽다.

이번 기회에 자세히 살펴보면 좋은 공부가 될 것 같다.

# 레퍼런스를 찾아보자

일단은 golang.org에서 `WaitGroup.Add`를 찾아보았다.

<https://golang.org/pkg/sync/#WaitGroup.Add >

`func (wg *WaitGroup) Add(delta int)`

>
Add adds delta, which may be negative, to the WaitGroup counter. If the counter becomes zero, all goroutines blocked on Wait are released. If the counter goes negative, Add panics.  
<br/>
Note that calls with a positive delta that occur when the counter is zero must happen before a Wait. Calls with a negative delta, or calls with a positive delta that start when the counter is greater than zero, may happen at any time. Typically this means the calls to Add should execute before the statement creating the goroutine or other event to be waited for. If a WaitGroup is reused to wait for several independent sets of events, new Add calls must happen after all previous Wait calls have returned. See the WaitGroup example.

한 줄 한 줄 읽어보자.

> Add adds delta, which may be negative, to the WaitGroup counter.

* `Add` 함수는 인자로 주어진 `delta` 값을 `WaitGroup counter` 에 더한다.
    * `delta` 값은 양수일 수도 있고 음수일 수도 있다.

> If the counter becomes zero, all goroutines blocked on Wait are released.

* `WaitGroup count` 값이 `0`이 되면, Wait 함수에서 블록된 모든 고루틴이 해제된다.

> If the counter goes negative, Add panics.

* `WaitGroup counter` 값이 음수가 되면, `Add` 함수는 `panic`을 일으킨다.

> Note that calls with a positive delta that occur when the counter is zero must happen before a Wait.

* `WaitGroup counter` 값이 0이라면, `Wait` 함수를 호출하기 전에 **반드시** `Add(양수)`를 호출해야 한다.

> Calls with a negative delta, or calls with a positive delta that start when the counter is greater than zero, may happen at any time.

* `WaitGroup counter` 값이 0 보다 크다면, `Add(음수)` 또는 `Add(양수)`를 호출할 수 있다.

> Typically this means the calls to Add should execute before the statement creating the goroutine or other event to be waited for.

* 즉, 고루틴이나 그 외의 이벤트 발생 전에 `Add` 함수를 먼저 호출해야 한다.

> If a WaitGroup is reused to wait for several independent sets of events, new Add calls must happen after all previous Wait calls have returned. See the WaitGroup example.

* 만약 `WaitGroup`을 재활용하려면, 반드시 먼저 호출한 `Wait` 함수의 결과가 리턴된 다음에, `Add` 함수를 호출해 사용하도록 할 것.

# WaitGroup의 코드를 읽어보자

## Done

<https://golang.org/src/sync/waitgroup.go?s=3400:3427#L88 >

사실 Done 함수의 코드 하나만 읽어봐도 어렵지 않게 감을 잡을 수 있다.

```go
// Done decrements the WaitGroup counter by one.
func (wg *WaitGroup) Done() {
    wg.Add(-1)
}
```

`Done`은 그냥 `Add(-1)` 이기 때문이다.

상식적으로 생각을 해보면 `Add`한 숫자와 `Done`의 숫자가 맞아 떨어져야 에러 없이 `Wait`가 종료될 거라고 추측할 수 있다.

## Add

<https://golang.org/src/sync/waitgroup.go?s=2022:2057#L43 >

Add 함수는 복잡해 보이지만 언제 panic이 일어나는지에 주의해서 읽으면 어렵지 않게 파악할 수 있다.

* 카운터가 `0` 보다 작으면 panic.
* `Wait`와 `Add`가 동시에 호출되었을 경우 panic.

```go
func (wg *WaitGroup) Add(delta int) {
    statep, semap := wg.state()
    if race.Enabled {
        _ = *statep // trigger nil deref early
        if delta < 0 {
            // Synchronize decrements with Wait.
            race.ReleaseMerge(unsafe.Pointer(wg))
        }
        race.Disable()
        defer race.Enable()
    }
    state := atomic.AddUint64(statep, uint64(delta)<<32)
    v := int32(state >> 32)
    w := uint32(state)
    if race.Enabled && delta > 0 && v == int32(delta) {
        // The first increment must be synchronized with Wait.
        // Need to model this as a read, because there can be
        // several concurrent wg.counter transitions from 0.
        race.Read(unsafe.Pointer(semap))
    }
    if v < 0 {
        panic("sync: negative WaitGroup counter")
    }
    if w != 0 && delta > 0 && v == int32(delta) {
        panic("sync: WaitGroup misuse: Add called concurrently with Wait")
    }
    if v > 0 || w == 0 {
        return
    }
    // This goroutine has set counter to 0 when waiters > 0.
    // Now there can't be concurrent mutations of state:
    // - Adds must not happen concurrently with Wait,
    // - Wait does not increment waiters if it sees counter == 0.
    // Still do a cheap sanity check to detect WaitGroup misuse.
    if *statep != state {
        panic("sync: WaitGroup misuse: Add called concurrently with Wait")
    }
    // Reset waiters count to 0.
    *statep = 0
    for ; w != 0; w-- {
        runtime_Semrelease(semap, false)
    }
}
```

## Wait

<https://golang.org/src/sync/waitgroup.go?s=3497:3524#L93 >

* `Wait`는 카운터가 0이 되면 끝난다.
* 재사용할 때, 먼저 사용하던 WaitGroup의 카운터가 0이 아니라면 panic.

```go
// Wait blocks until the WaitGroup counter is zero.
func (wg *WaitGroup) Wait() {
    statep, semap := wg.state()
    if race.Enabled {
        _ = *statep // trigger nil deref early
        race.Disable()
    }
    for {
        state := atomic.LoadUint64(statep)
        v := int32(state >> 32)
        w := uint32(state)
        if v == 0 {
            // Counter is 0, no need to wait.
            if race.Enabled {
                race.Enable()
                race.Acquire(unsafe.Pointer(wg))
            }
            return
        }
        // Increment waiters count.
        if atomic.CompareAndSwapUint64(statep, state, state+1) {
            if race.Enabled && w == 0 {
                // Wait must be synchronized with the first Add.
                // Need to model this is as a write to race with the read in Add.
                // As a consequence, can do the write only for the first waiter,
                // otherwise concurrent Waits will race with each other.
                race.Write(unsafe.Pointer(semap))
            }
            runtime_Semacquire(semap)
            if *statep != 0 {
                panic("sync: WaitGroup is reused before previous Wait has returned")
            }
            if race.Enabled {
                race.Enable()
                race.Acquire(unsafe.Pointer(wg))
            }
            return
        }
    }
}
```

# 실행해보자

## PASS: 전형적인 경우

* one, two, three를 출력하는 간단한 예제를 작성해 보았다.
* 가장 전형적인 예제로, `Add(1)` 하나에 고루틴 하나씩 돌아간다.

```go
package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    defer wg.Wait() // Wait를 가장 마지막에 호출

    wg.Add(1)
    go func() {
        defer wg.Done()
        fmt.Println("one")
    }()

    wg.Add(1)
    go func() {
        defer wg.Done()
        fmt.Println("two")
    }()

    wg.Add(1)
    go func() {
        defer wg.Done()
        fmt.Println("three")
    }()
}
```

이상 없이 다음과 같은 결과가 출력된다.

```
two
three
one
```

고루틴과 별개로 WaitGroup 카운터만 테스트하고 싶다면 다음과 같이 돌려도 될 것이다.

```go
func main() {
    var wg sync.WaitGroup
    wg.Add(1)
    wg.Done()
    wg.Add(1)
    wg.Done()
    wg.Add(1)
    wg.Done()
    wg.Wait()
}
```

$$ 1 - 1 + 1 - 1 = 0 $$ 이므로 문제 없이 돌아간다.

## PASS: 한꺼번에 Add 하는 경우

* `Add(3)`을 하고 고루틴 셋을 돌려본다.
* 카운팅만 제대로 되면 문제 없이 출력하며 종료된다.

```go
func main() {
    var wg sync.WaitGroup
    defer wg.Wait()

    wg.Add(3)   // 한번에 3을 Add 한다
    go func() {
        defer wg.Done()
        fmt.Println("one")
    }()
    go func() {
        defer wg.Done()
        fmt.Println("two")
    }()
    go func() {
        defer wg.Done()
        fmt.Println("three")
    }()
}
```

WaitGroup 카운터만 테스트한다면...

```go
func main() {
    var wg sync.WaitGroup
    wg.Add(3)
    wg.Done()
    wg.Done()
    wg.Done()
    wg.Wait()
}
```

$$3 -1 -1 -1 = 0$$ 이므로 아무런 문제가 없다.

당연히 다음과 같이 작성해 돌려봐도 문제 없다.

```go
func main() {
    var wg sync.WaitGroup
    wg.Add(3)
    wg.Add(-3)  // Done 세 번과 똑같다
    wg.Wait()
}
```

## FAIL: Add 숫자가 많은 경우

* 4를 `Add` 하고, 3개의 고루틴을 돌리면 error.

```go
func main() {
    var wg sync.WaitGroup
    defer wg.Wait()

    wg.Add(4)   // 3을 Add 해야 하는데 4를 Add
    go func() {
        defer wg.Done()
        fmt.Println("one")
    }()
    go func() {
        defer wg.Done()
        fmt.Println("two")
    }()
    go func() {
        defer wg.Done()
        fmt.Println("three")
    }()
}
```

```
goroutine 1 [semacquire]:
sync.runtime_Semacquire(0xc000014084)
	/usr/local/Cellar/go/1.11.2/libexec/src/runtime/sema.go:56 +0x39
sync.(*WaitGroup).Wait(0xc000014084)
	/usr/local/Cellar/go/1.11.2/libexec/src/sync/waitgroup.go:130 +0x64
main.main()
	test.go:30 +0xde
exit status 2
```

당연히 WaitGroup 카운터만 테스트해도 똑같은 에러가 난다.

```go
func main() {
    var wg sync.WaitGroup
    wg.Add(4)
    wg.Done()
    wg.Done()
    wg.Done()
    wg.Wait()
}
```

$$ 4 - 1 - 1 - 1 = 1$$ 이므로 `0`으로 끝나지 않는 것이 문제.

## FAIL: Add 숫자가 부족한 경우

* 2를 `Add`하고, 3개의 고루틴을 돌리면 panic.

```go
func main() {
    var wg sync.WaitGroup

    defer wg.Wait()

    wg.Add(2)   // 2개만 추가
    go func() {
        defer wg.Done()
        fmt.Println("one")
    }()

    go func() {
        defer wg.Done()
        fmt.Println("two")
    }()

    go func() {
        defer wg.Done()
        fmt.Println("three")
    }()
}
```

운이 좋으면 에러가 발생하지 않고 잘 실행되지만...

``````
three
one
two
```

대부분 `negative WaitGroup counter` panic이 발생한다.

```
three
one
two
panic: sync: negative WaitGroup counter

goroutine 6 [running]:
sync.(*WaitGroup).Add(0xc000014084, 0xffffffffffffffff)
	/usr/local/Cellar/go/1.11.2/libexec/src/sync/waitgroup.go:74 +0x137
sync.(*WaitGroup).Done(0xc000014084)
	/usr/local/Cellar/go/1.11.2/libexec/src/sync/waitgroup.go:99 +0x34
main.main.func2(0xc000014084)
	test.go:22 +0x88
created by main.main
	test.go:19 +0xbb
panic: sync: WaitGroup is reused before previous Wait has returned

goroutine 1 [running]:
sync.(*WaitGroup).Wait(0xc000014084)
	/usr/local/Cellar/go/1.11.2/libexec/src/sync/waitgroup.go:132 +0xad
main.main()
	test.go:28 +0xde
exit status 2
```

그리고, 당연히 WaitGroup 카운터만으로 테스트해도 똑같이 panic이 발생한다.

```go
func main() {
    var wg sync.WaitGroup
    wg.Add(2)
    wg.Done()
    wg.Done()
    wg.Done()
    wg.Wait()
}
```

## PASS: 단위를 2로 바꿔본다면?

쓸 일 없는 방법이긴 하지만 이런 방법도 되긴 한다.

```go
func main() {
    var wg sync.WaitGroup
    defer wg.Wait()

    wg.Add(6)
    go func() {
        defer wg.Add(-2)
        fmt.Println("one")
    }()
    go func() {
        defer wg.Add(-2)
        fmt.Println("two")
    }()

    go func() {
        defer wg.Add(-2)
        fmt.Println("three")
    }()
}
```

결과는 잘 나온다. 하지만 하지 말자.

```
three
one
two
```

# 결론

* 1 말고 다른 양수 값을 넣어도 괜찮다. 컨트롤할 자신이 있다면.
* 음수를 넣는 것도 가능하긴 하지만 하지 말자.
    * golang 만든 사람들이 괜히 `-1`만 하는 `Done`을 만든 게 아니다.

# Links

* <https://www.facebook.com/groups/golangko/permalink/1093797934131018/ >
* golang.org
    * <https://golang.org/pkg/sync/#WaitGroup.Add >
    * <https://golang.org/src/compress/flate/example_test.go?h=Example_synchronization >
