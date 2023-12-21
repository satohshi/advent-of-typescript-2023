type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B
    ? 1
    : 2
    ? true
    : false

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
type WinningCombinations =
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

type With<Arr extends string[], I extends keyof Arr, T extends string> = [
    0 extends I ? (Arr[0] extends TicTacToeEmptyCell ? T : Arr[0]) : Arr[0],
    1 extends I ? (Arr[1] extends TicTacToeEmptyCell ? T : Arr[1]) : Arr[1],
    2 extends I ? (Arr[2] extends TicTacToeEmptyCell ? T : Arr[2]) : Arr[2],
    3 extends I ? (Arr[3] extends TicTacToeEmptyCell ? T : Arr[3]) : Arr[3],
    4 extends I ? (Arr[4] extends TicTacToeEmptyCell ? T : Arr[4]) : Arr[4],
    5 extends I ? (Arr[5] extends TicTacToeEmptyCell ? T : Arr[5]) : Arr[5],
    6 extends I ? (Arr[6] extends TicTacToeEmptyCell ? T : Arr[6]) : Arr[6],
    7 extends I ? (Arr[7] extends TicTacToeEmptyCell ? T : Arr[7]) : Arr[7],
    8 extends I ? (Arr[8] extends TicTacToeEmptyCell ? T : Arr[8]) : Arr[8]
]

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
    [C in WinningCombinations as [
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
    state: Equal<Board, ProccessBoard<Board, P, S>> extends true
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
