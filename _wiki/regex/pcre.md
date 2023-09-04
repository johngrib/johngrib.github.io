---
layout  : wiki
title   : PCRE
summary : Perl-compatible regular expressions
date    : 2023-09-03 18:50:44 +0900
updated : 2023-09-04 22:08:42 +0900
tag     : 
resource: 61/C13454-6DB3-46AC-A1E1-8B17C4B19E97
toc     : true
public  : true
parent  : [[/regex]]
latex   : false
---
* TOC
{:toc}

## 일러두기

이 문서에서는 PCRE 실제 사례 예제를 위해 다음을 사용한다.

- [[/cmd/grep]]{GNU grep}의 `-P` 옵션
- [[/database/sqlite]]의 `REGEXP`

SQLite의 `REGEXP`는 다른 DB에서는 다른 문법으로 지원한다.

예를 들어 [MariaDB에서는 `RLIKE`를 사용한다]( https://mariadb.com/kb/en/pcre/ ).


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

```sql
select '[[/cmd]]' REGEXP '\Q[[/cmd]]\E';
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

```bash
echo 'a' | ggrep -Po '\x{61}'
```

```sql
select 'a' REGEXP '\x{61}';
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

### SCRIPT NAMES

국가/언어별 문자셋으로, `\p`와 `\P`에서 사용한다.

다음 언어들을 지원한다.

>
Arabic, Armenian, Avestan, Balinese, Bamum, Bassa_Vah, Batak, Bengali, Bopomofo, Brahmi, Braille, Buginese,
Buhid, Canadian_Aboriginal, Carian, Caucasian_Albanian, Chakma, Cham, Cherokee, Common, Coptic, Cuneiform,
Cypriot, Cyrillic, Deseret, Devanagari, Duployan, Egyptian_Hieroglyphs, Elbasan, Ethiopic, Georgian, Glagolitic,
Gothic, Grantha, Greek, Gujarati, Gurmukhi, Han, Hangul, Hanunoo, Hebrew, Hiragana, Imperial_Aramaic, Inherited,
Inscriptional_Pahlavi, Inscriptional_Parthian, Javanese, Kaithi, Kannada, Katakana, Kayah_Li, Kharoshthi, Khmer,
Khojki, Khudawadi, Lao, Latin, Lepcha, Limbu, Linear_A, Linear_B, Lisu, Lycian, Lydian, Mahajani, Malayalam,
Mandaic, Manichaean, Meetei_Mayek, Mende_Kikakui, Meroitic_Cursive, Meroitic_Hieroglyphs, Miao, Modi, Mongolian,
Mro, Myanmar, Nabataean, New_Tai_Lue, Nko, Ogham, Ol_Chiki, Old_Italic, Old_North_Arabian, Old_Permic,
Old_Persian, Old_South_Arabian, Old_Turkic, Oriya, Osmanya, Pahawh_Hmong, Palmyrene, Pau_Cin_Hau, Phags_Pa,
Phoenician, Psalter_Pahlavi, Rejang, Runic, Samaritan, Saurashtra, Sharada, Shavian, Siddham, Sinhala,
Sora_Sompeng, Sundanese, Syloti_Nagri, Syriac, Tagalog, Tagbanwa, Tai_Le, Tai_Tham, Tai_Viet, Takri, Tamil,
Telugu, Thaana, Thai, Tibetan, Tifinagh, Tirhuta, Ugaritic, Vai, Warang_Citi, Yi.

```bash
$ echo 'ΣΦΩ' | ggrep -P '^\p{Greek}+$';
ΣΦΩ

$ echo '가나다' | ggrep -P '^\p{Hangul}+$';
가나다

$ echo '語' | ggrep -P '^\p{Han}+$';
語

$ echo 'ア' | ggrep -P '^\p{Katakana}+$';
ア

$ echo 'あお' | ggrep -P '^\p{Hiragana}+$';
あお
```

- script names는 sqlite에서는 지원하지 않는다.

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

| `?`      | 0 ~ 1, greedy      |
| `?+`     | 0 ~ 1, possessive  |
| `??`     | 0 ~ 1, lazy        |
| `*`      | 0 이상, greedy     |
| `*+`     | 0 이상, possessive |
| `*?`     | 0 이상, lazy       |
| `+`      | 1 이상, greedy     |
| `++`     | 1 이상, possessive |
| `+?`     | 1 이상, lazy       |
| `{n}`    | n 번               |
| `{n,m}`  | n ~ m, greedy      |
| `{n,m}+` | n ~ m, possessive  |
| `{n,m}?` | n ~ m, lazy        |
| `{n,}`   | n 이상, greedy     |
| `{n,}+`  | n 이상, possessive |
| `{n,}?`  | n 이상, lazy       |

### Greedy

- greedy는 가능한 한 많이 매칭한다.
- `?` `*` `+`를 그대로 쓰면 greedy이다.

```bash
$ # greedy
$ echo abcabcabc | ggrep -P 'a.*c'
abcabcabc
```

### Possessive

- possessive는 가능한 한 많이 매칭하되, backtracking을 하지 않는다.
- `?+` `*+` `++`처럼 뒤에 `+`를 붙이면 possessive이다.

possessive는 이해하기 꽤 어려울 수 있다.

```bash
$ # possessive
$ echo XXXXZ | ggrep -P 'X++[A-Z]+'
XXXXZ
```

- 매치 성공!
    - `XXXX`를 `X++`와 모두 매치시키고 나서,
    - 마지막 `Z`가 `[A-Z]+`와 매치 성공.

```bash
$ # possessive
$ echo XXXXX | ggrep -P 'X++[A-Z]+'

```

- 매치 실패
    - `XXXXX` 를 `X++`와 모두 매치시키고 나서,
    - `[A-Z]+`를 매치시킬 문자가 남아있지 않음.

백트래킹이 되는 greedy와 비교해보자.

```bash
$ # greedy
$ echo XXXXX | ggrep -P 'X+[A-Z]+'
XXXXX
```

- 매치 성공!
    - `XXXXX` 를 `X+`와 모두 매치시키고 나서,
    - 마지막 `[A-Z]+` 와 매치시키기 위해 백트랙(한 글자 왼쪽으로 돌아감),
    - 마지막 `X`가 `[A-Z]+`와 매치 성공.

#### grep의 오작동

GNU grep을 쓰면 다음과 같은 케이스에서 오작동한다.

```bash
$ echo YYXXratsXX | ggrep -Po '([XY]++)rats\1'
XXratsXX
```

`[XY]++`가 `YYXX`와 매치되기 때문에 `\1`에 `XXYY`가 있어야 전체가 매치되는데, 결과를 보면 `XXratsXX`가 매치되어 있다.

### Lazy

- lazy는 가능한 한 적게 매칭한다.
    - `??` `*?` `+?` `??`처럼 뒤에 `?`를 붙이면 lazy이다.

```bash
$ echo "abcabc" | ggrep -Po '^a.*?c'
abc
```

- 왼쪽의 `abc`가 매치되고, 오른쪽의 `abc`는 매치되지 않았다.


## ANCHORS AND SIMPLE ASSERTIONS

| `\b` | word 경계                                                          |
| `\B` | `\b`와 반대                                                        |
| `^`  | 문자열의 시작지점. multiline 모드에서는 각 행의 시작.              |
| `\A` | 문자열의 (절대적) 시작지점.                                        |
| `$`  | 문자열의 종료지점. multiline 모드에서는 각 행의 마지막.            |
| `\Z` | 문자열의 (절대적) 종료지점. 또는 절대적 종료지점 개행문자 바로 앞. |
| `\z` | 문자열의 (절대적) 종료지점.                                        |
| `\G` | first matching position in subject                                 |

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

- [List of Possessive Quantifiers (chortle.ccsu.edu)]( https://chortle.ccsu.edu/finiteautomata/Section09/sect09_22.html ) - grep의 오작동 관련.
- [Perl Compatible Regular Expressions (PCRE) Documentation (mariadb.com)]( https://mariadb.com/kb/en/pcre/ )
- [Possessive Quantifiers (chortle.ccsu.edu)]( https://chortle.ccsu.edu/finiteautomata/Section09/sect09_21.html ) - possessive 예제 참고.
- `man 3 pcresyntax` - PCRE 8.35, 2014-01-08 버전.

