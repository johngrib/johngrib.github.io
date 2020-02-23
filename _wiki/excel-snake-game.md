---
layout  : wiki
title   : 엑셀로 만든 snake 게임
summary : 언젠간 DOOM을 엑셀에서 돌리고 싶다
date    : 2020-02-23 21:57:16 +0900
updated : 2020-02-23 23:28:57 +0900
tag     : game
toc     : true
public  : true
parent  : [[Excel]]
latex   : false
---
* TOC
{:toc}

## 엑셀로 게임을?

VBA를 사용하면 만들 수 있다.

다음은 내가 1년차 개발자였던 2012년에 회사 업무 때문에 엑셀 VBA를 공부하다 만들었던 게임이다.

다른 이유는 없고 나는 그냥 새로운 프로그래밍 언어를 배울 때마다 이런 류의 게임을 만든다.

vim에서 돌아가는 [vim-game-code-break]( https://github.com/johngrib/vim-game-code-break )와 [vim-game-snake]( https://github.com/johngrib/vim-game-snake )도 vimscript를 익히기 시작했을 때 만든 것이다.

아무튼 오랫동안 잊고 있다가 최근에 다시 생각나서 팀 동료들에게 기술 공유 시간에 발표를 했고(사실 발표할 거리가 부족해서 예전에 만든 것을 써먹은 것이다) 반응이 괜찮아서 기록해 둔다.

![]( /post-img/excel-snake-game/snake-excel.gif )

## 실행 방법

이 게임은 윈도우즈에서만 실행할 수 있다.

다음 링크의 엑셀 파일을 다운로드 받는다.

* [snake-32bit.xlsm]( /post-img/excel-snake-game/snake-32bit.xlsm ) - 32비트 윈도우즈에서만 실행될 것이다.
* [snake-64bit.xlsm]( /post-img/excel-snake-game/snake-64bit.xlsm ) - 64비트에서 돌아가게 수정한 버전. 테스트를 충분히 안 해봐서 모르겠다. 집에 64비트 윈도우즈가 없다.

다운받은 파일을 실행하고, 매크로를 사용하겠다고 선택한다.

화면에 있는 `start` 버튼을 누르고 시작 레벨을 선택하면 게임이 시작된다.

조종은 방향키로 한다.

* 뱀이 과일을 하나 먹을 때마다 레벨이 1씩 올라가고, 뱀이 조금씩 더 빨라진다.
* 게임이 너무 느린 것 같으면 시작 레벨을 좀 높여서 시작하는 것이 좋다.
* 권장하는 시작 레벨은 30~40 정도.

자기 몸을 먹거나 벽에 부딪히면 뱀이 죽게 되어 GAME OVER 가 된다.

## Windows 전용인 이유

이 게임은 윈도우즈에서만 돌아간다.

그 이유는 아주 단순한데, windows의 `user32.dll`에 들어 있는 `SetTimer`와 `KillTimer`를 불러다 쓰기 때문이다.

엑셀 vba의 기본 시간 인터벌이 `1000ms`여서 `user32.dll`을 썼던 것으로 기억한다.

아마 `1000ms` 미만으로 인터벌을 지정하는 vba만의 다른 방법도 있을 것 같고, 그걸 알아낸다면 이 게임은 Mac 에서도 돌릴 수 있을 것 같다.

## 32비트 코드 문제

32비트 스네이크 게임을 64비트 운영체제에서 열어보면 다음과 같은 에러를 볼 수 있다.

![]( /post-img/excel-snake-game/compile-error.png )

이 문제는 다음과 같이 `Declare` 뒤에 `PtrSafe`를 붙여주고, 함수 포인터를 `Long`에서 `LongPtr`로 바꿔주면 해결된다.

(해결되는 걸 보긴 했는데, 그 확인한 파일이 있는 EC2 인스턴스를 Terminate해버려서 100% 확신할 수는 없다.)

```vb
Public Declare PtrSafe Function SetTimer Lib "user32" ( _
    ByVal HWnd As Long, _
    ByVal nIDEvent As Long, _
    ByVal uElapse As Long, _
    ByVal lpTimerFunc As LongPtr) As Long

Public Declare PtrSafe Function KillTimer Lib "user32" ( _
    ByVal HWnd As Long, _
    ByVal nIDEvent As Long) As Long
```

이 문제는 다음 페이지들을 보고 참고해 고쳤다.

* [How do I fix error for 64-bit VBA PPT converted from 32-bit](https://stackoverflow.com/questions/53245069/how-do-i-fix-error-for-64-bit-vba-ppt-converted-from-32-bit )
* [VBA 32-bit and 64-bit type mismatch]( https://stackoverflow.com/questions/50431565/vba-32-bit-and-64-bit-type-mismatch )

## 구현

* 먼저 익숙한 언어인 javascript와 html로 구현한 다음, vba로 구현한 게임이다.
* 뱀의 몸체에 대해 순환 큐를 썼다.
* 각 셀의 크기를 정사각형으로 만들고, 까만 배경색을 지정하는 방식으로 게임판을 만들었다.

각 셀의 크기를 가로세로 1 픽셀인 정사각형으로 만들면 모든 것을 표현할 수 있다.

나는 엑셀 위에서 돌아가는 DOOM 을 만들어 보고 싶었는데 다음과 같은 문제가 있어 시작하지 않았다.

* 엑셀 파일 속에 들어있는 VBA 코드를 따로 분리해서 git으로 관리하기가 아주 짜증났다.
* 몇 년 후, 다시 생각나서 파일을 다시 열어봤는데 그 때엔 내가 윈도우즈를 안 쓰고 맥북프로만 쓰고 있었다.
    * 맥에서 VBA 에디터는 진짜 최악의 IDE였다. 느리고 자동완성도 잘 안 되고, 한글 주석이 들어가면 모든 것이 엉망이 됐다.

하지만 언젠간 시작할 것이다.

## 소스 코드

당시의 내가 주석을 잘 달아 놔서 딱히 설명을 달 필요는 없을 것 같다. 그대로 올린다.


### 모듈 1: Main

모듈 1은 메인 코드가 들어 있다. 게임 시작 레벨을 물어보고, 게임판을 만들고, 뱀을 만들고 움직이며, 타이머를 설정하는 등의 가장 더러운 일을 한다.

```vb
Public gTable As Object
Public x, y, sizeMax, sHead, sTail, score, acc, startLvl As Integer
Public itemX, itemY, tWidth, tHeight, sClr, bgClr, itemClr As Integer
Public lFlag, rFlag, uFlag, dFlag As Boolean
Public sBody(0 To 500, 0 To 1) As Integer

Private Sub start() 'start 버튼을 누르면 시작된다

    '주요 정보 초기화

    startLvl = InputBox("시작 레벨을 입력하세요 (0~100) 숫자만 입력해야 합니다", "")

    If startLvl < 0 Then
        startLvl = 0
    ElseIf startLvl > 100 Then
        startLvl = 100
    End If

    '테이블 길이 가로/세로
    tWidth = 30: tHeight = 30
    '색깔 - 뱀: 보라색, 배경: 검정, 아이템: 분홍
    sClr = 17: bgClr = 1: itemClr = 38

    x = Int(tWidth / 2): y = Int(tHeight / 2): sizeMax = 500 '시작좌표, 최대 길이

    '원형 que 에서 사용할 머리와 꼬리 pointer (논리)
    sHead = startLvl + 2: sTail = 0

    '원형 que 에 뱀 몸뚱이 초기좌표를 입력
    For i = 0 To sHead Step 1
        sBody(i, 0) = x: sBody(i, 1) = y
    Next i

    '빠르기 초기값
    TimerSeconds = 500

    '시작 레벨에 맞춰 속도를 증가시켜준다
    '0레벨부터 시작할때보다 증가폭이 크다
    For j = 0 To startLvl Step 1
        accelate2
    Next j

    '시작 레벨을 표시해준다
    score = startLvl

    '게임판을 만든다
    Set gTable = Worksheets("table")
    Call maketable
    Call makeItem

    '이동방향 초기화 : 기본값은 오른쪽
    rFlag = True: lFlag = False: uFlag = False: dFlag = False

    '방향키에 함수 배당
    Application.OnKey "{Up}", "up"
    Application.OnKey "{Down}", "down"
    Application.OnKey "{Left}", "left"
    Application.OnKey "{Right}", "right"

    '게임 시작
    Call StartTimer
End Sub

'게임판을 만들어준다
Private Sub maketable()

    '게임오버 표시 셀을 비워준다
    Cells(tHeight + 1, 1).Value = ""

    '사이즈 조정 : column
    For i = 1 To tWidth Step 1
        gTable.Columns(i).ColumnWidth = 1
    Next i

    '사이즈 조정 : row
    gTable.Rows("1:" & tHeight).RowHeight = 10

    '배경을 까맣게 칠해준다
    For i = 1 To tHeight Step 1
        For j = 1 To tWidth Step 1
            gTable.Cells(i, j).Interior.ColorIndex = bgClr
        Next j
    Next i

    'score 를 표시해준다
    gTable.Cells(tHeight + 2, 34).Value = score
    gTable.Cells(tHeight + 2, 33).Value = "레벨 : "

    '빠르기를 표시해준다
    gTable.Cells(tHeight + 3, 34).Value = TimerSeconds
    gTable.Cells(tHeight + 3, 33).Value = "빠르기 : "

End Sub

'아이템을 생성해준다
Sub makeItem()

    Randomize
    itemX = Int(Rnd * tWidth) + 1   '아이템의 x 좌표
    itemY = Int(Rnd * tHeight) + 1  '아이템의 y 좌표

    If gTable.Cells(itemY, itemX).Interior.ColorIndex = sClr Then
        '새로 생성한 아이템이 뱀 몸과 겹친다면 다시 생성한다
        makeItem
    Else '아니라면 새로운 아이템을 화면에 표시한다
        gTable.Cells(itemY, itemX).Interior.ColorIndex = itemClr
    End If

End Sub

'뱀을 자동으로 움직이게 하는 함수 : 일정 시간이 지날때마다 호출된다
Sub move()

    '머리의 좌표를 변경해주는 조건문
    If lFlag And x > 1 Then
        x = x - 1
    ElseIf rFlag And x < tWidth Then
        x = x + 1
    ElseIf uFlag And y > 1 Then
        y = y - 1
    ElseIf dFlag And y < tHeight Then
        y = y + 1
    Else '벽에 부딪혔다면 죽는다
        gameover
    End If

    ' 자기 몸을 물어도 죽는다
    If gTable.Cells(y, x).Interior.ColorIndex = sClr Then
            gameover
    End If

    '머리가 전진한 곳의 색깔을 뱀 색깔로 바꿔주면,
    '뱀이 앞으로 간 것처럼 보이게 된다
    gTable.Cells(y, x).Interior.ColorIndex = sClr

    ' 아이템을 먹으면
    If x = itemX And y = itemY Then

        makeItem '새 아이템을 생성해준다

        '꼬리를 1칸 늘린다
        If sTail > 0 Then
            sTail = sTail - 1
        Else
            sTail = sizeMax
        End If

        '레벨 상승 및 표시
        score = score + 1
        gTable.Cells(tHeight + 2, 34).Value = score

        '아이템을 먹을 때마다 속도가 올라간다
            EndTimer '타이머 정지
            accelate '속도 증가
            StartTimer '타이머 재시동

        '속도를 표시해준다
        gTable.Cells(tHeight + 3, 34).Value = TimerSeconds

    End If

    '머리를 옮기고
    Call shift

    '꼬리를 옮긴다
    If yyy = itemY And xxx = itemX Then
        gTable.Cells(sBody(sTail, 1), sBody(sTail, 0)).Interior.ColorIndex = itemClr
    Else
        gTable.Cells(sBody(sTail, 1), sBody(sTail, 0)).Interior.ColorIndex = bgClr
    End If
    Call pop

End Sub
```

### 모듈 2: 시간을 제어한다

이 모듈에서 `user32.dll`을 사용한다. 만약 vba에서 시간을 `1ms` 단위로 제어하는 방법을 알아내면 이 모듈만 고치면 된다.

```vb
'windows 기본 제공 API 인 user32.dll 에서 타이머 제어 메소드를 받아오는 모듈

Public Declare PtrSafe Function SetTimer Lib "user32" ( _
    ByVal HWnd As Long, _
    ByVal nIDEvent As Long, _
    ByVal uElapse As Long, _
    ByVal lpTimerFunc As LongPtr) As Long

Public Declare PtrSafe Function KillTimer Lib "user32" ( _
    ByVal HWnd As Long, _
    ByVal nIDEvent As Long) As Long

Public TimerID As Long
Public TimerSeconds As Single

Sub StartTimer()
    'TimerSeconds = 1000 ' how often to "pop" the timer.
    TimerID = SetTimer(0&, 0&, TimerSeconds * 1&, AddressOf TimerProc)
End Sub

Sub EndTimer()
    On Error Resume Next
    KillTimer 0&, TimerID
End Sub

Sub TimerProc(ByVal HWnd As Long, ByVal uMsg As Long, _
        ByVal nIDEvent As Long, ByVal dwTimer As Long)

    ''''''
    ' This procedure is called by Windows. Put your
    ' code here.
    ''''''
    move
End Sub

'게임오버 시 타이머 정지
Public Sub gameover()
    Cells(tHeight + 1, 1).Value = "GAME OVER"
    EndTimer
End Sub

Public Sub accelate()
    TimerSeconds = TimerSeconds - Int(TimerSeconds / 100)
End Sub

Public Sub accelate2()
    TimerSeconds = TimerSeconds - Int(TimerSeconds / 50)
End Sub
```

### 모듈 3: 방향키 사용

이 모듈은 방향키 입력을 처리한다.

```vb
'뱀의 움직임을 처리하는 모듈

'뱀의 몸뚱이를 이루고 있는 셀들의 좌표는 sBody 배열에 담겨 있다
'머리를 지시하는 integer 변수와 꼬리를 지시하는 integer 변수를 이용하여
'순환 que 구조를 구현하였다

'뱀이 1칸 앞으로 가면 꼬리도 1칸 앞으로 간다
'이것이 배열에서는 sHead 가 +1 되고 sTail 도 +1 되게 하였다
'만약 뱀이 아이템을 먹어 길이가 1 늘어나면,
'머리는 가만히 있고 sTail 이 -1 이 되면 된다

'뱀 body que 에 머리를 표시한다
Public Sub shift()

    If sHead < sizeMax Then
        sHead = sHead + 1
    Else
        sHead = 0
    End If

    sBody(sHead, 0) = x: sBody(sHead, 1) = y

End Sub

'뱀 body que 에 꼬리를 표시한다
Public Sub pop()
    
    If sTail < sizeMax Then
        sTail = sTail + 1
    Else
        sTail = 0
    End If

End Sub


'방향키 처리
Public Sub down()
    
    If Not uFlag And Not dFlag Then
        dFlag = True
        rFlag = False
        lFlag = False
        uFlag = False
    End If

End Sub

Public Sub up()

    If Not uFlag And Not dFlag Then
        uFlag = True
        rFlag = False
        lFlag = False
        dFlag = False
    End If

End Sub

Public Sub left()

    If Not lFlag And Not rFlag Then
        lFlag = True
        rFlag = False
        uFlag = False
        dFlag = False
    End If
    
End Sub

Public Sub right()
    
    If Not rFlag And Not lFlag Then
        rFlag = True
        lFlag = False
        uFlag = False
        dFlag = False
    End If

End Sub
```
