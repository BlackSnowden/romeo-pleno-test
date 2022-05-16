export default (array: any[], _chunkSize: number) => {
  const chunkSize = Math.ceil(_chunkSize)
  const chunks = []

  for (let currentSize = 0; currentSize < array.length; currentSize += chunkSize) {
    chunks.push(array.slice(currentSize, currentSize + chunkSize))
  }

  return chunks
}
