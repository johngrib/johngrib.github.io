---
layout  : wiki
title   : less 명령어
summary : less is more
date    : 2020-01-19 22:06:24 +0900
updated : 2023-07-27 22:55:52 +0900
tag     : bash command
resource: 77/4C3318-288A-4C7A-B3B2-3EE94A79FA4D
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

```sh
 # 파일을 읽어 출력하고 pager를 제공한다
less test.txt
cat test.txt

 # ANSI 컬러 호환
less -R test.txt
glow test.txt -s dark | less -R

 # 라인 넘버를 함께 출력한다
less -N test.txt

 # less가 종료되어도 화면이 clear되지 않게 한다
less -X test.txt

 # less 내에서 / 로 검색을 할 때 대소문자를 구분하지 않는다
less -I test.txt

 # less 내에서 현재 보고 있는 페이지가 전체 페이지의 몇 %인지 보여준다
less -M test.txt
```

### man과 함께 사용 {#man}

나는 [[/cmd/man]]를 사용할 때 다음과 같은 셸 스크립트나 함수를 사용한다.

```bash
function mann() {
    # 라인 넘버 출력, 현재 페이지 위치 출력, 검색시 대소문자 구분 안함, ANSI 컬러 표현 지원
    (export LESS='-NMIR'; man $1 $2;)
}
```

## less의 단축키
대부분 vim과 비슷한 키 바인딩이라 외울 필요가 없다.

| 단축키                | 설명                           |
|-----------------------|--------------------------------|
| `↓`, `j`, `e` `Enter` | 한 줄 아래로 스크롤            |
| `↑`, `k`, `y`         | 한 줄 위로 스크롤              |
| `f`, `space`          | page down                      |
| `b`                   | page up                        |
| `/`, `?`              | 검색, 역방향 검색              |
| `n`, `N`              | 다음 검색 결과, 이전 검색 결과 |
| `g`                   | 첫째 라인으로 이동             |
| `42g`                 | 42번 라인으로 이동             |
| `G`                   | 마지막 라인으로 이동           |
| `25p`                 | 25% 지점으로 이동              |
| `h`                   | 도움말을 본다                  |
| `q`                   | less 종료                      |

### Mark 사용

vim 과 똑같은 방법으로 mark 를 지정해 사용할 수 있다.

```
m<letter>  Mark the current position with <letter>.
'<letter>  Go to a previously marked position.
''         Go to the previous position.
```

## 라인 넘버 보이게 하기

`.bashrc`에 다음과 같이 `export`를 사용해 두면 `less`를 실행할 때 라인 넘버가 보이게 된다.

```sh
export LESS='-N'
```

만약 이미 `less`가 실행중인 상태라면 `-N` 을 입력해서 라인 넘버를 토글할 수 있다.
