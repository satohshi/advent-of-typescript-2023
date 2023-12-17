type Reverse<T extends string> = T extends `${infer First}${infer Rest}`
    ? `${Reverse<Rest>}${First}`
    : T

// JavaScript equivalent as an explaination
const reverse = (str: string): string => {
    if (str.length === 1) return str
    const [first, ...rest] = str.split('')
    return `${reverse(rest.join(''))}${first}`
}
