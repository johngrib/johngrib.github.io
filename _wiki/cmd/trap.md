---
layout  : wiki
title   : trap 명령어
summary : 
date    : 2024-09-18 22:24:45 +0900
updated : 2024-09-18 22:41:36 +0900
tag     : 
resource: 34/FFCC10-E872-499B-B171-3D754DE3A8DA
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## 개요

- `trap` 명령어는 셸 스크립트 실행 중 특정한 이벤트가 발생했을 때 실행할 명령어를 지정할 수 있다.
- 스크립트 종료 이벤트인 `EXIT`가 있으므로 임시 파일을 삭제하는 등의 작업을 할 수 있다.

다음 셸 스크립트로 실험해보면 작동 방식을 쉽게 이해할 수 있다.

```bash
#!/usr/bin/env bash

touch temp_file

trap 'echo 스크립트 종료; rm temp_file' EXIT

 # 여러 개의 시그널을 지정하는 것도 가능하다
trap 'echo 시그널: $?' SIGINT SIGTERM

sleep 10;
```

- 위의 셸 스크립트를 실행하면 10초 동안 대기를 하는데...
    - 스크립트가 실행됐을 때 `temp_file`이 생성되었다가, 스크립트가 종료되는 시점에 삭제되는 것을 확인할 수 있다.
- 스크립트 실행 중에 `Ctrl+C`를 입력해 `SIGINT`를 발생시키면 `시그널: 130`이 출력된다.
- `kill -9`는 프로세스를 강제 종료하므로 `trap`으로 처리할 수 없으므로 주의할 것.

