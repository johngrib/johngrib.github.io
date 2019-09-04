---
layout  : wiki
title   : AWS CodeDeploy
summary : AWS 배포 서비스
date    : 2019-09-04 21:30:27 +0900
updated : 2019-09-04 21:44:37 +0900
tag     : 
toc     : true
public  : true
parent  : aws
latex   : false
---
* TOC
{:toc}

>
AWS CodeDeploy는 개발자가 인스턴스에 대한 애플리케이션 배포를 자동화하고 필요에 따라 애플리케이션을 업데이트할 수 있는 배포 서비스입니다.

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

# Links

* [AWS CodeDeploy 설명서](https://docs.aws.amazon.com/ko_kr/codedeploy/index.html )
