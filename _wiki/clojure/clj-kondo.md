---
layout  : wiki
title   : clj-kondo
summary : Clojure static analyzer and linter
date    : 2022-11-11 09:42:11 +0900
updated : 2022-11-13 12:34:16 +0900
tag     : clojure
resource: 1F/42D5DE-0FDC-448E-885D-806C3CBEE47F
toc     : true
public  : true
parent  : [[/clojure]]
latex   : false
---
* TOC
{:toc}

## install

[install.md]( https://github.com/clj-kondo/clj-kondo/blob/master/doc/install.md )

```bash
brew install borkdude/brew/clj-kondo
```

## comment 매크로 안쪽의 run-tests 에 대한 경고 끄기

```clojure
(ns johngrib.foo-test
  (:require [clojure.test :refer [deftest is run-tests testing]]
            ;; 생략                          ; ↑ 여기에서 경고 발생
            ))
;;; 생략

(comment
  ;; ↓ 여기에서 사용하고 있음
  (run-tests))
```

- 경고 내용: `#'clojure.test/run-tests is referred but never used`

위와 같이 `comment` 매크로 안쪽에 `run-tests` 함수 호출을 넣어두고 사용하는 경우가 흔한 편인데,
`refer`가 됐음에도 사용하고 있지 않다고 clj-kondo가 경고를 띄운다면 `run-tests`에 대한 경고 제외 설정을 해주면 된다.

프로젝트 루트에 있는 `.clj-kondo/config.edn` 파일의 `:linters` - `:unused-referred-var` - `:exclude`에 `run-tests`를 추가해주면 된다.

```clojure
{:linters
 {:unused-referred-var
  {:level   :warning
   :exclude {clojure.test [run-tests]}}}
```

이 설정에 대한 공식 문서는 [clj-kondo의 linters.md]( https://github.com/clj-kondo/clj-kondo/blob/master/doc/linters.md#unused-referred-var ) 이다.

## 참고문헌

- [clj-kondo/doc/linters.md (github.com)](https://github.com/clj-kondo/clj-kondo/blob/master/doc/linters.md )

