---
id: api-reference-data-conversion
title: 数据转换
---

因为文本编辑器不存在，而且保存内容以供storage或transmission(存储或传输)很重要，所以您将希望能够将`ContentState`转换为raw JS，反之亦然

为此，我们提供了一些实用程序功能，可让您执行这些转换。

请注意，草稿库当前不提供实用工具来使markdown 或 markup之间进行转换，因为不同的客户端可能对这些格式有不同的要求。
相反，我们提供了可以根据需要转换为其他格式的JavaScript对象。

Flow类型[`RawDraftContentState`](https://github.com/facebook/draft-js/blob/master/src/model/encoding/RawDraftContentState.js)表示内容的raw格式的预期结构。
raw state包含内容块的列表以及所有相关实体对象的映射

## 函数

### `convertFromRaw()`

```js
convertFromRaw(rawState: RawDraftContentState): ContentState
```

给定raw state，将其转换为`ContentState`。
还原要在草稿编辑器中使用的内容时，这很有用。

### `convertToRaw()`

```js
convertToRaw(contentState: ContentState): RawDraftContentState
```

给定一个`ContentState`对象，将其转换为raw JS结构。
当保存编辑器状态以进行存储，转换为其他格式或在应用程序中进行其他使用时，此功能非常有用

### `convertFromHTML()`

```js
const sampleMarkup =
  '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' +
  '<a href="http://www.facebook.com">Example link</a>';

const blocksFromHTML = convertFromHTML(sampleMarkup);
const state = ContentState.createFromBlockArray(
  blocksFromHTML.contentBlocks,
  blocksFromHTML.entityMap,
);

this.state = {
  editorState: EditorState.createWithContent(state),
};
```

给定一个HTML片段，用两个键将其转换为对象；
一个保存`ContentBlock`对象的数组，另一个保存对`EntityMap`的引用。
从块元素数组和`EntityMap`构造content state(内容状态)，然后使用其更新编辑器状态。
完整的示例在[这里](https://github.com/facebook/draft-js/tree/master/examples/draft-0-10-0/convertFromHTML)。
