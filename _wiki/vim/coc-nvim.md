---
layout  : wiki
title   : coc.nvim
summary : vim을 vscode처럼 사용할 수 있게 도와주는 자동완성 플러그인
date    : 2019-05-16 22:19:50 +0900
updated : 2022-06-19 00:47:07 +0900
tag     : vim
resource: 4F/DD09BC-1FAF-411D-B5BF-23146748331C
toc     : true
public  : true
parent  : [[/vim]]
latex   : false
---
* TOC
{:toc}

## coc.nvim 설치

```viml
Plug 'neoclide/coc.nvim', {'tag': '*', 'do': './install.sh'}
```

## 설치된 플러그인 목록 확인

`~/.config/coc/extensions/package.json` 파일을 확인하면 된다.

다음은 2022-06-19 기준의 내 `package.json` 파일의 내용이다.

```json
{
  "dependencies": {
    "coc-clojure": ">=0.0.4",
    "coc-explorer": ">=0.22.7",
    "coc-go": ">=1.3.0",
    "coc-pyright": ">=1.1.235",
    "coc-ultisnips": ">=1.2.3"
  }
}
```

## Language Server 설치

coc의 랭귀지 서버 설치는 쉽다.

<https://github.com/neoclide/coc.nvim/wiki/Language-servers >를 참고하여 원하는 랭귀지 서버를 설치하면 된다.

예를 들어 clojure 랭귀지 서버의 경우 다음 명령어를 입력하면 자동으로 알아서 설치된다.

```viml
:CocInstall coc-clojure
```

## Ultisnips 와의 연동

나는 나만의 snippet이 많은 편이라 [[/vim/ultisnips]]와의 연동이 중요하다.

<https://github.com/neoclide/coc.nvim/wiki/Using-snippets >

다음과 같이 coc의 ultisnips 플러그인을 설치하는 것으로 연동이 끝난다.

```viml
:CocInstall coc-ultisnips
```

## 문제 해결

### 자동완성 추천이 중복으로 나타나는 문제

설정에 따라 다음 스크린샷과 같이 자동완성 추천이 여러번 중복으로 나오는 경우가 있다.

![중복된 추천 목록]( ./duplicated-suggestions.jpg )

(`mapcat`, `map-entry?`, `map-indexed` 등이 전부 2번씩 나오고 있다)

coc 서비스를 중복으로 사용하고 있는 것이 원인이다.

coc.nvim에도 이슈가 등록되어 있으므로 읽어보도록 하자.

- [Duplicate Suggestions in autocompletion #1824]( https://github.com/neoclide/coc.nvim/issues/1824 ) 

다음 명령을 사용하면 서비스 목록을 볼 수 있다.

```
:CocList services
```

서비스 목록을 보니 `languageserver.clojure-lsp`와 `clojure` 이렇게 두 서비스를 확인할 수 있다.

![서비스 목록이 출력된 모습]( ./coc-services-list.jpg )

- `languageserver.clojure-lsp`: `coc-settings.json`에 정의해둔 [[/clojure/clojure-lsp]] 연동 설정.
- `clojure`: `:CocInstall coc-clojure`로 설치한 [coc-clojure]( https://github.com/NoahTheDuke/coc-clojure ) 플러그인으로 추정.

둘 중 하나를 사용하지 않으면 된다. `languageserver.clojure-lsp`를 삭제하도록 하자. 어차피 둘 다 [[/clojure/clojure-lsp]]를 사용하고 있으므로 똑같을 거라 생각한다.

`:CocConfig` 명령을 입력하면 `coc-settings.json` 파일이 열린다.

```json
{
  "languageserver": {
    "clojure-lsp": {
      "command": "bash",
      "args": ["-c", "clojure-lsp"],
      "filetypes": ["clojure"],
      "rootPatterns": ["project.clj", "deps.edn"],
      "additionalSchemes": ["jar", "zipfile"],
      "trace.server": "verbose",
      "initializationOptions": {
        "ignore-classpath-directories": true
      }
    }
  }
}
```

여기에서 `clojure-lsp` 항목을 다음과 같이 삭제하면 된다.

```json
{
  "languageserver": {
  }
}
```

이제 중복 없이 추천 목록이 나오는 것을 확인할 수 있다.

![중복 없는 추천 목록]( ./normal-suggestions.jpg )


## 함께 읽기

- [[/vim/ultisnips]]

## Links

* <https://github.com/neoclide/coc.nvim >
* <https://github.com/neoclide/coc.nvim/wiki/Language-servers >
* <https://github.com/neoclide/coc.nvim/wiki/Using-snippets >

