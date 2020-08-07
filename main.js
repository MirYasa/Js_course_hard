'use strict';
let num = 266219;
let result = 1;
num = num.toString();

for (let i = 0; i < num.length; i++) {

    result *= parseInt(num[i]);
}

let result2 = result * result * result;

console.log(result2.toString().slice(0, 2));