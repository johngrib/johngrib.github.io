---
layout  : wiki
title   : sed
summary : stream editor
date    : 2019-11-19 10:20:19 +0900
updated : 2019-11-19 22:15:21 +0900
tag     : bash command
toc     : true
public  : true
parent  : [[command-line]]
latex   : false
---
* TOC
{:toc}

## Examples

```sh
 # 여러 파일에서 foo를 bar로 replace하고, orig라는 원본 파일을 남겨둔다
sed -i.orig s/foo/bar/g file1.txt file2.txt
```
