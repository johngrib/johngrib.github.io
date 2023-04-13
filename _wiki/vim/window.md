---
layout  : wiki
title   : Vim window
summary : 
date    : 2022-06-19 09:59:02 +0900
updated : 2023-04-13 21:35:52 +0900
tag     : vim
resource: 00/0D174B-6016-4374-BC83-EC17CE44CEE2
toc     : true
public  : true
parent  : [[/vim]]
latex   : false
---
* TOC
{:toc}

## buffer, window, tab

`:help window`로 buffer, window, tab의 정의를 알 수 있다.

>
Summary:
- A buffer is the in-memory text of a file.
- A window is a viewport on a buffer.
- A tab page is a collection of windows.

>
A window is a viewport onto a buffer.  You can use multiple windows on one
buffer, or several windows on different buffers.
>
A buffer is a file loaded into memory for editing.  The original file remains
unchanged until you write the buffer to the file.

buffer는 파일을 메모리에 올려둔 것이다.
- vim에서 파일을 열면 buffer가 만들어진다.
- vim에서 편집하는 것은 파일이 아니라, 파일을 메모리에 로드한 buffer이다.
- vim에서 buffer를 편집하고 저장하면 파일에 덮어씌워진다.

window는 buffer를 사용자에게 보여주는 틀이다.
- window는 높이, 너비, 위치 등의 속성을 갖는다.
- window를 닫아도 buffer는 유지된다.
- window 없이도 buffer가 존재할 수 있다.
    - 여러 buffer를 열어놓고 하나의 window로 돌려가며 편집할 수도 있다.
- 하나의 buffer를 여러 window를 열어놓고 보거나 편집하는 것도 가능하다.

tab은 window의 컬렉션이다.
- tab마다 window의 구성이나 위치 등을 다르게 사용할 수 있다.

예를 들어 파일A, 파일B, 파일C를 버퍼로 올려놓고 편집할 때 다음과 같이 사용할 수 있다.

```ascii-art
tab1
┌────────┬───────┐
│ win 1  │ win 2 │
│ buf A  │ buf B │
├────────┼───────┤
│ win 3  │ win 4 │
│ buf A  │ buf C │
└────────┴───────┘
```

새로운 탭을 만들어서 window 조합을 다르게 구성할 수도 있다.

```ascii-art
tab1               tab2                     tab3
┌───────┬────────┐ ┌───────┬────────┐ ┌───────┬──────────┐
│ win 1 │ win 2  │ │ win 5 │ win 6  │ │ win 8 │ win 9    │
│ buf A │ buf B  │ │ buf A │ buf B  │ │ buf A │ buf B    │
│       │        │ ├───────┤        │ │       ├──────────┤
├───────┼────────┤ │       │        │ │       │ w 10 b B │
│ win 3 │ win 4  │ │ win 7 │        │ │       ├──────────┤
│ buf A │ buf C  │ │ buf C │        │ │       │ w 11 b A │
└───────┴────────┘ └───────┴────────┘ └───────┴──────────┘
```

탭 이동에 따라 화면의 구성만 달라질 뿐이고, 실제로는 A/B/C 파일 세 개를 편집하고 있을 뿐이다.

즉 Vim의 탭은 다른 IDE의 탭과 의미와 용도가 다르다.

Vim의 help를 주의깊게 읽어도 알 수 있는 사실이지만 Vim help가 읽기 어렵다면 다음 글을 읽어보는 것도 괜찮을 것이다.

- [Vim Tab Madness. Buffers vs Tabs]( https://joshldavis.com/2014/04/05/vim-tab-madness-buffers-vs-tabs/ )
- [(번역) Vim의 탭은 그렇게 쓰는 게 아니다. 버퍼와 탭의 사용법]( https://bakyeono.net/post/2015-08-13-vim-tab-madness-translate.html ) 


Vim의 버퍼, 윈도우, 탭은 모두 나름의 기능이 있고, 쓰는 사람이 자신의 취향에 맞게 마음대로 조합해서 쓸 수 있다.

## 나의 사용 방법

나는 tab은 1개만 쓰고, 버퍼와 윈도우만 조작해 사용하는 것을 선호한다.

IntelliJ, Eclipse 같은 IDE 에서 말하는 "탭"을 Vim 식으로 말하자면 윈도우 하나에 버퍼 하나를 할당해 준 것이다.

- 파일을 열 때 윈도우와 버퍼가 함께 열린다.
- 윈도우를 닫으면 버퍼도 닫힌다.

그러나 Vim에서 버퍼와 윈도우는 분리된 개념이다.

- 파일을 열면 파일의 내용이 메모리에 올라간다. 이것을 버퍼라 부른다.
- 윈도우는 높이, 너비, 위치 등을 갖는다.
- 버퍼를 닫아도, 쓰고 있던 윈도우가 다른 버퍼를 보여주게 해서 윈도우를 재활용할 수도 있다.
- 여러 윈도우가 하나의 버퍼를 보여줄 수 있다.
    - 이렇게 했을 때 하나의 윈도우에서 버퍼를 편집하면, 같은 버퍼를 보여주는 다른 윈도우에서도 내용이 같이 변경되는 걸 볼 수 있다.
- 윈도우를 닫아도 버퍼 내용을 날리지 않는다.


## 윈도우 사이즈 조절

### 기본

[여러 파일을 편집하기]( https://github.com/johngrib/simple_vim_guide/blob/master/md/multiple_files.md ) 참고.


### 마우스로도 윈도우 사이즈 조절이 가능하다

터미널 Vim에서도 마우스로 윈도우 사이즈를 조절하는 것이 가능하다.

![]( /resource/00/0D174B-6016-4374-BC83-EC17CE44CEE2/vim-mouse-window-resize.gif )

가로 경계를 움직이는 건 꽤 쉬운데, 세로 경계는 꽤 얇으므로 처음엔 찾기 어려울 수 있다.

### simeji/winresizer

[simeji/winresizer](https://github.com/simeji/winresizer ) 플러그인은 사이즈 조절 모드를 제공한다.

내 경우에는 다음과 같이 `F4`를 윈도우 사이즈 조절 모드 변환 키로 사용하고 있다.

```viml
let g:winresizer_start_key = '<f4>'
let g:winresizer_gui_start_key = '<f4>'
```

`F4`를 누른 다음, `h` `j` `k` `l`을 눌러서 윈도우 사이즈를 조절할 수 있다.

## 윈도우 점프

### 기본

[여러 파일을 편집하기]( https://github.com/johngrib/simple_vim_guide/blob/master/md/multiple_files.md ) 참고.

### vim-choosewin 사용

[t9md/vim-choosewin]( https://github.com/t9md/vim-choosewin )을 사용하면 tmux처럼 윈도우 선택 힌트를 보면서 점프할 수 있다.

나는 다음과 같이 설정해 쓰고 있다.

![vim-choosewin을 사용하는 모습]( /resource/00/0D174B-6016-4374-BC83-EC17CE44CEE2/choosewin.jpeg )


### easymotion 사용

easymotion은 window 점프용은 아니지만 overwin을 사용하면 훌륭한 window 점프 도구가 된다.

![easymotion overwin을 사용한 모습]( /resource/00/0D174B-6016-4374-BC83-EC17CE44CEE2/easymotion-overwin.jpg )

빨간색 힌트 알파벳을 입력하면 해당 라인으로 커서를 보내준다.

```viml
nmap <c-s><c-s> <Plug>(easymotion-overwin-line)
```


