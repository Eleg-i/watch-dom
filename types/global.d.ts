export function watch(
  callback: (record: MutationRecord, mutation: MutationObserver) => unknown,
  opt: object
): () => undefined
export function $watchBox(callback: (record: MutationRecord, mutation: MutationObserver) => unknown): () => undefined

declare global {
  interface Element {
    $watch: (callback: (record: MutationRecord, mutation: MutationObserver) => unknown, opt: object) => () => undefined
    $watchBox: (callback: (record: MutationRecord) => unknown) => () => undefined
  }
}
