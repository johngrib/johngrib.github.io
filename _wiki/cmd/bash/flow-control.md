---
layout  : wiki
title   : Bash 셸 스크립트 흐름 제어
summary : 
date    : 2023-08-15 08:08:03 +0900
updated : 2024-10-02 22:40:27 +0900
tag     : 
resource: 0E/75B348-932C-40BE-B3D8-2A55B9044435
toc     : true
public  : true
parent  : [[/cmd/bash]]
latex   : false
---
* TOC
{:toc}

## 기본 논리연산 정리

| 논리연산 | `test`, `[` | `\[[ ]]`, `(( ))` |
|----------|-------------|-------------------|
| NOT      | `!`         | `!`               |
| AND      | `-a`        | `&&`              |
| OR       | `-o`        | `||`              |

## condition evaluate

### test {#test}

`test` 명령은 표현식이 성공하면(true이면) 종료 상태로 `0`을 갖는다. 실패하면 `1`을 갖는다.

따라서 간단하게 `test` 명령의 결과를 확인하려면 `$?`를 출력해보면 된다.

```bash
$ test -e /dev/tty; echo $?
0

$ test -e ~/not-exist-file; echo $?
1
```

한편, `test` 명령과 `[`는 같은 파일이다. `[`는 `if`와 함께 자주 사용하지만 `if`의 문법이 아니다.

```bash
$ # 두 파일의 inode 가 같다
$ test /bin/test -ef /bin/[ ; echo $?
0

$ # inode를 출력해서 확인해보자
$ ls -il /bin/test /bin/[
1152921500312434706 -rwxr-xr-x 2 root wheel 134224 2023-06-15 Thu 19:08:29 '/bin/['
1152921500312434706 -rwxr-xr-x 2 root wheel 134224 2023-06-15 Thu 19:08:29  /bin/test
```

#### 기본 연산 {#test-basic}

- `!` expression : expression 이 false 이면 true.
- expression_1 `-a` expression_2 : expression_1 과 expression_2 가 모두 true 이면 true.
- expression_1 `-o` expression_2 : expression_1 과 expression_2 중 하나라도 true 이면 true.
    - `-a`의 우선순위가 `-o`보다 높다.
- `(` expression `)` : expression 이 true 이면 true.

#### 파일 test {#test-file}

- `-e` file : 존재하는 파일이라면 true.

```bash
#!/usr/bin/env bash

if [ -e ~/.bashrc ]; then
    echo "the file exists."
else
    echo "the file does not exist."
fi
```

- `-d` directory : 존재하는 디렉토리라면 true.
- `-x` file : 쓸 수 있는 파일이면 true.
- `-f` file : 일반 파일이면 true.
- `-L` file : 심볼릭 링크라면 true.
- `-r` file : 읽을 수 있는 파일이면 true.
- `-s` file : 크기가 0보다 큰 파일이면 true.
- `-b` file : block special 파일이면 true.
- `-c` file : character special 파일이면 true.
- `-f` file : regular 파일이면 true.
- `-p` file : named pipe 파일이면 true.
- `-S` file : 네트워크 socket 파일이면 true.

- file_1 `-nt` file_2 : file_1 이 file_2 보다 최근에 수정된 파일이면 true.
- file_1 `-ot` file_2 : file_1 이 file_2 보다 오래된 파일이면 true.
- file_1 `-ef` file_2 : file_1 과 file_2 의 inode 번호가 같으면 true.
- ...

더 많은 옵션, 더 자세한 내용은 `man test`를 참고할 것.

#### 문자열 test {#test-string}

- 문자열이 비어있으면 false.

```bash
$ test "" ; echo $?
1

$ test "a" ; echo $?
0
```

- `-n` string : 문자열 길이가 0 이 아니면 true.
- `-z` string : 문자열 길이가 0 이면 true.
- string_1 `=` string_2 : 두 문자열이 같으면 true.
    - sh 시절의 흔적.
- string_1 `==` string_2 : 두 문자열이 같으면 true.
- string_1 `!=` string_2 : 두 문자열이 다르면 true.
- string_1 `\<` string_2 : string_1 이 string_2 보다 먼저 정렬되면 true.
- string_1 `\>` string_2 : string_1 이 string_2 보다 나중에 정렬되면 true.
    - `\<`, `\>` 비교에서 `\`를 사용하징 낳으면 리다이렉션에 사용되는 `<`, `>`로 셸이 착각하니 주의할 것.

```bash
$ # > 를 잘못 사용하는 사례
$ #           ↓ 그냥 사용하면 리다이렉션이 되어 버린다
$ if [ "aaaa" > "bbbb" ]; then echo "bad result"; else echo "good result"; fi
bad result

