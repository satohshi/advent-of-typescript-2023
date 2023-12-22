type FindSanta<
    T extends Array<string>,
    Acc extends Array<unknown> = []
> = T extends [infer First, ...infer Rest extends Array<string>]
    ? First extends '🎅🏼'
        ? Acc['length']
        : FindSanta<Rest, [...Acc, unknown]>
    : never
