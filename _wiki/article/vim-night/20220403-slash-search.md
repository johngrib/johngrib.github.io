---
layout  : wiki
title   : (백업) 아름다운 Vㅏㅁ 2022년 4월 3일
summary : 텍스트 검색 이야기
date    : 2022-11-17 22:10:07 +0900
updated : 2022-11-17 22:49:50 +0900
tag     : 
resource: 52/0471E5-B7FB-4761-A435-CF52E3CAAAAA
toc     : true
public  : true
parent  : [[/article]]
latex   : false
---
* TOC
{:toc}

>
이 글은 2022년 4월 3일 트위터에 쓴 글을 백업한 것입니다.
{:style="background-color: #fff9e4;"}

<blockquote class="twitter-tweet"><p lang="ko" dir="ltr">vim에서 뭘 검색할 때 / 를 쓰는 게 기본이긴 한데 이렇게 검색한 검색어가 검색을 마친다고 사라지는 게 아니라 / register에 들어간다는 걸 활용하는 기능이 있다. 바로 replace.</p>&mdash; John Grib (@John_Grib) <a href="https://twitter.com/John_Grib/status/1510417976192761857?ref_src=twsrc%5Etfw">April 3, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## / 에서 검색 패턴을 생략하면 어떻게 될까?

vim에서 뭘 검색할 때 `/`를 쓰는 게 기본이긴 한데 이렇게 검색한 검색어가 검색을 마친다고 사라지는 게 아니라 `/` register에 들어간다는 걸 활용하는 기능이 있다. 바로 replace.

perl이나 sed에서와 같이 vim 에서도 `s/pattern/replace/` 이런 걸 쓴다. 그런데 `pattern`을 생략하면 어떻게 될까?

```
s/pattern/replace/
s//replace/
```

즉 위의 두 개 중 후자를 쓰는 방법. 이렇게 검색 `pattern`을 생략하면 vim은 `/` register를 사용해 `pattern`을 채워넣는다.

보통 뭔가 찾아서 replace하려 할 때 사람이 그리 과감하지 않죠. 먼저 검색을 해서 내 의도대로 검색 패턴이나 정규식이 잘 검색되나 확인을 해보고, 아 잘되네 이걸로 replace 해야겠구나 생각을 하는데 여기에서 귀찮은게 바로 replace 하기 위한 명령을 적을 때 검색어를 또 적어야 한다는 거.

즉 `/pattern` 으로 먼저 검사를 해서 확인을 했으면 substitute 는 걍 `:s//replace` 로 끝낼 수 있다. 이렇게 타이핑 몇 번을 또 줄이게 되는 것. 레지스터 만세.

## `*`의 사용

이건 당연히 `*` 검색에서도 통한다. `*`은 다른게 아니고 단어 텍스트 오브젝트를 검색해주는 normal 명령인데 커서가 지시하고 있는 단어를 바로 검색해주므로 몹시 편하다.
그런데 패턴을 잘 보면 양쪽에 `\< \>`를 씌우고 있다. 이건 vim에서 사용하는 단어의 경계를 의미하는 패턴.

<video controls autoplay loop><source src=" /resource/52/0471E5-B7FB-4761-A435-CF52E3CAAAAA/5OcBUnUm_zdLTR9C.mp4 " type="video/mp4"></video>

그래서 단어 하나를 검색해 replace하는 쉬운 방법 하나는 단어 위에 커서가 있을 때 `*`을 누르고 `:%s//replace/g` 처럼 입력하는 것.
이러면 검색 패턴도 `*` 한 번 누르는 것으로 해결되므로 실제로 누르는 키스트로크가 많이 줄어든다.

## very magic

한편 vim의 정규식이 perl 스타일의 정규식이나 그걸 이어받은 javascript 스타일의 정규식과 좀 달라서 vim에서 정규식을 쓰는 건 좀 복잡한 일일 수 있는데, 이걸 설정하는 옵션이 있다.
그것이 `\v` 역슬래시 브이. 이건 이름이 좀 웃김. very magic 으아 베리에 매직이라니.

`/` 뒤에 바로 `\v`를 입력하고 익숙한 스타일의 정규식을 사용하면 된다. vim 빌트인 정규식은 캡처 그룹 괄호에도 이스케이프를 해줘야 하는 등 헷갈리는 게 있는데 `\v`를 쓰면 이런걸 신경쓰지 않고 javascript 정규식 쓰는 기분으로 쓸 수 있어 편하다.

