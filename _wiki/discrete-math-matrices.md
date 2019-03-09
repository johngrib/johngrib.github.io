---
layout  : wiki
title   : 행렬
summary : Matrices
date    : 2019-02-02 18:38:20 +0900
updated : 2019-02-04 20:07:14 +0900
tag     : math
toc     : true
public  : true
parent  : study-discrete-mathematics
latex   : true
---
* TOC
{:toc}

# 정의

>
A matrix is a rectangular array of numbers.
A matrix with m rows and n columns is called an $$m \times n$$ matrix.
The plural of matrix is matrices.
A matrix with the same number of rows as columns is called square.
Two matrices are equal
if they have the same number of rows and the same number of columns
and the corresponding entries in every position are equal.

* 행렬은 숫자를 사각형으로 배열한 것이다.
* 행렬의 영문명 matrix 는 단수형이고 matrices 는 복수형이다.
* $$ m $$ 개의 행과 $$ n $$개의 열을 갖는 행렬을 $$ m \times n $$ 행렬이라 한다.
    * 예: $$ \begin{bmatrix} 1 & 2 \\ 3 & 4 \\ 5 & 6 \end{bmatrix} $$은 $$ 3 \times 2 $$ 행렬이다.

>
Let m and n be positive integers and let  
$$
A =
\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots &        & a_{mn} \\
\end{bmatrix}
$$  
The $$i$$th row of A is the $$1 \times n$$ matrix $$[a_{i1},a_{i2}, ... ,a_{in}]$$.  
The $$j$$th column of A is the $$m \times 1$$ matrix
$$
\begin{bmatrix}
a_{1j} \\
a_{2j} \\
\vdots \\
a_{mj} \\
\end{bmatrix}
$$  
The $$(i, j)$$th element or entry of A is the element $$a_{ij}$$,
that is, the number in the $$i$$th row and $$j$$th column of A.
A convenient shorthand notation for expressing the matrix A is to write $$A = [a_{ij}]$$, which indicates that A is the matrix with its $$(i, j)$$th element equal to $$a_{ij}$$.

* 위의 행렬 A에서,
    * A의 $$ i $$ 번째 **행(row)**은 $$[a_{i1},a_{i2}, ... ,a_{in}]$$ 이다.
    * A의 $$ j $$ 번째 **열(column)**은 $$ \begin{bmatrix} a_{1j} \\ a_{2j} \\ \vdots \\ a_{mj} \\ \end{bmatrix} $$ 이다.
    * A의 $$(i,j)$$ 번째 **원소(element)**는 원소 $$a_{ij}$$ 이다.
    * 행렬 A를 $$ A = [a_{ij}] $$ 로 짧게 표현하기도 한다.

## 행렬의 합

>
Let $$A = [a_{ij}]$$ and $$B = [b_{ij}]$$ be $$m \times n$$ matrices.
The sum of A and B,
denoted by $$A + B$$, is the $$m \times n$$ matrix that has $$a_{ij} + b_{ij}$$ as its $$(i,j)$$th element.
In other words, $$A+B=[a_{ij} + b_{ij}]$$.

* $$ A + B = [ a_[ij] + b_{ij} ] $$.
* 크기가 다른(모양이 다른) 두 행렬의 합은 구할 수 없다.

## 행렬의 곱

>
Let A be an $$m \times k$$ matrix and B be a $$k \times n$$ matrix.
The product of A and B, denoted by AB, is the $$m \times n$$ matrix with its $$(i, j)$$th entry equal to the sum of the products of the corresponding elements from the ith row of A and the j th column of B. In other words, if $$AB = [c_{ij}]$$, then  
$$c_{ij} =a_{i1} \times b_{1j} + a_{i2} \times b_{2j} + ··· + a_{ik} \times b_{kj}$$.

* $$m \times k$$ 행렬과 $$k \times n$$ 행렬의 곱은 $$m \times n$$ 행렬이다.
* 행렬의 곱은 교환법칙이 성립하지 않는다(Matrix multiplication is not commutative).
    * $$ A \times B \ne B \times A $$이므로 주의할 것.

## 항등 행렬

**identity matrix of order n**: n차 항등 행렬

