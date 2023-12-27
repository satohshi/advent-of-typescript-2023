type Gifts = ['🛹', '🚲', '🛴', '🏄']
type GiftLooper<T extends number> = [1, 2, 3, 0][T]

type Rebuild<
    T extends Array<number>,
    Acc extends Array<string> = [],
    I extends number = 0,
    Curr extends Array<Gifts[number]> = []
> = T extends [infer Q extends number, ...infer Rest extends number[]]
    ? Q extends Curr['length']
        ? Rebuild<Rest, [...Acc, ...Curr], GiftLooper<I>>
        : Rebuild<T, Acc, I, [...Curr, Gifts[I]]>
    : Acc
