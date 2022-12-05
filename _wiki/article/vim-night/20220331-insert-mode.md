---
layout  : wiki
title   : (백업) 아름다운 Vㅏㅁ 2022년 3월 31일
summary : INSERT MODE 이야기
date    : 2022-09-12 18:46:06 +0900
updated : 2022-09-12 23:12:19 +0900
tag     :
resource: 81/185E03-6478-42B3-B5C0-E5C98CFA9AB7
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

## g;

<blockquote class="twitter-tweet"><p lang="ko" dir="ltr">g; 종종 사용하는 명령인데, 이게 있는지 몰라서 안 쓰는 분들을 본 적이 있다. 입력할 때마다 마지막으로 편집한 곳으로 커서를 점프시켜 준다. 물론 숫자 조합도 가능. 3g; 처럼. 반대 방향으로 점프는 g, 를 쓰면 된다. 방금 사용하고 보니 아 이거나 트윗타에 올려볼까 싶어서 올림. <a href="https://t.co/105jESUAyw">pic.twitter.com/105jESUAyw</a></p>&mdash; 기계인간 John Grib (@John_Grib) <a href="https://twitter.com/John_Grib/status/1509183787954933766?ref_src=twsrc%5Etfw">March 30, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

`g;` 종종 사용하는 명령인데, 이게 있는지 몰라서 안 쓰는 분들을 본 적이 있다. 입력할 때마다 마지막으로 편집한 곳으로 커서를 점프시켜 준다. 물론 숫자 조합도 가능. `3g;`처럼. 반대 방향으로 점프는 `g,`를 쓰면 된다. 방금 사용하고 보니 아 이거나 트윗타에 올려볼까 싶어서 올림.

<video controls autoplay loop><source src=" /resource/81/185E03-6478-42B3-B5C0-E5C98CFA9AB7/EIeTF2nCO5ToeJiG.mp4" type="video/mp4"></video>

`.`마크가 마지막으로 편집한 위치를 저장하므로, `'.` 하거나 ``` `. ``` 해도 같은 효과를 볼 수는 있음.
근데 `g;`이 IntelliJ에서 되던가 안 되던가... 기억으로는 안됐던 것 같다. 그래서 IntelliJ 에서는 이렇게 설정해서 사용했던 것으로 기억한다. Ideavim에서 제공하는 명령을 호출하는 방식.

![Image]( /resource/81/185E03-6478-42B3-B5C0-E5C98CFA9AB7/FPGzUcUVgAAmWT-.jpg )

이거 언제 추가했더라 하고 깃헙 들어가서 blame 보니 5년 전에 추가한 설정이네. 그래도 그동안 잘 썼다. 쓸 때마다 `g;` 한번 입력했다 안 돌아가서 짜증내며 ``` `. ``` 입력했던 기억이 난다. 으


![Image]( /resource/81/185E03-6478-42B3-B5C0-E5C98CFA9AB7/FPGz7ICVcAcrb95.jpg )

