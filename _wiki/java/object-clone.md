---
layout  : wiki
title   : java.lang.Object.clone 메소드
summary : 
date    : 2022-11-19 12:08:15 +0900
updated : 2022-11-19 12:32:45 +0900
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


## jvm.cpp의 native code

`Obejct.clone`이 `native`이기 때문에 소스코드는 `jvm.cpp`에 읽어볼 수 있다.

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

