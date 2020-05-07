---
id: api-reference-selection-state
title: SelectionState 选择状态
---

`SelectionState`是一个Immutable [Record](http://facebook.github.io/immutable-js/docs/#/Record/Record)，表示编辑器中的选择范围。

`SelectionState`对象的最常见用法是`EditorState.getSelection()`，它提供了当前在编辑器中渲染的SelectionState。

### Keys and Offsets 键和偏移

选择范围有两点：**anchor** 和 **focus** (锚点和焦点)。
（了解有关[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Selection#Glossary)的更多信息）

原生DOM方法将每个点表示为一个Node/offset(节点/偏移)对，其中偏移是一个数字，它对应于节点的`childNodes`中的位置，或者，如果节点是文本节点，则是文本内容内的字符偏移。

由于Draft使用`ContentBlock`对象维护编辑器的内容，因此我们可以使用我们自己的模型来表示这些点。
因此，选择点将作为key/offset(键/偏移)对进行跟踪，其中键值是`ContentBlock`的键，该点位于该位置，而`offset`值(偏移值)是块内的字符偏移

### Start/End vs. Anchor/Focus 开始/结束 和 锚点/焦点

在浏览器中实际渲染选择状态时，**anchor** 和 **focus**的概念非常有用，因为它允许我们根据需要使用前向和后向选择。
但是，对于编辑操作，选择的方向无关紧要。
在这种情况下，考虑**start** 和 **end**是更合适的

因此，`SelectionState`公开anchor/focus的值和start/end的值。
在管理选择行为时，建议您使用anchor和focus(锚点和焦点)值来保持选择方向。
但是，在管理内容操作时，我们建议您使用start和end(开始和结束)值。

例如，在基于`SelectionState`从块中提取文本片段时，selection(选择)是否向后无关紧要：

```js
var selectionState = editorState.getSelection();
var anchorKey = selectionState.getAnchorKey();
var currentContent = editorState.getCurrentContent();
var currentContentBlock = currentContent.getBlockForKey(anchorKey);
var start = selectionState.getStartOffset();
var end = selectionState.getEndOffset();
var selectedText = currentContentBlock.getText().slice(start, end);
```

请注意，`SelectionState`本身仅跟踪锚点和焦点值。
得出起始值和结束值。

## 总览

_静态方法_

<ul class="apiIndex">
  <li>
    <a href="#createempty">
      <pre>static createEmpty(blockKey)</pre>
    </a>
  </li>
</ul>

_方法_

<ul class="apiIndex">
  <li>
    <a href="#getstartkey">
      <pre>getStartKey()</pre>
    </a>
  </li>
  <li>
    <a href="#getstartoffset">
      <pre>getStartOffset()</pre>
    </a>
  </li>
  <li>
    <a href="#getendkey">
      <pre>getEndKey()</pre>
    </a>
  </li>
  <li>
    <a href="#getendoffset">
      <pre>getEndOffset()</pre>
    </a>
  </li>
  <li>
    <a href="#getanchorkey">
      <pre>getAnchorKey()</pre>
    </a>
  </li>
  <li>
    <a href="#getanchoroffset">
      <pre>getAnchorOffset()</pre>
    </a>
  </li>
  <li>
    <a href="#getfocuskey">
      <pre>getFocusKey()</pre>
    </a>
  </li>
  <li>
    <a href="#getfocusoffset">
      <pre>getFocusOffset()</pre>
    </a>
  </li>
  <li>
    <a href="#getisbackward">
      <pre>getIsBackward()</pre>
    </a>
  </li>
  <li>
    <a href="#gethasfocus">
      <pre>getHasFocus()</pre>
    </a>
  </li>
  <li>
    <a href="#iscollapsed">
      <pre>isCollapsed()</pre>
    </a>
  </li>
  <li>
    <a href="#hasedgewithin">
      <pre>hasEdgeWithin(blockKey, start, end)</pre>
    </a>
  </li>
  <li>
    <a href="#serialize">
      <pre>serialize()</pre>
    </a>
  </li>
</ul>

_属性_

> 使用[Immutable Map API](http://facebook.github.io/immutable-js/docs/#/Record/Record) 设置属性。
>
> **例子**
>
> ```js
> const selectionState = SelectionState.createEmpty();
> const selectionStateWithNewFocusOffset = selection.set('focusOffset', 1);
> ```

<ul class="apiIndex">
  <li>
    <a href="#anchorkey">
      <pre>anchorKey</pre>
    </a>
  </li>
  <li>
    <a href="#anchoroffset">
      <pre>anchorOffset</pre>
    </a>
  </li>
  <li>
    <a href="#focuskey">
      <pre>focusKey</pre>
    </a>
  </li>
  <li>
    <a href="#focusoffset">
      <pre>focusOffset</pre>
    </a>
  </li>
  <li>
    <a href="#isbackward">
      <pre>isBackward</pre>
    </a>
  </li>
  <li>
    <a href="#hasfocus">
      <pre>hasFocus</pre>
    </a>
  </li>
</ul>

## 静态方法

### `createEmpty()`

```js
createEmpty(blockKey: string): SelectionState
```

在提供的块键的零偏移处创建一个`SelectionState`对象，并将`hasFocus`设置为`false`。

## 方法

### `getStartKey()`

```js
getStartKey(): string
```

返回包含选择范围开始位置的块的键。

### `getStartOffset()`

```js
getStartOffset(): number
```
返回选择范围开始位置的块级字符偏移量。

### `getEndKey()`

```js
getEndKey(): string
```
返回包含选择范围结束位置的块的键。

### `getEndOffset()`

```js
getEndOffset(): number
```

返回选择范围结束位置的块级字符偏移量

### `getAnchorKey()`

```js
getAnchorKey(): string
```

返回包含选择范围anchor(锚点)位置的块的键

### `getAnchorOffset()`

```js
getAnchorOffset(): number
```

返回选择范围的锚点位置的块级字符偏移量

### `getFocusKey()`

```js
getFocusKey(): string
```
返回包含选择范围焦点位置的块的键

### `getFocusOffset()`

```js
getFocusOffset(): number
```
返回选择范围焦点位置的块级字符偏移量

### `getIsBackward()`

```js
getIsBackward(): boolean
```

返回焦点位置是否在文档中的锚点位置之前

这必须从active(活动的) `ContentState`的键顺序得出，或者如果选择范围完全在一个块内，则比较锚点和焦点偏移值

### `getHasFocus()`

```js
getHasFocus(): boolean
```
返回编辑器是否具有焦点。

### `isCollapsed()`

```js
isCollapsed(): boolean
```

返回选择范围是否折叠，即插入符号。
当anchor键和focus键相同 /和/ anchor键和focus offsets(焦点偏移量)相同时，这是正确的

### `hasEdgeWithin()`

```js
hasEdgeWithin(blockKey: string, start: number, end: number): boolean
```

返回选择范围是否具有与给定块内指定的开始/结束范围重叠的边。

在渲染内容后在块内设置DOM选择时，此功能很有用。

### `serialize()`

```js
serialize(): string
```

返回`SelectionState`的序列化版本。
对调试有用

## 属性

> 使用[Immutable Map API](http://facebook.github.io/immutable-js/docs/#/Record/Record) 设置属性。

```js
var selectionState = SelectionState.createEmpty('foo');
var updatedSelection = selectionState.merge({
  focusKey: 'bar',
  focusOffset: 0,
});
var anchorKey = updatedSelection.getAnchorKey(); // 'foo'
var focusKey = updatedSelection.getFocusKey(); // 'bar'
```

### `anchorKey`

包含选择范围anchor end(锚端)的块。

### `anchorOffset`

选择范围的锚端的偏移位置。

### `focusKey`

包含选择范围焦点结束的块

### `focusOffset`

选择范围的焦点末端的偏移位置。

### `isBackward`

如果锚点位置在文档中比焦点位置低，则选择向后。
注意：`SelectionState`是一个不知道`ContentState`结构的对象。
因此，在更新`SelectionState`值时，您还要负责更新`isBackward`。

### `hasFocus`

编辑器当前是否具有焦点。
