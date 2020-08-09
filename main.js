'use strict';
const num = 266219,
    numSplit = num.toString().split(''),
    reducer = (accumulator, currentValue) => accumulator *  currentValue;
console.log((numSplit.reduce(reducer) ** 3).toString().slice(0, 2));