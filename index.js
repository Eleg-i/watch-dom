import { watch } from './modules//watch'
import { watchBox } from './modules//watchBox'

/**
 * 插入 $watch $watchBox 方法至指定的对象上
 * @param {Object} target 需要插入方法的对象
 */
function patch(target = Element.prototype) {
  target.$watch = watch
  target.$watchBox = watchBox
}

export default patch
export { watch, watchBox }
