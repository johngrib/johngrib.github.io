---
layout  : wiki
title   : IdeaVim 사용하기
summary : 이거라도 쓰는 수 밖에 없다
date    : 2019-11-11 13:36:26 +0900
updated : 2025-01-25 21:52:14 +0900
tag     : vim ideavim intellij
resource: 44/580326-0E29-46DE-81F7-50A7AD8B4F60
toc     : true
public  : true
parent  : [[/vim]]
latex   : false
---
* TOC
{:toc}

## set options

모든 set 옵션은 [set-commands][set-commands]에서 볼 수 있다.

## action 명령

`:action`은 IntelliJ의 내장 기능을 실행해주는 편리한 명령이며, IntelliJ의 대부분의 기능은 `:action`으로 호출할 수 있는 아이디를 갖고 있다.

(IntelliJ 전용이기 때문에 당연히 vim 에서는 쓸 수 없다.)

모든 action은 `:actionlist`로 볼 수 있다. 3000개가 넘으므로 `command + a`로 복사해서 다른 곳에 붙여넣고 쓸만한 것이 있는지 찾아보면 된다.

`:action` 명령을 쓰는 기본적인 방법은 vim 명령행에서 입력하는 것이다.

예를 들어 `:action ManageRecentProjects`를 입력하고 엔터를 치면 프로젝트 선택 화면이 나온다.

하지만 `:action`의 진정한 활용은 역시 `nmap`, `map`에 있다.

`map`을 사용해 매핑할 때에는 두 가지 문법을 사용할 수 있다.

다음은 `<tab>f`에 `QuickFixes`를 매핑한 예제이다.

```viml
nnoremap <Tab>f :action QuickFixes<CR>
```

`<Action>`을 사용해도 된다. 이렇게 하면 `<CR>`을 마지막에 넣지 않아도 되므로 편리하다.
단, 재귀적 사용을 금지하는 `noremap` 옵션을 쓸 수 없으므로 `nnoremap`은 못 쓰고 `nmap`이나 `map` 만 쓸 수 있다.
어차피 `<Action>`으로는 IntelliJ의 기능만 호출하므로 당연히 재귀적 사용이 기본적으로 제한되어 있어서 그런 것 같다.

```viml
nmap <Tab>f <Action>(QuickFixes)
```

좀 더 pure vim 스럽게 쓰고 싶다면 그냥 `nnoremap` ... `<CR>`을 쓰면 되겠다.

```viml
" tabbar와 비슷한 느낌으로 사용할 수 있다
nnoremap \t :action ActivateStructureToolWindow<CR>

" startify와 비슷한 느낌으로 최근 프로젝트 이동을 할 수 있다
nnoremap \s :action ManageRecentProjects<CR>
```

### set trackactionids 을 통해 특정 기능의 action 아이디 알아내기

