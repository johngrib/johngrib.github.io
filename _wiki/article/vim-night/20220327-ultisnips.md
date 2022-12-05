---
layout  : wiki
title   : (백업) 아름다운 Vㅏㅁ 2022년 3월 27일
summary : Ultisnips 이야기
date    : 2022-09-12 18:09:35 +0900
updated : 2022-09-12 22:35:22 +0900
tag     :
resource: E6/1B0086-264A-497A-8BCE-D5BE8DECA7E5
toc     : true
public  : true
parent  : [[/article]]
latex   : false
---
* TOC
{:toc}

>
이 글은 2022년 3월 27일 트위터에 쓴 글을 백업한 것입니다.
{:style="background-color: #fff9e4;"}

## 첫 트윗

<blockquote class="twitter-tweet"><p lang="ko" dir="ltr">ultinsips 몇년째 쓰면서 그냥 쓰던대로 쓰다보니 모르는 기능이 좀 있었음. 매뉴얼 정독하고 있는데 참 좋군. 이게 vim에만 있는 게 아니라 vscode나 IntelliJ에서도 돌아갔으면 참 좋았을텐데.</p>&mdash; 기계인간 John Grib (@John_Grib) <a href="https://twitter.com/John_Grib/status/1507882299337023489?ref_src=twsrc%5Etfw">March 27, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Vim 이야기

[[/vim/ultisnips]]{ultisnips} 몇년째 쓰면서 그냥 쓰던대로 쓰다보니 모르는 기능이 좀 있었음. 매뉴얼 정독하고 있는데 참 좋군. 이게 vim에만 있는 게 아니라 vscode나 IntelliJ에서도 돌아갔으면 참 좋았을텐데.

ultisnips의 좋은 점은 바닥부터 시작해서 자신만의 자동완성을 만들며 자신의 코딩스타일을 계속 섬세하게 다듬을 수 있고, 그 과정이 파일로 남는다는 것. 생산성 향상도 상당하지만 무엇보다 재미가 있다.

그에 비하면 IntelliJ의 자동완성은 언어 문법에 맞는 것들만 완성해줘서 좀 심심하다. live templates 은 너무 기본적인 기능만 제공해서 이 용도로 쓰기엔 무리. 내가 모르는 IntelliJ 플러그인이 있을지도 모르겠지만.

새로운 언어를 익힐 때 휑하니 비어 있는 ultisnips 설정 파일을 만들면서 시작하면 자연스럽게 언어를 익히면서 자신만의 자동완성으로 만들어보게 되고, 그렇게 만든 게 해당 언어의 cheatsheet가 된다. vim 안에서 화면 오른쪽에 ultisnips 파일을 열어두고 슥슥 보면서 코딩하는 게 일상.

그러다가 내가 만든 자동완성에 익숙해지면 점점 ultisnips를 안보게 되고, 좀 더 개선할 게 있거나 오늘만 특수한 자동완성이 필요한 경우에만 열어서 만들어 쓰게 되는 방식.

요즘 사용하는 Clojure를 예로 들어보자. 일단 가장 먼저 배우는 것은 함수를 정의하는 `defn`. 이렇게 정의하면.. `(defn`을 입력하고 tab을 누르면 오른쪽 사진처럼 완성된다. 여기까지는 평범한 스니핏 플러그인들도 제공하는 기능이다.

| ![Image]( /resource/E6/1B0086-264A-497A-8BCE-D5BE8DECA7E5/FO0WOnCUYAweIPS.png ) | ![Image]( /resource/E6/1B0086-264A-497A-8BCE-D5BE8DECA7E5/FO0WXy4VEAELL88.png ) |

한동안은 잘 썼지만 코딩을 자꾸 하다 보니 시작할 때 괄호를 입력해야 한다는 게 짜증난다. 왜냐하면 `(` 를 입력할 때에는 쉬프트를 눌러야 하기 때문이다. 그래서 이런 걸 만들었다. `,`를 입력하고 단어를 쓰고 탭을 누르면 `(단어)`로 괄호를 씌워준다. 콤마는 쉬프트를 안 눌러도 되니까.

![Image]( /resource/E6/1B0086-264A-497A-8BCE-D5BE8DECA7E5/FO0XPNYVUAAgMoZ.png )

영상을 올릴려고 하니 트위터가 문제가 발생했다고 영상을 안 받네? 뭐지. 그래서 gif로 변환해서 올림.

`,defn` 입력하고 탭을 누르면 =\> `(defn ..함수내용` 완성.  

<video controls autoplay loop><source src=" /resource/E6/1B0086-264A-497A-8BCE-D5BE8DECA7E5/FO0YbNOVUAAzd8x.mp4 " type="video/mp4"></video>

하나의 `defn` 정의를 쓴 게 아니라 두 개의 자동완성을 연달아 사용한 것이다. 이제 이걸 사용한 응용이 가능해진다. 생각해보면 함수 정의를 항상 저 모양으로 사용하지는 않는다. 경우에 따라 docstring을 안 쓰는 경우도 있다. 그래서 함수 정의를 이렇게 수정했다. docstring이나 args body 제외.

