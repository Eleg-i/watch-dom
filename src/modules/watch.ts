interface Unwatch {
  (): void
  pause(): void
  resume(): void
}

/**
 * 创建 DOM 树观察者，处理元素DOM树的变动
 * @param target   目标元素
 * @param callback 处理变动的回调
 * @param config   观察者配置，详见 MutationObserver 文档
 * @returns 注销当前观察者的函数
 */
export function watch(
  target: Element,
  callback: (records: MutationRecord[], observer: MutationObserver) => unknown,
  config?: MutationObserverInit
): Unwatch {
  let observer: MutationObserver | null = new MutationObserver(
    (MutationRecord, observer: MutationObserver) => callback(MutationRecord, observer)
  )

  observer.observe(target, config)

  /**
   * 注销当前观察者
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
      value: () => {
        observer?.disconnect()
      }
    },
    resume: {
      /**
       * 恢复观察者
       */
      value: () => {
        observer?.observe(target, config)
      }
    }
  })

  return disconnect as Unwatch
}
