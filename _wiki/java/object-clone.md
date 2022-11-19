---
layout  : wiki
title   : java.lang.Object.clone 메소드
summary : 
date    : 2022-11-19 12:08:15 +0900
updated : 2022-11-19 13:10:32 +0900
tag     : java
toc     : true
public  : true
parent  : [[/java]]
latex   : false
---
* TOC
{:toc}

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

`fixup_cloned_reference` 함수를 보면 된다.

[jdk8u hotspot share.vm.prims.jvm.cpp]( https://hg.openjdk.java.net/jdk8u/jdk8u/hotspot/file/69087d08d473/src/share/vm/prims/jvm.cpp#l651 )

```cpp
static void fixup_cloned_reference(ReferenceType ref_type, oop src, oop clone) {
  // If G1 is enabled then we need to register a non-null referent
  // with the SATB barrier.
#if INCLUDE_ALL_GCS
  if (UseG1GC) {
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
  if (obj->is_array()) {
    guarantee(klass->is_cloneable(), "all arrays are cloneable");
  } else {
    guarantee(obj->is_instance(), "should be instanceOop");
    bool cloneable = klass->is_subtype_of(SystemDictionary::Cloneable_klass());
    guarantee(cloneable == klass->is_cloneable(), "incorrect cloneable flag");
  }
#endif

  // Check if class of obj supports the Cloneable interface.
  // All arrays are considered to be cloneable (See JLS 20.1.5)
  if (!klass->is_cloneable()) {
    ResourceMark rm(THREAD);
    THROW_MSG_0(vmSymbols::java_lang_CloneNotSupportedException(), klass->external_name());
  }

  // Make shallow object copy
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
// Check if class of obj supports the Cloneable interface.
// All arrays are considered to be cloneable (See JLS 20.1.5)
if (!klass->is_cloneable()) {
  ResourceMark rm(THREAD);
  THROW_MSG_0(vmSymbols::java_lang_CloneNotSupportedException(), klass->external_name());
}
```

## 함께 읽기

- [[/pattern/marker-interface#java.lang.Cloneable]]

## 참고문헌

- [javase 11 java.lang.Object.clone() (docs.oracle.com)]( https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/Object.html#clone() )
- [javase 17 java.lang.Object.clone() (docs.oracle.com)]( https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Object.html#clone() )
- [jdk8u share.vm.prims.jvm.cpp (hg.openjdk.java.net)]( https://hg.openjdk.java.net/jdk8u/jdk8u/hotspot/file/69087d08d473/src/share/vm/prims/jvm.cpp )

