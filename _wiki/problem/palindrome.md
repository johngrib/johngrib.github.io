---
layout  : wiki
title   : 회문
summary : Palindrome
date    : 2023-06-24 19:46:56 +0900
updated : 2023-06-24 23:06:59 +0900
tag     : 
resource: A5/850662-962A-4711-9FE9-B249C8806AB5
toc     : true
public  : true
parent  : [[/problem]]
latex   : false
---
* TOC
{:toc}

![]( /resource/A5/850662-962A-4711-9FE9-B249C8806AB5/szkptmsvk38a1.jpg )
{:style="max-width:450px"}
[^brain-meme]

## Examples

### Clojure

```clojure
(defn palindrome? [s]
  (= (seq s) (reverse s)))

(comment
  (palindrome? "raceca")
  (palindrome? "madam")
  (palindrome? "소주만병만주소")
  ;;
  )
```

### bash

```
$ read -p "Enter a string: " str; reversedStr=$(echo "$str" | rev); [ "$str" == "$reversedStr" ] && echo "Palindrome" || echo "Not Palindrome"

Enter a string: 111
Palindrome
```

### perl one-line

```
$ perl -ne 'chomp; $rev = reverse $_; print($_ eq $rev ? "Palindrome" : "Not Palindrome"); print("\n");'

123
Not Palindrome
321
Not Palindrome
222
Palindrome
2242
Not Palindrome
22422
Palindrome
```

## 주석
[^brain-meme]: 이미지 출처는 [reddit.com](https://www.reddit.com/r/dankmemes/comments/zuzbk6/title_eltit/?utm_source=share&utm_medium=web2x&context=3 )

