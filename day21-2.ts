type TicTacToeChip = '❌' | '⭕'
type Swap<T extends TicTacToeChip> = T extends '❌' ? '⭕' : '❌'
type TicTacToeEndState = '❌ Won' | '⭕ Won' | 'Draw'
type TicTacToeState = TicTacToeChip | TicTacToeEndState
type TicTacToeEmptyCell = '  '
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell
type TicTacToeYObj = { top: 0; middle: 1; bottom: 2 }
type TicTacToeYPositions = keyof TicTacToeYObj
type TicTacToeXObj = { left: 0; center: 1; right: 2 }
type TicTacToeXPositions = keyof TicTacToeXObj
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`
type TicTactToeBoard = TicTacToeCell[][]
type TicTacToeGame = { board: TicTactToeBoard; state: TicTacToeState }
type EmptyBoard = [['  ', '  ', '  '], ['  ', '  ', '  '], ['  ', '  ', '  ']]
type NewGame = { board: EmptyBoard; state: '❌' }
type Win = ['❌', '❌', '❌'] | ['⭕', '⭕', '⭕']

type ArrayWith<
    Arr extends string[],
    I extends number,
    S extends string,
    Acc extends string[] = []
> = Arr extends [infer F extends string, ...infer Rest extends string[]]
    ? Acc['length'] extends I
        ? F extends TicTacToeEmptyCell
            ? ArrayWith<Rest, I, S, [...Acc, S]>
            : never
        : ArrayWith<Rest, I, S, [...Acc, F]>
    : Acc

type MatrixWith<
    Arr extends string[][],
    Y extends number,
    X extends number,
    S extends string,
    Acc extends string[][] = []
> = Arr extends [infer F extends string[], ...infer Rest extends string[][]]
    ? Acc['length'] extends Y
        ? F[X] extends TicTacToeEmptyCell
            ? MatrixWith<Rest, Y, X, S, [...Acc, ArrayWith<F, X, S>]>
            : never
        : MatrixWith<Rest, Y, X, S, [...Acc, F]>
    : Acc

type Move<
    Board extends TicTactToeBoard,
    Position extends TicTacToePositions,
    Chip extends TicTacToeChip
> = Position extends `${infer Y extends TicTacToeYPositions}-${infer X extends TicTacToeXPositions}`
    ? MatrixWith<Board, TicTacToeYObj[Y], TicTacToeXObj[X], Chip>
    : never

type EndState<Board extends TicTactToeBoard> =
    | keyof {
          [Y in 0 | 1 | 2 as Board[Y] extends Win
              ? `${Board[Y][0]} Won`
              : never]: unknown
      }
    | keyof {
          [X in 0 | 1 | 2 as [Board[0][X], Board[1][X], Board[2][X]] extends Win
              ? `${Board[0][X]} Won`
              : never]: unknown
      }
    | ([Board[0][0], Board[1][1], Board[2][2]] extends Win
          ? `${Board[1][1]} Won`
          : never)
    | ([Board[0][2], Board[1][1], Board[2][0]] extends Win
          ? `${Board[1][1]} Won`
          : never)
    | (TicTacToeEmptyCell extends Board[number][number] ? never : 'Draw')

type Next<T extends TicTactToeBoard, C extends TicTacToeChip> = {
    board: T
    state: EndState<T> extends never ? Swap<C> : EndState<T>
}

type TicTacToe<
    T extends TicTacToeGame,
    P extends TicTacToePositions
> = T extends {
    board: infer B extends TicTactToeBoard
    state: infer S extends TicTacToeChip
}
    ? Move<B, P, S> extends never
        ? T
        : Next<Move<B, P, S>, S>
    : never

export {}
