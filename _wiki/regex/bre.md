---
layout  : wiki
title   : BRE
summary : Basic Regular Expression
date    : 2023-09-03 18:50:22 +0900
updated : 2023-09-03 19:38:12 +0900
tag     : 
resource: 3C/ED3712-3FEE-485E-B7EC-ED287B686A7E
toc     : true
public  : true
parent  : [[/regex]]
latex   : false
---
* TOC
{:toc}

## BRE 와 ERE의 비교

ERE와 달리 BRE에서는 `?`, `+`, `{`, `}`, `|`, `()` 를 사용하려면 앞에 `\`를 붙여야 한다.

## `.`

개행 문자를 포함해 모든 문자와 매치.

## Bracket Expression

| `[abc]`        | a, b, c 중 하나             |
| `[a-d]`        | a, b, c, d 중 하나          |
| `[aBbCcDd]`    | a, B, b, C, c, D, d 중 하나 |
| `[0123456789]` | 0 ~ 9 중 하나               |
| `[0-9]`        | 0 ~ 9 중 하나               |

### POSIX 문자 클래스

[[/cmd/bash/expansion#posix-character-classes]] 참고.

## 앵커

| `^`  | 행 시작 지점       |
| `$`  | 행 끝나는 지점     |

## Backslash 문자

| `\<`, `\>` | 단어 경계(시작과 끝)                         |
| `\b`       | 단어 경계                                    |
| `\B`       | `\b`의 여집합                                |
| `\w`       | `_`를 포함한 `[:alnum:]`. 즉 `[_A-Za-z0-9]`. |
| `\W`       | `\w`의 여집합                                |
| `\n`       | 개행문자                                     |

## 반복

| `*`       | 패턴을 0회 이상 반복 |
| `\+`      | 패턴을 1회 이상 반복 |
| `\?`      | 0 또는 1회           |
| `\{n\}`   | n회 반복             |
| `\{n,\}`  | n회 이상 반복        |
| `\{n,m\}` | n~m회 반복           |

## Alternation과 Grouping

| `\|`        | or     |
| `\(regex\)` | 그룹화 |

## Back Reference

| `\i` | i번째 그룹에 매칭된 문자열 |

[[/cmd/sed]] 등에서 자주 사용한다. 여는 괄호 기준으로 번호를 매기면 된다.


## 참고문헌

- [5.3 Overview of basic regular expression syntax (www.gnu.org)]( https://www.gnu.org/software/sed/manual/html_node/BRE-syntax.html ) - GNU [[/cmd/sed]]의 BRE 매뉴얼

