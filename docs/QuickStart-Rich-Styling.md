---
id: quickstart-rich-styling
title: 丰富样式
---

现在，我们已经建立了顶级API的基础，我们可以更进一步，研究如何将基本的丰富样式添加到`Draft`编辑器中。

也可以使用[富文本例子](https://github.com/facebook/draft-js/tree/master/examples/draft-0-10-0/rich)。

## EditorState: 由您控制

上一篇文章介绍了`EditorState`对象，作为编辑器完整状态的快照，由`Editor`核心通过`onChange` prop提供。

但是，由于顶层React组件负责维护状态，因此您还可以自由选择以自己认为合适的方式将更改应用于该`EditorState`对象。

例如，对于内联和块级样式行为，[`RichUtils`](/docs/api-reference-rich-utils)模块提供了许多有用的功能来帮助操纵状态。

同样，[Modifier](/docs/api-reference-modifier)模块还提供了许多常用操作，使您可以应用编辑，包括对文本，样式等的更改。 该模块是一组编辑功能，可以组成更简单，更小的编辑功能，以返回所需的EditorState对象。

对于此示例，我们将继续使用`RichUtils`来演示如何在顶层组件中应用基本的丰富样式。

## RichUtils和按键命令

`RichUtils`具有有关Web编辑器可用的核心键盘命令的信息，例如`Cmd+B`(粗体），`Cmd+I`(斜体)等。

我们可以通过`handleKeyCommand`属性观察和处理键盘命令，并将它们挂接到`RichUtils`中以应用或删除所需的样式。

```js
import {Editor, EditorState, RichUtils} from 'draft-js';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = editorState => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        handleKeyCommand={this.handleKeyCommand}
        onChange={this.onChange}
      />
    );
  }
}
```

> `handleKeyCommand`
>
> 提供给`handleKeyCommand`的命令参数是一个字符串值，即要执行的命令的名称。 这是从DOM键事件映射的。 
> `editorState`参数表示最新的编辑器状态，因为在处理键时可能会通过`draft`在内部对其进行更改。 在`handleKeyCommand`中使用此编辑器状态实例。 
> 有关更多信息，请参见[高级主题-键绑定](/docs/advanced-topics-key-bindings)，以及有关函数为什么返回`handled`或`not-handled`的详细信息。

## UI中的样式控件

在您的React组件中，您可以添加按钮或其他控件，以允许用户在编辑器中修改样式。在上面的示例中，我们使用了已知的键盘命令，但是我们可以添加更复杂的UI来提供这些丰富的功能。

这是一个带有“Bold”按钮的超级基础示例，用于切换BOLD样式。

```js
class MyEditor extends React.Component {
  // ...

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  render() {
    return (
      <div>
        <button onClick={this._onBoldClick.bind(this)}>Bold</button>
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
```
