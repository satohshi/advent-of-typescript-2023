type Gifts = ['🛹', '🚲', '🛴', '🏄']

type PlusOne<
    T extends number,
    Acc extends Array<unknown> = []
> = Acc['length'] extends T
    ? [...Acc, unknown]['length']
    : PlusOne<T, [...Acc, unknown]>

type MinusOne<
    T extends number,
    Acc extends unknown[] = []
> = Acc['length'] extends T
    ? Acc extends [...infer head, unknown]
        ? head['length']
        : never
    : MinusOne<T, [...Acc, unknown]>

type GiftLooper<T extends number> = T extends 4 ? 0 : T

type Rebuild<
    T extends Array<number>,
    Res extends Array<string> = [],
    I extends number = 0
> = T extends [infer Q extends number, ...infer Rest extends number[]]
    ? Q extends 1
        ? Rebuild<Rest, [...Res, Gifts[I]], GiftLooper<PlusOne<I>>>
        : Rebuild<[MinusOne<Q>, ...Rest], [...Res, Gifts[I]], I>
    : Res
