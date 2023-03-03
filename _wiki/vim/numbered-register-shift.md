---
layout  : wiki
title   : Vim 숫자 레지스터 쉬프터 만들기
summary : VIMRC 2022 발표를 자세히 설명하는 글
date    : 2022-07-23 22:57:48 +0900
updated : 2022-07-24 09:42:58 +0900
tag     : vim
resource: 66/AC3816-2EFD-4730-9F2E-AF4D8EC1AF0F
toc     : true
public  : true
parent  : [[/vim]]
latex   : false
---
* TOC
{:toc}


## Vim의 라인 삭제를 Queue로 관리하는 Numbered registers

Vim에는 0 부터 9 까지의 숫자 레지스터가 10개 있다.

Vim 에서 라인 단위로 삭제를 하게 되면 삭제된 내용이 숫자 레지스터로 구성된 Queue에 들어가게 된다.
이 기능 덕분에 삭제한 내용을 쉽게 잃어버리지 않을 수 있고, 순서대로 붙여넣기를 할 때에도 편리하게 사용할 수 있다.

예를 들어 다음과 같은 파일이 있고, `dd` 명령으로 한 줄 한 줄 삭제를 해나간다고 해보자.

```
A
B
C
D
```

| 작업 순서 | 설명          | 파일 내용            | 레지스터               |
|-----------|---------------|----------------------|------------------------|
| 1         | `A` 삭제 결과 | <span id="step-00"/> | <span id="step-00-r"/> |
| 2         | `B` 삭제 결과 | <span id="step-01"/> | <span id="step-01-r"/> |
| 3         | `C` 삭제 결과 | <span id="step-02"/> | <span id="step-02-r"/> |
| 4         | `D` 삭제 결과 | <span id="step-03"/> | <span id="step-03-r"/> |

```
B
C
D
```
{:class="dynamic-insert" data-target-selector="#step-00"}

- `"1` : `A`
{:class="dynamic-insert" data-target-selector="#step-00-r"}

```
C
D
```
{:class="dynamic-insert" data-target-selector="#step-01"}

- `"1` : `B`
- `"2` : `A`
{:class="dynamic-insert" data-target-selector="#step-01-r"}

```
D
```
{:class="dynamic-insert" data-target-selector="#step-02"}

- `"1` : `C`
- `"2` : `B`
- `"3` : `A`
{:class="dynamic-insert" data-target-selector="#step-02-r"}

```
```
{:class="dynamic-insert" data-target-selector="#step-03"}

- `"1` : `D`
- `"2` : `C`
- `"3` : `B`
- `"4` : `A`
{:class="dynamic-insert" data-target-selector="#step-03-r"}

삭제할 때마다 `"1` 레지스터에 입력되고, 이전에 들어갔던 값들은 하나씩 밀려난다는 것을 알 수 있다.

## 문제: 삭제 말고 복사도 Queue로 관리하고 싶다

그런데 삭제는 이렇게 이력이 Queue로 관리가 되는데 복사(`y`)는 그렇지 않다.

라인 복사를 여러 차례 해 보아도 삭제처럼 하나씩 밀려나는 일은 일어나지 않는다.

복사를 하면 `"1` 레지스터가 아니라 `"0` 레지스터로 들어가며, 다시 다른 라인을 복사해 보아도 `"0`에 있던 값이 `"1`로 밀려나지는 않는다. 그냥 `"0`에 덮어씌워질 뿐이다.

만약 복사도 삭제처럼 Queue로 관리하게 된다면 여러 건을 복사하고 각자 다른 순서로 붙여넣기를 할 때 매우 편리할 것이다.
(알파벳 레지스터를 쓰는 방법도 있긴 하지만 쌍 따옴표(`"`)를 적게 누르려면 역시 이 기능이 필요하다.)

## 문제 해결: 복사도 Queue로 관리되도록 하자

간단하게 짧은 Vimscript를 작성해서 이 문제를 해결해 보도록 하자.

### 준비물: autocmd 이벤트 TextYankPost

`TextYankPost`는 Vim에서 삭제나 복사를 실행한 직후에 발생하는 이벤트이다.

복사나 삭제를 실행할 때 블랙홀 레지스터(`"_`)에 값을 넣으면 이 이벤트는 발생하지 않는다는 문제가 있긴 하지만 숫자 레지스터에서는 잘 작동하므로 블랙홀 레지스터는 신경쓰지 않아도 된다.

이 이벤트가 발생할 때, 일어난 일이 삭제인지 복사인지를 구별하고 복사가 발생했을 경우에 복사된 값의 히스토리를 숫자 레지스터에 Queue 방식으로 저장해주면 문제가 해결될 것이다.

### 준비물: "0 레지스터와 "1 레지스터의 이해

`""`, `"0`, `"1` 레지스터의 특징을 알고 있다면 삭제가 발생했는지 복사가 발생했는지를 간편하게 구별할 수 있다.

- `""`: 익명 레지스터. 복사 또는 삭제를 할 때마다 여기로 해당 값이 들어온다.
    - `p`를 입력할 때 붙여넣기되는 값은 이 레지스터에서 가져온다.
- `"0`: 복사 레지스터. 복사 이벤트가 발생할 때마다 여기로 복사한 값이 들어온다.
    - `"0`에 새로운 값이 들어와도 딱히 히스토리를 남기지 않는다.
