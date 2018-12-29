---
layout  : wiki
title   : Golang reflect 사용법
summary : reflect를 써야 하는 순간은 언젠가 올 테니까 미리 정리해 두자
date    : 2018-12-29 18:38:23 +0900
updated : 2018-12-29 19:45:12 +0900
tags    : golang reflect
toc     : true
public  : true
parent  : Golang
latex   : false
---
* TOC
{:toc}

# 기준 버전

* 이 문서는 Go 1.11.2 버전을 기준으로 삼는다.

# struct의 meta data를 뽑아보자

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

# Links

* <https://golang.org/pkg/reflect/ >
* <https://blog.golang.org/laws-of-reflection >