## 여러 파일 검색하기

그러면 파일 하나 안에서는 검색이 그렇다 치고, IDE에서처럼 여러 파일을 검색해서 목록으로 보는 기능도 있다. 그것이 `vimgrep`. `vimgrep`을 쓰면 검색 결과를 quickfix 로 볼 수 있게 갈무리해주는데... 아 이거 이야기하려면 quickfix도 이야기해야 하는구나...

`vimgrep`을 써서 검색하고 나서 검색 목록을 보려면 `:copen`을 입력하면 된다. 그러면 파일명 행번호 열번호 내용이 요약이 되고, 그 위에서 엔터를 치면 해당 파일로 이동하는 식.
quickfix 이야기를 하려면 quickfix 설정법도 이야기하게 될테니 엄청 길어질 거라 이건 다음 기회에.

<video controls autoplay loop><source src=" /resource/52/0471E5-B7FB-4761-A435-CF52E3CAAAAA/HYRjBUExe2w2nfvh.mp4 " type="video/mp4"></video>

quickfix 이야기는 다음으로 미뤘고, 그러면 여러 파일 검색할 때 `vimgrep`만 쓰느냐 하면 그건 아님. `vimgrep`보다 더 많이 쓰는 게 `fzf.vim`.
혁명적인 UI로 CLI에 빛을 던져준 명령 `fzf`를 vim에서 쓸 수 있게 도와주는 플러그인이라 할 수 있다.

<https://github.com/junegunn/fzf.vim >

fzf.vim을 쓰는 방법은 다양한데, 플러그인에서 제공해주는 기본 셋팅만으로도 꽤 편리한 명령이 많아서 어지간해서는 커스터마이징이 필요없을 정도.
가장 많이 쓰는 건 `:Files`, `:Ag`. Ag 는 나도 늘 사용하고 있는 [[/cmd/ag]]를 통합하는 명령이지만 다른 걸로 바꿔 끼울 수도 있을듯.

<video controls autoplay loop><source src=" /resource/52/0471E5-B7FB-4761-A435-CF52E3CAAAAA/FJT12RdljVUeegN-.mp4 " type="video/mp4"></video>

## / 와 숫자의 조합

여기에서 마무리할까 했는데 생각해보니 하나 더 이야기하면 좋겠어서 좀 더 써보자. 
`/`로 돌아가자. 두 가지 상식을 조합하도록 하자.

1. vim 검색을 할 때 `/`로 시작한다.
2. 대부분의 vim normal 명령은 숫자를 먼저 지정할 수 있다.

그래서 `/`도 숫자를 지정할 수 있다. 검색하고 nnn 해도 되지만 번지수를 알고 있다면 이렇게.

`10/plug`로 검색한 영상을 찍어 보았다.

<video controls autoplay loop><source src=" /resource/52/0471E5-B7FB-4761-A435-CF52E3CAAAAA/3dJ5EcXdNBeo2Fo8.mp4 " type="video/mp4"></video>

## / 에서 구분자는 꼭 / 가 아니어 된다

오늘 오전은 여기에서 끝. 
아니다 하나 더 써야 한다. sed와 perl 처럼 vim의 검색 구분자도 `/` 말고 다른 것도 쓸 수 있다. `s/pattern/replace/g` 이렇게 쓸 뿐만 아니라 `s,pattern,replace,g` 이렇게도 되고 `+` 도 되고, `#` 도 되고... 파일 경로 같은 거 쓸 때 `/` 쓰면 구분자랑 겹쳐서 잘 안 돌아가니까 이런 걸로 바꿔주면 된다. 

## vim guide 소개

이번엔 예전에 작성해둔 vim 가이드를 공유해보자. 시간이 꽤 지나서 이것저것 추가하고 싶은 것도 있고, 수정하고 싶은 내용도 있지만 일단은.

<https://github.com/johngrib/simple_vim_guide >

아니 플러그인 작성하는 방법을 글로 써야지 하고 TODO 리스트에 추가한 게 5년 전이라니... 세월이 쏜살같이 흐르네.

정말 우물쭈물하다 시간이 훅훅 간다. 
내가 작성한 vim 가이드의 "키 조합에 대하여"에서 미처 적지 못한 내용은 이 글에 대부분 녹여둔 것 같다.

[[/special-chars]]

