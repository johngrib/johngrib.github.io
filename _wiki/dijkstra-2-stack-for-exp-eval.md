---
layout  : wiki
title   : 산술 표현식 계산을 위한 2중 스택 알고리즘
summary : Dijkstra's Two-Stack Algorithm for Expression Evaluation
date    : 2020-05-24 23:04:24 +0900
updated : 2020-05-25 22:50:23 +0900
tag     : algorithm dijkstra
toc     : true
public  : true
parent  : [[algorithm]]
latex   : false
---
* TOC
{:toc}

## 개요

- 1960년대에 E.W. 데이크스트라가 고안한 단순한 알고리즘.
- 2중 스택을 사용한다.
    - 연산자 스택
    - 피연산자 스택

알고리즘은 다음과 같다.

- 피연산자를 만나면 피연산자 스택에 넣는다.
- 연산자를 만나면 연산자 스택에 넣는다.
- 열림 괄호(왼쪽 괄호)를 만나면 무시한다.
- 닫힌 괄호(오른쪽 괄호)를 만나면 연산자와 그 연산자에 필요한 피연산자들을 스택에서 꺼낸다.
    - 꺼내어진 연산자와 피연산자의 계산 결괏값을 구하여 피연산자 스택에 넣는다.
- 마지막 닫힌 괄호를 만나면 피연산자 스택에 한 개의 숫자만 남는다.
    - 이 숫자가 전체 표현식의 계산 결과 값이다.

## 주의사항

이 알고리즘은 괄호 안에 한 개의 연산자가 있는 경우만 처리할 수 있어 실제로 사용하기엔 무리가 있다.

## 코드

다음 코드는 Java 14로 작성되었다.

- [github](https://github.com/johngrib/algorithm-study/commit/1265f2037b82b23898cf9bf041340d6f9274d875 )
    - 링크에 있는 테스트 코드를 읽어보자.

```java
public static double calc(final String expression) {
  final String[] input = expression.split("\\s");
  final Stack<String> operators = new Stack<>();
  final Stack<Double> values = new Stack<>();

  for (String token : input) {
    switch (token) {
      case "+", "-", "*", "/", "sqrt" -> operators.push(token);
      case "(" -> {
        // do nothing
      }
      case ")" -> {
        String op = operators.pop();
        double v = values.pop();
        switch (op) {
          case "+" -> v = values.pop() + v;
          case "-" -> v = values.pop() - v;
          case "*" -> v = values.pop() * v;
          case "/" -> v = values.pop() / v;
          case "sqrt" -> v = Math.sqrt(v);
        }
        values.push(v);
      }
      default -> values.push(Double.parseDouble(token));
    }
  }
  return values.pop();
}
```

## 참고문헌

- 알고리즘 [개정4판] / 로버트 세지윅, 케빈 웨인 저/권오인 역 / 길벗 / 초판발행 2018년 12월 26일

