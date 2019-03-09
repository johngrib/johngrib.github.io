---
layout  : wiki
title   : (문제해결) Mac에서 Node 7 버전으로 다운그레이드
summary : nodejs.org에서 받아서 해결
date    : 2018-02-12 14:52:15 +0900
updated : 2018-02-12 15:09:45 +0900
tag     : trouble-shooting
toc     : true
public  : true
parent  : til
latex   : false
---
* TOC
{:toc}

## 개요

Node 8 버전을 사용하고 있는 상태에서, 다음과 같은 경고 메시지를 보게 되었다.

```
Node Sass could not find a binding for your current environment: OS X 64-bit with Node.js 8.x

Found bindings for the following environments:
  - OS X 64-bit with Node.js 7.x
```

node 7 버전으로 다운그레이드를 해야 하는 모양이다.

## brew로 node 7 설치 시도 - 실패

일단 현재 설치된 node의 버전을 확인해 보았다.

```
$ node --version
v8.9.4
```

node 7 버전을 [[brew]]로 설치하면 되겠지?

그래서 다음과 같이 brew가 node 7을 지원하는지 알아보았다.

```
$ brew search node
==> Searching local taps...
node ✔               node@6 ✔             node@8 ✔             leafnode             libbitcoin-node      llnode               node-build           node@4               nodebrew             nodeenv              nodenv
==> Searching taps on GitHub...
caskroom/cask/node-profiler
==> Searching blacklisted, migrated and deleted formulae...

If you meant "node" specifically:
It was migrated from caskroom/cask to homebrew/core.
```

node@6, node@8은 지원하지만 node@7은 없다.

## nodejs.org에서 다운로드 - 성공

brew로 설치하지 않고 공식 홈페이지에서 받기로 했다.

1. [nodejs.org](https://nodejs.org/en/)로 들어갔다.
2. [다운로드 페이지](https://nodejs.org/en/download/current/ )로 들어갔다.
3. [Previous Releases](https://nodejs.org/en/download/releases/)로 들어갔다.
4. 목록에 Node.js 7.10.1 가 있길래 [Downloads](https://nodejs.org/download/release/v7.10.1/)로 들어갔다.
5. 운영체제/CPU 타입 별로 다운로드 링크가 마련되어 있다. 내게 필요한 것은 Mac 용이니 [node-v7.10.1.pkg](https://nodejs.org/download/release/v7.10.1/node-v7.10.1.pkg)를 다운로드 받았다.
6. pkg 파일을 실행하니 설치 마법사가 나오고 자동으로 설치되었다.

이후 터미널로 돌아가 버전을 확인해 보았다.

```
$ node --version
v7.10.1
```

버전 다운 그레이드에 성공하였고, 문제도 함께 해결됐다.


