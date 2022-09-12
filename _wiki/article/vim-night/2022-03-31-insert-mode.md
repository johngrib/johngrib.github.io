---
layout  : wiki
title   : (백업) 아름다운 Vㅏㅁ 2022년 3월 31일
summary : INSERT MODE 이야기
date    : 2022-09-12 18:46:06 +0900
updated : 2022-09-12 22:28:00 +0900
tag     :
toc     : true
public  : true
parent  : [[/article]]
latex   : false
---
* TOC
{:toc}

>
이 글은 2022년 3월 31일 트위터에 쓴 글을 백업한 것입니다.
{:style="background-color: #fff9e4;"}

## 첫 트윗

<blockquote class="twitter-tweet"><p lang="ko" dir="ltr">그렇지 이것도 올려보자. 코딩하다 화면을 스크롤 할 일이 있으면 선택하는 방법은<br>1. 마우스 휠로 스크롤한다<br>2. 위/아래 커서를 계속 눌러서 제일 윗줄이나 아랫줄로 보내고 계속 누르고 있는다인데, vim에서는 커서를 안 움직이고 줄 단위로 스크롤하는 방법이 있다. &lt;C-e&gt; 랑 &lt;C-y&gt;. <a href="https://t.co/ehmp2HQUjx">pic.twitter.com/ehmp2HQUjx</a></p>&mdash; 기계인간 John Grib (@John_Grib) <a href="https://twitter.com/John_Grib/status/1509526196991668235?ref_src=twsrc%5Etfw">March 31, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 스레드

그렇지 이것도 올려보자. 코딩하다 화면을 스크롤 할 일이 있으면 선택하는 방법은
1. 마우스 휠로 스크롤한다
2. 위/아래 커서를 계속 눌러서 제일 윗줄이나 아랫줄로 보내고 계속 누르고 있는다인데, vim에서는 커서를 안 움직이고 줄 단위로 스크롤하는 방법이 있다. `<C-e>` 랑 `<C-y>`. 

<video controls autoplay loop><source src=" /resource/wiki/article/vim-night/2022-03-31-insert-mode/g-Zg--yS8aejcEr4.mp4 ?tag=12" type="video/mp4"></video>

당연히 숫자 조합이 가능해서, `10<C-e>` 이렇게 해도 된다. 이러면 10줄 아래로 스크롤. 커서를 움직이지 않고도 스크롤을 할 수 있으니 그만큼 쓸데없이 위아래 끝으로 커서를 안 보내도 된다. 사실 `H`, `L`이 있어서 보내기까지가 어려운 건 아닌데, 커서를 원래 위치로 돌려놓는 건 귀찮은 일이니까.

생각해 보니 이 이야기를 안 했군. `<C-e>`와 `<C-y>`를 INSERT 모드에서 하는 방법이 있다. 그것은 바로 `<C-x>`를 먼저 누르는 것. 이 무슨 emacs 같은... 이라 생각할 수 있지만 막상 써보면 편함. `<C-x>`는 한 번만 눌러도 되기 때문이다... 쓰는 김에 영상도 찍어서 올려보자.

insert 모드라도 이렇게 먼저 `c-x` (control x)를 누른 다음이라면 `c-e` `c-y`가 잘 돌아간다. 편집하다가도 위아래 스크롤을 할 필요가 있을 때 하면 된다. 앗 그런데 여기에서 설명할 것들이 분기가 생겨버린다. 하나는 `c-x`이고, 다른 하나는 INSERT 모드에서 NORMAL 명령을 작동하는 방법인데 

<video controls="" autoplay="" name="media"><source src=" /resource/wiki/article/vim-night/2022-03-31-insert-mode/tS33zBZAfBkVIB5j.mp4 ?tag=12" type="video/mp4"></video>

기왕 이야기가 나온 김에 `c-x` 이야기를 먼저 하자. `c-x` `c-e`라니 너무 emacs 같아요! 라고 생각할 수 있지만 아무려면 어떤가 싶다. (난 emacs 잘 모르지만 좋아한다 멋있음)

vim에서 `c-x`의 정식 명칭(?)은 insert expand. vim의 기본적인 자동완성 prefix 중 하나이다. `<C-x><C-f>`를 누르면... 

파일 이름을 자동완성한다. 예를 들자면 `~/.bash` 까지 적고 `<C-x><C-f>`를 누르면 `~/.bashrc` 이렇게 자동완성된다는 것. 물론 후보가 여러개면 후보를 보여준다. 중간 경로도 잘 됨. 타이핑하다가 특정 파일 경로르 자동완성해가면서 쓸 일이 있을 때 편하다. 

그러면 `c-f` 만 있냐 하면 그 외에도 잡다한 것들이 잔뜩 붙어 있다. 그치만 다 외우고 다니지는 않고, 그 중 기억하는 건 `c-f`, `c-y`, `c-e`, `c-l`, `c-]`, `c-o` 정도. 이렇게 이야기하면 앗 그래도 저걸 아 어떻게 알고 다니지 할 수 있는데 각 알파벳을 보면 떠오르는 게 있다. 

`f`는 파일이고, `y`/`e`는 스크롤이고, `l`은 행단위 자동완성이고, `]`는 태그 점프할 때 써먹는 것이니 태그 완성이고, `o`는 omni completion이니까 대강 기억하는 것. 중요한 건 기억하는 게 아니라 이걸 찾아보는 방법인데, vim에서 각 모드별 키스트로크 검색은 규칙이 있다. 

insert mode control x 매뉴얼을 보고 싶다면 이렇게 입력하면 된다.

`:help i_ctrl-x`

