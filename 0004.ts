const yargs = require('yargs')
const colors = require('colors/safe')
const argv = yargs
    .options({
        digits: {
            type: 'number',
            demandOption: true,
            describe: 'Number of digits allowed'
        },
    })
    .argv;

const palindromes: number[] = []
const min = Math.pow(10, argv.digits - 1)
const max = Number.parseInt(new Array(argv.digits).fill(9).join(''))

for (let i = max; i > min; i--) {
    for (let j = max; j > min; j--) {
        const sum = (i * j).toString()
        const reverse = sum.split('').reverse().join('')
        if (sum === reverse) {
            palindromes.push(parseInt(sum))
        }
    }
}

const palindrome = Math.max(...palindromes)

console.log(colors.magenta(`The largest palindrome made from the product of two ${argv.digits}-digit numbers is ${palindrome}`))