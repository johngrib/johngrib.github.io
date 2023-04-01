---
layout  : wiki
title   : 메뉴의 ... (말줄임표, ellipses, 점 3개)
summary : 명령수행 전에 추가적인 정보가 필요한 항목을 표현한다
date    : 2020-04-24 21:58:40 +0900
updated : 2023-04-01 15:07:25 +0900
tag     : ui
resource: AF/C9D131-34F1-4C80-BA2E-D8FBFF90C820
toc     : true
public  : true
parent  : index
latex   : false
---
* TOC
{:toc}

## `…` 기호

- 말줄임표
    - ellipsis (Apple의 Human Interface Guidelines 문서에서 이 표현을 사용한다.[^apple-1])
    - ellipses (Microsoft의 Design Basics 문서에서는 ellipsis와 ellipses 를 함께 사용한다.[^msft-1])
- UI 메뉴 등에서 사용자의 추가 입력이 필요한 경우를 표시할 때에도 쓴다.

| 읽는 방법   | ellipsis, ellipses, horizontal ellipsis, 말줄임표 |
| 유니코드    | 'HORIZONTAL ELLIPSIS' (U+2026)                    |
| HTML entity | `&#8230;`, `&#x2026;`                             |
| UTF-8 (HEX) | `0xE2 0x80 0xA6 (e280a6)`                         |

* [fileformat.info/info/unicode/char/2026]( https://www.fileformat.info/info/unicode/char/2026/index.htm )
* [Ellipsis (wikipedia)]( https://en.wikipedia.org/wiki/Ellipsis )


## 메뉴의 ... 에 대하여

>
윈도우 사용자 인터페이스 설계 사양 및 지침서의 '생략부호'라는 절에 이에 대한 규칙이 있다.
>
전체 내용을 파악하려면 이 지침서를 읽어야겠지만, 요약하면 다음과 같다.
명령어가 수행되기 전에 추가적인 정보를 필요로 할 경우, 생략부호를 사용한다.
정보(About)나 속성(Properties)처럼 대화상자가 명령어 자체인 경우도 있는데, 이들이 비록 대화상자를 표시하기는 하지만 이 대화상자는 결과이다.
반면에, 인쇄(Print...)라는 명령어는 결과에 앞서서 추가적인 정보를 수집하는 대화 상자를 표시한다.
>
-- 윈도우 개발 282 스토리. 1장. 12쪽.

### 확인해보면

윈도우 뿐만이 아니라 MacOS 에서도 같은 원칙이 통용된다.

다음은 MacOS의 터미널이다.

![]( /resource/AF/C9D131-34F1-4C80-BA2E-D8FBFF90C820/terminal.png )

`셸` 탭을 살펴보면 `...`이 있는 메뉴가 6개 있음을 알 수 있다.

- `새로운 명령어...`
- `새로운 원격 연결...`
- `가져오기...`
- `설정 내보내기...`
- `텍스트를 다음으로 내보내기...`
- `프린트...`

모두 해당 메뉴를 선택하면 무언가를 곧바로 실행하지 않고, **무언가를 사용자에게 선택하게 한다**.

파일을 선택하거나, 옵션을 고르는 등의 활동을 하면 그 다음에 할 일을 수행하는 방식이다.

### From: Microsoft - Menus (Design basics)

다음은 [Microsoft의 공식 문서][msft-1]를 인용한 것이다. 번역은 내가 했다.

>
**Using ellipses**
>
While menu commands are used for immediate actions, more information might be needed to perform the action. **Indicate a command that needs additional information (including a confirmation) by adding an ellipsis at the end of the label.**
>
![screen shot of print command and print dialog box]( /resource/AF/C9D131-34F1-4C80-BA2E-D8FBFF90C820/134750169-2dc9e42f-0242-419d-837f-ec188255317d.png )
>
In this example, the Print... command displays a Print dialog box to gather more information.
>
**Proper use of ellipses is important to indicate that users can make further choices before performing the action, or even cancel the action entirely.**
The visual cue offered by an ellipsis allows users to explore your software without fear.
>
**This doesn't mean you should use an ellipsis whenever an action displays another window** only when additional information is required to perform the action.
For example, the commands About, Advanced, Help, Options, Properties, and Settings must display another window when clicked, but don't require additional information from the user. Therefore they don't need ellipses.
>
**In case of ambiguity (for example, the command label lacks a verb), decide based on the most likely user action.**
If simply viewing the window is a common action, don't use an ellipsis.[^msft-1]

메뉴를 선택하면 바로 작업이 시작되곤 하지만, 추가 정보가 있어야 수행할 수 있는 작업도 있을 수 있습니다.
**메뉴 레이블이 끝나는 곳에 말줄임표를 붙여서 추가 정보가 필요한 명령임을 표시하세요.**

이 스크린샷 예제에서 `Print...` 명령을 선택하면 추가 정보를 얻기 위해서 Print 대화 상자를 보여주게 됩니다.

**말줄임표를 적절하게 사용하는 것은 중요합니다. 사용자가 작업을 실행하기 전에 뭔가 선택할 수 있거나 취소할 수 있음을 나타낼 수 있기 때문입니다.**

말줄임표라는 시각적 신호를 통해, 사용자는 이러한 종류의 두려움 없이 여러분이 개발한 소프트웨어를 탐색하며 사용할 수 있습니다.

**그러나 이것이 추가 정보를 얻기 위해 다른 윈도우를 띄워 보여주는 모든 액션에 말줄임표를 쓰는 것이 좋다는 뜻은 아닙니다.**

예를 들어 About(정보), Advanced(고급), Help(도움말), Options(옵션), Properties(속성), Settings(설정)을 클릭하면 다른 윈도우가 나타납니다.
하지만 이렇게 나온 윈도우에서는 사용자의 추가 정보가 필요하지 않으므로 말줄임표도 필요하지 않습니다.

**애매한 경우(예를 들어 명령 레이블에 동사가 없는 경우)에는 가장 가능성이 높은 쪽을 기준으로 결정하세요.**
만약 단순하게 추가 윈도우를 보여주는 것이 일반적인 동작이라면 말줄임표를 사용하지 마세요.


### From: Apple - Human Interface Guidelines

>
**Use an ellipsis whenever choosing a menu item requires additional input from the user.** The ellipsis character (…) means a dialog or separate window will open and prompt the user for additional information or to make a choice.
[^apple-1]

메뉴를 선택할 때 사용자의 추가 입력이 필요할 때마다 말줄임표를 사용하세요.
말줄임표 문자(…)는 대화 상자나 별도의 윈도우가 열리고 사용자에게 추가 정보나 선택을 묻는 메시지가 표시된다는 것을 의미합니다.

## 함께 읽기

- [[special-chars]]

## 참고문헌

- [Human Interface Guidelines (developer.apple.com)][apple-1]
- [Menus (Design basics) (docs.microsoft.com)][msft-1]
- 레이몬드 첸의 윈도우 개발 282 스토리 / 레이몬드 첸 저 / 손광수 역 / ITC / 초판 1쇄 2007년 09월 10일 / 원제 : The Old New Thing: Practical Development Throughout the Evolution of Windows

## 주석

[^apple-1]: [Human Interface Guidelines (developer.apple.com)][apple-1]
[^msft-1]: [Menus (Design basics) (docs.microsoft.com)][msft-1]


[apple-1]: https://developer.apple.com/design/human-interface-guidelines/macos/menus/menu-anatomy/#menu-item-titles
[msft-1]: https://docs.microsoft.com/en-us/windows/win32/uxguide/cmd-menus#using-ellipses

