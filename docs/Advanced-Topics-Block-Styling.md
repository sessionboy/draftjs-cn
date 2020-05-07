---
id: advanced-topics-block-styling
title: 块样式
---

在`Editor`内，某些块类型被赋予默认的CSS样式，以限制使工程师启动并运行自定义编辑器所需的基本配置量。

通过为`Editor`定义`blockStyleFn` prop函数，可以指定应在渲染时应用于块的类。

## DraftStyleDefault.css

Draft库在[DraftStyleDefault.css](https://github.com/facebook/draft-js/blob/master/src/component/utils/DraftStyleDefault.css)中包含默认的块CSS样式。
（请注意，CSS类名称上的注释是Facebook内部CSS模块管理系统的构件。）

这些CSS规则主要致力于为列表项提供默认样式，否则，调用者将负责管理自己的默认列表样式。

## blockStyleFn

编辑器上的`blockStyleFn` prop可让您定义CSS类，以在渲染时对块进行样式设置。
例如，您可能希望用花哨的斜体文本为`“blockquote”`类型的块设置样式。

```js
function myBlockStyleFn(contentBlock) {
  const type = contentBlock.getType();
  if (type === 'blockquote') {
    return 'superFancyBlockquote';
  }
}

// 然后...
import {Editor} from 'draft-js';
class EditorWithFancyBlockquotes extends React.Component {
  render() {
    return <Editor ... blockStyleFn={myBlockStyleFn} />;
  }
}
```

然后，在您自己的CSS中：

```css
.superFancyBlockquote {
  color: #999;
  font-family: 'Hoefler Text', Georgia, serif;
  font-style: italic;
  text-align: center;
}
```
