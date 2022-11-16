---
layout  : wiki
title   : (백업) 아름다운 Vㅏㅁ 2022년 4월 1일
summary : INSERT MODE 자동완성 이야기
date    : 2022-11-16 22:46:50 +0900
updated : 2022-11-16 23:10:26 +0900
tag     : 
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
<video controls autoplay loop><source src=" /resource/wiki/article/vim-night/20220401-insert-mode/tS33zBZAfBkVIB5j.mp4 " type="video/mp4"></video>
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

![help i_ctrl-x]( /resource/wiki/article/vim-night/20220401-insert-mode/FPQqI8aVsAUkMOJ.jpg )

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

![iabbr 예제]( /resource/wiki/article/vim-night/20220401-insert-mode/FPQvw1gVQAcLlJn.png )

이걸 좀 응용하면 이렇게 자기 이메일 주소라던가.. 뭔가 타이핑할때 가끔 붙여넣을 일이 있는데 일일이 쓰기는 귀찮은 그런 것들을 집어넣게 된다. 하지만 이런거야 있어도 그만 없어도 그만이고, 그때그때 붙여넣어도 되니까 그냥 그런 기능이라 볼 수 있는데.

![email]( /resource/wiki/article/vim-night/20220401-insert-mode/FPQwJmdVEAQcEsT.png )

여기에 끼얹는 옵션이 하나 있다.
`<expr>` 이걸 쓰면 뒤에 오는 식을 표현식으로 보고 vim이 evaluate한 결과를 에디터에 완성해준다. 그리고 이 기능 덕분에 vim은 자신만의 자동완성을 아주 쉽게 만들 수 있는 멋진 플랫폼이 된다. 아래는 내가 쓰고 있는 것들.

![my config]( /resource/wiki/article/vim-night/20220401-insert-mode/FPQwxGcVEAE9rQs.jpg )

쓰는 모습을 찍어봤다. `__time` 부터 `__pwd` 는 vim의 빌트인 펑션을 쓰고, `__branch` 와 `__uuid` 는 system 함수로 셸 명령을 호출한다. 셸 명령을 부를 수 있다는 이야기는 나에게 익숙한 프로그래밍 언어로 나만의 완성 문구를 만들 수 있다는 의미이기도 하다. 인터넷에서 뭘 가져올 수도 있을 거고.

<video controls autoplay loop><source src=" /resource/wiki/article/vim-night/20220401-insert-mode/CcSkwLbeIhkVx6tx.mp4 " type="video/mp4"></video>

내가 설정한 iabbr이 전부 앞에 `_`가 두개씩 있는 이유는 별거 없고 괜히 타이핑하다 의도하지 않은 순간에 iabbr 자동완성이 되기를 바라지 않았기 때문. `__` 정도면 거의 쓸 일이 없으니까 의도적으로 음 오늘 날짜가.. 할 때 `__date` 하고 쓰는 식.

## expression 레지스터

아까 vim의 인라인 자동완성 (iabbr, c-x) 이야기를 죽 했는데, 생각해보니 이 주제로 이야기안한 게 하나가 더 있다. 이것만 이야기하고 오늘 턴을 종료해야지. 별 건 아니고 expression register.

vim의 인서트 모드에서 c-r 을 누르면 레지스터의 값들을 붙여넣을 수가 있는데, 아무래도 c-r 을 누르는게 " 누르는 것보다 미묘하게 더 편해서 보통 붙여넣기를 할 때 인서트 모드 c-r 을 " 보다 조금 더 자주 쓰는 편인 것 같다.

c-r 누르고 a 누르면 a 레지스터의 값들을 붙여넣고, b 누르면 b 레지스터 값들을 붙여넣는데 이게 쉽게 말하자면 직접 관리할 수 있는 복붙공간이 26개 있는 방식이라 vim이 그냥 카피&페이스트를 할 때 상당히 유리하다는 것은 vim 초보들도 많이 알고 있는 사실.

그런데 참 다양한 vim register 중 = 레지스터라는 것이 있다. 레지스터 이름이 알파벳이 아니라 = 등호. 이렇게 해보자. 인서트 모드에서 c-r = 2 + 3 엔터. 그러면 에디터에 5가 나타난다. 그러면 숫자 계산만 되느냐? `=expand('%')` 하면 현재 편집중인 파일 이름으로 완성된다.

글로만 쓰면 심심하니까 영상을 찍었다. 이것도 핵심은 system 명령 호출이 가능하다는 것. 물론 이것만 되는 게 아니라 vimscript 함수도 부를 수 있고... 생각할 수 있는 터미널로 할 수 있는건 대부분 할 수 있다. 만약 해머스푼이랑 연결하면 OS UI도 조작 가능.

<video controls autoplay loop><source src=" /resource/wiki/article/vim-night/20220401-insert-mode/bMjG-9exkJNUPKBK.mp4 " type="video/mp4"></video>

