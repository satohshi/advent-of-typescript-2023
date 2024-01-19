type ParseInt<T> = T extends `${infer N extends number}` ? N : never

type FindSanta<T extends Array<string>> = {
    [K in keyof T]: T[K] extends '🎅🏼' ? ParseInt<K> : never
}[number]