- `"1`: 삭제 레지스터. 삭제 이벤트가 발생할 때마다 여기로 삭제한 값이 들어온다.
    - `"1`에 새로운 값이 들어오면 `"1`의 값을 `"2`로 밀려나게 하는 식으로 히스토리를 관리한다.
    - 숫자 레지스터 마지막이 `"9` 이므로 삭제 히스토리는 모두 9개까지 가능하다.

### 코딩 계획

이 특징들을 고려하면 다음과 같이 코딩 계획을 세울 수 있다.

- `TextYankPost` 이벤트가 발생한다.
    - `"0` 레지스터가 업데이트된다면 복사가 발생한 것이다.
        - `"8`의 값을 `"9`에 넣어준다.
        - `"7`의 값을 `"8`에 넣어준다.
        - ...
        - `"1`의 값을 `"2`에 넣어준다.
        - 이전의 `"0` 값을 `"1`에 넣어준다.
    - `"1` 레지스터가 업데이트된다면 삭제가 발생한 것이다.
        - 삭제는 이미 Queue 관리되고 있다. 아무것도 안 해도 된다.

여기에서 문제는 이전의 `"0` 값이 유실된다는 건데, 이건 Vimscript를 사용해서 변수에 잘 보관해두면 해결된다.

### 코딩

#### 초기화

일단 Vim이 시작될 때 `"0`, `"1` 레지스터의 값을 변수에 보관해 주도록 하자.

```viml
let s:global_yank_cache_0 = @0
let s:global_yank_cache_1 = @1
```

Vim이 시작될 때 지정해 두고, 값이 업데이트될 때마다 복사인지 삭제인지 판별할 때 쓴 다음, 판별이 끝나면 이 값들을 다시 업데이트해주면 적절할 것이다.

기왕 하는 김에 이 기능을 끄고 켤 수 있도록 `enable` 용도로 쓸 변수도 정의해주자.

```viml
let g:numbered_register_shift_enable = 1
```

#### 기능 토글 기능 만들기

편하게 끄고 켤 수 있도록 토글 기능을 만든다.

```viml
nnoremap <F9>t :call <SID>toggle()<CR>

function! s:toggle()
    let g:numbered_register_shift_enable = ! g:numbered_register_shift_enable
    echom "숫자 레지스터 쉬프트 활성화 상태: " . g:numbered_register_shift_enable
endfunction
```

이 기능은 `F9`를 누른 다음, `t`를 누르면 꺼졌다 켜졌다 할 것이다.

#### "1 ~ "9 밀려나는 기능 만들기

각 숫자 레지스터의 값들이 하나씩 밀려나게 하는 건 간단하다. 다음과 같이 간단한 함수를 만들어 주고 실행하면 된다.

```viml
function! s:enqueue()
    let @9 = @8
    let @8 = @7
    let @7 = @6
    let @6 = @5
    let @5 = @4
    let @4 = @3
    let @3 = @2
    let @2 = @1
endfunction
```

2부터 9를 for loop로 만드는 건 오히려 가독성에 안 좋다고 생각해서 그냥 하드코딩했다. 이 정도로도 충분하다.

#### 복사/삭제 레지스터 캐시 기능 만들기

이 함수를 호출할 때마다 `"0`과 `"1` 레지스터의 값이 `s:global_yank_cache_0`과 `s:global_yank_cache_1`에 저장된다.

```viml
function! s:save_cache()
    let s:global_yank_cache_0 = @0
    let s:global_yank_cache_1 = @1
endfunction
```

#### 메인 로직 만들기

위에서 만든 함수들을 조합해 다음과 같은 메인 함수를 만들어 줬다.

블로그에 옮기면서 주석을 추가하였다.

```viml
function! s:numbered_register_shift()
    if ! v:true == g:numbered_register_shift_enable
        " 꺼놨다면 기능을 사용하지 않는다.
        return
    endif

    if s:global_yank_cache_1 !=# @1
        " line 단위 삭제 이벤트가 발생하면 cache 를 갱신한다
        " 삭제는 이미 Queue로 관리되고 있으므로 캐시만 갱신하고 아무것도 하지 않는다.
        call s:save_cache()
        return
    endif

    if s:global_yank_cache_0 !=# @0
        " 복사 이벤트가 발생하면 Queue가 돌아가게 만들어준다.

        " 1~9를 회전시켜준다.
        call s:enqueue()
        " 1 에 이전 0 레지스터 값을 넣어준다.
        let @1 = s:global_yank_cache_0
        call s:save_cache()
        return
    endif
endfunction
```

이제 `TextYankPost` 이벤트가 발생할 때마다 함수가 실행되도록 하면 된다.

```viml
autocmd TextYankPost * :call s:numbered_register_shift()
```

코드 전문은 [내 github의 dotfiles 리포지토리]( https://github.com/johngrib/dotfiles/blob/10eeee868903efeb221bde70d0a6bca3e4652d75/nvim/vim-include/register.vim )에서 읽을 수 있다.

다음은 이 기능을 사용하는 장면을 gif로 만든 것이다.

![사용 장면]( /resource/66/AC3816-2EFD-4730-9F2E-AF4D8EC1AF0F/reg-example.gif )

## 참고

이 글에서 소개하는 Vimscript는 VIMRC 2022 발표자료입니다.

- [Vim 교정학원, VIMRC: Vim Remediation Club 2022]( https://lqez.dev/events/vimrc/2022/ )
    - [VIMRC 2022 (festa.io)]( https://festa.io/events/2412 )
    - [발표 중계 (twitter.com)]( https://twitter.com/John_Grib/status/1550697532174782464/retweets/with_comments )


