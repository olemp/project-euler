/// https://projecteuler.net/problem=371
import colors from 'colors/safe'

const numbersFrom1ToN = (n: number): number[] => {
    const numbers: number[] = [];
    for (let i = 1; i <= n; i++) {
        numbers.push(i);
    }
    return numbers;
}

const allLicensePlateCombinations = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const numbers = numbersFrom1ToN(999);
    const combinations: string[] = [];
    letters.forEach(letter1 => {
        letters.forEach(letter2 => {
            letters.forEach(letter3 => {
                numbers.forEach(number => {
                    const combination = `${letter1}${letter2}${letter3}-${number.toString().padStart(3, '0')}`;
                    combinations.push(combination);
                })
            })
        })
    })
    return combinations
}

const totalLicensePlates = allLicensePlateCombinations().length
const to