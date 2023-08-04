/// https://projecteuler.net/problem=12
import colors from 'colors/safe'
import yargs from 'yargs'
const argv: any = yargs
    .options({
        divisors: {
            type: 'number',
            demandOption: false,
            describe: 'Number of divisors to look for',
            default: 5
        }
    })
    .argv;

function tau(num: number) {

    var n = num;
    var i = 2;
    var p = 1;

    if (num === 1) return 1;

    while (i * i <= n) {
        var c = 1;
        while (n % i === 0) {
            n /= i;
            c++;
        }
        i++;
        p *= c;
    }

    if (n === num || n > 1)
        p *= 1 + 1;

    return p;
}

function solution(x: number) {

    var n = 1;
    var d = 1;

    while (tau(d) <= x) {
        n++;
        d += n;
    }
    return d;
}

console.log(colors.magenta(`The value of the first triangle number to have over ${argv.divisors} divisors is ${solution(argv.divisors)}`))