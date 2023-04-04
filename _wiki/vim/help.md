---
layout  : wiki
title   : vim help
summary : 
date    : 2022-02-26 00:38:03 +0900
updated : 2023-04-04 23:08:35 +0900
tag     : 
resource: 44/A86F86-A8DF-4EF0-8E32-7CA5B07F8E79
toc     : true
public  : true
parent  : [[/vim]]
latex   : false
---
* TOC
{:toc}

## Example

- `:help x`
    - Normal 모드에서의 `x`에 대한 도움말을 본다.
- `:help v_u`
    - Visual 모드에서의 `u`에 대한 도움말을 본다.
- `:help i_CTRL-R`
    - Insert 모드에서의 `CTRL-R`에 대한 도움말을 본다.
- `:help :wq`
    - 커맨드 라인의 `:wq`에 대한 도움말을 본다.
- `:help /.`
    - Vim 정규식의 `.`에 대한 도움말을 본다.
- `:help /\1`
    - Vim 정규식의 `\1`에 대한 도움말을 본다.
- `:help 'number'`
    - `'number'` 옵션에 대한 도움말을 본다.

## help 사용 팁 이것저것.

### help-summary 를 읽는다

```
:help help-summary
```

### 링크 타고 가기

- `Ctrl-]`: 현재 커서가 위치한 링크 문서를 연다.
    - 그냥 마우스로 더블 클릭을 해도 된다.
- `Ctrl-O`: 이전에 열었던 문서로 돌아간다. 쉽게 말하자면 뒤로 가기.

### Ctrl-D의 활용

검색어를 입력한 다음, `Ctrl-D` 를 입력하면 그 검색어와 관련된 모든 도움말을 보여준다. 그 상태에서 `Tab` 키를 누르면 해당 목록을 선택할 수 있다.

- 예) `:help number`를 입력하고 `Ctrl-D`를 눌러보자. 이후 `Tab` 키를 누르면 자동완성 목록이 나오고, 또 `Tab` 키를 누르면 다음 항목이 선택된다.

### 모드별로 검색 방법이 다르다

Insert 모드 명령은 `i_`를 앞에 붙여 검색하면 된다.

- `:help i_CTRL-W`
- `:help i_<Esc>`

Visual 모드 명령은 `v_`를 앞에 붙여 검색하면 된다.

- `:help v_iw`
- `:help v_$`

### helpgrep 으로 검색

`:helpgrep 주제`로 검색할 수 있다.

이후 다음 방법으로 다음/이전으로 이동할 수 있다.

- `:cnext`, `:cn`
- `:cprevious`, `:cp`


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

