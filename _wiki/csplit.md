---
layout  : wiki
title   : csplit 명령어
summary : 주어진 조건에 따라 파일을 분할한다
date    : 2018-09-28 08:07:39 +0900
updated : 2018-09-28 08:16:20 +0900
tag     : bash command
toc     : true
public  : true
parent  : command-line
latex   : false
---
* TOC
{:toc}

# 사용 예

다음과 같은 파일이 있다고 하자.

```sh
$ cat test.txt 
111
222
333
444
555
666
```

다음 명령으로 파일을 두 개로 분할할 수 있다.

```sh
$ csplit test.txt 3

$ cat xx00
111
222

$ cat xx01
333
444
555
666
```

분할된 파일은 자동으로 `xx00`, `xx01`, `xx02`.. 와 같이 `xx\d\d` 형식의 이름으로 지정되어 저장된다.

`csplit`의 옵션을 사용하면 정규식을 기준으로 분할하는 것도 가능하지만,
`csplit`의 정규식 옵션을 기억하는 것이 귀찮다면 다음과 같이 해도 잘 작동한다.

```sh
$ csplit test.txt $(cat test.txt | grep -n -e '333' | cut -d ':' -f 1)
```


# Links

* [csplit 명령 (ibm.com)](https://www.ibm.com/support/knowledgecenter/ko/ssw_aix_72/com.ibm.aix.cmds1/csplit.htm )

