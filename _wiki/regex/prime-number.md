---
layout  : wiki
title   : 소수를 판별하는 정규식
summary : 1진법을 사용해 소수를 판별하자!
date    : 2017-09-20 20:56:55 +0900
updated : 2022-11-13 22:04:33 +0900
tag     : perl regex
resource: C0/A3C8AB-0AC5-4B29-BD74-550A24462F3E
toc     : true
comment : true
public  : true
parent  : [[/regex]]
---
* TOC
{:toc}

어젯밤, [책](https://www.nostarch.com/perloneliners )을 읽다가 신기한 코드 하나를 발견했다.

```sh
$ perl -lne '(1x$_) !~ /^1?$|^(11+?)\1+$/ && print "$_ is prime"'
```

말 그대로 정규식을 써서 소수를 판별하는 perl one liner 코드다. 오 신기한데?

그래서 아래와 같이 실행해 보았다. 그리고 997 입력 후 엔터.

```sh
$ perl -lne '(1x$_) !~ /^1?$|^(11+?)\1+$/ && print "$_ is prime"'
997
997 is prime
```
997이 소수라는 결과가 출력된다.

997은 평소 내가 외우고 있는 소수 중 하나로, 3자리 소수 중 가장 큰 소수이다.

모든 경우를 검증할 수는 없으니 로직을 확인해 보기로 하였다.

1. 주어진 숫자를 1진법으로 나타낸다. 예를 들면, `3`은 `111`로, `10`은 `1111111111`로 나타낸다.
2. 1진법으로 나타낸 숫자가 빈 문자열(`0`)이거나 `1`이면 소수가 아니다.
3. 1진법으로 나타낸 숫자가 `^(11+?)\1+$`와 매치되면 소수가 아니다.

여기서 핵심은 백 레퍼런스를 사용해서 `11+` 가 반복되는지를 검사하는 3번이다.

* `?`를 붙여 없음, `11`, `111`, `1111`.. 의 순서로 검사하고 있다. 즉, 2, 3, 4.. 로 나누어지는지를 검사한다.
    * 예를 들어 `111111`로 표현되는 `6`은 `11`이 두 번 이상 반복되는 형태이므로 합성수로 판별된다.
* 만약 절반에 해당하는 지점을 넘어선다면 `\1+$`가 불가능하므로 매치되지 않을 것이고, 소수로 판별된다.

사실 따지고 보면 이 정규식은 소수를 판별하는 게 아니라 합성수를 판별해낸다.
물론 합성수가 아니면 소수이니 그게 그거긴 하다.

세상에. 숫자 1만 사용해서 소수를 판별해내는 로직이다. 깔끔하고 우아하다.

```
/^1?$|^(11+?)\1+$/
```

{% raw %}
<svg xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" version="1.1" width="534.8515625" height="123.10449981689453">
    <defs>
        <style type="text/css">svg { background-color: #fff; }
            .root text, .root tspan { font: 12px Arial; }
            .root path { fill-opacity: 0; stroke-width: 2px; stroke: #000; }
            .root circle { fill: #6b6659; stroke-width: 2px; stroke: #000; }
            .anchor text, .any-character text { fill: #fff; }
            .anchor rect, .any-character rect { fill: #6b6659; }
            .escape text, .charset-escape text, .literal text { fill: #000; }
            .escape rect, .charset-escape rect { fill: #bada55; }
            .literal rect { fill: #dae9e5; }
            .charset .charset-box { fill: #cbcbba; }
            .subexp .subexp-label tspan, .charset .charset-label tspan, .match-fragment .repeat-label tspan { font-size: 10px; }
            .repeat-label { cursor: help; }
            .subexp .subexp-label tspan, .charset .charset-label tspan { dominant-baseline: text-after-edge; }
            .subexp .subexp-box { stroke: #908c83; stroke-dasharray: 6,2; stroke-width: 2px; fill-opacity: 0; }
            .quote { fill: #908c83; }
        </style>
    </defs>
    <metadata>
        <rdf:rdf>
            <cc:license rdf:about="http://creativecommons.org/licenses/by/3.0/">
                <cc:permits rdf:resource="http://creativecommons.org/ns#Reproduction"></cc:permits>
                <cc:permits rdf:resource="http://creativecommons.org/ns#Distribution"></cc:permits>
                <cc:requires rdf:resource="http://creativecommons.org/ns#Notice"></cc:requires>
                <cc:requires rdf:resource="http://creativecommons.org/ns#Attribution"></cc:requires>
                <cc:permits rdf:resource="http://creativecommons.org/ns#DerivativeWorks"></cc:permits>
            </cc:license>
        </rdf:rdf>
    </metadata>
    <desc>Created with Snap</desc>
    <g transform="matrix(1,0,0,1,15,10)" class="root"><g transform="matrix(1,0,0,1,10,0)" class="regexp"><path d="M10,31.75q0,-10 10,-10M474.8515319824219,31.75q0,-10 -10,-10M10,61.3545q0,10 10,10M474.8515319824219,61.3545q0,10 -10,10M0,51.552249908447266q10,0 10,-10V31.75M484.8515319824219,51.552249908447266q-10,0 -10,-10V31.75M0,51.552249908447266q10,0 10,10V61.3545M484.8515319824219,51.552249908447266q-10,0 -10,10V61.3545"></path><g transform="matrix(1,0,0,1,20,0)" class="regexp-matches"><path d="M0,21.75h116.3789M328.4726375,21.75H444.8515319824219M0,71.3545h0M444.8515375,71.3545H444.8515319824219"></path><g transform="matrix(1,0,0,1,116.3789,0)" class="match"><path d="M70.703125,21.75H95.7031M120.3827875,21.75H145.3828"></path><g transform="matrix(1,0,0,1,0,10)" class="match-fragment"><g class="label anchor"><rect width="70.703125" height="23.5"></rect><text x="0" y="0" transform="matrix(1,0,0,1,5,16.75)"><tspan>Start of line</tspan></text></g></g><g transform="matrix(1,0,0,1,80.7031,0)" class="match-fragment"><path d="M0,21.75q10,0 10,-10v-1.75q0,-10 10,-10h14.6796875q10,0 10,10v1.75q0,10 10,10"></path><g transform="matrix(1,0,0,1,15,10)" class="literal"><g class="label"><rect width="24.6796875" height="23.5" rx="3" ry="3"></rect><text x="0" y="0" transform="matrix(1,0,0,1,5,16.75)"><tspan class="quote">“</tspan><tspan>1</tspan><tspan class="quote">”</tspan></text></g></g></g><g transform="matrix(1,0,0,1,145.3828,10)" class="match-fragment"><g class="label anchor"><rect width="66.7109375" height="23.5"></rect><text x="0" y="0" transform="matrix(1,0,0,1,5,16.75)"><tspan>End of line</tspan></text></g></g></g><g transform="matrix(1,0,0,1,0,38.5)" class="match"><path d="M70.703125,32.8545H90.7031M160.0624875,32.8545H200.0625M353.140625,32.8544953125H378.1406"></path><g transform="matrix(1,0,0,1,0,21.1045)" class="match-fragment"><g class="label anchor"><rect width="70.703125" height="23.5"></rect><text x="0" y="0" transform="matrix(1,0,0,1,5,16.75)"><tspan>Start of line</tspan></text></g></g><g transform="matrix(1,0,0,1,80.7031,0)" class="match-fragment subexp"><rect rx="3" ry="3" class="subexp-box" transform="matrix(1,0,0,1,0,11.1045)" width="99.35939025878906" height="53.5"></rect><text x="0" y="0" transform="matrix(1,0,0,1,0,11.1045)" class="subexp-label"><tspan>group #1</tspan></text><g transform="matrix(1,0,0,1,10,21.1045)" class="regexp match"><path d="M24.6796875,11.75H44.6797"></path><g transform="matrix(1,0,0,1,0,0)" class="match-fragment literal"><g class="label"><rect width="24.6796875" height="23.5" rx="3" ry="3"></rect><text x="0" y="0" transform="matrix(1,0,0,1,5,16.75)"><tspan class="quote">“</tspan><tspan>1</tspan><tspan class="quote">”</tspan></text></g></g><g transform="matrix(1,0,0,1,34.6797,0)" class="match-fragment"><path d="M10,11.75q-10,0 -10,10v1.75q0,10 10,10h24.6796875q10,0 10,-10v-1.75q0,-10 -10,-10"></path><g transform="matrix(1,0,0,1,10,0)" class="literal"><g class="label"><rect width="24.6796875" height="23.5" rx="3" ry="3"></rect><text x="0" y="0" transform="matrix(1,0,0,1,5,16.75)"><tspan class="quote">“</tspan><tspan>1</tspan><tspan class="quote">”</tspan></text></g></g></g></g></g><g transform="matrix(1,0,0,1,190.0625,21.0918)" class="match-fragment"><path d="M10,11.7626953125q-10,0 -10,10v1.7626953125q0,10 10,10h153.078125q10,0 10,-10v-1.7626953125q0,-10 -10,-10M173.078125,26.7626953125l5,-5m-5,5l-5,-5"></path><g transform="matrix(1,0,0,1,10,0)" class="escape"><g class="label"><rect width="153.078125" height="23.525390625" rx="3" ry="3"></rect><text x="0" y="0" transform="matrix(1,0,0,1,5,16.7627)"><tspan>Back reference (group = 1)</tspan></text></g></g></g><g transform="matrix(1,0,0,1,378.1406,21.1045)" class="match-fragment"><g class="label anchor"><rect width="66.7109375" height="23.5"></rect><text x="0" y="0" transform="matrix(1,0,0,1,5,16.75)"><tspan>End of line</tspan></text></g></g></g></g></g><path d="M10,51.552249908447266H0M494.8515319824219,51.552249908447266H504.8515319824219"></path><circle cx="0" cy="51.552249908447266" r="5"></circle><circle cx="504.8515319824219" cy="51.552249908447266" r="5"></circle></g>
</svg>
{% endraw %}

## Links

* [PERL ONE LINERS](https://www.nostarch.com/perloneliners)
* [소수 판별 정규식 다이어그램](https://regexper.com/?#%5E1%3F%24%7C%5E(11%2B%3F)%5C1%2B%24 )