![Image]( /resource/E6/1B0086-264A-497A-8BCE-D5BE8DECA7E5/FO0Y-ghVgAo6UHB.png )

함수 이름은 고정된 이름이 아니라 (재미있게) 걍 현재 시각의 초가 입력되게 했다. 지금이 10시 17분 10초니까 함수 이름이 name10으로 완성. 그런데 args 부분이 사라져서 좀 더 입력해야 하는 불편이 생긴다.  

<video controls autoplay loop><source src=" /resource/E6/1B0086-264A-497A-8BCE-D5BE8DECA7E5/FO0Z3xRVkAYD5A2.mp4 " type="video/mp4"></video>

이제 여기에 하나를 더 추가한다. `defn`에 함수 이름까지 작성된 경우에 펼쳐지는 자동완성. args 를 위한 대괄호를 만들어 주고 그 안에 커서를 놓아준다.

![Image]( /resource/E6/1B0086-264A-497A-8BCE-D5BE8DECA7E5/FO0aLgsVgAMf4-K.jpg )

그러면 이런게 된다. `,defn` 탭 → 괄호 완성 → 함수 이름만 쓰고 탭 → args 입력을 위한 대괄호 자동완성.

단순해 보이지만 세 가지 자동완성의 콤비네이션이다. 탭 탭 탭.

즉 어떤 고정된 폼이 등장할 때마다 탭만 누르면 되도록 자신만의 자동완성 흐름을 만들 수 있다.  

<video controls autoplay loop><source src=" /resource/E6/1B0086-264A-497A-8BCE-D5BE8DECA7E5/FO0bktcUYAY_swp.mp4 " type="video/mp4"></video>

정형화된 코드 모양이 있다면 처음엔 걍 타이핑해서 입력하다가 아 얘네들 비슷하네 하면 바로 만들어서 설정으로 저장. 이건 `fn`과 `let`인데, 둘의 공통점은 바로 다음에 대괄호가 나온다는 것이다. `,fn` 탭 → `(fn` 탭 → `(fn [커서]` 로 완성된다. 탭탭탭. 하나 더 추가해서 대괄호 탈출도 가능하다.

![Image]( /resource/E6/1B0086-264A-497A-8BCE-D5BE8DECA7E5/FO0cCmsVgAAoG8d.png )

그래서 코딩하다가 뭔가 이건 패턴이 비슷한데 싶으면 `\u` 눌러서 ultisnips 설정 파일을 오른쪽에 띄워놓고 스니핏 코딩 시작. 1~2분쯤 걸리는 스니핏 하나 만들어도 엄청난 이득이다. 그렇게 만든 자동완성을 하루종일 쓸 수도 있고, 몇달간 쓸 수도 있다.

해당 언어에서 독특한 문법을 가진 구조가 있어도 나만의 키 타이핑으로 대응 가능하게 만들 수 있다는 점이 매력적. 이건 Java 코드를 Clojure의 java interop 코드로 변환시켜준다. 예를 들어 `"fred".toUpperCase` 를 입력하고탭을 누르면 `(.toUpperCase "fred")` 로 변환해줌.

![Image]( /resource/E6/1B0086-264A-497A-8BCE-D5BE8DECA7E5/FO0c8w0VQAEjDEq.jpg )

이렇게 변환된다.  

<video controls autoplay loop><source src=" /resource/E6/1B0086-264A-497A-8BCE-D5BE8DECA7E5/FO0dln3VgAEMmvU.mp4 " type="video/mp4"></video>

문제는 이런 플러그인이 없는 IntelliJ 자동완성이 너무 맛없게 느껴진다는 거. 새로 만들 수도 있겠지만 이미 vim에는 있어서 그냥 vim을 쓰게 됨.. 

게다가 ultisnips의 무서운 점은 셸 명령을 호출하는 것이 가능하다는 것 = 자신에게 익숙한 언어로 자동완성 기능 하나를 제공하는 프로그램을 만들어서 ultisnips 로 호출 가능. 가령 이런 걸 만들면 셸에 date +%Y.%m.%d 를 보내서 오늘 날짜로 완성해주는데 이게 된다는 건 다 된다는 것.

![Image]( /resource/E6/1B0086-264A-497A-8BCE-D5BE8DECA7E5/FO0esovUcAA7mSg.png )

그래서 vim에서 코딩할 때 요렇게 띄워놓고 한다. 왼쪽에선 코딩, 오른쪽엔 ultisnips 띄워놓고 코딩을 위한 코딩, repl은 eval 할 때마다 팝업으로 뜨니 굳이 계속 안 띄워놔도 되고.

![Image]( /resource/E6/1B0086-264A-497A-8BCE-D5BE8DECA7E5/FO0gC98UcAMbHSX.jpg )

예전에 쓴 글 링크 추가하고 스레드 종료.

- [[/vim/ultisnips]]

## 함께 읽기

- [[/vim/ultisnips]]

## Links

- [Thread reader]( https://threadreaderapp.com/thread/1507882299337023489.html )
