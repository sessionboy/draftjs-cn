---
id: api-reference-character-metadata
title: CharacterMetadata 字符元数据
---

`CharacterMetadata`是一个Immutable
[Record](http://facebook.github.io/immutable-js/docs/#/Record/Record)，代表单个字符的内联样式和实体信息。

`CharacterMetadata`对象被主动合并和共享。
如果两个字符具有相同的内联样式和实体，则它们将使用相同的`CharacterMetadata`对象表示。
因此，我们仅需要与利用内联样式集和实体键的组合一样多的对象，即使内容的大小和复杂性增加，也可以使我们的内存占用空间较小。

为此，您应该通过提供的一组静态方法创建或将更改应用于`CharacterMetadata`对象，这将确保利用pooling。

大多数`Draft`用例不太可能使用这些静态方法，因为大多数常用的编辑操作已经实现，并且可以通过实用程序模块使用。
但是，`getter`方法可能会在渲染时派上用场

有关如何在`ContentBlock`中使用`CharacterMetadata`的信息，请参阅[ContentBlock](/docs/api-reference-content-block#representing-styles-and-entities)上的API参考。

## 总览

_静态方法_

<ul class="apiIndex">
  <li>
    <a href="#create">
      <pre>static create(...): CharacterMetadata</pre>
    </a>
  </li>
  <li>
    <a href="#applystyle">
      <pre>static applyStyle(...): CharacterMetadata</pre>
    </a>
  </li>
  <li>
    <a href="#removestyle">
      <pre>static removeStyle(...): CharacterMetadata</pre>
    </a>
  </li>
  <li>
    <a href="#applyentity">
      <pre>static applyEntity(...): CharacterMetadata</pre>
    </a>
  </li>
</ul>

_方法_

<ul class="apiIndex">
  <li>
    <a href="#getstyle">
      <pre>getStyle(): DraftInlineStyle</pre>
    </a>
  </li>
  <li>
    <a href="#hasstyle">
      <pre>hasStyle(style: string): boolean</pre>
    </a>
  </li>
  <li>
    <a href="#getentity">
      <pre>getEntity(): ?string</pre>
    </a>
  </li>
</ul>

## 静态方法

在幕后，这些方法将利用pooling来返回匹配的对象，或者如果不存在则返回新的对象。

### `create()`

```js
static create(config?: CharacterMetadataConfig): CharacterMetadata
```
根据提供的配置生成`CharacterMetadata`对象。
应该使用该函数代替构造函数。

该配置将用于检查此配置的pooled匹配项是否已经存在。
如果是这样，则将返回合并的对象。
否则，将为此配置合并一个新的`CharacterMetadata`并返回

### `applyStyle()`

```js
static applyStyle(
  record: CharacterMetadata,
  style: string
): CharacterMetadata
```
将内联样式应用于此`CharacterMetadata`。

### `removeStyle()`

```js
static removeStyle(
  record: CharacterMetadata,
  style: string
): CharacterMetadata
```
从此`CharacterMetadata`中删除一个内联样式。

### `applyEntity()`

```js
static applyEntity(
  record: CharacterMetadata,
  entityKey: ?string
): CharacterMetadata
```

在此`CharacterMetadata`上应用entity key-或提供`null`以删除entity key

## 方法

### `getStyle()`

```js
getStyle(): DraftInlineStyle
```

返回此字符的`DraftInlineStyle`，这是一个`OrderedSet`字符串，表示要在渲染时应用于该字符的嵌入式样式。

### `hasStyle()`

```js
hasStyle(style: string): boolean
```
返回此字符是否具有指定的样式。

### `getEntity()`

```js
getEntity(): ?string
```

返回此字符的entity key(实体键)（如果有的话），映射到[`Entity`](https://github.com/facebook/draft-js/blob/master/src/model/entity/DraftEntity.js)模块跟踪的实体的全局集合。

通过在此处跟踪字符串键，我们可以将相应的元数据与字符表示形式分开

如果为null，则没有实体适用于此字符。
