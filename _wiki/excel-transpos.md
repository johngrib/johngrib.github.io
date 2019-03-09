---
layout  : wiki
title   : Excel 행과 열 바꾸는 방법
summary : 
date    : 2018-09-17 12:06:47 +0900
updated : 2018-09-17 13:49:55 +0900
tag     : excel vba
toc     : true
public  : true
parent  : Excel
latex   : false
---
* TOC
{:toc}

# 개요

엑셀에 다음과 같은 내용이 있다고 하자.

| no | name | tel           |
| 1  | Lee  | 010-1234-xxxx |
| 2  | Kim  | 010-4321-yyyy |
| 3  | Park | 010-1357-qqqq |

이 표의 행과 열을 바꿔 다음과 같이 만들고자 한다.

| no   | 1             | 2             | 3             |
| name | Lee           | Kim           | Park          |
| tel  | 010-1234-xxxx | 010-4321-yyyy | 010-1357-qqqq |

다음과 같은 방법들이 있다.

* 복사 - 붙여넣기의 `행/열 바꿈` 옵션을 사용하기
* `transpos`함수 사용
* VBA 사용

# 붙여넣기

![image](https://user-images.githubusercontent.com/1855714/45604838-364fb980-ba73-11e8-97b5-638355611998.png )

* 영역을 지정한다.
* `ctrl+c`로 복사한다.
    * MacOS라면 `command+c`.
* 붙여넣고 싶은 곳을 클릭해 커서를 위치시킨다.
* 그냥 붙여넣지 않고 위의 이미지와 같이 `홈`-`붙여넣기`-`행/열 바꿈`을 선택하면 완료.
    * 영문판에서는 `행/열 바꿈`이 `Transpose`.

# transpos 함수

* **붙여넣을 범위**를 마우스로 드래그하거나 키보드로 지정한다.
* 위쪽 수식 입력칸에 `=transpos(범위)`를 적는다.
    * 예를 들어 원본 표의 범위가 `B5:D8`이라면 `=transpos(B5:D8)`을 적는다.
    * `ctrl+shift+Enter`를 입력하면 처음에 지정한 범위 안에 표가 행/열이 바뀌어 들어간다.
        * MacOS에서도 똑같이 `ctrl+shift+Enter` 하면 된다.
    * 그냥 `Enter` 치면 안 된다.



# VBA 프로시저 만들어 사용하기

VBA 코딩으로 해결하고 싶다면 다음과 같이 하면 된다.

* VBA를 사용 셋팅이 안 되어 있다면 [[excel-vba-setting]] 참고.
* `alt+F11`로 VBA 에디터를 실행한다.
* 다음 프로시저를 복사해 모듈에 붙여넣는다.

```vb
Sub ChangeColRow()

    Dim originRange As Range
    Dim targetRange As Range

    Set originRange = Application.InputBox(Prompt:="question1", Title:="복사할 대상 선택", Type:=8)
    Set targetRange = Application.InputBox(Prompt:="question2", Title:="붙여넣을 기준 셀 하나 선택", Type:=8)

    ' 선택한 범위 복사
    originRange.Copy

    ' 붙여넣을 곳 선택하고, Transpose 옵션으로 붙여넣기
    targetRange.Select
    Selection.PasteSpecial _
        Paste:=xlPasteAll, _
        Operation:=xlPasteSpecialOperationNone, _
        SkipBlanks:=False, _
        Transpose:=True  ' 이 옵션이 중요

End Sub
```

* 워크시트에서 `개발 도구` - `매크로`를 선택한 다음, `매크로 이름`에서 `ChangeColRow`를 실행한다.
* "복사할 대상 선택"을 물어보면 복사할 대상을 마우스로 드래그해서 선택한다.
* "붙여넣을 기준 셀 하나 선택"을 물어보면 붙여넣을 곳 하나를 고른다.
* 끝.


# Links

* [excel.application.inputbox](https://docs.microsoft.com/en-us/office/vba/api/excel.application.inputbox )
* [excel.range.pastespecial](https://docs.microsoft.com/en-us/office/vba/api/excel.range.pastespecial )
    * [excel.xlpastetype](https://docs.microsoft.com/en-us/office/vba/api/excel.xlpastetype )

