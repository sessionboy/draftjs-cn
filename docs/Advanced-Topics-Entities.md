---
id: advanced-topics-entities
title: Entities 实体
---

本文讨论了Entity系统，Draft使用该系统对带有元数据的文本范围进行注释。
实体在样式文本之外引入了丰富程度。
链接，提及和嵌入式内容都可以使用实体来实现。  

在草稿存储库中，[link(链接)编辑器](https://github.com/facebook/draft-js/tree/master/examples/draft-0-10-0/link)和[entity demo](https://github.com/facebook/draft-js/tree/master/examples/draft-0-10-0/entity)提供了实时代码示例，以帮助阐明实体的使用方式及其内置行为。  

[Entity API参考](/docs/api-reference-entity)提供了有关在创建，检索或更新实体对象时要使用的静态方法的详细信息。  

有关Entity API的最新更改的信息，以及有关如何更新应用程序的示例，请参见我们的[v0.10 API迁移指南](/docs/v0-10-api-migration#content)。

## 介绍

实体(entity)是代表Draft编辑器中一系列文本的元数据的对象。
它具有三个属性

- **type(类型)**: 表示实体类型的字符串，例如`'LINK'`, `'MENTION'`, `'PHOTO'`。(“链接”，“提及”，“照片”)。
- **mutability(可变性)**:不要与la `immutable-js`的不可变性混淆，此属性表示在编辑器中编辑文本范围时，用此实体对象注释的文本范围的行为。这将在下面更详细地讨论。
- **data**: 包含实体元数据的可选对象。例如，`“LINK”`实体可能包含一个数据对象，该数据对象包含该链接的href值。

所有实体都存储在`ContentState`记录中。
在`ContentState`和React组件内的键引用这些实体，以装饰带注释的范围。
（我们目前不建议使用以前的用于访问实体的API；请参阅问题[#839](https://github.com/facebook/draft-js/issues/839)。）

使用[decorators(装饰器)](/docs/advanced-topics-decorators)或[自定义块组件](/docs/advanced-topics-block-components)，您可以基于实体元数据向编辑器添加丰富的渲染

## 创建和检索实体

实体应使用`contentState.createEntity`创建，该实体接受上面的三个属性作为参数。
此方法返回更新的`ContentState`记录以包括新创建的实体，然后可以调用`contentState.getLastCreatedEntityKey`来获取新创建的实体记录的键。

此项是将实体应用于内容时应使用的值。
例如，`Modifier`(修改器)模块包含一个`applyEntity`方法：

```js
const contentState = editorState.getCurrentContent();
const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {
  url: 'http://www.zombo.com',
});
const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
const contentStateWithLink = Modifier.applyEntity(
  contentStateWithEntity,
  selectionState,
  entityKey,
);
const newEditorState = EditorState.push(editorState, {
  currentContent: contentStateWithLink,
});
```
然后，对于给定的文本范围，可以通过在`ContentBlock`对象上使用`getEntityAt()`方法提取目标对象的偏移量，并传入目标偏移值。

```js
const contentState = editorState.getCurrentContent();
const blockWithLinkAtBeginning = contentState.getBlockForKey('...');
const linkKey = blockWithLinkAtBeginning.getEntityAt(0);
const linkInstance = contentState.getEntity(linkKey);
const {url} = linkInstance.getData();
```

## "Mutability" 可变性

实体可能具有三个"Mutability"值之一。
它们之间的区别是用户对它们进行编辑时它们的行为方式。

请注意，`DraftEntityInstance`对象始终是immutable 记录，并且此属性仅用于指示如何在编辑器中对带注释的文本进行“mutated(突变)”。
（将来的更改可能会重命名此属性，以防止命名方面的潜在混乱。）

### Immutable 不可变

在不从文本中删除实体注释的情况下，无法更改此文本。
具有这种可变性类型的实体实际上是atomic(原子)的。

例如，在Facebook input中，添加Page的提及（例如Barack Obama）。
然后，在提到的文本中添加一个字符，或尝试删除一个字符。
请注意，添加或删除字符时，实体将被删除。

在文本绝对必须匹配其相关元数据且不得更改的情况下，此可变性值很有用。

### Mutable 可变的

该文本可以自由更改。
例如，链接文本通常旨在“可变”，因为href和链接化文本不是紧密耦合的。

### Segmented 分段

被“segmented(分段)”的实体以与“immutable(不可变)”实体几乎相同的方式紧密耦合到其文本，但是允许通过删除进行自定义。

例如，在Facebook input中，为朋友添加提及。然后，在文本中添加一个字符。请注意，实体已从整个字符串中删除，因为您提到的朋友的名称可能未在文本中更改。

接下来，尝试删除提及的字符或单词。请注意，只有提到的部分已删除。这样，我们可以允许简称。

## Modifying Entities 修改实体

由于`DraftEntityInstance`记录是不可变的，因此您不能直接在实例上更新`data`属性。

相反，有两种Entity方法可用于修改实体：`mergeData`和 `replaceData`。前者允许通过传入要合并的对象来更新数据，而后者则完全交换新数据对象。

## Using Entities for Rich Content 使用实体获取丰富内容

本节的下一篇文章介绍装饰器对象的用法，装饰器对象可用于检索实体以进行渲染。

[link editor example](https://github.com/facebook/draft-js/tree/master/examples/draft-0-10-0/link)提供了使用中的实体创建和装饰的工作示例
