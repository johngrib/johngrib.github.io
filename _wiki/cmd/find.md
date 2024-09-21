---
layout  : wiki
title   : find
summary : walk a file hierarchy
date    : 2019-01-13 17:52:34 +0900
updated : 2024-09-21 23:12:31 +0900
tag     : bash command
resource: 4F/D2AFEF-7A65-4637-82FF-86AEAE03D596
toc     : true
public  : true
parent  : [[/cmd]]
latex   : true
---
* TOC
{:toc}

## 자주 쓰는 찾기 패턴 {#basics}

```sh
 # 현재 디렉토리와 그 하위 디렉토리 전체에서 이름이 "README.md"인 파일을 찾는다.
find . -name 'README.md'

 # -iname 은 대소문자를 구분하지 않는다.
find . -iname 'readme.md'

 # 현재 디렉토리와 그 하위 디렉토리 전체에서 이름에 "test"가 들어가는 파일을 찾는다.
find . -name '*test*'

 # 디스크 전체를 뒤져 파일을 찾는다. 에러는 무시한다.
find / -name 'lostfile.txt' 2>/dev/null

 # 사이즈가 1mb 이상인 파일을 찾는다.
find . -size +1024

 # 사이즈가 100 MB 이상인 파일을 모두 찾아 사이즈가 큰 순서대로 정렬한다
find ~/Documents/ -size +100M -ls | sort -k7nr

 # 비어 있는 디렉토리를 찾는다
find . -d -empty
find . -type d -empty
```

```sh
 # 하위 경로에 있는 모든 png, jpg 파일을 찾는다
find . -type f \( -name "*.png" -o -name "*.jpg" \)
```

- `-o`는 "OR"를 의미한다.
- `\(`와 `\)`는 우선순위를 지정하거나 그룹을 지정할 때 쓴다. 그러나 쓰기 귀찮아서 생략하는 경우가 많다.

```sh
 # 하위 경로에서 md 파일이 아닌 다른 모든 파일을 찾는다
find . -type f ! -name "*.md"
```

- `!`는 "NOT"을 의미한다.

## 옵션 {#options}
### -exec : 각 파일에 대해 실행할 명령을 지정한다 {#option-exec}

`find`의 핵심 기능으로, 찾은 파일에 대해 실행할 명령을 지정할 수 있다.

`-exec`를 사용할 때 기억해 둘 것은 다음의 세 가지이다.

- `{}`: 찾은 각각의 파일 이름이 들어가는 placeholder.
- `\;`: 각 파일에 대해 실행할 명령의 끝.
    - `;`은 bash에서 명령의 끝을 의미하므로 `\;`로 escape 해줘야 한다.
    - `';'`와 같이 따옴표로 감싸도 된다.
- `+`: `\;` 대신 `+`를 사용하면, `xargs`를 사용한 것처럼 작동한다. 즉, 찾은 파일 목록 전체를 지정한 명령에 args로 넘겨준다. 명령 실행 횟수를 최소화할 수 있으므로 파이프라인이 빨라지는 경우가 많다.


```sh
 # 하위 경로의 CRLF 를 사용하는 모든 파일을 찾는다.
find . -not -type d -exec file '{}' ';' | grep CRLF

 # 이렇게 해도 된다.
find . -not -type d -exec file '{}' + | grep CRLF

 # 이름이 *.temp 인 디렉토리, 파일을 찾아 모두 삭제한다.
find . -name '*.temp' -exec rm -rf {} \;

 # 모든 java 파일에서 중괄호가 없는 if 문이 있는 파일 목록을 출력한다
find . -name "*.java" -exec ag "^\s*if[^{]*$" -l {} \;
```

다음은 바로 위의 예제의 성능을 간단하게 비교해 본 것이다. 오래 걸리는 명령이라면 `-exec`를 사용할 때 `+`를 사용할 수 있는지를 항상 고려해볼 것.

```bash
$ time find . -not -type d -exec file '{}' ';' > /dev/null

real	0m16.812s
user	0m6.458s
sys	0m8.654s

$ time find . -not -type d -exec file '{}' + > /dev/null

real	0m4.726s
user	0m4.274s
sys	0m0.450s
```

