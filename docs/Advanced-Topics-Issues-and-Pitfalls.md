---
id: advanced-topics-issues-and-pitfalls
title: 问题和陷阱
---

本文讨论了草稿编辑器框架的一些已知问题，以及我们在Facebook上使用该框架时遇到的一些常见陷阱。

## 常见陷阱

### 延迟状态更新

单向数据管理的常见模式是使用`setTimeout`或其他机制批量更新或以其他方式延迟对数据存储的更新。
更新stores，然后将更改发送到相关的React组件以传播重新渲染。

但是，当使用草稿编辑器将延迟引入到React应用程序时，可能会导致重大的交互问题。
这是因为编辑器希望立即进行更新，并且呈现与用户的键入行为保持同步的渲染。
延迟可以阻止更新通过编辑器组件树传播，这可能导致击键和更新之间的断开连接。

为了在仍使用延迟或批处理机制的同时避免这种情况，应将延迟行为与编辑器状态传播分开。
也就是说，必须始终允许`EditorState`毫不延迟地传播到`Editor`组件，并独立执行不影响Editor组件状态的批量更新。

### 丢失 `Draft.css`

Draft框架包括一些旨在与编辑器一起使用的CSS资源，可通过内部版本`Draft.css`在单个文件中获得。

呈现编辑器时，应包括此CSS，因为这些样式设置了文本对齐，间距和其他重要功能的默认设置。
没有它，您可能会遇到块定位，对齐和光标行为的问题。

如果选择独立于`Draft.css`编写自己的CSS，则很可能需要复制许多默认样式。

## 已知的问题

### Custom OSX Keybindings 自定义OSX绑定

由于浏览器无法访问操作系统级别的自定义键绑定，因此无法拦截未映射到默认系统键绑定的编辑意图行为。

结果是使用自定义键绑定的用户可能会在草稿编辑器中遇到问题，因为他们的键盘命令可能无法按预期方式运行。

### 浏览器插件/扩展

与任何React应用程序一样，修改DOM的浏览器插件和扩展程序可能会导致Draft编辑器中断。

例如，语法检查器可以修改`contentEditable`元素内的DOM，添加下划线和背景之类的样式。
由于如果浏览器不符合预期，React无法协调DOM，因此编辑器状态可能无法与DOM保持同步。

还已知某些旧的广告阻止程序会破坏原生的DOM Selection API-无论如何，这都是一个坏主意！
-并且由于Draft依靠此API来维持受控的选择状态，因此这可能会导致编辑器交互的麻烦。

### IME 和 Internet Explorer


从IE11开始，Internet Explorer展示了某些国际输入法（最重要的是韩文输入法）中的显着问题。

### Polyfills

Draft的某些代码及其依赖项的代码使用ES2015语言功能。
构建Draft时，会通过Babel编译掉诸如class之类的语法功能，但是它不包括现在许多现代浏览器中都包含的API的polyfills（例如：`String.prototype.startsWith`）。
我们希望您的浏览器原生或在polyfill的支持下支持这些API。
[es6-shim](https://github.com/es-shims/es6-shim)是这样的polyfill之一，我们在许多示例中都使用了[es6-shim](https://github.com/es-shims/es6-shim)，但如果您的场景更丰富，则可以自由使用[babel-polyfill](https://babeljs.io/docs/usage/polyfill/)。

使用polyfill/shim时，应尽早将其包括在应用程序的入口点中（至少在导入“草稿”之前）。
例如，使用[create-react-app](https://github.com/facebookincubator/create-react-app)并定位IE11，`src/index.js`可能是导入polyfill的好地方：

**`src/index.js`**

```js
import 'babel-polyfill';
// or
import 'es6-shim';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
```

### 尚不支持移动端

Draft.js正朝着全面的移动端支持方向发展，但目前尚不正式支持移动端浏览器。
有一些已知问题会影响Android 和 iOS-请查看标记为['android'](https://github.com/facebook/draft-js/labels/android) 或
['ios'](https://github.com/facebook/draft-js/labels/ios)的当前状态问题。