>
The identity matrix of order n is the $$n \times n$$ matrix $$I_n = [δ_{ij}]$$,
where $$δ_{ij} = 1 $$ if $$i = j$$ and $$δ_{ij} = 0$$ if $$i̸=j$$.  
Hence
$$
I_n =
\begin{bmatrix}
1 & 0 & \cdots & 0 \\
0 & 1 & \cdots & 0 \\
. & . &        & . \\
. & . &        & . \\
. & . &        & . \\
0 & 0 & \cdots & 1 \\
\end{bmatrix}
$$

* 항등 행렬은 $$ i = j $$ 인 원소가 `1`, $$ i \ne j $$인 원소가 `0`인 행렬이다.

## 전치 행렬

**transpose**

$$
\def\red#1{\color{red} #1}
$$

>
Let $$A = [a_{ij}]$$ be an $$m \times n$$ matrix.
The transpose of A, denoted by $$A^t$$,
is the $$n \times m$$ matrix obtained by interchanging the rows and columns of A.
In other words,
if $$A^t = [b_{ij}]$$,
then $$b_{ij} = a_{ji}$$
for $$i = 1,2, ... ,n$$ and $$j = 1,2,...,m$$.

* 행렬 A의 전치 행렬 $$A^t$$ 는 A의 행과 열을 바꾼 행렬이다.
* $$\begin{bmatrix} \red 1 & \red 2 & \red 3 \\ 4 & 5 & 6 \end{bmatrix}$$의 전치행렬은 $$\begin{bmatrix} \red 1 & 4 \\ \red 2 & 5 \\ \red 3 & 6 \end{bmatrix}$$.

## 대칭행렬

**symmetric**

>
A square matrix A is called **symmetric** if $$A = A^t$$.
Thus $$A = [a_{ij}]$$ is symmetric if $$a_{ij} = a_{ji}$$
for all $$i$$ and $$j$$ with $$1 ≤ i ≤ n$$ and $$1 ≤ j ≤ n$$.

* $$ A = A^t $$ 이고 정방행렬이면 대칭행렬이다.
* $$\begin{bmatrix} \red 1 & 1 & 0 \\ 1 & \red 0 & 1 \\ 0 & 1 & \red 0 \\ \end{bmatrix}$$는 대칭행렬이다.
    * 왼쪽 위에서 오른쪽 아래로의 대각선 기준으로 대칭이라 생각하면 알아보기 쉽다.

## 0-1 행렬

**zero-one matrices**

