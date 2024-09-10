---
layout  : wiki
title   : tail 명령어
summary : display the last part of a file
date    : 2019-01-06 23:17:41 +0900
updated : 2024-09-10 22:46:27 +0900
tag     : bash command
resource: 37/4DEAA6-AC99-4BF7-80B8-03BAB23F1129
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples
```sh
 # 마지막 10 줄을 출력한다
tail test.txt
tail -n10 test.txt
tail -n 10 test.txt
tail -10 test.txt
cat test.txt | tail - 10

 # 파일의 끝을 follow 하며 출력한다
tail -f log.txt

 # 파일이 삭제되어도 같은 이름의 파일이 만들어진다면 해당 파일을 계속해서 follow한다
tail -F log.txt

 # 파일의 처음 10 줄을 제외한 나머지 모두 출력
tail -n +10

 # 역순으로 출력한다
tail -r log.txt
```

* `-r` 옵션은 `-F`, `-f` 옵션과 함께 사용할 수 없다.

## Options

### -f : 파일의 inode를 follow한다 {#option-f}

- `tail -f`는 파일의 inode를 follow한다.
    - 따라서, 파일의 이름이 변경되어도 계속해서 follow한다.
    - 따라서, 파일이 삭제된 다음 같은 이름의 파일을 만들어도 해당 파일을 follow하지 않는다.

다음과 같이 `log.txt` 파일을 `tail -f`로 follow하고 있다고 하자.  
(예제에서는 시간의 흐름을 보여주기 위해 [[/cmd/ts]]로 타임스탬프를 붙였다.)

```
$ tail -f log.txt | ts '[%F %T]'
[2024-09-10 22:27:07] 456
```

다른 터미널에서 다음과 같이 `log.txt` 파일의 마지막에 내용을 추가하면...

```
$ echo 123 >> log.txt
```

`tail -f`는 아래와 같이 한 줄의 출력을 추가로 보여준다.

```
$ tail -f log.txt | ts '[%F %T]'
[2024-09-10 22:27:07] 456
[2024-09-10 22:27:48] 123
```

이 때 `log.txt` 파일의 이름을 변경하고, 이름이 변경된 파일에 내용을 추가해보자.

```
$ mv log.txt log2.txt
$ echo 456 >> log2.txt
$ echo 789 >> log2.txt
```

그러면 다음과 같이 `tail -f`가 계속해서 follow하고 있음을 확인할 수 있다.

```
$ tail -f log.txt | ts '[%F %T]'
[2024-09-10 22:27:07] 456
[2024-09-10 22:27:48] 123
[2024-09-10 22:29:24] 456
[2024-09-10 22:31:17] 789
```

이제 파일을 삭제하고 같은 이름의 파일을 새로 만들어서 내용을 추가해보자.

```
$ rm log2.txt
removed 'log2.txt'

$ echo newfile > log2.txt
$ echo newfile > log.txt
$ echo 000 > log2.txt
$ echo 000 >> log2.txt
$ echo 000 >> log.txt
```

이름만 같을 뿐, follow하던 파일이 아니기 때문에 `tail -f`는 아무것도 출력하지 않는다.

```
$ tail -f log.txt | ts '[%F %T]'
[2024-09-10 22:27:07] 456
[2024-09-10 22:27:48] 123
[2024-09-10 22:29:24] 456
[2024-09-10 22:31:17] 789
```

### -F : 파일의 이름을 follow한다 {#option-ff}

- `tail -F`는 파일의 이름을 follow한다.
    - 따라서, 파일이 삭제된 다음이라도 같은 이름의 파일이 새로 생성되면 해당 파일을 follow한다.
    - 따라서, 파일의 이름을 변경하면 해당 파일을 follow하지 않는다.

일단 다음과 같이 `tail -F`를 실행해 놓고..

```
$ tail -F log.txt | ts '[%F %T]'
[2024-09-10 22:35:54] newfile
[2024-09-10 22:35:54] 000
```

다른 터미널에서 `log.txt` 파일의 이름을 변경하고, 이름이 변경된 파일에 내용을 추가해보자.

```
$ mv log.txt log2.txt
$ echo this is log2.txt >> log2.txt
```

이제 출력을 확인해보면... 바뀐 것이 없다.

```
$ tail -F log.txt | ts '[%F %T]'
[2024-09-10 22:35:54] newfile
[2024-09-10 22:35:54] 000
```

`tail -F`는 `tail -f`와는 달리 파일의 이름이 변경되면 follow하지 않는다는 사실을 알 수 있다.

이제 `log.txt` 파일을 새로 생성하고, 새로 생성한 파일에 내용을 추가해보자.

```
$ touch log.txt
$ echo hello >> log.txt
```

출력을 확인해보면 `hello`가 추가된 것을 확인할 수 있다.

```
$ tail -F log.txt | ts '[%F %T]'
[2024-09-10 22:35:54] newfile
[2024-09-10 22:35:54] 000
[2024-09-10 22:38:38] hello
```

즉, `tail -F`는 파일의 이름을 follow하고 있다는 것을 알 수 있다.

## 응용
### ts 명령과의 조합 {#with-ts}

[[/cmd/moreutils]]의 [[/cmd/ts]]와 함께 사용하면 `tail -F` 출력 결과에 타임스탬프를 prefix로 붙일 수 있다.

```
tail -F /var/log/apache2/access.log | ts '[%Y-%m-%d %H:%M:%S]'
```

시간 포맷은 strftime 포맷을 따르므로, `%Y-%m-%d %H:%M:%S`는 `%F %T`와 똑같다.

```
tail -F /var/log/apache2/access.log | ts '[%F %T]'
```


## 함께 읽기

- [[/cmd/ts]]

