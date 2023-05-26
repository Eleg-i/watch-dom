/**
 * 创建DOM树观察者，处理元素DOM树的变动
 * @param {Function} callback 处理变动的回调
 * @param {Object} config 观察者配置，详见 MutationObserver 文档
 * @return {Function} 注销当前观察者的函数
 */
export function watch(callback, config) {
  var observer = new MutationObserver(function (MutationRecord) {
    return callback(MutationRecord)
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

  return disconnect
}
