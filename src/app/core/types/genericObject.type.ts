type GenericObject = {
  [x: string]:
    | string
    | number
    | boolean
    | GenericObject
    | string[]
    | number[]
    | boolean[]
    | GenericObject[]
    | null
    | undefined
}

export default GenericObject
