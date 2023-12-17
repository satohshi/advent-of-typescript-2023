type RemoveNaughtyChildren<T extends Record<string, any>> = {
    [K in keyof T as K extends `naughty_${any}` ? never : K]: T[K]
}
