---
layout  : wiki
title   : zip
summary : zip은 압축, unzip은 압축 해제
date    : 2023-06-30 23:42:16 +0900
updated : 2023-07-26 23:08:44 +0900
tag     : 
resource: A7/A80395-1328-4A7A-AE86-CD7270C17BCF
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

### 파일 1개 압축하기

```bash
 # test.png 파일을 압축한 test.png.zip 파일을 만든다.
zip test.png.zip test.png
```

### 여러 파일 압축하기

```bash
 # test0.png, test1.png, test2.png 파일을 압축한 test.zip 파일을 만든다.
zip test.zip test0.png test1.png test2.png
```

### 디렉토리 압축하기

`-r` 옵션을 주면 된다.

```bash
 # directory를 압축한 directory.zip 파일을 만든다.
zip -r directory.zip directory
```

### 압축 풀기

```bash
 # 현재 경로에 압축 풀기 (각 파일의 경로 보존)
unzip files.zip

 # 특정 경로에 압축 풀기
unzip files.zip -d ./directory
```

`-j`는 압축 파일 내의 파일들을 모두 같은 경로에 풀어준다.
경로를 보존하지 않고 모든 파일을 한 경로에 풀어주므로 같은 이름의 파일이 있다면 대화형으로 덮어쓸지 물어보게 된다.

자주 쓰는 옵션은 아니지만, 압축된 파일 내의 디렉토리 구조가 불필요하다면 매우 유용한 옵션.

```bash
 # 현재 경로에 압축 풀기 (각 파일의 경로 보존하지 않음)
unzip -j files.zip

 # result 디렉토리를 생성하고, result에 압축 풀기 (각 파일의 경로 보존하지 않음)
unzip -j files.zip -d result

 # 이렇게 해도 똑같다.
unzip -j files.zip -d ./result
```

### 압축파일에 포함된 파일 목록 보기

```bash
unzip -l files.zip
```

### 압축파일에 포함된 파일들 중 특정 파일만 압축 풀기

```bash
 # files.zip에 포함된 directory/file.txt 파일만 압축 풀기
unzip files.zip directory/file.txt

 # files.zip에 포함된 모든 *.c, *.h 파일만 압축 풀기
unzip files.zip "*.[ch]"

 # files.zip에 포함된 파일들 중 이름이 s 로 끝나는 모든 xml 파일만 압축 풀기
unzip files.zip '*s.xml'
```

## 압축파일 에러 검사

```
unzip -tq files.zip
```

## 튜토리얼

### 하위 경로의 모든 xml 파일만 선택해 압축하고, 압축 풀기 {#select-and-zip-xml-files}

다음 명령은 현재 디렉토리 하위의 모든 xml 파일을 xml-files.zip 파일로 압축한다.

```bash
$ find . -name '*.xml' | xargs zip xml-files.zip

  adding: build/resources/main/META-INF/plugin.xml (deflated 54%)
  adding: build/patchedPluginXmlFiles/plugin.xml (deflated 54%)
  adding: build/idea-sandbox/config/options/updates.xml (deflated 24%)
  adding: .idea/markdown.xml (deflated 43%)
  adding: .idea/uiDesigner.xml (deflated 90%)
  adding: .idea/jarRepositories.xml (deflated 67%)
  adding: .idea/codeStyles/Project.xml (deflated 75%)
  adding: .idea/codeStyles/codeStyleConfig.xml (deflated 17%)
  adding: .idea/gradle.xml (deflated 57%)
  adding: .idea/vcs.xml (deflated 25%)
  adding: .idea/workspace.xml (deflated 74%)
  adding: .idea/misc.xml (deflated 48%)
  adding: .idea/compiler.xml (deflated 22%)
  adding: src/main/resources/META-INF/plugin.xml (deflated 64%)
```

압축 대상인 파일의 경로/이름과 압축률이 출력된다.

이 때 각 파일의 경로도 압축파일 내에 모두 보존되므로, `xml-files.zip` 파일의 압축을 풀면 각 파일별 소속된 디렉토리까지 함께 생성된다.

압축을 풀어보자. 다음 명령은 `xml-files.zip` 파일을 `xml-files-unzipped` 디렉토리에 압축 해제한다.
(`-d directory`옵션으로 디렉토리를 지정하지 않으면 현재 경로에 다 풀려버리므로 주의하도록 한다.)

```
$ unzip xml-files.zip -d ./xml-files-unzipped

Archive:  xml-files.zip
  inflating: ./xml-files-unzipped/build/resources/main/META-INF/plugin.xml  
  inflating: ./xml-files-unzipped/build/patchedPluginXmlFiles/plugin.xml  
  inflating: ./xml-files-unzipped/build/idea-sandbox/config/options/updates.xml  
  inflating: ./xml-files-unzipped/.idea/markdown.xml  
  inflating: ./xml-files-unzipped/.idea/uiDesigner.xml  
  inflating: ./xml-files-unzipped/.idea/jarRepositories.xml  
  inflating: ./xml-files-unzipped/.idea/codeStyles/Project.xml  
  inflating: ./xml-files-unzipped/.idea/codeStyles/codeStyleConfig.xml  
  inflating: ./xml-files-unzipped/.idea/gradle.xml  
  inflating: ./xml-files-unzipped/.idea/vcs.xml  
  inflating: ./xml-files-unzipped/.idea/workspace.xml  
  inflating: ./xml-files-unzipped/.idea/misc.xml  
  inflating: ./xml-files-unzipped/.idea/compiler.xml  
  inflating: ./xml-files-unzipped/src/main/resources/META-INF/plugin.xml  
```

