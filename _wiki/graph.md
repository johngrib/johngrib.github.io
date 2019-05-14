---
layout  : wiki
title   : 그래프(Graph)
summary : 
date    : 2019-05-13 23:13:33 +0900
updated : 2019-05-14 23:10:14 +0900
tags    : 
toc     : true
public  : true
parent  : math
latex   : true
---
* TOC
{:toc}

# 정의, 용어 정리

> A graph $$G = (V,E)$$ consists of V, a nonempty set of vertices (or nodes) and E, a set of edges.
Each edge has either one or two vertices associated with it, called its endpoints. An edge is said to connect its endpoints.

* 그래프 $$G = (V, E)$$는 다음으로 구성된다.
    * $$V$$: 정점(vertices 또는 nodes)의 집합.
    * $$E$$: 모서리(간선)의 집합.
        * 각 모서리들은 두 개의 정점을 잇는다.

> The set of vertices V of a graph G may be infinite.
A graph with an infinite vertex set or an infinite number of edges is called an infinite graph,
and in comparison, a graph with a finite vertex set and a finite edge set is called a finite graph.

* 정점들의 집합 V는 무한할 수 있다.
    * 무한한 정점 집합을 갖는 그래프를 무한 그래프(infinite graph)라 한다.
    * 유한한 정점 집합을 갖는 그래프를 유한 그래프(finite graph)라 한다.

> A graph in which each edge connects two different vertices
and where no two edges connect the same pair of vertices is called a simple graph.

* 두 정점을 연결하는 간선이 한 개만 있는 그래프를 단순 그래프(simple graph)라 한다.

<svg height="80" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <ellipse stroke="black" stroke-width="1" fill="none" cx="140.5" cy="39.5" rx="30" ry="30"/>
    <text x="134.5" y="45.5" font-family="Times New Roman" font-size="20">2</text>
    <ellipse stroke="black" stroke-width="1" fill="none" cx="39.5" cy="39.5" rx="30" ry="30"/>
    <text x="33.5" y="45.5" font-family="Times New Roman" font-size="20">1</text>
    <polygon stroke="black" stroke-width="1" points="110.5,39.5 69.5,39.5"/>
</svg>


> Graphs that may have multiple edges connecting the same vertices are called multigraphs.

* 두 정점을 연결하는 간선이 여러 개 있는 그래프를 다중그래프(multi graph)라 한다.

<svg height="80" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <ellipse stroke="black" stroke-width="1" fill="none" cx="140.5" cy="39.5" rx="30" ry="30"/>
    <text x="134.5" y="45.5" font-family="Times New Roman" font-size="20">2</text>
    <ellipse stroke="black" stroke-width="1" fill="none" cx="39.5" cy="39.5" rx="30" ry="30"/>
    <text x="33.5" y="45.5" font-family="Times New Roman" font-size="20">1</text>
    <path stroke="black" stroke-width="1" fill="none" d="M 61.04,19.075 A 59.617,59.617 0 0 1 118.96,19.075"/>
    <path stroke="black" stroke-width="1" fill="none" d="M 115.559,55.769 A 71.182,71.182 0 0 1 64.441,55.769"/>
</svg>

> Sometimes a communications link connects a data center with itself, perhaps a feedback loop for diagnostic purposes.
Such a network is illustrated in Figure 3. To model this network we need to include edges that connect a vertex to itself.
Such edges are called loops, and sometimes we may even have more than one loop at a vertex.
Graphs that may include loops, and possibly multiple edges connecting the same pair of vertices or a vertex to itself, are sometimes called pseudographs.

* 자기 자신과 연결하는 간선을 갖는 정점이 있다.
    * 이런 간선을 루프(loop)라고 한다.
    * 루프와 다중 간선을 갖는 그래프를 의사 그래프(pseudographs)라 부른다.

