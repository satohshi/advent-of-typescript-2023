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
    0: [Row, 0, 0]
    1: [Row, 0, 1]
    2: [Row, 0, 2]
    3: [Row, 1, 0]
    4: [Row, 1, 1]
    5: [Row, 1, 2]
    6: [Row, 2, 0]
    7: [Row, 2, 1]
    8: [Row, 2, 2]
}

type Subgrid = {
    0: [0 | 1 | 2, 0, 0 | 1 | 2]
    1: [0 | 1 | 2, 1, 0 | 1 | 2]
    2: [0 | 1 | 2, 2, 0 | 1 | 2]
    3: [3 | 4 | 5, 0, 0 | 1 | 2]
    4: [3 | 4 | 5, 1, 0 | 1 | 2]
    5: [3 | 4 | 5, 2, 0 | 1 | 2]
    6: [6 | 7 | 8, 0, 0 | 1 | 2]
    7: [6 | 7 | 8, 1, 0 | 1 | 2]
    8: [6 | 7 | 8, 2, 0 | 1 | 2]
}

type Validate<T extends Array<string[][]>> = {
    [R in Row as `r_${R}`]: Reindeer extends T[R][number][number] ? true : false
} & {
    [C in keyof Col as `c_${C}`]: Reindeer extends T[Col[C][0]][Col[C][1]][Col[C][2]]
        ? true
        : false
} & {
    [S in keyof Subgrid as `s_${S}`]: Reindeer extends T[Subgrid[S][0]][Subgrid[S][1]][Subgrid[S][2]]
        ? true
        : false
} extends Record<string, true>
    ? true
    : false
