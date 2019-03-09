---
layout  : wiki
title   : composer
summary : Dependency Manager for PHP
date    : 2019-01-13 22:21:50 +0900
updated : 2019-01-13 22:54:23 +0900
tag     : php command
toc     : true
public  : true
parent  : php
latex   : false
---
* TOC
{:toc}

# Installation
```sh
$ curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin/
$ sudo ln -s /usr/local/bin/composer.phar /usr/local/bin/composer
```

# Examples
## Create a composer.json
```sh
$ composer init
```

## Install Dependencies (with composer.json)
```sh
$ composer install
```

## Install new packages to the composer.json
```sh
$ composer require vendor/package       # component search => https://packagist.org/
$ composer require vendor/package:2.*   # 2.* version
```

## Update or Install dependency
```sh
$ composer update
$ composer update vendor/package                    # update one dependency
$ composer update vendor/package vendor/package2    # update two dependencies
$ composer update vendor/*                          # update all
```

## Show depends
```sh
$ composer depends vendor/package           # 의존 관계를 본다
$ composer depends vendor/package --tree    # 트리 구조로 본다
```

# Links
* <https://getcomposer.org/ >
* <https://packagist.org/ >
* [Command-line interface / Commands](https://getcomposer.org/doc/03-cli.md )
