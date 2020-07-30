---
layout  : wiki
title   : grep, egrep 명령어
summary : file pattern searcher
date    : 2018-08-31 13:01:17 +0900
updated : 2020-07-30 22:54:49 +0900
tag     : bash command grep ken-tompson alfred-aho brian-kernighan
toc     : true
public  : true
parent  : [[command-line]]
latex   : false
---
* TOC
{:toc}

## 역사

> grep은 켄 톰프슨이 처음 작성한 패턴 검색 프로그램이다.[^KER-4]

### grep 이름의 의미

> grep이라는 이름은 `ed` 텍스트 편집기의 명령어인 `g/re/p`에서 왔는데,
이 명령어는 `re`부분의 정규 표현식 패턴과 일치하는 모든 행을 출력한다.
이 내용은 옥스퍼드 영어 사전의 grep 표제어에도 정확히 나와 있다(옥스퍼드 영어 사전은 grep의 가치를 인정하고 정식 영어 단어로 등록했다).
[^KER-4]

### egrep

> 앨프리드 에이호는 `grep`을 확장해서 더 표현력이 풍부한 정규 표현식을 사용하게 하는 프로그램을 만들어 초기 유닉스에 기여했다.
예를 들면 `this|that` 같은 선택적 항목을 검색하는 기능을 지원했다.
앨프리드는 이 프로그램을 '확장된 grep'을 뜻하는 'egrep'이라고 불렀다.
>
> 여기서 egrep에 대해 좀 더 논할 필요가 있다.
egrep의 개발 비화에서 이론과 실제의 상호작용과 많은 양질의 소프트웨어 개발을 이끈 1127 센터 멤버들 간의 전형적인 상호작용을 잘 엿볼 수 있기 때문이다.
더글러스 매클로이의 이야기를 들어보자.
>
> "앨프리드 에이호의 첫 번째 egrep은 에이호가 존 홉크로프트(John Hopcroft), 제프리 울먼(Jeffrey Ullman)과 공동 저술한 'The Design and Analysis of Computer Algorithms'(Addison-Wesley, 1974)에 나오는 알고리즘을 있는 그대로 구현한 것이었지.
나는 신속히 그 코드를 달력 프로그램용으로 사용해봤네. 이 프로그램은 '오늘', '내일', '다음 근무일까지' 등 폭넓은 형식으로 표현된 날짜 패턴을 인식할 용도로 자동 생성된 방대한 정규 표현식을 이용했어.  
앨프리드의 기대화는 달리, 코드를 컴파일해서 바로 실행 가능한 인식기 프로그램을 만드는 데에는 30초 정도밖에 걸리지 않았다네.  
이후 앨프리드는 인식기를 전부 미리 만드는 대신 필요한 부분만 지연시켜서 생성하는 탁월한 전략을 생각해냈네.
덕분에 기하급수적으로 늘어나는 상태 중에서 아주 일부분만 만들어졌지.
이 전략은 엄청난 차이를 이끌어냈는데, 실제로 egrep은 다루는 패턴이 아무리 복잡하더라도 항상 빨리 실행됐어.
이처럼 egrep은 두드러질 정도로 눈부신 기술적 성과였는데, 기존 방식이 얼마나 성능이 낮았는지 알아야만 그 차이를 알 수 있었다네."
[^KER-4]

## syntax

```sh
grep [option] pattern [file]
```

## Examples

* 파일에서 내용 찾기

```sh
$ cat test.txt
foobar
foo
bar
baz
qux
quux
quuz
corge

$ # test.txt 파일에서 foo 문자열을 찾는다.
$ grep foo test.txt
foobar
foo
```

* `-v`, `--invert-match`: 일치하지 않는 대상을 찾는다.

```sh
$ grep -v foo test.txt
bar
baz
qux
quux
quuz
corge
```

* `-n`, `--line-number`: 검색 결과에 파일의 라인 넘버를 보여준다.

```sh
$ grep -n foo test.txt 
1:foobar
2:foo
```

* `-c`, `--count`: 검색 결과의 숫자를 센다.

```sh
$ grep -c foo test.txt 
2
```

* `-e`: 정규식 입력을 받는다.
    * `--regexp=pattern`: 긴 명령어는 이렇게 쓴다.

```sh
$ # 아래와 같이 or 검색을 하는 것도 가능하다
$ grep -e foo -e bar test.txt
foobar
foo
bar
```

## 참고문헌

- [KER] 유닉스의 탄생 / 브라이언 커니핸 저/하성창 역 / 한빛미디어 / 2020년 08월 03일 / 원서 : UNIX: A History and a Memoir

## 주석

[^KER-4]: [KER] 4장.

