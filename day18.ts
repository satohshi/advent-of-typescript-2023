type Count<
    T extends Array<string>,
    Item extends string,
    Acc extends Array<unknown> = []
> = T extends [infer First, ...infer Rest extends Array<string>]
    ? First extends Item
        ? Count<Rest, Item, [...Acc, unknown]>
        : Count<Rest, Item, Acc>
    : Acc['length']
