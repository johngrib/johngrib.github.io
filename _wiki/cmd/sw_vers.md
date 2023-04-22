---
layout  : wiki
title   : sw_vers 명령어
summary : Mac OS X 의 운영체제 버전 정보를 출력한다
date    : 2020-01-03 22:21:25 +0900
updated : 2023-04-22 16:05:16 +0900
tag     : bash command
resource: 06/41D140-153C-4E42-BAEB-EDB4E91CF395
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

```sh
$ # 실행하면 다음과 같은 내용이 출력된다
$ sw_vers
ProductName:    Mac OS X
ProductVersion: 10.15.2
BuildVersion:   19C57
```

```sh
 # productName 만 출력한다
sw_vers -productName

 # productVersion 만 출력한다
sw_vers -productVersion

 # buildVersion 만 출력한다
sw_vers -buildVersion
```

## SystemVersion.plist 파일

이 명령으로 확인할 수 있는 내용은 다음 파일에 저장되어 있다.

```
/System/Library/CoreServices/SystemVersion.plist
```

이 파일은 20줄 정도의 간단하고 짧은 XML이다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>BuildID</key>
	<string>9D9BF6C9-....-....-....-............</string>
	<key>ProductBuildVersion</key>
	<string>22E261</string>
	<key>ProductCopyright</key>
	<string>1983-2023 Apple Inc.</string>
	<key>ProductName</key>
	<string>macOS</string>
	<key>ProductUserVisibleVersion</key>
	<string>13.3.1</string>
	<key>ProductVersion</key>
	<string>13.3.1</string>
	<key>iOSSupportVersion</key>
	<string>16.4</string>
</dict>
</plist>
```

