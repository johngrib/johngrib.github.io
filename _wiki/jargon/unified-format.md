---
layout  : wiki
title   : unified format
summary : 
date    : 2023-05-23 23:27:14 +0900
updated : 2023-05-23 23:34:57 +0900
tag     : 
resource: E7/55BB07-E081-4F79-BB35-11119B8F61C1
toc     : true
public  : true
parent  : [[/jargon]]
latex   : false
---
* TOC
{:toc}

## 인용: diffutils manual

>
2.2.2 Unified Format
>
The unified output format is a variation on the context format that is more compact because it omits redundant context lines.
To select this output format, use the --unified[=lines] (-U lines), or -u option.
The argument lines is the number of lines of context to show. When it is not given, it defaults to three.
>
In the early 1990s, only GNU diff could produce this format and only GNU patch could automatically apply diffs in this format.
For proper operation, patch typically needs at least three lines of context.

2.2.2 Unified Format

unified 출력 포맷은 context 포맷의 변형으로, 중복되는 context 라인을 생략하기 때문에 더 간결합니다.
이 출력 포맷을 선택하려면, `--unified[=lines]` (`-U lines`), 또는 `-u` 옵션을 사용하세요.
인자로 제공하는 `lines`는 보여줄 context 라인의 수입니다. 인자를 제공하지 않으면, 기본값은 `3`입니다.

1990년대 초반에는 GNU [[/cmd/diff]] 만이 이 포맷을 생성할 수 있었고, GNU patch 만이 이 포맷의 diff를 자동으로 적용할 수 있었습니다.
patch가 제대로 작동하려면 최소 3개의 context 라인이 필요합니다.

## unified format 예제

다음은 [2.2.2.1 An Example of Unified Format]( https://www.gnu.org/software/diffutils/manual/html_node/Example-Unified.html )의 내용을 인용한 것이다.

`git diff`가 unified format을 사용하므로 `git`에 익숙한 사람이라면 쉽게 이해할 수 있을 것이다.


```
--- lao	2002-02-21 23:30:39.942229878 -0800
+++ tzu	2002-02-21 23:30:50.442260588 -0800
@@ -1,7 +1,6 @@
-The Way that can be told of is not the eternal Way;
-The name that can be named is not the eternal name.
 The Nameless is the origin of Heaven and Earth;
-The Named is the mother of all things.
+The named is the mother of all things.
+
 Therefore let there always be non-being,
   so we may see their subtlety,
 And let there always be being,
@@ -9,3 +8,6 @@
 The two are the same,
 But after they are produced,
   they have different names.
+They both may be called deep and profound.
+Deeper and more profound,
+The door of all subtleties!
```

## 함께 읽기

- [[/cmd/diff]]

## 참고문헌

- [Unified Format (gnu.org)]( https://www.gnu.org/software/diffutils/manual/html_node/Unified-Format.html )
