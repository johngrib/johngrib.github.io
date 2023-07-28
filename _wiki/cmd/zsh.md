---
layout  : wiki
title   : zsh
summary : zsh 안 쓰지만 가끔 쓸 일이 있으니까
date    : 2023-07-27 23:06:40 +0900
updated : 2023-07-28 16:43:38 +0900
tag     : 
resource: E8/3E6470-E1DD-4311-9519-F20C2D1BB666
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## MacOS의 기본 셸이 zsh로 변경되었다 {#macos-2019-zsh}

2019년 말부터 Apple은 MacOS의 기본 셸을 bash에서 zsh로 변경했다.

이유는 확실하지 않지만 [라이선스 문제라는 소문]( https://discussions.apple.com/thread/250722978 )이 있다.

![]( /resource/E8/3E6470-E1DD-4311-9519-F20C2D1BB666/answer.png )

위의 답변 내용을 읽어보면 다음과 같다. (공식 답변이 아니라 특정 사용자의 답변이라는 점에 유의해야 한다.)

- macOS와 함께 제공되는 bash 버전은 VERY OLD(v3.2.57)이지만 해당 버전은 여전히 GPLv2 라이선스이며 Apple에서 배포할 수 있습니다.
- 현재 v5 bash는 Apple과 같은 회사에 독이 되는 GPLv3 라이센스 하에 있기 때문에 버그 수정이 포함된 최신 bash를 제공할 수 없습니다.
- zsh는 GPL 라이센스를 사용 하지 않으므로 Apple은 zsh의 최신 사본을 무료로 포함할 수 있습니다.

아쉬운 일이기는 하지만 GPL 라이선스는 애플 같은 기업에게는 곤란한 라이선스이므로 이해할 수 있다.

하지만 짜증나는 건 사실이다.
황당하게 zsh이 기본으로 되어 있길래 [[/cmd/chsh]]로 bash로 바꿨더니 터미널을 시작할 때 경고가 뜨질 않나...
2023년인 지금 기준으로 4년 전에 일어난 일인데도 당시의 짜증이 생생하게 기억난다.

### bash로 되돌리기

[[/cmd/chsh]] 명령을 사용해 기본 셸을 bash로 되돌릴 수 있다.

```bash
 # 셸을 bash로 변경한다
chsh -s /bin/bash
```

bash를 사용하면 터미널을 시작할 때 Apple에서 작성한 경고문이 출력되는데, 하루에도 수십번 터미널을 여는 사람 입장에서는 정말 짜증난다.

`.bash_profile`이나 `.bashrc`에서 `BASH_SILENCE_DEPRECATION_WARNING`을 `1`로 설정해주면 해당 경고문을 끌 수 있다.

```bash
export BASH_SILENCE_DEPRECATION_WARNING=1
```

