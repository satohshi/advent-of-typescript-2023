type TicTacToeChip = '❌' | '⭕'
type Swap<T extends TicTacToeChip> = T extends '❌' ? '⭕' : '❌'
type TicTacToeEndState = '❌ Won' | '⭕ Won' | 'Draw'
type TicTacToeState = TicTacToeChip | TicTacToeEndState
type TicTacToeEmptyCell = '  '
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell
type TicTacToeYObj = { top: [0, 1, 2]; middle: [3, 4, 5]; bottom: [6, 7, 8] }
type TicTacToeYPositions = keyof TicTacToeYObj
type TicTacToeXObj = { left: 0; center: 1; right: 2 }
type TicTacToeXPositions = keyof TicTacToeXObj
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`
type TicTactToeBoard = TicTacToeCell[][]
type TicTacToeGame = { board: TicTactToeBoard; state: TicTacToeState }
type EmptyBoard = [['  ', '  ', '  '], ['  ', '  ', '  '], ['  ', '  ', '  ']]
type NewGame = { board: EmptyBoard; state: '❌' }

type Win = ['❌', '❌', '❌'] | ['⭕', '⭕', '⭕']
type WinningCombination =
    | [0, 1, 2]
    | [3, 4, 5]
    | [6, 7, 8]
    | [0, 3, 6]
    | [1, 4, 7]
    | [2, 5, 8]
    | [0, 4, 8]
    | [2, 4, 6]

// Convert board to 1D array
type To1D<T extends TicTactToeBoard> = [...T[0], ...T[1], ...T[2]]

// Convert 1D array back to board
type To2D<T extends string[], Acc extends string[][] = []> = T extends [
    infer A extends string,
    infer B extends string,
    infer C extends string,
    ...infer Rest extends string[]
]
    ? To2D<Rest, [...Acc, [A, B, C]]>
    : Acc

// Convert TicTacToePositions to indices
type PositionToIndex<T extends string> =
    T extends `${infer Y extends TicTacToeYPositions}-${infer X extends TicTacToeXPositions}`
        ? TicTacToeYObj[Y][TicTacToeXObj[X]]
        : never

// Similar to array.with(), but returns never if the cell is already taken
type With<
    Arr extends string[],
    I extends number,
    S extends string,
    Acc extends string[] = []
> = Arr extends [infer F extends string, ...infer Rest extends string[]]
    ? Acc['length'] extends I
        ? F extends TicTacToeEmptyCell
            ? With<Rest, I, S, [...Acc, S]>
            : never
        : With<Rest, I, S, [...Acc, F]>
    : Acc

type Move<
    Board extends TicTactToeBoard,
    Pos extends TicTacToePositions,
    Chip extends TicTacToeChip
> = To2D<With<To1D<Board>, PositionToIndex<Pos>, Chip>>

// Check if the game has ended. Return never if it hasn't
type EndState<Board extends TicTactToeBoard> = keyof {
    [C in WinningCombination as [
        To1D<Board>[C[0]],
        To1D<Board>[C[1]],
        To1D<Board>[C[2]]
    ] extends Win
        ? `${To1D<Board>[C[0]]} Won`
        : TicTacToeEmptyCell extends Board[number][number]
        ? never
        : 'Draw']: unknown
}

// Return result of the move as TicTacToeGame
type Next<T extends TicTactToeBoard, C extends TicTacToeChip> = {
    board: T
    state: EndState<T> extends never ? Swap<C> : EndState<T>
}

type TicTacToe<
    T extends TicTacToeGame,
    Pos extends TicTacToePositions
> = T extends {
    board: infer Board extends TicTactToeBoard
    state: infer Chip extends TicTacToeChip
}
    ? Move<Board, Pos, Chip> extends never
        ? T
        : Next<Move<Board, Pos, Chip>, Chip>
    : never
