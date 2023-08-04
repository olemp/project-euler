const argv = require('yargs').argv
const colors = require('colors/safe')

let max = -1
let number = 1
let noRemainderNumber = -1

while(noRemainderNumber === -1) {
    for(let i = argv.min; i <= argv.max; i++) {
        max = i
        if((number % i) !== 0) {
            break
        }
    }
    if(max === argv.max) noRemainderNumber = number
    else number++
}

console.log(colors.magenta(noRemainderNumber))