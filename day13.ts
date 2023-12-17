// Adds 1 to a number. e.g. AddOne<3> => 4
type AddOne<
    T extends number,
    Acc extends Array<unknown> = []
> = Acc['length'] extends T
    ? [...Acc, unknown]['length']
    : AddOne<T, [...Acc, unknown]>

type DayCounter<Start extends number, End extends number> = Start extends End
    ? End
    : Start | DayCounter<AddOne<Start>, End>

// JavaScript equivalent as an explaination
const dayCounter = (start: number, end: number): string => {
    if (start === end) return `${end}`
    return `${start} | ${dayCounter(start + 1, end)}`
}
