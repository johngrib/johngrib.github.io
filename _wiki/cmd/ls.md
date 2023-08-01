---
layout  : wiki
title   : ls 명령어
summary : 
date    : 2023-08-01 22:38:15 +0900
updated : 2023-08-01 22:50:14 +0900
tag     : 
resource: 11/37B4FA-48D2-4D33-B630-23CA30753E4A
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

### -i : 파일의 inode 번호 출력 {#option-i}

`-i` 옵션을 사용하면 파일의 inode 번호를 출력한다.

```bash
$ ls -i /bin/[
1152921500312434706 '/bin/['

$ ls -i /bin/test
1152921500312434706 /bin/test
```

위의 예제에서는 `/bin/[`와 `/bin/test`의 inode 번호가 같다는 것을 알 수 있다. `/bin/[`와 `/bin/test`는 같은 파일(`1152921500312434706`)에 대한 하드 링크이기 때문이다.

두 파일에 대해 `-l` 옵션으로 조사해보면 해당 파일에 대한 하드 링크가 2개 (2번째 필드)라는 것을 알 수 있다.

```bash
$ ls -l  /bin/[  /bin/test
-rwxr-xr-x 2 root wheel 134224 2023-06-15 Thu 19:08:29 '/bin/['
-rwxr-xr-x 2 root wheel 134224 2023-06-15 Thu 19:08:29  /bin/test
```

