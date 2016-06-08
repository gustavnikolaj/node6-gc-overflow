Reproducible with

```
$ node --max-old-space-size=6000 index.js 4000
```


```
 $ nvm use 5.11.0 && node --max-old-space-size=6000 index.js 4000
Now using node v5.11.0 (npm v3.8.6)
DONE!
 $ nvm use 6.2.1 && node --max-old-space-size=6000 index.js 4000
Now using node v6.2.1 (npm v3.9.3)


#
# Fatal error in ../deps/v8/src/heap/spaces.h, line 1516
# Check failed: size_ >= 0.
#

==== C stack trace ===============================

1: V8_Fatal
2: 0xc56387
3: v8::internal::MarkCompactCollector::SweepSpaces()
4: v8::internal::MarkCompactCollector::CollectGarbage()
5: v8::internal::Heap::MarkCompact()
6: v8::internal::Heap::PerformGarbageCollection(v8::internal::GarbageCollector, v8::GCCallbackFlags)
7: v8::internal::Heap::CollectGarbage(v8::internal::GarbageCollector, char const*, char const*, v8::GCCallbackFlags)
8: v8::internal::Heap::HandleGCRequest()
9: v8::internal::StackGuard::HandleInterrupts()
10: v8::internal::Runtime_StackGuard(int, v8::internal::Object**, v8::internal::Isolate*)
11: 0xf767a506338
Illegal instruction
```
