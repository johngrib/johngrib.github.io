---
layout  : wiki
title   : 색상 모델
summary : RGB, CMYK, HSB, 인덱스...
date    : 2021-03-06 17:34:21 +0900
updated : 2021-03-06 20:48:10 +0900
tag     : 
resource: C7/D60EF7-6FD8-4046-BEDF-EF9C53787D97
toc     : true
public  : true
parent  : [[index]]
latex   : false
---
* TOC
{:toc}

## RGB 모델

![Red, Green, Blue]( /resource/C7/D60EF7-6FD8-4046-BEDF-EF9C53787D97/rgb.svg )

Red, Green, Blue

- 빛의 삼원색인 Red, Green, Blue를 사용해 색을 표현한다.
- 빛의 삼원색을 모두 합치면 흰 색이 된다.
    - `#FFFFFF`: 흰색
    - `#000000`: 검정색
- RGB는 인간이 시각적으로 인식하는 1차원적 색상.


## CMYK 모델

![Cyan, Magenta, Yellow, Black]( /resource/C7/D60EF7-6FD8-4046-BEDF-EF9C53787D97/cmyk.svg )

Cyan, Magenta, Yellow, Black

- RGB와는 달리, 인쇄 매체에 출력된 잉크의 빛 흡수 특성에 기초한 모델.
- 즉 컬러 인쇄에서 사용하는 세 가지 원색.
    - CMY를 충분히 섞으면 검정색이 되지만, 경제적인 이유로 Black을 함께 사용한다.

- 참고. 물감의 삼원색: Red, Yellow, Blue.

## HSV 모델

- 색상, 채도, 명도(Hue, Saturation, Brightness/Value)를 수치로 나타낸 모델.


## 인덱스 모델

- 컬러의 수가 제한된 컬러
    - 예) 8bit: 256 컬러
- 파일 용량을 줄이기 위해 파일의 컬러를 적절하게 줄인다.

## Grayscale

그레이스케일

- 8비트를 사용해, 백색에서 검정색까지 256 단계를 나타낸 이미지.



