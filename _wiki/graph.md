---
layout  : wiki
title   : 그래프(Graph)
summary : 
date    : 2019-05-13 23:13:33 +0900
updated : 2019-06-04 21:22:08 +0900
tag     : math
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

> Let $$G = (V , E)$$ be a graph with directed edges. The  
$$
\sum_{ \nu ∈ V } deg^{-}(\nu) = \sum_{ \nu ∈ V } deg^{+}(\nu) = \vert E \vert
$$

* 방향성 그래프에서 입력차수의 총합과 출력차수의 총합, 그리고 모든 간선의 수는 같다.

> A complete graph on n vertices, denoted by $$K_n$$,
is a simple graph that contains exactly one edge between each pair of distinct vertices.

* 완전 그래프(Complete graph)는 각 정점들이 하나의 간선으로 연결된 단순 그래프이다.
* 모든 정점이 다른 나머지 정점들과 다 연결이 되어 있다.

![image](https://user-images.githubusercontent.com/1855714/57778513-2d78ca00-775f-11e9-81b4-e5603fd3d0ab.png)

> A cycle $$C_n, n ≥ 3$$, consists of n vertices $$\{v_1, v_2\}, \{v_2, v_3\}, ... , \{v_{n−1}, v_n\}$$, and $$\{v_n, v_1\}$$.

* 사이클(Cycle)은 다음과 같이 $$v_i, v_{i+1}$$이 연결된 형태의 그래프이다.
* 바퀴 모양이다.

![image](https://user-images.githubusercontent.com/1855714/57778754-ab3cd580-775f-11e9-8207-610eb5feb079.png)

> We obtain a wheel $$W_n$$ when we add an additional vertex to a cycle $$C_n$$, for $$n ≥ 3$$, and connect this new vertex to each of the n vertices in $$C_n$$, by new edges.

* 휠(Wheel)은 한 정점이 다른 모든 정점과 연결되어 있다.
* 가운데에 축이 있는 바퀴 모양이다.

![image](https://user-images.githubusercontent.com/1855714/57779652-76ca1900-7761-11e9-93f4-65da6108ed81.png)

> An n-dimensional hypercube, or n-cube, denoted by $$Q_n$$, is a graph that has vertices representing the $$2^n$$ bit strings of length n. Two vertices are adjacent if and only if the bit strings that they represent differ in exactly one bit position.

* n 큐브(n-Cubes)는 길이 n의 $$2^n$$개의 비트 스트링을 나타내는 정점들을 갖는 그래프.
    * 두 정점이 서로 인접해 있다면 이 두 정점의 비트 스트링은 1개의 비트만 다르다.

![image](https://user-images.githubusercontent.com/1855714/57780075-741bf380-7762-11e9-9304-ba6cebe978bb.png)

> Bipartite Graphs.  
A simple graph G is called bipartite if its vertex set V can be partitioned into two disjoint sets $$V_1$$ and $$V_2$$ such that every edge in the graph connects a vertex in $$V_1$$ and a vertex in $$V_2$$ (so that no edge in G connects either two vertices in $$V_1$$ or two vertices in $$V_2$$). When this condition holds, we call the pair $$(V_1, V_2)$$ a bipartition of the vertex set V of G.

* 단순 그래프에서 정점들의 집합 V가 교집합이 없는 집합 $$V_1$$, $$V_2$$로 나뉘고, 그래프의 모든 간선이 $$V_1$$의 한 정점과 $$V_2$$의 한 정점을 연결한다면, 이 그래프를 이분되었다(bipartited)고 한다.
    * 단, $$V_1$$의 정점과 $$V_1$$의 정점을 연결하는 간선은 없다.
    * 단, $$V_2$$의 정점과 $$V_2$$의 정점을 연결하는 간선은 없다.

> A simple graph is bipartite if and only if it is possible to assign one of two different colors to each vertex of the graph so that no two adjacent vertices are assigned the same color.

* 이분 그래프의 필요충분조건
    * 두 인접한 정점들이 같은 색깔을 갖지 않도록 두 가지 색깔로 그래프의 모든 정점을 색칠할 수 있어야 한다.

> A complete bipartite graph $$K_{m,n}$$ is a graph that has its vertex set partitioned into two subsets of m and n vertices, respectively with an edge between two vertices if and only if one vertex is in the first subset and the other vertex is in the second subset.

* 완전 이분 그래프 $$K_{m,n}$$
    * 정점의 집합이 m개, n개의 정점을 갖는 두 부분집합으로 나뉠 수 있는 그래프.

> HALL’S MARRIAGE THEOREM.  
The bipartite graph $$G = (V , E)$$ with bipartition $$(V_1,V_2)$$ has a complete matching from $$V_1$$ to $$V_2$$ if and only if $$|N(A)| ≥ |A|$$ for all subsets A of $$V_1$$.

* 이분 그래프가 $$V_1$$에서 $$V_2$$로 완전 매칭일 필요충분조건은 다음과 같다.
    * $$V_1$$의 모든 부분집합 A 에 대해 $$\vert N(A) \vert ≥ \vert A \vert$$ 이다.
        * 참고: `N(A)`는 A 집합의 한 원소에 인접한 모든 정점들의 집합이다.
        * 참고: `|A|`는 집합 A의 원소의 개수.

> A matching M in a simple graph $$G = (V,E)$$ is a subset of the set E of edges of the graph such that no two edges are incident with the same vertex.
In other words, a matching is a subset of edges such that if {s,t} and {u,v} are distinct edges of the matching, then s, t, u, and v are distinct. A vertex that is the endpoint of an edge of a matching M is said to be matched in M; otherwise it is said to be unmatched.

>  A maximum matching is a matching with the largest number of edges.

> We say that a matching M in a bipartite graph $$G = (V,E)$$ with bipartition $$(V_1,V_2)$$ is a complete matching from $$V_1$$ to $$V_2$$ if every vertex in $$V_1$$ is the endpoint of an edge in the matching, or equivalently, if $$\vert M \vert = \vert V1 \vert$$.

* Matching M은 그래프에서 연결된 정점을 공유하지 않는 간선들의 집합이다.
    * 매칭 간선 $${s, t}$$와 간선 $${u, v}$$가 있을 때, $$s, t, u, v$$ 는 서로 다른 정점이다.
* 최대 매칭(Maximum matching).
    * 간선의 수가 최대인 매칭.
* 완전 매칭(complete matching).
    * $$V_1$$의 모든 정점들이 매칭되었거나, $$\vert M \vert = \vert V_1 \vert$$ 인 경우를 $$V_1$$에서 $$V_2$$로의 완전 매칭이라 한다.

> A subgraph of a graph $$G = (V,E)$$ is a graph $$H = (W,F)$$, where $$W ⊆ V$$ and $$F ⊆ E$$.
A subgraph H of G is a proper subgraph of G if $$H \ne G$$.

* 그래프 $$G=(V,E)$$의 부 그래프(subgraph)는 $$H = (W,F)$$.
    * $$W ⊆ V$$.
    * $$F ⊆ E$$.
* $$H \ne G$$ 이면 진 부그래프(proper subgraph)이다.

> Let $$G = (V , E)$$ be a simple graph.
The subgraph induced by a subset W of the vertex set V is the graph $$(W, F)$$,
where the edge set F contains an edge in E if and only if both endpoints of this edge are in W .

* 유도된 그래프(subgraph induced): 정점의 집합 V 의 부분집합 W 를 통해 유도된 부 그래프.

> The union of two simple graphs $$G_1 = (V_1, E_1)$$ and $$G_2 = (V_2, E_2)$$ is the simple graph with vertexset$$V_1 ∪ V_2$$ and edge set $$E_1 ∪ E_2$$. The union of $$G_1$$ and $$G_2$$ is denoted by $$G_1 ∪ G_2$$.

* 그래프 합집합
    * 두 그래프의 합집합은 두 그래프의 정점들의 집합의 합집합과 두 그래프의 간선들의 합집합을 갖는 단순 그래프이다.

# 그래프 표현 방법

## 인접 리스트(Adjacency Lists)

* 각 정점별로 인접한 정점을 나열하는 방법이다.

<svg id="test" width="120" height="100" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="5" cy="35" rx="3" ry="3" fill="black"></ellipse>
    <ellipse cx="50" cy="14" rx="3" ry="3" fill="black"></ellipse>
    <ellipse cx="100" cy="35" rx="3" ry="3" fill="black"></ellipse>
    <ellipse cx="80" cy="70" rx="3" ry="3" fill="black"></ellipse>
    <ellipse cx="20" cy="70" rx="3" ry="3" fill="black"></ellipse>
    <polygon node="a,b" stroke-width="1" stroke="black" points=" 5,35 50,14"></polygon>
    <polygon node="a,c" stroke-width="1" stroke="black" points=" 5,35 100,35"></polygon>
    <polygon node="a,e" stroke-width="1" stroke="black" points=" 5,35 20,70"></polygon>
    <polygon node="c,e" stroke-width="1" stroke="black" points=" 100,35 20,70"></polygon>
    <polygon node="c,d" stroke-width="1" stroke="black" points=" 100,35 80,70"></polygon>
    <polygon node="d,e" stroke-width="1" stroke="black" points=" 80,70 20,70"></polygon>
    <text ref="a" font-size="10" x="5" y="29" text="a">a</text>
    <text ref="b" font-size="10" x="50" y="8" text="b">b</text>
    <text ref="c" font-size="10" x="100" y="29" text="c">c</text>
    <text ref="d" font-size="10" x="80" y="64" text="d">d</text>
    <text ref="e" font-size="10" x="20" y="64" text="e">e</text>
</svg>

| vertex | adjacent vertices |
|--------|-------------------|
| a      | b,c,e             |
| b      | a                 |
| c      | a,d,e             |
| d      | c,e               |
| e      | a,c,d             |

* 방향성 그래프의 경우, 시작 정점별로 종료 정점들을 나열한다.

## 인접 행렬(Adjacency Matrices)

$$
a_{ij} =
\begin{cases}
1 & \text{if {$v_i,v_j$}is an edge of G} \\
0 & \text{otherwise}
\end{cases}
$$

만약 다음과 같은 그래프가 있다면...

<svg id="test" width="120" height="70" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="10" cy="15" rx="3" ry="3" fill="black"></ellipse>
    <ellipse cx="100" cy="15" rx="3" ry="3" fill="black"></ellipse>
    <ellipse cx="10" cy="55" rx="3" ry="3" fill="black"></ellipse>
    <ellipse cx="100" cy="55" rx="3" ry="3" fill="black"></ellipse>
    <polygon node="a,b" stroke-width="1" stroke="black" points=" 10,15 100,15"></polygon>
    <polygon node="a,c" stroke-width="1" stroke="black" points=" 10,15 10,55"></polygon>
    <polygon node="a,d" stroke-width="1" stroke="black" points=" 10,15 100,55"></polygon>
    <polygon node="b,c" stroke-width="1" stroke="black" points=" 100,15 10,55"></polygon>
    <text ref="a" font-size="10" x="10" y="9" text="a">a</text>
    <text ref="b" font-size="10" x="100" y="9" text="b">b</text>
    <text ref="c" font-size="10" x="10" y="49" text="c">c</text>
    <text ref="d" font-size="10" x="100" y="49" text="d">d</text>
</svg>

다음과 같이 표로 나타낼 수 있다.

|   | a    | b    | c    | d    |
| a |      | 연결 | 연결 | 연결 |
| b | 연결 |      | 연결 |      |
| c | 연결 | 연결 |      |      |
| d | 연결 |      |      |      |

이 표를 그대로 0, 1을 사용한 행렬로 나타내면 된다.

$$
\begin{bmatrix}
0 & 1 & 1 & 1 \\
1 & 0 & 1 & 0 \\
1 & 1 & 0 & 0 \\
1 & 0 & 0 & 0 \\
\end{bmatrix}
$$

## 결합행렬(Incidence Matrices)

정점과 간선의 연결을 표시하는 방법이다.

$$
m_{ij} =
\begin{cases}
1 & \text{when edge $e_j$ is incident with $\nu_i$} \\
0 & \text{otherwise}
\end{cases}
$$

<svg id="test" width="120" height="90" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="10" cy="15" rx="3" ry="3" fill="black"></ellipse>
    <ellipse cx="50" cy="15" rx="3" ry="3" fill="black"></ellipse>
    <ellipse cx="100" cy="15" rx="3" ry="3" fill="black"></ellipse>
    <ellipse cx="30" cy="65" rx="3" ry="3" fill="black"></ellipse>
    <ellipse cx="75" cy="65" rx="3" ry="3" fill="black"></ellipse>
    <polygon node="v1,v4" stroke-width="1" stroke="black" points=" 10,15 30,65"></polygon>
    <polygon node="v1,v5" stroke-width="1" stroke="black" points=" 10,15 75,65"></polygon>
    <polygon node="v2,v3" stroke-width="1" stroke="black" points=" 50,15 100,15"></polygon>
    <polygon node="v2,v4" stroke-width="1" stroke="black" points=" 50,15 30,65"></polygon>
    <polygon node="v2,v5" stroke-width="1" stroke="black" points=" 50,15 75,65"></polygon>
    <polygon node="v3,v5" stroke-width="1" stroke="black" points=" 100,15 75,65"></polygon>
    <text ref="v1" font-size="10" x="10" y="9" text="v1">v1</text>
    <text ref="v2" font-size="10" x="50" y="9" text="v2">v2</text>
    <text ref="v3" font-size="10" x="100" y="9" text="v3">v3</text>
    <text ref="v4" font-size="10" x="30" y="74" text="v4">v4</text>
    <text ref="v5" font-size="10" x="75" y="74" text="v5">v5</text>
    <text ref="undefined" font-size="10" x="6" y="40" text="e1">e1</text>
    <text ref="undefined" font-size="10" x="53" y="58" text="e2">e2</text>
    <text ref="undefined" font-size="10" x="35" y="27" text="e3">e3</text>
    <text ref="undefined" font-size="10" x="60" y="40" text="e4">e4</text>
    <text ref="undefined" font-size="10" x="90" y="40" text="e5">e5</text>
    <text ref="undefined" font-size="10" x="75" y="12" text="e6">e6</text>
</svg>

$$
\begin{matrix}
    & \begin{matrix} e_1 & e_2 & e_3 & e_4 & e_5 & e_6 \end{matrix} \\
\begin{matrix} \nu_1 \\ \nu_2 \\ \nu_3 \\ \nu_4 \\ \nu_5 \end{matrix}
    &
  \begin{bmatrix}
  1 \ & 1 \ & 0 \ & 0 \ & 0 \ & 0 \\
  0 \ & 0 \ & 1 \ & 1 \ & 0 \ & 1 \\
  0 \ & 0 \ & 0 \ & 0 \ & 1 \ & 1 \\
  1 \ & 0 \ & 1 \ & 0 \ & 0 \ & 0 \\
  0 \ & 1 \ & 0 \ & 1 \ & 1 \ & 0 \\
  \end{bmatrix}
\end{matrix}
$$

# 동형 그래프(Isomorphism of Graphs)

>
The simple graphs $$G_1 = (V_1, E_1)$$ and $$G_2 = (V_2, E_2)$$ are isomorphic if there exists a one-to-one and onto function $$f$$ from $$V_1$$ to $$V_2$$ with the property that a and b are adjacent in $$G_1$$ if and only if $$f(a)$$ and $$f(b)$$ are adjacent in $$G_2$$, for all a and b in $$V_1$$. Such a function $$f$$ is called an isomorphism$$^*$$. Two simple graphs that are not isomorphic are called nonisomorphic.

* 두 단순 그래프 $$G_1 = (V_1, E_1)$$와 $$G_2 = (V_2, E_2)$$.
    * $$V_1$$ 에서 $$V_2$$로의 함수 f 가 전단사 함수(일대일 대응)이고, $$V_1$$의 모든 a,b에 대해 a,b가 $$G_1$$에서 인접한다면 $$f(a), f(b)$$는 $$G_2$$에서 인접하고 그 역도 성립하면 함수 f 를 동형(isomorphic)이라 부른다.
    * 동형이 아닌 두 산순 그래프를 비동형(nonisomorphic)이라 부른다.

* isomorphism: iso(equal, 같다), morphe(form, 형태).


# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등 저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일


