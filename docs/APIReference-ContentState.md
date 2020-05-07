---
id: api-reference-content-state
title: ContentState 内容状态
---

ContentState是一个Immutable
[Record](http://facebook.github.io/immutable-js/docs/#/Record/Record)，表示以下各项的完整状态：

- 编辑器的全部**内容**：文本，块和内联样式以及实体范围(entity ranges)
- 编辑器的两种**selection states**：呈现这些内容之前和之后。

`ContentState`对象的最常见用法是通过`EditorState.getCurrentContent()`，它提供了当前在编辑器中呈现的`ContentState`。

`EditorState`对象维护由`ContentState`对象组成的撤消和重做堆栈。

## 总览

_静态方法_

<ul class="apiIndex">
  <li>
    <a href="#createfromtext">
      <pre>static createFromText(text: string): ContentState</pre>
    </a>
  </li>
  <li>
    <a href="#createfromblockarray">
      <pre>static createFromBlockArray(blocks: Array&lt;ContentBlock&gt;): ContentState</pre>
    </a>
  </li>
</ul>

_方法_

<ul class="apiIndex">
  <li>
    <a href="#getentitymap">
      <pre>getEntityMap()</pre>
    </a>
  </li>
  <li>
    <a href="#getblockmap">
      <pre>getBlockMap()</pre>
    </a>
  </li>
  <li>
    <a href="#getselectionbefore">
      <pre>getSelectionBefore()</pre>
    </a>
  </li>
  <li>
    <a href="#getselectionafter">
      <pre>getSelectionAfter()</pre>
    </a>
  </li>
  <li>
    <a href="#getblockforkey">
      <pre>getBlockForKey(key)</pre>
    </a>
  </li>
  <li>
    <a href="#getkeybefore">
      <pre>getKeyBefore(key)</pre>
    </a>
  </li>
  <li>
    <a href="#getkeyafter">
      <pre>getKeyAfter(key)</pre>
    </a>
  </li>
  <li>
    <a href="#getblockbefore">
      <pre>getBlockBefore(key)</pre>
    </a>
  </li>
  <li>
    <a href="#getblockafter">
      <pre>getBlockAfter(key)</pre>
    </a>
  </li>
  <li>
    <a href="#getblocksasarray">
      <pre>getBlocksAsArray()</pre>
    </a>
  </li>
  <li>
    <a href="#getfirstblock">
      <pre>getFirstBlock()</pre>
    </a>
  </li>
  <li>
    <a href="#getlastblock">
      <pre>getLastBlock()</pre>
    </a>
  </li>
  <li>
    <a href="#getplaintext">
      <pre>getPlainText(delimiter)</pre>
    </a>
  </li>
  <li>
    <a href="#getlastcreatedentitykey">
      <pre>getLastCreatedEntityKey()</pre>
    </a>
  </li>
  <li>
    <a href="#hastext">
      <pre>hasText()</pre>
    </a>
  </li>
  <li>
    <a href="#createentity">
      <pre>createEntity(...)</pre>
    </a>
  </li>
  <li>
    <a href="#getentity">
      <pre>getEntity(...)</pre>
    </a>
  </li>
  <li>
    <a href="#mergeentitydata">
      <pre>mergeEntityData(...)</pre>
    </a>
  </li>
  <li>
    <a href="#replaceentitydata">
      <pre>replaceEntityData(...)</pre>
    </a>
  </li>
  <li>
    <a href="#addentity">
      <pre>addEntity(...)</pre>
    </a>
  </li>
</ul>

_属性_

> 使用[Immutable Map API](http://facebook.github.io/immutable-js/docs/#/Map)设置属性。
>
> **例子**
>
> ```js
> const editorState = EditorState.createEmpty();
> const contentState = editorState.getCurrentContent();
> const contentStateWithSelectionBefore = contentState.set(
>   'selectionBefore',
>   SelectionState.createEmpty(contentState.getBlockForKey('1pu4d')),
> );
> ```

<ul class="apiIndex">
  <li>
    <a href="#blockmap">
      <pre>blockMap</pre>
    </a>
  </li>
  <li>
    <a href="#selectionbefore">
      <pre>selectionBefore</pre>
    </a>
  </li>
  <li>
    <a href="#selectionafter">
      <pre>selectionAfter</pre>
    </a>
  </li>
</ul>

## 静态方法

### `createFromText()`

```js
static createFromText(
  text: string,
  delimiter?: string
): ContentState
```

从字符串生成`ContentState`，并使用delimiter(定界符)将字符串拆分为`ContentBlock`对象。
如果未提供定界符，则使用`'\n'`。

### `createFromBlockArray()`

```js
static createFromBlockArray(
  blocks: Array<ContentBlock>,
  entityMap: ?OrderedMap
): ContentState
```

从`ContentBlock`对象数组生成`ContentState`。
默认的`selectionBefore`和`selectionAfter`状态将光标置于内容的开头。

## 方法

### `getEntityMap()`

```js
getEntityMap(): EntityMap
```

返回一个包含所有已创建的`DraftEntity`记录的对象库。
在即将发布的v0.11.0中，返回的map(映射)将是`DraftEntity`记录的Immutable ordered map(Immutable有序映射)。

在大多数情况下，您应该能够使用下面的便捷方法来定位特定的`DraftEntity`记录或获取有关内容状态的信息。

### `getBlockMap()`

```js
getBlockMap(): BlockMap
```

返回表示整个文档状态的`ContentBlock`对象的完整顺序图。

在大多数情况下，您应该能够使用下面的便捷方法来定位特定的`ContentBlock`对象或获取有关内容状态的信息。

### `getSelectionBefore()`

```js
getSelectionBefore(): SelectionState
```

返回呈现`blockMap`之前在编辑器中显示的`SelectionState`

在编辑器中执行撤消操作时，当前`ContentState`的`selectionBefore`用于将selection range(选择范围)放置在适当的位置。

### `getSelectionAfter()`

```js
getSelectionAfter(): SelectionState
```

返回呈现`blockMap`后在编辑器中显示的`SelectionState`。

当在编辑器中执行导致呈现此`blockMap`的任何操作时，选择范围将放置在`selectionAfter`位置。

### `getBlockForKey()`

```js
getBlockForKey(key: string): ContentBlock
```
返回与给定块键相对应的`ContentBlock`。

#### 例子

```js
var {editorState} = this.state;
var startKey = editorState.getSelection().getStartKey();
var selectedBlockType = editorState
  .getCurrentContent()
  .getBlockForKey(startKey)
  .getType();
```

### `getKeyBefore()`

```js
getKeyBefore(key: string): ?string
```
返回`blockMap`中指定键之前的键；如果这是第一个键，则返回`null`。

### `getKeyAfter()`

```js
getKeyAfter(key: string): ?string
```
在`blockMap`中指定键之后返回键；如果这是最后一个键，则返回`null`。

### `getBlockBefore()`

```js
getBlockBefore(key: string): ?ContentBlock
```
在`blockMap`中指定键之前返回`ContentBlock`；如果这是第一个键，则返回`null`。

### `getBlockAfter()`

```js
getBlockAfter(key: string): ?ContentBlock
```
在`blockMap`中指定键之后返回`ContentBlock`；如果这是最后一个键，则返回`null`。

### `getBlocksAsArray()`

```js
getBlocksAsArray(): Array<ContentBlock>
```

以数组形式返回`blockMap`的值。

通常不需要使用此方法，因为`getBlockMap`提供了应该用于迭代的`OrderedMap`。

### `getFirstBlock()`

```js
getFirstBlock(): ContentBlock
```
返回第一个`ContentBlock`。

### `getLastBlock()`

```js
getLastBlock(): ContentBlock
```
返回最后一个`ContentBlock`。

### `getPlainText()`

```js
getPlainText(delimiter?: string): string
```
返回内容的完整纯文本值，并带有delimiter(定界符)。
如果未指定分隔符，则使用换行符（`\u000A`）。

### `getLastCreatedEntityKey()`

```js
getLastCreatedEntityKey(): string
```
返回可用于引用最近创建的`DraftEntity`记录的字符串键。
这是因为实体是通过`ContentState`中的字符串键引用的。
应在`CharacterMetadata`对象中使用字符串值来跟踪带注释字符的实体

### `hasText()`

```js
hasText(): boolean
```
返回内容是否完全包含任何文本。

### `createEntity()`

```js
createEntity(
  type: DraftEntityType,
  mutability: DraftEntityMutability,
  data?: Object
): ContentState
```

返回已更新的`ContentState`记录，以将新创建​​的`DraftEntity`记录包含在`EntityMap`中。
调用`getLastCreatedEntityKey`以获取新创建的`DraftEntity`记录的键。

### `getEntity()`

```js
getEntity(key: string): DraftEntityInstance
```

返回指定键的`DraftEntityInstance`。
如果该键不存在实例，则抛出该异常。

### `mergeEntityData()`

```js
mergeEntityData(
  key: string,
  toMerge: {[key: string]: any}
): ContentState
```

由于`DraftEntityInstance`对象是immutable(不可变的)，因此您无法通过典型的可变方式来更新实体的元数据。

mergeData方法允许您将更新应用于指定的实体。

### `replaceEntityData()`

```js
replaceEntityData(
  key: string,
  newData: {[key: string]: any}
): ContentState
```
`replaceData`方法与`mergeData`方法类似，不同之处在于它将完全丢弃实例的现有数据值并将其替换为指定的`newData`。

### `addEntity()`

```js
addEntity(instance: DraftEntityInstance): ContentState
```

在大多数情况下，您将使用`contentState.createEntity()`。
这是一种便捷的方法，在典型的“草稿”用法中您可能不需要。

在已经创建实例并且现在需要将其添加到实体存储的情况下，添加功能很有用。
如果要恢复`ContentState`的原始JavaScript表示以进行编辑，则可能会发生这种情况。

## 属性

使用[Immutable Map API](http://facebook.github.io/immutable-js/docs/#/Map)设置属性。.

### `blockMap`

查看`getBlockMap()`.

### `selectionBefore`

查看`getSelectionBefore()`.

### `selectionAfter`

查看`getSelectionAfter()`.
