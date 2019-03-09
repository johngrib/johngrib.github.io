---
layout  : wiki
title   : Vagrant와 Docker에 CentOS, Ubuntu 설치하기
summary : 간단하게 가상 환경을 꾸며보자
date    : 2018-09-15 09:26:59 +0900
updated : 2018-09-16 22:05:58 +0900
tag     : vagrant docker centos ubuntu vm devops
toc     : true
public  : true
parent  : til
latex   : false
---
* TOC
{:toc}

# 환경

* MacOS

# Virtual Box 설치

* Vagrant나 Docker를 사용하려면 Virtual Box를 일단 설치해야 한다.
    * 다른 선택지도 있지만 여기선 복잡하게 생각하기 싫다.
    * 익숙하고 공짜인 버추얼 박스 설치.

<https://www.virtualbox.org/wiki/Downloads >

# vagrant 설치

Vagrant 홈페이지에 들어가 다운받아 설치한다.

<https://www.vagrantup.com/downloads.html >

```sh
$ # home 경로부터 만들고 시작하자
$ mkdir vagrant-home
```

## CentOS 설치

* 새로운 환경을 설치할 때에는 vagrant cloud를 참고하자.
    * <https://app.vagrantup.com/centos/boxes/7 >

```sh
$ # centos 경로를 먼저 만들어 주자
$ cd ~/vagrant-home
$ mkdir centos && cd centos

$ # vagrant로 centos 다운로드 및 설치
$ vagrant init centos/7

$ # 가동
$ vagrant up

$ # ssh로 centos 에 접속해보고 싶다면 ssh 옵션을 주면 된다.
$ vagrant ssh

$ # 종료는 halt
$ vagrant halt
```

* `config.vm.box` 파일을 열어 보면 `config.vm.box = "centos/7"` 이라는 설정이 추가된 것을 볼 수 있다.
    * `vagrant init` 명령어가 `config.vm.box`에 이 설정을 추가해주는 것으로 보인다.

## Ubuntu 설치

* Ubuntu도 CentOS와 똑같은 방법으로 설치할 수 있다.

```sh
$ cd ~/vagrant-home
$ mkdir ubuntu && cd ubuntu

$ # vagrant로 ubuntu 다운로드 및 설치
$ vagrant init ubuntu/trusty64

$ # 가동
$ vagrant up

$ # ssh 접속
$ vagrant ssh

$ # 종료는 halt
$ vagrant halt
```

# Docker 설치

* docker, docker-toolbox를 먼저 설치하자.
    * <https://www.docker.com/get-started >
    * <https://docs.docker.com/toolbox/toolbox_install_mac/ >

## Ubuntu 설치

```sh
$ # search 로 docker hub에서 이미지를 검색할 수 있다
$ docker search ubuntu

$ # 마음에 드는 검색 결과가 있다면 다음과 같이 받을 수 있다
$ docker pull ubuntu

$ # 사실 그냥 run 하면 pull 도 하고 실행도 해 준다(시킨 일이 없기 때문에 컨테이너는 바로 종료된다)
$ docker run ubuntu:16.04

$ # 바로 종료시키지 않고 bash 셸을 보고 싶다면
$ docker run -it ubuntu:16.04 /bin/bash
```

## CentOS 설치

```sh
$ # ubuntu와 똑같이 하면 된다
$ docker run centos

$ docker run -it centos /bin/bash
```

# Links

* <https://www.virtualbox.org/wiki/Downloads >
* <https://www.vagrantup.com/downloads.html >
* <https://app.vagrantup.com/centos/boxes/7 >
* <https://www.docker.com/get-started >
* <https://docs.docker.com/toolbox/toolbox_install_mac/ >
