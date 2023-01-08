---
layout  : wiki
title   : 리스트를 테이블로 변환하는 기능
summary : 
date    : 2021-07-19 22:16:43 +0900
updated : 2023-01-08 16:14:54 +0900
tag     : 
resource: 00/9650BA-0119-4EDC-8557-BD618687B99A
toc     : true
public  : true
parent  : [[/blog/this]]
latex   : false
---
* TOC
{:toc}

## 기능 소개

```html
<div id="table1"></div>
- th
    - signal
    - red
    - green
- td
    - meaning
    - stop
    - go
{:class="table-generate" data-target-id="table1"}
```

위와 같이 리스트를 구성하면, 다음과 같은 테이블로 빌드해 주는 기능이다.

<div id="table1"></div>
- th
    - signal
    - red
    - green
- td
    - meaning
    - stop
    - go
{:class="table-generate" data-target-id="table1"}

필수 구성은 다음과 같다.

- `th`, `td`
    - `th`와 `td`을 통해 행을 구분해 준다. `th`는 `thead`가 되고, `td`는 `tbody`로 나뉘어 들어간다.
- `{:class="table-generate" data-target-id="table1"}`
    - 테이블 생성 대상을 `.table-generate`로 탐색하므로 이 값은 필수이다. `data-target-id`는 생성한 테이블을 입력할 html tag의 아이디를 넣어주면 된다.
- `<div id="table1"></div>`
    - 생성한 테이블을 주입해주는 곳이다. 위치는 리스트 위에 있으나 아래에 있으나 상관 없다.

## 이 기능을 왜 만들었나?

다음과 같이 마크다운 문법으로 작성한 표가 있다고 하자.

```
| signal  | red  | green |
|---------|------|-------|
| meaning | stop | go    |
```

이 표는 다음과 같이 빌드될 것이다.

| signal  | red  | green |
|---------|------|-------|
| meaning | stop | go    |

이렇게 작은 규모의 표는 작성하기 어렵지 않아 단순한 마크다운에 잘 어울린다.

그러나 다음과 같이 많은 양의 텍스트를 포함하고 있는 테이블은 마크다운에서 관리하기 쉽지 않다.

| Spring              | javax.inject.*        | javax.inject restrictions / comments                                                                                                                                                                                                                                                                                                                                                                                                    |
|---------------------|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| @Scope("singleton") | @Singleton            | The JSR-330 default scope is like Spring’s prototype. However, in order to keep it consistent with Spring’s general defaults, a JSR-330 bean declared in the Spring container is a singleton by default. In order to use a scope other than singleton, you should use Spring’s @Scope annotation. javax.inject also provides a @Scope annotation. Nevertheless, this one is only intended to be used for creating your own annotations. |
| @Qualifier          | @Qualifier / @Named   | javax.inject.Qualifier is just a meta-annotation for building custom qualifiers. Concrete String qualifiers (like Spring’s @Qualifier with a value) can be associated through javax.inject.Named.                                                                                                                                                                                                                                       |
| ObjectFactory       | Provider              | javax.inject.Provider is a direct alternative to Spring’s ObjectFactory, only with a shorter get() method name. It can also be used in combination with Spring’s @Autowired or with non-annotated constructors and setter methods.                                                                                                                                                                                                      |

위의 테이블을 마크다운으로 표현하면 다음과 같이 화면 너비를 넘어가게 된다.

```
| Spring              | javax.inject.*        | javax.inject restrictions / comments                                                                                                                                                                                                                                                                                                                                                                                                    |
|---------------------|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| @Component          | @Named / @ManagedBean | JSR-330 does not provide a composable model, only a way to identify named components.                                                                                                                                                                                                                                                                                                                                                   |
| @Scope("singleton") | @Singleton            | The JSR-330 default scope is like Spring’s prototype. However, in order to keep it consistent with Spring’s general defaults, a JSR-330 bean declared in the Spring container is a singleton by default. In order to use a scope other than singleton, you should use Spring’s @Scope annotation. javax.inject also provides a @Scope annotation. Nevertheless, this one is only intended to be used for creating your own annotations. |
| @Qualifier          | @Qualifier / @Named   | javax.inject.Qualifier is just a meta-annotation for building custom qualifiers. Concrete String qualifiers (like Spring’s @Qualifier with a value) can be associated through javax.inject.Named.                                                                                                                                                                                                                                       |
| ObjectFactory       | Provider              | javax.inject.Provider is a direct alternative to Spring’s ObjectFactory, only with a shorter get() method name. It can also be used in combination with Spring’s @Autowired or with non-annotated constructors and setter methods.                                                                                                                                                                                                      |
```

vimwiki가 테이블 테두리는 자동으로 맞춰주지만 line-wrap을 쓰고 있다면 화면을 넘어서는 줄은 아랫 줄로 이어져 표현되기 때문에 vimwiki와 상성이 좋지 않다.

