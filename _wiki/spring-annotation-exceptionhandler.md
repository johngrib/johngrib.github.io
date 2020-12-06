---
layout  : wiki
title   : Spring @ExceptionHandler 애노테이션
summary : 특정 클래스/메소드 예외를 처리한다
date    : 2020-12-06 22:24:46 +0900
updated : 2020-12-06 22:58:50 +0900
tag     : spring
toc     : true
public  : true
parent  : [[spring]]
latex   : false
---
* TOC
{:toc}

## 인용

> 스프링 MVC는 `@ExceptionHandler` 애노테이션이 붙어 있는 핸들러 메소드를 통해 예외를 처리할 수 있다.
`@ExceptionHandler`는 예외를 던질 수 있는 핸들러 메소드와 동일한 컨트롤러 내에 존재하므로,
다른 여러 컨트롤러에서 발생하는 예외는 처리할 수 없다.
`@ExceptionHandler` 대신에 `@ControllerAdvice`를 사용하면 여러 컨트롤러에서 발생하는 예외를 한곳에서 처리할 수 있다.
[^long-224]

## JavaDoc

### 지원되는 리턴 타입

>
The following return types are supported for handler methods:
>
- A ModelAndView object (from Servlet MVC).
- A Model object, with the view name implicitly determined through a RequestToViewNameTranslator.
- A Map object for exposing a model, with the view name implicitly determined through a RequestToViewNameTranslator.
- A View object.
- A String value which is interpreted as view name.
- @ResponseBody annotated methods (Servlet-only) to set the response content. The return value will be converted to the response stream using message converters.
- An HttpEntity<?> or ResponseEntity<?> object (Servlet-only) to set response headers and content. The ResponseEntity body will be converted and written to the response stream using message converters.
- void if the method handles the response itself (by writing the response content directly, declaring an argument of type ServletResponse / HttpServletResponse for that purpose) or if the view name is supposed to be implicitly determined through a RequestToViewNameTranslator (not declaring a response argument in the handler method signature).

- `ModelAndView` 객체
- view 이름으로 변환되는 `String` 값
- `HttpEntity<?>`, `ResponseEntity<?>`
- `void`
- ...

### @ResponseStatus 와 조합 가능

> You may combine the ExceptionHandler annotation with @ResponseStatus for a specific HTTP error status.

## Examples

```java
@ExceptionHandler(CustomerNotFoundException.class)
public ResponseEntity<?> notFoundException(CustomerNotFoundException e) {
  return ResponseEntity.status(HttpStatus.BAD_REQUEST)
    .body(e.getMessage());
}
```

## 참고문헌
- [Annotation Type ExceptionHandler]( https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/bind/annotation/ExceptionHandler.html )
- [JOS] 클라우드 네이티브 자바 / 조쉬 롱, 케니 바스타니 저/정윤진, 오명운, 장현희 역 / 책만 / 초판 1쇄 2018년 06월 29일

## 주석

[^long-224]: [JOS] 2.6장. 224쪽.

