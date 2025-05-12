---
layout  : wiki
title   : git rerere
summary : Reuse recorded resolution of conflicted merges
date    : 2025-05-12 20:56:50 +0900
updated : 2025-05-12 21:59:10 +0900
tag     : 
resource: B5/4B0EC8-C7B8-44EB-9DD9-DE2D0B754127
toc     : true
public  : true
parent  : [[/git]]
latex   : false
---
* TOC
{:toc}

## 개요

conflict를 해결했던 방법을 캐시로 남겨서, 중복 발생하는 conflict를 해결할 때 재활용하는 설정이다.

## 사용 방법

`.gitconfig` 파일에 다음과 같이 추가해준다.

```
[rerere]
    enabled = true
    autoUpdate = false
```

- `rerere.enabled` - `rerere` 기능을 활성화한다.
- `rerere.autoUpdate` - 이 값을 `true`로 하면 `rerere`를 통해 conflict를 해결할 때, 해결된 상태를 자동으로 스테이징해준다.
