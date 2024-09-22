---
layout  : wiki
title   : Bash Arrays
summary : 
date    : 2024-09-22 21:35:23 +0900
updated : 2024-09-22 22:40:30 +0900
tag     : 
resource: BB/48FC83-C6D5-46B3-AE75-768F9F647709
toc     : true
public  : true
parent  : [[/cmd/bash]]
latex   : false
---
* TOC
{:toc}

## Examples

### 선언

```bash
numbers=("one" "two" "three" "four")
```

- 이 형식으로 배열을 선언할 수 있다.
- `=` 좌우에 공백이 없어야 한다는 점에 주의할 것.

### 출력

```bash
$ echo $numbers
one
```

- 주의: 그냥 `$numbers`로 출력하면 배열의 첫 번째 요소만 출력된다.

#### 인덱스

```bash
$ echo ${numbers[0]}
one

$ echo ${numbers[1]}
two

$ echo ${numbers[2]}
three

$ echo ${numbers[3]}
four

$ echo ${numbers[8]}

```

- 0 base index를 사용해 위와 같이 출력할 수 있다.
- index가 알맞지 않으면 공백만 출력.

#### 음수 인덱스

```bash
$ echo ${numbers[-1]}
four

$ echo ${numbers[-2]}
three

$ echo ${numbers[-3]}
two

$ echo ${numbers[-4]}
one

$ echo ${numbers[-5]}
-bash: numbers: bad array subscript
```

- 음수 index를 사용할 수도 있다.
- index가 알맞지 않으면 에러가 발생한다.

#### 전체 출력

```bash
$ echo ${numbers[@]}
one two three four
```

- `@`를 사용하면 배열 전체를 출력할 수 있다.

```bash
$ numbers+=("five" "six")

$ echo ${numbers[@]}
one two three four five six
```

#### 길이

```bash
$ echo ${#numbers[@]}
6
```

### 아이템 추가

- `+=`를 사용해 배열에 아이템을 추가하는 것도 가능하다.

```bash
$ numbers[0]="하나"

$ numbers[2]="셋"

$ echo ${numbers[@]}
하나 two 셋 four five six
```

### 아이템 수정

- `=`를 사용해 배열의 아이템을 수정할 수도 있다.

```bash
$ for num in "${numbers[@]}"
> do
>     echo $num
> done
하나
two
셋
four
five
six
```

### 순회

- 간단하게 [[/cmd/for]]{for}를 사용해 배열을 순회할 수 있다.

```bash
$ for num in "${numbers[@]}"; do echo $num; done
하나
two
셋
four
five
six
```

- 물론 위와 같이 한 줄로 써도 된다.

```bash
$ for num in "${numbers[*]}"; do echo $num; done
하나 two 셋 four five six
```

- 그러나 `@` 대신 `*`를 사용하면 배열을 순회하는 것이 아니라 배열 전체를 하나의 문자열로 출력하므로 주의할 것.

### 슬라이스

```bash
$ echo ${numbers[@]:3:1}  # 3번 인덱스부터 1개 출력
four

$ echo ${numbers[@]:3:2}  # 3번 인덱스부터 2개 출력
four five
```

- `:`를 사용해 배열을 슬라이스할 수 있다.
- `${배열[@]:시작인덱스:길이}` 형식으로 사용하므로 주의할 것.

```bash
$ next_numbers=("${numbers[@]:3:2}")

$ echo ${next_numbers[@]}
four five
```

- `=( ... )`를 사용해 슬라이스한 배열을 새로운 배열로 선언할 수 있다.

