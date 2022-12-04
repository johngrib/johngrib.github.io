---
layout  : wiki
title   : java.lang.Object.clone 메소드
summary : 
date    : 2022-11-19 12:08:15 +0900
updated : 2022-11-19 15:03:23 +0900
tag     : java
resource: 54/E0DDC3-7230-4AF5-94B5-E999C57B53B3
toc     : true
public  : true
parent  : [[/java]]
latex   : false
---
* TOC
{:toc}

## 요약

`Object.clone`은 native 메소드로, bitwise copy를 한다.

```cpp
// JVM c++ 코드
new_obj_oop = CollectedHeap::obj_allocate(klass, size, CHECK_NULL);
```

---

`Object` 클래스에 있는 `clone` 메소드를 사용하려면 다음과 같이 한다.

1. 클래스가 `Cloneable` 인터페이스를 구현하게 한다.
    - `Cloneable` 인터페이스 구현체가 아니라면 `clone`을 호출했을 때 `CloneNotSupportedException` 예외가 던져진다.
2. `clone` 메소드를 오버라이드 한다.
    - 이 때 오버라이드 메소드의 접근 제한자를 `public`으로 설정한다.
3. 오버라이드한 `clone` 메소드에서는 `super.clone`을 호출한다.

---

왜 `super.clone()`을 호출하는가?

- `clone`은 생성자가 아니다. 따라서 자동으로 호출되지 않는다. 수동으로 불러야 한다.
- `super.clone()`을 호출해서 재귀적으로 부모 클래스의 `clone` 메소드를 호출하는 방식.

---

`clone()`은 기본적으로 얕은 복사를 수행한다.

- 깊은 복사가 필요하다면 `clone`을 오버라이드할 때 코딩해서 구현할 것.
- `ArrayList`의 `clone`은 얕은 복사를 수행하므로 주의해야 한다.

## 원문

