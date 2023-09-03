---
layout  : wiki
title   : PCRE
summary : Perl-compatible regular expressions
date    : 2023-09-03 18:50:44 +0900
updated : 2023-09-03 22:44:48 +0900
tag     : 
resource: 61/C13454-6DB3-46AC-A1E1-8B17C4B19E97
toc     : true
public  : true
parent  : [[/regex]]
latex   : false
---
* TOC
{:toc}

## man

```bash
man 3 pcresyntax
```

## QUOTING

| `\Q...\E` | `\Q`와 `\E` 사이의 문자열을 메타문자로 해석하지 않음 |

특수문자가 많이 포함된 문자열을 검색하고자 할 때 유용하다.

[[/cmd/grep]]{GNU grep}에서 `-P` 옵션으로 사용할 수 있다. (BSD grep에서는 지원하지 않음)

```bash
 # 대괄호를 이스케이핑하지 않아도 되므로 편리하다
grep -P '\Q[[/cmd]]\E' -R
```


## CHARACTERS

| `\a`        | BEL 문자 (hex 07)                |
| `\cx`       | "control-x", x 는 ASCII 문자     |
| `\e`        | escape (hex 1B)                  |
| `\f`        | form feed (hex 0C)               |
| `\n`        | newline (hex 0A)                 |
| `\r`        | carriage return (hex 0D)         |
| `\t`        | tab (hex 09)                     |
| `\0dd`      | 8진수 표기 문자                  |
| `\ddd`      | 8진수 표기 문자 또는 백 레퍼런스 |
| `\o{ddd..}` | 8진수 표기 문자                  |
| `\xhh`      | 16진수 표기 문자                 |
| `\x{hhh..}` | 16진수 표기 문자                 |

```sql
-- sqlite
select 'a' REGEXP '\x{61}';
--> 1
```

## CHARACTER TYPES

| `.`      | newline을 제외한 모든 문자. dotall mode 에서는 모든 문자.                |
| `\C`     | one data unit, even in UTF mode (best avoided). (바이트 1개이므로 주의)  |
| `\d`     | 십진수 숫자. `[0-9]`.                                                    |
| `\D`     | `\d`의 반대                                                              |
| `\h`     | 수평 공백 문자. `[ \t]`.                                                 |
| `\H`     | `\h`의 반대                                                              |
| `\N`     | 개행문자가 아닌 문자. `[^\r\n]`                                          |
| `\R`     | a newline sequence. `\r\n`, `\n`, `\r` 등 플랫폼 상관없이 줄바꿈 문자열. |
| `\s`     | 모든 공백 문자. `[ \t\r\n\v\f]`.                                         |
| `\S`     | `\s`의 반대                                                              |
| `\v`     | 수직 탭 문자. `\v`                                                       |
| `\V`     | `\v`의 반대                                                              |
| `\w`     | a "word" character. `[a-zA-Z0-9_]`                                       |
| `\W`     | `\w`의 반대                                                              |
| `\X`     | a Unicode extended grapheme cluster                                      |
| `\p{xx}` | category property 문자 (다음 섹션 참고)                                  |
| `\P{xx}` | `\p{xx}`의 반대                                                          |

### GENERAL CATEGORY PROPERTIES

`\p`와 `\P`에서 사용한다.

| `C`  | Other                 |                    |
| `Cc` | Control               |                    |
| `Cf` | Format                |                    |
| `Cn` | Unassigned            |                    |
| `Co` | Private use           |                    |
| `Cs` | Surrogate             |                    |
| `L&` | Ll, Lu, or Lt         |                    |
| `L`  | Letter                |                    |
| `Ll` | Lower case letter     | `[a-z]`            |
| `Lm` | Modifier letter       |                    |
| `Lo` | Other letter          |                    |
| `Lt` | Title case letter     |                    |
| `Lu` | Upper case letter     | `[A-Z]`            |
| `M`  | Mark                  |                    |
| `Mc` | Spacing mark          |                    |
| `Me` | Enclosing mark        |                    |
| `Mn` | Non-spacing mark      |                    |
| `Nd` | Decimal number        | `[0-9]`            |
| `Nl` | Letter number         |                    |
| `No` | Other number          |                    |
| `P`  | Punctuation           | `.` `!` `?` `;`    |
| `Pc` | Connector punctuation |                    |
| `Pd` | Dash punctuation      |                    |
| `Pf` | Final punctuation     |                    |
| `Pi` | Initial punctuation   |                    |
| `Po` | Other punctuation     |                    |
| `S`  | Symbol                |                    |
| `Sk` | Modifier symbol       |                    |
| `So` | Other symbol          |                    |
| `Z`  | Separator             |                    |
| `Zl` | Line separator        |                    |
| `Zp` | Paragraph separator   |                    |
| `Zs` | Space separator       |                    |

| `Sm` | Mathematical symbol | `+` `=` `<` `>` 등 수학 기호 (키보드의 `-` 제외) |

```sql
-- sqlite
select '×±+−÷√∑∫∴¬∵~=≠≈≅⇔↔<>∀∃∪∩' REGEXP '\p{Sm}+';
--> 1
```


| `Sc` | Currency symbol | `$` `€` `£` 등 모든 화폐 기호 |

```sql
-- sqlite
select '$₩£€¥₽₹' REGEXP '\p{Sc}+';
--> 1
```

| `N` | Number | `1` `¼` `①` 등 모든 숫자 기호 |

```sql
-- sqlite
SELECT '1¼①' REGEXP '^\p{N}+$';
--> 1
```

