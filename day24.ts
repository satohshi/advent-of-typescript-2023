type Alley = '  '
type MazeItem = '🎄' | '🎅' | Alley
type MazeMatrix = MazeItem[][]
type ForestSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type PlusOne<N extends ForestSize> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10][N]
type MinusOne<N extends ForestSize> = [10, 0, 1, 2, 3, 4, 5, 6, 7, 8][N]
type ValicIndex = [ForestSize, ForestSize]
type Directions<T extends ValicIndex> = {
    up: [MinusOne<T[0]>, T[1]]
    down: [PlusOne<T[0]>, T[1]]
    left: [T[0], MinusOne<T[1]>]
    right: [T[0], PlusOne<T[1]>]
}
type Direction = keyof Directions<ValicIndex>
type WinRow = ['🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪']
type WinMatrix = [WinRow, WinRow, WinRow, WinRow, WinRow, WinRow, WinRow, WinRow, WinRow, WinRow]

type ArrayWith<
    Arr extends Array<string>,
    I extends number,
    S extends string,
    Acc extends Array<string> = []
> = Arr extends [infer F extends string, ...infer Rest extends Array<string>]
    ? Acc['length'] extends I
        ? ArrayWith<Rest, I, S, [...Acc, S]>
        : ArrayWith<Rest, I, S, [...Acc, F]>
    : Acc

type MatrixWith<
    Arr extends Array<string[]>,
    Y extends number,
    X extends number,
    S extends string,
    Acc extends Array<string[]> = []
> = Arr extends [infer F extends Array<string>, ...infer Rest extends Array<string[]>]
    ? Acc['length'] extends Y
        ? MatrixWith<Rest, Y, X, S, [...Acc, ArrayWith<F, X, S>]>
        : MatrixWith<Rest, Y, X, S, [...Acc, F]>
    : Acc

type FindSanta<T extends Array<string[]>> = [
    keyof {
        [N in ForestSize as '🎅' extends T[N][number] ? N : never]: unknown
    },
    keyof {
        [N in ForestSize as '🎅' extends T[number][N] ? N : never]: unknown
    }
]

type ValidateMove<
    T extends MazeMatrix,
    From extends [ForestSize, ForestSize],
    To = Directions<From>[Direction]
> = To extends [ForestSize, ForestSize]
    ? T[To[0]][To[1]] extends Alley
        ? MatrixWith<MatrixWith<T, From[0], From[1], Alley>, To[0], To[1], '🎅'>
        : T
    : To extends [ForestSize | 10, ForestSize | 10]
    ? WinMatrix
    : never

type Move<T extends MazeMatrix, U extends Direction> = FindSanta<T> extends [ForestSize, ForestSize]
    ? ValidateMove<T, FindSanta<T>, Directions<FindSanta<T>>[U]>
    : never

export {}
