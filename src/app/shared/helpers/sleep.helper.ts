export default (timeInMs: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(true), timeInMs)
  })
