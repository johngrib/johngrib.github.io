---
layout  : wiki
title   : dateutils
summary : command line date and time utilities
date    : 2024-08-04 18:33:27 +0900
updated : 2024-08-04 18:56:10 +0900
tag     : 
resource: 5D/FC2A46-0E1D-4EB0-89D7-53D15C65DC69
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Install

```bash
brew install dateutils
```

`date`로 시작하는 모든 명령에 대해 `d` 축약형태가 있다.

- dateadd, dadd : Add durations to dates or times
- dateconv, dconv : Convert dates between calendars or time zones
- datediff, ddiff : Compute durations between dates and times
- dategrep, dgrep : Find date or time matches in input stream
- dateround, dround : Round dates or times to designated values
- dateseq, dseq : Generate sequences of dates or times
- datetest, dtest : Compare dates or times
- strptime : Command line version of the C function


## man

패키지 자체에 대한 설명서는 다음과 같이 볼 수 있다.

```bash
man dateutils
```

그 외의 서브 명령들에 대해서는 다음과 같이 풀네임과 축약이름으로 `man`으로 볼 수 있다.

```bash
man dateadd
man dadd
man dateconv
man dconv
...
```

## Examples

### dateseq

```bash
$ dateseq 2010-01-01 2010-01-10
2010-01-01
2010-01-02
2010-01-03
2010-01-04
2010-01-05
2010-01-06
2010-01-07
2010-01-08
2010-01-09
2010-01-10
```

```bash
$ dateseq 2010-01-01 2010-01-10 --skip sat,sun
2010-01-01
2010-01-04
2010-01-05
2010-01-06
2010-01-07
2010-01-08
```

```bash
$ dateseq 12:00:00 5m 12:17:00
12:00:00
12:05:00
12:10:00
12:15:00
```

### dateadd

```bash
$ dateadd 2010-02-02 +4d
2010-02-06
```

```bash
$ dateadd 2010-02-02 +1w
2010-02-09
```

```bash
$ dateadd 12:05:00 +10m
12:15:00
```

```bash
$  dateadd 2012-03-12T12:05:00 -1d4h
2012-03-11T08:05:00
```

### datediff

```bash
$ datediff 2001-02-08 2001-03-02
22
```

```bash
$ datediff 2001-02-08 2001-03-09 -f "%m month and %d day"
1 month and 1 day
```

```bash
$ datediff 2012-03-01T12:17:00 2012-03-02T14:00:00
92580s
```

```bash
$ datediff 2012-03-01T12:17:00 2012-03-02T14:00:00 -f '%dd %Ss'
1d 6180s
```

### dategrep

생략

### dateround

생략

### datesort

생략

### datezone

생략

### strptime

생략

## Links

- [hroptatyr/dateutils (github.com)](https://github.com/hroptatyr/dateutils )
- [formula/dateutils](https://formulae.brew.sh/formula/dateutils )