압축 파일에 포함된 파일들의 목록은 `unzip -l`로 확인할 수 있다.

```bash
$ unzip -l xml-files.zip

Archive:  xml-files.zip
  Length      Date    Time    Name
---------  ---------- -----   ----
     1258  03-19-2023 18:05   build/resources/main/META-INF/plugin.xml
     1258  03-19-2023 18:05   build/patchedPluginXmlFiles/plugin.xml
      139  03-19-2023 18:06   build/idea-sandbox/config/options/updates.xml
      296  03-15-2023 15:25   .idea/markdown.xml
     8792  03-15-2023 18:33   .idea/uiDesigner.xml
      839  03-15-2023 15:16   .idea/jarRepositories.xml
     2558  03-15-2023 15:25   .idea/codeStyles/Project.xml
      142  03-15-2023 15:25   .idea/codeStyles/codeStyleConfig.xml
      663  03-15-2023 20:47   .idea/gradle.xml
      167  03-15-2023 15:15   .idea/vcs.xml
     8734  03-24-2023 23:42   .idea/workspace.xml
      585  03-15-2023 15:15   .idea/misc.xml
      169  03-15-2023 15:16   .idea/compiler.xml
     1554  03-19-2023 21:45   src/main/resources/META-INF/plugin.xml
---------                     -------
    27154                     14 files
```

압축률(Cmpr), CRC-32 등의 자세한 정보가 보고 싶다면 `-v` 옵션을 사용한다.

```bash
$ unzip -v xml-files.zip 
Archive:  xml-files.zip
 Length   Method    Size  Cmpr    Date    Time   CRC-32   Name
--------  ------  ------- ---- ---------- ----- --------  ----
    1258  Defl:N      578  54% 03-19-2023 18:05 ddded280  build/resources/main/META-INF/plugin.xml
    1258  Defl:N      578  54% 03-19-2023 18:05 ddded280  build/patchedPluginXmlFiles/plugin.xml
     139  Defl:N      105  25% 03-19-2023 18:06 65c95126  build/idea-sandbox/config/options/updates.xml
     296  Defl:N      168  43% 03-15-2023 15:25 3c5dcd9f  .idea/markdown.xml
    8792  Defl:N      866  90% 03-15-2023 18:33 141428a5  .idea/uiDesigner.xml
     839  Defl:N      279  67% 03-15-2023 15:16 490578a4  .idea/jarRepositories.xml
    2558  Defl:N      645  75% 03-15-2023 15:25 aeac7c1b  .idea/codeStyles/Project.xml
     142  Defl:N      118  17% 03-15-2023 15:25 f3f6b5c2  .idea/codeStyles/codeStyleConfig.xml
     663  Defl:N      287  57% 03-15-2023 20:47 0b3f2185  .idea/gradle.xml
     167  Defl:N      126  25% 03-15-2023 15:15 a4ab74a1  .idea/vcs.xml
    8734  Defl:N     2273  74% 03-24-2023 23:42 5cfb222a  .idea/workspace.xml
     585  Defl:N      304  48% 03-15-2023 15:15 3eed493b  .idea/misc.xml
     169  Defl:N      131  23% 03-15-2023 15:16 628df4ab  .idea/compiler.xml
    1554  Defl:N      560  64% 03-19-2023 21:45 9affd208  src/main/resources/META-INF/plugin.xml
--------          -------  ---                            -------
   27154             7018  74%                            14 files
```

압축이 잘 풀렸는지 [[/cmd/find]]로 확인해 보자.

```bash
$ find ./xml-files-unzipped -name '*.xml'

./xml-files-unzipped/build/resources/main/META-INF/plugin.xml
./xml-files-unzipped/build/patchedPluginXmlFiles/plugin.xml
./xml-files-unzipped/build/idea-sandbox/config/options/updates.xml
./xml-files-unzipped/.idea/markdown.xml
./xml-files-unzipped/.idea/uiDesigner.xml
./xml-files-unzipped/.idea/jarRepositories.xml
./xml-files-unzipped/.idea/codeStyles/Project.xml
./xml-files-unzipped/.idea/codeStyles/codeStyleConfig.xml
./xml-files-unzipped/.idea/gradle.xml
./xml-files-unzipped/.idea/vcs.xml
./xml-files-unzipped/.idea/workspace.xml
./xml-files-unzipped/.idea/misc.xml
./xml-files-unzipped/.idea/compiler.xml
./xml-files-unzipped/src/main/resources/META-INF/plugin.xml
```

파일의 수는 14개.

```bash
$ find ./xml-files-unzipped -name '*.xml' | wc -l
      14
```

