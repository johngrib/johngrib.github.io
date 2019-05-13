---
layout  : wiki
title   : 그래프(Graph)
summary : 
date    : 2019-05-13 23:13:33 +0900
updated : 2019-05-13 23:59:17 +0900
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


# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등 저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일


