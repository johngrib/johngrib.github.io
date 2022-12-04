---
layout  : wiki
title   : vim help
summary : 
date    : 2022-02-26 00:38:03 +0900
updated : 2022-06-18 21:50:40 +0900
tag     : 
resource: 44/A86F86-A8DF-4EF0-8E32-7CA5B07F8E79
toc     : true
public  : true
parent  : [[/vim]]
latex   : false
---
* TOC
{:toc}

## 문제 해결

### 플러그인 help 문서를 찾지 못하는 경우

설치한 플러그인의 help 문서를 찾지 못하는 경우가 있다.

예를 들어 vimwiki라면 `:help vimwiki`를 입력했을 때 다음과 같은 에러 메시지가 출력되는 경우를 말한다.

```
E149: Sorry, no help for vimwiki
```

이럴 땐 helptag가 아직 생성되지 않은 것이 문제의 원인일 수 있다. `:helptags`를 생성해 주면 해결될 수 있다.

```
:helptags ALL
```

이렇게 하는 것도 괜찮다.

```
:helptags $VIMRUNTIME/doc
```

문제 해결과 별개로, [vim에는 `E149` 에러에 대한 한국어 설명도 포함](https://github.com/vim/vim/blob/113cb513f76d8866cbb6dc85fa18aded753e01da/src/po/ko.UTF-8.po#L1203-L1205 )되어 있다.

```sh
#, c-format
msgid "E149: Sorry, no help for %s"
msgstr "E149: 미안합니다, %s에 대한 도움말이 없습니다"
```

이 파일은 다양한 vim 에러 메시지를 읽어볼 수 있어, vim의 다양한 에러 상황에 대해 파악하기 좋다.

