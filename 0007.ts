const yargs = require('yargs')
const colors = require('colors/safe')
const argv = yargs
    .options({
        primeIndex: {
            type: 'number',
            demandOption: true,
            describe: 'Get prime number by this index'
        },
    })
    .argv;
const util = require('./util')

const primes: number[] = []

let number = 2

while(primes.length <  argv.primeIndex) {
    if(util.isPrime(number)) primes.push(number)
    number++
}

const primeNumber = primes[primes.length -1]

console.log(colors.magenta(`The prime index ${argv.primeIndex} is ${primeNumber}`))