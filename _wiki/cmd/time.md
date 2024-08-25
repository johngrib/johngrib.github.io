---
layout  : wiki
title   : time 명령어
summary : 
date    : 2024-08-25 18:17:26 +0900
updated : 2024-08-25 18:21:45 +0900
tag     : 
resource: CA/6988DD-22BE-44C3-8583-08EBB28DD6F7
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## 요약

```
$ time ls | wc -l
23

real    0m0.003s
user    0m0.001s
sys     0m0.002s
```

- `real`: 명령 시작부터 종료까지 '실제로 소요된' 시간
- `user`: 명령이 실행되는 동안 '사용자 모드에서 소비된 CPU' 시간
- `sys`: 커널 모드에서 소비된 CPU 시간

