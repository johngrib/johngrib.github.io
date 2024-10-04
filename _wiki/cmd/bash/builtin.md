---
layout  : wiki
title   : Shell builtin 명령어
summary : 
date    : 2024-10-04 14:54:52 +0900
updated : 2024-10-04 15:19:24 +0900
tag     : 
resource: E6/CC6D5E-EBC9-4125-870C-95666FA9E542
toc     : true
public  : true
parent  : [[/cmd/bash]]
latex   : false
---
* TOC
{:toc}

## 개요

내부 명령을 사용하는 명령.

## builtin 명령과 External 명령

가령 [[/cmd/echo]]의 경우, 내부(builtin)와 외부(external) 명령이 모두 존재한다.

```bash
$ echo hello
hello

$ which echo
/bin/echo

$ file $(which echo)
/bin/echo: Mach-O universal binary with 2 architectures: [x86_64:Mach-O 64-bit executable x86_64] [arm64e:Mach-O 64-bit executable arm64e]
/bin/echo (for architecture x86_64):	Mach-O 64-bit executable x86_64
/bin/echo (for architecture arm64e):	Mach-O 64-bit executable arm64e
```

위와 같이 `which`로 조사해 보면 외부 명령인 `echo`의 정보가 출력된다.

`echo`와 똑같은 이름을 갖는 내부 명령을 사용하려면 `builtin`을 앞에 붙여 사용하면 된다.

```bash
$ builtin echo hello
hello
```

builtin 명령을 사용하면 external 명령에 비해 시스템 오버헤드가 적으므로 더 빠르게 실행된다.

```bash
$ time for i in {1..10000}; do /bin/echo $i ; done > /dev/null

real	0m11.836s
user	0m3.689s
sys	0m6.435s
```

- `/bin/echo` : External 명령인 `/bin/echo`를 사용.

```bash
$ time for i in {1..10000}; do builtin echo $i ; done > /dev/null

real	0m0.039s
user	0m0.034s
sys	0m0.005s
```

- `builtin echo` : builtin 명령인 `echo`를 사용.

딱히 지정하지 않고 사용하면 기본으로 builtin 명령을 사용하는 것으로 보인다.

```bash
$ time for i in {1..10000}; do echo $i ; done > /dev/null

real	0m0.035s
user	0m0.028s
sys	0m0.006s
```

>
외부 명령어는 실행될 때 새로운 프로세스로서 생성됩니다.
이때 OS가 필요한 메모리 영역을 확보하거나 프로세스 목록(프로세스 테이블)을 바꿔 쓰는 등 여러 가지 처리를 수행합니다.
한편, 내부 명령어는 배시 프로그램(C 코드) 안에 구현되어 있으므로,
배시가 내부 명령어를 호출하는 비용은 어떤 프로그램이 자신의 함수를 호출할 때 쓰는 비용과 같습니다.
이것은 프로세스 생성에 비해 매우 가벼운 처리입니다.
따라서 이 에에서는 내부 명령어의 호출이 더 빠르게 완료됩니다.
[^artof-100]

## 목록

다음은 `man builtin`으로 볼 수 있는 목록이다.