<svg height="80" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <ellipse stroke="black" stroke-width="1" fill="none" cx="39.5" cy="39.5" rx="30" ry="30"/>
    <text x="33.5" y="45.5" font-family="Times New Roman" font-size="20">1</text>
    <path stroke="black" stroke-width="1" fill="none" d="M 66.297,26.275 A 22.5,22.5 0 1 1 66.297,52.725"/>
</svg>

> A directed graph (or digraph) $$(V,E)$$ consists of a nonempty set of vertices V and a set of directed edges (or arcs) E.
Each directed edge is associated with an ordered pair of vertices.
The directed edge associated with the ordered pair $$(u, v)$$ is said to start at u and end at v.

* 방향성 그래프(directed graph, digraph) $$(V,E)$$는 다음으로 구성된다.
    * 공집합이 아닌 정점들의 집합 V.
    * 방향이 있는 간선(directed edges 또는 arcs)들의 집합 E.
        * 방향간선은 정점들의 순서쌍이다.
        * 순서쌍 $$(u, v)$$는 $$u$$에서 출발해서 $$v$$에서 끝난다.
        * 화살표로 표기하면 알아보기 쉽다.

| type                                      | 방향성 허용 | 비방향성 허용 | 다중 간선 허용 | 루프 허용 |
| -------------------                       | ----------- | --------      | -----------    | ------    |
| 단순 그래프(simple graph)                 | X           | O             | X              | X         |
| 멀티 그래프(multigraph)                   | X           | O             | O              | X         |
| 의사그래프(pseudograph)                   | X           | O             | O              | O         |
| 단순 방향성 그래프(simple directed graph) | O           | X             | X              | X         |
| 방향성 다중 그래프(directid multigraph)   | O           | X             | O              | O         |
| 혼합그래프(Mixed graph)                   | O           | O             | O              | O         |

> Two vertices u and v in an undirected graph G are called adjacent(or neighbors) in G if u and v are endpoints of an edge e of G.
Such an edge e is called incident with the vertices u and v and e is said to connect u and v.

* 비방향성 그래프에서
    * 하나의 간선 양쪽의 두 정점을 "인접(adjacent)" 또는 "이웃(neighbors)"이라 한다.
    * 이웃하는 두 정점을 연결하는 간선을 해당 정점에 붙어있다(incident)고도 하고, 두 정점을 연결한다(connect)고도 한다.
    * 연결된 두 정점을 끝점(endpoints)이라 부른다.

> The set of all neighbors of a vertex v of G = (V,E),
denoted by N(v), is called the neighborhood of v.
If A is a subset of V,
we denote by N(A) the set of all vertices in G that are adjacent to at least one vertex in A.
So, $$N(A) = \bigcup_{ \nu ∈ A } N(\nu)$$

* 한 정점 $$\nu$$의 모든 이웃의 집합을 $$N(\nu)$$로 표기하고, 이를 $$\nu$$의 이웃(neighborhood of $$\nu$$)이라 한다.
* $$N(A)$$는 $$A$$ 집합의 한 원소에 인접한 모든 정점들의 집합이다.
    * 그러므로 $$N(A) = \bigcup_{ \nu ∈ A } N(\nu)$$ 이다.

> The degree of a vertex in an undirected graph is the number of edges incident with it, except that a loop at a vertex contributes twice to the degree of that vertex. The degree of the vertex v is denoted by $$deg(v)$$.

* 정점 하나에 붙어 있는 간선의 수를 정점의 차수(degree)라 부른다.
    * loop가 있으면 차수에 2를 더한다.
    * 정점 $$\nu$$의 차수는 $$deg(\nu)$$로 표기한다.
* 차수가 0 인 정점은 연결된 간선이 하나도 없으며, "고립되었다(isolated)"고 표현한다.
* 차수가 1 인 정점은 연결된 간선이 하나뿐이며, "늘어졌다(pendant: 목걸이)"고 표현한다.

> THE HANDSHAKING THEOREM.  
Let $$G = (V , E)$$ be an undirected graph with m edges. Then  
$$2m = \sum_{\nu ∈ V} deg(\nu)$$  
(Note that this applies even if multiple edges and loops are present.)

