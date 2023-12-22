type ForestSize = 0 | 1 | 2 | 3

type SantaY<T extends Array<string[]>> = keyof {
    [N in ForestSize as '🎅🏼' extends T[N][number] ? N : never]: unknown
}

type SantaX<T extends Array<string[]>> = keyof {
    [N in ForestSize as '🎅🏼' extends T[number][N] ? N : never]: unknown
}

type FindSanta<T extends Array<string[]>> = [SantaY<T>, SantaX<T>]
