---
layout  : wiki
title   : Slack
summary : 
date    : 2024-08-20 22:41:51 +0900
updated : 2024-08-20 23:08:44 +0900
tag     : 
resource: 12/128821-583D-4510-A047-6B5E81374639
toc     : true
public  : true
parent  : [[/tool]]
latex   : false
---
* TOC
{:toc}

## 검색하기

참고: [Search in Slack](https://slack.com/help/articles/202528808-Search-in-Slack ) [Slack에서 검색](https://slack.com/intl/ko-kr/help/articles/202528808-Slack%EC%97%90%EC%84%9C-%EA%B2%80%EC%83%89 )

```
"marketing report"
```

- `marketing report`를 포함한 메시지를 검색한다.

```
marketing -report
```

- `marketing` 에 대해 검색한다.
- 단, `report`를 포함하는 메시지는 검색결과에서 제외한다.

```
marketing report in:#team-marketing
```

- `marketing report`에 대해 검색한다.
- `#team-marketing` 채널에서만 검색한다.

```
marketing report from:@Sara 
```

- `marketing report`에 대해 검색한다.
- 사용자 `@Sara`가 작성한 메시지들 중에서만 검색한다.

```
marketing report has::eyes:
```

- `marketing report`에 대해 검색한다.
- `:eyes:` 이모지가 붙은 메시지들 중에서만 검색한다.

```
marketing report hasmy::eyes:
```

- `marketing report`에 대해 검색한다.
- 내가 `:eyes:` 이모지를 붙인 메시지들 중에서만 검색한다.

```
marketing report is:saved
```

- `marketing report`에 대해 검색한다.
- 내가 저장한 메시지들 중에서만 검색한다.

```
marketing report is:thread
```

- `marketing report`에 대해 검색한다.
- 스레드 메시지들 중에서만 검색한다.

```
marketing report with:@Sara
```

- `marketing report`에 대해 검색한다.
- 스레드 메시지들 중에서 사용자 `@Sara`가 참여한 메시지들에서도 검색한다.
- 사용자 `@Sara`와의 DM 에서도 검색한다.

```
marketing report creator:@Sara
```

- `marketing report`에 대해 검색한다.
- 사용자 `@Sara`가 만든 canvas 중에서만 검색한다.

```
marketing report -in:#team-marketing
```

- `marketing report`에 대해 검색한다.
- `#team-marketing` 채널은 제외하고 검색한다.



