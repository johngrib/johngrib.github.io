---
layout  : wiki
title   : Vim의 gx 확장하기
summary : gx를 확장해서 다양한 용도로 사용하자
date    : 2022-12-23 14:53:36 +0900
updated : 2024-12-15 13:46:13 +0900
tag     : vim vim-enter-발표자료
resource: 10/9A63EA-F82B-4583-BAE6-33BAFB4B0449
toc     : true
public  : true
parent  : [[/article]]
latex   : false
---
* TOC
{:toc}

## 일러두기

![VimEnter 2022]( /resource/10/9A63EA-F82B-4583-BAE6-33BAFB4B0449/209291566-58be1a09-3b39-42e1-a472-182483de17d5.png )

>
- 이 글은 [au VimEnter * call Bye2022()]( https://event-us.kr/vim/event/51490 ) 발표 자료입니다.
- [NVIM v0.8.0 버전]( https://github.com/neovim/neovim/releases/tag/v0.8.0 )을 기준으로 합니다.
{:style="background-color: #ecf1e8;"}

## NeoVim의 gx

NeoVim에서 `gx`를 누르면 현재 커서가 위치한 문자열을 인식해서 적절한 애플리케이션으로 열어줍니다.

예를 들어 URL이면 브라우저로 열어줍니다.

이 `gx`는 [NeoVim의 빌트인 플러그인]( https://github.com/neovim/neovim/blob/1a9d2a4040f3ba3fe272488a7e85db6cdb453d39/runtime/plugin/netrwPlugin.vim#L84 )으로, 따로 설정을 해주지 않아도 기본으로 등록됩니다.

이제부터는 NeoVim이라 부르면 번거로우니까 그냥 Vim이라 부르겠습니다.

아무튼 `gx`를 확인해보기 위해 vim의 설정 파일을 `/dev/null`로 지정해서 열어봅시다.[^u-option]

```bash
$ vim -u /dev/null
```

그리고 `:nnoremap gx`로 확인해보면, 다음과 같이 `<Plug>NetrwBrowseX`가 `gx`에 매핑되어 있음을 알 수 있습니다.

![/dev/null을 설정 파일로 지정한 vim 화면]( /resource/10/9A63EA-F82B-4583-BAE6-33BAFB4B0449/209280772-f944ecdc-4785-485d-9729-44fd9eab80ce.png )

이건 [neovim github](https://github.com/neovim/neovim/blob/1a9d2a4040f3ba3fe272488a7e85db6cdb453d39/runtime/plugin/netrwPlugin.vim#L84  )에 가보면 확인할 수 있습니다.

만약 설정 파일을 `NONE`으로 지정해주면 `gx`는 어떤 것에도 매핑되지 않습니다.

```bash
$ vim -u NONE
```

![NONE을 설정 파일로 지정한 vim 화면]( /resource/10/9A63EA-F82B-4583-BAE6-33BAFB4B0449/209280069-89cc9f0d-d7e8-450b-a9b2-42b008fe3085.png )

아무튼 평범하게 NeoVim을 실행하면 `gx`는 `NetrwBrowseX`를 호출하게 됩니다.
이건 커서가 지시하고 있는 문자열이 URL이면 해당 URL을 웹 브라우저에서 열어주게 됩니다.

Netrw는 찰스 캠벨이 만든 Vim을 위한 네트워크 상의 파일 탐색기라 할 수 있다는 정도로 알아둬도 충분합니다.

`https://www.vim.org`를 입력하고 커서를 놓은 다음 `gx`를 누르면 웹 브라우저에서 웹 사이트가 열리는 것을 확인할 수 있습니다.

## gx를 확장하자

저는 [vim-plug]( https://github.com/junegunn/vim-plug )를 사용해 Vim 플러그인들을 관리하고 있습니다.

vim-plug를 사용하시는 분들이라면 `Plug` 명령을 알고 계실 것입니다. 예를 들어 다음과 같이 사용할 플러그인을 정의할 수 있죠.

```viml
Plug 'johngrib/vim-game-code-break'
```

저는 이렇게 정의한 `Plug` 구문에 커서를 두고 `gx`를 입력했을 때 웹 브라우저가 열리고  `https://github.com/johngrib/vim-game-code-break`로 이동하면 편리할 거라는 생각을 했습니다.

그래서 다음과 같이 `gx`를 확장할 계획을 세웠습니다.

1. 정규식으로 커서가 지시하는 문자열을 확보하는 함수를 만든다.
2. 필요한 기능에 맞춰 정규식과 처리 함수로 이루어진 배열을 만든다.
3. `gx`를 입력하면 배열을 순회하며 정규식으로 커서 지시 문자열을 확인해서 일치하면 처리 함수를 호출하고 종료한다.
4. 만약 어느 정규식에도 일치하지 않는다면 `NetrwBrowseX`를 호출한다.

그래서 만든 것이 [vim-gx-on-regex.vim]( https://github.com/johngrib/dotfiles/blob/master/nvim/config/vim-gx-on-regex.vim ) 파일입니다.

## 코드 설명

### 문자열 확보 함수

다음은 주어진 정규식을 받아서 커서가 지시하는 문자열을 확보하는 함수입니다.

```viml
function! MatchedString(regex_string) abort
    let l:cursor_x = col('.') - 1
    let l:current_line = getline('.')
    let l:target_index = -1

    let l:matched_head = match(l:current_line, a:regex_string, 0)

    if l:matched_head < 0
        return v:null
    endif

    while l:matched_head <= l:cursor_x
        if l:matched_head < 0
            return v:null
        endif

        let l:matched_tail = matchend(l:current_line, a:regex_string, l:matched_head)

        if (l:cursor_x < l:matched_head) || (l:matched_tail <= l:cursor_x)
            " 커서가 찾아낸 문자열의 범위 밖에 있으면, matched_tail 이후부터 다시 찾는다
            let l:matched_head = match(l:current_line, a:regex_string, l:matched_tail)
            continue
        endif

        " 커서가 찾아낸 문자열의 범위 안에 있으면
        let l:target_index = match(l:current_line, a:regex_string, l:matched_head)
        let l:size = l:matched_tail - l:target_index

        if l:target_index >= 0
            return strpart(l:current_line, l:target_index, l:size)
        endif

        return v:null
    endwhile

    return v:null
endfunction
```

같은 라인 안에서도 정규식에 매치되는 문자열이 여럿 있을 수 있기 때문에 x 좌표를 확인하기 위한 목적으로 간단한 `while` 루프를 돌고 있습니다.

### 정규식과 처리 함수

그리고 다음은 정규식과 처리 함수 배열입니다. `PlugFile`과 `Plug`를 인식하는 정규식이 보입니다.

```viml
let s:match_config = []
call add(s:match_config, {'regex': "\\vPlugFile +'([^ ]+)'", 'exec': {p -> s:plug_file_match(p)} })
call add(s:match_config, {'regex': "\\vPlug +'([^ /]+/[^ /]+)'", 'exec': {p -> s:plug_simple_match(p)} })
```

`PlugFile`은 제가 간단히 만든 파일 단위 vim 플러그인을 꽂아넣기 위한 기능인데요, 이번 발표의 범위는 아니니 넘어가도록 하겠습니다.[^about-plugfile]

### gx에 매핑할 NetrwBrowseX 대체 함수

여기에서 주목할 것은 셋째 줄입니다. `Plug` 구문을 인식해서 `s:plug_simple_match` 함수를 호출하도록 해 두었습니다.

```viml
function! s:plug_simple_match(text)
    let l:address = 'https://github.com/' . substitute(a:text, "\\v^Plug +'([^ ']+)'$", '\1', '')
    call system('open ' .l:address)
endfunction
```

이 함수는 `system` 함수를 호출해서 `open` 명령을 실행합니다.
`open`은 macOS에서 제공하는 명령으로, 주어진 URL을 브라우저로 열어줍니다.

```viml
function! s:openWhatever()
    " s:match_config 를 순회하면서 regex_string 에 매칭되는 문자열을 찾는다
    for l:config in s:match_config
        let l:matched_string = MatchedString(l:config.regex)

        if l:matched_string == v:null
            continue
        endif

        " 매칭되는 문자열이 있으면, 해당 문자열을 command 에 넣어서 실행한다
        try
            call l:config.exec(l:matched_string)
            return
        catch
            echom 'error'
        endtry
    endfor
    echom "netrw"
    " 참고: https://github.com/neovim/neovim/blob/1a9d2a4040f3ba3fe272488a7e85db6cdb453d39/runtime/plugin/netrwPlugin.vim#L84
    call netrw#BrowseX(netrw#GX(),netrw#CheckIfRemote(netrw#GX()))
endfunction

let g:netrw_nogx = v:true
nnoremap gx <cmd>call <SID>openWhatever()<CR>
```

그리고 `gx`에 배열을 루프하며 정규식을 검사해서 함수를 호출해주는 `s:openWhatever`를 연결해 줬습니다.

이제 이걸 사용해서 `Plug` 구문에서 `gx`하면 브라우저가 열리는 것을 확인할 수 있습니다.

## 주석

[^u-option]: `vim -u filename` 형식으로 Vim 초기화에 사용할 설정 파일을 지정할 수 있습니다. 자세한 내용은 `man vim` 또는 `:help -u`, `:help initialization`를 참고하세요.
[^about-plugfile]: [[/vim/configure-split#방법-4-plugfile-명령으로-include-파일을-명시해준다]] 문서를 참고하세요.
