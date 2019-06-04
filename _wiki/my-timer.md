---
layout  : wiki
title   : 타이머
summary :
date    : 2019-03-16 19:18:04 +0900
updated : 2019-06-04 21:20:33 +0900
tag     : tools
toc     : true
public  : true
parent  : tools
latex   : false
comment : false
---
* TOC
{:toc}

공부/운동할 때 사용하려고 간단하게 만들었다.

{% raw %}
<div id="my-timers">
    <timer-list :timers="timers" ></timer-list>
</div>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script async src="/js/farm-timer.js"></script>
<style>
body {
    margin: auto;
}
</style>
{% endraw %}

# Links

* <https://github.com/johngrib/farm-timer >
