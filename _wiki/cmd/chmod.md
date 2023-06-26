---
layout  : wiki
title   : chmod
summary : change file modes or Access Control Lists
date    : 2023-06-26 23:14:55 +0900
updated : 2023-06-26 23:33:57 +0900
tag     : 
resource: FD/094CB3-958D-42A5-99FB-7C5C1E7DEECE
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## 모드

- 4: read. 읽기 권한. `100`.
- 2: write. 쓰기 권한. `010`.
- 1: execute. 실행 권한. `001`.

위의 수를 조합해 읽기, 쓰기, 실행을 모두 표현해 사용하면 된다.

- 7: read, write, execute. `111`.
- 6: read, write. `110`.
- 5: read, execute. `101`.
- 3: write, execute. `011`.
- 0: none. `000`.

## Examples

```bash
 # 소유자, 그룹, 기타 사용자에 대해 7(읽기, 쓰기, 실행) 부여.
chmod 777 filename

 # 소유자: 7(읽기, 쓰기, 실행) 부여. / 그룹, 기타 사용자: 4(읽기, 실행) 부여.
chmod 744 filename

 # directory의 모든 파일에 대해 소유자에게만 7(읽기, 쓰기, 실행) 부여.
chmod -R 700 directory

 # directory의 모든 파일에 대해 모든 사용자에게 7(읽기, 쓰기, 실행) 부여.
chmod -R 777 directory
```

```bash
 # 소유자(u)에게 쓰기 권한 추가.
chmod u+w filename

 # 소유자(u)에게 실행 권한 추가.
chmod u+x filename

 # 그룹 사용자(g)의 실행 권한 제거.
chmod g-x filename

 # 모든 사용자(a)에게 읽기 권한 추가.
chmod a+r filename

 # 소유자(u)에게 쓰기, 실행 권한 추가.
chmod -R u+wx directory

 # file1의 권한을 file2에 복사.
chmod --reference=file1 file2
```

