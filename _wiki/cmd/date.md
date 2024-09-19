---
layout  : wiki
title   : date 명령어
summary : 날짜나 시간을 출력하거나 설정한다
date    : 2018-08-03 05:19:22 +0900
updated : 2024-09-19 22:50:44 +0900
tag     : bash command
resource: 48/DDC995-1C3B-477A-A0F6-A07FCA93164C
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples
### MacOS

```sh
 # 현재 날짜, 시간
date

 # UTC 현재 날짜, 시간
date -u

 # 현재 날짜, 시간 포매팅
date '+%Y-%m-%d %H:%M:%S %a %Z'

 # UTC 현재 날짜, 시간 포매팅
date -u '+%Y-%m-%d %H:%M:%S %a %Z'

 # 오늘은 1년 중 몇 번째 주(week)인가?
date +%V

 # 현재의 unix timestamp를 출력
date +%s

 # unix timestamp를 읽기 쉬운 날짜로 변환
date -r 1572511074

 # yyyy-MM-dd 형식의 날짜를 timestamp로 변환
date -jf %Y-%m-%d "2022-03-09" +%s

 # 두 날짜 사이의 일수를 구하기
from_time=$(date -jf %Y-%m-%d "2022-03-09" +%s)
to_time=$(date -jf %Y-%m-%d "2022-03-07" +%s)
echo $(((from_time - to_time) / 86400))         # 결과는 2
```

### GNU

GNU date는 MacOS의 date보다 더 많은 기능을 제공한다.

mac에서 GNU `date`를 사용하려면 `coreutils`를 설치하면 된다.

```sh
brew install coreutils
```

```sh
$ # 날짜를 unixtimestamp로 변환
$ gdate --date="0001-01-01T00:00:00Z" +%s
-62135596800

$ gdate --date="1970-01-01T00:00:00Z" +%s
0

$ gdate --date="2022-01-01T00:00:00Z+0000" +%s
1640995200

$ gdate --date="2022-01-01T00:00:00Z+0900" +%s
1640962800

$ # unixtimestamp를 날짜로 변환
$ gdate -d @1640995200 +"%F %T %z"
2022-01-01 09:00:00 +0900

$ gdate -d @1640995200 +"%F %T %z" --utc
2022-01-01 00:00:00 +0000
```

## Format

* 명령어 예제를 실행한 결과의 기준은 `2018년 8월 3일 금요일 05시 49분 37초`.

| 포맷 옵션 | 설명                 | 명령어 예제 | 실행 결과                |
|-----------|----------------------|-------------|--------------------------|
| `%`       | %                    | `date +%`   | `%`                      |
| `%n`      | `\n`                 | `date +%n`  | 공백 라인이 출력된다.    |
| `%t`      | `\t`                 | `date +%n`  | 탭 문자가 출력된다.      |
| `%s`      | epoch 타임           | `date +%s`  | `1533242977`             |
| `%Y`      | 4자리 년도           | `date +%Y`  | `2018`                   |
| `%y`      | 2자리 년도           | `date +%y`  | `18`                     |
| `%A`      | 요일 이름(locale)    | `date +%A`  | `금요일`                 |
| `%a`      | 요일 이름(locale)    | `date +%a`  | `금`                     |
| `%B`      | 월 이름(locale)      | `date +%B`  | `8월`                    |
| `%b`      | 월 이름(locale)      | `date +%b`  | `8`                      |
| `%m`      | 월(01 ~ 12)          | `date +%m`  | `08`                     |
| `%c`      | 날짜 및 시간(locale) | `date +%c`  | `금  8/ 3 05:49:37 2018` |
| `%d`      | Month 날짜(01 ~ 31)  | `date +%d`  | `03`                     |
| `%j`      | Year 날짜(001 ~ 366) | `date +%j`  | `215`                    |
| `%w`      | 요일 숫자(0: 일요일) | `date +%w`  | `5`                      |
| `%H`      | 시간(00 ~ 23)        | `date +%H`  | `05`                     |
| `%M`      | 분(00 ~ 59)          | `date +%M`  | `49`                     |
| `%S`      | 초(00 ~ 59)          | `date +%S`  | `37`                     |
| `%V`      | week 숫자            | `date +%V`  | `31`                     |
| `%Z`      | 타임존               | `date +%Z`  | `KST`                    |

## 나노초 출력 {#nanosecond}

macOS의 빌트인 `date` 명령어는 나노초를 지원하지 않는다.

그러나 GNU `date`는 나노초를 출력할 수 있다.

```sh
$ date +'%Y-%m-%d %H:%M:%S.%N'
2024-07-17 22:51:51.N
```

```sh
$ gdate +'%Y-%m-%d %H:%M:%S.%N'
2024-07-17 22:51:53.317486000
``````

## 타임존

### 현재 타임존 확인

`/etc/localtime`가 어느 파일에 대한 심볼릭 링크인지 확인하면 현재 타임존을 알 수 있다.

```bash
$ readlink /etc/localtime
/var/db/timezone/zoneinfo/Asia/Seoul
```

물론 [[/cmd/ls]]{ls -l} 로도 확인할 수 있다.

```bash
$ ls -l /etc/localtime
lrwxr-xr-x 1 root wheel 36 2024-08-17 Sat 11:11:03 /etc/localtime -> /var/db/timezone/zoneinfo/Asia/Seoul
```

### 타임존에 따른 날짜시간 출력

`TZ` 환경변수에 타임존을 입력하는 방식으로 특정 타임존의 날짜시간을 출력할 수 있다.

```sh
$ TZ="Asia/Seoul" date ; TZ="Asia/Singapore" date ; TZ="Asia/Tokyo" date
Thu Sep 19 22:39:24 KST 2024
Thu Sep 19 21:39:24 +08 2024
Thu Sep 19 22:39:24 JST 2024
```

`TZ`에 입력할 수 있는 타임존 이름은 `/usr/share/zoneinfo/zone.tab` 파일에서 확인하면 된다.

## 참고문헌

- [21.1.7 Examples of date (gnu.org)]( https://www.gnu.org/software/coreutils/manual/html_node/Examples-of-date.html )

