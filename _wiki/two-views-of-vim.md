---
layout  : wiki
title   : Vim, 두 가지 관점
summary : 그리고 나의 vim 사용 습관
date    : 2019-05-19 22:31:27 +0900
updated : 2019-06-04 21:20:06 +0900
tag     : vim
toc     : true
public  : true
parent  : Vim
latex   : true
---
* TOC
{:toc}

> BERNARD BARUCH'S OBSERVATION  
If all you have is a hammer, everything looks like a nail.  
<br>
버나드 바루흐의 고찰  
망치를 든 사람에게는 모든 것이 못으로 보인다.


이 글에서는 vim에 대한 나의 두 가지 관점과 내 vim 사용 습관에 관해 이야기한다.


# 관점: 텍스트 처리 언어로서의 vim

* **Vim as textual processing language**.

## vim NORMAL 모드 명령 시스템은 하나의 언어이다

나는 vim의 NORMAL 명령 시스템을 텍스트 처리 언어로 볼 수 있다고 생각한다.


* 언어로서의 vim NORMAL 명령을 $$L_v$$라 표기하고...
* 해당 언어의 알파벳을 $$\Sigma_v$$라 표기한다고 하자.

$$
\begin{align}
\Sigma_t & = \text{터미널이 입력으로 받는 모든 문자의 집합} \\
\Sigma_v & \subset \Sigma_t \\
L_v      & = \Sigma_v^+ \\
\end{align}
$$

$$\Sigma_v$$는 터미널이 입력으로 받는 모든 문자 집합의 부분집합이며, $$L_v$$는 $$\Sigma_v$$의 원소들로 만든 모든 ordered set의 집합이다(공집합 제외).

## vim의 NORMAL 명령어 시퀀스는 함수이다

$$L_v$$는 언어로 정의할 수 있을 뿐만 아니라, 실천 가능한 지시가 있는 언어이기도 하다.

가령 다음과 같은 문장이 있다고 하자.

```
Do not look in the (red)box.
```

만약 vim NORMAL 모드에서 이 문장에 커서를 두고 `02feciwgreen`을 입력하면 `red`가 `green`으로 바뀐다.

```
Do not look in the (green)box.
```

`02feciwgreen`은 즉석에서 정의한 명령형 문장이며 프로그래밍 관점에서 보면 일종의 프로시저이다.
주어진 문장은 입력값이라 할 수 있다.

프로시저의 한 글자 한 글자는 각자 실천적인 의미를 갖는데,
커서가 지시하는 문자에 영향을 끼치거나 커서의 위치를 이동시킨다. 튜링 머신을 떠올리게 하는 재미있는 특징이다.

한편, vim의 NORMAL 명령어 시퀀스는 전사 함수(surjective function)로도 볼 수 있다.

* 정의역: vim 에디터에 입력 가능한 모든 문자열(문자들의 ordered set)의 집합.
* 공역: vim 에디터에 표현 가능한 모든 문자열의 집합.
* 치역: vim NORMAL 명령어로 만들어낼 수 있는 모든 문자열의 집합.