| Command             | External | csh(1) | sh(1) |
| ---                 | ---      | ---    | ---   |
| !                   | No       | No     | Yes   |
| %                   | No       | Yes    | No    |
| .                   | No       | No     | Yes   |
| :                   | No       | Yes    | Yes   |
| @                   | No       | Yes    | Yes   |
| [                   | Yes      | No     | Yes   |
| {                   | No       | No     | Yes   |
| }                   | No       | No     | Yes   |
| alias               | No**     | Yes    | Yes   |
| alloc               | No       | Yes    | No    |
| bg                  | No**     | Yes    | Yes   |
| bind                | No       | No     | Yes   |
| bindkey             | No       | Yes    | No    |
| break               | No       | Yes    | Yes   |
| breaksw             | No       | Yes    | No    |
| builtin             | No       | No     | Yes   |
| builtins            | No       | Yes    | No    |
| case                | No       | Yes    | Yes   |
| cd                  | No**     | Yes    | Yes   |
| chdir               | No       | Yes    | Yes   |
| command             | No**     | No     | Yes   |
| complete            | No       | Yes    | No    |
| continue            | No       | Yes    | Yes   |
| default             | No       | Yes    | No    |
| dirs                | No       | Yes    | No    |
| do                  | No       | No     | Yes   |
| done                | No       | No     | Yes   |
| [[/cmd/echo]]{echo} | Yes      | Yes    | Yes   |
| echotc              | No       | Yes    | No    |
| elif                | No       | No     | Yes   |
| else                | No       | Yes    | Yes   |
| end                 | No       | Yes    | No    |
| endif               | No       | Yes    | No    |
| endsw               | No       | Yes    | No    |
| esac                | No       | No     | Yes   |
| eval                | No       | Yes    | Yes   |
| exec                | No       | Yes    | Yes   |
| exit                | No       | Yes    | Yes   |
| export              | No       | No     | Yes   |
| false               | Yes      | No     | Yes   |
| [[/cmd/fc]]{fc}     | No**     | No     | Yes   |
| fg                  | No**     | Yes    | Yes   |
| filetest            | No       | Yes    | No    |
| fi                  | No       | No     | Yes   |
| for                 | No       | No     | Yes   |
| foreach             | No       | Yes    | No    |
| getopts             | No**     | No     | Yes   |
| glob                | No       | Yes    | No    |
| goto                | No       | Yes    | No    |
| hash                | No**     | No     | Yes   |
| hashstat            | No       | Yes    | No    |
| history             | No       | Yes    | No    |
| hup                 | No       | Yes    | No    |
| if                  | No       | Yes    | Yes   |
| jobid               | No       | No     | Yes   |
| jobs                | No**     | Yes    | Yes   |
| [[/cmd/kill]]{kill} | Yes      | Yes    | Yes   |
| limit               | No       | Yes    | No    |
| local               | No       | No     | Yes   |
| log                 | No       | Yes    | No    |
| login               | Yes      | Yes    | No    |
| logout              | No       | Yes    | No    |
| ls-F                | No       | Yes    | No    |
| nice                | Yes      | Yes    | No    |
| nohup               | Yes      | Yes    | No    |
| notify              | No       | Yes    | No    |
| onintr              | No       | Yes    | No    |
| popd                | No       | Yes    | No    |
| printenv            | Yes      | Yes    | No    |
| printf              | Yes      | No     | Yes   |
| pushd               | No       | Yes    | No    |
| pwd                 | Yes      | No     | Yes   |
| read                | No**     | No     | Yes   |
| readonly            | No       | No     | Yes   |
| rehash              | No       | Yes    | No    |
| repeat              | No       | Yes    | No    |
| return              | No       | No     | Yes   |
| sched               | No       | Yes    | No    |
| set                 | No       | Yes    | Yes   |
| setenv              | No       | Yes    | No    |
| settc               | No       | Yes    | No    |
| setty               | No       | Yes    | No    |
| setvar              | No       | No     | Yes   |
| shift               | No       | Yes    | Yes   |
| source              | No       | Yes    | No    |
| stop                | No       | Yes    | No    |
| suspend             | No       | Yes    | No    |
| switch              | No       | Yes    | No    |
| telltc              | No       | Yes    | No    |
| test                | Yes      | No     | Yes   |
| then                | No       | No     | Yes   |
| time                | Yes      | Yes    | No    |
| times               | No       | No     | Yes   |
| trap                | No       | No     | Yes   |
| true                | Yes      | No     | Yes   |
| type                | No**     | No     | Yes   |
| ulimit              | No**     | No     | Yes   |
| umask               | No**     | Yes    | Yes   |
| unalias             | No**     | Yes    | Yes   |
| uncomplete          | No       | Yes    | No    |
| unhash              | No       | Yes    | No    |
| unlimit             | No       | Yes    | No    |
| unset               | No       | Yes    | Yes   |
| unsetenv            | No       | Yes    | No    |
| until               | No       | No     | Yes   |
| wait                | No**     | Yes    | Yes   |
| where               | No       | Yes    | No    |
| which               | Yes      | Yes    | No    |
| while               | No       | Yes    | Yes   |

## 참고문헌

- 아트 오브 셸 원라이너 160제 - 우에다 류이치, 야마다 야스히로, 다시로 가쓰야, 나카무라 소이치, 이마이즈미 미쓰유키 저 외 2명 정보 더 보기/감추기 / 제이펍 / 1쇄 발행: 2023년 03월 13일 / 원제: 1日1問、半年以内に習得 シェル・ワンライナー160本ノック

## 주석

[^artof-100]: 아트 오브 셸 원라이너 160제. 챕터2. 100쪽.

