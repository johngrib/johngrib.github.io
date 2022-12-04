---
layout  : wiki
title   : clojure-lsp
summary : A Language Server for Clojure(script).
date    : 2022-03-25 17:58:51 +0900
updated : 2022-03-29 21:12:17 +0900
tag     : clojure
resource: 00/3307FC-B734-44F7-882F-44B1E98144B7
toc     : true
public  : true
parent  : [[/clojure]]
latex   : false
---
* TOC
{:toc}

## CLI 사용 예제

### 도움말 보기

```bash
clojure-lsp --help
```

결과로 출력된 도움말 내용은 다음과 같다.

```
$ clojure-lsp --help
Clojure development tool implementing LSP

Usage: clojure-lsp <command> [<options>]

All options:
  -h, --help                        Print the available commands and its options
      --version                     Print clojure-lsp version
      --verbose                     Use stdout for clojure-lsp logs instead of default log settings
  -s, --settings SETTINGS           Optional settings as edn to use for the specified command. For all available settings, check https://clojure-lsp.io/settings
      --log-path PATH               Path to use as the log path for clojure-lsp.out, debug purposes only.
      --dry                         Make no changes to files, only report diffs
      --raw                         Print only necessary data
  -p, --project-root PATH           Specify the path to the project root to clojure-lsp consider during analysis startup.
  -n, --namespace NS            []  Optional namespace to apply the action, all if not supplied. This flag accepts multiple values
      --filenames FILENAMES         Optional filenames to apply the action. Fileanems can be either absolute/relatetive files or directories. This flag accepts filenames separated by comma or double colon.
      --ns-exclude-regex REGEX      Optional regex representing the namespaces to be excluded during a command
  -o, --output EDN                  Optional settings as edn on how the result should be printed. Check `clojure-lsp.api/diagnostics` for all available options to this flag.
      --from FROM                   Full qualified symbol name or ns only, e.g. my-project/my-var. option for rename
      --to TO                       Full qualified symbol name or ns only, e.g. my-project/my-var. option for rename

Available commands:
  listen (or empty)    Start clojure-lsp as server, listening to stdin.
  clean-ns             Organize ns form, removing unused requires/refers/imports and sorting alphabetically.
  diagnostics          Analyze the project and find all diagnostics (warnings, errors).
  format               Format code using cljfmt.
  rename               Rename a symbol and all references across the project, use --from and --to options.

See https://clojure-lsp.io/settings/ for detailed documentation.
``` 

### clean-ns: namespace 청소

clj 파일의 namespace를 청소해주는 명령이다.

#### \-\-filenames 옵션

```bash
 # clj 파일 하나의 namespace를 청소한다
clojure-lsp clean-ns --filenames src/a/b.clj

 # 여러 파일을 청소한다(콤마를 구분자로 쓴다)
clojure-lsp clean-ns --filenames src/a/b.clj,src/a/c.clj,src/a/d.clj

 # 디렉토리로 묶어서 청소한다
clojure-lsp clean-ns --filenames src/a

 # 여러 디렉토리를 청소한다
clojure-lsp clean-ns --filenames src/a,src/b
```

이렇게 옵션 없이 사용하게 되면 디폴트 설정을 따라 namespace를 청소하게 된다.

디폴트 설정대로 정리하게 되면 [clojure-style-guide]( https://github.com/bbatsov/clojure-style-guide#line-breaks-in-ns )의 better ns 형식에 맞춰진다.

```clojure
(ns examples.ns
  (:require
   [clojure.string :as s :refer [blank?]]
   [clojure.set :as set]
   [clojure.java.shell :as sh])
  (:import
   java.util.Date
   java.text.SimpleDateFormat
   [java.util.concurrent Executors
                         LinkedBlockingQueue]))
```

#### \-\-settings 옵션

디폴트 옵션이 마음에 들지 않는다면 `--settings` 옵션으로 설정을 제공하면 된다.

```bash
 # 내가 회사에서 사용하는 방법
clojure-lsp clean-ns \
    --settings '{:clean {:ns-inner-blocks-indentation :same-line :sort {:ns true :require true :import true :refer {:max-line-length 80}}}}' \
    --filenames src/sinsun_market/cash
```

이 방법을 사용하면 다음과 같이 정리된다.[^ns-good]

```clojure
(ns examples.ns
  (:require [clojure.string :as s :refer [blank?]]
            [clojure.set :as set]
            [clojure.java.shell :as sh])
  (:import java.util.Date
           java.text.SimpleDateFormat
           [java.util.concurrent Executors
                                 LinkedBlockingQueue]))
```

디폴트 설정과 비교해 보면 `(:require` 뒤로 개행을 하는지 아닌지의 차이가 있다.
이 차이는 `--settings`에 제공해 주는 `:ns-inner-blocks-indentation` 옵션에 주는 값에서 비롯된 것이다.

- `:ns-inner-blocks-indentation`
    - `:next-line`: 개행을 한다. (better)
    - `:same-line`: 개행을 하지 않는다. (good)

필요에 따라 옵션을 적절히 바꿔서 사용하면 된다.

```bash
 # next-line 을 사용하는 경우
clojure-lsp clean-ns \
    --settings '{:clean {:ns-inner-blocks-indentation :next-line :sort {:ns true :require true :import true :refer {:max-line-length 80}}}}' \
    --filenames src/경로
```

`clean-ns`의 동작을 확실하게 알고 싶다면 `clean-ns`의 테스트 코드를 읽어보면 도움이 된다.

- [clojure-lsp/lib/test/clojure_lsp/feature/clean_ns_test.clj]( https://github.com/clojure-lsp/clojure-lsp/blob/62075f342dc98f5bbae0a59ee68e91e5c38aacfa/lib/test/clojure_lsp/feature/clean_ns_test.clj )


#### vim에서의 활용

나는 [이렇게]( https://github.com/johngrib/dotfiles/commit/78cec0a6d5f2cf258d4868f7b5a071e1caba1488 ) 설정해서 사용하고 있다.

## Links

- [clojure-lsp.io]( https://clojure-lsp.io/ )
- [clojure-lsp (github.com)]( https://github.com/clojure-lsp/clojure-lsp/ )

## 주석

[^ns-better]: [clojure-style-guide]( https://github.com/bbatsov/clojure-style-guide#line-breaks-in-ns )의 better ns.
[^ns-good]: [clojure-style-guide]( https://github.com/bbatsov/clojure-style-guide#line-breaks-in-ns )의 good ns.
