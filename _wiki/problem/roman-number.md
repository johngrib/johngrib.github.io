---
layout  : wiki
title   : 로마 숫자 변환 문제
summary : 
date    : 2021-11-28 14:10:06 +0900
updated : 2022-08-04 00:04:39 +0900
tag     : 
resource: 49/3AF7E6-633D-45B4-9A57-B27097B02F77
toc     : true
public  : true
parent  : [[/problem]]
latex   : false
---
* TOC
{:toc}

## 로마 숫자

로마 숫자를 읽는 방법은 두 가지 규칙만 알면 된다.

- 규칙 1. 먼저 각 알파벳이 어떤 숫자를 의미하는지 파악한다.
    - `I = 1`, `V = 5`, `X = 10`, `L = 50`, `C = 100`, `D = 500`, `M = 1000`
- 규칙 2. 작은 숫자 하나가 큰 숫자의 왼쪽에 있다면 빼기로 생각해서 읽으면 된다.
    - `IV = 4`, `IX = 9`, `XL = 40`, `XC = 90`, `CD = 400`, `CM = 900`

다음은 로마 숫자를 올바르지 않게 작성한 경우이다.

- `IIV`는 작은 숫자 두 개가 왼쪽에 왔다. 따라서 `3 = 5 - 1 - 1`이 아니다.
    - `3`은 `III`로 쓴다.
- `XCM`는 작은 숫자 두 개가 왼쪽에 왔다. 따라서 `890 = 1000 - 100 - 10`이 아니다.
    - `890`은 `DCCCXC`로 쓴다. `D + CCC + XC = 500 + 300 + 90`

다음은 올바르게 작성한 예제이다.

- 1 ~ 10: `I`, `II`, `III`, `IV`, `V`, `VI`, `VII`, `VIII`, `IX`, `X`
- 11 ~ 20: `XI`, `XII`, `XIII`, `XIV`, `XV`, `XVI`, `XVII`, `XVIII`, `XIX`, `XX`
- 21 ~ 30: `XXI`, `XXII`, `XXIII`, `XXIV`, `XXV`, `XXVI`, `XXVII`, `XXVIII`, `XXIX`, `XXX`
- 31 ~ 40: `XXXI`, `XXXII`, `XXXIII`, `XXXIV`, `XXXV`, `XXXVI`, `XXXVII`, `XXXVIII`, `XXXIX`, `XL`
- 41 ~ 50: `XLI`, `XLII`, `XLIII`, `XLIV`, `XLV`, `XLVI`, `XLVII`, `XLVIII`, `XLIX`, `L`
- 51 ~ 60: `LI`, `LII`, `LIII`, `LIV`, `LV`, `LVI`, `LVII`, `LVIII`, `LIX`, `LX`
- 61 ~ 70: `LXI`, `LXII`, `LXIII`, `LXIV`, `LXV`, `LXVI`, `LXVII`, `LXVIII`, `LXIX`, `LXX`
- 71 ~ 80: `LXXI`, `LXXII`, `LXXIII`, `LXXIV`, `LXXV`, `LXXVI`, `LXXVII`, `LXXVIII`, `LXXIX`, `LXXX`
- 81 ~ 90: `LXXXI`, `LXXXII`, `LXXXIII`, `LXXXIV`, `LXXXV`, `LXXXVI`, `LXXXVII`, `LXXXVIII`, `LXXXIX`, `XC`
- 91 ~ 100: `XCI`, `XCII`, `XCIII`, `XCIV`, `XCV`, `XCVI`, `XCVII`, `XCVIII`, `XCIX`, `C`

## 아라비아 숫자를 로마 숫자로 변환

아라비아 숫자를 로마 숫자로 변환하는 코드를 작성하는 건 꽤 간단하면서도 재미있는 작업이다.

### 단순한 방법

생각할 수 있는 가장 단순한 방법은 다음과 같을 것이다. 언어는 Javascript를 사용했다.

```javascript
// 값을 정의한다
const mapping = [
  { arabic: 1000, roman: 'M' },
  { arabic: 900, roman: 'CM' },
  { arabic: 500, roman: 'D' },
  { arabic: 400, roman: 'CD' },
  { arabic: 100, roman: 'C' },
  { arabic: 90, roman: 'XC' },
  { arabic: 50, roman: 'L' },
  { arabic: 40, roman: 'XL' },
  { arabic: 10, roman: 'X' },
  { arabic: 9, roman: 'IX' },
  { arabic: 5, roman: 'V' },
  { arabic: 4, roman: 'IV' },
  { arabic: 1, roman: 'I' },
];

// 아라비아 숫자를 입력받아 로마 숫자 문자열을 리턴한다
const arabic_to_roman = (arabic) => {
  let result = '';
  let i = 0;
  while (arabic > 0) {
    if (arabic >= mapping[i].arabic) {
      result = result.concat(mapping[i].roman)
      arabic -= mapping[i].arabic;
    } else {
      i++;
    }
  }
  return result;
};
```

로직은 단순하다. 주어진 아라비아 숫자에서 뺄 수 있는 가장 큰 로마 숫자를 뺄셈해가며 문자열을 완성하는 방법이다.

만약 루프를 좀 덜 돌게 하고 싶다면 이렇게 할 수도 있겠다.

