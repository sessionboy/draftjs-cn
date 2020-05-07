---
id: api-reference-editor-change-type
title: EditorChangeType 变更类型
---

[EditorChangeType](https://github.com/facebook/draft-js/blob/master/src/model/immutable/EditorChangeType.js)是一个枚举，列出了可以处理Draft模型的一组可能的更改操作。
它表示为Flow类型，表示为字符串的union(联合)。

它作为参数传递给`EditorState.push`，并表示通过转换到新的`ContentState`所执行的更改操作的类型。

在后台，此值用于确定适当的undo/redo(撤消/重做)处理，拼写检查行为等。
因此，尽管可以在此处提供任意字符串值作为changeType参数，但应避免这样做。

我们强烈建议您安装[Flow](http://flowtype.org)以在项目上执行静态类型检查。
Flow将强制使用适当的`EditorChangeType`值。

## Values

### `adjust-depth`

一个或多个`ContentBlock`对象的`depth`值正在更改。

### `apply-entity`

实体正在应用（或通过`null`删除）到一个或多个字符

### `backspace-character`
单个字符被向后删除。

### `change-block-data`

一个或多个`ContentBlock`对象的`data`值正在更改。

### `change-block-type`

一个或多个`ContentBlock`对象的`type`值正在更改。

### `change-inline-style`

正在为一个或多个字符应用或删除内联样式。

### `move-block`

块正在[BlockMap](https://github.com/facebook/draft-js/blob/master/src/model/immutable/BlockMap.js)中移动。

### `delete-character`

单个字符正被删除。

### `insert-characters`

在选择状态下将插入一个或多个字符。

### `insert-fragment`

在选择状态下插入内容的"fragment(片段)"（即，[BlockMap](https://github.com/facebook/draft-js/blob/master/src/model/immutable/BlockMap.js)）。

### `redo`

正在执行重做操作。
由于重做行为是由Draft核心处理的，因此您不太可能需要显式使用此功能。

### `remove-range`

多个字符或块被删除。

### `spellcheck-change`

正在执行拼写检查或自动更正更改。
这用于通知核心编辑器是否尝试允许本机撤消行为。

### `split-block`

例如，当用户按下`return`时，单个`ContentBlock`将被拆分为两个。

### `undo`

正在执行撤消操作。
由于撤消行为是由Draft核心处理的，因此您不太可能需要显式使用此行为。
