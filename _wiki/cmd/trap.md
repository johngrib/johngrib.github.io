---
layout  : wiki
title   : trap 명령어
summary : 
date    : 2024-09-18 22:24:45 +0900
updated : 2024-10-04 17:50:13 +0900
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

## kill 무시하기

`trap`으로 특정 시그널을 지정하고 아무것도 하지 않게 한다면 해당 시그널을 무시할 수 있다.

이를 이용해 셸 스크립트가 [[/cmd/kill]]을 방어할 수 있도록 만들 수 있다.

다음 구문을 셸 스크립트에 추가하면 된다.

```bash
trap '' SIGTERM
```

### 튜토리얼

`trap`으로 [[/cmd/kill]]을 방어하는 연습을 해보자.

다음과 같은 스크립트를 작성하고, `trap-test.sh`라는 이름의 파일로 저장한다.

```bash
#!/usr/bin/env bash

echo "The PID of this script is $$"

sleep 15;
```

이 스크립트를 실행하면 다음과 같이 PID를 출력하고 15초 동안 대기할 것이다.

```bash
$ ./trap-test.sh
The PID of this script is 83043

```

이때, 다른 터미널로 이동해서 `kill 83043`을 입력하고 돌아와보면 다음과 같이 스크립트가 종료된 것을 확인할 수 있다.

```bash
$ ./trap-test.sh
The PID of this script is 83043
Terminated: 15
```

이제 `trap-test.sh`가 `kill`을 방어할 수 있도록 수정해 보자.

(`trap '' SIGTERM`을 하면 방어를 했는지 안했는지를 알 수 없으므로 간단한 출력문을 추가해보자.)

```bash
#!/usr/bin/env bash

trap 'echo 시그널: $?' SIGTERM
echo "The PID of this script is $$"

sleep 15;
```

수정한 스크립트를 실행해보면 다음과 같이 PID를 출력하고 15초 동안 대기할 것이다.

```bash
$ ./trap-test.sh
The PID of this script is 82061

```

이 때 다른 터미널로 이동해서 해당 PID를 `kill` 해보자.

```bash
kill 82061
```

그리고 돌아와보면 스크립트가 종료되지 않고 여전히 15초를 기다리고 있는 것을 확인할 수 있다.

좀 더 기다리면 다음과 같이 정상 종료가 되고, `trap`에 지정했던 문구가 출력되는 것을 볼 수 있다.

```bash
$ ./trap-test.sh
The PID of this script is 82061
시그널: 0
```

