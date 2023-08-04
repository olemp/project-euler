const yargs = require('yargs')
const colors = require('colors/safe')
const argv = yargs
    .options({
        target: {
            type: 'number',
            demandOption: true,
            describe: 'Target number'
        },
    })
    .argv;



const dp: number[] = new Array(argv.target + 1).fill(0);
dp[0] = 1; // There's one way to make sum 0, which is not taking any number.

for (let i = 1; i <= argv.target; i++) {
    for (let j = i; j <= argv.target; j++) {
        dp[j] += dp[j - i];
    }
}

const differentWays = dp[argv.target] -1

console.log(colors.magenta(`The number of ways to sum ${argv.target} is ${differentWays}`))