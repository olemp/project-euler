/// https://projecteuler.net/problem=81
import yargs from 'yargs'
import colors from 'colors/safe'
const argv: any = yargs
    .options({
        param1: {
            type: 'number',
            demandOption: true,
            describe: 'The first parameter',
        },
    })
    .argv;

// Your code for problem 81 here

console.log(colors.magenta(`The input was ${argv.param1}`))