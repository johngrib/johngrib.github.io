---
layout  : wiki
title   : Emacs Cheatsheet
summary : 
date    : 2021-11-12 20:58:35 +0900
updated : 2022-07-20 22:52:01 +0900
tag     : emacs
resource: 1C/75DF1F-FC2C-408B-BE4C-94AA427AA2C1
toc     : true
public  : true
parent  : [[/emacs]]
latex   : false
---
* TOC
{:toc}

## 기본

- `C-x` `C-c`: emacs 종료
- `C-x` `C-w`: 파일 저장
- `C-x` `C-s`: 버퍼 저장
- `C-g`: 실행중인 명령 취소
- `C-h` `b`: 키 바인드 목록 보기

## 커서

- `C-n`: ↓
- `C-p`: ↑
- `C-f`: →
- `C-b`: ←
- `C-a`: Home
- `C-e`: End
- `M-f`: 다음 단어
- `M-b`: 이전 단어

## 선택 모드

Vim의 visual 모드와 비슷하다.

- `C-space`
- `C-@`

모드를 취소하려면 `C-g`를 입력한다.

## 복사, 붙여넣기

선택 모드로 범위를 선택한 다음에 복사하면 된다.

- `M-w`: copy
- `C-w`: cut
- `C-y`: paste

## 삭제

- `C-d`: 한 글자 삭제 (선택 모드일 때에도 한 글자만 삭제한다)
- `C-k`: 커서 위치부터 라인의 마지막까지 삭제 (Vim의 `D`와 같다)

## window

- `C-x` `0`: 창 닫기
- `C-x` `1`: 현재 창만 남기고 나머지 창 모두 닫기
- `C-x` `2`: 현재 창을 위아래로 분할한다. Vim의 `:sp`와 같다.
- `C-x` `3`: 현재 창을 좌우로 분할한다. Vim의 `:vs`와 같다.

## buffer

- `C-x` `k`: 버퍼를 닫는다.

