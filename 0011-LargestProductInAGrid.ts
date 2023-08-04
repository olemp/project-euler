/// https://projecteuler.net/problem=11
import colors from 'colors/safe'
import yargs from 'yargs'
import fs from 'fs'
import { pad } from 'underscore.string'
const argv: any = yargs.options({
    adjacentNumbers: {
        type: 'number',
        demandOption: false,
        describe: 'The number of adjacent numbers to multiply',
        default: 4
    },
    directions: {
        type: 'string',
        demandOption: false,
        describe: 'The directions to look for adjacent numbers',
        default: 'horizontal,vertical,diagonal_natural,diagonal_reverse'
    }
}).argv

type ContextElement = { currPos: number[], sum: number, nums: number[], pos: number[][], dir?: string }

const $grid = fs.readFileSync('./0011-LargestProductInAGrid.txt', 'utf-8')

const grid: number[][] = $grid.split('\n').map(r => r.split(' ').map(n => Number.parseInt(n)))
let greatestProduct = 0
let greatestSequence: ContextElement = {
    currPos: [0, 0],
    sum: 0,
    nums: [],
    pos: []
}

function createContextObject(
    init: ContextElement = {
        currPos: [0, 0],
        sum: 0,
        nums: [],
        pos: [],
    }
): Record<string, ContextElement> {
    let directions = argv.directions.split(',') as string[]
    if (argv.directions === 'all') directions = ['horizontal', 'vertical', 'diagonal_natural', 'diagonal_reverse']
    return directions.reduce((obj, dir) => ({
        ...obj,
        [dir]: init
    }), {})
}

for (let i = 0; i < grid.length; i++) {
    const r = grid[i]
    for (let j = 0; j < r.length; j++) {
        let c = createContextObject({
            currPos: [i, j],
            sum: 0,
            nums: [],
            pos: [],
        })
        for (let run_len = 1; run_len < argv.adjacentNumbers + 1; run_len++) {
            c = Object.keys(c).reduce((obj, key) => {
                let ele = { ...obj[key] }
                const [x, y] = ele.currPos
                const value = grid[x] && grid[x][y]
                if (value) {
                    ele.nums = [...ele.nums, value]
                    ele.pos = [...ele.pos, ele.currPos]
                    ele.sum = ele.sum ? (ele.sum * value) : value
                }
                return {
                    ...obj,
                    [key]: ele
                }
            }, c)
            if (c.horizontal) c.horizontal.currPos = [i, j + run_len]
            if (c.vertical) c.vertical.currPos = [i + run_len, j]
            if (c.diagonal_natural) c.diagonal_natural.currPos = [i + run_len, j + run_len]
            if (c.diagonal_reverse) c.diagonal_reverse.currPos = [i - run_len, j + run_len]
        }
        let _greatestProduct = Math.max(...Object.keys(c).map(k => c[k].sum))
        let _greatestSequence: string = Object.keys(c).find(k => c[k].sum === _greatestProduct) ?? ''
        if (_greatestProduct > greatestProduct) {
            greatestProduct = _greatestProduct
            greatestSequence = {
                ...c[_greatestSequence],
                dir: _greatestSequence
            }
        }
    }
}

for (let i = 0; i < grid.length; i++) {
    const values = grid[i].map((n, j) => {
        const isPartOfSequence = greatestSequence.pos.find(p => p[0] === i && p[1] === j)
        const numPad = pad(n.toString(), 2, '0')
        return isPartOfSequence ? colors.red(numPad) : colors.white(numPad)
    })
    console.log(values.join('\t'))
}

console.log(colors.magenta(`The greatest product of these ${argv.adjacentNumbers} adjacent numbers (${greatestSequence.nums.join(' x ')}) is ${greatestProduct}`))