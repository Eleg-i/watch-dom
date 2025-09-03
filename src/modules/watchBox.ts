interface UnwatchBox {
  (): void
  pause(): void
  resume(): void
  unobserve(): void
}

/**
 * 创建DOM盒模型观察者，处理元素宽高的变动
 * @param target   目标元素
 * @param callback 处理变动的回调
 * @param [config] 观察者配置，详见 ResizeObserver 文档
 * @returns 注销当前观察者的函数，成功返回true，否则返回false
 */
export const watchBox = (
  target: Element,
  callback: (records: ResizeObserverEntry[], observer: ResizeObserver) => unknown,
  config?: ResizeObserverOptions
): UnwatchBox => {
  let observer: ResizeObserver | null = new ResizeObserver((mutationRecord, observer) =>
    callback(mutationRecord, observer)
  )

  observer.observe(target, config)

  /**
   * 用于注销观察者的函数
   */
  const disconnect = () => {
    observer?.disconnect()
    observer = null
  }

  Object.defineProperties(disconnect, {
    pause: {
      /**
       * 暂停观察者
       */
      value() {
        observer?.disconnect()
      }
    },
    resume: {
      /**
       * 恢复观察者
       */
      value() {
        observer?.observe(target, config)
      }
    },
    unobserve: {
      /**
       * 取消某个元素的监听
       * @param child 目标元素
       */
      value(child: Element) {
        observer?.unobserve(child)
      }
    }
  })

  return disconnect as UnwatchBox
}