그러면 이런 헬프 문서가 열린다. 비슷하게 normal 모드도 검색할 수 있다.

![Image]( /resource/wiki/article/vim-night/2022-03-31-insert-mode/FPQqI8aVsAUkMOJ.jpg )

vim은 help 문서가 아주 잘 되어 있어서, vim에 어느 정도 익숙해졌을 때 구글링보다 헬프 문서를 보면서 더 많이 배우는 느낌이 들었다. 근데 보다보면 좀 아득한 느낌이 드는 게... 양이 장난이 아니다. 예를들어 `:help functions`로 빌트인 함수 매뉴얼을 볼 수 있는데 마지막 라인 넘버가 13049 😅 

그나마 만만한 `:help option-summary`가 7190 라인. 몇 년 전에 이 option-summary를 어디 한 번 끝까지 정독해보자 하고 읽으면서 대강 나한테 필요한 것만 요약한 문서가 바로 이것.

[simple_vim_guide](https://github.com/johngrib/simple_vim_guide/blob/98ddf77a256f3a6fdb42746c5cc834329b4a0f43/md/vimrc.md )

칠천라인이 넘는 설명서를 읽는 건 좀 괴롭긴 했는데 한편으로는 모르던 걸 잔뜩 알게 되었기도 하고, 읽다보니 생각지도 못했던 vim의 동작들도 알게 되어서 좋은 공부가 되었다고 생각. 이런 공부가 vim 바깥으로는 에디터나 이런저런 도구의 UI에 대한 내 감각에도 영향을 줬다고 생각한다. 

그러면 이제 인서트 모드에서 노멀 명령을 실행하는 방법으로 돌아가자. `c-o`가 있다. 인서트 모드에서 이걸 누르면 딱 한번만 노멀 명령을 입력할 수 있는 뭔가 소원을 비는 느낌의 명령. 예를 들어 인서트 모드에서 `c-o` `L`을 누르면 마지막 줄로 점프해서 계속 타이핑을 할 수 있다. 

물론 그냥 esc를 누르고 뭔가 한 다음에 다시 i를 누르고 입력 작업으로 돌아가면 되긴 하는데, 그러면 키를 한 번 더 누르니까... `c-o`를 누르는 것. 쓰고 보니까 키 한 번 누르는 걸 아낀다는 게 되게 구두쇠 같지만 그냥 넘어가자. 

`c-x`를 이야기하며 나왔던 인서트 모드 자동완성으로 돌아가서.. 인서트모드 자동완성 하면 빠뜨릴 수 없는 게 하나 있다. `iabbrev`. 이름을 보면 알겠지만 약어를 확장해주는 기능이고 이걸 잘 써먹으면 오타를 고치거나 축약어를 자동완성해주게 할 수 있는데, 이게 알고 보면 무시무시한 기능. 

이제 이게 왜 무서운 기능인지 알아보자. vim 에서 `iabbr`의 가장 평범한 사용은 이런 것이다. 이렇게 설정하면 타이핑하다가 `wyh` 라고 오타를 내면 `why`로 고쳐주고, `naem`으로 오타를 내면 `name`으로 고쳐준다.

![Image]( /resource/wiki/article/vim-night/2022-03-31-insert-mode/FPQvw1gVQAcLlJn.png )

이걸 좀 응용하면 이렇게 자기 이메일 주소라던가.. 뭔가 타이핑할때 가끔 붙여넣을 일이 있는데 일일이 쓰기는 귀찮은 그런 것들을 집어넣게 된다. 하지만 이런거야 있어도 그만 없어도 그만이고, 그때그때 붙여넣어도 되니까 그냥 그런 기능이라 볼 수 있는데.

![Image]( /resource/wiki/article/vim-night/2022-03-31-insert-mode/FPQwJmdVEAQcEsT.png )

여기에 끼얹는 옵션이 하나 있다. `<expr>` 이걸 쓰면 뒤에 오는 식을 표현식으로 보고 vim이 evaluate한 결과를 에디터에 완성해준다. 그리고 이 기능 덕분에 vim은 자신만의 자동완성을 아주 쉽게 만들 수 있는 멋진 플랫폼이 된다. 아래는 내가 쓰고 있는 것들.

![Image]( /resource/wiki/article/vim-night/2022-03-31-insert-mode/FPQwxGcVEAE9rQs.jpg )

쓰는 모습을 찍어봤다. `__time` 부터 `__pwd`는 vim의 빌트인 펑션을 쓰고, `__branch`와 `__uuid`는 system 함수로 셸 명령을 호출한다. 셸 명령을 부를 수 있다는 이야기는 나에게 익숙한 프로그래밍 언어로 나만의 완성 문구를 만들 수 있다는 의미이기도 하다. 인터넷에서 뭘 가져올 수도 있을 거고. 

<video controls="" autoplay="" name="media"><source src=" /resource/wiki/article/vim-night/2022-03-31-insert-mode/CcSkwLbeIhkVx6tx.mp4 ?tag=12" type="video/mp4"></video>

내가 설정한 `iabbr`이 전부 앞에 `_`가 두개씩 있는 이유는 별거 없고 괜히 타이핑하다 의도하지 않은 순간에 iabbr 자동완성이 되기를 바라지 않았기 때문. `__` 정도면 거의 쓸 일이 없으니까 의도적으로 음 오늘 날짜가.. 할 때 `__date` 하고 쓰는 식.

## Links

- [Thread reader 1]( https://threadreaderapp.com/thread/1509526196991668235.html )
- [Thread reader 2]( https://threadreaderapp.com/thread/1509873426684469251.html )

