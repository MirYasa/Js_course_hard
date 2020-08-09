'use strict';
const num = 266219,
    numSplit = num.toString().split('');
let result = 1;
numSplit.map((item) => {
    return result *= item;
});
result = result ** 3;
console.log(result.toString().slice(0, 2));