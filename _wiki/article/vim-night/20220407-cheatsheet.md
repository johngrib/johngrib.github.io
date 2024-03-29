---
layout  : wiki
title   : (백업) 아름다운 Vㅏㅁ 2022년 4월 7일
summary : cheat sheet 이야기
date    : 2022-12-28 12:00:38 +0900
updated : 2022-12-28 12:13:21 +0900
tag     : vim
resource: FA/732470-2227-44C5-84EE-5BB9E6E97FCB
toc     : true
public  : true
parent  : [[/article]]
latex   : false
---
* TOC
{:toc}

>
이 글은 2022년 4월 7일 트위터에 쓴 글을 백업한 것입니다.
{:style="background-color: #fff9e4;"}

<blockquote class="twitter-tweet"><p lang="ko" dir="ltr">벌써<br>Vㅏ<br>ㅁ 이군요...</p>&mdash; John Grib (@John_Grib) <a href="https://twitter.com/John_Grib/status/1512049540135747584?ref_src=twsrc%5Etfw">April 7, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ko" dir="ltr">오늘 밤에는 내가 이런 vim cheatsheet를 안 좋아하는 이유를 이야기해보자. <a href="https://t.co/9LF3dUWlKi">pic.twitter.com/9LF3dUWlKi</a></p>&mdash; John Grib (@John_Grib) <a href="https://twitter.com/John_Grib/status/1511874950855946244?ref_src=twsrc%5Etfw">April 7, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