[jdk-17+35 java.lang.Object.clone]( https://github.com/openjdk/jdk/blob/jdk-17+35/src/java.base/share/classes/java/lang/Object.java#L166-L228 )

```java
/**
 * Creates and returns a copy of this object.  The precise meaning
 * of "copy" may depend on the class of the object. The general
 * intent is that, for any object {@code x}, the expression:
 * <blockquote>
 * <pre>
 * x.clone() != x</pre></blockquote>
 * will be true, and that the expression:
 * <blockquote>
 * <pre>
 * x.clone().getClass() == x.getClass()</pre></blockquote>
 * will be {@code true}, but these are not absolute requirements.
 * While it is typically the case that:
 * <blockquote>
 * <pre>
 * x.clone().equals(x)</pre></blockquote>
 * will be {@code true}, this is not an absolute requirement.
 * <p>
 * By convention, the returned object should be obtained by calling
 * {@code super.clone}.  If a class and all of its superclasses (except
 * {@code Object}) obey this convention, it will be the case that
 * {@code x.clone().getClass() == x.getClass()}.
 * <p>
 * By convention, the object returned by this method should be independent
 * of this object (which is being cloned).  To achieve this independence,
 * it may be necessary to modify one or more fields of the object returned
 * by {@code super.clone} before returning it.  Typically, this means
 * copying any mutable objects that comprise the internal "deep structure"
 * of the object being cloned and replacing the references to these
 * objects with references to the copies.  If a class contains only
 * primitive fields or references to immutable objects, then it is usually
 * the case that no fields in the object returned by {@code super.clone}
 * need to be modified.
 *
 * @implSpec
 * The method {@code clone} for class {@code Object} performs a
 * specific cloning operation. First, if the class of this object does
 * not implement the interface {@code Cloneable}, then a
 * {@code CloneNotSupportedException} is thrown. Note that all arrays
 * are considered to implement the interface {@code Cloneable} and that
 * the return type of the {@code clone} method of an array type {@code T[]}
 * is {@code T[]} where T is any reference or primitive type.
 * Otherwise, this method creates a new instance of the class of this
 * object and initializes all its fields with exactly the contents of
 * the corresponding fields of this object, as if by assignment; the
 * contents of the fields are not themselves cloned. Thus, this method
 * performs a "shallow copy" of this object, not a "deep copy" operation.
 * <p>
 * The class {@code Object} does not itself implement the interface
 * {@code Cloneable}, so calling the {@code clone} method on an object
 * whose class is {@code Object} will result in throwing an
 * exception at run time.
 *
 * @return     a clone of this instance.
 * @throws  CloneNotSupportedException  if the object's class does not
 *               support the {@code Cloneable} interface. Subclasses
 *               that override the {@code clone} method can also
 *               throw this exception to indicate that an instance cannot
 *               be cloned.
 * @see java.lang.Cloneable
 */
@IntrinsicCandidate
protected native Object clone() throws CloneNotSupportedException;
```

### 번역
 
`this` 객체의 복사본을 생성해 리턴합니다.
"복사"의 정확한 의미는 클래스에 따라 달라질 수 있지만,
모든 객체 `x`에 대해 다음 표현식이 성립하는 것이 기본적인 의도라고 할 수 있습니다.

```java
x.clone() != x
```

위의 코드는 `true`가 됩니다.

```java
x.clone().getClass() == x.getClass()
```

그리고 위의 표현식은 `true`가 되지만, 반드시 따라야 하는 요구사항은 아닙니다.

```java
x.clone().equals(x)
```

위의 표현식은 `true`이며, 이 케이스가 일반적이라 할 수 있겠습니다.
그러나 물론 이것도 절대적인 요구사항은 아닙니다.

관례적인 규칙으로, 리턴된 객체는 `super.clone`의 호출로 얻어낸 것이어야 합니다.
만약 클래스와 해당 클래스의 모든 슈퍼클래스가(`Object`는 제외) 이 규칙을 따른다면,
`x.clone().getClass() == x.getClass()`가 성립하는 케이스가 됩니다.

규칙에 따라, 이 메소드가 리턴하는 객체 `this` 객체(복제대상 객체)와는 독립적이어야 합니다.
이러한 독립성을 달성하기 위해서 `super.clone`에 의해 리턴된 객체의 필드를 하나 이상 수정해야 할 수도 있습니다.

이런 독립성을 위한 수정 작업이 무슨 뜻이냐면, 복제되는 객체 "내부의 구조체(deep structure)"를 구성하는 변경 가능한(mutable) 객체들을 복사하고, 이 객체들에 대한 참조를 복사본에 대한 참조로 바꾸는 것을 의미합니다.
만약 클래스가 primitive 필드들만 갖고 있거나, 불변(immutable) 객체들 대한 레퍼런스만 갖고 있다면, 보통은 `super.clone`이 리턴한 객체의 필드를 수정하지 않아도 됩니다.

- Implementation Requirements

Object 클래스의 clone 메소드는 특정한 복제 작업을 수행합니다.

먼저 알아두어야 할 것은, 만약 `this` 객체의 클래스가 `Cloneable` 인터페이스를 구현하지 않았다면, `CloneNotSupportedException`을 던진다는 것입니다.
참고로 모든 종류의 배열은 `Cloneable` 인터페이스를 구현한 것으로 간주되며, 배열 타입 `T[]`의 `clone` 메소드의 리턴 타입도 `T[]`가 됩니다. 이 때 `T`는 레퍼런스 또는 primitive 타입 양쪽 다 가능합니다.
그 외의 경우 이 메소드는 해당 클래스의 새로운 인스턴스를 생성하고 `this` 객체 필드 내용물로 새 인스턴스 각 필드들을 초기화합니다. 이때 각 필드의 내용물들은 복사되 않습니다.
그러므로 이 메소드는 "얕은 복사(shallow copy)"를 수행합니다. "깊은 복사(deep copy)"가 아닙니다.

`Object` 클래스 자신은 `Cloneable` 인터페이스를 구현하지 않습니다.
따라서 런타임에서 `Object` 클래스의 인스턴스를 복제하려고 하면 `CloneNotSupportedException`이 던져집니다.

- Returns

this 인스턴스의 복사본

- Throws

`CloneNotSupportedException` - 객체 클래스 `Cloneable` 인터페이스를 지원하지 않는 경우.
`clone` 메소드를 오버라이드하는 서브클래스는 인스턴스가 clone되면 안된다는 것을 표현하기 위해 이 예외를 던질 수 있습니다.

- See Also

`Cloneable`


## jvm.cpp의 native code

`Obejct.clone`이 `native`이기 때문에 소스코드는 `jvm.cpp`에서 읽어볼 수 있다.

`fixup_cloned_reference` 함수를 보면 된다. 다음 소스코드는 jdk8u로, 과거 버전이긴 하지만 읽어볼만 하다.

[jdk8u hotspot share.vm.prims.jvm.cpp]( https://hg.openjdk.java.net/jdk8u/jdk8u/hotspot/file/69087d08d473/src/share/vm/prims/jvm.cpp#l651 )

다음의 소스코드에서 한국어 주석은 내가 작성한 것이다.

```cpp
static void fixup_cloned_reference(ReferenceType ref_type, oop src, oop clone) {
  // If G1 is enabled then we need to register a non-null referent
  // with the SATB barrier.
#if INCLUDE_ALL_GCS
  if (UseG1GC) {
    // G1GC를 쓰고 있다면 clone 객체의 참조를 등록한다.
    oop referent = java_lang_ref_Reference::referent(clone);
    if (referent != NULL) {
      G1SATBCardTableModRefBS::enqueue(referent);
    }
  }
#endif // INCLUDE_ALL_GCS
  if ((java_lang_ref_Reference::next(clone) != NULL) ||
      (java_lang_ref_Reference::queue(clone) == java_lang_ref_ReferenceQueue::ENQUEUED_queue())) {
    // If the source has been enqueued or is being enqueued, don't
    // register the clone with a queue.
    java_lang_ref_Reference::set_queue(clone, java_lang_ref_ReferenceQueue::NULL_queue());
  }
  // discovered and next are list links; the clone is not in those lists.
  java_lang_ref_Reference::set_discovered(clone, NULL);
  java_lang_ref_Reference::set_next(clone, NULL);
}

JVM_ENTRY(jobject, JVM_Clone(JNIEnv* env, jobject handle))
  JVMWrapper("JVM_Clone");
  Handle obj(THREAD, JNIHandles::resolve_non_null(handle));
  const KlassHandle klass (THREAD, obj->klass());
  JvmtiVMObjectAllocEventCollector oam;

#ifdef ASSERT
  // Just checking that the cloneable flag is set correct
  // cloneable 플래그가 올바르게 설정되어 있는지 확인한다
  if (obj->is_array()) {
    // 모든 배열은 cloneable 이어야 한다. false라면 assert에서 던진다.
    guarantee(klass->is_cloneable(), "all arrays are cloneable");
  } else {
    // 배열이 아니라면 oop여야 한다. (oop는 ordinary object pointer의 약자)
    guarantee(obj->is_instance(), "should be instanceOop");
    // Cloneable 의 서브타입인가? cloneable이 false라면 assert에서 던진다.
    bool cloneable = klass->is_subtype_of(SystemDictionary::Cloneable_klass());
    guarantee(cloneable == klass->is_cloneable(), "incorrect cloneable flag");
  }
#endif

  // Check if class of obj supports the Cloneable interface.
  // All arrays are considered to be cloneable (See JLS 20.1.5)
  if (!klass->is_cloneable()) {
    // 클래스가 cloneable이 아니라면 CloneNotSupportedException을 던진다.
    ResourceMark rm(THREAD);
    THROW_MSG_0(vmSymbols::java_lang_CloneNotSupportedException(), klass->external_name());
  }

  // Make shallow object copy
  // 객체에 대해 얕은 복사를 수행한다
  ReferenceType ref_type = REF_NONE;
  const int size = obj->size();
  oop new_obj_oop = NULL;
  if (obj->is_array()) {
    const int length = ((arrayOop)obj())->length();
    new_obj_oop = CollectedHeap::array_allocate(klass, size, length, CHECK_NULL);
  } else {
    ref_type = InstanceKlass::cast(klass())->reference_type();
    assert((ref_type == REF_NONE) ==
           !klass->is_subclass_of(SystemDictionary::Reference_klass()),
           "invariant");
    new_obj_oop = CollectedHeap::obj_allocate(klass, size, CHECK_NULL);
  }

  // 4839641 (4840070): We must do an oop-atomic copy, because if another thread
  // is modifying a reference field in the clonee, a non-oop-atomic copy might
  // be suspended in the middle of copying the pointer and end up with parts
  // of two different pointers in the field.  Subsequent dereferences will crash.
  // 4846409: an oop-copy of objects with long or double fields or arrays of same
  // won't copy the longs/doubles atomically in 32-bit vm's, so we copy jlongs instead
  // of oops.  We know objects are aligned on a minimum of an jlong boundary.
  // The same is true of StubRoutines::object_copy and the various oop_copy
  // variants, and of the code generated by the inline_native_clone intrinsic.

  // 4839641: oop에 대해 atomic한 copy를 수행해야 한다.
      // 다른 스레드가 clone의 필드 레퍼런스를 수정할 수 있기 때문
  // 4846409: 32비트 vm에서 long, double 필드나 배열은 atomic하게 oop copy할 수 없다.
      // 따라서 oop 대신 jlong을 copy한다.
  assert(MinObjAlignmentInBytes >= BytesPerLong, "objects misaligned");
  Copy::conjoint_jlongs_atomic((jlong*)obj(), (jlong*)new_obj_oop,
                               (size_t)align_object_size(size) / HeapWordsPerLong);
  // Clear the header
  new_obj_oop->init_mark();

  // Store check (mark entire object and let gc sort it out)
  BarrierSet* bs = Universe::heap()->barrier_set();
  assert(bs->has_write_region_opt(), "Barrier set does not have write_region");
  bs->write_region(MemRegion((HeapWord*)new_obj_oop, size));

  // If cloning a Reference, set Reference fields to a safe state.
  // 참조를 clone하는 경우라면, 참조의 필드들을 안전한 상태로 설정한다.
  // Fixup must be completed before any safepoint.
  if (ref_type != REF_NONE) {
    fixup_cloned_reference(ref_type, obj(), new_obj_oop);
  }

  Handle new_obj(THREAD, new_obj_oop);
  // Special handling for MemberNames.  Since they contain Method* metadata, they
  // must be registered so that RedefineClasses can fix metadata contained in them.
  if (java_lang_invoke_MemberName::is_instance(new_obj()) &&
      java_lang_invoke_MemberName::is_method(new_obj())) {
    Method* method = (Method*)java_lang_invoke_MemberName::vmtarget(new_obj());
    // MemberName may be unresolved, so doesn't need registration until resolved.
    if (method != NULL) {
      methodHandle m(THREAD, method);
      // This can safepoint and redefine method, so need both new_obj and method
      // in a handle, for two different reasons.  new_obj can move, method can be
      // deleted if nothing is using it on the stack.
      m->method_holder()->add_member_name(new_obj(), false);
    }
  }

  // Caution: this involves a java upcall, so the clone should be
  // "gc-robust" by this stage.
  if (klass->has_finalizer()) {
    assert(obj->is_instance(), "should be instanceOop");
    new_obj_oop = InstanceKlass::register_finalizer(instanceOop(new_obj()), CHECK_NULL);
    new_obj = Handle(THREAD, new_obj_oop);
  }

  return JNIHandles::make_local(env, new_obj());
JVM_END
```

647 ~ 652 행을 읽어보면 class가 `Cloneable` 인터페이스를 구현하고 있지 않다면 `CloneNotSupportedException`을 던지는 것을 확인할 수 있다.

```cpp
if (!klass->is_cloneable()) {
  ResourceMark rm(THREAD);
  THROW_MSG_0(vmSymbols::java_lang_CloneNotSupportedException(), klass->external_name());
}
```

## 인용

### cloneable은 사전에 없는 단어

브루스 에켈에 의하면 `cloneable`은 사전에 없는 영단어이지만, Java 라이브러리에서는 사용하고 있다고 한다.

>
이것은 사전 단어는 아니지만 자바 라이브러리에서 사용되므로 여기서 사용하였으니 혼동하지 않기 바란다.
[^bruce-1118]

### clone, Cloneable의 설계는 왜 이렇게 이상한가?

>
**왜 이처럼 이상한 설계를?**
>
이 모든 것들이 이상한 스키마처럼 보인다면 실제로도 그렇기 때문이다.
어째서 이러한 방법으로 작동하는지에 대해 의아해 할 수도 있다.
이러한 설계의 이면에는 어떤 뜻이 있을까?
>
원래 자바는 하드웨어를 제어하기 위해 설계되었고 인터넷을 염두에 두지 않았다.
이처럼 일반적인 목적 언어에서 프로그래머가 어떠한 객체라도 복제 가능하다는 것은 이해할 수 있다.
그러므로 `clone()`은 루트 클래스인 `Object`에 위치하지만 `public` 메소드이므로 어떤 객체도 복제할 수 있다.
이것은 가장 융통성 있는 방법이지만 무엇이 나쁠까?
>
자바가 궁극적인 인터넷 프로그래밍 언어로 보여졌을 때 모든 것이 변했다.
그러나 보안 관련 문제들이 생겼고 객체 관련 보안 문제였다.
여러분은 아무나 여러분의 객체를 복제하길 원하지 않을 것이다.
그러므로 여러분이 보는 것은 원래의 간단하고 쉬운 설계에서 많은 패치가 가해진 상태이다.
현재 `clone()`은 `Object`에서 `protected` 이다.
`clone()`을 오버라이드해야 하고 `Cloneable`을 구현해야 하며 예외 처리를 해야 한다.
>
`Object`의 `clone()` 메소드는 실행 중에 `Cloneble`을 구현했는지를 확인하므로 `clone()` 메소드를 호출하는 경우에만 `Cloneable` 인터페이스를 구현해야 한다. 그러나 일관성 때문에(그리고 `Cloneable`은 비어 있다) 구현하는 것이 낫다.
[^bruce-1136]

### clone의 동작

>
`Object.clone()`은 새로운 객체용으로 충분한 메모리를 확보하기 위해 객체가 얼마나 큰 지를 알아내고 이전 객체에서 새로운 객체로 모든 비트를 복사한다.
이것을 비트와이즈 복사(bitwise copy)라고 하고 일반적으로는 `clone()` 메소드에서 수행하길 기대할 것이다.
그러나 `Object.clone()`이 연산을 수행하기 전 클래스가 `Cloneable` 한지를 확인하라(즉 `Cloneable` 인터페이스를 구현했는지를 확인하라). 그렇지 않다면 `Object.clone()`은 복제할 수 없다는 것을 알리는 `CloneNotSupportedException`을 던진다. 그러므로 `super.clone()`을 호출할 때 절대 발생할 리 없는(`Cloneable` 인터페이스를 구현했기 때문이다) 예외를 처리하도록 `try` 구문으로 감싸야 한다.
[^bruce-1123]

<span/>

>
클래스에서 `clone()`을 오버라이드할 때 `super.clone()`을 호출해서 `Object.clone()`이 호출되면 실제 어떤 일이 일어나는가?
루트 클래스에서 `clone()` 메소드는 정확한 저장 공간을 생성하고 원본 객체에서 새로운 객체의 저장 공간으로 비트 복사본을 만들 책임이 있다.
즉 단순히 저장 공간을 만들고 `Object`를 복사하는 것이 아니다. 실제 객체(기반 클래스 객체가 아닌 파생된 객체)의 크기를 알아내고 복사한다.
이 모든 작업이 루트 클래스(무엇이 상속되었는지를 알 수 없는)에 정의된 `clone()` 메소드에서 일어나기 때문에 복사될 실제 객체를 결정하는 프로세스에 RTTI가 포함된다는 것을 추측할 수 있다.
이 방법으로 `clone()` 메소드는 알맞은 양의 저장 공간을 생성하고 정확한 비트 복사를 수행 한다.
>
무엇을 하든 복제 프로세스의 첫 번째 부분은 일반적으로 super.clone()의 호출이다. 이것은 복제 연산에서 정확한 복제를 수행하도록 토대를 마련하는 것이다. 이 시점에서 복제를 완료하도록 필요한 다른 연산을 수행할 수 있다.
>
이러한 다른 연산들이 정확히 무엇인지를 알기 위해 Object.clone()이 하는 일을 정확히 이해해야 한다.
특히 "모든 참조의 대상을 자동으로 복제하는가?"도 이해해야 한다. 다음 예제는 이것을 테스트한다.
[^bruce-1124]

- 참고. RTTI: Run-Time Type Information

<span/>

>
모든 기반 클래스 연산(`Object.clone()`을 포함)을 수행하기 위해 복제 가능한 클래스에서 파생된 어느 클래스라도 `super.clone()`을 호출할 것이다.
이것은 여러분의 객체에서 모든 참조에 대한 `clone()`을 명시적으로 호출함으로써 이루어진다.
그렇지 않다면 참조 들은 원본 객체에 엘리어스될 것이다.
기반 클래스 생성자 호출, 그 다음 유도 클래스 생성자 호출, 가장 나중에 파생된 클래스 생성자 호출과 유사하다.
`clone()`은 생성자가 아니므로 자동적으로 호출되지 않는다는 것이 차이점이다.
[^bruce-1126]

### clone의 사용에 대해

다음은 앵겔 레너드의 책을 인용한 것이다.

>
`Object` 클래스는 `clone()`이라는 메서드를 지원한다.
이 메서드는 얕은 복사본을 생성할 때 유용하다(깊은 복사본도 생성할 수 있다).
이 메서드를 사용하려면 클래스에서 다음 단계를 따라야 한다.
>
> - `Cloneable` 인터페이스를 구현한다(이 인터페이스를 구현하지 않으면 `CloneNotSupportedException`이 발생한다).
> - `clone()` 메서드를 오버라이딩한다(`Object.clone()`은 `protected`다).
> - `super.clone()`을 호출한다.
>
`Cloneable` 인터페이스는 어떤 메서드도 포함하지 않는다.
JVM에 이 객체를 복제할 수 있다고 알릴 뿐이다.
인터페이스를 구현한 후에는 코드에서 `Object.clone()` 메서드를 오버라이딩해야 한다.
`Object.clone()`은 `protected`이기 때문에 super로 호출하려면 반드시 오버라이딩해야 한다.
자식 클래스에 `clone()`을 추가하면 모든 상위 클래스마다 `clone()` 메서드를 정의해야 `super.clone()`의 연쇄 호출이 실패하지 않으므로 이는 어떻게 보면 심각한 결점이다.
>
게다가 `Object.clone()`은 생성자를 호출하지 않으므로 개발자가 객체 생성을 제어할 수 없다.
>
> ```java
> public class Point implements Cloneable {
>   private double x;
>   private double y;
>
>   public Point(){}
>
>   public Point(double x, double y) {
>     this.x = x; this.y = y;
>   }
>
>   @Override
>   public Point clone() throws CloneNotSupportedException {
>     return (Point) super.clone();
>   }
>
>   // 게터와 세터
> }
> ```
>
> 다음과 같이 복제본을 생성한다.
> 
> ```java
> Point point = new Porint(...);
> Point clone = point.clone();
> ```
[^anghel-122]


브루스 에켈의 글도 읽어볼 만하다.

>
기반 클래스의 `clone()` 메소드는 일반적인 복제 연산처럼 **유도 클래스 객체**를 비트 복제하는 유용한 기능을 가진다.
그러나 복제 연산에 접근 가능하도록 `public`으로 만들어야 한다.
복제시 두 가지 중요 이슈가 있다.
>
> - `super.clone()`을 호출하라.
> - `clone()` 메소드를 `public`으로 만들어라.
>
여러분은 유도 클래스에서 `clone()`을 오버라이드하길 원할 것이다.
그렇지 않다면 현재 `public`인 `clone()`이 사용되고 올바로 작동하지 않을 것이다(비록 `Object.clone()`이 실제 객체의 복사본을 만들지라도 말이다).
`protected` 트릭은 복제 불가능한 클래스를 상속받고 그 클래스가 복제 능력을 갖길 원하는 경우에만 작동한다.
클래스에서 상속받은 어떠한 클래스에서라도 자바에는 파생시 메소드 접근을 막을 방법이 없으므로 `clone()` 메소드 문제를 호출 가능하다.
즉 클래스가 복제 가능하다면 복제 기능을 막는 메커니즘(잠시 후에 설명한다)을 이용하지 않는 한, 상속된 모든 클래스도 복제 가능하다.



### ArrayList의 clone은 왜 shallow copy를 하는가?

>
**객체 복제**
>
객체의 로컬 복사본을 만드는 가장 중요한 이유는 객체를 수정하고자 할 때 호출자의 객체를 수정하기를 원하지 않기 때문이다.
로컬 복사본을 만들고자 한다면 한 가지 해결책은 `clone()` 메소드를 이용하는 것이다.
이 메소드는 기반 클래스인 `Object`에서 `protected`로 정의되어 있고 복사를 원하는 유도 클래스에서는 `public`으로 오버라이드해야 한다.
예를 들어 표준 라이브러리 클래스인 `ArrayList`는 `clone()`을 오버라이드했으므로 `clone()` 메소드를 호출할 수 있다.
>
(중략)
>
`ArrayList`가 포함한 객체들에 `clone()`을 시도하지 않는 것은 그 객체들이 복제 가능(cloneable)한지 보장할 수 없기 때문이다.
[^bruce-1117]

### Cloneable 인터페이스에 대해

>
객체 복제 능력을 완성하기 위해 `Cloneable` 인터페이스를 구현하는 한 가지가 더 필요하다.
이 인터페이스는 비어있기 때문에 약간 이상할 것이다.
>
> ```java
> interface Cloneable {}
> ```
>
빈 인터페이스를 구현하는 이유는 `Cloneable`로 상향 캐스트하고 메소드 중 하나를 호출하려는 것은 아니다.
이러한 방법으로 인터페이스 사용하려는 것을 클래스 타입을 나타내는 플래그와 같이 행동하기 때문에 **태깅 인터페이스**(tagging interface)라고 한다.
>
-- Thinking in Java 3판. 부록A. 1120쪽.

## 함께 읽기

- [[/pattern/marker-interface#java.lang.Cloneable]]

## 참고문헌

- [javase 11 java.lang.Object.clone() (docs.oracle.com)]( https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/Object.html#clone() )
- [javase 17 java.lang.Object.clone() (docs.oracle.com)]( https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Object.html#clone() )
- [jdk8u share.vm.prims.jvm.cpp (hg.openjdk.java.net)]( https://hg.openjdk.java.net/jdk8u/jdk8u/hotspot/file/69087d08d473/src/share/vm/prims/jvm.cpp )
- 코딩 개념 잡는 자바 코딩 문제집 / 앵겔 레너드 저/심지현 역 / 길벗 / 2022년 09월 30일 / 원서 : Java Coding Problems

## 주석

[^anghel-122]: 코딩 개념 잡는 자바 코딩 문제집. 2장. 122쪽.
[^bruce-1117]: Thinking in Java 3판. 부록A. 1117쪽.
[^bruce-1118]: Thinking in Java 3판. 부록A. 1118쪽. 각주.
[^bruce-1123]: Thinking in Java 3판. 부록A. 1123쪽. 각주.
[^bruce-1124]: Thinking in Java 3판. 부록A. 1124쪽.
[^bruce-1126]: Thinking in Java 3판. 부록A. 1126쪽.
[^bruce-1136]: Thinking in Java 3판. 부록A. 1136쪽.
