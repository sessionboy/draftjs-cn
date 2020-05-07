---
id: advanced-topics-custom-block-render-map
title: 自定义块渲染
---

本文讨论如何自定义Draft默认块渲染。
块渲染用于定义支持的块类型及其各自的渲染器，以及将粘贴的内容转换为已知的Draft块类型。

在粘贴内容时，或在调用[convertFromHTML](/docs/api-reference-data-conversion#convertfromhtml)时，Draft通过将Draft块渲染图与匹配的标签进行匹配，将粘贴的内容转换为相应的块渲染类型。

## Draft默认块渲染图

| HTML element    | Draft block type 块类型                         |
| --------------- | ----------------------------------------- |
| `<h1/>`         | header-one                                |
| `<h2/>`         | header-two                                |
| `<h3/>`         | header-three                              |
| `<h4/>`         | header-four                               |
| `<h5/>`         | header-five                               |
| `<h6/>`         | header-six                                |
| `<blockquote/>` | blockquote                                |
| `<pre/>`        | code-block                                |
| `<figure/>`     | atomic                                    |
| `<li/>`         | unordered-list-item,ordered-list-item\*\* |
| `<div/>`        | unstyled\*\*\*                            |

\*\* - 块类型将基于父 `<ul/>` 或 `<ol/>`

\*\*\* - 块渲染映射无法识别的任何块将被视为unstyled(未样式化)

## Configuring block render map 配置块渲染图

可以通过将[Immutable Map](http://facebook.github.io/immutable-js/docs/#/Map)传递给编辑器`blockRender`props来覆盖Draft的默认块渲染图。

_覆盖默认块渲染图的示例:_

```js
//下面的示例故意只允许
//'heading-two'是唯一有效的块类型，并且
//将未样式化的元素也更新为h2。
const blockRenderMap = Immutable.Map({
  'header-two': {
    element: 'h2'
  },
  'unstyled': {
    element: 'h2'
  }
});

class RichEditor extends React.Component {
  render() {
    return (
      <Editor
        ...
        blockRenderMap={blockRenderMap}
      />
    );
  }
}
```
在某些情况下，我们只想添加新的块类型，而不是覆盖默认值。
这可以通过使用`DefaultDraftBlockRenderMap`引用创建一个新的`blockRenderMap`来完成。

_扩展默认块渲染图的示例：_

```js
const blockRenderMap = Immutable.Map({
  'section': {
    element: 'section'
  }
});

//将'paragraph'包含为有效的块并更新了未设置样式的元素，但是
//保持对其他draft默认块类型的支持

const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap);

class RichEditor extends React.Component {
  render() {
    return (
      <Editor
        ...
        blockRenderMap={extendedBlockRenderMap}
      />
    );
  }
}
```
当Draft解析粘贴的HTML时，它将从HTML元素映射回Draft块类型。
如果要指定其他映射到特定块类型的HTML元素，则可以将数组`aliasedElements`添加到块配置中。

_未样式化的块类型别名用法示例：_

```js
'unstyled': {
  element: 'div',
  aliasedElements: ['p'],
}
```

## Custom block wrappers 自定义块包装

默认情况下，html元素用于包装块类型。
但是，还可以将react组件提供给`blockRenderMap`来包装`EditorBlock`。

在粘贴期间，或在调用[convertFromHTML](/docs/api-reference-data-conversion#convertfromhtml)时，将扫描html以查找匹配的标记元素。
当在`blockRenderMap`上有一个包装器定义该包装器时，将使用包装器。
例如：

Draft使用包装器将`<li />`包装在`<ol />`或`<ul />`内，但是包装器还可用于包装任何其他自定义块类型。

_扩展默认块渲染图以将react组件用于自定义块的示例_

```js
class MyCustomBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='MyCustomBlock'>
        {/* 在这里，this.props.children包含一个<section>容器，因为它是匹配元素  */}
        {this.props.children}
      </div>
    );
  }
}

const blockRenderMap = Immutable.Map({
  'MyCustomBlock': {
    //元素在粘贴或html转换期间用于自动匹配您的组件；
    //它也保留为this.props.children的一部分，不会被剥离
    element: 'section',
    wrapper: <MyCustomBlock />,
  }
});

//保持对其他draft默认块类型的支持，并添加我们的`myCustomBlock`类型

const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap);

class RichEditor extends React.Component {
  ...
  render() {
    return (
      <Editor
        ...
        blockRenderMap={extendedBlockRenderMap}
      />
    );
  }
}
```
