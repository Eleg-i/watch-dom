import { watch } from './modules/watch'
import { watchBox } from './modules/watchBox'

/**
 * 插入 $watch $watchBox 方法至指定的对象上
 * @param target 需要插入方法的对象
 */
export function patch(target: Element = HTMLElement.prototype) {
  Object.defineProperties(target, {
    $watch: {
      value(...args: Parameters<HTMLElement['$watch']>) {
        return watch(this, ...args)
      },
      enumerable: false,
      writable: false,
      configurable: false
    },
    $watchBox: {
      value(...args: Parameters<HTMLElement['$watchBox']>) {
        return watchBox(this, ...args)
      },
      enumerable: false,
      writable: true,
      configurable: true
    }
  })
}

export default patch
export { watch, watchBox }
