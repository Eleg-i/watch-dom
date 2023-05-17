# watch-dom —— 监听 DOM 变化

简体中文 | [English](readme/README-en.md)

## 描述

监听指定DOM树上节点的更改，或者元素盒模型大小的更改，并允许对更改作出处理。

## 开始使用

安装依赖包

```bash
npm i @cailiao/watch-dom
```

导入 patch 函数

```javascript
import patch from '../dist/index.esm.browser.min.js'
patch() // 选择在合适的时机执行
```

使用

```javascript
// 监视DOM数上子节点的变化，targetElement 是任意的内置 Element 类的实例，即 DOM 元素
const unwatch = targetElement.$watch(record => { console.log(record) }, { subtree: true, childList: true })
// 取消监视
unwatch()


// 监视元素盒模型大小变化，targetElement 是任意的内置 Element 类的实例，即 DOM 元素
const unwatch = targetElement.$watchBox(record => { console.log(record) }, { subtree: true, childList: true })
// 取消监视
unwatch()
// 暂停监视
unwatch.pause()
// 恢复监视
unwatch.resume()
```

## 说明

patch() 方法会在 Element 的原型上插入两个方法，`$watch` 和 `$watchBox`，`$watch` 和 `$watchBox` 均接受两个参数 `callback` 和 `options`.

#### `$watch` `Function`

##### 参数

- `callback` ：`Function` 类型，必需，传递一个参数，

  - record 是一个 [MutationRecord](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationRecord) 数组。其中包含了DOM被修改的信息。

- `options`： `Object` 类型，必需，是 [MutationObserver.observe()](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/observe) 的 options 参数，

    `options` 的属性如下：

  - `subtree` 可选

      当为 `true` 时，将会监听以 `target` 为根节点的整个子树。包括子树中所有节点的属性，而不仅仅是针对 `target`。默认值为 `false`。

  - `childList` 可选

      当为 `true` 时，监听 `target` 节点中发生的节点的新增与删除（同时，如果 `subtree` 为 `true`，会针对整个子树生效）。默认值为 `false`。

  - `attributes` 可选

      当为 `true` 时观察所有监听的节点属性值的变化。默认值为 `true`，当声明了 `attributeFilter` 或 `attributeOldValue`，默认值则为 `false`。

  - `attributeFilter` 可选

      一个用于声明哪些属性名会被监听的数组。如果不声明该属性，所有属性的变化都将触发通知。

  - `attributeOldValue` 可选

      当为 `true` 时，记录上一次被监听的节点的属性变化；可查阅[监听属性值](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver#监听属性值)了解关于观察属性变化和属性值记录的详情。默认值为 `false`。

  - `characterData` 可选

      当为 `true` 时，监听声明的 `target` 节点上所有字符的变化。默认值为 `true`，如果声明了 `characterDataOldValue`，默认值则为 `false`

  - `characterDataOldValue` 可选

      当为 `true` 时，记录前一个被监听的节点中发生的文本变化。默认值为 `false`

##### 返回值：`Function`，返回注销监视器的函数

#### `$watchBox` `Function`

##### 参数

- `callback` ：`Function` 类型，必需，传递两个参数，

  - record 是一个 [ResizeObserverEntry](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserverEntry) 数组。其中包含了元素修改后的大小信息。
  - observer：对 [ResizeObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver/ResizeObserver) 自身的引用。

- `options`： `Object` 类型，可选，是 [ResizeObserver.observe()](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver/observe) 的 options 参数，

    `options` 的属性如下：

  - `box` 设置 observer 将监听的盒模型。可能的值是：

    - `content-box`（默认）

        CSS 中定义的内容区域的大小。

    - `border-box`

        CSS 中定义的边框区域的大小。

    - `device-pixel-content-box`

        在对元素或其祖先应用任何 CSS 转换之前，CSS 中定义的内容区域的大小，以设备像素为单位。

##### 返回值：`Function`

返回注销监视器的函数，函数有两个方法：

- pause：`Function` 类型，使当前监视器暂停监视。

- resume：`Function` 类型，使当前监视器恢复监视。应仅在调用 `pause()` 之后再调用。
