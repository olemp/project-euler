/// https://projecteuler.net/problem=22
import colors from 'colors/safe'
import fs from 'fs'

let namesString = fs.readFileSync('./data/0022-NamesScores.txt', 'utf8')
const names = namesString.split(',').map(name => name.replace(/"/g, '')).sort()

const nameScores = names.map((name, index) => {
    const nameScore = name.split('').map(char => char.charCodeAt(0) - 64).reduce((a, b) => a + b, 0) * (index + 1)
    return nameScore
})

console.log(colors.magenta(`The total name score is ${nameScores.reduce((a, b) => a + b, 0)}`))