/**
 * 创建DOM盒模型观察者，处理元素宽高的变动
 * @param {Function} callback 处理变动的回调
 * @param {Object} [config] 观察者配置，详见 ResizeObserver 文档
 * @return {Function} 注销当前观察者的函数，成功返回true，否则返回false
 */
export function watchBox(callback, config) {
  var observer = new ResizeObserver(function (MutationRecord, observer) {
    return callback(MutationRecord, observer)
  })

  observer.observe(this, config)

  /**
   * 用于注销观察者的函数
   * @return {Boolean} 成功返回true，否则返回false
   */
  function disconnect() {
    try {
      observer.disconnect()
      observer = null

      return true
    } catch {
      return false
    }
  }

  disconnect.pause = () => {
    observer.unobserve(this)
  }

  disconnect.resume = config => {
    observer.observe(this, config)
  }

  return disconnect
}