* 원소가 0과 1만 있는 행렬.
    * [(0,1)의 두 수로 이루어진 체(Field) 위에서의 행렬처럼 생각하는 것이 조금 더 자연스럽다.](https://github.com/johngrib/johngrib.github.io/issues/47#issue-406243600 )

### 0-1 행렬의 결합과 만남

**join, meet**

>
Let $$A = [a_{ij}]$$ and $$B = [b_{ij}]$$ be $$m \times n$$ zero–one matrices.
Then the join of A and B is the zero–one matrix with $$(i, j)$$th entry $$a_{ij} ∨ b_{ij}$$.
The join of A and B is denoted by $$A ∨ B$$.
The meet of A and B is the zero–one matrix with $$(i,j)$$th entry $$a_{ij} ∧ b_{ij}$$.
The meet of A and B is denoted by $$A ∧ B$$.

* A와 B의 결합(join) 행렬
    * $$ A ∨ B $$로 표기한다.
    * $$(i,j) = a_{ij} ∨ b_{ij}$$ 를 원소로 한다. 평범한 or 연산이다.

$$
\text{join의 예}:
\begin{bmatrix}
0 & 0 \\
1 & 1 \\
\end{bmatrix}
∨
\begin{bmatrix}
0 & 1 \\
0 & 1 \\
\end{bmatrix}
=
\begin{bmatrix}
0 & 1 \\
1 & 1 \\
\end{bmatrix}
$$

* A와 B의 만남(meet) 행렬
    * $$ A ∧ B $$로 표기한다.
    * $$(i,j) = a_{ij} ∧ b_{ij}$$ 를 원소로 한다. 평범한 and 연산이다.

$$
\text{meet의 예}:
\begin{bmatrix}
0 & 0 \\
1 & 1 \\
\end{bmatrix}
∧
\begin{bmatrix}
0 & 1 \\
0 & 1 \\
\end{bmatrix}
=
\begin{bmatrix}
0 & 0 \\
0 & 1 \\
\end{bmatrix}
$$

### 0-1 행렬의 부울곱

**Boolean product**

>
Let $$A = [a_{ij}]$$ be an $$m \times k$$ zero–one matrix
and $$B = [b_{ij}]$$ be a $$k \times n$$ zero–one matrix.
Then the Boolean product of A and B, denoted by $$A \odot B$$,
is the $$m \times n$$ matrix with $$(i, j)$$th entry $$c_{ij}$$ where  
$$c_{ij} = (a_{i1} ∧ b_{1j}) ∨ (a_{i2} ∧ b_{2j}) ∨ \cdots ∨ (a_{ik} ∧ b_{kj})$$

* 행렬의 곱셈과 똑같다.
    * 표기법으로 곱은 $$ ∧ $$(and), 합은 $$ ∨ $$(or) 를 쓰지만, 그냥 곱셈과 덧셈과 같다.

$$
\begin{align}
    \begin{bmatrix}
    1 & 0 \\
    0 & 1 \\
    1 & 0 \\
    \end{bmatrix}
    \odot
    \begin{bmatrix}
    1 & 1 & 0 \\
    0 & 1 & 1 \\
    \end{bmatrix}
    & =
    \begin{bmatrix}
    (1 ∧ 1) ∨ (0 ∧ 0) & (1 ∧ 1) ∨ (0 ∧ 1) &(1 ∧ 0) ∨ (0 ∧ 1) \\
    (0 ∧ 1) ∨ (1 ∧ 0) & (0 ∧ 1) ∨ (1 ∧ 1) &(0 ∧ 0) ∨ (1 ∧ 1) \\
    (1 ∧ 1) ∨ (0 ∧ 0) & (1 ∧ 1) ∨ (0 ∧ 1) &(1 ∧ 0) ∨ (0 ∧ 1) \\
    \end{bmatrix} \\
    & =
    \begin{bmatrix}
    1 ∨ 0 & 1 ∨ 0 & 0 ∨ 0 \\
    0 ∨ 0 & 0 ∨ 1 & 0 ∨ 1 \\
    1 ∨ 0 & 1 ∨ 0 & 0 ∨ 0 \\
    \end{bmatrix} \\
    & =
    \begin{bmatrix}
    1 & 1 & 0 \\
    0 & 1 & 1 \\
    1 & 1 & 0 \\
    \end{bmatrix} \\
\end{align}
$$

#### 부울곱의 거듭제곱

**Boolean power**

>
Let A be a square zero–one matrix and let $$r$$ be a positive integer.
The $$r$$th Boolean power of A is the Boolean product of $$r$$ factors of A.
The $$r$$th Boolean product of A is denoted by $$A^{[r]}$$. Hence  
$$A^{[r]} = \underbrace{ A \odot A \odot A \odot ... \odot A }_{r 개} $$

* A 를 r 번 부울곱하는 것은 $$ A^{[r]} $$ 로 표기한다.
    * 행렬의 부울 곱은 결합 법칙이 성립한다.
* $$ A^{[0]} = I_n $$.
    * $$ I_n $$은 항등 행렬.


# 용어 정리

| English                    | 한국어           | 예/설명                                                      |
|----------------------------|------------------|--------------------------------------------------------------|
| matrix                     | 행렬             |                                                              |
| matrices                   | 행렬(들)         |                                                              |
| square matrix              | 정방 행렬        | 행과 열의 수가 같은 정사각형 모양의 행렬                     |
| row                        | 행               |                                                              |
| column                     | 열               |                                                              |
| element                    | 행렬의 원소      |                                                              |
| identity matrix            | 항등행렬         | 2차 항등행렬: $$\begin{bmatrix}1 & 0 \\ 0 & 1\end{bmatrix}$$ |
| identity matrix of order n | n차 항등행렬     |                                                              |
| transpose                  | 전치 행렬        | 행과 열을 바꾼 행렬                                          |
| symmetric                  | 대칭 행렬        |                                                              |
| zero-one matrix            | 0-1 행렬         | 0과 1만을 갖고 있는 행렬                                     |
| join matrix                | 결합 행렬        | $$ A ∨ B $$                                                  |
| meet matrix                | 만남 행렬        | $$ A ∧ B $$                                                  |
| Boolean product of A and B | A와 B의 부울곱   | $$ A \odot B $$                                              |
| $$r$$th Boolean power of A | A의 r번째 부울곱 | $$ A^{[r]}$$                                                 |


# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일

