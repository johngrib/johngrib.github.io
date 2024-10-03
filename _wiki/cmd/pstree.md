---
layout  : wiki
title   : pstree
summary : 프로세스 부모 자식 관계를 트리 형태로 보여준다
date    : 2024-10-03 22:57:07 +0900
updated : 2024-10-03 23:07:10 +0900
tag     : 
resource: 8A/4EDE01-D546-4D4D-84DE-3D3BE7190495
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## 설치

```bash
brew install pstree
```

## Examples

다음과 같이 실행하는 것으로 모든 프로세스의 부모 자식 관계를 트리 형태를 볼 수 있다.

```bash
pstree
```

## Options

```bash
$ pstree -l1
-+= 00001 root /sbin/launchd
```

- `-l` : 레벨을 지정한다.
    - `-l1`은 1레벨만 보여주므로, `pid`가 `00001`인 `/sbin/launchd`만 출력되었다.
    - `-l2`는 2레벨까지 보여준다.

```bash
$ pstree -p 00644
-+= 00001 root /sbin/launchd
 \-+= 00644 johngrib /Applications/Google Chrome.app/Co...
   |--- 00694 johngrib /Applications/Google Chrome.app/...
   |--- 00695 johngrib /Applications/Google Chrome.app/...
   |--- 00703 johngrib /Applications/Google Chrome.app/...
   |--- 00717 johngrib /Applications/Google Chrome.app/...
   |--- 00721 johngrib /Applications/Google Chrome.app/...
   |--- 00722 johngrib /Applications/Google Chrome.app/...
   |--- 00724 johngrib /Applications/Google Chrome.app/...
```

- `-p` : pstree가 출력할 `pid`를 지정한다.
    - `-p 00644`인 프로세스의 부모 자식 관계를 보여준다.

```bash
$ pstree -s Chrome
-+= 00001 root /sbin/launchd
 |-+= 00644 johngrib /Applications/Google Chrome.app/Co...
 | |--- 00694 johngrib /Applications/Google Chrome.app/...
 | |--- 00695 johngrib /Applications/Google Chrome.app/...
 | |--- 00703 johngrib /Applications/Google Chrome.app/...
 | |--- 00717 johngrib /Applications/Google Chrome.app/...
 | |--- 00721 johngrib /Applications/Google Chrome.app/...
 | |--- 00722 johngrib /Applications/Google Chrome.app/...
 | |--- 00724 johngrib /Applications/Google Chrome.app/...
 | |--- 00797 johngrib /Applications/Google Chrome.app/...
 ```

- `-s` : pstree가 출력할 프로세스 이름을 지정한다.
    - `-s Chrome`: 이름에 `Chrome`이 들어가는 프로세스의 부모 자식 관계를 보여준다.
    - 대소문자를 가리므로 주의할 것.

## 함께 읽기

- [[/cmd/ps]]
- [[/cmd/kill]]
- [[/cmd/killall]]

