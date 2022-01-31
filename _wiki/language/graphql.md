---
layout  : wiki
title   : GraphQL
summary : API를 위한 쿼리 언어
date    : 2022-01-30 09:54:17 +0900
updated : 2022-01-31 10:57:17 +0900
tag     : 
toc     : true
public  : true
parent  : [[/language]]
latex   : false
---
* TOC
{:toc}

## GraphQL?

[한국어 공식 사이트]( https://graphql-kr.github.io )에서는 다음과 같이 소개한다.

>
**API를 위한 쿼리 언어**
>
GraphQL은 API를 위한 쿼리 언어이며 이미 존재하는 데이터로 쿼리를 수행하기 위한 런타임 입니다.
GraphQL은 API에 있는 데이터에 대한 완벽하고 이해하기 쉬운 설명을 제공하고 클라이언트에게 필요한 것을 정확하게 요청할 수 있는 기능을 제공하며 시간이 지남에 따라 API를 쉽게 진화시키고 강력한 개발자 도구를 지원합니다.

### SQL과 GraphQL

SQL을 사용해 본 적이 있다면 SQL의 개념과 대비해 GraphQL을 이해할 수 있다고 생각한다.

- GraphQL은 SQL과 같이 선언적인 쿼리문을 특정 서버로 전달하며,
    - 쿼리문을 전달받은 서버는 쿼리를 해석해 데이터를 조회하거나 업데이트하고,
    - 그 결과를 쿼리에서 요청한 형식에 맞게 구성해 리턴해 주는 것이다.

Learning GraphQL에서는 이와 비슷한 설명이 나온다.

>
GraphQL은 쿼리 데이터베이스용으로 만들어진 개념을 가져다가 인터넷에 적용해 만들어진 것입니다.
GraphQL 쿼리 하나로 여기저기 흩어져 있는 데이터를 한데 모아 받습니다.
SQL처럼 GraphQL 쿼리도 데이터를 변경하거나 삭제할 때 사용합니다.
SQL의 QL과 GraphQL의 QL은 둘 다 마찬가지로 쿼리 언어(Query Language)라는 뜻입니다.
[^learning-graphql-38]

간단한 조회 쿼리를 두고 소박하게 비교해 보자. 이 표의 각 단계와 작업 내용은 내가 이해하기 위해 상상해 작성한 것으로 실제 구현과는 다를 수 있다.

| 순서 | SQL                                                               | GraphQL                                                                                     |
|------|-------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| 1    | SELECT 조회문을 SQL 문법에 맞게 작성한다.                         | query 조회문을 GraphQL 문법에 맞게 작성한다.                                                |
| 2    | 작성한 조회문을 DB로 보낸다.                                      | 작성한 조회문을 HTTP를 통해 API 서버로 보낸다.                                              |
| 3    | DB의 SQL 검사기는 쿼리의 문법을 검사한다.                         | API 서버의 GraphQL 라이브러리는 쿼리의 문법을 검사한다.                                     |
| 4    | DB의 SQL 검사기는 조회 대상 table, column 등이 유효한지 검사한다. | GraphQL 라이브러리는 조회 대상 schema가 유효한지 검사한다.                                  |
| 5    | 데이터를 조회한다. (join도 한다.)                                 | 서버 개발자가 작성한 각 필드에 대응하는 resolver 함수가 각 필드의 데이터를 조회해 리턴한다. |
| 6    | 조회된 데이터를 요청한 형식에 맞게 구성한다.                      | GraphQL 라이브러리는 resolver가 리턴한 결과를 요청한 형식에 맞게 구성한다.                  |
| 7    | 구성한 데이터 결과 셋을 돌려준다.                                 | 구성한 데이터를 HTTP 응답으로 돌려준다.                                                     |

따라서 GraphQL을 단순한 조회/업데이트 API를 대체하는 용도로 사용하고자 한다면 다음과 같은 작업을 해야 할 수 있다.

- GraphQL query에서 사용할 schema를 정의해서, 서버 애플리케이션의 GraphQL 라이브러리가 참조할 GraphQL schema 파일에 추가한다.
- 각 schema 타입별 resolver 함수를 작성한다.
    - resolver 함수는 DB에서 값을 조회해오거나, 업데이트 요청을 보낼 수 있으므로 SQL이나 ORM을 쓸 수 있다.
- API 요청을 받는 컨트롤러와 resolver 함수를 연결해 준다.

### GraphQL의 도입으로 기대할 수 있는 것들

github은 API v4부터 GraphQL을 사용하고 있으며, [다음과 같이 이유를 밝힌다.]( https://docs.github.com/en/graphql/overview/about-the-graphql-api#why-github-is-using-graphql )

>
**Why GitHub is using GraphQL**
>
GitHub chose GraphQL for our API v4 because it offers significantly more flexibility for our integrators.
The ability to define precisely the data you want—and only the data you want—is a powerful advantage over the REST API v3 endpoints.
GraphQL lets you replace multiple REST requests with a single call to fetch the data you specify.
>
For more details about why GitHub has moved to GraphQL, see the original [announcement blog post]( https://github.blog/2016-09-14-the-github-graphql-api/ ).
>
**Github이 GraphQL을 사용하는 이유**
>
Github은 API v4에 GraphQL을 선택했으며, 그 이유는 GraphQL이 사용자(integrators)에게 훨씬 더 많은 유연성을 제공해주기 때문입니다.
원하는 데이터만 정확하게 정의하는 GraphQL의 기능은 REST API v3 엔드포인트와 대비되는 강력한 장점입니다.
GraphQL을 사용하면 여러 REST 요청을 한 번의 호출로 지정한 데이터를 가져올 수 있게 됩니다.
>
GitHub이 GraphQL을 선택하게 된 더 자세한 이유에 대해서는 [블로그의 공지글(2016년 9월 14일)]( https://github.blog/2016-09-14-the-github-graphql-api/ )을 참고하세요.


나는 GraphQL을 사용한다면 REST API에 대비해 다음과 같은 특징들을 기대할 수 있다고 생각한다.

- over fetching을 예방할 수 있다.
    - over fetching은 API 요청 결과에 필요 없는 정보들이 포함되어 있는 것을 말한다.
    - 일반적인 REST API라면 요청을 보낼 때 응답 포맷에 대한 필터링을 정의하기 어려우므로 over fetching을 어쩔 수 없이 받아들여야 하는 경우가 많다.
- under fetching을 예방할 수 있다.
    - under fetching은 API 요청 결과가 필요한 정보들의 부분집합인 것을 말한다.
    - under fetching 문제가 있다면 API 호출자는 여러 엔드포인트에 대한 HTTP request를 전송해 돌아온 결과를 조합해 원하는 결과를 만들어야 한다.
    - GraphQL을 사용하면 이상적인 경우, 여러 차례의 API 요청을 단 1회로 줄일 수도 있다.
    - 위의 GitHub 발표문은 GraphQL이 under fetching을 없앨 수 있다는 장점을 이야기하고 있다.
- 요구 조건의 변화를 GraphQL 쿼리 수정으로 대응할 수 있다.
    - 새로운 REST API 엔드포인트를 추가하지 않아도, 그냥 요청 쿼리를 바꾸는 것으로 해결할 수 있는 여지가 생긴다.
    - GraphQL 요청을 받는 API 엔드포인트를 유지하기만 하면 되므로, REST API를 위한 엔드포인트의 추가/삭제는 별개의 문제이다.
- 단순 조회 용도의 REST API를 GraphQL 엔드포인트로 합칠 수 있다.
    - 여러 개의 조회용 API 엔드포인트 주소를 GraphQL 쿼리를 받는 엔드포인트 하나로 합쳐갈 수 있다.
    - 특정 API에서의 조회 요청에 대응하는 GraphQL 스키마만 정의되어 있다면 해당 API 호출부를 GraphQL 쿼리를 만들고 GraphQL 엔드포인트를 호출하도록 수정하면 된다. 이후 문제가 없는 것을 확인하고, 오래된 API를 삭제하면 된다.
    - 쿼리를 수정하기만 하면 결과 포맷도 변경이 가능하므로, 결과 셋 형식에 대한 책임이 SQL/ORM을 사용하는 쪽에서, GraphQL 쿼리를 생성하는 쪽으로 넘어간다.

## 예제를 통한 연습

### SWAPI

[SWAPI GraphQL API](https://graphql.org/swapi-graphql )에서 스타워즈 정보를 통해 GraphQL을 연습해 보며 학습할 수 있다.

다음과 같이 [Query를 작성하고 전송해보자.]( https://graphql.org/swapi-graphql?query=query%20%7B%0A%20%20person(personID%3A%201)%20%7B%0A%20%20%20%20name%20%20%20%0A%20%20%7D%0A%7D )

```graphql
query {
  person(personID: 1) {
    name
  }
}
```

이렇게 작성한 Query는 문자열로 변환되어 HTTP request payload로 전송된다. `curl`로 표현하자면 다음과 같다.

```sh
curl 'https://swapi-graphql.netlify.app/.netlify/functions/index' \
  -H 'content-type: application/json' \
  --data-raw '{"query":"query { person(personID: 1) { name }}","variables":null}'
```

응답은 다음과 같이 돌아온다.

```json
{
  "data": {
    "person": {
      "name": "Luke Skywalker"
    }
  }
}
```

Query를 수정해서 더 많은 내용을 조회할 수도 있다. 엔드포인트가 같은데도 Query를 수정하는 것만으로도 다른 정보를 얻을 수 있다는 점에 주목하자.

```graphql
query {
  person(personID: 1) {
    name
    eyeColor
    homeworld {
      name
    }
  }
}
```

결과는 다음과 같다.

```json
{
  "data": {
    "person": {
      "name": "Luke Skywalker",
      "eyeColor": "blue",
      "homeworld": {
        "name": "Tatooine"
      }
    }
  }
}
```

### github

[github의 Introduction to GraphQL]( https://docs.github.com/en/graphql/guides/introduction-to-graphql )을 읽으며
[GitHub의 GraphQL playground]( https://docs.github.com/en/graphql/overview/explorer )에서 연습해보자.

#### query

다음은 [GitHub의 예제 쿼리]( https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#example-query )를 일부 수정해 본 것이다. (편의상 닫는 중괄호는 한 줄로 모아 두었다.)
[이 웹 사이트의 issues]( https://github.com/johngrib/johngrib.github.io/issues?q=is%3Aissue+is%3Aclosed )에서 최초의 2개 이슈를 조회하는 내용이다.

```graphql
query {
  repository(owner: "johngrib", name: "johngrib.github.io") {
    issues(first: 2, states: CLOSED) {
      edges {
        node {
          title
          url
          labels(first: 5) {
            edges {
              node {
                name } } } } } } } }
```

- `query`: 조회 요청을 선언한다. 조회가 아니라 업데이트 요청이라면 `query`가 아니라 `mutation` 키워드를 사용한다.
- `repository`: repository 조회 요청. 스키마를 확인해 보면 `repository` 조회 요청은 `Repository` 타입을 리턴한다.
    - `(owner: "johngrib", name: "johngrib.github.io")`: 검색 조건. github 사용자와 repository 이름.
    - `issues`: `Repository` 타입에 포함된 `issue` 조회 요청. 스키마를 확인해 보면 `issues` 조회 요청은 `IssueConnection` 타입을 리턴한다.
        - `(first: 2, states: CLOSED)`: 조회 조건. 최초 2개의 이슈를 조회하고, CLOSED 상태인 것만 조회.
        - `edges`: `IssueConnection` 타입에 포함된 `IssueEdge` 타입 조회 요청.
            - ...

위의 쿼리를 [GitHub의 GraphQL playground]( https://docs.github.com/en/graphql/overview/explorer )에서 실행하면 다음과 같은 결과가 나온다.

![johngrib 쿼리 실행 결과]( ./github-query-johngrib-1.jpg )

[github의 public-schema](https://docs.github.com/en/graphql/overview/public-schema )([백업파일]( ./schema.docs.graphql ), [백업gist]( https://gist.github.com/johngrib/32436503ccb7c95f0c13a1174d6db2f2 ))는 47000 라인이 넘는 아주 긴 파일인데,
다음은 이 스키마 파일에서 위의 repository 조회 쿼리만 뽑아 읽기 쉽게 재구성한 것이다.
[^github-schema-repository-from]

```java
"""
The query root of GitHub's GraphQL interface.
"""
type Query {

  """
  Lookup a given repository by the owner and repository name.
  """
  repository(
    """
    Follow repository renames. If disabled, a repository referenced by its old name will return an error.
    """
    followRenames: Boolean = true

    """
    The name of the repository
    """
    name: String!

    """
    The login field of a user or organization
    """
    owner: String!
  ): Repository
}
```

- [type Query]( https://gist.github.com/johngrib/32436503ccb7c95f0c13a1174d6db2f2#file-schema-docs-graphql-L30042 )
- [repository(..)]( https://gist.github.com/johngrib/32436503ccb7c95f0c13a1174d6db2f2#file-schema-docs-graphql-L30286 )

읽어보면 여기에서 정의된 `followRenames`, `owner`, `name` 중 두 가지를 `repository` 조회에 사용했다는 것을 알 수 있다.

조회 결과는 `Repository` 타입이며, 다음은 스키마 파일에서 필요한 부분만 뽑아 재구성한 것이다.
[^github-schema-repository-type]

```java
"""
A repository contains the content for a project.
"""
type Repository implements Node & PackageOwner & ProjectOwner & RepositoryInfo & Starrable & Subscribable & UniformResourceLocatable {

  """
  A list of issues that have been opened in the repository.
  """
  issues(
    """
    Returns the first _n_ elements from the list.
    """
    first: Int

    """
    A list of states to filter the issues by.
    """
    states: [IssueState!]
  ): IssueConnection!
```

[type Repository]( https://gist.github.com/johngrib/32436503ccb7c95f0c13a1174d6db2f2#file-schema-docs-graphql-L34616 )

`issues`를 통해 조회되는 타입은 `IssueConnection`로 연결되고.. 계속 이렇게 그래프 구조를 이루며 내려간다.


#### mutation

이번엔 [github 예제를 따라 mutation 요청]( https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#example-mutation )을 보내보자.

다음 query는 [github.com/octocat/Hello-World 리포지토리의 349번 이슈](https://github.com/octocat/Hello-World/issues/349 )의 아이디를 조회한다.

```graphql
query FindIssueID {
  repository(owner:"octocat", name:"Hello-World") {
    issue(number:349) {
      id
    }
  }
}
```

위의 query를 실행하면 해당 이슈의 아이디를 얻을 수 있다.

```json
{
  "data": {
    "repository": {
      "issue": {
        "id": "MDU6SXNzdWUyMzEzOTE1NTE="
      }
    }
  }
}
```

아이디가 `MDU6SXNzdWUyMzEzOTE1NTE=`라는 것을 확인하자.

base64로 인코딩한 값이라는 감이 온다. 이 값을 `base64` 명령으로 디코딩하면 평문을 확인할 수 있다.

```sh
$ pbpaste | base64 --decode
05:Issue231391551
```

[349번 이슈]( https://github.com/octocat/Hello-World/issues/349 )로 찾아가서 조사해보면 `231391551`이 이 이슈의 아이디인 것으로 보인다.
(모든 github 이슈들의 고유한 `AUTO_INCREMENT` 값이 아닐까 싶다.)

![issue 231391551]( ./issue-231391551.jpg )

mutation 요청을 보낼 대상은 다 확인했으므로, mutation 요청을 읽어보자.

```graphql
mutation AddReactionToIssue {
  addReaction(input:{subjectId:"MDU6SXNzdWUyMzEzOTE1NTE=",content:HOORAY}) {
    reaction {
      content
    }
    subject {
      id
    }
  }
}
```

두 개의 parameter를 사용하고 있다.

- `subjectId:"MDU6SXNzdWUyMzEzOTE1NTE="`: base64로 인코딩한 349번 이슈의 아이디.
- `content:HOORAY`: 해당 이슈에 남길 이모지.

이제 요청을 보내보자.

![mutation 요청과 그 결과]( ./mutation-request-response.jpg )

보낸 값에 대한 다른 표현이 응답으로 돌아온다.

이제 349번 이슈로 돌아가 이모지를 확인해 보자.

| before | ![mutation 전]( ./hooray-before.jpg ) |
| after  | ![mutation 후]( ./hooray-after.jpg )  |

파티 폭죽 모양의 이모지(🎉)가 추가되어 있다.

이제 스키마를 찾아보자. `addReaction` 요청은 이렇게 되어 있다.
[^github-schema-add-reaction]

```java
  """
  Adds a reaction to a subject.
  """
  addReaction(
    """
    Parameters for AddReaction
    """
    input: AddReactionInput!
  ): AddReactionPayload
```

[addReaction(..)]( https://gist.github.com/johngrib/32436503ccb7c95f0c13a1174d6db2f2#file-schema-docs-graphql-L18003 )

`input`으로 `AddReactionInput`을 사용하며, 요청에 대해 `AddReactionPayload` 타입을 응답한다.

`AddReactionInput`은 이렇게 되어 있다.
[^github-schema-add-reaction-input]

```java
"""
Autogenerated input type of AddReaction
"""
input AddReactionInput {
  """
  The name of the emoji to react with.
  """
  content: ReactionContent!

  """
  The Node ID of the subject to modify.
  """
  subjectId: ID!
    @possibleTypes(
      concreteTypes: [
        "CommitComment"
        "Discussion"
        "DiscussionComment"
        "Issue"
        "IssueComment"
        "PullRequest"
        "PullRequestReview"
        "PullRequestReviewComment"
        "Release"
        "TeamDiscussion"
        "TeamDiscussionComment"
      ]
      abstractType: "Reactable"
    )
}
```

[input AddReactionInput {..}]( https://gist.github.com/johngrib/32436503ccb7c95f0c13a1174d6db2f2#file-schema-docs-graphql-L659 )

결과 응답인 `AddReactionPayload`는 다음과 같이 정의되어 있다.
[^github-schema-add-reaction-payload]

```java
"""
Autogenerated return type of AddReaction
"""
type AddReactionPayload {
  """
  A unique identifier for the client performing the mutation.
  """
  clientMutationId: String

  """
  The reaction object.
  """
  reaction: Reaction

  """
  The reactable subject.
  """
  subject: Reactable
}
```

[type AddReactionPayload {..}]( https://gist.github.com/johngrib/32436503ccb7c95f0c13a1174d6db2f2#file-schema-docs-graphql-L695 )

### GraphQL 공식 사이트 예제 참고

#### GraphQL 소개

<https://graphql-kr.github.io/learn/ >

다음과 같이 스키마를 구성해 두었다고 하자.

```graphql
type Query {
  me: User
}

type User {
  id: ID
  name: String
}
```

그리고 위의 두 타입에 대해 아래와 같은 Javascript 함수를 작성하였다고 하자.

```javascript
function Query_me(request) {
  return request.auth.user;
}

function User_name(user) {
  return user.getName();
}
```

각 함수가 `return request...`와 같은 형태를 취하고 있는데, 이렇게 해야만 하는 건 아니고 실제로는 저 함수 안쪽에서 DB를 조회해서 조회한 결과를 리턴한다던가 하게 된다.
예제를 단순하게 표현하기 위해 `request`에 포함된 값을 그냥 돌려주는 것일 뿐이다.

이 때 이렇게 쿼리를 작성해 전송하면 결과는 다음과 같다.

| 쿼리                    | 결과                     |
|-------------------------|--------------------------|
| <span id="query-CAC3"/> | <span id="result-CAC3"/> |

```graphql
query {
  me {
    name
  }
}
```
{:class="dynamic-insert" data-target-selector="#query-CAC3"}

```json
{
  "me": {
    "name": "Luke Skywalker"
  }
}
```
{:class="dynamic-insert" data-target-selector="#result-CAC3"}

- 이 결과를 만들기 위해 위에서 만든 두 개의 함수가 사용된다.
- `me`를 조회하기 위해 `Query_me` 함수를 호출하고, 그 결과에서 `name`을 완성해주기 위해 `User_name` 함수를 호출하게 되는 것.
- `me`와 `Query_me`의 관계, 그리고 `name`과 `User_name`의 관계는 자동으로 되는 건 아니고 따로 다른 곳에서 연결해줘야 한다.

#### 쿼리 & 뮤테이션

<https://graphql-kr.github.io/learn/queries/ >

| 쿼리                    | 결과                     |
|-------------------------|--------------------------|
| <span id="query-CD58"/> | <span id="result-CD58"/> |

```graphql
query {
  human(id: "1000") {
    name
    height(unit: FOOT)
  } }
```
{:class="dynamic-insert" data-target-selector="#query-CD58"}

```json
{
  "data": {
    "human": {
      "name": "Luke Skywalker",
      "height": 5.6430448
    } } }
```
{:class="dynamic-insert" data-target-selector="#result-CD58"}

- `human(id: "1000")`은 함수에 `id: "1000"`을 넘겨서, `id`가 `1000`인 `human`을 조회한다.
    - `SELECT name, height FROM human WHERE id = 1000` 라고 생각해두자.
- `name` 필드는 `String`을 리턴한다.
- `height(unit: FOOT)`은 함수에 `unit: FOOT`을 넘겨서, 단위를 FOOT으로 맞춘다.
    - `human`에서 `id`는 조회 기준이었는데, `height`에서 `unit`은 단위 지정이다.
        - 함수가 어떤 결과를 리턴할지는 함수를 만든 사람 마음이다. 동료들과 잘 이야기하며 정해야 하는 문제이다.
    - `height` 필드는 `Float`을 리턴한다.

| 쿼리                    | 결과                     |
|-------------------------|--------------------------|
| <span id="query-245D"/> | <span id="result-245D"/> |

```graphql
query {
  hero(episode: EMPIRE) {
    name
    friends {
      name
    } } }
```
{:class="dynamic-insert" data-target-selector="#query-245D"}

```json
{
  "data": {
    "hero": {
      "name": "Luke Skywalker",
      "friends": [
        { "name": "Han Solo" },
        { "name": "Leia Organa" },
        { "name": "C-3PO" },
        { "name": "R2-D2" }
      ] } } }
```
{:class="dynamic-insert" data-target-selector="#result-245D"}

- `friends` 필드는 배열을 리턴한다.

| 쿼리                    | 결과                     |
|-------------------------|--------------------------|
| <span id="query-C9B9"/> | <span id="result-C9B9"/> |

```graphql
query {
  empireHero: hero(episode: EMPIRE) {
    name
  }
  jediHero: hero(episode: JEDI) {
    name
  } }
```
{:class="dynamic-insert" data-target-selector="#query-C9B9"}

```json
{
  "data": {
    "empireHero": {
      "name": "Luke Skywalker"
    },
    "jediHero": {
      "name": "R2-D2"
    } } }
```
{:class="dynamic-insert" data-target-selector="#result-C9B9"}

- `empireHero:`와 `jediHero:`는 알리아싱을 의미한다. 같은 `hero`이지만 결과를 보면 다른 key 값이 돌아왔다.

## 참고문헌

- <https://docs.github.com/en/graphql/guides >
- <https://graphql.org/ > ([한국어](https://graphql-kr.github.io/ ))
- 웹 앱 API 개발을 위한 GraphQL / 이브 포셀로, 알렉스 뱅크스 저/배영 역 / 인사이트(insight) / 초판 1쇄 발행 2019년 11월 12일 / 원제: Learning GraphQL

## 주석

[^learning-graphql-38]: 웹 앱 API 개발을 위한 GraphQL. 3장. 38쪽.
[^github-schema-repository-from]: `type Query {..}`는 30042~30537번 라인. `repository(..): Repository`는 30288~30303번 라인.
[^github-schema-repository-type]: `Repository {..}`는 34616~36013번 라인. `issues(..)` 는 35175~35215
[^github-schema-add-reaction]: `addReaction(..)`는 18003~18008번 라인.
[^github-schema-add-reaction-input]: `input AddReactionInput {..}`는 659~690번 라인.
[^github-schema-add-reaction-payload]: `type AddReactionPayload {..}`는 692~710번 라인.

