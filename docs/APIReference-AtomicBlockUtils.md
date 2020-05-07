---
id: api-reference-atomic-block-utils
title: AtomicBlockUtils 原子块工具
---

`AtomicBlockUtils`模块是用于原子(atomic)块编辑的一组实用工具函数的static set(静态集合)。

一般情况下，这些方法都接受带有相关参数的`EditorState`对象，并返回`EditorState`对象。

## 静态方法

### `insertAtomicBlock()`

```js
insertAtomicBlock: function(
  editorState: EditorState,
  entityKey: string,
  character: string
): EditorState
```

### `moveAtomicBlock()`

```js
moveAtomicBlock: function(
  editorState: EditorState,
  atomicBlock: ContentBlock,
  targetRange: SelectionState,
  insertionMode?: DraftInsertionType
): EditorState
```
