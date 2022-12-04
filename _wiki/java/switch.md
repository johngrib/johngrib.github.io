---
layout  : wiki
title   : Java switch 문
summary : 
date    : 2019-09-11 22:23:19 +0900
updated : 2021-07-12 20:04:23 +0900
tag     : java
resource: 15/E6BB48-40F2-47BA-8545-7633721DC6A7
toc     : true
public  : true
parent  : [[java]]
latex   : false
---
* TOC
{:toc}

## From: Java Language Specification Java SE 8 Edition

>
The type of the Expression must be char, byte, short, int, Character, Byte, Short, Integer, String, or an enum type (§8.9), or a compile-time error occurs.
>
-- [The Java® Language Specification Java SE 8 Edition - 14.11. The switch Statement][jls-8-14-11]

`switch`는 다음 타입만을 조건으로 받는다. 그 외의 타입이 주어지면 컴파일 타임 에러가 발생한다.

- `char`, `byte`, `short`, `int`, `Character`, `Byte`, `Short`, `Integer`, `String`, `Enum`

## From: The Java™ Tutorials

### 예제: 기본

Java Tutorial에서는 다음과 같은 예제를 제공한다.[^tutorial-version]

```java
public class SwitchDemo {
    public static void main(String[] args) {

        int month = 8;
        String monthString;
        switch (month) {
            case 1:  monthString = "January";
                     break;
            case 2:  monthString = "February";
                     break;
            case 3:  monthString = "March";
                     break;
            case 4:  monthString = "April";
                     break;
            case 5:  monthString = "May";
                     break;
            case 6:  monthString = "June";
                     break;
            case 7:  monthString = "July";
                     break;
            case 8:  monthString = "August";
                     break;
            case 9:  monthString = "September";
                     break;
            case 10: monthString = "October";
                     break;
            case 11: monthString = "November";
                     break;
            case 12: monthString = "December";
                     break;
            default: monthString = "Invalid month";
                     break;
        }
        System.out.println(monthString);
    }
}
```

`month`가 `8` 이므로, 출력되는 결과는 `August` 이다.

### 예제: `break`

`break`가 없다면 다음 케이스로 계속 넘어가며 실행된다는 점에 주의해야 한다.

```java
public class SwitchDemoFallThrough {

    public static void main(String[] args) {
        java.util.ArrayList<String> futureMonths =
            new java.util.ArrayList<String>();

        int month = 8;

        switch (month) {
            case 1:  futureMonths.add("January");
            case 2:  futureMonths.add("February");
            case 3:  futureMonths.add("March");
            case 4:  futureMonths.add("April");
            case 5:  futureMonths.add("May");
            case 6:  futureMonths.add("June");
            case 7:  futureMonths.add("July");
            case 8:  futureMonths.add("August");
            case 9:  futureMonths.add("September");
            case 10: futureMonths.add("October");
            case 11: futureMonths.add("November");
            case 12: futureMonths.add("December");
                     break;
            default: break;
        }

        if (futureMonths.isEmpty()) {
            System.out.println("Invalid month number");
        } else {
            for (String monthName : futureMonths) {
               System.out.println(monthName);
            }
        }
    }
}
```

출력 결과는 다음과 같다.

```
August
September
October
November
December
```

### 예제: String

Java SE 7 부터는 `switch`에 `String`을 사용할 수 있다.

```java

public class StringSwitchDemo {

    public static int getMonthNumber(String month) {

        int monthNumber = 0;

        if (month == null) {
            return monthNumber;
        }

        switch (month.toLowerCase()) {
            case "january":
                monthNumber = 1;
                break;
            case "february":
                monthNumber = 2;
                break;
            case "march":
                monthNumber = 3;
                break;
            case "april":
                monthNumber = 4;
                break;
            case "may":
                monthNumber = 5;
                break;
            case "june":
                monthNumber = 6;
                break;
            case "july":
                monthNumber = 7;
                break;
            case "august":
                monthNumber = 8;
                break;
            case "september":
                monthNumber = 9;
                break;
            case "october":
                monthNumber = 10;
                break;
            case "november":
                monthNumber = 11;
                break;
            case "december":
                monthNumber = 12;
                break;
            default: 
                monthNumber = 0;
                break;
        }

        return monthNumber;
    }

    public static void main(String[] args) {

        String month = "August";

        int returnedMonthNumber =
            StringSwitchDemo.getMonthNumber(month);

        if (returnedMonthNumber == 0) {
            System.out.println("Invalid month");
        } else {
            System.out.println(returnedMonthNumber);
        }
    }
}
```

출력은 `8`이 된다.

## JDK 12 preview의 switch 문

12 preview 부터는 다음과 같은 편리한 용법이 추가되었다. (나중에 [instanceof의 패턴 매칭 기능](https://openjdk.java.net/jeps/305 )을 넣기 위한 사전 작업이다)

```java
switch (day) {
    case MONDAY, FRIDAY, SUNDAY -> System.out.println(6);
    case TUESDAY                -> System.out.println(7);
    case THURSDAY, SATURDAY     -> System.out.println(8);
    case WEDNESDAY              -> System.out.println(9);
}
```

변수 할당을 Scala 비슷한 느낌으로 할 수도 있다.

```java
int numLetters = switch (day) {
    case MONDAY, FRIDAY, SUNDAY -> 6;
    case TUESDAY                -> 7;
    case THURSDAY, SATURDAY     -> 8;
    case WEDNESDAY              -> 9;
};
```

```java
int j = switch (day) {
    case MONDAY  -> 0;
    case TUESDAY -> 1;
    default      -> {
        int k = day.toString().length();
        int result = f(k);
        break result;
    }
};
```

하지만 실행해보니 그냥은 사용할 수 없고 `--enable-preview` 옵션을 써야 사용할 수 있다.

IntelliJ IDE 에서도 Language level을 그냥 12를 고르면 쓸 수 없고, 12(Preview)를 골라야 사용할 수 있다.

[Java SE 12 spec 문서][spec-12]에는 기존 switch 문의 문법만 나와 있을 뿐, 새로운 방식은 나와 있지 않은 것 같았다.

13버전부터는 옵션 없이 사용할 수 있기를 바란다.


## 참고문헌

* [JEP 325: Switch Expressions (Preview)][jep-325]
* [The Java™ Tutorials - The switch Statement (docs.oracle.com)]( https://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html )
* [The switch Statement (Java SE 12)][spec-12]

## 주석

[^tutorial-version]: Java 8 버전 기준이다.


[jep-325]: https://openjdk.java.net/jeps/325
[spec-12]: https://docs.oracle.com/javase/specs/jls/se12/html/jls-14.html#jls-14.11
[jls-8-14-11]: https://docs.oracle.com/javase/specs/jls/se8/html/jls-14.html#jls-14.11
