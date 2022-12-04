---
layout  : wiki
title   : Neovim에서 Kotlin 코드를 작성하자
summary : 
date    : 2022-10-02 21:04:23 +0900
updated : 2022-10-02 22:02:57 +0900
tag     : 
resource: 8C/9FA53B-3E34-4632-A829-D260F39F01A6
toc     : true
public  : true
parent  : [[/kotlin]]
latex   : false
---
* TOC
{:toc}

## 설치

### kotlin

[[/sdkman]]으로 설치 가능한 버전을 확인하고...

```bash
sdk list kotlin | cat
```

다음과 같이 설치해준다.

```bash
sdk install kotlin 1.7.20
```

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

