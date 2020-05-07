---
id: api-reference-modifier
title: Modifier 修改器
---

`Modifier`模块是一组实用函数的static set(静态集合)，其中封装了`ContentState`对象上的常见编辑操作。
强烈建议您使用这些方法进行编辑操作

给定任何受影响实体的可变性类型，这些方法还应适当地删除或修改实体范围。

一般情况下，这些方法都接受带有相关参数的`ContentState`对象，并返回`ContentState`对象。
如果未实际执行编辑，则返回的`ContentState`将与输入对象相同

## 总览

_方法_

<ul class="apiIndex">
  <li>
    <a href="#replacetext">
      <pre>replaceText(...): ContentState</pre>
    </a>
  </li>
  <li>
    <a href="#inserttext">
      <pre>insertText(...): ContentState</pre>
    </a>
  </li>
  <li>
    <a href="#movetext">
      <pre>moveText(...): ContentState</pre>
    </a>
  </li>
  <li>
    <a href="#replacewithfragment">
      <pre>replaceWithFragment(...): ContentState</pre>
    </a>
  </li>
  <li>
    <a href="#removerange">
      <pre>removeRange(...): ContentState</pre>
    </a>
  </li>
  <li>
    <a href="#splitblock">
      <pre>splitBlock(...): ContentState</pre>
    </a>
  </li>
  <li>
    <a href="#applyinlinestyle">
      <pre>applyInlineStyle(...): ContentState</pre>
    </a>
  </li>
  <li>
    <a href="#removeinlinestyle">
      <pre>removeInlineStyle(...): ContentState</pre>
    </a>
  </li>
  <li>
    <a href="#setblocktype">
      <pre>setBlockType(...): ContentState</pre>
    </a>
  </li>
  <li>
    <a href="#setblockdata">
      <pre>setBlockData(...): ContentState</pre>
    </a>
  </li>
  <li>
    <a href="#mergeblockdata">
      <pre>mergeBlockData(...): ContentState</pre>
    </a>
  </li>
  <li>
    <a href="#applyentity">
      <pre>applyEntity(...): ContentState</pre>
    </a>
  </li>
</ul>

## 静态方法

### `replaceText()`

```js
replaceText(
  contentState: ContentState,
  rangeToReplace: SelectionState,
  text: string,
  inlineStyle?: DraftInlineStyle,
  entityKey?: ?string
): ContentState
```

用提供的字符串替换此`ContentState`的指定范围，并将内联样式和实体关键字应用于整个插入的字符串。

示例：在Facebook上，当用提及Abraham Lincoln的方式替换`@abraham lincoln`时，整个旧范围是要替换的目标，并且提及实体应应用于插入的字符串

### `insertText()`

```js
insertText(
  contentState: ContentState,
  targetRange: SelectionState,
  text: string,
  inlineStyle?: DraftInlineStyle,
  entityKey?: ?string
): ContentState
```

与`replaceText`相同，但强制将目标范围折叠，以便不替换任何字符。
这只是为了方便，因为文本编辑经常是插入而不是替换

### `moveText()`

```js
moveText(
  contentState: ContentState,
  removalRange: SelectionState,
  targetRange: SelectionState
): ContentState
```

将"removal(删除)"范围移动到"target"范围，替换目标文本。

### `replaceWithFragment()`

```js
replaceWithFragment(
  contentState: ContentState,
  targetRange: SelectionState,
  fragment: BlockMap
): ContentState
```

"fragment(片段)"是block map的一部分，实际上仅是`OrderedMap <string，ContentBlock>`与`ContentState`对象的完整block map大致相同。

此方法将用fragment(片段)替换"target"范围。

示例：粘贴内容时，我们将粘贴转换为片段以插入到编辑器中，然后使用此方法添加它。

### `removeRange()`

```js
removeRange(
  contentState: ContentState,
  rangeToRemove: SelectionState,
  removalDirection: DraftRemovalDirection
): ContentState
```

从编辑器中删除整个文本范围。
删除方向对于正确的实体删除行为很重要

### `splitBlock()`

```js
splitBlock(
  contentState: ContentState,
  selectionState: SelectionState
): ContentState
```

将选定的块分成两个块。
仅当selection处于折叠状态时才应使用

### `applyInlineStyle()`

```js
applyInlineStyle(
  contentState: ContentState,
  selectionState: SelectionState,
  inlineStyle: string
): ContentState
```

将指定的嵌入式样式应用于整个选定范围(selected range)。  

### `removeInlineStyle()`

```js
removeInlineStyle(
  contentState: ContentState,
  selectionState: SelectionState,
  inlineStyle: string
): ContentState
```

从整个选定范围中删除指定的嵌入式内联样式。

### `setBlockType()`

```js
setBlockType(
  contentState: ContentState,
  selectionState: SelectionState,
  blockType: DraftBlockType
): ContentState
```

设置所有选定块的块类型。

### `setBlockData()`

```js
setBlockData(
  contentState: ContentState,
  selectionState: SelectionState,
  blockData: Map<any, any>
): ContentState
```

设置所有选定块的块数据。

### `mergeBlockData()`

```js
mergeBlockData(
  contentState: ContentState,
  selectionState: SelectionState,
  blockData: Map<any, any>
): ContentState
```
更新所有选定块的块数据。

### `applyEntity()`

```js
applyEntity(
  contentState: ContentState,
  selectionState: SelectionState,
  entityKey: ?string
): ContentState
```

将实体应用于整个选定范围，或者如果`entityKey`为`null`，则从该范围中删除所有实体

