---
layout  : category
title   : macOS 전용 명령어들
summary : 
date    : 2024-09-22 12:11:04 +0900
updated : 2025-12-20 22:15:28 +0900
tag     : 
resource: 30/D9F1E3-7EBC-4D04-8BF6-EAD294B01A34
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## 해상도 조사하기

```bash
system_profiler SPDisplaysDataType
```

해상도 수치만 보고 싶다면 다음과 같이 [[/cmd/grep]]으로 `Resolution`만 필터링할 것.

```bash
system_profiler SPDisplaysDataType | grep Resolution
```

## Documents
