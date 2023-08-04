export const isPrime = function (n: number) { if (typeof n !== 'number' || n <= 1 || n % 1 !== 0) { return false; } for (var i = 2; i <= Math.sqrt(n); i += 1) { if (n % i === 0) { return false; } } return true; };
export const isEven = function (n: number) {
    return n % 2 === 0
}
export function pad(num: number, size: number) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}