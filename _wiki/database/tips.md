---
layout  : wiki
title   : Database 이것저것
summary : 
date    : 2022-12-19 20:45:26 +0900
updated : 2023-01-21 23:10:23 +0900
tag     : db
toc     : true
public  : true
parent  : [[/database]]
latex   : false
resource: E2/33A812-74FF-4210-A050-DF5B73DAD6C2
---
* TOC
{:toc}

## identifier column

- 식별자 컬럼은 가급적이면 정수 타입을 사용할 것. `AUTO_INCREMENT`가 된다는 장점도 있다.
- 문자열 타입은 가급적 사용하지 말 것. 정수 타입보다 느리다.

만약 굳이 문자열 타입을 식별자로 사용해야 한다면, 해시값이나 UUID 처럼 랜덤한 문자열을 사용하는 경우를 주의할 것.

>
또한 `MD5()`, `SHA1()` 또는 `UUID()`에 의해 생성된 문자열과 같이 완전히 '임의의' 문자열에 대해서도 매우 주의해야 합니다.
생성한 각각의 새로운 값은 큰 공간에 임의의 방식으로 배포되므로 `INSERT` 및 일부 `SELECT` 쿼리가 느려질 수 있습니다.[^original-164]
>
> - 삽입된 값이 인덱스의 임의의 위치에 있어야 하기 때문에 `INSERT` 쿼리가 느려집니다. 이로 인해 클러스터형 저장소 엔진에 대한 페이지 분할, 임의의 디스크 액세스 및 클러스터형 인덱스 조각화가 발생합니다.
> - 논리적으로는 인접한 행이 디스크와 메모리에 광범위하게 분산되기 때문에 `SELECT` 쿼리가 느려집니다.
> - 랜덤값은 캐싱이 작동하는 방식인 참조 인접성을 무효화하기 때문에 모든 유형의 쿼리에 대해 캐시 성능이 저하됩니다. 전체 데이터 세트가 동일하게 '핫'하다면 데이터의 특정 부분을 메모리에 캐시하는 이점이 없고 작업 세트가 메모리에 맞지 않으면 캐시에 많은 플러시와 누락이 발생합니다.
>
UUID(Universally Unique Identifier) 값을 저장하는 경우 대시를 제거하거나 `UNHEX()`를 사용 하여 UUID 값을 16바이트 숫자로 변환하고 `BINARY(16)` 열에 저장해야 합니다. `HEX()` 함수를 사 용하여 16진수 형식으로 값을 검색할 수 있습니다.
>
-- MySQL 성능 최적화. 6장. 164쪽.

## 가급적 NOT NULL을 사용할 것

>
관련 항목에서 MySQL은 인덱스에 값이 아닌 것을 포함하지 않는 Oracle과 달리 `NULL`을 인덱싱합니다.
>
-- MySQL 성능 최적화. 6장. 167쪽.

<span/>

>
많은 테이블에는 애플리케이션이 `NULL`을 저장할 필요가 없는 경우에도 단지 기본값이기 때문에 `NULL`이 가능한 열이 포함됩니다.
`NULL`을 저장할 의도가 아니라면 일반적으로 열을 `NOT NULL`로 지정하는 것이 가장 좋습니다.
MySQL은 인덱스, 인덱스 통계 및 값 비교를 복잡하게 만들기 때문에 `NULL` 가능 열을 참조하는 쿼리는 최적화하기가 어렵습니다.
`NULL` 가능한 열은 더 많은 스토리지 공간을 사용하며 MySQL 내부에서 특별한 처리가 필요합니다. `NULL` 열을 `NOT NULL`로 변경해서 얻는 성능 향상이 크지는 않으므로 그것들이 문제를 일으키는 지 아닌지를 모른다면 기존 스키마에서 해당 열을 일일이 찾아 변경하는 것은 꼭 할 필요는 없습니다.
>
-- MySQL 성능 최적화. 6장. 144쪽.

- nullable과 not null 컬럼은 미세한 성능 차이가 있다.
    - 그러나 엄청난 차이는 아니므로 nullable을 찾아 일일이 바꾸는 작업을 굳이 하지는 말 것.
- `NULL` 대신 적절한 default 값을 고려해볼 것.
- 그러나 그럼에도 불구하고 여러가지를 고려했을 때 `NULL`이 적절하다면 그냥 `NULL`을 사용한다.

