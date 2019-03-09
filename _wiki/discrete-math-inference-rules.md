---
layout  : wiki
title   : 추론규칙
summary : Rules of Inference
date    : 2019-01-06 11:36:44 +0900
updated : 2019-01-06 13:32:33 +0900
tag     : math
toc     : true
public  : true
parent  : study-discrete-mathematics
latex   : true
---
* TOC
{:toc}

# 추론 규칙

* tatuology : 항진 명제. **항**상 **참**인 명제.
    * $$ (p ∧ ( p → q )) → q $$.

## 긍정 논법 Modus Pones

$$
\begin{array}{l}
    p → q \\
    p \\
    \hline
    \therefore q
\end{array}
$$

$$ (p ∧ (p → q)) → q $$

## 부정 논법 Modus tollens

$$
\begin{array}{l}
    \lnot q \\
    p \rightarrow q \\
    \hline
    \therefore \lnot p
\end{array}
$$

$$ ( ¬ q ∧ (p → q)) → ¬ p $$

## 가설적 삼단논법 Hypothetical Syllogism

$$
\begin{array}{l}
    p → q \\
    q → r \\
    \hline
    \therefore p → r \\
\end{array}
$$

$$ ((p → q) ∧ (q → r)) → (p → r) $$

## 논리합 삼단논법 Disjunctive Syllogism

$$
\begin{array}{l}
    p ∨ q \\
    ¬ p \\
    \hline
    ∴ q \\
\end{array}
$$

$$ ((p ∨ q) ∧ ¬p) → q $$

## 가산논법 Addition 

$$
\begin{array}{l}
    p \\
    \hline
    \therefore p \lor q \\
\end{array}
$$

$$ p → (p ∨ q) $$

## 단순화 논법 Simplification 

$$
\begin{array}{l}
    p \land q \\
    \hline
    \therefore p \\
\end{array}
$$

$$ ( p \land q ) \rightarrow p $$

## 논리곱 논법 Conjunction 

$$
\begin{array}{l}
    p \\
    q \\
    \hline
    \therefore p \land q \\
\end{array}
$$

$$ ( (p) \land (q) ) \rightarrow (p \land q) $$

## 용해법 Resolution 

$$
\begin{array}{l}
    p \lor q \\
    \lnot p \lor r \\
    \hline
    \therefore q \lor r \\
\end{array}
$$

$$ ((p ∨ q) ∧ (¬p ∨ r)) → (q ∨ r) $$

마지막의 $$ q ∨ r $$ 부분을 용해식(resolvent)이라 부른다.

$$ q = r $$ 인 경우를 생각해 보자.

$$
\begin{array}{l}
    p \lor q \\
    \lnot p \lor q \\
    \hline
    \therefore q \lor q \\
\end{array}
$$

$$
\begin{align}
((p ∨ q) ∧ (¬p ∨ q)) & → (q ∨ q) \\
((p ∨ q) ∧ (¬p ∨ q)) & → q \\
\end{align}
$$

이번에는 $$ r = F $$ 인 경우를 생각해 보자.

$$
\begin{array}{l}
    p \lor q \\
    \lnot p \lor F \\
    \hline
    \therefore q \lor F \\
\end{array}
$$

$$
\begin{align}
((p ∨ q) ∧ (¬p ∨ F)) & → (q ∨ F) \\
((p ∨ q) ∧ ¬p) & → q \\
\end{align}
$$

# 오류 Fallacies

## 결론 단언의 오류

**fallacy of affirming the conclusion**

$$ ((p → q) ∧ q) → p $$ 형태의 오류. p 가 거짓이고 q 가 참일 때 거짓이 된다.

* "(p 이면 q 인데... q 이니까) p 겠지?"
* "(강아지는 동물인데... 얘는 동물이니까) 강아지겠지?"

## 가정 부정의 오류

**fallacy of denying the hypothesis**

$$  ((p → q) ∧ ¬p) → ¬q $$ 형태의 오류. p 가 거짓이고 q 가 참일 때 거짓이 된다.

* "(p 이면 q 인데... p 가 아니니까) q 가 아니겠지?"
* "(강아지는 동물인데... 얘는 강아지가 아니니까) 동물이 아니겠지?"

# 한정 기호의 사용

## 전칭 예시화

**Universal instantiation (UI)**

$$
\begin{array}{l}
    ∀x P(x) \\
    \hline
    ∴ P(c) \\
\end{array}
$$

* 모든 x 에 대하여 P(x) 가 참이면, P(c) 는 참이다.

## 전칭 일반화

**Universal generalization**

$$
\begin{array}{l}
    P(c) \text{ for an arbitrary } c \\
    \hline
    \therefore \forall x P(x) \\
\end{array}
$$

* 임의의 c 에 대하여 P(c) 가 참이면, 모든 x 에 대해 P(x) 는 참이다.
    * 임의의 c 에 대하여 : 정의역에 속하는 모든 원소를 모두 대입한다 할 지라도

## 존재 예시화

**Existential instantiation**

$$
\begin{array}{l}
    \exists x P(x) \\
    \hline
    \therefore P(c) \text{ for some element } c \\
\end{array}
$$

## 존재 일반화

**Existential generalization**

$$
\begin{array}{l}
    P(c) \text{ for some element } c \\
    \hline
    \therefore \exists x P(x) \\
\end{array}
$$
