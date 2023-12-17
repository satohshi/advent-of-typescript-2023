type SantasList<
    Bad extends ReadonlyArray<unknown>,
    Good extends ReadonlyArray<unknown>
> = [...Bad, ...Good]
