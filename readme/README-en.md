# watch-dom —— Monitor DOM changes

[简体中文](../README.md) | English

## Description

Monitor changes to nodes on a specified DOM tree or changes to the size of element box models and allow processing of changes.

## Getting Started

Install dependencies

```bash
npm i @cailiao/watch-dom
```

Import the patch function

```bash
import patch from '../dist/index.esm.browser.min.js'
patch() // Choose the appropriate time to execute
```

## Usage

```javascript
// Monitor changes to child nodes on the DOM tree. targetElement is an instance of any built-in Element class, i.e., a DOM element.
const unwatch = targetElement.$watch(record => { console.log(record) }, { subtree: true, childList: true })
// Cancel monitoring
unwatch()


// Monitor changes to the size of element box models. targetElement is an instance of any built-in Element class, i.e., a DOM element.
const unwatch = targetElement.$watchBox(record => { console.log(record) }, { subtree: true, childList: true })
// Cancel monitoring
unwatch()
// Pause monitoring
unwatch.pause()
// Resume monitoring
unwatch.pause()
```



## Explanation

The patch() method inserts two methods, `$watch` and `$watchBox`, into the prototype of Element. Both `$watch` and `$watchBox` accept two parameters, `callback` and `options`.

#### `$watch` `Function`

Parameters:

- `callback`: Required. Function type. Pass in one parameter,

- record is an array of [MutationRecord](https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord). It contains information about the modification of the DOM.

- `options`: Required. Object type. It is the options parameter of [MutationObserver.observe()](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe),

  Options are as follows:

  - `subtree` Optional

    Set to `true` to extend monitoring to the entire subtree of nodes rooted at `target`. All of the other properties are then extended to all of the nodes in the subtree instead of applying solely to the `target` node. The default value is `false`.

  - `childList` Optional

    Set to `true` to monitor the target node (and, if `subtree` is `true`, its descendants) for the addition of new child nodes or removal of existing child nodes. The default value is `false`.

  - `attributes` Optional

    Set to `true` to watch for changes to the value of attributes on the node or nodes being monitored. The default value is `true` if either of `attributeFilter` or `attributeOldValue` is specified, otherwise the default value is `false`.

  - `attributeFilter` Optional

    An array of specific attribute names to be monitored. If this property isn't included, changes to all attributes cause mutation notifications.

  - `attributeOldValue` Optional

    Set to `true` to record the previous value of any attribute that changes when monitoring the node or nodes for attribute changes; See [Monitoring attribute values](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver#monitoring_attribute_values) for details on watching for attribute changes and value recording. The default value is `false`.

  - `characterData` Optional

    Set to `true` to monitor the specified target node (and, if `subtree` is `true`, its descendants) for changes to the character data contained within the node or nodes. The default value is `true` if `characterDataOldValue` is specified, otherwise the default value is `false`.

  - `characterDataOldValue` Optional

    Set to `true` to record the previous value of a node's text whenever the text changes on nodes being monitored. The default value is `false`.

#### `$watchBox` Function

Parameters:

- `callback`: Required. Function type. Pass in two parameters,

  - record is an array of [ResizeObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry). It contains information about the modified size of elements.

  - observer: A reference to ResizeObserver itself.

- `options`: Optional. Object type. It is the options parameter of [ResizeObserver.observe()](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/observe),The properties of options are as follows:

  - `box`  Sets which box model the observer will observe changes to. Possible values are:

    - `content-box` (the default)

      Size of the content area as defined in CSS.

    - `border-box`

      Size of the box border area as defined in CSS.

    - `device-pixel-content-box`

      The size of the content area as defined in CSS, in device pixels, before applying any CSS transforms on the element or its ancestors.