const argv = require('yargs').argv
const colors = require('colors/safe')

let sumSquare = 0
let sum = 0


for(let i = 1; i <= argv.max; i++) {
    sumSquare += Math.pow(i, 2)
    sum += i
}

sum = Math.pow(sum, 2)

console.log(colors.magenta(sum - sumSquare))