| ![surjective function](https://user-images.githubusercontent.com/1855714/58082306-ab225700-7bf1-11e9-93cb-67b8f56350df.png ) |




## vim 매크로 생성은 새로운 동사를 창조하는 행위

vim의 NORMAL 명령어를 언어 $$L_v$$로 보는 관점에서
"매크로" 생성은 새로운 동사를 창조하는 행위라 할 수 있다(그 외에도 map, abbreviate, command, function 등등이 있지만, 여기에서는 생략한다).

가령 vim-surround 사용자가 `s` 레지스터에 `ysiw$w.`를 넣어뒀다면, 이로 인해 `@s`를 입력하는 것만으로 `ysiw$w.`을 또 입력하는 일을 생략할 수 있다.

(매크로의 활용은 vim 에디터를 vim 명령어와 vimscript를 일종의 난해한 프로그래밍 언어로 사용하는 데에도 핵심적인 방법일 정도로 강력하다.)


`:g`와 매크로를 조합해 쓰는 것은 이러한 특징을 잘 활용하는 재미있는 예가 될 수 있다고 생각한다.

`:g`를 사용하면 특정 범위 내의 문자열을 행 단위로 필터링하여 NORMAL 명령어를 선택적으로 적용할 수 있기 때문이다.

예를 들어 보자. 다음은 [Rosetta Code](http://rosettacode.org/wiki/RIPEMD-160#Go )에서 복사해 온 짧은 프로그램 코드이다.

```go
package main

import (
    "golang.org/x/crypto/ripemd160"
    "fmt"
)

func main() {
    h := ripemd160.New()
    h.Write([]byte("Rosetta Code"))
    fmt.Printf("%x\n", h.Sum(nil))
}
```

`:%g/fmt/exe "normal I//"`와 같은 명령이 있다고 하자. 이 명령의 의미는 다음과 같다.

* `%g/fmt/`: `fmt`문자열 패턴을 포함하는 모든 행.
* `exe`: 다음 명령을 실행하라.
* `normal I//<Esc>`: NORMAL 모드에서 `I//<Esc>`을 실행하라.

따라서 실행 결과는 다음과 같다.

```go
package main

import (
    "golang.org/x/crypto/ripemd160"
    //"fmt"
)

func main() {
    h := ripemd160.New()
    h.Write([]byte("Rosetta Code"))
    //fmt.Printf("%x\n", h.Sum(nil))
}
```

만약 `c` 레지스터에 `I//<Esc>` 문자열을 저장하고 매크로로 사용한다면 다음과 같이 실행할 수 있다.

```viml
:%g/fmt/exe "normal @c"
```

`@c`는 `I//` 일 뿐이므로 `//` 스타일의 주석을 사용하는 모든 종류의 프로그래밍 언어 편집에 사용할 수 있다.

* `@c`: 현재 라인의 시작 부분에 `//` 문자열을 추가한다.
* `vip:norm @c`: 현재 문단의 모든 라인의 시작 부분에 `//` 문자열을 추가한다. (`norm`: `normal`의 축약)
* `vi{:norm @c`: 현재 중괄호 안의 모든 라인의 시작 부분에 `//` 문자열을 추가한다.

마지막의 `vi{:norm @c`를 실제로 사용한다면 다음과 같은 텍스트를...

```go
func main() {
    h := ripemd160.New()
    h.Write([]byte("Rosetta Code"))
    fmt.Printf("%x\n", h.Sum(nil))
}
```

다음과 같이 바꿔놓는다.

```go
func main() {
    //h := ripemd160.New()
    //h.Write([]byte("Rosetta Code"))
    //fmt.Printf("%x\n", h.Sum(nil))
}
```

물론 `@c` 앞에 있는 부분도 매크로로 등록할 수 있다.

`n` 레지스터에 `:norm `을 넣는다면 `vi{@n@c`로 똑같은 결과를 얻을 수 있다.

당연히 `@n@c`도 또 다른 매크로에 등록하여 더 적은 횟수의 키 스트로크로 사용하는 것도 가능하다.


## $$L_v$$의 구현체

$$L_v$$를 vim 에디터 NORMAL 모드의 맥락과 유사한 느낌으로 사용할 수 있도록 고안한 도구를 vim NORMAL 명령 언어의 구현체로 생각할 수 있다.

이러한 도구들을 사용하면 $$L_v$$를 vim 에디터와 비슷한 느낌으로 구사할 수 있으므로
익숙한 언어로 위화감 없이 텍스트를 편집할 수 있는 것이다.
한 번 공부한 언어를 여러 나라에서 사용할 수 있는 것처럼 매우 편리하고 쾌적하다.

다양한 IDE의 vim 플러그인들은 vim 에디터의 수많은 command와 function은 지원하지 않지만,
NORMAL 명령만큼은 vim 에디터와 똑같이 작동하는 것을 목표로 한다.

그 외에도 웹서핑도 하고 이런저런 도구들을 사용하다 보면 여기저기에서 $$L_v$$ 사용자들의 흔적을 볼 수 있다.

| ![twitter](https://user-images.githubusercontent.com/1855714/58219111-af12be00-7d44-11e9-9f77-66213de909f8.png) | ![facebook](https://user-images.githubusercontent.com/1855714/58219253-25afbb80-7d45-11e9-9385-509cbbc7ed00.png) | ![gmail](https://user-images.githubusercontent.com/1855714/58220906-a5408900-7d4b-11e9-84e7-359c55ad800f.png) |

<style> img[alt="twitter"] { max-height: 300px; display: block; } </style>
<style> img[alt="facebook"] { max-height: 300px; display: block; } </style>
<style> img[alt="gmail"] { max-height: 300px; display: block; } </style>

_표: Twitter와 Facebook, Gmail의 키보드 단축키들_


새로 접하게 된 애플리케이션을 사용하다 무심코 `j`, `k`를 눌렀을 때 스크롤이 움직이면 굉장히 반갑다.



## 초심자는 vim을 어떻게 공부하는 것이 좋을까?

초심자가 vim 에디터를 접할 때 엄청나게 많은 "**단축키**"에 놀라곤 한다.

vim을 언어로 접근하는 것이 아니라 제어 버튼이 빼곡한 조종 장치로 보기 때문이다.

| ![image](https://user-images.githubusercontent.com/1855714/58084360-aa8bbf80-7bf5-11e9-82fa-b9388f5361ed.png) | ![image](https://user-images.githubusercontent.com/1855714/58084159-554fae00-7bf5-11e9-9b9f-78387f06216b.png) |

_그림: Space Shuttle Endeavour 호의 조종석과 흔히 찾아볼 수 있는 vim cheatsheet._


vim을 텍스트 조작 언어로 인식한다면 초심자가 "외워야 하는" 대상은 생각보다 많지 않을 수 있다.

다음의 동사와 명사를 익혀둔다면 초심자라도 거의 모든 텍스트 조작이 가능하다.

<table>
    <tr>
        <td>
            <table>
              <thead>
                <tr> <th>동사</th> <th>의미</th> </tr>
              </thead>
              <tbody>
                <tr> <td>d</td> <td>삭제하라</td> </tr>
                <tr> <td>y</td> <td>복사하라</td> </tr>
                <tr> <td>p</td> <td>붙여넣어라</td> </tr>
                <tr> <td>i</td> <td>문자 입력을 받아라</td> </tr>
                <tr> <td>Esc</td> <td>문자 입력을 중지하라</td> </tr>
                <tr> <td>f</td> <td>검색하라</td> </tr>
                <tr> <td>u</td> <td>실행을 취소하라</td> </tr>
                <tr> <td>.</td> <td>실행을 반복하라</td> </tr>
              </tbody>
            </table>
        </td>
        <td>
            <table>
              <thead>
                <tr> <th>명사</th> <th>의미</th> </tr>
              </thead>
              <tbody>
                <tr> <td>w</td> <td>단어</td> </tr>
                <tr> <td>b</td> <td>이전 단어</td> </tr>
                <tr> <td>h</td> <td>좌</td> </tr>
                <tr> <td>l</td> <td>우</td> </tr>
                <tr> <td>k</td> <td>상</td> </tr>
                <tr> <td>j</td> <td>하</td> </tr>
                <tr> <td>^</td> <td>첫 글자</td> </tr>
                <tr> <td>$</td> <td>행의 마지막</td> </tr>
              </tbody>
            </table>
        </td>
    </tr>
</table>

_표: 내가 vim 초심자에게 추천하는 동사/명사_

vim NORMAL 명령어는 기본적으로 다음과 같은 형식을 따른다.

```
(숫자) 동사
(숫자) 동사, 명사
(숫자) 동사, 동사
```

다음은 첫 번째/두 번째 형식의 예이다.

* `w`: 다음 단어로 커서를 이동하라.
* `dw`: `w`를 하면서 삭제하라.
* `3dw`: 3번 `w`를 하면서 삭제하라.
* `yw`: `w`를 하면서 복사하라.
* `3yw`: 3번 `w`를 하면서 복사하라.

이런 형식에 익숙해지면 `d3fa`와 같은 응용도 가능하다.

* `fa`: a를 검색하여 그 위치로 커서를 이동하라.
* `3fa`: `fa`를 3번 하라.
* `d3fa`: `3fa`를 하면서 삭제하라.

물론 숫자의 활용에도 익숙해지면 세 자리 숫자를 사용하거나 `i`에 대해서도 응용할 수 있다.

* `u`: 실행 취소.
* `100u`: 100번 실행 취소.
* `itest<Esc>`: `test` 문자열을 입력한다. `<Esc>`는 입력의 종료를 뜻한다.
* `3itest<Esc>`: `test` 문자열을 3번 입력한다. 즉 `testtesttest`를 입력한다.

이 글은 설명이 부족하긴 하지만, 동사들을 살펴보고 직접 에디터를 열고 실험하다 보면
오래 지나지 않아 vim NORMAL 명령어의 구조를 터득할 수 있다.

이런 단계까지 간다면 `동사, 동사`(`dd`, `yy`, `cc`...)의 편리함을 쉽게 이해할 수 있고
다른 NORMAL 명령을 틈날 때마다 하나씩 습득하면 된다.

다른 언어들이 그러하듯 처음부터 다 외우고 시작할 필요가 없다.

그리고 이러한 **언어**에 익숙해진다면
그때부터는 수많은 플랫폼(IDE, 웹 브라우저 등등)에 플러그인 형태로 제공되는 vim 언어 플러그인을 사용할 수 있게 된다.

## vim 언어 입력의 특성

* 키 시퀀스를 입력하는 것으로 프로시저를 생성할 수 있다.
* 한 글자가 하나의 동사(명령), 명사(대상)를 의미한다.
    * 언어에 익숙해지면 상황에 따라 새로운 프로시저를 생성할 수 있다.

vim의 NORMAL 명령어는 몇 가지 예외를 제외하면 손가락 하나만으로도 톡톡 두드려 입력하기 쉽게 되어 있다.
문법에 맞춰 알맞은 순서로 입력하기만 하면 필요한 기능을 사용할 수 있기 때문이다.

이러한 특성은 계산기/전화기/스타크래프트의 키보드 UI와 닮아있는데, 게임 도중 아이콘을 선택할 때 방향키를 입력하여 커서를 이동시킨 후 클릭하는 방식이었다면 스타크래프트는 훨씬 불편한 게임이 되었을 것이다.

| ![calculator](https://user-images.githubusercontent.com/1855714/58091330-491f1d00-7c04-11e9-82e3-658661f89b7e.png) | ![starcraft](https://user-images.githubusercontent.com/1855714/58091581-ea0dd800-7c04-11e9-84ca-b7934e156bc7.png) |

<style> img[alt="calculator"] { max-height: 200px; display: block; } </style>
<style> img[alt="starcraft"] { max-height: 200px; display: block; } </style>

다음은 IntelliJ의 DEFAULT KEYMAP 일부를 캡처한 것이다. IntelliJ는 훌륭한 IDE지만 이 키맵은 `shift`, `control` 같은 modifier 키의 의존도가 높다. 거의 매번 동시에 두 개 이상의 손가락에 힘을 줘야 한다. 특히 `control` 키는 현대 키보드의 위치상 새끼손가락에 부담을 많이 주기 때문에 Emacs Pinky의 위험이 있다. 게다가 동시에 여러 키를 누르는 것은 때로는 꽤 헷갈리는 일이다.

![intellij](https://user-images.githubusercontent.com/1855714/58091746-61dc0280-7c05-11e9-97cc-5d66a03de51d.png)
<style> img[alt="intellij"] { max-height: 400px; display: block; } </style>

잠시 오래된 현자의 말씀을 감상하자.

> DEVRIES' DILEMA  
If you hit two keys on the typewriter, the one you don't want hits the paper.  
<br>
드브리스의 딜레마  
동시에 타자기의 키를 두 개 누르면, 원하지 않았던 글자가 종이에 찍힌다.


물론 vim도 `control` 키를 사용하는 명령이 있긴 하지만 비중이 크지는 않으며, 원한다면 얼마든지 `control`키의 사용을 피할 방법이 있다.

`control`, `shift` 키의 사용이 너무 많기 때문에 `control` 키와 `shift` 키가 사용되는 맥락을 이해하기 어렵다. 동사로 본다면 불규칙 동사인 셈이다. modifier 키의 사용에서 규칙을 발견하기 어렵기 때문에 사용자는 이러한 "단축키"들을 외우며 IntelliJ를 사용해가야 한다(다행히 IdeaVim이 있기 때문에 IntelliJ 에서도 vim 언어를 사용할 수는 있다).

다음은 IntelliJ의 DEFAULT KEYMAP에서 몇 가지 명령을 뽑아 vim과 비교한 것이다.

| 텍스트 편집 기능       | IntelliJ          | Vim     |
|------------------------|-------------------|---------|
| Duplicate current line | Ctrl+D            | yyp     |
| Delete line at caret   | Ctrl+Y            | dd      |
| Toggle case for word   | Ctrl + Shift + U  | gUiw    |
| Delete to word end     | Ctrl + Delete     | dw      |
| Delete to word start   | Ctrl + Backspace  | db      |
| Expand code block      | Ctrl + NumPad +/- | zo / zf |

같은 동작을 하는 vim 명령어들을 살펴보면 설명이 없이도 바로 기능을 이해할 수 있다.

예를 들어 `yyp`는 현재 라인을 복사(`yy`)하고 바로 붙여넣는다(`p`)는 의미를 갖고 있고, `gUiw`는 현재 단어(`iw`)를 대문자로 변환(`gU`)한다는 의미를 갖고 있다.

이런 특성은 특정 명령어를 미리 정의하지 않아도 문법에 맞춰 사용자가 상상력과 경험을 통해 새로운 명령어 조합을 만들어낼 수 있다는 장점이 있다. 즉, vim 언어의 특성은 오히려 최소한의 암기만으로 수많은 기능을 사용할 수 있게 한다.

## vim 언어 입력의 특성을 응용하기

vim에 새로운 명령을 추가할 때 위에서 살펴본 vim 언어 입력의 특성을 응용하는 것이 바람직하다고 생각한다.

가령 나는 몇몇 유용한 기능을 다음과 같은 키 입력으로 호출한다.

* `<F1>f`: 파일 탐색 (`<F1><F1>`를 신택스 슈가로 쓰고 있다)
* `<F1>b`: 버퍼 탐색
* `<F1>h`: 파일 히스토리 탐색
* `<F1>t`: 소스 코드 태그 탐색

이 네 가지 키 시퀀스는 모두 `<F1>`키로 시작한다.
탐색과 관련된 기능을 모두 `<F1>`로 시작하게 하여, 기억하기 쉽게 설정하였다.

한 글자씩 생각하면서 기능을 연상하기 좋다.

한편, 나는 이 방식을 IntelliJ에서도 사용하고 있다.

![intellij-f1](https://user-images.githubusercontent.com/1855714/58094860-8daeb680-7c0c-11e9-8cfe-61ee688920b4.png)

<style> img[alt="intellij-f1"] { max-height: 300px; display: block; } </style>

* `<F1>f`: Navigate - File... (이것도 `<F1><F1>`를 신택스 슈가로 쓰고 있다)
* `<F1>u`: Find usages
* ...

물론 `<F1>`만 사용하고 있는 것은 아니다.
가령 나는 `\`를 `localleader`로 사용하고 있는데 다음과 같이 특별한 기능 윈도우를 여는 데에 사용한다.

* `\s`: Startify - 세션 관리
* `\t`: Tagbar - 태그 목록
* `\u`: Mundo - Undo tree visualizer
* `\d`: MacDictWord - 영어사전
* `\g`: 벽돌 깨기 게임





# 관점: 플랫폼으로서의 vim

{% raw %}
<blockquote class="twitter-tweet">
<p lang="ko" dir="ltr">Vim은 기계인간님의 Emacs군요!</p>&mdash; Ashal aka JOKER (@ahastudio) <a href="https://twitter.com/ahastudio/status/1126663846804873216?ref_src=twsrc%5Etfw">May 10, 2019</a>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
{% endraw %}

* 나는 vim을 코딩하거나 설정 파일을 수정할 때에만 쓰지 않는다.
* 목적이 다른 여러 종류의 텍스트 편집 플랫폼으로 사용한다.

## 작업 환경을 어떻게 전환하는가?

다양한 용도로 사용하는 플랫폼이라면 작업 전환이 필수.

vim은 작업 환경 전환을 위해 session 기능을 제공한다.

예를 들어, 다음과 같은 session을 지정해두고 사용할 수 있다.

| 작업 목적       | 세션                 |
|-----------------|----------------------|
| 블로그 글쓰기   | 블로그 세션          |
| 할 일 관리      | 할 일 관리 세션      |
| 회사 프로젝트   | 회사 프로젝트 세션   |
| 개인 프로젝트 A | 개인 프로젝트 A 세션 |
| ...             | ...                  |


예를 들어 컴퓨터를 쓰다가 할 일 목록을 봐야겠다 싶으면 vim을 켜고 `할 일 관리 세션`으로 들어간다.

할 일을 확인하고 한 일에 체크를 한 다음, 블로그에 글을 써야겠다 싶으면 `블로그 세션`으로 들어간다.

`블로그 세션`으로 들어가면 지난번에 `블로그 세션`에서 편집하고 있었던 파일들이 자동으로 열리고, 윈도우 레이아웃도 복원된다.

vim 세션에 저장되는 정보는 대략 다음과 같다.

* 세션의 이름
* 열려 있는 파일 버퍼들의 목록.
* 열려 있는 각 윈도우들의 위치와 버퍼와의 관계.
* 작업 디렉토리

세션을 전환하면 해당 세션에서 마지막에 열어뒀던 파일들이 알아서 오픈되고 윈도우 레이아웃이 복구된다.

세션 전환에는 vim의 기본 session 명령어를 사용하는 것보다 플러그인을 쓰는 쪽이 간편하다.

나는 Startify 플러그인을 사용하고 있다.

```viml
Plug 'mhinz/vim-startify'
```

* 단축키로는 `\s`를 등록해 놨는데, `\`는 나의 `localleader`이다.
    * 작업하다가 `0`번 세션으로 전환하고 싶으면 `\s`, `0` 처럼 누르면 된다.
    * 물론 세션마다 이름을 붙여 놓으므로 `\s`를 누른 다음, 목록을 보고 선택해도 된다.

Startify는 Most Recently Used Files도 제공하고 있어 편리하다.


## vim 에디터는 터미널 도구

* vim 외의 다른 도구들을 함께 조화롭게 사용하는 방향을 생각해볼 수 있다.
* vim 안에서 모든 것을 해결하려 집착할 필요는 없다.
* 이미 고유의 목적에 맞춰 잘 만들어진 도구가 잔뜩 있다.
* vimscript를 고집할 필요가 없음. 쉽게 쉽게 가는 것이 좋다.

예를 들어 간단한 사칙연산을 `bc` 명령어로 수행하는 것이 가능하다(사실 `bc`는 그냥 계산 명령어가 아니라 하나의 언어이다).

다음과 같은 라인이 vim 에디터 버퍼에 출력되어 있다고 하자.

```
3 + 4 * 2
```

여기에 `V:!bc<CR>`을 입력하면 다음과 같이 바뀐다.

```
11
```

이번에는 다음과 같은 두 라인이 있다고 하자.

```
apple, grape, orange
one, three, two
```

여기에 커서를 두고 `Vip:!column -t -s,<CR>`를 입력하면 다음과 같이 바뀐다.

```
apple   grape   orange
one     three   two
```

아 그렇지, Javascript 사용자라면 node.js를 사용할 수도 있을 것이다.

vim 에디터에 다음과 같이 작성하고 `V:!node -p<CR>`을 입력해보자.

```
console.log(39+3);
```

그러면 `console.log(39+3)`은 사라지고 다음과 같은 결과가 나올 것이다.

```
42
undefined
```

물론 node.js 만 되는 것은 아니고 python도 된다.

vim 버퍼에 다음과 같은 python 코드를 작성한 다음 `vip:!python`을 입력해보자.

```
for i in range(4):
    print 'vim'
```

다음과 같이 바뀔 것이다.

```
vim
vim
vim
vim
```

말하자면 vimscript를 몰라도 vim에서 다른 프로그래밍 언어의 능력을 가져다 쓸 수도 있다는 것.

평범한 bash 명령어와 같이 STDIN을 받아 처리하는 코드를 작성한다면,
bash shell에서 pipe redirection과 함께 쓸 수 있는 것은 물론이고 vim 에디터 안에서도 쓸 수 있다.

## 내가 작성한 vimscript 도구의 실행

$$L_v$$외에 vim에는 vimscript(VimL)라는 이름의 프로그래밍 언어가 내장되어 있다.

이 언어와 함께 제공되는 builtin function을 사용하면 이런저런 유용한 도구를 만들어 사용할 수 있다.

### 읽고 있는 책 progress 관리

나는 읽고 있는 책들의 진행 상태를 vim으로 관리하고 있다.

```markdown
3 % : 11 / 352
* [ ] 밑바닥부터 만드는 컴퓨팅 시스템

16 % : 47 / 279
* [ ] 컴퓨터 아나토미

66 % : 743 / 1112
* [ ] 2019-01-14 Rosen의 이산수학 공부
```

* 책 제목이 있는 라인에 커서를 두고 `<c-space>`하면 `[X]`와 `[ ]`로 토글이 된다.
* 책 페이지를 수정하고 파일을 저장하면 퍼센티지가 업데이트된다.

퍼센티지 업데이트는 다음과 같은 짧은 vimscript 코드로 돌아간다(읽어보면 `awk` 언어를 사용하고 있음을 알 수 있다).

```viml
function! UpdateBookProgress()
    let l:save_cursor = getpos(".")
    " \d+ % : \d+ / \d+ 형식의 라인이 있으면 퍼센테이지를 계산해 업데이트한다
    let l:awk_command = "awk '{print int($4 * 100 / $6), \"\\% :\", $4, $5, $6 }'"
    %g,\v^\d+ \% : \d+ \/ \d+,exe "normal! V!" . l:awk_command . "^M"
    call setpos('.', l:save_cursor)
endfunction

augroup todoauto
    autocmd BufWritePre *wiki/todo.md call UpdateBookProgress()
augroup END
```


### 블로그 관리

이 주제로는 이미 두 개의 글을 썼으므로 이 글에서는 길게 이야기하지 않는다.

* [[my-wiki]]{Vimwiki + Jekyll + Github.io로 나만의 위키를 만들자}
* [[vimwiki]]{Vimwiki 사용법}

### 게임

* vimscript로 게임을 개발하거나 실행하여 플레이할 수도 있다.

<https://github.com/johngrib/vim-game-code-break >

<img src="https://user-images.githubusercontent.com/1855714/27774457-7e001646-5fcd-11e7-9e90-c37eafefad9c.gif" alt="animated demonstration" style="max-width:100%;">


## 다른 사람이 작성한 vimscript 도구의 실행

Apple에 앱 스토어가 있다면 Vim에는 vim.org/scripts 와 Vim Awesome이 있다.

* <https://www.vim.org/scripts/index.php >
* <https://vimawesome.com/ >

다른 사람들이 만든 훌륭한 도구를 다운받아 vim에서 돌릴 수 있다.

프로그래밍 도구는 물론이고, 일정 관리, 게임, 음악 플레이어 등등 다양한 도구가 존재한다.


### 내가 매일 사용하는 vim plugin 소개

vimscript로 만든 vim 전용 도구는 vim plugin이라 부른다.


#### fzf.vim

<https://github.com/junegunn/fzf.vim >

* 매우 편리한 UI를 제공해 준다.
    * 터미널 사용 경험의 패러다임을 바꾼 명령어.
    * Vim도 터미널 명령어이기 때문에 Vim에도 큰 영향을 준다.
    * 활용도가 무궁무진.
* 파일 탐색/선택, 버퍼 탐색/선택, 하위 경로 모든 문자열 검색 등등에 활용 가능.

스크린샷: 파일 탐색을 실행한 모습. 파일 내용 미리 보기도 가능하다.

![image](https://user-images.githubusercontent.com/1855714/58028441-b1fb8c00-7b55-11e9-86fa-bb376029b623.png)

#### VimWiki

<https://github.com/vimwiki/vimwiki >

* 나는 주로 마크다운 파일 관리용으로 쓴다.
* **블로그 관리**, 일기 관리, 할일 관리에 유용.
* 사용이 편리하기 때문에 글을 매일 쓰게 된다.

#### Ultisnips

<https://github.com/SirVer/ultisnips >

* 자신만의 snippet을 만들 수 있다.
* 특히 새로운 언어를 익힐 때 snippet을 만들면 장점이 많다.
    * 내 손에 맞는 자동완성 자료를 내 손으로 만드는 즐거움.
    * snippet 파일이 일종의 cheatsheet 가 되어 학습에 꽤 도움이 된다.
    * 뭔가 생각이 안 날 땐 snippet 파일을 보면 대강 생각이 난다.
    * 도구를 만들며 학습하는 것은 재미있어서 빠져들게 된다.

![image](https://user-images.githubusercontent.com/1855714/58098324-462c2880-7c14-11e9-9c83-d39b00b2e6c3.png)

### 그 외 텍스트 에디팅, 커서 점프

* [vim-surround](https://github.com/tpope/vim-surround ) - 말이 필요한가? Vim 언어를 멋지게 확장한다.
* [vim-textobj-user](https://github.com/kana/vim-textobj-user ) - Vim의 텍스트 오브젝트를 확장하는 도구.
* [vim-easymotion](https://github.com/easymotion/vim-easymotion ) - 커서 이동 힌트가 편리하다.

## 많은 vim 설정을 어떻게 관리하는가?

나는 `.vimrc`에 아래와 같이 설정한 다음,

```
runtime! vim-include/*.vim
```

`~/.vim/vim-include`에 설정 파일들을 넣는 식으로 관리하고 있다.

다음은 내가 사용하고 있는 `~/.vim/vim-include/set-startify.vim` 파일의 전문이다.

```viml
if !exists('g:include_set_startify_loaded')
    let g:include_set_startify_loaded = 1

    nmap <LocalLeader>s :Startify<CR>
    nmap <LocalLeader><LocalLeader>s :SSave<CR>

    let g:startify_custom_header = ['']
    let g:startify_update_oldfiles = 1
    let g:startify_change_to_vcs_root = 1
    let g:startify_session_sort = 1
    let g:startify_session_persistence = 1

    let g:startify_commands = [
                \ ':help startify',
                \ ]

    let g:startify_list_order = [
                \ ['    Sessions'],
                \'sessions',
                \ ['    Most Recently Used files'],
                \'files',
                \'bookmarks',
                \ ['    Commands'],
                \'commands'
                \]
endif
```


## vim 플랫폼에 기여하기

크게 두 가지 방법이 있다.

* vimscript 플러그인을 만들어 세상에 공유한다.
* [vim.org](https://www.vim.org/) 에 기부한다.
    * 기부금은 우간다의 어린이를 돕는 데에 사용된다.
    * 기부자는 투표권을 받게 되며, 약 81가지 항목에 대한 찬/반 여부를 투표할 수 있게 된다.
    * 기부자는 vim.org의 [Hall of Honour](https://www.vim.org/sponsor/hall_of_honour.php )에 이름을 올릴 수 있다.

# VIMRC 2019

* 이 글은 [VIMRC 2019](https://lqez.github.io/vimrc2019/ )에서 사용한 발표 자료입니다([youtube](https://www.youtube.com/watch?v=lNWuf48vgV4 )).

# Links


* [레거시 코드를 파괴하는 Vim 벽돌 깨기](http://woowabros.github.io/tools/2017/07/06/vim-game-code-break.html )
* [Rosetta Code](http://rosettacode.org/wiki/RIPEMD-160#Go )
* [vim-startify](https://github.com/mhinz/vim-startify )
* [wimwiki](https://github.com/vimwiki/vimwiki )
* [fzf.vim](https://github.com/junegunn/fzf.vim )
* [ultisnips](https://github.com/SirVer/ultisnips )
* [vim-surround](https://github.com/tpope/vim-surround )
* [vim-textobj-user](https://github.com/kana/vim-textobj-user )
* [vim-easymotion](https://github.com/easymotion/vim-easymotion )

# 이미지 출처

* [Astronomy Picture of the Day - The Flight Deck of Space Shuttle Endeavour](https://apod.nasa.gov/apod/ap120418.html )
* [Graphical vi-vim Cheat Sheet and Tutorial](http://www.viemu.com/a_vi_vim_graphical_cheat_sheet_tutorial.html )
* [IntelliJ IDEA DEFAULT KEYMAP](https://resources.jetbrains.com/storage/products/intellij-idea/docs/IntelliJIDEA_ReferenceCard.pdf )
* [Updated Protoss UI Starcraft: Remastered](https://imgur.com/guW8n0Y )
* [vim-game-code-break](https://github.com/johngrib/vim-game-code-break )
* [Vim-Mundo](https://simnalamburt.github.io/vim-mundo/ )
* [How to tweet](https://help.twitter.com/ko/using-twitter/how-to-tweet )

