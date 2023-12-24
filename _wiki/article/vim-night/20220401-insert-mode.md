---
layout  : wiki
title   : (백업) 아름다운 Vㅏㅁ 2022년 4월 1일
summary : INSERT MODE 자동완성 이야기
date    : 2022-11-16 22:46:50 +0900
updated : 2023-12-24 12:41:37 +0900
tag     : 
resource: 42/427FC2-3485-4ABD-89AC-FABF27939D50
toc     : true
public  : true
parent  : [[/article]]
latex   : false
---
* TOC
{:toc}

>
이 글은 2022년 4월 1일 트위터에 쓴 글을 백업한 것입니다.
{:style="background-color: #fff9e4;"}

<blockquote class="twitter-tweet"><p lang="ko" dir="ltr">생각해 보니 이 이야기를 안 했군. &lt;C-e&gt;와 &lt;C-y&gt;를 INSERT 모드에서 하는 방법이 있다. 그것은 바로 &lt;C-x&gt;를 먼저 누르는 것. 이 무슨 emacs 같은... 이라 생각할 수 있지만 막상 써보면 편함. &lt;C-x&gt;는 한 번만 눌러도 되기 때문이다... 쓰는 김에 영상도 찍어서 올려보자. <a href="https://t.co/RN1i42g6St">https://t.co/RN1i42g6St</a></p>&mdash; John Grib (@John_Grib) <a href="https://twitter.com/John_Grib/status/1509873426684469251?ref_src=twsrc%5Etfw">April 1, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## c-x 이야기

생각해 보니 이 이야기를 안 했군.
`<C-e>`와 `<C-y>`를 INSERT 모드에서 하는 방법이 있다.
그것은 바로 `<C-x>`를 먼저 누르는 것.
이 무슨 emacs 같은... 이라 생각할 수 있지만 막상 써보면 편함.
`<C-x>`는 한 번만 눌러도 되기 때문이다...
쓰는 김에 영상도 찍어서 올려보자.

insert 모드라도 이렇게 먼저 `<c-x>` (control x)를 누른 다음이라면 `<c-e><c-y>` 가 잘 돌아간다.
편집하다가도 위아래 스크롤을 할 필요가 있을 때 하면 된다.
앗 그런데 여기에서 설명할 것들이 분기가 생겨버린다.
하나는 `<c-x>` 이고, 다른 하나는 INSERT 모드에서 NORMAL 명령을 작동하는 방법인데

<div>
<video controls muted autoplay loop><source src=" /resource/42/427FC2-3485-4ABD-89AC-FABF27939D50/tS33zBZAfBkVIB5j.mp4 " type="video/mp4"></video>
</div>

기왕 이야기가 나온 김에 c-x 이야기를 먼저 하자.
c-x c-e 라니 너무 emacs 같아요! 라고 생각할 수 있지만 아무려면 어떤가 싶다.
(난 emacs 잘 모르지만 좋아한다 멋있음)

vim에서 c-x의 정식 명칭(?)은 insert expand.
vim의 기본적인 자동완성 prefix 중 하나이다. `<C-x><C-f>` 를 누르면...

파일 이름을 자동완성한다.
예를 들자면 ~/.bash 까지 적고 `<C-x><C-f>` 를 누르면 ~/.bashrc 이렇게 자동완성된다는 것.
물론 후보가 여러개면 후보를 보여준다.
중간 경로도 잘 됨. 타이핑하다가 특정 파일 경로르 자동완성해가면서 쓸 일이 있을 때 편하다.

그러면 c-f 만 있냐 하면 그 외에도 잡다한 것들이 잔뜩 붙어 있다.
그치만 다 외우고 다니지는 않고, 그 중 기억하는 건 c-f, c-y, c-e, c-l, c-], c-o 정도.
이렇게 이야기하면 앗 그래도 저걸 아 어떻게 알고 다니지 할 수 있는데 각 알파벳을 보면 떠오르는 게 있다.

f는 파일이고, y/e는 스크롤이고, l 은 행단위 자동완성이고, ] 는 태그 점프할 때 써먹는 것이니 태그 완성이고, o 는 omni completion이니까 대강 기억하는 것.
중요한 건 기억하는 게 아니라 이걸 찾아보는 방법인데, vim에서 각 모드별 키스트로크 검색은 규칙이 있다. 

insert mode control x 매뉴얼을 보고 싶다면 이렇게 입력하면 된다.

```
:help i_ctrl-x
```

