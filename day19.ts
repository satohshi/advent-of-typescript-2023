type Gifts = ['🛹', '🚲', '🛴', '🏄']
type GiftLooper<T extends number> = [1, 2, 3, 0][T]
type Decrement<T extends number> = [number, 0, 1, 2, 3, 4][T]

type Rebuild<
    T extends Array<number>,
    Res extends Array<string> = [],
    I extends number = 0
> = T extends [infer Q extends number, ...infer Rest extends number[]]
    ? Q extends 1
        ? Rebuild<Rest, [...Res, Gifts[I]], GiftLooper<I>>
        : Rebuild<[Decrement<Q>, ...Rest], [...Res, Gifts[I]], I>
    : Res
