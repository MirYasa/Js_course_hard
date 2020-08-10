'use strict';
const num = 266219,
    numSplit = num.toString().split('');
let result = numSplit.reduce((a, b) => {
    return a *= b;
});
console.log(result);
console.log((result ** 3).toString().slice(0, 2));