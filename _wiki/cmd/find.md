---
layout  : wiki
title   : find
summary : walk a file hierarchy
date    : 2019-01-13 17:52:34 +0900
updated : 2023-08-22 21:48:29 +0900
tag     : bash command
resource: 4F/D2AFEF-7A65-4637-82FF-86AEAE03D596
toc     : true
public  : true
parent  : [[/cmd]]
latex   : true
---
* TOC
{:toc}

## Examples
### 자주 쓰는 찾기 패턴 {#basics}

```sh
 # 현재 디렉토리와 그 하위 디렉토리 전체에서 이름이 "README.md"인 파일을 찾는다.
find . -name 'README.md'

 # -iname 은 대소문자를 구분하지 않는다.
find . -iname 'readme.md'

 # 현재 디렉토리와 그 하위 디렉토리 전체에서 이름에 "test"가 들어가는 파일을 찾는다.
find . -name '*test*'

 # 디스크 전체를 뒤져 파일을 찾는다. 에러는 무시한다.
find / -name 'lostfile.txt' 2>/dev/null

 # 사이즈가 1mb 이상인 파일을 찾는다.
find . -size +1024

 # 사이즈가 100 MB 이상인 파일을 모두 찾아 사이즈가 큰 순서대로 정렬한다
find ~/Documents/ -size +100M -ls | sort -k7nr

 # 비어 있는 디렉토리를 찾는다
find . -d -empty
find . -type d -empty
```

```sh
 # 하위 경로에 있는 모든 png, jpg 파일을 찾는다
find . -type f \( -name "*.png" -o -name "*.jpg" \)
```

```sh
 # 하위 경로에서 md 파일이 아닌 다른 모든 파일을 찾는다
find . -type f ! -name "*.md"
```

### -exec : 각 파일에 대해 실행할 명령을 지정한다 {#option-exec}

`-exec`야말로 `find`의 핵심 기능이라 할 수 있다.

```sh
 # 하위 경로의 CRLF 를 사용하는 모든 파일을 찾는다.
find . -not -type d -exec file '{}' ';' | grep CRLF

 # 이름이 *.temp 인 디렉토리, 파일을 찾아 모두 삭제한다.
find . -name '*.temp' -exec rm -rf {} \;

 # 모든 java 파일에서 중괄호가 없는 if 문이 있는 파일 목록을 출력한다
find . -name "*.java" -exec ag "^\s*if[^{]*$" -l {} \;
```

### -delete : 찾은 파일을 삭제한다 {#option-delete}

`-delete`는 `-exec rm {} \;`과 같아서 굳이 몰라도 된다. `-exec`만 알아도 된다.

```sh
 # 하위 경로의 빈 디렉토리를 모두 찾아 삭제한다.
find . -type d -empty -delete

 # -exec 로는 이렇게
find . -type d -empty -exec rmdir {} \;

 # 하위 경로의 빈 파일을 모두 찾아 삭제한다.
find . -type f -empty -delete

 # -exec 로는 이렇게
find . -type f -empty -exec rm {} \;

 # 이렇게 해도 된다
find . -type f -empty -exec rm {} +
```

### -mtime, -mmin : 파일 업데이트 시간을 기준으로 찾는다 {#option-mtime}

```sh
 # 24시간 전부터 지금까지 업데이트된 경로 내의 파일을 찾는다.
find /경로 -mtime -1 -ls

 # 48시간 전부터 24시간 전까지 수정된 모든 markdown 파일을 찾는다.
find . -name '*.md' -mtime 1

 # 24시간 전부터 지금까지 수정된 모든 markdown 파일을 찾는다.
find . -name '*.md' -mtime 0

 # 수정된지 24시간을 초과한 모든 markdown 파일을 찾는다.
find . -name '*.md' -mtime +0

 # 수정한 지 48시간 이상인 모든 markdown 파일 이름 목록을 보여준다.
find . -name '*.md' -mtime +1
```

- `-1`: 24시간 전 ~ 지금까지. `0`과 같다.
- `1`: 48시간 전 ~ 24시간전까지.
- `0`: 24시간 전 ~ 지금까지
- `+0`: 1970년 ~ 24시간 전까지
- `+1`: 1970년 ~ 48시간 전까지.

`+`, `-` 기호가 없이 `N`을 제공하면 `N+1`일 전부터 `N`일 전까지 범위를 사용한다는 것을 기억해두자.

- `0`: 1일 전 ~ 0일 전까지 = 24시간 전 ~ 지금까지
- `1`: 2일 전 ~ 1일 전까지 = 48시간 전 ~ 24시간전까지
- `6`: 7일 전 ~ 6일 전까지 = 168시간 전 ~ 144시간 전까지

`-N`은 `N`일 전부터 지금까지의 범위를 의미한다.

- `-1`: 1일 전 ~ 지금까지 = 24시간 전 ~ 지금까지
- `-7`: 7일 전 ~ 지금까지 = 168시간 전 ~ 지금까지

`+N`은 1970년부터 `N+1`일 전까지의 범위를 의미한다.

- `+0`: 1970년 ~ 1일 전까지 = 1970년 ~ 24시간 전까지
- `+1`: 1970년 ~ 2일 전까지 = 1970년 ~ 48시간 전까지
- `+6`: 1970년 ~ 7일 전까지 = 1970년 ~ 168시간 전까지

```sh
 # 수정된지 100분 이하인 모든 마크다운 파일을 찾는다.
find . -name '*.md' -mmin -100
```

## 함께 읽기

- [[/cmd/grep]]

