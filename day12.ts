// Find the index of '🎅🏼' and turn it into an object key.
type IndexObj<T extends Array<string>> = {
    [N in keyof T as T[N] extends '🎅🏼' ? N : never]: unknown
}

// Turn the object keys into numbers
type ToNumber<T extends Record<string, unknown>> =
    keyof T extends `${infer N extends number}` ? N : never

type FindSanta<T extends Array<string>> = ToNumber<IndexObj<T>>
