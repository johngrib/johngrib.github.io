---
layout  : wiki
title   : Vimwiki에서 사용하기 위한 나만의 LSP를 만들자
summary : VimEnter 2023 발표자료
date    : 2023-12-17 20:09:06 +0900
updated : 2024-12-15 13:46:20 +0900
tag     : vim vim-enter-발표자료
resource: CE/26FDCD-4282-4257-A2AE-F17EF0A47884
toc     : true
public  : true
parent  : [[/article]]
latex   : false
---
* TOC
{:toc}

## 일러두기

이 글은 2023-12-23에 내가 [VimEnter 2023 모임](https://event-us.kr/vim/event/74978 )에서 발표에 사용한 자료이다.

## 나의 위키

나는 2017년부터 개인용 위키 [johngrib.github.io](https://johngrib.github.io/ )를 운영하고 있으며, 이를 위해 다음과 같은 기술들을 선택해 사용하고 있다.[^wiki-2017]

- Vim, NeoVim
    - 첫 3년은 Vim, 그 이후부터는 NeoVim을 사용하고 있다.
- [Forked Vimwiki]( https://github.com/johngrib/vimwiki )
    - 2022년 2월부터 포크하여 관리중.
- [GitHub Pages]( https://docs.github.com/ko/pages ), [Jekyll]( https://jekyllrb-ko.github.io/ )
    - GitHub에서 무료로, 기본으로 제공한다.
- [[/ctags]]{ctags}, [tagbar](https://github.com/preservim/tagbar )
    - 유서깊은 프로그래밍 도구이며, 이것으로 Vimwiki용 TOC를 만들고 사용하고 있다.
- [johngrib-wiki-lsp](https://github.com/johngrib/johngrib-wiki-lsp )
    - 2023년부터 직접 만들어 사용하고 있는 Vimwiki용 LSP. 이 문서의 주제.

나는 로컬 컴퓨터에서 Vimwiki 플러그인을 설치한 Vim을 사용해 문서를 편집하고, 이를 GitHub repository에 푸시하여 전체 문서를 웹 사이트 형태로 발행하고 있다. 내 관점에서 나의 위키를 위한 기술 선택은 크게 두 가지로 분류할 수 있다.

- 로컬 컴퓨터에서의 편집을 위해 선택한 기술
- 웹 사이트로 보여주기 위해 선택한 기술

이 문서는 '로컬 컴퓨터에서의 편집을 위해 선택한 기술'들 중 가장 최근의 결정인 Vimwiki용 LSP에 대한 내용을 다룬다.

## 왜 Vimwiki용 LSP를 만들기로 결정했나?

### 요약

Vimwiki 문서 링크 기능을 개선하고 싶다.

- 플러그인을 만들 때 Vimscript 와 Lua 둘 다 쓰기 싫다
- Vimscript는 내가 10년 가까이 사용해 온 언어이지만, 정이 들었을 뿐 좋은 언어라고 부르기는 어렵다.
    - 작은 기능은 이미 Vimscript로 충분히 잘 만들어서 쓰고 있다.
        - 그러나 이걸 잘 해봐야 귀찮은 일만 더 생기는 것 같다.
    - [Bram Moolenaar가 올해 8월 3일에 돌아가셨는데](https://www.theregister.com/2023/08/07/bram_moolenaar_obituary/ ), 이 뉴스를 접한 충격과 함께 Vimscript의 미래도 불투명해졌다고 생각했다.
- 그렇다고 Lua를 쓰기도 싫다.
    - Lua는 [[/hammerspoon]] 때문에 예전에는 활발히 사용했지만 여전히 익숙하지 않다.
    - 뭔가 조금씩 헷갈리고 공부하기 귀찮아 시간을 투자하고 싶지 않다.
- LSP 구현체를 만든다?
    - 2023년 3월, 다들 ChatGPT로 뭔가 만드는 데 빠져 있었다. 나도 뭔가 만들고 싶었다.
    - [kotlin-lsp](https://github.com/fwcd/kotlin-language-server )에 대한 아쉬움이 있던 차에 작은 LSP 구현 애플리케이션을 대충으로라도 만들어봐야겠다는 생각이 들었다.
    - LSP는 프로그래밍과 관련된 중요한 기능 대부분을 정의하고 있다.
    - LSP 구현체는 프로토콜만 지키면 되므로 어느 언어로도 만들 수 있다는 점이 바람직하다.
        - Vimscript와 Lua 중에서 고민하지 않아도 된다.
        - 그리고 이미 Microsoft가 vscode를 위해 만들어둔 좋은 라이브러리가 있다.
        - 이 일의 가장 어렵고 짜증나는 부분은 [coc.nvim](https://github.com/neoclide/coc.nvim )가 다 해결해 줄 것 같다.
    - LSP 구현체를 만들어두면 장기적으로도 유용하게 쓸 수 있을 것 같다.
        - 심지어 Vim이 아니라 다른 환경으로 건너가도 사용할 수 있을 것이다.


### Wiki 편집에서 가장 중요한 기능은 다른 문서 링크

위키를 편집할 때 가장 중요하고 빈번히 사용하는 기능은 다른 문서를 링크하는 것이다.
Vimwiki에서 문서를 편집할 때 '다른 문서'를 링크하는 것은 간단하다.
'다른 문서'의 파일명을 입력하고, `Enter`를 누르면 링크가 만들어진다.

문제는 링크하고자 하는 '다른 문서'의 파일명이 떠오르지 않거나, 정확히 기억나지 않을 때이다.

[[/vim/perldo]] 문서를 편집하고 있는 도중에 [[/regex/pcre]] 문서를 링크하고자 한다고 가정하자.

컨텍스트는 다음과 같다.

- 내가 편집중인 문서: `~/johngrib.github.io/_wiki/vim/perldo.md`
- 내가 링크하려는 문서: `~/johngrib.github.io/_wiki/regex/pcre.md`
- PWD: `~/johngrib.github.io/`

문서가 위치하는 경로와 PWD, 목표하는 문서 사이의 경로가 조금씩 다르기 때문에 처리가 꽤나 귀찮다.

#### 해결책: fzf.vim 과 셸 스크립트를 사용한 문서 파일명 완성

[fzf.vim](https://github.com/junegunn/fzf.vim )이나 [telescope.nvim]( https://github.com/nvim-telescope/telescope.nvim )을 사용하면 문서를 편리하고 빠르게 찾을 수 있다.
이 두 플러그인을 잘 응용하면 자동완성 기능으로도 사용할 수 있다.

물론 Vim에서는 디스크의 파일 이름을 완성해주는 `<C-x><C-f>`가 있으므로, [fzf.vim](https://github.com/junegunn/fzf.vim )의 함수를 응용해서 다음과 같은 Vimscript를 사용할 수도 있다.

```vimscript
inoremap <expr> <c-x><c-k> fzf#vim#complete('find ./_wiki -name "*.md"')
```


이를 좀 더 다듬어서 `wiki-docs`라는 이름의 셸 스크립트를 만든 다음...

```bash
#!/usr/bin/env bash

find ~/johngrib.github.io/_wiki -name '*.md' \
    | sed -E 's#^.*/_wiki(/.*).md$#\1#'
```

아래와 같이 `fzf#vim#complete` 함수에 넘겨주면, 간단하게 문서의 파일명을 자동완성할 수 있다.

```vimscript
inoremap <expr> <c-x><c-k> fzf#vim#complete("wiki-docs")
```

아래의 영상은 위의 Shell/Vim script를 사용해 이 문서(`/article/vimwiki-lsp`)를 링크하는 과정을 보여준다.

<video controls autoplay loop><source src=" /resource/CE/26FDCD-4282-4257-A2AE-F17EF0A47884/fzf-xk.mp4 " type="video/mp4"></video>

이 기능은 잘 작동했고 적어도 몇일 동안은 충분하다고 느꼈다.

문제는 쓰다 보니 욕심이 생겼다는 건데, `<C-x><C-x>` 같은 키 입력을 하고 싶지 않았다.
물론 `imap`을 사용하므로 INSERT 모드에서의 `<F3>` 같은 키를 정의할 수도 있다.

그러나 내가 정말로 바라는 것은 더 seamless한 경험이었다.
나는 그냥 `/`를 입력하면 관련 문서들에 대한 추천 목록이 나타나길 바랐다.

#### 해결책: Vimwiki용 LSP를 만들어 보자

사실 처음부터 Vimwiki용 LSP를 만들려고 한 것은 아니다.

문제는 이미 거의 해결했다. 미세하게 불편할 뿐 문서 편집은 쾌적했고 충분하다고 느꼈다.

계기는 의외로 ChatGPT를 사용하게 되면서부터였다.

ChatGPT를 통해 잡다한 도움을 받다가 문득 이 대단한 도구를 통해 LSP를 만들어 본다면 꽤나 재미있지 않을까 하는 생각이 들었다.

그래서 먼저 LSP의 기본을 설명하는 문서와 간단한 튜토리얼 문서를 참고해서 기본적인 LSP를 만들어 보았다.

내가 참고한 문서는 다음의 두 가지다.

- [Language Server Protocol Tutorial: From VSCode to Vim (topal.com)](https://www.toptal.com/javascript/language-server-protocol-tutorial )
- [What is the Language Server Protocol? (microsoft.github.io)](https://microsoft.github.io/language-server-protocol/overviews/lsp/overview/ )

간단하게 만든 LSP는 `foo`, `bar`, `baz` 같은 단어를 검사하는 기본적인 기능만을 제공한다.

나는 이 LSP를 Vimwiki용으로 개조하기 위해 ChatGPT와 대화하기 시작했다.

![]( /resource/CE/26FDCD-4282-4257-A2AE-F17EF0A47884/question-0.jpg )
{:style="max-width:450px; border:1px solid grey"}

![]( /resource/CE/26FDCD-4282-4257-A2AE-F17EF0A47884/question-1.jpg )
{:style="max-width:450px; border:1px solid grey"}

ChatGPT가 모든 문제를 해결해준 것은 아니었지만 기본적인 틀을 갖추는 데에는 큰 도움이 되었다.

## 완성된 Vimwiki LSP의 기능들

거의 며칠만에 ChatGPT의 도움을 받아 만든 나의 Vimwiki LSP는 다음과 같은 기능을 제공할 수 있었다.

- 링크할 문서파일의 이름 자동완성
- 링크할 리소스 파일의 경로 자동완성
- 링크에 커서를 올려두면 해당 문서의 제목을 호버링으로 보여줌
- 문서 파일명 rename 기능
- 문서 링크 위에 커서를 올려놓고 해당 문서를 링크하고 있는 다른 문서들의 목록을 보여주기

### 링크할 문서파일의 이름 자동완성

[connection.onCompletion]( https://github.com/johngrib/johngrib-wiki-lsp/blob/77269fb6077c80b33abf4195c58333f8f3ab36fa/index.js#L111 )

`_wiki` 경로 하위에 있는 마크다운 문서들의 경로와 이름을 자동완성해준다.

![]( /resource/CE/26FDCD-4282-4257-A2AE-F17EF0A47884/feature-completion-filename.jpg )

<video controls autoplay loop><source src=" /resource/CE/26FDCD-4282-4257-A2AE-F17EF0A47884/lsp-filename-completion.mp4 " type="video/mp4"></video>

### 링크할 리소스 파일의 경로 자동완성

[connection.onCompletion]( https://github.com/johngrib/johngrib-wiki-lsp/blob/77269fb6077c80b33abf4195c58333f8f3ab36fa/index.js#L112 )

UUID를 살짝 변형한 각 문서의 고유 ID를 이름으로 갖는 디렉토리의 리소스 파일의 경로를 자동완성해준다.

주로 이미지, pdf 파일들이 이에 해당한다.

<video controls autoplay loop><source src=" /resource/CE/26FDCD-4282-4257-A2AE-F17EF0A47884/resource-complation.mp4 " type="video/mp4"></video>


### 링크된 문서의 제목을 호버링으로 보여주기

[documents.onDidChangeContent]( https://github.com/johngrib/johngrib-wiki-lsp/blob/77269fb6077c80b33abf4195c58333f8f3ab36fa/index.js#L66C1-L66C29 )

문서 링크 위에 커서를 올려두면 해당 문서의 제목을 보여준다.


![]( /resource/CE/26FDCD-4282-4257-A2AE-F17EF0A47884/document-name-view.jpg )

### 문서 파일명 rename

[connection.onRenameRequest]( https://github.com/johngrib/johngrib-wiki-lsp/blob/77269fb6077c80b33abf4195c58333f8f3ab36fa/index.js#L125 )

문서의 파일명을 변경한다. 사실 여기에서는 구현이 귀찮아서 셸 스크립트를 만들어 작동하는 것을 확인한 다음, LSP에서 해당 셸 스크립트를 호출하게 하는 방식을 선택했다.

[셸 스크립트 - mv-document.sh]( https://github.com/johngrib/johngrib.github.io/blob/3d7115b1f3e7f55d3574c4f0987c99a3e38bc209/tool/mv-document.sh )

<video controls autoplay loop><source src=" /resource/CE/26FDCD-4282-4257-A2AE-F17EF0A47884/renamer.mp4 " type="video/mp4"></video>

### 선택한 문서를 링크하는 다른 문서들의 목록 보여주기

[connection.onReferences]( https://github.com/johngrib/johngrib-wiki-lsp/blob/77269fb6077c80b33abf4195c58333f8f3ab36fa/index.js#L148 )

일반적인 IDE의 `Show Usage` 같은 기능이라 할 수 있다.

<video controls autoplay loop><source src=" /resource/CE/26FDCD-4282-4257-A2AE-F17EF0A47884/show-usage.mp4 " type="video/mp4"></video>

## 간단 회고

- [johngrib-wiki-lsp](https://github.com/johngrib/johngrib-wiki-lsp )를 만들고 벌써 9개월이 넘게 거의 매일같이 사용하고 있다.
    - 이제는 이게 없으면 불편하다.
    - 새로운 종류의 Vim fork를 쓴다 하더라도 Vimscript 마이그레이션을 안해도 된다는 점이 가장 만족스럽다.
- 나는 코딩하는 것보다 가만히 생각하는 시간을 갖는 걸 더 좋아하는데, 이 프로젝트는 그런 나에게 딱 맞는 프로젝트였다.
    - 사실 Vim을 10년 전에 시작했던 이유도 손가락 통증 때문이었다.
- 미래에는 LSP처럼 특정 플랫폼에 구애받지 않는 기술이 많이 나오면 좋겠다.

## Links

- [What is the Language Server Protocol? (microsoft.github.io)](https://microsoft.github.io/language-server-protocol/overviews/lsp/overview/ )
- [Language Server Protocol Tutorial: From VSCode to Vim (topal.com)](https://www.toptal.com/javascript/language-server-protocol-tutorial )
    - ChatGPT와 대화를 나누기 전에 먼저 읽고 따라해본 튜토리얼이다.
- [johngrib-wiki-lsp를 만들 때 ChatGPT와 대화한 로그 (chat.openai.com)](https://chat.openai.com/share/c7a4dc61-d4c3-4033-a8b2-b147b528ec5c )
    - 대부분 2023년 3월 7일부터 4월 11일까지의 대화이며, 최근 12월 15일에 몇 번 더 대화를 나누었다.

## 주석

[^wiki-2017]: 초기의 기술 선택과 구현에 대해서는 내가 2017년에 작성한 [[/my-wiki]] 문서를 참고할 것.


