interface Element {
  $watch: (
    callback: (records: MutationRecord[], observer: MutationObserver) => unknown,
    opt?: MutationObserverInit
  ) => () => undefined
  $watchBox: (
    callback: (records: ResizeObserverEntry[], observer: ResizeObserver) => unknown,
    opt?: ResizeObserverOptions
  ) => () => undefined
}
