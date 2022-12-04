---
layout  : wiki
title   : git fetch
summary : Download objects and refs from another repository
date    : 2022-01-16 17:02:42 +0900
updated : 2022-01-16 17:22:12 +0900
tag     : git
resource: 09/08BB0B-160C-46B1-8568-68342F8938D8
toc     : true
public  : true
parent  : [[/git]]
latex   : false
---
* TOC
{:toc}

## git fetch --help

>
Fetch branches and/or tags (collectively, "refs") from one or more other repositories, along with the objects necessary to complete their histories. Remote-tracking branches are updated (see the description of `<refspec>` below for ways to control this behavior).

- "refs"라고 부르는 branch 와 tag들을 하나 이상의 다른 repository에서 가져옵니다.
- 그리고 히스토리를 완성하는 데 필요한 객체들도 가져옵니다.
- Remote-tracking 브랜치들도 업데이트됩니다.

>
By default, any tag that points into the histories being fetched is also fetched; the effect is to fetch tags that point at branches that you are interested in. This default behavior can be changed by using the --tags or --no-tags options or by configuring
`remote.<name>.tagOpt`. By using a refspec that fetches tags explicitly, you can fetch tags that do not point into branches you are interested in as well.

- 기본적으로는 가져오는 히스토리와 연관되는 모든 tag도 가져옵니다.
- 이런 디폴트 동작은 `--tags`, `--no-tags` 옵션을 사용하거나, `remote.<name>.tagOpt`를 설정하여 변경할 수 있습니다.
- `refspec`을 사용해 그 외의 tag를 명시적으로 가져오는 것도 가능합니다.

>
git fetch can fetch from either a single named repository or URL, or from several repositories at once if `<group>` is given and there is a `remotes.<group>` entry in the configuration file. (See git-config(1)).
>
When no remote is specified, by default the origin remote will be used, unless there's an upstream branch configured for the current branch.

- git fetch는 하나의 이름이 있는 repository나 URL로 가져올 수도 있지만, `<group>`으로 지정되어 있고 설정 파일에 `remotes.<group>` 항목이 있을 경우 여러 repository를 한 번에 가져올 수 있습니다.
- remote 가 지정되지 않으면 현재 브랜치에 설정된 upstream 브랜치가 없는 한 기본적으로 origin remote가 사용됩니다.

>
The names of refs that are fetched, together with the object names they point at, are written to `.git/FETCH_HEAD`. This information may be used by scripts or other git commands, such as git-pull(1).

- 가져온 refs의 이름과, 그것이 point하는 객체의 이름은 `.git/FETCH_HEAD`에 기록됩니다.
- 이 정보는 스크립트나 `git pull` 같은 다른 git 명령에서 사용될 수 있습니다.

## 옵션

- `--all` : 모든 remote에서 가져온다.
- `--depth=<depth>` : 각 브랜치 히스토리와 연결된 커밋을 가져올 때의 depth를 지정한다. `git clone`에서 사용하는 `--depth` 옵션과 같다.
- `-t`, `--tags` : 지정한 remote의 모든 tag를 가져온다.
- `-n`, `--no-tags` : tag를 가져오지 않는다.
- `-v`, `--verbose` : 상세한 정보를 출력한다.

