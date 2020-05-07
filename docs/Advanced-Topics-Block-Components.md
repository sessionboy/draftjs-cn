---
id: advanced-topics-block-components
title: 自定义块组件
---

Draft旨在解决直接的富文本界面（如评论和聊天消息）的问题，但它也为诸如[Facebook Notes](https://www.facebook.com/notes/)之类的更丰富的编辑器体验提供支持。

用户可以从其现有的Facebook照片中加载图像，也可以通过从桌面上载新图像来将图像嵌入Notes中。
为此，Draft框架支持在块级别进行自定义呈现，以呈现诸如富媒体之类的内容来代替纯文本。

Draft存储库中的[TeX editor](https://github.com/facebook/draft-js/tree/master/examples/draft-0-10-0/tex)提供了一个自定义块渲染的实时示例，其中TeX语法通过[KaTeX library](https://khan.github.io/KaTeX/)即时转换为可编辑的嵌入式公式渲染。

还提供了一个[media example](https://github.com/facebook/draft-js/tree/master/examples/draft-0-10-0/media)，展示了音频，图像和视频的自定义块渲染

通过使用自定义块渲染器，可以在编辑器框架内引入复杂的丰富交互。

## 自定义块组件

在`Editor`组件中，可以指定`blockRendererFn`属性。
该prop函数允许更高级别的组件

例如，我们可能希望使用自定义`MediaComponent`渲染`'atomic'`(原子)类型的`ContentBlock`对象

```js
function myBlockRenderer(contentBlock) {
  const type = contentBlock.getType();
  if (type === 'atomic') {
    return {
      component: MediaComponent,
      editable: false,
      props: {
        foo: 'bar',
      },
    };
  }
}

// 然后...
import {Editor} from 'draft-js';
class EditorWithMedia extends React.Component {
  ...
  render() {
    return <Editor ... blockRendererFn={myBlockRenderer} />;
  }
}
```

如果`blockRendererFn`函数未返回任何自定义渲染器对象，则`Editor`将渲染默认的`EditorBlock`文本块组件。

`component`属性定义要使用的组件，而可选的props对象包括将通过`props.blockProps`子属性对象传递给呈现的自定义组件的props。
另外，可选的`editable`属性确定自定义组件是否为`contentEditable`。

强烈建议您使用`editable：false`，如果您的自定义组件不包含文本。

如果您的组件包含`ContentState`提供的文本，则您的自定义组件应组成一个`EditorBlock`组件。
这将允许Draft框架在您的内容中正确维护光标行为。

通过在更高级别的组件的context中定义此函数，可以将此定制组件的props绑定到该组件，从而允许使用定制组件props的实例方法。

## 定义自定义块组件

在`MediaComponent`中，最可能的用例是您将希望检索实体元数据以呈现您的自定义块。
您可以在`EditorState`管理期间将实体键应用于`'atomic'`(原子)块中的文本，然后在自定义组件`render()`代码中检索该键的元数据。

```js
class MediaComponent extends React.Component {
  render() {
    const {block, contentState} = this.props;
    const {foo} = this.props.blockProps;
    const data = contentState.getEntity(block.getEntityAt(0)).getData();
    // 使用此数据返回<figure>或其他一些内容。
  }
}
```

`ContentBlock`对象和`ContentState`记录和在顶层定义的props一起，在自定义组件中可用。
通过从`ContentBlock`和`Entity` map (实体映射) 中提取实体信息，可以获取呈现自定义组件所需的元数据。

_从块中检索实体确实有点笨拙的API，值得再次探讨_


## 建议和其他说明

如果您的自定义块渲染器需要鼠标交互，通常明智的做法是在交互过程中将您的编辑器临时设置为`readOnly={true}`。
这样，用户在与自定义块进行交互时不会在编辑器内触发任何选择更改。
就编辑器行为而言，这应该不是问题，因为与自定义块组件进行交互很可能与编辑器中的文本更改互斥。

上面的建议对于涉及文本输入的自定义块渲染器尤其重要，例如TeX编辑器示例。

还值得注意的是，在Facebook Notes编辑器中，我们没有尝试在嵌入式媒体上执行任何特定的SelectionState渲染或管理，例如在选择嵌入式照片时渲染高亮。
部分原因是媒体本身提供了丰富的交互作用，而调整大小的手柄和其他控件则暴露于鼠标行为。

由于使用Draft的工程师完全了解编辑器的选择状态并完全掌控原生的Selection API，因此，如果需要，可以在静态嵌入式媒体上构建选择行为。
不过，到目前为止，我们还没有尝试在Facebook上解决此问题，因此我们目前尚未将针对该用例的解决方案打包到Draft项目中。
