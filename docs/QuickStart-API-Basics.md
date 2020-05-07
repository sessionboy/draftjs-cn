---
id: quickstart-api-basics
title: API基础
---
本文档概述了Draft API 的基础。 也可以使用一个[工作示例](https://github.com/facebook/draft-js/tree/master/examples/draft-0-10-0/plaintext)。

## 受控输入

`Editor` React组件构建为受控的`ContentEditable`组件，目的是提供以熟悉的React受控输入API为模型的顶级API。

作为简短的回顾，受控输入涉及两个关键部分：

1. 代表输入状态的值
2. 一个onChange prop函数，用于接收输入的更新

这种方法允许组成输入的组件对输入的状态进行严格控制，同时仍允许对DOM进行更新以提供有关用户编写的文本的信息。

```js
class MyInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.onChange = evt => this.setState({value: evt.target.value});
  }
  render() {
    return <input value={this.state.value} onChange={this.onChange} />;
  }
}
```

顶层组件可以通过此`value`状态属性维持对输入状态的控制 。

## 控制富文本

但是，在React RTF场景中，存在两个明显的问题：

1. 纯文本字符串不足以表示富编辑器的复杂状态。
2. 没有这样的`onChange`事件可用于`ContentEditable`元素 

因此，状态表示为单个不可变的[EditorState](/docs/api-reference-editor-state)对象，并且`onChange`在`Editor`核心内实现，以将该状态值提供给顶层。

`EditorState`对象是编辑器状态的完整快照，包括内容，光标和撤消/重做历史。 编辑器中对内容和选择的所有更改将创建新的`EditorState`对象。 注意，由于跨不可变对象的数据持久性，这仍然有效。

```js
import {Editor, EditorState} from 'draft-js';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = editorState => this.setState({editorState});
  }

  render() {
    return (
      <Editor editorState={this.state.editorState} onChange={this.onChange} />
    );
  }
}
```

对于编辑器DOM中发生的任何编辑或选择更改，您的`onChange`处理程序将`EditorState`根据这些更改对最新对象执行。

