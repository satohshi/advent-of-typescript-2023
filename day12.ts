type FindSanta<T extends Array<string>> = T extends [
    ...infer Rest extends Array<string>,
    infer Last
]
    ? Last extends '🎅🏼'
        ? Rest['length']
        : FindSanta<Rest>
    : never
