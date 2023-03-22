---
layout  : wiki
title   : Vim client-server
summary : 
date    : 2023-03-21 22:18:54 +0900
updated : 2023-03-22 09:24:13 +0900
tag     : 
resource: 6B/E38F50-DD5F-4C2C-ADF7-2D9ED73F8C29
toc     : true
public  : true
parent  : [[/vim]]
latex   : false
---
* TOC
{:toc}

## NeoVim

[NeoVim doc/remote.txt]( https://github.com/neovim/neovim/blob/ee26b227e15abc263195d4c746d5dba9f0e6dec4/runtime/doc/remote.txt ) - 2023-02-22

### :help client-server 번역

참고: 번역에 [DeepL 번역기]( https://www.deepl.com/translator )의 도움을 일부 받았음.

#### 1. Common functionality

>
1\. Common functionality    &nbsp;&nbsp;&nbsp;  *`clientserver`*
>
Nvim's |RPC| functionality allows clients to programmatically control Nvim.
Nvim itself takes command-line arguments that cause it to become a client to another Nvim running as a server.
These arguments match those provided by Vim's clientserver option.
>
The following command line arguments are available:

1\. 공통 기능

Nvim의 |RPC| 기능을 사용하면 클라이언트가 프로그래밍 방식으로 Nvim을 제어할 수 있습니다.
Nvim은 명령줄 인자들을 받아서 <mark>서버로 실행되는 다른 Nvim</mark>의 클라이언트가 될 수 있습니다.
이러한 인자들은 Vim의 클라이언트 서버 옵션에서 제공하는 것과 일치합니다.

다음과 같은 명령줄 인자를 사용할 수 있습니다:

>
`--remote [+{cmd}] {file} ...`  &nbsp;&nbsp;&nbsp;   *`--remote`*
>
Open the file list in a remote Vim.
When there is no Vim server, execute locally.
Vim allows one init command: +{cmd}.
This must be an Ex command that can be followed by "|".
It's not yet supported by Nvim.
The rest of the command line is taken as the file list.
Thus any non-file arguments must come before this.
You cannot edit stdin this way |--|.
The remote Vim is raised.
If you don't want this use `nvim --remote-send "<C-\><C-N>:n filename<CR>"`

원격 Vim에서 여러 파일을 엽니다.
Vim 서버가 없다면, 로컬에서 실행합니다.
Vim은 하나의 초기화 명령을 허용합니다: `+{cmd}`.
이 명령은 뒤에 "`|`"가 올 수 있는 Ex 명령이어야 합니다.
<mark>이 명령은 아직 Nvim에서는 지원되지 않습니다.</mark>
나머지 명령줄은 파일 목록으로 간주됩니다.
따라서 파일이 아닌 인자는 앞에 있어야 합니다.
이 방법으로는 (`-`를 사용해도) stdin을 편집할 수 없습니다.[^2dash]
원격으로 Vim이 실행중이기 때문입니다.
이를 원하지 않는 경우 `nvim --remote-send "<C-\><C-N>:n filename<CR>"`을 사용하세요.

>
`--remote-silent [+{cmd}] {file} ...`   &nbsp;&nbsp;&nbsp;    *`--remote-silent`*
>
As above, but don't complain if there is no server and the file is edited locally.

위와 같지만 서버가 없습니다. 파일이 로컬에서 편집되더라도 불평하지 마세요.

>
`--remote-tab`  &nbsp;&nbsp;&nbsp;  *`--remote-tab`*
>
Like `--remote` but open each file in a new tabpage.

`--remote`와 비슷하지만 각 파일을 새 탭으로 엽니다.

>
`--remote-tab-silent`   &nbsp;&nbsp;&nbsp;  *`--remote-tab-silent`*
>
Like `--remote-silent` but open each file in a new tabpage.

`--remote-silent`와 비슷하지만 각 파일을 새 탭으로 엽니다.

>
`--remote-send {keys}`  &nbsp;&nbsp;&nbsp;  *`--remote-send`*
>
Send `{keys}` to server and exit.
The `{keys}` are not mapped.
Special key names are recognized, e.g., "<CR>" results in a CR character.

서버로 `{keys}`를 전송하고 종료합니다.
`{keys}`는 map 설정을 무시합니다.
특수한 키 이름은 인식됩니다(예: "`<CR>`"은 CR 문자로 인식됩니다).

>
`--remote-expr {expr}`  &nbsp;&nbsp;&nbsp;  *`--remote-expr`*
>
Evaluate `{expr}` in server and print the result on stdout.

서버에서 `{expr}`을 평가하고 결과를 stdout으로 출력합니다.

>
`--remote-ui`   &nbsp;&nbsp;&nbsp;  *`--remote-ui`*
>
Display the UI of the server in the terminal.
Fully interactive: keyboard and mouse input are forwarded to the server.

터미널에 서버의 UI를 표시합니다.
이 기능은 완전 대화형으로, 키보드와 마우스 입력이 서버로 전달됩니다.

>
`--server {addr}`   &nbsp;&nbsp;&nbsp;  *`--server`*
>
Connect to the named pipe or socket at the given address for executing remote commands.
See |`--listen`| for specifying an address when starting a server.

원격 명령을 실행하기 위해 지정된 주소의 명명된 파이프 또는 소켓에 연결합니다.
서버를 시작할 때 주소를 지정하는 방법은 |`--listen`|을 참조하세요.

##### Examples

>
Examples
>
Start an Nvim server listening on a named pipe at '~/.cache/nvim/server.pipe':

'~/.cache/nvim/server.pipe'로 이름붙인 파이프를 리스닝하는 Nvim 서버를 시작하기:

```bash
nvim --listen ~/.cache/nvim/server.pipe
```

>
Edit "file.txt" in an Nvim server listening at '~/.cache/nvim/server.pipe':

'~/.cache/nvim/server.pipe'를 리스닝하는 Nvim 서버에서 "file.txt"를 편집하기:

```bash
nvim --server ~/.cache/nvim/server.pipe --remote file.txt
```

>
This doesn't work, all arguments after `--remote` will be used as file names:

이 명령은 작동하지 않습니다. `--remote` 뒤에 오는 모든 인자는 파일 이름으로 사용되기 때문입니다.

```bash
nvim --remote --server ~/.cache/nvim/server.pipe file.txt
```

>
Tell the remote server to write all files and exit:

원격 서버에 모든 파일을 쓰고 종료하라고 지시합니다:

```bash
nvim --server ~/.cache/nvim/server.pipe --remote-send '<C-\><C-N>:wqa<CR>'
```

##### REMOTE EDITING

>
REMOTE EDITING
>
The `--remote` argument will cause a |`:drop`| command to be constructed from the rest of the command line and sent as described above.
Note that the `--remote` and `--remote-wait` arguments will consume the rest of the command line.
I.e. all remaining arguments will be regarded as filenames.
You can not put options there!

`--remote` 인자를 사용하면 나머지 명령줄에서 |`:drop`| 명령이 생성되어 위에서 설명한 대로 전송됩니다.
`--remote` 및 `--remote-wait` 인자는 명령줄의 나머지 부분을 사용한다는 점에 유의하세요.
즉, 나머지 인자는 모두 파일명으로 취급됩니다.
그래서 나머지 인자에 옵션을 넣으면 안됩니다!

#### 2. Missing functionality

>
2\. Missing functionality    &nbsp;&nbsp;&nbsp;  *E5600* *`clientserver-missing`*
>
Vim supports additional functionality in clientserver that's not yet implemented in Nvim.
In particular, none of the "wait" variants are supported yet.
The following command line arguments are not yet available:

2\. 누락된 기능

클라이언트 서버에 대해 Vim에는 Nvim에서는 아직 구현되지 않은 추가기능들이 있습니다.
특히, "wait" 변형은 아직 Nvim에서는 지원하지 않는 기능입니다.
다음 명령줄 인자들은 아직은 사용할 수 없습니다:

>
`--remote-wait [+{cmd}] {file} ...`   &nbsp;&nbsp;&nbsp;  *`--remote-wait`*
>
Not yet supported by Nvim.
As `--remote`, but wait for files to complete (unload) in remote Vim.

아직 Nvim에서 지원되지 않습니다.
`--remote`와 같지만, 원격 Vim에서 파일이 완료(언로드) 될 때까지 기다립니다.

>
`--remote-wait-silent [+{cmd}] {file} ...`  &nbsp;&nbsp;&nbsp;  *`--remote-wait-silent`*

Not yet supported by Nvim.
As `--remote-wait`, but don't complain if there is no server.

아직 Nvim에서 지원되지 않습니다.
`--remote-wait`와 같지만, 서버가 없어도 경고하지 않습니다.

>
`--remote-tab-wait` &nbsp;&nbsp;&nbsp;  *`--remote-tab-wait`*
>
Not yet supported by Nvim.
Like `--remote-wait` but open each file in a new tabpage.

아직 Nvim에서 지원하지 않습니다.
`--remote-wait`와 같지만, 각 파일을 새 탭 페이지에서 엽니다.

>
`--remote-tab-wait-silent`  &nbsp;&nbsp;&nbsp;  *`--remote-tab-wait-silent`*
>
Not yet supported by Nvim.
Like `--remote-wait-silent` but open each file in a new tabpage.

아직 Nvim에서 지원하지 않습니다.
`--remote-wait-silent`와 같지만, 각 파일을 새 탭 페이지에서 엽니다.

>
`--servername {name}`   &nbsp;&nbsp;&nbsp;  *`--servername`*
>
Not yet supported by Nvim.
Become the server `{name}`.
When used together with one of the `--remote` commands: connect to server `{name}` instead of the default (see below).
The name used will be uppercase.

아직 Nvim에서 지원하지 않습니다.
이름으로 `{name}`을 갖는 서버가 됩니다.
`--remote` 명령과 함께 사용하면 기본값(아래 참조) 대신 서버 `{name}`에 연결됩니다.
이름은 대문자로 사용됩니다.

>
`--serverlist`  &nbsp;&nbsp;&nbsp;  *`--serverlist`*
>
Not yet supported by Nvim.
Output a list of server names.

아직 Nvim에서 지원하지 않습니다.
서버 이름 목록을 출력합니다.

##### SERVER NAME

TODO

## 참고문헌

- [Vim doc/remote.txt]( https://github.com/vim/vim/blob/master/runtime/doc/remote.txt )
- [NeoVim doc/remote.txt]( https://github.com/neovim/neovim/blob/master/runtime/doc/remote.txt ) - Vim과 거의 똑같지만 미세한 차이가 있음.

## 주석

[^2dash]: Vim에서 `-`는 stdin(standard input)의 알리아스이다. 잘 모르겠다면 터미널에서 `ls | vim -`를 입력해 볼 것. ls 출력이 vim으로 입력되는 것을 볼 수 있다. 자세한 내용은 `:help --` 참고.
