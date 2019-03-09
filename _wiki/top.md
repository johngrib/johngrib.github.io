---
layout  : wiki
title   : top 명령어
summary : 시스템 프로세스 및 메모리 사용 상태를 확인한다
date    : 2018-02-07 07:00:35 +0900
updated : 2018-02-07 21:26:59 +0900
tag     : bash command
toc     : true
public  : true
parent  : command-line
latex   : false
---
* TOC
{:toc}

## 개요

>
**top** -- display and update sorted information about processes
>
The **top** program periodically displays a sorted list of system processes.
The default sorting key is pid, but other keys can be used instead.
Various output options are available.

## 사용 방법 - linux

```
$ top
```

| 단축키   | 설명, 사용법                                                 |
| :------: | :----                                                        |
| `h`      | 단축키 도움말을 본다.                                        |
| `?`      | `h`와 같다.                                                  |
| `k`      | `k`를 누르고 PID를 입력하면 해당 프로세스를 kill 할 수 있다. |

### top 실행 결과를 파일로 저장하는 방법

파일로 출력하려면 `-b` 옵션(배치 모드)으로 실행하면 된다.


```
$ top -b -n 1 > top_report.txt
```

* 위와 같이 옵션을 주고 실행하면, 1번 실행한 결과가 `top_report.txt` 파일로 저장된다.
    * `-b`는 배치 모드를 의미한다.
    * `-n 1`는 1번 실행하는 것을 의미한다.

```
$ top -b -n 1 | tee top_report.txt
```

* 위와 같이 실행하면 화면으로도 출력하고, 파일로도 출력한다.

## 사용 방법 - Mac

Mac에서의 top은 사용 방법이 linux와 좀 다른 편이다.

```
$ top
```

| 단축키     | 설명, 사용법                                                 |
| :--------: | :-----:                                                      |
| `?`        | 도움말을 본다.                                               |
| `o`        | 정렬(primary). `o`를 누른 후 첫 번째 정렬 기준을 입력한다.   |
| `O`        | 정렬(secondary). `O`를 누른 후 두 번째 정렬 기준을 입력한다. |

## Links

* [top - mac(developer.apple.com)](https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man1/top.1.html)
