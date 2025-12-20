---
layout  : wiki
title   : macOS man hier
summary : macOS 파일 시스템의 레이아웃에 대한 설명서
date    : 2024-09-29 16:29:16 +0900
updated : 2025-12-20 22:12:40 +0900
tag     : 
resource: 3E/3BD07E-C18B-416E-A500-69147884EEAC
toc     : true
public  : true
parent  : [[/cmd/macos]]
latex   : false
---
* TOC
{:toc}

## 명령

다음 명령을 입력하면 이 설명서를 볼 수 있다.

```bash
man hier
```

## Description

다음은 Description을 번역한 것이다. 번역은 Claude 3.5 Sonnet 이 했다.

- `/`: 파일시스템의 루트 디렉토리
- `/bin/`: 단일 사용자 및 다중 사용자 환경에 모두 필수적인 사용자 유틸리티
- `/dev/`: 블록 및 문자 장치 파일
    - `fd/`: 파일 디스크립터 파일; [[/cmd/dev/fd]]{fd(4)} 참조
- `/etc/`: 시스템 구성 파일 및 스크립트
- `/mach_kernel`: 커널 실행 파일 (부팅 시 메모리에 로드되는 운영 체제)
- `/sbin/`: 단일 사용자 및 다중 사용자 환경에 모두 필수적인 시스템 프로그램 및 관리 유틸리티
- `/tmp/`: 임시 파일
- `/usr/`: 대부분의 사용자 유틸리티 및 애플리케이션이 포함됨
    - `bin/`: 일반 유틸리티, 프로그래밍 도구 및 애플리케이션
    - `include/`: 표준 C 헤더 파일
        - `arpa/`: 인터넷 서비스 프로토콜용 C 헤더 파일
        - `hfs/`: HFS용 C 헤더 파일
        - `machine/`: 기계 특정 C 헤더 파일
        - `net/`: 기타 네트워크 C 헤더 파일
        - `netinet/`: 인터넷 표준 프로토콜용 C 헤더 파일; `inet(4)` 참조
        - `nfs/`: NFS(네트워크 파일 시스템)용 C 헤더 파일
        - `objc/`: Objective-C용 C 헤더 파일
        - `protocols/`: Berkeley 서비스 프로토콜용 C 헤더 파일
        - `sys/`: 시스템 C 헤더 파일 (커널 데이터 구조)
        - `ufs/`: UFS용 C 헤더 파일
    - `lib/`: 아카이브 라이브러리
    - `libexec/`: 시스템 데몬 & 시스템 유틸리티 (다른 프로그램에 의해 실행됨)
    - `local/`: 기본 운영 체제에 포함되지 않은 실행 파일, 라이브러리 등
    - `sbin/`: 시스템 데몬 & 시스템 유틸리티 (사용자가 실행)
    - `share/`: 아키텍처 독립적인 데이터 파일
        - `calendar/`: 다양한 미리 만들어진 캘린더 파일; `calendar(1)` 참조
        - `dict/`: 단어 목록; `look(1)` 참조
            - `web2`: Webster's 2nd International의 단어
            - `words`: 일반적인 단어
        - `man/`: 매뉴얼 페이지
        - `misc/`: 기타 시스템 전체 ascii 텍스트 파일
        - `mk/`: make용 템플릿; `make(1)` 참조
        - `skel/`: 새 계정을 위한 예시 . (점) 파일
        - `tabset/`: 다양한 터미널용 탭 설명 파일; termcap 파일에서 사용됨; `termcap(5)` 참조
        - `zoneinfo/`: 시간대 구성 정보; `tzfile(5)` 참조
- `/var/`: 다목적 로그, 임시, 일시적, 스풀 파일
    - `at/`: 시간 예약 명령 파일; `at(1)` 참조
    - `backups/`: 기타 백업 파일
    - `db/`: 기타 자동 생성된 시스템 특정 데이터베이스 파일
    - `log/`: 기타 시스템 로그 파일
    - `mail/`: 사용자 메일박스 파일
    - `run/`: 시스템 부팅 이후의 다양한 정보를 설명하는 시스템 정보 파일
        - `utmpx`: 현재 사용자의 데이터베이스; `utmpx(5)` 참조
    - `spool/`: 기타 프린터 및 메일 시스템 스풀링 디렉토리
        - `mqueue/`: 전송되지 않은 메일 대기열; `sendmail(8)` 참조
    - `tmp/`: 시스템 재부팅 간에 유지되는 임시 파일
    - `folders/`: 사용자별 임시 파일 및 캐시

