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

// Similar to array.with() but also checks if the cell is already taken
type ArrayWith<Arr extends unknown[], I extends number, S> = {
    [Key in keyof Arr]: Key extends `${I}`
        ? Arr[Key] extends TicTacToeEmptyCell
            ? S
            : 'Invalid move'
        : Arr[Key]
}

// 2D version of ArrayWith.
type MatrixWith<M extends Array<unknown[]>, I extends [number, number], S> = {
    [Key in keyof M]: Key extends `${I[0]}` ? ArrayWith<M[Key], I[1], S> : M[Key]
}

type Move<
    Board extends TicTactToeBoard,
    Position extends TicTacToePositions,
    Chip extends TicTacToeChip
> = Position extends `${infer Y extends TicTacToeYPositions}-${infer X extends TicTacToeXPositions}`
    ? MatrixWith<Board, [TicTacToeYObj[Y], TicTacToeXObj[X]], Chip>
    : never

type EndState<Board extends TicTactToeBoard> =
    // Check for vertical lines
    | keyof {
          [Y in 0 | 1 | 2 as Board[Y] extends Win ? `${Board[Y][0]} Won` : never]: unknown
      }
    // Check for horizontal lines
    | keyof {
          [X in 0 | 1 | 2 as [Board[0][X], Board[1][X], Board[2][X]] extends Win
              ? `${Board[0][X]} Won`
              : never]: unknown
      }
    // Check for diagonal lines
    | ([Board[0][0], Board[1][1], Board[2][2]] extends Win ? `${Board[1][1]} Won` : never)
    | ([Board[0][2], Board[1][1], Board[2][0]] extends Win ? `${Board[1][1]} Won` : never)
    // Check if the board is filled
    | (TicTacToeEmptyCell extends Board[number][number] ? never : 'Draw')

type Next<T extends TicTactToeBoard, C extends TicTacToeChip> = {
    board: T
    state: EndState<T> extends never ? Swap<C> : EndState<T>
}

type TicTacToe<T extends TicTacToeGame, P extends TicTacToePositions> = T extends {
    board: infer B extends TicTactToeBoard
    state: infer S extends TicTacToeChip
}
    ? 'Invalid move' extends Move<B, P, S>[number][number]
        ? T
        : Next<Move<B, P, S>, S>
    : never
