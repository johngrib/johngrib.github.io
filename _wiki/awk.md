---
layout  : wiki
title   : awk
summary : pattern-directed scanning and processing language
date    : 2019-01-23 11:18:43 +0900
updated : 2020-07-30 23:19:56 +0900
tag     : command 언어 brian-kernighan awk
toc     : true
public  : true
parent  : [[programming-language]]
latex   : false
---
* TOC
{:toc}

## 기원

- 알프레드 에이호(Alfred Vaino Aho), 피터 와인버거(Peter Jay Weinberger), 브라이언 커니핸(Brian Wilson Kernighan)이 만들었다.

다음은 브라이언 커니핸의 글이다.

> 나는 숫자와 텍스트를 똑같이 잘 처리할 수 있는 도구에 관심이 있었다.
grep이나 Sed 둘 다 숫자형 데이터를 처리하거나 산술연산을 할 수는 없었고, grep은 여러 행으로 된 텍스트를 검색할 수 없었다.
그런 작업을 처리하려면 여전히 C 프로그램이 필요했다.
그래서 나는 어떻게든 일반화할 방안을 찾고 있었다.
그때 앨프리드 에이호는 grep이 지원하는 것보다 더 풍부한 종류의 정규 표현식을 가지고 시험하다가 egrep(확장된 grep)을 작성했다.
마지막으로, 얼마 후 1127 센터로 전입해서 앨프리드와 내 중간 사무실로 이사 온 피터 와인버거는 데이터베이스에 관심이 있었다.
>
> 1997년 가을 우리 셋은 이 아이디어들을 어떻게 결합할지 논의했는데,
IBM에서 만든 강력하지만 난해한 보고서 프로그램 생성기인 RPG에서 일부 영감을 받고 (다음 장에 설명할) 마크 로카인드의 깔끔한 아이디어에서도 영향을 받았다.
결국 우리는 Awk라는 언어를 설계했다.
Awk 언어 자체에 관해 설명한 문서에서도 이야기했지만, 개발자의 이름을 따서(Aho, Weinberger, Kernighan) 언어 이름을 지은 것은 어느 정도 상상력이 부족함을 나타낸다.
지금은 우리가 'awkward'와 연관된 어원에 대해 생각했었는지, Awk라는 이름이 냉소적인 어감을 줘서 어울린다고 생각했는지 잘 기억이 나지 않지만,
어쨌든 그 이름으로 굳어졌다.
피터는 Awk의 첫 번째 버전을 아주 빨리, 겨우 며칠 만에 Yacc, Lex와 앨프리드의 egrep 정규 표현식 코드를 이용해서 작성했다.
>
> Awk 프로그램은 일련의 패턴과 동작으로 구성된다.
프로그램은 입력의 각 행을 각 패턴에 대해 검사하고, 입력이 패턴과 일치하면 그 패턴에 해당하는 동작을 수행한다.
패턴은 정규 표현식이거나, 숫자형이나 문자열을 포함한 관계식이 될 수 있다.
동작은 C 문법을 변형한 형태로 작성된다.
패턴이 생략되면 입력의 모든 행과 일치하게 되고, 동작이 생략되면 패턴과 일치하는 행을 출력한다.
[^KER-5-209]

## Examples

```sh
awk '/search_pattern/ { action; }' file
```

### 80자보다 긴 모든 행을 출력하기
```sh
awk 'length > 80' test.txt
```

### 필드 구분자 지정하기
```sh
$ awk -F':' '{ print $1 }' /etc/passwd  # 구분자를 : 로 지정
$ awk -F'/' '{ print $1 }' /etc/passwd  # 구분자를 / 로 지정
```

### sum 구하기
```sh
$ awk '{s+=$1} END {print s}' test.txt  # ' 를 "로 쓰지 않도록 주의한다
```

### 마지막 필드 출력하기
```sh
$ awk '{print $NF}'
```

### 중복된 라인 제거하기
```sh
$ awk '!strmap[$0]++' test.txt
```
* uniq는 인접한 중복 값들만 제거하지만, 이 방법을 쓰면 파일 전체에서 중복 값을 제거한다.

### 대소문자 변환
```sh
$ echo 'ASDF' | awk '{print tolower($0)}'
$ echo 'asdf' | awk '{print toupper($0)}'
```

### 행 번호의 사용
#### 각 행에 행 번호를 붙여주기
```sh
awk '{print NR, $0}' test.txt
```

#### 홀짝 라인을 조인하기
```sh
 # exam 함수에서도 사용한 방법이다
awk 'NR%2==0 {print p","$0;} NR%2 {p=$0;}' test.txt
```

만약 test.txt 파일의 내용이 다음과 같다면...

```
1
2
3
4
5
```

다음과 같이 출력된다.

```
1,2
3,4
```

### 파일의 모든 단어 수 세기

```sh
 # 파일을 읽고 각 단어가 나타나는 횟수를 세고, 전체 단어와 각각의 횟수를 출력한다
awk '{ for (i=1; i <= NF; i++) wd[$i]++ } END { for (w in wd) print w, wd[w] }' test.txt
```

## 함께 읽기
* [[vim-update-book-progress]]

## 참고문헌

- [KER] 유닉스의 탄생 / 브라이언 커니핸 저/하성창 역 / 한빛미디어 / 2020년 08월 03일 / 원서 : UNIX: A History and a Memoir
- [How To Use awk In Bash Scripting](https://www.cyberciti.biz/faq/bash-scripting-using-awk/ )

## 주석

[^KER-5-209]: [KER] 5장. 209쪽.

