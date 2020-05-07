---
id: api-reference-key-binding-util
title: KeyBindingUtil 键绑定工具
---

`KeyBindingUtil`模块是一组static set(静态集合)的实用函数，用于定义键绑定

## 静态方法

### `isCtrlKeyCommand()`

```js
isCtrlKeyCommand: function(
  e: SyntheticKeyboardEvent
): boolean
```

检查`ctrlKey`修饰符(modifier)是否未与`altKey`修饰符一起使用。
如果将它们组合在一起，则结果是一个`altGraph`键修饰符，这组键绑定未对其进行处理

### `isOptionKeyCommand()`

```js
isOptionKeyCommand: function(
  e: SyntheticKeyboardEvent
): boolean
```

### `usesMacOSHeuristics()`

```js
usesMacOSHeuristics: function(): boolean
```

检查是否在内部使用了仅适用于macOS的试探法，例如在确定用作命令修饰符的组合键时。

### `hasCommandModifier()`

```js
hasCommandModifier: function(
  e: SyntheticKeyboardEvent
): boolean
```
