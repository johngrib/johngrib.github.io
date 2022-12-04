---
layout  : wiki
title   : bat 명령어
summary : A cat clone with syntax highlighting and Git integration
date    : 2019-11-16 10:42:54 +0900
updated : 2022-06-19 14:18:40 +0900
tag     : bash command
resource: 5A/DD05C6-8C09-49FB-B38F-916A7769C892
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

### 언어 지정

```bash
 # 지원 가능한 모든 언어의 목록 보기
bat --list-languages

 # 언어 지정
bat -l json test.json
bat -l markdown test.md
bat --language markdown test.md
```

### 강조

```bash
 # 4~11번 라인에 강조 표시
bat -H 4:11 recent.html
bat --highlight-line 4:11 recent.html

 # 4번 라인부터 마지막 라인까지 강조 표시
bat -H 4: recent.html

 # 첫 라인부터 7번 라인가지 강조 표시
bat -H :7 recent.html
```

### 보여주기 스타일

```bash
 # 라인 넘버 외의 다른 보여주기용 장식은 전부 생략하고 보여준다
     # 참고: -n, --number는 --style=numbers의 alias.
bat -n bat.md
bat --number bat.md
bat --style=numbers bat.md
```