### -delete : 찾은 파일을 삭제한다 {#option-delete}

`-delete`는 `-exec rm {} \;`과 같아서 굳이 몰라도 된다. `-exec`만 알아도 된다.

```sh
 # 하위 경로의 빈 디렉토리를 모두 찾아 삭제한다.
find . -type d -empty -delete

 # -exec 로는 이렇게
find . -type d -empty -exec rmdir {} \;

 # 하위 경로의 빈 파일을 모두 찾아 삭제한다.
find . -type f -empty -delete

 # -exec 로는 이렇게
find . -type f -empty -exec rm {} \;

 # 이렇게 해도 된다
find . -type f -empty -exec rm {} +
```

### -mtime, -mmin : 파일 업데이트 시간을 기준으로 찾는다 {#option-mtime}

```sh
 # 24시간 전부터 지금까지 업데이트된 경로 내의 파일을 찾는다.
find /경로 -mtime -1 -ls

 # 48시간 전부터 24시간 전까지 수정된 모든 markdown 파일을 찾는다.
find . -name '*.md' -mtime 1

 # 24시간 전부터 지금까지 수정된 모든 markdown 파일을 찾는다.
find . -name '*.md' -mtime 0

 # 수정된지 24시간을 초과한 모든 markdown 파일을 찾는다.
find . -name '*.md' -mtime +0

 # 수정한 지 48시간 이상인 모든 markdown 파일 이름 목록을 보여준다.
find . -name '*.md' -mtime +1
```

- `-1`: 24시간 전 ~ 지금까지. `0`과 같다.
- `1`: 48시간 전 ~ 24시간전까지.
- `0`: 24시간 전 ~ 지금까지
- `+0`: 1970년 ~ 24시간 전까지
- `+1`: 1970년 ~ 48시간 전까지.

`+`, `-` 기호가 없이 `N`을 제공하면 `N+1`일 전부터 `N`일 전까지 범위를 사용한다는 것을 기억해두자.

- `0`: 1일 전 ~ 0일 전까지 = 24시간 전 ~ 지금까지
- `1`: 2일 전 ~ 1일 전까지 = 48시간 전 ~ 24시간전까지
- `6`: 7일 전 ~ 6일 전까지 = 168시간 전 ~ 144시간 전까지

`-N`은 `N`일 전부터 지금까지의 범위를 의미한다.

- `-1`: 1일 전 ~ 지금까지 = 24시간 전 ~ 지금까지
- `-7`: 7일 전 ~ 지금까지 = 168시간 전 ~ 지금까지

`+N`은 1970년부터 `N+1`일 전까지의 범위를 의미한다.

- `+0`: 1970년 ~ 1일 전까지 = 1970년 ~ 24시간 전까지
- `+1`: 1970년 ~ 2일 전까지 = 1970년 ~ 48시간 전까지
- `+6`: 1970년 ~ 7일 전까지 = 1970년 ~ 168시간 전까지

```sh
 # 수정된지 100분 이하인 모든 마크다운 파일을 찾는다.
find . -name '*.md' -mmin -100
```

### -maxdepth, -mindepth : 탐색 깊이를 제한한다 {#option-depth}

```sh
 # 현재 디렉토리에서 2단계 아래까지만 탐색한다.
find . -maxdepth 2 -name '*.md'

 # 현재 디렉토리에서 2단계 아래부터 탐색한다.
find . -mindepth 2 -name '*.md'
```

### -xdev : 시스템 영역 등을 탐색에서 제외한다 {#option-xdev}

>
find 명령의 인수 `-xdev`는 find가 시스템 영역, 소스 디렉토리와 삭제 가능한 디바이스들,
(리눅스에서) 실행 중인 프로세스들의 `/proc` 디렉토리,
그리고 그와 유사한 영역들을 검사하지 않도록 해서,
파일 시스템 전체를 검사하는 일이 없게 한다.
[^wicked-113]

## 함께 읽기

- [[/cmd/grep]]

### 1995년: find 명령어는 왜 이렇게 괴상한 건가요? {#email-1995}

