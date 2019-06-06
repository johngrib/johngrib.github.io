---
layout  : wiki
title   : (번역) 서브 테스트와 서브 벤치마크 사용하기
summary : Using Subtests and Sub-benchmarks
date    : 2019-06-06 18:59:15 +0900
updated : 2019-06-06 23:57:33 +0900
tag     : golang 번역 the-go-blog testing
toc     : true
public  : true
parent  : Go-Blog-translation
latex   : false
---
* TOC
{:toc}

* 원문: [Using Subtests and Sub-benchmarks By Marcel van Lohuizen](https://blog.golang.org/subtests ) (2016-10-03)
* 의역이 많으며 오역이 있을 수 있습니다.
* (역: ...) 은 원문에 없는 말을 이해를 돕기 위해 제가 추가한 것입니다.

# Introduction

**서문**

_In Go 1.7, the testing package introduces a Run method on the T and B types that allows for the creation of subtests and sub-benchmarks. The introduction of subtests and sub-benchmarks enables better handling of failures, fine-grained control of which tests to run from the command line, control of parallelism, and often results in simpler and more maintainable code._

Go 1.7 에서는 `testing` 패키지에 `T`와 `B` 타입의 `Run` 메소드를 도입하여, 서브 테스트 및 서브 벤치마크를 추가할 수 있게 되었습니다.

서브 테스트 및 서브 벤치마크를 도입하면 오류(failures)를 보다 잘 처리할 수 있으며,
커맨드 라인에서 실행하는 테스트나 병렬(parallelism) 작업을 더 세밀하게 제어할 수 있습니다.
그뿐만 아니라 단순하고 유지 보수하기 좋은 코드를 만드는 데에도 도움이 됩니다.

# Table-driven tests basics

**테이블 기반 테스트의 기본**

_Before digging into the details, let's first discuss a common way of writing tests in Go. A series of related checks can be implemented by looping over a slice of test cases:_

자세한 내용을 알아보기 전에, Go 언어에서 테스트 코드를 작성하는 일반적인 방법을 먼저 알아보도록 합시다.
서로 관계있는 일련의 테스트의 경우는 테스트 케이스들의 슬라이스를 순회시키는 방법으로 구현할 수 있습니다.

```go
func TestTime(t *testing.T) {
    testCases := []struct {
        gmt  string
        loc  string
        want string
    }{
        {"12:31", "Europe/Zuri", "13:31"},     // incorrect location name
        {"12:31", "America/New_York", "7:31"}, // should be 07:31
        {"08:08", "Australia/Sydney", "18:08"},
    }
    for _, tc := range testCases {
        loc, err := time.LoadLocation(tc.loc)
        if err != nil {
            t.Fatalf("could not load location %q", tc.loc)
        }
        gmt, _ := time.Parse("15:04", tc.gmt)
        if got := gmt.In(loc).Format("15:04"); got != tc.want {
            t.Errorf("In(%s, %s) = %s; want %s", tc.gmt, tc.loc, got, tc.want)
        }
    }
}
```

_This approach, commonly referred to as table-driven tests, reduces the amount of repetitive code compared to repeating the same code for each test and makes it straightforward to add more test cases._

이런 방식을 테이블 기반 테스트(table-driven tests)라고 합니다.
이 방식은 각각의 테스트를 따로따로 작성하는 방식에 비해,
반복되는 코드의 양이 줄어들고 테스트 케이스를 추가하기도 간단해집니다.

# Table-driven benchmarks

**테이블 기반 벤치마크**

_Before Go 1.7 it was not possible to use the same table-driven approach for benchmarks. A benchmark tests the performance of an entire function, so iterating over benchmarks would just measure all of them as a single benchmark._

_A common workaround was to define separate top-level benchmarks that each call a common function with different parameters. For instance, before 1.7 the strconv package's benchmarks for AppendFloat looked something like this:_

Go 1.7 이전에는 이러한 테이블 중심의 접근 방법을 벤치마크에 사용할 수 없었습니다.
벤치마크는 함수 전체의 퍼포먼스를 테스트하기 때문이었습니다.
즉, 테이블을 써서 반복시키면 모든 케이스를 측정한 결과가 하나의 벤치마크 측정 결과로 나와버렸습니다.

이 문제를 해결하는 일반적인 방법은
서로 구분되는 최상위(top-level) 벤치마크를 정의해서, 그것들이 각자 다른 파라미터로 공통 함수를 호출하는 것이었습니다.
예를 들어, 1.7 이전에 `strconv` 패키지의 `AppendFloat` 함수 벤치마크는 다음과 같았습니다.

```go
func benchmarkAppendFloat(b *testing.B, f float64, fmt byte, prec, bitSize int) {
    dst := make([]byte, 30)
    b.ResetTimer() // Overkill here, but for illustrative purposes.
    for i := 0; i < b.N; i++ {
        AppendFloat(dst[:0], f, fmt, prec, bitSize)
    }
}

func BenchmarkAppendFloatDecimal(b *testing.B) { benchmarkAppendFloat(b, 33909, 'g', -1, 64) }
func BenchmarkAppendFloat(b *testing.B)        { benchmarkAppendFloat(b, 339.7784, 'g', -1, 64) }
func BenchmarkAppendFloatExp(b *testing.B)     { benchmarkAppendFloat(b, -5.09e75, 'g', -1, 64) }
func BenchmarkAppendFloatNegExp(b *testing.B)  { benchmarkAppendFloat(b, -5.11e-95, 'g', -1, 64) }
func BenchmarkAppendFloatBig(b *testing.B)     { benchmarkAppendFloat(b, 123456789123456789123456789, 'g', -1, 64) }
...
```

_Using the Run method available in Go 1.7, the same set of benchmarks is now expressed as a single top-level benchmark:_

Go 1.7에서 쓸 수 있는 `Run` 메소드를 사용하면, 동일한 벤치마크들의 집합을 하나의 최상위(top-level) 벤치마크로 표현할 수 있습니다.

```go
func BenchmarkAppendFloat(b *testing.B) {
    benchmarks := []struct{
        name    string
        float   float64
        fmt     byte
        prec    int
        bitSize int
    }{
        {"Decimal", 33909, 'g', -1, 64},
        {"Float", 339.7784, 'g', -1, 64},
        {"Exp", -5.09e75, 'g', -1, 64},
        {"NegExp", -5.11e-95, 'g', -1, 64},
        {"Big", 123456789123456789123456789, 'g', -1, 64},
        ...
    }
    dst := make([]byte, 30)
    for _, bm := range benchmarks {
        b.Run(bm.name, func(b *testing.B) {
            for i := 0; i < b.N; i++ {
                AppendFloat(dst[:0], bm.float, bm.fmt, bm.prec, bm.bitSize)
            }
        })
    }
}
```

_Each invocation of the Run method creates a separate benchmark. An enclosing benchmark function that calls a Run method is only run once and is not measured._

_The new code has more lines of code, but is more maintainable, more readable, and consistent with the table-driven approach commonly used for testing. Moreover, common setup code is now shared between runs while eliminating the need to reset the timer._

`Run` 메소드를 호출할 때마다 별도의 벤치마크가 생성됩니다.
여러 벤치마크를 감싸고 있는 `Run` 메소드를 호출하는 벤치마크는 한 번만 실행되며 측정에서 제외됩니다.

새로운 코드는 코드 라인 수가 더 많기는 하지만 더 유지 보수하기 쉽고, 읽기도 쉽습니다.
그리고 테스트 코드 작성에 일반적으로 사용되곤 하는 테이블 기반 접근법과 함께 사용할 수 있습니다.
게다가, 공통되는 설정 코드는 각 벤치마크 실행마다 공유되며 타이머를 재설정할 필요도 없습니다.

# Table-driven tests using subtests

**테이블 기반 테스트에서 서브 테스트 사용하기**

_Go 1.7 also introduces a Run method for creating subtests. This test is a rewritten version of our earlier example using subtests:_

Go 1.7 에는 서브 테스트를 만드는 `Run` 메소드도 추가되었습니다.
다음의 테스트는 앞의 예제에 서브 테스트를 도입한 것입니다.

```go
func TestTime(t *testing.T) {
    testCases := []struct {
        gmt  string
        loc  string
        want string
    }{
        {"12:31", "Europe/Zuri", "13:31"},
        {"12:31", "America/New_York", "7:31"},
        {"08:08", "Australia/Sydney", "18:08"},
    }
    for _, tc := range testCases {
        t.Run(fmt.Sprintf("%s in %s", tc.gmt, tc.loc), func(t *testing.T) {
            loc, err := time.LoadLocation(tc.loc)
            if err != nil {
                t.Fatal("could not load location")
            }
            gmt, _ := time.Parse("15:04", tc.gmt)
            if got := gmt.In(loc).Format("15:04"); got != tc.want {
                t.Errorf("got %s; want %s", got, tc.want)
            }
        })
    }
}
```

_The first thing to note is the difference in output from the two implementations. The original implementation prints:_

두 테스트 코드의 출력을 보면서 어떤 차이점이 있는지 비교해 봅시다.
[첫 번째 구현](#table-driven-tests-basics)의 결과는 다음과 같습니다.

```text
--- FAIL: TestTime (0.00s)
    time_test.go:62: could not load location "Europe/Zuri"
```

_Even though there are two errors, execution of the test halts on the call to Fatalf and the second test never runs._

_The implementation using Run prints both:_

두 개의 에러가 발생해야 하는데, `Fatalf`가 호출되었을 때 테스트가 중단되는 바람에 두 번째 테스트는 실행도 되지 않았습니다.

`Run` 메소드를 사용하면 두 개의 에러를 모두 볼 수 있습니다.

```text
--- FAIL: TestTime (0.00s)
    --- FAIL: TestTime/12:31_in_Europe/Zuri (0.00s)
        time_test.go:84: could not load location
    --- FAIL: TestTime/12:31_in_America/New_York (0.00s)
        time_test.go:88: got 07:31; want 7:31
```

_Fatal and its siblings causes a subtest to be skipped but not its parent or subsequent subtests._

_Another thing to note is the shorter error messages in the new implementation. Since the subtest name uniquely identifies the subtest there is no need to identify the test again within the error messages._

_There are several other benefits to using subtests or sub-benchmarks, as clarified by the following sections._

`Fatal`과 그것의 형제 메소드들(its siblings)이 호출되면 서브 테스트의 나머지 부분을 건너뛰게 됩니다.
그러나 부모 테스트나 다음 차례의 서브 테스트는 건너뛰지 않습니다.

새로 고친 테스트 코드가 더 짧은 에러 메시지를 출력한 점에 주목할 필요가 있습니다.
서브 테스트의 이름은 유니크하게 식별되므로, 에러 메시지를 읽으며 테스트를 다시 구분할 필요가 없습니다.

다음 섹션에서는 서브 테스트나 서브 벤치마크를 사용하면 얻을 수 있는 이점들을 알아봅니다.

# Running specific tests or benchmarks

**특정 테스트나 벤치마크를 실행하기**

_Both subtests and sub-benchmarks can be singled out on the command line using the -run or -bench flag. Both flags take a slash-separated list of regular expressions that match the corresponding parts of the full name of the subtest or sub-benchmark._

_The full name of a subtest or sub-benchmark is a slash-separated list of its name and the names of all of its parents, starting with the top-level. The name is the corresponding function name for top-level tests and benchmarks, and the first argument to Run otherwise. To avoid display and parsing issues, a name is sanitized by replacing spaces with underscores and escaping non-printable characters. The same sanitizing is applied to the regular expressions passed to the -run or -bench flags._

_A few examples:_

_Run tests that use a timezone in Europe:_

서브 테스트와 서브 벤치마크는 커맨드 라인에서 `-run`이나 `-bench` 플래그를 써서 단독적으로 호출할 수 있습니다.
이 두 플래그는 서브 테스트 또는 서브 벤치마크의 전체 이름과 매치되는 정규 표현식의 목록을 받습니다. 목록의 구분자는 슬래시(`/`)입니다.

서브 테스트와 서브 벤치마크의 풀 네임은 최상위 레벨부터 부모에 부모를 거쳐 자신의 이름까지 이어지는 슬래시로 구분되는 목록입니다. 이름은 최상위 테스트와 벤치마크에 해당하는 함수의 이름이고, `Run` 메소드에 전달할 첫 번째 인자를 쓰기도 합니다.
출력과 파싱 문제 때문에 스페이스는 모두 언더스코어(`_`)로 변경되며, 출력할 수 없는 문자는 모두 이스케이핑됩니다.
`-run`과 `-bench` 플래그에 전달되는 정규 표현식에도 같은 방식의 문자열 처리를 수행합니다.

(역: 이건 글로 읽으면 헷갈리는데 실제로 터미널 열고 실행해보면 쉽게 이해됩니다.)

다음은 유럽 타임존을 사용하는 코드의 테스트 예제입니다.

```text
$ go test -run=TestTime/"in Europe"
--- FAIL: TestTime (0.00s)
    --- FAIL: TestTime/12:31_in_Europe/Zuri (0.00s)
        time_test.go:85: could not load location
```

_Run only tests for times after noon:_

오후에 해당하는 테스트만을 돌려보겠습니다.

```text
$ go test -run=Time/12:[0-9] -v
=== RUN   TestTime
=== RUN   TestTime/12:31_in_Europe/Zuri
=== RUN   TestTime/12:31_in_America/New_York
--- FAIL: TestTime (0.00s)
    --- FAIL: TestTime/12:31_in_Europe/Zuri (0.00s)
        time_test.go:85: could not load location
    --- FAIL: TestTime/12:31_in_America/New_York (0.00s)
        time_test.go:89: got 07:31; want 7:31
```

_Perhaps a bit surprising, using -run=TestTime/New_York won't match any tests. This is because the slash present in the location names is treated as a separator as well. Instead use:_

만약 `-run=TestTime/New_York`을 옵션으로 주면 어떤 테스트와도 매치되지 않을 것입니다.
왜냐하면 이런 경우엔 슬래시의 위치가 이름의 구분자로 사용되기 때문입니다. 따라서 다음과 같이 사용해야 합니다.

```text
$ go test -run=Time//New_York
--- FAIL: TestTime (0.00s)
    --- FAIL: TestTime/12:31_in_America/New_York (0.00s)
        time_test.go:88: got 07:31; want 7:31
```

_Note the // in the string passed to -run. The / in time zone name America/New_York is handled as if it were a separator resulting from a subtest. The first regular expression of the pattern (TestTime) matches the top-level test. The second regular expression (the empty string) matches anything, in this case the time and the continent part of the location. The third regular expression (New_York) matches the city part of the location._

_Treating slashes in names as separators allows the user to refactor hierarchies of tests without the need to change the naming. It also simplifies the escaping rules. The user should escape slashes in names, for instance by replacing them with backslashes, if this poses a problem._

_A unique sequence number is appended to test names that are not unique. So one could just pass an empty string to Run if there is no obvious naming scheme for subtests and the subtests can easily be identified by their sequence number._

`-run`에 전달되는 문자열의 `//`에 주목하세요.

타임존의 이름인 `America/New_York`에 들어있는 `/`는 서브 테스트의 구분자로 처리됩니다.

첫 번째 정규식 패턴(`TestTime`)은 최상위 테스트와 매치됩니다.
두 번째 정규식(공백 문자)은 아무것도 매치되지 않는데(역: `//` 두 슬래시 사이의 공백 문자입니다), 이 경우에는 시간과 대륙에서의 지리적인 위치에 해당합니다.
세 번째 정규식(`New_York`)은 도시 부분과 매치됩니다.

슬래시를 이름들의 구분자로 사용하면 사용자가 이름을 변경하지 않아도 테스트의 계층 구조를 리팩토링할 수 있습니다.

이 규칙은 이스케이핑 규칙을 단순화한다는 장점도 있습니다.
만약 슬래시 사용이 문제가 되는 경우가 있다면, 슬래시를 백슬래시로 이스케이핑하면 됩니다.

유일하지 않은 테스트 이름에는 고유한 시퀀스 숫자가 따라붙습니다.
그러므로 서브 테스트를 지정하는 명확한 명명 구조가 없다면 그냥 공백 문자열을 `Run` 메소드에 전달해도 됩니다.
그러면 서브 테스트들을 시퀀스 숫자를 통해 구분할 수 있습니다.

(역: `go test -run=`으로 실행하면 됩니다. `go test -run`은 `missing arg`가 나와서 안 되더군요.)

# Setup and Tear-down

**설정 및 종료**

_Subtests and sub-benchmarks can be used to manage common setup and tear-down code:_

서브 테스트와 서브 벤치마크는 공통 코드로 설정 및 종료를 관리할 수 있습니다.

```go
func TestFoo(t *testing.T) {
    // <setup code>
    t.Run("A=1", func(t *testing.T) { ... })
    t.Run("A=2", func(t *testing.T) { ... })
    t.Run("B=1", func(t *testing.T) {
        if !test(foo{B:1}) {
            t.Fail()
        }
    })
    // <tear-down code>
}
```

_The setup and tear-down code will run if any of the enclosed subtests are run and will run at most once. This applies even if any of the subtests calls Skip, Fail, or Fatal._

딸린 서브 테스트가 실행되면 설정 및 종료 코드가 최대 한 번씩 실행됩니다.
이것은 서브 테스트 중 하나가 `Skip`, `Fail`, `Fatal` 함수를 호출하더라도 적용됩니다.

# Control of Parallelism

**병렬 제어**

_Subtests allow fine-grained control over parallelism. To understand how to use subtests in the way it is important to understand the semantics of parallel tests._

_Each test is associated with a test function. A test is called a parallel test if its test function calls the Parallel method on its instance of testing.T. A parallel test never runs concurrently with a sequential test and its execution is suspended until its calling test function, that of the parent test, has returned. The -parallel flag defines the maximum number of parallel tests that can run in parallel._

_A test blocks until its test function returns and all of its subtests have completed. This means that the parallel tests that are run by a sequential test will complete before any other consecutive sequential test is run._

_This behavior is identical for tests created by Run and top-level tests. In fact, under the hood top-level tests are implemented as subtests of a hidden master test._

서브 테스트를 통해 병렬 처리를 세부적으로 제어할 수 있습니다.
이런 방식으로 서브 테스트를 사용하는 방법을 이해하려면 병렬 테스트의 의미를 이해하는 것이 중요합니다.

각각의 테스트는 하나의 테스트 함수로 이루어집니다.
테스트 함수가 `testing.T`의 인스턴스에서 `Parallel` 메소드를 호출하는 테스트를 병렬 테스트(parallel test)라고 부릅니다.
병렬 테스트는 순차 테스트(sequential test)와 절대로 동시에(concurrently) 실행되지 않으며 부모 테스트 함수가 리턴할 때까지 실행이 중단됩니다.
`-parallel` 플래그로 병렬로 실행할 수 있는 테스트 수의 최댓값을 정의할 수 있습니다.

테스트는 테스트 함수가 리턴되고 모든 서브 테스트의 실행이 완료될 때까지 차단(block)됩니다.
즉, 순차적 테스트에 의해 실행되는 병렬 테스트는, 다음 순서의 순차적 테스트가 실행되기 전에 모두 완료됩니다.

이러한 동작은 `Run` 메소드에 의해 실행되는 테스트나 최상위 테스트나 동일합니다.
사실은, 최상위 테스트도 알고 보면 숨겨진 마스터 테스트의 서브 테스트로 구현되기 때문입니다.

# Run a group of tests in parallel

**테스트 그룹을 병렬로 실행하기**

_The above semantics allows for running a group of tests in parallel with each other but not with other parallel tests:_

위 제목의 뜻은 다른 병렬 테스트와 한꺼번에 돌릴 수 있다는 것이 아니라,
한 그룹의 테스트를 병렬로 돌릴 수 있다는 것입니다.

```go
func TestGroupedParallel(t *testing.T) {
    for _, tc := range testCases {
        tc := tc // capture range variable
        t.Run(tc.Name, func(t *testing.T) {
            t.Parallel()
            if got := foo(tc.in); got != tc.out {
                t.Errorf("got %v; want %v", got, tc.out)
            }
            ...
        })
    }
}
```

_The outer test will not complete until all parallel tests started by Run have completed. As a result, no other parallel tests can run in parallel to these parallel tests._

_Note that we need to capture the range variable to ensure that tc gets bound to the correct instance._

`Run` 메소드가 실행한 모든 병렬 테스트가 종료되기 전까지는 바깥쪽의 테스트는 완료되지 않습니다.
결과적으로 병렬 테스트가 돌고 있는 동안에는 다른 병렬 테스트를 돌릴 수 없습니다.

`tc`가 올바른 인스턴스를 갖고 있도록 `range` 변수를 캡처한 것에 주목하세요.

# Cleaning up after a group of parallel tests

**그룹 병렬 테스트를 마친 후 뒷정리하기**

_In the previous example we used the semantics to wait on a group of parallel tests to complete before commencing other tests. The same technique can be used to clean up after a group of parallel tests that share common resources:_

앞의 예제에서 우리는 그룹 병렬 테스트가 모두 완료되어야 다음의 테스트가 이어서 실행된다는 것을 알게 되었습니다.
같은 테크닉을 사용하여 공통 자원을 공유하는 병렬 테스트 그룹의 뒷정리(clean up)를 할 수 있습니다.

```go
func TestTeardownParallel(t *testing.T) {
    // <setup code>
    // This Run will not return until its parallel subtests complete.
    t.Run("group", func(t *testing.T) {
        t.Run("Test1", parallelTest1)
        t.Run("Test2", parallelTest2)
        t.Run("Test3", parallelTest3)
    })
    // <tear-down code>
}
```

_The behavior of waiting on a group of parallel tests is identical to that of the previous example._

그룹 병렬 테스트를 기다리는 동작은 앞의 예제와 동일합니다.

# Conclusion

**결론**

_Go 1.7's addition of subtests and sub-benchmarks allows you to write structured tests and benchmarks in a natural way that blends nicely into the existing tools. One way to think about this is that earlier versions of the testing package had a 1-level hierarchy: the package-level test was structured as a set of individual tests and benchmarks. Now that structure has been extended to those individual tests and benchmarks, recursively. In fact, in the implementation, the top-level tests and benchmarks are tracked as if they were subtests and sub-benchmarks of an implicit master test and benchmark: the treatment really is the same at all levels._

_The ability for tests to define this structure enables fine-grained execution of specific test cases, shared setup and teardown, and better control over test parallelism. We are excited to see what other uses people find. Enjoy._

_By Marcel van Lohuizen_

Go 1.7에 추가된 서브 테스트와 서브 벤치마크를 사용하면 자연스럽게 기존의 도구들과 잘 어울리는 구조적인 테스트 코드와 벤치마크를 작성할 수 있습니다.
이에 대해 이전 버전의 `testing` 패키지에는 계층이 1단계만 있었다는 점을 생각해볼 만합니다.
이전 버전의 패키지 레벨 테스트는 모두 개별적인 테스트와 벤치마크들로 이루어져 있었습니다.
이제는 그러한 구조가 개별적인 테스트와 벤치마크에 대해 재귀적으로 적용되었습니다.
실제로, 구현된 최상위 테스트와 벤치마크는 절대적인 마스터 테스트/벤치마크의 서브 테스트/벤치마크로 작동합니다.
즉 모든 레벨에서 똑같은 방식으로 처리됩니다.

이런 식의 구조를 정의할 수 있는 테스트 기법을 사용하면 
특정 테스트 케이스를 세밀하게 실행하고, 설정과 종료를 공유하며, 병렬 테스트를 더 잘 제어할 수 있습니다.
한편, 우리는 사람들이 다른 방식을 찾아내는 것을 보는 것도 기쁩니다. 즐겨 주십시오.

_By Marcel van Lohuizen_

# License 관련 사항

* 이 번역문의 원문은 [Creative Commons Attribution 3.0 라이센스](https://creativecommons.org/licenses/by/3.0/deed.ko )를 따릅니다.
* 이 번역문의 원문에 첨부된 코드는 [BSD license](https://golang.org/LICENSE )를 따릅니다.
* 이 번역문의 원문 주소는 <https://blog.golang.org/subtests > 입니다.
* 번역하는 과정에서 상당한 의역과 임의의 내용 추가가 있었습니다.

