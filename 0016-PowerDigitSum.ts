/// https://projecteuler.net/problem=16
import colors from 'colors/safe'
import BigInteger from 'big-integer'

BigInteger

const bigInt = BigInteger(Math.pow(2, 1000))
const ints = bigInt.toString().split('').map(Number)
const sum = ints.reduce((a, b) => a + b, 0)



console.log(colors.magenta(`The sum is ${sum}`))