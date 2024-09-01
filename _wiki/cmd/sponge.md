---
layout  : wiki
title   : sponge 명령어
summary : 
date    : 2024-09-01 15:24:31 +0900
updated : 2024-09-01 16:44:39 +0900
tag     : 
resource: 17/FF1E03-8061-4FF2-B3DC-42D68F933B5F
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## 개요

`sponge`는 [[/cmd/moreutils]] 패키지에 포함된 명령이다.

### sponge : `>` 와 비슷하지만 작동 방식이 다르다 {#sponge}

`>` 리다이렉션의 작동방식을 잘 모른다면 다음과 같은 실수를 할 수 있다.

```bash
 # file.txt 를 읽고 그 내용을 file.txt 에 덮어쓴다.
cat file.txt > file.txt

 # file.txt 의 내용을 정렬하고 중복을 제거한 다음 file.txt 를 업데이트한다.
sort file.txt | uniq > file.txt
```

위와 같이 하면 의도(논리적 순서)와는 달리 `file.txt` 파일이 비어있게 되는데,
명령어 파이프라인에서 `>`는 마지막에 실행되지 않고, 초기화될 때 실행되기 때문이다.

따라서 초기화 단계에서 `file.txt`는 비워지게 되므로 명령어 파이프라인은 의도대로 동작하지 않게 된다.

`sponge`는 이런 경우에 논리적인 순서로 파일이 읽히고 업데이트되도록 해준다.

`sponge`의 실제 동작은 임시 파일을 만들고, 작업이 끝나면 rename을 해주는 방식이다.

## Examples

```bash
 # 의도와는 달리 file.txt 파일이 비워진다
cat file.txt | sort -R > file.txt
```

- 위의 명령은 `file.txt` 파일을 읽고, 그 내용을 랜덤 정렬한 다음 `file.txt` 파일에 덮어쓸 의도로 작성한 것이다.
- 그러나 의도와는 달리 결과적으로 `file.txt` 파일은 비워지게 된다.

```bash
 # file.txt 내용이 랜덤으로 뒤섞인다
cat file.txt | sort -R | sponge file.txt
```

- `sponge`를 `>` 대신 사용하면 의도한대로 `file.txt` 파일 내용이 랜덤으로 뒤섞이게 된다.

