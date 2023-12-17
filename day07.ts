type AppendGood<T extends Record<string, unknown>> = {
    [K in keyof T as K extends string ? `good_${K}` : never]: T[K]
}