```javascript
// 아라비아 숫자를 입력받아 로마 숫자 문자열을 리턴한다
const arabic_to_roman = (arabic) => {
    let result = '';
    let i = 0;
    while (arabic > 0) {
        if (arabic >= mapping[i].arabic) {
            const count = Math.floor(arabic / mapping[i].arabic);
            result = result.concat(mapping[i].roman.repeat(count));
            arabic = arabic % mapping[i].arabic;
        } else {
            i++;
        }
    }
    return result;
};
```

재귀로 표현하는 것도 재미있는 방법일 것이다.

```javascript
// 아라비아 숫자를 입력받아 로마 숫자 문자열을 리턴한다
const arabic_to_roman = (arabic, level) => {
    if (arabic <= 0) {
        return '';
    }
    if (level == undefined) {
        level = 0;
    }
    const count = Math.floor(arabic / mapping[level].arabic);
    const prefix = mapping[level].roman.repeat(count);
    const postfix = arabic_to_roman(arabic % mapping[level].arabic, level + 1);

    return prefix + postfix
};
```

테스트 코드는 굳이 테스트 프레임워크를 사용하지 않고도 다음과 같이 단순하게 작성할 수 있다.

```javascript
const check_list = [
  { arabic: 1954, roman: 'MCMLIV' },
  { arabic: 1776, roman: 'MDCCLXXVI' },
  { arabic: 1066, roman: 'MLXVI' },
  { arabic: 207, roman: 'CCVII' },
  { arabic: 246, roman: 'CCXLVI' },
  { arabic: 39, roman: 'XXXIX' },
  { arabic: 10, roman: 'X' },
  { arabic: 7, roman: 'VII' },
  { arabic: 4, roman: 'IV' },
  { arabic: 3, roman: 'III' },
  { arabic: 2, roman: 'II' },
  { arabic: 1, roman: 'I' },
];

check_list.forEach((check) => {
  const result = arabic_to_roman(check.arabic);
  const correct = (result === check.roman) ? '맞음' : '틀림';
  console.log(`결과: ${correct}, ${check.arabic} = ${check.roman}`);
});
```

실행 결과는 다음과 같다.

```
결과: 맞음, 1954 = MCMLIV
결과: 맞음, 1776 = MDCCLXXVI
결과: 맞음, 1066 = MLXVI
결과: 맞음, 207 = CCVII
결과: 맞음, 246 = CCXLVI
결과: 맞음, 39 = XXXIX
결과: 맞음, 10 = X
결과: 맞음, 7 = VII
결과: 맞음, 4 = IV
결과: 맞음, 3 = III
결과: 맞음, 2 = II
결과: 맞음, 1 = I
```

### 파이프라인을 구성하는 방법

나는 이 문제를 예전에 다녔던 회사에서 아샬님을 통해 알게 됐는데, 그 때 나는 파이프라인 방식을 아주 좋아했기 때문에 다음과 같이 풀었다.

몇 년이 지났지만 나는 이 방법이 아직도 꽤 마음에 든다.

```javascript
const print = (str) => process.stdout.write(str);
const chain = (a, b) => b(a);

function calc(arabic, roman_sign, input_number) {
    const count = Math.floor(input_number / arabic);
    print(roman_sign.repeat(count));
    return input_number % arabic;
}

const roman = (arabic, roman_sign) => calc.bind(null, arabic, roman_sign);

const mapping = [
    (num) => { print(`${num} : `); return num; },
    roman(1000, "M"),
    roman(900, "CM"),
    roman(500, "D"),
    roman(400, "CD"),
    roman(100, "C"),
    roman(90, "XC"),
    roman(50, "L"),
    roman(40, "XL"),
    roman(10, "X"),
    roman(5, "V"),
    roman(4, "IV"),
    roman(1, "I"),
    () => console.log(),
];
```

```javascript
const printRoman = (num) => mapping.reduce(chain, num);

printRoman(1954);
printRoman(1776);
printRoman(1066);
printRoman(207);
printRoman(246);
printRoman(39);
printRoman(10);
printRoman(7);
printRoman(4);
printRoman(3);
printRoman(2);
printRoman(1);
```

## 로마 숫자를 아라비아 숫자로 변환

### 정규식을 쓰는 방법

[Codewars의 Roman Numerals Decoder 문제]( https://www.codewars.com/kata/51b6249c4612257ac0000005/ )의 [해법 중 하나]( https://www.codewars.com/kata/reviews/5d2cafbf0abb7b000108af5a/groups/6040fa6e6f2b2b00019c85c9 )를 보고 배운 방법이다.

아래의 코드는 이 방법을 응용해 내가 Clojure로 작성한 것으로 `let`을 사용하지 않고 스레딩 매크로(`->>`)를 사용한다는 점이 다르다.

```clojure
(def roman-number {"M"  1000
                   "CM" 900
                   "D"  500
                   "CD" 400
                   "C"  100
                   "XC" 90
                   "L"  50
                   "XL" 40
                   "X"  10
                   "IX" 9
                   "V"  5
                   "IV" 4
                   "I"  1})

(defn translate-roman-numerals [roman-number-string]
  (->> (re-seq #"CM|CD|XC|XL|IX|IV|[MDCLXVI]" roman-number-string)
       (map roman-number)
       (apply +)))
```

Clojure의 간결함이 눈에 띈다.

## 참고문헌

- [Codewars의 Roman Numerals Decoder 문제]( https://www.codewars.com/kata/51b6249c4612257ac0000005/ )

