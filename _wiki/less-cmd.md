---
layout  : wiki
title   : less 명령어
summary : less is more
date    : 2020-01-19 22:06:24 +0900
updated : 2020-04-18 13:47:07 +0900
tag     : bash command
toc     : true
public  : true
parent  : [[command-line]]
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

