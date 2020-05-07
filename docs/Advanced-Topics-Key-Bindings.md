---
id: advanced-topics-key-bindings
title: 键绑定
---

`Editor`组件可通过`keyBindingFn`属性灵活地为您的编辑器定义自定义键绑定。
这使您可以将关键命令与编辑器组件中的行为进行匹配。

## Defaults

默认的键绑定函数是`getDefaultKeyBinding`。

由于Draft框架保持对DOM渲染和行为的严格控制，因此必须捕获基本的编辑命令并通过键绑定系统进行路由。

`getDefaultKeyBinding`将已知的OS级编辑器命令映射到`DraftEditorCommand`字符串，然后这些字符串与组件处理程序中的行为相对应。

例如，`Ctrl + Z（Win）`和`Cmd + Z（OSX）`映射到`'undo'`命令，该命令随后路由我们的处理程序以执行`EditorState.undo()`。

## 定制化

您可以提供自己的键绑定函数以提供自定义命令字符串。

建议您将函数使用`getDefaultKeyBinding`作为替代情况，以便您的编辑器可以从默认命令中受益。

使用自定义命令字符串，然后可以实现`handleKeyCommand` prop函数，该函数允许您将该命令字符串映射到所需的行为。
如果`handleKeyCommand`返回`“handled”`，则该命令被视为已处理。
如果返回`'not-handled'`，该命令被视为未处理。

## 例子

假设我们有一个编辑器，该编辑器应具有“保存”机制，以将您的内容作为draft副本定期写入服务器，类似于[medium](https://medium.com)的编辑器。

首先，让我们定义键绑定函数：

```js
import {getDefaultKeyBinding, KeyBindingUtil} from 'draft-js';
const {hasCommandModifier} = KeyBindingUtil;

function myKeyBindingFn(e: SyntheticKeyboardEvent): string {
  if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
    return 'myeditor-save';
  }
  return getDefaultKeyBinding(e);
}
```
我们的函数收到一个键事件，然后检查它是否符合我们的条件：它必须是`S`键，并且必须具有命令修饰符，即OSX的命令键，否则为控制键。

如果命令匹配，则返回一个字符串，命名该命令。
否则，请使用默认的键绑定。

然后，在我们的编辑器组件中，我们可以通过`handleKeyCommand`属性使用命令：

```js
import {Editor} from 'draft-js';
class MyEditor extends React.Component {

  constructor(props) {
    super(props);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }
  // ...

  handleKeyCommand(command: string): DraftHandleValue {
    if (command === 'myeditor-save') {
      // 执行请求以保存您的内容，设置
      //一个新的`editorState`等。
      return 'handled';
    }
    return 'not-handled';
  }

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        handleKeyCommand={this.handleKeyCommand}
        keyBindingFn={myKeyBindingFn}
        ...
      />
    );
  }
}
```
`myeditor-save`命令可用于我们的自定义行为，返回`“handled”`将指示编辑器该命令已被处理，无需进行其他工作。

通过在所有其他情况下返回`'not-handled'`，默认命令可以进入默认处理程序行为。

