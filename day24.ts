type Alley = '  '
type MazeItem = '🎄' | '🎅' | Alley
type MazeMatrix = MazeItem[][]
type ForestSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type PlusOne<N extends ForestSize> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'Escaped'][N]
type MinusOne<N extends ForestSize> = ['Escaped', 0, 1, 2, 3, 4, 5, 6, 7, 8][N]
type ValidIndex = [ForestSize, ForestSize]
type Directions<T extends ValidIndex> = {
    up: [MinusOne<T[0]>, T[1]]
    down: [PlusOne<T[0]>, T[1]]
    left: [T[0], MinusOne<T[1]>]
    right: [T[0], PlusOne<T[1]>]
}
type Direction = keyof Directions<ValidIndex>
type WinRow = ['🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪']
type WinMatrix = [WinRow, WinRow, WinRow, WinRow, WinRow, WinRow, WinRow, WinRow, WinRow, WinRow]

type ArrayWith<Arr extends unknown[], I extends number, S> = {
    [Key in keyof Arr]: Key extends `${I}` ? S : Arr[Key]
}

type MatrixWith<M extends Array<unknown[]>, I extends [number, number], S> = {
    [Key in keyof M]: Key extends `${I[0]}` ? ArrayWith<M[Key], I[1], S> : M[Key]
}

type FindSanta<T extends MazeMatrix> = [
    keyof {
        [N in ForestSize as '🎅' extends T[N][number] ? N : never]: unknown
    },
    keyof {
        [N in ForestSize as '🎅' extends T[number][N] ? N : never]: unknown
    }
]

type ValidateMove<
    T extends MazeMatrix,
    From extends ValidIndex,
    Dir extends Direction,
    To = Directions<From>[Dir]
> = To extends ValidIndex
    ? T[To[0]][To[1]] extends Alley
        ? MatrixWith<MatrixWith<T, From, Alley>, To, '🎅'>
        : T
    : 'Escaped' extends To[keyof To]
    ? WinMatrix
    : never

type Move<T extends MazeMatrix, U extends Direction> = FindSanta<T> extends ValidIndex
    ? ValidateMove<T, FindSanta<T>, U>
    : never