[/sys/doc Documentation archive]( http://doc.cat-v.org/unix/find-history )에는 흥미로운 이메일이 있다.

Dan Bacus가 find에 대해 Dennis Ritchie에게 질문하고, Dennis Ritchie가 답변하는 이메일이다.

>
Dear Mr. Ritchie,
>
I heard a story from a guy in a UNIX sysadmin class, and was wondering if it was true.
>
The guy in this class told of a co-worker of his who was in a UNIX training class that got involved in UNIX bashing.
You know, like why is the -i option for grep mean ignore case, and the -f option for sort mean ignore case, and so on.
Well, the instructor of the course decided to chime in and said something like this:
>
"Here's another good example of this problem with UNIX.
Take the find command for example.
WHAT idiot would program a command so that you have to say -print to print the output to the screen.
What IDIOT would make a command like this and not have the output go to the screen by default."
>
And the instructor went on and on, and vented his spleen...
>
The next morning, one of the ladies in the class raised here hand, the
instructor called on her, and she proceeded to say something like this:
>
"The reason my father programmed the find command that way, was because he was told to do so in his specifications."
>
I've always wondered if this story was true, and who it was who wrote the find command.
In the Oct. 94 issue of Byte they had an article on "UNIX at 25" which said that Dick Haight wrote the find command along with cpio, expr, and a lot of the include files for Version 7 of UNIX.
I don't know where to send this message directly to Dick Haight, and I would appreciate it if you would forward it to him, if you are able.
If you can't, well then I hope you liked the story.
I got your mail address from "The UNIX Haters Handbook", and would like to add this to your Anti-Forward:
>
Until that frozen day in HELL occurs, and the authors of that book write a better operating system, I'm sticking with UNIX.
>
Sincerely,
>
Dan Bacus
nsc@edge.ercnet.com.

Ritchie님 안녕하세요.

UNIX sysadmin 수업을 듣고 있다는 어떤 사람에게 한 이야기를 들었는데, 그것이 사실인지가 궁금합니다.

그 사람에게는 UNIX 훈련 수업을 듣고 있는 동료가 있는데, 그 수업에서 UNIX를 비난하는 이야기가 나왔다고 합니다.
아마 잘 아시겠지만, [[/cmd/grep]]{grep}의 `-i` 옵션은 대소문자를 무시하는 의미인데, [[/cmd/sort]]{sort}에서 대소문자를 무시하는 옵션은 왜 `-f` 인지 같은 것들이요.
그 수업의 강사는 이런 식으로 말했다고 합니다.

_"여기에 UNIX의 이런 문제를 잘 보여주는 좋은 예가 하나 더 있습니다. 예를 들어 `find` 명령을 살펴봅시다. 대체 어떤 멍청이가 출력 결과를 화면에 출력하려면 `-print` 옵션을 줘야 하는 명령을 만들었을까요? 이런 명령을 만들면서 출력 결과가 기본적으로 화면에 출력되지 않게 한 멍청이는 대체 누구일까요?"_

그 이후에도 그는 계속해서 투덜댔다고 합니다.

그런데 다음날 아침, 수업에 참여하고 있는 한 여성이 손을 들었습니다.
강사가 그녀를 부르자 그녀는 이렇게 말했다고 합니다.

_"우리 아버지가 find 명령을 그렇게 프로그래밍한 이유는 스펙에 그렇게 만들라고 되어 있어서였대요."_

저는 이 이야기가 실화인지, find 명령을 만들었다는 그녀의 아버지가 누구인지 늘 궁금했습니다.
한편 "Byte"지 1994년 10월호에는 "UNIX 25주년"이라는 기사가 실렸는데요, 읽어보니 Dick Haight가 바로 find 명령어를 만든 사람이라고 합니다.
그는 그 외에도 cpio, expr 등과 같이 UNIX 7 버전에 포함된 수많은 파일들을 만들었다고 합니다.
저는 이 이야기를 어디로 보내야 Dick Haight님 본인에게 전달이 될 지 잘 모르겠어서 당신에게 보내게 되었습니다.
가능하다면 Dick Haight에게 전달해 주실 수 있다면 감사하겠습니다.
그리고 만약 그에게 전달할 수 없는 상황이라면 이 이야기가 마음에 드셨기를 바랍니다.
저는 "The UNIX Haters Handbook"이라는 책에서 당신의 이메일 주소를 알게 됐습니다.
그리고 다음 문장을 당신의 Anti-Forward 이메일 자동 답변에 추가하면 어떨까 싶습니다.

**지옥이 얼어붙는 그날까지, 그리고 "The UNIX Haters Handbook" 책을 쓴 저자들이 UNIX보다 더 나은 운영체제를 만들때까지 저는 UNIX만 쓰고 있을 것입니다.**

감사합니다.  
Dan Bacus 드림.

>
From daemon Thu Feb  9 02:22 GMT 1995  
Return-Path: dmr@plan9.research.att.com  
Received: from plan9.research.att.com ([192.20.225.252]) by nscsgi.nscedu.com (8.6  
From: dmr@plan9.research.att.com  
Message-Id:  \<199502090222.CAA04283@nscsgi.nscedu.com>  
To: danb  
Date: Wed, 8 Feb 1995 21:20:30 EST  
Subject: Re: story  
Content-Type: text  
Content-Length: 1031  
Status: RO  
>
Thanks for the story and the note.
Dick Haight was in what was then probably called USG, for Unix Support Group (the name changed as they grew).
Their major role was to support the system withing AT&T, and later to turn it into a real commercial product.
He was indeed one of the major people behind find and cpio.
This group was distinct from the research area where the system originated, and we were somewhat put off by the syntax of their things.
However, they were clearly quite useful, and they were accepted.
>
Dick left AT&T some years ago and I think he's somewhere in South Carolina, but I don't have an e-mail address for him.
I'm not sure what he thinks of find and cpio today.
That group always was more concerned with specifications and the like than we were, but I don't know enough about their internal interactions to judge how these commands evolved.
All of your story is consistent with what I know up to the punchline, about which I can't render an opinion!
>
Thanks again for your note.
>
Dennis

Re: 보내주신 이야기에 대해

보내주신 이야기에 감사합니다.
Dick Haight는 그 당시 USG라고 불렸던 Unix Support Group(나중에 이름이 변경됐습니다)에서 일했습니다.
그 그룹 사람들의 주요 업무는 AT&T의 시스템을 서포트하는 것과, 그런 시스템들을 나중에 실제 제품으로 전환하는 것이었습니다.
Dick Haight는 실제로 find 와 cpio를 개발한 핵심 인재 중 하나였습니다.
그 그룹은 시스템 개발이 시작된 연구 분야와는 별개로 떨어져 있었고, 우리도 그들이 만든 문법에 좀 당황했었습니다.
하지만 그 명령들이 꽤 유용한 것은 분명했고, 널리 받아들여지게 됐습니다.

Dick은 몇 년 전에 AT&T를 퇴사하셨습니다.
제 생각에는 사우스 캐롤라이나 어딘가에 계실 거 같은데, 제가 그분의 이메일 주소가 없어서 연락은 어렵겠습니다.
저는 오늘날에 이른 find와 cpio에 대해 Dick이 어떻게 생각할런지는 잘 모르겠습니다.
그 그룹은 언제나 스펙을 준수하는데에 우리보다 더 주의를 기울였고, 나는 그 그룹 내 일에 대해서는 잘 모르겠어서 언급하신 명령들이 어떻게 개발되었는지 함부로 단정할 수 없습니다.
귀하의 모든 이야기는 대체로 단언할 수 없다고 한 것을 제외하면 제가 알고 있는 것과 일치합니다.

보내주신 이야기에 다시 감사드립니다.

Dennis

## 참고문헌

- [The History of the Design of Unix’s Find Command (doc.cat-v.org)]( http://doc.cat-v.org/unix/find-history )
- 셸 스크립트 - 101가지 예제로 정복하는 / Dave Taylor 저 / 여인춘 역 / 에이콘출판사 / 발행: 2005년 09월 26일 / 원제: Wicked Cool Shell Scripts

## 주석

[^wicked-113]: 셸 스크립트 - 101가지 예제로 정복하는. 5장. 113쪽.

