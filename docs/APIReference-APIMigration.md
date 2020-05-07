---
id: v0-10-api-migration
title: v0.10 API 迁移
---
Draft.js v0.10版本包括对用于管理`DraftEntity`数据的API的更改 ；全局`'DraftEntity'`模块已弃用， `DraftEntity`实例将作为`ContentState`的一部分进行管理。这意味着以前访问的方法`DraftEntity`现在已移到`ContentState`记录中。

API的这一改进为v0.11提供了许多好处，从而开启了前进的道路：

- DraftEntity实例和存储将是不可变的。
- DraftEntity将不再可全局访问。
- 对实体数据的任何更改都会触发重新渲染。

## 快速概述
以下是已更改内容以及如何更新应用程序的快速列表：

### 创建一个实体

**旧语法**

```js
const entityKey = Entity.create(urlType, 'IMMUTABLE', {src: urlValue});
```

**新语法**

```js
const contentStateWithEntity = contentState.createEntity(urlType, 'IMMUTABLE', {
  src: urlValue,
});
const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
```

### 获取实体

**旧语法**

```js
const entityInstance = Entity.get(entityKey);
// EntityKey是创建时与该实体相关联的字符串键
```

**新语法**

```js
const entityInstance = contentState.getEntity(entityKey);
// EntityKey是创建时与该实体相关联的字符串键
```

### Decorator Strategy arguments change 装饰器策略参数更改

**旧语法**

```js
const compositeDecorator = new CompositeDecorator([
  {
    strategy: (contentBlock, callback) =>
      exampleFindTextRange(contentBlock, callback),
    component: ExampleTokenComponent,
  },
]);
```

**新语法**

```js
const compositeDecorator = new CompositeDecorator([
  {
    strategy: (contentBlock, callback, contentState) => (
      contentBlock, callback, contentState
    ),
    component: ExampleTokenComponent,
  },
]);
```
请注意，ExampleTokenComponent将接收contentState作为prop。

为什么现在将`contentState`传递到装饰器策略中？因为如果我们的策略是在`contentBlock`中查找某些实体，则可能需要它：

```js
const mutableEntityStrategy = function(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    if (entityKey === null) {
      return false;
    }
    //要查找某些类型的实体，
    //或具有一定可变性的实体，
    //您可能需要从contentState获取实体。
    //在此示例中，我们仅获得可变实体。
    return contentState.getEntity(entityKey).getMutability() === 'MUTABLE';
  }, callback);
};
```

### Decorator Strategies that find Entities 查找实体的装饰器策略

**旧语法**

```js
function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return entityKey !== null && Entity.get(entityKey).getType() === 'LINK';
  }, callback);
}
```

**新语法**

```js
function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    );
  }, callback);
}
```

## 更多信息

有关更多信息，请参见[updated examples](https://github.com/facebook/draft-js/tree/master/examples/draft-0-10-0)。