- [unroll link](https://threadreaderapp.com/thread/1512049540135747584.html )

## Vim cheatsheet?

벌써  
Vㅏ  
ㅁ 이군요...

오늘 오전에 언급한 cheat sheet 이야기를 해보겠습니다. 저는 치트시트를 꽤 좋아하는 편인데요, 예를 들어 제 홈페이지는 거대한 치트시트 컨셉으로 운영하고 있는 공간이기도 합니다. 그런데 vim 치트시트는 별로 좋아하지 않습니다.

이때 중요한 건 제가 좋아하지 않는다는 거지, 다른 사람들도 좋아하면 안된다는 게 아닙니다! 누군가는 이 치트시트를 매우 공들여서 만들었을 거고, 도움을 받은 사람들도 많을 겁니다. 제가 좋아하지 않는 건 개인적인 취향 때문이고, 누군가가 엄청 좋아한다 해도 저는 이해할 수 있습니다.

제가 좋아하지 않는 이유는 아주 심플한데요, 이 치트시트를 보고 있다 보면... 마치 암기과목처럼... 보인다는 것입니다. 치트시트 모양을 가만히 살펴보면 약간 주기율표처럼 보입니다. 물론 주기율는 짱이고 보기만 해도 즐겁죠. 게다가 저는 멘델레예프를 존경해요.

제가 생각하는 문제는 주기율표가 아니라 주기율표처럼 보인다는 것입니다. 그래서 이 표를 모니터 옆이건 벽이건 붙여놓고 달달 외워야 할 것 처럼 생겼죠. vim을 켜놓고 표를 슥 보고 음 이건 w... 하고 키보드 위에서 w를 찾아서 누르고 뭐 그런 행동이 연상되죠.

외워야 할 게 많은 것처럼 보이게 합니다. 그러면 외워야 할 게 많은 게 아니란 말이냐? 하면 할 말은 없네요. 네.. 외울 게 많긴 합니다.. 그런데 외울 게 많다고 해서 꼭 저렇게 외울 필요는 없잖아요?! 나중에 공부에 맛들이면 아 학교에서 그렇게 안 가르쳤으면 나도 이 과목을 좋아했을 거야 같은 생각을 하는 사람들도 있으니까, vim을 처음 접할 때 저런 무시무시한 치트시트보다 간단한 명령들의 조합으로 시작하면 어떨까 하는 생각을 종종 합니다. 저는 vim 명령이 일종의 언어라고 생각하는 사람이기도 하고, 초보가 실제로 알아야 하는 것이 훨씬 적다고 생각하기도 하거든요.

이 표는 제가 작성한 vim 초보에게 권장하는 vim 치트시트입니다. 아 지금 보니 Esc가 빠져 있긴 하네요. 그치만 제 트윗을 보시는 분들은 Esc는 알고 계실 거라 생각하고 넘어가죠.

![내가 작성한 간단한 치트시트]( /resource/FA/732470-2227-44C5-84EE-5BB9E6E97FCB/209750675-77243f9b-8a7c-4bf9-9791-1019ccbec04f.png )

`d`는 삭제입니다. `w`는 단어죠. 그래서 `dw`는 "삭제해라 단어를" 이 됩니다. (사실 `w`보다는 `aw`나 `iw`가 단어이긴 하지만 넘어가죠)

이제 여기에 숫자를 붙여봅시다.

- `3dw` 세번 해라. 단어 삭제를.

이제 이걸 응용해서 다른 동사나 명사를 붙이면 됩니다.

`y`는 복사죠.

- `3yw` 세번 해라. 단어 복사를.. 
- `3p` 세번 해라. 붙여넣기를.
- `3u` 세 번 해라. 실행 취소를.

이렇게 기본 사용법만 알아두면 새로운 동사를 익힐 때마다 사용할 수 있는 표현의 양이 확확 늘어납니다.

즉 저는 치트시트를 전부 외울 각오로 시작할 필요가 없다고 생각해요. 몇 가지만 알아놓고 표현을 익힌 다음 천천히 하나씩 어휘를 늘려가면 충분하다고 생각합니다. 그래서 vim 치트시트를 보면 좀 갑갑한 느낌이 듭니다. 좀 더 자유롭게 익혀나갈 수 있다면 더 즐겁지 않을까 하는 감각인데, 학습에 대한 이야기이기도 하고 어떤 방식이 바람직한지는 개인마다 의견이 다를 수 있으니 제 생각이 맞는지는 잘 모르겠어요. 

아무튼 저는 암기를 통한 방법보다는 친절한 튜토리얼을 통한 방법이 vim과 친해지는 데 더 좋은 기법이 아닐까 생각하는 사람이다보니 누가 vim 학습에 필요한 자료를 물어보면 `vimtutor`를 권해드리곤 합니다. 이건 사용하기 쉬워요. 터미널에서 `vimtutor`를 치면 끝나죠.

한편 몇 년 전에 vim adventure라는 게임도 나왔길래 잠시 플레이하기도 했지만 좀 아쉬웠어요.
HJKL 조작에 너무 많은 분량을 할당하는 느낌이었는데 제가 스테이지 1을 하다 관뒀기 때문에 이후의 스토리를 몰라서 그런 것일 수도 있습니다.

## Bill Joy와 HJKL

많은 책과 영상들이 vim을 소개할 때 HJKL 이야기를 빠뜨리지 않는데요, 세상 사람들 대부분이 컴퓨터를 사용해 텍스트 편집을 할 때 방향키를 사용하기 때문일 거에요. 그런데 문제는 vim은 vi를 토대로 만들어진 소프트웨어이고, vi 는 우리가 알고 있는 방향키 모양이 갖춰지기 전에 개발됐습니다.

이야기가 나온 김에 vi를 만든 개발자 Bill Joy 이야기를 해보죠. 맛있어 보이는 음료 병을 놓고 행복하게 웃는 모습이 멋있습니다. 제가 존경하는 인물 중의 하나이기도 합니다.

![빌 조이]( /resource/FA/732470-2227-44C5-84EE-5BB9E6E97FCB/209751120-ba910be0-516a-4dac-a78b-1f8be85ad597.png )

그런데 이 분은 Java 와 관련이 깊은 분이기도 합니다. Java를 메인 언어로 사용하는 개발자분들이라면 아마 다들 아실 거에요. 왜냐하면 JLS 저자에... 제임스 고슬링 다음으로 나오는 사람이 이 분이기 때문이죠.

![JLS]( /resource/FA/732470-2227-44C5-84EE-5BB9E6E97FCB/209751156-bba80ec1-5b19-4b5f-b579-06417b236ab6.png )

빌 조이는 굉장한 프로그래머였고, 그의 이름으로 검색해면 엄청나게 멋진 전설적인 일화들이 나오곤 합니다. 심지어 생각지도 못한 책에서 튀어나오기도 해요. 어느날 말콤 글래드웰의 아웃라이어를 읽다가 갑부 천재로 빌 조이가 나와서 깜짝 놀란 적도 있습니다. 아니 이 사람은 vi 개발자라고!

제가 빌조이 위인전을 읽거나 그의 일화들을 줄줄 꿰는 사람은 아니니 그의 대단한 행적들에 대해서는 굳이 언급하지 않도록 하겠습니다. 여기에서는 vi 에 좀 더 집중하도록 해보죠. vi 의 이름이 왜 vi 일까요? 아주 간단한데요, visual editor 의 앞 두글자를 떼어서 vi 라는 이름을 갖게 됐습니다.

근데 이름이 좀 이상하지 않나요? editor 는 다 비주얼하지 않나? 왜 이름이 비주얼 에디터야? 이런 의문이 들 수 있죠.

그런데 말입니다. 이거 1976년에 만들어진 에디터입니다. 그 이전의 에디터들은 "말 그대로 비주얼하지 않거나", "약간.. 비주얼한" 것들이었습니다.

요즘이야 화면 전체에 텍스트를 다 펼쳐놓고 커서를 위아래로 이동하거나 마우스로 커서를 점프시켜가며 편집하는 게 일반적이지만, 그 무렵엔 파일의 여러 줄을 모니터에 띄워놓고 편집하는 도구가... 없다시피 했습니다. 한 줄을 보면서 편집하는 도구는 있었죠.

vi는 파일 내용을 여러줄로 모니터에 띄워놓고 편집할 수 있는 기능을 제공한 최초의 소프트웨어들 중 하나였습니다. visual editor 라는 이름을 가질만한 자격이 있죠. 그땐 아까도 말했지만 우리에게 익숙한 형태의 방향키가 없었고, 빌조이가 사용했다고 하는 ADM-3A 터미널의 키배치는 이랬습니다.

![ADM-3A 키보드]( /resource/FA/732470-2227-44C5-84EE-5BB9E6E97FCB/209751224-5bf029b1-aef0-4eb1-8cd2-4b462a636e9d.png )

HJKL 위에 화살표가... 있는 것이 보입니다. 빌 조이는 아마도 이런 키보드에 맞춰서 vi를 개발했을 겁니다. 다른 키에 방향키가 있었다면 어쩌면 HJKL이 아니라 다른 것을 쓰고 있게 됐을지도 모르겠네요.

아무튼 vi가 탄생했을 무렵엔 지금처럼 자유롭게 커서를 여기저기 옮기며 편집하는 분위기가 아니었고, 명령을 통해 텍스트를 업데이트하는 종류의 작업이 주를 이루었습니다. vi/vim의 NORMAL 명령이 그런 작업에서 온 것이죠.

## Vim 명령의 문법

아니 어쩌다 이야기가 여기까지 갔지... 사실 이 이야기는 unix역사에 좀 관심이 있는 분들이라면 많이들 알고 있는 이야기이긴 한데, 원래 하려던 이야기는 이게 아닙니다. 으어 삼천포입니다. 원래 하려고 했던 이야기로 돌아가죠.

vim의 명령은 일일이 외워야 하는 단축키 조합이 아니라, 특수한 문법 구조를 갖고 있습니다. 그래서 그 문법에 맞춰 끼워넣을 수 있는 표현을 하나씩 익힐 때마다 할 수 있는 것이 많아지죠.

그래서 이 구조에 익숙해지면 몇몇 명령을 제외하고는, 생전 써본 적이 없는 기능도, 이렇게 해보면 되지 않을까? 라고 상상해서 써보면 되는 경우가 있습니다. 이럴 때가 참 즐겁죠. 그리고 여기에서 정말 중요한 것은 사용자 명령을 추가할 때에 있습니다.

보통 우리가 IDE에 새로운 단축키 설정이 필요할 때에는 비어있는 키 조합을 찾으려 합니다. 이 기능은 ctrl+shift+d 가 딱좋은데... 라고 생각했다가 그 조합이 있으면 option이나 alt 를 추가한다던가 그러죠. 그런데 이런 조합은 의미를 알기가 어렵습니다.

사용자 정의 명령을 만들 때 vim이 특히 장점을 발휘한다고 생각합니다. modifier 키 조합이 아니라 연속되는 키 입력으로 기능을 할당할 수가 있기 때문이죠. 매 키 입력으로 인해 분기가 생기기 때문에 기능 후보를 좁혀갈 수 있는 것입니다. 
그래서 vim에서는 이렇게 앞서는 키의 대표격인 키를 leader 로 설정해 사용할 수 있지만, 사실 하나 뿐만 아니라 여러 키를 기능별 leader로 삼아 사용하는 방법을 많이 씁니다. 예를 들어 저는 `F1`을 탐색 leader로 삼습니다. `<F1><F1>`은 파일 탐색을 할 때 쓰고, `<F1><F2>`는 버퍼 탐색을 하고.. 
그런 식이죠. 예를 들어 `s`는 코딩할 때를 위한 특수 키로 사용하고 있는데, 언어별로 다르게 설정해 씁니다. 요즘 쓰는 언어인 Clojure 설정 일부를 올려 봅니다.

![나의 clojure 설정 일부]( /resource/FA/732470-2227-44C5-84EE-5BB9E6E97FCB/209751376-06431dfc-ad73-4715-aa1c-77ff3b40c1e3.png )

뜻을 설명한 문서의 스크린샷입니다. 글자 하나를 타이핑할 때마다 의미가 좁혀지죠. 만약 이 기능들을 ctrl, command, option, shift 조합을 썼다면.. 파악하기 어려웠을 거 같습니다. 전 그냥 언어별 기능이니까.. s, eval을 하려 하니까 e, word니까 w 하는 게 이해하기 좋더라고요.

![clojure 설정에 대한 설명]( /resource/FA/732470-2227-44C5-84EE-5BB9E6E97FCB/209751435-16ed5b64-5fb5-42ba-9bba-dee620fd6916.png )

아우 벌써 11시가 되어가네요. 오늘은 여기까지 하겠습니다.