```
| Spring              | javax.inject.*        | javax.inject restrictions / comments                                                                           
                                                                                                                                                               
                                                                                                                                                          |
|---------------------|-----------------------|----------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------------|
| @Component          | @Named / @ManagedBean | JSR-330 does not provide a composable model, only a way to identify named components.                          
                                                                                                                                                               
                                                                                                                                                          |
| @Scope("singleton") | @Singleton            | The JSR-330 default scope is like Spring’s prototype. However, in order to keep it consistent with Spring’s gen
eral defaults, a JSR-330 bean declared in the Spring container is a singleton by default. In order to use a scope other than singleton, you should use Spring’s
 @Scope annotation. javax.inject also provides a @Scope annotation. Nevertheless, this one is only intended to be used for creating your own annotations. |
| @Qualifier          | @Qualifier / @Named   | javax.inject.Qualifier is just a meta-annotation for building custom qualifiers. Concrete String qualifiers (li
ke Spring’s @Qualifier with a value) can be associated through javax.inject.Named.                                                                             
                                                                                                                                                          |
| ObjectFactory       | Provider              | javax.inject.Provider is a direct alternative to Spring’s ObjectFactory, only with a shorter get() method name.
 It can also be used in combination with Spring’s @Autowired or with non-annotated constructors and setter methods.                                             
                                                                                                                                                         |
```

이건 쓰기도 힘들고 읽기도 힘들다!
그렇다 해도 작은 규모의 테이블에서는 테두리를 자동으로 맞춰주는 기능이 편리하기 때문에 기능을 끄기도 싫다.

하지만 `<table></table>` 태그를 일일이 쓰기는 귀찮다.

그래서 이 기능을 만들었다.

이 기능을 사용하게 되면 위의 긴 텍스트가 포함된 테이블은 다음과 같이 간단하게 표현할 수 있다.

```html
<div id="table1"></div>
- th
    - Spring
    - javax.inject.*
    - javax.inject restrictions / comments
- tr
    - @Scope("singleton")
    - @Singleton
    - The JSR-330 default scope is like Spring’s prototype. However, in order to keep it consistent with Spring’s general defaults, a JSR-330 bean declared in the Spring container is a singleton by default. In order to use a scope other than singleton, you should use Spring’s @Scope annotation. javax.inject also provides a @Scope annotation. Nevertheless, this one is only intended to be used for creating your own annotations.
- tr
    - @Qualifier
    - @Qualifier / @Named
    - javax.inject.Qualifier is just a meta-annotation for building custom qualifiers. Concrete String qualifiers (like Spring’s @Qualifier with a value) can be associated through javax.inject.Named.
- tr
    - ObjectFactory
    - Provider
    - javax.inject.Provider is a direct alternative to Spring’s ObjectFactory, only with a shorter get() method name. It can also be used in combination with Spring’s @Autowired or with non-annotated constructors and setter methods.
{:class="table-generate" data-target-id="table1"}
```

## 구현

구현 코드는 [_include/createTable.html]( https://github.com/johngrib/johngrib.github.io/commit/21dbe0dee0a90d89f80d8888880dd3237a26379b )에 있다.

```html
<script async>
    ;(function() {
        // .table-generate 로 테이블을 생성할 소스를 얻어온다.
        const tableList = document.querySelectorAll('.table-generate');

        if (tableList == null) {
            return;
        }

        for (let i = 0; i < tableList.length; i++) {
            // 여러 개의 테이블을 생성할 수 있다.
            const ul = tableList[i];
            const draw = {
                th: '',
                td: ''
            };

            // 테이블 하나의 각 행 정보를 얻어와 tr 행을 만든다.
            const rows = ul.children;
            for (let j = 0; j < rows.length; j++) {
                const row = rows[j].children[0];
                const columns = row.children;
                const isHeader = /^th/.test(rows[j].innerHTML);
                const colTag = isHeader ? 'th' : 'td';

                let colData = '';
                for (let k = 0; k < columns.length; k++) {
                    const column = columns[k];
                    const content = column.innerHTML;
                    colData += `<${colTag}>${content}</${colTag}>`;
                }

                const trHtml = `<tr>${colData}</tr>`

                draw[colTag] += trHtml;
            }

            // table 태그를 만든다.
            const result = `
                <table>
                    <thead>${draw.th}</thead>
                    <tbody>${draw.td}</tbody>
                </table>`

            // 생성한 테이블을 주입할 곳을 찾는다.
            const targetId = ul.getAttribute('data-target-id');

            // 테이블을 주입한다.
            document.getElementById(targetId).innerHTML = result;

            // 소스 리스트를 삭제한다.
            ul.remove();
        }
    })();
</script>
```

## 이 기능을 사용하는 몇몇 페이지들

- [[/pattern/layered-architecture]]
- [[/spring/boot/starter]]
- [[/spring/cloud/release-train]]
- [[/spring/document/core/01-11-using-jsr-330-standard-annotations]]
- [[/spring/document/core/01-15-additional-capabilities-ac]]

