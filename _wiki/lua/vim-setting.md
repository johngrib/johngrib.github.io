---
layout  : wiki
title   : NeoVim에서 Lua 코드를 작성하자
summary : 작성중인 문서
date    : 2023-03-24 22:29:27 +0900
updated : 2023-03-24 22:34:20 +0900
tag     : 
resource: 86/908EDB-0E91-4B89-8B4A-A7A75DC9CF9E
toc     : true
public  : true
parent  : [[/lua]]
latex   : false
---
* TOC
{:toc}

## 환경 설정

### lua-language-server

- [LuaLS/lua-language-server (github.com)](https://github.com/LuaLS/lua-language-server/ )
    - [Getting Started]( https://github.com/LuaLS/lua-language-server/wiki/Getting-Started#command-line )

```bash
 # 간단하게 brew로 설치할 수 있다
brew install lua-language-server
```

### coc-lua

- [josa42/coc-lua (github.com)]( https://github.com/josa42/coc-lua )

```
:CocInstall coc-lua
```

