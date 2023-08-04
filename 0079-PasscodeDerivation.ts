/// https://projecteuler.net/problem=79
import colors from 'colors/safe'
import * as fs from 'fs'

function findShortestPasscode(loginAttempts: string[]): string {
  const after: { [key: string]: Set<string> } = {}

  // Build before and after relationships for each digit
  for (const attempt of loginAttempts) {
    for (let i = 1; i < attempt.length; i++) {
      const current = attempt[i]
      const prev = attempt[i - 1]
      if (!after[prev]) after[prev] = new Set()
      after[prev].add(current)
    }
  }

  // Determine the first digit (no digits appear before it)
  const firstDigit = Object.keys(after).find((digit) => !Object.values(after).some((set) => set.has(digit)))

  // Traverse the digits based on the before and after relationships
  const visited: Set<string> = new Set()
  const passcodeArr: string[] = []

  // Function to traverse the digits recursively. The first digit is the last digit in the passcode
  // so we traverse the digits in reverse order and then reverse the array at the end to get the passcode.
  function traverse(digit: string) {
    visited.add(digit)
    if (after[digit]) {
      for (const next of after[digit]) {
        if (!visited.has(next)) {
          traverse(next)
        }
      }
    }
    passcodeArr.push(digit)
  }

  traverse(firstDigit as string)

  return passcodeArr.reverse().join('')
}

// Read the login attempts from the keylog.txt file
function readLoginAttemptsFromFile(filePath: string): string[] {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const loginAttempts = fileContent.trim().split('\n')
  return loginAttempts
}

const loginAttempts = readLoginAttemptsFromFile('./data/0079-PasscodeDerivation.txt')
const shortestPasscode = findShortestPasscode(loginAttempts)

console.log(colors.magenta(`Shortest possible secret passcode is ${shortestPasscode}`))
