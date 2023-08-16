---
layout  : wiki
title   : Vim에서 xxd를 이용해 hex값 편집하기
summary : 
date    : 2023-08-16 22:19:06 +0900
updated : 2023-08-16 22:37:09 +0900
tag     : 
resource: 6D/8D8A14-FC3C-4F39-8E0A-56360BE83427
toc     : true
public  : true
parent  : [[/vim]]
latex   : false
---
* TOC
{:toc}

## 사용법

1. vim에서 편집할 파일을 열고, `:%!xxd`를 입력해 [[/cmd/xxd]]를 실행한 결과를 버퍼에 적용한다.
2. hex 값으로 편집한다. hex 값이 아닌 값으로 편집하지 않도록 주의한다.
3. 편집이 완료되면 `:%!xxd -r` 명령으로 일반 보기로 전환한 다음 저장한다.

## 튜토리얼

다음과 같이 test.txt 파일을 만든다.

```bash
echo -e "hello\nworld" > test.txt
```

이후 `vim`에서 `test.txt`를 열고, `:%!xxd`를 입력한다.

![]( /resource/6D/8D8A14-FC3C-4F39-8E0A-56360BE83427/00-opened.png )

그러면 [[/cmd/xxd]]로 읽은 내용이 vim 버퍼에 적용된다.

![]( /resource/6D/8D8A14-FC3C-4F39-8E0A-56360BE83427/01-xxd.png )

이제 편집을 해준다.

16진수 값이 아닌 값으로 편집하지 않도록 주의한다.

vim 기능이 아니라 그냥 `xxd`를 쓰고 있다는 점에 주의한다.

![]( /resource/6D/8D8A14-FC3C-4F39-8E0A-56360BE83427/02-edited.png )

`68`을 `67`로 편집해 주었다.

이때, 변경한 내용으로 저장하면 안된다.
이 상황에서 저장을 하면 보이는 그대로 파일로 저장된다.

hex 형식을 원래 포맷으로 변환한 다음 저장해야 한다.

원래 포맷으로 변환하기 위해 `:%!xxd -r`을 입력하자.

그러면 다음과 같이 `68`(`h`)가 `67`(`g`)로 바뀐 것을 확인할 수 있다.

![]( /resource/6D/8D8A14-FC3C-4F39-8E0A-56360BE83427/03-xxd-r.png )

이제 저장하고 종료하면 된다.

## 함께 읽기

- [[/cmd/xxd]]
