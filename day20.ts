type ToAsciiArt<
    T extends string,
    Line extends Array<string> = ['', '', ''],
    Acc extends Array<string> = []
> = Uppercase<T> extends `${infer First extends string}${infer Rest}`
    ? First extends keyof Letters
        ? ToAsciiArt<
              Rest,
              [
                  `${Line[0]}${Letters[First][0]}`,
                  `${Line[1]}${Letters[First][1]}`,
                  `${Line[2]}${Letters[First][2]}`
              ],
              Acc
          >
        : ToAsciiArt<Rest, ['', '', ''], [...Acc, ...Line]>
    : [...Acc, ...Line]
