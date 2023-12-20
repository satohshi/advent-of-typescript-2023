type ToAsciiArt<
    T extends string,
    Acc extends Array<string> = [],
    Line extends Array<string> = ['', '', '']
> = Uppercase<T> extends `${infer First}${infer Rest}`
    ? First extends keyof Letters
        ? ToAsciiArt<
              Rest,
              Acc,
              [
                  `${Line[0]}${Letters[First][0]}`,
                  `${Line[1]}${Letters[First][1]}`,
                  `${Line[2]}${Letters[First][2]}`
              ]
          >
        : ToAsciiArt<Rest, [...Acc, ...Line]>
    : [...Acc, ...Line]
