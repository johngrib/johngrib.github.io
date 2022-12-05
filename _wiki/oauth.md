---
layout  : wiki
title   : OAuth
summary : 
date    : 2022-09-18 10:07:56 +0900
updated : 2022-09-18 23:28:19 +0900
tag     : 
resource: E0/693179-858B-4605-8427-D50D0D3DD9DE
toc     : true
public  : true
parent  : [[/index]]
latex   : false
---
* TOC
{:toc}

## OAuth 2.0 Roles

>
1.1.  Roles
>
OAuth defines four roles:
>
> - resource owner
>     - An entity capable of granting access to a protected resource. When the resource owner is a person, it is referred to as an end-user.
> - resource server
>     - The server hosting the protected resources, capable of accepting and responding to protected resource requests using access tokens.
> - client
>     - An application making protected resource requests on behalf of the resource owner and with its authorization.  The term "client" does not imply any particular implementation characteristics (e.g., whether the application executes on a server, a desktop, or other devices).
> - authorization server
>     - The server issuing access tokens to the client after successfully authenticating the resource owner and obtaining authorization.
>
The interaction between the authorization server and resource server is beyond the scope of this specification.  The authorization server may be the same server as the resource server or a separate entity. A single authorization server may issue access tokens accepted by multiple resource servers.
>
-- RFC 6749. 1.1.[^rfc-6749-1-1]

- 리소스 소유자
    - 보호된 리소스에 대해 엑세스 권한을 부여할 수 있는 엔티티.
    - 만약 리소스 소유자가 사람이라면, 엔드 유저라고 부른다.
- 리소스 서버
    - 보호된 리소스를 호스팅하는 서버.
    - 보호된 리소스에 대한 '엑세스 토큰을 사용하는 요청'을 수락하고 응답할 수 있다.
- 클라이언트
    - 리소스 소유자를 대행하는 권한을 받아 보호된 리소스에 대한 요청을 보내는 애플리케이션.
    - "client"라는 단어는 특정한 구현 특성(예: 애플리케이션이 서버, 데스크탑, 특정 디바이스에서 실행되는지)를 의미하지 않는다.
- 인가 서버
    - 성공적으로 리소스 소유자를 인증하고 권한을 획득했다면 클라이언트에 엑세스 토큰을 발급해주는 서버.

인가 서버와 리소스 서버 간의 상호 작용은 이 스펙 문서의 범위를 벗어난다.
권한 부여 서버는 리소스 서버와 동일한 서버일 수도 있고, 별도의 엔티티일 수도 있다.
단일한 인가 서버는 여러 리소스 서버에서 허용하는 엑세스 토큰을 발급할 수 있다.


## OAuth 2.0 Authorization grant process

OAuth 2.0 인가 그랜트 절차.

![OAuth 2.0 인가 그랜트 절차]( /resource/E0/693179-858B-4605-8427-D50D0D3DD9DE/process-sequence.svg )
[^richer-60]

### 상황 예제: 트위터에 질문/답변을 올려주는 클라이언트

트위터에 질문/답변을 올려주는 클라이언트가 있다고 가정하자.
이 클라이언트는 익명으로 받은 질문에 사용자가 답변을 해주면, 답변한 내용을 사용자 대신 트위터에 자동으로 올려준다.

- 0\. 사용자는 트위터 질문/답변 사이트에 회원 가입한다.
    - 사용자는 트위터 질문/답변 사이트가 흥미롭다고 생각하고 회원에 가입한다.
- 1\. 클라이언트는 사용자 웹 브라우저를 인가 엔드 포인트로 리다이렉트한다.
    - 질문/답변 사이트가 바로 OAuth의 클라이언트 역할이 된다.
    - 클라이언트는 사용자가 답변을 작성하면 사용자의 트위터(보호된 리소스)에 트윗을 올려야 한다. 이를 위해 사용자의 인가를 받아야 하며, 그 증거로 트위터 인가 서버로부터 발급된 토큰을 얻어야 한다.
    - 따라서 사용자가 트위터 인가 서버에 로그인할 수 있도록 트위터 인가 엔드 포인트로 사용자 웹 브라우저를 리다이렉트시켜준다.

- 2\. 사용자 에이전트(웹 브라우저)는 인가 엔드 포인트를 로드한다.
    - 리다이렉트된 화면은 아래와 같다.

