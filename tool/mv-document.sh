#!/usr/bin/env bash

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 [from] [to]"
    echo "Example: $0 _wiki/b-tree.md  _wiki/algorithm/b-tree.md"
    exit 1
fi

FROM_DIR="$1"
TO_DIR="$2"

echo "Move $FROM_DIR to $TO_DIR"

# 대상 디렉토리가 없다면 생성한다
TO_DIR_PARENT=$(dirname "$TO_DIR")
mkdir -p "$TO_DIR_PARENT"

git mv "$FROM_DIR" "$TO_DIR"

FROM_FILENAME=$(echo "$FROM_DIR" | sed -e 's/^_wiki\///' -e 's/\.md$//')
TO_FILENAME=$(echo "$TO_DIR" | sed -e 's/^_wiki\///' -e 's/\.md$//')

# echo "FROM_FILENAME: $FROM_FILENAME, TO_FILENAME: $TO_FILENAME"
# ex) FROM_FILENAME: b-tree, TO_FILENAME: algorithm/b-tree

# 처리대상은 단순 링크: [[/path/filename]] , [[path/filename]]
ag '(?<!\\)\[\[/?'$FROM_FILENAME'(\]\]|\#)' -l \
    | xargs sed -i '' -E \
        's,\[\[\/?'$FROM_FILENAME'(\]\]|\#),\[\[\/'$TO_FILENAME'\1,g'

# 처리대상은 섹션 링크가 포함된 링크: [[path/filename#section]]
ag '(?<!\\)\[\[/?'$FROM_FILENAME'\#([^]]+)\]\]' -l \
    | xargs sed -i '' -E \
        's,\[\[\/?'$FROM_FILENAME'\#([^]]+)\]\],\[\[\/'$TO_FILENAME'\#\1\]\],g'
