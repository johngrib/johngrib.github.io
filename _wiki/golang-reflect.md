---
layout  : wiki
title   : Golang reflect 사용법
summary : 라이브러리 만들 때에만 쓰고 남용하지 말자
date    : 2018-12-29 18:38:23 +0900
updated : 2018-12-29 23:17:48 +0900
tags    : golang reflect
toc     : true
public  : true
parent  : Golang
latex   : false
---
* TOC
{:toc}

* reflect를 써야 하는 순간은 언젠가 올 테니까 미리 정리해 두자

# 기준 버전

* 이 문서는 Go 1.11.2 버전을 기준으로 삼는다.

# 사용 예제

* 생각나는대로 만들어 보았다.
* 생각나는대로 추가하자.

## struct의 meta data를 뽑아보자

1. `reflect.ValueOf()`와 `Value.Elem()`을 써서 주어진 구조체를 `reflect.Value` 타입으로 변형한다.
1. `for`로 돌리면서 값을 뽑아내면 된다.

일단 두 개의 struct를 만들어 보았다.

```go
type Person struct {
    Name   string `json:"name"`
    Nation string `json:"country"`
    Zip    int    `json:"zipCode"`
}

type Dog struct {
    Name string  `json:"name"`
    Like *Person `json:"person"`
}
```

그리고 `metaData`라는 이름의 함수를 만들었다.

```go
func metaData(anything interface{}) {

    target := reflect.ValueOf(anything)
    elements := target.Elem()

    fmt.Printf("Type: %s\n", target.Type()) // 구조체 타입명

    for i := 0; i < elements.NumField(); i++ {
        mValue := elements.Field(i)
        mType := elements.Type().Field(i)
        tag := mType.Tag

        fmt.Printf("%10s %10s ==> %10v, json: %10s\n",
            mType.Name,         // 이름
            mType.Type,         // 타입
            mValue.Interface(), // 값
            tag.Get("json"))    // json 태그
    }
}
```

이걸 돌려보면...

```go
func main() {
    john := &Person{
        Name:   "JohnGrib",
        Nation: "Korea",
        Zip:    12345,
    }
    metaData(john)
    metaData(&Dog{
        Name: "Wolfy",
        Like: john,
    })
}
```

이런 결과가 출력된다.

```
Type: *main.Person
      Name     string ==>   JohnGrib, json:       name
    Nation     string ==>      Korea, json:    country
       Zip        int ==>      12345, json:    zipCode
Type: *main.Dog
      Name     string ==>      Wolfy, json:       name
      Like *main.Person ==> &{  JohnGrib      Korea      12345}, json:     person
```

## 메소드 정보 뽑아내기

테스트용 구조체를 하나 만들고 세 개의 메소드를 추가했다.

* PrintTwoTexts : string 2개를 입력받아 (string, error)를 리턴한다.
* Add : int 2개를 입력받아 덧셈한 결과를 리턴한다.
* sub : int 2개를 입력받아 뺄셈한 결과를 리턴한다.
    * 소문자로 시작하므로 private 메소드이다.

```go
type T struct{}

func (t *T) Prints(msg string, num int) (string, error) {
    return fmt.Sprintf("%s %d", msg, num), nil
}

func (t *T) Add(a, b int) int {
    return a + b
}

func (t *T) sub(a, b int) int {
    return a - b
}
```

그리고 메소드 정보를 뽑아내는 함수를 만들어 보았다.

```go
// input parameter 정보 출력
func methodInMeta(method reflect.Value) {
    methodType := method.Type()
    fmt.Println(" input types:", methodType.NumIn())

    for j := 0; j < methodType.NumIn(); j++ {
        param := methodType.In(j)
        fmt.Printf("  in #%d : %s\n", j, param.Name())
    }
}

// output return 값 정보 출력
func methodOutMeta(method reflect.Value) {
    methodType := method.Type()
    fmt.Println(" output types:", methodType.NumOut())

    for j := 0; j < methodType.NumOut(); j++ {
        param := methodType.Out(j)
        fmt.Printf("  out #%d : %s\n", j, param.Name())
    }
}

func methodMetaData(method reflect.Value) {
    fmt.Println(method.Type())
    methodInMeta(method)
    methodOutMeta(method)
    fmt.Println("")
}
```

이걸 돌려보면...

```go
func main() {
    var t T

    value := reflect.ValueOf(&t)
    fmt.Println(value.Type())
    fmt.Println("")

    for i := 0; i < value.NumMethod(); i++ {
        method := value.Method(i)
        methodMetaData(method)
    }

    // 메소드 이름으로도 찾을 수 있다
    fmt.Println("? add Method ?")
    addMethod := value.MethodByName("Add")
    if addMethod.IsValid() {
        methodMetaData(addMethod)
    }

    fmt.Println("? sub Method ?")
    subMethod := value.MethodByName("sub")
    if subMethod.IsValid() {
        fmt.Println(subMethod.IsValid())
    } else {
        fmt.Println("sub is private method")
    }
}
```

이런 결과가 나온다.

```
*main.T

func(int, int) int
 input types: 2
  in #0 : int
  in #1 : int
 output types: 1
  out #0 : int

func(string, int) (string, error)
 input types: 2
  in #0 : string
  in #1 : int
 output types: 2
  out #0 : string
  out #1 : error

? add Method ?
func(int, int) int
 input types: 2
  in #0 : int
  in #1 : int
 output types: 1
  out #0 : int

? sub Method ?
sub is private method
```

* private 함수 정보는 가져올 수 없는 것 같다.
    * reflect로 사용할 일이 있는 메소드는 public으로 작성해야겠다.


# Links

* <https://golang.org/pkg/reflect/ >
* <https://blog.golang.org/laws-of-reflection >
