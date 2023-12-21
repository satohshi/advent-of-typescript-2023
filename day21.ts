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
type TicTacToeGame = {
    board: TicTactToeBoard
    state: TicTacToeState
}
type EmptyBoard = [['  ', '  ', '  '], ['  ', '  ', '  '], ['  ', '  ', '  ']]
type NewGame = {
    board: EmptyBoard
    state: '❌'
}
type WinningCombination =
    | [0, 1, 2]
    | [3, 4, 5]
    | [6, 7, 8]
    | [0, 3, 6]
    | [1, 4, 7]
    | [2, 5, 8]
    | [0, 4, 8]
    | [2, 4, 6]

type PositionToIndex<T extends string> =
    T extends `${infer Y extends TicTacToeYPositions}-${infer X extends TicTacToeXPositions}`
        ? TicTacToeYObj[Y][TicTacToeXObj[X]]
        : never

type With<
    Arr extends string[],
    I extends number,
    T extends string,
    Acc extends string[] = []
> = Arr extends [infer F extends string, ...infer Rest extends string[]]
    ? Acc['length'] extends I
        ? F extends TicTacToeEmptyCell
            ? With<Rest, I, T, [...Acc, T]>
            : With<Rest, I, T, [...Acc, F]>
        : With<Rest, I, T, [...Acc, F]>
    : Acc

type To1DArr<Board extends TicTactToeBoard> = [
    ...Board[0],
    ...Board[1],
    ...Board[2]
]

type To2DArr<T extends Array<string>, Acc extends string[][] = []> = T extends [
    infer A extends string,
    infer B extends string,
    infer C extends string,
    ...infer Rest extends string[]
]
    ? To2DArr<Rest, [...Acc, [A, B, C]]>
    : Acc

type ProccessBoard<
    Board extends TicTactToeBoard,
    P extends TicTacToePositions,
    S extends TicTacToeChip
> = To2DArr<With<To1DArr<Board>, PositionToIndex<P>, S>>

type CheckWin<Board extends TicTactToeBoard> = keyof {
    [C in WinningCombination as [
        To1DArr<Board>[C[0]],
        To1DArr<Board>[C[1]],
        To1DArr<Board>[C[2]]
    ] extends ['❌', '❌', '❌']
        ? '❌ Won'
        : [
              To1DArr<Board>[C[0]],
              To1DArr<Board>[C[1]],
              To1DArr<Board>[C[2]]
          ] extends ['⭕', '⭕', '⭕']
        ? '⭕ Won'
        : TicTacToeEmptyCell extends Board[number][number]
        ? never
        : 'Draw']: unknown
}

type Turn<
    Board extends TicTactToeBoard,
    P extends TicTacToePositions,
    S extends TicTacToeChip
> = {
    board: ProccessBoard<Board, P, S>
    state: Board extends ProccessBoard<Board, P, S>
        ? S
        : CheckWin<ProccessBoard<Board, P, S>> extends never
        ? Swap<S>
        : CheckWin<ProccessBoard<Board, P, S>>
}

type TicTacToe<
    T extends TicTacToeGame,
    P extends TicTacToePositions
> = T extends {
    board: infer B extends TicTactToeBoard
    state: infer S extends TicTacToeChip
}
    ? Turn<B, P, S>
    : never
