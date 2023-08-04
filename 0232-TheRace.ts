/// https://projecteuler.net/problem=232
import yargs from 'yargs'
import colors from 'colors/safe'

function probabilityOfWinning(): number {
    const memo: number[] = new Array(101).fill(-1);
    memo[100] = 0; // Base case: If Player 2 has 100 points, the probability of winning is 0.

    function calculateProbability(i: number): number {
        if (memo[i] !== -1) {
            return memo[i];
        }

        let maxProb = 0;
        for (let n = 1; n <= 100 - i; n++) {
            const prob = 0.5 * calculateProbability(i + n) + 0.5;
            if (prob > maxProb) {
                maxProb = prob;
            }
        }

        memo[i] = maxProb;
        return maxProb;
    }

    return calculateProbability(0);
}

const probability = probabilityOfWinning().toFixed(8)

console.log(colors.magenta(`The probability of Player 2 winning is ${probability}`))