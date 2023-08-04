const yargs = require('yargs')
const colors = require('colors/safe')
const argv = yargs
    .options({
        number: {
            type: 'number',
            demandOption: true,
            describe: 'The number to count words for'
        },
    })
    .argv;
const fs = require('fs')

let letterCount = 0

const allWords: string[] = []

// Define an object that maps numbers to their word form
const numbersToWords: Record<number, string> = {
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen",
    20: "twenty",
    30: "thirty",
    40: "forty",
    50: "fifty",
    60: "sixty",
    70: "seventy",
    80: "eighty",
    90: "ninety"
}

function getWordsForNumber(num: number): string {
    if (numbersToWords[num]) return numbersToWords[num]
    let words = ''
    if (num >= 1000) {
        const t = Math.floor(num / 1000)
        words += `${numbersToWords[t]}thousand`
        num = num % 1000
    }
    if (num >= 100) {
        const h = Math.floor(num / 100)
        words += `${numbersToWords[h]}hundred`
        num = num % 100
    }
    if (num === 0) return words
    if (words !== '') words += 'and'
    if (num < 20) words += numbersToWords[num]
    else {
        const t = Math.floor(num / 10) * 10
        words += numbersToWords[t]
        const r = num % 10
        if (r > 0) {
            words += `${numbersToWords[r]}`
        }
    }
    return words
}

for (let i = 1; i <= argv.number; i++) {
    const words = getWordsForNumber(i)
    allWords.push(words)
    letterCount += words.length
}

fs.writeFileSync('problem_17.json', JSON.stringify(allWords, null, 2))

console.log(colors.magenta(`There are ${letterCount} letters in the numbers 1 to ${argv.number}`))