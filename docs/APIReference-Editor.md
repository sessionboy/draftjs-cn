---
id: api-reference-editor
title: Editor组件
---

本文讨论了核心控件`contentEditable`组件本身（Editor）的API和支持。
道具在[`DraftEditorProps`](https://github.com/facebook/draft-js/blob/master/src/component/base/DraftEditorProps.js)中定义。

## Props

## 基础

有关介绍，请参见[API基础](/docs/quickstart-api-basics)。

### `editorState`

```js
editorState: EditorState;
```
要由`Editor`呈现的`EditorState`对象。

### `onChange`

```js
onChange: (editorState: EditorState) => void
```
编辑和选择更改发生时，编辑器将执行`onChange`函数。

## 演示文稿（可选）

### `placeholder`

```js
placeholder?: string
```

当编辑器为空时显示的可选占位符字符串。

注意：您可以根据需要使用CSS设置样式或隐藏占位符。
例如，在[rich editor example](https://github.com/facebook/draft-js/tree/master/examples/draft-0-10-0/rich)中，当用户在空的编辑器中更改块样式时，占位符被隐藏。
这是因为更改样式后，占位符可能无法与光标对齐。

### `textAlignment`

```js
textAlignment?: DraftTextAlignment
```
（可选）为此编辑器设置覆盖文本的对齐方式。
不管输入文本的默认文本方向如何，此对齐方式值将应用于整个内容。

如果您希望将文本居中或将文本朝一个方向对齐以使其适合您的UI设计，则可以使用此方法。

如果未设置此值，则文本对齐将基于编辑器中的字符（逐块）。

### `textDirectionality`

```js
textDirectionality?: DraftTextDirectionality
```
（可选）为此编辑器设置覆盖文本的方向性。
这些值包括从右到左的文本（如希伯来语或阿拉伯语）的“ RTL”和从左到右的文本（如英语或西班牙语）的“ LTR”。
这种方向性将适用于整个内容，而不管输入文本的默认文本方向如何。

如果未设置此值，则文本方向性将基于编辑器中的字符（逐块）。

### `blockRendererFn`

```js
blockRendererFn?: (block: ContentBlock) => ?Object
```
（可选）设置一个函数以定义自定义块渲染。
有关用法的详细信息，请参见[高级主题：块组件](/docs/advanced-topics-block-components)。

### `blockRendererMap`

```js
blockRendererMap?: DraftBlockRenderMap
```

提供块渲染配置map。
每个块类型都maps(映射)到元素标签和一个可选的react元素包装器。
此配置用于渲染和粘贴处理。
有关用法的详细信息，请参见[高级主题：自定义块渲染](/docs/advanced-topics-custom-block-render-map) 。

### `blockStyleFn`

```js
blockStyleFn?: (block: ContentBlock) => string
```

（可选）设置一个函数以定义要在呈现给定块时应用于给定块的类名。
有关用法的详细信息，请参见[高级主题：块样式](/docs/advanced-topics-block-styling)。


### customStyleMap

```js
customStyleMap?: Object
```

（可选）定义内联样式的map，以应用于具有指定样式的文本范围。
有关用法的详细信息，请参见[高级主题：内联样式](/docs/advanced-topics-inline-styles)。

### `customStyleFn`

```js
customStyleFn?: (style: DraftInlineStyle, block: ContentBlock) => ?Object
```

（可选）定义一个函数，以将内联样式转换为应用于文本范围的CSS对象。
有关用法的详细信息，请参见[高级主题：内联样式](/docs/advanced-topics-inline-styles)。

## 行为（可选）

### `autoCapitalize`

```js
autoCapitalize?: string
```

设置是否启用自动大写及其行为。
可以在[mdn](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#attr-autocapitalize)上找到有关平台可用性和使用情况的更多信息。

### `autoComplete`

```js
autoComplete?: string
```
设置是否打开自动完成功能以及其行为方式。
可以在[mdn](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#attr-autocomplete)上找到有关平台可用性和使用情况的更多信息。

### `autoCorrect`

```js
autoCorrect?: string
```
设置是否打开自动更正以及其行为。
可在[MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#attr-autocorrect)上找到有关平台可用性和使用情况的更多信息。

### `readOnly`

```js
readOnly?: boolean
```
设置是否应在禁用所有可编辑性的情况下将编辑器呈现为静态DOM。

在支持[自定义块组件](/docs/advanced-topics-block-components)内的交互时，或者仅在静态用例中显示内容时，这很有用。

默认为`false`.

### `spellCheck`

```js
spellCheck?: boolean
```
设置是否为您的编辑器打开了拼写检查。

请注意，在OSX Safari中，启用拼写检查也会启用自动更正（如果用户已将其打开）。
还要注意，由于IE中不会触发观察拼写检查事件所需的事件，因此IE中始终禁用拼写检查。

默认为`false`.

### `stripPastedStyles`

```js
stripPastedStyles?: boolean
```
设置是否从粘贴内容中删除除明文以外的所有信息。

如果您的编辑器不支持丰富样式，则应使用此样式。

默认为`false`.

## DOM和可访问性（可选）

### `tabIndex`

### ARIA props

这些props允许您在编辑器上设置辅助功能属性。
有关受支持属性的详尽列表，请参见[DraftEditorProps](https://github.com/facebook/draft-js/blob/master/src/component/base/DraftEditorProps.js)。

### `editorKey`

```js
editorKey?: string
```

除非要在服务器端渲染草稿组件，否则可能不会在`<Editor />`上手动设置`editorKey`。
如果是这样，则必须设置此prop以避免服务器/客户端不匹配。

如果未设置键，则在渲染该组件时将自动生成该密钥，并将其分配为编辑器的`<DraftEditorContents />`组件的prop。

如果您确实设置了此prop，则该键应该是每个编辑器唯一的键，因为它用于确定在编辑器中粘贴文本时是否应保留样式。

## 取消处理程序（可选）

提供这些prop函数以允许对少量有用事件进行自定义事件处理。
通过从您的处理程序返回“handled”，您表示该事件已处理，而Draft核心对此不做什么。
通过返回`'not-handled'`，您将选择由Draft来处理事件。

### `handleReturn`

```js
handleReturn?: (
  e: SyntheticKeyboardEvent,
  editorState: EditorState,
) => DraftHandleValue
```
处理`RETURN`按下事件。
用法示例：从呈现的结果列表中选择一个提及标记，以触发将提及实体应用于您的内容。

### `handleKeyCommand`

```js
handleKeyCommand?: (
  command: string,
  editorState: EditorState,
  eventTimeStamp: number,
) => DraftHandleValue
```
处理命名的编辑器命令。
有关用法的详细信息，请参见[高级主题：键绑定](/docs/advanced-topics-key-bindings)。

### `handleBeforeInput`

```js
handleBeforeInput?: (
  chars: string,
  editorState: EditorState,
  eventTimeStamp: number,
) => DraftHandleValue
```

处理要从`beforeInput`事件插入的字符。
返回`'handled'`将导致防止`beforeInput`事件的默认行为（即与在事件上调用`preventDefault`方法相同）。
用法示例：用户在新块的开头键入`-`，您可以将该`ContentBlock`转换为`unordered-list-item`(无序列表项)。

在Facebook上，我们还使用它将键入的ASCII引号转换为"smart"(智能)引号，并将键入的typed emoticons(图释)转换为图像。

### `handlePastedText`

```js
handlePastedText?: (
  text: string,
  html?: string,
  editorState: EditorState,
) => DraftHandleValue
```
处理直接粘贴到编辑器中的文本和html。
返回true将阻止默认的粘贴行为。

### `handlePastedFiles`

```js
handlePastedFiles?: (files: Array<Blob>) => DraftHandleValue
```
处理直接粘贴到编辑器中的文件。

### `handleDroppedFiles`

```js
handleDroppedFiles?: (
  selection: SelectionState,
  files: Array<Blob>,
) => DraftHandleValue
```
处理已拖拽到编辑器的文件。

### `handleDrop`

```js
handleDrop?: (
  selection: SelectionState,
  dataTransfer: Object,
  isInternal: DraftDragType,
) => DraftHandleValue
```
处理其他放置操作。

## Key 处理程序（可选）

Draft允许您提供一个自定义`keyDown`处理程序，该处理程序可以包装或覆盖其默认值。

### `keyBindingFn`

```js
keyBindingFn?: (e: SyntheticKeyboardEvent) => ?string
```

该prop函数将`keyDown`事件公开给您选择的处理程序。
如果发生感兴趣的事件，则可以执行自定义逻辑 和/或 返回与您自己创建的`DraftEditorCommand`或自定义编辑器命令相对应的字符串。
示例：在Facebook上，此功能用于为键入朋友姓名时出现的提及自动完成菜单提供键盘交互。
您可以在[此处](/docs/advanced-topics-key-bindings)找到更详细的说明。

## 鼠标事件

### `onFocus`

```js
onFocus?: (e: SyntheticFocusEvent) => void
```

### `onBlur`

```js
onBlur?: (e: SyntheticFocusEvent) => void
```

## 方法

### `focus`

```js
focus(): void
```
强制将焦点放回到编辑器节点上。

### `blur`

```js
blur(): void
```
从编辑器节点上移出焦点。
