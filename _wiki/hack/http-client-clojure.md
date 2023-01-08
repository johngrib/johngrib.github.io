---
layout  : wiki
title   : VRC와 Postman의 대안으로 clj 파일을 사용하기
summary : 이제 Postman 쓸 필요 없다
date    : 2022-07-30 00:35:09 +0900
updated : 2023-01-08 17:13:02 +0900
tag     : postman vrc http clojure
resource: E2/AD0722-A27E-4327-9AB0-3383F39508F1
toc     : true
public  : true
parent  : [[/hack]]
latex   : false
---
* TOC
{:toc}

## 고민과 방황: http client로 무엇을 쓸 것인가?

백엔드 개발을 하다보면 거의 고정된 템플릿으로 http 리퀘스트를 보내는 도구가 필요할 때가 있다.

나는 이런 종류의 도구로 몇 가지를 사용해왔지만 모두 장점과 단점이 있어 하나에 정착하기 어려웠다.

내가 현재 사용하고 있는 http client 도구는 두 가지다.

- [[/vim/rest-console]]
- [Postman]( https://www.postman.com/ )

이 글에서는 이 둘의 장단점을 검토하고, 내가 두 http client의 대안으로 사용하기 시작한 방법을 소개한다.

### vim-rest-console

[[/vim/rest-console]], 줄여서 VRC는 plain text 파일에 http 요청을 의미하는 텍스트를 `rest` 확장자 파일에 적어놓고 사용하게 된다.

vim에서 `rest` 확장자를 갖는 파일을 열면 바로 사용할 수 있다.

vim에서 돌아갈 뿐, Postman이나 IntelliJ의 Http Client와 거의 똑같은 느낌으로 사용할 수 있다.

![vrc 화면을 설명하는 그림]( ./vrc-explained.jpg )

![vrc를 사용하는 영상]( ./vim-rest-console.gif )

나는 2017년부터 VRC를 사용해왔고, 내가 생각하는 장점은 다음과 같다.

- vim에서 `rest` 파일을 열면 바로 사용할 수 있다.
- `rest`는 단순한 plain text 파일이다.
    - git으로 관리할 수 있다.
    - export, import가 필요없다. 동료에게 그냥 복사해줘도 된다.
    - http 호출 예제를 github repository에 함께 올릴 수 있다.
- `ctrl + j`키를 입력하는 것으로 바로 요청을 보내고 오른쪽 화면에서 결과를 확인할 수 있다.
    - Postman에도 같은 장점이 있다.
- 요청을 보낼 때마다 실제 실행된 `curl` 명령 옵션을 보여줘서 `curl` 명령을 익힐 때 큰 도움이 됐다.
{:style="background-color: #e9f1f6;"}

나는 서버 애플리케이션 리포지토리에 다음과 같이 `rest` 파일을 넣어두는 편이다.

```
.
├── src
│   ├── ..
│   └── ..
├── test
│   ├── ..
│   └── ..
└── .rest             <= 여기
    ├── 상품조회.rest
    ├── 주문조회.rest
    └── 주문취소.rest
```

이렇게 넣어두면 멀리 가지 않고도 프로젝트 안쪽에서 http 요청 예제/사용 사례를 관리할 수 있어서 편리하다.

상품 조회와 관련된 http 요청들 여러가지가 들어있는 `상품조회.rest` 파일을 열어서 개발서버에 http request를 날려볼 수도 있고,
`주문취소.rest` 파일을 열어서 주문을 취소하는 http request를 날려볼 수 있다.

반면 VRC에는 다음과 같은 치명적인 단점이 있다.

- Postman처럼 변수를 활용해 특정 헤더 값을 동적으로 지정할 수 없다.
    - 이걸 해결하기 위해 VRC를 기반으로 하는 플러그인을 또 만들기도 귀찮다.
    - 만들어야겠다고 생각만 하다 5년이 흘렀다...
- vim에 친숙한 사람에게만 쉽다.
{:style="background-color: #fff9e4;"}

두번째 단점은 내게는 아무런 문제가 안 되지만 헤더 값을 동적으로 지정할 수 없는 건 불만이다.
`Authorization` 헤더에 `Bearer` 값을 넣어줄 때 일일이 복사 붙여넣기를 해야 하기 때문이다.


### Postman

[Postman]( https://www.postman.com/ )은 널리 쓰이고 있는 인기 있는 애플리케이션이고 다양한 장점을 갖고 있다.

나는 VRC와 함께 Postman을 늘 사용하고 있다.

다음과 같은 이유로 Postman을 좋아한다.

- 화면 구성이 알아보기 편리하다.
- 주위 사람들 대부분이 사용하고 있어 커뮤니케이션이 쉽고, 도움을 주고받기 좋다.
- `command + enter`로 요청을 전송하고 바로 결과를 확인할 수 있다.
- Header 값 등에 변수값을 할당할 수 있다.
    - 예) `Authorization: Bearer {% raw %}{{토큰}}{% endraw %}`과 같이 토큰을 동적으로 입력할 수 있어 편리하다.
    - 따라서 로그인 토큰이 필요한 경우 처리가 쉽다.
{:style="background-color: #e9f1f6;"}

그러나 Postman에 대해서도 다음과 같은 아쉬움을 갖고 있다.

- 개인 사용 목적인 경우에만 무료로 쓸 수 있다.
    - 회사 업무용으로는 사용할 수 없다.
- 요청 내용을 vim 스타일로 편집할 수 없다.
- 단축키를 많이 제공하는 편이긴 하지만 다 외울 순 없다. 마우스를 많이 사용하게 된다.
- export, import가 불편하다.
    - Postman 내에서 메뉴를 선택해 별도의 파일을 생성해야 한다.
    - 내 컴퓨터에 깔려 있는 Postman은 어째서인지 지난 며칠간 export에 계속 실패하고 있다.
- Electron 기반의 데스크탑 앱이기 때문에 계속 켜두면 무겁게 느껴진다.
- 도구의 특성상 자동화에 한계가 있다.
{:style="background-color: #fff9e4;"}

## 대안: clj 파일을 사용하면 어떨까?

내가 원하는 특징들을 모아보면 꽤나 까다롭다.

- vim 스타일로 요청을 편집할 수 있어야 한다.
    - vim 에디터 안쪽에서 사용할 수 있으면 더 좋다.
- plain text로 요청을 관리할 수 있어야 한다.
    - 필요한 경우에 git repository에 포함시킬 수도 있으면 좋다.
- 변수를 사용해 `Bearer` 토큰 등을 입력하기 편해야 한다.
- plain text로 요청을 관리하더라도, 파일을 열었을 때 직관적으로 구성을 파악할 수 있어야 한다.
- 특정 요청을 순서대로 보내는 등, 자유롭게 자동화할 수 있다면 좋겠다.
{:style="background-color: #ecf1e8;"}

이런 도구는 없는 것 같았기에 새로운 vim 플러그인을 만드는 것을 고려하고 있었다.

그런데 생각해보니 평범한 clj 파일로도 위의 조건들을 달성할 수 있다는 생각이 들었다.

- clj 파일은 Clojure 프로그래밍 언어의 소스코드 파일이다.
    - plain text이므로 git으로 관리할 수 있다.
- vim에서 자유롭게 편집하고 실행할 수 있다.
    - REPL을 띄우면 VRC의 `ctrl + j`나 Postman의 `command + enter`처럼 간단한 키 입력으로 쉽게 요청을 보낼 수 있다.
- 공통 헤더값을 상수나 함수로 관리할 수 있다.
    - 다른 파일에 쪼개놓고 `require` 해도 된다.
- 프로그래밍 언어 수준의 자동화가 가능하다.
    - Postman이나 VRC에서는 달성할 수 없는 기능이다.
- 구독 비용이 들지 않는다.
{:style="background-color: #e9f1f6;"}

그리고 다음 장점도 딸려오게 된다.

- REPL만 띄우면 어느 에디터에서도 요청을 날릴 수 있다.
    - vim 뿐만 아니라 emacs, vscode, intellij에서도 편집하고 실행할 수 있다.
{:style="background-color: #e9f1f6;"}

### clj http client를 사용하는 방법

clj 파일로 Postman을 대체하게 된다면 크게 두 가지 방향의 사용이 가능할 것으로 보인다.

첫 번째는 로컬 git repository 프로젝트에 있는 `test` 경로 안쪽에 위치시켜서 사용하는 방법이다.

```
.
├── deps.edn
├── resources
│   └── ..
├── src
│   └── ..
└── test
    ├── ..
    └── http_examples   <= 여기
        ├── http_util.clj <= 호출도구 공통설정 및 함수
        ├── product.clj
        └── order.clj
```

이렇게 하면 해당 프로젝트에서 코딩을 하다가 바로 로컬 웹 서버를 띄우고
`http_examples`에 있는 clj 파일을 열어서 바로 요청을 보내고 결과를 받는 등의 작업이 가능하다.

특정 프로젝트와 관련된 http 요청을 같은 프로젝트에서 관리할 수 있다는 장점이 있다.


두 번째는 별도의 프로젝트를 만들어서 관리하는 방법이다. Postman 스타일의 방법이라 할 수 있겠다.

```
.
├── deps.edn
└── src
    ├── http
    │   └── http_util.clj <= 호출도구 공통설정 및 함수
    │
    ├── my_project_1      <= 프로젝트 1 관련
    │   ├── member.clj
    │   └── admin_operation.clj
    │
    └── my_project_2      <= 프로젝트 2 관련
        │
        ├── back_office_api
        │   ├── product.clj
        │   └── order.clj
        │
        └── user_api
            ├── login.clj
            └── get_order_list.clj
```

이렇게 하면 Postman과 비슷한 느낌으로 앱 하나에서 주제별로 http 요청을 관리할 수 있을 것이다.

다음은 위의 구성을 Postman에서 만들어 본 것이다. 둘은 겉보기만 다를 뿐 실제로 같은 일을 하는 도구가 된다.

![]( ./postman-example.jpg )

### 실천: Clojure로 Postman 대체제 만들기

일단 다음과 같은 파일을 만들었다.

작은 매크로 하나, 함수 하나, HTTP method 6가지를 정의한 32줄짜리 작은 파일이다.

[cljstman.clj]( https://github.com/johngrib/cljstman/blob/dd8d9ed32653d5e3ee53e147105fffacd9a75118/src/http/cljstman.clj )

```clojure
(ns http.cljstman
  "HTTP CLIENT common basic."
  (:require [clj-http.client :as client]))

(defmacro def-requests
  "comment와 똑같지만 다른 이름을 써서 comment와 구별할 수 있게 한다."
  [& body])

(defn create-requestor
  "http 메소드별 리퀘스터를 생산한다."
  ([f url]
   (create-requestor f url {} {}))
  ([f url body]
   (create-requestor f url {} body))
  ([f url header body]
   (create-requestor f url header body {}))
  ([f url header body custom-options]
   (let [request {:content-type     :application/json
                  :headers          header
                  :form-params      body
                  :as               :json
                  :coerce           :always
                  :throw-exceptions false}]
     (f url (merge request custom-options)))))

(def POST (partial create-requestor client/post))
(def GET (partial create-requestor client/get))
(def PUT (partial create-requestor client/put))
(def HEAD (partial create-requestor client/head))
(def DELETE (partial create-requestor client/delete))
(def PATCH (partial create-requestor client/patch))
(def OPTIONS (partial create-requestor client/options))
```

이 파일을 다른 clj 파일에서 `require` 하면 Postman 처럼 쓸 수 있다.

### Example
#### httpbin

[httpbin.clj]( https://github.com/johngrib/cljstman/blob/dd8d9ed32653d5e3ee53e147105fffacd9a75118/src/example/httpbin.clj )

```clojure
(ns example.httpbin
  (:require [http.cljstman :as http :refer [def-requests POST]]))

(def-requests
  ; 요청을 보내고 응답을 본다.
  (-> "https://httpbin.org/status/200"
      POST)

  ; 요청을 보내고 응답에서 상태 코드만 본다.
  (-> "https://httpbin.org/status/200"
      POST
      :status)
  ;;
  )
```

REPL을 켜놓고 괄호 안쪽에 커서를 놓은 다음, 평가를 하면 http 요청 결과가 오른쪽에 표시된다.

![httpbin 예제를 실행하는 모습]( ./httpbin2.gif )

#### jsonplaceholder

[jsonplaceholder.clj]( https://github.com/johngrib/cljstman/blob/dd8d9ed32653d5e3ee53e147105fffacd9a75118/src/example/jsonplaceholder.clj )

다음 예제는 http GET 요청을 보내는 내용이다.

```clojure
(def host "https://jsonplaceholder.typicode.com")

(def-requests
  "jsonplaceholder에 GET 요청을 보내는 예제"

  ; todo 목록을 받아온다. 결과에 http 헤더, status, length까지 모두 표시된다.
  (->> "https://jsonplaceholder.typicode.com/todos"
       GET)

  ; todo 목록을 받아온다. 결과에서 body 만 본다.
  (-> "https://jsonplaceholder.typicode.com/todos"
      GET
      :body)

  ; todo 목록을 받아온다. todo 목록의 3번 인덱스 항목만 본다.
  ;     host 주소를 일일이 입력하지 않고 host를 사용할 수 있다.
  (-> (str host "/todos")
      GET
      :body
      (get 3))

  ; todo 목록의 3번 인덱스 항목을 json String으로 변환한 결과를 본다.
  (-> (str host "/todos")
      GET
      :body
      (get 3)
      json/encode)
  ;;
  )
```

위의 코드에서 두 번째 항목에 커서를 놓고 평가하면 아래 이미지와 같이 jsonplaceholder에서 제공하는 todo 목록을 받아와 오른쪽 윈도우에 보여준다.

![todo 목록을 조회한 모습]( ./jsonplaceholder.jpg )

POST 요청은 다음과 같이 보낼 수 있다.

```clojure
(def-requests
  "jsonplaceholder에 POST 요청을 보내는 예제"

  ; 새로운 포스트를 등록하고 결과를 받는다.
  (-> "https://jsonplaceholder.typicode.com/posts"
      (POST {:title   "포스트 제목"
             :body    "포스트 내용"
             :user-id 1}))

  ; 새로운 포스트를 등록하고, 응답에서 status 와 body 만 본다.
  (-> (str host "/posts")
      (POST {:title   "포스트 제목"
             :body    "포스트 내용"
             :user-id 1})
      (select-keys [:status :body]))
  ;;
  )
```

#### 인증 토큰을 저장해서 활용하는 방법

[login_token.clj]( https://github.com/johngrib/cljstman/blob/dd8d9ed32653d5e3ee53e147105fffacd9a75118/src/example/login_token.clj )

```clojure
(ns example.login-token
  (:require [http.cljstman :as http :refer [def-requests POST]]))

(def token (atom nil))

(defn login
  ([]
   (login "johngrib@xxxx.com" "p@ssword"))
  ([id password]
   (let [result (POST "http://localhost:80/user/token"
                  {} ; body
                  {:userid     id
                   :password   password
                   :grant-type "password"}
                  {:content-type :application/x-www-form-urlencoded})
         login-token (get-in result [:body :token])]
     (println result)
     (reset! token login-token)
     login-token)))

(def-requests
  "로그인 요청을 보내고 받은 토큰을 token에 등록한다."

  (login)
  ;;
  )
```

위의 파일을 Vim에서 열어놓고 `(login)`에 커서를 둔 다음 평가하면 인증 토큰을 받아와서 `token`에 저장한다.

여기에서 `login` 함수와 `token`은 public하기 때문에 다른 파일에서도 불러다 쓸 수 있다.

이걸 활용하면 다음과 같은 응용도 가능하다.

[graphql.clj]( https://github.com/johngrib/cljstman/blob/dd8d9ed32653d5e3ee53e147105fffacd9a75118/src/example/graphql.clj )

```clojure
(def-requests
  "로그인 따로 GraphQL 요청 따로 보내는 예제"

  (login)
  (POST "http://localhost:80/graphql"
        {:Authorization (str "Bearer " @token)}
        {:query "
         query {
           hero {
             name
           }
         }"})
  ;;
  )
```

`(login)`에 커서를 두고 실행시켜서 토큰을 받아와 저장한 다음, `(POST`에 커서를 놓고 요청을 보내는 방법이다.

http header에 `Authorization: Bearer @token`을 지정하고 있다는 점에 주목하자.

만약 토큰 유효 시간이 만료되는 것이 귀찮다면 다음과 같이 할 수도 있다.

`do`로 감싸서 아예 요청을 보낼 때마다 토큰을 가져오도록 하는 것이다.

```clojure
(def-requests
  "매번 로그인하면서 graphql 요청을 보내는 예제."

  (do
    (login)
    (POST "http://localhost:80/graphql"
      {:Authorization (str "Bearer " @token)}
      {:query "
        query {
          hero {
            name
          }
        }"}))
  ;;
  )
```

## cljstman 사용 방법

사용 방법은 간단하다.

<https://github.com/johngrib/cljstman >

위의 repository를 로컬 컴퓨터에 clone 받은 다음, Postman에서 collection을 만들던 것처럼 package 디렉토리를 만들고, 파일별로 (위의 예제를 참고해서) http 요청 케이스를 만들면 된다.

Clojure 코딩에 익숙하다면 Postman의 거의 완벽한 무료 대체제가 될 수 있다고 생각한다.

왠지 Emacs에는 이런 게 이미 있을 것 같다.

## 함께 읽기

- [[/vim/rest-console]]

