export default function alwaysAfter(promise, cb) {
  return promise
    .then(cb, cb) // Run `cb` if `promise` resolves or rejects
    .then(() => promise) // Then return the original result
}