* 악수 정리(Handshakiing Theorem)
    * 그래프 $$G=(V,E)$$가 m 개의 모서리를 갖는 비방향성 그래프라면,
        * $$2m = \sum_{\nu ∈ V} deg(\nu)$$.
        * 이 정리는 다중 간선, 루프가 있을 때에도 성립한다.

악수 정리의 원리는 단순하다. 삼각형을 생각해보자. 삼각형의 모든 정점은 2개의 간선을 갖는다.

그렇다면 각 정점의 차수를 모두 더하면 $$2m = 2 + 2 + 2 = 6$$이 될 것이다.

그러므로 $$m=3$$이다. 당연히 삼각형의 변은 3개.

> An undirected graph has an even number of vertices of odd degree.

* 비방향성 그래프에는 홀수 차수를 가진 정점들이 짝수 개 있다.

이는 다음과 같이 증명할 수 있다.

* $$V_1 = $$ 짝수 차수를 가진 정점들의 집합
* $$V_2 = $$ 홀수 차수를 가진 정점들의 집합

그렇다면 악수 정리를 사용해 식을 다음과 같이 꾸밀 수 있다.

$$
\begin{align}
2m & = \sum_{ \nu ∈ V } deg(\nu) \\
    & = \sum_{ \nu ∈ V_1 } deg(\nu) + \sum_{ \nu ∈ V_2 } deg(\nu)\\
\end{align}
$$

그런데 $$\sum_{ \nu ∈ V_1 } deg(\nu)$$의 $$deg(\nu)$$는 짝수이므로, $$\sum_{ \nu ∈ V_1 } deg(\nu)$$도 짝수이다.

그리고 $$2m$$도 짝수이므로 다음과 같은 모양이 된다.

$$ 짝수 = 짝수 + \sum_{ \nu ∈ V_2 } deg(\nu) $$

그러므로 $$\sum_{ \nu ∈ V_2 } deg(\nu)$$도 짝수가 된다.

그런데 $$V_2$$는 홀수 차수를 가진 정점들의 집합이므로 $$deg(\nu)$$는 홀수다.

따라서 $$\sum_{ \nu ∈ V_2 } \text{홀수}$$인 셈이므로, $$V_2$$의 원소의 개수는 짝수여야 한다.

그러므로 홀수 차수의 정점들의 수는 짝수 개이다.

> When $$(u, v)$$ is an edge of the graph G with directed edges,
u is said to be adjacent to v and v is said to be adjacent from u.
The vertex u is called the initial vertex of $$(u, v)$$,
and v is called the terminal or end vertex of $$(u, v)$$.
The initial vertex and terminal vertex of a loop are the same.

* 방향성 그래프의 간선 $$(u, v)$$에 대하여
    * 간선 u 는 $$\nu$$에 인접한다고 한다.
    * 정점 $$\nu$$는 u 로부터 인접된다고 한다.
    * 정점 u 는 시작 정점이라 부른다.
    * 정점 $$\nu$$는 종료 또는 끝 정점이라 부른다.
    * 루프의 경우, 시작 정점과 끝 정점이 같다.

> In a graph with directed edges the in-degree of a vertex v,
denoted by $$deg^−(v)$$, is the number of edges with v as their terminal vertex.
The out-degree of v, denoted by $$deg^+(v)$$, is the number of edges with v as their initial vertex.
(Note that a loop at a vertex contributes 1 to both the in-degree and the out-degree of this vertex.)

* 방향성 그래프에서 정점 $$\nu$$의 입력차수(in-degree)는 $$deg^-(\nu)$$로 표기한다.
* 방향성 그래프에서 정점 $$\nu$$의 출력차수(in-degree)는 $$deg^+(\nu)$$로 표기한다.
* 루프가 있으면 정점의 입력차수와 출력차수에 각각 1씩 추가한다.


# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등 저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일


