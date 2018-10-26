---
layout  : wiki
title   : GCD - Greatest Common Divisor
summary : 최대공약수
date    : 2018-10-26 11:33:33 +0900
updated : 2018-10-26 11:58:49 +0900
tags    : math
toc     : true
public  : true
parent  : math
latex   : false
---
* TOC
{:toc}

# Show me the code

* go 언어로 GCD를 작성해 보았다.

```go
package main

func gcd(a, b int) int {
    if a < b {
        return gcd(b, a)
    }
    if a%b == 0 {
        return b
    }
    return gcd(b, a%b)
}
```

{% raw %}
<div id="locomotive-search">
    <div>a = <input type="number" value="60" id="gcd-a"/></div>
    <div>b = <input type="number" value="42" id="gcd-b"/></div>
    <div><input type="button" value="WolframAlpha에 GCD 물어보기" onClick="wolfram()"/></div>
</div>
{% endraw %}

{% raw %}
<script>
function wolfram() {

    var a = parseInt(document.getElementById('gcd-a').value, 10);
    var b = parseInt(document.getElementById('gcd-b').value, 10);
    var c = a - 1;

    var url = `https://www.wolframalpha.com/input/?i=gcd%7B${a},${b}%7D`;

    window.open(url, '_blank');
}
</script>
{% endraw %}

# Links

* <https://en.wikipedia.org/wiki/Greatest_common_divisor >

