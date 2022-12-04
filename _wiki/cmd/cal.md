---
layout  : wiki
title   : cal, ncal 명령어
summary : displays a calendar and the date of Easter
date    : 2019-01-06 21:27:09 +0900
updated : 2022-02-12 21:05:40 +0900
tag     : bash command
resource: 71/5E6824-8DC1-44DA-8E54-E135DD73D662
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

```sh
 # 도움말을 본다
cal -help
```

```sh
 # 이번달 달력을 본다
cal

 # 2018년의 1월~12월 달력을 본다
cal 2018

 # 2019년 6월의 달력을 본다
cal 06 2019

 # 1월 1일부터 2019년 6월까지 며칠이 지났는지를 보여주는 달력을 본다
cal -j 06 2019

 # 가로/세로가 뒤집힌 달력을 본다
ncal
CAL
Cal

 # 이번달의 2달 전, 3달 후까지의 달력도 함께 본다
cal -B2 -A3
 # 이렇게 써도 똑같다
cal -B 2 -A 3

 # 전, 후 1달을 추가로 본다. (3개 달력 보기)
cal -3
cal -3 10 2019
```

## 1752년 9월

1752년 9월 2일은 영국이 그레고리력을 채택한 날로, 다음날인 9월 3일을 9월 14일로 선언하여 그레고리력에 맞췄다.
따라서 9월 3일부터 9월 13일은 달력에 나타나지 않는다.

>
현재는 모든 나라들이 그레고리력을 쓰고 있지만 개정한 시기는 나라마다 틀립니다. 특히 개신교나 동방교회(정교회) 국가들은 오랫동안 기존의 율리우스력을 고수했습니다. 영국은 170년이나 지난 1752년에 와서야 그레고리력을 채택했는데, 9월 2일 다음날을 9월 14일로 바꾸면서 11일을 뺐습니다. 영국은 1751년까지 한 해의 시작을 March 25일로 했기 때문에 1751년은 December 31일까지로 282일밖에 안됩니다.
[^sisanews-lee]

`cal 9 1752`로 1752년 9월의 달력을 볼 수 있다.

```sh
$ cal 9 1752
   September 1752
Su Mo Tu We Th Fr Sa
       1  2 14 15 16
17 18 19 20 21 22 23
24 25 26 27 28 29 30
```

이 문제 때문에 `1752`는 `cal`의 소스코드에서 특별하게 취급된다.

## cal.c

