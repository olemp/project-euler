const yargs = require('yargs')
const colors = require('colors/safe')
const util = require('./util')
const argv = yargs
    .options({
        start: {
            type: 'number',
            demandOption: false,
            describe: 'Starting number of the sequence'
        },
        max: {
            type: 'number',
            demandOption: false,
            describe: 'Max number to check sequence for'
        },
    })
    .argv;

function getSequence(num = argv.start) {
    const sequence: number[] = [num]

    while (num != 1) {
        if (util.isEven(num)) {
            num = num / 2
        } else {
            num = (3 * num) + 1
        }
        sequence.push(num)
    }
    return sequence
}

const sequences: [number, number][] = []
let longestSequence: [number, number] = [0, 0]

if (argv.start) console.log(colors.magenta(getSequence().join(' -> ')))
else if (argv.max) {
    for (let i: number = argv.max; i >= 2; i--) {
        const sequence = getSequence(i)
        const s: [number, number] = [i, sequence.length]
        if (sequence.length > longestSequence[1]) {
            sequences.push(s)
            longestSequence = s
        }
    }
    console.log(colors.magenta(`Start number ${longestSequence[0]} has a sequence with length ${longestSequence[1]}`))
}