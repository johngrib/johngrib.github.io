---
layout  : wiki
title   : yes 명령어
summary : 문자열을 반복 출력한다
date    : 2018-09-15 21:45:14 +0900
updated : 2019-01-06 23:13:05 +0900
tag     : bash command
toc     : true
public  : true
parent  : command-line
latex   : false
---
* TOC
{:toc}

# 기능

* 실행해보면 `y`를 무한히 출력한다.

```sh
$ yes
y
y
y
y
y
...
```

* 실행할 때 문자열을 주면 해당 문자열을 무한히 출력한다.

```sh
$ yes 'hello world!'
hello world!
hello world!
hello world!
hello world!
hello world!
...
```

# 응용

* `y`응답이 필요한 명령어에 자동으로 응답하도록 사용할 수 있다.

```sh
$ yes | rm *.txt

$ yes | rm -r directory_name
```

* 고의로 문자열이 잔뜩 있는 파일을 만들 때 사용할 수 있다.

```sh
$ yes 'All your base are belong to us' | head -10000 > base.txt

$ cat base.txt | wc -l
   10000
```

* 실행시켜 놓고 가만히 놔두면 CPU 사용률이 계속해서 올라간다.
    * AWS auto scaling 테스트에 써먹을 수 있었다.
    * `ctrl+c`만으로 멈출 수 있으니 멈추기 쉽다는 점에서 쓸만했다.

```sh
$ yes > /dev/null
```

# 그리고...

* Shining 놀이를 할 수 있다.

```sh
$ yes 'All Work and No Play makes Jack a dull boy'
```

* The Simpsons의 오프닝에 나오는 Bart Simpson 칠판 낙서 놀이를 할 수 있다.

```sh
$ yes 'I WILL NOT WASTE COMPUTING POWER'
```

![I WILL NOT WASTE CHALK](https://vignette.wikia.nocookie.net/simpsons/images/3/3a/Chalkboard_gag_%28Bart_the_Genius%29.png/revision/latest?cb=20130526215231 )

* 터미널에서 무지개 그라데이션을 볼 수 있다. (화면보호기로 써보자)

```sh
$ yes "$(seq 231 -1 16)" | while read i; do printf "\x1b[48;5;${i}m\n"; sleep .02; done
```

# Links

* [Yes(Unix) (wikipedia)](https://en.wikipedia.org/wiki/Yes_(Unix) )

* [The Shining(film) (wikipedia)](https://en.wikipedia.org/wiki/The_Shining_(film) )
* [All work and no play makes Jack a dull boy(wikipedia)](https://en.wikipedia.org/wiki/All_work_and_no_play_makes_Jack_a_dull_boy )
* [List of chalkboard gags (simpsons.wikia.com)](http://simpsons.wikia.com/wiki/List_of_chalkboard_gags )
* [Command Line Magic(twitter.com)](https://twitter.com/climagic/status/1005103669233311744 )
