---
id: advanced-topics-editorstate-race-conditions
title: EditorState 竞争条件
---

Draft `Editor`是一个受控的输入组件（您可以在[API基础](/docs/quickstart-api-basics)部分中详细了解此内容），这意味着对`Editor`状态所做的更改将通过`onChange`向上传播，并由应用程序将其反馈给`Editor`组件。

此周期通常如下所示：

```js
...
this.onChange = function(editorState) {
  this.setState({editorState: editorState});
}
...
<Editor
  editorState={this.state.editorState}
  onChange={this.onChange}
  placeholder="Enter some text..."
/>
```

不同的浏览器事件可以触发编辑器创建新状态并调用`onChange`。
例如，当用户将文本粘贴到其中时，`Draft`会解析新内容并创建必要的数据结构来表示它

这个循环很好用，但是由于`setState`调用，它是一个异步操作。
这会在设置状态和使用新状态渲染编辑器之间引入延迟。
在这段时间内，可以执行其他JS代码。

![Race condition diagram 1](/img/editorstate-race-condition-1-handler.png)

诸如此类的Non-atomic(非原子)操作可能会导致竞争状况。
这是一个示例：假设您要删除粘贴中的所有文本样式。
这可以通过侦听`onPaste`事件并从`EditorState`中删除所有样式来实现：

```js
this.onPaste = function() {
  this.setState({
    editorState: removeEditorStyles(this.state.editorState),
  });
};
```
但是，这将无法正常工作。
现在，您有两个事件处理程序，它们在完全相同的浏览器事件中设置了一个新的`EditorState`。
由于事件处理程序将一个接一个地运行，因此仅最后一个`setState`为准。
这是JS时间轴中的样子：

![Race condition diagram 2](/img/editorstate-race-condition-2-handlers.png)

如您所见，由于`setState`是异步操作，因此第二个`setState`将覆盖第一个`setState`上设置的内容，从而使编辑器丢失粘贴文本中的所有内容。

您可以在此[运行示例](https://jsfiddle.net/qecccw3r/)中观察和探索竞争条件。
该示例还具有记录日志，以突出显示JS时间轴，因此请确保打开开发人员工具。

根据经验，避免对操纵`EditorState`的同一事件使用不同的事件处理程序。
使用`setTimeout`运行`setState`可能还会使您陷入同一情况。
每当您觉得自己处于“losing state”(丢失状态)时，请确保在重新渲染编辑器之前没有覆盖它。

## 最佳实践

既然您已经了解了问题，那么该如何解决呢？
通常，请注意从何处获取`EditorState`。
如果您使用的是本地（存储在this.state中），则有可能不是最新的。
为了最小化此问题，`Draft`在其大多数回调函数中提供了最新的`EditorState`实例。
在您的代码中，您应该使用提供的`EditorState`而不是本地的`EditorState`，以确保您将更改基于最新的状态。
这是编辑器上支持的回调的列表：

- `handleReturn(event, editorState)`
- `handleKeyCommand(command, editorState)`
- `handleBeforeInput(chars, editorState)`
- `handlePastedText(text, html, editorState)`

然后可以使用以下方法以无竞争条件的方式重写粘贴示例：

```js
this.handlePastedText = (text, styles, editorState) => {
  this.setState({
    editorState: removeEditorStyles(text, editorState),
  });
};
//...
<Editor
  editorState={this.state.editorState}
  onChange={this.onChange}
  handlePastedText={this.handlePastedText}
  placeholder="Enter some text..."
/>;
```
使用`handlePastedText`，您可以自己实现粘贴行为。

注意：如果您需要在编辑器中具有此行为，可以通过将编辑器的`stripPastedStyles`属性设置为true来实现。

