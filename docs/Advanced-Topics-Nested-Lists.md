---
id: advanced-topics-nested-lists
title: 嵌套列表
---

如Facebook Notes编辑器所示，`Draft`框架提供了对嵌套列表的支持。
在那里，您可以使用`Tab`键和`Shift + Tab`键添加或删除列表项的深度。

## Implementation

[`RichUtils`](/docs/api-reference-rich-utils)模块提供了一种方便的`onTab`方法来管理此行为，并且对于大多数嵌套列表需求应该足够了。
您可以在`Editor`上使用`onTab`prop来使用此实用程序。

默认情况下，样式会通过`DraftStyleDefault.css`应用于列表项，以设置适当的间距和列表样式行为。

请注意，当前不支持处理除`'ordered-list-item'` 和 `'unordered-list-item'`以外的任何类型的块的深度。
