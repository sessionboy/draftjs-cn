---
id: advanced-topics-decorators
title: 装饰器
---

内联和块样式不是我们可能要添加到编辑器中的唯一一种丰富样式。例如，Facebook评论输入提供用于mentions(提及)和hashtags(主题标签)的蓝色背景高亮显示。

为了支持自定义富文本格式的灵活性，Draft提供了一个“装饰器”系统。该[tweet example](https://github.com/facebook/draft-js/tree/master/examples/draft-0-10-0/tweet)提供了一个实际的装饰器示例。

## CompositeDecorator 复合装饰器

装饰器的概念基于扫描给定[ContentBlock](/docs/api-reference-content-block)的内容以 查找与定义的策略匹配的文本范围，然后使用指定的React组件渲染它们。

您可以使用`CompositeDecorator`该类来定义所需的装饰器行为。此类允许您提供多个`DraftDecorator`对象，并且将依次搜索每种策略的一段文本。

装饰器存储在`EditorState`记录中。在创建新`EditorState`对象时，（例如通过）`EditorState.createEmpty()`，可以选择提供装饰器。

> Under the hood 引擎盖下
>
> 在Draft编辑器中更改内容时，生成的`EditorState`对象将`ContentState`使用其装饰器评估新对象，并标识要装饰的范围。此时，将形成一个完整的块，装饰器和内联样式树，并作为渲染输出的基础。
>
> 这样，我们始终确保随着内容的更改，渲染的装饰与我们的EditorState同步。

例如，在“ Tweet”编辑器示例中，我们使用一个`CompositeDecorator`搜索`@-handle`字符串以及hashtag(#)字符串：

```js
const compositeDecorator = new CompositeDecorator([
  {
    strategy: handleStrategy,
    component: HandleSpan,
  },
  {
    strategy: hashtagStrategy,
    component: HashtagSpan,
  },
]);
```
该复合装饰器将首先扫描给定的文本块以查找@-handle匹配项，然后扫描hashtag(#)匹配项。

```js
// 注意：这些不是很好的正则表达式，请不要使用它们！
const HANDLE_REGEX = /\@[\w]+/g;
const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;

function handleStrategy(contentBlock, callback, contentState) {
  findWithRegex(HANDLE_REGEX, contentBlock, callback);
}

function hashtagStrategy(contentBlock, callback, contentState) {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}
```
策略函数使用文本匹配范围的`start`和 `end`值执行提供的回调。

## Decorator Components 装饰器组件

对于修饰的文本范围，必须定义一个React组件以用于渲染它们。这些往往是简单的`span`元素，并带有CSS类或样式。

在我们当前的示例中，`CompositeDecorator`对象名称`HandleSpan`和 `HashtagSpan`作为用于装饰的组件。这些是基本的无状态组件：

```js
const HandleSpan = props => {
  return (
    <span {...props} style={styles.handle}>
      {props.children}
    </span>
  );
};

const HashtagSpan = props => {
  return (
    <span {...props} style={styles.hashtag}>
      {props.children}
    </span>
  );
};
```
装饰器组件将在props中接收各种元数据，包括`contentState`的副本，`entityKey`（如果有）和`blockKey`。
有关提供给装饰器组件的props的完整列表，请参见[DraftDecoratorComponentProps 类型](https://github.com/facebook/draft-js/blob/master/src/model/decorators/DraftDecorator.js)。

请注意，`props.children`被传递到渲染输出。
这样做是为了确保在装饰范围内渲染文本。

您可以对链接使用相同的方法，如我们的[link example](https://github.com/facebook/draft-js/tree/master/examples/draft-0-10-0/link)所示。

### Beyond CompositeDecorator 超越复合装饰器

提供给`EditorState`的装饰器对象只需要符合[DraftDecoratorType](https://github.com/facebook/draft-js/blob/master/src/model/decorators/DraftDecoratorType.js)Flow类型定义的期望，这意味着您可以创建所需的任何装饰器类，只要它们与期望的类型匹配即可-您不受CompositeDecorator的约束。

## Setting new decorators 设置新的装饰器

此外，可以接受的是，在正常状态传播期间，通过不可变的方法在`EditorState`上动态设置新的装饰器值。

这意味着在您的应用工作流程中，如果您的装饰器变得无效或需要修改，则可以创建一个新的装饰器对象（或使用`null`删除所有装饰），并创建`EditorState.set()`以使用新的装饰器设置。

例如，如果由于某种原因我们希望在用户与编辑器交互时禁止创建`@-handle`装饰，则可以执行以下操作：

```js
function turnOffHandleDecorations(editorState) {
  const onlyHashtags = new CompositeDecorator([
    {
      strategy: hashtagStrategy,
      component: HashtagSpan,
    },
  ]);
  return EditorState.set(editorState, {decorator: onlyHashtags});
}
```
此`editorState`的`ContentState`将使用新的装饰器重新评估，并且`@-handle`装饰将不再出现在下一个渲染通道中。

同样，由于跨不可变对象的数据持久性，这仍然保持内存效率。