![사용자 로그인을 요구하는 화면]( /resource/E0/693179-858B-4605-8427-D50D0D3DD9DE/190888368-19ad7db4-71e1-4a19-920d-904670b38693.png )
{:style="max-width:450px"}

- 3\. 리소스 소유자가 인가 서버에 인증을 수행한다.
    - 사용자가 로그인한다.
- 4\. 인증한 리소스 소유자가 클라이언트를 인가한다.
    - 로그인한 다음, 클라이언트에 어떤 권한들을 허용할지 등을 선택하게 된다.

- 5\. 인가 서버는 사용자 에이전트를 클라이언트로 리다이렉트 시키면서 인가 코드를 전달한다.
    - 인가 서버는 해당 클라이언트에 대한 인가 코드를 생성한다.
    - 다음은 인가 서버가 클라이언트로 리다이렉트를 시키는 도중의 화면이다.

![인가 서버가 클라이언트로 리다이렉트 시키는 화면]( /resource/E0/693179-858B-4605-8427-D50D0D3DD9DE/190888617-6df4854f-1457-4b16-bdac-1970daf08b98.png )
{:style="max-width:450px"}

- 6\. 사용자 에이전트는 인가 코드로 클라이언트의 리다이렉트 URI를 로드한다.
- 7\. 클라이언트는 인가 코드와 자신의 자격 증명 정보를 토큰 엔드 포인트에 전달한다.
- 8\. 인가 서버는 엑세스 토큰을 클라이언트에게 전달한다.
    - 이제 클라이언트는 토큰을 얻었다.

## Access Token

