---
layout  : wiki
title   : Neovim에서 Rust 코드를 작성하자
summary : 
date    : 2019-12-26 22:41:05 +0900
updated : 2023-03-11 22:04:09 +0900
tag     : rust vim
resource: 1A/916B19-D820-4038-91A7-112B20469DD0
toc     : true
public  : true
parent  : [[/rust]]
latex   : false
---
* TOC
{:toc}

## Rust 설치

<https://rustup.rs/ >에 방문하거나 다음 명령을 실행한다.

```sh
curl https://sh.rustup.rs -sSf | sh
```

이후, `.bash_profile`이나 `.bashrc`에 다음을 추가하자.

```sh
[[ -s "$HOME/.cargo/env" ]] && source "$HOME/.cargo/env"
```

잘 설치되었는지 확인한다.

```sh
rustc --version
```

## vim 설정

### rust.vim 플러그인 설치

vim을 위한 rust 플러그인이 여럿 있는 것 같지만 나는 일단 [rust.vim][rust-vim]을 사용하기로 했다.

vim-plug를 사용한다면 다음과 같이 `.vimrc`에 추가해 준 다음 설치해주면 된다.

```viml
Plug 'rust-lang/rust.vim'
```

### coc.nvim 을 위한 rust 플러그인 설치

`rust-lang/rust.vim`을 설치했다면 자동 완성과 이런저런 편의 기능을 위해 coc.nvim에 rust 설정을 해 준다.

[coc.nvim의 위키](https://github.com/neoclide/coc.nvim/wiki/Language-servers#rust )에서는 세 가지 방법을 제안하는데,
[coc-rls](https://github.com/neoclide/coc-rls/ )는 deprecated 되었으므로
[rust-analyzer]( https://github.com/rust-lang/rust-analyzer  )를
[coc-rust-analyzer]( https://github.com/fannheyward/coc-rust-analyzer ) 통해 사용하도록 하자.

- rust-analyzer: Rust를 위한 모듈식 컴파일러의 프론트엔드.
- coc-rust-analyzer: coc.nvim에서 rust-analyzer를 사용하기 위한 플러그인.

[coc-rust-analyzer]( https://github.com/fannheyward/coc-rust-analyzer  )를 설치하면 알아서 rust-analyzer도 설치해 준다.

그러므로 coc.nvim이 설치된 vim에서 다음 명령을 입력하기만 하면 된다.

```
:CocInstall coc-rust-analyzer
```

이렇게 하는 것만으로 vim에서 rust와 관련된 자동완성 셋팅이 완료된다.

### coc.nvim 을 위한 rust 포매터 설치

포매터가 필요하다면 coc.nvim이 설치된 vim에서 다음과 같이 coc config 파일을 불러오도록 한다.

```
:CocConfig
```

이후 다음과 같이 `formatOnSaveFiletypes`에 `rust`를 추가해주도록 한다.

```
"coc.preferences.formatOnSaveFiletypes": ["markdown", "rust"],
```

다음은 내 현재 설정의 전문이다.

```json
{
    "suggest.detailField": "abbr",
    "suggest.enablePreview": false,
    "coc.preferences.formatOnSaveFiletypes": ["markdown", "rust"],
    "languageserver": {
        "golang": {
            "command": "gopls",
            "rootPatterns": ["go.mod", ".vim/", ".git/", ".hg/"],
            "filetypes": ["go"]
        }
    }
}
```

### tagbar 설정

[[/ctags]]{Universal ctags}를 쓰고 있다면 'rust-lang/rust.vim' 플러그인이 알아서 tagbar와 함께 작동한다.

## 새로운 프로젝트를 시작하기

새로운 디렉토리를 만들고 이동한 다음, 다음과 같이 입력한다.

```sh
cargo init
```

그러면 다음과 같은 하위 디렉토리와 파일들이 생겨난다.

```ascii-art
.
├── Cargo.lock
├── Cargo.toml
├── src
│   └── main.rs
└── target
```

친절하게 `main.rs` 파일까지 만들어준다.

자동으로 생성된 `main.rs` 파일의 내용은 다음과 같다.

```rust
fn main() {
    println!("Hello, world!");
}
```

만약 디렉토리를 만드는 것이 귀찮다면 `cargo new`를 사용하면 된다.

```sh
cargo new hello_world
```

## Vim에서 실행하기

vim에서 다른 평범한 터미널 명령을 실행하는 방법을 쓰면 된다.

```
:!cargo run 파일명
```

현재 편집중인 파일을 실행하고 싶다면 vim의 % 확장을 쓰면 된다.

```
:!cargo run %
```

만약 현재 `:pwd`가 프로젝트 루트라면(`Cargo.toml`이 있는 위치라면) 그냥 다음과 같이 실행해도 된다.
```
:!cargo run
```

만약 [rust.vim][rust-vim]을 설치했다면 다음 명령을 쓰면 된다.

```
:RustRun
```

[rust-vim]: https://github.com/rust-lang/rust.vim
