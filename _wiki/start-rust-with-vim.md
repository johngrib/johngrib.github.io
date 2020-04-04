---
layout  : wiki
title   : Rust 언어를 위한 Vim 설정
summary : 
date    : 2019-12-26 22:41:05 +0900
updated : 2019-12-29 08:46:50 +0900
tag     : rust vim
toc     : true
public  : true
parent  : [[rust]]
latex   : false
---
* TOC
{:toc}

## Rust 설치

```sh
curl https://sh.rustup.rs -sSf | sh
```

이후, `.bash_profile`이나 `.bashrc`에 다음을 추가하자.

```sh
export PATH="$HOME/.cargo/bin:$PATH"
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

[coc.nvim의 위키](https://github.com/neoclide/coc.nvim/wiki/Language-servers#rust )에서는 세 가지 방법을 제안하는데, 나는 첫 번째 방법인 [coc-rls](https://github.com/neoclide/coc-rls/ )를 설치하기로 했다.

설치는 매우 쉬운데, coc.nvim이 설치된 vim에서 다음 명령을 입력하기만 하면 된다.

```
:CocInstall coc-rls
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
