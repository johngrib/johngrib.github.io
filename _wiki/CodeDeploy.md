---
layout  : wiki
title   : AWS CodeDeploy
summary : AWS 배포 서비스
date    : 2019-09-04 21:30:27 +0900
updated : 2019-09-09 16:48:16 +0900
tag     : aws
toc     : true
public  : true
parent  : aws
latex   : false
---
* TOC
{:toc}

>
AWS CodeDeploy는 개발자가 인스턴스에 대한 애플리케이션 배포를 자동화하고 필요에 따라 애플리케이션을 업데이트할 수 있는 배포 서비스입니다.

# 서비스 시작과 정지

```sh
$ sudo service codedeploy-agent start
```

```sh
$ sudo service codedeploy-agent stop
```

# 문제 해결

## codedeploy-agent 재시작

* codedeploy-agent의 재시작이 필요하다면 다음과 같이 한다.

```sh
$ sudo service codedeploy-agent restart
```

## 로그 보기

* 잘 안되면 무조건 로그부터 확인하자.

```sh
tail -F /var/log/aws/codedeploy-agent/codedeploy-agent.log
```

## 사례 모음

### S3 버킷의 파일명을 잘못 지정된 경우

배포 환경은 다음과 같았다.

* github private repository.
* .travis.yml를 사용해 빌드하고 배포.
    * .travis가 빌드하고, 빌드 결과를 압축하여 S3로 업로드.
    * .travis가 S3로 업로드된 빌드 결과를 EC2로 전송.
    * EC2의 코드 디플로이 에이전트가 받아서 압축 풀고 배포.

로그를 보니 다음과 같은 내용이 있었다.

```text
2019-09-04 12:14:31 INFO  [codedeploy-agent(32583)]: [Aws::CodeDeployCommand::Cl
ient 200 0.038996 0 retries] put_host_command_complete(command_status:"Failed",d
iagnostics:{format:"JSON",payload:"{\"error_code\":5,\"script_name\":\"\",\"mess
age\":\"The specified key does not exist.\",\"log\":\"\"}"},host_command_identif
ier:"...")
```

여기서 주목해야 할 것은 payload의 message.

```text
"message\":\"The specified key does not exist.\"
```

여기에서 말하는 **key**가 뭔가 했더니 S3의 파일/디렉토리를 말하는 거였다.

.travis.yml의 `key` 설정을 바꾸는 것으로 해결하였다.

### CodeDeploy agent가 appspec.yml을 찾지 못하는 경우

삽질하다 codedeploy agent의 작업 디렉토리를 날려버리자 그 이후부터 다음과 같은 에러 메시지가 나오기 시작했다.

appspec.yml을 찾지 못하니 당연히 빌드 스크립트도 실행하지 못하고 계속 실패하는 상황.

```text
2019-09-04 13:27:00 INFO  [codedeploy-agent(685)]: [Aws::CodeDeployCommand::Clie
nt 200 0.015194 0 retries] put_host_command_complete(command_status:"Failed",dia
gnostics:{format:"JSON",payload:"{\"error_code\":5,\"script_name\":\"\",\"messag
e\":\"The CodeDeploy agent did not find an AppSpec file within the unpacked revi
sion directory at revision-relative path \\\"appspec.yml\\\". The revision was u
npacked to directory \\\"/opt/codedeploy-agent/deployment-root/cdc2049a-398d-444
0-b7dd-6ad66fa4332a/d-N9VOXSHIB/deployment-archive\\\", and the AppSpec file was
expected but not found at path \\\"/opt/codedeploy-agent/deployment-root/cdc2049
a-398d-4440-b7dd-6ad66fa4332a/d-N9VOXSHIB/deployment-archive/appspec.yml\\\".
```

로그를 읽어보면 다음 경로에 `appspec.yml`파일이 없는 것이 표면적인 이유이다.

```
/opt/codedeploy-agent/deployment-root/cdc2049a-398d-4440-b7dd-6ad66fa4332a/d-N9VOXSHIB/deployment-archive
```

따라서 경로를 만들어 주고, `appspec.yml` 파일을 복사해서 넣어줬더니 운 좋게도 문제가 해결되었다.

# Links

* [AWS CodeDeploy 설명서](https://docs.aws.amazon.com/ko_kr/codedeploy/index.html )
