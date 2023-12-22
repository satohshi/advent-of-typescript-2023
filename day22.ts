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

type Horizontal = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

type Vertical = {
    0: [0, 0]
    1: [0, 1]
    2: [0, 2]
    3: [1, 0]
    4: [1, 1]
    5: [1, 2]
    6: [2, 0]
    7: [2, 1]
    8: [2, 2]
}

type Subgrid = {
    0: [0 | 1 | 2, 0]
    1: [0 | 1 | 2, 1]
    2: [0 | 1 | 2, 2]
    3: [3 | 4 | 5, 0]
    4: [3 | 4 | 5, 1]
    5: [3 | 4 | 5, 2]
    6: [6 | 7 | 8, 0]
    7: [6 | 7 | 8, 1]
    8: [6 | 7 | 8, 2]
}

type Validate<T extends Array<string[][]>> = {
    [Y in Horizontal as `horizontal_${Y}`]: Reindeer extends T[Y][number][number]
        ? true
        : false
} & {
    [X in keyof Vertical as `vertical_${X}`]: Reindeer extends T[Horizontal][Vertical[X][0]][Vertical[X][1]]
        ? true
        : false
} & {
    [G in keyof Subgrid as `subgrid_${G}`]: Reindeer extends T[Subgrid[G][0]][Subgrid[G][1]][
        | 0
        | 1
        | 2]
        ? true
        : false
} extends { [key: string]: true }
    ? true
    : false
