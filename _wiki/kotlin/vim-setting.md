---
layout  : wiki
title   : Neovim에서 Kotlin 코드를 작성하자
summary : 
date    : 2022-10-02 21:04:23 +0900
updated : 2023-03-25 13:09:16 +0900
tag     : 
resource: 8C/9FA53B-3E34-4632-A829-D260F39F01A6
toc     : true
public  : true
parent  : [[/kotlin]]
latex   : false
---
* TOC
{:toc}

## 고민과 방황

### 어떤 환경을 쓸 것인가?

- [IntelliJ]( https://www.jetbrains.com/ko-kr/idea/download/ ) + [ideavim]( https://github.com/JetBrains/ideavim )
    - 가장 완벽한 kotlin 개발환경.
    - 하지만 ideavim을 써야 한다는 것이 아쉽다. ultisnips, ctags 등의 사용이 불가능하고 답답하게 IntelliJ에서만 제공하는 자동완성을 써야 한다.
- NeoVim + [coc.nvim]( https://github.com/neoclide/coc.nvim ) + [kotlin-language-server]( https://github.com/fwcd/kotlin-language-server )
    - kotlin-language-server는 너무 기본적인 것만 개발되었고, 기능이 충분하지 못하다. 완벽했던 clojure-lsp가 그립다. README를 읽어보면... 만든 사람도 안 쓴다고 한다. 내가 고쳐가면서 쓸 수도 있겠지만 당장은 곤란하다. 나중에 기여하는 것도 생각해 보자.
    - [Any plan for Supporting Language Server Protocol? (kotlinlang.org)]( https://discuss.kotlinlang.org/t/any-plan-for-supporting-language-server-protocol/2471 )에 올라온 글들을 읽어보면 JetBrains는 LSP 지원은 전혀 고려하지 않는 것 같다. 생각해보면 당연하다. LSP는 JetBrains의 경쟁사 Microsoft의 기술이다.
- NeoVim + [Comrade]( https://github.com/beeender/Comrade ) + [IntelliJ]( https://www.jetbrains.com/ko-kr/idea/download/ )
    - NeoVim과 IntelliJ 사이의 브릿지 역할을 하는 Comrade를 사용하는 방법이다.
    - IntelliJ의 자동완성과 경고 등이 모두 NeoVim에서 잘 작동하며, 당연히 ultisnips와 ctags 등도 잘 작동한다.

### 불만: kotlin-language-server의 완성도

[fwcd/kotlin-language-server]( https://github.com/fwcd/kotlin-language-server )

kotlin-lsp를 사용해보니 아쉬운 점이 많았다.

- `import` 자동완성은 된다.
- 너무 느리다.
- 기능이 빈약하다.
    - 풍부한 기능을 제공하는 다른 언어 LSP들과 대비된다.

이 LSP의 리포지토리에 가보면 [kotlin-lsp의 저자가 2018년 5월 29일부터 Kotlin을 사용하지 않고 있음](https://github.com/fwcd/kotlin-language-server/commit/15357c781b880028822e06d277dee888912eb9c1#diff-b335630551682c19a781afebcf4d07bf978fb1f8ac04c6bf87428ed5106870f5R8 )을 알 수 있다.

>
The original author created this project while he was considering using Kotlin in my work.
He ended up deciding not to and is not really using Kotlin these days though this is a pretty fully-functional language server that just needs someone to use it every day for a while and iron out the last few pesky bugs.
>
이 프로젝트의 원저자는 자신의 업무에 Kotlin 사용을 고려하던 중 이 프로젝트를 만들었습니다.
그는 결국 사용하지 않기로 결정했고, 한동안 매일 사용하고 마지막 몇 가지 성가신 버그를 해결해 줄 사람이 필요한 꽤 완벽한 기능의 언어 서버임에도 불구하고 <mark>요즘에는 실제로 Kotlin을 사용하지 않고 있습니다</mark>.

#### 2017년 기준: JetBrains는 LSP 지원에 관심이 없어 보인다

[Any plan for Supporting Language Server Protocol?]( https://discuss.kotlinlang.org/t/any-plan-for-supporting-language-server-protocol/2471 )

>
We have no plans to support LSP at this time. Instead, we’re focusing on providing the best possible Kotlin development experience in our own IDE, IntelliJ IDEA.

현재로서는 LSP를 지원할 계획이 없습니다. 대신 자체 IDE인 IntelliJ IDEA에서 가능한 최상의 Kotlin 개발 환경을 제공하는 데 집중하고 있습니다.


## 공통 환경 설정
### kotlin 프로그래밍 언어

[[/cmd/sdkman]]으로 설치 가능한 버전을 확인하고...

```bash
sdk list kotlin | cat
```

다음과 같이 설치해준다.

```bash
sdk install kotlin 1.7.20
```

### kotlin-vim

[kotlin-vim]( https://github.com/udalov/kotlin-vim )은 NeoVim에서의 kotlin 편집을 위한 신택스 컬러링, 인덴테이션 등을 제공한다.

```viml
Plug 'udalov/kotlin-vim', {'for': 'kotlin'}
```

## NeoVim + Comrade + IntelliJ

### Comrade 설치

먼저 IntelliJ 플러그인 [Comrade NeoVim](https://plugins.jetbrains.com/plugin/12153-comrade-neovim )을 IntelliJ에 설치한다.

그리고 NeoVim에 플러그인 [Comrade]( https://github.com/beeender/Comrade )를 설치한다.

```viml
Plug 'beeender/Comrade', {'for': 'kotlin'}
```

그래서 Comrade에서 NeoVim을 연결할 때 사용하는 `NVIM_LISTEN_ADDRESS` 환경변수가 NeoVim에서 2022년 5월에 deprecated 되었다는 문제가 있다.
따라서 그냥 실행하면 에러가 발생하며 사용할 수 없다.

이유는 Comrade가 3년 동안 개발이 중지된 프로젝트이기 때문인데, `plugin/init.py`를 다음과 같이 수정해주면 된다.

```python
# NVIM_LISTEN_ADDRESS is deprecated : https://neovim.io/doc/user/deprecated.html
addr = os.getenv("NVIM_LISTEN_ADDRESS")
if addr is None:
    addr = os.getenv("NVIM")
```

이 작업은 Comrade로 [PR](https://github.com/beeender/Comrade/pull/33 )을 보내둔 상태이다.

그리고 마지막으로 `coc-comrade`를 설치해주면 된다.

```viml
:CocInstall coc-comrade
```

## NeoVim + coc.nvim + kotlin-language-server

### kotlin-language-server 설치

[kotlin-language-server의 releases]( https://github.com/fwcd/kotlin-language-server/releases )에서 최신 버전을 다운로드 받아 설치한다.

또는 [[/cmd/brew]]를 사용해 설치해도 된다.

```bash
brew install kotlin-language-server
```

이후 `coc-settings.json`의 `languageserver`에 `kotlin`을 추가한다.

```json
"languageserver": {
    "kotlin": {
        "command": "kotlin-language-server",
        "filetypes": ["kotlin"]
    }
}
```

### kotlin-vim 설치

[github.com/udalov/kotlin-vim]( https://github.com/udalov/kotlin-vim )

```viml
Plug 'udalov/kotlin-vim', {'for': 'kotlin'}
```

위와 같이 `init.vim`에 추가해주고 `:PlugInstall`을 실행한다.

### coc-kotlin 설치

[github.com/weirongxu/coc-kotlin]( https://github.com/weirongxu/coc-kotlin )

```viml
Plug 'weirongxu/coc-kotlin', {'for': 'kotlin', 'branch': 'master', 'do': 'yarn install --frozen-lockfile'}
```

이것도 `init.vim`에 추가해주고 `:PlugInstall` 실행.

## 함께 읽기

- [Kotlin language server in neovim (reddit.com)]( https://www.reddit.com/r/neovim/comments/pq6d29/kotlin_language_server_in_neovim/ )

