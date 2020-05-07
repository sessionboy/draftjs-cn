---
id: getting-started
title: 总览
onPageNav: 'none'
---

Draft.js是一个框架，用于在React中构建富文本编辑器，该框架由不可变模型提供支持并跨浏览器差异进行抽象。

Draft.js允许您构建任何类型的RTF输入，无论您是要支持几种嵌入式文本样式，还是构建复杂的文本编辑器来撰写长篇文章。

Draft.js于2016年2月在[React.js Conf](https://conf2016.reactjs.org/schedule#rich-text-editing-with-react)上引入。

## 安装

Draft.js通过npm分发。它取决于还必须安装的React和React DOM。

```sh
npm install draft-js react react-dom
# or alternately
yarn add draft-js react react-dom
```
Draft.js使用了一些现代ECMAScript功能，这些功能不适用于IE11，也不是create-react-app的默认babel配置的一部分。如果您开箱即用时遇到问题，请尝试安装shim或Polyfill。

```sh
npm install draft-js react react-dom babel-polyfill
# or
yarn add draft-js react react-dom es6-shim
```
了解更多有关[在Draft中使用shim](/docs/advanced-topics-issues-and-pitfalls#polyfills).


## API变更通知

开始之前，请注意，我们最近在`Draft`中更改了实体存储的API。最新版本，v0.10.0支持新旧API。接下来v0.11.0将删除旧的API。如果您有兴趣帮助或跟踪进度，请按照问题[issue 839](https://github.com/facebook/draft-js/issues/839)进行。

## 用法

```js
import React from 'react';
import ReactDOM from 'react-dom';
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

ReactDOM.render(<MyEditor />, document.getElementById('container'));
```
自从React 16.8发布以来，您可以使用[Hooks](https://reactjs.org/docs/hooks-intro.html)作为一种使用方法，而EditorState无需使用类。

```js
import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';

function MyEditor() {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty(),
  );

  return <Editor editorState={editorState} onChange={setEditorState} />;
}

ReactDOM.render(<MyEditor />, document.getElementById('container'));
```
因为Draft.js支持unicode，所以您必须在`<head></head>`HTML文件的块中具有以下meta标记：

```html
<meta charset="utf-8" />
```
Draft.css渲染编辑器时应包括在内。详细了解[原因](/docs/advanced-topics-issues-and-pitfalls#missing-draftcss)。

接下来，让我们进入API的基础知识，并学习使用Draft.js还可以做什么。
