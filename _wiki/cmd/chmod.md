---
layout  : wiki
title   : chmod 명령어
summary : 파일의 사용 권한을 변경한다
date    : 2023-06-26 23:14:55 +0900
updated : 2023-08-06 09:31:53 +0900
tag     : 
resource: FD/094CB3-958D-42A5-99FB-7C5C1E7DEECE
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## 파일 모드 {#file-mode}

파일 모드는 8진수로 표기한다.

- 4: read. 읽기 권한. `100`. `r`.
- 2: write. 쓰기 권한. `010`. `w`.
- 1: execute. 실행 권한. `001`. `x`.

위의 수를 조합해 읽기, 쓰기, 실행을 모두 표현해 사용하면 된다.

- 7: read, write, execute. `111`.
- 6: read, write. `110`.
- 5: read, execute. `101`.
- 3: write, execute. `011`.
- 0: none. `000`.

> <div id="file_mode_table"></div>
[^command-line-book-92]

- th
    - 속성
    - 파일
    - 디렉토리
- td
    - `r`
    - 파일 열기와 읽기를 허용한다.
    - 실행 속성이 설정되어 있으면 디렉토리의 내용물을 나열할 수 있게끔 허용한다.
- td
    - `w`
    - 이 속성은 파일 쓰기 또는 잘라내기는 허용하지만, 이름 변경이나 파일 삭제는 허용하지 않는다. 파일 삭제나 파일 이름 변경은 디렉토리 속성에 의해 결정된다.
    - 실행 속성이 설정되어 있으면 디렉토리 내의 파일들을 생성, 삭제, 이름 변경이 가능하도록 허용한다.
- td
    - `x`
    - 파일이 프로그램으로 처리되고 파일이 실행되도록 허용한다. 스크립트 언어에서 작성된 프로그램 파일들은 읽기 기능으로 설정되어 있어야만 실행 가능하다.
    - 디렉토리에 들어올 수 있도록 허용한다(예를 들어 `cd directory`와 같이).
{:class="table-generate" data-target-id="file_mode_table"}

## 니모닉 구문 사용

니모닉(mnemonic) 구문을 사용하면 퍼미션 비트를 모두 지정하는 게 아니라 일부만 수정할 수 있다.

8진수 표기법과 니모닉 구문이 함께 있는 이유는 초기 유닉스 시스템에서는 8진수 표기법만 가능했기 때문이다.

>
초기 유닉스 시스템에서는 이 명령을 사용하고자 비트의 8진수 표현법을 배워야 했지만 현재 버전에서는 8진수 표기와 니모닉<sup>mnemonic</sup> 구문을 모두 사용할 수 있다.
일반적으로 시스템 관리자에게는 8진수 구문이 더 편리하지만 사용 권한 비트를 절댓값으로 지정할 때만 사용될 수 있다.
니모닉 구문은 비트의 일부만 수정하고 나머지는 그대로 둘 수 있다.[^handbook-245]

## 소유자 표기

- `u`: user. 파일, 디렉토리의 소유자.
- `g`: group. 그룹 소유자.
- `o`: other. 기타 사용자.
- `a`: all. `u`, `g`, `o` 모두.
    - 소유자 표기를 생략할 경우 `a`로 간주한다.

## 변경 기호

- `+`: 권한 추가.
- `-`: 권한 제거.
- `=`: 지정한 퍼미션만 적용하고, 나머지 퍼미션은 제거.
- `,`: 변경 작업을 구별하는 구분자.

## Examples

숫자로 표현하는 방법.

```bash
 # 소유자만 읽기, 쓰기 가능. 그룹, 기타 사용자는 읽기만 가능.
chmod 644 filename

 # 소유자, 그룹, 기타 사용자에 대해 7(읽기, 쓰기, 실행) 부여.
chmod 777 filename

 # 소유자: 7(읽기, 쓰기, 실행) 부여. / 그룹, 기타 사용자: 4(읽기, 실행) 부여.
chmod 744 filename

 # directory의 모든 파일에 대해 소유자에게만 7(읽기, 쓰기, 실행) 부여.
chmod -R 700 directory

 # directory의 모든 파일에 대해 모든 사용자에게 7(읽기, 쓰기, 실행) 부여.
chmod -R 777 directory
```

변경 기호 문자로 표현하는 방법.

```bash
 # 모든 사용자에게 실행 권한 추가.
chmod +x filename
chmod a+x filename

 # 모든 사용자(a)에게 읽기 권한 추가.
chmod a+r filename
```

```bash
 # 소유자(u)에게 쓰기 권한 추가.
chmod u+w filename

 # 소유자(u)에게 실행 권한 추가.
chmod u+x filename

 # 소유자(u)의 실행 권한 제거.
chmod u-x filename

 # 소유자(u)에게 쓰기, 실행 권한 추가. directory 모든 파일에 대해 재귀적으로.
chmod -R u+wx directory
```

```bash
 # 그룹 사용자(g)의 실행 권한 제거.
chmod g-x filename
```

```bash
 # 기타 사용자의 읽기, 쓰기 권한 제거.
chmod o-rw filename
```

```bash
 # file1의 권한을 file2에 복사.
chmod --reference=file1 file2
```

```bash
 # 소유자(u)에게 실행 권한 추가.
 # 그룹(g), 기타 사용자(o)에게 읽기, 쓰기 권한은 부여하고, 실행 권한은 제거.
chmod u+x,go=rw filename
```

## 참고문헌

- 리눅스 커맨드라인 완벽 입문서 / 윌리엄 E. 샤츠 주니어 저 / 이종우, 정영신 공역 / 비제이퍼블릭(BJ퍼블릭) / 초판 1쇄 발행: 2013년 01월 11일 / 원제: The Linux Command Line
- 유닉스·리눅스 시스템 관리 핸드북 5/e / 에비 네메스, 가스 스나이더, 트렌트 헤인, 벤 웨일리, 댄 맥킨 저 외 2명 / 에이콘출판사 / 발행: 2022년 01월 03일 / 원제: UNIX and Linux System Administration Handbook, 5th Edition

## 주석

[^command-line-book-92]: 리눅스 커맨드라인 완벽 입문서. 9장. 92쪽.
[^handbook-245]: 유닉스·리눅스 시스템 관리 핸드북 5/e. 5장. 245쪽.
