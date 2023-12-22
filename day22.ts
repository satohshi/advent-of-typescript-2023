/** because "dashing" implies speed */
type Dasher = '💨'

/** representing dancing or grace */
type Dancer = '💃'

/** a deer, prancing */
type Prancer = '🦌'

/** a star for the dazzling, slightly mischievous Vixen */
type Vixen = '🌟'

/** for the celestial body that shares its name */
type Comet = '☄️'

/** symbolizing love, as Cupid is the god of love */
type Cupid = '❤️'

/** representing thunder, as "Donner" means thunder in German */
type Donner = '🌩️'

/** meaning lightning in German, hence the lightning bolt */
type Blitzen = '⚡'

/** for his famous red nose */
type Rudolph = '🔴'

type Reindeer =
    | Dasher
    | Dancer
    | Prancer
    | Vixen
    | Comet
    | Cupid
    | Donner
    | Blitzen
    | Rudolph

type Row = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

type Col = {
    C0: [Row, 0, 0]
    C1: [Row, 0, 1]
    C2: [Row, 0, 2]
    C3: [Row, 1, 0]
    C4: [Row, 1, 1]
    C5: [Row, 1, 2]
    C6: [Row, 2, 0]
    C7: [Row, 2, 1]
    C8: [Row, 2, 2]
}

type Subgrid = {
    S0: [0 | 1 | 2, 0, 0 | 1 | 2]
    S1: [0 | 1 | 2, 1, 0 | 1 | 2]
    S2: [0 | 1 | 2, 2, 0 | 1 | 2]
    S3: [3 | 4 | 5, 0, 0 | 1 | 2]
    S4: [3 | 4 | 5, 1, 0 | 1 | 2]
    S5: [3 | 4 | 5, 2, 0 | 1 | 2]
    S6: [6 | 7 | 8, 0, 0 | 1 | 2]
    S7: [6 | 7 | 8, 1, 0 | 1 | 2]
    S8: [6 | 7 | 8, 2, 0 | 1 | 2]
}

type Validate<T extends Array<string[][]>> = {
    [R in Row as `R${R}`]: Reindeer extends T[R][number][number] ? true : false
} & {
    [C in keyof Col as C]: Reindeer extends T[Col[C][0]][Col[C][1]][Col[C][2]]
        ? true
        : false
} & {
    [S in keyof Subgrid as S]: Reindeer extends T[Subgrid[S][0]][Subgrid[S][1]][Subgrid[S][2]]
        ? true
        : false
} extends Record<string, true>
    ? true
    : false
