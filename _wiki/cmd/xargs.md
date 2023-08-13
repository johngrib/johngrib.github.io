---
layout  : wiki
title   : xargs 명령어
summary : args 리스트를 구성해 명령어를 실행해준다
date    : 2023-08-13 21:10:36 +0900
updated : 2023-08-13 21:41:14 +0900
tag     : 
resource: 2F/4F39CD-03C6-43B0-8A9F-B83C0E42F6AB
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

`xargs`의 기본 동작은 표준 입력을 읽어 명령어의 인자로 전달하는 것이다.

```bash
$ echo 11 22 33 | xargs printf "[%d] _%d_ <%d>\n"
[11] _22_ <33>
```

```bash
$ echo 11 22 33 | xargs mkdir

$ ls -d */
11/  22/  33/
```

### -I : placeholder 지정 {#option-i}

`-I` 옵션을 사용하면 인자 치환 위치를 지정할 수 있다.

```bash
 # 30일 이상된 파일을 모두 찾아 .backup 확장자를 붙인 백업 파일을 만든다.
find . -type f -mtime +30 | xargs -I {} cp {} {}.backup
```

위의 명령에서 `-I {}`는 placeholder로 `{}`를 사용하겠다고 선언하는 것이다.

반드시 `{}`를 사용해야 하는 것은 아니고, 다른 것을 사용해도 된다.
그러나 일반적으로 `{}`를 주로 사용한다.

```bash
 # placeholder를 [] 로 지정
find . -type f -mtime +30 | xargs -I [] cp [] [].backup

 # placeholder를 ABC 로 지정
find . -type f -mtime +30 | xargs -I ABC cp ABC ABC.backup
```

### -p : 각 명령에 대해 실행할 것인지 질문한다 {#option-p}

`-p` 옵션을 사용하면 각 명령에 대해 실행할 것인지 질문한다. `y`로 대답하면 실행한다.

```bash
$ find . -type f -mtime +30 | xargs -p -I {} cp {} {}.backup
cp ./a ./a.backup?...y    # a.backup 파일 복사에 y로 대답
cp ./b ./b.backup?...n    # b.backup 파일 복사에 n으로 대답
```

### -P : Parallel 모드 {#option-pp}

`-P` 옵션을 사용하면 최대 몇 개의 프로세스를 사용할 수 있는지를 지정할 수 있다.

```bash
 # 최대 3개의 프로세스를 생성해 병렬로 실행한다
find . -type f -mtime +30 | xargs -P 3 -I {} cp {} {}.backup
```

`-P 0` 으로 지정해주면 가용 가능한 최대 프로세스 수를 사용한다.

