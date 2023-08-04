const yargs = require('yargs')
const colors = require('colors/safe')
const argv = yargs
  .options({
    number: {
      type: 'number',
      demandOption: true,
      describe: 'Find the largest prime factor of this number'
    },
  })
  .argv;
const util = require('./util')

let primeFactor = 0


for (let i = Math.floor(Math.sqrt(argv.number)); i > 2; i--) {
  if (util.isPrime(i) && (argv.number % i) == 0) {
    primeFactor = i
    break
  }
}


console.log(colors.magenta(primeFactor))