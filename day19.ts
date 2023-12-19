type Gifts = ['🛹', '🚲', '🛴', '🏄']
type GiftLooper<T extends number> = [1, 2, 3, 0][T]

type MinusOne<
    T extends number,
    Acc extends unknown[] = []
> = Acc['length'] extends T
    ? Acc extends [...infer Head, unknown]
        ? Head['length']
        : never
    : MinusOne<T, [...Acc, unknown]>

type Rebuild<
    T extends Array<number>,
    Res extends Array<string> = [],
    I extends number = 0
> = T extends [infer Q extends number, ...infer Rest extends number[]]
    ? Q extends 1
        ? Rebuild<Rest, [...Res, Gifts[I]], GiftLooper<I>>
        : Rebuild<[MinusOne<Q>, ...Rest], [...Res, Gifts[I]], I>
    : Res
