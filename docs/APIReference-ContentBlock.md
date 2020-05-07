---
id: api-reference-content-block
title: ContentBlock 内容块
---

ContentBlock是Immutable
[Record](http://facebook.github.io/immutable-js/docs/#/Record/Record)，表示单个编辑器内容块的完整状态，包括

- 块的纯文本内容
- 类型, 例如paragraph, header, list item (段落，标题，列表项)
- 实体，内联样式和depth(深度)信息

`ContentState`对象包含这些`ContentBlock`对象的`OrderedMap`，它们一起构成编辑器的全部内容。

`ContentBlock`对象在很大程度上类似于块级HTML元素，例如段落和列表项。
可用的类型有：

- unstyled  (未样式化)
- paragraph
- header-one
- header-two
- header-three
- header-four
- header-five
- header-six
- unordered-list-item  (无序列表)
- ordered-list-item (有序列表)
- blockquote (块引用)
- code-block (代码块)
- atomic (原子)

可以使用构造函数直接创建新的`ContentBlock`对象。
预期记录值将在下面详细说明。

### 表示样式和实体

`characterList`字段是一个immutable `List`，其中包含该块中每个字符的`CharacterMetadata`对象。
这就是我们如何编码给定块的样式和实体。

通过大量使用这些列表和`CharacterMetadata`对象的不变性和数据持久性，对内容的编辑通常对编辑器的内存占用影响很小。

通过以这种方式一起编码内联样式和实体，在`ContentBlock上`执行编辑的函数可以在单个List对象上执行slices, concats和其他`List`方法。

当创建一个新的包含文本但不包含`characterList`的`ContentBlock`时，它将默认为提供的文本带有空`CharacterMetadata`的`characterList`。

## 总览

_方法_

<ul class="apiIndex">
  <li>
    <a href="#getkey">
      <pre>getKey(): string</pre>
    </a>
  </li>
  <li>
    <a href="#gettype">
      <pre>getType(): DraftBlockType</pre>
    </a>
  </li>
  <li>
    <a href="#gettext">
      <pre>getText(): string</pre>
    </a>
  </li>
  <li>
    <a href="#getcharacterlist">
      <pre>getCharacterList(): List&lt;CharacterMetadata&gt;</pre>
    </a>
  </li>
  <li>
    <a href="#getlength">
      <pre>getLength(): number</pre>
    </a>
  </li>
  <li>
    <a href="#getdepth">
      <pre>getDepth(): number</pre>
    </a>
  </li>
  <li>
    <a href="#getinlinestyleat">
      <pre>getInlineStyleAt(offset: number): DraftInlineStyle</pre>
    </a>
  </li>
  <li>
    <a href="#getentityat">
      <pre>getEntityAt(offset: number): ?string</pre>
    </a>
  </li>
  <li>
    <a href="#getdata">
      <pre>getData(): Map&lt;any, any&gt;</pre>
    </a>
  </li>
  <li>
    <a href="#findstyleranges">
      <pre>findStyleRanges(filterFn: Function, callback: Function): void</pre>
    </a>
  </li>
  <li>
    <a href="#findentityranges">
      <pre>findEntityRanges(filterFn: Function, callback: Function): void</pre>
    </a>
  </li>
</ul>

_属性_

> 注意
>
> 将[Immutable Map API](http://facebook.github.io/immutable-js/docs/#/Map)用于`ContentBlock`构造函数或设置属性

<ul class="apiIndex">
  <li>
    <a href="#key">
      <pre>key: string</pre>
    </a>
  </li>
  <li>
    <a href="#type">
      <pre>type: DraftBlockType</pre>
    </a>
  </li>
  <li>
    <a href="#text">
      <pre>text: string</pre>
    </a>
  </li>
  <li>
    <a href="#characterlist">
      <pre>characterList: List&lt;CharacterMetadata&gt;</pre>
    </a>
  </li>
  <li>
    <a href="#depth">
      <pre>depth: number</pre>
    </a>
  </li>
  <li>
    <a href="#data">
      <pre>data: Map&lt;any, any&gt;</pre>
    </a>
  </li>
</ul>

## 方法

### `getKey()`

```js
getKey(): string
```

返回此`ContentBlock`的字符串键。
Block keys(块的键)是字母数字字符串。
建议使用`generateRandomKey`生成块密钥。

### `getType()`

```js
getType(): DraftBlockType
```
返回此`ContentBlock`的类型。
类型值在很大程度上类似于块级HTML元素。

### `getText()`

```js
getText(): string
```
返回此`ContentBlock`的纯文本。
此值不包含任何样式，装饰或HTML信息。

### `getCharacterList()`

```js
getCharacterList(): List<CharacterMetadata>
```
返回一个`CharacterMetadata`对象的immutable `List`(不可变列表)，`ContentBlock`中的每个字符。
（有关详细信息，请参见[CharacterMetadata](/docs/api-reference-character-metadata)。）

该列表包含该块的所有样式和实体信息。

### `getLength()`

```js
getLength(): number
```

返回`ContentBlock`的纯文本长度。

该值使用标准的JavaScript `length`属性作为字符串，因此不支持Unicode-代理对将被视为两个字符。

### `getDepth()`

```js
getDepth(): number
```
返回此块的depth value(深度值)（如果有）。
当前仅用于列表项。

### `getInlineStyleAt()`

```js
getInlineStyleAt(offset: number): DraftInlineStyle
```

返回此`ContentBlock`中给定偏移量的`DraftInlineStyle`值（一个`OrderedSet <string>`）。

### `getEntityAt()`

```js
getEntityAt(offset: number): ?string
```

返回此`ContentBlock`中给定偏移量的实体键值（如果没有，则返回`null`）

### `getData()`

```js
getData(): Map<any, any>
```

返回块级元数据。

### `findStyleRanges()`

```js
findStyleRanges(
  filterFn: (value: CharacterMetadata) => boolean,
  callback: (start: number, end: number) => void
): void
```

为该`ContentBlock`中的每个连续样式范围执行一个回调。

### `findEntityRanges()`

```js
findEntityRanges(
  filterFn: (value: CharacterMetadata) => boolean,
  callback: (start: number, end: number) => void
): void
```
为该`ContentBlock`中每个连续范围的实体执行一个回调。

## 属性

> 注意
>
> 将[Immutable Map API](http://facebook.github.io/immutable-js/docs/#/Map)用于`ContentBlock`构造函数或设置属性。

### `key`

查看`getKey()`.

### `text`

查看`getText()`.

### `type`

查看`getType()`.

### `characterList`

查看`getCharacterList()`.

### `depth`

查看`getDepth()`.

### `data`

查看`getData()`.
