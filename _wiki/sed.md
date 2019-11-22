---
layout  : wiki
title   : sed
summary : stream editor
date    : 2019-11-19 10:20:19 +0900
updated : 2019-11-21 17:43:53 +0900
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
```
