---
layout  : wiki
title   : Thread.State
summary : java.lang.Thread.State enum
date    : 2022-11-06 22:20:15 +0900
updated : 2024-10-05 22:25:48 +0900
tag     : java thread
resource: 4C/D08810-AD42-47FF-9A9C-35A7378762F3
toc     : true
public  : true
parent  : [[/java/thread]]
latex   : false
---
* TOC
{:toc}

## public enum Thread.State

```java
/**
 * A thread state.  A thread can be in one of the following states:
 * <ul>
 * <li>{@link #NEW}<br>
 *     A thread that has not yet started is in this state.
 *     </li>
 * <li>{@link #RUNNABLE}<br>
 *     A thread executing in the Java virtual machine is in this state.
 *     </li>
 * <li>{@link #BLOCKED}<br>
 *     A thread that is blocked waiting for a monitor lock
 *     is in this state.
 *     </li>
 * <li>{@link #WAITING}<br>
 *     A thread that is waiting indefinitely for another thread to
 *     perform a particular action is in this state.
 *     </li>
 * <li>{@link #TIMED_WAITING}<br>
 *     A thread that is waiting for another thread to perform an action
 *     for up to a specified waiting time is in this state.
 *     </li>
 * <li>{@link #TERMINATED}<br>
 *     A thread that has exited is in this state.
 *     </li>
 * </ul>
 *
 * <p>
 * A thread can be in only one state at a given point in time.
 * These states are virtual machine states which do not reflect
 * any operating system thread states.
 *
 * @since   1.5
 * @see #getState
 */
public enum State {
```

>
스레드 상태. 하나의 스레드는 다음 중 하나의 상태를 가질 수 있습니다.
>
> - NEW
>     - 아직 시작되지 않은 스레드의 상태.
> - RUNNABLE
>     - 자바 가상 머신에서 실행중인 스레드의 상태.
> - BLOCKED
>     - 모니터 잠금을 기다리며 블록된 스레드 상태.
> - WAITING
>     - 다른 스레드가 특정 작업을 완료할 때까지 무기한으로 기다리고 있는 스레드 상태.
> - TIMED_WAITING
>     - 지정한 대기 시간까지 다른 스레드가 특정 작업을 완료하기를 기다리는 스레드 상태.
> - TERMINATED
>     - 종료된 스레드의 상태.
>
스레드는 한 번에 한 가지의 상태만 가질 수 있습니다.
위의 상태들은 가상 머신의 상태이며, OS의 스레드 상태를 반영하는 것이 아닙니다.

### NEW

```java
/**
 * Thread state for a thread which has not yet started.
 */
NEW,
```

>
아직 시작되지 않은 스레드의 상태.

### RUNNABLE

```java
/**
 * Thread state for a runnable thread.  A thread in the runnable
 * state is executing in the Java virtual machine but it may
 * be waiting for other resources from the operating system
 * such as processor.
 */
RUNNABLE,
```

>
실행 가능한 스레드의 상태.
>
RUNNABLE 상태의 스레드는 JVM에서 실행되고 있지만, 프로세서 같은 OS에서 제공하는 다른 리소스를 기다리고 있을 수 있습니다.

### BLOCKED

```java
/**
 * Thread state for a thread blocked waiting for a monitor lock.
 * A thread in the blocked state is waiting for a monitor lock
 * to enter a synchronized block/method or
 * reenter a synchronized block/method after calling
 * {@link Object#wait() Object.wait}.
 */
BLOCKED,
```

>
모니터 잠금을 기다리며 블록된 스레드 상태.
>
BLOCKED 상태의 스레드는 synchronized 블록/메소드에 들어가거나,
`Object.wait()` 호출 이후 synchronized 블록/메소드에 다시 들어가기 위해 모니터 잠금을 기다리고 있습니다.

### WAITING

```java
/**
 * Thread state for a waiting thread.
 * A thread is in the waiting state due to calling one of the
 * following methods:
 * <ul>
 *   <li>{@link Object#wait() Object.wait} with no timeout</li>
 *   <li>{@link #join() Thread.join} with no timeout</li>
 *   <li>{@link LockSupport#park() LockSupport.park}</li>
 * </ul>
 *
 * <p>A thread in the waiting state is waiting for another thread to
 * perform a particular action.
 *
 * For example, a thread that has called {@code Object.wait()}
 * on an object is waiting for another thread to call
 * {@code Object.notify()} or {@code Object.notifyAll()} on
 * that object. A thread that has called {@code Thread.join()}
 * is waiting for a specified thread to terminate.
 */
WAITING,
```

>
대기중인 스레드 상태.
>
다음 메소드 중 하나를 호출한 스레드는 WAITING 상태가 됩니다.
>
> - `Object.wait()` (타임아웃 없음)
> - `Thread.join()` (타임아웃 없음)
> - `LockSupport.park()`
>
WAITING 상태의 스레드는 다른 스레드가 특정 작업을 완료할 때까지 기다리고 있습니다.
>
예를 들어, 어떤 object에 대해 `Object.wait()`를 호출한 스레드는 다른 스레드가 해당 object에 대해 `Object.notify()` 또는 `Object.notifyAll()`을 호출하기를 기다리고 있습니다.
>
`Thread.join()`을 호출한 스레드는 지정된 스레드가 terminate될 때까지 기다리고 있습니다.

### TIMED_WAITING

```java
/**
 * Thread state for a waiting thread with a specified waiting time.
 * A thread is in the timed waiting state due to calling one of
 * the following methods with a specified positive waiting time:
 * <ul>
 *   <li>{@link #sleep Thread.sleep}</li>
 *   <li>{@link Object#wait(long) Object.wait} with timeout</li>
 *   <li>{@link #join(long) Thread.join} with timeout</li>
 *   <li>{@link LockSupport#parkNanos LockSupport.parkNanos}</li>
 *   <li>{@link LockSupport#parkUntil LockSupport.parkUntil}</li>
 * </ul>
 */
TIMED_WAITING,
```

>
대기 시간이 지정된 대기중인 스레드의 상태.
>
양수값의 대기 시간을 지정하여 다음 메소드 중 하나를 호출한 스레드는 TIMED_WAITING 상태가 됩니다.
>
> - `Thread.sleep(long)`
> - `Object.wait(long)` (타임아웃 있음)
> - `Thread.join(long)` (타임아웃 있음)
> - `LockSupport.parkNanos(Object, long)`
> - `LockSupport.parkUntil(Object, long)`

### TERMINATED

```java
/**
 * Thread state for a terminated thread.
 * The thread has completed execution.
 */
TERMINATED;
```

>
종료된 스레드의 상태. 종료된 스레드는 실행이 완료된 스레드를 말합니다.

## 참고문헌

- [Thread.State (docs.oracle.com, java 19)]( https://docs.oracle.com/en/java/javase/19/docs/api/java.base/java/lang/Thread.State.html )