## Join Decomposition

조인 분해(Join Decomposition)는 여러 `join`이 있는 하나의 쿼리를 풀어서 여러 쿼리로 분해하는 것을 말한다.

다음은 "MySQL 성능 최적화"에서 소개하는 예제이다.[^hi-perform-229]

| 분해 전 | <span id="joined-sql"/>     |
| 분해 후 | <span id="not-joined-sql"/> |

```sql
SELECT * FROM tag
JOIN tag_post ON tag_post.tag_id = tag.id
JOIN post ON tag_post.post_id = post.id
WHERE tag.tag = 'mysql';
```
{:class="dynamic-insert" data-target-selector="#joined-sql"}


```sql
SELECT * FROM tag WHERE tag = 'mysql';
SELECT * FROM tag_post WHERE tag_id = 1234;
SELECT * FROM post WHERE post.id in (123, 456, 567, 9098, 8904);
```
{:class="dynamic-insert" data-target-selector="#not-joined-sql"}

이렇게 분해하면 성능이 나빠질 것 같지만, 상황에 따라 오히려 성능이 개선되거나 그 외의 장점들이 있을 수 있다.

>
> - 캐싱이 더 효율적일 수 있습니다. 많은 애플리케이션은 테이블에 직접 매핑되는 '객체'를 캐시합니다. 이 예에서 mysql 태그를 가진 객체가 이미 캐시된 경우 애플리케이션은 첫 번째 쿼리를 건너뛸 수 있습니다. 캐시에서 ID가 `123`, `567` 또는 `9098`인 게시물을 찾으면 `IN()` 목록에서 제거할 수 있습니다.
> - 개별적으로 쿼리를 실행하면 잠금 경합을 줄일 수 있습니다.
> - 애플리케이션에서 조인을 수행하면 테이블을 다른 서버에 배치할 수 있어 데이터베이스를 쉽게 확장할 수 있습니다.
> - 쿼리 자체가 더 효율적일 수 있습니다. 이 예에서 조인 대신 `IN()` 목록을 사용하면 MySQL이 조인으로 하는 것보다 더 최적으로 행 ID를 정렬하고 검색할 수 있습니다
> - 불필요한 행 액세스를 줄일 수 있습니다. 애플리케이션에서 조인을 수행하면 각 행을 한 번만 검색하는 반면, 쿼리의 조인은 본질적으로 동일한 데이터에 반복적으로 액세스할 수 있는 비정규화입니다. 같은 이유로 이러한 재구성은 전체 네트워크 트래픽과 메모리 사용량을 줄일 수도 있습니다.
>
따라서 이전 쿼리의 많은 데이터를 캐시 및 재사용하거나, 여러 서버에 데이터를 분산 배포하거나, 큰 테이블의 `IN()` 목록으로 조인을 대체하거나, 여러 번 같은 테이블을 참조할 때 애플리케이션에서 조인을 수행하는 것이 더 효율적일 수 있습니다.
[^hi-perform-229]

나는 여기에 추가로 다음과 같은 장점이 있다고 생각한다.

- 코드의 가독성이 향상된다. 단순한 SELECT 문은 팀에 새로 합류한 개발자도 쉽게 이해할 수 있다.
- 테이블 구조를 변경하게 되었을 때 여러 `JOIN`으로 구성된 복잡한 쿼리는 변경에 취약하다. 분해된 쿼리는 이런 상황에 더 유연하게 대응할 수 있다. 특히 쿼리를 빌드하는 종류의 라이브러리를 사용한다면.

물론 DB에 여러 요청을 보내게 되므로 성능 트레이드 오프에 대해 충분히 고려하고 결정할 것.

## 참고문헌

- MySQL 성능 최적화 / 실비아 보트로스, 제레미 틴리 저/류수미, 송희정 역 / 위키북스 / 초판발행 2022년 09월 22일 /  원제 : High Performance MySQL 4E

## 주석

[^original-164]: 원주: 반면에 작성자가 많은 아주 큰 일부 테이블의 경우, 이러한 의사 난수 값은 실제로 '핫스팟'을 제거하는 데 도움이 될 수 있습니다.
[^hi-perform-229]: MySQL 성능 최적화. 8장. 229쪽.
