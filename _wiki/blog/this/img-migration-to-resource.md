---
layout  : wiki
title   : 이미지 경로를 한꺼번에 마이그레이션하기
summary : post-img에서 resource 로 한꺼번에 옮기자
date    : 2021-07-25 16:36:59 +0900
updated : 2021-07-25 16:56:09 +0900
tag     : 
resource: A2/A3F2A3-13DF-4793-ADD2-33822EEB81ED
toc     : true
public  : true
parent  : [[/blog/this]]
latex   : false
---
* TOC
{:toc}

## 작업 동기

2021-07-25 전까지, 나는 이 웹사이트의 이미지를 모두 `post-img` 경로에 대충 디렉토리를 생성해서 보관하고 있었다.

각 문서에 삽입된 이미지 대부분은 `post-img` 경로에 있는 문서 자신의 이름과 같은 디렉토리를 참조한다.

예를 들어 [[/algorithm/shell-sort]] 문서는 `/post-img/shell-sort/8-4-2-1.jpg`라는 이미지를 보여준다.

여기에는 다음과 같은 문제가 있었다.

- 디렉토리 이름은 `post-img`인데, 이미지 외의 다른 파일들을 집어넣는 경우도 있다.
- 문서 이름을 바꾸거나 경로를 바꿀 때, 이미지 경로까지 바꾸지 않은 경우가 많았다. 귀찮았기 때문이다.

그런데 얼마 전에 각 문서가 계층 구조의 url을 가질 수 있도록 수정하게 되면서 모든 이미지 경로가 `post-img`에 있는 것을 고쳐야겠다는 생각을 하게 되었다.

이미지 파일은 전부 500개가 조금 넘는 정도였다. 따라서 수작업으로 옮기지 않고 bash 스크립트 하나를 작성하여 작업하기로 하였다.

## 작업 목표

작업 목표는 `post-img`에 있는 모든 파일들을 `resource` 경로로 옮기는 것이다.

단, 해당 파일을 참조하고 있는 문서의 주소를 참고하여 `resource`에 하위 경로를 만들고 파일을 옮기도록 한다.

예를 들어 `/wiki/blog/this/random-link` 문서에서 `/post-img/random-link/image.jpg` 파일을 참조하고 있었다면
`/resource/blog/this/random-link/image.jpg`로 이동시키면 된다.

이 작업을 `post-img`에 있는 모든 파일에 대해 수행하도록 한다.

## 작업 상세

다음은 이 작업을 수행하기 위해 작성한 [스크립트 파일(tool/fix-image-references.sh)]( https://github.com/johngrib/johngrib.github.io/commit/004b1c92f9cdf8adb82fe49b4ed741d407e48206 ) 이다.

작성에 약 50분 정도 걸렸고, 변경된 파일은 497개 였다.

오래간만에 몰두해서 즐겁게 코딩한 것 같다. 실행 결과도 별다른 문제가 없어 기분이 좋다.

{% raw %}
```bash
#!/usr/bin/env bash

IS_CORRECT_WORKING_DIRECTORY=`pwd | egrep "johngrib.github.io$" | wc -l`
if (( "$IS_CORRECT_WORKING_DIRECTORY" != 1 )); then
    echo "올바른 경로가 아닙니다. johngrib.github.io/ 에서 실행해 주세요."
    exit;
fi

# $1: 작업할 마크다운 문서의 경로
# $2: 마크다운 내에 있는 수정 대상 파일 경로
# $3: 마크다운 내에 삽입할 올바른 파일 경로
fix_resource_reference_in_markdown() {
    echo "[$1] 파일의 [$2] 문자열을 [$3]로 replace 합니다."
    sed -E -i '' "s,$2,$3,g" $1
}

# 모든 리소스 파일을 찾아 목록으로 만든다.
RES_LIST=` find ./post-img -type f`

for RESOURCE_FILE_ADDRESS in $RES_LIST; do
    # 리소스 파일의 경로
    RESOURCE_FILE_URL=`echo $RESOURCE_FILE_ADDRESS | sed "s/^\.//"`
    RESOURCE_FILE_NAME=`echo $RESOURCE_FILE_ADDRESS | sed -E "s,^.*/([^/]+)$,\1,"`
    echo "작업대상 파일: $RESOURCE_FILE_URL"

    # 리소스 파일을 사용하는 모든 마크다운 파일의 목록
    REFERENCE_LIST=`ag -l "$RESOURCE_FILE_URL" _wiki | egrep "\.md"`

    for MD_PATH in $REFERENCE_LIST; do
        VALID_DIR="./resource/"`echo "$MD_PATH" | sed 's/\.md$//' | sed -E "s/^_(wiki|blog)/\1/"`"/"
        VALID_FILE_ADDRESS="$VALID_DIR$RESOURCE_FILE_NAME"
        VALID_FILE_URL=`echo $VALID_FILE_ADDRESS | sed -E 's/^\.//'`

        echo "현재 리소스 경로: $RESOURCE_FILE_ADDRESS"
        echo "올바른 파일 경로: $VALID_FILE_ADDRESS"

        if [[ -f "$VALID_FILE_ADDRESS" ]]; then
            echo "올바른 파일이 이미 존재하고 있습니다."
            read -p "md 문서의 리소스 참조 경로를 올바른 경로로 수정합니까? [y|n] " -r;
            REPLY=${REPLY:-"y"};
            if [ $REPLY = "y" ]; then
                fix_resource_reference_in_markdown  $MD_PATH  $RESOURCE_FILE_URL  $VALID_FILE_ADDRESS
            fi
            continue;
        fi

        if [[ "$RESOURCE_FILE_ADDRESS" != "$VALID_FILE_ADDRESS" ]]; then
            echo "리소스 파일이 올바른 경로에 있지 않습니다."

            read -p "올바른 경로로 옮깁니까?? [y|n] " -r;
            REPLY=${REPLY:-"y"};
            if [ $REPLY = "y" ]; then

                echo "만들 디렉토리: $VALID_FILE_ADDRESS"

                if [[ -d "$VALID_DIR" ]]; then
                    printf ""
                else
                    echo "해당하는 디렉토리가 없습니다. 디렉토리를 새로 생성합니다."
                    mkdir -p $VALID_DIR
                fi

                echo "리소스 파일을 [$RESOURCE_FILE_ADDRESS]에서 [$VALID_FILE_ADDRESS]로 복사합니다."
                cp $RESOURCE_FILE_ADDRESS  $VALID_FILE_ADDRESS

                fix_resource_reference_in_markdown  $MD_PATH  $RESOURCE_FILE_URL  $VALID_FILE_URL

            else
                echo "다음 파일로 넘어갑니다."
            fi
        fi

        echo ''
    done

    rm $RESOURCE_FILE_ADDRESS
done
```
{% endraw %}


## 작업 결과

- 작업 결과: [이미지 경로를 resource로 옮겨라]( https://github.com/johngrib/johngrib.github.io/commit/e7fc6d3b3fe63aa5c0599910d36305d8069717da )

