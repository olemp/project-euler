/// https://projecteuler.net/problem=10
import yargs from 'yargs'
import colors from 'colors/safe'
import { isPrime } from './util';
const argv: any = yargs.options({
    number: {
        type: 'number',
        demandOption: true,
        describe: 'The number to start from'
    },
})
    .argv;

let num = argv.number
let sum = 0

for (let i = num - 1; i > 1; i--) {
    if (isPrime(i)) sum += i
}


console.log(colors.magenta(`The sum of all primes below ${num} is ${sum}`))