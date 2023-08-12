---
layout  : wiki
title   : du 명령어
summary : disk usage. 디스크 사용 현황을 본다.
date    : 2018-02-08 22:58:36 +0900
updated : 2023-08-12 14:08:41 +0900
tag     : bash command
resource: 09/8F1884-750F-489C-8361-FAE1EC8D8510
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## 사용

```
$ du
```

### 옵션

* `-h` : `--human-readable`
* `-s` : `--summarize`. 전체 용량만 출력한다.
* `-a` : `--all`. 모든 파일과 모든 하위 디렉토리도 출력한다.
* `-c` : `--total` 마지막 줄에 합계를 출력한다.
* `-k` : 출력 숫자의 단위를 1kb 로 지정한다.
* `-x` : `--one-file-system`. 현재 파일시스템의 파일 사용양만 출력한다.

## 응용

### 디렉토리 용량을 확인한다

```
$ du -hs 디렉토리
 29M	.
```

디렉토리를 생략하면 현재 위치를 조사한다.

```
$ du -hs
 29M	.
```

### 가장 용량이 큰 디렉토리 찾기

다음과 같이 하면, 현재 위치의 모든 하위 디렉토리 중 가장 용량이 큰 디렉토리 10 개를 보여준다.

```
$ du -ckx | sort -n -r | head
```

### sort와 함께 사용하기 {#with-sort}

[[/cmd/sort]]

```bash
$ # sort -h 를 사용한 경우
$ ls -d */ | xargs du -sh | sort -h
4.0K	blog/
4.0K	css/
8.0K	_data/
 24K	js/
 32K	tool/
 36K	_layouts/
 40K	_includes/
 44K	_sass/
128K	_posts/
1.3M	node_modules/
4.5M	data/
 41M	_wiki/
249M	resource/
318M	_site/
```

## Links

* [du (computerhope.com)](https://www.computerhope.com/unix/udu.htm)