참고: [marketplace plugin example]( https://github.com/JetBrains/ideavim/wiki/marketplace-plugin-example )

`set trackactionids` 또는 `set tai`를 입력하면 IntelliJ의 기능을 사용할 때마다 화면 오른쪽 아래에 해당 기능의 action id를 팝업으로 보여준다.

이 아이디를 사용해서 `:action 아이디`로 호출하면 해당 기능을 사용할 수 있으므로, `nmap` 등에 매핑해서 사용하면 된다.

IntelliJ 빌트인 기능 뿐 아니라 marketplace에서 다운로드한 플러그인의 다양한 기능들도 아이디를 알아낼 수 있기 때문에 매우 유용하다.

## 플러그인

ideavim은 유명한 vim 플러그인의 에뮬레이션을 제공한다.

물론 vim 플러그인을 그대로 쓸 수 있는 것은 아니고, ideavim에서 사용할 수 있도록 만들어진 것이다.

2025-01-25일 기준으로 [ideavim에서도 사용할 수 있는 유명한 Vim 플러그인 구현 목록](https://github.com/JetBrains/ideavim/wiki/IdeaVim-Plugins )은 다음과 같다.

- easymotion
- sneak
- NERDTree
- surround
- multiple-cursors
- commentary
- ReplaceWithRegister
- argtextobj
- exchange
- textobj-entire
- highlightedyank
- vim-paragraph-motion
- vim-indent-object
- matchit.vim
- IdeaVim-Quickscope
- Which-Key
- Vim Peekaboo
- FunctionTextObj
- Switch

### easymotion

이제 ideavim에도 easymotion이 들어와서 easymotion 스타일로 커서를 이동시킬 수 있게 되었다.

그런데 ideavim 만으로는 작동이 안 된다는 문제가 있다. easymotion을 사용하려면 다음 절차를 거쳐야 한다.

- IntelliJ에서 [AceJump 플러그인](https://plugins.jetbrains.com/plugin/7086-acejump )과 [IdeaVim-EasyMotion 플러그인](https://plugins.jetbrains.com/plugin/13360-ideavim-easymotion )을 설치한다.
    - 둘 다 설치해야 easymotion을 쓸 수 있다.
- `.ideavimrc`에 다음 내용을 추가한다.

```viml
Plug 'easymotion/vim-easymotion'
```

만약 `space`를 `mapleader`로 사용한다면 다음과 같이 키를 매핑할 수 있다.

```viml
let mapleader=" "
nmap <Leader>l <Plug>(easymotion-lineforward)
nmap <Leader>j <Plug>(easymotion-j)
nmap <Leader>k <Plug>(easymotion-k)
nmap <Leader>h <Plug>(easymotion-linebackward)
nmap <Leader>a <Plug>(easymotion-jumptoanywhere)
```

나는 다음과 같이 사용하고 있다.

```viml
map <C-s>l <Plug>(easymotion-lineforward)
map <C-s>j <Plug>(easymotion-j)
map <C-s>k <Plug>(easymotion-k)
map <C-s>h <Plug>(easymotion-linebackward)
map <C-s><C-s> <Plug>(easymotion-jumptoanywhere)
map <C-s>f <Plug>(easymotion-f)
```

### NERDTree

<https://github.com/JetBrains/ideavim/wiki/NERDTree-support >

vim에서의 NERDTree는 아쉬운 점이 많아서 잘 안 쓰는데, Ideavim에서는 Project Explorer 제어 기능으로 포팅이 되면서 엄청 편리한 기능이 되었다.

Ideavim을 쓴다면 NERDTree는 필수 기능이라 생각한다. `command + 1`로 커서가 프로젝트 익스플로러로 이동한 이후에 j, k로 커서를 이동할 수 있고, 검색도 된다.

```viml
Plug 'preservim/nerdtree'
```

- `j`, `k` - 커서 위/아래 이동.
- `C-j`, `C-k` - 위/아래 sibling 이동.
- `S-j`, `S-k` - sibling 중 마지막, 첫번째로 이동.
- `m` - 컨텍스트 메뉴(우클릭).
- `o` - 파일 열기.
- `go` - 파일은 열지만 커서는 프로젝트 익스플로러에 남아 있음.
- `/` - 파일 이름 검색.
- `p` - 현재 커서가 위치한 노드의 직계 부모 노드로 이동.
- `P` - 최상위 노드로 이동. 즉 프로젝트 루트 디렉토리로 이동.

제공하는 명령은 여러가지가 있지만 굳이 다 알 거 없고 `NERDTreeFind` 하나면 알아도 충분한 것 같다.

Project Explorer를 활성화 시키면서 현재 편집중인 파일을 하이라이트시켜준다.
IntelliJ의 기본 키 제어로는 `option - F1, 1`을 써야 했는데, 이제는 이렇게 설정해서 쓴다.

```viml
nmap sff :NERDTreeFind<CR>
```

그런데 시간이 흐르며 `NERDTreeFind`와 똑같은 기능을 하는 `:action`이 생겼다. `SelectInProjectView`.

그래서 요즘은 다음과 같이 사용하고 있다.

```viml
map sff <Action>(SelectInProjectView)
```


### surround

surround 는 vim의 vim-surround와 똑같은 느낌으로 사용할 수 있었다.

surround를 사용하려면 `.ideavimrc`에 다음과 같이 추가해주면 된다.

```viml
Plug 'tpope/vim-surround'
```

### Vim Peekaboo

레지스터 미리보기 기능을 제공한다.
이걸 설치해 두면 귀찮게 `:reg`를 입력하지 않아도 된다.

Vim에서는 내 사용방식과 잘 맞지 않아서 쓰지 않았는데, 묘하게 IntelliJ에서는 더 편리한 느낌이 있다.

다음과 같이 사용하면 된다.

- IntelliJ에서 [Vim Peekaboo 플러그인](https://plugins.jetbrains.com/plugin/25776-vim-peekaboo )을 설치한다.
- `.ideavimrc`에 다음과 같이 추가한다.

```viml
set peekaboo
```

이후 NORMAL 모드에서 `"`를 입력하거나, INSERT 모드에서 `<c-r>`을 입력하면 IntelliJ 화면 왼쪽 아래쪽에 레지스터 미리보기가 나타난다.

## 경험

### 2017-01-30 빌드 오류 해결

오래간만에 [IdeaVIM Github][link1]에 가보니 Commit이 꽤 많아졌길래 별 생각 없이 `pull`을 했다.

```sh
git pull --rebase upstrem master
```

다음과 같이 빌드도 해 주었다.

```sh
./gradlew clean buildPlugin
```

그리고 IntelliJ에 들어가서 `Install plugin from disk`를 통해 빌드한 `jar`파일을 설치하려 했는데...

`Error : Plugin 'IdeaVim' is incompatible with this installation`라는 에러가 발생했다.

앗 뭐지. 온갖 삽질을 거친 끝에 [@ideavim][link-ideavim] 트위터 계정에 물어보니 [다음과 같은 응답][link-answer]을 받을 수 있었다.

> @JohnGrib Current master branch is 2017.1+ due to platform API changes, check out branch platform-143 for 2016.1+.

대충 현재 `master`브랜치는 IntelliJ IDEA 2017.1+ 빌드를 위한 것이니까, 2016.1+ 빌드를 위한 `platform-143`브랜치로 체크아웃하면 된다는 것. 해보니 잘 된다. 역시 삽질부터 하지 말고 진작 공식 계정에 물어볼 걸 그랬다.

[link1]: https://github.com/JetBrains/ideavim/commits/master
[link-ideavim]: https://twitter.com/ideavim
[link-answer]: https://twitter.com/ideavim/status/826032176286269440

## 함께 읽기

- [[/tool/jetbrains]]

## Link

- [JetBrains/ideavim][repo]
- [List of Supported Set Commands][set-commands]
- [나의 .ideavimrc][my]
- [Share your `~/.ideavimrc`]( https://github.com/JetBrains/ideavim/discussions/303 )
    * [Show Context Actions](https://github.com/JetBrains/ideavim/discussions/303#discussioncomment-1899760 )

## 주석

[repo]: https://github.com/JetBrains/ideavim
[my]: https://github.com/johngrib/dotfiles/blob/master/.ideavimrc
[set-commands]: https://github.com/JetBrains/ideavim/wiki/%22set%22-commands

