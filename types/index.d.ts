// Path: watch-dom\types\index.d.ts
export function watch(
  target: Element,
  callback: (record: MutationRecord, mutation: MutationObserver) => unknown,
  opt: object
): () => undefined

export function watchBox(
  target: Element,
  callback: (record: MutationRecord, mutation: MutationObserver) => unknown,
  opt?: object
): () => undefined

export function patch(target?: typeof Element.prototype): void

declare global {
  interface Element {
    $watch: (callback: (record: MutationRecord, mutation: MutationObserver) => unknown, opt: object) => () => undefined
    $watchBox: (callback: (record: MutationRecord) => unknown, opt?: object) => () => undefined
  }
}