그러면 이런 헬프 문서가 열린다. 비슷하게 normal 모드도 검색할 수 있다.

![help i_ctrl-x]( /resource/42/427FC2-3485-4ABD-89AC-FABF27939D50/FPQqI8aVsAUkMOJ.jpg )

vim은 help 문서가 아주 잘 되어 있어서, vim에 어느 정도 익숙해졌을 때 구글링보다 헬프 문서를 보면서 더 많이 배우는 느낌이 들었다. 근데 보다보면 좀 아득한 느낌이 드는 게... 양이 장난이 아니다. 예를들어 :help functions로 빌트인 함수 매뉴얼을 볼 수 있는데 마지막 라인 넘버가 13049 😅

그나마 만만한 :help option-summary가 7190 라인. 몇 년 전에 이 option-summary를 어디 한 번 끝까지 정독해보자 하고 읽으면서 대강 나한테 필요한 것만 요약한 문서가 바로 이것.

[simple_vim_guide/vimrc.md]( https://github.com/johngrib/simple_vim_guide/blob/98ddf77a256f3a6fdb42746c5cc834329b4a0f43/md/vimrc.md )

칠천라인이 넘는 설명서를 읽는 건 좀 괴롭긴 했는데 한편으로는 모르던 걸 잔뜩 알게 되었기도 하고, 읽다보니 생각지도 못했던 vim의 동작들도 알게 되어서 좋은 공부가 되었다고 생각. 이런 공부가 vim 바깥으로는 에디터나 이런저런 도구의 UI에 대한 내 감각에도 영향을 줬다고 생각한다. 

## c-o 이야기

그러면 이제 인서트 모드에서 노멀 명령을 실행하는 방법으로 돌아가자. c-o 가 있다. 인서트 모드에서 이걸 누르면 딱 한번만 노멀 명령을 입력할 수 있는 뭔가 소원을 비는 느낌의 명령. 예를 들어 인서트 모드에서 c-o L 을 누르면 마지막 줄로 점프해서 계속 타이핑을 할 수 있다. 

물론 그냥 esc를 누르고 뭔가 한 다음에 다시 i를 누르고 입력 작업으로 돌아가면 되긴 하는데, 그러면 키를 한 번 더 누르니까... c-o 를 누르는 것. 쓰고 보니까 키 한 번 누르는 걸 아낀다는 게 되게 구두쇠 같지만 그냥 넘어가자. 

## iabbrev 자동완성

c-x 를 이야기하며 나왔던 인서트 모드 자동완성으로 돌아가서.. 인서트모드 자동완성 하면 빠뜨릴 수 없는 게 하나 있다. iabbrev. 이름을 보면 알겠지만 약어를 확장해주는 기능이고 이걸 잘 써먹으면 오타를 고치거나 축약어를 자동완성해주게 할 수 있는데, 이게 알고 보면 무시무시한 기능. 

이제 이게 왜 무서운 기능인지 알아보자. vim 에서 iabbr의 가장 평범한 사용은 이런 것이다. 이렇게 설정하면 타이핑하다가 wyh 라고 오타를 내면 why 로 고쳐주고, naem 으로 오타를 내면 name으로 고쳐준다.

![iabbr 예제]( /resource/42/427FC2-3485-4ABD-89AC-FABF27939D50/FPQvw1gVQAcLlJn.png )

이걸 좀 응용하면 이렇게 자기 이메일 주소라던가.. 뭔가 타이핑할때 가끔 붙여넣을 일이 있는데 일일이 쓰기는 귀찮은 그런 것들을 집어넣게 된다. 하지만 이런거야 있어도 그만 없어도 그만이고, 그때그때 붙여넣어도 되니까 그냥 그런 기능이라 볼 수 있는데.

![email]( /resource/42/427FC2-3485-4ABD-89AC-FABF27939D50/FPQwJmdVEAQcEsT.png )

여기에 끼얹는 옵션이 하나 있다.
`<expr>` 이걸 쓰면 뒤에 오는 식을 표현식으로 보고 vim이 evaluate한 결과를 에디터에 완성해준다. 그리고 이 기능 덕분에 vim은 자신만의 자동완성을 아주 쉽게 만들 수 있는 멋진 플랫폼이 된다. 아래는 내가 쓰고 있는 것들.

![my config]( /resource/42/427FC2-3485-4ABD-89AC-FABF27939D50/FPQwxGcVEAE9rQs.jpg )

쓰는 모습을 찍어봤다. `__time` 부터 `__pwd` 는 vim의 빌트인 펑션을 쓰고, `__branch` 와 `__uuid` 는 system 함수로 셸 명령을 호출한다. 셸 명령을 부를 수 있다는 이야기는 나에게 익숙한 프로그래밍 언어로 나만의 완성 문구를 만들 수 있다는 의미이기도 하다. 인터넷에서 뭘 가져올 수도 있을 거고.

<video controls muted autoplay loop><source src=" /resource/42/427FC2-3485-4ABD-89AC-FABF27939D50/CcSkwLbeIhkVx6tx.mp4 " type="video/mp4"></video>

내가 설정한 iabbr이 전부 앞에 `_`가 두개씩 있는 이유는 별거 없고 괜히 타이핑하다 의도하지 않은 순간에 iabbr 자동완성이 되기를 바라지 않았기 때문. `__` 정도면 거의 쓸 일이 없으니까 의도적으로 음 오늘 날짜가.. 할 때 `__date` 하고 쓰는 식.

## expression 레지스터

아까 vim의 인라인 자동완성 (iabbr, c-x) 이야기를 죽 했는데, 생각해보니 이 주제로 이야기안한 게 하나가 더 있다. 이것만 이야기하고 오늘 턴을 종료해야지. 별 건 아니고 expression register.

vim의 인서트 모드에서 c-r 을 누르면 레지스터의 값들을 붙여넣을 수가 있는데, 아무래도 c-r 을 누르는게 " 누르는 것보다 미묘하게 더 편해서 보통 붙여넣기를 할 때 인서트 모드 c-r 을 " 보다 조금 더 자주 쓰는 편인 것 같다.

c-r 누르고 a 누르면 a 레지스터의 값들을 붙여넣고, b 누르면 b 레지스터 값들을 붙여넣는데 이게 쉽게 말하자면 직접 관리할 수 있는 복붙공간이 26개 있는 방식이라 vim이 그냥 카피&페이스트를 할 때 상당히 유리하다는 것은 vim 초보들도 많이 알고 있는 사실.

그런데 참 다양한 vim register 중 = 레지스터라는 것이 있다. 레지스터 이름이 알파벳이 아니라 = 등호. 이렇게 해보자. 인서트 모드에서 c-r = 2 + 3 엔터. 그러면 에디터에 5가 나타난다. 그러면 숫자 계산만 되느냐? `=expand('%')` 하면 현재 편집중인 파일 이름으로 완성된다.

글로만 쓰면 심심하니까 영상을 찍었다. 이것도 핵심은 system 명령 호출이 가능하다는 것. 물론 이것만 되는 게 아니라 Vimscript 함수도 부를 수 있고... 생각할 수 있는 터미널로 할 수 있는건 대부분 할 수 있다. 만약 해머스푼이랑 연결하면 OS UI도 조작 가능.

<video controls muted autoplay loop><source src=" /resource/42/427FC2-3485-4ABD-89AC-FABF27939D50/bMjG-9exkJNUPKBK.mp4 " type="video/mp4"></video>

## 매크로에 대한 잡담 {#macro}

<blockquote class="twitter-tweet" data-conversation="none"><p lang="ko" dir="ltr">Vim 오래 써왔지만, 요즘 올려주시는 글에서 새롭게 배우는거 많아요. 저는 비쥬얼 블록 선택하고 `:&#39;&lt;,&#39;&gt;norm i#` 랑 `:&#39;&lt;,&#39;&gt;norm x` 요세트 정도!</p>&mdash; asbubam (@asbubam) <a href="https://twitter.com/asbubam/status/1509883489138601985?ref_src=twsrc%5Etfw">April 1, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-conversation="none"><p lang="ko" dir="ltr">오 저는 그걸 걍 c-v 로 선택하고 I 하고 해요. &#39;&lt;,&#39;&gt;norm 은 정말 무서운 활용법이 하나 있는데 그것은 @ 를 쓰는 것입니다. 이건 나중에 이야기를 달아보죠.</p>&mdash; John Grib (@John_Grib) <a href="https://twitter.com/John_Grib/status/1509883991381340165?ref_src=twsrc%5Etfw">April 1, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

`'<,'>norm @알파벳` 이런 식으로 하면 각 행에 대해 알파벳 매크로를 실행할 수 있습니다. 이거 참 편리한데요, 여러 행에 매크로를 실행할 때 쓸만해요.

<video controls muted autoplay loop><source src=" /resource/42/427FC2-3485-4ABD-89AC-FABF27939D50/N8Va-9uzBch3an9X.mp4 " type="video/mp4"></video>

매크로.. vim에 어느정도 익숙하신 분들은 종종 사용하실 텐데 이게 엑셀에서 사용자 입력 녹화하는 거랑 똑같은 기능. 매크로를 쓰면 엄청 편리한데, `'<,'>` 로 범위로 매크로를 지정하는 방법을 알게 되면 훨씬 편리하게 사용할 수 있다. 정말 온갖 것을 할 수 있음. 

매크로에 대해 더 얹어보자. 매크로로 무엇을 할 수 있나? 정말 어마어마하게 많은 것을 할 수 있는데... 뭘 예로 들까 하다가 vim 매크로와 정규식을 사용해 소수 목록을 만드는 과정을 영상으로 찍어 봤다. 초반에 숫자 목록 만드는 게 vim macro. 이거 가끔 회사 동료들에게 보여주면 인기가 좋다..

<video controls muted autoplay loop><source src=" /resource/42/427FC2-3485-4ABD-89AC-FABF27939D50/TG43DiO0epVGP2V1.mp4 " type="video/mp4"></video>

참고로 여기 사용한 트릭은 1진법을 사용해 정규식으로 합성수를 골라내서 vim의 g 명령으로 d 를 보내 합성수 라인만 삭제한 것.

[[/regex/prime-number]]

## i 반복

어제 이야기에 이어서. 가끔 `--------` 같은 걸 쭉 길게 코드에 적을 때가 있죠. (나중에 지운다 하더라도) 이게 사실 손가락을 꾹 누르고 있어야 하는 끔찍한 단순노가다인데 그냥 넘어가는 경우가 있을 겁니다. 그럴 땐 그냥 반복횟수i를 쓰면 끝.

`50i-<Esc>` 하면 `-`로 가득한 한 줄이 만들어짐.

<video controls muted autoplay loop><source src=" /resource/42/427FC2-3485-4ABD-89AC-FABF27939D50/u-jnOIDP-TR0gF6N.mp4 " type="video/mp4"></video>

이번엔 `-` 하나를 입력하고 49. 를 하는 방법.

<video controls muted autoplay loop><source src=" /resource/42/427FC2-3485-4ABD-89AC-FABF27939D50/ttvzPd4ISc9aCStX.mp4 " type="video/mp4"></video>

여기에 보너스 하나를 더 얹자면 이런 방법도 가능. read 명령을 써서 외부 프로그램 호출의 표준 출력을 가져다 붙인다.

<video controls muted autoplay loop><source src=" /resource/42/427FC2-3485-4ABD-89AC-FABF27939D50/KikJ5b8wQWIrDtYS.mp4 " type="video/mp4"></video>

그러면 vim 커맨드라인에서만 될 거 같은데... 그런데 말입니다(정색). visual mode로 선택한 텍스트를 표준 입력으로 ! 명령에 밀어넣는 방법이 있습니다. `-` 를 50번 반복하는 명령을 python3로 실행하고, 곧바로 node.js 로 실행하는 걸 찍어 봤습니다.

<video controls muted autoplay loop><source src=" /resource/42/427FC2-3485-4ABD-89AC-FABF27939D50/xuJ48njcIVpejT2F.mp4 " type="video/mp4"></video>

이번엔 매크로를 써봅시다. `-` 한 글자를 입력해주는 매크로를 만들고 49회 반복하기. q 매크로에 `-` 하나를 입력하는 과정을 알려준 다음, 49회, 300회 반복해봤음.

<video controls muted autoplay loop><source src=" /resource/42/427FC2-3485-4ABD-89AC-FABF27939D50/MgF5hykdCiDmV7L3.mp4 " type="video/mp4"></video>

그렇다면 q매크로 내용도 볼 수 있느냐? 볼 수 있습니다. 사실 매크로는 레지스터에 저장된 값을 vim이 normal 모드로 순서대로 실행하는 기능일 뿐. 레지스터를 복붙용으로 쓰면 문자열을 평가하지 않고 에디터에 붙여넣는 거고, 매크로로 쓰면 eval을 하는 거죠. 방금 만든 q 매크로는 그냥 `i-^[` .

![reg q]( /resource/42/427FC2-3485-4ABD-89AC-FABF27939D50/FPTi4rWVIAUsKDQ.png )

