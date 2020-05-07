---
id: api-reference-entity
title: Entity 实体
---

`Entity`是一个静态模块，其中包含用于创建，检索和更新实体对象的API，该对象用于使用元数据注释文本范围。
该模块还包含用于维护实体数据的单个store(存储)

本文致力于介绍API的详细信息。
有关如何使用实体的更多详细信息，请参见有关[实体的高级主题文章](/docs/advanced-topics-entities)。

请注意，用于实体存储和管理的API最近已更改；
有关更新应用程序的详细信息，请参见我们的[v0.10 API迁移指南](/docs/v0-10-api-migration#content)。

`Entity`(实体)的方法返回的实体对象表示为[DraftEntityInstance](https://github.com/facebook/draft-js/blob/master/src/model/entity/DraftEntityInstance.js) immutable records。
这些具有少量的`getter`函数，应仅用于检索。

## 总览

_方法_

<ul class="apiIndex">
  <li>
    <a href="#create">
      <pre>create(...): DraftEntityInstance</pre>
    </a>
  </li>
  <li>
    <a href="#add">
      <pre>add(instance: DraftEntityInstance): string</pre>
    </a>
  </li>
  <li>
    <a href="#get">
      <pre>get(key: string): DraftEntityInstance</pre>
    </a>
  </li>
  <li>
    <a href="#mergedata">
      <pre>mergeData(...): DraftEntityInstance</pre>
    </a>
  </li>
  <li>
    <a href="#replacedata">
      <pre>replaceData(...): DraftEntityInstance</pre>
    </a>
  </li>
</ul>

## 方法

### `create` _(不推荐使用 [`contentState.createEntity`](/docs/api-reference-content-state#createentity))_

```js
create(
  type: DraftEntityType,
  mutability: DraftEntityMutability,
  data?: Object
): string
```

应该使用`create`方法来生成具有提供的属性的新实体对象

请注意，此函数返回一个字符串。
这是因为实体是通过`ContentState`中的字符串键引用的。
应该在`CharacterMetadata`对象中使用字符串值来跟踪带有注释字符的实体。

### `add` _(不推荐使用 [`contentState.addEntity`](/docs/api-reference-content-state#addentity))_

```js
add(instance: DraftEntityInstance): string
```
在大多数情况下，您将使用`Entity.create()`。
这是一种便捷的方法，在典型的“草稿”用法中您可能不需要。

在已经创建实例并且现在需要将其添加到`Entity`存储的情况下，添加功能很有用。
如果要恢复`ContentState`的原始JavaScript表示以进行编辑，则可能会发生这种情况。

### `get` _(不推荐使用 [`contentState.getEntity`](/docs/api-reference-content-state#getentity))_

```js
get(key: string): DraftEntityInstance
```

返回指定键的`DraftEntityInstance`。
如果该键不存在实例，则抛出该异常。

### `mergeData` _(不推荐使用 [`contentState.mergeEntityData`](/docs/api-reference-content-state#mergeentitydata))_

```js
mergeData(
  key: string,
  toMerge: {[key: string]: any}
): DraftEntityInstance
```

由于`DraftEntityInstance`对象是不可变的，因此您无法通过典型的可变方式来更新实体的元数据。

`mergeData`方法允许您将更新应用于指定的实体。

### `replaceData` _(不推荐使用 [`contentState.replaceEntityData`](/docs/api-reference-content-state#replaceentitydata))_

```js
replaceData(
  key: string,
  newData: {[key: string]: any}
): DraftEntityInstance
```

`replaceData`方法与`mergeData`方法类似，不同之处在于它将完全丢弃实例的现有`data`值并将其替换为指定的newData。