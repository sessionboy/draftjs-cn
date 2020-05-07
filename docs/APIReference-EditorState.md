---
id: api-reference-editor-state
title: EditorState 编辑器状态
---

`EditorState`是编辑器的顶级状态对象。

它是Immutable [Record](http://facebook.github.io/immutable-js/docs/#/Record/Record)，代表草稿编辑器的整个状态，包括

- 当前文本内容状态
- 当前选择状态
- 内容的完全修饰表示
- Undo/redo堆栈
- 对内容所做的最新更改

> 注意
>
> 使用EditorState对象时，不应使用Immutable API。
> 相反，请使用下面的实例getter和静态方法。

## 总览

_普通实例方法_

下面的列表包括最常用的`EditorState`对象实例方法。

<ul class="apiIndex">
  <li>
    <a href="#getcurrentcontent">
      <pre>getCurrentContent(): ContentState</pre>
    </a>
  </li>
  <li>
    <a href="#getselection">
      <pre>getSelection(): SelectionState</pre>
    </a>
  </li>
  <li>
    <a href="#getcurrentinlinestyle">
      <pre>getCurrentInlineStyle(): DraftInlineStyle</pre>
    </a>
  </li>
  <li>
    <a href="#getblocktree">
      <pre>getBlockTree(): OrderedMap</pre>
    </a>
  </li>
</ul>

_静态方法_

<ul class="apiIndex">
  <li>
    <a href="#createempty">
      <pre>static createEmpty(?decorator): EditorState</pre>
    </a>
  </li>
  <li>
    <a href="#createwithcontent">
      <pre>static createWithContent(contentState, ?decorator): EditorState</pre>
    </a>
  </li>
  <li>
    <a href="#create">
      <pre>static create(config): EditorState</pre>
    </a>
  </li>
  <li>
    <a href="#push">
      <pre>static push(editorState, contentState, changeType): EditorState</pre>
    </a>
  </li>
  <li>
    <a href="#undo">
      <pre>static undo(editorState): EditorState</pre>
    </a>
  </li>
  <li>
    <a href="#redo">
      <pre>static redo(editorState): EditorState</pre>
    </a>
  </li>
  <li>
    <a href="#acceptselection">
      <pre>static acceptSelection(editorState, selectionState): EditorState</pre>
    </a>
  </li>
  <li>
    <a href="#forceselection">
      <pre>static forceSelection(editorState, selectionState): EditorState</pre>
    </a>
  </li>
  <li>
    <a href="#moveselectiontoend">
      <pre>static moveSelectionToEnd(editorState): EditorState</pre>
    </a>
  </li>
  <li>
    <a href="#movefocustoend">
      <pre>static moveFocusToEnd(editorState): EditorState</pre>
    </a>
  </li>
  <li>
    <a href="#setinlinestyleoverride">
      <pre>static setInlineStyleOverride(editorState, inlineStyleOverride): EditorState</pre>
    </a>
  </li>
  <li>
    <a href="#set">
      <pre>static set(editorState, EditorStateRecordType): EditorState</pre>
    </a>
  </li>
</ul>

_属性_

> 注意
>
> 使用静态`EditorState`方法来设置属性，而不是直接使用Immutable API。  
>
> 这意味着使用`EditorState.set`将新选项传递给`EditorState`实例。
>
> **例子**
>
> ```js
> const editorState = EditorState.createEmpty();
> const editorStateWithoutUndo = EditorState.set(editorState, {
>   allowUndo: false,
> });
> ```

<ul class="apiIndex">
  <li>
    <a href="#allowundo">
      <pre>allowUndo</pre>
    </a>
  </li>
  <li>
    <a href="#currentcontent">
      <pre>currentContent</pre>
    </a>
  </li>
  <li>
    <a href="#decorator">
      <pre>decorator</pre>
    </a>
  </li>
  <li>
    <a href="#directionmap">
      <pre>directionMap</pre>
    </a>
  </li>
  <li>
    <a href="#forceselection">
      <pre>forceSelection</pre>
    </a>
  </li>
  <li>
    <a href="#incompositionmode">
      <pre>inCompositionMode</pre>
    </a>
  </li>
  <li>
    <a href="#inlinestyleoverride">
      <pre>inlineStyleOverride</pre>
    </a>
  </li>
  <li>
    <a href="#lastchangetype">
      <pre>lastChangeType</pre>
    </a>
  </li>
  <li>
    <a href="#nativelyrenderedcontent">
      <pre>nativelyRenderedContent</pre>
    </a>
  </li>
  <li>
    <a href="#redostack">
      <pre>redoStack</pre>
    </a>
  </li>
  <li>
    <a href="#selection">
      <pre>selection</pre>
    </a>
  </li>
  <li>
    <a href="#treemap">
      <pre>treeMap</pre>
    </a>
  </li>
  <li>
    <a href="#undostack">
      <pre>undoStack</pre>
    </a>
  </li>
</ul>

## 普通实例方法

### `getCurrentContent`

```js
getCurrentContent(): ContentState
```

返回编辑器的当前内容。

### `getSelection`

```js
getSelection(): SelectionState
```
返回编辑器的当前cursor/selection(光标/选择)的状态。

### `getCurrentInlineStyle`

```js
getCurrentInlineStyle(): DraftInlineStyle
```
返回一个`OrderedSet <string>`，它表示编辑器的“当前”内联样式。

这是在为当前`ContentState`和`SelectionState`插入字符时将使用的内联样式值，并考虑了应应用的任何内联样式替代。

### `getBlockTree`

```js
getBlockTree(blockKey: string): List;
```

返回修饰范围和样式范围的Immutable `List`。
这用于呈现目的，并且是基于`currentContent`和`decorator`生成的。

在渲染时，此对象用于将内容分解为适当的块，装饰器和样式化的范围组件。

## 静态方法

### `createEmpty`

```js
static createEmpty(decorator?: DraftDecoratorType): EditorState
```
返回具有空`ContentState`和默认配置的新`EditorState`对象。

### `createWithContent`

```js
static createWithContent(
  contentState: ContentState,
  decorator?: DraftDecoratorType
): EditorState
```
根据提供的`ContentState`和装饰器返回一个新的`EditorState`对象。

### `create`

```js
static create(config: EditorStateCreationConfig): EditorState
```
根据配置对象返回一个新的`EditorState`对象。
如果您需要通过上述方法无法使用的自定义配置，请使用此选项。

### `push`

```js
static push(
  editorState: EditorState,
  contentState: ContentState,
  changeType: EditorChangeType
): EditorState
```
返回一个新的`EditorState`对象，并将指定的`ContentState`用作新的`currentContent`。
基于changeType`，此`ContentState`可以视为undo/redo(撤消/重做)行为的边界状态。

必须使用此方法将所有内容更改都应用于`EditorState`。

_重命名。_

### `undo`

```js
static undo(editorState: EditorState): EditorState
```
返回一个新的`EditorState`对象，并将撤消堆栈的顶部用作新的`currentContent`。

现有的`currentContent`被推入`redo`堆栈。

### `redo`

```js
static redo(editorState: EditorState): EditorState
```

返回一个新的`EditorState`对象，并将`redo`堆栈的顶部用作新的`currentContent`。

现有的`currentContent`被推入`undo`堆栈。

### `acceptSelection`

```js
static acceptSelection(
  editorState: EditorState,
  selectionState: SelectionState
): EditorState
```

返回一个新的`EditorState`对象，该对象已应用指定的`SelectionState`，但不需要呈现selection。

例如，当DOM选择在我们的控制范围之外更改并且不需要重新渲染时，这很有用。

### `forceSelection`

```js
static forceSelection(
  editorState: EditorState,
  selectionState: SelectionState
): EditorState
```
返回一个新的`EditorState`对象，该对象已应用指定的`SelectionState`，强制呈现selection。

当应该在正确的位置手动呈现选择内容以保持对呈现输出的控制时，这很有用。

### `moveSelectionToEnd`

```js
static moveSelectionToEnd(editorState: EditorState): EditorState
```
返回一个新的`EditorState`对象，该对象的最后一个selection。

将selection移到编辑器的末尾，而不强制焦点。

### `moveFocusToEnd`

```js
static moveFocusToEnd(editorState: EditorState): EditorState
```
返回一个新的`EditorState`对象，该对象的末尾具有selection并强制focus。

这在我们要以编程方式集中输入的情况下很有用，并且允许用户继续无缝地工作是有意义的。

### `setInlineStyleOverride`

```js
static setInlineStyleOverride(editorState: EditorState, inlineStyleOverride: DraftInlineStyle): EditorState
```

返回一个新的`EditorState`对象，该对象具有指定的`DraftInlineStyle`作为内联样式集，这些内联样式将应用于下一个插入的字符。

### `set`

```js
static set(editorState: EditorState, options: EditorStateRecordType): EditorState
```
返回带有新选项的新`EditorState`对象。该方法继承自Immutable `record` API。

## Properties and Getters 属性和吸气剂

在大多数情况下，上述实例和静态方法应足以管理草稿编辑器的状态

以下是`EditorState`跟踪的属性及其对应的getter方法的完整列表，以更好地提供有关此对象中跟踪的状态范围的详细信息。

> 注意
>
> 使用`EditorState`对象时，不应使用Immutable API。
> 而是使用上面的实例getter和静态方法。


### `allowUndo`

```js
allowUndo: boolean;
getAllowUndo();
```

在此编辑器中是否允许撤消/重做行为。
默认为true。

由于undo/redo(撤消/重做)堆栈是内存保留的主要来源，因此，如果您的编辑器UI不需要撤消/重做行为，则可以考虑将其设置为`false`。

### `currentContent`

```js
currentContent: ContentState;
getCurrentContent();
```

当前呈现的`ContentState`。
请参见[getCurrentContent()](#getcurrentcontent)。

### `decorator`

```js
decorator: ?DraftDecoratorType;
getDecorator()
```
当前装饰器对象（如果有）。

请注意，`ContentState`独立于装饰器。
如果提供了装饰器，则它将用于装饰文本范围以进行渲染。

### `directionMap`

```js
directionMap: BlockMap;
getDirectionMap();
```
每个块的map(映射)及其文本方向，由`UnicodeBidiService`确定

您不应该手动管理它。

### `forceSelection`

```js
forceSelection: boolean;
mustForceSelection();
```

是否强制渲染当前的`SelectionState`。

您不应该手动设置此属性-请参见[`forceSelection()`](#forceselection)。

### `inCompositionMode`

```js
inCompositionMode: boolean;
isInCompositionMode();
```

用户是否处于IME合成模式。
即使未对编辑器提交任何内容更改，这对于为IME用户呈现适当的UI也很有用。
您不应该手动设置此属性。

### `inlineStyleOverride`

```js
inlineStyleOverride: DraftInlineStyle;
getInlineStyleOverride();
```

一个内联样式值，将应用于下一个插入的字符。
当使用键盘命令或样式按钮为折叠的选择范围应用嵌入式样式时，将使用此样式。

`DraftInlineStyle`是不可变的immutable `OrderedSet`字符串的类型别名，每个字符串都对应一个内联样式。

### `lastChangeType`

```js
lastChangeType: EditorChangeType;
getLastChangeType();
```
为了使我们进入当前的`ContentState`而进行的内容更改的类型。
在确定撤消/重做的边界状态时使用。

### `nativelyRenderedContent`

```js
nativelyRenderedContent: ?ContentState;
getNativelyRenderedContent()
```
在编辑行为期间，编辑器可以允许某些操作本地呈现。
例如，在基于`contentEditable`的组件中的正常键入行为期间，我们通常可以允许击键事件落入以打印DOM中的字符。
这样一来，我们就可以避免重新渲染并保留拼写检查突出显示。

当允许本机呈现行为时，使用`nativelyRenderedContent`属性指示对此`EditorState`不需要重新呈现是适当的

### `redoStack`

```js
redoStack: Stack<ContentState>;
getRedoStack()
```
ContentState对象的immutable堆栈，可以对其进行重做操作。
执行撤消操作时，当前的`ContentState`被推送到`redoStack`上。

您不应该手动管理此属性。
如果要禁用撤消/重做行为，请使用`allowUndo`属性。

另请查看[undoStack](#undostack).

### `selection`

```js
selection: SelectionState;
getSelection();
```

当前呈现的`SelectionState`。
请查看[acceptSelection()](#acceptselection)
and [forceSelection()](#forceselection)。

您不应该手动管理此属性.

### `treeMap`

```js
treeMap: OrderedMap<string, List>;
```

完全装饰和样式化的ranges(范围)树，将在编辑器组件中呈现。
`treeMap`对象是基于`ContentState`和可选的装饰器（`DraftDecoratorType`）生成的。

在渲染时，组件应使用[getBlockTree()](#getblocktree)方法遍历`treeMap`对象以渲染装饰范围和样式化范围。

您不应该手动管理此属性.

### `undoStack`

```js
undoStack: Stack<ContentState>;
getUndoStack()
```

不变的`ContentState`对象堆栈，可以将其还原以执行撤消操作。

在执行修改内容的操作时，我们确定是否应将当前`ContentState`视为用户通过执行撤消操作可以到达的“boundary(边界)”状态。
如果是这样，则将`ContentState`推送到`undoStack`上。
如果不是，则丢弃传出的`ContentState`。

您不应该手动管理此属性。
如果要禁用撤消/重做行为，请使用`allowUndo`属性。

另外查看[`redoStack`](#redostack).