$ # if [ "aaaa" 의 출력이 bbbb 파일로 저장되어 있다
$ ls ./bbbb
./bbbb
````

```bash
$ #           ↓ 백슬래시를 붙이면 제대로 동작한다
$ if [ "aaaa" \> "bbbb" ]; then echo "bad result"; else echo "good result"; fi
good result

$ ls ./bbbb
ls: cannot access './bbbb': No such file or directory
```

#### 정수 test {#test-integer}

- integer_1 `-eq` integer_2 : 두 정수가 같으면 true.
- integer_1 `-ne` integer_2 : 두 정수가 다르면 true.
- integer_1 `-le` integer_2 : integer_1 ≤ integer_2 이면 true.
- integer_1 `-lt` integer_2 : integer_1 \< integer_2 이면 true.
- integer_1 `-ge` integer_2 : integer_1 ≥ integer_2 이면 true.
- integer_1 `-gt` integer_2 : integer_1 \> integer_2 이면 true.

### \\[[ ]] 를 사용한 테스트 표현식 {#double-bracket-test}

- string `=~` regexp : string 이 regexp 에 매치되면 true.
- string `==` pattern : string 이 pattern 과 일치하면 true.

```bash
$ # * 을 확장해 파일 이름 패턴을 인식한다
$ if [[ "sample.txt" == sample.* ]]; then echo "ok"; fi
ok

$ # ""로 감싸면 확장을 하지 않는다
$ if [[ "sample.txt" == "sample.*" ]]; then echo "ok"; fi

```

### (( )) 를 사용한 테스트 표현식 {#double-parentheses-test}

- 0 이 아니면 true.

```bash
$ (( 0 )) ; echo $?
1

$ (( 1 )) ; echo $?
0

$ (( 23 )) ; echo $?
0
```

## if

if 를 사용하는 패턴은 보통 이런 식이다.

```bash
if [ -e "dir/file" ]; then
    echo "file exists"
fi
```

```bash
if [ -d "dir" ]; then
    echo "dir exists"
elif [ -f "file" ]; then
    echo "file exists"
else
    echo "not matched"
fi
```

```bash
a=5
b=10

if [ "$a" -eq 5 ] && [ "$b" -eq 10 ]; then
    echo "true"
fi
```

```bash
a=5
b=20

if [ "$a" -eq 5 ] || [ "$b" -eq 10 ]; then
    echo "true"
fi
```

다음과 같이 복잡하게 사용하는 것도 가능하지만, 이 정도로 복잡해지면 그냥 다른 프로그래밍 언어를 사용하는 것이 낫다.

```bash
a=5
b=20
c=30

if [ "$a" -eq 5 ] && ([ "$b" -eq 10 ] || [ "$c" -eq 30 ]); then
    echo "true"
fi
```

## case

```bash
#!/usr/bin/env bash

read -p "좋아하는 색깔은? " answer

case $answer in
    red)
        echo "빨간색을 좋아하시는군요"
        ;;
    blue)
        echo "파란색을 좋아하시는군요"
        ;;
    white|black|gray)
        echo "무채색을 좋아하시는군요"
        ;;
    *)
        echo "준비된 답변이 없습니다"
        ;;
esac
```

## for

```bash
for color in red blue white; do
    echo "이번 색깔은 $color 입니다"
done
```

확장 규칙을 사용해 이렇게 할 수도 있다.

```bash
for color in {1..3}; do
    echo "이번 숫자는 $color 입니다"
done
```

배열을 사용하려 한다면 이렇게 하면 된다.

```bash
colors=("red" "blue" "white")
for color in "${colors[@]}"; do
    echo "이번 색깔은 $color 입니다"
done
```

C 계열 프로그래밍 언어에서 사용하는 for 문과 비슷하게 사용할 수도 있다.

```bash
for ((i=0; i<4; i++)); do
    echo "인덱스: $i"
done
```

## while

```bash
i=0
while [ $i -lt 10 ]; do
    echo "인덱스: $i"
    i=$((i+1))
    sleep 1
done
```

- 매 루프별로 1초씩 대기하며 `인덱스: 0`부터 `인덱스: 9`까지 출력한다.

아래와 같이 한 줄로 작성할 수도 있다.

```bash
i=0; while [ $i -lt 10 ]; do echo "인덱스: $i"; i=$((i+1)); sleep 1; done
```