[https://github.com/johngrib/dotfiles/blame/master/.ideavimrc#L97-L98](https://github.com/johngrib/dotfiles/blame/master/.ideavimrc#L97-L98 )

## gi

`g;`과 차이가 좀 있긴 하지만 살짝 비슷한 기능으로 `gi`가 있다. 요걸 쓰면 마지막에 편집한 곳으로 커서를 점프하고 INSERT 모드로 바꿔줌. 가끔 코딩하다가 한참 위에 있는 곳 좀시 보다가 다시 코딩하던 그 곳 그 자리로 돌아가서 타이핑할 때 편함.

<video controls autoplay loop><source src=" /resource/81/185E03-6478-42B3-B5C0-E5C98CFA9AB7/wkor6nUZc491b_2b.mp4" type="video/mp4"></video>

`gi`와 `g;`를 비교하자면 압도적으로 `g;`을 더 많이 씀. `g;`은 스택 기반으로 점프하므로 히스토리를 타고 쭉쭉 이동 가능. `gi`는 따지고 보면 `g;i` 또는 ``` `.i ```와 똑같아서 사실 굳이 알아둘 필요도 없는 명령이긴 하다. 하지만 그럼에도 이걸 쓰는 이유는 3번 누르는 게 묘하게 귀찮기 때문. 걍 `gi`. 

이야기하는 김에 `.`도 얹어보자. vim에서 `.`은 "가장 최근"의 의미를 갖고 있다. 그래서 normal에서 `.`은 방금 한 작업을 반복하는 거고, `'.`는 마지막에 편집한 장소를 기억하는 mark 이고, `".`은 INSERT 모드에서 마지막에 입력한 문자열을 저장하는 레지스터가 된다. 

이제 퇴근했으니 이어서 써보자. 이렇게 `.`은 vim에서 반복의 의미를 갖기 때문에 종종 쓰인다. `3.` 하면 방금 한 걸 세 번 반복. `100.` 하면 100번 반복. 그런데 플러그인을 통한 동작은 이게 잘 안된다. 기본 동작만 반복하기 때문. 그래서 쓰는 게 팀 포프님의 vim-repeat.

[https://github.com/tpope/vim-repeat](https://github.com/tpope/vim-repeat )

반복하면 빠질 수 없는게 `<C-a>`랑 `<C-x>`. `<C-뫄>`가 별거 아니고 `control + 뫄` 를 말하는 것. 즉 `<C-a>`는 컨트롤 a, `<C-x>`는 컨트롤 엑스. vim에서 숫자 위에 커서를 놓고 `<C-a>`를 하면 숫자가 증가하고, `<C-x>`하면 감소한다. 물론 숫자 조합도 가능. `37`위에 커서를 놓고 `1763<C-a>` 하면 `1800`. 

<video controls autoplay loop><source src=" /resource/81/185E03-6478-42B3-B5C0-E5C98CFA9AB7/eDcWlzYVtLNGAa7d.mp4" type="video/mp4"></video>

간단한 덧셈,뺄셈은 vim에서는 `<C-a>`, `<C-x>`로 걍 해버린다. `12423832`에 `1899` 더하는 상황이라면 암산으로 따져서 고쳐도 되겠지만, 나는 이럴 때마다 자신이 미덥지 못하고 좀 자신이 없다. 그래서 그냥 커서를 위에 놓고 `1800<C-a>` 하면 끝. 계산기 열어도 되겠지만 vim에서 되니까 굳이. 

그런데 이걸 쓰다보면 기능이 아깝다. 숫자에 대해서만 돌아가는 게 아깝다. 다른 것도 되면 얼마나 좋을까? 그래서 쓰는 게 [axring](https://github.com/tenfyzhong/axring.vim ) 비슷한 플러그인 여러개가 있지만 난 이거로도 충분해서 이걸 쓴다.

[https://github.com/tenfyzhong/axring.vim](https://github.com/tenfyzhong/axring.vim )

이런 게 된다. `<C-a>`, `<C-x>`로 사전에 설정한 문자열을 회전시킬 수 있음. 만족스럽게도 (편집하고 있는 파일 확장자에 따라) 프로그래밍 언어별로 다르게 설정할 수도 있다. 그냥 글을 쓸 때에도 활용할 곳이 있는데, 월화수목금토일 같은 것도 돌릴 수 있고, 마크다운 헤더도 가능.

<video controls autoplay loop><source src=" /resource/81/185E03-6478-42B3-B5C0-E5C98CFA9AB7/FPKzeE0VUAEUnSh.mp4 " type="video/mp4"></video>

## mark에 대해

<blockquote class="twitter-tweet"><p lang="ko" dir="ltr">쿨한 기능이죠. 한편 복사한 줄로 이동하는 게 왜 두개지? 하는 의문을 갖는 분도 있을 것 같아요. vim mark중에는 이렇게 짝을 이루는 것들이 있습니다. 그리고 여는 쪽이 시작, 닫는 쪽이 마지막을 의미합니다. 즉 &#39;[ 는 복사한 문자열의 시작지점, &#39;]는 복사한 문자열의 끝나는 지점. <a href="https://t.co/Rq5DxYClLW">https://t.co/Rq5DxYClLW</a></p>&mdash; 기계인간 John Grib (@John_Grib) <a href="https://twitter.com/John_Grib/status/1509680082561896449?ref_src=twsrc%5Etfw">March 31, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

쿨한 기능이죠. 한편 복사한 줄로 이동하는 게 왜 두개지? 하는 의문을 갖는 분도 있을 것 같아요. vim mark중에는 이렇게 짝을 이루는 것들이 있습니다. 그리고 여는 쪽이 시작, 닫는 쪽이 마지막을 의미합니다. 즉 `'[`는 복사한 문자열의 시작지점, `']`는 복사한 문자열의 끝나는 지점.

이걸 알아두면 다른 괄호 마크도 같이 이해가 됩니다. 근데 `'(` `')` `'{` `'}` 는 텍스트오브젝트가 있어서 잘 안 쓰고, ``` `<``` ``` `>```는 종종 매우 편리하게 사용할 수 있습니다. 이것이 가장 최근 비주얼 모드로 선택했던 영역의 마크. 마우스 모드를 켜도 돌아갑니다. 드래그해서 선택한 영역을 기억하는거죠. 

이게 무슨 얘기냐면 특정 영역을 선택했다가, 선택을 풀고 다른 거 하다가 ``` `<```를 입력하면 선택했던 영역의 시작점으로 커서가 점프한다는 뜻. 오오 그렇다면 ``` `<v`> ``` 하면 그 영역을 다시 선택할 수 있겠네요? 그렇습니다. 그런데 이렇게 하면 키를 5번 눌러야 하잖아요? 이걸 줄인 것이 `gv`입니다. 

`gv`를 사용하는 모습을 영상으로 찍어 봤습니다.

1. `vip`로 패러그래프 비주얼 모드 선택
2. `L`로 마지막 줄로 이동
3. 아무거나 입력하다가
4. `gv`로 처음 선택한 영역 다시 선택 

<video controls autoplay loop><source src=" /resource/81/185E03-6478-42B3-B5C0-E5C98CFA9AB7/MeXZ2CBuSAp6VPAc.mp4 " type="video/mp4"></video>

비주얼 모드 이야기가 나온 김에 `o` 하나 더 얹어봅니다. NORMAL에서 `o` `O`는 new line을 만드는... 자주 쓰지만 꽤 평범한 기능을 제공하죠. 그런데 VISUAL 모드에서 `o`는 다른 에디터에서는 보기 힘든 기능 하나를 제공합니다. 그것은 바로 선택 영역 내 커서 점프입니다. 범위를 쭉 선택하고 나서 

커서를 옮기면 범위 시작 지점은 못 바꾸고 범위 끝 지점만 바꿀 수 있죠. 그런데 `o`를 누르면 시작 지점으로 커서가 점프해서 시작 지점도 바꿀 수 있게 해줍니다. 다시 `o` 누르면 끝 지점으로 돌아가고... 아 이걸 말로는 설명이 힘든데 영상 찍고 다시 올게요. 

`o`를 사용해서 선택 영역의 시작~끝을 왔다갔다할 수 있고, 만약 블록 비주얼 모드(사각형 선택 모드)라면 `O`를 눌러서 반대편 각으로 이동하는 것도 가능합니다. 

<video controls autoplay loop style="max-width: 100%"><source src=" /resource/81/185E03-6478-42B3-B5C0-E5C98CFA9AB7/5lQJ-JQxkDvD_GTk.mp4 " type="video/mp4"></video>

물론 마우스로 선택했을 때도 `o`가 됩니다. vim에서 `set mouse=a`로 설정해두면 다른 에디터처럼 마우스를 쓸 수 있어요. 전 대체로 키보드를 쓰긴 하지만 그때그때 편하게 쓸 수 있는 건 다 동원하는 편이라 vim에서도 마우스를 설정해놓고 씁니다. 

<video controls autoplay loop style="max-width: 100%"><source src=" /resource/81/185E03-6478-42B3-B5C0-E5C98CFA9AB7/AR5TVrwBqwAAtrcs.mp4 " type="video/mp4"></video>

이 이야기의 시작은 `'[` `']` 그리고 `'<` `'>` 였죠. 이 중에서 비주얼 마크인 `'<` `'>`로 돌아가보죠. 선택한 영역을 기억한다는 건 재선택이 가능하다는 점에서 상당한 매력이 있습니다. 그런데 흥미로운 것은 이 재선택이 눈에 보이지 않는 방식으로도 가능하다는 사실. `'<` `'>`를 `:s`와 쓸 수 있습니다. 

보통 visual 모드로 선택을 한 다음 `:s`로 substitute를 하려 하면 커맨드 라인에 이렇게 나옵니다. 왼쪽의 range 표기를 보면 `'<,'>` 이렇게 나오죠. range에 `'<` `'>`를 쓰고 있다는 것인데, 잘 생각해보면 지금 선택중이 아니어도, 아까 선택한 거라면 `:s`를 사용할 수 있다는 것을 알 수 있습니다.

![Image]( /resource/81/185E03-6478-42B3-B5C0-E5C98CFA9AB7/FPN-hh4VkA4qgs3.png )

아마 보통은 선택을 해놓고 replace를 하려 할 때 바로 `:s`를 쓸 거에요. 근데 뭐 다른 곳에 클릭을 했다던가 해서 선택이 풀리면 아 짜증나 하면서 다시 선택하는 경우가 있죠? vim에서는 걍 `'<`,`'>` 마크를 쓰면 재선택이 필요 없습니다. 아 물론 `gv:s` 해도 되고요.

## INSERT MODE

그렇지 이것도 올려보자. 코딩하다 화면을 스크롤 할 일이 있으면 선택하는 방법은
1. 마우스 휠로 스크롤한다
2. 위/아래 커서를 계속 눌러서 제일 윗줄이나 아랫줄로 보내고 계속 누르고 있는다인데, vim에서는 커서를 안 움직이고 줄 단위로 스크롤하는 방법이 있다. `<C-e>` 랑 `<C-y>`. 

<video controls autoplay loop><source src=" /resource/81/185E03-6478-42B3-B5C0-E5C98CFA9AB7/g-Zg--yS8aejcEr4.mp4" type="video/mp4"></video>

당연히 숫자 조합이 가능해서, `10<C-e>` 이렇게 해도 된다. 이러면 10줄 아래로 스크롤. 커서를 움직이지 않고도 스크롤을 할 수 있으니 그만큼 쓸데없이 위아래 끝으로 커서를 안 보내도 된다. 사실 `H`, `L`이 있어서 보내기까지가 어려운 건 아닌데, 커서를 원래 위치로 돌려놓는 건 귀찮은 일이니까.

생각해 보니 이 이야기를 안 했군. `<C-e>`와 `<C-y>`를 INSERT 모드에서 하는 방법이 있다. 그것은 바로 `<C-x>`를 먼저 누르는 것. 이 무슨 emacs 같은... 이라 생각할 수 있지만 막상 써보면 편함. `<C-x>`는 한 번만 눌러도 되기 때문이다... 쓰는 김에 영상도 찍어서 올려보자.

insert 모드라도 이렇게 먼저 `c-x` (control x)를 누른 다음이라면 `c-e` `c-y`가 잘 돌아간다. 편집하다가도 위아래 스크롤을 할 필요가 있을 때 하면 된다. 앗 그런데 여기에서 설명할 것들이 분기가 생겨버린다. 하나는 `c-x`이고, 다른 하나는 INSERT 모드에서 NORMAL 명령을 작동하는 방법인데 

<video controls autoplay loop><source src=" /resource/81/185E03-6478-42B3-B5C0-E5C98CFA9AB7/tS33zBZAfBkVIB5j.mp4" type="video/mp4"></video>

기왕 이야기가 나온 김에 `c-x` 이야기를 먼저 하자. `c-x` `c-e`라니 너무 emacs 같아요! 라고 생각할 수 있지만 아무려면 어떤가 싶다. (난 emacs 잘 모르지만 좋아한다 멋있음)

vim에서 `c-x`의 정식 명칭(?)은 insert expand. vim의 기본적인 자동완성 prefix 중 하나이다. `<C-x><C-f>`를 누르면... 

파일 이름을 자동완성한다. 예를 들자면 `~/.bash` 까지 적고 `<C-x><C-f>`를 누르면 `~/.bashrc` 이렇게 자동완성된다는 것. 물론 후보가 여러개면 후보를 보여준다. 중간 경로도 잘 됨. 타이핑하다가 특정 파일 경로르 자동완성해가면서 쓸 일이 있을 때 편하다. 

그러면 `c-f` 만 있냐 하면 그 외에도 잡다한 것들이 잔뜩 붙어 있다. 그치만 다 외우고 다니지는 않고, 그 중 기억하는 건 `c-f`, `c-y`, `c-e`, `c-l`, `c-]`, `c-o` 정도. 이렇게 이야기하면 앗 그래도 저걸 아 어떻게 알고 다니지 할 수 있는데 각 알파벳을 보면 떠오르는 게 있다. 

`f`는 파일이고, `y`/`e`는 스크롤이고, `l`은 행단위 자동완성이고, `]`는 태그 점프할 때 써먹는 것이니 태그 완성이고, `o`는 omni completion이니까 대강 기억하는 것. 중요한 건 기억하는 게 아니라 이걸 찾아보는 방법인데, vim에서 각 모드별 키스트로크 검색은 규칙이 있다. 

insert mode control x 매뉴얼을 보고 싶다면 이렇게 입력하면 된다.

`:help i_ctrl-x`

그러면 이런 헬프 문서가 열린다. 비슷하게 normal 모드도 검색할 수 있다.

![Image]( /resource/81/185E03-6478-42B3-B5C0-E5C98CFA9AB7/FPQqI8aVsAUkMOJ.jpg )

vim은 help 문서가 아주 잘 되어 있어서, vim에 어느 정도 익숙해졌을 때 구글링보다 헬프 문서를 보면서 더 많이 배우는 느낌이 들었다. 근데 보다보면 좀 아득한 느낌이 드는 게... 양이 장난이 아니다. 예를들어 `:help functions`로 빌트인 함수 매뉴얼을 볼 수 있는데 마지막 라인 넘버가 13049 😅 

그나마 만만한 `:help option-summary`가 7190 라인. 몇 년 전에 이 option-summary를 어디 한 번 끝까지 정독해보자 하고 읽으면서 대강 나한테 필요한 것만 요약한 문서가 바로 이것.

[simple_vim_guide](https://github.com/johngrib/simple_vim_guide/blob/98ddf77a256f3a6fdb42746c5cc834329b4a0f43/md/vimrc.md )

칠천라인이 넘는 설명서를 읽는 건 좀 괴롭긴 했는데 한편으로는 모르던 걸 잔뜩 알게 되었기도 하고, 읽다보니 생각지도 못했던 vim의 동작들도 알게 되어서 좋은 공부가 되었다고 생각. 이런 공부가 vim 바깥으로는 에디터나 이런저런 도구의 UI에 대한 내 감각에도 영향을 줬다고 생각한다. 

그러면 이제 인서트 모드에서 노멀 명령을 실행하는 방법으로 돌아가자. `c-o`가 있다. 인서트 모드에서 이걸 누르면 딱 한번만 노멀 명령을 입력할 수 있는 뭔가 소원을 비는 느낌의 명령. 예를 들어 인서트 모드에서 `c-o` `L`을 누르면 마지막 줄로 점프해서 계속 타이핑을 할 수 있다. 

물론 그냥 esc를 누르고 뭔가 한 다음에 다시 i를 누르고 입력 작업으로 돌아가면 되긴 하는데, 그러면 키를 한 번 더 누르니까... `c-o`를 누르는 것. 쓰고 보니까 키 한 번 누르는 걸 아낀다는 게 되게 구두쇠 같지만 그냥 넘어가자. 

`c-x`를 이야기하며 나왔던 인서트 모드 자동완성으로 돌아가서.. 인서트모드 자동완성 하면 빠뜨릴 수 없는 게 하나 있다. `iabbrev`. 이름을 보면 알겠지만 약어를 확장해주는 기능이고 이걸 잘 써먹으면 오타를 고치거나 축약어를 자동완성해주게 할 수 있는데, 이게 알고 보면 무시무시한 기능. 

이제 이게 왜 무서운 기능인지 알아보자. vim 에서 `iabbr`의 가장 평범한 사용은 이런 것이다. 이렇게 설정하면 타이핑하다가 `wyh` 라고 오타를 내면 `why`로 고쳐주고, `naem`으로 오타를 내면 `name`으로 고쳐준다.

![Image]( /resource/81/185E03-6478-42B3-B5C0-E5C98CFA9AB7/FPQvw1gVQAcLlJn.png )

이걸 좀 응용하면 이렇게 자기 이메일 주소라던가.. 뭔가 타이핑할때 가끔 붙여넣을 일이 있는데 일일이 쓰기는 귀찮은 그런 것들을 집어넣게 된다. 하지만 이런거야 있어도 그만 없어도 그만이고, 그때그때 붙여넣어도 되니까 그냥 그런 기능이라 볼 수 있는데.

![Image]( /resource/81/185E03-6478-42B3-B5C0-E5C98CFA9AB7/FPQwJmdVEAQcEsT.png )

여기에 끼얹는 옵션이 하나 있다. `<expr>` 이걸 쓰면 뒤에 오는 식을 표현식으로 보고 vim이 evaluate한 결과를 에디터에 완성해준다. 그리고 이 기능 덕분에 vim은 자신만의 자동완성을 아주 쉽게 만들 수 있는 멋진 플랫폼이 된다. 아래는 내가 쓰고 있는 것들.

![Image]( /resource/81/185E03-6478-42B3-B5C0-E5C98CFA9AB7/FPQwxGcVEAE9rQs.jpg )

쓰는 모습을 찍어봤다. `__time` 부터 `__pwd`는 vim의 빌트인 펑션을 쓰고, `__branch`와 `__uuid`는 system 함수로 셸 명령을 호출한다. 셸 명령을 부를 수 있다는 이야기는 나에게 익숙한 프로그래밍 언어로 나만의 완성 문구를 만들 수 있다는 의미이기도 하다. 인터넷에서 뭘 가져올 수도 있을 거고. 

<video controls autoplay loop><source src=" /resource/81/185E03-6478-42B3-B5C0-E5C98CFA9AB7/CcSkwLbeIhkVx6tx.mp4" type="video/mp4"></video>

내가 설정한 `iabbr`이 전부 앞에 `_`가 두개씩 있는 이유는 별거 없고 괜히 타이핑하다 의도하지 않은 순간에 iabbr 자동완성이 되기를 바라지 않았기 때문. `__` 정도면 거의 쓸 일이 없으니까 의도적으로 음 오늘 날짜가.. 할 때 `__date` 하고 쓰는 식.

## Links

- [Thread reader - g;]( https://threadreaderapp.com/thread/1509183787954933766.html )
- [Thread reader - gi]( https://threadreaderapp.com/thread/1509341951488757765.html )
- [Thread reader - mark]( https://threadreaderapp.com/thread/1509680082561896449.html )
- [Thread reader - scroll]( https://threadreaderapp.com/thread/1509526196991668235.html )
- [Thread reader - insert mode]( https://threadreaderapp.com/thread/1509873426684469251.html )

