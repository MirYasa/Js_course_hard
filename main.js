'use strict';
const num = 266219;
let result = 1;
const numSplit = num.toString().split('');

numSplit.map((item) => {
   return result *= item;
});
result = result ** 3;
console.log(result.toString().slice(0, 2));