---
layout  : wiki
title   : for
summary : 
date    : 2023-01-08 10:09:05 +0900
updated : 2023-01-22 00:00:17 +0900
tag     : bash command
resource: EB/008418-5B78-4F95-BA1A-57F7EB35E8CC
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## 사용법

```sh
for variable in list
do
    command1
    command2
    ...
done
```

한 줄로 사용하고 싶다면 `;`를 사용해주면 된다. `do` 명령 뒤쪽에 주목.

```sh
for variable in list; do command1; command2; ...; done
```

## Examples

```sh
for number in 1 2 3 4
do
    echo $number
done
```

결과는 다음과 같다.

```sh
1
2
3
4
```

다음과 같이 [[/cmd/seq]] 명령을 사용해도 똑같이 작동한다.

```sh
for number in $(seq 1 4)
do
    echo $number
done
```

한 줄로 사용하려면 다음과 같이 `echo $number` 뒤에 `;`를 붙여준다.

```sh
for number in $(seq 1 4); do echo $number; done
```

