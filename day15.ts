type BoxToys<
    Item extends string,
    Q extends number,
    Res extends Array<string> = []
> = Q extends Res['length'] ? Res : BoxToys<Item, Q, [...Res, Item]>
