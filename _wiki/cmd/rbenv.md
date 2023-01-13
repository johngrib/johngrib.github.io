---
layout  : wiki
title   : rbenv
summary : Ruby environment를 관리한다
date    : 2023-01-12 23:45:27 +0900
updated : 2023-01-13 12:46:58 +0900
tag     : ruby bash command
resource: 06/455EB1-6D25-4009-A488-7E198CE9026F
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

```bash
 # rbenv 설치
brew install rbenv ruby-build

 # 설치 가능한 최신 stable 버전 목록을 출력한다
rbenv install -l

 # 설치 가능한 모든 버전을 출력한다
rbenv install -L

 # ruby 3.1.2 버전을 설치한다
rbenv install 3.1.2

 # 이 컴퓨터에서 사용할 ruby 버전을 지정한다
rbenv global 3.1.2
rbenv global system

 # 이 디렉토리에서 사용할 ruby 버전을 지정한다
rbenv local 3.1.2

 # 설치된 버전 확인
rbenv versions
```

## Links

- <https://github.com/rbenv/rbenv >