### From: RFC 6749. 1.4. Access Token
>
Access tokens are credentials used to access protected resources. An access token is a string representing an authorization issued to the client. The string is usually opaque to the client. Tokens represent specific scopes and durations of access, granted by the resource owner, and enforced by the resource server and authorization server.
>
The token may denote an identifier used to retrieve the authorization information or may self-contain the authorization information in a verifiable manner (i.e., a token string consisting of some data and a signature). Additional authentication credentials, which are beyond the scope of this specification, may be required in order for the client to use a token.
>
The access token provides an abstraction layer, replacing different authorization constructs (e.g., username and password) with a single token understood by the resource server. This abstraction enables issuing access tokens more restrictive than the authorization grant used to obtain them, as well as removing the resource server's need to understand a wide range of authentication methods.
>
Access tokens can have different formats, structures, and methods of utilization (e.g., cryptographic properties) based on the resource server security requirements. Access token attributes and the methods used to access protected resources are beyond the scope of this specification and are defined by companion specifications such as [RFC6750]( https://www.rfc-editor.org/rfc/rfc6750 ).

엑세스 토큰은 보호된 리소스에 접근하는 데 사용되는 자격 증명입니다.
엑세스 토큰은 클라이언트에게 발급된 권한을 나타내는 문자열입니다.
이 문자열은 일반적으로 클라이언트에게는 불투명합니다.
토큰은 특정 권한 범위(scopes)와 엑세스 기간을 나타내며, 리소스 소유자가 부여해주고 리소스 서버 및 인가 서버에서 취급합니다.

토큰은 인증 정보를 얻는 데 사용되는 식별자를 나타내거나, 검증 가능한 방식(데이터와 서명 문자열로 만들어지는 토큰 문자열 등)으로 인증 정보를 자체적으로 포함할 수 있습니다.
클라이언트가 토큰을 사용하기 위해서 이 스펙의 범위를 벗어나는 추가적인 인증 자격 증명이 필요할 수도 있습니다.

엑세스 토큰은 추상화 계층을 제공해서, 다른 방식의 인증 구조(예: 사용자 이름과 패스워드)를 리소스 서버가 이해하는 토큰 하나를 쓰는 방식으로 대체하게 됩니다.
이러한 추상화가 있기 때문에 엑세스 토큰을 얻을 데 사용한 권한보다 더 제한된 권한을 갖는 엑세스 토큰을 발급할 수 있습니다. 그리고 리소스 서버가 광범위한 인증 방법을 이해해야 할 필요성을 제거할 수 있습니다.

엑세스 토큰은 리소스 서버 보안 요구 사항에 따라 다양한 형식과 구조 및 활용 방법(예: 암호화 속성)을 가질 수 있습니다.
보호된 리소스에 접근하기 위해 사용되는 엑세스 토큰 속성과 접근 방법은 이 스펙의 범위를 벗어나며, RFC 6750 스펙에 정의되어 있습니다.

### From: OAuth 2 in Action

>
OAuth 액세스 토큰<sup>Access tokens</sup>은 간단히 토큰이라고도 하며, 클라이언트에게 권한이 위임됐다는 것을 나타내기 위해 인가 서버가 클라이언트에게 발급한다.
OAuth에서는 토큰의 포맷이나 내용을 정의하지 않는다.
하지만 항상 클라이언트가 요청한 접근 권한, 리소스 소유자의 클라이언트 인가 그리고 인가 과정에서 클라이언트에게 부여된 권한(일반적으로 접근할 수 있는 보호된 리소스의 범위)을 나타낸다.
>
클라이언트가 볼 때 OAuth 토큰의 형식은 명확하지 않다.
따라서 클라이언트는 토큰 자체를 분석할 필요(또는 분석할 능력)가 없다.
클라이언트의 역할은 인가 서버에 토큰을 요청하고 인가 서버가 발급한 토큰을 이용해 보호된 리소스에 접근하는 것이다.
하지만 OAuth 시스템의 모든 구성 요소에게 토큰의 형식이 불명확한 것은 아니다.
인가 서버는 토큰을 만들어 발급하고 보호된 리소스는 전달된 토큰을 검증한다.
따라서 인가 서버와 보호된 리소스는 토큰 자체를 이해할 수 있으며, 그것이 어떤 내용을 의미하는지 알 수 있다.
하지만 클라이언트는 토큰의 내용이나 의미를 전혀 알지 못한다.
그렇게 함으로써 클라이언트가 좀 더 단순해지고, 인가 서버와 보호된 리소스는 토큰을 배포하는 방법에 있어 엄청난 유연성을 얻을 수 있다.
[^richer-71]

## Refresh Token

### From: RFC 6749. 1.5. Refresh Token

>
Refresh tokens are credentials used to obtain access tokens.
Refresh tokens are issued to the client by the authorization server and are used to obtain a new access token when the current access token becomes invalid or expires, or to obtain additional access tokens with identical or narrower scope (access tokens may have a shorter lifetime and fewer permissions than authorized by the resource owner).
Issuing a refresh token is optional at the discretion of the authorization server.
If the authorization server issues a refresh token, it is included when issuing an access token (i.e., step (D) in Figure 1).
>
-- RFC 6749. 1.5. [^rfc-6749-1-5]

리프레시 토큰은 엑세스 토큰을 얻기 위해 사용되는 자격 증명입니다.
리프레시 토큰은 인가 서버에서 클라이언트에게 발급해주며, 현재 갖고 있는 엑세스 토큰이 유효하지 않거나 만료되었을 때 새로운 엑세스 토큰을 획득하거나 이전과 같거나 더 좁은 범위(엑세스 토큰은 수명이 더 짧을 수 있으며, 리소스 소유자가 승인한 것보다 더 적은 권한)의 엑세스 토큰을 획득할 때 사용합니다.

리프레시 토큰의 발행은 인가 서버의 재량에 따라 지원할 수도 있고 안 할 수도 있습니다.

인가 서버가 리프레시 토큰을 발생한다면, 엑세스 토큰을 발행할 때 리프레시 토큰도 같이 발행합니다.

### 클라이언트는 왜 리프레시 토큰을 사용하는가?

>
그렇다면 클라이언트는 왜 리프레시 토큰을 사용해야 할까?
OAuth에서는 특정 시점에 액세스 토큰을 더 이상 사용할 수 없게 된다.
사용자가 토큰을 폐기했거나 토큰의 유효 기간이 만료됐거나 다른 시스템이 토큰을 유효하지 않게 만들기도 한다.
클라이언트는 일반적으로 토큰을 사용하는 도중에 자신에게 전달되는 에러 응답을 통해 해당 토큰이 유효하지 않다는 것을 알게 된다.
물론 그런 경우, 클라이언트는 리소스 소유자에게 다신 접근 권한을 요청할 수도 있다.
하지만 그때 리소스 소유자가 마침 없다면 어떻게 해야 할까?
>
OAuth 1.0에서는 그런 경우, 클라이언트는 단지 리소스 소유자에게 의지할 수밖에 없었다.
따라서 그런 상황을 피하기 위해 OAuth 1.0에서는 토큰이 명시적으로 폐기될 때까지 영원히 사용하는 경향이 있었다.
그것은 토큰 탈취를 위한 공격 벡터가 증가함에 따라 문제가 됐다.
즉, 토큰을 탈취한 공격자는 해당 토큰을 영원히 사용할 수 있다는 문제가 있었다.
OAuth 2.0에서는 토큰의 유효 기간이 자동으로 설정되기 때문에 토큰의 유효 기간이 만료되거나 그 때 사용자가 없더라도 리소스에 접근할 수 있는 방법이 필요하다.
그래서 만료 시간 없이 지속적으로 사용하는 토큰 대신 리프레시 토큰이 사용된다.
하지만 리프레시 토큰은 리소스에 접근하기 위한 용도로 사용되는 것이 아니라 리소스에 접근하는 데 사용되는 새로운 액세스 토큰을 요청하는 용도로만 사용된다.
그렇게 함으로써 리프레스 토큰과 액세스 토큰의 유출을 개별적으로 제한할 수 있으며, 상호 보완적으로 만들 수 있다.
>
리프레시 토큰은 또한 클라이언트의 접근 권한을 축소시킬 수도 있다.
만약, 클라이언트가 A, B, C라는 권한 범위를 할당받았는데, A만 있으면 필요한 작업을 수행할 수 있다고 가정하면 리프레시 토큰을 이용해 A 권한 범위만 가진 액세스 토큰을 요청할 수 있다.
이로 인해 스마트한 클라이언트는 최소한의 권한만 가져야 한다는 보안 원칙을 부담 없이 따를 수 있지만, 그렇지 못한 클라이언트는 자신이 호출할 API를 위해 어떤 권한이 필요한지를 파악 해야 한다.
[^richer-74]

요약

- OAuth 1.0 에서는 토큰을 사용할 수 없게 됐을 때마다, 리소스 소유자에게 접근 권한을 다시 요청해야 했다.
    - 이럴 때 리소스 소유자가 부재중이라면 액세스 권한을 얻을 수 없다.
    - 따라서 이 문제를 우회해서 토큰을 만료시키지 않고 아주 오래 사용하는 경향이 생겼다.
    - 이런 경향으로 토큰 탈취와 관련된 심각한 보안 문제가 생겼다.
- OAuth 2.0 에서는 토큰의 유효 기간이 자동으로 설정된다.
    - **유효기간이 만료되었을 때 리소스 소유자가 부재중인 경우**의 대안으로 리프레시 토큰을 사용한다.
    - 리프레시 토큰이 있기 때문에 각 엑세스 토큰의 만료 시간을 아주 길게 잡지 않아도 되는 것.
- 리프레시 토큰을 써서 새로 얻는 엑세스 토큰이 축소된 권한을 갖게 하는 것도 가능하다.
    - 예) SNS 서비스 클라이언트
        - old 엑세스 토큰의 접근 권한
            - 친구 목록 보기, 사용자 프로필 수정, 사용자 대신 글 올리기
        - 리프레시 토큰으로 얻은 new 엑세스 토큰의 접근 권한
            - 친구 목록 보기

## 참고문헌

- OAuth 2 in Action / 저스틴 리처, 안토니오 산소 저/윤우빈 역 / 에이콘출판사 / 발행 2018년 04월 17일 / 원제 : OAuth 2 in Action
- [RFC 6749 - The OAuth 2.0 Authorization Framework]( https://www.rfc-editor.org/rfc/rfc6749 )
- [RFC 6750 - The OAuth 2.0 Authorization Framework: Bearer Token Usage]( https://www.rfc-editor.org/rfc/rfc6750 )

## 주석

[^richer-60]: OAuth 2 in Action. 2장. 60쪽의 그림 2.1을 참고해 그린 다이어그램이다.
[^richer-71]: OAuth 2 in Action. 2장. 71쪽.
[^richer-74]: OAuth 2 in Action. 2장. 74쪽.
[^rfc-6749-1-1]: RFC 6749. 1.1. Roles
[^rfc-6749-1-5]: RFC 6749. 1.5. Refresh Token
