---
layout  : wiki
title   : sed
summary : stream editor
date    : 2019-11-19 10:20:19 +0900
updated : 2019-11-29 14:07:45 +0900
tag     : bash command
toc     : true
public  : true
parent  : [[command-line]]
latex   : false
---
* TOC
{:toc}

## Examples

### BSD(macOS)
```sh
 # 여러 파일에서 foo를 bar로 replace하고, orig라는 원본 파일을 남겨둔다
sed -i.orig s/foo/bar/g file1.txt file2.txt

 # 하위 경로에서 `if(`를 찾아 모두 `if (`로 바꿔준다
ag 'if\(' -l | xargs sed -i.orig 's/if\(/if /'

 # file1, file2에서 `if(`나 `for(`를 찾아 모두 `if (`, `for (`로 바꿔준다
sed -i.orig -E 's/(if|for)\(/\1 (/' file1 file2

 # 모든 java 파일에서 탭 문자를 찾아 2개의 스페이스로 교체한다
find . -name '*.java' | xargs ag '\t' -l | xargs sed -E -i.orig "s/[[:cntrl:]]/  /g"

 # 모든 package 단어 위에 공백 1줄을 추가한다
ag '\S\npackage' -l | xargs sed -i '' 's,package,\'$'\npackage,'

 # 패턴이 match된 라인에서만 replace 작업을 한다
echo -e '1\n2\n3' | sed -E '/2/ s/./999/'

 # 패턴이 match 되지 않은 라인에서만 replace 작업을 한다
echo -e '1\n2\n3' | sed -E '/2/! s/./999/'
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

### GNU SED
```sh
 # brew를 이용해 macOS에 설치할 수 있고, 이후 gsed로 사용하면 된다
brew install gnu-sed
```

