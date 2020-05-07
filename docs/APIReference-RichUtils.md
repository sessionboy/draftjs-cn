---
id: api-reference-rich-utils
title: RichUtils 
---

`RichUtils`模块是一组实用函数的静态set(集合)，用于富文本编辑

在每种情况下，这些方法都接受带有相关参数的`EditorState`对象，并返回`EditorState`对象。

## 静态方法

### `currentBlockContainsLink()`

```js
currentBlockContainsLink(
  editorState: EditorState
): boolean
```

### `getCurrentBlockType()`

```js
getCurrentBlockType(
  editorState: EditorState
): string
```

### `handleKeyCommand()`

```js
handleKeyCommand(
  editorState: EditorState,
  command: string
): ?EditorState
```

### `insertSoftNewline()`

```js
insertSoftNewline(
  editorState: EditorState
): EditorState
```

### `onBackspace()`

```js
onBackspace(
  editorState: EditorState
): EditorState?
```

### `onDelete()`

```js
onDelete(
  editorState: EditorState
): EditorState?
```

### `onTab()`

```js
onTab(
  event: SyntheticEvent,
  editorState: EditorState,
  maxDepth: integer
): EditorState
```

### `toggleBlockType()`

```js
toggleBlockType(
  editorState: EditorState,
  blockType: string
): EditorState
```

### `toggleCode()`

```js
toggleCode(
  editorState: EditorState
): EditorState
```

### `toggleInlineStyle()`

```js
toggleInlineStyle(
  editorState: EditorState,
  inlineStyle: string
): EditorState
```

切换选择的指定内联样式。
如果用户的选择已折叠(collapsed)，请应用或删除内部状态的样式。
如果未折叠(not collapsed)，则将更改直接应用于文档状态

### `toggleLink()`

```js
toggleLink(
  editorState: EditorState,
  targetSelection: SelectionState,
  entityKey: string
): EditorState
```

### `tryToRemoveBlockStyle()`

```js
tryToRemoveBlockStyle(
  editorState: EditorState
): ContentState?
```
