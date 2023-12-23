type Connect4Chips = '🔴' | '🟡'
type Swap<C extends Connect4Chips> = C extends '🔴' ? '🟡' : '🔴'
type Connect4Cell = Connect4Chips | '  '
type Connect4State = '🔴' | '🟡' | '🔴 Won' | '🟡 Won' | 'Draw'
type Connect4Board = Array<Connect4Cell[]>
type Connect4Game = { board: Connect4Board; state: Connect4State }

type RedWin = ['🔴', '🔴', '🔴', '🔴']
type YellowWin = ['🟡', '🟡', '🟡', '🟡']

type Row = 0 | 1 | 2 | 3 | 4 | 5
type RowBelow<N extends number> = [1, 2, 3, 4, 5, never][N]

// Same as array.with()
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

// 2D version of ArrayWith
type MatrixWith<
    Arr extends Array<string[]>,
    Y extends number,
    X extends number,
    S extends string,
    Acc extends Array<string[]> = []
> = Arr extends [
    infer F extends Array<string>,
    ...infer Rest extends Array<string[]>
]
    ? Acc['length'] extends Y
        ? MatrixWith<Rest, Y, X, S, [...Acc, ArrayWith<F, X, S>]>
        : MatrixWith<Rest, Y, X, S, [...Acc, F]>
    : Acc

// Returns the row number of the last empty cell in the column i.e. the row to place the chip
type GetRow<
    T extends Connect4Board,
    Col extends number
> = T[number][Col] extends '  '
    ? 5
    : keyof {
          [N in Row as T[N][Col] extends '  '
              ? T[RowBelow<N>][Col] extends Connect4Chips
                  ? N
                  : never
              : never]: unknown
      }

// Check if array T contains subarray U
type CheckSubarray<
    T extends Array<string>,
    U extends Array<string>
> = T extends
    | [unknown, ...U, ...unknown[]]
    | [...unknown[], ...U, unknown]
    | [...U, ...unknown[]]
    | [...unknown[], ...U]
    ? true
    : false

// Technically not needed because test cases don't check for this.
type Rotate90<
    T extends Connect4Board,
    Col extends Array<number> = [0, 1, 2, 3, 4, 5, 6],
    Acc extends Array<Connect4Cell[]> = []
> = Col extends [infer F extends number, ...infer Rest extends Array<number>]
    ? Rotate90<
          T,
          Rest,
          [...Acc, [T[0][F], T[1][F], T[2][F], T[3][F], T[4][F], T[5][F]]]
      >
    : Acc

// Rotate the board 45 degrees and take the top and bottom off because they're < 4 in length
type Rotate45<T extends Connect4Board> = [
    [T[3][0], T[2][1], T[1][2], T[0][3]],
    [T[4][0], T[3][1], T[2][2], T[1][3], T[0][4]],
    [T[5][0], T[4][1], T[3][2], T[2][3], T[1][4], T[0][5]],
    [T[5][1], T[4][2], T[3][3], T[2][4], T[1][5], T[0][6]],
    [T[5][2], T[4][3], T[3][4], T[2][5], T[1][6]],
    [T[5][3], T[4][4], T[3][5], T[2][6]]
]

// Technically not needed because test cases don't check for this.
type Rotate315<T extends Connect4Board> = [
    [T[0][3], T[1][4], T[2][5], T[3][6]],
    [T[0][2], T[1][3], T[2][4], T[3][5], T[4][6]],
    [T[0][1], T[1][2], T[2][3], T[3][4], T[4][5], T[5][6]],
    [T[0][0], T[1][1], T[2][2], T[3][3], T[4][4], T[5][5]],
    [T[1][0], T[2][1], T[3][2], T[4][3], T[5][4]],
    [T[2][0], T[3][1], T[4][2], T[5][3]]
]

type Rotations<T extends Connect4Board> =
    | T
    | Rotate90<T>
    | Rotate45<T>
    | Rotate315<T>

type CheckWin<
    T extends Connect4Board,
    C extends Connect4Chips
> = true extends CheckSubarray<T[number], RedWin>
    ? '🔴 Won'
    : true extends CheckSubarray<T[number], YellowWin>
    ? '🟡 Won'
    : Swap<C>

type GetState<
    T extends Connect4Board,
    C extends Connect4Chips
> = '  ' extends T[number][number] ? CheckWin<Rotations<T>, C> : 'Draw'

type Move<
    Board extends Connect4Board,
    Col extends number,
    S extends Connect4Chips
> = GetRow<Board, Col> extends number
    ? {
          board: MatrixWith<Board, GetRow<Board, Col>, Col, S>
          state: GetState<MatrixWith<Board, GetRow<Board, Col>, Col, S>, S>
      }
    : never

type Connect4<Board extends Connect4Game, Col extends number> = Board extends {
    board: infer Board extends Connect4Board
    state: infer State extends Connect4Chips
}
    ? Move<Board, Col, State>
    : never