| `Ps` | Open punctuation  | `(` `[` `{` 등 여는 괄호 (`<`는 제외) |
| `Pe` | Close punctuation | `)` `]` `}` 등 닫는 괄호 (`>`는 제외) |

```sql
-- sqlite
select '([{' REGEXP '\p{Ps}+';
--> 1

select '[a' REGEXP '\p{Ps}a';
--> 1
```

### PCRE SPECIAL CATEGORY PROPERTIES

`\p`와 `\P`에서 사용한다.

| `Xan` | Alphanumeric: union of properties L and N                                              |
| `Xps` | POSIX space: property Z or tab, NL, VT, FF, CR                                         |
| `Xsp` | Perl space: property Z or tab, NL, VT, FF, CR                                          |
| `Xuc` | Universally-named character: one that can be represented by a Universal Character Name |
| `Xwd` | Perl word: property Xan or underscore                                                  |

### CHARACTER CLASSES

| `[...]`       | positive character class               |
| `[^...]`      | negative character class               |
| `[x-y]`       | range (can be used for hex characters) |
| `\[[:xxx:]]`  | positive POSIX named set               |
| `\[[:^xxx:]]` | negative POSIX named set               |

#### POSIX NAMED SETS {#posix-named-sets}

POSIX named set은 다음과 같다.

| `alnum`  | alphanumeric                     |
| `alpha`  | alphabetic                       |
| `ascii`  | 0-127                            |
| `blank`  | space or tab                     |
| `cntrl`  | control character                |
| `digit`  | decimal digit                    |
| `graph`  | printing, excluding space        |
| `lower`  | lower case letter                |
| `print`  | printing, including space        |
| `punct`  | printing, excluding alphanumeric |
| `space`  | white space                      |
| `upper`  | upper case letter                |
| `word`   | same as `\w`                     |
| `xdigit` | hexadecimal digit                |

## QUANTIFIERS

수량자.

| `?`      | 0 or 1, greedy                         |
| `?+`     | 0 or 1, possessive                     |
| `??`     | 0 or 1, lazy                           |
| `*`      | 0 or more, greedy                      |
| `*+`     | 0 or more, possessive                  |
| `*?`     | 0 or more, lazy                        |
| `+`      | 1 or more, greedy                      |
| `++`     | 1 or more, possessive                  |
| `+?`     | 1 or more, lazy                        |
| `{n}`    | exactly n                              |
| `{n,m}`  | at least n, no more than m, greedy     |
| `{n,m}+` | at least n, no more than m, possessive |
| `{n,m}?` | at least n, no more than m, lazy       |
| `{n,}`   | n or more, greedy                      |
| `{n,}+`  | n or more, possessive                  |
| `{n,}?`  | n or more, lazy                        |

## ANCHORS AND SIMPLE ASSERTIONS

| `\b` | word boundary                                                                                                 |
| `\B` | not a word boundary                                                                                           |
| `^`  | start of subject also after internal newline in multiline mode                                                |
| `\A` | start of subject                                                                                              |
| `$`  | end of subject<br/> also before newline at end of subject<br/> also before internal newline in multiline mode |
| `\Z` | end of subject<br/> also before newline at end of subject                                                     |
| `\z` | end of subject                                                                                                |
| `\G` | first matching position in subject                                                                            |

## MATCH POINT RESET

| `\K` | reset start of match |

`\K` 는 positive assertion에서는 작동하지만, negative assertion에서는 무시된다.

## ALTERNATION

`expr|expr|expr...`

`|`를 사용해 구분한다.

## CAPTURING

| `(...)`         | capturing group                                                                   |
| `(?<name>...)`  | named capturing group (Perl)                                                      |
| `(?'name'...)`  | named capturing group (Perl)                                                      |
| `(?P<name>...)` | named capturing group (Python)                                                    |
| `(?:...)`       | non-capturing group                                                               |
| `(?|...)`       | non-capturing group; reset group numbers for capturing groups in each alternative |

## ATOMIC GROUPS

| `(?>...)` | atomic, non-capturing group |

## COMMENT

| `(?#....)` | comment (not nestable) |

## TODO: OPTION SETTING

## TODO: NEWLINE CONVENTION

## TODO: WHAT `\R` MATCHES

## LOOKAHEAD AND LOOKBEHIND ASSERTIONS

| `(?=...)`  | positive look ahead  |
| `(?!...)`  | negative look ahead  |
| `(?<=...)` | positive look behind |
| `(?<!...)` | negative look behind |

주의: 각각의 look behind의 최상위 branch는 고정된 길이여야 한다.

## BACKREFERENCES

| `\n`        | reference by number (can be ambiguous) |
| `\gn`       | reference by number                    |
| `\g{n}`     | reference by number                    |
| `\g{-n}`    | relative reference by number           |
| `\k<name>`  | reference by name (Perl)               |
| `\k'name'`  | reference by name (Perl)               |
| `\g{name}`  | reference by name (Perl)               |
| `\k{name}`  | reference by name (.NET)               |
| `(?P=name)` | reference by name (Python)             |

## TODO: SUBROUTINE REFERENCES (POSSIBLY RECURSIVE)

## TODO: CONDITIONAL PATTERNS

## TODO: BACKTRACKING CONTROL

## TODO: CALLOUTS

## 참고문헌

- `man 3 pcresyntax` - PCRE 8.35, 2014-01-08 버전.
- [Perl Compatible Regular Expressions (PCRE) Documentation (mariadb.com)]( https://mariadb.com/kb/en/pcre/ )

