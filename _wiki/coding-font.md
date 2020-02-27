---
layout  : wiki
title   : 코딩 폰트
summary : 내가 선호하는 코딩 폰트를 기록한다
date    : 2017-12-01 06:02:30 +0900
updated : 2020-02-27 18:28:34 +0900
tag     : font config
toc     : true
public  : true
parent  : [[my-lifehack]]
latex   : false
---
* TOC
{:toc}

## Meslo LG

내가 가장 선호하는 코딩 폰트는 **Meslo LG**.

2016년부터 지금까지 이 폰트만 계속 사용해왔다.

* Apple의 Menlo Regular 를 커스터마이즈한 코딩 폰트.
* Line Gap 이라는 독특한 컨셉이 있다.
    * "LG"가 "Line Gap"을 의미한다. 이 폰트의 최고 매력이다.

터미널 Vim에서 보기 좋고 눈이 편한 폰트라고 생각한다.

다음은 **Meslo LG M DZ Regular Nerd Font Complete Mono 14 pt.** 로 설정한 터미널 Vim 에서 간단한 코드를 열고 스크린샷을 찍은 것이다.

![vim에서 코드를 편집하는 모습]( /post-img/coding-font/meslo-vim-example.png )


### Line Gap

내가 이 폰트를 좋아하는 이유가 바로 이 Line Gap 컨셉 때문이다.

Meslo LG 는 다음과 같이 다양한 폰트의 패키지가 제공된다.

* Meslo LG S: 행간이 좁음
* Meslo LG M: 행간이 중간 정도
* Meslo LG L: 행간이 넓음

다음 세 이미지는 내 터미널의 설정을 변경해가며 찍은 스크린샷이다.

| Meslo LG S | Meslo LG M | Meslo LG L |
|------------|------------|------------|
| ![][lgs]   | ![][lgm]   | ![][lgl]   |

이 폰트를 쓰기 전의 나는 터미널이나 이런저런 에디터의 기본 행간이 너무 좁아서 눈이 아프다고 느껴왔었다.

그래서 매번 새롭게 설치를 할 때마다 폰트 설정에 들어가서 행간을 1보다 넓게 설정해주는 귀찮은 일을 해야 했다.

그러나 Meslo LG 를 사용하면 굳이 그럴 필요가 없다. 그냥 LG M 을 사용할지, LG L 을 사용할지만 선택하면 됐기 때문이다.


### Meslo LG 폰트를 설치하기

Meslo LG 폰트는 다음 경로에서 얻을 수 있다.

* [github.com/andreberg/Meslo-Font][meslo-font]
* [ryanoasis/nerd-fonts][nerd-fonts]

나는 다양한 기능이 추가된 nerd font 를 사용하는 것을 선호한다.

Meslo LG 폰트 하나만 필요하다면 다음 경로에서 다운받는 것이 심플하다.

[nerd-fonts/patched-fonts/Meslo][nerd-meslo]

나는 찾아 들어가기 귀찮아서 그냥 `git clone`을 한다.

```sh
git clone git@github.com:ryanoasis/nerd-fonts.git --depth 1
cd nerd-fornts/patched-fonts/Meslo
```

그런데 이 안에 들어 있는 폰트가 엄청나게 많다.

```sh
$ find nerd-fonts/patched-fonts/Meslo -name '*.ttf' | wc -l
      96
```

96 개나 된다.

그런데 이건 여러 특징이 조합된 결과이므로, 자신에게 필요한 조건을 갖는 폰트를 선택해서 쓰면 된다.

아마도 모든 조합이 있으므로 원하는 조건 조합이 없는 경우는 없을 것이다.

| 조건          | 옵션                  | 설명                                                          |
|---------------|-----------------------|---------------------------------------------------------------|
| 행간 높이     | L, M, S               | 폰트의 높이                                                   |
| 스타일        | Regular, Bold, Italic | 기본 스타일                                                   |
| 점이 있는 0   | Dotted Zero(DZ)       | 숫자 0 한복판에 점이 찍혀 있음                                |
| Nerd Font     | Nerd Font(NF)         | 터미널에서 재미있는 표현을 하기 위한 특수문자가 포함되어 있음 |
| 모노스페이스  | Mono                  | 고정폭 폰트                                                   |
| 윈도우즈 호환 | Windows Compatible    | 윈도우즈 OS에서도 사용할 수 있다.                             |

### 선택하는 방법 예제 1

만약 나에게 필요한 폰트의 조건이 다음과 같다면,

| 조건                                                    | 옵션                 |
|---------------------------------------------------------|----------------------|
| 행간 높이는 중간 정도면 좋겠다.                         | `LG M`               |
| 터미널에서의 풍부한 표현을 위해 Nerd Font 를 쓰고 싶다. | `Nerd Font`          |
| 윈도우즈 호환이 되었으면 좋겠다.                        | `Windows Compatible` |

다음을 설치하면 된다.

* **Meslo LG M Regular Nerd Font Complete Windows Compatible.ttf**

### 선택하는 방법 예제 2

만약 필요한 폰트의 조건이 다음과 같다면,

| 조건                                                         | 옵션                        |
|--------------------------------------------------------------|-----------------------------|
| 행간 높이가 높으면 좋겠다.                                   | `LG L`                      |
| 숫자 `0` 과 알파벳 `O`가 잘 구분되었으면 좋겠다.             | `DZ`                        |
| 코딩 가독성을 위해 모노스페이스가 쓰고 싶다.                 | `Mono`                      |
| Vim의 에어라인과 Tmux 테마 등을 위해 Nerd Font 가 쓰고 싶다. | `Nerd Font`                 |
| 윈도우즈는 안 써서 윈도우즈 호환이 필요 없다.                |                             |
| Italic, Bold, Regular 가 모두 필요하다                       | `Italic`, `Bold`, `Regular` |

다음의 세 폰트를 설치하면 된다.

* **Meslo LG L DZ Regular Nerd Font Complete Mono.ttf**
* **Meslo LG L DZ Bold Nerd Font Complete Mono.ttf**
* **Meslo LG L DZ Italic Nerd Font Complete Mono.ttf**

### 나의 설정

* Terminal(Mac): **Meslo LG M DZ Regular Nerd Font Complete Mono 14 pt.**

* IntelliJ IDEA
    * [X] Show only monospaces fonts
    * Primary font: **MesloLGLDZ Nerd Font Mono**
    * Size: 12
    * Line Spacing: 1.0
    * [ ] Secondary font: 지정 안함
    * [ ] Enable font ligatures
        * `!=`를 &#8800; 처럼, `=>`를 &#8658; 처럼 표기하는 방식을 말한다.
        * **나는 ligature 옵션을 싫어해서 항상 꺼둔다**. column이 중요한 Vim에선 묘하게 헷갈리기 때문.



[meslo-font]: https://github.com/andreberg/Meslo-Font
[nerd-fonts]: https://github.com/ryanoasis/nerd-fonts
[nerd-meslo]: https://github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts/Meslo
[lgl]: /post-img/coding-font/lgl.png
[lgm]: /post-img/coding-font/lgm.png
[lgs]: /post-img/coding-font/lgs.png
