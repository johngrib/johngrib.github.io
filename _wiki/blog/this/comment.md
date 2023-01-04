---
layout  : wiki
title   : 댓글 기능
summary : Disqus, utterances, giscus
date    : 2023-01-04 17:52:21 +0900
updated : 2023-01-04 17:52:21 +0900
tag     : 
resource: EE/AC5269-EF89-4322-B5AC-EBBD1803FA34
toc     : true
public  : true
parent  : [[/blog/this]]
latex   : false
---
* TOC
{:toc}

## 댓글기능 변경 history
### Disqus

<https://disqus.com/ >

[2017-11-26]( https://github.com/johngrib/johngrib.github.io/commit/44eeedde4da64f70c7c9255b165695bf928e75cc ) 부터 [2019-11-01]( https://github.com/johngrib/johngrib.github.io/commit/53dc0789bbb30fd672627bfffd72f9ade34a8287 ) 까지 사용했다.


- 장점
    - 특별히 조사하지 않아도 정적 사이트에 댓글 기능을 편리하게 추가할 수 있다.
    - 2017년에는 딱히 대안이 없었다.
    - Disqus에 로그인해서 댓글을 남기는 시스템. Disqus 댓글을 지원하는 지인들의 블로그에 내가 남긴 모든 댓글을 모아서 볼 수 있다.
    - 매우 유명한 댓글 서비스로, 오래 지속될 것으로 예상했다.
- 단점
    - 데이터가 Disqus에 저장되므로, Disqus가 폐쇄되면 댓글 데이터가 사라지게 된다.
    - 2년 이상 사용하면 무료 플랜이 끝나며 광고가 붙는다. (요즘도 이런지는 모르겠음)
    - 그렇다고 유료로 사용할 정도로 유료 기능이 마음에 들지는 않았다.

### Utterances

<https://utteranc.es/ >

[2019-11-01]( https://github.com/johngrib/johngrib.github.io/commit/53dc0789bbb30fd672627bfffd72f9ade34a8287 ) 부터 [2023-01-04]( https://github.com/johngrib/johngrib.github.io/commit/b1289a973b4c7e5e2b43acdb0348ff6785594200 ) 까지 사용했다.

- 장점
    - github issue를 사용하기 때문에 댓글 데이터를 정적 사이트를 운영하는 github repository에 함께 저장할 수 있다.
    - github과 통합된 것 같은 느낌이 좋았음.
- 단점
    - 댓글을 남길 때 github 계정으로 로그인해야 한다. 개발자 지인들은 상관없지만 일반 사용자들은 github 계정을 가지고 있지 않을 수도 있다.
    - Utterances의 문제라기보다는 github issue의 기능인데, 댓글과 포스트 매핑 규칙에 신경쓰지 않으면 B 글에 달린 댓글이 A 글에 나타나는 경우도 있다.
        - 그리고 이것은 버그가 아니다. 해결하는 방법이 있지만 좀 귀찮다.
    - 댓글에 대한 댓글을 남길 수 없다.

### Giscus

[2023-01-04]( https://github.com/johngrib/johngrib.github.io/commit/b1289a973b4c7e5e2b43acdb0348ff6785594200 ) 부터 사용하고 있다.

- 장점
    - github discussion을 사용하기 때문에 github issue 보다 더 대화하기 좋은 기능을 제공한다.
    - 댓글에 대한 댓글을 남길 수 있다.
    - Utterances에서 마이그레이션하기 용이하다.
        - github issue에서 Convert to discussion을 선택해 issue를 discussion으로 쉽게 변환할 수 있다.
- 단점
    - 아직까지 느끼지 못하고 있다.

## 구현

[_includes/comment.html]( https://github.com/johngrib/johngrib.github.io/blob/master/_includes/comment.html ) 참고

