---
layout  : wiki
title   : sed
summary : stream editor
date    : 2019-11-19 10:20:19 +0900
updated : 2020-07-30 23:18:11 +0900
tag     : bash command grep ed
toc     : true
public  : true
parent  : [[command-line]]
latex   : false
---
* TOC
{:toc}

리 맥마흔(Lee E. McMahon)이 개발한 스트림 에디터.

## 역사

> 리 맥마흔은 [[grep]]의 성공에 자극을 받았고,
파일에서 읽어 들인 텍스트에 대해 간단한 바꾸기 작업을 하는 유사 프로그램인 `gres`를 작성했다. `s`는 `ed` 편집기에서 바꾸기 명령어다.
리는 곧 프로그램을 더 일반화된 버전으로 대체했는데, 'Sed'(세드)라는 스트림 편집기다.
Sed는 텍스트가 입력 스트림으로 들어와서 출력 스트림으로 나가기 전까지 일련의 편집 명령어를 적용했다.
[[grep]]과 `gres`는 둘 다 Sed의 특별한 경우에 해당했다.
Sed가 사용하는 명령어는 표준 `ed` 텍스트 편집기에 있는 편집 명령어와 동일하다.
Sed는 요즘도 셸 스크립트에서 흔히 사용되는데, 데이터 스트림을 일정한 방식으로 변형할 때 사용된다.
문자를 교체하거나, 공백을 추가하거나, 원하지 않는 공백을 제거하거나, 불필요한 뭔가를 지우는 등의 용도로 쓰인다.
[^KER-5]


## Examples

### BSD(macOS)
```sh
 # 여러 파일에서 foo를 bar로 replace하고, orig라는 원본 파일을 남겨둔다
sed -i.orig s/foo/bar/g file1.txt file2.txt

 # file1, file2에서 `if(`나 `for(`를 찾아 모두 `if (`, `for (`로 바꿔준다
sed -i.orig -E 's/(if|for)\(/\1 (/' file1 file2

 # 패턴이 match된 라인에서만 replace 작업을 한다
echo -e '1\n2\n3' | sed -E '/2/ s/./999/'

 # 패턴이 match 되지 않은 라인에서만 replace 작업을 한다
echo -e '1\n2\n3' | sed -E '/2/! s/./999/'
```

#### 공백 문자 replace

- space 교체

```sh
 # 하위 경로에서 `if(`를 찾아 모두 `if (`로 바꿔준다
ag 'if\(' -l | xargs sed -i.orig 's/if\(/if /'
```

- tab 교체

```sh
 # 모든 java 파일에서 탭 문자를 찾아 2개의 스페이스로 교체한다
find . -name '*.java' | xargs ag '\t' -l | xargs sed -E -i.orig "s/[[:cntrl:]]/  /g"
```

- 개행 문자 삽입

```sh
 # 모든 package 단어 위에 공백 1줄을 추가한다
ag '\S\npackage' -l | xargs sed -i '' 's,package,\'$'\npackage,'
```

#### 실제 활용한 명령어들
```sh
 # ){ 를 모두 찾아 ) { 로 고쳐라
ag '\)\{' -l | xargs sed -i.orig 's/){/) {/'

 # 프로젝트 전체에서 for( 를 for ( 로 replace하고, .orig 백업 파일을 생성
ag 'for\(' -l | xargs sed -i.orig 's/for(/for (/'

 # 프로젝트 전체에서 if( 를 if ( 로 replace하고, .orig 백업 파일을 생성
ag 'if\(' -l | xargs sed -i.orig 's/if(/if (/'

 # 위의 두 가지를 동시에 한다
ag '(if|for)\(' -l | xargs sed -i.orig -E 's/(if|for)\(/\1 (/'

 # java 프로젝트 전체에서 tab 문자를 2개의 space로 replace
find . -name '*.java' | xargs ag '\t' -l | xargs sed -E -i.orig "s/[[:cntrl:]]/  /g"

 # 좌우에 스페이스가 없는 -> 를 찾아 스페이스를 추가하라
find . -name '*.java' | xargs ag '\-\>(?=\S)|(?<=\S)\-\>' -l \
    | xargs sed -i.orig -E "s,([^ ])->,\1 ->,; s,->([^ ]),-> \1,"

 # if(, for(, switch( 처럼 제어문과 괄호가 붙어 있는 코드를 찾아 스페이스 하나를 추가하라
ag '\b(if|for|switch|catch|while)\(' -l \
    | xargs sed -i.orig -E "s,(if|for|switch|catch|while)\(,\1 (,"

 # package 바로 윗줄에 공백 라인 하나를 추가하라
ag '\S\npackage' -l | xargs sed -i '' 's,package,\'$'\npackage,'

 # Pattern, Matcher 를 사용한 경우를 제외하고 + 연산자 좌우에 스페이스 하나를 추가하라
find . -name '*.java' | xargs ag '([^\s+i]\+|\+[^\s+)])' \
    | grep -v Pattern | cut -d: -f1 \
    | xargs sed -E -i '' "/Pattern|Matcher/! s/([^ ])\+([^ ])/\1 + \2/g"
```

##### 문제 해결

```sh
 # 모든 {} 을 찾아 사이에 개행 문자를 추가하라.
 # 단 새로 추가된 라인의 인덴트는 윗 줄과 같아야 한다.
ag '\{\}$' -l | xargs sed -E -i '' 's/^( *)(p.+){}/\1\2{\
\1}/'
```

명령 첫째 줄이 `\`로 끝나고, 이후 엔터 키를 입력해 개행 문자를 넣고, 다음 줄에서 명령이 끝난다는 점에 주목.

이 명령을 실행하면 다음과 같은 결과를 얻을 수 있다.

```java
// before
  public Code() {}

// after
  public Code() {
  }
```


### GNU SED
```sh
 # brew를 이용해 macOS에 설치할 수 있고, 이후 gsed로 사용하면 된다
brew install gnu-sed
```

## 참고문헌

- [KER] 유닉스의 탄생 / 브라이언 커니핸 저/하성창 역 / 한빛미디어 / 2020년 08월 03일 / 원서 : UNIX: A History and a Memoir

## 주석

[^KER-5]: [KER] 5장.

