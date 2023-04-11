Element.prototype.$watch = function (callback, config) {
  const observer = new MutationObserver(function (MutationRecord, observer) {
    return callback(MutationRecord, observer)
  })

  observer.observe(this, config)

  return () => observer.disconnect()
}

Element.prototype.$watchBox = function (callback, config) {
  const observer = new ResizeObserver(function (MutationRecord, observer) {
    return callback(MutationRecord, observer)
  })

  observer.observe(this, config)

  return () => observer.disconnect()
}
