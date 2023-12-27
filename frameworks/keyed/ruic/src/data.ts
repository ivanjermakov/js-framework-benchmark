import { Signal } from 'ruic'

export const N = 1000
export const N_LOTS = 10000

let id = 1

const adjectives = [
    'pretty',
    'large',
    'big',
    'small',
    'tall',
    'short',
    'long',
    'handsome',
    'plain',
    'quaint',
    'clean',
    'elegant',
    'easy',
    'angry',
    'crazy',
    'helpful',
    'mushy',
    'odd',
    'unsightly',
    'adorable',
    'important',
    'inexpensive',
    'cheap',
    'expensive',
    'fancy'
]
const colours = ['red', 'yellow', 'blue', 'green', 'pink', 'brown', 'purple', 'brown', 'white', 'black', 'orange']
const nouns = [
    'table',
    'chair',
    'house',
    'bbq',
    'desk',
    'car',
    'pony',
    'cookie',
    'sandwich',
    'burger',
    'pizza',
    'mouse',
    'keyboard'
]

export interface Datum {
    id: number
    label: Signal<string>
}

export function buildData(count: number): Datum[] {
    let data = new Array(count)
    for (let i = 0; i < count; i++) {
        const label = new Signal(
            `${adjectives[random(adjectives.length)]} ${colours[random(colours.length)]} ${nouns[random(nouns.length)]}`
        )
        data[i] = { id: id++, label }
    }
    return data
}

function random(max: number) {
    return Math.floor(Math.random() * max)
}
