// Path: watch-dom\types\index.d.ts

type mutationObserverOptions = {
  attributes?: boolean
  characterData?: boolean
  childList?: boolean
  subtree?: boolean
  attributeOldValue?: boolean
  characterDataOldValue?: boolean
  attributeFilter?: string[]
}

type resizeObserverOptions = {
  box?: 'content-box' | 'border-box'
}

export function watch(
  target: Element,
  callback: (record: MutationRecord, mutation: MutationObserver) => unknown,
  opt: mutationObserverOptions
): () => undefined
export function watchBox(
  target: Element,
  callback: (record: MutationRecord, mutation: MutationObserver) => unknown,
  opt?: resizeObserverOptions
): () => undefined

declare function patch(target?: typeof Element.prototype): void

export default patch

declare global {
  interface HTMLElement {
    $watch: (
      callback: (record: MutationRecord, mutation: MutationObserver) => unknown,
      opt: mutationObserverOptions
    ) => () => undefined
    $watchBox: (callback: (record: MutationRecord) => unknown, opt?: resizeObserverOptions) => () => undefined
  }
}
