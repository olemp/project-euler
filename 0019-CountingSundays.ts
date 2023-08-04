/// https://projecteuler.net/problem=19
import colors from 'colors/safe'
const oneDayMs = 86400000

const startDate = new Date(1901, 0, 1)
const endDate = new Date(2000, 11, 31)

function addDays(date: Date, days: number) {
    return new Date(date.getTime() + (oneDayMs * days))
}

const sundays = []
let currentDate = addDays(startDate, 5)

while (currentDate <= endDate) {
    currentDate = addDays(currentDate, 7)

    if (currentDate.getDate() === 1) {
        sundays.push(currentDate)
    }
}

console.log(colors.magenta(`Sunday was on the first day of the month ${sundays.length} times between ${startDate.toDateString()} and ${endDate.toDateString()}`))