[cal.c]( https://github.com/util-linux/util-linux/blob/master/misc-utils/cal.c )

### reform

reform year는 영국에서 그레고리력을 적용하기 시작한 1752년이다.

[DEFAULT_REFORM_YEAR]( https://github.com/util-linux/util-linux/blob/v2.38-rc1/misc-utils/cal.c#L134 )

```c
enum {
    GREGORIAN           = INT32_MIN,
    ISO                 = INT32_MIN,
    GB1752              = 1752,
    DEFAULT_REFORM_YEAR = 1752,     // 1752년
    JULIAN              = INT32_MAX
};
```

`#define` 목록을 읽어보면 1752년 9월의 reformation을 처리하기 위한 내용이 있다.

[cal.c - NUMBER_MISSING_DAYS]( https://github.com/util-linux/util-linux/blob/v2.38-rc1/misc-utils/cal.c#L165-L174 )

```c
#define REFORMATION_MONTH   SEPTEMBER
#define NUMBER_MISSING_DAYS 11      /* 11 day correction */
#define YDAY_AFTER_MISSING  258     /* 14th in Sep 1752 */

#define MONTHS_IN_YEAR      DECEMBER
#define DAYS_IN_MONTH       31
#define MAXDAYS             42      /* slots in a month array */
#define SPACE               -1      /* used in day array */

#define SMALLEST_YEAR       1
```

- `REFORMATION_MONTH SEPTEMBER`: reformation은 9월이다.
- `NUMBER_MISSING_DAYS 11`: reformation을 통해 사라진 날짜의 수는 11개 이다.
    - 2일 다음날이 14일이므로 모두 11개의 날(3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13일)이 사라졌다.

### 윤년 판별 (leap year)

윤년을 판별하는 함수는 `leap_year`. 윤년이면 `1`을, 평년이면 `0`을 리턴한다.

[leap_year]( https://github.com/util-linux/util-linux/blob/v2.38-rc1/misc-utils/cal.c#L620-L627 )

```c
/* leap year -- account for gregorian reformation in 1752 */
static int leap_year(const struct cal_control *ctl, int32_t year)
{
    //  year <= 1752
    if (year <= ctl->reform_year)
        return !(year % 4);

    return ( !(year % 4) && (year % 100) ) || !(year % 400);
}
```

- 1752년 이전
    - 4로 나누어 떨어지는 해는 윤년이다.
- 1752년 후
    - 400 으로 나누어 떨어지는 해는 윤년이다.
    - 4로 나누어 떨어지면서 100으로 나누어 떨어지지 않는 해는 윤년이다.

### day in year 계산

day in year는 1월 1일부터 시작하는 해당 년도의 날짜 순번을 의미한다.
따라서 1월 31일의 다음날인 2월 1일의 day in year는 32가 되며,
일반적으로 윤년이 아닌 해의 12월 31일은 365가 된다.

2007년을 예로 들어보자.

| 날짜             | day in year |
|------------------|-------------|
| 2007년 1월 1일   | 1           |
| 2007년 1월 31일  | 31          |
| 2007년 2월 1일   | 32          |
| 2007년 12월 31일 | 365         |
| 2008년 1월 1일   | 1           |

[cal.c - day_in_year]( https://github.com/util-linux/util-linux/blob/v2.38-rc1/misc-utils/cal.c#L1041-L1054 )

```c
/*
 * day_in_year --
 *  return the 1 based day number within the year
 */
static int day_in_year(const struct cal_control *ctl,
               int day, int month, int32_t year)
{
    int i, leap;

    // 평년이면 0, 윤년이면 1
    leap = leap_year(ctl, year);
    // 1월부터 이전 달까지 각 월을 구성하는 날짜 수를 모두 day에 더한다
    for (i = 1; i < month; i++)
        day += days_in_month[leap][i];
    return day;
}
```

`leap_year`는 윤년이면 `1`, 윤년이 아니면 `0`을 리턴한다.
이 값은 `days_in_month` 배열에서 각 월별 날짜 수를 조회하는 데 사용된다.

[days_in_month]( https://github.com/util-linux/util-linux/blob/v2.38-rc1/misc-utils/cal.c#L183-L186 )

```c
static const int days_in_month[2][13] = {
    // 평년은 2월이 28일까지, 윤년은 2월이 29일까지 있다.
    //  1월 2월
    {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31},
    {0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31},
};
```

### week number 계산

`week_number` 함수는 해당 날짜가 소속된 주가 1년 중 몇 번째 주인지를 계산한다.

[cal.c - week_number]( https://github.com/util-linux/util-linux/blob/v2.38-rc1/misc-utils/cal.c#L1113 )

```c
/*
 * week_number
 *      return the week number of a given date, 1..54.
 *      Supports ISO-8601 and North American modes.
 *      Day may be given as Julian day of the year mode, in which
 *      case the month is disregarded entirely.
 */
static int week_number(int day, int month, int32_t year, const struct cal_control *ctl)
{
    int fday = 0, yday;
    // 요일 (일요일 = 0, 월요일 = 1, ...)
    const int wday = day_in_week(ctl, 1, JANUARY, year);

    // fday 는 요일 보정값이다. 나중에 날짜를 7로 나눈 값을 리턴하게 되는데,
    // week_number는 1부터 시작하니 값을 미리 적절히 더해주는 것.
    if (ctl->weektype & WEEK_NUM_ISO)
        fday = wday + (wday >= FRIDAY ? -2 : 5);
    else {
        /* WEEK_NUM_US: Jan 1 is always First week, that may
         * begin previous year.  That means there is very seldom
         * more than 52 weeks, */
        fday = wday + 6;
    }
    /* For julian dates the month can be set to 1, the global julian
     * variable cannot be relied upon here, because we may recurse
     * internally for 31.12. which would not work. */
    // day > 31 이면, 그레고리안이 아니라 1월로 고정하고 날짜를 따지는 율리우스일로 계산하라는 뜻이다.
    if (day > DAYS_IN_MONTH)
        month = JANUARY;

    // yday: 해당 년도에서 해당 날짜까지의 카운트
    yday = day_in_year(ctl, day, month, year);
    // year가 1752년 이고, yday가 258일 이후라면 11일을 빼준다(9월 2일 ~ 9월 14일 보정)
    if (year == ctl->reform_year && yday >= YDAY_AFTER_MISSING)
        fday -= NUMBER_MISSING_DAYS;

    /* Last year is last year */
    // yday + fday < 7 이면 이전 년도이다. 이전 년도 12월 31일 week_number를 리턴한다.
    if (yday + fday < DAYS_IN_WEEK)
        return week_number(31, DECEMBER, year - 1, ctl);

    /* Or it could be part of the next year.  The reformation year had less
     * days than 365 making this check invalid, but reformation year ended
     * on Sunday and in week 51, so it's ok here. */
    if (ctl->weektype == WEEK_NUM_ISO && yday >= 363
        && day_in_week(ctl, day, month, year) >= MONDAY
        && day_in_week(ctl, day, month, year) <= WEDNESDAY
        && day_in_week(ctl, 31, DECEMBER, year) >= MONDAY
        && day_in_week(ctl, 31, DECEMBER, year) <= WEDNESDAY)
        // 내년 1월 1일의 week_number를 리턴한다.
        return week_number(1, JANUARY, year + 1, ctl);

    // yday + fday 를 7로 나눈 나머지를 리턴한다.
    return (yday + fday) / DAYS_IN_WEEK;
}
```

## 참고문헌

- [cal.c (github.com)]( https://github.com/util-linux/util-linux/blob/master/misc-utils/cal.c )
- [그레고리력- 로마 달력의 역사 - 이태형 박사 (시사경제신문)]( http://www.sisanews.kr/news/articleView.html?idxno=4692 )

## 주석

[^sisanews-lee]: 그레고리력- 로마 달력의 역사. 시사경제신문. 2015-03-06.

