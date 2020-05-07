---
id: advanced-topics-inline-styles
title: 复杂的内联样式
---

在您的编辑器中，您可能希望提供多种内联样式行为，这些行为远远超出了bold/italic/underline(粗体/斜体/下划线)基础。
例如，您可能希望支持颜色，字体系列，字体大小等更多内容。
此外，您想要的样式可能会重叠或互斥。

[Rich Editor](http://github.com/facebook/draft-js/tree/master/examples/draft-0-10-0/rich) 和
[Colorful Editor](http://github.com/facebook/draft-js/tree/master/examples/draft-0-10-0/color)示例演示了实际的复杂内联样式行为。

## 模型

在Draft模型中，内联样式在字符级别表示，使用不可变的`OrderedSet`定义要应用于每个字符的样式列表。
这些样式由字符串标识。
（有关详细信息，请参见[CharacterMetadata](/docs/api-reference-character-metadata)。）

例如，思考文本"Hello **world**"。
字符串的前六个字符由空集`OrderedSet()`表示。
最后五个字符由`OrderedSet.of（'BOLD'）`表示。
为了方便起见，我们可以将这些`OrderedSet`对象视为数组，尽管实际上我们会积极地重复使用相同的immutable对象

本质上，我们的风格是：

```js
[
  [], // H
  [], // e
  // ...
  ['BOLD'], // w
  ['BOLD'], // o
  // etc.
];
```

## 重叠样式

现在让我们说，我们也希望使中间字符范围变为斜体：He*llo* ***wo*rld**。
可以通过[Modifier](/docs/api-reference-modifier) API执行此操作

最终结果还将通过在相关`OrderedSet`对象中包含`'ITALIC'`来容纳重叠。

```js
[
  [], // H
  [], // e
  ['ITALIC'], // l
  // ...
  ['BOLD', 'ITALIC'], // w
  ['BOLD', 'ITALIC'], // o
  ['BOLD'], // r
  // etc.
];
```

在确定如何渲染内联样式的文本时，Draft将识别相同样式的字符的连续范围，并将这些字符一起显示在样式化的`span`节点中。

## 将样式字符串映射到CSS

默认情况下，`Editor`支持内联样式的基本列表：`'BOLD'`, `'ITALIC'`, `'UNDERLINE'`, and `'CODE'`。
这些映射到普通CSS样式对象，用于将样式应用于相关范围

对于您的编辑器，您可以定义自定义样式字符串以包含这些默认值，或者可以覆盖基本样式的默认样式对象。

在您的`Editor`用例中，您可以提供`customStyleMap`属性来定义样式对象。
（有关实际示例，请参见[Colorful Editor](http://github.com/facebook/draft-js/tree/master/examples/draft-0-10-0/color)。）

例如，您可能想要添加`'STRIKETHROUGH'`样式。
为此，定义一个自定style map：

```js
import {Editor} from 'draft-js';

const styleMap = {
  'STRIKETHROUGH': {
    textDecoration: 'line-through',
  },
};

class MyEditor extends React.Component {
  // ...
  render() {
    return (
      <Editor
        customStyleMap={styleMap}
        editorState={this.state.editorState}
        ...
      />
    );
  }
}
```

渲染时，`textDecoration: line-through`将`以STRIKETHROUGH`样式应用于所有字符范围。

