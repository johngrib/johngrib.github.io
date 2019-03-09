---
layout  : wiki
title   : 점자 패턴 문자(Braille pattern)
summary :
date    : 2018-01-10 21:14:09 +0900
updated : 2018-04-04 09:05:19 +0900
tag     : special-chars
toc     : true
public  : true
parent  : what
latex   : true
---
* TOC
{:toc}

## 개요

* 유니코드 `U+2800` 부터 `U+28FF`를 점자 패턴 문자라고 부른다.
* 8개의 점을 사용해 표기하므로, $$ 2^8 = 256 $$ 개의 문자가 있다.
* 점자의 창안자인 Louis Braille(루이 브라유)의 이름을 따 브라유 패턴이라 부른다.
    * 영어로는 브레일 /breɪl/ 로 읽는다.

## 구조

* 점을 6개 사용하는 6점 점자와, 가장 아래에 두 점을 추가한 8점 점자가 있다.
* 유니코드는 6점 점자와 8점 점자를 모두 표현할 수 있도록 다음과 같이 8 비트 구조로 되어 있다.

| 1  | 8   |
| 2  | 16  |
| 4  | 32  |
| 64 | 128 |

* 기본인 6점 점자를 6비트로 표현한 다음, 점 두 개를 추가해 8점 점자가 된 것이므로 8비트로 생각할 때 좀 헷갈린다.

## 목록

|               |        | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | A   | B   | C   | D   | E   | F   |
| :-----------: | ------ | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 ~ 15        | U+2800 | ⠀   | ⠁   | ⠂   | ⠃   | ⠄   | ⠅   | ⠆   | ⠇   | ⠈   | ⠉   | ⠊   | ⠋   | ⠌   | ⠍   | ⠎   | ⠏   |
| 16 ~ 31       | U+2810 | ⠐   | ⠑   | ⠒   | ⠓   | ⠔   | ⠕   | ⠖   | ⠗   | ⠘   | ⠙   | ⠚   | ⠛   | ⠜   | ⠝   | ⠞   | ⠟   |
| 32 ~ 47       | U+2820 | ⠠   | ⠡   | ⠢   | ⠣   | ⠤   | ⠥   | ⠦   | ⠧   | ⠨   | ⠩   | ⠪   | ⠫   | ⠬   | ⠭   | ⠮   | ⠯   |
| 48 ~ 63       | U+2830 | ⠰   | ⠱   | ⠲   | ⠳   | ⠴   | ⠵   | ⠶   | ⠷   | ⠸   | ⠹   | ⠺   | ⠻   | ⠼   | ⠽   | ⠾   | ⠿   |
| 64 ~ 79       | U+2840 | ⡀   | ⡁   | ⡂   | ⡃   | ⡄   | ⡅   | ⡆   | ⡇   | ⡈   | ⡉   | ⡊   | ⡋   | ⡌   | ⡍   | ⡎   | ⡏   |
| 80 ~ 95       | U+2850 | ⡐   | ⡑   | ⡒   | ⡓   | ⡔   | ⡕   | ⡖   | ⡗   | ⡘   | ⡙   | ⡚   | ⡛   | ⡜   | ⡝   | ⡞   | ⡟   |
| 96 ~ 111      | U+2860 | ⡠   | ⡡   | ⡢   | ⡣   | ⡤   | ⡥   | ⡦   | ⡧   | ⡨   | ⡩   | ⡪   | ⡫   | ⡬   | ⡭   | ⡮   | ⡯   |
| 112 ~ 127     | U+2870 | ⡰   | ⡱   | ⡲   | ⡳   | ⡴   | ⡵   | ⡶   | ⡷   | ⡸   | ⡹   | ⡺   | ⡻   | ⡼   | ⡽   | ⡾   | ⡿   |
| 128 ~ 143     | U+2880 | ⢀   | ⢁   | ⢂   | ⢃   | ⢄   | ⢅   | ⢆   | ⢇   | ⢈   | ⢉   | ⢊   | ⢋   | ⢌   | ⢍   | ⢎   | ⢏   |
| 144 ~ 159     | U+2890 | ⢐   | ⢑   | ⢒   | ⢓   | ⢔   | ⢕   | ⢖   | ⢗   | ⢘   | ⢙   | ⢚   | ⢛   | ⢜   | ⢝   | ⢞   | ⢟   |
| 160 ~ 175     | U+28A0 | ⢠   | ⢡   | ⢢   | ⢣   | ⢤   | ⢥   | ⢦   | ⢧   | ⢨   | ⢩   | ⢪   | ⢫   | ⢬   | ⢭   | ⢮   | ⢯   |
| 176 ~ 191     | U+28B0 | ⢰   | ⢱   | ⢲   | ⢳   | ⢴   | ⢵   | ⢶   | ⢷   | ⢸   | ⢹   | ⢺   | ⢻   | ⢼   | ⢽   | ⢾   | ⢿   |
| 192 ~ 207     | U+28C0 | ⣀   | ⣁   | ⣂   | ⣃   | ⣄   | ⣅   | ⣆   | ⣇   | ⣈   | ⣉   | ⣊   | ⣋   | ⣌   | ⣍   | ⣎   | ⣏   |
| 208 ~ 223     | U+28D0 | ⣐   | ⣑   | ⣒   | ⣓   | ⣔   | ⣕   | ⣖   | ⣗   | ⣘   | ⣙   | ⣚   | ⣛   | ⣜   | ⣝   | ⣞   | ⣟   |
| 224 ~ 239     | U+28E0 | ⣠   | ⣡   | ⣢   | ⣣   | ⣤   | ⣥   | ⣦   | ⣧   | ⣨   | ⣩   | ⣪   | ⣫   | ⣬   | ⣭   | ⣮   | ⣯   |
| 240 ~ 255     | U+28F0 | ⣰   | ⣱   | ⣲   | ⣳   | ⣴   | ⣵   | ⣶   | ⣷   | ⣸   | ⣹   | ⣺   | ⣻   | ⣼   | ⣽   | ⣾   | ⣿   |

## 기타 활용

본래의 목적 외에, 8비트 모양을 살려 도트 아트를 할 수 있다.

* [https://github.com/asciimoo/drawille ](https://github.com/asciimoo/drawille ): 점자 문자를 사용해 터미널에 그림을 그려주는 python 라이브러리.

![https://github.com/asciimoo/drawille ](https://github.com/asciimoo/drawille/raw/master/docs/images/drawille_01.png )

* [https://github.com/bartmalanczuk/vim-trex-runner ](https://github.com/bartmalanczuk/vim-trex-runner ): Vim에서 돌아가는 Trex 러너(구글 크롬 게임에서 영향을 받은듯 하다).

![https://github.com/bartmalanczuk/vim-trex-runner ](https://camo.githubusercontent.com/93effca175a4d59b159182baeb179fb55c84a21b/687474703a2f2f626172746d616c616e637a756b2e6769746875622e696f2f646f776e6c6f6164732f76696d2d747265782d72756e6e65722f64656d6f2e676966)

## Links

* [Louis Braille(wikipedia)](https://en.wikipedia.org/wiki/Louis_Braille)
* [https://unicode-table.com/en/blocks/braille-patterns ](https://unicode-table.com/en/blocks/braille-patterns/ )
* [https://github.com/asciimoo/drawille ](https://github.com/asciimoo/drawille )
* [https://github.com/bartmalanczuk/vim-trex-runner ](https://github.com/bartmalanczuk/vim-trex-runner )
