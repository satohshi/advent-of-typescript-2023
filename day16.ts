// Check if an array contains '🎅🏼'.
type HasSanta<T> = T extends Array<string>
    ? '🎅🏼' extends T[number]
        ? true
        : false
    : false

// Find the index of the array that contains '🎅🏼'
// and return it as object key
type SantaYObj<T extends Array<string[]>> = {
    [N in keyof T as HasSanta<T[N]> extends true ? N : never]: unknown
}

// Find the index of '🎅🏼' and turn it into an object key.
type SantaXObj<T extends Array<string>> = {
    [N in keyof T as T[N] extends '🎅🏼' ? N : never]: unknown
}

// Turns object keys into numbers
type ToNumber<T extends Record<string, unknown>> =
    keyof T extends `${infer N extends number}` ? N : never

type FindY<T extends Array<string[]>> = ToNumber<SantaYObj<T>>
type FindX<T extends Array<string[]>> = ToNumber<SantaXObj<T[FindY<T>]>>

type FindSanta<T extends Array<string[]>> = [FindY<T>, FindX<T>]
