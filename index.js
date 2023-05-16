/**
 * 插入 $watch $watchBox 方法至指定的对象上
 * @param {Object} target 需要插入方法的对象
 */
function patch(target = Element.prototype) {
  /**
   * 创建DOM树观察者，处理元素DOM树的变动
   * @param {Function} callback 处理变动的回调
   * @param {Object} config 观察者配置，详见 MutationObserver 文档
   * @return {Function} 注销当前观察者的函数
   */
  function watch(callback, config) {
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

  /**
   * 创建DOM盒模型观察者，处理元素宽高的变动
   * @param {Function} callback 处理变动的回调
   * @param {Object} [config] 观察者配置，详见 ResizeObserver 文档
   * @return {Function} 注销当前观察者的函数，成功返回true，否则返回false
   */
  function watchBox(callback, config) {
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

  target.$watch = watch
  target.$watchBox = watchBox
}

export default patch
